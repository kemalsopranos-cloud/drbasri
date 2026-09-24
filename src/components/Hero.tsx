import { useState, FormEvent } from 'react';
import { L } from '../i18n';
import { Award, ShieldCheck, Activity, ChevronRight, Calendar, User, Phone, CheckCircle, AlertCircle, MessageCircle } from 'lucide-react';
import { Language, Appointment } from '../types';
import { uiTranslations } from '../translations';
import { getExpertiseItems, contactDetails } from '../data';
// Doktorun kendi ameliyathane fotoğrafı (Instagram, Nisan 2025 — RIRS). Eski stok
// görselde başka bir cerrah vardı (yaka kartında adı okunuyordu) — geri KOYMA.
import surgeonImg from '../assets/images/prof-dr-basri-cakiroglu-endoskopik-cerrahi.jpg';

interface HeroProps {
  language: Language;
  onOpenAppointment: () => void;
  onScrollToExpertise: () => void;
  onAppointmentCreated: (appointment: Appointment) => void | Promise<boolean>;
}

export default function Hero({
  language,
  onOpenAppointment,
  onScrollToExpertise,
  onAppointmentCreated,
}: HeroProps) {
  const t = uiTranslations[language];
  const specialties = getExpertiseItems(language);

  // Form states for the Inline Fast Appointment Form
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [topicId, setTopicId] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  // Bildirim gönderilemediyse hastaya sahte onay gösterilmez (bkz. App.handleAppointmentCreated)
  const [deliveryFailed, setDeliveryFailed] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleFastSubmit = (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!fullName.trim() || !phone.trim() || !topicId) {
      setErrorMsg(
        L(language, { TR: 'Lütfen tüm zorunlu alanları doldurunuz.', EN: 'Please fill in all required fields.' }));
      return;
    }

    if (phone.replace(/\D/g, '').length < 9) {
      setErrorMsg(
        L(language, { TR: 'Geçerli bir telefon numarası giriniz.', EN: 'Please enter a valid phone number.' }));
      return;
    }

    setIsSubmitting(true);

    const todayStr = new Date().toISOString().split('T')[0];
    const newAppointment: Appointment = {
      id: `apt-fast-${Date.now()}`,
      fullName: fullName.trim(),
      phone: phone.trim(),
      email: '', // hızlı formda e-posta sorulmuyor
      preferredDate: todayStr,
      preferredTime: '09:00',
      topicId,
      notes: notes.trim() || undefined,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    // Sahte gecikme yerine GERÇEK gönderim beklenir
    void (async () => {
      let delivered = false;
      try {
        delivered = (await onAppointmentCreated(newAppointment)) === true;
      } catch {
        delivered = false;
      }
      setDeliveryFailed(!delivered);
      setIsSubmitting(false);
      setIsSuccess(true);
    })();
  };

  const handleResetForm = () => {
    setDeliveryFailed(false);
    setFullName('');
    setPhone('');
    setTopicId('');
    setNotes('');
    setIsSuccess(false);
  };

  return (
    <section
      id="home"
      className="relative min-h-screen pt-36 pb-20 flex items-center bg-navy overflow-hidden"
    >
      {/* Decorative Radial Lighting Gradients (Navy, Indigo and faint Gold glow) */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-sky-900/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Grid Pattern Background overlay for high-tech clinical texture */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column - High Typography Brand Info & Stats */}
          <div className="lg:col-span-7 flex flex-col justify-center gap-6">
            
            {/* Academic Prestige Badge */}
            <div className="inline-flex self-start items-center space-x-2 bg-white/5 border border-gold/30 px-4 py-2 rounded-full mb-2">
              <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
              <span className="text-[11px] font-semibold tracking-wider text-gold uppercase font-sans">
                {L(language, { TR: 'Modern Üroloji · Akademik Vizyon · İstanbul', EN: 'Modern Urology · Academic Vision · Istanbul' })}
              </span>
            </div>

            {/* Hero Main Bold Typography Heading */}
            {/* SEO: <h1> sayfanın tek ana başlığıdır ve hastaların aradığı
                ifadeyi (isim + "üroloji uzmanı") taşımalı. Eski "Modern
                Üroloji ve Akademik Vizyon" sloganı rozete taşındı. */}
            <h1 className="text-display text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-none tracking-tight">
              {/* RU'da ad Kiril yazımıyla: Rusça arama "Басри Чакыроглу"
                  sorgusunu da yakalar; Latin yazım alt başlıkta kalır. */}
              {language === 'RU' ? (
                <>
                  Проф. д-р Басри Чакыроглу<br />
                  <span className="text-gold italic font-display">Уролог и роботический хирург</span>
                </>
              ) : (
                <>
                  Prof. Dr. Basri Çakıroğlu<br />
                  <span className="text-gold italic font-display">
                    {L(language, { TR: 'Üroloji ve Robotik Cerrahi Uzmanı', EN: 'Urology & Robotic Surgery Specialist' })}
                  </span>
                </>
              )}
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-slate-400 font-light max-w-xl leading-relaxed">
              {t.heroDescription}
            </p>

            {/* Quality Action Button Link */}
            <div className="flex flex-wrap items-center gap-4 mt-2">
              <button
                id="hero-explore-btn"
                onClick={onScrollToExpertise}
                className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-gold/40 text-slate-200 hover:text-white px-6 py-3 rounded-sm font-semibold text-xs uppercase tracking-widest transition-all flex items-center gap-2"
              >
                <span>{t.heroCTA2}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Dynamic Glass Stats Row */}
            <div className="flex flex-wrap gap-4 mt-4">
              <div className="card-glass p-4 rounded-lg flex flex-col gap-1 w-32">
                <span className="text-gold font-bold text-2xl font-display">30+</span>
                <span className="text-[9px] uppercase opacity-60 tracking-wider font-semibold">
                  {L(language, { TR: 'Yıllık Deneyim', EN: 'Years Experience' })}
                </span>
              </div>
              <div className="card-glass p-4 rounded-lg flex flex-col gap-1 w-32">
                <span className="text-gold font-bold text-2xl font-display">10k+</span>
                <span className="text-[9px] uppercase opacity-60 tracking-wider font-semibold">
                  {L(language, { TR: 'Başarılı Ameliyat', EN: 'Successful Cases' })}
                </span>
              </div>
              <div className="card-glass p-4 rounded-lg flex flex-col gap-1 w-32">
                <span className="text-gold font-bold text-2xl font-display">80+</span>
                <span className="text-[9px] uppercase opacity-60 tracking-wider font-semibold">
                  {L(language, { TR: 'Bilimsel Yayın', EN: 'Scientific Papers' })}
                </span>
              </div>
            </div>

          </div>

          {/* Right Column - Fast Appointment Form (Hızlı Randevu Formu) */}
          <div className="lg:col-span-5">
            <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden shadow-2xl backdrop-blur-md flex flex-col animate-in slide-in-from-right duration-500">
              <div className="relative h-48 sm:h-52 w-full">
                <img 
                  src={surgeonImg}
                  alt={L(language, { TR: 'Prof. Dr. Basri Çakıroğlu ameliyathanede endoskopik böbrek taşı ameliyatı sırasında', EN: 'Prof. Dr. Basri Çakıroğlu during endoscopic kidney stone surgery' })}
                  width={1440}
                  height={810}
                  fetchPriority="high"
                  decoding="async"
                  className="w-full h-full object-cover"
                  style={{ objectPosition: 'center 18%' }}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/30 to-transparent" />
                <div className="absolute bottom-4 left-6">
                  <span className="bg-gold text-navy text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-sm">
                    {L(language, { TR: 'PROF. DR. BASRİ ÇAKIROĞLU', EN: 'PROF. DR. BASRI CAKIROGLU' })}
                  </span>
                </div>
              </div>
              <div className="p-6 sm:p-8 flex flex-col gap-5">
              
              {isSuccess ? (
                /* FAST SUCCESS SCREEN */
                <div className="text-center py-8 space-y-5 animate-in zoom-in duration-200">
                  <div className={`inline-flex items-center justify-center w-14 h-14 rounded-full mb-2 border ${deliveryFailed ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'}`}>
                    {deliveryFailed ? <AlertCircle className="w-8 h-8" /> : <CheckCircle className="w-8 h-8" />}
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold font-display text-white">
                      {deliveryFailed
                        ? (L(language, { TR: 'Lütfen bizi arayın', EN: 'Please contact us' }))
                        : (L(language, { TR: 'Talep Gönderildi!', EN: 'Request Received!' }))}
                    </h3>
                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                      {deliveryFailed
                        ? (L(language, { TR: 'Talebiniz kaydedildi ancak bildirim gönderilemedi. Randevunuz için lütfen telefon veya WhatsApp ile ulaşın.', EN: 'Your request was saved but the notification could not be delivered. Please call or message us on WhatsApp.' }))
                        : (L(language, { TR: 'Randevu talebiniz başarıyla alınmıştır. Klinik asistanımız en kısa sürede sizinle iletişime geçecektir.', EN: 'Your fast request has been registered. Our assistant will contact you shortly.' }))}
                    </p>
                  </div>

                  {deliveryFailed && (
                    <div className="flex flex-col sm:flex-row gap-2 justify-center">
                      <a
                        href={`tel:${contactDetails.phone}`}
                        className="px-4 py-2.5 bg-gold hover:bg-gold/90 text-navy font-bold text-[11px] uppercase tracking-wider rounded inline-flex items-center justify-center gap-2"
                      >
                        <Phone className="w-3.5 h-3.5" /> {contactDetails.phoneFormatted}
                      </a>
                      <a
                        href={`https://wa.me/${contactDetails.phone.replace(/\D/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2.5 bg-[#25D366] hover:bg-[#1ebe5b] text-white font-bold text-[11px] uppercase tracking-wider rounded inline-flex items-center justify-center gap-2"
                      >
                        <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
                      </a>
                    </div>
                  )}

                  <button
                    id="reset-fast-form"
                    onClick={handleResetForm}
                    className="bg-gold text-navy font-bold px-6 py-2 rounded-sm text-xs uppercase tracking-widest mt-2 hover:bg-gold/90 transition-all"
                  >
                    {L(language, { TR: 'Yeni Talep', EN: 'New Request' })}
                  </button>
                </div>
              ) : (
                /* THE FORM */
                <>
                  <div className="flex flex-col gap-1">
                    <h3 className="text-xs uppercase tracking-[0.2em] text-gold font-bold">
                      {L(language, { TR: 'Hızlı Randevu Formu', EN: 'Quick Booking Form' })}
                    </h3>
                    <p className="text-xs text-slate-400">
                      {L(language, { TR: 'Klinik asistanımız sizi arayarak randevuyu teyit edecektir.', EN: 'Our assistant will call you back to confirm your session.' })}
                    </p>
                  </div>

                  <form onSubmit={handleFastSubmit} className="space-y-4">
                    
                    {/* Full Name */}
                    <div>
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder={t.appointmentFormName}
                        className="w-full bg-white/5 border border-white/10 p-3 text-sm rounded outline-none text-white focus:border-gold transition-colors font-sans"
                        required
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder={t.appointmentFormPhone}
                        className="w-full bg-white/5 border border-white/10 p-3 text-sm rounded outline-none text-white focus:border-gold transition-colors font-sans"
                        required
                      />
                    </div>

                    {/* Specialty Select */}
                    <div className="relative">
                      <select
                        value={topicId}
                        onChange={(e) => setTopicId(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 p-3 text-sm rounded outline-none focus:border-gold transition-colors appearance-none text-slate-300 font-sans cursor-pointer"
                        required
                      >
                        <option value="" className="bg-navy text-slate-400">
                          {L(language, { TR: 'Uzmanlık Seçiniz', EN: 'Select Expertise' })}
                        </option>
                        {specialties.map((s) => (
                          <option key={s.id} value={s.id} className="bg-navy text-white">
                            {s.title}
                          </option>
                        ))}
                      </select>
                      <span className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-slate-500">
                        ▼
                      </span>
                    </div>

                    {/* Brief notes */}
                    <div>
                      <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder={L(language, { TR: 'Mesajınız (Opsiyonel)', EN: 'Your Message (Optional)' })}
                        rows={2}
                        className="w-full bg-white/5 border border-white/10 p-3 text-sm rounded outline-none text-white focus:border-gold transition-colors resize-none font-sans"
                      />
                    </div>

                    {/* Form feedback error */}
                    {errorMsg && (
                      <p className="text-red-400 text-xs flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errorMsg}</span>
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gold hover:bg-gold/90 text-navy font-bold py-3 rounded text-xs uppercase tracking-widest transition-all shadow-md shadow-gold/10"
                    >
                      {isSubmitting ? t.appointmentFormSubmitting : t.appointmentFormSubmit}
                    </button>

                  </form>
                </>
              )}

              </div>
            </div>
          </div>

        </div>

        {/* Bottom Trust Badges row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto border-t border-white/10 mt-16 pt-12 text-left">
          
          <div className="flex items-start gap-4 p-4 rounded-lg card-glass">
            <div className="p-3 bg-gold/10 text-gold rounded-lg border border-gold/20">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-white font-bold text-sm mb-1">{t.heroBadge1}</h3>
              <p className="text-slate-400 text-xs leading-relaxed font-light">
                {L(language, { TR: 'Akademik geçmişi ile binlerce başarılı operasyona imza atmış cerrah.', EN: 'With a distinguished academic background, surgeon with thousands of highly successful cases.' })}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 rounded-lg card-glass">
            <div className="p-3 bg-gold/10 text-gold rounded-lg border border-gold/20">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-white font-bold text-sm mb-1">{t.heroBadge2}</h3>
              <p className="text-slate-400 text-xs leading-relaxed font-light">
                {L(language, { TR: 'Uluslararası saygın hakemli dergilerde yayınlanmış 80+ bilimsel makale ve yayın.', EN: 'Over 80 scientific papers published in peer-reviewed international journals.' })}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 rounded-lg card-glass">
            <div className="p-3 bg-gold/10 text-gold rounded-lg border border-gold/20">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-white font-bold text-sm mb-1">{t.heroBadge3}</h3>
              <p className="text-slate-400 text-xs leading-relaxed font-light">
                {L(language, { TR: 'daVinci Robotik Cerrahi ve Holmiyum Lazer (HoLEP) teknolojilerinde uzman sertifikalı klinisyen.', EN: 'Certified specialist in daVinci Robotic Surgery and Holmium Laser (HoLEP) systems.' })}
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
