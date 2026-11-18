# JMeter Agent

Dinamik URL ve parametrelerle JMeter performans testi çalıştırır. Sonuçları iki şekilde verir:
- **JMeter HTML dashboard** (insanlar için)
- **`summary.json`** (agent'lar için): PASS/FAIL, p50/p90/p95/p99, hata %, RPS

Agent platformları (TARS vb.) üç yoldan bağlanabilir: **REST API (OpenAPI)**, **MCP** veya **CLI**.

```
spec (JSON) ──► plan.jmx üret ──► jmeter -n ──► results.jtl ──► report/index.html
                                                              └► summary.json (verdict)
```

## Kurulum

```bash
pip install -r requirements.txt
powershell -File scripts/install_jmeter.ps1     # veya JMETER_HOME ayarla
```
Java 8+ gerekir. Docker ile çalıştırırsan JMeter image'ın içinde gelir:
```bash
docker build -t jmeter-agent .
docker run -p 8080:8080 -v ./runs:/data/runs -e JMETER_AGENT_ALLOWED_HOSTS="*.sirket.com" jmeter-agent
```

## Kullanım

### Etkileşimli mod (adım adım)
```bash
python -m jmeter_agent --url https://quickpizza.grafana.com/api/pizza
python -m jmeter_agent          # URL'yi de sorar
```
URL alındıktan sonra adrese bir deneme isteği atar ve sonraki soruları sonuca göre şekillendirir:
- 404/405 dönerse farklı bir method (POST) önerir.
- 401/403 dönerse token ister ve token'ı doğrular.

Sorular sırasıyla: method, body, header'lar, ek senaryo adımları, yük seviyesi (Smoke/Düşük/Orta/Yüksek/Özel), başarı kriterleri, test adı. Ardından:
- Ayarları istersen JSON olarak kaydeder (sonra `--spec` ile tekrar çalıştırılabilir).
- Testi koşar, sonucu tablo olarak gösterir ve HTML raporu tarayıcıda açar.

URL dışında bir parametre verildiğinde ya da agent/pipeline içinden (terminal olmadan) çağrıldığında soru sormaz. `-i` ile etkileşimli mod her zaman açılır.

### AI agent ile sohbetten (Claude Code, GitHub Copilot)
`.claude/skills/performans-testi/SKILL.md`, açık **Agent Skills** standardında yazılmış bir skill. Aynı dosyayı iki araç da okur:

| Araç | Nasıl çağrılır |
|---|---|
| Claude Code | "şu URL'ye performans testi yap" ya da `/performans-testi <url>` |
| GitHub Copilot (VS Code agent modu, Copilot CLI, cloud agent) | `/performans-testi <url>` ya da doğal dille. Copilot `.claude/skills/` klasörünü de okur |

Skill sadece `python -m jmeter_agent` komutlarını kullanır. `curl`'e ya da araca özel bir özelliğe bağlı değildir. Agent'ların kullandığı yardımcı komutlar:

```bash
python -m jmeter_agent probe <url>                 # tek deneme isteği → JSON (status, ms, hint)
python -m jmeter_agent probe --spec x.json         # spec'teki istekleri header/body ile dener
python -m jmeter_agent plan --spec x.json          # sade dilli onay tablosu (Markdown; --format text)
```

### CLI
```bash
python -m jmeter_agent --url https://staging.sirket.com/api/health --users 50 --duration 120 --p95-ms 500
python -m jmeter_agent --spec examples/api-scenario.json
python -m jmeter_agent --url https://x/api -X POST -H "Content-Type: application/json" -d "{\"a\":1}" --dry-run
```
Exit code: `0` PASS, `1` FAIL (eşik aşıldı), `2` hata. Bu yüzden CI pipeline'larında da kullanılabilir.

### REST API
```bash
uvicorn jmeter_agent.api:app --host 0.0.0.0 --port 8080
```
| Endpoint | Açıklama |
|---|---|
| `POST /runs` | Test başlatır (body = spec). `?wait=true` verilirse test bitince sonucu döner |
| `GET /runs/{run_id}` | Durumu döner: `queued`, `running`, `completed` veya `error`. Bittiyse özeti de döner |
| `GET /runs` | Son testleri listeler |
| `GET /reports/{run_id}/report/index.html` | HTML dashboard |
| `GET /openapi.json` | Agent platformuna tool olarak eklemek için şema |

Testler sırayla çalışır (aynı anda tek test). Böylece testler birbirinin ölçümünü bozmaz.

### MCP sunucusu (JMeter MCP)
```bash
python -m jmeter_agent.mcp_server                                  # stdio
python -m jmeter_agent.mcp_server --http --host 0.0.0.0 --port 8090   # http://host:8090/mcp
```

| Tool | Ne yapar |
|---|---|
| `probe_url` | Tek bir deneme isteği atar ve sonraki adım için ipucu verir (404/405 → POST dene, 401/403 → token iste) |
| `plan_load_test` | Testi çalıştırmadan doğrular. Sade dilli onay tablosunu (Markdown) ve tahmini istek sayısını döner |
| `start_load_test` | Testi arka planda başlatır ve hemen `run_id` döner. Uzun testler için önerilen yol budur |
| `get_load_test_status` | Durumu döner: kuyrukta / çalışıyor (kalan süre tahminiyle) / bitti (tam özet ve rapor linkiyle) |
| `run_load_test` | Testi çalıştırıp bitmesini bekler. Sadece kısa testler (≤ 60 sn) için |
| `list_load_tests` | Son testleri PASS/FAIL sonuçlarıyla listeler |
| `export_jmx` | Test planını `.jmx` dosyası olarak `plans/` klasörüne kaydeder. Dosya JMeter GUI'de açılabilir veya CI'da kullanılabilir |

Ayrıca:
- **Prompt:** `performans-testi`. VS Code'da `/mcp.jmeter.performans-testi` olarak görünür.
- **Sunucu talimatları:** Adım adım soru sorma akışını içerir. Böylece skill desteği olmayan istemciler de (ör. TARS) aynı akışı izler.
- **Token gizleme:** Token değerleri tool yanıtlarında `***` olarak gizlenir.

**Bağlantı ayarları** (repoda hazır):

| İstemci | Dosya |
|---|---|
| GitHub Copilot (VS Code) | `.vscode/mcp.json`. VS Code'da Copilot Chat'i agent modunda açıp tool listesinde "jmeter"i seç |
| Claude Code | `.mcp.json`. İlk açılışta sunucuyu onaylaman istenir |
| Diğer / uzak (TARS vb.) | `--http` ile başlat ve istemciye `http://<sunucu>:8090/mcp` adresini ver. Docker için: `docker run -p 8090:8090 jmeter-agent python -m jmeter_agent.mcp_server --http --host 0.0.0.0` |

## Spec alanları

| Alan | Varsayılan | Açıklama |
|---|---|---|
| `url` / `requests[]` | — | Tek URL ya da çok adımlı senaryo. Her adımda `url, method, headers, body, label, expected_status` verilebilir |
| `users` | 10 | Eşzamanlı sanal kullanıcı |
| `ramp_up` | 10 | Tüm kullanıcıların devreye girme süresi (sn) |
| `duration` | 60 | Test süresi (sn) |
| `loops` | — | Süre yerine kullanıcı başına iterasyon sayısı |
| `think_time_ms` | 0 | İstekler arası bekleme |
| `target_rps` | — | Toplam hedef istek/sn (throughput sınırı) |
| `timeout_ms` | 30000 | Bağlantı ve yanıt zaman aşımı |
| `headers` | {} | Tüm isteklere eklenen header'lar (ör. `Authorization`) |
| `expected_status` | — | Ör. `[200, 201]`. Verilmezse 4xx/5xx yanıtlar hata sayılır |
| `thresholds` | `max_error_pct: 1` | `max_error_pct, p95_ms, p99_ms, avg_ms, min_rps` |

Örnek: [examples/api-scenario.json](examples/api-scenario.json)

## Güvenlik limitleri (ortam değişkenleri)

| Değişken | Varsayılan | |
|---|---|---|
| `JMETER_AGENT_ALLOWED_HOSTS` | (boş = hepsi) | Ör. `*.sirket.com,localhost`. **Production'da mutlaka ayarlayın** |
| `JMETER_AGENT_MAX_USERS` | 500 | |
| `JMETER_AGENT_MAX_DURATION` | 1800 | sn |
| `JMETER_AGENT_RUNS_DIR` | `./runs` | Sonuçların yazıldığı klasör |

## Çıktı klasörü
`runs/<tarih>-<isim>/` içinde şu dosyalar oluşur: `spec.json`, `plan.jmx` (JMeter GUI'de açılabilir), `results.jtl`, `jmeter.log`, `report/index.html` ve `summary.json`.
