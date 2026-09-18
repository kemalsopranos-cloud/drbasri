import type { BlogPost, ExpertiseItem, FaqItem, Language } from '../types';
import { getBlogPosts, getExpertiseItems } from '../data';
import { SITE_URL, SITE_NAME, OG_IMAGE_PATH, DOCTOR } from './site';
import {
  parseRoute, routeToPath, alternatePath, homePath, blogPath, articlePath, servicePath, internationalPath,
  type Route,
} from '../routes';

// ---------------------------------------------------------------------------
// Route → <title>/meta/canonical/hreflang/JSON-LD çözümü. TEK KAYNAK: hem
// build-time prerender (scripts/prerender.ts) hem geliştirme sunucusu
// (server.ts) hem de istemci tarafı güncelleme (utils/seo.ts) buradan beslenir.
//
// Faz 4: her meta artık DİL taşır (TR kökte, EN /en altında) ve diğer dildeki
// karşılığını `alternates` ile bildirir → <link rel="alternate" hreflang>.
// Google böylece "aynı sayfanın Türkçesi/İngilizcesi" ilişkisini kurar ve
// İngiltere'deki aramada EN sayfayı, Türkiye'de TR sayfayı gösterir.
// ---------------------------------------------------------------------------

export interface SeoMeta {
  lang: Language;
  title: string;
  description: string;
  keywords: string;
  canonical: string;
  ogType: 'website' | 'article';
  /** hreflang hedefleri (mutlak URL). x-default = TR ana sayfa. */
  alternates: { tr?: string; en?: string };
  jsonLd: Record<string, unknown>[];
}

export const LOCALE: Record<Language, { html: string; og: string; schema: string }> = {
  TR: { html: 'tr', og: 'tr_TR', schema: 'tr-TR' },
  EN: { html: 'en', og: 'en_US', schema: 'en' },
};

export function escapeHtml(str: string): string {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

const abs = (path: string) => `${SITE_URL}${path === '/' ? '/' : path}`;

const physicianAuthor = (lang: Language) => ({
  '@type': 'Physician',
  name: DOCTOR.name,
  jobTitle: lang === 'EN' ? 'Urologist & Robotic Surgeon' : DOCTOR.jobTitle,
  medicalSpecialty: 'Urologic',
  url: SITE_URL,
});

const organizationPublisher = (lang: Language) => ({
  '@type': 'MedicalOrganization',
  name: lang === 'EN' ? `${DOCTOR.name} Urology Clinic` : `${DOCTOR.name} Kliniği`,
  url: SITE_URL,
  logo: `${SITE_URL}/favicon-512.png`,
});

// Ana sayfa: Physician + yerel işletme sinyalleri (adres, telefon, sosyal
// profiller). "ürolog Ümraniye" gibi yerel aramalarda Google bu alanları
// Business Profile ile eşleştirir.
export function physicianJsonLd(lang: Language = 'TR'): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Physician',
    '@id': `${SITE_URL}/#physician`,
    name: DOCTOR.name,
    url: abs(homePath(lang)),
    image: `${SITE_URL}${OG_IMAGE_PATH}`,
    jobTitle: lang === 'EN' ? 'Urologist & Robotic Surgeon' : DOCTOR.jobTitle,
    medicalSpecialty: ['Urologic', 'Oncologic'],
    description:
      lang === 'EN'
        ? 'Prof. Dr. Basri Çakıroğlu - Urologist and robotic surgeon in Istanbul, Turkey. HoLEP laser prostate surgery, daVinci robotic prostatectomy, laser kidney stone treatment for local and international patients.'
        : 'Prof. Dr. Basri Çakıroğlu - Üroloji ve Robotik Cerrahi Uzmanı. HoLEP lazer prostat ameliyatı, daVinci robotik prostatektomi, böbrek taşı tedavisi.',
    telephone: DOCTOR.telephone,
    email: DOCTOR.email,
    address: { '@type': 'PostalAddress', ...DOCTOR.address },
    // YEREL SEO: Physician bir LocalBusiness alt türüdür → geo / saat / harita
    // alanları geçerlidir. Google Business Profile'daki bilgilerle birebir
    // aynı tutulmalı (bkz. src/seo/site.ts NAP notu).
    geo: { '@type': 'GeoCoordinates', latitude: DOCTOR.geo.latitude, longitude: DOCTOR.geo.longitude },
    hasMap: DOCTOR.mapUrl,
    openingHoursSpecification: DOCTOR.openingHours.map((h) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: h.days,
      opens: h.opens,
      closes: h.closes,
    })),
    areaServed:
      lang === 'EN'
        ? [{ '@type': 'City', name: 'Istanbul' }, { '@type': 'Country', name: 'Turkey' }]
        : DOCTOR.areaServed.map((name) => ({ '@type': 'City', name })),
    hospitalAffiliation: {
      '@type': 'Hospital',
      name: DOCTOR.hospital.name,
      url: DOCTOR.hospital.url,
      telephone: DOCTOR.hospital.telephone,
      address: { '@type': 'PostalAddress', ...DOCTOR.address },
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: DOCTOR.telephone,
      contactType: 'appointments',
      availableLanguage: ['tr', 'en'],
    },
    sameAs: DOCTOR.sameAs,
    availableService: getExpertiseItems(lang).map((item) => ({
      '@type': 'MedicalProcedure',
      name: item.title,
      url: abs(servicePath(lang, item.id)),
    })),
  };
}

