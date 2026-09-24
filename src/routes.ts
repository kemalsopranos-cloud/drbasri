import type { Language } from './types';

// ---------------------------------------------------------------------------
// URL ↔ dil ↔ sayfa çözümü — TEK KAYNAK.
//
// Faz 4 (18 Eyl 2026): Dil artık bir state değil, URL'nin parçası. Türkçe
// sayfalar kökte (/holep-lazer-prostat-tedavisi), İngilizce sayfalar /en
// önekiyle (/en/holep-laser-prostate-surgery-turkey). Eskiden dil düğmesi
// yalnızca state değiştiriyordu; Google İngilizce içeriğin varlığını hiç
// görmüyordu (her URL tek dil = Türkçe).
//
// Bileşenlerde "/blog/..." veya "/" + slug ELLE YAZMA — buradaki yardımcıları
// kullan; aksi hâlde EN sayfadan TR sayfaya sessizce düşülür.
// ---------------------------------------------------------------------------

export const LANG_PREFIX: Record<Language, string> = { TR: '', EN: '/en', RU: '/ru' };
export const EN_PREFIX = '/en';

// TR slug'lar hastanın Türkçe arama diliyle, EN slug'lar yabancı hastanın
// sorgusuyla ("HoLEP surgery Turkey", "robotic surgery Istanbul") yazıldı.
export const SERVICE_SLUGS: Record<Language, Record<string, string>> = {
  TR: {
    'robotic-surgery': 'davinci-robotik-cerrahi',
    'prostate-diseases': 'holep-lazer-prostat-tedavisi',
    'urologic-oncology': 'urolojik-onkoloji',
    'stone-disease': 'bobrek-tasi-tedavisi',
    'andrology-infertility': 'androloji-erkek-sagligi-tedavisi',
    'urogynecology': 'kadin-urolojisi-idrar-kacirma-tedavisi',
  },
  EN: {
    'robotic-surgery': 'robotic-surgery-istanbul',
    'prostate-diseases': 'holep-laser-prostate-surgery-turkey',
    'urologic-oncology': 'urologic-oncology-istanbul',
    'stone-disease': 'kidney-stone-laser-treatment-turkey',
    'andrology-infertility': 'andrology-male-infertility-istanbul',
    'urogynecology': 'female-urology-incontinence-treatment',
  },
  // RU slug'ları Latin harfli: Rusça arama sonuçlarında Kiril URL'ler
  // kopyalanınca %D0%… biçimine dönüşür ve okunmaz hâle gelir.
  RU: {
    'robotic-surgery': 'robotic-hirurgiya-davinci-stambul',
    'prostate-diseases': 'holep-lazernaya-operaciya-prostaty',
    'urologic-oncology': 'onkourologiya-stambul',
    'stone-disease': 'lechenie-kamney-v-pochkah-turciya',
    'andrology-infertility': 'andrologiya-muzhskoe-besplodie',
    'urogynecology': 'zhenskaya-urologiya-nederzhanie',
  },
};

// EN'e özel sayfa: yabancı hasta süreci (TR karşılığı yok)
// Yabancı hasta sayfası her yabancı dilde var; TR'de karşılığı yok.
export const INTERNATIONAL_SLUG: Record<'EN' | 'RU', string> = {
  EN: 'international-patients',
  RU: 'lechenie-v-turcii',
};

export type Route =
  | { lang: Language; kind: 'home' }
  | { lang: Language; kind: 'blog' }
  | { lang: Language; kind: 'article'; slug: string }
  | { lang: Language; kind: 'service'; id: string; slug: string }
  | { lang: 'EN' | 'RU'; kind: 'international' };

export function normalizePath(pathname: string): string {
  return pathname.replace(/\/+$/, '') || '/';
}

export function langFromPath(pathname: string): Language {
  const p = normalizePath(pathname);
  for (const lang of ['EN', 'RU'] as const) {
    const pre = LANG_PREFIX[lang];
    if (p === pre || p.startsWith(pre + '/')) return lang;
  }
  return 'TR';
}

/** URL'den dil ve sayfa türünü çözer. Bilinmeyen yollar ana sayfaya düşer. */
export function parseRoute(pathname: string): Route {
  const full = normalizePath(pathname);
  const lang = langFromPath(full);
  const pre = LANG_PREFIX[lang];
  const rest = pre ? full.slice(pre.length) || '/' : full;

  if (rest === '/') return { lang, kind: 'home' };
  if (rest === '/blog') return { lang, kind: 'blog' };
  if (rest.startsWith('/blog/')) return { lang, kind: 'article', slug: rest.slice('/blog/'.length) };
  if (lang !== 'TR' && rest === `/${INTERNATIONAL_SLUG[lang]}`) return { lang, kind: 'international' };

  const slug = rest.slice(1);
  const id = Object.keys(SERVICE_SLUGS[lang]).find((k) => SERVICE_SLUGS[lang][k] === slug);
  if (id) return { lang, kind: 'service', id, slug };

  return { lang, kind: 'home' };
}

const prefix = (lang: Language) => LANG_PREFIX[lang];

export function homePath(lang: Language): string {
  return LANG_PREFIX[lang] || '/';
}
export function blogPath(lang: Language): string {
  return `${prefix(lang)}/blog`;
}
export function articlePath(lang: Language, slug: string): string {
  return `${prefix(lang)}/blog/${slug}`;
}
export function servicePath(lang: Language, id: string): string {
  return `${prefix(lang)}/${SERVICE_SLUGS[lang][id]}`;
}
export function internationalPath(lang: 'EN' | 'RU' = 'EN'): string {
  return `${LANG_PREFIX[lang]}/${INTERNATIONAL_SLUG[lang]}`;
}

export function routeToPath(route: Route): string {
  switch (route.kind) {
    case 'home': return homePath(route.lang);
    case 'blog': return blogPath(route.lang);
    case 'article': return articlePath(route.lang, route.slug);
    case 'service': return servicePath(route.lang, route.id);
    case 'international': return internationalPath(route.lang);
  }
}

/**
 * Dil değiştirme hedefi: aynı sayfanın diğer dildeki karşılığı.
 * Makalelerde çeviri eşleşmesi `translationSlug` ile verilir; yoksa o dilin
 * blog listesine gidilir. International sayfasının TR karşılığı ana sayfadır.
 */
export function alternatePath(route: Route, target: Language, translationSlug?: string | null): string {
  if (route.lang === target) return routeToPath(route);
  switch (route.kind) {
    case 'home': return homePath(target);
    case 'blog': return blogPath(target);
    case 'service': return servicePath(target, route.id);
    case 'article': return translationSlug ? articlePath(target, translationSlug) : blogPath(target);
    case 'international': return target === 'TR' ? homePath('TR') : internationalPath(target);
  }
}
