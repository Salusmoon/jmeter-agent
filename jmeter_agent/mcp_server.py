"""JMeter MCP sunucusu — MCP destekleyen her agent (Claude Code, GitHub Copilot, TARS, ...) kullanabilir.

stdio:  python -m jmeter_agent.mcp_server
HTTP :  python -m jmeter_agent.mcp_server --http --port 8090   (→ http://host:8090/mcp)
"""
from __future__ import annotations

import argparse
import threading
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path
from typing import Optional

from mcp.server.mcpserver import MCPServer

from .jmx import build_jmx
from .plan import estimate_requests, probe, probe_spec, render_markdown
from .runner import RUNS_DIR, find_jmeter, get_run_status, list_runs, new_run_id, run_test
from .spec import TestSpec, enforce_limits

INSTRUCTIONS = """\
JMeter ile HTTP performans/yük testi yapan araçlar.

Kullanıcı bir URL verdiğinde testi hemen başlatma. Eksik bilgileri ADIM ADIM, her mesajda tek soru sorarak topla:
1. probe_url ile URL'yi dene. Sonuçtaki `hint` alanı yol gösterir: 404/405 → POST öner, 401/403 → token iste.
2. Sırayla sor: method, body (POST/PUT/PATCH için), token/header'lar, ek senaryo adımı,
   yük seviyesi (Smoke 1 kullanıcı/30 sn · Düşük 5/60 sn · Orta 25/3 dk · Yüksek 100/5 dk), p95 limiti.
   Her soruda ilgili spec ile probe_url'u tekrar çağırarak isteğin çalıştığını doğrula.
3. plan_load_test ile onay tablosunu al ve `plan_markdown` alanını kullanıcıya olduğu gibi göster. Onay iste.
4. Onaydan sonra start_load_test ile testi başlat. Bitene kadar get_load_test_status ile kontrol et
   (`remaining_s_estimate` kadar bekle). Kısa testler (≤ 60 sn) için run_load_test de kullanılabilir.
5. Sonucu raporla: verdict (PASS/FAIL), istek/hata sayısı, RPS, ortalama, p50/p90/p95/p99,
   eşik kontrolleri, kısa bir yorum ve report_url (HTML dashboard).
Token değerlerini sohbette asla tekrar etme. Ortak demo servislere (quickpizza, blazedemo, dummyjson)
Orta/Yüksek yük uygulamadan önce bunun başkalarını etkileyeceğini belirt.
"""

mcp = MCPServer("jmeter", instructions=INSTRUCTIONS)

_executor = ThreadPoolExecutor(max_workers=1)  # aynı anda tek test: ölçümler birbirini bozmasın
_lock = threading.Lock()
_queued: set[str] = set()


def _links(result: dict) -> dict:
    html = result.get("report_html")
    if html:
        result["report_url"] = Path(html).as_uri()
    return result


def _redacted_spec(spec: TestSpec) -> dict:
    """Token gibi hassas header değerlerini gizleyerek spec döner."""
    data = spec.model_dump(exclude_none=True, exclude={"url", "method", "body"})
    for hdrs in [data.get("headers", {})] + [r.get("headers", {}) for r in data["requests"]]:
        for k in hdrs:
            if k.lower() in ("authorization", "cookie", "x-api-key", "api-key"):
                hdrs[k] = "***"
    return data


# ── Keşif ──────────────────────────────────────────────────────────────────────

@mcp.tool()
def probe_url(url: str, method: str = "GET", headers: Optional[dict[str, str]] = None,
              body: Optional[str] = None) -> dict:
    """URL'ye TEK bir deneme isteği atar (yük testi değildir).

    Dönen alanlar: status (HTTP kodu), ms (yanıt süresi), content_type ve `hint`.
    `hint`, sonraki adımı söyler: 404/405 → POST dene, 401/403 → Authorization iste.
    Method/body/token belirlendikçe tekrar çağırıp isteğin 2xx döndüğünü doğrula.
    """
    if "://" not in url:
        url = "https://" + url
    return probe(url, method.upper(), headers, body)


@mcp.tool()
def plan_load_test(spec: TestSpec) -> dict:
    """Testi ÇALIŞTIRMADAN doğrular ve kullanıcı onayı için sade dilli plan üretir.

    Güvenlik limitlerini (izinli host, maks. kullanıcı/süre) kontrol eder, her isteği bir kez dener ve
    tahmini istek sayısını hesaplar. `plan_markdown` alanını kullanıcıya olduğu gibi göster ve onay iste.
    """
    enforce_limits(spec)
    runs = [probe_spec(spec) for _ in range(2)]
    probes = runs[-1]
    latencies = [min((r["ms"] for r in rs if r.get("ok") and r["status"] < 400), default=None)
                 for rs in zip(*runs)]
    est = estimate_requests(spec, latencies)
    failing = [p for p in probes if not p.get("ok") or p["status"] >= 400]
    return {
        "plan_markdown": render_markdown(spec, latencies),
        "estimated_requests": est[0] if est else None,
        "estimated_rps": est[1] if est else None,
        "probe_results": probes,
        "warnings": [f"{p['method']} {p['url']} → {p.get('status', p.get('error'))}: {p['hint']}" for p in failing],
        "spec": _redacted_spec(spec),
    }


