"""Test spesifikasyonu: agent'ların gönderdiği JSON'un modeli ve doğrulaması."""
from __future__ import annotations

import fnmatch
import os
from typing import Optional
from urllib.parse import urlsplit

from pydantic import BaseModel, Field, field_validator, model_validator


class RequestSpec(BaseModel):
    url: str = Field(description="Hedef URL; şema yoksa https:// eklenir")
    method: str = Field("GET", description="GET, POST, PUT, PATCH, DELETE")
    label: Optional[str] = Field(None, description="Raporda görünecek isim")
    headers: dict[str, str] = Field(default_factory=dict, description="Bu isteğe özel header'lar")
    body: Optional[str] = Field(None, description="Ham request body (JSON ise string olarak)")
    expected_status: Optional[list[int]] = Field(None, description="Bu istek için başarılı sayılan HTTP kodları")

    @field_validator("url")
    @classmethod
    def _check_url(cls, v: str) -> str:
        v = v.strip()
        if "://" not in v:
            v = "https://" + v
        parts = urlsplit(v)
        if parts.scheme not in ("http", "https") or not parts.hostname:
            raise ValueError(f"Geçersiz URL: {v!r} (http/https olmalı)")
        return v

    @field_validator("method")
    @classmethod
    def _upper(cls, v: str) -> str:
        return v.upper()


class Thresholds(BaseModel):
    max_error_pct: Optional[float] = Field(1.0, description="İzin verilen maks. hata yüzdesi")
    p95_ms: Optional[float] = Field(None, description="İsteklerin %95'i için maks. yanıt süresi (ms)")
    p99_ms: Optional[float] = Field(None, description="İsteklerin %99'u için maks. yanıt süresi (ms)")
    avg_ms: Optional[float] = Field(None, description="Maks. ortalama yanıt süresi (ms)")
    min_rps: Optional[float] = Field(None, description="Min. toplam saniyedeki istek")


class TestSpec(BaseModel):
    name: str = Field("load-test", description="Test adı (rapor başlığı)")
    # Kısayol: tek URL için `url` (+ method/body), çok adım için `requests`
    url: Optional[str] = Field(None, description="Tek istekli test için kısayol; çok adım için `requests` kullan")
    method: str = Field("GET", description="`url` kısayolunun method'u")
    body: Optional[str] = Field(None, description="`url` kısayolunun body'si")
    requests: list[RequestSpec] = Field(default_factory=list, description="Senaryodaki istekler (sırayla)")

    users: int = Field(10, ge=1, description="Eşzamanlı sanal kullanıcı")
    ramp_up: int = Field(10, ge=0, description="Kullanıcıların kademeli devreye girme süresi (sn)")
    duration: Optional[int] = Field(60, ge=1, description="Test süresi (sn); loops verilirse yok sayılır")
    loops: Optional[int] = Field(None, ge=1, description="Süre yerine kullanıcı başına iterasyon")
    think_time_ms: int = Field(0, ge=0, description="Her istekten sonra bekleme (ms)")
    target_rps: Optional[float] = Field(None, gt=0, description="Toplam hedef istek/sn (hız sınırı)")
    timeout_ms: int = Field(30000, ge=1, description="Bağlantı/yanıt zaman aşımı (ms)")
    headers: dict[str, str] = Field(default_factory=dict, description="Tüm isteklere eklenen header'lar (ör. Authorization)")
    expected_status: Optional[list[int]] = Field(None, description="Başarılı sayılan HTTP kodları; yoksa 4xx/5xx hata")
    thresholds: Thresholds = Field(default_factory=Thresholds, description="PASS/FAIL kriterleri")

    @model_validator(mode="after")
    def _normalize(self) -> "TestSpec":
        if self.url:
            self.requests.insert(0, RequestSpec(url=self.url, method=self.method, body=self.body))
            self.url = self.body = None
        if not self.requests:
            raise ValueError("En az bir URL gerekli (`url` veya `requests`).")
        if self.loops:
            self.duration = None
        return self


def enforce_limits(spec: TestSpec) -> None:
    """Ortam değişkenleriyle tanımlanan kurumsal güvenlik limitlerini uygular."""
    max_users = int(os.getenv("JMETER_AGENT_MAX_USERS", "500"))
    max_duration = int(os.getenv("JMETER_AGENT_MAX_DURATION", "1800"))
    allowed = [h.strip().lower() for h in os.getenv("JMETER_AGENT_ALLOWED_HOSTS", "").split(",") if h.strip()]

    if spec.users > max_users:
        raise ValueError(f"users={spec.users} limit aşıyor (max {max_users}).")
    if spec.duration and spec.duration > max_duration:
        raise ValueError(f"duration={spec.duration}s limit aşıyor (max {max_duration}s).")
    if allowed:
        for r in spec.requests:
            host = urlsplit(r.url).hostname.lower()
            if not any(fnmatch.fnmatch(host, pat) for pat in allowed):
                raise ValueError(f"Host izinli değil: {host} (izinli: {', '.join(allowed)})")
