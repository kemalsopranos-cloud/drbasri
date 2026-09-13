import { useState, FormEvent, useEffect } from 'react';
import { X, FileText, AlertCircle, CheckCircle, Clock, Lock, ShieldCheck, Check, Phone, Mail, Calendar, MessageSquare, ListFilter, Globe, Search, Tag } from 'lucide-react';
import { Language, BlogPost, Appointment } from '../types';
import { uiTranslations } from '../translations';
import { getExpertiseItems } from '../data';
import { generateSlug } from '../utils/seo';

interface AddArticleModalProps {
  language: Language;
  onClose: () => void;
  onAdd: (post: BlogPost) => void;
  existingCategories: string[];
  appointments: Appointment[];
  onCancelAppointment: (id: string) => Promise<void>;
  onConfirmAppointment: (id: string) => Promise<void>;
}

export default function AddArticleModal({ 
  language, 
  onClose, 
  onAdd, 
  existingCategories,
  appointments,
  onCancelAppointment,
  onConfirmAppointment
}: AddArticleModalProps) {
  const t = uiTranslations[language];
  const specialties = getExpertiseItems(language);

  // Tab state: 'article' | 'appointments'
  const [activeTab, setActiveTab] = useState<'article' | 'appointments'>('article');
  const [appointmentFilter, setAppointmentFilter] = useState<'all' | 'pending' | 'confirmed' | 'cancelled'>('all');

  // Auth states
  const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem('basri_logged_in') === 'true');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Form states
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [isManualSlug, setIsManualSlug] = useState(false);
  const [category, setCategory] = useState('');
  const [customCategory, setCustomCategory] = useState('');
  const [useCustomCategory, setUseCustomCategory] = useState(false);
  const [readTime, setReadTime] = useState('5');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');

  // SEO fields
  const [keywords, setKeywords] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [showSeoAdvanced, setShowSeoAdvanced] = useState(true);

  // Auto-generate slug when title changes unless manually edited
  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
    if (!isManualSlug) {
      setSlug(generateSlug(newTitle));
    }
  };

  // Validation states
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSuccess, setIsSuccess] = useState(false);
  const [createdPost, setCreatedPost] = useState<BlogPost | null>(null);

  const cleanCategories = existingCategories.filter((c) => c !== 'ALL');

  const handleLoginSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoginError('');

    if (username.trim() === 'drbasri' && password === '542582') {
      setIsLoggedIn(true);
      localStorage.setItem('basri_logged_in', 'true');
      // Dispatch event to let Blog component know we logged in (to update UI, e.g., show delete buttons)
      window.dispatchEvent(new CustomEvent('basri-login-state-changed', { detail: { isLoggedIn: true } }));
    } else {
      setLoginError(
        language === 'TR'
          ? 'Kullanıcı adı veya şifre hatalı!'
          : 'Invalid username or password!'
      );
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('basri_logged_in');
    setIsLoggedIn(false);
    window.dispatchEvent(new CustomEvent('basri-login-state-changed', { detail: { isLoggedIn: false } }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    // Validate inputs
    if (!title.trim()) newErrors.title = t.blogFormRequired;
    
    const selectedCategory = useCustomCategory ? customCategory : category;
    if (!selectedCategory.trim()) {
      newErrors.category = t.blogFormRequired;
    }

    if (!readTime.trim() || isNaN(Number(readTime)) || Number(readTime) <= 0) {
      newErrors.readTime = language === 'TR' ? 'Geçerli bir süre giriniz' : 'Enter a valid duration';
    }

    if (!excerpt.trim()) newErrors.excerpt = t.blogFormRequired;
    if (!content.trim()) newErrors.content = t.blogFormRequired;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Reset errors
    setErrors({});

    const finalCategory = (useCustomCategory ? customCategory : category).trim();
    const cleanSlug = slug.trim() ? generateSlug(slug.trim()) : generateSlug(title.trim());
    const uniqueId = `custom-article-${Date.now()}`;

    // Format current date appropriately
    const formattedDate = language === 'TR' 
      ? new Intl.DateTimeFormat('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date())
      : new Intl.DateTimeFormat('en-US', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date());

    const newPost: BlogPost = {
      id: uniqueId,
      title: title.trim(),
      slug: cleanSlug,
      excerpt: excerpt.trim(),
      content: content.trim(),
      date: formattedDate,
      readTime: readTime.trim(),
      category: finalCategory,
      author: language === 'TR' ? 'Prof. Dr. Basri Çakıroğlu' : 'Prof. Dr. Basri Cakiroglu',
      keywords: keywords.trim(),
      metaDescription: metaDescription.trim() || excerpt.trim(),
    };

    // Save and update
    onAdd(newPost);
    setCreatedPost(newPost);
    setIsSuccess(true);
  };

  const handleReset = () => {
    setTitle('');
    setSlug('');
    setIsManualSlug(false);
    setCategory('');
    setCustomCategory('');
    setUseCustomCategory(false);
    setReadTime('5');
    setExcerpt('');
    setContent('');
    setKeywords('');
    setMetaDescription('');
    setIsSuccess(false);
    setCreatedPost(null);
  };

  return (
    <div className="fixed inset-0 bg-navy/95 backdrop-blur-md z-50 flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-250">
      <div
        className="bg-navy border border-white/10 rounded-xl w-full max-w-2xl max-h-[92vh] overflow-y-auto shadow-2xl relative animate-in zoom-in duration-150"
        id="add-article-modal"
      >
        {/* Sticky Header */}
        <div className="sticky top-0 bg-navy/95 backdrop-blur-md border-b border-white/10 p-6 flex justify-between items-center z-10">
          <div className="flex items-center space-x-3">
            <FileText className="w-5 h-5 text-gold animate-pulse" />
            <span className="text-xs font-bold text-white tracking-widest uppercase font-sans">
              {isLoggedIn 
                ? t.blogModalTitle 
                : (language === 'TR' ? 'Yönetici Girişi' : 'Author Authorization')}
            </span>
          </div>
          <div className="flex items-center space-x-3">
            {isLoggedIn && (
              <button
                type="button"
                onClick={handleLogout}
                className="text-[10px] text-red-400 hover:text-white font-bold uppercase tracking-widest px-3 py-1.5 rounded bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 transition-all focus:outline-none cursor-pointer font-sans"
              >
                {language === 'TR' ? 'Çıkış Yap' : 'Logout'}
              </button>
            )}
            <button
              id="close-add-article"
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-full border border-white/10 transition-colors focus:outline-none cursor-pointer"
              aria-label="Close publisher"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6 sm:p-8">
          {!isLoggedIn ? (
            /* SECURE ADMIN LOGIN PANEL */
            <form onSubmit={handleLoginSubmit} className="space-y-6 max-w-md mx-auto py-4 font-sans">
              <div className="text-center space-y-3 mb-6">
                <div className="w-12 h-12 bg-gold/10 text-gold rounded-full flex items-center justify-center mx-auto border border-gold/20">
                  <Lock className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white">
                  {language === 'TR' ? 'Hekim Giriş Paneli' : 'Doctor Portal Login'}
                </h3>
                <p className="text-xs text-slate-400 max-w-xs mx-auto font-light leading-relaxed">
                  {language === 'TR' 
                    ? 'Makale yayınlamak ve yönetmek için lütfen klinik kimlik bilgilerinizi doğrulayın.' 
                    : 'Please authenticate with your clinical credentials to publish and manage articles.'}
                </p>
              </div>

              {loginError && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded text-red-400 text-xs flex items-center">
                  <AlertCircle className="w-4 h-4 mr-2 shrink-0" />
                  <span>{loginError}</span>
                </div>
              )}

              {/* Username Input */}
              <div className="space-y-2">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  {language === 'TR' ? 'Kullanıcı Adı' : 'Username'}
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="e.g. drbasri"
                  required
                  className="w-full px-4 py-3 bg-white/5 text-white rounded border border-white/10 focus:outline-none focus:border-gold transition-all text-xs"
                />
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  {language === 'TR' ? 'Şifre' : 'Password'}
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••"
                  required
                  className="w-full px-4 py-3 bg-white/5 text-white rounded border border-white/10 focus:outline-none focus:border-gold transition-all text-xs"
                />
              </div>

              <button
                type="submit"
                id="btn-admin-login-submit"
                className="w-full bg-gold hover:bg-gold/90 text-navy font-bold py-3.5 rounded-sm text-xs uppercase tracking-widest transition-colors flex items-center justify-center space-x-2 shadow-lg shadow-gold/5 cursor-pointer mt-4"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>{language === 'TR' ? 'Giriş Yap' : 'Sign In'}</span>
              </button>
            </form>
          ) : (
            <>
              {/* TABS */}
              <div className="flex border-b border-white/10 mb-6 font-sans">
                <button
                  type="button"
                  onClick={() => setActiveTab('article')}
                  className={`flex items-center space-x-2 px-4 py-3 border-b-2 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    activeTab === 'article'
                      ? 'border-gold text-gold font-bold'
                      : 'border-transparent text-slate-400 hover:text-white'
                  }`}
                >
                  <FileText className="w-4 h-4" />
                  <span>{language === 'TR' ? 'Makale Yayınla' : 'Publish Article'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('appointments')}
                  className={`flex items-center space-x-2 px-4 py-3 border-b-2 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer relative ${
                    activeTab === 'appointments'
                      ? 'border-gold text-gold font-bold'
                      : 'border-transparent text-slate-400 hover:text-white'
                  }`}
                >
                  <Clock className="w-4 h-4" />
                  <span>{language === 'TR' ? 'Randevu Kayıtları' : 'Appointment Bookings'}</span>
                  {appointments.filter(a => a.status === 'pending').length > 0 && (
                    <span className="ml-1.5 px-2 py-0.5 text-[10px] font-bold bg-gold text-navy rounded-full animate-pulse">
                      {appointments.filter(a => a.status === 'pending').length}
                    </span>
                  )}
                </button>
              </div>

              {activeTab === 'article' ? (
                isSuccess && createdPost ? (
                  /* SUCCESS CONFIRMATION PANEL */
                  <div className="text-center py-8 space-y-6 animate-in fade-in duration-300">
                    <div className="w-16 h-16 bg-gold/10 text-gold rounded-full flex items-center justify-center mx-auto border border-gold/30">
                      <CheckCircle className="w-10 h-10" />
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold font-display text-white">{t.blogFormSuccess}</h3>
                      <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-md mx-auto font-light">
                        {language === 'TR' 
                          ? 'Yeni sağlık makaleniz klinik rehberinde başarıyla yayınlandı.' 
                          : 'Your new clinical article has been successfully published to the health guide.'}
                      </p>
                    </div>

                    {/* Created Article Details Card */}
                    <div className="card-glass p-6 rounded-xl text-left max-w-md mx-auto space-y-3 font-sans">
                      <div className="flex justify-between text-xs border-b border-white/10 pb-2">
                        <span className="text-slate-400">{t.blogFormTitle}</span>
                        <span className="text-white font-bold truncate max-w-[200px]">{createdPost.title}</span>
                      </div>
                      <div className="flex justify-between text-xs border-b border-white/10 pb-2">
                        <span className="text-slate-400">{t.blogFormCategory}</span>
                        <span className="text-gold font-bold">{createdPost.category}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">{t.blogFormAuthor}</span>
                        <span className="text-slate-300 font-semibold">{createdPost.author}</span>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                      <button
                        id="add-another-article-btn"
                        onClick={handleReset}
                        className="w-full sm:w-auto bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold px-6 py-3 rounded-sm text-xs uppercase tracking-widest transition-colors focus:outline-none cursor-pointer"
                      >
                        {language === 'TR' ? 'Başka Makale Ekle' : 'Add Another Article'}
                      </button>
                      <button
                        id="close-success-btn"
                        onClick={onClose}
                        className="w-full sm:w-auto bg-gold hover:bg-gold/90 text-navy font-bold px-8 py-3 rounded-sm text-xs uppercase tracking-widest transition-colors focus:outline-none cursor-pointer"
                      >
                        {t.expertiseModalClose}
                      </button>
                    </div>
                  </div>
                ) : (
                  /* ACTIVE CREATION FORM */
                  <form onSubmit={handleSubmit} className="space-y-6">
                    
                    {/* Form Guide Panel */}
                    <p className="text-xs text-slate-400 leading-relaxed card-glass p-4 rounded-lg mb-4 font-light">
                      {language === 'TR'
                        ? 'Yayına alacağınız makale hem akademik standartlara uygun olmalı hem de hastalar için anlaşılır terimler barındırmalıdır. Format ipuçlarını aşağıda bulabilirsiniz.'
                        : 'The article you publish should align with academic standards and remain highly readable for patients. See formatting tips inside the editor.'}
                    </p>

                    {/* Title Input */}
                    <div className="space-y-2">
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 font-sans">
                        {t.blogFormTitle} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={title}
                        onChange={(e) => handleTitleChange(e.target.value)}
                        placeholder={language === 'TR' ? 'Örn: Robotik Cerrahide Son Gelişmeler' : 'e.g. Advancements in Robotic Surgery'}
                        className={`w-full px-4 py-3 bg-white/5 text-white rounded border ${
                          errors.title ? 'border-red-500 focus:border-red-500' : 'border-white/10 focus:border-gold'
                        } focus:outline-none transition-all text-xs font-sans`}
                      />
                      {errors.title && (
                        <p className="text-red-400 text-xs flex items-center mt-1">
                          <AlertCircle className="w-3.5 h-3.5 mr-1 shrink-0" />
                          <span>{errors.title}</span>
                        </p>
                      )}
                    </div>

                    {/* Category selector / Custom toggle */}
                    <div className="space-y-2 font-sans">
                      <div className="flex justify-between items-center">
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400">
                          {t.blogFormCategory} <span className="text-red-500">*</span>
                        </label>
                        <button
                          type="button"
                          onClick={() => {
                            setUseCustomCategory(!useCustomCategory);
                            setCategory('');
                            setCustomCategory('');
                          }}
                          className="text-[10px] text-gold hover:underline uppercase tracking-wider font-semibold focus:outline-none cursor-pointer"
                        >
                          {useCustomCategory 
                            ? (language === 'TR' ? 'Listeden Seç' : 'Select from List') 
                            : (language === 'TR' ? '+ Yeni Kategori Ekle' : '+ Add New Category')}
                        </button>
                      </div>

                      {useCustomCategory ? (
                        <input
                          type="text"
                          value={customCategory}
                          onChange={(e) => setCustomCategory(e.target.value)}
                          placeholder={t.blogFormCategoryPlaceholder}
                          className={`w-full px-4 py-3 bg-white/5 text-white rounded border ${
                            errors.category ? 'border-red-500 focus:border-red-500' : 'border-white/10 focus:border-gold'
                          } focus:outline-none transition-all text-xs`}
                        />
                      ) : (
                        <div className="relative">
                          <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className={`w-full px-4 py-3 bg-white/5 text-slate-300 rounded border ${
                              errors.category ? 'border-red-500 focus:border-red-500' : 'border-white/10 focus:border-gold'
                            } focus:outline-none transition-all text-xs cursor-pointer appearance-none`}
                          >
                            <option value="" className="bg-navy text-slate-400">
                              {language === 'TR' ? 'Kategori Seçiniz...' : 'Select Category...'}
                            </option>
                            {cleanCategories.map((cat) => (
                              <option key={cat} value={cat} className="bg-navy text-white">
                                {cat}
                              </option>
                            ))}
                          </select>
                          <span className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-slate-400">
                            ▼
                          </span>
                        </div>
                      )}
                      {errors.category && (
                        <p className="text-red-400 text-xs flex items-center mt-1">
                          <AlertCircle className="w-3.5 h-3.5 mr-1 shrink-0" />
                          <span>{errors.category}</span>
                        </p>
                      )}
                    </div>

                    {/* Author & Read Time Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-sans">
                      {/* Author */}
                      <div className="space-y-2">
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400">
                          {t.blogFormAuthor}
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            value={language === 'TR' ? 'Prof. Dr. Basri Çakıroğlu' : 'Prof. Dr. Basri Cakiroglu'}
                            disabled
                            className="w-full px-4 py-3 bg-white/5 text-slate-400 rounded border border-white/10 text-xs font-semibold cursor-not-allowed"
                          />
                          <span className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-slate-500 text-[10px] font-semibold tracking-wider font-mono">
                            🔒 drbasri
                          </span>
                        </div>
                      </div>

                      {/* Read Time */}
                      <div className="space-y-2">
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400">
                          {t.blogFormReadTime} <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="number"
                          min="1"
                          max="60"
                          value={readTime}
                          onChange={(e) => setReadTime(e.target.value)}
                          className={`w-full px-4 py-3 bg-white/5 text-white rounded border ${
                            errors.readTime ? 'border-red-500 focus:border-red-500' : 'border-white/10 focus:border-gold'
                          } focus:outline-none transition-all text-xs`}
                        />
                        {errors.readTime && (
                          <p className="text-red-400 text-xs flex items-center mt-1">
                            <AlertCircle className="w-3.5 h-3.5 mr-1 shrink-0" />
                            <span>{errors.readTime}</span>
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Excerpt Input */}
                    <div className="space-y-2 font-sans">
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400">
                        {t.blogFormExcerpt} <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        value={excerpt}
                        onChange={(e) => setExcerpt(e.target.value)}
                        rows={2}
                        maxLength={250}
                        placeholder={t.blogFormExcerptPlaceholder}
                        className={`w-full px-4 py-3 bg-white/5 text-white rounded border ${
                          errors.excerpt ? 'border-red-500 focus:border-red-500' : 'border-white/10 focus:border-gold'
                        } focus:outline-none transition-all text-xs resize-none font-light`}
                      />
                      {errors.excerpt && (
                        <p className="text-red-400 text-xs flex items-center mt-1">
                          <AlertCircle className="w-3.5 h-3.5 mr-1 shrink-0" />
                          <span>{errors.excerpt}</span>
                        </p>
                      )}
                    </div>

                    {/* Content Input */}
                    <div className="space-y-2 font-sans">
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400">
                        {t.blogFormContent} <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        rows={8}
                        placeholder={t.blogFormContentPlaceholder}
                        className={`w-full px-4 py-3 bg-white/5 text-white rounded border ${
                          errors.content ? 'border-red-500 focus:border-red-500' : 'border-white/10 focus:border-gold'
                        } focus:outline-none transition-all text-xs resize-y min-h-[150px] font-light`}
                      />
                      {errors.content && (
                        <p className="text-red-400 text-xs flex items-center mt-1">
                          <AlertCircle className="w-3.5 h-3.5 mr-1 shrink-0" />
                          <span>{errors.content}</span>
                        </p>
                      )}
                    </div>

                    {/* SEO & Google Search Console Settings (Accordion / Card) */}
                    <div className="card-glass p-5 rounded-xl border border-gold/30 bg-gradient-to-br from-white/5 via-gold/5 to-transparent space-y-4 font-sans">
                      <div className="flex items-center justify-between border-b border-white/10 pb-3">
                        <div className="flex items-center space-x-2">
                          <Globe className="w-4 h-4 text-gold" />
                          <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                            {language === 'TR' ? 'Google Arama & SEO Ayarları' : 'Google Search & SEO Configuration'}
                          </h4>
                        </div>
                        <span className="text-[10px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded font-medium">
                          {language === 'TR' ? 'Google İndeksleme Hazır' : 'Index-Ready'}
                        </span>
                      </div>

                      {/* Slug / URL Path */}
                      <div className="space-y-1.5">
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-300">
                          {language === 'TR' ? 'Sayfa Bağlantı Uzantısı (URL Slug)' : 'URL Slug'}
                        </label>
                        <div className="flex items-center rounded bg-white/5 border border-white/10 px-3 py-2 text-xs">
                          <span className="text-slate-500 font-mono select-none">/blog/</span>
                          <input
                            type="text"
                            value={slug}
                            onChange={(e) => {
                              setIsManualSlug(true);
                              setSlug(generateSlug(e.target.value));
                            }}
                            placeholder="makale-basligi-url"
                            className="bg-transparent text-gold font-mono text-xs w-full focus:outline-none pl-1"
                          />
                        </div>
                        <p className="text-[10px] text-slate-400 font-light">
                          {language === 'TR'
                            ? 'Google bu bağlantıyı dizine ekler. Türkçe karakterler ve boşluklar otomatik düzeltilir.'
                            : 'Google will index this permanent path.'}
                        </p>
                      </div>

                      {/* SEO Keywords */}
                      <div className="space-y-1.5">
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-300 flex items-center justify-between">
                          <span>{language === 'TR' ? 'Arama Anahtar Kelimeleri (Virgülle ayırın)' : 'Target SEO Keywords (Comma separated)'}</span>
                          <Tag className="w-3 h-3 text-gold/70" />
                        </label>
                        <input
                          type="text"
                          value={keywords}
                          onChange={(e) => setKeywords(e.target.value)}
                          placeholder={language === 'TR' ? 'Örn: HoLEP ameliyatı, prostat büyümesi, lazer cerrahi, Basri Çakıroğlu' : 'e.g. HoLEP laser, prostate surgery, robotics'}
                          className="w-full px-4 py-2.5 bg-white/5 text-white rounded border border-white/10 focus:outline-none focus:border-gold transition-all text-xs"
                        />
                      </div>

                      {/* Meta Description */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between items-center">
                          <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-300">
                            {language === 'TR' ? 'Google Arama Açıklaması (Meta Description)' : 'Meta Description'}
                          </label>
                          <span className={`text-[10px] ${metaDescription.length > 160 ? 'text-amber-400 font-bold' : 'text-slate-500'}`}>
                            {metaDescription.length}/160 {language === 'TR' ? 'karakter (Önerilen: 120-160)' : 'chars'}
                          </span>
                        </div>
                        <textarea
                          value={metaDescription}
                          onChange={(e) => setMetaDescription(e.target.value)}
                          rows={2}
                          maxLength={200}
                          placeholder={language === 'TR' ? 'Google arama sonuçlarında başlığın altında çıkan 1-2 cümlelik açıklama...' : 'Search snippet appearing below title in Google...'}
                          className="w-full px-4 py-2.5 bg-white/5 text-white rounded border border-white/10 focus:outline-none focus:border-gold transition-all text-xs resize-none font-light"
                        />
                      </div>

                      {/* Live Google SERP Preview */}
                      <div className="pt-2">
                        <p className="text-[10px] uppercase tracking-wider font-bold text-slate-400 mb-2 flex items-center">
                          <Search className="w-3 h-3 mr-1 text-gold" />
                          {language === 'TR' ? 'Google Arama Sonucu Canlı Önizleme' : 'Live Google SERP Preview'}
                        </p>
                        <div className="bg-slate-900/90 border border-white/10 rounded-lg p-3.5 space-y-1">
                          <div className="flex items-center space-x-1 text-[11px] text-slate-400">
                            <span className="text-emerald-400">basricakiroglu.com.tr</span>
                            <span>› blog › {slug || 'makale-baglantisi'}</span>
                          </div>
                          <div className="text-sm text-blue-400 font-medium hover:underline cursor-pointer leading-snug">
                            {title.trim() ? `${title} | Prof. Dr. Basri Çakıroğlu` : 'Makale Başlığı | Prof. Dr. Basri Çakıroğlu'}
                          </div>
                          <div className="text-xs text-slate-300 font-light leading-relaxed line-clamp-2">
                            {metaDescription.trim() || excerpt.trim() || 'Google arama sonuçlarında gösterilecek tıbbi makale özeti ve uzman hekim açıklaması.'}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Form Submission Actions */}
                    <div className="pt-4 border-t border-white/10 flex justify-end gap-3">
                      <button
                        type="button"
                        onClick={onClose}
                        className="px-6 py-3.5 rounded-sm text-xs font-bold text-slate-400 hover:text-white uppercase tracking-wider transition-colors focus:outline-none cursor-pointer"
                      >
                        {language === 'TR' ? 'İptal' : 'Cancel'}
                      </button>
                      <button
                        type="submit"
                        id="submit-article-btn"
                        className="bg-gold hover:bg-gold/90 text-navy font-bold px-8 py-3.5 rounded-sm text-xs uppercase tracking-widest transition-all shadow-md shadow-gold/10 flex items-center justify-center space-x-2 cursor-pointer"
                      >
                        <span>{t.blogFormSubmit}</span>
                      </button>
                    </div>

                  </form>
                )
              ) : (
                /* APPOINTMENTS MANAGER PANEL */
                <div className="space-y-6 animate-in fade-in duration-300">
                  {/* Title and stats summary */}
                  <div className="flex items-center justify-between font-sans border-b border-white/5 pb-4">
                    <div>
                      <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                        {language === 'TR' ? 'Hekim Randevu Yönetimi' : 'Clinical Appointment Dashboard'}
                      </h4>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        {language === 'TR' 
                          ? 'Gelen tüm randevu taleplerini onaylayabilir veya iptal edebilirsiniz.' 
                          : 'Manage patient consultation requests by confirming or cancelling appointments.'}
                      </p>
                    </div>
                  </div>

                  {/* Filter tabs */}
                  <div className="flex flex-wrap gap-2 font-sans">
                    {(['all', 'pending', 'confirmed', 'cancelled'] as const).map((filter) => {
                      const isActive = appointmentFilter === filter;
                      const count = filter === 'all' 
                        ? appointments.length 
                        : appointments.filter(a => a.status === filter).length;
                      
                      const label = {
                        all: language === 'TR' ? 'Hepsi' : 'All',
                        pending: language === 'TR' ? 'Bekleyenler' : 'Pending',
                        confirmed: language === 'TR' ? 'Onaylananlar' : 'Confirmed',
                        cancelled: language === 'TR' ? 'İptal Edilenler' : 'Cancelled',
                      }[filter];
                      return (
                        <button
                          key={filter}
                          type="button"
                          onClick={() => setAppointmentFilter(filter)}
                          className={`px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all cursor-pointer border flex items-center space-x-1.5 ${
                            isActive
                              ? 'bg-gold text-navy border-gold'
                              : 'bg-white/5 text-slate-400 border-white/10 hover:text-white hover:bg-white/10'
                          }`}
                        >
                          <span>{label}</span>
                          <span className={`px-1.5 py-0.2 text-[9px] rounded-full font-mono ${isActive ? 'bg-navy/20 text-navy' : 'bg-white/10 text-slate-300'}`}>
                            {count}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Appointments list */}
                  {appointments.filter(a => appointmentFilter === 'all' || a.status === appointmentFilter).length === 0 ? (
                    <div className="text-center py-16 border border-dashed border-white/10 rounded-lg bg-white/5 font-sans">
                      <Calendar className="w-10 h-10 text-slate-500 mx-auto mb-3 animate-bounce" />
                      <p className="text-xs text-slate-400 font-medium">
                        {language === 'TR' ? 'Bu sekmede henüz kayıtlı randevu bulunmamaktadır.' : 'No appointment records in this list.'}
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-1 scrollbar-thin">
                      {appointments
                        .filter(a => appointmentFilter === 'all' || a.status === appointmentFilter)
                        .map((apt) => {
                          const topicName = specialties.find(s => s.id === apt.topicId)?.title || apt.topicId;
                          return (
                            <div 
                              key={apt.id} 
                              className="p-5 rounded-xl border border-white/10 bg-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all hover:bg-white/10"
                            >
                              <div className="space-y-3 font-sans flex-grow">
                                {/* Header: Name and Status */}
                                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/5 pb-2">
                                  <span className="text-sm font-bold text-white tracking-wide">
                                    {apt.fullName}
                                  </span>
                                  <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                                    apt.status === 'confirmed' 
                                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                                      : apt.status === 'cancelled'
                                      ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                                      : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                                  }`}>
                                    {apt.status === 'confirmed' 
                                      ? (language === 'TR' ? 'Onaylandı' : 'Confirmed') 
                                      : apt.status === 'cancelled'
                                      ? (language === 'TR' ? 'İptal Edildi' : 'Cancelled')
                                      : (language === 'TR' ? 'Bekliyor' : 'Pending')}
                                  </span>
                                </div>

                                {/* Main Info Grid */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-xs text-slate-300">
                                  <div className="flex items-center space-x-2">
                                    <Phone className="w-3.5 h-3.5 text-gold shrink-0" />
                                    <a href={`tel:${apt.phone}`} className="hover:text-gold transition-colors font-mono">
                                      {apt.phone}
                                    </a>
                                  </div>
                                  {apt.email && (
                                    <div className="flex items-center space-x-2">
                                      <Mail className="w-3.5 h-3.5 text-gold shrink-0" />
                                      <a href={`mailto:${apt.email}`} className="hover:text-gold transition-colors break-all font-mono">
                                        {apt.email}
                                      </a>
                                    </div>
                                  )}
                                  <div className="flex items-center space-x-2">
                                    <Calendar className="w-3.5 h-3.5 text-gold shrink-0" />
                                    <span>{apt.preferredDate}</span>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <Clock className="w-3.5 h-3.5 text-gold shrink-0" />
                                    <span>{apt.preferredTime}</span>
                                  </div>
                                </div>

                                {/* Department / Topic */}
                                <div className="text-xs text-slate-400 bg-navy border border-white/5 rounded px-3 py-1.5 flex items-start space-x-1.5">
                                  <span className="font-bold text-slate-300 uppercase tracking-wide text-[9px] mt-0.5">Konu / Topic:</span>
                                  <span>{topicName}</span>
                                </div>

                                {/* Notes if any */}
                                {apt.notes && (
                                  <div className="text-xs text-slate-400 bg-black/10 rounded p-2.5 flex items-start space-x-2">
                                    <MessageSquare className="w-3.5 h-3.5 text-gold shrink-0 mt-0.5" />
                                    <p className="font-light leading-relaxed whitespace-pre-wrap">{apt.notes}</p>
                                  </div>
                                )}
                              </div>

                              {/* Quick Actions Panel */}
                              <div className="flex md:flex-col justify-end gap-2 shrink-0 border-t md:border-t-0 border-white/5 pt-3 md:pt-0 mt-2 md:mt-0 font-sans">
                                {apt.status === 'pending' && (
                                  <>
                                    <button
                                      type="button"
                                      onClick={() => onConfirmAppointment(apt.id)}
                                      className="flex-grow md:flex-grow-0 flex items-center justify-center space-x-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2 rounded text-xs uppercase tracking-wider transition-all cursor-pointer shadow shadow-emerald-600/10"
                                    >
                                      <Check className="w-3.5 h-3.5" />
                                      <span>{language === 'TR' ? 'Onayla' : 'Confirm'}</span>
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => onCancelAppointment(apt.id)}
                                      className="flex-grow md:flex-grow-0 flex items-center justify-center space-x-1.5 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 hover:text-white font-bold px-4 py-2 rounded text-xs uppercase tracking-wider transition-all cursor-pointer"
                                    >
                                      <span>{language === 'TR' ? 'İptal Et' : 'Cancel'}</span>
                                    </button>
                                  </>
                                )}
                                {apt.status === 'confirmed' && (
                                  <button
                                    type="button"
                                    onClick={() => onCancelAppointment(apt.id)}
                                    className="flex-grow md:flex-grow-0 flex items-center justify-center space-x-1.5 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 hover:text-white font-bold px-4 py-2 rounded text-xs uppercase tracking-wider transition-all cursor-pointer"
                                  >
                                    <span>{language === 'TR' ? 'İptal Et' : 'Cancel'}</span>
                                  </button>
                                )}
                                {apt.status === 'cancelled' && (
                                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest text-center px-4 py-2">
                                    {language === 'TR' ? 'İşlem Yok' : 'Completed'}
                                  </span>
                                )}
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
