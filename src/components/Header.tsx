import { useState, useEffect } from 'react';
import { Menu, X, Calendar, Globe, Clock, Phone, Instagram } from 'lucide-react';
import { Language } from '../types';
import { uiTranslations } from '../translations';
import { contactDetails } from '../data';

interface HeaderProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  onOpenAppointment: () => void;
}

export default function Header({
  language,
  setLanguage,
  onOpenAppointment,
}: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const t = uiTranslations[language];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: t.navHome, id: 'home' },
    { label: t.navAbout, id: 'about' },
    { label: t.navExpertise, id: 'expertise' },
    { label: t.navContact, id: 'contact' },
  ];

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of sticky header
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <header
      id="header-navigation"
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-navy/95 backdrop-blur-md shadow-lg border-b border-white/10 py-3'
          : 'bg-gradient-to-b from-navy/80 to-transparent py-5'
      }`}
    >
      {/* Top bar for emergency contact info - desktop only */}
      <div className="hidden lg:block max-w-7xl mx-auto px-6 mb-2">
        <div className="flex justify-between items-center text-xs text-slate-300 border-b border-white/10 pb-2">
          <div className="flex items-center space-x-6">
            <span className="flex items-center">
              <Clock className="w-3.5 h-3.5 text-gold mr-2" />
              <span>Pzt - Cmt / Mon - Sat: 09:00 - 18:00</span>
            </span>
            <span className="flex items-center">
              <Phone className="w-3.5 h-3.5 text-gold mr-2" />
              <a href={`tel:${contactDetails.phone}`} className="hover:text-gold transition-colors">
                {contactDetails.phoneFormatted}
              </a>
            </span>
            <a
              id="header-instagram-link"
              href="https://www.instagram.com/drbasricakiroglu/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-slate-300 hover:text-gold transition-colors text-xs"
              title="Instagram"
            >
              <Instagram className="w-3.5 h-3.5 text-gold mr-1.5" />
              <span>Instagram</span>
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between">
          {/* Brand/Logo with Premium Academic vibe */}
          <button
            id="brand-logo"
            onClick={() => scrollToSection('home')}
            className="flex items-center gap-3 text-left group focus:outline-none"
          >
            <div className="w-10 h-10 bg-gold rounded flex items-center justify-center font-bold text-navy text-lg font-display transition-transform group-hover:scale-105">
              BÇ
            </div>
            <div className="flex flex-col">
              <span className="text-sm uppercase tracking-widest font-bold text-white font-sans group-hover:text-gold transition-colors">
                Prof. Dr. Basri Çakıroğlu
              </span>
              <span className="text-[10px] tracking-wider text-slate-400 uppercase font-sans font-light">
                {t.heroSubtitle}
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                id={`nav-${item.id}`}
                onClick={() => scrollToSection(item.id)}
                className="px-3 py-2 text-xs uppercase tracking-widest text-slate-200 hover:text-gold font-medium transition-all rounded-sm hover:bg-white/5"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right Action Controls */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Language Switcher */}
            <div className="flex items-center bg-white/5 rounded-full p-0.5 border border-white/10">
              <button
                id="lang-tr"
                onClick={() => setLanguage('TR')}
                className={`flex items-center justify-center w-7 h-7 rounded-full text-[10px] font-bold transition-all ${
                  language === 'TR'
                    ? 'bg-gold text-navy shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                TR
              </button>
              <button
                id="lang-en"
                onClick={() => setLanguage('EN')}
                className={`flex items-center justify-center w-7 h-7 rounded-full text-[10px] font-bold transition-all ${
                  language === 'EN'
                    ? 'bg-gold text-navy shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                EN
              </button>
            </div>

            {/* Quick Appointment Action */}
            <button
              id="cta-appointment-header"
              onClick={onOpenAppointment}
              className="bg-gold hover:bg-gold/90 text-navy px-5 py-2 rounded-sm text-[11px] font-bold uppercase tracking-wider transition-all shadow-md shadow-gold/10"
            >
              <span>{t.navAppointment}</span>
            </button>
          </div>

          {/* Mobile controls (Language + Instagram + Hamburger) */}
          <div className="flex items-center space-x-3 md:hidden">
            {/* Instagram Link */}
            <a
              id="mobile-instagram-link"
              href="https://www.instagram.com/drbasricakiroglu/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-md bg-white/5 text-gold hover:text-white hover:bg-white/10 border border-white/10 transition-colors flex items-center justify-center"
              aria-label="Instagram"
              title="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>

            {/* Simple mobile lang switch to save space */}
            <button
              id="mobile-lang-toggle"
              onClick={() => setLanguage(language === 'TR' ? 'EN' : 'TR')}
              className="flex items-center space-x-1 px-2.5 py-1.5 rounded-md bg-white/5 border border-white/10 text-xs text-gold font-bold"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{language}</span>
            </button>

            {/* Hamburger Menu */}
            <button
              id="mobile-menu-toggle"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 focus:outline-none border border-white/10"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div className="md:hidden fixed inset-x-0 top-[60px] bg-navy border-b border-white/10 shadow-2xl py-6 px-4 space-y-4 z-50 animate-in fade-in slide-in-from-top-5 duration-200">
          <div className="flex flex-col space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                id={`mobile-nav-${item.id}`}
                onClick={() => scrollToSection(item.id)}
                className="text-left w-full px-4 py-3 text-sm uppercase tracking-wider text-slate-200 hover:text-gold font-medium transition-colors hover:bg-white/5 rounded-md"
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="border-t border-white/10 pt-4 flex flex-col space-y-3">
            <button
              id="mobile-cta-appointment"
              onClick={() => {
                setIsOpen(false);
                onOpenAppointment();
              }}
              className="w-full bg-gold hover:bg-gold/90 text-navy py-3 rounded-md font-bold text-center uppercase tracking-widest text-sm shadow-lg flex items-center justify-center space-x-2"
            >
              <Calendar className="w-4 h-4" />
              <span>{t.navAppointment}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
