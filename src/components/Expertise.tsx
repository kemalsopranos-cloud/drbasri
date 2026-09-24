import { useState } from 'react';
import { L } from '../i18n';
import {
  Cpu,
  Activity,
  ShieldAlert,
  Sparkles,
  Heart,
  User,
  ArrowRight,
  X,
  HelpCircle,
  CheckCircle2
} from 'lucide-react';
import { Language, ExpertiseItem } from '../types';
import { uiTranslations } from '../translations';
import { servicePath } from '../routes';
import { getExpertiseItems, expertiseSlugs } from '../data';

interface ExpertiseProps {
  language: Language;
  onNavigate: (path: string) => void;
}

export default function Expertise({ language, onNavigate }: ExpertiseProps) {
  const [selectedItem, setSelectedItem] = useState<ExpertiseItem | null>(null);
  const t = uiTranslations[language];
  const items = getExpertiseItems(language);

  // Dynamic icon mapping based on data iconName
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'Cpu':
        return <Cpu className="w-6 h-6 text-gold" />;
      case 'Activity':
        return <Activity className="w-6 h-6 text-gold" />;
      case 'ShieldAlert':
        return <ShieldAlert className="w-6 h-6 text-gold" />;
      case 'Sparkles':
        return <Sparkles className="w-6 h-6 text-gold" />;
      case 'Heart':
        return <Heart className="w-6 h-6 text-gold" />;
      case 'User':
        return <User className="w-6 h-6 text-gold" />;
      default:
        return <Activity className="w-6 h-6 text-gold" />;
    }
  };

  return (
    <section id="expertise" className="py-24 bg-navy relative overflow-hidden border-t border-white/10">
      {/* Visual background accents */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-sky-950/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-gold/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs uppercase tracking-[0.2em] text-gold font-bold mb-3">
            {t.navExpertise}
          </h2>
          <p className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-white tracking-tight leading-none">
            {t.sectionExpertiseSubtitle}
          </p>
          <div className="w-16 h-1 bg-gold mx-auto mt-6 rounded-full" />
        </div>

        {/* Interactive Expertise Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {items.map((item) => (
            <div
              key={item.id}
              className="group card-glass p-6 sm:p-8 rounded-xl flex flex-col justify-between"
            >
              <div>
                {/* Header elements inside card */}
                <div className="flex items-center justify-between mb-6">
                  <div className="p-3.5 bg-white/5 rounded-lg border border-white/10 group-hover:border-gold/30 transition-colors">
                    {getIconComponent(item.iconName)}
                  </div>
                  <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold font-sans">
                    {L(language, { TR: 'ÜROLOJİ', EN: 'UROLOGY' })}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white group-hover:text-gold transition-colors mb-4 font-display">
                  {item.title}
                </h3>
                
                <p className="text-slate-300 text-sm font-light leading-relaxed mb-6">
                  {item.shortDesc}
                </p>
              </div>

              {/* Card Trigger Actions: quick-view modal + a real, crawlable link to the dedicated page */}
              <div className="flex items-center justify-between pt-4 border-t border-white/10 mt-4 gap-3">
                <button
                  id={`btn-exp-${item.id}`}
                  onClick={() => setSelectedItem(item)}
                  className="inline-flex items-center space-x-1.5 text-xs font-bold text-gold group-hover:text-gold/80 hover:underline cursor-pointer focus:outline-none"
                >
                  <span>{t.expertiseCardMore}</span>
                </button>
                <a
                  href={servicePath(language, item.id)}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate(servicePath(language, item.id));
                  }}
                  className="inline-flex items-center space-x-1.5 text-xs font-bold text-slate-300 hover:text-gold cursor-pointer focus:outline-none"
                  title={L(language, { TR: 'Detaylı Sayfayı Görüntüle', EN: 'View Full Page' })}
                >
                  <span>{L(language, { TR: 'Sayfayı Aç', EN: 'Open Page' })}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Specialty Detail Modal Overlay */}
      {selectedItem && (
        <div className="fixed inset-0 bg-navy/90 backdrop-blur-md z-50 flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
          <div
            className="bg-navy border border-white/10 rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl relative"
            id="expertise-detail-modal"
          >
            {/* Modal Header banner */}
            <div className="sticky top-0 bg-navy/95 backdrop-blur-md border-b border-white/10 p-6 flex justify-between items-center z-10">
              <div className="flex items-center space-x-4">
                <div className="p-2.5 bg-white/5 rounded-lg border border-white/10">
                  {getIconComponent(selectedItem.iconName)}
                </div>
                <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
                  {selectedItem.title}
                </h3>
              </div>
              <button
                id="close-expertise-modal"
                onClick={() => setSelectedItem(null)}
                className="p-2 text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-colors border border-white/10 focus:outline-none"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-8">
              {/* Detailed Description */}
              <div className="space-y-3">
                <p className="text-slate-200 text-sm sm:text-base leading-relaxed font-sans font-light">
                  {selectedItem.longDesc}
                </p>
              </div>

              {/* Conditions and Symptoms / Treatments split */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                
                {/* Conditions Treated Column */}
                <div className="card-glass p-6 rounded-xl">
                  <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4 flex items-center">
                    <HelpCircle className="w-5 h-5 text-gold mr-2 shrink-0" />
                    <span>{t.expertiseModalConditions}</span>
                  </h4>
                  <ul className="space-y-3">
                    {selectedItem.conditions.map((cond, idx) => (
                      <li key={idx} className="flex items-start text-slate-300 text-xs leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-gold mr-2.5 mt-2 shrink-0" />
                        <span>{cond}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Applied Treatments Column */}
                <div className="card-glass p-6 rounded-xl">
                  <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4 flex items-center">
                    <CheckCircle2 className="w-5 h-5 text-gold mr-2 shrink-0" />
                    <span>{t.expertiseModalTreatments}</span>
                  </h4>
                  <ul className="space-y-3">
                    {selectedItem.treatments.map((treatment, idx) => (
                      <li key={idx} className="flex items-start text-slate-300 text-xs leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-2.5 mt-2 shrink-0" />
                        <span>{treatment}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
            </div>

            {/* Modal Footer actions */}
            <div className="border-t border-white/10 p-6 flex justify-between items-center bg-black/20">
              <a
                href={servicePath(language, selectedItem.id)}
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedItem(null);
                  onNavigate(servicePath(language, selectedItem.id));
                }}
                className="text-gold hover:text-gold/80 font-bold text-xs uppercase tracking-widest transition-colors focus:outline-none"
              >
                {L(language, { TR: 'Tam Sayfayı Görüntüle →', EN: 'View Full Page →' })}
              </a>
              <button
                id="close-expertise-modal-footer"
                onClick={() => setSelectedItem(null)}
                className="bg-gold hover:bg-gold/90 text-navy font-bold px-6 py-2.5 rounded-sm text-xs uppercase tracking-widest transition-colors focus:outline-none"
              >
                {t.expertiseModalClose}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
