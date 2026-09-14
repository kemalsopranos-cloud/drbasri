# Google görünürlüğü

`npm ci`, `npm run lint`, `npm run build`, `npm run test:seo` ile doğrulayın.

Derleme, mevcut React bileşenlerini kullanarak ana sayfa, altı uzmanlık sayfası,
blog dizini ve kaynak koddaki Türkçe makaleleri HTML olarak üretir. Başlık,
canonical ve sayfa içeriği JavaScript çalıştırılmadan okunabilir. Site haritası
aynı adres listesinden üretilir. Vercel cleanUrls ile bu HTML dosyalarını sunar;
bilinmeyen adresler ana sayfaya yönlendirilmez. Express dağıtımları da desteklenir.

## Yayından sonra

- Search Console'a `https://www.basricakiroglu.com.tr/sitemap.xml` gönderin.
- Ana sayfa, HoLEP, böbrek taşı ve robotik cerrahi URL'lerini URL Denetimi ile
  kontrol edin. Google'ın seçtiği standart URL'nin sayfanın kendi adresi olduğunu
  doğrulayın; ardından dizine ekleme isteyin.
- Google İşletme Profili web sitesi alanını `https://www.basricakiroglu.com.tr/`
  yapın. Bu, GitHub değişikliğiyle güncellenmez.
- Profildeki sosyal bağlantıları resmi hesaplarla eşleştirin. Gerçek çalışma
  saatlerini hekimle doğrulayarak profil ve sitede birlikte düzeltin.
- Ameliyat ve yayın sayılarını doğrulayın. Tahmin edilmiş sayılar yayınlamayın.
- Yeni tıbbi metinler yayımlanmadan önce hekim tarafından kontrol edilmelidir.

## Kapsam ve bakım

Bu değişiklik sıralama garantisi vermez. Ayrı İngilizce URL'ler olmadığından
hreflang alternatifi uydurulmamıştır. Mevcut dil düğmesi çalışmaya devam eder.
Firestore'da eklenen makaleler tarayıcıda yüklenmeye devam eder; yalnızca orada
bulunan yeni makaleler otomatik statik üretime dahil değildir. Yeni makaleleri
kaynak içerik listesine ekleyip yeniden derleyin veya sonraki çalışmada güvenli
bir CMS yayın/derleme entegrasyonu kurun. Bu değişiklik veritabanına bağlanıp veri
çekmez ve mevcut randevu API'sini yeni bir servise taşımaz.

Kaynaklar:
- https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics
- https://vercel.com/docs/project-configuration
