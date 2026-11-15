/**
 * Koda taşınmış Firestore yazıları.
 *
 * Panelden eklenen yazılar yalnızca veritabanında duruyordu ve slug'ları
 * bozuktu (Türkçe karakterler düştüğü için "…-ve-tedavi-yntemleri",
 * "tm-ynleriyle-snnet"). Başlıkları 60 karakteri aştığı için arama
 * sonucunda ortasından kesiliyor, FAQ şemaları ve iç bağlantıları
 * bulunmuyordu. İçerikleri `articles.ts`'e taşındı.
 *
 * Birleştirme sırası `[...fromDb, ...getBlogPosts(lang)]` olduğu için
 * Firestore kaydı koddakini EZER. Bu liste olmadan eski kayıt yeni yazıyı
 * gölgeler veya ikisi birlikte yayınlanıp MÜKERRER İÇERİK üretir.
 *
 * Buradaki slug'lar Firestore'dan gelen yazılardan ELENİR. Kayıtlar panelden
 * silindiğinde bu liste zararsız biçimde boşa düşer — silmeye gerek yok.
 *
 * Eski URL'ler indekslenmişti (İYE sayfası tek başına 90 günde 660 gösterim
 * alıyordu), bu yüzden `vercel.json` içinde 301 yönlendirmeleri tanımlı.
 * Buraya bir slug eklerken oraya da yönlendirme eklenmeli.
 */
export const SUPERSEDED_DB_SLUGS: ReadonlySet<string> = new Set([
  'idrar-yolu-enfeksiyonu-nedir-belirtileri-nedenleri-ve-tedavi-yntemleri',
  'prostat-kanseri-nedir-belirtileri-risk-faktrleri-ve-tedavi-yntemleri',
  'tm-ynleriyle-snnet',
]);
