"""Etkileşimli mod: test parametrelerini kullanıcıya sorarak spec oluşturur."""
from __future__ import annotations

import json
import webbrowser
from pathlib import Path
from urllib.parse import urlsplit

from pydantic import ValidationError

from .plan import probe, render_text
from .runner import run_test
from .spec import RequestSpec, TestSpec, enforce_limits

BODY_METHODS = {"POST", "PUT", "PATCH", "DELETE"}
_LATENCY_MS: dict[str, int] = {}  # ön kontrolde ölçülen yanıt süreleri (tahmini istek sayısı için)


def _ask(prompt: str, default=None, cast=str, allow_empty: bool = False):
    hint = f" [{default}]" if default not in (None, "") else ""
    while True:
        raw = input(f"  {prompt}{hint}: ").strip()
        if not raw:
            if default is not None:
                return default
            if allow_empty:
                return None
            print("    ! Bu alan zorunlu.")
            continue
        try:
            return cast(raw)
        except ValueError:
            print(f"    ! Geçersiz değer: {raw}")


def _yes(prompt: str, default: bool = False) -> bool:
    d = "E/h" if default else "e/H"
    raw = input(f"  {prompt} ({d}): ").strip().lower()
    return default if not raw else raw in ("e", "evet", "y", "yes")


def _ask_headers(title: str) -> dict[str, str]:
    headers: dict[str, str] = {}
    if not _yes(f"{title} eklensin mi?"):
        return headers
    print("    'Ad: Değer' formatında girin, bitirmek için boş Enter.")
    while True:
        raw = input("    header: ").strip()
        if not raw:
            return headers
        if ":" not in raw:
            print("    ! Format 'Ad: Değer' olmalı.")
            continue
        k, v = raw.split(":", 1)
        headers[k.strip()] = v.strip()


LOAD_PRESETS = {
    "1": ("Smoke   — 1 kullanıcı, 30 sn (sadece çalışıyor mu?)", dict(users=1, ramp_up=0, duration=30, think_time_ms=1000)),
    "2": ("Düşük   — 5 kullanıcı, 60 sn", dict(users=5, ramp_up=10, duration=60, think_time_ms=1000)),
    "3": ("Orta    — 25 kullanıcı, 3 dk", dict(users=25, ramp_up=30, duration=180, think_time_ms=500)),
    "4": ("Yüksek  — 100 kullanıcı, 5 dk", dict(users=100, ramp_up=60, duration=300, think_time_ms=0)),
    "5": ("Özel    — değerleri kendim gireceğim", None),
}


def _print_probe(p: dict) -> None:
    if not p["ok"]:
        print(f"    ⚠ Adrese ulaşılamadı: {p['error']}")
    else:
        print(f"    → Deneme isteği: HTTP {p['status']}, {p['ms']} ms, {p['content_type'] or '-'}")


def _ask_url(n: int) -> str | None:
    while True:
        url = _ask("URL" + (" (bitirmek için boş Enter)" if n > 1 else ""), allow_empty=n > 1)
        if url is None:
            return None
        if "://" not in url:
            url = "https://" + url
        try:
            RequestSpec(url=url)
            return url
        except ValidationError:
            print("    ! Geçersiz URL.")


def _ask_request(n: int, url: str | None = None) -> RequestSpec | None:
    print(f"\n[Adım: İstek {n}]")
    if url:
        try:
            url = RequestSpec(url=url).url  # şemayı tamamla / doğrula
        except ValidationError:
            print(f"  ! Geçersiz URL: {url}")
            url = None
    if url:
        print(f"  URL: {url}")
    else:
        url = _ask_url(n)
        if url is None:
            return None

    print("    Adres kontrol ediliyor...")
    p = probe(url)
    _print_probe(p)
    status = p.get("status")

    default_method = "GET"
    if status in (404, 405):
        print(f"    ℹ GET ile {status} döndü — endpoint POST/PUT bekliyor olabilir.")
        default_method = "POST" if status == 405 else "GET"
    method = _ask("Method (GET/POST/PUT/PATCH/DELETE)", default_method).upper()

    body = None
    if method in BODY_METHODS:
        body = _ask("Request body (JSON veya form; yoksa boş Enter)", allow_empty=True)

    headers: dict[str, str] = {}
    if body:
        ctype = "application/json" if body.lstrip().startswith(("{", "[")) else "application/x-www-form-urlencoded"
        headers["Content-Type"] = ctype
        print(f"    Content-Type otomatik eklendi: {ctype}")

    def has_auth() -> bool:
        return any(k.lower() == "authorization" for k in headers)

    if method != "GET" or status in (401, 403):
        if method != "GET":
            print("    Bu ayarlarla tekrar deneniyor...")
            p = probe(url, method, headers, body)
            _print_probe(p)
        # Kimlik doğrulama gerekiyorsa token iste ve doğrula
        while p.get("status") in (401, 403) and not has_auth():
            print(f"    ℹ Adres kimlik doğrulama istiyor ({p['status']}).")
            token = _ask("Authorization değeri (ör. 'Bearer xyz' / 'token abc'; atlamak için boş)", allow_empty=True)
            if not token:
                break
            headers["Authorization"] = token
            p = probe(url, method, headers, body)
            _print_probe(p)
            if p.get("status") in (401, 403):
                print("    ! Token kabul edilmedi, tekrar deneyin.")
                del headers["Authorization"]

    extra = _ask_headers("Başka header")
    if extra:
        headers.update(extra)
        p = probe(url, method, headers, body)
        _print_probe(p)

    if p.get("ok") and p["status"] >= 400 and not _yes(f"İstek HTTP {p['status']} dönüyor. Yine de devam edilsin mi?"):
        return _ask_request(n, url)

    if p.get("ok"):
        _LATENCY_MS[url] = p["ms"]
    default_label = f"{method} {urlsplit(url).path or '/'}"
    label = _ask("Raporda görünecek isim", default_label)
    return RequestSpec(url=url, method=method, body=body, headers=headers, label=label)