// Türkçe/İngilizce uzun tarih → ISO. Repodaki eski yazılar ve Firestore
// yazıları ISO alan taşımıyor; JSON-LD'ye geçersiz tarih basmamak için
// dönüştürülür, çevrilemezse alan hiç yazılmaz.
const TR_MONTHS: Record<string, string> = {
  ocak: '01', şubat: '02', mart: '03', nisan: '04', mayıs: '05', haziran: '06',
  temmuz: '07', ağustos: '08', eylül: '09', ekim: '10', kasım: '11', aralık: '12',
  january: '01', february: '02', march: '03', april: '04', may: '05', june: '06',
  july: '07', august: '08', september: '09', october: '10', november: '11', december: '12',
};
export function toIsoDate(value?: string): string | undefined {
  if (!value) return undefined;
  if (/^\d{4}-\d{2}-\d{2}/.test(value)) return value.slice(0, 10);
  const v = value.trim().toLowerCase().replace(',', '');
  let m = v.match(/^(\d{1,2})\s+([a-zçğıöşü]+)\s+(\d{4})$/); // 10 haziran 2026
  if (m && TR_MONTHS[m[2]]) return `${m[3]}-${TR_MONTHS[m[2]]}-${m[1].padStart(2, '0')}`;
  m = v.match(/^([a-z]+)\s+(\d{1,2})\s+(\d{4})$/); // june 10 2026
  if (m && TR_MONTHS[m[1]]) return `${m[3]}-${TR_MONTHS[m[1]]}-${m[2].padStart(2, '0')}`;
  return undefined;
}

export function postDates(post: BlogPost): { published?: string; modified?: string } {
  const published = toIsoDate(post.datePublished) ?? toIsoDate(post.date);
  const modified = toIsoDate(post.dateModified) ?? published;
  return { published, modified };
}

// SSS bölümü → FAQPage. Sorular sayfada görünür metinle BİREBİR aynı olmalı
// (Google, yapılandırılmış veri ile sayfa içeriğinin eşleşmesini ister).
function faqJsonLd(faq: FaqItem[]): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

function websiteJsonLd(lang: Language): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: LOCALE[lang].schema,
  };
}

function breadcrumbJsonLd(items: { name: string; url: string }[]): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: it.url,
    })),
  };
}

const HOME_LABEL: Record<Language, string> = { TR: 'Ana Sayfa', EN: 'Home' };
const BLOG_LABEL: Record<Language, string> = { TR: 'Makaleler', EN: 'Articles' };

function bothLangs(route: Route, translationSlug?: string | null): { tr: string; en: string } {
  return {
    tr: abs(alternatePath(route, 'TR', translationSlug)),
    en: abs(alternatePath(route, 'EN', translationSlug)),
  };
}

// ---------------------------------------------------------------------------
// Sayfa meta'ları
// ---------------------------------------------------------------------------

