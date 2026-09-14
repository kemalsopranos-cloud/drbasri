import type { BlogPost, ExpertiseItem } from '../types';
import { getBlogPosts, getExpertiseItems, expertiseSlugs } from '../data';
import { SITE_URL, SITE_NAME, OG_IMAGE_PATH, DOCTOR } from './site';

// ---------------------------------------------------------------------------
// Route → <title>/meta/canonical/JSON-LD çözümü. TEK KAYNAK: hem build-time
// prerender (scripts/prerender.ts) hem geliştirme sunucusu (server.ts) hem de
// istemci tarafı güncelleme (utils/seo.ts) buradan beslenir. Ayrı ayrı
// yazılırsa canlıda bir değer, geliştirmede başka bir değer görünür.
// ---------------------------------------------------------------------------

export interface SeoMeta {
  title: string;
  description: string;
  keywords: string;
  canonical: string;
  ogType: 'website' | 'article';
  jsonLd: Record<string, unknown>[];
}

export function escapeHtml(str: string): string {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

const physicianAuthor = {
  '@type': 'Physician',
  name: DOCTOR.name,
  jobTitle: DOCTOR.jobTitle,
  medicalSpecialty: 'Urologic',
  url: SITE_URL,
};

const organizationPublisher = {
  '@type': 'MedicalOrganization',
  name: `${DOCTOR.name} Kliniği`,
  url: SITE_URL,
  logo: `${SITE_URL}/favicon-512.png`,
};

// Ana sayfa: Physician + yerel işletme sinyalleri (adres, telefon, sosyal
// profiller). "ürolog Ümraniye" gibi yerel aramalarda Google bu alanları
// Business Profile ile eşleştirir.
export function physicianJsonLd(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Physician',
    '@id': `${SITE_URL}/#physician`,
    name: DOCTOR.name,
    url: SITE_URL,
    image: `${SITE_URL}${OG_IMAGE_PATH}`,
    jobTitle: DOCTOR.jobTitle,
    medicalSpecialty: ['Urologic', 'Oncologic'],
    description:
      'Prof. Dr. Basri Çakıroğlu - Üroloji ve Robotik Cerrahi Uzmanı. HoLEP lazer prostat ameliyatı, daVinci robotik prostatektomi, böbrek taşı tedavisi.',
    telephone: DOCTOR.telephone,
    address: { '@type': 'PostalAddress', ...DOCTOR.address },
    areaServed: { '@type': 'City', name: 'İstanbul' },
    hospitalAffiliation: { '@type': 'Hospital', name: DOCTOR.hospital },
    sameAs: [DOCTOR.instagram],
    availableService: getExpertiseItems('TR').map((item) => ({
      '@type': 'MedicalProcedure',
      name: item.title,
      url: `${SITE_URL}/${expertiseSlugs[item.id]}`,
    })),
  };
}

function websiteJsonLd(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: 'tr-TR',
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

export function buildHomeMeta(): SeoMeta {
  return {
    title: 'Prof. Dr. Basri Çakıroğlu | Üroloji Uzmanı İstanbul – HoLEP & Robotik Cerrahi',
    description:
      'Prof. Dr. Basri Çakıroğlu - İstanbul Ümraniye Üroloji ve Robotik Cerrahi Uzmanı. HoLEP lazer prostat tedavisi, daVinci robotik cerrahi, böbrek taşı ve ürolojik onkoloji.',
    keywords:
      'Prof Dr Basri Çakıroğlu, üroloji uzmanı istanbul, ürolog ümraniye, HoLEP lazer prostat ameliyatı, robotik cerrahi, böbrek taşı lazer, ürolojik onkoloji',
    canonical: `${SITE_URL}/`,
    ogType: 'website',
    jsonLd: [physicianJsonLd(), websiteJsonLd()],
  };
}

export function buildBlogHubMeta(): SeoMeta {
  return {
    title: 'Üroloji Makaleleri & Sağlık Rehberi | Prof. Dr. Basri Çakıroğlu',
    description:
      'Prof. Dr. Basri Çakıroğlu tarafından hazırlanan HoLEP lazer prostat cerrahisi, daVinci robotik cerrahi, böbrek taşı ve üroloji makaleleri.',
    keywords:
      'üroloji makaleleri, HoLEP lazer, robotik cerrahi, böbrek taşı, prostat kanseri erken teşhis, Basri Çakıroğlu',
    canonical: `${SITE_URL}/blog`,
    ogType: 'website',
    jsonLd: [
      breadcrumbJsonLd([
        { name: 'Ana Sayfa', url: `${SITE_URL}/` },
        { name: 'Makaleler', url: `${SITE_URL}/blog` },
      ]),
    ],
  };
}

export function buildArticleMeta(post: BlogPost): SeoMeta {
  const description = post.metaDescription || post.excerpt;
  const url = `${SITE_URL}/blog/${post.slug}`;
  const keywords = post.keywords || `${post.category}, Üroloji, ${DOCTOR.name}`;
  return {
    title: `${post.title} | ${DOCTOR.name}`,
    description,
    keywords,
    canonical: url,
    ogType: 'article',
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'MedicalWebPage',
        name: post.title,
        headline: post.title,
        description,
        keywords,
        url,
        datePublished: post.date,
        dateModified: post.date,
        inLanguage: 'tr-TR',
        image: `${SITE_URL}${OG_IMAGE_PATH}`,
        author: physicianAuthor,
        publisher: organizationPublisher,
        mainEntityOfPage: url,
      },
      breadcrumbJsonLd([
        { name: 'Ana Sayfa', url: `${SITE_URL}/` },
        { name: 'Makaleler', url: `${SITE_URL}/blog` },
        { name: post.title, url },
      ]),
    ],
  };
}

