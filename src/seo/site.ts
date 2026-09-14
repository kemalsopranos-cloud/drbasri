// Tek kanonik site adresi. Vercel alan adı ayarı www'suz isteği 308 ile
// www'ye yönlendiriyor; canonical / og:url / sitemap / JSON-LD hepsi bu
// adresi göstermeli, aksi hâlde Google iki ayrı site olarak değerlendirir ve
// sıralama sinyalleri bölünür (canlıda ölçüldü: canonical www'suz, yönlendirme
// www'ye idi).
export const SITE_URL = 'https://www.basricakiroglu.com.tr';
export const SITE_NAME = 'Prof. Dr. Basri Çakıroğlu';
export const OG_IMAGE_PATH = '/og-image.jpg';

// ---------------------------------------------------------------------------
// NAP (Name / Address / Phone) — YEREL SEO'NUN TEMELİ.
// Adres, telefon ve saatler sitede, JSON-LD'de, Google Business Profile'da ve
// üçüncü taraf profillerde (doktortakvimi, Hisar Hospital) HARF HARF aynı
// olmalı. Eskiden JSON-LD "Saray Mah. Site Yolu Cad. No: 7", iletişim bölümü
// "Alemdağ Cad, Site Yolu Cd No: 7-9" diyordu — tutarsız NAP, Google'ın
// işletmeyi eşleştirmesini zorlaştırır. Hisar Hospital'ın resmî adresi esas
// alındı (hisarhospital.com'dan doğrulandı, 14 Eyl 2026). TEK yerden değiştir.
// ---------------------------------------------------------------------------
export const DOCTOR = {
  name: 'Prof. Dr. Basri Çakıroğlu',
  jobTitle: 'Üroloji ve Robotik Cerrahi Uzmanı',
  telephone: '+90 533 207 89 03',
  telephoneRaw: '+905332078903',
  email: 'bcakiroglu@hisarhospital.com',
  instagram: 'https://www.instagram.com/drbasricakiroglu/',
  address: {
    streetAddress: 'Saray Mah. Site Yolu Cad. No: 7',
    addressLocality: 'Ümraniye',
    addressRegion: 'İstanbul',
    postalCode: '34768',
    addressCountry: 'TR',
  },
  // Tek satırlık gösterim (iletişim bölümü, footer)
  addressLine: 'Saray Mah. Site Yolu Cad. No: 7, 34768 Ümraniye / İstanbul',
  // Hisar Intercontinental Hospital — harita gömme URL'sindeki koordinatlar
  geo: { latitude: 41.02176, longitude: 29.11719 },
  mapUrl: 'https://maps.app.goo.gl/MnS882cg8M34JW9n7',
  hospital: {
    name: 'Hisar Intercontinental Hospital',
    url: 'https://hisarhospital.com/',
    telephone: '+90 216 524 13 00',
  },
  // schema.org openingHoursSpecification — iletişim bölümündeki tabloyla aynı
  openingHours: [
    { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '09:00', closes: '18:00' },
    { days: ['Saturday'], opens: '09:00', closes: '14:00' },
  ],
  // Yerel arama: hizmet verilen ilçeler (Anadolu Yakası)
  areaServed: ['Ümraniye', 'Ataşehir', 'Çekmeköy', 'Üsküdar', 'Sancaktepe', 'Kadıköy', 'Maltepe', 'Beykoz', 'İstanbul'],
  // sameAs — Google'ın kimliği doğrulamak için eşleştirdiği dış profiller.
  // Hepsi 14 Eyl 2026'da 200 döndü. Google Business Profile URL'si alındığında
  // buraya EKLE.
  sameAs: [
    'https://www.instagram.com/drbasricakiroglu/',
    'https://hisarhospital.com/doktorlarimiz/prof-dr-basri-cakiroglu/',
    'https://uskudar.edu.tr/en/academic-staff/basri-cakiroglu',
    'https://www.doktortakvimi.com/profil/basri-cakiroglu-2',
    'https://www.researchgate.net/profile/Basri-Cakiroglu',
    'https://www.linkedin.com/in/basri-%C3%A7ak%C4%B1ro%C4%9Flu-9749a129a/',
  ],
};
