import express from 'express';
import path from 'path';
import fs from 'fs/promises';
import { createServer as createViteServer } from 'vite';
import nodemailer from 'nodemailer';
import { getBlogPosts, getExpertiseItems, expertiseSlugs } from './src/data';
import type { BlogPost, ExpertiseItem } from './src/types';

// ---------------------------------------------------------------------------
// SEO: server-side <title>/meta/JSON-LD resolution per route.
//
// Why this exists: the app is a client-rendered SPA. Without this, every route
// (the homepage, every blog article, every treatment page) is served the exact
// same static index.html with the SAME <title>/meta description/JSON-LD, and the
// correct per-page values are only patched in client-side, after React mounts
// (see src/utils/seo.ts -> updatePageSeo). That's invisible to anything that
// doesn't execute JavaScript on first request: link-preview bots (WhatsApp,
// Instagram, Facebook, Twitter/X), and it also delays what Googlebot sees on
// first crawl. This function computes the right meta for a given path so it can
// be injected directly into the HTML response, server-side, before it ever
// reaches the client.
// ---------------------------------------------------------------------------

interface SeoMeta {
  title: string;
  description: string;
  keywords: string;
  canonical: string;
  jsonLd: Record<string, unknown> | null;
}

function escapeHtml(str: string): string {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function buildHomeMeta(baseUrl: string): SeoMeta {
  return {
    title: 'Prof. Dr. Basri Çakıroğlu | Üroloji & Robotik Cerrahi Uzmanı',
    description: 'Prof. Dr. Basri Çakıroğlu - Üroloji ve Robotik Cerrahi Uzmanı. HoLEP lazer prostat tedavisi, daVinci robotik cerrahi, böbrek taşı ve ürolojik onkoloji.',
    keywords: 'Prof Dr Basri Çakıroğlu, üroloji uzmanı istanbul, HoLEP lazer prostat ameliyatı, robotik cerrahi, böbrek taşı lazer, ürolojik onkoloji',
    canonical: `${baseUrl}/`,
    jsonLd: null, // homepage keeps the default Physician schema already in index.html
  };
}

function buildBlogHubMeta(baseUrl: string): SeoMeta {
  return {
    title: 'Tıbbi Makaleler & Sağlık Rehberi | Prof. Dr. Basri Çakıroğlu',
    description: 'Prof. Dr. Basri Çakıroğlu tarafından hazırlanan HoLEP lazer prostat cerrahisi, daVinci robotik cerrahi, böbrek taşı ve üroloji makaleleri.',
    keywords: 'üroloji makaleleri, HoLEP lazer, robotik cerrahi, böbrek taşı, prostat kanseri erken teşhis, Basri Çakıroğlu',
    canonical: `${baseUrl}/blog`,
    jsonLd: null,
  };
}

function buildArticleMeta(post: BlogPost, baseUrl: string): SeoMeta {
  const description = post.metaDescription || post.excerpt;
  return {
    title: `${post.title} | Prof. Dr. Basri Çakıroğlu`,
    description,
    keywords: post.keywords || `${post.category}, Üroloji, Prof. Dr. Basri Çakıroğlu`,
    canonical: `${baseUrl}/blog/${post.slug}`,
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'MedicalWebPage',
      name: post.title,
      headline: post.title,
      description,
      keywords: post.keywords || `${post.category}, Üroloji, Prof. Dr. Basri Çakıroğlu`,
      url: `${baseUrl}/blog/${post.slug}`,
      datePublished: post.date,
      inLanguage: 'tr-TR',
      author: {
        '@type': 'Physician',
        name: 'Prof. Dr. Basri Çakıroğlu',
        jobTitle: 'Üroloji & Robotik Cerrahi Uzmanı',
        medicalSpecialty: 'UrologicSurgery',
        url: baseUrl,
      },
      publisher: {
        '@type': 'MedicalOrganization',
        name: 'Prof. Dr. Basri Çakıroğlu Kliniği',
        url: baseUrl,
      },
    },
  };
}

function buildServiceMeta(item: ExpertiseItem, slug: string, baseUrl: string): SeoMeta {
  return {
    title: `${item.title} | Prof. Dr. Basri Çakıroğlu`,
    description: item.shortDesc,
    keywords: `${item.title}, ${item.conditions.slice(0, 3).join(', ')}, Prof Dr Basri Çakıroğlu, Ümraniye Üroloji`,
    canonical: `${baseUrl}/${slug}`,
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'MedicalWebPage',
      name: item.title,
      headline: item.title,
      description: item.longDesc,
      url: `${baseUrl}/${slug}`,
      inLanguage: 'tr-TR',
      about: {
        '@type': 'MedicalProcedure',
        name: item.title,
        description: item.longDesc,
      },
      author: {
        '@type': 'Physician',
        name: 'Prof. Dr. Basri Çakıroğlu',
        jobTitle: 'Üroloji & Robotik Cerrahi Uzmanı',
        medicalSpecialty: 'UrologicSurgery',
        url: baseUrl,
      },
      publisher: {
        '@type': 'MedicalOrganization',
        name: 'Prof. Dr. Basri Çakıroğlu Kliniği',
        url: baseUrl,
      },
    },
  };
}

