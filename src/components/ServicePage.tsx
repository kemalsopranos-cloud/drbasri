import { useEffect, useMemo } from 'react';
import {
  Calendar, ChevronRight, ArrowLeft, Phone, HelpCircle, CheckCircle2,
  Cpu, Activity, ShieldAlert, Sparkles, Heart, User, Instagram
} from 'lucide-react';
import { Language, ExpertiseItem } from '../types';
import { uiTranslations } from '../translations';
import { getExpertiseItems, expertiseSlugs, contactDetails } from '../data';
import { updatePageSeo } from '../utils/seo';
import { buildServiceMeta } from '../seo/meta';

interface ServicePageProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  item: ExpertiseItem;
  slug: string;
  onNavigateHome: () => void;
  onNavigate: (path: string) => void;
  onOpenAppointment: () => void;
}

const getIconComponent = (iconName: string) => {
  switch (iconName) {
    case 'Cpu': return <Cpu className="w-6 h-6 text-gold" />;
    case 'Activity': return <Activity className="w-6 h-6 text-gold" />;
    case 'ShieldAlert': return <ShieldAlert className="w-6 h-6 text-gold" />;
    case 'Sparkles': return <Sparkles className="w-6 h-6 text-gold" />;
    case 'Heart': return <Heart className="w-6 h-6 text-gold" />;
    case 'User': return <User className="w-6 h-6 text-gold" />;
    default: return <Activity className="w-6 h-6 text-gold" />;
  }
};

