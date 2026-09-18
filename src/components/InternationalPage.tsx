import { useEffect } from 'react';
import {
  ArrowLeft, Calendar, ChevronRight, Phone, Mail, MessageCircle, FileText, Plane,
  Building2, Stethoscope, HeartPulse, Globe, ShieldCheck, Clock, CheckCircle2, HelpCircle,
} from 'lucide-react';
import { Language } from '../types';
import { getExpertiseItems, getBlogPosts, contactDetails } from '../data';
import { servicePath, articlePath } from '../routes';
import { updatePageSeo } from '../utils/seo';
import { buildInternationalMeta } from '../seo/meta';
import { DOCTOR } from '../seo/site';

interface InternationalPageProps {
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

const STEPS = [
  {
    icon: FileText,
    title: 'Send your reports',
    text: 'Share your MRI, CT, ultrasound, PSA, semen analysis or biopsy reports by WhatsApp or e-mail. No appointment is needed for this first review.',
  },
  {
    icon: Stethoscope,
    title: 'Remote evaluation',
    text: 'Prof. Dr. Çakıroğlu reviews your case and, when useful, arranges a short video consultation. You receive a written plan: recommended treatment, length of stay and medications to stop.',
  },
  {
    icon: Plane,
    title: 'Travel planning',
    text: 'Once the plan is clear, you book flights and accommodation. Our coordinator advises on hotels near the hospital and can arrange airport transfer on request.',
  },
  {
    icon: Building2,
    title: 'Treatment in Istanbul',
    text: 'Consultation, pre-operative tests and surgery take place at Hisar Intercontinental Hospital, a JCI-accredited private hospital on the Asian side of Istanbul with 24-hour intensive care.',
  },
  {
    icon: HeartPulse,
    title: 'Follow-up from home',
    text: 'Your first check is completed before departure. Pathology and discharge reports are sent electronically; later tests can be done locally and shared with us, with video consultations whenever needed.',
  },
];

const STAYS = [
  { procedure: 'HoLEP laser prostate surgery', days: '4–5 days', id: 'prostate-diseases' },
  { procedure: 'Kidney stone laser treatment (RIRS / URS)', days: '3 days', id: 'stone-disease' },
  { procedure: 'Mini-PCNL for large kidney stones', days: '4–5 days', id: 'stone-disease' },
  { procedure: 'Robotic radical prostatectomy', days: '10–12 days', id: 'robotic-surgery' },
  { procedure: 'Robotic partial nephrectomy', days: '7–10 days', id: 'robotic-surgery' },
  { procedure: 'Microsurgical varicocele repair', days: '3–4 days', id: 'andrology-infertility' },
  { procedure: 'Penile implant surgery', days: '4–5 days', id: 'andrology-infertility' },
  { procedure: 'MRI + fusion prostate biopsy', days: '2–3 days', id: 'urologic-oncology' },
  { procedure: 'TOT sling for stress incontinence', days: '3 days', id: 'urogynecology' },
];

const FAQ = [
  {
    q: 'Do I need a visa to come to Turkey for treatment?',
    a: 'Citizens of many countries enter Turkey visa-free or with an e-Visa obtained online in minutes. Check the official e-Visa website for your nationality; we provide an invitation letter on request for visa applications.',
  },
  {
    q: 'Is there an English-speaking coordinator?',
    a: 'Yes. An English-speaking patient coordinator handles communication before, during and after your visit; Arabic and Russian interpretation can be arranged at the hospital.',
  },
  {
    q: 'Can my companion stay with me in the hospital?',
    a: 'Yes. Rooms at Hisar Intercontinental Hospital accommodate one companion, and hotels within a few minutes of the hospital are available for the rest of the stay.',
  },
  {
    q: 'How soon after surgery can I fly?',
    a: 'It depends on the procedure: typically 2–3 days after stone or varicocele surgery, 3–4 days after HoLEP and about 10 days after robotic prostatectomy (after catheter removal). Your discharge plan states the earliest safe date.',
  },
  {
    q: 'How do I get a cost estimate?',
    a: 'After the remote review of your reports you receive a personalised treatment plan and the hospital provides a written estimate covering surgery, anaesthesia and hospital stay. Contact us by WhatsApp or e-mail to start.',
  },
];

export default function InternationalPage({ onNavigateHome, onNavigate, onOpenAppointment, setLanguage }: InternationalPageProps) {
  useEffect(() => {
    updatePageSeo(buildInternationalMeta());
  }, []);

  const services = getExpertiseItems('EN');
  const guides = getBlogPosts('EN').filter((p) => p.faq && p.faq.length > 0).slice(0, 4);
  const waHref = `https://wa.me/${DOCTOR.telephoneRaw.replace(/\D/g, '')}?text=${encodeURIComponent(
    'Hello, I am an international patient and would like to send my reports for evaluation.'
  )}`;

  return (
    <div className="min-h-screen bg-navy text-slate-100 flex flex-col justify-between selection:bg-gold selection:text-navy font-sans">
      {/* HEADER */}
      <header className="sticky top-0 z-40 bg-navy/95 backdrop-blur-md border-b border-white/10 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <button
            onClick={onNavigateHome}
            className="flex items-center space-x-2 text-xs sm:text-sm font-semibold text-slate-300 hover:text-gold transition-colors focus:outline-none cursor-pointer group"
            title="Back to home"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="hidden sm:inline">Prof. Dr. Basri Çakıroğlu</span>
            <span className="sm:hidden">Home</span>
          </button>
          <div className="text-center">
            <p className="text-sm sm:text-base font-bold font-display text-white tracking-tight">International Patients</p>
            <p className="text-[10px] text-gold tracking-wider uppercase font-medium">Istanbul, Turkey</p>
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
              <span>Request Consultation</span>
            </button>
          </div>
        </div>
      </header>

      <main className="flex-grow max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12 w-full">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center space-x-2 text-xs text-slate-400">
            <li><a href="/en" onClick={(e) => { e.preventDefault(); onNavigateHome(); }} className="hover:text-gold transition-colors">Home</a></li>
            <li><ChevronRight className="w-3 h-3 text-slate-600" /></li>
            <li className="text-gold" aria-current="page">International Patients</li>
          </ol>
        </nav>

        {/* HERO */}
        <header className="card-glass p-6 sm:p-10 rounded-2xl mb-8 border border-white/10">
          <div className="inline-flex items-center space-x-2 bg-white/5 border border-gold/30 px-3 py-1.5 rounded-full mb-5">
            <Globe className="w-3.5 h-3.5 text-gold" />
            <span className="text-[11px] font-semibold tracking-wider text-gold uppercase">Urology care for patients from abroad</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold font-display text-white tracking-tight leading-snug mb-5">
            Urology Treatment in Istanbul for International Patients
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light max-w-3xl">
            Prof. Dr. Basri Çakıroğlu, Professor of Urology and robotic surgeon, treats patients from the United Kingdom, Europe, the Gulf,
            the Balkans and the CIS at Hisar Intercontinental Hospital in Istanbul. Most cases — HoLEP laser prostate surgery, laser
            kidney stone removal, robotic prostatectomy and male fertility microsurgery — are planned remotely from your reports and
            completed within a single short visit.
          </p>
          <div className="flex flex-wrap gap-3 mt-7">
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 bg-[#25D366] hover:bg-[#1ebe5b] text-white font-bold text-xs uppercase tracking-wider rounded transition-all shadow-lg"
            >
              <MessageCircle className="w-4 h-4" /> Send reports on WhatsApp
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
          <h2 id="steps-heading" className="text-xl sm:text-2xl font-bold font-display text-white mb-6">How it works</h2>
          <ol className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {STEPS.map((s, i) => {
              const Icon = s.icon;
              return (
                <li key={i} className="card-glass p-5 rounded-xl border border-white/10 flex gap-4">
                  <div className="shrink-0 w-10 h-10 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center text-gold">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-gold font-bold mb-1">Step {i + 1}</p>
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
            <Clock className="w-5 h-5 text-gold mr-2" /> Typical length of stay in Istanbul
          </h2>
          <p className="text-xs text-slate-400 mb-5 font-light">
            Includes consultation, pre-operative tests, surgery, hospital nights and the check-up before you fly. Individual plans may differ.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-[11px] uppercase tracking-wider text-slate-400 border-b border-white/10">
                  <th className="py-2 pr-4 font-semibold">Procedure</th>
                  <th className="py-2 pr-4 font-semibold whitespace-nowrap">Stay</th>
                  <th className="py-2 font-semibold"></th>
                </tr>
              </thead>
              <tbody>
                {STAYS.map((row) => (
                  <tr key={row.procedure} className="border-b border-white/5 last:border-0">
                    <td className="py-2.5 pr-4 text-slate-200">{row.procedure}</td>
                    <td className="py-2.5 pr-4 text-white font-semibold whitespace-nowrap">{row.days}</td>
                    <td className="py-2.5 text-right">
                      <a
                        href={servicePath('EN', row.id)}
                        onClick={(e) => { e.preventDefault(); onNavigate(servicePath('EN', row.id)); }}
                        className="text-gold text-xs font-semibold hover:underline whitespace-nowrap"
                      >
                        Details
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
              <ShieldCheck className="w-5 h-5 text-gold mr-2 shrink-0" /> The hospital
            </h2>
            <ul className="space-y-2.5">
              {[
                'Hisar Intercontinental Hospital, Ümraniye — Asian side of Istanbul, 35 min from Sabiha Gökçen Airport',
                'JCI-accredited private hospital with 24-hour intensive care and on-site imaging (MRI, CT)',
                'daVinci surgical robot, holmium laser and current-generation flexible endoscopy',
                'Single rooms with companion bed; halal and special-diet meals available',
              ].map((t) => (
                <li key={t} className="flex items-start text-slate-300 text-xs sm:text-sm leading-relaxed">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 mr-2 mt-0.5 shrink-0" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="card-glass p-6 rounded-xl border border-white/10">
            <h2 className="text-white font-bold text-sm uppercase tracking-wider mb-4 flex items-center">
              <Stethoscope className="w-5 h-5 text-gold mr-2 shrink-0" /> The surgeon
            </h2>
            <ul className="space-y-2.5">
              {[
                'Professor of Urology, Üsküdar University Faculty of Medicine',
                'Head of the Urology Clinic at Hisar Intercontinental Hospital since 2010',
                'More than 30 years of clinical practice; over 10,000 surgical procedures',
                'Focus: HoLEP laser prostate surgery, daVinci robotic uro-oncology, endourological stone surgery, andrology microsurgery',
              ].map((t) => (
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
          <h2 id="services-heading" className="text-lg font-bold font-display text-white mb-5">Treatments for international patients</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {services.map((item) => (
              <a
                key={item.id}
                href={servicePath('EN', item.id)}
                onClick={(e) => { e.preventDefault(); onNavigate(servicePath('EN', item.id)); }}
                className="card-glass p-5 rounded-xl border border-white/10 hover:border-gold/40 transition-all group flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-sm font-bold text-white group-hover:text-gold transition-colors mb-2 font-display">{item.title}</h3>
                  <p className="text-xs text-slate-400 line-clamp-3 font-light">{item.shortDesc}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-white/5 flex items-center text-[11px] text-gold font-semibold">
                  Learn more <ChevronRight className="w-3 h-3 ml-0.5" />
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* GUIDES */}
        {guides.length > 0 && (
          <section className="mb-10" aria-labelledby="guides-heading">
            <h2 id="guides-heading" className="text-lg font-bold font-display text-white mb-5">Patient guides</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {guides.map((post) => (
                <a
                  key={post.id}
                  href={articlePath('EN', post.slug)}
                  onClick={(e) => { e.preventDefault(); onNavigate(articlePath('EN', post.slug)); }}
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
            <HelpCircle className="w-5 h-5 text-gold mr-2" /> Frequently asked questions
          </h2>
          <dl className="space-y-5">
            {FAQ.map((f, i) => (
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
              <h2 className="text-lg sm:text-xl font-bold font-display text-white">Start with a free review of your reports</h2>
              <p className="text-slate-300 text-xs sm:text-sm max-w-xl font-light">
                Send your reports by WhatsApp or e-mail. You will receive a written assessment and a treatment plan before you make any travel arrangements.
              </p>
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
            <p className="font-bold text-slate-300 mb-1">Prof. Dr. Basri Çakıroğlu — International Patients</p>
            <address className="not-italic text-slate-500 text-[11px] max-w-md">
              {DOCTOR.hospital.name} · {DOCTOR.addressLine} · <a href={`tel:${DOCTOR.telephoneRaw}`} className="hover:text-gold">{DOCTOR.telephone}</a>
            </address>
          </div>
          <p className="text-slate-500 text-[11px] max-w-md">
            Content on this page is for information only and does not replace an individual medical consultation.
          </p>
        </div>
      </footer>
    </div>
  );
}
