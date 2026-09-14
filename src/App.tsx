import { useState, useEffect, useMemo } from 'react';
import { Calendar, Clock, ChevronUp, Shield, Globe, FileText, Phone, Lock, Instagram } from 'lucide-react';
import { Language, Appointment, BlogPost } from './types';
import { uiTranslations } from './translations';
import { db } from './firebase';
import { collection, doc, setDoc, updateDoc, onSnapshot, query, orderBy } from 'firebase/firestore';
import { expertiseSlugs, getExpertiseItemBySlug, getExpertiseItems } from './data';

// Import our modular components
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Expertise from './components/Expertise';
import Contact from './components/Contact';
import BlogPage from './components/BlogPage';
import ServicePage from './components/ServicePage';
import AddArticleModal from './components/AddArticleModal';
import AppointmentModal from './components/AppointmentModal';
import { updatePageSeo } from './utils/seo';
import { buildHomeMeta } from './seo/meta';
import { DOCTOR } from './seo/site';

interface AppProps {
  // SSR / prerender: sunucuda window yok, rota dışarıdan verilir.
  initialPath?: string;
  // Build sırasında Firestore'dan çekilen yazılar; istemci de aynı listeyle
  // başlar (window.__SSR_POSTS__) ki hydration çıktısı birebir eşleşsin.
  ssrPosts?: BlogPost[];
}

