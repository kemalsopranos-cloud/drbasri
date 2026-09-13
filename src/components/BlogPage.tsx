import { useState, useMemo, useEffect, MouseEvent } from 'react';
import {
  Search, Calendar, User, Clock, ArrowRight, ArrowLeft, ChevronRight,
  FileText, Plus, Trash2, Share2, Check, ExternalLink, Shield, BookOpen,
  Phone, Stethoscope, Tag, Hash, Lock, ShieldCheck, LogOut
} from 'lucide-react';
import { Language, BlogPost, Appointment } from '../types';
import { uiTranslations } from '../translations';
import { getBlogPosts, contactDetails } from '../data';
import AddArticleModal from './AddArticleModal';
import { db } from '../firebase';
import { collection, doc, setDoc, deleteDoc, onSnapshot, query, where } from 'firebase/firestore';
import { updatePageSeo, injectArticleJsonLd, removeArticleJsonLd } from '../utils/seo';

interface BlogPageProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  onNavigateHome: () => void;
  onOpenAppointment: () => void;
  initialSlug?: string;
  appointments: Appointment[];
  onCancelAppointment: (id: string) => Promise<void>;
  onConfirmAppointment: (id: string) => Promise<void>;
}

export default function BlogPage({
  language,
  setLanguage,
  onNavigateHome,
  onOpenAppointment,
  initialSlug,
  appointments,
  onCancelAppointment,
  onConfirmAppointment,
}: BlogPageProps) {
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem('basri_logged_in') === 'true');
  const [dbPosts, setDbPosts] = useState<BlogPost[]>([]);
  const [copiedLink, setCopiedLink] = useState(false);
  const [currentSlug, setCurrentSlug] = useState<string | null>(initialSlug || null);

  const t = uiTranslations[language];

  // Sync login status
  useEffect(() => {
    const handleLoginState = (e: any) => {
      const loggedIn = e.detail?.isLoggedIn ?? (localStorage.getItem('basri_logged_in') === 'true');
      setIsLoggedIn(loggedIn);
    };
    window.addEventListener('basri-login-state-changed', handleLoginState);
    return () => window.removeEventListener('basri-login-state-changed', handleLoginState);
  }, []);

  // Fetch Firestore posts in real time
  useEffect(() => {
    try {
      const q = query(
        collection(db, 'blog_posts'),
        where('language', '==', language)
      );

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const fetched: { post: BlogPost; createdAt: number }[] = [];
        snapshot.forEach((docSnap) => {
          const data = docSnap.data();
          fetched.push({
            post: {
              id: docSnap.id,
              title: data.title || '',
              slug: data.slug || docSnap.id,
              excerpt: data.excerpt || '',
              content: data.content || '',
              date: data.date || '',
              readTime: data.readTime || '5',
              category: data.category || 'Üroloji',
              author: data.author || 'Prof. Dr. Basri Çakıroğlu',
              keywords: data.keywords || '',
              metaDescription: data.metaDescription || data.excerpt || ''
            },
            createdAt: data.createdAt || 0
          });
        });
        fetched.sort((a, b) => b.createdAt - a.createdAt);
        setDbPosts(fetched.map((item) => item.post));
      }, (error) => {
        console.error("Failed to load blog posts from Firestore:", error);
      });

      return () => unsubscribe();
    } catch (e) {
      console.error("Firestore setup error:", e);
    }
  }, [language]);

  // Combine Firestore database posts with default high-quality articles
  const allPosts = useMemo(() => {
    const defaultPosts = getBlogPosts(language);
    return [...dbPosts, ...defaultPosts];
  }, [dbPosts, language]);

  // Determine active post if viewing article
  const activePost = useMemo(() => {
    if (!currentSlug) return null;
    return allPosts.find((p) => p.slug === currentSlug || p.id === currentSlug) || null;
  }, [allPosts, currentSlug]);

  // Handle URL change & SEO Meta Tag updates
  useEffect(() => {
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    if (activePost) {
      // Update SEO for single article
      const pageTitle = `${activePost.title} | Prof. Dr. Basri Çakıroğlu`;
      const desc = activePost.metaDescription || activePost.excerpt;
      const kw = activePost.keywords || `${activePost.category}, Üroloji, HoLEP, Robotik Cerrahi, Prof Dr Basri Çakıroğlu`;
      updatePageSeo({
        title: pageTitle,
        description: desc,
        keywords: kw,
        url: `${origin}/blog/${activePost.slug}`
      });
      injectArticleJsonLd(activePost, origin);

      // Update browser URL without reload if needed
      if (window.location.pathname !== `/blog/${activePost.slug}`) {
        window.history.pushState({ slug: activePost.slug }, '', `/blog/${activePost.slug}`);
      }
    } else {
      // SEO for Blog Hub Index
      removeArticleJsonLd();
      const pageTitle = language === 'TR'
        ? 'Tıbbi Makaleler & Sağlık Rehberi | Prof. Dr. Basri Çakıroğlu'
        : 'Medical Articles & Health Guide | Prof. Dr. Basri Cakiroglu';
      const desc = language === 'TR'
        ? 'Prof. Dr. Basri Çakıroğlu tarafından hazırlanan HoLEP lazer prostat cerrahisi, daVinci robotik cerrahi, böbrek taşı ve üroloji makaleleri.'
        : 'Medical articles and guides on HoLEP laser prostate surgery, robotic surgery, and urological treatments by Prof. Dr. Basri Cakiroglu.';
      updatePageSeo({
        title: pageTitle,
        description: desc,
        keywords: 'üroloji makaleleri, HoLEP lazer, robotik cerrahi, böbrek taşı, prostat kanseri erken teşhis, Basri Çakıroğlu',
        url: `${origin}/blog`
      });

      if (window.location.pathname !== '/blog') {
        window.history.pushState({}, '', '/blog');
      }
    }
  }, [activePost, language]);

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      if (path === '/blog' || path === '/blog/') {
        setCurrentSlug(null);
      } else if (path.startsWith('/blog/')) {
        const slug = path.replace('/blog/', '').replace(/\/$/, '');
        setCurrentSlug(slug);
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleSelectPost = (post: BlogPost) => {
    setCurrentSlug(post.slug);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToAll = () => {
    setCurrentSlug(null);
    window.history.pushState({}, '', '/blog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddPost = async (newPost: BlogPost) => {
    try {
      // 1. Save to Firestore
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

      // 2. Sync to server for sitemap generation
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
      console.error("Firestore write error:", e);
    }
  };

  const handleDeletePost = async (postId: string, e: MouseEvent) => {
    e.stopPropagation();
    if (!confirm(language === 'TR' ? 'Bu makaleyi silmek istediğinize emin misiniz?' : 'Are you sure you want to delete this article?')) {
      return;
    }
    try {
      await deleteDoc(doc(db, 'blog_posts', postId));
      try {
        await fetch(`/api/posts/${postId}`, { method: 'DELETE' });
      } catch (err) {
        console.warn('Could not sync post delete to server:', err);
      }
      if (activePost && activePost.id === postId) {
        handleBackToAll();
      }
    } catch (e) {
      console.error("Firestore delete error:", e);
    }
  };

  // Categories list
  const categories = useMemo(() => {
    const list = new Set(allPosts.map((post) => post.category));
    return ['ALL', ...Array.from(list)];
  }, [allPosts]);

  // Filter & search
  const filteredPosts = useMemo(() => {
    return allPosts.filter((post) => {
      const matchesCategory = activeCategory === 'ALL' || post.category === activeCategory;
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.content.toLowerCase().includes(q) ||
        (post.keywords && post.keywords.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [allPosts, activeCategory, searchQuery]);

  // Related posts for single article view
  const relatedPosts = useMemo(() => {
    if (!activePost) return [];
    return allPosts
      .filter((p) => p.id !== activePost.id && (p.category === activePost.category || p.category !== ''))
      .slice(0, 3);
  }, [allPosts, activePost]);

  // Generate Table of Contents from headings in article
  const tableOfContents = useMemo(() => {
    if (!activePost) return [];
    const headings: string[] = [];
    activePost.content.split('\n').forEach((line) => {
      const trimmed = line.trim();
      if (trimmed.startsWith('###')) {
        headings.push(trimmed.replace('###', '').trim());
      }
    });
    return headings;
  }, [activePost]);

  const handleShare = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const renderArticleContent = (content: string) => {
    return content.split('\n').map((line, idx) => {
      const trimmed = line.trim();
      if (trimmed.startsWith('###')) {
        const text = trimmed.replace('###', '').trim();
        const headingId = text.toLowerCase().replace(/[^a-z0-9]/g, '-');
        return (
          <h2
            key={idx}
            id={headingId}
            className="text-xl sm:text-2xl font-bold font-display text-white mt-10 mb-4 border-l-3 border-gold pl-4 scroll-mt-28"
          >
            {text}
          </h2>
        );
      }
      if (trimmed.startsWith('*')) {
        return (
          <li key={idx} className="text-slate-300 ml-6 mb-2 list-disc pl-1 leading-relaxed text-sm sm:text-base font-light">
            {trimmed.replace('*', '').trim()}
          </li>
        );
      }
      if (/^\d+\./.test(trimmed)) {
        return (
          <p key={idx} className="text-slate-200 text-sm sm:text-base leading-relaxed mb-3 pl-2 font-medium">
            {trimmed}
          </p>
        );
      }
      if (trimmed === '') {
        return <div key={idx} className="h-4" />;
      }
      return (
        <p key={idx} className="text-slate-300 text-sm sm:text-base leading-relaxed mb-4 font-light">
          {trimmed}
        </p>
      );
    });
  };

  return (
    <div className="min-h-screen bg-navy text-slate-100 flex flex-col justify-between selection:bg-gold selection:text-navy font-sans">
      
      {/* 1. TOP DEDICATED HEADER FOR BLOG */}
      <header className="sticky top-0 z-40 bg-navy/95 backdrop-blur-md border-b border-white/10 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          
          {/* Back to main clinic landing page */}
          <button
            id="blog-back-to-home-btn"
            onClick={onNavigateHome}
            className="flex items-center space-x-2 text-xs sm:text-sm font-semibold text-slate-300 hover:text-gold transition-colors focus:outline-none cursor-pointer group"
            title="Ana Sayfaya Dön"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="hidden sm:inline">Prof. Dr. Basri Çakıroğlu</span>
            <span className="sm:hidden">Ana Sayfa</span>
          </button>

          {/* Center Brand Title */}
          <div className="text-center">
            <h1 className="text-sm sm:text-base font-bold font-display text-white tracking-tight">
              {language === 'TR' ? 'Tıbbi Bilgi & Sağlık Rehberi' : 'Medical Knowledge Hub'}
            </h1>
            <p className="text-[10px] text-gold tracking-wider uppercase font-medium">
              Prof. Dr. Basri Çakıroğlu
            </p>
          </div>

          {/* Right Action: Language and Appointment CTA */}
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

      {/* 2. MAIN CONTENT AREA */}
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 w-full">
        
        {/* VIEW A: SINGLE ARTICLE READING VIEW */}
        {activePost ? (
          <article className="max-w-4xl mx-auto animate-in fade-in duration-300">
            
            {/* Breadcrumb Navigation (SEO Friendly) */}
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol className="flex items-center space-x-2 text-xs text-slate-400">
                <li>
                  <button onClick={onNavigateHome} className="hover:text-gold transition-colors">
                    Ana Sayfa
                  </button>
                </li>
                <li><ChevronRight className="w-3 h-3 text-slate-600" /></li>
                <li>
                  <button onClick={handleBackToAll} className="hover:text-gold transition-colors">
                    Sağlık Rehberi (Blog)
                  </button>
                </li>
                <li><ChevronRight className="w-3 h-3 text-slate-600" /></li>
                <li className="text-gold truncate max-w-[200px] sm:max-w-md" aria-current="page">
                  {activePost.title}
                </li>
              </ol>
            </nav>

            {/* Back button */}
            <div className="mb-6 flex justify-between items-center">
              <button
                id="article-back-to-articles-btn"
                onClick={handleBackToAll}
                className="inline-flex items-center space-x-2 text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>{language === 'TR' ? 'Tüm Makalelere Dön' : 'Back to all articles'}</span>
              </button>

              <div className="flex items-center space-x-2">
                <button
                  onClick={handleShare}
                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-slate-300 hover:text-white transition-all cursor-pointer"
                  title="Bağlantıyı Kopyala"
                >
                  {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5 text-gold" />}
                  <span>{copiedLink ? (language === 'TR' ? 'Kopyalandı!' : 'Copied!') : (language === 'TR' ? 'Paylaş' : 'Share')}</span>
                </button>

                {isLoggedIn && activePost.id.startsWith('custom-article-') && (
                  <button
                    onClick={(e) => handleDeletePost(activePost.id, e)}
                    className="p-1.5 text-slate-500 hover:text-red-400 bg-white/5 hover:bg-white/10 rounded border border-white/5 hover:border-red-500/20 transition-all cursor-pointer"
                    title={language === 'TR' ? 'Makaleyi Sil' : 'Delete Article'}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Article Header Card */}
            <header className="card-glass p-6 sm:p-10 rounded-2xl mb-8 border border-white/10">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="bg-gold/15 text-gold border border-gold/30 px-3 py-1 rounded text-xs uppercase font-bold tracking-wider">
                  {activePost.category}
                </span>
                <span className="text-xs text-slate-400 flex items-center">
                  <Clock className="w-3.5 h-3.5 mr-1 text-slate-500" />
                  {activePost.readTime} {t.blogReadTime}
                </span>
                <span className="text-xs text-slate-400 flex items-center">
                  <Calendar className="w-3.5 h-3.5 mr-1 text-slate-500" />
                  {activePost.date}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold font-display text-white tracking-tight leading-snug mb-6">
                {activePost.title}
              </h1>

              {/* Author Row */}
              <div className="flex items-center space-x-3 pt-6 border-t border-white/10">
                <div className="w-10 h-10 rounded-full bg-gold/20 border border-gold/40 flex items-center justify-center text-gold font-bold text-sm">
                  BÇ
                </div>
                <div>
                  <p className="text-sm font-bold text-white flex items-center">
                    <span>{activePost.author}</span>
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

            {/* SEO Excerpt Callout */}
            <div className="bg-gradient-to-r from-gold/10 via-white/5 to-transparent border-l-4 border-gold p-5 rounded-r-xl mb-8">
              <p className="text-slate-200 text-sm sm:text-base italic leading-relaxed">
                {activePost.excerpt}
              </p>
            </div>

            {/* Table of Contents if available */}
            {tableOfContents.length > 1 && (
              <div className="card-glass p-5 rounded-xl mb-8 border border-white/10">
                <h3 className="text-xs uppercase tracking-widest text-gold font-bold mb-3 flex items-center">
                  <BookOpen className="w-4 h-4 mr-2" />
                  {language === 'TR' ? 'İçindekiler' : 'Table of Contents'}
                </h3>
                <ul className="space-y-1.5 text-xs sm:text-sm">
                  {tableOfContents.map((heading, i) => {
                    const headingId = heading.toLowerCase().replace(/[^a-z0-9]/g, '-');
                    return (
                      <li key={i}>
                        <a
                          href={`#${headingId}`}
                          className="text-slate-300 hover:text-gold transition-colors flex items-center"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-gold/60 mr-2" />
                          <span>{heading}</span>
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}

            {/* Article Content Body */}
            <div className="card-glass p-6 sm:p-10 rounded-2xl mb-10 border border-white/10">
              <div className="prose prose-invert max-w-none">
                {renderArticleContent(activePost.content)}
              </div>

              {/* Keywords / Tags if present */}
              {activePost.keywords && (
                <div className="mt-10 pt-6 border-t border-white/10">
                  <div className="flex items-center space-x-2 text-xs text-slate-400 mb-3">
                    <Tag className="w-3.5 h-3.5 text-gold" />
                    <span className="font-semibold uppercase tracking-wider text-[11px]">
                      {language === 'TR' ? 'İlgili Konu Etiketleri' : 'Topic Tags'}:
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {activePost.keywords.split(',').map((kw, i) => (
                      <span
                        key={i}
                        className="text-xs bg-white/5 text-slate-300 border border-white/10 px-2.5 py-1 rounded-full flex items-center"
                      >
                        <Hash className="w-3 h-3 mr-1 text-gold/70" />
                        {kw.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              )}
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
                      : 'You can schedule an appointment or get second opinion on surgical options with Prof. Dr. Basri Cakiroglu.'}
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

            {/* Related Articles */}
            {relatedPosts.length > 0 && (
              <div className="mb-12">
                <h3 className="text-lg font-bold font-display text-white mb-6 flex items-center">
                  <Stethoscope className="w-4 h-4 text-gold mr-2" />
                  {language === 'TR' ? 'Önerilen Diğer Tıbbi Makaleler' : 'Related Clinical Articles'}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {relatedPosts.map((rel) => (
                    <div
                      key={rel.id}
                      onClick={() => handleSelectPost(rel)}
                      className="card-glass p-5 rounded-xl border border-white/10 hover:border-gold/40 transition-all cursor-pointer group flex flex-col justify-between"
                    >
                      <div>
                        <span className="text-[10px] text-gold uppercase font-bold tracking-wider mb-2 block">
                          {rel.category}
                        </span>
                        <h4 className="text-sm font-bold text-white group-hover:text-gold transition-colors line-clamp-2 mb-2 font-display">
                          {rel.title}
                        </h4>
                        <p className="text-xs text-slate-400 line-clamp-2 font-light">
                          {rel.excerpt}
                        </p>
                      </div>
                      <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-500">
                        <span>{rel.readTime} {t.blogReadTime}</span>
                        <span className="text-gold font-semibold flex items-center">
                          {t.blogReadMore} <ChevronRight className="w-3 h-3 ml-0.5" />
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </article>
        ) : (
          
          /* VIEW B: ALL ARTICLES / BLOG KNOWLEDGE HUB INDEX */
          <div>
            {/* Header Hero */}
            <div className="text-center max-w-3xl mx-auto mb-12">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs font-bold uppercase tracking-wider mb-4">
                <BookOpen className="w-3.5 h-3.5" />
                <span>{language === 'TR' ? 'Tıbbi Bilgi Portalı & Sağlık Rehberi' : 'Clinical Health & Knowledge Guide'}</span>
              </div>
              
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-white tracking-tight leading-tight mb-4">
                {language === 'TR'
                  ? 'Üroloji & Robotik Cerrahi Makaleleri'
                  : 'Urology & Robotic Surgery Articles'}
              </h2>
              <p className="text-slate-400 text-sm sm:text-base font-light leading-relaxed max-w-2xl mx-auto">
                {language === 'TR'
                  ? 'Prof. Dr. Basri Çakıroğlu tarafından kaleme alınan güncel tedavi yöntemleri, HoLEP lazer cerrahisi, prostat sağlığı ve klinik rehberler.'
                  : 'Authoritative clinical insights, treatment protocols, HoLEP laser surgery, and urologic oncology guides by Prof. Dr. Basri Cakiroglu.'}
              </p>

              {/* Sadece yazar paneli aktifken görünen hekim yönetim alanı */}
              {isLoggedIn && (
                <div className="mt-6 flex flex-wrap items-center justify-center gap-3 animate-in fade-in duration-200">
                  <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs font-semibold">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>{language === 'TR' ? 'Yazar Paneli Aktif' : 'Author Panel Active'}</span>
                  </div>

                  <button
                    id="btn-publish-seo-article"
                    onClick={() => setIsAddModalOpen(true)}
                    className="inline-flex items-center space-x-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 text-slate-950 font-bold text-xs rounded-full uppercase tracking-wider transition-all shadow-md hover:shadow-lg cursor-pointer"
                    title={language === 'TR' ? 'Yeni SEO Makalesi Yayınla' : 'Publish New SEO Article'}
                  >
                    <Plus className="w-4 h-4" />
                    <span>{language === 'TR' ? 'Yeni Makale Yayınla' : 'Publish New Article'}</span>
                  </button>

                  <button
                    id="btn-author-mode-exit"
                    onClick={() => {
                      localStorage.removeItem('basri_logged_in');
                      setIsLoggedIn(false);
                      window.dispatchEvent(new CustomEvent('basri-login-state-changed', { detail: { isLoggedIn: false } }));
                    }}
                    className="inline-flex items-center space-x-1.5 text-xs text-slate-400 hover:text-red-400 px-3 py-1.5 rounded-full bg-white/5 hover:bg-red-500/10 border border-white/10 hover:border-red-500/20 transition-all cursor-pointer"
                    title={language === 'TR' ? 'Yazar Panelini Kapat ve Çıkış Yap' : 'Exit Author Mode & Logout'}
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>{language === 'TR' ? 'Paneli Kapat' : 'Exit Panel'}</span>
                  </button>
                </div>
              )}
            </div>

            {/* Filter Toolbar (Search + Categories) */}
            <div className="card-glass p-5 sm:p-6 rounded-xl mb-10 border border-white/10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              
              {/* Category buttons */}
              <div className="flex flex-wrap items-center gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3.5 py-1.5 rounded text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                      activeCategory === cat
                        ? 'bg-gold text-navy shadow-md'
                        : 'bg-white/5 text-slate-400 hover:text-white border border-white/10 hover:bg-white/10'
                    }`}
                  >
                    {cat === 'ALL' ? t.blogCategoryAll : cat}
                  </button>
                ))}
              </div>

              {/* Search Bar */}
              <div className="relative w-full lg:w-80 shrink-0">
                <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={language === 'TR' ? 'Makalelerde veya konularda ara...' : 'Search clinical topics...'}
                  className="w-full pl-10 pr-4 py-2 bg-white/5 text-white rounded border border-white/10 focus:outline-none focus:border-gold transition-all text-xs"
                />
              </div>

            </div>

            {/* Articles Grid */}
            {filteredPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post) => (
                  <article
                    key={post.id}
                    onClick={() => handleSelectPost(post)}
                    className="card-glass p-6 sm:p-7 rounded-xl border border-white/10 hover:border-gold/50 transition-all duration-300 flex flex-col justify-between group cursor-pointer relative shadow-lg hover:-translate-y-1"
                  >
                    <div>
                      {/* Top Meta */}
                      <div className="flex items-center justify-between text-slate-400 text-[11px] mb-4 font-semibold">
                        <span className="bg-gold/15 text-gold border border-gold/30 px-2.5 py-0.5 rounded uppercase text-[10px] font-bold">
                          {post.category}
                        </span>
                        <div className="flex items-center space-x-2">
                          <span className="flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {post.readTime} {t.blogReadTime}
                          </span>
                          {isLoggedIn && post.id.startsWith('custom-article-') && (
                            <button
                              onClick={(e) => handleDeletePost(post.id, e)}
                              className="p-1 text-slate-500 hover:text-red-400 bg-white/5 hover:bg-white/10 rounded transition-colors"
                              title="Sil"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="text-lg font-bold text-white group-hover:text-gold transition-colors mb-3 line-clamp-2 font-display leading-snug">
                        {post.title}
                      </h3>

                      {/* Excerpt */}
                      <p className="text-slate-400 text-xs sm:text-sm font-light leading-relaxed mb-6 line-clamp-3">
                        {post.excerpt}
                      </p>
                    </div>

                    {/* Bottom Line */}
                    <div className="flex items-center justify-between pt-4 border-t border-white/10 mt-auto text-xs">
                      <span className="text-slate-500 text-[11px] flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        {post.date}
                      </span>
                      <span className="text-gold font-bold inline-flex items-center group-hover:translate-x-1 transition-transform">
                        {t.blogReadMore}
                        <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
                      </span>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 card-glass rounded-xl border border-dashed border-white/10">
                <p className="text-slate-400 text-sm">
                  {language === 'TR' ? 'Aranan kriterlere uygun makale bulunamadı.' : 'No articles matched your criteria.'}
                </p>
              </div>
            )}

          </div>
        )}

      </main>

      {/* 3. BLOG FOOTER */}
      <footer className="bg-black/40 border-t border-white/10 py-10 px-6 text-slate-400 text-xs mt-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
          <div>
            <p className="font-bold text-slate-300 mb-1">
              Prof. Dr. Basri Çakıroğlu - Tıbbi Makaleler & Sağlık Kılavuzu
            </p>
            <p className="text-slate-500 text-[11px] max-w-md">
              Bu sitedeki makaleler yalnızca genel tıbbi bilgilendirme amaçlıdır. Teşhis ve tedavi için hekim muayenesi şarttır.
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={onNavigateHome}
              className="text-slate-300 hover:text-gold transition-colors uppercase tracking-wider text-[11px] font-semibold"
            >
              ← Ana Sayfaya Dön
            </button>

            <button
              id="blog-author-login-btn"
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center space-x-1.5 px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-gold rounded text-[11px] transition-colors"
            >
              {isLoggedIn ? <Shield className="w-3 h-3 text-gold" /> : <Lock className="w-3 h-3" />}
              <span>{isLoggedIn ? 'Yazar Paneli' : 'Hekim Girişi'}</span>
            </button>
          </div>
        </div>
      </footer>

      {/* 4. ARTICLE CREATION & MANAGEMENT MODAL */}
      {isAddModalOpen && (
        <AddArticleModal
          language={language}
          onClose={() => setIsAddModalOpen(false)}
          onAdd={handleAddPost}
          existingCategories={categories}
          appointments={appointments}
          onCancelAppointment={onCancelAppointment}
          onConfirmAppointment={onConfirmAppointment}
        />
      )}

    </div>
  );
}
