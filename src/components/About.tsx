import { GraduationCap, Award, CheckCircle } from 'lucide-react';
import { Language } from '../types';
import { uiTranslations } from '../translations';
import { getMilestones } from '../data';

interface AboutProps {
  language: Language;
}

export default function About({ language }: AboutProps) {
  const t = uiTranslations[language];
  const milestones = getMilestones(language);

  const stats = [
    { value: "30+", label: t.aboutStatsExperience, sub: language === 'TR' ? 'Tıp & Üroloji Pratiği' : 'Medical & Urology Practice' },
    { value: "5.000+", label: t.aboutStatsSurgeries, sub: language === 'TR' ? 'Mikro & Lazer Cerrahi' : 'Micro & Laser Cases' },
    { value: "80+", label: t.aboutStatsPapers, sub: language === 'TR' ? 'Uluslararası Yayın' : 'Peer-Reviewed Articles' }
  ];

  return (
    <section id="about" className="py-24 bg-navy relative overflow-hidden border-t border-white/10">
      {/* Visual background accents */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-gold/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-10 w-80 h-80 bg-sky-950/10 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs uppercase tracking-[0.2em] text-gold font-bold mb-3">
            {t.sectionAboutTitle}
          </h2>
          <p className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-white tracking-tight leading-none">
            {t.sectionAboutSubtitle}
          </p>
          <div className="w-16 h-1 bg-gold mx-auto mt-6 rounded-full" />
        </div>

        {/* Biographic Details & Timeline Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Bio Card and Numeric Metrics */}
          <div className="lg:col-span-7 space-y-8">
            <div className="card-glass p-8 sm:p-10 rounded-xl shadow-xl">
              <h3 className="text-xl font-bold font-display text-white mb-6 flex items-center">
                <GraduationCap className="w-6 h-6 text-gold mr-3" />
                {t.aboutBioTitle}
              </h3>
              
              <div className="space-y-4 text-slate-300 text-sm leading-relaxed font-light text-justify">
                {language === 'TR' ? (
                  <>
                    <p>
                      <strong>Prof. Dr. Basri Çakıroğlu</strong>, 1969 yılında Samsun’da doğmuştur. 1994 yılında <strong>Ondokuz Mayıs Üniversitesi Tıp Fakültesi</strong>’nden mezun olmuş, 2002 yılında <strong>Taksim Eğitim ve Araştırma Hastanesi</strong>’nde Üroloji ihtisasını tamamlamıştır. Kariyeri boyunca Şebinkarahisar Devlet Hastanesi’nde Başhekim ve Üroloji Uzmanı olarak görev almış, 2010 yılından itibaren <strong>Hisar Intercontinental Hospital</strong>’da Üroloji Kliniği Sorumlusu olarak çalışmaktadır.
                    </p>
                    <p>
                      2020 yılında <strong>Üroloji Doçenti</strong> unvanını almış, Atlas Üniversitesi ve İstanbul Galata Üniversitesi'nde öğretim üyeliği yapmıştır. 12 Haziran 2025 tarihi itibariyle <strong>Üsküdar Üniversitesi Tıp Fakültesi Üroloji Anabilim Dalı</strong>’na Profesör kadrosuyla atanmıştır. 2023 yılından bu yana Üsküdar Üniversitesi’nde öğretim üyesi olarak görev yapmaktadır.
                    </p>
                    <p>
                      İleri düzeyde İngilizce bilen Prof. Dr. Çakıroğlu’nun, ulusal ve uluslararası hakemli dergilerde yayımlanmış 30’dan fazla bilimsel makalesi bulunmaktadır. Türk Üroloji Derneği, Avrupa Üroloji Derneği, Endoüroloji Derneği, Avrasya Üroonkoloji Derneği ve Androloji Derneği üyesidir. Başlıca ilgi alanları arasında üroonkoloji, androloji, ve minimal invaziv ürolojik cerrahi yer almaktadır.
                    </p>
                  </>
                ) : (
                  <>
                    <p>
                      <strong>Prof. Dr. Basri Çakıroğlu</strong> was born in Samsun in 1969. He graduated from <strong>Ondokuz Mayıs University Faculty of Medicine</strong> in 1994 and completed his residency in Urology at <strong>Taksim Training and Research Hospital</strong> in 2002. Throughout his career, he served as Chief Physician and Urology Specialist at Şebinkarahisar State Hospital, and since 2010, he has been working as the Head of the Urology Clinic at <strong>Hisar Intercontinental Hospital</strong>.
                    </p>
                    <p>
                      He received the title of <strong>Associate Professor of Urology</strong> in 2020, and has served as a faculty member at Atlas University and Istanbul Galata University. As of June 12, 2025, he has been appointed as a <strong>Professor</strong> in the Department of Urology at <strong>Üsküdar University Faculty of Medicine</strong>. He has been serving as a faculty member at Üsküdar University since 2023.
                    </p>
                    <p>
                      Prof. Dr. Çakıroğlu, who speaks advanced English, has published more than 30 scientific articles in national and international peer-reviewed journals. He is a member of the Turkish Urological Association, European Association of Urology, Endourology Society, Eurasian Urooncology Association, and Andrology Association. His primary areas of interest include urooncology, andrology, and minimally invasive urological surgery.
                    </p>
                  </>
                )}
              </div>

              {/* Core Philosophy Bullets */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 pt-8 border-t border-white/10">
                <div className="flex items-center space-x-3 text-slate-300 text-xs">
                  <CheckCircle className="w-4 h-4 text-gold shrink-0" />
                  <span>{language === 'TR' ? 'Kişiselleştirilmiş Cerrahi Plan' : 'Customized Surgical Mapping'}</span>
                </div>
                <div className="flex items-center space-x-3 text-slate-300 text-xs">
                  <CheckCircle className="w-4 h-4 text-gold shrink-0" />
                  <span>{language === 'TR' ? 'Multidisipliner Onkoloji' : 'Multidisciplinary Cancer Board'}</span>
                </div>
                <div className="flex items-center space-x-3 text-slate-300 text-xs">
                  <CheckCircle className="w-4 h-4 text-gold shrink-0" />
                  <span>{language === 'TR' ? 'Minimal İnvaziv Yaklaşımlar' : 'Minimally Invasive Focus'}</span>
                </div>
                <div className="flex items-center space-x-3 text-slate-300 text-xs">
                  <CheckCircle className="w-4 h-4 text-gold shrink-0" />
                  <span>{language === 'TR' ? 'Hızlı İyileşme Protokolleri' : 'Rapid-Recovery Protocols'}</span>
                </div>
              </div>
            </div>

            {/* Responsive Numeric Stats Blocks */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className="card-glass p-6 rounded-xl text-center group"
                >
                  <div className="text-3xl font-bold text-gold font-display tracking-tight mb-2 group-hover:scale-105 transition-transform duration-300">
                    {stat.value}
                  </div>
                  <div className="text-white text-xs font-semibold uppercase tracking-wider mb-1">
                    {stat.label}
                  </div>
                  <div className="text-slate-400 text-[11px] font-light">
                    {stat.sub}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Academic CV Timeline */}
          <div className="lg:col-span-5">
            <div className="card-glass p-8 rounded-xl shadow-lg relative">
              <h3 className="text-xl font-bold font-display text-white mb-2 flex items-center">
                <Award className="w-5 h-5 text-gold mr-2" />
                {t.aboutMilestonesTitle}
              </h3>
              <p className="text-xs text-slate-400 mb-8 leading-relaxed">
                {t.aboutMilestoneDesc}
              </p>

              {/* Timeline Items */}
              <div className="relative border-l-2 border-white/10 pl-6 ml-2 space-y-8 py-2">
                {milestones.map((m, idx) => (
                  <div key={idx} className="relative group">
                    {/* Glowing circular connector point */}
                    <span className="absolute -left-[31px] top-1 flex items-center justify-center w-4 h-4 rounded-full bg-navy border-2 border-gold group-hover:bg-gold transition-colors">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold group-hover:bg-navy" />
                    </span>
                    
                    <span className="inline-block text-[10px] font-bold text-gold tracking-widest uppercase mb-1">
                      {m.year}
                    </span>
                    <h4 className="text-white font-bold text-sm mb-1 group-hover:text-gold transition-colors">
                      {m.title}
                    </h4>
                    <p className="text-slate-400 text-xs leading-relaxed font-light">
                      {m.institution}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
