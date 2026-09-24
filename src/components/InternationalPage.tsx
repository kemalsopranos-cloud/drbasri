import { useEffect } from 'react';
import {
  ArrowLeft, Calendar, ChevronRight, Phone, Mail, MessageCircle, FileText, Plane,
  Building2, Stethoscope, HeartPulse, Globe, ShieldCheck, Clock, CheckCircle2, HelpCircle,
} from 'lucide-react';
import { Language } from '../types';
import { INTL_CONTENT, type IntlLang } from './international-content';
import { getExpertiseItems, getBlogPosts, contactDetails } from '../data';
import { servicePath, articlePath, homePath } from '../routes';
import { updatePageSeo } from '../utils/seo';
import { buildInternationalMeta } from '../seo/meta';
import { DOCTOR } from '../seo/site';

interface InternationalPageProps {
  lang: IntlLang;
  onNavigateHome: () => void;
  onNavigate: (path: string) => void;
  onOpenAppointment: () => void;
  setLanguage: (lang: Language) => void;
}

/**
 * /en/international-patients — yabancı hastanın sorduğu her şey tek sayfada:
 * süreç, kalış süreleri, hastane, seyahat, takip. YALNIZCA İngilizce.
 *
 * ⚠️ FİYAT YAZMA (Sağlık Bakanlığı tanıtım mevzuatı). "Contact for a
 * personalised plan" ile sınırlı kal.
 */

