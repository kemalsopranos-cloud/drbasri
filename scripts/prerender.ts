/**
 * Build-time prerender (SSG).
 *
 * NEDEN: Site Vercel'de statik yayınlanıyor; server.ts orada HİÇ çalışmıyor.
 * Sonuç (canlıda ölçüldü, 14 Eyl 2026): ana sayfa dışındaki her rota 404,
 * sitemap 404, HTML gövdesi boş <div id="root">. Google siteyi tek sayfa
 * olarak görüyordu.
 *
 * Bu betik `vite build` (istemci) + `vite build --ssr` (sunucu paketi)
 * sonrasında çalışır ve her rota için:
 *   1. React ağacını renderToString ile gerçek HTML'e çevirir,
 *   2. src/seo/meta.ts'ten o rotanın title/meta/canonical/JSON-LD'sini basar,
 *   3. dist/<rota>/index.html olarak yazar (Vercel dizin index'i olarak sunar).
 * Ayrıca sitemap.xml ve robots.txt üretir.
 *
 * Blog yazıları: repodaki varsayılanlar + Firestore'daki (doktorun panelden
 * eklediği) TR yazılar build sırasında çekilir. Firestore'a erişilemezse
 * yalnızca varsayılanlar basılır; build ASLA bu yüzden kırılmaz.
 *
 * Çalıştırma: `npm run build` (bkz. package.json)
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { getBlogPosts, expertiseSlugs } from '../src/data';
import { resolveSeoMeta, injectSeoIntoHtml, postDates } from '../src/seo/meta';
import { SITE_URL } from '../src/seo/site';
import type { BlogPost } from '../src/types';

const ROOT = process.cwd();
const DIST = path.join(ROOT, 'dist');
const SSR_OUT = path.join(ROOT, '.ssr');
const FIRESTORE_TIMEOUT_MS = 20_000;

async function fetchFirestorePosts(): Promise<BlogPost[]> {
  try {
    const { db } = await import('../src/firebase');
    const { collection, getDocs, query, where, terminate } = await import('firebase/firestore');
    const q = query(collection(db, 'blog_posts'), where('language', '==', 'TR'));

    const snapshot = await Promise.race([
      getDocs(q),
      new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error(`Firestore timeout (${FIRESTORE_TIMEOUT_MS} ms)`)), FIRESTORE_TIMEOUT_MS)
      ),
    ]);

    const posts: { post: BlogPost; createdAt: number }[] = [];
    snapshot.forEach((docSnap) => {
      const data = docSnap.data();
      if (!data.title || !data.content) return;
      posts.push({
        post: {
          id: docSnap.id,
          title: data.title,
          slug: data.slug || docSnap.id,
          excerpt: data.excerpt || '',
          content: data.content,
          date: data.date || '',
          readTime: data.readTime || '5',
          category: data.category || 'Üroloji',
          author: data.author || 'Prof. Dr. Basri Çakıroğlu',
          keywords: data.keywords || '',
          metaDescription: data.metaDescription || data.excerpt || '',
          language: 'TR',
        },
        createdAt: data.createdAt || 0,
      });
    });
    posts.sort((a, b) => b.createdAt - a.createdAt);
    await terminate(db).catch(() => undefined);
    console.log(`[prerender] Firestore: ${posts.length} yazı alındı`);
    return posts.map((p) => p.post);
  } catch (err) {
    console.warn('[prerender] Firestore yazıları alınamadı, varsayılanlarla devam:', (err as Error).message);
    return [];
  }
}

function escapeJsonForScript(value: unknown): string {
  // "</script>" ve satır ayırıcıları HTML içinde güvenli hâle getir
  return JSON.stringify(value)
    .replace(/</g, '\\u003c')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029');
}

function outFileFor(route: string): string {
  if (route === '/') return path.join(DIST, 'index.html');
  return path.join(DIST, route.replace(/^\//, ''), 'index.html');
}

async function main() {
  const template = await fs.readFile(path.join(DIST, 'index.html'), 'utf-8');
  if (!template.includes('<!--ssr-outlet-->')) {
    throw new Error('dist/index.html içinde <!--ssr-outlet--> yok — index.html şablonunu kontrol et');
  }

  const serverEntry = pathToFileURL(path.join(SSR_OUT, 'entry-server.js')).href;
  const { render } = (await import(serverEntry)) as { render: (p: string, posts: BlogPost[]) => string };

  const firestorePosts = await fetchFirestorePosts();
  const defaultPosts = getBlogPosts('TR');
  // Firestore'daki bir yazı varsayılanla aynı slug'a sahipse Firestore kazanır
  const seen = new Set<string>();
  const allPosts: BlogPost[] = [];
  for (const p of [...firestorePosts, ...defaultPosts]) {
    if (seen.has(p.slug)) continue;
    seen.add(p.slug);
    allPosts.push(p);
  }

  const serviceRoutes = Object.values(expertiseSlugs).map((slug) => `/${slug}`);
  const blogRoutes = allPosts.map((p) => `/blog/${p.slug}`);
  const routes = ['/', ...serviceRoutes, '/blog', ...blogRoutes];

  const today = new Date().toISOString().split('T')[0];
  const sitemapEntries: string[] = [];

  for (const route of routes) {
    const isBlog = route.startsWith('/blog');
    const appHtml = render(route, isBlog ? firestorePosts : []);
    const meta = resolveSeoMeta(route, firestorePosts);

    const bootstrap =
      `<script>window.__SSR_PATH__=${escapeJsonForScript(route)};` +
      (isBlog ? `window.__SSR_POSTS__=${escapeJsonForScript(firestorePosts)};` : '') +
      `</script>`;

    let html = injectSeoIntoHtml(template, meta);
    html = html.replace('<!--ssr-outlet-->', appHtml);
    html = html.replace('<script type="module"', `${bootstrap}\n    <script type="module"`);

    const file = outFileFor(route);
    await fs.mkdir(path.dirname(file), { recursive: true });
    await fs.writeFile(file, html, 'utf-8');

    const post = isBlog ? allPosts.find((p) => `/blog/${p.slug}` === route) : undefined;
    const lastmod = (post && postDates(post).modified) || today;
    const priority = route === '/' ? '1.0' : route === '/blog' ? '0.8' : isBlog ? '0.7' : '0.9';
    const changefreq = route === '/' || route === '/blog' ? 'weekly' : 'monthly';
    sitemapEntries.push(
      `  <url>\n    <loc>${meta.canonical}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`
    );
    console.log(`[prerender] ${route} → ${path.relative(ROOT, file)} (${(html.length / 1024).toFixed(1)} KB)`);
  }

  const sitemap =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapEntries.join('\n')}\n</urlset>\n`;
  await fs.writeFile(path.join(DIST, 'sitemap.xml'), sitemap, 'utf-8');

  const robots = `User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ${SITE_URL}/sitemap.xml\n`;
  await fs.writeFile(path.join(DIST, 'robots.txt'), robots, 'utf-8');

  console.log(`[prerender] ${routes.length} rota, sitemap.xml ve robots.txt yazıldı`);
}

main().then(
  () => process.exit(0),
  (err) => {
    console.error('[prerender] HATA:', err);
    process.exit(1);
  }
);
