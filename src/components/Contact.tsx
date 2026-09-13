import { Phone, Mail, MapPin, Clock, ExternalLink, Map } from 'lucide-react';
import { Language } from '../types';
import { uiTranslations } from '../translations';
import { contactDetails } from '../data';

interface ContactProps {
  language: Language;
}

export default function Contact({ language }: ContactProps) {
  const t = uiTranslations[language];
  const info = contactDetails;

  return (
    <section id="contact" className="py-24 bg-navy relative overflow-hidden border-t border-white/10">
      {/* Visual background accents */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-sky-950/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-gold/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 font-sans">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs uppercase tracking-[0.2em] text-gold font-bold mb-3">
            {t.navContact}
          </h2>
          <p className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-white tracking-tight leading-none">
            {t.sectionContactSubtitle}
          </p>
          <div className="w-16 h-1 bg-gold mx-auto mt-6 rounded-full" />
        </div>

        {/* Contact and Map split layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left: Contact Info blocks */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            
            <div className="card-glass p-8 rounded-xl shadow-xl space-y-8 flex-1">
              {/* Address card */}
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-gold/10 text-gold rounded-lg border border-gold/20 shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1">
                    {t.contactAddressTitle}
                  </h4>
                  <p className="text-white text-sm leading-relaxed font-light">
                    {info.address}
                  </p>
                </div>
              </div>

              {/* Direct Phone dial card */}
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-gold/10 text-gold rounded-lg border border-gold/20 shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1">
                    {t.contactPhoneTitle}
                  </h4>
                  <a
                    id="phone-dial-link"
                    href={`tel:${info.phone}`}
                    className="text-white hover:text-gold text-base font-bold tracking-tight transition-colors block"
                  >
                    {info.phoneFormatted}
                  </a>
                  <span className="text-[11px] text-slate-500 font-light">
                    {language === 'TR' ? 'Direkt asistan hattı' : 'Direct assistant line'}
                  </span>
                </div>
              </div>

              {/* Email contact card */}
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-gold/10 text-gold rounded-lg border border-gold/20 shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1">
                    {t.contactEmailTitle}
                  </h4>
                  <a
                    id="email-contact-link"
                    href={`mailto:${info.email}`}
                    className="text-white hover:text-gold text-sm font-semibold transition-colors block break-all"
                  >
                    {info.email}
                  </a>
                </div>
              </div>
            </div>

            {/* Operating Hours card */}
            <div className="card-glass p-8 rounded-xl shadow-xl">
              <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-4 flex items-center">
                <Clock className="w-4 h-4 text-gold mr-2" />
                {t.contactHoursTitle}
              </h4>
              <div className="space-y-3 font-sans">
                {info.hours.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center text-xs border-b border-white/10 pb-2 last:border-b-0 last:pb-0 font-light">
                    <span className="text-slate-400">{item.days}</span>
                    <span className="text-white font-semibold">{item.hours}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right: Map Embed block with elegant fallback anchor */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="card-glass rounded-xl overflow-hidden shadow-xl flex-1 flex flex-col relative min-h-[350px]">
              {/* Map header information banner */}
              <div className="bg-navy p-4 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center space-x-2 text-slate-300 text-xs font-semibold">
                  <Map className="w-4 h-4 text-gold" />
                  <span className="text-[10px] uppercase tracking-widest">{t.contactMapPlaceholder}</span>
                </div>
                
                <a
                  id="gmaps-external-directions"
                  href={info.gmapsDirectionUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1 text-xs text-gold hover:text-gold/80 font-bold uppercase tracking-wider focus:outline-none"
                >
                  <span>{t.contactDirectionsButton}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Standard Safe Map Iframe with styling adjustments */}
              <div className="flex-1 w-full h-full min-h-[300px] relative bg-navy">
                <iframe
                  title="Dr. Basri Cakiroglu Clinic Location Map"
                  src={info.mapEmbedUrl}
                  className="absolute inset-0 w-full h-full border-0 filter grayscale invert contrast-125 opacity-75 hover:opacity-100 transition-opacity duration-300"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