export function buildHomeMeta(lang: Language = 'TR'): SeoMeta {
  const route: Route = { lang, kind: 'home' };
  return lang === 'EN'
    ? {
        lang,
        title: 'Prof. Dr. Basri Çakıroğlu | Urologist in Istanbul, Turkey – HoLEP & Robotic Surgery',
        description:
          'Professor of Urology and robotic surgeon in Istanbul, Turkey. HoLEP laser prostate surgery, daVinci robotic prostatectomy, laser kidney stone treatment and male infertility care for international patients.',
        keywords:
          'urologist Istanbul, urologist Turkey international patients, HoLEP surgery Turkey, robotic prostatectomy Istanbul, kidney stone treatment Turkey, Prof Dr Basri Cakiroglu',
        canonical: abs(homePath('EN')),
        ogType: 'website',
        alternates: bothLangs(route),
        jsonLd: [physicianJsonLd('EN'), websiteJsonLd('EN')],
      }
    : {
        lang,
        title: 'Prof. Dr. Basri Çakıroğlu | Üroloji Uzmanı İstanbul – HoLEP & Robotik Cerrahi',
        description:
          'Prof. Dr. Basri Çakıroğlu - İstanbul Ümraniye Üroloji ve Robotik Cerrahi Uzmanı. HoLEP lazer prostat tedavisi, daVinci robotik cerrahi, böbrek taşı ve ürolojik onkoloji.',
        keywords:
          'Prof Dr Basri Çakıroğlu, üroloji uzmanı istanbul, ürolog ümraniye, HoLEP lazer prostat ameliyatı, robotik cerrahi, böbrek taşı lazer, ürolojik onkoloji',
        canonical: abs(homePath('TR')),
        ogType: 'website',
        alternates: bothLangs(route),
        jsonLd: [physicianJsonLd('TR'), websiteJsonLd('TR')],
      };
}

export function buildBlogHubMeta(lang: Language = 'TR'): SeoMeta {
  const route: Route = { lang, kind: 'blog' };
  const url = abs(blogPath(lang));
  return {
    lang,
    title:
      lang === 'EN'
        ? 'Urology Articles & Patient Guides | Prof. Dr. Basri Çakıroğlu'
        : 'Üroloji Makaleleri & Sağlık Rehberi | Prof. Dr. Basri Çakıroğlu',
    description:
      lang === 'EN'
        ? 'Patient guides on HoLEP laser prostate surgery, robotic prostatectomy, kidney stone laser treatment and male fertility by Prof. Dr. Basri Çakıroğlu, Istanbul.'
        : 'Prof. Dr. Basri Çakıroğlu tarafından hazırlanan HoLEP lazer prostat cerrahisi, daVinci robotik cerrahi, böbrek taşı ve üroloji makaleleri.',
    keywords:
      lang === 'EN'
        ? 'urology articles, HoLEP Turkey, robotic prostatectomy Istanbul, kidney stone treatment abroad, prostate cancer second opinion'
        : 'üroloji makaleleri, HoLEP lazer, robotik cerrahi, böbrek taşı, prostat kanseri erken teşhis, Basri Çakıroğlu',
    canonical: url,
    ogType: 'website',
    alternates: bothLangs(route),
    jsonLd: [
      breadcrumbJsonLd([
        { name: HOME_LABEL[lang], url: abs(homePath(lang)) },
        { name: BLOG_LABEL[lang], url },
      ]),
    ],
  };
}

export function buildArticleMeta(post: BlogPost, lang: Language = post.language ?? 'TR'): SeoMeta {
  const description = post.metaDescription || post.excerpt;
  const dates = postDates(post);
  const url = abs(articlePath(lang, post.slug));
  const keywords = post.keywords || `${post.category}, ${lang === 'EN' ? 'Urology' : 'Üroloji'}, ${DOCTOR.name}`;
  const route: Route = { lang, kind: 'article', slug: post.slug };
  // Çeviri karşılığı varsa iki dil de bildirilir; yoksa yalnızca kendi dili
  // (diğer dilde blog listesine işaret etmek yanlış hreflang olur).
  const alternates: SeoMeta['alternates'] = {};
  alternates[lang === 'EN' ? 'en' : 'tr'] = url;
  if (post.translationOf) {
    const other: Language = lang === 'EN' ? 'TR' : 'EN';
    alternates[other === 'EN' ? 'en' : 'tr'] = abs(alternatePath(route, other, post.translationOf));
  }
  return {
    lang,
    title: `${post.title} | ${DOCTOR.name}`,
    description,
    keywords,
    canonical: url,
    ogType: 'article',
    alternates,
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'MedicalWebPage',
        name: post.title,
        headline: post.title,
        description,
        keywords,
        url,
        ...(dates.published ? { datePublished: dates.published } : {}),
        ...(dates.modified ? { dateModified: dates.modified, lastReviewed: dates.modified } : {}),
        inLanguage: LOCALE[lang].schema,
        image: `${SITE_URL}${OG_IMAGE_PATH}`,
        author: physicianAuthor(lang),
        reviewedBy: physicianAuthor(lang),
        publisher: organizationPublisher(lang),
        mainEntityOfPage: url,
        ...(post.sources?.length ? { citation: post.sources.map((c) => c.url) } : {}),
      },
      breadcrumbJsonLd([
        { name: HOME_LABEL[lang], url: abs(homePath(lang)) },
        { name: BLOG_LABEL[lang], url: abs(blogPath(lang)) },
        { name: post.title, url },
      ]),
      ...(post.faq?.length ? [faqJsonLd(post.faq)] : []),
    ],
  };
}

