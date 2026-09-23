import express from 'express';
import path from 'path';
import fs from 'fs/promises';
import { createServer as createViteServer } from 'vite';
import nodemailer from 'nodemailer';
import { getBlogPosts, expertiseSlugs } from './src/data';
import { resolveSeoMeta, injectSeoIntoHtml } from './src/seo/meta';
import { SITE_URL } from './src/seo/site';

// ---------------------------------------------------------------------------
// SEO: rota başına <title>/meta/JSON-LD çözümü artık src/seo/meta.ts'te (TEK
// KAYNAK) — aynı fonksiyonları build-time prerender (scripts/prerender.ts) de
// kullanır. Bu sunucu yalnızca GELİŞTİRME ortamı ve isteğe bağlı Node
// dağıtımı içindir; canlı site (Vercel) prerender edilmiş statik HTML sunar.
// ---------------------------------------------------------------------------

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());


  const postsFilePath = path.join(process.cwd(), 'src', 'custom_posts.json');

  // Helper to read posts from custom_posts.json safely
  async function readPosts() {
    try {
      const data = await fs.readFile(postsFilePath, 'utf8');
      return JSON.parse(data);
    } catch (e) {
      console.error('Error reading custom posts file:', e);
      return [];
    }
  }

  // Helper to write posts to custom_posts.json safely
  async function writePosts(posts: any[]) {
    try {
      await fs.writeFile(postsFilePath, JSON.stringify(posts, null, 2), 'utf8');
    } catch (e) {
      console.error('Error writing custom posts file:', e);
    }
  }

  // API: Get custom posts
  app.get('/api/posts', async (req, res) => {
    try {
      const posts = await readPosts();
      res.json(posts);
    } catch (error) {
      res.status(500).json({ error: 'Failed to read posts' });
    }
  });

  // API: Add custom post
  app.post('/api/posts', async (req, res) => {
    try {
      const newPost = req.body;
      if (!newPost || !newPost.id) {
        return res.status(400).json({ error: 'Invalid post data' });
      }

      const posts = await readPosts();
      // Prepend the new post so it appears first
      const updatedPosts = [newPost, ...posts];
      await writePosts(updatedPosts);

      res.status(201).json(newPost);
    } catch (error) {
      res.status(500).json({ error: 'Failed to save post' });
    }
  });

  // API: Delete custom post
  app.delete('/api/posts/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const posts = await readPosts();
      const updatedPosts = posts.filter((post: any) => post.id !== id);
      await writePosts(updatedPosts);

      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete post' });
    }
  });

  // SEO: Dynamic XML Sitemap for Google Search Console
  app.get('/sitemap.xml', async (req, res) => {
    try {
      const baseUrl = SITE_URL;

      const customPosts = await readPosts();
      // Derive default article slugs directly from the shared content module
      // (src/data.ts) instead of a separately hand-maintained list, so the
      // sitemap can never silently drift out of sync with what actually exists.
      const defaultSlugs = getBlogPosts('TR').map((p) => p.slug);

      const allSlugs = new Set<string>();
      defaultSlugs.forEach(s => allSlugs.add(s));
      customPosts.forEach((p: any) => {
        if (p.slug) allSlugs.add(p.slug);
      });

      const today = new Date().toISOString().split('T')[0];

      let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
      xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

      // 1. Homepage
      xml += `  <url>\n`;
      xml += `    <loc>${baseUrl}/</loc>\n`;
      xml += `    <lastmod>${today}</lastmod>\n`;
      xml += `    <changefreq>daily</changefreq>\n`;
      xml += `    <priority>1.0</priority>\n`;
      xml += `  </url>\n`;

      // 2. Dedicated treatment/service pages (previously listed in a stale,
      // hand-written public/sitemap.xml that didn't correspond to any real
      // route in the app; now generated from the same data ServicePage.tsx renders)
      Object.values(expertiseSlugs).forEach((slug) => {
        xml += `  <url>\n`;
        xml += `    <loc>${baseUrl}/${slug}</loc>\n`;
        xml += `    <lastmod>${today}</lastmod>\n`;
        xml += `    <changefreq>monthly</changefreq>\n`;
        xml += `    <priority>0.9</priority>\n`;
        xml += `  </url>\n`;
      });

      // 3. Dedicated SEO Blog Knowledge Hub
      xml += `  <url>\n`;
      xml += `    <loc>${baseUrl}/blog</loc>\n`;
      xml += `    <lastmod>${today}</lastmod>\n`;
      xml += `    <changefreq>daily</changefreq>\n`;
      xml += `    <priority>0.9</priority>\n`;
      xml += `  </url>\n`;

      // 4. Clinical & SEO Articles
      allSlugs.forEach((slug) => {
        xml += `  <url>\n`;
        xml += `    <loc>${baseUrl}/blog/${slug}</loc>\n`;
        xml += `    <lastmod>${today}</lastmod>\n`;
        xml += `    <changefreq>weekly</changefreq>\n`;
        xml += `    <priority>0.8</priority>\n`;
        xml += `  </url>\n`;
      });

      xml += `</urlset>`;

      res.setHeader('Content-Type', 'application/xml');
      res.send(xml);
    } catch (error) {
      console.error('Error generating sitemap:', error);
      res.status(500).send('Error generating sitemap');
    }
  });

  // SEO: robots.txt
  app.get('/robots.txt', (req, res) => {
    const host = req.get('host') || 'basricakiroglu.com.tr';
    const protocol = req.protocol === 'https' || req.headers['x-forwarded-proto'] === 'https' ? 'https' : 'http';
    const baseUrl = `${protocol}://${host}`;

    const robots = `User-agent: *\nAllow: /\n\nSitemap: ${baseUrl}/sitemap.xml\n`;
    res.setHeader('Content-Type', 'text/plain');
    res.send(robots);
  });

  // API: Randevu bildirimi — CANLIDA api/appointments.ts (Vercel Serverless)
  // çalışır; burada yalnızca yerel geliştirme için aynı handler'a devredilir.
  // İş mantığını İKİ yere yazma: tek kaynak api/appointments.ts.
  app.all('/api/appointments', async (req, res) => {
    try {
      const mod = await import('./api/appointments');
      await mod.default(req as never, res as never);
    } catch (err) {
      console.error('Appointment handler error:', err);
      res.status(500).json({ ok: false, error: 'handler_failed' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    // appType 'custom' disables Vite's own SPA fallback (which would otherwise
    // serve the untouched index.html for every page route) so our SEO
    // middleware below gets a chance to inject per-route meta/JSON-LD first.
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'custom',
    });
    app.use(vite.middlewares);

    // SEO: server-render the correct <title>/meta/JSON-LD for whichever route
    // was requested, on every plain HTML page load (dev mode).
    app.use(async (req, res, next) => {
      if (req.method !== 'GET') return next();
      try {
        const rawHtml = await fs.readFile(path.resolve(process.cwd(), 'index.html'), 'utf-8');
        let html = await vite.transformIndexHtml(req.originalUrl, rawHtml);

        const customPosts = await readPosts();
        const meta = resolveSeoMeta(req.path, customPosts);
        html = injectSeoIntoHtml(html, meta);

        res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
      } catch (e) {
        vite.ssrFixStacktrace(e as Error);
        next(e);
      }
    });
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    // index: false so express.static does NOT auto-serve dist/index.html for
    // '/' itself — that would bypass our SEO injection below for the homepage.
    app.use(express.static(distPath, { index: false }));
    app.get('*', async (req, res) => {
      try {
        const rawHtml = await fs.readFile(path.join(distPath, 'index.html'), 'utf-8');

        const customPosts = await readPosts();
        const meta = resolveSeoMeta(req.path, customPosts);
        const html = injectSeoIntoHtml(rawHtml, meta);

        res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
      } catch (e) {
        console.error('SEO render error, falling back to static index.html:', e);
        res.sendFile(path.join(distPath, 'index.html'));
      }
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
