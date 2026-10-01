import type { BlogPost, ExpertiseItem, FaqItem, Language } from '../types';
import { getBlogPosts, getExpertiseItems } from '../data';
import { SITE_URL, SITE_NAME, OG_IMAGE_PATH, DOCTOR } from './site';
import { COVER_SLUGS } from '../content/covers';
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
  /** Paylaşım görseli (og:image). Makalelerde kendi kapağı, diğerlerinde site görseli. */
  image: string;
  title: string;
  description: string;
  keywords: string;
  canonical: string;
  ogType: 'website' | 'article';
  /** hreflang hedefleri (mutlak URL). x-default = TR karşılığı. */
  alternates: Partial<Record<Language, string>>;
  jsonLd: Record<string, unknown>[];
}

export const LOCALE: Record<Language, { html: string; og: string; schema: string }> = {
  TR: { html: 'tr', og: 'tr_TR', schema: 'tr-TR' },
  EN: { html: 'en', og: 'en_US', schema: 'en' },
  RU: { html: 'ru', og: 'ru_RU', schema: 'ru' },
};

export function escapeHtml(str: string): string {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

const abs = (path: string) => `${SITE_URL}${path === '/' ? '/' : path}`;

/**
 * Makalenin kapak görseli. Kapaklar public/covers/<slug>.jpg olarak üretilir
 * (bkz. src/content/covers.ts). Kapağı olmayan yazı — örneğin panelden yeni
 * eklenmiş bir yazı — sitenin varsayılan görseline düşer; böylece paylaşım
 * önizlemesi hiçbir durumda boş kalmaz.
 */
export function coverPath(slug: string): string {
  return COVER_SLUGS.has(slug) ? `/covers/${slug}.jpg` : OG_IMAGE_PATH;
}

// ---------------------------------------------------------------------------
// SERP uzunlukları (1 Eki 2026 denetimi).
//
// Google arama sonucunda başlığı ~60, açıklamayı ~155-160 karakterden sonra
// keser. Denetimde 56 sayfanın 52'sinde başlık 60'ı aşıyordu (ortalama 86,
// en uzunu 117) — çünkü her başlığa " | Prof. Dr. Basri Çakıroğlu" ekleniyordu
// ve makale başlıkları zaten uzun. Marka eki artık YALNIZCA sığdığında ekleniyor;
// sığmadığında başlığın kendisi korunuyor (anahtar kelime başlıkta kalsın).
// ---------------------------------------------------------------------------
const TITLE_MAX = 60;
const DESC_MAX = 158;
const DESC_MIN = 120;
const BRAND_SHORT = 'Dr. Çakıroğlu';

/** Kelime sınırında kısaltır; sonda noktalama bırakmaz. */
function clampWords(text: string, max: number): string {
  const t = text.trim();
  if (t.length <= max) return t;
  const cut = t.slice(0, max - 1);
  const at = cut.lastIndexOf(' ');
  return (at > max * 0.6 ? cut.slice(0, at) : cut).replace(/[\s.,;:–-]+$/, '') + '…';
}

/** "Başlık | Marka" — yalnızca sınıra sığarsa marka eklenir. */
function withBrand(title: string): string {
  const full = `${title} | ${DOCTOR.name}`;
  if (full.length <= TITLE_MAX) return full;
  const short = `${title} | ${BRAND_SHORT}`;
  if (short.length <= TITLE_MAX) return short;
  return clampWords(title, TITLE_MAX);
}

/** Açıklamayı sınıra sığdırır; çok kısaysa tamamlayıcı cümle eklenir. */
function fitDesc(desc: string, filler?: string): string {
  let d = desc.trim().replace(/\s+/g, ' ');
  if (d.length < DESC_MIN && filler) d = `${d} ${filler.trim()}`;
  return clampWords(d, DESC_MAX);
}

const physicianAuthor = (lang: Language) => ({
  '@type': 'Physician',
  name: DOCTOR.name,
  jobTitle: lang === 'TR' ? DOCTOR.jobTitle : lang === 'RU' ? 'Уролог, роботический хирург' : 'Urologist & Robotic Surgeon',
  medicalSpecialty: 'Urologic',
  url: SITE_URL,
});

const organizationPublisher = (lang: Language) => ({
  '@type': 'MedicalOrganization',
  name: lang === 'TR' ? `${DOCTOR.name} Kliniği` : lang === 'RU' ? 'Урологическая клиника проф. д-ра Басри Чакыроглу' : `${DOCTOR.name} Urology Clinic`,
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
    jobTitle: lang === 'TR' ? DOCTOR.jobTitle : lang === 'RU' ? 'Уролог, роботический хирург' : 'Urologist & Robotic Surgeon',
    medicalSpecialty: ['Urologic', 'Oncologic'],
    description:
      lang === 'RU'
        ? 'Проф. д-р Басри Чакыроглу — уролог и роботический хирург в Стамбуле. Лазерная операция простаты HoLEP, роботическая простатэктомия daVinci, лазерное лечение камней в почках.'
        : lang === 'EN'
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
      lang === 'TR'
        ? DOCTOR.areaServed.map((name) => ({ '@type': 'City', name }))
        : [{ '@type': 'City', name: lang === 'RU' ? 'Стамбул' : 'Istanbul' }, { '@type': 'Country', name: lang === 'RU' ? 'Турция' : 'Turkey' }],
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
      availableLanguage: ['tr', 'en', 'ru'],
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

const HOME_LABEL: Record<Language, string> = { TR: 'Ana Sayfa', EN: 'Home', RU: 'Главная' };
const BLOG_LABEL: Record<Language, string> = { TR: 'Makaleler', EN: 'Articles', RU: 'Статьи' };

/** Tüm dillerin karşılıkları (hreflang için). */
function allLangs(route: Route, translationSlug?: string | null): Partial<Record<Language, string>> {
  const out: Partial<Record<Language, string>> = {};
  (['TR', 'EN', 'RU'] as Language[]).forEach((l) => {
    out[l] = abs(alternatePath(route, l, translationSlug));
  });
  return out;
}

// ---------------------------------------------------------------------------
// Sayfa meta'ları
// ---------------------------------------------------------------------------

export function buildHomeMeta(lang: Language = 'TR'): SeoMeta {
  const route: Route = { lang, kind: 'home' };
  if (lang === 'RU') {
    return {
      lang,
      title: 'Проф. д-р Басри Чакыроглу | Уролог в Стамбуле, Турция',
      description: fitDesc(
        'Профессор урологии и роботический хирург в Стамбуле: лазерная операция простаты HoLEP, роботическая простатэктомия daVinci, лечение камней в почках.'
      ),
      keywords:
        'уролог Стамбул, лечение в Турции урология, HoLEP Турция, роботическая простатэктомия Стамбул, лечение камней в почках Турция, проф Басри Чакыроглу',
      canonical: abs(homePath('RU')),
      ogType: 'website',
      image: `${SITE_URL}${OG_IMAGE_PATH}`,
      alternates: allLangs(route),
      jsonLd: [physicianJsonLd('RU'), websiteJsonLd('RU')],
    };
  }
  return lang === 'EN'
    ? {
        lang,
        title: 'Prof. Dr. Basri Çakıroğlu | Urologist in Istanbul, Turkey',
        description: fitDesc(
          'Professor of Urology and robotic surgeon in Istanbul: HoLEP laser prostate surgery, daVinci robotic prostatectomy and laser kidney stone treatment.'
        ),
        keywords:
          'urologist Istanbul, urologist Turkey international patients, HoLEP surgery Turkey, robotic prostatectomy Istanbul, kidney stone treatment Turkey, Prof Dr Basri Cakiroglu',
        canonical: abs(homePath('EN')),
        ogType: 'website',
        image: `${SITE_URL}${OG_IMAGE_PATH}`,
        alternates: allLangs(route),
        jsonLd: [physicianJsonLd('EN'), websiteJsonLd('EN')],
      }
    : {
        lang,
        title: 'Prof. Dr. Basri Çakıroğlu | Üroloji Uzmanı, İstanbul',
        description: fitDesc(
          'İstanbul Ümraniye Üroloji ve Robotik Cerrahi Uzmanı. HoLEP lazer prostat tedavisi, daVinci robotik cerrahi, böbrek taşı ve ürolojik onkoloji.'
        ),
        keywords:
          'Prof Dr Basri Çakıroğlu, üroloji uzmanı istanbul, ürolog ümraniye, HoLEP lazer prostat ameliyatı, robotik cerrahi, böbrek taşı lazer, ürolojik onkoloji',
        canonical: abs(homePath('TR')),
        ogType: 'website',
        image: `${SITE_URL}${OG_IMAGE_PATH}`,
        alternates: allLangs(route),
        jsonLd: [physicianJsonLd('TR'), websiteJsonLd('TR')],
      };
}

export function buildBlogHubMeta(lang: Language = 'TR'): SeoMeta {
  const route: Route = { lang, kind: 'blog' };
  const url = abs(blogPath(lang));
  return {
    lang,
    title:
      lang === 'RU'
        ? 'Статьи об урологии | Проф. д-р Басри Чакыроглу'
        : lang === 'EN'
        ? 'Urology Articles & Patient Guides | Dr. Çakıroğlu'
        : 'Üroloji Makaleleri & Sağlık Rehberi | Dr. Çakıroğlu',
    description: fitDesc(
      lang === 'RU'
        ? 'Материалы для пациентов: лазерная операция простаты HoLEP, роботическая простатэктомия, лечение камней в почках и мужское здоровье.'
        : lang === 'EN'
        ? 'Patient guides on HoLEP laser prostate surgery, robotic prostatectomy, kidney stone laser treatment and male fertility. Prof. Dr. Çakıroğlu, Istanbul.'
        : 'Prof. Dr. Basri Çakıroğlu tarafından hazırlanan HoLEP lazer prostat cerrahisi, daVinci robotik cerrahi, böbrek taşı ve üroloji makaleleri.'
    ),
    keywords:
      lang === 'RU'
        ? 'урология статьи, HoLEP Турция, роботическая простатэктомия Стамбул, лечение камней в почках за рубежом, второе мнение рак простаты'
        : lang === 'EN'
        ? 'urology articles, HoLEP Turkey, robotic prostatectomy Istanbul, kidney stone treatment abroad, prostate cancer second opinion'
        : 'üroloji makaleleri, HoLEP lazer, robotik cerrahi, böbrek taşı, prostat kanseri erken teşhis, Basri Çakıroğlu',
    canonical: url,
    ogType: 'website',
    image: `${SITE_URL}${OG_IMAGE_PATH}`,
    alternates: allLangs(route),
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
  const cover = `${SITE_URL}${coverPath(post.slug)}`;
  const route: Route = { lang, kind: 'article', slug: post.slug };
  // Çeviri karşılığı varsa iki dil de bildirilir; yoksa yalnızca kendi dili
  // (diğer dilde blog listesine işaret etmek yanlış hreflang olur).
  // Çevirisi bildirilen her dil hreflang'e girer; karşılığı olmayan dil hiç
  // bildirilmez (var olmayan sayfaya hreflang vermek Google'da hata üretir).
  const alternates: SeoMeta['alternates'] = { [lang]: url };
  Object.entries(post.translations ?? {}).forEach(([l, slug]) => {
    if (slug) alternates[l as Language] = abs(articlePath(l as Language, slug));
  });
  return {
    lang,
    title: withBrand(post.title),
    description: fitDesc(description),
    keywords,
    canonical: url,
    ogType: 'article',
    image: cover,
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
        image: cover,
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
  const title = withBrand(
    lang === 'EN' ? `${item.title} in Istanbul` : lang === 'RU' ? `${item.title} в Стамбуле` : item.title
  );
  // Hizmet açıklamaları (shortDesc) çoğu dilde 100-115 karakter kalıyordu;
  // konum ve hekim bilgisiyle tamamlanıp SERP'te tam satır dolduruluyor.
  const descFiller =
    lang === 'EN'
      ? 'Prof. Dr. Basri Çakıroğlu, Istanbul — for local and international patients.'
      : lang === 'RU'
      ? 'Проф. д-р Басри Чакыроглу, Стамбул — для пациентов из-за рубежа.'
      : 'Prof. Dr. Basri Çakıroğlu, Ümraniye / İstanbul.';
  return {
    lang,
    title,
    description: fitDesc(item.shortDesc, descFiller),
    keywords:
      lang === 'EN'
        ? `${item.title} Turkey, ${item.title} Istanbul, ${item.conditions.slice(0, 3).join(', ')}, urologist Istanbul international patients`
        : lang === 'RU'
        ? `${item.title} Турция, ${item.title} Стамбул, ${item.conditions.slice(0, 3).join(', ')}, уролог Стамбул лечение за рубежом`
        : `${item.title}, ${item.conditions.slice(0, 3).join(', ')}, Prof Dr Basri Çakıroğlu, Ümraniye Üroloji`,
    canonical: url,
    ogType: 'website',
    image: `${SITE_URL}${OG_IMAGE_PATH}`,
    alternates: allLangs(route),
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

export function buildInternationalMeta(lang: 'EN' | 'RU' = 'EN'): SeoMeta {
  const url = abs(internationalPath(lang));
  // Yabanci hasta sayfasinin TR karsiligi YOK, ama EN ve RU surumleri
  // birbirinin cevirisidir: ikisi de iki dili birlikte bildirmeli. Tek yonlu
  // hreflang Google'da "alternate sayfa geri baglanti vermiyor" uyarisi uretir
  // ve iki sayfa ayri ayri taranir (1 Eki 2026 denetimi).
  const intlAlternates: SeoMeta['alternates'] = {
    EN: abs(internationalPath('EN')),
    RU: abs(internationalPath('RU')),
  };
  if (lang === 'RU') {
    return {
      lang: 'RU',
      title: 'Лечение урологии в Турции | Проф. д-р Чакыроглу',
      description: fitDesc(
        'Лечение урологии в Стамбуле для пациентов из СНГ: дистанционная оценка документов, план лечения, сроки поездки и наблюдение после возвращения.'
      ),
      keywords:
        'лечение в Турции урология, уролог Стамбул для иностранцев, операция простаты за рубежом, HoLEP Турция, роботическая простатэктомия Турция, камни в почках лечение Стамбул',
      canonical: url,
      ogType: 'website',
      image: `${SITE_URL}${OG_IMAGE_PATH}`,
      alternates: intlAlternates,
      jsonLd: [
        {
          '@context': 'https://schema.org',
          '@type': 'MedicalWebPage',
          name: 'Лечение в Турции',
          url,
          inLanguage: 'ru',
          description:
            'Пошаговый порядок лечения в Стамбуле у проф. д-ра Басри Чакыроглу для пациентов из-за рубежа.',
          author: physicianAuthor('RU'),
          publisher: organizationPublisher('RU'),
          mainEntityOfPage: url,
        },
        breadcrumbJsonLd([
          { name: 'Главная', url: abs(homePath('RU')) },
          { name: 'Лечение в Турции', url },
        ]),
      ],
    };
  }
  return {
    lang: 'EN',
    title: 'International Patients | Urology in Istanbul, Turkey',
    description: fitDesc(
      'Urology care in Istanbul for international patients: remote report review, treatment plan, hospital stay, travel and follow-up. HoLEP, robotic surgery, stones.'
    ),
    keywords:
      'urology treatment Turkey international patients, medical tourism urology Istanbul, prostate surgery abroad, HoLEP Turkey, robotic prostatectomy Turkey, kidney stone surgery Istanbul',
    canonical: url,
    ogType: 'website',
    image: `${SITE_URL}${OG_IMAGE_PATH}`,
    alternates: intlAlternates,
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
      return buildInternationalMeta(route.lang);
  }
}

/** hreflang link etiketleri (x-default → TR ana sayfa / TR karşılık). */
export function hreflangLinks(meta: SeoMeta): string {
  const links: string[] = [];
  (['TR', 'EN', 'RU'] as Language[]).forEach((l) => {
    const href = meta.alternates[l];
    if (href) links.push(`<link rel="alternate" hreflang="${LOCALE[l].html}" href="${href}" />`);
  });
  const xDefault = meta.alternates.TR ?? meta.alternates.EN ?? meta.alternates.RU;
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
  const ogImage = meta.image;
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
  rep(/<meta\s+name="twitter:image"\s+content="[^"]*"\s*\/>/, `<meta name="twitter:image" content="${ogImage}" />`);
  rep(/<meta\s+property="og:image:alt"\s+content="[^"]*"\s*\/>/, `<meta property="og:image:alt" content="${escapeHtml(meta.title)}" />`);
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
