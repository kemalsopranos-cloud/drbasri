import { useEffect, useRef, useState } from 'react';
import { Globe, Check } from 'lucide-react';
import { Language } from '../types';

interface LanguageSwitcherProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  /** Koyu zeminli ince çubuklarda (hizmet/blog başlığı) kullanılır */
  compact?: boolean;
}

// Üçüncü dil eklendiğinde (24 Eyl 2026) basit TR↔EN düğmesi yetmez oldu:
// açılır liste, dili URL'ye göre gösterir ve seçim aynı sayfanın o dildeki
// karşılığına gider (bkz. App.setLanguage → alternatePath).
const LANGS: { code: Language; label: string; native: string }[] = [
  { code: 'TR', label: 'TR', native: 'Türkçe' },
  { code: 'EN', label: 'EN', native: 'English' },
  { code: 'RU', label: 'RU', native: 'Русский' },
];

export default function LanguageSwitcher({ language, setLanguage, compact = false }: LanguageSwitcherProps) {
  const [open, setOpen] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div className="relative" ref={boxRef}>
      <button
        id="lang-switcher"
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Language"
        className={
          compact
            ? 'flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold uppercase rounded border border-white/20 hover:border-gold text-slate-300 hover:text-gold transition-colors'
            : 'flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-white/5 border border-white/10 text-xs text-gold font-bold hover:border-gold/40 transition-colors'
        }
      >
        <Globe className="w-3.5 h-3.5" />
        <span>{language}</span>
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute right-0 mt-2 w-36 py-1 rounded-lg bg-navy border border-white/15 shadow-xl z-50"
        >
          {LANGS.map((l) => (
            <li key={l.code}>
              <button
                type="button"
                role="option"
                aria-selected={l.code === language}
                onClick={() => {
                  setOpen(false);
                  setLanguage(l.code);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs transition-colors ${
                  l.code === language ? 'text-gold font-bold' : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <span>{l.native}</span>
                {l.code === language && <Check className="w-3.5 h-3.5" />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
