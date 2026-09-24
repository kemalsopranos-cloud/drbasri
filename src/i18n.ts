import type { Language } from './types';

// ---------------------------------------------------------------------------
// Satır içi çok dilli metin yardımcısı.
//
// Bileşenlerde eskiden `language === 'TR' ? 'Türkçe' : 'English'` kalıbı vardı;
// üçüncü dil eklenince bu kalıp Rusça sayfada İNGİLİZCE metin gösterirdi.
// Artık:  L(language, { TR: '...', EN: '...' })
//
// Rusça karşılıklar tek bir sözlükte (RU_TEXT) Türkçe metin anahtarıyla
// tutulur; böylece her çağrıya üçüncü bir alan eklemek gerekmez ve çeviriler
// tek dosyada gözden geçirilebilir. Karşılığı olmayan metin İNGİLİZCEYE düşer
// — sayfa hiçbir durumda boş veya bozuk görünmez.
// ---------------------------------------------------------------------------

import { RU_TEXT } from './i18n-ru';

export function L(lang: Language, v: { TR: string; EN: string; RU?: string }): string {
  if (lang === 'RU') return v.RU ?? RU_TEXT[v.TR] ?? v.EN;
  return lang === 'TR' ? v.TR : v.EN;
}

/** Çeviri kapsamını ölçmek için (geliştirme aracı, üretimde çağrılmıyor). */
export function missingRu(trTexts: string[]): string[] {
  return trTexts.filter((t) => !RU_TEXT[t]);
}
