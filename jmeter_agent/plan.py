"""Ön kontrol (probe) ve kullanıcı dostu test planı tablosu.

Hem etkileşimli mod hem de agent'lar (Claude Code, Copilot, ...) tarafından
`python -m jmeter_agent probe|plan` komutlarıyla kullanılır.
"""
from __future__ import annotations

import time
import urllib.error
import urllib.request
from urllib.parse import urlsplit

from .spec import RequestSpec, TestSpec

METHOD_TR = {"GET": "veri okuma", "POST": "veri gönderme", "PUT": "güncelleme",
             "PATCH": "kısmi güncelleme", "DELETE": "silme"}


def probe(url: str, method: str = "GET", headers: dict | None = None, body: str | None = None) -> dict:
    """URL'ye tek bir deneme isteği atar ve sonucu yorumlayan bir ipucu döner."""
    req = urllib.request.Request(url, method=method, headers=headers or {},
                                 data=body.encode() if body else None)
    started = time.time()
    try:
        with urllib.request.urlopen(req, timeout=10) as resp:
            status, ctype = resp.status, resp.headers.get("Content-Type", "")
    except urllib.error.HTTPError as e:
        status, ctype = e.code, e.headers.get("Content-Type", "")
    except Exception as e:  # noqa: BLE001
        return {"url": url, "method": method, "ok": False, "error": str(e),
                "hint": "Adrese ulaşılamadı; URL'yi ve ağ erişimini kontrol edin."}
    ms = round((time.time() - started) * 1000)
    if status in (401, 403):
        hint = "Kimlik doğrulama gerekiyor; Authorization değeri isteyin."
    elif status in (404, 405) and method == "GET":
        hint = "GET kabul edilmiyor olabilir; POST/PUT önerin."
    elif status >= 400:
        hint = f"İstek HTTP {status} dönüyor; method, body ve header'ları kontrol edin."
    else:
        hint = "İstek başarılı."
    return {"url": url, "method": method, "ok": True, "status": status, "ms": ms,
            "content_type": ctype, "hint": hint}


def _merged_headers(spec: TestSpec, r: RequestSpec) -> dict[str, str]:
    return {**spec.headers, **r.headers}


def probe_spec(spec: TestSpec) -> list[dict]:
    return [probe(r.url, r.method, _merged_headers(spec, r), r.body) for r in spec.requests]


def estimate_requests(spec: TestSpec, latencies_ms: list[int | None]) -> tuple[int, float] | None:
    """Yanıt sürelerine göre yaklaşık toplam istek ve saniyedeki istek sayısı."""
    if not latencies_ms or None in latencies_ms:
        return None
    n = len(spec.requests)
    iteration_s = (sum(latencies_ms) + n * spec.think_time_ms) / 1000
    rps = spec.users * n / iteration_s
    if spec.target_rps:
        rps = min(rps, spec.target_rps)
    if spec.loops:
        return spec.users * spec.loops * n, round(rps, 1)
    active_s = max(spec.duration - spec.ramp_up / 2, 1)  # ramp-up boyunca ortalama yarı yük
    return int(rps * active_s), round(rps, 1)


def _fmt_duration(sec: int) -> str:
    m, s = divmod(sec, 60)
    return " ".join(p for p in (f"{m} dakika" if m else "", f"{s} saniye" if s else "") if p) or "0 saniye"


