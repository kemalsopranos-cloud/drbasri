import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

// ---------------------------------------------------------------------------
// Randevu bildirimi — Vercel Serverless Function.
//
// NEDEN: Bu uç nokta server.ts içinde tanımlıydı ve site Vercel'de STATİK
// yayınlandığı için hiç çalışmıyordu; /api/appointments canlıda 404 dönüyordu
// (ölçüldü, 23 Eyl 2026). Sonuç: hasta formu dolduruyor, Firestore'a kayıt
// düşüyor ama KİMSEYE haber gitmiyordu.
//
// Artık api/ klasöründeki bu dosyayı Vercel kendi başına derleyip sunar;
// server.ts yalnızca yerel geliştirme içindir.
//
// GEREKLİ ORTAM DEĞİŞKENLERİ (Vercel → Settings → Environment Variables):
//   SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS   — zorunlu
//   SMTP_FROM        — isteğe bağlı (varsayılan: SMTP_USER)
//   APPOINTMENT_TO   — isteğe bağlı, virgülle ayrık (varsayılan: aşağıdaki liste)
// Bunlar tanımlı değilse uç nokta 503 döner ve arayüz hastaya "telefonla
// ulaşın" uyarısı gösterir — sessizce "başarılı" DEMEZ.
// ---------------------------------------------------------------------------

const DEFAULT_RECIPIENTS = [
  'drbasri@gmail.com',
  'info@basricakiroglu.com.tr',
  'bcakiroglu@hisarhospital.com',
];

interface AppointmentPayload {
  id?: string;
  fullName?: string;
  phone?: string;
  email?: string;
  preferredDate?: string;
  preferredTime?: string;
  topicId?: string;
  notes?: string;
  createdAt?: string;
  /** Bot tuzağı: gerçek kullanıcı bu alanı görmez ve doldurmaz. */
  company?: string;
}

function escapeHtml(value: unknown): string {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/** Başlık enjeksiyonunu önler: satır sonu karakterleri temizlenir. */
function safeHeader(value: string): string {
  return value.replace(/[\r\n]+/g, ' ').slice(0, 120);
}

function clamp(value: unknown, max: number): string {
  return String(value ?? '').trim().slice(0, max);
}

function buildMailHtml(a: Required<Pick<AppointmentPayload, 'fullName' | 'phone'>> & AppointmentPayload): string {
  const row = (label: string, value: string, highlight = false) => `
    <tr>
      <td style="padding:10px;font-weight:bold;width:170px;border-bottom:1px solid #eeeeee;">${label}</td>
      <td style="padding:10px;border-bottom:1px solid #eeeeee;${highlight ? 'color:#c5a880;font-weight:bold;' : ''}">${value}</td>
    </tr>`;

  return `
  <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px;border:1px solid #e0e0e0;border-radius:8px;background:#ffffff;color:#333333;">
    <h2 style="color:#0b1a30;border-bottom:2px solid #c5a880;padding-bottom:10px;margin-top:0;">Yeni Randevu Talebi</h2>
    <p style="font-size:14px;line-height:1.5;color:#555555;">Web siteniz üzerinden yeni bir randevu talebi oluşturuldu:</p>
    <table style="width:100%;border-collapse:collapse;margin-top:15px;font-size:14px;">
      ${row('Ad Soyad', escapeHtml(a.fullName))}
      ${row('Telefon', `<a href="tel:${escapeHtml(a.phone)}" style="color:#0b1a30;font-weight:bold;text-decoration:none;">${escapeHtml(a.phone)}</a>`)}
      ${row('E-posta', a.email ? `<a href="mailto:${escapeHtml(a.email)}" style="color:#0b1a30;text-decoration:none;">${escapeHtml(a.email)}</a>` : '—')}
      ${row('Tercih Edilen Tarih', escapeHtml(a.preferredDate) || '—', true)}
      ${row('Tercih Edilen Saat', escapeHtml(a.preferredTime) || '—', true)}
      ${row('Uzmanlık / Konu', escapeHtml(a.topicId) || '—')}
      ${row('Notlar', a.notes ? escapeHtml(a.notes) : 'Not belirtilmemiş.')}
      ${row('Talep Tarihi', escapeHtml(a.createdAt || new Date().toISOString()))}
    </table>
    <div style="margin-top:25px;padding-top:15px;border-top:1px solid #e0e0e0;font-size:11px;color:#888888;text-align:center;">
      Bu e-posta basricakiroglu.com.tr randevu sistemi tarafından otomatik oluşturulmuştur.
    </div>
  </div>`;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'method_not_allowed' });
  }

  const body: AppointmentPayload =
    typeof req.body === 'string' ? safeParse(req.body) : (req.body as AppointmentPayload) || {};

  // Bot tuzağı doldurulmuşsa sessizce başarılı dön (spam'e ipucu verme)
  if (body.company) return res.status(200).json({ ok: true, emailSent: false, spam: true });

  const fullName = clamp(body.fullName, 120);
  const phone = clamp(body.phone, 40);
  if (!fullName || phone.replace(/\D/g, '').length < 9) {
    return res.status(400).json({ ok: false, error: 'invalid_payload' });
  }

  const appointment = {
    fullName,
    phone,
    email: clamp(body.email, 160),
    preferredDate: clamp(body.preferredDate, 40),
    preferredTime: clamp(body.preferredTime, 40),
    topicId: clamp(body.topicId, 80),
    notes: clamp(body.notes, 2000),
    createdAt: clamp(body.createdAt, 40) || new Date().toISOString(),
  };

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM, APPOINTMENT_TO } = process.env;

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    // Yapılandırma eksik: hastaya YANLIŞ bir "gönderildi" mesajı gösterilmemeli.
    console.error('[appointments] SMTP yapılandırılmamış — e-posta gönderilemedi.', appointment);
    return res.status(503).json({ ok: false, error: 'smtp_not_configured', emailSent: false });
  }

  const recipients = (APPOINTMENT_TO ? APPOINTMENT_TO.split(',') : DEFAULT_RECIPIENTS)
    .map((r) => r.trim())
    .filter(Boolean);

  try {
    const port = Number(SMTP_PORT || 587);
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port,
      secure: port === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });

    await transporter.sendMail({
      from: SMTP_FROM || SMTP_USER,
      to: recipients.join(', '),
      replyTo: appointment.email || undefined,
      subject: safeHeader(`[Yeni Randevu] ${appointment.fullName} — ${appointment.preferredDate || 'tarih belirtilmedi'}`),
      html: buildMailHtml(appointment),
      text:
        `Yeni randevu talebi\n\n` +
        `Ad Soyad: ${appointment.fullName}\nTelefon: ${appointment.phone}\n` +
        `E-posta: ${appointment.email || '-'}\nTarih: ${appointment.preferredDate || '-'}\n` +
        `Saat: ${appointment.preferredTime || '-'}\nKonu: ${appointment.topicId || '-'}\n` +
        `Notlar: ${appointment.notes || '-'}\nTalep: ${appointment.createdAt}`,
    });

    return res.status(200).json({ ok: true, emailSent: true });
  } catch (err) {
    console.error('[appointments] E-posta gönderilemedi:', err, appointment);
    return res.status(502).json({ ok: false, error: 'mail_failed', emailSent: false });
  }
}

function safeParse(raw: string): AppointmentPayload {
  try {
    return JSON.parse(raw) as AppointmentPayload;
  } catch {
    return {};
  }
}
