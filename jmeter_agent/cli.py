"""Komut satırı: sonucu stdout'a JSON olarak basar (agent'lar doğrudan okuyabilir).

Örnekler:
  python -m jmeter_agent                      # parametreleri tek tek sorar
  python -m jmeter_agent --url https://example.com --users 20 --duration 60
  python -m jmeter_agent --spec examples/api.json
  python -m jmeter_agent --url https://x/api -X POST -H "Content-Type: application/json" -d '{"a":1}' --dry-run

Agent yardımcı komutları (soru sormaz, terminal/araç bağımsız):
  python -m jmeter_agent probe https://x/api            # tek deneme isteği, JSON sonuç
  python -m jmeter_agent probe --spec examples/x.json   # spec'teki her isteği header/body ile dener
  python -m jmeter_agent plan --spec examples/x.json    # onay tablosu (Markdown), tahmini istek dahil
"""
from __future__ import annotations

import argparse
import json
import sys

from pydantic import ValidationError

from .jmx import build_jmx
from .plan import probe_spec, render_markdown, render_text
from .runner import run_test
from .spec import TestSpec, enforce_limits


COMMANDS = ("run", "probe", "plan")


def main(argv: list[str] | None = None) -> int:
    # Türkçe karakterler Windows konsolunda/pipe'ta bozulmasın
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")

    argv = list(sys.argv[1:] if argv is None else argv)
    command = argv.pop(0) if argv and argv[0] in COMMANDS else "run"
    if command != "run" and argv and not argv[0].startswith("-"):
        argv[0:1] = ["--url", argv[0]]  # `probe <url>` kısayolu

    p = argparse.ArgumentParser(prog="jmeter_agent", description="JMeter performans testi çalıştırıcı")
    p.add_argument("--spec", help="JSON spec dosyası (diğer argümanlar bunu ezer)")
    p.add_argument("--url", action="append", help="hedef URL (birden fazla verilebilir)")
    p.add_argument("--name")
    p.add_argument("-X", "--method")
    p.add_argument("-H", "--header", action="append", default=[], help='"Ad: Değer"')
    p.add_argument("-d", "--body")
    p.add_argument("--users", type=int)
    p.add_argument("--ramp-up", type=int)
    p.add_argument("--duration", type=int)
    p.add_argument("--loops", type=int)
    p.add_argument("--think-time-ms", type=int)
    p.add_argument("--target-rps", type=float)
    p.add_argument("--timeout-ms", type=int)
    p.add_argument("--max-error-pct", type=float)
    p.add_argument("--p95-ms", type=float)
    p.add_argument("--dry-run", action="store_true", help="sadece JMX üret ve yazdır")
    p.add_argument("-i", "--interactive", action="store_true", help="parametreleri sorarak çalış")
    p.add_argument("--format", choices=("md", "text"), default="md", help="plan çıktısı biçimi")
    a = p.parse_args(argv)

    # Sadece URL verildiyse (veya hiç parametre yoksa) eksikleri adım adım sor.
    # Agent/pipeline çağrılarında (TTY yok) asla sorma.
    only_url = not any(v for k, v in vars(a).items() if k not in ("url", "interactive", "format"))
    if command == "run" and (a.interactive or (only_url and sys.stdin.isatty())):
        from .interactive import run_interactive
        return run_interactive(a.url)

    data: dict = {}
    if a.spec:
        with open(a.spec, encoding="utf-8") as f:
            data = json.load(f)

    if a.url:
        reqs = [{"url": u, "method": a.method or "GET", "body": a.body} for u in a.url]
        data["requests"] = reqs + data.get("requests", [])
    for key in ("name", "users", "ramp_up", "duration", "loops", "think_time_ms", "target_rps", "timeout_ms"):
        val = getattr(a, key)
        if val is not None:
            data[key] = val
    if a.header:
        data.setdefault("headers", {}).update(dict(h.split(":", 1) for h in a.header))
        data["headers"] = {k.strip(): v.strip() for k, v in data["headers"].items()}
    if a.max_error_pct is not None or a.p95_ms is not None:
        th = data.setdefault("thresholds", {})
        if a.max_error_pct is not None:
            th["max_error_pct"] = a.max_error_pct
        if a.p95_ms is not None:
            th["p95_ms"] = a.p95_ms

    try:
        spec = TestSpec(**data)
        if command == "probe":
            results = probe_spec(spec)
            print(json.dumps(results, ensure_ascii=False, indent=2))
            return 0 if all(r.get("ok") and r["status"] < 400 for r in results) else 1
        if command == "plan":
            enforce_limits(spec)
            # İlk istek bağlantı kurulumunu da içerir; JMeter keep-alive kullandığı için en hızlı ölçümü al
            runs = [probe_spec(spec) for _ in range(3)]
            latencies = [min((r["ms"] for r in rs if r.get("ok") and r["status"] < 400), default=None)
                         for rs in zip(*runs)]
            print((render_markdown if a.format == "md" else render_text)(spec, latencies))
            return 0
        if a.dry_run:
            enforce_limits(spec)
            print(build_jmx(spec))
            return 0
        result = run_test(spec)
    except (ValidationError, ValueError, FileNotFoundError) as e:
        print(json.dumps({"status": "error", "error": str(e)}, ensure_ascii=False, indent=2))
        return 2

    print(json.dumps(result, ensure_ascii=False, indent=2))
    if result["status"] != "completed":
        return 2
    return 0 if result["verdict"] == "PASS" else 1


if __name__ == "__main__":
    sys.exit(main())