# ── Çalıştırma ─────────────────────────────────────────────────────────────────

def _execute(run_id: str, spec: TestSpec) -> None:
    try:
        run_test(spec, run_id=run_id)
    except Exception as e:  # noqa: BLE001 — hata durum dosyasına yansısın
        import json
        d = RUNS_DIR / run_id
        d.mkdir(parents=True, exist_ok=True)
        (d / "summary.json").write_text(json.dumps({"run_id": run_id, "status": "error", "error": str(e)},
                                                   ensure_ascii=False), encoding="utf-8")
    finally:
        with _lock:
            _queued.discard(run_id)


@mcp.tool()
def start_load_test(spec: TestSpec) -> dict:
    """Yük testini ARKA PLANDA başlatır ve hemen `run_id` döner (uzun testler için önerilen yol).

    Sonra get_load_test_status(run_id) ile durumu sorgula; `remaining_s_estimate` kadar bekleyip tekrar dene.
    Testler sırayla çalışır; başka test sürüyorsa bu test kuyrukta bekler.
    """
    enforce_limits(spec)
    find_jmeter()
    run_id = new_run_id(spec)
    with _lock:
        ahead = len(_queued)
        _queued.add(run_id)
    _executor.submit(_execute, run_id, spec)
    return {"run_id": run_id, "status": "queued" if ahead else "running", "tests_ahead": ahead,
            "expected_duration_s": spec.duration,
            "next_step": "get_load_test_status ile sorgula"}


@mcp.tool()
def get_load_test_status(run_id: str) -> dict:
    """Testin durumunu döner: queued / running (geçen ve tahmini kalan süreyle) / completed (tam özetle) / error.

    completed olduğunda: verdict (PASS/FAIL), total ve per_request metrikleri (p50/p90/p95/p99, hata %, RPS),
    threshold_checks ve report_url (JMeter HTML dashboard).
    """
    st = get_run_status(run_id)
    if st:
        return _links(st)
    with _lock:
        if run_id in _queued:
            return {"run_id": run_id, "status": "queued"}
    return {"run_id": run_id, "status": "not_found", "error": "Bu run_id ile test bulunamadı."}


@mcp.tool()
def run_load_test(spec: TestSpec) -> dict:
    """Yük testini çalıştırır ve BİTENE KADAR bekleyip sonucu döner.

    Sadece kısa testler için (≤ 60 sn) kullan; daha uzun testlerde MCP istemcisi zaman aşımına uğrayabilir,
    onun yerine start_load_test + get_load_test_status kullan.
    """
    return _links(run_test(spec))


# ── Geçmiş ve dışa aktarma ─────────────────────────────────────────────────────

@mcp.tool()
def list_load_tests(limit: int = 10) -> list[dict]:
    """Son testleri listeler (run_id, ad, durum, PASS/FAIL)."""
    return list_runs(limit)


@mcp.tool()
def export_jmx(spec: TestSpec, file_name: Optional[str] = None) -> dict:
    """Spec'ten JMeter test planı (.jmx) üretip kaydeder; JMeter GUI'de açılabilir veya CI'da kullanılabilir."""
    out_dir = RUNS_DIR.parent / "plans"
    out_dir.mkdir(parents=True, exist_ok=True)
    name = file_name or new_run_id(spec).split("-", 2)[-1]
    path = out_dir / (name if name.endswith(".jmx") else name + ".jmx")
    path.write_text(build_jmx(spec), encoding="utf-8")
    return {"path": str(path), "uri": path.as_uri()}


@mcp.prompt(name="performans-testi", description="Bir URL için adım adım performans testi akışını başlatır")
def performans_testi_prompt(url: str = "") -> str:
    target = f"Hedef URL: {url}\n\n" if url else "Önce kullanıcıdan test edilecek URL'yi iste.\n\n"
    return target + INSTRUCTIONS


def main() -> None:
    ap = argparse.ArgumentParser(description="JMeter MCP sunucusu")
    ap.add_argument("--http", action="store_true", help="stdio yerine streamable HTTP")
    ap.add_argument("--host", default="127.0.0.1")
    ap.add_argument("--port", type=int, default=8090)
    args = ap.parse_args()
    if args.http:
        mcp.run(transport="streamable-http", host=args.host, port=args.port)
    else:
        mcp.run()


if __name__ == "__main__":
    main()