export default function App({ initialPath, ssrPosts }: AppProps = {}) {
  const [language, setLanguage] = useState<Language>('TR');
  const [isAppointmentOpen, setIsAppointmentOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  // HYDRATION: localStorage'a bağlı başlangıç değerleri sunucuda üretilemez;
  // ilk render'da her zaman false, gerçek değer mount sonrası effect ile okunur.
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPath, setCurrentPath] = useState<string>(() => {
    // Sondaki "/" atılır: "/blog/" ve "/blog" aynı rota (aksi hâlde hizmet
    // sayfası eşleşmez ve SSR HTML'i ile hydrate uyumsuz olur)
    const raw = initialPath ?? (typeof window !== 'undefined' ? window.location.pathname : '/');
    return raw.replace(/\/+$/, '') || '/';
  });

  // Resolve the current path to a dedicated service/treatment page, if any
  const activeServiceItem = useMemo(() => {
    return getExpertiseItemBySlug(language, currentPath.replace(/^\//, ''));
  }, [language, currentPath]);

  // Listen to browser forward/back buttons
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Update homepage SEO when on main route
  useEffect(() => {
    if (!currentPath.startsWith('/blog') && !activeServiceItem) {
      updatePageSeo(buildHomeMeta());
    }
  }, [currentPath, language]);

  // Sync login status across events (+ ilk okuma mount sonrası)
  useEffect(() => {
    try {
      setIsLoggedIn(localStorage.getItem('basri_logged_in') === 'true');
    } catch { /* gizli sekme / SSR */ }
    const handleLoginState = (e: any) => {
      const loggedIn = e.detail?.isLoggedIn ?? (localStorage.getItem('basri_logged_in') === 'true');
      setIsLoggedIn(loggedIn);
    };
    window.addEventListener('basri-login-state-changed', handleLoginState);
    return () => window.removeEventListener('basri-login-state-changed', handleLoginState);
  }, []);

  // Listen for open-add-article custom event
  useEffect(() => {
    const handleOpenModal = () => setIsAddModalOpen(true);
    window.addEventListener('open-add-article', handleOpenModal);
    return () => window.removeEventListener('open-add-article', handleOpenModal);
  }, []);

  // Navigation helpers
  const navigateToBlog = () => {
    window.history.pushState({}, '', '/blog');
    setCurrentPath('/blog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToHome = () => {
    window.history.pushState({}, '', '/');
    setCurrentPath('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Generic client-side navigation for dedicated service/treatment pages
  const navigateToPath = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };


  // Persistence: Real-time synchronization of appointments from Firestore
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('dr_basri_appointments');
      if (stored) setAppointments(JSON.parse(stored));
    } catch { /* yok say */ }
    try {
      const q = query(
        collection(db, 'appointments'),
        orderBy('createdAt', 'desc')
      );

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const fetched: Appointment[] = [];
        snapshot.forEach((docSnap) => {
          const data = docSnap.data();
          fetched.push({
            id: docSnap.id,
            fullName: data.fullName || '',
            phone: data.phone || '',
            email: data.email || '',
            preferredDate: data.preferredDate || '',
            preferredTime: data.preferredTime || '',
            topicId: data.topicId || '',
            notes: data.notes || '',
            status: data.status || 'pending',
            createdAt: data.createdAt || new Date().toISOString()
          });
        });

        setAppointments(fetched);
        localStorage.setItem('dr_basri_appointments', JSON.stringify(fetched));
      }, (error) => {
        console.error("Failed to load appointments from Firestore:", error);
      });

      return () => unsubscribe();
    } catch (e) {
      console.error("Firestore appointments init error:", e);
    }
  }, []);

  // Back to top scroll listener
  useEffect(() => {
    const toggleVisibility = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const t = uiTranslations[language];

  // Callback to insert new scheduled session
  const handleAppointmentCreated = async (newApt: Appointment) => {
    // 1. Optimistic UI update
    setAppointments((prev) => [newApt, ...prev]);

    // 2. Save to Firestore
    try {
      await setDoc(doc(db, 'appointments', newApt.id), {
        fullName: newApt.fullName,
        phone: newApt.phone,
        email: newApt.email,
        preferredDate: newApt.preferredDate,
        preferredTime: newApt.preferredTime,
        topicId: newApt.topicId,
        notes: newApt.notes || '',
        status: newApt.status,
        createdAt: newApt.createdAt
      });
    } catch (e) {
      console.error("Failed to save appointment to Firestore:", e);
    }

    // 3. Send email notification via our backend API
    try {
      await fetch('/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newApt)
      });
    } catch (e) {
      console.error("Failed to send appointment email notification:", e);
    }
  };

  // Callback to cancel an existing session
  const handleCancelAppointment = async (id: string) => {
    // 1. Optimistic UI update
    setAppointments((prev) =>
      prev.map((apt) => (apt.id === id ? { ...apt, status: 'cancelled' } : apt))
    );

    // 2. Update in Firestore
    try {
      await updateDoc(doc(db, 'appointments', id), {
        status: 'cancelled'
      });
    } catch (e) {
      console.error("Failed to cancel appointment in Firestore:", e);
    }
  };

  // Callback to confirm an existing session
  const handleConfirmAppointment = async (id: string) => {
    // 1. Optimistic UI update
    setAppointments((prev) =>
      prev.map((apt) => (apt.id === id ? { ...apt, status: 'confirmed' } : apt))
    );

    // 2. Update in Firestore
    try {
      await updateDoc(doc(db, 'appointments', id), {
        status: 'confirmed'
      });
    } catch (e) {
      console.error("Failed to confirm appointment in Firestore:", e);
    }
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of header
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

  // /hakkimizda and /iletisim are not separate content — they are sections of the
  // homepage. Redirect them client-side to the matching anchor instead of letting
  // them silently render a duplicate of the homepage (which is what happened before,
  // since there was no route handling for them at all).
  useEffect(() => {
    if (currentPath === '/hakkimizda' || currentPath === '/iletisim') {
      const targetId = currentPath === '/hakkimizda' ? 'about' : 'contact';
      window.history.replaceState({}, '', '/');
      setCurrentPath('/');
      setTimeout(() => scrollToSection(targetId), 150);
    }
  }, [currentPath]);

  // /#about, /#contact gibi bir hash ile gelindiğinde (vercel.json'daki
  // /hakkimizda → /#about yönlendirmesi) ilgili bölüme kaydır.
  useEffect(() => {
    if (currentPath !== '/') return;
    const hash = window.location.hash.replace('#', '');
    if (hash) setTimeout(() => scrollToSection(hash), 150);
  }, [currentPath]);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleAddPost = async (newPost: BlogPost) => {
    try {
      await setDoc(doc(db, 'blog_posts', newPost.id), {
        title: newPost.title,
        slug: newPost.slug,
        excerpt: newPost.excerpt,
        content: newPost.content,
        date: newPost.date,
        readTime: newPost.readTime,
        category: newPost.category,
        author: newPost.author,
        keywords: newPost.keywords || '',
        metaDescription: newPost.metaDescription || '',
        language: language,
        createdAt: Date.now()
      });
      try {
        await fetch('/api/posts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newPost)
        });
      } catch (err) {
        console.warn('Could not sync post to server /api/posts:', err);
      }
    } catch (e) {
      console.error('Firestore write error:', e);
    }
  };

  // IF ON A DEDICATED SERVICE/TREATMENT PAGE ROUTE (e.g. /holep-lazer-prostat-tedavisi)
  if (activeServiceItem) {
    return (
      <>
        <ServicePage
          language={language}
          setLanguage={setLanguage}
          item={activeServiceItem}
          slug={currentPath.replace(/^\//, '')}
          onNavigateHome={navigateToHome}
          onNavigate={navigateToPath}
          onOpenAppointment={() => setIsAppointmentOpen(true)}
        />
        <AppointmentModal
          language={language}
          isOpen={isAppointmentOpen}
          onClose={() => setIsAppointmentOpen(false)}
          onAppointmentCreated={handleAppointmentCreated}
        />
      </>
    );
  }

  // IF ON /blog OR /blog/:slug ROUTE, SERVE DEDICATED SEO BLOG HUB
  if (currentPath.startsWith('/blog')) {
    const slug = currentPath.replace('/blog', '').replace(/^\//, '') || undefined;
    return (
      <>
        <BlogPage
          language={language}
          setLanguage={setLanguage}
          onNavigateHome={navigateToHome}
          onOpenAppointment={() => setIsAppointmentOpen(true)}
          initialSlug={slug}
          initialDbPosts={ssrPosts}
          appointments={appointments}
          onCancelAppointment={handleCancelAppointment}
          onConfirmAppointment={handleConfirmAppointment}
        />
        <AppointmentModal
          language={language}
          isOpen={isAppointmentOpen}
          onClose={() => setIsAppointmentOpen(false)}
          onAppointmentCreated={handleAppointmentCreated}
        />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-navy text-slate-100 flex flex-col justify-between selection:bg-gold selection:text-navy font-sans">
      
      {/* 1. STICKY HEADER */}
      <Header
        language={language}
        setLanguage={setLanguage}
        onOpenAppointment={() => setIsAppointmentOpen(true)}
      />

      {/* MAIN VIEWPORT */}
      <main className="flex-grow">
        
        {/* 2. HERO LANDING */}
        <Hero
          language={language}
          onOpenAppointment={() => setIsAppointmentOpen(true)}
          onScrollToExpertise={() => scrollToSection('expertise')}
          onAppointmentCreated={handleAppointmentCreated}
        />

        {/* 3. ACADEMIC ABOUT PORTFOLIO */}
        <About language={language} />

        {/* 4. CLINICAL EXPERTISE GRID */}
        <Expertise language={language} onNavigate={navigateToPath} />

        {/* 5. SECURE CONTACT & DIRECTION MAP */}
        <Contact language={language} />

      </main>

      {/* 6. SECURE ACADEMIC FOOTER */}
      <footer className="bg-black/30 border-t border-white/5 py-12 px-6 relative z-10 text-slate-400">
        <div className="max-w-7xl mx-auto pb-8 mb-8 border-b border-white/5">
          <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-3 text-center md:text-left">
            {language === 'TR' ? 'Uzmanlık Alanlarımız' : 'Our Specialties'}
          </p>
          <nav className="flex flex-wrap justify-center md:justify-start gap-x-5 gap-y-2 text-xs">
            {getExpertiseItems(language).map((item) => (
              <a
                key={item.id}
                href={`/${expertiseSlugs[item.id]}`}
                onClick={(e) => {
                  e.preventDefault();
                  navigateToPath(`/${expertiseSlugs[item.id]}`);
                }}
                className="text-slate-400 hover:text-gold transition-colors"
              >
                {item.title}
              </a>
            ))}
          </nav>
        </div>

        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">

          {/* Copyright Info + NAP (yerel SEO: adres/telefon her sayfada metin olarak) */}
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-widest text-slate-400 font-medium">
              {t.footerCopyright}
            </p>
            <address className="not-italic text-[11px] text-slate-500 max-w-md mx-auto md:mx-0">
              {DOCTOR.hospital.name} · {DOCTOR.addressLine} ·{' '}
              <a href={`tel:${DOCTOR.telephoneRaw}`} className="hover:text-gold">{DOCTOR.telephone}</a>
            </address>
            <p className="text-[11px] text-slate-600 max-w-md mx-auto md:mx-0">
              {t.footerDisclaimer}
            </p>
          </div>

          {/* Quick link tags for professional footer navigation */}
          <div className="flex flex-col lg:flex-row items-center gap-6">
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs uppercase tracking-widest text-slate-400">
              <button
                onClick={() => scrollToSection('home')}
                className="hover:text-gold transition-colors focus:outline-none cursor-pointer"
              >
                {t.navHome}
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="hover:text-gold transition-colors focus:outline-none cursor-pointer"
              >
                {t.navAbout}
              </button>
              <button
                onClick={() => scrollToSection('expertise')}
                className="hover:text-gold transition-colors focus:outline-none cursor-pointer"
              >
                {t.navExpertise}
              </button>
              <button
                id="footer-nav-blog"
                onClick={navigateToBlog}
                className="hover:text-gold transition-colors focus:outline-none cursor-pointer"
              >
                {language === 'TR' ? 'Tıbbi Yayınlar (Blog)' : 'Medical Blog'}
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="hover:text-gold transition-colors focus:outline-none cursor-pointer"
              >
                {t.navContact}
              </button>
            </div>

            {/* Author Portal Trigger */}
            <button
              id="footer-doctor-login"
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center space-x-2 px-5 py-2.5 bg-gold/10 hover:bg-gold/20 active:bg-gold/30 border border-gold/30 hover:border-gold/50 text-gold rounded-sm text-[10px] font-bold uppercase tracking-widest transition-all cursor-pointer focus:outline-none shrink-0"
              title={language === 'TR' ? 'Hekim & Yazar Giriş Paneli' : 'Doctor & Author Login Portal'}
            >
              {isLoggedIn ? (
                <>
                  <Shield className="w-3.5 h-3.5" />
                  <span>{language === 'TR' ? 'Yazar Paneli' : 'Author Panel'}</span>
                </>
              ) : (
                <>
                  <Lock className="w-3.5 h-3.5" />
                  <span>{language === 'TR' ? 'Hekim Girişi' : 'Doctor Login'}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </footer>

      {/* 7. PERSISTENT INTERACTIVE MODALS */}
      <AppointmentModal
        language={language}
        isOpen={isAppointmentOpen}
        onClose={() => setIsAppointmentOpen(false)}
        onAppointmentCreated={handleAppointmentCreated}
      />

      {isAddModalOpen && (
        <AddArticleModal
          language={language}
          onClose={() => setIsAddModalOpen(false)}
          onAdd={handleAddPost}
          existingCategories={['Onkoloji', 'Lazer Cerrahi', 'Prostat Sağlığı', 'Teknoloji', 'Taş Hastalıkları', 'Kadın Ürolojisi', 'Androloji']}
          appointments={appointments}
          onCancelAppointment={handleCancelAppointment}
          onConfirmAppointment={handleConfirmAppointment}
        />
      )}

      {/* 9. FLOATING ACTION ACCESSORIES (BACK-TO-TOP & DIRECT-DIAL) */}
      <div className="fixed bottom-6 right-6 flex flex-col space-y-3 z-30">
        {/* Instagram button */}
        <a
          id="floating-instagram-btn"
          href="https://www.instagram.com/drbasricakiroglu/"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white p-4 rounded-full shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center border border-white/10"
          title="Instagram"
        >
          <Instagram className="w-5 h-5" />
        </a>

        {/* Quick dial assistant button */}
        <a
          id="floating-dial-btn"
          href="tel:+905332078903"
          className="bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 text-slate-950 p-4 rounded-full shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center border border-emerald-400/20"
          title={language === 'TR' ? 'Hemen Arayın' : 'Call Assistant Now'}
        >
          <Phone className="w-5 h-5 fill-slate-950" />
        </a>

        {/* Floating Quick Booking trigger */}
        <button
          id="floating-booking-btn"
          onClick={() => setIsAppointmentOpen(true)}
          className="bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-slate-950 p-4 rounded-full shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center border border-amber-400/20"
          title={t.navAppointment}
        >
          <Calendar className="w-5 h-5" />
        </button>

        {/* Back to top scroll pointer */}
        {showBackToTop && (
          <button
            id="back-to-top-btn"
            onClick={handleScrollToTop}
            className="bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white p-3.5 rounded-full border border-slate-850 shadow-xl transition-all duration-300 flex items-center justify-center focus:outline-none"
            aria-label="Scroll back to top"
          >
            <ChevronUp className="w-4 h-4" />
          </button>
        )}
      </div>

    </div>
  );
}
