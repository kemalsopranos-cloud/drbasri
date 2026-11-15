/**
 * Firestore'daki yazıların HAM içeriğini dosyaya döker.
 *
 * Panelden eklenen yazılar yalnızca veritabanında duruyor; slug'ları bozuk
 * (Türkçe karakterler düşmüş), FAQ şemaları ve iç bağlantıları yok. Koda
 * taşımadan önce markdown'ı kayıpsız almak gerekiyor — üretilmiş HTML'den
 * kazımak başlık/liste yapısını yok ediyor.
 *
 * Çalıştırma: npx tsx scripts/dump-firestore-posts.ts
 */
import fs from 'node:fs';
import path from 'node:path';

const OUT = path.join(process.cwd(), '.firestore-dump');

async function main() {
  const { getDb } = await import('../src/firebase');
  const db = await getDb();
  const { collection, getDocs, terminate } = await import('firebase/firestore');

  const snapshot = await getDocs(collection(db, 'blog_posts'));
  fs.mkdirSync(OUT, { recursive: true });

  const ozet: string[] = [];
  snapshot.forEach((docSnap) => {
    const d = docSnap.data() as Record<string, unknown>;
    const slug = String(d.slug || docSnap.id);
    const dosya = path.join(OUT, `${slug}.json`);
    fs.writeFileSync(dosya, JSON.stringify({ id: docSnap.id, ...d }, null, 2), 'utf8');
    ozet.push(
      `${slug}\n   başlık : ${d.title}\n   dil    : ${d.language ?? 'TR'}\n   ` +
        `içerik : ${String(d.content ?? '').length} karakter\n   alanlar: ${Object.keys(d).join(', ')}`
    );
  });

  console.log(`${snapshot.size} yazı → ${OUT}\n`);
  console.log(ozet.join('\n\n'));
  await terminate(db);
}

main().catch((e) => {
  console.error('HATA:', e instanceof Error ? e.message : e);
  process.exit(1);
});
