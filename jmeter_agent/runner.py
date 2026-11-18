"""JMeter'i non-GUI modda çalıştırır, HTML dashboard ve summary.json üretir."""
from __future__ import annotations

import glob
import json
import os
import re
import shutil
import subprocess
import time
from datetime import datetime
from pathlib import Path

from .jmx import build_jmx
from .spec import TestSpec, enforce_limits

PROJECT_ROOT = Path(__file__).resolve().parent.parent
RUNS_DIR = Path(os.getenv("JMETER_AGENT_RUNS_DIR", PROJECT_ROOT / "runs"))


def find_jmeter() -> str:
    exe = "jmeter.bat" if os.name == "nt" else "jmeter"
    candidates = []
    if os.getenv("JMETER_HOME"):
        candidates.append(Path(os.environ["JMETER_HOME"]) / "bin" / exe)
    for pattern in ("tools/*jmeter*", "*jmeter*", "tools/*jmeter*/*jmeter*", "*jmeter*/*jmeter*"):
        candidates += [Path(p) / "bin" / exe for p in sorted(glob.glob(str(PROJECT_ROOT / pattern)), reverse=True)]
    for c in candidates:
        if c.exists():
            return str(c)
    found = shutil.which(exe) or shutil.which("jmeter")
    if found:
        return found
    raise FileNotFoundError(
        "JMeter bulunamadı. JMETER_HOME ayarlayın, PATH'e ekleyin veya scripts/install_jmeter.ps1 çalıştırın."
    )


def new_run_id(spec: TestSpec) -> str:
    slug = re.sub(r"[^a-zA-Z0-9]+", "-", spec.name).strip("-").lower()[:40] or "run"
    return f"{datetime.now():%Y%m%d-%H%M%S}-{slug}"


def run_test(spec: TestSpec, run_id: str | None = None) -> dict:
    enforce_limits(spec)
    run_id = run_id or new_run_id(spec)
    run_dir = RUNS_DIR / run_id
    run_dir.mkdir(parents=True, exist_ok=True)

    (run_dir / "spec.json").write_text(spec.model_dump_json(indent=2), encoding="utf-8")
    plan = run_dir / "plan.jmx"
    plan.write_text(build_jmx(spec), encoding="utf-8")
    jtl, report, log = run_dir / "results.jtl", run_dir / "report", run_dir / "jmeter.log"

    jmeter = find_jmeter()  # bulunamazsa "running" durumunda takılı kalmasın diye önce kontrol et
    (run_dir / "status.json").write_text(json.dumps({
        "run_id": run_id, "name": spec.name, "status": "running", "started_at": time.time(),
        "expected_duration_s": spec.duration,
    }), encoding="utf-8")

    cmd = [
        jmeter, "-n", "-t", str(plan), "-l", str(jtl), "-j", str(log),
        "-e", "-o", str(report),
        "-Jjmeter.save.saveservice.output_format=csv",
        f"-Jjmeter.reportgenerator.report_title={spec.name}",
    ]
    started = time.time()
    proc = subprocess.run(cmd, capture_output=True, text=True, encoding="utf-8", errors="replace")
    elapsed = round(time.time() - started, 1)
    (run_dir / "jmeter.stdout.txt").write_text(proc.stdout + "\n" + proc.stderr, encoding="utf-8")

    stats_file = report / "statistics.json"
    if proc.returncode != 0 or not stats_file.exists():
        result = {
            "run_id": run_id, "status": "error", "elapsed_s": elapsed,
            "error": f"JMeter başarısız (exit {proc.returncode}). Ayrıntı: {log}",
            "output_tail": (proc.stdout + proc.stderr)[-2000:],
            "run_dir": str(run_dir),
        }
    else:
        result = summarize(spec, json.loads(stats_file.read_text(encoding="utf-8")))
        result.update(run_id=run_id, status="completed", elapsed_s=elapsed, run_dir=str(run_dir),
                      report_html=str(report / "index.html"))

    (run_dir / "summary.json").write_text(json.dumps(result, indent=2, ensure_ascii=False), encoding="utf-8")
    (run_dir / "status.json").unlink(missing_ok=True)
    return result


def get_run_status(run_id: str) -> dict | None:
    """Diskteki duruma göre testin sonucunu ya da ilerlemesini döner (süreçler arası çalışır)."""
    run_dir = RUNS_DIR / run_id
    if (run_dir / "summary.json").exists():
        return json.loads((run_dir / "summary.json").read_text(encoding="utf-8"))
    if (run_dir / "status.json").exists():
        st = json.loads((run_dir / "status.json").read_text(encoding="utf-8"))
        elapsed = round(time.time() - st["started_at"])
        st["elapsed_s"] = elapsed
        if st.get("expected_duration_s"):
            # +~10 sn rapor üretimi
            st["remaining_s_estimate"] = max(st["expected_duration_s"] + 10 - elapsed, 0)
        return st
    return None


def list_runs(limit: int = 20) -> list[dict]:
    out = []
    if not RUNS_DIR.exists():
        return out
    for d in sorted((p for p in RUNS_DIR.iterdir() if p.is_dir()), reverse=True)[:limit]:
        st = get_run_status(d.name)
        if st:
            out.append({k: st.get(k) for k in ("run_id", "name", "status", "verdict")} | {"run_id": d.name})
    return out


def _metrics(s: dict) -> dict:
    return {
        "samples": s["sampleCount"],
        "errors": s["errorCount"],
        "error_pct": round(s["errorPct"], 2),
        "avg_ms": round(s["meanResTime"], 1),
        "min_ms": s["minResTime"],
        "max_ms": s["maxResTime"],
        "p50_ms": round(s["medianResTime"], 1),
        "p90_ms": round(s["pct1ResTime"], 1),
        "p95_ms": round(s["pct2ResTime"], 1),
        "p99_ms": round(s["pct3ResTime"], 1),
        "rps": round(s["throughput"], 2),
        "received_kb_s": round(s["receivedKBytesPerSec"], 2),
    }


def summarize(spec: TestSpec, stats: dict) -> dict:
    total = _metrics(stats["Total"])
    per_request = {label: _metrics(s) for label, s in stats.items() if label != "Total"}

    t = spec.thresholds
    checks = []
    for name, actual, limit, ok in [
        ("max_error_pct", total["error_pct"], t.max_error_pct, lambda a, l: a <= l),
        ("p95_ms", total["p95_ms"], t.p95_ms, lambda a, l: a <= l),
        ("p99_ms", total["p99_ms"], t.p99_ms, lambda a, l: a <= l),
        ("avg_ms", total["avg_ms"], t.avg_ms, lambda a, l: a <= l),
        ("min_rps", total["rps"], t.min_rps, lambda a, l: a >= l),
    ]:
        if limit is not None:
            checks.append({"check": name, "limit": limit, "actual": actual, "passed": ok(actual, limit)})

    return {
        "name": spec.name,
        "verdict": "PASS" if all(c["passed"] for c in checks) else "FAIL",
        "load": {"users": spec.users, "ramp_up_s": spec.ramp_up, "duration_s": spec.duration, "loops": spec.loops},
        "total": total,
        "threshold_checks": checks,
        "per_request": per_request,
    }
