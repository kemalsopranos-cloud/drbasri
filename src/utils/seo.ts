import type { SeoMeta } from '../seo/meta';
import { SITE_URL, OG_IMAGE_PATH } from '../seo/site';

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

function setMeta(selector: string, create: () => HTMLMetaElement, content: string) {
  let el = document.head.querySelector(selector) as HTMLMetaElement | null;
  if (!el) {
    el = create();
    document.head.appendChild(el);
  }
  el.content = content;
}

function metaByName(name: string) {
  return () => {
    const m = document.createElement('meta');
    m.name = name;
    return m;
  };
}

function metaByProperty(property: string) {
  return () => {
    const m = document.createElement('meta');
    m.setAttribute('property', property);
    return m;
  };
}

/**
 * İstemci tarafı gezinmede <head>'i verilen meta ile günceller. Sunucuda
 * (prerender) aynı meta injectSeoIntoHtml ile HTML'e basılır; burada yalnızca
 * SPA içi geçişlerde (blog listesinden yazıya tıklamak gibi) tazelenir.
 *
 * KÖK NEDEN NOTU: Eski sürüm canonical ve og:url'yi güncellemiyordu — kullanıcı
 * ana sayfadan bir yazıya geçince canonical hâlâ "/" kalıyordu.
 */
export function updatePageSeo(meta: SeoMeta) {
  if (typeof document === 'undefined') return;

  document.title = meta.title;
  setMeta('meta[name="description"]', metaByName('description'), meta.description);
  setMeta('meta[name="keywords"]', metaByName('keywords'), meta.keywords);
  setMeta('meta[property="og:title"]', metaByProperty('og:title'), meta.title);
  setMeta('meta[property="og:description"]', metaByProperty('og:description'), meta.description);
  setMeta('meta[property="og:type"]', metaByProperty('og:type'), meta.ogType);
  setMeta('meta[property="og:url"]', metaByProperty('og:url'), meta.canonical);
  setMeta('meta[property="og:image"]', metaByProperty('og:image'), `${SITE_URL}${OG_IMAGE_PATH}`);
  setMeta('meta[name="twitter:title"]', metaByName('twitter:title'), meta.title);
  setMeta('meta[name="twitter:description"]', metaByName('twitter:description'), meta.description);

  let canonical = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.rel = 'canonical';
    document.head.appendChild(canonical);
  }
  canonical.href = meta.canonical;

  // JSON-LD: önceki rotanın blokları kaldırılır, yenileri eklenir
  document.head
    .querySelectorAll('script[type="application/ld+json"]')
    .forEach((s) => s.remove());
  meta.jsonLd.forEach((obj) => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(obj);
    document.head.appendChild(script);
  });
}
