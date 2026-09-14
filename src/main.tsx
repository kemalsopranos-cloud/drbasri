import {StrictMode} from 'react';
import {createRoot, hydrateRoot} from 'react-dom/client';
import App from './App.tsx';
import type {BlogPost} from './types';
import './index.css';

declare global {
  interface Window {
    __SSR_PATH__?: string;
    __SSR_POSTS__?: BlogPost[];
  }
}

const container = document.getElementById('root')!;
const ssrPosts = window.__SSR_POSTS__ ?? [];
const currentPath = window.location.pathname.replace(/\/+$/, '') || '/';

// Prerender edilmiş HTML varsa ve gerçekten bu rota için üretildiyse hydrate
// et. vercel.json'daki yedek yönlendirme (bilinmeyen /blog/<slug> → /blog)
// başka bir rotanın HTML'ini getirebilir; o durumda hydrate etmek uyumsuzluk
// hatası üretir — temiz render'a düş.
const canHydrate =
  container.hasChildNodes() &&
  typeof window.__SSR_PATH__ === 'string' &&
  window.__SSR_PATH__ === currentPath;

const app = (
  <StrictMode>
    <App ssrPosts={ssrPosts} />
  </StrictMode>
);

if (canHydrate) {
  hydrateRoot(container, app);
} else {
  createRoot(container).render(app);
}

// Google Analytics 4 — yalnızca VITE_GA_ID tanımlıysa yüklenir (Vercel env).
const gaId = import.meta.env.VITE_GA_ID as string | undefined;
if (gaId && !window.location.hostname.includes('localhost')) {
  const s = document.createElement('script');
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
  document.head.appendChild(s);
  const w = window as unknown as { dataLayer: unknown[]; gtag: (...args: unknown[]) => void };
  w.dataLayer = w.dataLayer || [];
  w.gtag = function () { w.dataLayer.push(arguments); };
  w.gtag('js', new Date());
  w.gtag('config', gaId);
}
