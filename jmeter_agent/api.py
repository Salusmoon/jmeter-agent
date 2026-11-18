"""REST API — agent platformları OpenAPI şemasından (/openapi.json) tool olarak ekleyebilir.

Çalıştır:  uvicorn jmeter_agent.api:app --host 0.0.0.0 --port 8080
"""
from __future__ import annotations

import json
import threading
from concurrent.futures import ThreadPoolExecutor

from fastapi import FastAPI, HTTPException, Query
from fastapi.staticfiles import StaticFiles

from .runner import RUNS_DIR, new_run_id, run_test
from .spec import TestSpec, enforce_limits

RUNS_DIR.mkdir(parents=True, exist_ok=True)

app = FastAPI(
    title="JMeter Agent",
    version="1.0.0",
    description="Dinamik URL ile JMeter performans testi çalıştırır; HTML dashboard ve JSON özet döner.",
)
app.mount("/reports", StaticFiles(directory=RUNS_DIR, html=True), name="reports")

_executor = ThreadPoolExecutor(max_workers=1)  # aynı anda tek test: ölçümler birbirini bozmasın
_lock = threading.Lock()
_jobs: dict[str, dict] = {}


def _with_links(run_id: str, result: dict) -> dict:
    if result.get("status") == "completed":
        result["report_url"] = f"/reports/{run_id}/report/index.html"
    return result


def _execute(run_id: str, spec: TestSpec) -> None:
    with _lock:
        _jobs[run_id] = {"run_id": run_id, "status": "running"}
    try:
        result = run_test(spec, run_id=run_id)
    except Exception as e:  # noqa: BLE001 — hata job durumuna yansısın
        result = {"run_id": run_id, "status": "error", "error": str(e)}
    with _lock:
        _jobs[run_id] = _with_links(run_id, result)


@app.get("/health")
def health() -> dict:
    return {"status": "ok"}


@app.post("/runs", summary="Performans testi başlat")
def start_run(spec: TestSpec, wait: bool = Query(False, description="true ise test bitene kadar bekler")) -> dict:
    try:
        enforce_limits(spec)
    except ValueError as e:
        raise HTTPException(400, str(e))
    run_id = new_run_id(spec)
    with _lock:
        _jobs[run_id] = {"run_id": run_id, "status": "queued"}
    future = _executor.submit(_execute, run_id, spec)
    if wait:
        future.result()
    return get_run(run_id)


@app.get("/runs/{run_id}", summary="Test durumu ve sonucu")
def get_run(run_id: str) -> dict:
    with _lock:
        if run_id in _jobs:
            return _jobs[run_id]
    summary = RUNS_DIR / run_id / "summary.json"
    if summary.exists():
        return _with_links(run_id, json.loads(summary.read_text(encoding="utf-8")))
    raise HTTPException(404, "run bulunamadı")


@app.get("/runs", summary="Son testler")
def list_runs(limit: int = 20) -> list[dict]:
    out = []
    for d in sorted(RUNS_DIR.iterdir(), reverse=True)[:limit]:
        s = d / "summary.json"
        if s.exists():
            r = json.loads(s.read_text(encoding="utf-8"))
            out.append({k: r.get(k) for k in ("run_id", "name", "status", "verdict")})
    return out
