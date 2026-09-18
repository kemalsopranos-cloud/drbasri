import { MessageCircle } from 'lucide-react';
import { Language } from '../types';
import { DOCTOR } from '../seo/site';

interface WhatsAppButtonProps {
  language: Language;
  /** Ana sayfadaki yüzen buton grubunun İÇİNDE (sabit konum verilmez) */
  inline?: boolean;
}

/**
 * WhatsApp iletişim butonu. Yabancı hastanın ilk teması neredeyse her zaman
 * WhatsApp'tır; ön yazılı mesaj dili sayfanın diline göre gelir.
 * Numara: src/seo/site.ts → DOCTOR.telephoneRaw (asistan hattı). Ayrı bir
 * uluslararası hat açılırsa YALNIZCA orayı değiştir.
 */
export default function WhatsAppButton({ language, inline = false }: WhatsAppButtonProps) {
  const text =
    language === 'EN'
      ? 'Hello, I am an international patient and would like information about treatment with Prof. Dr. Basri Çakıroğlu.'
      : 'Merhaba, Prof. Dr. Basri Çakıroğlu ile randevu ve tedavi hakkında bilgi almak istiyorum.';
  const href = `https://wa.me/${DOCTOR.telephoneRaw.replace(/\D/g, '')}?text=${encodeURIComponent(text)}`;
  const label = language === 'EN' ? 'WhatsApp' : 'WhatsApp ile yazın';

  const button = (
    <a
      id="floating-whatsapp-btn"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      title={label}
      aria-label={label}
      className="bg-[#25D366] hover:bg-[#1ebe5b] active:bg-[#1aa851] text-white p-4 rounded-full shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center border border-white/10"
    >
      <MessageCircle className="w-5 h-5" />
    </a>
  );

  if (inline) return button;

  // Blog / hizmet / international sayfalarında kendi sabit konumunda
  return <div className="fixed bottom-6 right-6 z-30">{button}</div>;
}