export function buildServiceMeta(item: ExpertiseItem, lang: Language = 'TR'): SeoMeta {
  const route: Route = { lang, kind: 'service', id: item.id, slug: '' };
  const url = abs(servicePath(lang, item.id));
  // EN başlık yabancı hastanın sorgusuna göre ("... in Istanbul, Turkey")
  const title = lang === 'EN' ? `${item.title} in Istanbul, Turkey | ${DOCTOR.name}` : `${item.title} | ${DOCTOR.name}`;
  return {
    lang,
    title,
    description: item.shortDesc,
    keywords:
      lang === 'EN'
        ? `${item.title} Turkey, ${item.title} Istanbul, ${item.conditions.slice(0, 3).join(', ')}, urologist Istanbul international patients`
        : `${item.title}, ${item.conditions.slice(0, 3).join(', ')}, Prof Dr Basri Çakıroğlu, Ümraniye Üroloji`,
    canonical: url,
    ogType: 'website',
    alternates: bothLangs(route),
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'MedicalWebPage',
        name: item.title,
        headline: item.title,
        description: item.longDesc,
        url,
        inLanguage: LOCALE[lang].schema,
        image: `${SITE_URL}${OG_IMAGE_PATH}`,
        about: {
          '@type': 'MedicalProcedure',
          name: item.title,
          description: item.longDesc,
        },
        author: physicianAuthor(lang),
        reviewedBy: physicianAuthor(lang),
        publisher: organizationPublisher(lang),
        mainEntityOfPage: url,
      },
      breadcrumbJsonLd([
        { name: HOME_LABEL[lang], url: abs(homePath(lang)) },
        { name: item.title, url },
      ]),
      ...(item.faq?.length ? [faqJsonLd(item.faq)] : []),
    ],
  };
}

export function buildInternationalMeta(): SeoMeta {
  const url = abs(internationalPath());
  return {
    lang: 'EN',
    title: 'International Patients – Urology Treatment in Istanbul | Prof. Dr. Basri Çakıroğlu',
    description:
      'How international patients receive urology care in Istanbul: remote report review, treatment planning, hospital stay at Hisar Intercontinental Hospital, travel and follow-up. HoLEP, robotic prostatectomy, kidney stone laser surgery.',
    keywords:
      'urology treatment Turkey international patients, medical tourism urology Istanbul, prostate surgery abroad, HoLEP Turkey, robotic prostatectomy Turkey, kidney stone surgery Istanbul',
    canonical: url,
    ogType: 'website',
    alternates: { en: url },
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'MedicalWebPage',
        name: 'International Patients',
        url,
        inLanguage: 'en',
        description:
          'Step-by-step process for patients travelling to Istanbul for urology treatment with Prof. Dr. Basri Çakıroğlu.',
        author: physicianAuthor('EN'),
        publisher: organizationPublisher('EN'),
        mainEntityOfPage: url,
      },
      breadcrumbJsonLd([
        { name: 'Home', url: abs(homePath('EN')) },
        { name: 'International Patients', url },
      ]),
    ],
  };
}

/**
 * Verilen yol için doğru meta'yı üretir. `extraPosts`: Firestore'dan gelen
 * (repoda olmayan) yazılar — build sırasında çekilip buraya verilir.
 */