async function resolveSeoMeta(pathname: string, baseUrl: string, customPosts: any[]): Promise<SeoMeta> {
  // Blog article
  if (pathname.startsWith('/blog/')) {
    const slug = pathname.replace('/blog/', '').replace(/\/$/, '');
    const defaultPosts = getBlogPosts('TR');
    const post = customPosts.find((p: any) => p.slug === slug) || defaultPosts.find((p) => p.slug === slug);
    if (post) return buildArticleMeta(post, baseUrl);
    return buildBlogHubMeta(baseUrl); // unknown slug: fall back gracefully instead of leaking homepage meta
  }
  if (pathname === '/blog' || pathname === '/blog/') {
    return buildBlogHubMeta(baseUrl);
  }

  // Dedicated treatment/service pages
  const slug = pathname.replace(/^\//, '');
  const expertiseId = Object.keys(expertiseSlugs).find((id) => expertiseSlugs[id] === slug);
  if (expertiseId) {
    const item = getExpertiseItems('TR').find((i) => i.id === expertiseId);
    if (item) return buildServiceMeta(item, slug, baseUrl);
  }

  // Homepage, /hakkimizda, /iletisim (client-side redirected to homepage anchors), and anything unknown
  return buildHomeMeta(baseUrl);
}

function injectSeoIntoHtml(html: string, meta: SeoMeta): string {
  let out = html;

  out = out.replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(meta.title)}</title>`);
  out = out.replace(
    /<meta\s+name="description"\s+content="[^"]*"\s*\/>/,
    `<meta name="description" content="${escapeHtml(meta.description)}" />`
  );
  out = out.replace(
    /<meta\s+name="keywords"\s+content="[^"]*"\s*\/>/,
    `<meta name="keywords" content="${escapeHtml(meta.keywords)}" />`
  );
  out = out.replace(
    /<meta\s+property="og:title"\s+content="[^"]*"\s*\/>/,
    `<meta property="og:title" content="${escapeHtml(meta.title)}" />`
  );
  out = out.replace(
    /<meta\s+property="og:description"\s+content="[^"]*"\s*\/>/,
    `<meta property="og:description" content="${escapeHtml(meta.description)}" />`
  );

  if (/<link\s+rel="canonical"/.test(out)) {
    out = out.replace(/<link\s+rel="canonical"\s+href="[^"]*"\s*\/>/, `<link rel="canonical" href="${meta.canonical}" />`);
  } else {
    out = out.replace('</head>', `    <link rel="canonical" href="${meta.canonical}" />\n  </head>`);
  }

  if (/<meta\s+property="og:url"/.test(out)) {
    out = out.replace(/<meta\s+property="og:url"\s+content="[^"]*"\s*\/>/, `<meta property="og:url" content="${meta.canonical}" />`);
  } else {
    out = out.replace('</head>', `    <meta property="og:url" content="${meta.canonical}" />\n  </head>`);
  }

  // Only override the default Physician JSON-LD when this route has a more specific one
  if (meta.jsonLd) {
    out = out.replace(
      /<script type="application\/ld\+json">[\s\S]*?<\/script>/,
      `<script type="application/ld+json">${JSON.stringify(meta.jsonLd)}</script>`
    );
  }

  return out;
}

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
      const host = req.get('host') || 'basricakiroglu.com.tr';
      const protocol = req.protocol === 'https' || req.headers['x-forwarded-proto'] === 'https' ? 'https' : 'http';
      const baseUrl = `${protocol}://${host}`;

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

  // API: Send Appointment Mail Notifications
  app.post('/api/appointments', async (req, res) => {
    try {
      const appointment = req.body;
      if (!appointment || !appointment.fullName) {
        return res.status(400).json({ error: 'Invalid appointment data' });
      }

      console.log('New Appointment Received:', appointment);

      const targetEmails = ['drbasri@gmail.com', 'info@basricakiroglu.com.tr', 'bcakiroglu@hisarhospital.com'];
      const mailSubject = `[Yeni Randevu Talebi] ${appointment.fullName} - ${appointment.preferredDate}`;

      const mailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px; background-color: #ffffff; color: #333333;">
          <h2 style="color: #0b1a30; border-bottom: 2px solid #c5a880; padding-bottom: 10px; margin-top: 0;">Yeni Randevu Talebi</h2>
          <p style="font-size: 14px; line-height: 1.5; color: #555555;">Web siteniz üzerinden yeni bir randevu talebi oluşturuldu. Detaylar aşağıdadır:</p>
          <table style="width: 100%; border-collapse: collapse; margin-top: 15px; font-size: 14px;">
            <tr style="background-color: #f9f9f9;">
              <td style="padding: 10px; font-weight: bold; width: 160px; border-bottom: 1px solid #eeeeee;">Ad Soyad:</td>
              <td style="padding: 10px; border-bottom: 1px solid #eeeeee;">${appointment.fullName}</td>
            </tr>
            <tr>
              <td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #eeeeee;">Telefon:</td>
              <td style="padding: 10px; border-bottom: 1px solid #eeeeee;"><a href="tel:${appointment.phone}" style="color: #0b1a30; text-decoration: none; font-weight: bold;">${appointment.phone}</a></td>
            </tr>
            <tr style="background-color: #f9f9f9;">
              <td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #eeeeee;">E-posta:</td>
              <td style="padding: 10px; border-bottom: 1px solid #eeeeee;"><a href="mailto:${appointment.email}" style="color: #0b1a30; text-decoration: none;">${appointment.email}</a></td>
            </tr>
            <tr>
              <td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #eeeeee;">Tercih Edilen Tarih:</td>
              <td style="padding: 10px; color: #c5a880; font-weight: bold; border-bottom: 1px solid #eeeeee;">${appointment.preferredDate}</td>
            </tr>
            <tr style="background-color: #f9f9f9;">
              <td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #eeeeee;">Tercih Edilen Saat:</td>
              <td style="padding: 10px; color: #c5a880; font-weight: bold; border-bottom: 1px solid #eeeeee;">${appointment.preferredTime}</td>
            </tr>
            <tr>
              <td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #eeeeee;">Uzmanlık / Konu ID:</td>
              <td style="padding: 10px; border-bottom: 1px solid #eeeeee;">${appointment.topicId}</td>
            </tr>
            <tr style="background-color: #f9f9f9;">
              <td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #eeeeee;">Notlar:</td>
              <td style="padding: 10px; font-style: italic; border-bottom: 1px solid #eeeeee;">${appointment.notes || 'Not belirtilmemiş.'}</td>
            </tr>
            <tr>
              <td style="padding: 10px; font-weight: bold;">Talep Tarihi:</td>
              <td style="padding: 10px; font-size: 11px; color: #666666;">${appointment.createdAt || new Date().toISOString()}</td>
            </tr>
          </table>
          <div style="margin-top: 25px; padding-top: 15px; border-top: 1px solid #e0e0e0; font-size: 11px; color: #888888; text-align: center;">
            Bu e-posta Prof. Dr. Basri Çakıroğlu web sitesi randevu sistemi tarafından otomatik olarak oluşturulmuştur.
          </div>
        </div>
      `;

      let emailSent = false;
      let errorDetails = '';

      const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM } = process.env;

      if (SMTP_HOST && SMTP_USER && SMTP_PASS) {
        try {
          const transporter = nodemailer.createTransport({
            host: SMTP_HOST,
            port: Number(SMTP_PORT || 587),
            secure: Number(SMTP_PORT) === 465,
            auth: {
              user: SMTP_USER,
              pass: SMTP_PASS,
            },
          });

          await transporter.sendMail({
            from: SMTP_FROM || SMTP_USER,
            to: targetEmails.join(', '),
            subject: mailSubject,
            html: mailHtml,
          });

          emailSent = true;
          console.log(`Success: Appointment notification emails sent to ${targetEmails.join(', ')}`);
        } catch (mailError: any) {
          console.error('Nodemailer error:', mailError);
          errorDetails = mailError.message || String(mailError);
        }
      } else {
        console.log('--- EMAIL SIMULATION (SMTP Not Configured) ---');
        console.log(`To: ${targetEmails.join(', ')}`);
        console.log(`Subject: ${mailSubject}`);
        console.log('Body HTML length:', mailHtml.length);
        console.log('----------------------------------------------');
      }

      res.status(200).json({
        success: true,
        emailSent,
        simulated: !SMTP_HOST,
        errorDetails: errorDetails || undefined,
        appointment,
      });
    } catch (err: any) {
      console.error('Appointment API error:', err);
      res.status(500).json({ error: 'Failed to process appointment' });
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

        const host = req.get('host') || 'basricakiroglu.com.tr';
        const protocol = req.headers['x-forwarded-proto'] === 'https' ? 'https' : req.protocol;
        const baseUrl = `${protocol}://${host}`;
        const customPosts = await readPosts();
        const meta = await resolveSeoMeta(req.path, baseUrl, customPosts);
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

        const host = req.get('host') || 'basricakiroglu.com.tr';
        const protocol = req.headers['x-forwarded-proto'] === 'https' ? 'https' : req.protocol;
        const baseUrl = `${protocol}://${host}`;
        const customPosts = await readPosts();
        const meta = await resolveSeoMeta(req.path, baseUrl, customPosts);
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