def plan_sections(spec: TestSpec, latencies_ms: list[int | None] | None = None) -> tuple[list, list]:
    """(test planı satırları, başarı kriteri satırları) — her satır (etiket, açıklama)."""
    rows: list[tuple[str, str]] = [("Test adı", spec.name)]
    multi = len(spec.requests) > 1
    for i, r in enumerate(spec.requests, 1):
        u = urlsplit(r.url)
        rows.append((f"Adım {i}" if multi else "Hedef", f"{u.hostname}{u.path or '/'}"))
        what = f"{r.method} — {METHOD_TR.get(r.method, r.method)}"
        if r.body:
            what += ", JSON gövdeyle" if r.body.lstrip().startswith(("{", "[")) else ", form gövdeyle"
        rows.append(("İstek türü", what))
        if any(k.lower() == "authorization" for k in _merged_headers(spec, r)):
            rows.append(("Giriş", "Token ile (değer gizli)"))

    rows.append(("Sanal kullanıcı", f"{spec.users} kişi aynı anda"))
    if spec.duration:
        ramp = f" (ilk {spec.ramp_up} sn'de kademeli başlar)" if spec.ramp_up else ""
        rows.append(("Süre", _fmt_duration(spec.duration) + ramp))
    else:
        rows.append(("Tekrar", f"Her kullanıcı senaryoyu {spec.loops} kez çalıştırır"))
    rows.append(("Tempo", f"Her yanıttan sonra {spec.think_time_ms / 1000:g} sn bekleyip tekrar gönderir"
                 if spec.think_time_ms else "Beklemeden, yanıt gelir gelmez tekrar gönderir"))
    if spec.target_rps:
        rows.append(("Hız sınırı", f"Saniyede en fazla {spec.target_rps:g} istek"))
    est = estimate_requests(spec, latencies_ms or [])
    if est:
        rows.append(("Tahmini istek", f"~{est[0]} istek (saniyede ~{est[1]:g})"))

    t = spec.thresholds
    crit: list[tuple[str, str]] = []
    if t.max_error_pct is not None:
        crit.append((f"Hata oranı ≤ %{t.max_error_pct:g}",
                     f"100 istekten en fazla {t.max_error_pct:g} tanesi başarısız olabilir" if t.max_error_pct
                     else "Hiçbir istek başarısız olmamalı"))
    if t.p95_ms is not None:
        crit.append((f"p95 ≤ {t.p95_ms:g} ms", f"İsteklerin %95'i {t.p95_ms / 1000:g} sn'den kısa sürede dönmeli"))
    if t.p99_ms is not None:
        crit.append((f"p99 ≤ {t.p99_ms:g} ms", f"İsteklerin %99'u {t.p99_ms / 1000:g} sn'den kısa sürede dönmeli"))
    if t.avg_ms is not None:
        crit.append((f"Ortalama ≤ {t.avg_ms:g} ms", "Ortalama yanıt süresi bu değeri aşmamalı"))
    if t.min_rps is not None:
        crit.append((f"RPS ≥ {t.min_rps:g}", f"Sistem saniyede en az {t.min_rps:g} istek karşılamalı"))
    codes = spec.expected_status
    crit.append(("HTTP kodu", f"Sadece {', '.join(map(str, codes))} başarılı sayılır" if codes
                 else "4xx/5xx yanıtlar hata sayılır"))
    return rows, crit


def _box(title: str, rows: list[tuple[str, str]]) -> str:
    lw = max(len(k) for k, _ in rows)
    rw = max(len(v) for _, v in rows)
    lines = [f"┌─ {title} " + "─" * max(lw + rw + 2 - len(title), 0) + "┐"]
    lines += [f"│ {k.ljust(lw)} │ {v.ljust(rw)} │" for k, v in rows]
    lines.append("└" + "─" * (lw + 2) + "┴" + "─" * (rw + 2) + "┘")
    return "\n".join(lines)


def render_text(spec: TestSpec, latencies_ms: list[int | None] | None = None) -> str:
    rows, crit = plan_sections(spec, latencies_ms)
    return _box("TEST PLANI", rows) + "\n\n" + _box("BAŞARILI SAYILMASI İÇİN", crit)


def render_markdown(spec: TestSpec, latencies_ms: list[int | None] | None = None) -> str:
    rows, crit = plan_sections(spec, latencies_ms)
    md = ["**Test planı**", "", "| | |", "|---|---|"]
    md += [f"| **{k}** | {v} |" for k, v in rows]
    md += ["", "**Başarılı sayılması için**", "", "| Kriter | Anlamı |", "|---|---|"]
    md += [f"| {k} | {v} |" for k, v in crit]
    return "\n".join(md)