export function resolveSeoMeta(pathname: string, extraPosts: BlogPost[] = []): SeoMeta {
  const route = parseRoute(pathname);
  switch (route.kind) {
    case 'home':
      return buildHomeMeta(route.lang);
    case 'blog':
      return buildBlogHubMeta(route.lang);
    case 'article': {
      const post =
        extraPosts.find((p) => p.slug === route.slug && (p.language ?? 'TR') === route.lang) ||
        getBlogPosts(route.lang).find((p) => p.slug === route.slug);
      return post ? buildArticleMeta(post, route.lang) : buildBlogHubMeta(route.lang); // bilinmeyen slug: ana sayfa meta'sını sızdırma
    }
    case 'service': {
      const item = getExpertiseItems(route.lang).find((i) => i.id === route.id);
      return item ? buildServiceMeta(item, route.lang) : buildHomeMeta(route.lang);
    }
    case 'international':
      return buildInternationalMeta();
  }
}

/** hreflang link etiketleri (x-default → TR ana sayfa / TR karşılık). */
export function hreflangLinks(meta: SeoMeta): string {
  const links: string[] = [];
  if (meta.alternates.tr) links.push(`<link rel="alternate" hreflang="tr" href="${meta.alternates.tr}" />`);
  if (meta.alternates.en) links.push(`<link rel="alternate" hreflang="en" href="${meta.alternates.en}" />`);
  const xDefault = meta.alternates.tr ?? meta.alternates.en;
  if (xDefault) links.push(`<link rel="alternate" hreflang="x-default" href="${xDefault}" />`);
  return links.join('\n    ');
}

/**
 * Şablon HTML'deki <head> etiketlerini verilen meta ile değiştirir.
 * index.html'de bulunan tüm SEO etiketleri burada ele alınır; yeni bir etiket
 * eklenirse hem index.html'e hem buraya eklenmeli.
 */
export function injectSeoIntoHtml(html: string, meta: SeoMeta): string {
  let out = html;
  const ogImage = `${SITE_URL}${OG_IMAGE_PATH}`;
  const rep = (re: RegExp, value: string) => {
    out = out.replace(re, value);
  };

  rep(/<html\s+lang="[^"]*">/, `<html lang="${LOCALE[meta.lang].html}">`);
  rep(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(meta.title)}</title>`);
  rep(/<meta\s+name="description"\s+content="[^"]*"\s*\/>/, `<meta name="description" content="${escapeHtml(meta.description)}" />`);
  rep(/<meta\s+name="keywords"\s+content="[^"]*"\s*\/>/, `<meta name="keywords" content="${escapeHtml(meta.keywords)}" />`);
  rep(/<meta\s+property="og:locale"\s+content="[^"]*"\s*\/>/, `<meta property="og:locale" content="${LOCALE[meta.lang].og}" />`);
  rep(/<meta\s+property="og:title"\s+content="[^"]*"\s*\/>/, `<meta property="og:title" content="${escapeHtml(meta.title)}" />`);
  rep(/<meta\s+property="og:description"\s+content="[^"]*"\s*\/>/, `<meta property="og:description" content="${escapeHtml(meta.description)}" />`);
  rep(/<meta\s+property="og:type"\s+content="[^"]*"\s*\/>/, `<meta property="og:type" content="${meta.ogType}" />`);
  rep(/<meta\s+property="og:url"\s+content="[^"]*"\s*\/>/, `<meta property="og:url" content="${meta.canonical}" />`);
  rep(/<meta\s+property="og:image"\s+content="[^"]*"\s*\/>/, `<meta property="og:image" content="${ogImage}" />`);
  rep(/<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/>/, `<meta name="twitter:title" content="${escapeHtml(meta.title)}" />`);
  rep(/<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/>/, `<meta name="twitter:description" content="${escapeHtml(meta.description)}" />`);
  rep(/<link\s+rel="canonical"\s+href="[^"]*"\s*\/>/, `<link rel="canonical" href="${meta.canonical}" />`);
  rep(/<!--hreflang-->/, hreflangLinks(meta));

  // Şablondaki tek JSON-LD bloğu, o rotanın tüm bloklarıyla değiştirilir.
  // "<" kaçışı: içerikte "</script>" geçerse HTML'i bozmasın.
  const ld = meta.jsonLd
    .map((obj) => `<script type="application/ld+json">${JSON.stringify(obj).replace(/</g, '\\u003c')}</script>`)
    .join('\n    ');
  rep(/<script type="application\/ld\+json">[\s\S]*?<\/script>/, ld);

  return out;
}

export { routeToPath };