def build_spec_interactively(urls: list[str] | None = None) -> TestSpec:
    print("=" * 60)
    print(" JMeter Agent — yeni performans testi")
    print(" (köşeli parantez içindeki varsayılan için Enter'a basın)")
    print("=" * 60)

    requests: list[RequestSpec] = []
    for u in urls or []:
        requests.append(_ask_request(len(requests) + 1, u))
    if not requests:
        requests.append(_ask_request(1))
    while _yes("Senaryoya başka bir istek (adım) eklensin mi?"):
        req = _ask_request(len(requests) + 1)
        if req is None:
            break
        requests.append(req)

    print("\n[Adım: Yük seviyesi]")
    for k, (desc, _) in LOAD_PRESETS.items():
        print(f"    {k}) {desc}")
    choice = _ask("Seçim", "2")
    preset = LOAD_PRESETS.get(choice, LOAD_PRESETS["2"])[1]
    if preset:
        load = dict(preset, loops=None, target_rps=None)
    else:
        users = _ask("Eşzamanlı kullanıcı sayısı", 10, int)
        ramp_up = _ask("Ramp-up süresi (sn)", min(users, 30), int)
        mode = _ask("Süreye göre mi, iterasyona göre mi? (s/i)", "s").lower()
        duration, loops = (None, _ask("Kullanıcı başına iterasyon", 10, int)) if mode.startswith("i") \
            else (_ask("Test süresi (sn)", 60, int), None)
        load = dict(users=users, ramp_up=ramp_up, duration=duration, loops=loops,
                    think_time_ms=_ask("İstekler arası bekleme (ms)", 0, int),
                    target_rps=_ask("Hedef toplam RPS (sınırsız için boş)", None, float, allow_empty=True))

    print("\n[Adım: Başarı kriterleri]")
    codes = _ask("Başarılı sayılacak HTTP kodları (ör. 200,201 — boşsa 4xx/5xx hata sayılır)",
                 None, lambda s: [int(c) for c in s.split(",")], allow_empty=True)
    thresholds = {
        "max_error_pct": _ask("Kabul edilebilir maks. hata oranı %", 1.0, float),
        "p95_ms": _ask("İsteklerin %95'i en fazla kaç ms'de dönmeli? (yoksa boş)", None, float, allow_empty=True),
        "min_rps": _ask("Min. saniyedeki istek (RPS) (yoksa boş)", None, float, allow_empty=True),
    }

    print("\n[Adım: Test adı]")
    host = urlsplit(requests[0].url).hostname
    name = _ask("Test adı", f"{host} load test")

    return TestSpec(name=name, requests=requests, expected_status=codes, thresholds=thresholds, **load)


def _print_summary(spec: TestSpec) -> None:
    print()
    print(render_text(spec, [_LATENCY_MS.get(r.url) for r in spec.requests]))


def _print_result(r: dict) -> None:
    if r["status"] != "completed":
        print(f"\n✗ Hata: {r.get('error')}\n{r.get('output_tail', '')}")
        return
    t = r["total"]
    print(f"\n{'✓' if r['verdict'] == 'PASS' else '✗'} SONUÇ: {r['verdict']}   ({r['elapsed_s']} sn)")
    print(f"  İstek: {t['samples']}  Hata: %{t['error_pct']}  RPS: {t['rps']}")
    print(f"  Ort: {t['avg_ms']} ms  p90: {t['p90_ms']}  p95: {t['p95_ms']}  p99: {t['p99_ms']}")
    for c in r["threshold_checks"]:
        print(f"  {'✓' if c['passed'] else '✗'} {c['check']}: {c['actual']} (limit {c['limit']})")
    print("\n  İstek bazında:")
    for label, m in r["per_request"].items():
        print(f"    {label[:40]:40} n={m['samples']:<6} hata=%{m['error_pct']:<6} p95={m['p95_ms']} ms")
    print(f"\n  Rapor: {r['report_html']}")


def run_interactive(urls: list[str] | None = None) -> int:
    try:
        spec = build_spec_interactively(urls)
        _print_summary(spec)
        enforce_limits(spec)

        if _yes("Bu ayarlar JSON olarak kaydedilsin mi? (sonra --spec ile tekrar çalıştırmak için)"):
            path = Path(_ask("Dosya yolu", f"examples/{spec.name.replace(' ', '-').lower()}.json"))
            path.parent.mkdir(parents=True, exist_ok=True)
            path.write_text(json.dumps(spec.model_dump(exclude_none=True, exclude={"url"}), indent=2, ensure_ascii=False),
                            encoding="utf-8")
            print(f"    Kaydedildi: {path}")

        if not _yes("Test başlatılsın mı?", default=True):
            print("İptal edildi.")
            return 0
        print("\nTest çalışıyor, lütfen bekleyin...")
        result = run_test(spec)
    except (KeyboardInterrupt, EOFError):
        print("\nİptal edildi.")
        return 130
    except (ValidationError, ValueError, FileNotFoundError) as e:
        print(f"\n✗ {e}")
        return 2

    _print_result(result)
    if result["status"] == "completed" and _yes("HTML raporu tarayıcıda açılsın mı?", default=True):
        webbrowser.open(Path(result["report_html"]).as_uri())
    if result["status"] != "completed":
        return 2
    return 0 if result["verdict"] == "PASS" else 1
