// Tek kanonik site adresi. Vercel alan adı ayarı www'suz isteği 308 ile
// www'ye yönlendiriyor; canonical / og:url / sitemap / JSON-LD hepsi bu
// adresi göstermeli, aksi hâlde Google iki ayrı site olarak değerlendirir ve
// sıralama sinyalleri bölünür (canlıda ölçüldü: canonical www'suz, yönlendirme
// www'ye idi).
export const SITE_URL = 'https://www.basricakiroglu.com.tr';
export const SITE_NAME = 'Prof. Dr. Basri Çakıroğlu';
export const OG_IMAGE_PATH = '/og-image.jpg';
export const DOCTOR = {
  name: 'Prof. Dr. Basri Çakıroğlu',
  jobTitle: 'Üroloji ve Robotik Cerrahi Uzmanı',
  telephone: '+90 533 207 89 03',
  instagram: 'https://www.instagram.com/drbasricakiroglu/',
  address: {
    streetAddress: 'Saray Mah. Site Yolu Cad. No: 7',
    addressLocality: 'Ümraniye',
    addressRegion: 'İstanbul',
    addressCountry: 'TR',
  },
  hospital: 'Hisar Hospital Intercontinental',
};
