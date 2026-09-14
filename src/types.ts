export type Language = 'TR' | 'EN';

export interface Milestone {
  year: string;
  title: string;
  institution: string;
}

// Sık sorulan soru — hem sayfada basılır hem FAQPage JSON-LD'ye girer.
// Cevap düz metin olmalı (schema.org'a gider), markdown/HTML yazma.
export interface FaqItem {
  q: string;
  a: string;
}

export interface SourceRef {
  title: string;
  url: string;
}

export interface ExpertiseItem {
  id: string;
  title: string;
  shortDesc: string;
  longDesc: string;
  iconName: string;
  conditions: string[];
  treatments: string[];
  faq?: FaqItem[];
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  category: string;
  author: string;
  language?: Language;
  keywords?: string;
  metaDescription?: string;
  // SEO/E-E-A-T alanları (repodaki yazılar için; Firestore yazılarında olmayabilir)
  datePublished?: string;   // ISO (YYYY-MM-DD) — JSON-LD ve sitemap lastmod için
  dateModified?: string;    // ISO
  faq?: FaqItem[];
  sources?: SourceRef[];
  relatedService?: string;  // expertiseSlugs anahtarı → hizmet sayfasına iç bağlantı
}

export interface Appointment {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  preferredDate: string;
  preferredTime: string;
  topicId: string;
  notes?: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
}

export interface ClinicHours {
  days: string;
  hours: string;
}

export interface ContactInfo {
  phone: string;
  phoneFormatted: string;
  email: string;
  address: string;
  mapEmbedUrl: string;
  gmapsDirectionUrl: string;
  hours: ClinicHours[];
}
