import type { BlogPost } from '../types';

// ---------------------------------------------------------------------------
// Hasta sorularına yönelik uzun biçimli makaleler (Faz 2 — içerik SEO'su).
//
// Her yazı: hastanın Google'a yazdığı ifadeyle başlıklandırılmış (ör. "böbrek
// taşı nasıl düşer"), 1000+ kelime, ### başlıklarla bölümlenmiş, sonunda SSS
// (FAQPage JSON-LD'ye de gider) ve kaynaklar. `relatedService` ilgili tedavi
// sayfasına iç bağlantı kurar; tedavi sayfası da bu yazıları listeler.
//
// ⚠️ TIBBİ İÇERİK: Metinler EAU/AUA kılavuzlarıyla uyumlu genel bilgilendirme
// olarak hazırlandı; yayına alınmadan önce hekim tarafından gözden geçirilmeli.
// Kesin oran/sayı vermekten kaçınıldı; "genellikle", "çoğu hastada" gibi
// ifadeler bilinçli tercih. Tanı/tedavi kararı yerine geçmez uyarısı her
// yazının sonunda.
//
// Biçim (BlogPage.renderArticleContent): "### Başlık", "* madde", "1. adım",
// "**kalın**", "[metin](/yol)" iç bağlantı, boş satır = paragraf arası.
// Başka markdown KULLANMA.
// ---------------------------------------------------------------------------

const AUTHOR = 'Prof. Dr. Basri Çakıroğlu';

const DISCLAIMER =
  'Bu yazı genel bilgilendirme amaçlıdır; muayene ve kişiye özel tıbbi değerlendirmenin yerini tutmaz. Şikâyetleriniz için bir üroloji uzmanına başvurun.';