export function buildServiceMeta(item: ExpertiseItem, slug: string): SeoMeta {
  const url = `${SITE_URL}/${slug}`;
  return {
    title: `${item.title} | ${DOCTOR.name}`,
    description: item.shortDesc,
    keywords: `${item.title}, ${item.conditions.slice(0, 3).join(', ')}, Prof Dr Basri Çakıroğlu, Ümraniye Üroloji`,
    canonical: url,
    ogType: 'website',
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'MedicalWebPage',
        name: item.title,
        headline: item.title,
        description: item.longDesc,
        url,
        inLanguage: 'tr-TR',
        image: `${SITE_URL}${OG_IMAGE_PATH}`,
        about: {
          '@type': 'MedicalProcedure',
          name: item.title,
          description: item.longDesc,
        },
        author: physicianAuthor,
        publisher: organizationPublisher,
        mainEntityOfPage: url,
      },
      breadcrumbJsonLd([
        { name: 'Ana Sayfa', url: `${SITE_URL}/` },
        { name: item.title, url },
      ]),
    ],
  };
}

/**
 * Verilen yol için doğru meta'yı üretir. `extraPosts`: Firestore'dan gelen
 * (repoda olmayan) yazılar — build sırasında çekilip buraya verilir.
 */
export function resolveSeoMeta(pathname: string, extraPosts: BlogPost[] = []): SeoMeta {
  const clean = pathname.replace(/\/+$/, '') || '/';

  if (clean.startsWith('/blog/')) {
    const slug = clean.replace('/blog/', '');
    const post =
      extraPosts.find((p) => p.slug === slug) || getBlogPosts('TR').find((p) => p.slug === slug);
    if (post) return buildArticleMeta(post);
    return buildBlogHubMeta(); // bilinmeyen slug: ana sayfa meta'sını sızdırma
  }
  if (clean === '/blog') return buildBlogHubMeta();

  const slug = clean.replace(/^\//, '');
  const expertiseId = Object.keys(expertiseSlugs).find((id) => expertiseSlugs[id] === slug);
  if (expertiseId) {
    const item = getExpertiseItems('TR').find((i) => i.id === expertiseId);
    if (item) return buildServiceMeta(item, slug);
  }

  return buildHomeMeta();
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

  rep(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(meta.title)}</title>`);
  rep(/<meta\s+name="description"\s+content="[^"]*"\s*\/>/, `<meta name="description" content="${escapeHtml(meta.description)}" />`);
  rep(/<meta\s+name="keywords"\s+content="[^"]*"\s*\/>/, `<meta name="keywords" content="${escapeHtml(meta.keywords)}" />`);
  rep(/<meta\s+property="og:title"\s+content="[^"]*"\s*\/>/, `<meta property="og:title" content="${escapeHtml(meta.title)}" />`);
  rep(/<meta\s+property="og:description"\s+content="[^"]*"\s*\/>/, `<meta property="og:description" content="${escapeHtml(meta.description)}" />`);
  rep(/<meta\s+property="og:type"\s+content="[^"]*"\s*\/>/, `<meta property="og:type" content="${meta.ogType}" />`);
  rep(/<meta\s+property="og:url"\s+content="[^"]*"\s*\/>/, `<meta property="og:url" content="${meta.canonical}" />`);
  rep(/<meta\s+property="og:image"\s+content="[^"]*"\s*\/>/, `<meta property="og:image" content="${ogImage}" />`);
  rep(/<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/>/, `<meta name="twitter:title" content="${escapeHtml(meta.title)}" />`);
  rep(/<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/>/, `<meta name="twitter:description" content="${escapeHtml(meta.description)}" />`);
  rep(/<link\s+rel="canonical"\s+href="[^"]*"\s*\/>/, `<link rel="canonical" href="${meta.canonical}" />`);

  // Şablondaki tek JSON-LD bloğu, o rotanın tüm bloklarıyla değiştirilir.
  // "<" kaçışı: içerikte "</script>" geçerse HTML'i bozmasın.
  const ld = meta.jsonLd
    .map((obj) => `<script type="application/ld+json">${JSON.stringify(obj).replace(/</g, '\\u003c')}</script>`)
    .join('\n    ');
  rep(/<script type="application\/ld\+json">[\s\S]*?<\/script>/, ld);

  return out;
}