export default function InternationalPage({ lang, onNavigateHome, onNavigate, onOpenAppointment, setLanguage }: InternationalPageProps) {
  useEffect(() => {
    updatePageSeo(buildInternationalMeta(lang));
  }, [lang]);

  const c = INTL_CONTENT[lang];
  const services = getExpertiseItems(lang);
  const guides = getBlogPosts(lang).filter((p) => p.faq && p.faq.length > 0).slice(0, 4);
  const waHref = `https://wa.me/${DOCTOR.telephoneRaw.replace(/\D/g, '')}?text=${encodeURIComponent(c.waMessage)}`;

  return (
    <div className="min-h-screen bg-navy text-slate-100 flex flex-col justify-between selection:bg-gold selection:text-navy font-sans">
      {/* HEADER */}
      <header className="sticky top-0 z-40 bg-navy/95 backdrop-blur-md border-b border-white/10 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <button
            onClick={onNavigateHome}
            className="flex items-center space-x-2 text-xs sm:text-sm font-semibold text-slate-300 hover:text-gold transition-colors focus:outline-none cursor-pointer group"
            title={c.backHome}
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="hidden sm:inline">Prof. Dr. Basri Çakıroğlu</span>
            <span className="sm:hidden">{c.breadcrumbHome}</span>
          </button>
          <div className="text-center">
            <p className="text-sm sm:text-base font-bold font-display text-white tracking-tight">{c.headerTitle}</p>
            <p className="text-[10px] text-gold tracking-wider uppercase font-medium">{c.headerSub}</p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setLanguage('TR')}
              className="px-2.5 py-1 text-[11px] font-bold uppercase rounded border border-white/20 hover:border-gold text-slate-300 hover:text-gold transition-colors"
            >
              TR
            </button>
            <button
              onClick={onOpenAppointment}
              className="hidden md:inline-flex items-center space-x-2 px-4 py-2 bg-gold hover:bg-gold/90 text-navy font-bold text-xs rounded uppercase tracking-wider transition-all shadow-md cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>{c.requestConsultation}</span>
            </button>
          </div>
        </div>
      </header>

      <main className="flex-grow max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12 w-full">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center space-x-2 text-xs text-slate-400">
            <li><a href={homePath(lang)} onClick={(e) => { e.preventDefault(); onNavigateHome(); }} className="hover:text-gold transition-colors">{c.breadcrumbHome}</a></li>
            <li><ChevronRight className="w-3 h-3 text-slate-600" /></li>
            <li className="text-gold" aria-current="page">{c.breadcrumbSelf}</li>
          </ol>
        </nav>

        {/* HERO */}
        <header className="card-glass p-6 sm:p-10 rounded-2xl mb-8 border border-white/10">
          <div className="inline-flex items-center space-x-2 bg-white/5 border border-gold/30 px-3 py-1.5 rounded-full mb-5">
            <Globe className="w-3.5 h-3.5 text-gold" />
            <span className="text-[11px] font-semibold tracking-wider text-gold uppercase">{c.eyebrow}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold font-display text-white tracking-tight leading-snug mb-5">{c.h1}</h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light max-w-3xl">{c.lede}</p>
          <div className="flex flex-wrap gap-3 mt-7">
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 bg-[#25D366] hover:bg-[#1ebe5b] text-white font-bold text-xs uppercase tracking-wider rounded transition-all shadow-lg"
            >
              <MessageCircle className="w-4 h-4" /> {c.waCta}
            </a>
            <a
              href={`mailto:${contactDetails.email}?subject=International%20patient%20enquiry`}
              className="inline-flex items-center gap-2 px-5 py-3 bg-white/5 hover:bg-white/10 text-white font-bold text-xs uppercase tracking-wider rounded border border-white/15 transition-all"
            >
              <Mail className="w-4 h-4 text-gold" /> {contactDetails.email}
            </a>
          </div>
        </header>

        {/* STEPS */}
        <section className="mb-10" aria-labelledby="steps-heading">
          <h2 id="steps-heading" className="text-xl sm:text-2xl font-bold font-display text-white mb-6">{c.stepsHeading}</h2>
          <ol className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {c.steps.map((s, i) => {
              const Icon = s.icon;
              return (
                <li key={i} className="card-glass p-5 rounded-xl border border-white/10 flex gap-4">
                  <div className="shrink-0 w-10 h-10 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center text-gold">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-gold font-bold mb-1">{c.stepLabel(i + 1)}</p>
                    <h3 className="text-sm font-bold text-white mb-1">{s.title}</h3>
                    <p className="text-xs text-slate-300 leading-relaxed font-light">{s.text}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </section>

        {/* STAY TABLE */}
        <section className="card-glass p-6 sm:p-8 rounded-xl border border-white/10 mb-10" aria-labelledby="stay-heading">
          <h2 id="stay-heading" className="text-lg sm:text-xl font-bold font-display text-white mb-2 flex items-center">
            <Clock className="w-5 h-5 text-gold mr-2" /> {c.stayHeading}
          </h2>
          <p className="text-xs text-slate-400 mb-5 font-light">{c.stayNote}</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-[11px] uppercase tracking-wider text-slate-400 border-b border-white/10">
                  <th className="py-2 pr-4 font-semibold">{c.colProcedure}</th>
                  <th className="py-2 pr-4 font-semibold whitespace-nowrap">{c.colStay}</th>
                  <th className="py-2 font-semibold"></th>
                </tr>
              </thead>
              <tbody>
                {c.stays.map((row) => (
                  <tr key={row.procedure} className="border-b border-white/5 last:border-0">
                    <td className="py-2.5 pr-4 text-slate-200">{row.procedure}</td>
                    <td className="py-2.5 pr-4 text-white font-semibold whitespace-nowrap">{row.days}</td>
                    <td className="py-2.5 text-right">
                      <a
                        href={servicePath(lang, row.id)}
                        onClick={(e) => { e.preventDefault(); onNavigate(servicePath(lang, row.id)); }}
                        className="text-gold text-xs font-semibold hover:underline whitespace-nowrap"
                      >
                        {c.colDetails}
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* HOSPITAL + WHY */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="card-glass p-6 rounded-xl border border-white/10">
            <h2 className="text-white font-bold text-sm uppercase tracking-wider mb-4 flex items-center">
              <ShieldCheck className="w-5 h-5 text-gold mr-2 shrink-0" /> {c.hospitalHeading}
            </h2>
            <ul className="space-y-2.5">
              {c.hospitalPoints.map((t) => (
                <li key={t} className="flex items-start text-slate-300 text-xs sm:text-sm leading-relaxed">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 mr-2 mt-0.5 shrink-0" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="card-glass p-6 rounded-xl border border-white/10">
            <h2 className="text-white font-bold text-sm uppercase tracking-wider mb-4 flex items-center">
              <Stethoscope className="w-5 h-5 text-gold mr-2 shrink-0" /> {c.surgeonHeading}
            </h2>
            <ul className="space-y-2.5">
              {c.surgeonPoints.map((t) => (
                <li key={t} className="flex items-start text-slate-300 text-xs sm:text-sm leading-relaxed">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 mr-2 mt-0.5 shrink-0" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* SERVICES */}
        <section className="mb-10" aria-labelledby="services-heading">
          <h2 id="services-heading" className="text-lg font-bold font-display text-white mb-5">{c.servicesHeading}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {services.map((item) => (
              <a
                key={item.id}
                href={servicePath(lang, item.id)}
                onClick={(e) => { e.preventDefault(); onNavigate(servicePath(lang, item.id)); }}
                className="card-glass p-5 rounded-xl border border-white/10 hover:border-gold/40 transition-all group flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-sm font-bold text-white group-hover:text-gold transition-colors mb-2 font-display">{item.title}</h3>
                  <p className="text-xs text-slate-400 line-clamp-3 font-light">{item.shortDesc}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-white/5 flex items-center text-[11px] text-gold font-semibold">
                  {c.learnMore} <ChevronRight className="w-3 h-3 ml-0.5" />
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* GUIDES */}
        {guides.length > 0 && (
          <section className="mb-10" aria-labelledby="guides-heading">
            <h2 id="guides-heading" className="text-lg font-bold font-display text-white mb-5">{c.guidesHeading}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {guides.map((post) => (
                <a
                  key={post.id}
                  href={articlePath(lang, post.slug)}
                  onClick={(e) => { e.preventDefault(); onNavigate(articlePath(lang, post.slug)); }}
                  className="card-glass p-5 rounded-xl border border-white/10 hover:border-gold/40 transition-all group"
                >
                  <span className="text-[10px] text-gold uppercase font-bold tracking-wider mb-2 block">{post.category}</span>
                  <h3 className="text-sm font-bold text-white group-hover:text-gold transition-colors mb-2 font-display leading-snug">{post.title}</h3>
                  <p className="text-xs text-slate-400 line-clamp-2 font-light">{post.excerpt}</p>
                </a>
              ))}
            </div>
          </section>
        )}

        {/* FAQ */}
        <section className="card-glass p-6 sm:p-8 rounded-xl border border-white/10 mb-10" aria-labelledby="intl-faq">
          <h2 id="intl-faq" className="text-lg sm:text-xl font-bold font-display text-white mb-6 flex items-center">
            <HelpCircle className="w-5 h-5 text-gold mr-2" /> {c.faqHeading}
          </h2>
          <dl className="space-y-5">
            {c.faq.map((f, i) => (
              <div key={i} className="border-l-2 border-gold/50 pl-4">
                <dt className="text-sm sm:text-base font-bold text-white mb-1.5">{f.q}</dt>
                <dd className="text-slate-300 text-sm leading-relaxed font-light">{f.a}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* CTA */}
        <div className="bg-gradient-to-br from-slate-900 to-navy border border-gold/30 rounded-2xl p-6 sm:p-8 mb-12 shadow-xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <h2 className="text-lg sm:text-xl font-bold font-display text-white">{c.ctaHeading}</h2>
              <p className="text-slate-300 text-xs sm:text-sm max-w-xl font-light">{c.ctaText}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-[#25D366] hover:bg-[#1ebe5b] text-white font-bold text-xs uppercase tracking-wider rounded transition-all text-center shadow-lg inline-flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" /> WhatsApp
              </a>
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
      </main>

      {/* FOOTER */}
      <footer className="bg-black/40 border-t border-white/10 py-10 px-6 text-slate-400 text-xs mt-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
          <div>
            <p className="font-bold text-slate-300 mb-1">{c.footerTitle}</p>
            <address className="not-italic text-slate-500 text-[11px] max-w-md">
              {DOCTOR.hospital.name} · {DOCTOR.addressLine} · <a href={`tel:${DOCTOR.telephoneRaw}`} className="hover:text-gold">{DOCTOR.telephone}</a>
            </address>
          </div>
          <p className="text-slate-500 text-[11px] max-w-md">{c.footerDisclaimer}</p>
        </div>
      </footer>
    </div>
  );
}
