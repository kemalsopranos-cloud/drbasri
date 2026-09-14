import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import App from './App.tsx';
import type { BlogPost } from './types';

/**
 * Build-time prerender girişi (scripts/prerender.ts tarafından çağrılır).
 * Her rota için gerçek içerik dolu HTML üretir; Googlebot ve link önizleme
 * botları JS çalıştırmadan metni görür. İstemci tarafında main.tsx aynı
 * ağacı hydrate eder.
 */
export function render(path: string, ssrPosts: BlogPost[] = []): string {
  return renderToString(
    <StrictMode>
      <App initialPath={path} ssrPosts={ssrPosts} />
    </StrictMode>
  );
}