export const ARTICLES_TR: BlogPost[] = [
  // =========================================================================
  // 1. PROSTAT BÜYÜMESİ (BPH)
  // =========================================================================
  {
    id: 'bph-belirtileri-tedavisi',
    title: 'Prostat Büyümesi Belirtileri: İlaç mı, Ameliyat mı?',
    slug: 'prostat-buyumesi-belirtileri-ve-tedavisi',
    translations: { EN: 'enlarged-prostate-bph-treatment-options', RU: 'uvelichenie-prostaty-dgpzh-lechenie' },
    excerpt:
      'İyi huylu prostat büyümesi (BPH) 50 yaş üstü erkeklerin yarısından fazlasını etkiler. Sık idrara çıkma, gece kalkma ve zayıf idrar akımı gibi belirtilerin ne zaman ilaçla, ne zaman HoLEP gibi lazer yöntemleriyle tedavi edildiğini anlatıyoruz.',
    category: 'Prostat Sağlığı',
    date: '14 Eylül 2026',
    datePublished: '2026-09-14',
    dateModified: '2026-09-14',
    readTime: '8',
    author: AUTHOR,
    keywords:
      'prostat büyümesi belirtileri, iyi huylu prostat büyümesi tedavisi, BPH, sık idrara çıkma, gece idrara kalkma, prostat ilaçları, HoLEP, Rezum, prostat ameliyatı istanbul',
    metaDescription:
      'Prostat büyümesi (BPH) belirtileri nelerdir, hangi durumda ilaç yeterlidir, ne zaman HoLEP veya Rezum gerekir? Prof. Dr. Basri Çakıroğlu anlatıyor.',
    relatedService: 'prostate-diseases',
    content: `### Prostat Büyümesi Nedir?
Prostat, mesanenin hemen altında yer alan ve idrar kanalını (üretra) çevreleyen ceviz büyüklüğünde bir bezdir. Erkeklerde 40'lı yaşlardan itibaren hormon etkisiyle yavaş yavaş büyümeye başlar. Bu büyüme kanser değildir; "iyi huylu prostat büyümesi" ya da tıbbi adıyla **benign prostat hiperplazisi (BPH)** olarak adlandırılır. Ancak büyüyen doku idrar kanalını sıkıştırdığı için idrar akışını zorlaştırır ve zamanla mesaneyi yorar.

BPH 50 yaş üstü erkeklerin yaklaşık yarısında, 70 yaş üstünde ise büyük çoğunluğunda görülür. Her prostat büyümesi tedavi gerektirmez; önemli olan büyümenin boyutu değil, kişide oluşturduğu şikâyetler ve mesane ile böbreklere verdiği zarardır.

### Prostat Büyümesinin Belirtileri Nelerdir?
Belirtiler genellikle sinsi başlar ve yıllar içinde artar. Hastaların çoğu "yaşlanmanın doğal sonucu" diye düşünüp doktora geç başvurur. Tipik belirtiler iki gruba ayrılır:

**Boşaltma (obstrüktif) belirtileri:**
* İdrara başlamakta zorlanma, bekleme
* İdrar akımının zayıflaması, ince ve kesik kesik akması
* İdrar sonunda damlama
* Mesanenin tam boşalmadığı hissi
* Idrar yapmak için ıkınma gereksinimi

**Depolama (irritatif) belirtileri:**
* Sık idrara çıkma (gündüz 8'den fazla)
* Gece idrara kalkma (noktüri) — uyku kalitesini en çok bozan belirti
* Ani ve ertelenemeyen idrar hissi (sıkışma)
* Tuvalete yetişememe

Bu belirtilerin şiddeti **IPSS (Uluslararası Prostat Semptom Skoru)** adı verilen 7 soruluk bir anketle ölçülür. Skor 8'in altındaysa hafif, 8-19 arası orta, 20 ve üzeri ise şiddetli kabul edilir. Muayeneye gelmeden önce bu anketi doldurmak, hekiminizle konuşmanızı kolaylaştırır.

### Tedavi Edilmezse Ne Olur?
Uzun süre ihmal edilen prostat büyümesi yalnızca yaşam kalitesini düşürmekle kalmaz; mesane kasının kalınlaşmasına ve zamanla güçsüzleşmesine yol açar. İlerlemiş olgularda şu sorunlar gelişebilir:
* **Akut idrar retansiyonu:** Aniden hiç idrar yapamama; acil sonda takılmasını gerektirir.
* **Tekrarlayan idrar yolu enfeksiyonları** ve mesane taşı oluşumu
* **İdrarda kan görülmesi**
* Mesanede kalıcı idrar birikimi ve böbreklere geri basınç (hidronefroz) ile **böbrek fonksiyon kaybı**

Bu komplikasyonlardan biri ortaya çıktığında tedavi artık isteğe bağlı değil, tıbbi bir zorunluluktur.

### Tanı Nasıl Konur?
Ürolojik değerlendirme genellikle şu adımları içerir:
1. Şikâyetlerin ayrıntılı sorgulanması ve IPSS anketi
2. Parmakla rektal muayene (prostatın boyutu, kıvamı ve şüpheli sertlik olup olmadığı)
3. **PSA** kan testi (prostat kanserini dışlamak için)
4. İdrar tahlili
5. **Üroflowmetri:** idrar akım hızının ölçülmesi; saniyede 10 ml'nin altındaki akım tıkanıklığı düşündürür
6. Ultrason ile prostat hacmi ve işeme sonrası mesanede kalan idrar miktarının (rezidü) ölçülmesi

Bu tetkikler hem prostat büyümesini doğrular hem de benzer şikâyet yapan mesane kanseri, üretra darlığı, aşırı aktif mesane veya nörolojik nedenleri ayırt etmeyi sağlar.

### İlaç Tedavisi Kimler İçin Uygundur?
Orta düzeyde şikâyeti olan ve komplikasyon gelişmemiş hastalarda ilk basamak ilaç tedavisidir. Başlıca iki ilaç grubu vardır:
* **Alfa blokerler** (tamsulosin, silodosin, alfuzosin): Prostat ve mesane boynundaki kasları gevşeterek idrar akımını birkaç gün içinde rahatlatır. Prostatı küçültmez. Baş dönmesi ve boşalma sırasında meni gelmemesi (retrograd ejakülasyon) gibi yan etkileri olabilir.
* **5-alfa redüktaz inhibitörleri** (finasterid, dutasterid): Prostatı 6-12 ay içinde yaklaşık dörtte bir oranında küçültür. Özellikle 40 gramın üzerindeki prostatlarda tercih edilir. Etkisi geç başlar; cinsel isteği ve sertleşmeyi bir miktar azaltabilir. Bu ilaçlar PSA değerini yarıya indirdiği için takipte PSA sonucu iki ile çarpılarak yorumlanır.

Bu iki grup birlikte de kullanılabilir. Gece idrara kalkma ön plandaysa akşam sıvı kısıtlaması, kafein ve alkolün azaltılması gibi yaşam tarzı düzenlemeleri de eklenir. Sertleşme sorunu eşlik eden hastalarda tadalafil gibi ilaçlar hem prostat şikâyetlerine hem cinsel işleve birlikte fayda sağlayabilir.

### Ne Zaman Ameliyat Gerekir?
Cerrahi tedavi şu durumlarda gündeme gelir:
* İlaçlara rağmen şikâyetlerin devam etmesi ya da ilaç yan etkilerinin tolere edilememesi
* İdrar retansiyonu (sonda takılması) öyküsü
* Tekrarlayan enfeksiyon, mesane taşı veya kanama
* Mesanede yüksek miktarda kalıntı idrar ve böbreklerde basınç bulguları

Günümüzde prostat ameliyatlarının neredeyse tamamı kapalı (endoskopik) yöntemlerle, idrar kanalından girilerek yapılır. Başlıca seçenekler şunlardır:

**TUR-P (Transüretral Prostat Rezeksiyonu):** Onlarca yıldır uygulanan klasik kapalı yöntem. Prostat dokusu elektrik enerjisiyle parça parça kesilir. Genellikle 80 ml'nin altındaki prostatlarda tercih edilir; kanama ve tekrar büyüme oranı lazer yöntemlerine göre daha yüksektir.

**HoLEP (Holmiyum Lazer Enükleasyonu):** Büyüyen doku, kabuğunu soyar gibi kapsülünden bütün olarak ayrılır ve mesane içinde parçalanarak çıkarılır. Prostatın boyutundan bağımsız olarak uygulanabilir; 150-200 gramlık prostatlarda bile açık ameliyata gerek bırakmaz. Kanama riski düşük olduğu için kan sulandırıcı kullanan hastalarda güvenli bir seçenektir. Tekrar büyüme ihtimali çok düşüktür. En sık yan etkisi boşalma sırasında meninin dışarı gelmemesidir (retrograd ejakülasyon); sertleşme fonksiyonu genellikle korunur.

**Rezum (Su Buharı Tedavisi):** Prostat içine birkaç saniyelik su buharı enjeksiyonlarıyla dokunun büzüşmesi sağlanır. Lokal anestezi ile günübirlik uygulanabilir; boşalma fonksiyonunu koruma olasılığı yüksektir. Küçük-orta boyutlu prostatlarda ve cinsel işlevleri korumayı öncelikli gören hastalarda düşünülür; etkisi haftalar içinde ortaya çıkar.

**Robotik/laparoskopik basit prostatektomi:** Çok büyük prostatlarda ve HoLEP'in uygun olmadığı özel durumlarda kapalı karın cerrahisi ile büyüyen dokunun çıkarılmasıdır.

Hangi yöntemin uygun olduğu prostatın boyutu, hastanın yaşı, kullandığı ilaçlar, ek hastalıkları ve cinsel işlev beklentileri birlikte değerlendirilerek belirlenir.

### Ameliyat Sonrası Neler Bekleyebilirsiniz?
Kapalı prostat ameliyatlarından sonra hastalar genellikle 1-2 gün hastanede kalır, sonda çoğunlukla 1-2 gün içinde alınır. İlk haftalarda idrarda hafif kanama, sık idrara çıkma ve yanma normaldir; bu şikâyetler mesanenin yeni düzene alışmasıyla azalır. Ağır kaldırmaktan ve kabızlıktan birkaç hafta kaçınmak gerekir. Çıkarılan doku mutlaka patolojik incelemeye gönderilir; nadiren gizli bir kanser odağı saptanabilir.

Prostat büyümesi tedavi edilebilir bir durumdur ve modern yöntemlerle çoğu hasta ameliyattan sonraki günlerde yıllardır unuttuğu rahatlıkta idrar yapmaya başlar. Belirtileri yaşlanmanın kaçınılmaz bir parçası olarak kabullenmek yerine bir üroloji uzmanına danışmak, hem yaşam kalitesini hem de böbrek sağlığını korur.

${DISCLAIMER}`,
    faq: [
      {
        q: 'Prostat büyümesi kansere dönüşür mü?',
        a: 'Hayır. İyi huylu prostat büyümesi (BPH) ile prostat kanseri farklı hastalıklardır ve BPH kansere dönüşmez. Ancak ikisi aynı anda bulunabilir; bu nedenle prostat şikâyeti olan erkeklerde PSA testi ve muayene ile kanser olasılığı ayrıca değerlendirilir.',
      },
      {
        q: 'Prostat ilaçları ömür boyu kullanılır mı?',
        a: 'İlaç tedavisi prostatı ortadan kaldırmaz, şikâyetleri kontrol altında tutar. Bu nedenle etkili olduğu sürece genellikle uzun süreli kullanılır. İlaç bırakıldığında şikâyetler çoğunlukla geri döner. Kalıcı çözüm isteyen veya ilaçtan fayda görmeyen hastalarda cerrahi tedavi düşünülür.',
      },
      {
        q: 'HoLEP ameliyatı cinsel hayatı etkiler mi?',
        a: 'HoLEP sertleşme sinirlerine zarar vermediği için erektil fonksiyon genellikle korunur. Ancak hastaların büyük çoğunluğunda boşalma sırasında meni dışarı gelmez, mesaneye geri kaçar (retrograd ejakülasyon). Bu durum zararsızdır ve orgazm hissini ortadan kaldırmaz, fakat çocuk sahibi olmayı planlayan erkeklerde ameliyat öncesi mutlaka konuşulmalıdır.',
      },
      {
        q: 'Prostat ameliyatı sonrası prostat tekrar büyür mü?',
        a: 'HoLEP’te büyüyen doku kapsülünden bütün olarak çıkarıldığı için tekrar büyüme ve ikinci ameliyat gereksinimi çok düşüktür. TUR-P gibi doku parça parça alınan yöntemlerde geride kalan doku yıllar içinde tekrar büyüyebilir.',
      },
      {
        q: 'Prostat büyümesi için hangi yaşta doktora gidilmeli?',
        a: 'Gece idrara kalkma, zayıf akım veya sık idrara çıkma gibi belirtiler başladığında yaştan bağımsız olarak üroloji uzmanına başvurulmalıdır. Belirti olmasa da 50 yaşından itibaren (ailede prostat kanseri varsa 45 yaşından itibaren) yıllık prostat kontrolü önerilir.',
      },
    ],
    sources: [
      { title: 'EAU Guidelines: Management of Non-neurogenic Male LUTS', url: 'https://uroweb.org/guidelines/management-of-non-neurogenic-male-luts' },
      { title: 'AUA Guideline: Management of Benign Prostatic Hyperplasia', url: 'https://www.auanet.org/guidelines-and-quality/guidelines/benign-prostatic-hyperplasia-(bph)-guideline' },
      { title: 'Türk Üroloji Derneği', url: 'https://www.uroturk.org.tr' },
    ],
  },

  // =========================================================================
  // 2. PSA YÜKSEKLİĞİ
  // =========================================================================
  {
    id: 'psa-yuksekligi',
    title: 'PSA Yüksekliği Ne Demek? PSA Kaç Olmalı, Kanser mi?',
    slug: 'psa-yuksekligi-ne-anlama-gelir',
    translations: { EN: 'high-psa-second-opinion-prostate-mri', RU: 'povyshennyy-psa-chto-delat' },
    excerpt:
      'Kan testinde PSA yüksek çıktı diye panik yapmayın: yüksek PSA’nın en sık nedenleri iyi huylu büyüme ve iltihaptır. Hangi değerler önemlidir, MR ve füzyon biyopsi ne zaman gerekir?',
    category: 'Onkoloji',
    date: '14 Eylül 2026',
    datePublished: '2026-09-14',
    dateModified: '2026-09-14',
    readTime: '7',
    author: AUTHOR,
    keywords:
      'PSA yüksekliği, PSA testi kaç olmalı, yüksek PSA nedenleri, PSA 4 üstü, serbest PSA oranı, multiparametrik prostat MR, füzyon biyopsi, prostat kanseri tarama',
    metaDescription:
      'PSA yüksekliği ne anlama gelir, PSA kaç olmalı, yükselmenin kanser dışı nedenleri ve biyopsi ne zaman gerekir? Prof. Dr. Basri Çakıroğlu anlatıyor.',
    relatedService: 'urologic-oncology',
    content: `### PSA Nedir, Neyi Ölçer?
PSA (Prostat Spesifik Antijen), prostat bezinin ürettiği ve meninin sıvı kalmasını sağlayan bir proteindir. Küçük bir kısmı kana karışır ve basit bir kan testiyle ölçülebilir. PSA, prostat dokusuna özgüdür; ancak **kansere özgü değildir**. Yani PSA'yı yükselten her durum kanser değildir; prostatı büyüten, tahriş eden veya ona basınç uygulayan her şey PSA'yı artırabilir.

Bu ayrım çok önemlidir, çünkü hastaların büyük çoğunluğu "PSA yüksek" sonucunu duyduğunda kanserle eşdeğer olduğunu düşünür. Oysa yüksek PSA ile biyopsi yapılan erkeklerin önemli bir kısmında kanser saptanmaz.

### Normal PSA Değeri Kaç Olmalı?
Geleneksel olarak 4 ng/mL sınır kabul edilse de tek bir "normal" değer yoktur. PSA yaşla birlikte doğal olarak yükselir ve prostat hacmiyle orantılıdır. Kabaca yaşa göre üst sınırlar şöyledir:
* 40-49 yaş: 2,5 ng/mL
* 50-59 yaş: 3,5 ng/mL
* 60-69 yaş: 4,5 ng/mL
* 70 yaş ve üzeri: 6,5 ng/mL

Bu sınırlar kesin eşikler değil, yol gösterici değerlerdir. Genç bir erkekte 3 ng/mL dikkat gerektirebilirken, 75 yaşında büyük prostatı olan bir erkekte 5 ng/mL beklenen bir sonuç olabilir. Ayrıca PSA'nın tek bir ölçümü değil, **zaman içindeki değişimi** en az kendisi kadar önemlidir.

### PSA'yı Yükselten Kanser Dışı Nedenler
* **İyi huylu prostat büyümesi (BPH):** En sık neden. Prostat ne kadar büyükse üretilen PSA da o kadar fazladır.
* **Prostatit (prostat iltihabı) ve idrar yolu enfeksiyonu:** PSA'yı geçici olarak birkaç kat artırabilir; tedaviden sonra 6-8 hafta içinde normale döner.
* **Son 48 saat içinde boşalma**
* **Uzun süreli bisiklet sürme** ve prostata bası yapan aktiviteler
* Yakın zamanda yapılmış **rektal muayene, sistoskopi, sonda takılması** veya biyopsi
* **İdrar retansiyonu** (mesanenin aşırı dolması)

Bu nedenle PSA testi öncesinde 2 gün cinsel perhiz yapılması, aktif enfeksiyon varsa testin ertelenmesi ve ilk yüksek sonucun birkaç hafta sonra **tekrarlanarak doğrulanması** önerilir. Tek bir yüksek değere dayanarak biyopsi kararı verilmez.

### Finasterid ve Dutasterid Kullananlar Dikkat
Prostat büyümesi veya saç dökülmesi için kullanılan 5-alfa redüktaz inhibitörleri PSA değerini yaklaşık yarıya düşürür. Bu ilaçları kullanan erkeklerde ölçülen PSA'nın **iki katı** gerçek değer olarak kabul edilir. İlaç kullanımı hekime mutlaka bildirilmelidir; aksi hâlde yükselmekte olan bir PSA "normal" görünebilir.

### PSA'yı Daha Doğru Yorumlamak: Ek Parametreler
PSA'nın gri bölgede (kabaca 4-10 ng/mL) olduğu hastalarda kanser olasılığını daha iyi tahmin etmek için ek ölçümler kullanılır:
* **Serbest/total PSA oranı:** Kanserde kandaki PSA'nın daha büyük kısmı proteinlere bağlı dolaşır. Serbest PSA oranının %25'in üzerinde olması iyi huylu büyümeyi, %10'un altında olması kanser olasılığının arttığını düşündürür.
* **PSA dansitesi:** PSA değerinin prostat hacmine bölünmesiyle bulunur. 0,15'in üzerindeki değerler dikkat gerektirir.
* **PSA hızı (velositesi):** Yılda 0,75 ng/mL'den fazla artış, mutlak değer normal aralıkta olsa bile önemlidir.
* **PHI, 4Kscore, PCA3** gibi ileri biyobelirteçler seçilmiş olgularda biyopsi kararına yardımcı olabilir.

### Multiparametrik MR: Biyopsiden Önceki Adım
Günümüz kılavuzları, PSA yüksekliği nedeniyle biyopsi düşünülen hastalarda **önce multiparametrik prostat MR (mpMR)** çekilmesini önerir. MR, prostat içindeki şüpheli alanları **PI-RADS** adı verilen 1-5 arası bir ölçekle derecelendirir:
* PI-RADS 1-2: Klinik olarak önemli kanser olasılığı düşük; çoğu hastada biyopsi ertelenip PSA takibi yapılabilir.
* PI-RADS 3: Belirsiz; PSA dansitesi ve diğer parametrelerle birlikte karar verilir.
* PI-RADS 4-5: Şüphe yüksek; hedefe yönelik biyopsi önerilir.

MR'ın en büyük katkısı, gereksiz biyopsileri azaltması ve yavaş seyirli, tedavi gerektirmeyen küçük tümörlerin gereksiz yere teşhis edilmesini önlemesidir.

### MR-Ultrason Füzyon Biyopsi Nedir?
Klasik biyopside prostattan ultrason eşliğinde 12 sistematik örnek alınır; tümör küçükse örnekler arasına düşebilir. **Füzyon biyopside** MR görüntüleri gerçek zamanlı ultrason görüntüsüyle bilgisayar ortamında çakıştırılır ve şüpheli alandan milimetrik hassasiyetle hedefli örnekler alınır. Böylece hem klinik olarak önemli kanserlerin yakalanma oranı artar hem de gereksiz örnek sayısı azalır. İşlem genellikle lokal anestezi veya hafif sedasyonla, ciltten (transperineal) ya da rektumdan yapılır; transperineal yol enfeksiyon riskini belirgin azaltır.

### Kimler PSA Taraması Yaptırmalı?
Prostat kanseri erken evrede belirti vermez; bu yüzden tarama önemlidir. Genel öneri:
* Ortalama riskli erkeklerde **50 yaşından** itibaren
* Babasında veya erkek kardeşinde prostat kanseri olanlarda ve BRCA gen mutasyonu taşıyanlarda **45 yaşından** itibaren
* Beklenen yaşam süresi 10-15 yıldan az olan erkeklerde tarama genellikle önerilmez, çünkü yavaş seyirli tümörlerin teşhisi fayda sağlamaz.

Taramanın aralığı ilk PSA değerine göre belirlenir: PSA çok düşükse 2-4 yılda bir, sınıra yakınsa yıllık kontrol yeterlidir. Tarama kararı, olası fayda ve gereksiz tanı riskleri konuşularak hastayla **birlikte** verilmelidir.

### PSA Yüksek Çıktıysa Ne Yapmalı?
1. Sonucu tek başına yorumlamayın; enfeksiyon ve diğer geçici nedenler dışlansın.
2. Testi 4-8 hafta sonra, uygun koşullarda tekrarlatın.
3. Üroloji muayenesi (rektal muayene) ve gerekirse serbest PSA, PSA dansitesi ölçülsün.
4. Şüphe sürüyorsa multiparametrik MR çekilsin.
5. MR bulgusuna göre hedefli füzyon biyopsi veya PSA takibi planlansın.

PSA yüksekliği çoğu zaman kanser dışı bir nedene bağlıdır; ancak ihmal edildiğinde erken evre kanserin gecikmiş tanısına yol açabilir. Doğru yaklaşım ne panik ne de ihmaldir: yapılandırılmış, adım adım bir değerlendirme.

${DISCLAIMER}`,
    faq: [
      {
        q: 'PSA 4’ün üzerindeyse kanser midir?',
        a: 'Hayır. 4-10 ng/mL aralığındaki PSA değerlerinde biyopsi yapılan erkeklerin yalnızca bir kısmında kanser bulunur; büyük çoğunluğunda neden iyi huylu prostat büyümesi veya iltihaptır. Değer tekrarlanmalı, serbest PSA oranı ve prostat hacmiyle birlikte yorumlanmalı, gerekirse MR çekilmelidir.',
      },
      {
        q: 'PSA testi öncesi nelere dikkat edilmeli?',
        a: 'Testten önce 48 saat cinsel ilişki ve boşalmadan kaçınılmalı, uzun bisiklet sürüşü yapılmamalı, aktif idrar yolu enfeksiyonu varsa test ertelenmeli, rektal muayene ve sonda gibi işlemlerden en az birkaç gün sonra kan alınmalıdır. Kullanılan finasterid/dutasterid gibi ilaçlar hekime bildirilmelidir.',
      },
      {
        q: 'Serbest PSA oranı ne anlama gelir?',
        a: 'Kandaki PSA’nın proteinlere bağlı olmayan kısmının toplam PSA’ya oranıdır. Oran %25’in üzerindeyse iyi huylu büyüme olasılığı yüksek, %10’un altındaysa kanser olasılığı artmıştır. Özellikle PSA 4-10 arasındayken biyopsi kararına yardımcı olur.',
      },
      {
        q: 'Prostat MR biyopsinin yerine geçer mi?',
        a: 'Hayır, ancak biyopsi kararını yönlendirir. MR şüpheli alan göstermiyorsa (PI-RADS 1-2) birçok hastada biyopsi ertelenip takip yapılabilir; şüpheli alan varsa füzyon biyopsi ile tam o noktadan örnek alınır. Kesin tanı yalnızca biyopsi ile konur.',
      },
      {
        q: 'Füzyon biyopsi ağrılı mıdır?',
        a: 'İşlem lokal anestezi veya hafif sedasyon altında yapılır ve genellikle 15-20 dakika sürer. Hastalar çoğunlukla hafif bir baskı hissi tarif eder. Sonrasında birkaç gün idrarda ve menide kan görülmesi beklenen bir durumdur.',
      },
    ],
    sources: [
      { title: 'EAU Guidelines: Prostate Cancer', url: 'https://uroweb.org/guidelines/prostate-cancer' },
      { title: 'AUA Guideline: Early Detection of Prostate Cancer', url: 'https://www.auanet.org/guidelines-and-quality/guidelines/early-detection-of-prostate-cancer-guidelines' },
      { title: 'National Cancer Institute: PSA Test', url: 'https://www.cancer.gov/types/prostate/psa-fact-sheet' },
    ],
  },

  // =========================================================================
  // 3. BÖBREK TAŞI
  // =========================================================================
  {
    id: 'bobrek-tasi-nasil-duser',
    title: 'Böbrek Taşı Kaç Günde Düşer? 5-10 mm Taş Düşer mi?',
    slug: 'bobrek-tasi-belirtileri-nasil-duser',
    translations: { EN: 'kidney-stone-laser-treatment-rirs-turkey', RU: 'lechenie-kamney-v-pochkah-lazerom-rirs' },
    excerpt:
      'Böbrek taşı ağrısı bilinen en şiddetli ağrılardan biridir. Hangi taşlar kendiliğinden düşer, hangi durumlar acildir, lazerle taş kırma nasıl yapılır ve taşın tekrarlaması nasıl önlenir?',
    category: 'Taş Hastalıkları',
    date: '14 Eylül 2026',
    datePublished: '2026-09-14',
    dateModified: '2026-09-14',
    readTime: '8',
    author: AUTHOR,
    keywords:
      'böbrek taşı belirtileri, böbrek taşı nasıl düşer, böbrek taşı düşürme, üreter taşı, böbrek taşı ağrısı, lazerle taş kırma, RIRS, ESWL, böbrek taşı ameliyatı istanbul',
    metaDescription:
      'Böbrek taşı kaç günde düşer, hangi boyuttaki taş kendiliğinden düşer, belirtileri neler ve ne zaman ameliyat gerekir? Prof. Dr. Basri Çakıroğlu anlatıyor.',
    relatedService: 'stone-disease',
    content: `### Böbrek Taşı Nasıl Oluşur?
İdrar, içinde kalsiyum, oksalat, ürik asit ve fosfat gibi minerallerin çözünmüş hâlde bulunduğu bir sıvıdır. Bu maddelerin yoğunluğu arttığında ya da onları çözünmüş tutan koruyucu maddeler (sitrat gibi) azaldığında kristaller oluşur; kristaller birleşerek zamanla taşa dönüşür. Taşların yaklaşık %80'i kalsiyum oksalat yapısındadır; ürik asit, struvit (enfeksiyon) ve sistin taşları daha nadirdir.

Böbrek taşı toplumun yaklaşık %10-15'ini hayatının bir döneminde etkiler ve Türkiye taş hastalığının sık görüldüğü ülkeler arasındadır. Bir kez taş düşüren kişide 5-10 yıl içinde yeniden taş oluşma ihtimali yüksektir; bu yüzden tedavi kadar **korunma** da önemlidir.

### Böbrek Taşının Belirtileri Nelerdir?
Böbreğin içinde duran taşlar çoğu zaman hiçbir belirti vermez ve başka bir nedenle çekilen görüntülemede tesadüfen bulunur. Belirtiler taş hareket edip böbrekten çıkan idrar kanalını (üreter) tıkadığında ortaya çıkar:
* **Renal kolik:** Böğürde başlayıp kasığa, erkeklerde testise, kadınlarda vulvaya yayılan, dalgalar hâlinde gelen çok şiddetli ağrı. Hasta yerinde duramaz, rahat bir pozisyon bulamaz.
* **Bulantı ve kusma**
* **İdrarda kan** (gözle görülen veya tahlilde saptanan)
* Taş mesaneye yaklaştığında **sık idrara çıkma, yanma ve sıkışma** hissi
* **Ateş ve titreme:** Tıkanıklığa enfeksiyon eklendiğinin işaretidir ve acil bir durumdur.

### Hangi Durumlar Acildir?
Aşağıdaki durumlarda vakit kaybetmeden acil servise başvurulmalıdır:
* Ağrıyla birlikte **38°C üzeri ateş** (tıkalı böbrekte enfeksiyon sepsise ilerleyebilir)
* Ağrı kesicilerle kontrol edilemeyen ağrı, sürekli kusma
* **Tek böbreği** olan hastada taş
* İdrar miktarında belirgin azalma veya hiç idrar yapamama
* Böbrek fonksiyon testlerinde bozulma

Bu durumlarda taşı kırmadan önce böbreğin **acilen boşaltılması** (üreter içine ince bir stent yerleştirilmesi veya ciltten böbreğe nefrostomi kateteri takılması) gerekebilir. Enfeksiyon kontrol altına alındıktan sonra taş tedavisi planlanır.

### Tanı Nasıl Konur?
* **İdrar tahlili:** Kan ve enfeksiyon bulguları
* **Kan testleri:** Böbrek fonksiyonları, kalsiyum, ürik asit
* **Ultrason:** Radyasyonsuz ilk basamak; böbrekteki şişmeyi (hidronefroz) ve böbrek içi taşları gösterir, ancak üreterdeki küçük taşları kaçırabilir.
* **Kontrastsız bilgisayarlı tomografi (BT):** Taşın yeri, boyutu ve yoğunluğunu en doğru gösteren yöntemdir; tedavi planının temelidir. Gebelerde ultrason ve gerekirse MR tercih edilir.

### Taş Kendiliğinden Düşer mi?
Taşın kendiliğinden düşme olasılığını belirleyen iki ana etken **boyut** ve **konum**dur:
* **5 mm'nin altındaki** taşların büyük çoğunluğu (yaklaşık üçte ikisi ve daha fazlası) birkaç hafta içinde kendiliğinden düşer.
* **5-10 mm** arasındaki taşların yaklaşık yarısı düşer; mesaneye yakın (alt üreter) olanların şansı daha yüksektir.
* **10 mm'nin üzerindeki** taşların kendiliğinden düşmesi beklenmez; genellikle müdahale gerekir.

Kendiliğinden düşme şansı olan, ağrısı kontrol altında ve enfeksiyonu olmayan hastalarda **tıbbi düşürme tedavisi** uygulanır:
1. Bol sıvı alımı (günde 2,5-3 litre)
2. Düzenli ağrı kesici (nonsteroid antiinflamatuar ilaçlar renal kolikte ilk tercihtir)
3. **Tamsulosin** gibi alfa bloker ilaçlar: Üreter kaslarını gevşeterek özellikle 5-10 mm'lik alt üreter taşlarının düşmesini hızlandırır.
4. Süzgeçle idrar yaparak düşen taşın yakalanması (taş analizi için)

Bu süreç genellikle **4-6 hafta** ile sınırlıdır. Bu sürede düşmeyen taş, ağrının tekrarlaması veya böbrekteki şişmenin devam etmesi durumunda bekleme uzatılmaz; uzamış tıkanıklık böbrek dokusuna kalıcı zarar verebilir.

### Böbrek Taşı Tedavi Yöntemleri
Günümüzde taş tedavilerinin tamamına yakını kesisiz ya da çok küçük kesiyle yapılır. Yöntem taşın boyutu, yeri, sertliği ve hastanın özelliklerine göre seçilir:

**ESWL (Vücut Dışından Şok Dalgasıyla Taş Kırma):** Anestezi gerektirmeden, ciltten gönderilen ses dalgalarıyla taş parçalanır; parçalar idrarla düşer. Böbrekte 2 cm'nin altındaki, çok sert olmayan taşlarda uygundur. Birden fazla seans gerekebilir; taşın tamamen temizlenme oranı endoskopik yöntemlerden düşüktür.

**URS (Üreteroskopi):** İdrar kanalından ince bir endoskopla üreterdeki taşa ulaşılıp holmiyum lazerle kırılması. Üreter taşlarında ilk tercih yöntemlerdendir; tek seansta taşsızlık oranı yüksektir.

**RIRS (Retrograd İntrarenal Cerrahi / Fleksibl Üreteroskopi):** Bükülebilir ince endoskopla idrar yolundan böbreğin içine girilir ve taş lazerle toz hâline getirilir. Vücutta hiçbir kesi yoktur. 2 cm'ye kadar böbrek taşlarında, ESWL'nin başarısız olduğu sert taşlarda ve kan sulandırıcı kullanan hastalarda öne çıkar. İşlem sonrası birkaç gün ile birkaç hafta arasında geçici bir üreter stenti (DJ stent) kalabilir.

**PNL / Mini-PNL (Perkütan Nefrolitotomi):** Sırttan 5-10 mm'lik küçük bir delikle doğrudan böbreğe girilerek büyük taşların kırılıp çıkarılması. 2 cm'nin üzerindeki taşlarda ve böbreği dolduran koraliform taşlarda altın standarttır. Mini-PNL daha ince aletlerle kanama ve ağrıyı azaltır.

**Laparoskopik/robotik taş cerrahisi:** Anatomik anomali gibi seçilmiş nadir durumlarda uygulanır. Açık taş ameliyatı günümüzde istisnai hâle gelmiştir.

### Taşın Tekrarlamasını Önlemek
Tedavi edilen her hasta için düşen veya çıkarılan taşın **analizi** yapılmalı; tekrarlayan taşı olanlarda 24 saatlik idrar tahlili ile metabolik değerlendirme önerilir. Genel korunma ilkeleri:
* Günde en az **2-2,5 litre idrar** çıkaracak kadar su içmek (sıcak havada ve sporda daha fazla)
* **Tuzu azaltmak**: Fazla sodyum, idrarla kalsiyum atılımını artırır.
* Hayvansal proteini (kırmızı et, sakatat) ölçülü tüketmek
* Kalsiyumdan **kaçınmamak**: Süt ürünlerini kısıtlamak oksalat emilimini artırarak taş riskini tersine yükseltir; günlük normal kalsiyum alımı önerilir.
* Oksalattan zengin gıdaları (ıspanak, pancar, fındık, çikolata, siyah çay) aşırıya kaçmadan tüketmek
* Limon suyu gibi sitrat kaynaklarını artırmak
* Fazla kilodan ve şekerli içeceklerden kaçınmak
* Metabolik bozukluk saptanırsa hekim önerisiyle potasyum sitrat, tiyazid veya allopurinol gibi ilaçlar

Böbrek taşı hem çok ağrılı hem de tekrarlamaya eğilimli bir hastalıktır; ancak doğru tanı, taşa uygun yöntem seçimi ve kalıcı yaşam tarzı değişiklikleriyle büyük ölçüde kontrol altına alınabilir.

${DISCLAIMER}`,
    faq: [
      {
        q: 'Böbrek taşı ağrısı nerede hissedilir?',
        a: 'Tipik olarak sırtın yan tarafında, kaburgaların altında (böğür) başlar ve karnın alt kısmına, kasığa, erkeklerde testise doğru yayılır. Ağrı dalgalar hâlinde gelir, hasta rahat bir pozisyon bulamaz; bulantı ve kusma eşlik edebilir.',
      },
      {
        q: 'Kaç mm böbrek taşı kendiliğinden düşer?',
        a: '5 mm’nin altındaki taşların büyük çoğunluğu, 5-10 mm arasındakilerin ise yaklaşık yarısı kendiliğinden düşer. 10 mm’den büyük taşların düşmesi beklenmez. Mesaneye yakın taşların düşme şansı daha yüksektir. Düşürme süreci genellikle 4-6 hafta ile sınırlandırılır.',
      },
      {
        q: 'Böbrek taşı düşürmek için ne içilmeli?',
        a: 'En etkili yöntem günde 2,5-3 litre su içmektir. Limon suyu sitrat içeriğiyle taş oluşumunu azaltır. Bira, maden suyu veya bitkisel karışımların taş düşürdüğüne dair bilimsel kanıt yoktur; hekimin verdiği alfa bloker ilaçlar (tamsulosin) alt üreter taşlarının düşmesini kolaylaştırır.',
      },
      {
        q: 'Lazerle taş kırma (RIRS) ağrılı mı, kaç günde iyileşilir?',
        a: 'RIRS genel anestezi altında yapılır, vücutta kesi yoktur. Hastalar genellikle aynı gün veya ertesi gün taburcu olur ve birkaç gün içinde günlük yaşama döner. Yerleştirilen geçici stent sık idrara çıkma ve hafif yanma yapabilir; stent alındığında bu şikâyetler geçer.',
      },
      {
        q: 'Böbrek taşı olanlar süt ve kalsiyum tüketmemeli mi?',
        a: 'Bu yaygın bir yanlıştır. Kalsiyumu kısıtlamak bağırsakta oksalat emilimini artırarak taş riskini yükseltir. Günlük normal miktarda (yaklaşık 1000-1200 mg) kalsiyumun besinlerle alınması önerilir; asıl kısıtlanması gereken tuz ve aşırı hayvansal proteindir.',
      },
    ],
    sources: [
      { title: 'EAU Guidelines: Urolithiasis', url: 'https://uroweb.org/guidelines/urolithiasis' },
      { title: 'AUA Guideline: Surgical Management of Stones', url: 'https://www.auanet.org/guidelines-and-quality/guidelines/kidney-stones-surgical-management-guideline' },
      { title: 'NIDDK: Kidney Stones', url: 'https://www.niddk.nih.gov/health-information/urologic-diseases/kidney-stones' },
    ],
  },

  // =========================================================================
  // 4. HoLEP SONRASI İYİLEŞME
  // =========================================================================
  {
    id: 'holep-sonrasi-iyilesme',
    title: 'HoLEP Sonrası İyileşme: Cinsellik, İdrar Kaçırma, Süre',
    slug: 'holep-ameliyati-sonrasi-iyilesme-sureci',
    translations: { EN: 'holep-prostate-surgery-turkey-guide', RU: 'holep-lazernaya-operaciya-prostaty-turciya' },
    excerpt:
      'HoLEP lazer prostat ameliyatı sonrası sonda ne zaman alınır, idrarda kanama ne kadar sürer, işe ve cinsel hayata ne zaman dönülür? Hastaların en çok sorduğu soruları haftalara göre yanıtlıyoruz.',
    category: 'Lazer Cerrahi',
    date: '14 Eylül 2026',
    datePublished: '2026-09-14',
    dateModified: '2026-09-14',
    readTime: '7',
    author: AUTHOR,
    keywords:
      'HoLEP ameliyatı sonrası, HoLEP iyileşme süresi, HoLEP sonrası idrar kaçırma, HoLEP sonrası kanama, HoLEP sonrası cinsellik, prostat ameliyatı sonrası dikkat edilmesi gerekenler',
    metaDescription:
      'HoLEP ameliyatı sonrası iyileşme: hastanede kalış, sonda, kanama, idrar kaçırma, cinsel yaşam ve işe dönüş. Prof. Dr. Basri Çakıroğlu’ndan hasta rehberi.',
    relatedService: 'prostate-diseases',
    content: `### HoLEP'i Kısaca Hatırlayalım
HoLEP (Holmiyum Lazer Enükleasyonu), iyi huylu prostat büyümesinde idrar kanalını tıkayan dokunun idrar yolundan girilerek lazerle kapsülünden ayrılıp mesane içinde parçalanarak çıkarıldığı kapalı bir ameliyattır. Vücutta kesi yoktur, kanama riski düşüktür ve prostatın boyutu ne olursa olsun uygulanabilir. Ameliyat kadar önemli olan bir konu da sonrasındaki iyileşme sürecinin doğru yönetilmesidir. Bu yazı, hastalarımızın en sık sorduğu soruları zaman çizelgesine göre yanıtlıyor.

### Ameliyat Günü ve Hastanede Kalış
HoLEP genel veya spinal anestezi altında yapılır ve prostatın boyutuna göre 1-2 saat sürer. Ameliyat sonunda mesaneye bir sonda yerleştirilir; ilk saatlerde mesane, kanamayı önlemek için serumla yıkanır. Hastalar aynı gün yürüyebilir ve yemek yiyebilir. Hastanede kalış süresi çoğunlukla **1 gece**, büyük prostatlarda 2 gecedir.

### Sonda Ne Zaman Alınır?
Sonda genellikle ameliyattan **24-48 saat sonra** alınır. Sonda alındıktan sonra hastanın rahat idrar yaptığı ve mesanesini boşalttığı doğrulanır; ardından taburcu edilir. Çok büyük prostatlarda veya ameliyat öncesi uzun süre sondalı kalmış, mesanesi güçsüzleşmiş hastalarda sonda birkaç gün daha tutulabilir.

### İlk 2 Hafta: Neler Normal?
* **İdrarda hafif pembe-kırmızı renk:** Ameliyat bölgesi iyileşirken 2-4 hafta boyunca ara ara kan gelmesi normaldir. Özellikle ıkınma, kabızlık veya hareketlilik sonrası artabilir. Bol su içmek idrarı seyreltir ve pıhtı oluşumunu önler.
* **Sık idrara çıkma, yanma, ani sıkışma:** Prostatın çıkarıldığı yerde geniş bir yara yüzeyi vardır ve mesane yıllardır alıştığı tıkanıklığın kalkmasına uyum sağlamaya çalışır. Bu "irritatif" şikâyetler ilk haftalarda belirgindir, 4-8 haftada azalır.
* **Öksürme, hapşırma veya ayağa kalkarken birkaç damla idrar kaçırma:** Hastaların bir kısmında görülen **geçici** stres tipi kaçırmadır. Prostat çok büyükse ve mesane uzun süre zorlanmışsa daha sık görülür. Çoğunlukla haftalar içinde, nadiren birkaç ay içinde kendiliğinden düzelir. Pelvik taban (Kegel) egzersizleri iyileşmeyi hızlandırır.
* İdrar akımının ilk günden itibaren belirgin güçlenmesi — hastaların en çok fark ettiği değişiklik.

### Evde Dikkat Edilecekler
1. **Günde 2-2,5 litre su** için; idrarı açık renkte tutmayı hedefleyin.
2. **Kabızlıktan kaçının.** Ikınma, ameliyat yerinde kanamayı tetikleyebilir. Lifli beslenin, gerekirse hekiminizin önerdiği dışkı yumuşatıcıyı kullanın.
3. İlk **2-3 hafta ağır kaldırmayın** (5 kg üzeri), zorlayıcı spor ve bisiklet sürmeyin. Yürüyüş serbesttir ve önerilir.
4. **Araba kullanma:** Sonda alındıktan sonra kendinizi rahat hissediyorsanız birkaç gün içinde başlayabilirsiniz; uzun yolculukları ilk haftalarda erteleyin.
5. **Kan sulandırıcı ilaçlar:** Ne zaman yeniden başlanacağı hekiminiz tarafından kanama durumuna göre belirlenir; kendi kararınızla başlamayın veya bırakmayın.
6. Alkol ve aşırı kafein ilk haftalarda sık idrara çıkmayı artırır; ölçülü olun.
7. Hekiminiz reçete ettiyse antibiyotik ve mesane rahatlatıcı ilaçları düzenli kullanın.

### İşe Dönüş
Masa başı işlerde çoğu hasta **1-2 hafta** içinde işe dönebilir. Fiziksel güç gerektiren işlerde bu süre 3-4 haftaya uzar. İyileşme kişiden kişiye değişir; kendinizi zorlamayın.

### Cinsel Yaşam
Cinsel ilişkiye genellikle **3-4 hafta** sonra, idrarda kanama tamamen kesildikten sonra başlanabilir. HoLEP'te sertleşmeyi sağlayan sinirler prostat kapsülünün dışında kaldığı için **erektil fonksiyon genellikle korunur**. Ancak hastaların büyük çoğunluğunda boşalma sırasında meni dışarı gelmez, mesaneye geri kaçar ve idrarla atılır (**retrograd ejakülasyon**). Bu durum zararsızdır; orgazm hissi ve cinsel tatmin devam eder. Çocuk sahibi olmayı planlayan erkeklerin bu konuyu ameliyat öncesi hekimleriyle konuşması önemlidir.

### Kontroller ve Patoloji Sonucu
İlk kontrol genellikle ameliyattan 2-4 hafta sonra yapılır; idrar tahlili ve gerekirse idrar akım ölçümü tekrarlanır. Ameliyatta çıkarılan doku mutlaka **patolojik incelemeye** gönderilir. İyi huylu büyüme nedeniyle ameliyat edilen hastaların küçük bir kısmında dokuda tesadüfen kanser hücreleri saptanabilir; sonuç kontrolde hastayla birlikte değerlendirilir. Uzun vadede yıllık PSA ve muayene takibi sürer, çünkü prostatın dış kapsülü yerinde kalır.

### Ne Zaman Hekimi Aramalı?
Aşağıdaki durumlarda beklemeden hekiminize ulaşın veya acile başvurun:
* 38°C üzeri **ateş** ve titreme
* **Hiç idrar yapamama** ya da pıhtıyla tıkanma
* Koyu kırmızı, yoğun **pıhtılı kanama** veya kanamanın giderek artması
* Kontrol edilemeyen ağrı, bulantı-kusma
* Bacakta şişlik-ağrı veya nefes darlığı (pıhtı belirtisi)

### Uzun Vadede Ne Beklenir?
HoLEP'te büyüyen doku bütün olarak alındığı için yıllar içinde tekrar büyüme ve ikinci ameliyat gereksinimi çok düşüktür. Hastaların büyük çoğunluğu 2-3 ay sonunda idrar şikâyetlerinden tamamen kurtulmuş olur ve gece uykusu düzene girer. Ameliyattan önce mesanesi uzun süre zorlanmış, ilerlemiş hastalarda mesane kasının toparlanması daha uzun sürebilir; bu durumda sabır ve düzenli takip önemlidir.

${DISCLAIMER}`,
    faq: [
      {
        q: 'HoLEP sonrası sonda kaç gün kalır?',
        a: 'Çoğu hastada sonda ameliyattan 24-48 saat sonra alınır. Çok büyük prostatlarda veya ameliyat öncesi uzun süre sondalı kalmış hastalarda birkaç gün daha tutulabilir.',
      },
      {
        q: 'HoLEP sonrası idrar kaçırma kalıcı mıdır?',
        a: 'Hayır, büyük çoğunlukla geçicidir. Öksürme veya ayağa kalkarken birkaç damla kaçırma ilk haftalarda görülebilir ve genellikle haftalar içinde, nadiren birkaç ayda düzelir. Pelvik taban egzersizleri iyileşmeyi hızlandırır. Kalıcı kaçırma nadirdir.',
      },
      {
        q: 'HoLEP sonrası kanama ne kadar sürer?',
        a: 'İdrarda ara ara pembe-kırmızı renk 2-4 hafta boyunca normaldir; ıkınma ve hareketle artabilir. Bol su içmek pıhtı oluşumunu önler. Yoğun pıhtılı, koyu kırmızı ve giderek artan kanama ise hekime başvurmayı gerektirir.',
      },
      {
        q: 'HoLEP sonrası cinsel ilişkiye ne zaman başlanır?',
        a: 'Genellikle 3-4 hafta sonra, idrarda kanama tamamen kesildiğinde. Sertleşme fonksiyonu çoğunlukla korunur; ancak boşalma sırasında meni büyük olasılıkla mesaneye geri kaçar (retrograd ejakülasyon). Bu zararsızdır, orgazm hissi devam eder.',
      },
      {
        q: 'HoLEP sonrası işe ne zaman dönülür?',
        a: 'Masa başı işlerde 1-2 hafta, ağır fiziksel işlerde 3-4 hafta sonra. İlk 2-3 hafta 5 kg üzeri ağırlık kaldırmaktan, zorlayıcı spordan ve bisikletten kaçınılmalıdır.',
      },
    ],
    sources: [
      { title: 'EAU Guidelines: Management of Non-neurogenic Male LUTS', url: 'https://uroweb.org/guidelines/management-of-non-neurogenic-male-luts' },
      { title: 'AUA Guideline: Management of BPH', url: 'https://www.auanet.org/guidelines-and-quality/guidelines/benign-prostatic-hyperplasia-(bph)-guideline' },
    ],
  },

  // =========================================================================
  // 5. KADINLARDA İDRAR KAÇIRMA
  // =========================================================================
  {
    id: 'kadin-idrar-kacirma',
    title: 'Kadınlarda İdrar Kaçırma: Nedenleri ve Tedavisi',
    slug: 'kadinlarda-idrar-kacirma-nedenleri-ve-tedavisi',
    translations: { EN: 'female-urinary-incontinence-treatment-turkey', RU: 'nederzhanie-mochi-u-zhenshchin-lechenie' },
    excerpt:
      'Öksürünce, gülünce ya da tuvalete yetişemeden idrar kaçırmak "yaşın getirdiği" bir kader değil, tedavi edilebilir bir sağlık sorunudur. Stres ve sıkışma tipi kaçırmanın farkı, egzersizden ilaca ve sling ameliyatına tüm seçenekler.',
    category: 'Kadın Ürolojisi',
    date: '14 Eylül 2026',
    datePublished: '2026-09-14',
    dateModified: '2026-09-14',
    readTime: '8',
    author: AUTHOR,
    keywords:
      'kadınlarda idrar kaçırma, idrar kaçırma nedenleri, stres inkontinans, sıkışma tipi idrar kaçırma, aşırı aktif mesane, kegel egzersizi, TOT ameliyatı, idrar kaçırma ameliyatı istanbul',
    metaDescription:
      'Kadınlarda idrar kaçırmanın nedenleri, stres ve sıkışma tipi kaçırmanın farkı, Kegel egzersizi, ilaçlar ve TOT/TVT sling ameliyatı. Prof. Dr. Basri Çakıroğlu.',
    relatedService: 'urogynecology',
    content: `### Konuşulmayan Ama Çok Yaygın Bir Sorun
İdrar kaçırma (üriner inkontinans), kadınların yaklaşık üçte birini hayatının bir döneminde etkiler; menopoz sonrasında ve doğum yapmış kadınlarda çok daha sıktır. Buna rağmen hastaların büyük kısmı utanç ya da "yaşlanmanın doğal sonucu" düşüncesiyle yıllarca doktora başvurmaz; sosyal hayattan uzaklaşır, spor yapmayı bırakır, ped kullanmaya alışır. Oysa idrar kaçırmanın türü doğru belirlendiğinde büyük çoğunluğu başarıyla tedavi edilebilir.

### İdrar Kaçırmanın Türleri
Doğru tedavi, doğru sınıflandırmayla başlar. Üç ana tip vardır:

**1. Stres tipi idrar kaçırma:** Öksürme, hapşırma, gülme, ağırlık kaldırma, koşma veya zıplama gibi karın içi basıncı artıran hareketlerde idrar kaçırma. Mesane boynunu ve idrar kanalını destekleyen pelvik taban kaslarının ve bağ dokusunun zayıflamasından kaynaklanır. Doğum, menopoz, fazla kilo ve kronik öksürük en önemli nedenlerdir. İdrar hissi olmadan, hareketle birlikte kaçırma tipiktir.

**2. Sıkışma (urge) tipi idrar kaçırma:** Aniden gelen, ertelenemeyen şiddetli idrar hissi ve tuvalete yetişemeden kaçırma. Sık idrara çıkma (günde 8'den fazla) ve gece kalkma eşlik eder. Nedeni mesane kasının istem dışı kasılmasıdır; bu tabloya **aşırı aktif mesane** denir. Su sesi duyunca ya da eve girip anahtarı çevirince ani sıkışma hissi bu tipin klasik örneğidir.

**3. Karışık (mikst) tip:** Her iki tipin bir arada bulunması. Özellikle ileri yaşta sıktır; hangi bileşenin baskın olduğu tedavi sırasını belirler.

Bunların dışında mesanenin tam boşalamamasına bağlı **taşma tipi** kaçırma, sinir hastalıklarına bağlı nörojenik mesane ve doğum sonrası ya da cerrahiye bağlı fistüller daha nadir nedenlerdir.

### Risk Faktörleri
* Vajinal doğum, özellikle çok sayıda veya iri bebek doğumu
* Menopoz ve östrojen azalması
* Fazla kilo
* Kronik öksürük (sigara, astım, KOAH), kronik kabızlık
* Sık idrar yolu enfeksiyonu
* Şeker hastalığı, nörolojik hastalıklar
* Bazı ilaçlar (idrar söktürücüler, kas gevşeticiler)
* Pelvik organ sarkması (mesane, rahim sarkması)

### Değerlendirme Nasıl Yapılır?
Çoğu hastada tanı için ağır tetkiklere gerek yoktur:
* Ayrıntılı öykü: kaçırma hangi durumlarda oluyor, ne sıklıkta, ne miktarda?
* **Mesane günlüğü:** 3 gün boyunca içilen sıvı, idrar zamanları ve kaçırma olaylarının kaydedilmesi; tanıda en değerli araçlardan biridir.
* İdrar tahlili ve gerekirse kültür (enfeksiyon tek başına sıkışma yapabilir)
* Jinekolojik/ürolojik muayene: öksürük testi, pelvik taban kas gücü, sarkma varlığı
* Ultrasonla işeme sonrası kalan idrar ölçümü
* **Ürodinami:** Mesanenin dolum ve boşaltım basınçlarının ölçülmesi; her hastada değil, tanının net olmadığı, daha önce ameliyat geçirmiş veya cerrahi planlanan seçilmiş olgularda yapılır.

### Tedavi: Basitten Karmaşığa
Kılavuzlar her tipte önce **koruyucu ve davranışsal** yöntemlerle başlanmasını önerir; birçok hasta ameliyata veya ilaca gerek kalmadan düzelir.

**Yaşam tarzı düzenlemeleri**
* Kilo verme: %5-10'luk kilo kaybı bile kaçırma ataklarını belirgin azaltır.
* Kafein, asitli ve gazlı içecekleri, alkolü azaltmak
* Sıvıyı gün içine yaymak, yatmadan 2-3 saat önce kesmek
* Kabızlığın ve kronik öksürüğün tedavisi, sigaranın bırakılması

**Pelvik taban (Kegel) egzersizleri**
Stres tipi kaçırmada ilk basamak tedavidir; sıkışma tipinde de faydalıdır. İdrarı tutar gibi pelvik kasların 5-10 saniye kasılıp gevşetilmesi, günde 3 set, her sette 10-15 tekrar şeklinde en az 3 ay düzenli yapılmalıdır. Doğru kas grubunun çalıştırıldığından emin olmak için fizyoterapist eşliğinde **biofeedback** veya elektrik stimülasyonu desteği alınabilir. Düzenli yapıldığında hastaların yarısından fazlasında anlamlı iyileşme sağlar.

**Mesane eğitimi**
Sıkışma tipinde tuvalet aralıklarının planlı olarak kademeli uzatılması (ör. 1 saatten başlayıp haftada 15 dakika artırarak 3-4 saate çıkmak) mesanenin kapasitesini ve kontrolünü yeniden kazandırır.

**İlaç tedavisi (sıkışma tipi / aşırı aktif mesane için)**
* **Antimuskarinik ilaçlar** (solifenasin, tolterodin vb.): Mesane kasılmalarını azaltır; ağız kuruluğu ve kabızlık yapabilir.
* **Beta-3 agonistler** (mirabegron): Benzer etkinlikte, ağız kuruluğu yapmaz; tansiyon takibi gerekir.
* Menopozdaki kadınlarda **vajinal östrojen** kremi mukozayı güçlendirerek sıkışma ve enfeksiyon şikâyetlerini azaltır.
Stres tipi kaçırmada etkili bir ilaç yoktur; bu tipte tedavi egzersiz ve gerekirse cerrahidir.

**İleri tedaviler (sıkışma tipi, ilaca dirençli)**
* Mesane içine **botulinum toksin** (Botox) enjeksiyonu: Sistoskopi ile yapılır, etkisi 6-9 ay sürer, tekrarlanabilir.
* **Tibial sinir stimülasyonu:** Ayak bileğindeki sinire haftalık ince iğneyle uygulanan uyarı.
* **Sakral nöromodülasyon:** Cilt altına yerleştirilen bir "mesane pili".

**Stres tipi kaçırmada cerrahi**
Egzersizle düzelmeyen stres tipi kaçırmada cerrahi çok etkilidir:
* **Orta üretral sling (TOT / TVT):** Vajinadan 1-2 cm'lik küçük bir kesiyle idrar kanalının altına ince bir bant yerleştirilir; bant öksürme anında üretrayı destekleyerek kaçırmayı önler. İşlem 20-30 dakika sürer, hasta genellikle aynı gün ya da ertesi gün taburcu olur. Uzun dönem başarı oranı yüksektir (hastaların büyük çoğunluğu kuru kalır).
* **Üretral dolgu (bulking) enjeksiyonları:** Lokal anestezi ile uygulanabilir, etkisi slingden daha kısa sürelidir; ameliyat istemeyen veya cerrahi riski yüksek hastalarda seçenektir.
* **Burch kolposüspansiyon:** Laparoskopik/robotik olarak yapılabilen, özellikle aynı seansta başka pelvik cerrahi planlanan hastalarda tercih edilen klasik yöntem.
* Sarkma eşlik ediyorsa sarkma onarımı ile birlikte planlama yapılır.

### Ne Zaman Doktora Gitmeli?
Hayat kalitenizi etkileyen her idrar kaçırma bir başvuru nedenidir. Ayrıca idrarda kan, ağrı, tekrarlayan enfeksiyon, ani başlayan şiddetli şikâyet veya nörolojik belirtiler (bacakta uyuşma, güçsüzlük) eşlik ediyorsa gecikmeden değerlendirilmelidir. İdrar kaçırma tedavisi bugün büyük ölçüde hastanın tercihine göre şekillenen, kademeli ve yüksek başarılı bir alandır; ped ile yaşamak zorunda değilsiniz.

${DISCLAIMER}`,
    faq: [
      {
        q: 'Kegel egzersizi idrar kaçırmayı gerçekten düzeltir mi?',
        a: 'Evet, özellikle stres tipi kaçırmada ilk basamak tedavidir ve düzenli, doğru yapıldığında hastaların yarısından fazlasında anlamlı iyileşme sağlar. En az 3 ay, günde 3 set uygulanmalıdır. Doğru kasın çalıştırıldığından emin olmak için fizyoterapist ve biofeedback desteği alınabilir.',
      },
      {
        q: 'Stres tipi ile sıkışma tipi idrar kaçırma arasındaki fark nedir?',
        a: 'Stres tipinde öksürme, gülme, ağırlık kaldırma gibi karın basıncını artıran hareketlerle, idrar hissi olmadan kaçırma olur; neden pelvik taban zayıflığıdır. Sıkışma tipinde ise aniden gelen dayanılmaz idrar hissiyle tuvalete yetişemeden kaçırma olur; neden mesane kasının istem dışı kasılmasıdır. Tedavileri farklıdır.',
      },
      {
        q: 'TOT ameliyatı nedir, başarı oranı nedir?',
        a: 'TOT, stres tipi idrar kaçırmada vajinadan küçük bir kesiyle idrar kanalının altına ince bir bant yerleştirilen 20-30 dakikalık bir ameliyattır. Hasta genellikle aynı gün veya ertesi gün taburcu olur. Uzun dönemde hastaların büyük çoğunluğu kuru kalır; en etkili stres inkontinans tedavilerinden biridir.',
      },
      {
        q: 'İdrar kaçırma için ilaç var mı?',
        a: 'Sıkışma tipi kaçırma (aşırı aktif mesane) için antimuskarinik ilaçlar ve mirabegron etkilidir. Stres tipi kaçırmada ise etkili bir ilaç yoktur; tedavi pelvik taban egzersizi ve gerekirse sling ameliyatıdır.',
      },
      {
        q: 'Doğum sonrası idrar kaçırma geçer mi?',
        a: 'Doğumdan sonraki ilk aylarda görülen hafif kaçırma, pelvik taban egzersizleriyle çoğunlukla düzelir. Bir yılı geçtiği hâlde devam eden veya hayat kalitesini etkileyen kaçırma değerlendirilmeli; gerekirse fizyoterapi ya da cerrahi seçenekler konuşulmalıdır.',
      },
    ],
    sources: [
      { title: 'EAU Guidelines: Non-neurogenic Female LUTS', url: 'https://uroweb.org/guidelines/non-neurogenic-female-luts' },
      { title: 'AUA/SUFU Guideline: Surgical Treatment of Female Stress Urinary Incontinence', url: 'https://www.auanet.org/guidelines-and-quality/guidelines/stress-urinary-incontinence-(sui)-guideline' },
      { title: 'NIDDK: Bladder Control Problems in Women', url: 'https://www.niddk.nih.gov/health-information/urologic-diseases/bladder-control-problems-women' },
    ],
  },

  // =========================================================================
  // 6. ROBOTİK PROSTAT KANSERİ AMELİYATI
  // =========================================================================
  {
    id: 'robotik-radikal-prostatektomi',
    title: 'Robotik Prostat Ameliyatı (da Vinci): Nasıl Yapılır?',
    slug: 'robotik-prostat-kanseri-ameliyati',
    translations: { EN: 'robotic-prostatectomy-istanbul-turkey', RU: 'robotichenskaya-prostatektomiya-stambul' },
    excerpt:
      'Prostat kanseri tanısı alan erkeklerin en çok merak ettiği konu: daVinci robotu ile ameliyat nasıl yapılır, idrar tutma ve cinsel fonksiyon korunur mu, iyileşme ne kadar sürer?',
    category: 'Onkoloji',
    date: '14 Eylül 2026',
    datePublished: '2026-09-14',
    dateModified: '2026-09-14',
    readTime: '8',
    author: AUTHOR,
    keywords:
      'robotik prostat ameliyatı, radikal prostatektomi, daVinci prostat kanseri ameliyatı, sinir koruyucu prostatektomi, prostat kanseri ameliyatı sonrası idrar kaçırma, prostat kanseri tedavisi istanbul',
    metaDescription:
      'Robotik radikal prostatektomi nasıl yapılır, kimlere uygundur, idrar kontrolü ve sertleşme nasıl korunur? Prof. Dr. Basri Çakıroğlu anlatıyor.',
    relatedService: 'robotic-surgery',
    content: `### Radikal Prostatektomi Nedir?
Radikal prostatektomi, prostat bezinin seminal veziküllerle birlikte tamamen çıkarılması ve idrar kanalının mesaneye yeniden bağlanmasıdır. Prostatın dışına yayılmamış (lokalize) ya da sınırlı bölgesel yayılım gösteren prostat kanserinde **tam iyileşme amaçlı** temel tedavi seçeneklerinden biridir. Bu ameliyat açık, laparoskopik veya **robot yardımlı** olarak yapılabilir; günümüzde gelişmiş merkezlerde büyük çoğunluğu robotik yöntemle gerçekleştirilmektedir.

### Ameliyat Kimler İçin Uygundur?
Prostat kanseri tek tip bir hastalık değildir. Tedavi kararı kanserin risk grubuna (PSA, Gleason/ISUP derecesi, MR bulguları, evre), hastanın yaşına, beklenen yaşam süresine ve ek hastalıklarına göre verilir:
* **Düşük riskli**, küçük hacimli tümörlerde **aktif izlem** (düzenli PSA, MR ve biyopsi takibi ile tedaviyi erteleme) çoğu zaman ilk seçenektir; gereksiz tedaviden ve yan etkilerinden kaçınılır.
* **Orta ve yüksek riskli** lokalize hastalıkta radikal prostatektomi ile radyoterapi (dıştan ışın tedavisi veya brakiterapi) karşılaştırılabilir onkolojik sonuçlar verir; seçim yan etki profili ve hasta tercihiyle şekillenir.
* Beklenen yaşam süresi en az 10 yıl olan, cerrahi için uygun genel sağlık durumundaki hastalar ameliyattan en fazla fayda görür.
* Uzak yayılım (metastaz) olan hastalarda ilk tedavi genellikle hormonal ve sistemik tedavilerdir.

Karar, ürolog, radyasyon onkoloğu ve tıbbi onkoloğun birlikte değerlendirdiği **multidisipliner tümör konseyi** yaklaşımıyla ve hastanın öncelikleri dinlenerek verilmelidir.

### Robotik Cerrahi Nasıl Yapılır?
daVinci cerrahi sistemi, cerrahın konsoldan yönettiği, karına 8 mm'lik 5-6 küçük delikten yerleştirilen robotik kollardan oluşur. Robot kendi başına hiçbir hareket yapmaz; cerrahın el hareketlerini titremeden arındırıp küçülterek aletlere iletir. Sistem üç önemli avantaj sunar:
* **3 boyutlu, 10-15 kat büyütülmüş görüntü:** Prostatın hemen yanından geçen sertleşme sinirleri ve idrar tutma kasını oluşturan yapılar net görülür.
* **Bilek hareketi yapabilen aletler:** Dar pelvis içinde insan elinin ulaşamayacağı açılarda hassas diseksiyon ve dikiş mümkün olur.
* **Düşük kan kaybı:** Karın içi gaz basıncı ve büyütme sayesinde kanama açık cerrahiye göre belirgin azdır; kan nakli nadiren gerekir.

Ameliyat genel anestezi altında yaklaşık 2-3 saat sürer. Prostat ve seminal veziküller çıkarılır, gerekli olgularda pelvik lenf düğümleri alınır ve idrar kanalı mesaneye dikilir. Çıkarılan doku bir torba içinde küçük deliklerden biri hafifçe genişletilerek dışarı alınır.

### Sinir Koruyucu Teknik ve Cinsel Fonksiyon
Sertleşmeyi sağlayan sinir demetleri prostatın iki yanında, kapsüle yapışık seyreder. Tümör bu bölgeye yakın değilse cerrah sinirleri prostattan dikkatle sıyırarak korur (**sinir koruyucu prostatektomi**). Ameliyat sonrası sertleşmenin geri dönmesi şu etkenlere bağlıdır:
* Hastanın yaşı ve ameliyat öncesi sertleşme kalitesi
* Sinirlerin tek taraflı mı, iki taraflı mı korunabildiği
* Şeker hastalığı, damar hastalığı gibi eşlik eden durumlar

Uygun hastalarda sertleşme fonksiyonu aylar içinde kademeli olarak geri döner; bu süreç 1-2 yıla uzayabilir. Erken dönemde **penil rehabilitasyon** (düzenli PDE5 inhibitörü kullanımı, vakum cihazı) sinir iyileşmesini destekler. Tümörün yaygınlığı nedeniyle sinirlerin korunamadığı olgularda ise ilaç, enjeksiyon veya protez gibi seçenekler mevcuttur. Ameliyat sonrası **meni gelmez** (kuru orgazm) ve doğal yolla çocuk sahibi olma mümkün değildir; çocuk isteği olanlarda ameliyat öncesi sperm dondurulması konuşulmalıdır.

### İdrar Kontrolü (Kontinans)
Prostat çıkarıldığında idrar tutmayı sağlayan yapılardan biri de gitmiş olur; kontrol, dış sfinkter kası tarafından üstlenilir. Robotik cerrahide sfinkterin ve destek dokularının korunmasına yönelik tekniklerle:
* Sonda alındıktan sonraki ilk haftalarda hastaların çoğunda değişen derecelerde kaçırma olur; ped kullanımı normaldir.
* Kontrol büyük çoğunlukta **3-6 ay** içinde, geri kalanların çoğunda 12 ay içinde geri döner.
* Ameliyat öncesinden başlanan ve sonrasında sürdürülen **pelvik taban egzersizleri** en etkili destektir.
* Bir yıl sonra hâlâ anlamlı kaçırması olan küçük bir hasta grubunda sling veya yapay sfinkter gibi düzeltici cerrahi seçenekler vardır.

### Hastanede Kalış ve İyileşme
* Hastanede kalış genellikle **1-2 gece**dir; hasta ameliyat günü akşamı yürütülür.
* Karın ağrısı azdır; çoğu hastada basit ağrı kesiciler yeterlidir.
* Sonda yaklaşık **7-10 gün** kalır; mesane-üretra dikişinin iyileşmesi için gereklidir.
* Masa başı işe 2-3 hafta, ağır işe 4-6 hafta sonra dönülür.
* Deliklerin izleri zamanla silikleşir.

### Patoloji Sonucu ve Takip
Çıkarılan prostatın patoloji incelemesi tümörün gerçek evresini, derecesini ve cerrahi sınırların temizliğini gösterir; bu rapor sonraki tedavi ihtiyacını belirler. Ameliyattan 6-8 hafta sonra bakılan **PSA'nın ölçülemeyecek düzeye inmesi** beklenir. Ardından PSA ilk yıl 3 ayda bir, sonra 6 ayda bir ve yıllık olarak takip edilir. PSA'nın yeniden yükselmesi durumunda erken dönemde kurtarıcı radyoterapi veya hormonal tedavi gibi etkili seçenekler bulunur; bu yüzden takiplerin aksatılmaması çok önemlidir.

### Robotik Cerrahi Açık Ameliyattan Üstün mü?
Uzun dönem kanser kontrolü açısından deneyimli ellerde açık, laparoskopik ve robotik yöntemler benzer sonuçlar verir. Robotik yöntemin üstünlüğü daha az kan kaybı, daha kısa hastanede kalış, daha az ağrı ve daha hızlı günlük yaşama dönüşte; ayrıca büyütmeli görüntü sayesinde sinir ve sfinkter koruma tekniklerinin daha hassas uygulanabilmesindedir. Sonucu belirleyen en önemli etken teknoloji kadar **cerrahın deneyimi ve vaka sayısıdır**.

${DISCLAIMER}`,
    faq: [
      {
        q: 'Robotik prostat ameliyatı sonrası idrar kaçırma ne kadar sürer?',
        a: 'Sonda alındıktan sonraki ilk haftalarda kaçırma sıktır ve ped kullanılır. Hastaların büyük çoğunluğunda kontrol 3-6 ay içinde, geri kalanların çoğunda 12 ay içinde geri döner. Ameliyat öncesi başlanan pelvik taban egzersizleri iyileşmeyi belirgin hızlandırır.',
      },
      {
        q: 'Prostat kanseri ameliyatından sonra cinsel hayat biter mi?',
        a: 'Hayır. Sinir koruyucu teknik uygulanabilen, genç ve ameliyat öncesi sertleşmesi iyi olan hastalarda fonksiyon aylar içinde kademeli olarak geri döner; bu süreç 1-2 yıla uzayabilir ve ilaç/vakum desteğiyle hızlanır. Boşalmada meni gelmez, ancak orgazm hissi devam eder.',
      },
      {
        q: 'Her prostat kanseri ameliyat gerektirir mi?',
        a: 'Hayır. Düşük riskli, küçük tümörlerde aktif izlem (düzenli PSA, MR ve biyopsi ile takip) çoğu zaman ilk seçenektir. Orta-yüksek riskli lokalize hastalıkta ameliyat ve radyoterapi eşdeğer seçeneklerdir; karar hasta ile birlikte, multidisipliner değerlendirmeyle verilir.',
      },
      {
        q: 'Robotik ameliyatı robot mu yapıyor?',
        a: 'Hayır. Robot hiçbir hareketi kendi başına yapmaz; cerrahın konsoldaki el hareketlerini titremeden arındırıp küçülterek karın içindeki aletlere iletir. 3 boyutlu büyütmeli görüntü ve bilek hareketi yapabilen aletler cerrahın hassasiyetini artırır.',
      },
      {
        q: 'Ameliyat sonrası PSA takibi neden gerekli?',
        a: 'Prostat tamamen çıkarıldığı için PSA’nın ölçülemeyecek düzeye inmesi beklenir. PSA’nın yeniden yükselmesi kanserin nüksettiğinin en erken işaretidir ve bu aşamada kurtarıcı radyoterapi gibi etkili tedaviler uygulanabilir. Takip ilk yıl 3 ayda bir, sonra 6 ayda bir yapılır.',
      },
    ],
    sources: [
      { title: 'EAU-EANM-ESTRO-ESUR-ISUP-SIOG Guidelines: Prostate Cancer', url: 'https://uroweb.org/guidelines/prostate-cancer' },
      { title: 'AUA/ASTRO Guideline: Clinically Localized Prostate Cancer', url: 'https://www.auanet.org/guidelines-and-quality/guidelines/clinically-localized-prostate-cancer-aua/astro-guideline-2022' },
      { title: 'National Cancer Institute: Prostate Cancer Treatment (PDQ)', url: 'https://www.cancer.gov/types/prostate/patient/prostate-treatment-pdq' },
    ],
  },

  // =========================================================================
  // 7. VARİKOSEL
  // =========================================================================
  {
    id: 'varikosel',
    title: 'Varikosel Nedir? Belirtileri ve Mikrocerrahi Tedavisi',
    slug: 'varikosel-belirtileri-ve-tedavisi',
    translations: { EN: 'varicocele-microsurgery-istanbul', RU: 'varikocele-simptomy-mikrohirurgicheskaya-operaciya' },
    excerpt:
      'Erkek kısırlığının en sık düzeltilebilir nedeni olan varikosel, testis toplardamarlarının genişlemesidir. Kimlerde ameliyat gerekir, mikrocerrahi neden altın standarttır ve sperm değerleri ne zaman düzelir?',
    category: 'Androloji',
    date: '14 Eylül 2026',
    datePublished: '2026-09-14',
    dateModified: '2026-09-14',
    readTime: '7',
    author: AUTHOR,
    keywords:
      'varikosel nedir, varikosel belirtileri, varikosel ameliyatı, mikroskopik varikoselektomi, varikosel kısırlık, testis damar genişlemesi, sperm sayısı düşüklüğü, erkek infertilitesi istanbul',
    metaDescription:
      'Varikosel nedir, belirtileri neler, kısırlığa neden olur mu ve mikrocerrahi varikoselektomi kimlere uygundur? Prof. Dr. Basri Çakıroğlu anlatıyor.',
    relatedService: 'andrology-infertility',
    content: `### Varikosel Nedir?
Varikosel, testisten kanı taşıyan toplardamar ağının (pampiniform pleksus) tıpkı bacaklardaki varis gibi genişleyip kıvrımlı hâle gelmesidir. Damar kapakçıklarının yetersizliği nedeniyle kan testise doğru geri kaçar ve göllenir. Anatomik nedenlerle olguların büyük çoğunluğu **sol tarafta** görülür; iki taraflı varikosel de nadir değildir.

Varikosel oldukça yaygındır: genel erkek nüfusun yaklaşık %15'inde bulunur. Ancak asıl önemi üreme sağlığındadır — ilk kez çocuk sahibi olmakta güçlük çeken erkeklerin **%35-40'ında** varikosel saptanır ve erkek kısırlığının en sık düzeltilebilir nedenidir.

### Varikosel Sperm Kalitesini Nasıl Bozar?
Testisler vücut ısısından 2-3 derece daha serin çalışacak şekilde tasarlanmıştır. Göllenen kan testis ısısını yükseltir; ayrıca böbrek ve böbrek üstü bezinden gelen metabolitlerin geri akışı ve oksidatif stres artışı sperm üretimini olumsuz etkiler. Sonuç olarak:
* Sperm sayısında azalma
* Sperm hareketliliğinde düşme
* Şekil bozukluğu olan sperm oranında artış
* Sperm DNA hasarında artış
* Uzun vadede testis hacminde küçülme ve testosteron üretiminde azalma görülebilir.

Varikoseli olan her erkekte kısırlık gelişmez; birçok erkek varikoselinin farkında bile olmadan baba olur. Kimin etkileneceğini önceden kestirmek mümkün değildir; bu nedenle tedavi kararı sperm testi ve klinik bulgularla birlikte verilir.

### Belirtileri Nelerdir?
Varikosel çoğunlukla **belirti vermez** ve infertilite araştırması ya da rutin muayene sırasında fark edilir. Belirti olduğunda:
* Testiste, özellikle uzun süre ayakta kalınca veya gün sonunda artan **künt ağrı ve ağırlık hissi**; yatınca rahatlama
* Torbada "solucan çuvalı" gibi hissedilen veya görülen genişlemiş damarlar
* Etkilenen taraftaki testisin diğerinden küçük olması
* Ergenlerde testis gelişiminde gerilik

### Tanı ve Derecelendirme
Tanı ayakta yapılan fizik muayene ile konur; ıkınma sırasında damarların dolması değerlendirilir. Derecelendirme:
* **Grade 1:** Yalnızca ıkınma ile ele gelir.
* **Grade 2:** Ikınmadan ele gelir, dışarıdan görülmez.
* **Grade 3:** Torbada gözle görülür.
* **Subklinik:** Muayenede saptanmaz, yalnızca ultrasonda görülür; tedavi genellikle önerilmez.

**Skrotal Doppler ultrason** damar çapını ve geri akımı ölçerek tanıyı doğrular, testis hacimlerini karşılaştırır. İnfertilite nedeniyle başvuranlarda en az iki **spermiogram** (sperm analizi) ve gerektiğinde hormon testleri (FSH, testosteron) istenir. Sağ tarafta ani başlayan varikosel, karın içindeki bir kitle olasılığı nedeniyle mutlaka ileri görüntülemeyle araştırılmalıdır.

### Kimlere Ameliyat Önerilir?
Her varikosel ameliyat edilmez. Güncel kılavuzlara göre tedavi şu durumlarda önerilir:
1. **Muayenede saptanan (klinik) varikosel + bozuk sperm parametreleri + çocuk sahibi olamama** — en güçlü endikasyon. Partnerin de değerlendirilmiş olması gerekir.
2. Yaşam kalitesini bozan, diğer nedenleri dışlanmış **kronik testis ağrısı**
3. **Ergenlerde** etkilenen testisin karşı tarafa göre belirgin küçük kalması (büyüme geriliği) veya ilerleyici sperm bozukluğu
4. Sperm sayısı çok düşük (azoospermi/şiddetli oligospermi) erkeklerde, tüp bebek öncesi sperm kalitesini artırmak amacıyla seçilmiş olgular

Sperm değerleri normal olan, çocuk isteği veya ağrısı olmayan erkeklerde ameliyat gerekmez; yıllık kontrol yeterlidir.

### Tedavi Yöntemleri
Amaç, genişlemiş toplardamarların bağlanarak geri akımın durdurulması, bu sırada testisi besleyen atardamarın ve lenf damarlarının korunmasıdır.

**Mikrocerrahi (mikroskopik) subinguinal varikoselektomi:** Kasık kıvrımının hemen altından 2-3 cm'lik bir kesiyle girilir; ameliyat mikroskobu altında 10-15 kat büyütmeyle tüm genişlemiş venler tek tek bağlanır, atardamar ve lenfatikler korunur. Günümüzde **altın standart** kabul edilir: nüks oranı en düşük (%1-2), hidrosel (testis çevresinde sıvı birikimi) riski en az ve sperm değerlerinde iyileşme oranı en yüksek yöntemdir. Genellikle günübirlik yapılır; hasta aynı gün eve döner.

**Laparoskopik varikoselektomi:** Karından girilerek damarların yüksekten bağlanması; iki taraflı olgularda avantajlıdır, ancak nüks ve hidrosel oranı mikrocerrahiden yüksektir.

**Açık (klasik) yöntemler:** Mikroskop kullanılmayan yüksek ligasyon teknikleri; nüks ve hidrosel riski daha fazladır.

**Perkütan embolizasyon:** Girişimsel radyolojide kasıktan kateterle damarın içeriden tıkanması; ameliyat istemeyen veya nüks olgularda seçenektir, teknik başarısızlık oranı biraz daha yüksektir.

### Ameliyat Sonrası Süreç ve Beklentiler
* Hafif ağrı ve şişlik birkaç gün sürer; basit ağrı kesiciler yeterlidir.
* Masa başı işe 2-3 gün, spora 2-3 hafta sonra dönülür; ağır kaldırma ilk haftalarda kısıtlanır.
* Cinsel ilişkiye genellikle 1-2 hafta sonra başlanabilir.
* Sperm üretim döngüsü yaklaşık 3 ay olduğundan ilk kontrol spermiogramı **3. ayda**, sonraki 6. ayda yapılır. Sperm parametrelerinde iyileşme hastaların yaklaşık üçte ikisinde görülür; doğal gebelik oranları artar ve gerekirse tüp bebek başarısı da yükselir.
* Ağrı nedeniyle ameliyat edilenlerin büyük çoğunluğunda ağrı geriler.

Varikosel, erkek kısırlığında "yapılabilecek bir şey yok" düşüncesinin en sık yanlış çıktığı tanılardan biridir. Doğru hasta seçimi ve mikrocerrahi teknikle hem sperm kalitesi hem de baba olma şansı anlamlı ölçüde artırılabilir.

${DISCLAIMER}`,
    faq: [
      {
        q: 'Varikosel kendiliğinden geçer mi?',
        a: 'Hayır, genişlemiş damarlar kendiliğinden düzelmez; ancak her varikosel tedavi de gerektirmez. Sperm değerleri normal, çocuk isteği ve ağrısı olmayan erkeklerde yalnızca yıllık kontrol önerilir.',
      },
      {
        q: 'Varikosel ameliyatı sonrası sperm ne zaman düzelir?',
        a: 'Sperm üretimi yaklaşık 3 aylık bir döngüde gerçekleştiği için ilk anlamlı iyileşme 3. ayda, tam etki 6-12 ayda görülür. Hastaların yaklaşık üçte ikisinde sperm sayısı ve hareketliliği artar.',
      },
      {
        q: 'Varikosel ameliyatı ağrılı mı, kaç günde iyileşilir?',
        a: 'Mikrocerrahi varikoselektomi 2-3 cm’lik kesiyle günübirlik yapılır. Birkaç gün hafif ağrı ve şişlik olur; masa başı işe 2-3 gün, spora 2-3 hafta sonra dönülür.',
      },
      {
        q: 'Varikosel testisi küçültür mü, testosteronu düşürür mü?',
        a: 'Uzun süre tedavi edilmeyen belirgin varikosel etkilenen testiste küçülmeye ve bazı erkeklerde testosteron üretiminde azalmaya yol açabilir. Özellikle ergenlerde testis gelişim geriliği ameliyat nedenlerinden biridir.',
      },
      {
        q: 'Tüp bebek planlanıyorsa varikosel ameliyatı gerekli mi?',
        a: 'Klinik varikoseli ve bozuk sperm değerleri olan erkeklerde tüp bebek öncesi varikosel tedavisi sperm kalitesini ve DNA bütünlüğünü iyileştirerek başarıyı artırabilir; bazı çiftlerde tüp bebek gereksinimini ortadan kaldırabilir. Karar, çiftin yaşı ve kadın faktörü birlikte değerlendirilerek verilir.',
      },
    ],
    sources: [
      { title: 'EAU Guidelines: Sexual and Reproductive Health', url: 'https://uroweb.org/guidelines/sexual-and-reproductive-health' },
      { title: 'AUA/ASRM Guideline: Diagnosis and Treatment of Infertility in Men', url: 'https://www.auanet.org/guidelines-and-quality/guidelines/male-infertility' },
    ],
  },

  // =========================================================================
  // 8. EREKTİL DİSFONKSİYON
  // =========================================================================
  {
    id: 'erektil-disfonksiyon',
    title: 'Sertleşme Sorunu (Erektil Disfonksiyon) Nedenleri',
    slug: 'sertlesme-sorunu-nedenleri-ve-tedavisi',
    translations: { EN: 'erectile-dysfunction-treatment-istanbul', RU: 'erektilnaya-disfunkciya-lechenie-stambul' },
    excerpt:
      'Sertleşme sorunu yalnızca cinsel bir problem değil, çoğu zaman damar sağlığının erken uyarı işaretidir. Nedenleri, hangi tetkiklerin gerektiği ve ilaçtan şok dalgasına, protez cerrahisine kadar tedavi basamakları.',
    category: 'Androloji',
    date: '14 Eylül 2026',
    datePublished: '2026-09-14',
    dateModified: '2026-09-14',
    readTime: '8',
    author: AUTHOR,
    keywords:
      'sertleşme sorunu, erektil disfonksiyon, iktidarsızlık nedenleri, sertleşme sorunu tedavisi, penil doppler, ESWT şok dalga tedavisi, penil protez, mutluluk çubuğu, androloji istanbul',
    metaDescription:
      'Sertleşme sorununun (erektil disfonksiyon) damarsal, hormonal ve psikolojik nedenleri, tanı yöntemleri ve ilaç, şok dalga, enjeksiyon ve penil protez tedavileri. Prof. Dr. Basri Çakıroğlu.',
    relatedService: 'andrology-infertility',
    content: `### Erektil Disfonksiyon Nedir?
Erektil disfonksiyon (ED), tatmin edici bir cinsel ilişki için yeterli sertliğin **sürekli ya da tekrarlayan biçimde** sağlanamaması veya sürdürülememesidir. Herkesin yaşayabileceği tek seferlik başarısızlıklar bu tanıma girmez; sorun en az 3 aydır devam ediyorsa değerlendirilmelidir. 40 yaş üstü erkeklerin yaklaşık yarısında değişen derecelerde görülür ve yaşla sıklığı artar; ancak genç erkeklerde de nadir değildir.

### Sertleşme Nasıl Gerçekleşir?
Sertleşme; beyin, sinirler, hormonlar, damarlar ve penis dokusunun birlikte çalıştığı bir zincirdir. Cinsel uyarı ile penis atardamarları genişler, süngerimsi dokular kanla dolar ve dolan doku toplardamarları sıkıştırarak kanın çıkışını engeller. Bu zincirin herhangi bir halkasındaki sorun sertleşmeyi bozar. Bu yüzden ED "tek bir hastalık" değil, altta yatan bir sorunun belirtisidir.

### Başlıca Nedenler
**Damarsal (en sık neden):** Penis atardamarları vücudun en ince atardamarlarındandır; damar sertliği ilk burada belirti verir. Bu nedenle sertleşme sorunu, kalp damar hastalığından ortalama **2-5 yıl önce** ortaya çıkabilen bir erken uyarıdır. Şeker hastalığı, yüksek tansiyon, kolesterol yüksekliği, sigara ve hareketsizlik başlıca risk faktörleridir.

**Hormonal:** Testosteron düşüklüğü (hipogonadizm), tiroid bozuklukları, prolaktin yüksekliği. Düşük testosteron özellikle cinsel isteği azaltır.

**Nörolojik:** Şeker hastalığına bağlı sinir hasarı, omurilik yaralanmaları, multipl skleroz, Parkinson, pelvik cerrahi (radikal prostatektomi, rektum cerrahisi) ve radyoterapi.

**İlaçlar:** Bazı tansiyon ilaçları (özellikle beta blokerler ve tiyazidler), antidepresanlar, prostat ilaçları (5-alfa redüktaz inhibitörleri), bazı psikiyatrik ilaçlar.

**Psikolojik:** Performans kaygısı, depresyon, stres, ilişki sorunları. Genç erkeklerde daha sık ön plandadır. Sabah ve mastürbasyon sertleşmelerinin korunması psikojenik nedeni düşündürür, ancak psikolojik ve organik nedenler sıklıkla iç içedir.

**Yaşam tarzı:** Sigara, aşırı alkol, obezite, uyku apnesi, hareketsizlik.

**Yapısal:** Peyronie hastalığı (peniste eğrilik yapan plak), travma.

### Tanı Nasıl Konur?
1. **Ayrıntılı öykü:** Sorunun başlangıcı (ani/yavaş), sabah sertleşmeleri, cinsel istek, boşalma, ilişki durumu, kullanılan ilaçlar, sigara-alkol. **IIEF** anketi şiddeti sayısallaştırır.
2. **Fizik muayene:** Penis, testisler, nabızlar, prostat (yaşa göre), ikincil cinsiyet özellikleri.
3. **Kan testleri:** Açlık kan şekeri/HbA1c, lipid profili, sabah **total testosteron**; gerektiğinde prolaktin, tiroid, PSA.
4. **Penil Doppler ultrason:** Penis içine damar genişletici ilaç enjekte edildikten sonra atardamar akımının ve toplardamar kaçağının ölçülmesi. Damarsal nedeni doğrulamada ve tedavi seçiminde en değerli testtir; her hastada gerekmeyebilir.
5. Seçilmiş olgularda gece sertleşme testi, kavernozometri gibi ileri testler.

Sertleşme sorunuyla başvuran her erkekte **kalp damar riski** de değerlendirilmelidir; ED tanısı bazen sessiz bir kalp hastalığının ilk ipucudur.

### Tedavi Basamakları
Tedavi, en az invaziv yöntemden başlayarak hastanın beklentisine ve altta yatan nedene göre kademeli ilerler.

**1. Nedene yönelik tedavi ve yaşam tarzı**
Şeker ve tansiyon kontrolü, kilo verme, sigarayı bırakma, düzenli egzersiz ED'yi tek başına iyileştirebilir; ilaç tedavilerinin etkinliğini de artırır. Sorumlu olabilecek ilaçların hekim kontrolünde değiştirilmesi, testosteron düşüklüğünde uygun hastalarda **testosteron replasmanı** yapılır. Psikojenik bileşen varsa cinsel terapi ve partnerin sürece dahil edilmesi önemlidir.

**2. Ağızdan alınan ilaçlar (PDE5 inhibitörleri)**
Sildenafil, tadalafil, vardenafil ve avanafil bu grubun üyeleridir. Cinsel uyarı olduğunda damar genişlemesini güçlendirirler; kendiliğinden sertleşme yapmazlar. Etkinlikleri yüksektir (hastaların büyük çoğunluğunda yanıt alınır). Tadalafil uzun etki süresiyle günlük düşük doz kullanıma da uygundur. Baş ağrısı, yüzde kızarma, burun tıkanıklığı, hazımsızlık en sık yan etkilerdir. **Nitrat** içeren kalp ilaçlarıyla (isosorbid, nitrogliserin) kesinlikle birlikte kullanılmaz; ciddi tansiyon düşmesine yol açar. Bu ilaçlar hekim reçetesiyle kullanılmalı, internetten satılan sahte ürünlerden kaçınılmalıdır.

**3. Düşük yoğunluklu şok dalga tedavisi (Li-ESWT)**
Penise dıştan uygulanan düşük enerjili ses dalgalarıyla yeni damar oluşumunun uyarılması hedeflenir. Ağrısızdır, anestezi gerektirmez; genellikle haftada 1-2 seans olmak üzere 6-12 seans uygulanır. Hafif-orta şiddette **damarsal** ED'si olan ve ilaca kısmi yanıt veren hastalarda faydalı olabilir; kılavuzlar bunu tüm hastalar için standart değil, seçilmiş hastalarda bir seçenek olarak tanımlar. Uzun dönem kanıtlar hâlâ birikmektedir.

**4. Vakum ereksiyon cihazı**
Penise geçirilen silindirde negatif basınçla kan doldurulup kökte bir halkayla tutulması. İlaçsız, güvenli bir yöntemdir; özellikle prostat ameliyatı sonrası rehabilitasyonda ve ilaç kullanamayan hastalarda değerlidir.

**5. Penis içi enjeksiyon (intrakavernozal tedavi)**
Alprostadil ve kombinasyonlarının ilişki öncesi ince bir iğneyle penis yan tarafına uygulanması. Ağızdan ilaçlara yanıt vermeyen hastalarda etkinliği çok yüksektir; ilk uygulamalar hekim eşliğinde doz ayarlanarak yapılır. Uzamış sertleşme (priapizm) riski nedeniyle doz kurallarına uyulmalıdır.

**6. Penil protez (mutluluk çubuğu)**
Diğer yöntemlerin başarısız veya uygunsuz olduğu hastalarda kalıcı çözümdür. Penis içine yerleştirilen **şişirilebilir** (3 parçalı; torbadaki pompayla şişirilip indirilen, en doğal sonuç) ya da **bükülebilir** (yarı sert) protezlerle istenildiği zaman sertleşme sağlanır. Duyu, orgazm ve boşalma etkilenmez. Hasta ve partner memnuniyeti tüm ED tedavileri içinde en yüksek olan yöntemdir; en önemli risk enfeksiyondur ve modern antibiyotik kaplı protezlerle bu risk düşürülmüştür. Ameliyat 1 saat kadar sürer, hasta 1 gece hastanede kalır ve 4-6 hafta sonra cinsel yaşama döner.

### Ne Zaman Doktora Başvurmalı?
Üç aydan uzun süren sertleşme sorunu, sabah sertleşmelerinin kaybolması, cinsel istekte belirgin azalma, peniste eğrilik veya ağrı, ya da 40 yaş altında başlayan sorun mutlaka değerlendirilmelidir. Sertleşme sorunu utanılacak değil, tedavi edilebilir bir sağlık durumudur — ve çoğu zaman kalp-damar sağlığınızı korumak için değerli bir fırsattır.

${DISCLAIMER}`,
    faq: [
      {
        q: 'Sertleşme sorunu kalp hastalığı belirtisi olabilir mi?',
        a: 'Evet. Penis atardamarları çok ince olduğu için damar sertliği ilk burada belirti verir; sertleşme sorunu kalp damar hastalığından ortalama 2-5 yıl önce ortaya çıkabilir. Bu nedenle ED ile başvuran her erkekte şeker, tansiyon, kolesterol ve kalp riski değerlendirilmelidir.',
      },
      {
        q: 'Sertleşme ilaçları (sildenafil, tadalafil) kalbe zarar verir mi?',
        a: 'Kalp hastalığı stabil olan ve nitrat kullanmayan erkeklerde bu ilaçlar güvenlidir. Kesinlikle nitrat grubu kalp ilaçlarıyla (isosorbid, nitrogliserin) birlikte kullanılmamalıdır. Yakın zamanda kalp krizi geçirenler veya kontrolsüz kalp hastalığı olanlar önce kardiyoloji değerlendirmesinden geçmelidir. İlaçlar mutlaka hekim reçetesiyle alınmalıdır.',
      },
      {
        q: 'Şok dalga (ESWT) tedavisi sertleşme sorununu kalıcı olarak çözer mi?',
        a: 'Hafif-orta şiddette damarsal kaynaklı sertleşme sorununda yeni damar oluşumunu uyararak fayda sağlayabilir; ağrısızdır ve 6-12 seans uygulanır. Ancak her hastada etkili değildir ve kılavuzlar bunu seçilmiş hastalarda bir seçenek olarak tanımlar. Uzun dönem kalıcılığına dair kanıtlar hâlâ birikmektedir.',
      },
      {
        q: 'Penil protez (mutluluk çubuğu) doğal hissettirir mi?',
        a: 'Şişirilebilir 3 parçalı protezler dışarıdan fark edilmez; istenildiğinde şişirilip indirilir. Duyu, orgazm ve boşalma etkilenmez. Hasta ve partner memnuniyeti tüm sertleşme tedavileri içinde en yüksek olan yöntemdir. Cinsel yaşama 4-6 hafta sonra dönülür.',
      },
      {
        q: 'Sertleşme sorunu psikolojik mi, fiziksel mi anlaşılır mı?',
        a: 'Sabah ve mastürbasyon sertleşmelerinin korunması, sorunun ani başlaması ve partnere/duruma göre değişmesi psikolojik nedeni düşündürür. Yavaş ilerleyen, her koşulda görülen ve sabah sertleşmelerinin de azaldığı sorun organik (damarsal, hormonal) nedeni işaret eder. Kesin ayrım için kan testleri ve gerekirse penil Doppler ultrason yapılır; iki neden sıklıkla bir aradadır.',
      },
    ],
    sources: [
      { title: 'EAU Guidelines: Sexual and Reproductive Health', url: 'https://uroweb.org/guidelines/sexual-and-reproductive-health' },
      { title: 'AUA Guideline: Erectile Dysfunction', url: 'https://www.auanet.org/guidelines-and-quality/guidelines/erectile-dysfunction-(ed)-guideline' },
      { title: 'NIDDK: Erectile Dysfunction', url: 'https://www.niddk.nih.gov/health-information/urologic-diseases/erectile-dysfunction' },
    ],
  },

  // =========================================================================
  // 9. HEMATÜRİ
  // =========================================================================
  {
    id: 'hematuri',
    title: 'İdrarda Kan (Hematüri) Neden Olur? Ne Zaman Tehlikeli?',
    slug: 'idrarda-kan-gorulmesi-nedenleri',
    excerpt:
      'İdrarda kan görmek korkutucudur; nedenlerin çoğu enfeksiyon ve taş gibi iyi huylu olsa da ağrısız kanama mesane kanserinin ilk ve bazen tek belirtisidir. Hangi tetkikler gerekir, neden "kendiliğinden geçti" denip beklenmemelidir?',
    category: 'Onkoloji',
    date: '14 Eylül 2026',
    datePublished: '2026-09-14',
    dateModified: '2026-09-14',
    readTime: '6',
    author: AUTHOR,
    keywords:
      'idrarda kan görülmesi, hematüri nedenleri, idrarda kan ağrısız, mikroskobik hematüri, sistoskopi, mesane kanseri belirtileri, idrar tahlilinde eritrosit, üroloji istanbul',
    metaDescription:
      'İdrarda kan görülmesinin nedenleri, ağrılı ve ağrısız kanamanın farkı, mesane kanseri riski ve hangi tetkiklerin gerektiği. Prof. Dr. Basri Çakıroğlu.',
    relatedService: 'urologic-oncology',
    content: `### Hematüri Nedir?
Hematüri, idrarda kan bulunmasıdır. İki şekilde karşımıza çıkar:
* **Makroskopik (gözle görülen) hematüri:** İdrarın pembe, kırmızı, kola rengi ya da çay rengi görülmesi. Bir litre idrarı renklendirmek için 1 ml kan yeterlidir; yani az miktarda kanama bile göze çarpar.
* **Mikroskopik hematüri:** İdrar rengi normalken tahlilde mikroskop altında eritrosit (kırmızı kan hücresi) saptanması. Genellikle check-up ya da başka bir nedenle yapılan tahlilde tesadüfen fark edilir.

Her ikisi de araştırılmayı gerektirir; ancak gözle görülen hematüride ciddi bir hastalık bulunma olasılığı belirgin daha yüksektir.

### İdrar Rengi Her Zaman Kan Anlamına Gelmez
Pancar, böğürtlen, gıda boyaları, bazı ilaçlar (rifampisin, fenazopiridin, nitrofurantoin) ve yoğun egzersiz sonrası kas yıkımı idrarı kırmızı-kahverengiye boyayabilir. Kadınlarda adet kanaması tahlile karışabilir. Bu nedenle ilk adım, idrar tahliliyle gerçekten eritrosit olup olmadığının doğrulanmasıdır.

### Kanamanın Nedenleri
İdrar yolunun herhangi bir noktasından — böbrek, üreter, mesane, prostat, üretra — kanama olabilir. Sık nedenler:

**İyi huylu nedenler**
* **İdrar yolu enfeksiyonu:** Özellikle kadınlarda en sık neden; yanma, sık idrar ve sıkışma eşlik eder.
* **Böbrek ve idrar yolu taşları:** Genellikle şiddetli böğür ağrısıyla birliktedir.
* **İyi huylu prostat büyümesi:** Büyüyen prostatın yüzeyindeki damarlardan kanama; ileri yaş erkeklerde sıktır.
* Yoğun egzersiz (maraton sonrası geçici hematüri), travma
* **Kan sulandırıcı ilaçlar:** Kanamayı kolaylaştırır ama tek başına neden kabul edilmemelidir; ilaç kullanan hastada da altta yatan neden aranır.
* Böbrek kistleri, glomerülonefrit gibi nefrolojik böbrek hastalıkları (idrarda protein ve şekilsiz eritrositlerle birlikte)

**Ciddi nedenler**
* **Mesane kanseri:** Gözle görülen, **ağrısız** ve aralıklı kanama mesane kanserinin en tipik ve çoğu zaman tek belirtisidir. Sigara içenlerde, 50 yaş üstünde ve boya-kimya-lastik endüstrisinde çalışmış kişilerde risk belirgin yüksektir.
* **Böbrek kanseri ve üst idrar yolu (renal pelvis, üreter) tümörleri**
* **Prostat kanseri** (genellikle ileri evrede)

### Neden "Geçti, Bir Daha Olmadı" Denip Beklenmemeli?
Mesane tümöründen kaynaklanan kanama tipik olarak **aralıklıdır**: Birkaç gün kan gelir, sonra haftalarca ya da aylarca hiçbir şey olmaz. Hastaların çoğu ilk kanama kesildiğinde rahatlar ve doktora gitmez; bu gecikme, erken evrede kolayca tedavi edilebilecek bir tümörün kas tabakasına ilerlemesine zaman tanır. Kural basittir: **Gözle görülen her hematüri, tek bir kez bile olsa ve kendiliğinden geçse bile, ürolojik olarak araştırılmalıdır.** Kanamanın ağrısız olması tehlikeyi azaltmaz, aksine artırır.

### Değerlendirme Nasıl Yapılır?
1. **Tam idrar tahlili ve mikroskopi:** Eritrosit varlığı ve sayısı; protein ve şekil bozukluğu nefrolojik nedeni düşündürür.
2. **İdrar kültürü:** Enfeksiyon varsa tedavi edilir ve tahlil **6 hafta sonra tekrarlanır**; kanama enfeksiyon tedavisine rağmen sürüyorsa araştırma devam eder.
3. **Kan testleri:** Böbrek fonksiyonu, PSA (erkeklerde), pıhtılaşma testleri
4. **Görüntüleme:** Böbrekleri ve üst idrar yollarını göstermek için **BT ürografi** (kontrastlı tomografi) en kapsamlı yöntemdir; böbrek fonksiyonu bozuk veya kontrast alerjisi olanlarda ultrason ve MR ürografi kullanılır.
5. **Sistoskopi:** Mesanenin içinin ince bir kamerayla doğrudan görülmesi. Mesane tümörünü saptamada altın standarttır; görüntüleme yöntemleri küçük ve yüzeysel tümörleri kaçırabilir. Lokal anestezik jel ile muayenehane koşullarında, birkaç dakikada yapılır; bükülebilir sistoskoplarla rahatsızlık azdır.
6. **İdrar sitolojisi:** İdrarda kanser hücresi aranması; yüksek dereceli tümörlerde faydalıdır, negatif olması tümörü dışlamaz.

Gözle görülen hematürisi olan her erişkinde, riskten bağımsız olarak sistoskopi ve üst sistem görüntülemesi önerilir. Mikroskopik hematüride ise yaş, sigara, kanama miktarı gibi faktörlere göre düşük/orta/yüksek risk sınıflaması yapılır ve tetkik kapsamı buna göre belirlenir.

### Tetkikler Normal Çıkarsa?
Kapsamlı değerlendirmede neden bulunamayan mikroskopik hematüri seyrek değildir. Bu hastalarda idrar tahlili yıllık olarak tekrarlanır; kanama artarsa, gözle görülür hâle gelirse veya yeni belirtiler eklenirse değerlendirme yenilenir. Nefrolojik nedenler için gerekirse nefroloji görüşü alınır.

### Hangi Belirtiler Aciliyet Gerektirir?
* Pıhtılı, yoğun kanama ve idrar yapamama (pıhtı tıkanıklığı)
* Ateş ve titremeyle birlikte kanama
* Şiddetli böğür ağrısı
* Kan sulandırıcı kullanırken başlayan yoğun kanama
* Halsizlik, çarpıntı, baş dönmesi (kan kaybı belirtileri)

İdrarda kan görülmesi çoğu zaman iyi huylu bir nedene bağlıdır — ama bunu bilmenin tek yolu araştırmaktır. Erken evrede yakalanan mesane ve böbrek tümörlerinde tedavi başarısı yüksektir; geç kalınan olgularda ise seçenekler daralır. Ağrısız, aralıklı kanamayı asla göz ardı etmeyin.

${DISCLAIMER}`,
    faq: [
      {
        q: 'İdrarda ağrısız kan görülmesi ne anlama gelir?',
        a: 'Ağrısız ve aralıklı gözle görülen kanama, mesane kanserinin en tipik belirtisidir; özellikle sigara içen ve 50 yaş üstü kişilerde. Enfeksiyon ve taş gibi nedenlerde genellikle ağrı veya yanma eşlik eder. Ağrısız kanama tek bir kez olsa ve kendiliğinden geçse bile sistoskopi ve görüntüleme ile araştırılmalıdır.',
      },
      {
        q: 'İdrar tahlilinde eritrosit çıkması (mikroskobik hematüri) ciddi midir?',
        a: 'Çoğunlukla iyi huylu bir nedene bağlıdır, ancak göz ardı edilmemelidir. Önce enfeksiyon, adet kanaması ve egzersiz gibi geçici nedenler dışlanır ve tahlil tekrarlanır. Kalıcı ise yaş, sigara ve kanama miktarına göre risk sınıflaması yapılarak ultrason/BT ve gerekirse sistoskopi planlanır.',
      },
      {
        q: 'Sistoskopi ağrılı mıdır?',
        a: 'Bükülebilir sistoskopla, idrar kanalına uygulanan lokal anestezik jel sonrası birkaç dakikada yapılır. Hastalar genellikle hafif bir yanma ve baskı hissi tarif eder; ağrı beklenmez. İşlemden sonra 1-2 gün hafif yanma ve pembe idrar olabilir.',
      },
      {
        q: 'Kan sulandırıcı kullanıyorum, idrarda kan bundan mı?',
        a: 'Kan sulandırıcılar var olan bir kanama kaynağını görünür kılar, ancak tek başına neden kabul edilmez. Bu ilaçları kullanan hastalarda da altta yatan tümör, taş veya prostat kaynaklı kanama aynı ciddiyetle araştırılmalıdır. İlacı kendi kararınızla kesmeyin.',
      },
      {
        q: 'İdrarda kan için hangi doktora gidilir?',
        a: 'Üroloji uzmanına. Üroloji, böbrekten üretraya tüm idrar yolunun değerlendirilmesini (idrar tahlili, görüntüleme ve sistoskopi) yapar. Tahlilde protein ve şekilsiz eritrosit gibi böbrek süzme hastalığı bulguları varsa nefroloji ile birlikte değerlendirme yapılır.',
      },
    ],
    sources: [
      { title: 'AUA/SUFU Guideline: Microhematuria', url: 'https://www.auanet.org/guidelines-and-quality/guidelines/microhematuria' },
      { title: 'EAU Guidelines: Non-muscle-invasive Bladder Cancer', url: 'https://uroweb.org/guidelines/non-muscle-invasive-bladder-cancer' },
      { title: 'NIDDK: Hematuria (Blood in the Urine)', url: 'https://www.niddk.nih.gov/health-information/urologic-diseases/hematuria-blood-urine' },
    ],
  },

  // =========================================================================
  // 10. AMELİYATSIZ BÖBREK TAŞI TEDAVİSİ (ESWL)
  // Kaynak esini: Hisar Hospital "böbrek taşı tedavisi" açılış sayfası
  // (yalnızca konu/başlık seçimi; metin özgün — kopya içerik hem telif hem
  // Google'da çift içerik sorunu). Mevcut "böbrek taşı nasıl düşer" yazısıyla
  // çakışmasın diye yalnızca ESWL'e odaklanır ve ona iç bağlantı verir.
  // =========================================================================
  {
    id: 'eswl-ameliyatsiz-bobrek-tasi',
    title: 'ESWL ile Ameliyatsız Böbrek Taşı Kırma: Kimlere Uygun?',
    slug: 'ameliyatsiz-bobrek-tasi-tedavisi-eswl',
    excerpt:
      'ESWL, kesi ve anestezi olmadan vücut dışından gönderilen şok dalgalarıyla böbrek taşını kırma yöntemidir. Hangi taşlarda işe yarar, hangi durumlarda uygun değildir, işlem ve sonrası nasıl geçer, başarı oranı gerçekte nedir?',
    category: 'Taş Hastalıkları',
    date: '19 Eylül 2026',
    datePublished: '2026-09-19',
    dateModified: '2026-09-19',
    readTime: '7',
    author: AUTHOR,
    keywords:
      'ameliyatsız böbrek taşı tedavisi, ESWL, böbrek taşı kırdırma, şok dalgasıyla taş kırma, taş kırma seansı, ESWL başarı oranı, ESWL sonrası, böbrek taşı kırma istanbul',
    metaDescription:
      'Ameliyatsız böbrek taşı tedavisi (ESWL) nedir, hangi taşlarda uygundur, işlem nasıl yapılır, kaç seans gerekir, başarı oranı ve yan etkileri nelerdir? Prof. Dr. Basri Çakıroğlu anlatıyor.',
    relatedService: 'stone-disease',
    content: `### "Ameliyatsız" Ne Demek?
Böbrek taşı tedavisinde "ameliyatsız" sözüyle kastedilen yöntem **ESWL**'dir (Extracorporeal Shock Wave Lithotripsy — vücut dışından şok dalgasıyla taş kırma). Cilde dokunan bir cihaz başlığından gönderilen yüksek enerjili ses dalgaları böbrekteki taşa odaklanır ve taşı idrarla atılabilecek küçük parçalara ayırır. Vücuda hiçbir kesi yapılmaz, idrar yolundan alet sokulmaz, çoğu hastada genel anestezi gerekmez.

ESWL 1980'lerden beri kullanılan, iyi tanımlanmış bir yöntemdir. Ancak "ameliyatsız" olması her taş için doğru seçenek olduğu anlamına gelmez; hangi hastada işe yarayacağı taşın boyutuna, yerine, sertliğine ve hastanın özelliklerine bağlıdır. Bu yazı, ESWL'i abartmadan da küçümsemeden anlatmayı amaçlıyor.

### ESWL Kimler İçin Uygundur?
Kılavuzlar ESWL'i özellikle şu durumlarda önerir:
* Böbrek içinde, **2 cm'den küçük** taşlar (en iyi sonuçlar 1 cm altında alınır)
* Üreterin üst kısmındaki, **1 cm'den küçük** taşlar
* Tomografide **düşük yoğunluklu** (yumuşak) görünen taşlar — sert taşlar (kalsiyum oksalat monohidrat, sistin, bazı brushit taşları) şok dalgasına dirençlidir
* Böbreğin üst ve orta bölümündeki taşlar; alt kutup (alt kaliks) taşlarında kırılan parçaların düşmesi yerçekimine karşı olduğu için başarı daha düşüktür
* Anestezi almak istemeyen veya anestezi riski yüksek olan, taşı uygun boyutta hastalar

### ESWL Hangi Durumlarda Uygulanmaz?
* **Gebelik** — kesin kontrendikasyon
* Kontrol edilemeyen **kanama bozuklukları** ve kesilemeyen kan sulandırıcı kullanımı (böbrekte kanama riski)
* Tedavi edilmemiş **idrar yolu enfeksiyonu**
* Taşın altında idrar akımını engelleyen **darlık veya tıkanıklık** — parçalar düşemez
* Taş bölgesinin yakınında **anevrizma**
* Belirgin obezite — şok dalgası taşa odaklanamaz ve etkisi azalır
* 2 cm'den büyük taşlar ve böbreği dolduran koraliform taşlar — bu grupta PNL ya da RIRS tercih edilir

### İşlem Nasıl Yapılır?
1. İşlem öncesi idrar tahlili, kültür, kan testleri ve taşın konumunu gösteren görüntüleme (kontrastsız BT tercih edilir) tamamlanır.
2. Hasta özel bir masaya yatırılır; taş ultrason veya röntgen (floroskopi) ile bulunur ve cihaz taşa odaklanır.
3. Ciltle cihaz arasına jel sürülür. 30-45 dakika boyunca genellikle 2.000-3.500 şok dalgası, düşük enerjiden başlayıp kademeli artırılarak gönderilir.
4. Ağrı kişiden kişine değişir: çoğu hasta hafif-orta bir vurma hissi tarif eder ve **ağrı kesici ya da hafif sedasyon** ile rahat tamamlar. "Tamamen ağrısız" demek doğru değildir; ancak ağrı kontrol edilebilir düzeydedir.
5. İşlemden sonra 1-2 saat gözlemin ardından hasta aynı gün evine döner.

### ESWL Sonrası Neler Beklenir?
* İlk 1-3 gün **idrarda kan** görülmesi normaldir.
* Kırılan parçalar günler-haftalar içinde idrarla düşer; bu sırada **kolik tipi ağrı** olabilir. Ağrı kesici ve bol su içme (günde 2,5-3 litre) süreci kolaylaştırır; hekimin verdiği alfa bloker ilaç parçaların düşmesini hızlandırır.
* Sırtta cihazın uygulandığı bölgede geçici morarma ve hassasiyet görülebilir.
* Düşen parçaların **süzgeçle toplanıp analize** gönderilmesi, taşın türünü ve korunma planını belirlemek için önemlidir.
* 2-4 hafta sonra kontrol görüntülemesiyle taşın tamamen temizlenip temizlenmediği değerlendirilir.

### Kaç Seans Gerekir, Başarı Oranı Nedir?
Tek seansla taşsızlık her hastada sağlanamaz. Kılavuz verilerine göre 1 cm altındaki böbrek taşlarında taşsızlık oranı yaklaşık **%70-90**, 1-2 cm arasında **%50-70** civarındadır; alt kutup taşlarında ve sert taşlarda bu oranlar düşer. Hastaların bir kısmında **2-3 seans** gerekir; seanslar arasında genellikle 1-2 hafta beklenir. Üç seansa rağmen kırılmayan taşta ısrar edilmez, RIRS veya PNL'ye geçilir.

Karşılaştırma için: idrar yolundan bükülebilir endoskopla girilip lazerle kırma (RIRS) tek seansta daha yüksek taşsızlık sağlar, ancak genel anestezi gerektirir ve genellikle geçici bir stent bırakılır. ESWL'in gücü **anestezisiz, kesisiz ve günübirlik** olmasıdır; RIRS'in gücü ise **tek seansta kesin sonuç**tur. Hangi yöntemin seçileceği, taşın özellikleri kadar hastanın tercihine de bağlıdır.

### Olası Yan Etkiler
ESWL güvenli bir yöntemdir; yine de bilinmesi gereken riskler vardır:
* **Taş yolu (steinstrasse):** Kırılan parçaların üreterde birikip tıkanıklık yapması; büyük taşlarda daha sık, bazen stent veya üreteroskopi gerektirir.
* **Enfeksiyon** ve ateş — özellikle enfeksiyon taşlarında; işlem öncesi kültür bu yüzden önemlidir.
* Nadiren böbrek çevresinde **kanama (hematom)** — kan sulandırıcı kullananlarda ve tansiyonu kontrolsüz olanlarda risk artar.
* Tekrarlayan yüksek sayıda seansın böbrek dokusuna etkisi tartışmalıdır; bu nedenle seans sayısı sınırlı tutulur.

### Taşın Tekrarlamasını Önlemek
ESWL taşı kırar ama taş oluşturan nedeni ortadan kaldırmaz. Bir kez taş oluşturan kişide 5-10 yıl içinde yeniden taş görülme ihtimali yüksektir. Günde en az 2,5 litre su, tuzun ve aşırı hayvansal proteinin azaltılması, kalsiyumun **kısıtlanmaması**, limon gibi sitrat kaynakları ve düşen taşın analizine göre gerekirse ilaç tedavisi, korunmanın temelidir. Taş düşürme süreci, acil durumlar ve diğer tedavi yöntemleri için [böbrek taşı belirtileri ve tedavisi](/blog/bobrek-tasi-belirtileri-nasil-duser) yazımıza da göz atabilirsiniz.

${DISCLAIMER}`,
    faq: [
      {
        q: 'ESWL (taş kırma) ağrılı mıdır?',
        a: 'Çoğu hasta işlem sırasında hafif-orta şiddette bir vurma hissi tarif eder; ağrı kesici veya hafif sedasyonla rahat tamamlanır. Tamamen ağrısız değildir, ancak kontrol edilebilir düzeydedir. Sonraki günlerde parçalar düşerken kolik tipi ağrı olabilir.',
      },
      {
        q: 'ESWL hangi boyuttaki taşlarda uygulanır?',
        a: 'Böbrekte 2 cm’den küçük (en iyi sonuç 1 cm altında) ve üst üreterde 1 cm’den küçük taşlarda uygulanır. Daha büyük taşlarda, çok sert taşlarda ve alt kutup taşlarında başarı düşer; bu durumlarda RIRS veya PNL tercih edilir.',
      },
      {
        q: 'Taş kırma kaç seans sürer?',
        a: 'Küçük ve yumuşak taşlar çoğunlukla tek seansta kırılır; hastaların bir kısmında 1-2 hafta arayla 2-3 seans gerekir. Üç seansa rağmen kırılmayan taşta ESWL’de ısrar edilmez, endoskopik yönteme geçilir.',
      },
      {
        q: 'ESWL sonrası idrarda kan normal mi?',
        a: 'Evet. İlk 1-3 gün idrarda kan görülmesi beklenen bir durumdur ve kendiliğinden geçer. Yoğun pıhtılı kanama, 38°C üzeri ateş veya geçmeyen şiddetli ağrı olursa hekime başvurulmalıdır.',
      },
      {
        q: 'Kan sulandırıcı kullanıyorum, ESWL yaptırabilir miyim?',
        a: 'Kesilemeyen kan sulandırıcı kullanımı ESWL için sakıncalıdır çünkü böbrekte kanama riski artar. Bu hastalarda idrar yolundan lazerle kırma (RIRS) daha güvenli seçenektir; karar hekiminizle birlikte, ilaçların kesilip kesilemeyeceğine göre verilir.',
      },
    ],
    sources: [
      { title: 'EAU Guidelines: Urolithiasis', url: 'https://uroweb.org/guidelines/urolithiasis' },
      { title: 'AUA Guideline: Surgical Management of Stones', url: 'https://www.auanet.org/guidelines-and-quality/guidelines/kidney-stones-surgical-management-guideline' },
      { title: 'NIDDK: Kidney Stones — Treatment', url: 'https://www.niddk.nih.gov/health-information/urologic-diseases/kidney-stones/treatment' },
    ],
  },
  // =========================================================================
  // 11. İDRAR YOLU ENFEKSİYONU (İYE)
  //
  // Panelden (Firestore) eklenmişti; slug'ı bozuktu
  // ("...-ve-tedavi-yntemleri"), başlığı 60 karakteri aştığı için SERP'te
  // ortasından kesiliyordu, FAQ şeması ve iç bağlantısı yoktu. 90 günde 660
  // gösterim alıp SIFIR tıklama getiriyordu. Metin hekimin kendi yazısıdır,
  // BİREBİR korundu; yalnızca ambalaj düzeltildi (15 Kas 2026).
  //
  // Başlıkta "İYE" kısaltması bilinçli: "iye nedir" / "ıye nedir" / "yye
  // nedir" sorguları tek başına 116 gösterim getiriyor ama kısaltma hiçbir
  // yerde geçmediği için tıklanmıyordu.
  // =========================================================================
  {
    id: 'idrar-yolu-enfeksiyonu-iye',
    title: 'İdrar Yolu Enfeksiyonu (İYE): Belirtileri ve Tedavisi',
    slug: 'idrar-yolu-enfeksiyonu-iye-belirtileri-tedavisi',
    excerpt:
      'İdrar yolu enfeksiyonu (İYE) nedir, belirtileri nelerdir? İdrarda yanma, sık idrara çıkma ve kasık ağrısı gibi şikayetlerin nedenleri ve güncel tedavi yöntemlerini Prof. Dr. Basri Çakıroğlu anlatıyor.',
    category: 'İdrar Yolu Enfeksiyonu',
    date: '3 Eylül 2026',
    datePublished: '2026-09-03',
    dateModified: '2026-11-15',
    readTime: '5',
    author: AUTHOR,
    keywords:
      'idrar yolu enfeksiyonu, İYE nedir, iye nedir tıp, idrarda yanma, sık idrara çıkma, sistit, piyelonefrit, idrar yolu enfeksiyonu belirtileri, erkeklerde idrar yolu enfeksiyonu, idrar kültürü',
    metaDescription:
      'İdrar yolu enfeksiyonu (İYE) nedir, belirtileri nelerdir? İdrarda yanma, sık idrara çıkma ve kasık ağrısının nedenleri ile tanı ve tedavi süreci. Prof. Dr. Basri Çakıroğlu.',
    content: `İdrar yolu enfeksiyonu (İYE), boşaltım sistemini oluşturan böbrekler, idrar boruları (üreterler), mesane ve idrar kanalı (üretra) gibi organların bakteriyel etkenlerle iltihaplanması durumudur. Hem kadınlarda hem de erkeklerde sıklıkla karşılaşılan bu rahatsızlık, yaşam kalitesini olumsuz etkilemekle birlikte zamanında müdahale edilmediğinde daha ciddi sağlık sorunlarına yol açabilir.

Üroloji pratiğimizde en sık karşılaştığımız alt üriner sistem enfeksiyonlarından biri sistit (mesane iltihabı) iken, böbrekleri tutan üst üriner sistem enfeksiyonları ise piyelonefrit olarak adlandırılır.

### İdrar Yolu Enfeksiyonu Belirtileri Nelerdir?

İdrar yolu enfeksiyonları başlangıçta hafif seyretse de ilerledikçe belirgin rahatsızlıklara sebep olur. En yaygın klinik belirtiler şunlardır:

* İdrar Yaparken Yanma ve Sızlama: En karakteristik belirtidir.
* Sık İdrara Çıkma İsteği: Kişinin sürekli tuvalete gitme ihtiyacı hissetmesine rağmen çok az miktarda idrar yapabilmesi.
* Bulanık veya Kötü Kokulu İdrar: Enfeksiyonun varlığına işaret eden idrar yapısı değişiklikleri.
* Kasık ve Alt Karın Ağrısı: Özellikle mesane bölgesinde hissedilen baskı ve rahatsızlık.
* İdrarda Kan Görülmesi: İdrarın pembe, kırmızı ya da koyu renkte olması.

Yüksek ateş, titreme, sırt veya yan ağrısı (böbrek bölgesinde), bulantı ve kusma gibi şikayetler eklenmişse enfeksiyon böbreklere ulaşmış olabilir. Bu durumda gecikmeden bir üroloji uzmanına muayene olunmalıdır.

### İdrar Yolu Enfeksiyonu Neden Olur? Risk Faktörleri

Enfeksiyonların büyük çoğunluğuna Escherichia coli (E. coli) bakterisi neden olur. Bakterilerin dış idrar kanalından girip yukarı doğru ilerlemesiyle tablo gelişir.

Risk artışına neden olan temel faktörler şunlardır:

* Anatomik Yapı: Kadınlarda üretra erkeklere göre belirgin şekilde daha kısadır; bu durum bakterilerin mesaneye ulaşmasını kolaylaştırır.
* Yetersiz Sıvı Tüketimi: Az su içilmesi, idrar yolunun doğal olarak yıkanıp bakterilerden temizlenmesini engeller.
* İdrarı Tutma Alışkanlığı: İdrarın mesanede uzun süre beklemesi bakteriyel çoğalmayı tetikler.
* Böbrek Taşları ve Tıkanıklıklar: İdrar akışını engelleyen taşlar veya erkeklerde prostat büyümeleri enfeksiyon riskini artırır.
* Hijyen Hataları: Yanlış tuvalet temizliği bakterilerin idrar yoluna taşınmasına yol açabilir.

Erkeklerde idrar yolu enfeksiyonu kadınlara göre daha seyrek görülür; bu nedenle erkeklerde ortaya çıkan bir enfeksiyon altta yatan bir nedeni (prostat büyümesi, taş, darlık) düşündürür ve mutlaka araştırılmalıdır. Tekrarlayan enfeksiyonlar için de aynı kural geçerlidir — [böbrek taşı](/blog/bobrek-tasi-belirtileri-nasil-duser) ve [prostat büyümesi](/blog/prostat-buyumesi-belirtileri-ve-tedavisi) en sık karşılaşılan zeminlerdir.

### İdrar Yolu Enfeksiyonu Tanı ve Tedavi Süreci

İdrar yolu enfeksiyonunun teşhisi, hastanın şikayetlerinin değerlendirilmesi, Tam İdrar Tahlili (TİT) ve gerekli durumlarda İdrar Kültürü testi ile koyulur. Kültür testi sayesinde enfeksiyona neden olan bakteri türü ve bu bakteriye etkili en uygun antibiyotik tespit edilir.

* Antibiyotik Tedavisi: Bakteriyel enfeksiyonların temel tedavisi doğru antibiyotik kullanımıdır. Hekim tarafından reçete edilen antibiyotiklerin, semptomlar geçse bile önerilen süre boyunca düzenli kullanılması nüksleri önlemek açısından şarttır.
* Bol Sıvı Alımı: Tedavi sürecinde bol su tüketilmesi, bakterilerin sistemden atılmasını hızlandırır.
* Destekleyici Yöntemler: Ağrı ve spazmı hafifletmek amacıyla doktor kontrolünde semptomatik ilaçlar reçete edilebilir.

Enfeksiyon sırasında idrarda kan görülmesi sık rastlanan bir bulgudur ve tedaviyle birlikte geriler. Ancak enfeksiyon geçtikten sonra da devam eden kanama farklı bir nedeni işaret edebilir; bu durumda [idrarda kan görülmesi](/blog/idrarda-kan-gorulmesi-nedenleri) ayrı olarak değerlendirilmelidir.

### İdrar Yolu Enfeksiyonundan Korunma Yolları

* Günlük en az 2-2,5 litre su tüketmeye özen gösterin.
* İdrarınızı uzun süre tutmayın, sıkışma hissettiğinizde bekletmeden tuvalete gidin.
* Tuvalet temizliğini daima önden arkaya doğru gerçekleştirin.
* Islak mayo ve nemli kıyafetlerle uzun süre kalmamaya özen gösterin.

Sağlıklı bir üriner sistem için düzenli ürolojik kontrollerinizi aksatmamanız önem taşımaktadır. İdrar yollarınızda sürekli tekrarlayan veya geçmeyen şikayetleriniz varsa kişiye özel değerlendirme ve doğru tedavi planı için kliniğimize başvurabilirsiniz.

${DISCLAIMER}`,
    faq: [
      {
        q: 'İYE ne demek?',
        a: 'İYE, idrar yolu enfeksiyonunun kısaltmasıdır. Böbrekler, üreterler, mesane ve üretradan oluşan idrar yollarının bakteriyel iltihaplanmasını tanımlar. Mesaneyi tutan alt üriner sistem enfeksiyonuna sistit, böbrekleri tutan üst üriner sistem enfeksiyonuna piyelonefrit denir.',
      },
      {
        q: 'İdrar yolu enfeksiyonu kasık ağrısı yapar mı?',
        a: 'Evet. Kasık ve alt karın bölgesinde hissedilen baskı ve ağrı, idrar yolu enfeksiyonunun yaygın belirtilerindendir ve genellikle mesane bölgesinde hissedilir. Ağrıya sırt veya yan ağrısı, yüksek ateş ve titreme eklendiyse enfeksiyon böbreklere ulaşmış olabilir; bu durumda gecikmeden başvurulmalıdır.',
      },
      {
        q: 'İdrar yolu enfeksiyonu kendiliğinden geçer mi?',
        a: 'Hafif tablolar bol sıvı alımıyla gerileyebilir, ancak bakteriyel enfeksiyonun temel tedavisi uygun antibiyotiktir. Tedavi edilmeyen enfeksiyon böbreklere ilerleyebilir. Reçete edilen antibiyotik, şikâyetler geçse bile önerilen süre boyunca tamamlanmalıdır; yarıda bırakmak nüksü kolaylaştırır.',
      },
      {
        q: 'Erkeklerde idrar yolu enfeksiyonu neden olur?',
        a: 'Erkeklerde üretra daha uzun olduğu için enfeksiyon kadınlara göre seyrek görülür. Bu nedenle erkekte ortaya çıkan bir enfeksiyon çoğunlukla altta yatan bir nedene işaret eder: prostat büyümesi, böbrek veya mesane taşı, idrar yolu darlığı ya da mesanenin tam boşalamaması. Bu yüzden erkeklerde İYE mutlaka araştırılmalıdır.',
      },
      {
        q: 'İdrar kültürü neden isteniyor?',
        a: 'Tam idrar tahlili enfeksiyonun varlığını gösterir; idrar kültürü ise enfeksiyona hangi bakterinin yol açtığını ve bu bakteriye hangi antibiyotiğin etkili olduğunu belirler. Özellikle tekrarlayan enfeksiyonlarda, erkeklerde ve tedaviye yanıt alınamayan durumlarda kültür sonucu doğru antibiyotiği seçmek için gereklidir.',
      },
    ],
    sources: [
      { title: 'EAU Guidelines: Urological Infections', url: 'https://uroweb.org/guidelines/urological-infections' },
      { title: 'NIDDK: Bladder Infection (Urinary Tract Infection) in Adults', url: 'https://www.niddk.nih.gov/health-information/urologic-diseases/bladder-infection-uti-in-adults' },
    ],
  },

  // =========================================================================
  // 12. PROSTAT KANSERİ
  //
  // Firestore'dan taşındı. Slug bozuktu ("...risk-faktrleri-ve-tedavi-
  // yntemleri"), başlık kırpılıyordu, FAQ şeması yoktu. Metinde ayrıca
  // RENDER HATASI vardı: ana bölümler "##" ile yazılmıştı, oysa
  // BlogPage.renderArticleContent yalnızca "###" tanıyor — başlıklar
  // sayfada ham "## Prostat Nedir?" olarak basılıyor ve içindekiler
  // listesine girmiyordu. Tümü "###"e çevrildi (15 Kas 2026).
  // Metin hekimin kendi yazısıdır, içerik olarak değiştirilmedi.
  // =========================================================================
  {
    id: 'prostat-kanseri-belirtileri-tedavisi',
    title: 'Prostat Kanseri Nedir? Belirtileri ve Tedavi Yöntemleri',
    slug: 'prostat-kanseri-belirtileri-tanisi-ve-tedavisi',
    excerpt:
      'Prostat kanseri, erkeklerde en sık görülen kanser türlerinden biridir. Erken dönemde çoğu zaman belirti vermediği için düzenli kontroller büyük önem taşır. Belirtiler, risk faktörleri, tanı yöntemleri ve tedavi seçenekleri.',
    category: 'Prostat Kanseri',
    date: '26 Temmuz 2026',
    datePublished: '2026-07-26',
    dateModified: '2026-11-15',
    readTime: '10',
    author: AUTHOR,
    keywords:
      'prostat kanseri, prostat kanseri belirtileri, prostat kanseri tedavisi, PSA testi, multiparametrik prostat MR, prostat biyopsisi, radikal prostatektomi, prostat kanseri taraması, prostat kanseri risk faktörleri',
    metaDescription:
      'Prostat kanseri belirtileri, risk faktörleri, PSA ve MR ile tanı, radikal prostatektomi ve diğer tedavi seçenekleri. Tarama ne zaman başlamalı? Prof. Dr. Basri Çakıroğlu.',
    relatedService: 'urologic-oncology',
    content: `Bu yazıda prostat kanserinin ne olduğu, belirtileri, risk faktörleri, tanı yöntemleri ve güncel tedavi seçenekleri hakkında merak edilenleri ele alıyoruz.

### Prostat Nedir?

Prostat, yalnızca erkeklerde bulunan ve üreme sisteminin önemli bir parçası olan yaklaşık 15-20 gram ağırlığında bir bezdir. Mesanenin hemen altında yer alır ve içinden idrar kanalı geçer.

Prostatta görülebilen başlıca üç hastalık şunlardır:

* Prostat iltihabı (Prostatit)
* İyi huylu prostat büyümesi (BPH)
* Prostat kanseri

Bu yazının konusu olan prostat kanseri, prostat hücrelerinin kontrolsüz şekilde çoğalması sonucu gelişen kötü huylu bir tümördür. İyi huylu prostat büyümesi ise kanser değildir ve ayrı bir hastalıktır; ayrıntısı için [prostat büyümesi belirtileri ve tedavisi](/blog/prostat-buyumesi-belirtileri-ve-tedavisi) yazısına bakabilirsiniz.

### Prostat Kanseri Nasıl Gelişir?

Prostat kanseri genellikle yaşın ilerlemesiyle birlikte ortaya çıkar. Özellikle 50 yaşından sonra prostat hücrelerinde meydana gelen genetik değişiklikler kanser gelişimine zemin hazırlayabilir. Hastalık çoğu zaman yavaş ilerlese de bazı hastalarda daha agresif seyredebilir.

### Prostat Kanserinin Belirtileri Nelerdir?

Prostat kanseri erken evrede çoğunlukla hiçbir belirti vermez. Bu nedenle birçok hasta yalnızca düzenli tarama sırasında tanı alır.

Hastalık ilerlediğinde görülebilecek belirtiler şunlardır:

* Sık idrara çıkma
* İdrar yaparken yanma
* Kesik kesik idrar yapma
* İdrarı tam boşaltamama hissi
* Tekrarlayan idrar yolu enfeksiyonları
* İdrarda kan görülmesi
* İleri evrede kemik ağrıları ve genel sağlık durumunda bozulma

Bu belirtiler yalnızca prostat kanserine özgü değildir. Benzer şikayetler iyi huylu prostat büyümesinde de görülebilir. Kesin tanı için mutlaka üroloji uzmanına başvurulmalıdır.

### Prostat Kanseri İçin Risk Faktörleri

Prostat kanseri riskini artıran birçok faktör bulunmaktadır.

**Yaş.** En önemli risk faktörüdür. Hastalığın görülme sıklığı 50 yaşından sonra belirgin şekilde artar.

**Aile Öyküsü.** Baba, kardeş, amca veya dede gibi birinci derece akrabalarda prostat kanseri bulunması riski önemli ölçüde artırır. Ayrıca ailede meme kanseri öyküsünün bulunması da bazı genetik mutasyonlar nedeniyle risk oluşturabilir.

**Beslenme ve Yaşam Tarzı.** Yağdan zengin beslenme alışkanlıkları ve bazı çevresel faktörlerin prostat kanseri gelişimine katkıda bulunduğu düşünülmektedir.

### Prostat Kanseri Taraması Ne Zaman Başlamalıdır?

Üroloji uzmanları genel olarak:

* **50 yaşından itibaren** her erkeğin yılda bir kez prostat kontrolü yaptırmasını,
* **Ailesinde prostat kanseri öyküsü bulunan kişilerin ise 40 yaşından itibaren** düzenli üroloji kontrollerine başlamasını önermektedir.

Risk grubundaki hastalarda kontroller gerekirse 6 ayda bir planlanabilir.

### Prostat Kanseri Nasıl Teşhis Edilir?

Erken teşhis için uygulanan temel yöntemler şunlardır:

**Dijital Rektal Muayene.** Üroloji uzmanı prostat bezini elle değerlendirerek sertlik veya düzensizlik olup olmadığını kontrol eder.

**PSA Kan Testi.** PSA (Prostat Spesifik Antijen), prostat kanseri taramasında kullanılan en önemli kan testlerinden biridir. Basit bir kan örneğiyle ölçülür ve yaşa göre belirlenen normal değerler dikkate alınarak değerlendirilir. PSA yüksekliğinin her zaman kanser anlamına gelmediğini belirtmek gerekir; ayrıntısı için [PSA yüksekliği ne demek](/blog/psa-yuksekligi-ne-anlama-gelir) yazısına bakabilirsiniz.

**Multiparametrik Prostat MR.** PSA yüksekliği veya muayenede şüpheli bulgu saptanması durumunda multiparametrik prostat MR çekilebilir. Bu görüntüleme yöntemi prostat içerisindeki şüpheli alanların belirlenmesinde oldukça değerlidir.

**Prostat Biyopsisi.** MR sonucunda şüpheli alan tespit edilmesi halinde tanıyı kesinleştirmek amacıyla prostat biyopsisi yapılır. Günümüzde MR hedefli biyopsiler erken tanıda yüksek başarı sağlamaktadır.

### Prostat Kanserinde Erken Teşhis Neden Önemlidir?

Prostat kanseri erken evrede yakalandığında tedavi başarısı oldukça yüksektir. Hastalık prostat dışına yayılmadan teşhis edildiğinde birçok hasta tamamen iyileşebilmektedir.

Geç evrede ise kanser kemiklere veya diğer organlara yayılabilir ve tedavi daha karmaşık hale gelebilir. Bu nedenle düzenli kontroller hayat kurtarıcıdır.

### Prostat Kanserinde Tedavi Seçenekleri

Tedavi yöntemi hastalığın evresine, hastanın yaşına ve genel sağlık durumuna göre belirlenir.

**Cerrahi Tedavi (Radikal Prostatektomi).** Kanser prostat ile sınırlıysa en sık uygulanan tedavi radikal prostatektomidir. Bu ameliyatta prostat tamamen çıkarılır.

Ameliyat şu yöntemlerle gerçekleştirilebilir:

* Açık cerrahi
* Laparoskopik cerrahi
* Robotik cerrahi

Günümüzde robotik ve laparoskopik yöntemler daha küçük kesilerle uygulanabildiği için hastaların iyileşme süreci daha konforlu olabilmektedir. Robotik yöntemin ayrıntısı için [robotik prostat ameliyatı](/blog/robotik-prostat-kanseri-ameliyati) yazısına bakabilirsiniz.

**Radyoterapi.** Cerrahiye uygun olmayan veya belirli hasta gruplarında radyoterapi etkili bir tedavi seçeneğidir.

**İlaç Tedavileri.** İleri evre veya metastatik prostat kanserinde;

* Hormon (antiandrojen) tedavileri
* Kemoterapi
* Diğer sistemik tedaviler

hastalığın kontrol altına alınmasında kullanılabilir.

### Ameliyat Sonrası İyileşme Süreci

İyileşme süresi uygulanan cerrahi yönteme göre değişmektedir.

Açık ameliyat sonrası idrar sondası yaklaşık iki hafta kalabilirken, robotik veya laparoskopik cerrahide bu süre çoğu hastada 7-10 güne kadar düşebilmektedir.

Robotik cerrahi uygulanan hastalar genellikle günlük yaşamlarına ve masa başı işlerine daha kısa sürede dönebilmektedir.

### Ailesinde Prostat Kanseri Olanlar Nelere Dikkat Etmeli?

Aile öyküsü bulunan kişilerde prostat kanseri riski daha yüksektir. Bu nedenle:

* 40 yaşından itibaren üroloji kontrollerine başlanmalıdır.
* PSA testi düzenli yaptırılmalıdır.
* Gerekli görüldüğünde prostat muayenesi ihmal edilmemelidir.
* Doktorun önerisine göre takip aralıkları belirlenmelidir.

Erken tanı sayesinde hastalık henüz belirti vermeden tespit edilebilir.

### Sonuç

Prostat kanseri erkeklerde sık görülen ancak erken teşhis edildiğinde başarıyla tedavi edilebilen bir hastalıktır. Düzenli üroloji kontrolleri, PSA testi ve gerektiğinde ileri görüntüleme yöntemleri sayesinde hastalık erken evrede yakalanabilir.

Özellikle 50 yaş üzerindeki erkeklerin ve ailesinde prostat kanseri öyküsü bulunan kişilerin düzenli sağlık kontrollerini ihmal etmemeleri büyük önem taşımaktadır. Erken tanı, hem tedavi başarısını artırmakta hem de yaşam kalitesinin korunmasına önemli katkı sağlamaktadır.

${DISCLAIMER}`,
    faq: [
      {
        q: 'Prostat kanseri belirti verir mi?',
        a: 'Erken evrede çoğunlukla hiçbir belirti vermez; bu yüzden birçok hasta tanıyı yalnızca düzenli tarama sırasında alır. İlerlediğinde sık idrara çıkma, kesik kesik idrar, idrarda kan ve ileri evrede kemik ağrıları görülebilir. Bu şikâyetler iyi huylu prostat büyümesinde de olur, ayırt etmek için muayene gerekir.',
      },
      {
        q: 'Prostat kanseri taraması kaç yaşında başlamalı?',
        a: 'Genel öneri 50 yaşından itibaren yılda bir kez prostat kontrolüdür. Ailesinde prostat kanseri öyküsü bulunanların 40 yaşından itibaren başlaması önerilir. Risk grubundaki hastalarda kontroller gerekirse 6 ayda bir planlanabilir.',
      },
      {
        q: 'PSA yüksekliği prostat kanseri anlamına gelir mi?',
        a: 'Hayır. PSA prostata özgüdür ama kansere özgü değildir; iyi huylu prostat büyümesi, prostat iltihabı, idrar yolu enfeksiyonu ve hatta bisiklet kullanımı gibi nedenlerle de yükselebilir. Bu yüzden yüksek PSA tek başına tanı koydurmaz, muayene ve gerektiğinde MR ile birlikte değerlendirilir.',
      },
      {
        q: 'Prostat kanseri ameliyatından sonra sonda ne kadar kalır?',
        a: 'Açık ameliyat sonrası idrar sondası yaklaşık iki hafta kalabilirken, robotik veya laparoskopik cerrahide bu süre çoğu hastada 7-10 güne kadar düşebilmektedir. Robotik cerrahi uygulanan hastalar günlük yaşamlarına ve masa başı işlerine genellikle daha kısa sürede dönebilmektedir.',
      },
      {
        q: 'Prostat kanseri tedavi edilebilir mi?',
        a: 'Erken evrede yakalandığında tedavi başarısı oldukça yüksektir ve hastalık prostat dışına yayılmadan teşhis edildiğinde birçok hasta tamamen iyileşebilmektedir. Geç evrede kanser kemiklere veya diğer organlara yayılabilir ve tedavi karmaşıklaşır; bu nedenle düzenli kontroller belirleyicidir.',
      },
    ],
    sources: [
      { title: 'EAU Guidelines: Prostate Cancer', url: 'https://uroweb.org/guidelines/prostate-cancer' },
      { title: 'AUA Guideline: Early Detection of Prostate Cancer', url: 'https://www.auanet.org/guidelines-and-quality/guidelines/early-detection-of-prostate-cancer-guidelines' },
    ],
  },

  // =========================================================================
  // 13. SÜNNET
  //
  // Firestore'dan taşındı. Slug'ı "tm-ynleriyle-snnet" idi — Türkçe
  // karakterler düştüğü için OKUNAKSIZ ve aranabilir değildi. Başlıkları
  // "##" ile yazılmıştı (renderer yalnızca "###" tanıyor), ayrıca metnin
  // başında başlığı tekrar eden bir "# Tüm Yönleriyle Sünnet" satırı vardı;
  // sayfada başlık iki kez görünüyordu (15 Kas 2026).
  // =========================================================================
  {
    id: 'sunnet-rehberi',
    title: 'Sünnet: Ne Zaman Yapılmalı, Yöntemleri ve Riskleri',
    slug: 'sunnet-ne-zaman-yapilmali-yontemleri',
    excerpt:
      'Sünnet, sünnet derisinin cerrahi olarak çıkarılması işlemidir. Uzman hekim tarafından steril hastane ortamında yapıldığında güvenli bir uygulamadır. Doğru zamanlama, uygun cerrahi teknik ve işlem sonrası bakım başarılı bir iyileşme için belirleyicidir.',
    category: 'Sünnet',
    date: '19 Temmuz 2026',
    datePublished: '2026-07-19',
    dateModified: '2026-11-15',
    readTime: '5',
    author: AUTHOR,
    keywords:
      'sünnet, sünnet ne zaman yapılmalı, sünnet yöntemleri, fimozis, parafimozis, hipospadias, sünnet riskleri, yenidoğan sünneti, sünnet yaşı',
    metaDescription:
      'Sünnet ne zaman yapılmalı, hangi yöntemler kullanılır, tıbbi gereklilikleri ve olası riskleri neler? Hipospadiasta neden sünnet yapılmaz? Prof. Dr. Basri Çakıroğlu.',
    content: `### Sünnet Nedir?

Sünnet, penisin uç kısmını (glans) örten ve tıp dilinde **prepisyum** olarak adlandırılan sünnet derisinin cerrahi yöntemle uygun miktarda çıkarılması işlemidir. Bu sayede penis başı açığa çıkar.

Sünnet, dünyada en sık uygulanan cerrahi işlemlerden biridir. Erkeklerin yaklaşık dörtte biri dini, kültürel, tıbbi veya kişisel nedenlerle sünnet edilmektedir. Bazı ülkelerde yenidoğan döneminde rutin olarak uygulanırken, bazı toplumlarda dini ve kültürel geleneklerin önemli bir parçasıdır.

Türkiye'de sünnet hem dini hem de sosyal açıdan önemli bir gelenektir. Birçok aile için sünnet töreni özel bir anlam taşırken, çocuk açısından da önemli bir yaşam olayı olarak görülmektedir.

### Sünnet Ne Zaman Yapılmalıdır?

Sünnet her yaşta yapılabilir. Ancak psikolojik gelişim açısından 2–6 yaş arasındaki dönemde, tıbbi zorunluluk yoksa ertelenmesi önerilebilir. Günümüzde birçok uzman, uygun sağlık koşulları sağlandığında yenidoğan dönemini iyileşmenin hızlı olması, bakımın kolaylığı ve psikolojik etkilerin daha az olması nedeniyle uygun dönemlerden biri olarak değerlendirmektedir.

Bununla birlikte fimozis, tekrarlayan idrar yolu enfeksiyonları veya diğer tıbbi gereklilikler söz konusuysa yaş beklenmeden sünnet yapılabilir.

### Sünneti Kim Yapmalıdır?

Sünnet, deneyimli ve eğitimli bir hekim tarafından, uygun steril koşullarda yapılmalıdır. Günümüzde en sık çocuk cerrahları ve üroloji uzmanları tarafından uygulanmaktadır.

### Sünnet Nerede ve Nasıl Yapılmalıdır?

Sünnetin hastane veya tam donanımlı sağlık kuruluşlarında steril şartlarda gerçekleştirilmesi önerilir.

Anestezi yöntemi çocuğun yaşına, sağlık durumuna ve hekimin değerlendirmesine göre belirlenir. Günümüzde hem lokal hem de genel anestezi güvenli şekilde uygulanabilmektedir. Amaç çocuğun ağrı hissetmemesi ve işlemin güvenli koşullarda tamamlanmasıdır.

### Sünnet Yöntemleri

Günümüzde çeşitli sünnet teknikleri bulunmaktadır. En yaygın yöntem, sünnet derisinin cerrahi olarak çıkarılması ve uygun şekilde dikilmesidir. Kullanılacak yöntem hastanın yaşına, anatomik yapısına ve cerrahın deneyimine göre belirlenir.

### Sünnet Öncesinde Nelere Dikkat Edilmelidir?

Hipospadias (halk arasında "peygamber sünneti" olarak bilinen durum) bulunan çocuklarda sünnet yapılmamalıdır. Çünkü bu hastalarda sünnet derisi daha sonra yapılacak düzeltici ameliyatta kullanılabilir.

Ayrıca aşağıdaki durumlarda sünnet öncesinde mutlaka hekim değerlendirmesi gerekir:

* Ailede kanama bozukluğu bulunması,
* Çocukta kolay morarma veya uzun süren kanamalar olması,
* Daha önce geçirilmiş önemli hastalıklar veya ameliyatlar,
* Sürekli kullanılan ilaçlar.

### Sünnetin Olası Faydaları

Bilimsel çalışmalar sünnetin bazı sağlık yararları sağlayabileceğini göstermektedir. Bunlar arasında:

* Fimozis gelişme riskinin ortadan kaldırılması,
* Bebeklik döneminde idrar yolu enfeksiyonu riskinin azalması,
* Penis kanseri riskinin azalması,
* Bazı cinsel yolla bulaşan enfeksiyonların bulaşma riskinde azalma,
* Hijyenin daha kolay sağlanabilmesi.

Ancak sünnet, cinsel yolla bulaşan hastalıklara karşı tam koruma sağlamaz. Güvenli cinsel yaşam uygulamaları her zaman önemini korur.

### Sünnetin Tıbbi Endikasyonları

Sünnet aşağıdaki durumlarda tıbbi gereklilik oluşturabilir:

* **Fimozis:** Sünnet derisinin geri çekilemeyecek kadar dar olması.
* **Parafimozis:** Geri çekilen sünnet derisinin eski yerine dönememesi.
* **Balanopostit:** Glans ve sünnet derisinin birlikte iltihaplanması.
* Tekrarlayan idrar yolu enfeksiyonları.
* Bazı doğumsal ürolojik anomaliler.

Tekrarlayan idrar yolu enfeksiyonları söz konusuysa altta yatan nedenin ayrıca araştırılması gerekir; ayrıntısı için [idrar yolu enfeksiyonu (İYE)](/blog/idrar-yolu-enfeksiyonu-iye-belirtileri-tedavisi) yazısına bakabilirsiniz.

### Olası Komplikasyonlar

Deneyimli hekimler tarafından uygun koşullarda yapılan sünnetlerde komplikasyon oranı düşüktür. Ancak her cerrahi işlemde olduğu gibi bazı riskler bulunmaktadır.

Bunlar arasında:

* Kanama,
* Enfeksiyon,
* Yara iyileşme sorunları,
* Kozmetik şekil bozuklukları,
* Fazla veya yetersiz deri çıkarılması,
* Nadir olarak penis başı veya idrar kanalının yaralanması,
* İdrar deliğinde (meatus) darlık gelişmesi.

Bu risklerin büyük bölümü işlemin deneyimli cerrahlar tarafından steril hastane koşullarında yapılmasıyla önemli ölçüde azaltılabilir.

### Sonuç

Sünnet, doğru endikasyonla ve uygun koşullarda yapıldığında güvenli bir cerrahi işlemdir. İşlem öncesinde çocuğun ayrıntılı olarak değerlendirilmesi, varsa ek hastalıkların belirlenmesi ve sünnetin deneyimli hekimler tarafından steril ortamda gerçekleştirilmesi komplikasyon riskini en aza indirir.

Ailelerin sünnet kararı öncesinde çocuk cerrahisi veya üroloji uzmanından görüş alması, hem işlemin güvenliği hem de olası risklerin doğru değerlendirilmesi açısından önem taşımaktadır.

${DISCLAIMER}`,
    faq: [
      {
        q: 'Sünnet için en uygun yaş nedir?',
        a: 'Sünnet her yaşta yapılabilir, ancak psikolojik gelişim açısından 2–6 yaş arasındaki dönemde tıbbi zorunluluk yoksa ertelenmesi önerilebilir. Birçok uzman, uygun sağlık koşulları sağlandığında yenidoğan dönemini iyileşmenin hızlı olması ve bakımın kolaylığı nedeniyle uygun dönemlerden biri olarak değerlendirmektedir.',
      },
      {
        q: 'Hipospadiasta neden sünnet yapılmaz?',
        a: 'Hipospadias (halk arasında "peygamber sünneti" olarak bilinen durum) bulunan çocuklarda sünnet yapılmamalıdır; çünkü bu hastalarda sünnet derisi daha sonra yapılacak düzeltici ameliyatta kullanılacaktır. Deri çıkarılırsa onarımda kullanılacak doku kaybedilir.',
      },
      {
        q: 'Sünnetin tıbbi olarak gerekli olduğu durumlar nelerdir?',
        a: 'Fimozis (sünnet derisinin geri çekilemeyecek kadar dar olması), parafimozis (geri çekilen derinin eski yerine dönememesi), balanopostit (glans ve sünnet derisinin iltihaplanması), tekrarlayan idrar yolu enfeksiyonları ve bazı doğumsal ürolojik anomaliler sünneti tıbbi gereklilik hâline getirebilir.',
      },
      {
        q: 'Sünnet öncesi hangi durumlar hekime bildirilmeli?',
        a: 'Ailede kanama bozukluğu bulunması, çocukta kolay morarma veya uzun süren kanamalar olması, daha önce geçirilmiş önemli hastalıklar veya ameliyatlar ve sürekli kullanılan ilaçlar mutlaka bildirilmelidir. Bu durumlarda sünnet öncesinde ek değerlendirme gerekir.',
      },
      {
        q: 'Sünnetin riskleri nelerdir?',
        a: 'Deneyimli hekimler tarafından steril koşullarda yapıldığında komplikasyon oranı düşüktür. Olası riskler kanama, enfeksiyon, yara iyileşme sorunları, kozmetik şekil bozuklukları, fazla veya yetersiz deri çıkarılması ve nadiren penis başı ya da idrar kanalı yaralanması ile idrar deliğinde darlık gelişmesidir.',
      },
    ],
    sources: [
      { title: 'EAU Guidelines: Paediatric Urology', url: 'https://uroweb.org/guidelines/paediatric-urology' },
      { title: 'AAP: Circumcision Policy Statement', url: 'https://publications.aap.org/pediatrics/article/130/3/585/30235/Circumcision-Policy-Statement' },
    ],
  },
];