export default function ServicePage({
  language,
  setLanguage,
  item,
  slug,
  onNavigateHome,
  onNavigate,
  onOpenAppointment,
}: ServicePageProps) {
  const t = uiTranslations[language];

  // SEO: title/description/JSON-LD tek kaynaktan (src/seo/meta.ts)
  useEffect(() => {
    updatePageSeo(buildServiceMeta(item, slug));
    if (typeof window !== 'undefined' && window.location.pathname !== `/${slug}`) {
      window.history.pushState({}, '', `/${slug}`);
    }
  }, [item, slug]);

  // Related services: everything else in the same specialty list
  const relatedItems = useMemo(() => {
    return getExpertiseItems(language).filter((i) => i.id !== item.id).slice(0, 3);
  }, [language, item.id]);

  return (
    <div className="min-h-screen bg-navy text-slate-100 flex flex-col justify-between selection:bg-gold selection:text-navy font-sans">

      {/* 1. TOP DEDICATED HEADER */}
      <header className="sticky top-0 z-40 bg-navy/95 backdrop-blur-md border-b border-white/10 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <button
            onClick={onNavigateHome}
            className="flex items-center space-x-2 text-xs sm:text-sm font-semibold text-slate-300 hover:text-gold transition-colors focus:outline-none cursor-pointer group"
            title="Ana Sayfaya Dön"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="hidden sm:inline">Prof. Dr. Basri Çakıroğlu</span>
            <span className="sm:hidden">Ana Sayfa</span>
          </button>

          <div className="text-center">
            {/* SEO: sayfada tek <h1> olmalı — o da içerik başlığı (aşağıda) */}
            <p className="text-sm sm:text-base font-bold font-display text-white tracking-tight">
              {language === 'TR' ? 'Uzmanlık Alanı' : 'Medical Specialty'}
            </p>
            <p className="text-[10px] text-gold tracking-wider uppercase font-medium">
              Prof. Dr. Basri Çakıroğlu
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setLanguage(language === 'TR' ? 'EN' : 'TR')}
              className="px-2.5 py-1 text-[11px] font-bold uppercase rounded border border-white/20 hover:border-gold text-slate-300 hover:text-gold transition-colors"
            >
              {language === 'TR' ? 'EN' : 'TR'}
            </button>
            <button
              onClick={onOpenAppointment}
              className="hidden md:inline-flex items-center space-x-2 px-4 py-2 bg-gold hover:bg-gold/90 text-navy font-bold text-xs rounded uppercase tracking-wider transition-all shadow-md cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>{t.navAppointment}</span>
            </button>
          </div>
        </div>
      </header>

      {/* 2. MAIN CONTENT */}
      <main className="flex-grow max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12 w-full">

        {/* Breadcrumb (SEO friendly) */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center space-x-2 text-xs text-slate-400">
            <li>
              <button onClick={onNavigateHome} className="hover:text-gold transition-colors">
                Ana Sayfa
              </button>
            </li>
            <li><ChevronRight className="w-3 h-3 text-slate-600" /></li>
            <li>
              <button onClick={onNavigateHome} className="hover:text-gold transition-colors">
                {t.navExpertise}
              </button>
            </li>
            <li><ChevronRight className="w-3 h-3 text-slate-600" /></li>
            <li className="text-gold truncate max-w-[200px] sm:max-w-md" aria-current="page">
              {item.title}
            </li>
          </ol>
        </nav>

        {/* Article Header Card */}
        <header className="card-glass p-6 sm:p-10 rounded-2xl mb-8 border border-white/10">
          <div className="flex items-center space-x-4 mb-6">
            <div className="p-3 bg-white/5 rounded-lg border border-white/10">
              {getIconComponent(item.iconName)}
            </div>
            <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">
              {language === 'TR' ? 'ÜROLOJİ · İSTANBUL / ÜMRANİYE' : 'UROLOGY · ISTANBUL / ÜMRANİYE'}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold font-display text-white tracking-tight leading-snug mb-6">
            {item.title}
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light">
            {item.shortDesc}
          </p>

          <div className="flex items-center space-x-3 pt-6 mt-6 border-t border-white/10">
            <div className="w-10 h-10 rounded-full bg-gold/20 border border-gold/40 flex items-center justify-center text-gold font-bold text-sm">
              BÇ
            </div>
            <div>
              <p className="text-sm font-bold text-white flex items-center">
                <span>Prof. Dr. Basri Çakıroğlu</span>
                <span className="ml-2 text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-1.5 py-0.5 rounded font-normal">
                  Onaylı Uzman
                </span>
              </p>
              <p className="text-xs text-slate-400">
                Üroloji & Robotik Cerrahi Uzmanı | Hisar Hospital Intercontinental
              </p>
            </div>
          </div>
        </header>

        {/* Long Description */}
        <div className="card-glass p-6 sm:p-10 rounded-2xl mb-8 border border-white/10">
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light">
            {item.longDesc}
          </p>
        </div>

        {/* Conditions and Treatments split */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="card-glass p-6 rounded-xl border border-white/10">
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4 flex items-center">
              <HelpCircle className="w-5 h-5 text-gold mr-2 shrink-0" />
              <span>{t.expertiseModalConditions}</span>
            </h3>
            <ul className="space-y-3">
              {item.conditions.map((cond, idx) => (
                <li key={idx} className="flex items-start text-slate-300 text-xs sm:text-sm leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold mr-2.5 mt-2 shrink-0" />
                  <span>{cond}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="card-glass p-6 rounded-xl border border-white/10">
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4 flex items-center">
              <CheckCircle2 className="w-5 h-5 text-gold mr-2 shrink-0" />
              <span>{t.expertiseModalTreatments}</span>
            </h3>
            <ul className="space-y-3">
              {item.treatments.map((treatment, idx) => (
                <li key={idx} className="flex items-start text-slate-300 text-xs sm:text-sm leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-2.5 mt-2 shrink-0" />
                  <span>{treatment}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Medical Consultation / CTA Box */}
        <div className="bg-gradient-to-br from-slate-900 to-navy border border-gold/30 rounded-2xl p-6 sm:p-8 mb-12 shadow-xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <h3 className="text-lg sm:text-xl font-bold font-display text-white">
                {language === 'TR'
                  ? 'Bu Konuda Uzman Görüşü veya Randevu mu Almak İstiyorsunuz?'
                  : 'Looking for an Expert Opinion or Consultation?'}
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm max-w-xl font-light">
                {language === 'TR'
                  ? 'Prof. Dr. Basri Çakıroğlu ile muayene planlamak veya ameliyat süreçleri hakkında bilgi almak için iletişime geçebilirsiniz.'
                  : 'You can schedule an appointment or get a second opinion on surgical options with Prof. Dr. Basri Cakiroglu.'}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
              <button
                onClick={onOpenAppointment}
                className="px-6 py-3 bg-gold hover:bg-gold/90 text-navy font-bold text-xs uppercase tracking-wider rounded transition-all text-center shadow-lg cursor-pointer"
              >
                {language === 'TR' ? 'Randevu Oluştur' : 'Schedule Visit'}
              </button>
              <a
                href={`tel:${contactDetails.phone}`}
                className="px-5 py-3 bg-white/5 hover:bg-white/10 text-white font-bold text-xs uppercase tracking-wider rounded border border-white/15 transition-all text-center flex items-center justify-center space-x-2"
              >
                <Phone className="w-3.5 h-3.5 text-gold" />
                <span>{contactDetails.phoneFormatted}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Related Services (real, crawlable internal links) */}
        {relatedItems.length > 0 && (
          <div className="mb-12">
            <h3 className="text-lg font-bold font-display text-white mb-6">
              {language === 'TR' ? 'İlgili Diğer Uzmanlık Alanları' : 'Other Related Specialties'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedItems.map((rel) => {
                const relSlug = expertiseSlugs[rel.id];
                return (
                  <a
                    key={rel.id}
                    href={`/${relSlug}`}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate(`/${relSlug}`);
                    }}
                    className="card-glass p-5 rounded-xl border border-white/10 hover:border-gold/40 transition-all cursor-pointer group flex flex-col justify-between"
                  >
                    <div>
                      <h4 className="text-sm font-bold text-white group-hover:text-gold transition-colors line-clamp-2 mb-2 font-display">
                        {rel.title}
                      </h4>
                      <p className="text-xs text-slate-400 line-clamp-2 font-light">
                        {rel.shortDesc}
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-white/5 flex items-center text-[11px] text-gold font-semibold">
                      {t.expertiseCardMore} <ChevronRight className="w-3 h-3 ml-0.5" />
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        )}
      </main>

      {/* 3. FOOTER */}
      <footer className="bg-black/40 border-t border-white/10 py-10 px-6 text-slate-400 text-xs mt-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
          <div>
            <p className="font-bold text-slate-300 mb-1">
              Prof. Dr. Basri Çakıroğlu - {item.title}
            </p>
            <p className="text-slate-500 text-[11px] max-w-md">
              Bu sayfadaki bilgiler yalnızca genel tıbbi bilgilendirme amaçlıdır. Teşhis ve tedavi için hekim muayenesi şarttır.
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <a
              href="https://www.instagram.com/drbasricakiroglu/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1.5 text-slate-300 hover:text-gold transition-colors"
            >
              <Instagram className="w-3.5 h-3.5" />
              <span>Instagram</span>
            </a>
            <button
              onClick={onNavigateHome}
              className="text-slate-300 hover:text-gold transition-colors uppercase tracking-wider text-[11px] font-semibold"
            >
              ← Ana Sayfaya Dön
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
