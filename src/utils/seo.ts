import { BlogPost, ExpertiseItem } from '../types';

/**
 * Accurately transliterates Turkish and special characters into clean URL slugs
 */
export function generateSlug(text: string): string {
  const turkishMap: Record<string, string> = {
    'ç': 'c', 'Ç': 'c',
    'ğ': 'g', 'Ğ': 'g',
    'ı': 'i', 'I': 'i', 'İ': 'i',
    'ö': 'o', 'Ö': 'o',
    'ş': 's', 'Ş': 's',
    'ü': 'u', 'Ü': 'u',
  };

  let clean = text || '';
  for (const [key, value] of Object.entries(turkishMap)) {
    clean = clean.split(key).join(value);
  }

  return clean
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

/**
 * Dynamically updates document title and SEO meta tags
 */
export function updatePageSeo(options: {
  title: string;
  description: string;
  keywords?: string;
  url?: string;
}) {
  if (typeof document === 'undefined') return;

  // Title
  document.title = options.title;

  // Description
  let descMeta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
  if (!descMeta) {
    descMeta = document.createElement('meta');
    descMeta.name = 'description';
    document.head.appendChild(descMeta);
  }
  descMeta.content = options.description;

  // Keywords
  if (options.keywords) {
    let kwMeta = document.querySelector('meta[name="keywords"]') as HTMLMetaElement | null;
    if (!kwMeta) {
      kwMeta = document.createElement('meta');
      kwMeta.name = 'keywords';
      document.head.appendChild(kwMeta);
    }
    kwMeta.content = options.keywords;
  }

  // Open Graph Title
  let ogTitle = document.querySelector('meta[property="og:title"]') as HTMLMetaElement | null;
  if (!ogTitle) {
    ogTitle = document.createElement('meta');
    ogTitle.setAttribute('property', 'og:title');
    document.head.appendChild(ogTitle);
  }
  ogTitle.content = options.title;

  // Open Graph Description
  let ogDesc = document.querySelector('meta[property="og:description"]') as HTMLMetaElement | null;
  if (!ogDesc) {
    ogDesc = document.createElement('meta');
    ogDesc.setAttribute('property', 'og:description');
    document.head.appendChild(ogDesc);
  }
  ogDesc.content = options.description;
}

/**
 * Injects structured schema.org JSON-LD for Medical Article
 */
export function injectArticleJsonLd(post: BlogPost, originUrl: string) {
  if (typeof document === 'undefined') return;

  const scriptId = 'article-structured-data';
  let existingScript = document.getElementById(scriptId);
  if (existingScript) {
    existingScript.remove();
  }

  const script = document.createElement('script');
  script.id = scriptId;
  script.type = 'application/ld+json';

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    'name': post.title,
    'headline': post.title,
    'description': post.metaDescription || post.excerpt,
    'keywords': post.keywords || `${post.category}, Üroloji, Prof. Dr. Basri Çakıroğlu`,
    'url': `${originUrl}/blog/${post.slug}`,
    'datePublished': post.date,
    'inLanguage': 'tr-TR',
    'author': {
      '@type': 'Physician',
      'name': 'Prof. Dr. Basri Çakıroğlu',
      'jobTitle': 'Üroloji & Robotik Cerrahi Uzmanı',
      'medicalSpecialty': 'UrologicSurgery',
      'url': originUrl
    },
    'publisher': {
      '@type': 'MedicalOrganization',
      'name': 'Prof. Dr. Basri Çakıroğlu Kliniği',
      'url': originUrl
    }
  };

  script.text = JSON.stringify(schema);
  document.head.appendChild(script);
}

/**
 * Removes custom structured data when leaving article
 */
export function removeArticleJsonLd() {
  if (typeof document === 'undefined') return;
  const script = document.getElementById('article-structured-data');
  if (script) {
    script.remove();
  }
}

/**
 * Injects structured schema.org JSON-LD for a dedicated treatment/service page
 * (MedicalWebPage wrapping a MedicalProcedure). This is what lets Google show
 * rich results for individual treatments (HoLEP, robotic surgery, etc.) instead
 * of only ever understanding the homepage.
 */
export function injectServiceJsonLd(item: ExpertiseItem, slug: string, originUrl: string) {
  if (typeof document === 'undefined') return;

  const scriptId = 'service-structured-data';
  const existingScript = document.getElementById(scriptId);
  if (existingScript) {
    existingScript.remove();
  }

  const script = document.createElement('script');
  script.id = scriptId;
  script.type = 'application/ld+json';

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    'name': item.title,
    'headline': item.title,
    'description': item.longDesc,
    'url': `${originUrl}/${slug}`,
    'inLanguage': 'tr-TR',
    'about': {
      '@type': 'MedicalProcedure',
      'name': item.title,
      'description': item.longDesc,
    },
    'author': {
      '@type': 'Physician',
      'name': 'Prof. Dr. Basri Çakıroğlu',
      'jobTitle': 'Üroloji & Robotik Cerrahi Uzmanı',
      'medicalSpecialty': 'UrologicSurgery',
      'url': originUrl
    },
    'publisher': {
      '@type': 'MedicalOrganization',
      'name': 'Prof. Dr. Basri Çakıroğlu Kliniği',
      'url': originUrl
    }
  };

  script.text = JSON.stringify(schema);
  document.head.appendChild(script);
}

/**
 * Removes the service-page structured data when navigating away
 */
export function removeServiceJsonLd() {
  if (typeof document === 'undefined') return;
  const script = document.getElementById('service-structured-data');
  if (script) {
    script.remove();
  }
}
