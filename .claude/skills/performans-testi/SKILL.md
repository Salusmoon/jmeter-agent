---
name: performans-testi
description: Bir URL'ye JMeter ile performans/yük testi yapar. Kullanıcı bir URL verip "performans testi", "yük testi", "load test" istediğinde kullan. URL alındıktan sonra eksik bilgileri adım adım, her mesajda tek soru sorarak toplar; sade bir onay tablosu gösterir, testi koşar ve sonucu raporlar.
argument-hint: <url> [yük seviyesi]
---

# Adım adım performans testi

Bu skill araçtan bağımsızdır; Claude Code, GitHub Copilot ve Agent Skills standardını destekleyen diğer agent'larda çalışır. Tüm işlemler proje kökünde çalıştırılan `python -m jmeter_agent ...` komutlarıyla yapılır. `curl` kullanma: Windows PowerShell'de `curl` farklı bir komutun takma adıdır ve JSON tırnakları bozulur.

> **jmeter MCP sunucusu bağlıysa** (ör. `probe_url`, `plan_load_test`, `start_load_test`, `get_load_test_status` araçları), aşağıdaki komutlar yerine bu araçları kullan:
> - `probe` yerine `probe_url`
> - `plan` yerine `plan_load_test` (spec'i dosya yerine parametre olarak ver)
> - testi çalıştırmak için `start_load_test`, ardından test bitene kadar `get_load_test_status`
>
> Adımlar ve kurallar aynıdır.

## Genel kurallar
- Kullanıcı URL'yi verince testi hemen başlatma. Aşağıdaki adımları sırayla izle.
- **Her mesajda yalnızca bir soru sor** ve cevabı bekle. Kullanıcı bir cevabı önceden vermişse (ör. "düşük yükte") o adımı atla.
- Seçenekli sorular için ortamında seçenek sunan bir soru aracı varsa onu kullan (ör. Claude Code'da `AskUserQuestion`). Yoksa seçenekleri numaralı liste olarak yaz ve önerileni "(Önerilen)" diye işaretle.
- Token ve şifre değerlerini cevaplarında tekrar etme; sadece spec dosyasına yaz. Sohbette `***` olarak göster.
- URL hiç verilmediyse ilk soru URL olsun.

## 0. Ön kontrol (soru yok)
```bash
python -m jmeter_agent probe <URL>
```
JSON çıktıdaki `status`, `ms` ve `hint` alanlarını kullanıcıya tek satırda özetle. `hint` alanı bir sonraki adımı yönlendirir:
- 404/405 → 1. adımda POST'u öner.
- 401/403 → 3. adımda token iste.
- `ok: false` → adrese ulaşılamadı demektir; kullanıcıdan URL'yi düzeltmesini iste.

## 1. Method
Seçenekler: GET / POST / PUT / DELETE. Ön kontrolde 404/405 geldiyse POST'u önerilen olarak ilk sıraya koy, aksi halde GET'i.

## 2. Body (sadece POST/PUT/PATCH/DELETE için)
Gönderilecek body'yi serbest metin olarak iste (JSON veya form).

## 3. Taslak spec ve kimlik doğrulama
Topladıklarınla `examples/<kısa-isim>.json` dosyasını oluştur. Biçim için [örnek spec](../../../examples/quickpizza-empty-excludes.json) dosyasına bak. Kurallar:
- Body JSON ise `"Content-Type": "application/json"` header'ını ekle.
- Yük ve kriter alanlarını şimdilik varsayılan bırak: `users` 5, `ramp_up` 10, `duration` 60, `think_time_ms` 1000, `thresholds.max_error_pct` 1.

Sonra spec'teki isteği gerçek method, header ve body ile dene:
```bash
python -m jmeter_agent probe --spec examples/<kısa-isim>.json
```
- 401/403 → `Authorization` değerini iste (ör. `Bearer xyz`, `token abc`). Spec'e ekle ve tekrar dene. Hâlâ reddediliyorsa kullanıcıya söyle ve yeniden iste.
- Başka bir 4xx/5xx → durumu açıkla; body'yi mi düzeltmek istiyor yoksa böyle mi devam edilsin, sor.
- 2xx → "Ek header gerekli mi?" diye sor: Hayır (Önerilen) / Evet.

## 4. Başka adım
"Senaryoya başka bir istek eklensin mi?" diye sor: Hayır, tek istek yeterli (Önerilen) / Evet. Evet derse yeni URL için 0–3. adımları tekrarla ve isteği spec'teki `requests` listesine ekle.

## 5. Yük seviyesi
Seçenekler:
- **Smoke**: 1 kullanıcı, 30 sn (`users` 1, `ramp_up` 0, `duration` 30, `think_time_ms` 1000)
- **Düşük (Önerilen)**: 5 kullanıcı, 60 sn (`users` 5, `ramp_up` 10, `duration` 60, `think_time_ms` 1000)
- **Orta**: 25 kullanıcı, 3 dk (`users` 25, `ramp_up` 30, `duration` 180, `think_time_ms` 500)
- **Yüksek**: 100 kullanıcı, 5 dk (`users` 100, `ramp_up` 60, `duration` 300, `think_time_ms` 0)

Kullanıcı özel bir değer isterse kullanıcı sayısını ve süreyi ayrı ayrı sor. Hedef herkese açık, ortak kullanılan bir demo servisse (quickpizza, blazedemo, dummyjson vb.) Orta ve Yüksek seviyelerin başkalarını etkileyeceğini belirt.

## 6. Başarı kriterleri
"p95 yanıt süresi limiti ne olsun?" diye sor: 500 ms / 1000 ms / 1500 ms (Önerilen) / Limit yok. Hata oranı limiti, kullanıcı başka bir değer söylemedikçe %1'dir. Beklenen HTTP kodunu ön kontrolde gelen başarılı koddan al (ör. `[200]`).

## 7. Onay
Spec'i son haline getir ve onay tablosunu üret:
```bash
python -m jmeter_agent plan --spec examples/<kısa-isim>.json
```
Komutun Markdown çıktısını **olduğu gibi** kullanıcıya göster. Çıktı iki tablodan oluşur: sade dille test planı (tahmini istek sayısı dahil) ve başarı kriterlerinin anlamı. Token zaten gizlenmiş olarak gelir. Hedef ortak kullanılan bir demo servisse tablonun altına tek satırlık bir not ekle.

Ardından "Test başlatılsın mı?" diye sor: Evet, başlat (Önerilen) / Ayarları değiştir.

## 8. Çalıştır
```bash
python -m jmeter_agent --spec examples/<kısa-isim>.json
```
Test, spec'teki süre kadar (+ birkaç saniye) sürer. Komutu, süre dolmadan zaman aşımına uğramayacak şekilde çalıştır. Çıkış kodları: 0 = PASS, 1 = FAIL (eşik aşıldı), 2 = hata.

## 9. Raporla
JSON çıktıdan:
- Sonucu (`verdict`: PASS/FAIL) ve bir tabloyu göster: istek/hata sayısı, RPS, ortalama, p50, p90, p95, p99.
- `threshold_checks` içindeki her kontrolü, limiti ve gerçekleşen değeri yaz. 2–3 cümlelik bir yorum ekle.
- `report_html` yolunu tıklanabilir link olarak ver. Ortamında tarayıcı/önizleme aracı varsa raporu onunla aç.
- Aynı testi tekrar koşmak için `python -m jmeter_agent --spec examples/<kısa-isim>.json` komutunu ver.
- `status` "error" ise `error` ve `output_tail` alanlarını özetle. JMeter bulunamadıysa README'deki kurulum adımlarını göster.
