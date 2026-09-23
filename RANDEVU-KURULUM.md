# Randevu Sistemi — Kurulum

Kod tarafı hazır ve yayında. Randevuların doktora ulaşması için aşağıdaki
iki panel ayarı bir kez yapılmalıdır. Bunlar yapılmadan sistem hastaya
**"Lütfen bizi arayın"** uyarısı gösterir (sahte "gönderildi" demez).

---

## 1. E-posta bildirimi — Vercel ortam değişkenleri

Vercel → proje → **Settings → Environment Variables** → her biri için
*Production, Preview, Development* seçili olacak şekilde ekle:

| Değişken | Örnek | Not |
|---|---|---|
| `SMTP_HOST` | `smtp.gmail.com` | Gmail, Yandex veya hosting sağlayıcının SMTP'si |
| `SMTP_PORT` | `587` | 465 kullanılırsa SSL otomatik açılır |
| `SMTP_USER` | `info@basricakiroglu.com.tr` | Gönderen hesabın kullanıcı adı |
| `SMTP_PASS` | `••••••••` | **Gmail'de normal şifre DEĞİL** — aşağıya bak |
| `SMTP_FROM` | `Randevu <info@basricakiroglu.com.tr>` | İsteğe bağlı; boşsa `SMTP_USER` |
| `APPOINTMENT_TO` | `drbasri@gmail.com, info@basricakiroglu.com.tr` | İsteğe bağlı; boşsa koddaki üç adres |

**Gmail kullanılacaksa:** Google Hesabı → Güvenlik → 2 Adımlı Doğrulama'yı aç →
**Uygulama Şifreleri**'nden 16 haneli bir şifre üret ve `SMTP_PASS` olarak gir.
Normal hesap şifresi çalışmaz.

Değişkenleri ekledikten sonra Vercel'de **Redeploy** yap (env'ler yalnızca
yeni dağıtımda etkinleşir).

### Test
```bash
curl -X POST https://www.basricakiroglu.com.tr/api/appointments \
  -H "Content-Type: application/json" \
  -d '{"fullName":"Kurulum Testi","phone":"5551234567","preferredDate":"2026-10-01","preferredTime":"10:00"}'
```
- `{"ok":true,"emailSent":true}` → kurulum tamam, gelen kutusunu kontrol et
- `{"error":"smtp_not_configured"}` → değişkenler eksik veya redeploy yapılmadı
- `{"error":"mail_failed"}` → kullanıcı adı/şifre/port hatalı (Vercel → Logs'a bak)

---

## 2. Hekim girişi — Firebase Authentication

Randevuların panelden görülebilmesi için gerçek kimlik doğrulama gerekir.
(Eski giriş, sayfa kaynağında açıkça görünen bir şifreydi ve Firestore
tarafında karşılığı yoktu; bu yüzden randevu okuması kapalıydı.)

1. [Firebase Console](https://console.firebase.google.com) → proje
   `gen-lang-client-0824204549`
2. **Authentication → Sign-in method → Email/Password → Enable**
3. **Authentication → Users → Add user**
   - E-posta: doktorun veya kliniğin adresi
   - Şifre: güçlü, yeni bir şifre (eski `542582` KULLANILMAMALI — yıllardır
     herkese açıktı)
4. **Firestore → Rules**: repodaki `firestore.rules` içeriğini yapıştır → **Publish**

Giriş: sitenin altındaki **Hekim Girişi** → artık kullanıcı adı yerine
**e-posta** ve yeni şifre.

---

## Sistem nasıl çalışıyor?

Hasta formu gönderdiğinde iki kanal birden devreye girer:

1. **Firestore'a kayıt** — talep hiçbir koşulda kaybolmaz; doktor giriş
   yapınca panelden görür.
2. **E-posta bildirimi** (`/api/appointments`) — SMTP kuruluysa anında
   gider, `replyTo` hastanın adresidir (doğrudan yanıtlanabilir).

E-posta gönderilemezse hastaya bunu açıkça söyleyen bir ekran ve telefon /
WhatsApp bağlantısı gösterilir.

**Spam koruması:** görünmez `company` alanı (bot tuzağı), alan doğrulama ve
uzunluk sınırları. Telefon en az 9 rakam olmalıdır.
