import { Milestone, ExpertiseItem, BlogPost, ContactInfo, Language } from './types';
import { ARTICLES_TR } from './content/articles';
import { DOCTOR } from './seo/site';
import { SERVICE_SLUGS } from './routes';
import { MILESTONES_RU, EXPERTISE_RU } from './data-ru';
import { ARTICLES_RU } from './content/articles-ru';
import { ARTICLES_EN } from './content/articles-en';

// Hizmet sayfası slug'ları artık src/routes.ts'te (TR + EN). Bu dışa aktarım
// TR slug'lar için geriye dönük uyumluluk; yeni kodda servicePath(lang, id) kullan.
export const expertiseSlugs: Record<string, string> = SERVICE_SLUGS.TR;

export function getExpertiseItemBySlug(lang: Language, slug: string): ExpertiseItem | undefined {
  const table = SERVICE_SLUGS[lang];
  const id = Object.keys(table).find((key) => table[key] === slug);
  if (!id) return undefined;
  return getExpertiseItems(lang).find((item) => item.id === id);
}

// Academic Milestones Timeline
export const getMilestones = (lang: Language): Milestone[] => {
  if (lang === 'RU') return MILESTONES_RU;
  return lang === 'TR'
    ? [
        { year: "2025 - Günümüz", title: "Üroloji Profesörü", institution: "Üsküdar Üniversitesi Tıp Fakültesi" },
        { year: "2020 - 2025", title: "Üroloji Doçenti & Öğretim Üyesi", institution: "Atlas, Galata ve Üsküdar Üniversiteleri" },
        { year: "2010 - Günümüz", title: "Üroloji Kliniği Sorumlusu", institution: "Hisar Intercontinental Hospital" },
        { year: "2002 - 2010", title: "Başhekim & Üroloji Uzmanı", institution: "Şebinkarahisar Devlet Hastanesi" },
        { year: "1994 - 2002", title: "Tıp Eğitimi & Uzmanlık İhtisası", institution: "Ondokuz Mayıs Üniversitesi & Taksim Eğitim ve Araştırma Hastanesi" }
      ]
    : [
        { year: "2025 - Present", title: "Professor of Urology", institution: "Üsküdar University Faculty of Medicine" },
        { year: "2020 - 2025", title: "Associate Professor & Faculty Member", institution: "Atlas, Galata, and Üsküdar Universities" },
        { year: "2010 - Present", title: "Head of Urology Clinic", institution: "Hisar Intercontinental Hospital" },
        { year: "2002 - 2010", title: "Chief Physician & Urology Specialist", institution: "Şebinkarahisar State Hospital" },
        { year: "1994 - 2002", title: "Medical Education & Urology Residency", institution: "Ondokuz Mayıs University & Taksim Training and Research Hospital" }
      ];
};

// Medical Specialties Data
export const getExpertiseItems = (lang: Language): ExpertiseItem[] => {
  if (lang === 'RU') return EXPERTISE_RU;
  return lang === 'TR'
    ? [
        {
          id: "robotic-surgery",
          title: "Robotik & Laparoskopik Cerrahi",
          shortDesc: "daVinci cerrahi robotu ile milimetrik hassasiyette, az ağrılı ve hızlı iyileşme sağlayan kapalı ameliyatlar.",
          longDesc: "Robotik cerrahi, üroloji alanındaki en üst düzey teknolojik gelişmelerden biridir. Cerrahın konsol üzerinden 3 boyutlu, yüksek çözünürlüklü ve 10-15 kat büyütülmüş görüntüler altında ameliyatı gerçekleştirmesini sağlar. robotik kollar insan elinin titremesini sıfırlayarak en dar alanlarda dahi 540 derece hareket kabiliyeti sunar.",
          iconName: "Cpu",
          conditions: [
            "Prostat Kanseri (Radikal Prostatektomi)",
            "Böbrek Tümörleri (Parsiyel/Radikal Nefrektomi)",
            "Mesane Kanseri (Sistektomi & Yapay Mesane)",
            "Üreteral Darlıklar (Pyeloplasti)"
          ],
          treatments: [
            "Robot Yardımlı Radikal Prostatektomi",
            "Robotik Parsiyel Nefrektomi (Tümörün çıkartılıp böbreğin korunması)",
            "Laparoskopik ve Robotik Adrenalektomi (Sürrenal bezi)",
            "Robotik Rekonstrüktif Üroloji Ameliyatları"
          ],
          // SEO: sayfada SSS bölümü + FAQPage JSON-LD (src/seo/meta.ts)
          faq: [
            { q: 'Robotik cerrahi ile laparoskopik cerrahi arasındaki fark nedir?', a: 'Her ikisi de karına açılan küçük deliklerden yapılan kapalı ameliyatlardır. Robotik cerrahide cerrah, aletleri bir konsoldan 3 boyutlu ve 10-15 kat büyütülmüş görüntü altında yönetir; aletler bilek gibi hareket edebildiği için dar pelvis içinde daha hassas diseksiyon ve dikiş mümkün olur. Robot kendi başına hiçbir hareket yapmaz.' },
            { q: 'Robotik ameliyat sonrası hastanede kaç gün kalınır?', a: 'Çoğu robotik üroloji ameliyatında hastanede kalış 1-2 gecedir. Hasta ameliyat günü akşamı yürütülür, ağrı genellikle basit ağrı kesicilerle kontrol edilir ve masa başı işe 2-3 hafta içinde dönülür.' },
            { q: 'Robotik prostat ameliyatında sinirler korunur mu?', a: 'Tümör sinir demetlerine yakın değilse sinir koruyucu teknik uygulanır. Büyütmeli görüntü sayesinde sertleşme sinirleri ve idrar tutma kası daha hassas korunabilir; fonksiyonların geri dönüşü hastanın yaşına, ameliyat öncesi durumuna ve tümörün yaygınlığına bağlıdır.' },
            { q: 'Robotik cerrahi hangi ürolojik kanserlerde uygulanır?', a: 'Prostat kanserinde radikal prostatektomi, böbrek tümörlerinde böbreği koruyan parsiyel nefrektomi, mesane kanserinde radikal sistektomi ve yapay mesane, böbrek üstü bezi tümörlerinde adrenalektomi ile üreter darlığı gibi rekonstrüktif ameliyatlarda uygulanır.' },
          ]
        },
        {
          id: "prostate-diseases",
          title: "Prostat Hastalıkları & Lazer Tedavileri",
          shortDesc: "İyi huylu prostat büyümesinde (BPH) HoLEP, ThuFLEP ve Rezum gibi en gelişmiş minimal invaziv tedavi yöntemleri.",
          longDesc: "Yaşla birlikte büyüyen prostat bezi idrar akışını engelleyerek yaşam kalitesini ciddi ölçüde düşürür. Günümüzde açık ameliyatların yerini alan Holmiyum Lazer Enükleasyon (HoLEP) ve Rezum su buharı terapisi ile kanamasız, ağrısız ve cinsel fonksiyonları tamamen koruyan çözümler sunuyoruz.",
          iconName: "Activity",
          conditions: [
            "İyi Huylu Prostat Büyümesi (BPH)",
            "Akut ve Kronik Prostatit (Prostat İltihabı)",
            "Prostat Kanseri Şüphesi ve Multiparametrik MR Füzyon Biyopsi",
            "Sık İdrara Çıkma, Gece İdrara Kalkma ve Zorlanma"
          ],
          treatments: [
            "HoLEP (Holmium Laser Enucleation of Prostate)",
            "ThuFLEP (Thulium Fiber Laser Enucleation)",
            "Rezum Su Buharı Terapisi (Günübirlik ameliyatsız tedavi)",
            "Yüksek Hassasiyetli MR Füzyon Prostat Biyopsisi"
          ],
          // SEO: sayfada SSS bölümü + FAQPage JSON-LD (src/seo/meta.ts)
          faq: [
            { q: 'HoLEP ile TUR-P arasındaki fark nedir?', a: 'TUR-P prostat dokusunu elektrik enerjisiyle parça parça keser ve genellikle 80 ml altındaki prostatlarda uygulanır. HoLEP’te büyüyen doku lazerle kapsülünden bütün olarak ayrılır; prostat boyutundan bağımsız uygulanabilir, kanama riski daha düşüktür ve tekrar büyüme ihtimali çok azdır.' },
            { q: 'HoLEP ameliyatı ne kadar sürer, sonda kaç gün kalır?', a: 'Prostatın boyutuna göre 1-2 saat sürer. Hastalar genellikle 1 gece hastanede kalır; sonda çoğunlukla 24-48 saat içinde alınır.' },
            { q: 'HoLEP sonrası cinsel fonksiyonlar etkilenir mi?', a: 'Sertleşme fonksiyonu genellikle korunur. Ancak hastaların büyük çoğunluğunda boşalma sırasında meni mesaneye geri kaçar (retrograd ejakülasyon); bu zararsızdır, orgazm hissi devam eder. Çocuk planlayan erkeklerde ameliyat öncesi konuşulmalıdır.' },
            { q: 'Rezum tedavisi kimlere uygundur?', a: 'Küçük-orta boyutlu prostatı olan, ameliyat istemeyen veya boşalma fonksiyonunu korumayı öncelikli gören hastalarda düşünülür. Lokal anestezi ile günübirlik uygulanır; etkisi haftalar içinde ortaya çıkar.' },
            { q: 'Prostat büyümesinde ne zaman ameliyat gerekir?', a: 'İlaçlara rağmen şikâyetlerin sürmesi, idrar retansiyonu (sonda takılması), tekrarlayan enfeksiyon, mesane taşı, kanama veya mesanede yüksek kalıntı idrar ve böbreklerde basınç bulguları cerrahi tedavi nedenleridir.' },
          ]
        },
        {
          id: "urologic-oncology",
          title: "Ürolojik Onkoloji",
          shortDesc: "Prostat, böbrek, mesane, testis ve böbrek üstü bezi kanserlerinin multidisipliner yaklaşımla cerrahi tedavisi.",
          longDesc: "Ürolojik kanserler, erken teşhis edildiğinde tamamen tedavi edilebilme şansı en yüksek onkolojik gruplardandır. Amacımız sadece tümörü temizlemek değil; hastanın idrar tutma yeteneğini, cinsel fonksiyonlarını ve böbrek dokularını maksimum seviyede korumaktır.",
          iconName: "ShieldAlert",
          conditions: [
            "Prostat Kanseri",
            "Böbrek Hücreli Kanseri (RCC)",
            "Mesane Kanseri ve İdrardan Kan Gelmesi",
            "Testis Tümörleri",
            "Adrenal (Böbrek Üstü Bezi) Kitleleri"
          ],
          treatments: [
            "Sinir Koruyucu Robotik Radikal Prostatektomi",
            "Nefron Koruyucu (Parsiyel) Nefrektomi",
            "Radikal Sistektomi ve İleal Loop (Yapay İnce Bağırsak Mesanesi)",
            "Retroperitoneal Lenf Nodu Diseksiyonu (RPLND)"
          ],
          // SEO: sayfada SSS bölümü + FAQPage JSON-LD (src/seo/meta.ts)
          faq: [
            { q: 'Prostat kanseri erken evrede belirti verir mi?', a: 'Genellikle hayır. Erken evre prostat kanseri çoğunlukla hiçbir şikâyet yapmaz; bu yüzden 50 yaşından itibaren (ailede prostat kanseri varsa 45’ten itibaren) PSA testi ve muayene ile tarama önerilir.' },
            { q: 'İdrarda ağrısız kan görülmesi kanser belirtisi midir?', a: 'Ağrısız, aralıklı ve gözle görülen kanama mesane kanserinin en tipik belirtisidir; özellikle sigara içen ve 50 yaş üstü kişilerde. Tek bir kez olsa ve kendiliğinden geçse bile sistoskopi ve görüntüleme ile araştırılmalıdır.' },
            { q: 'Böbrek tümöründe böbrek tamamen alınır mı?', a: 'Uygun boyut ve yerleşimdeki tümörlerde yalnızca tümörlü kısım çıkarılıp böbreğin geri kalanı korunur (parsiyel nefrektomi). Robotik teknik bu ameliyatı daha az kanamayla ve böbrek dokusunu koruyarak yapmayı kolaylaştırır.' },
            { q: 'Her prostat kanseri tedavi edilmeli midir?', a: 'Hayır. Düşük riskli, küçük hacimli tümörlerde düzenli PSA, MR ve biyopsi takibiyle aktif izlem yapılabilir ve tedavi gereksiz yan etkilerden kaçınmak için ertelenir. Karar hastayla birlikte, multidisipliner değerlendirmeyle verilir.' },
          ]
        },
        {
          id: "stone-disease",
          title: "Böbrek & İdrar Yolları Taşları",
          shortDesc: "Lazer ve ultrasonik dalgalarla kesi yapmadan, böbrek içindeki taşların toz haline getirilmesi tedavileri.",
          longDesc: "Şiddetli ağrılara sebep olan idrar yolu taşları, böbreğin fonksiyonunu tamamen yitirmesine sebep olabilir. Gelişmiş bükülebilir (flexible) endoskoplar sayesinde idrar deliğinden girerek böbrek içindeki taşa ulaşıyor ve Holmiyum Lazer ile taşı saniyeler içinde toza dönüştürüyoruz.",
          iconName: "Sparkles",
          conditions: [
            "Böbrek Taşları (Koraliform ve Kompleks Taşlar dahil)",
            "Üreter (İdrar Kanalı) Taşları",
            "Mesane Taşları",
            "Tekrarlayan Taş Oluşumları ve Metabolik Analiz"
          ],
          treatments: [
            "RIRS (Retrograd İntrarenal Cerrahi - Flexible Lazerle Taş Kırma)",
            "URS (Üreteroskopi Lazer Taş Tedavisi)",
            "Mini-PNL (Minimal İnvaziv Perkütan Nefrolitotomi - Sırttan küçük delikle)",
            "Vücut Dışından Şok Dalgalarıyla Taş Kırma (ESWL)"
          ],
          // SEO: sayfada SSS bölümü + FAQPage JSON-LD (src/seo/meta.ts)
          faq: [
            { q: 'Kaç mm böbrek taşı kendiliğinden düşer?', a: '5 mm’nin altındaki taşların büyük çoğunluğu, 5-10 mm arasındakilerin yaklaşık yarısı kendiliğinden düşer; 10 mm üzerindeki taşlar için genellikle müdahale gerekir. Düşürme süreci 4-6 haftayla sınırlandırılır.' },
            { q: 'RIRS (lazerle taş kırma) nasıl yapılır?', a: 'Genel anestezi altında, idrar kanalından bükülebilir ince bir endoskopla böbreğin içine girilir ve taş holmiyum lazerle toz hâline getirilir. Vücutta kesi yoktur; hastalar genellikle aynı gün veya ertesi gün taburcu olur.' },
            { q: 'ESWL ile RIRS arasındaki fark nedir?', a: 'ESWL vücut dışından şok dalgasıyla, anestezisiz taş kırmadır ve 2 cm altı, çok sert olmayan taşlarda uygundur; birkaç seans gerekebilir. RIRS ise endoskopla taşa doğrudan ulaşıp lazerle kırar; tek seansta taşsızlık oranı daha yüksektir ve sert taşlarda, kan sulandırıcı kullananlarda tercih edilir.' },
            { q: 'Böbrek taşı hangi durumda acildir?', a: 'Ağrıyla birlikte 38°C üzeri ateş, kontrol edilemeyen ağrı ve kusma, tek böbrekli hastada taş, idrar miktarında belirgin azalma veya böbrek fonksiyonlarında bozulma acil durumlardır; böbreğin stent ya da nefrostomi ile acilen boşaltılması gerekebilir.' },
            { q: 'Taşın tekrarlaması nasıl önlenir?', a: 'Günde 2,5-3 litre su içmek, tuzu ve aşırı hayvansal proteini azaltmak, kalsiyumu kısıtlamamak, limon gibi sitrat kaynaklarını artırmak ve düşen taşın analizini yaptırmak temel önlemlerdir. Tekrarlayan taşta 24 saatlik idrarla metabolik değerlendirme ve gerekirse ilaç tedavisi planlanır.' },
          ]
        },
        {
          id: "andrology-infertility",
          title: "Androloji & Erkek Sağlığı",
          shortDesc: "Sertleşme problemleri, erken boşalma, varikosel ve erkek kısırlığına yönelik mikrocerrahi ve yenilikçi tedaviler.",
          longDesc: "Erkek cinsel sağlığı ve kısırlık problemleri, günümüz tıbbında son derece hassas ve kişiye özel yöntemlerle ele alınmaktadır. Mikrocerrahi varikoselektomi, şok dalga terapileri (ESWT) ve mikro-TESE operasyonlarıyla yüksek başarı oranları sağlıyoruz.",
          iconName: "Heart",
          conditions: [
            "Erektil Disfonksiyon (Sertleşme Sorunu)",
            "Erkek İnfertilitesi (Kısırlık) ve Sperm Sayı Azlığı",
            "Varikosel (Testis Damarlarında Genişleme)",
            "Peyronie Hastalığı (Penis Eğriliği)"
          ],
          treatments: [
            "Mikrocerrahi Varikoselektomi (Nüks oranını sıfırlayan yöntem)",
            "Penil Protez (Mutluluk Çubuğu) İmplantasyonu",
            "ESWT (Penise Düşük Yoğunluklu Şok Dalga Terapisi)",
            "Mikro-TESE (Mikroskobik Sperm Arama Ameliyatı)"
          ],
          // SEO: sayfada SSS bölümü + FAQPage JSON-LD (src/seo/meta.ts)
          faq: [
            { q: 'Varikosel ameliyatı sperm değerlerini düzeltir mi?', a: 'Muayenede saptanan varikoseli ve bozuk sperm parametreleri olan erkeklerin yaklaşık üçte ikisinde mikrocerrahi varikoselektomi sonrası sperm sayısı ve hareketliliği artar; ilk iyileşme 3. ayda görülür ve doğal gebelik şansı yükselir.' },
            { q: 'Sertleşme sorunu için hangi tetkikler yapılır?', a: 'Ayrıntılı öykü ve muayenenin ardından kan şekeri, kolesterol ve sabah testosteronu ölçülür. Damarsal nedeni doğrulamak için gerektiğinde penil Doppler ultrason yapılır. Sertleşme sorunu olan her erkekte kalp damar riski de değerlendirilir.' },
            { q: 'Penil protez ameliyatı sonrası cinsel his kaybolur mu?', a: 'Hayır. Protez yalnızca sertleşmeyi sağlar; duyu, orgazm ve boşalma etkilenmez. Şişirilebilir protezler dışarıdan fark edilmez ve cinsel yaşama 4-6 hafta sonra dönülür.' },
            { q: 'Peyronie hastalığı (peniste eğrilik) tedavi edilebilir mi?', a: 'Evet. Erken (aktif) dönemde ilaç ve traksiyon tedavileri, plak stabilleştikten sonra ise eğriliğin derecesine ve sertleşme durumuna göre plikasyon, plak cerrahisi veya penil protez gibi cerrahi seçenekler uygulanır.' },
          ]
        },
        {
          id: "urogynecology",
          title: "Kadın Ürolojisi & İdrar Kaçırma",
          shortDesc: "Kadınlarda idrar kaçırma (inkontinans) ve pelvik organ sarkmalarına yönelik kalıcı ve konforlu çözümler.",
          longDesc: "Kadınlarda idrar kaçırma ve sarkma şikayetleri sık görülmesine rağmen sosyal çekinceler nedeniyle ertelenmektedir. Oysaki 15-20 dakikalık günübirlik askı ameliyatları veya lazer uygulamalarıyla bu sorunları kalıcı ve konforlu bir şekilde çözmek mümkündür.",
          iconName: "User",
          conditions: [
            "Stres İdrar Kaçırma (Öksürürken, hapşırırken kaçırma)",
            "Sıkışma Tipi İdrar Kaçırma (Aşırı Aktif Mesane)",
            "Sistosel (Mesane Sarkması)",
            "Tekrarlayan İdrar Yolu Enfeksiyonları"
          ],
          treatments: [
            "TOT (Transobturator Tape) & TVT Askı Ameliyatları",
            "Mesane Botoksu Uygulamaları (Aşırı Aktif Mesane için)",
            "Robotik Sakrokolpopeksi (Sarkma cerrahisi)",
            "Pelvik Taban Kas Rehabilitasyonu"
          ],
          // SEO: sayfada SSS bölümü + FAQPage JSON-LD (src/seo/meta.ts)
          faq: [
            { q: 'Stres tipi ve sıkışma tipi idrar kaçırma nasıl ayırt edilir?', a: 'Stres tipinde öksürme, gülme ve ağırlık kaldırma gibi hareketlerle idrar hissi olmadan kaçırma olur; sıkışma tipinde ise aniden gelen dayanılmaz idrar hissiyle tuvalete yetişemeden kaçırma olur. Mesane günlüğü ve muayene ile tip belirlenir; tedavileri farklıdır.' },
            { q: 'TOT ameliyatı nasıl yapılır, hastanede kaç gün kalınır?', a: 'Vajinadan 1-2 cm’lik bir kesiyle idrar kanalının altına ince bir bant yerleştirilir; işlem 20-30 dakika sürer. Hasta genellikle aynı gün veya ertesi gün taburcu olur ve birkaç gün içinde günlük yaşamına döner.' },
            { q: 'Kegel egzersizi ne kadar sürede etki eder?', a: 'Düzenli ve doğru yapıldığında genellikle 6-12 hafta içinde belirgin iyileşme başlar; en az 3 ay sürdürülmelidir. Doğru kasın çalıştırıldığından emin olmak için fizyoterapist ve biofeedback desteği alınabilir.' },
            { q: 'Aşırı aktif mesane ilaçları ömür boyu kullanılır mı?', a: 'İlaçlar şikâyetleri kontrol altında tutar; birçok hastada mesane eğitimi ve yaşam tarzı değişiklikleriyle doz azaltılabilir veya kesilebilir. İlaca yanıt vermeyen hastalarda mesane içi botulinum toksin, tibial sinir stimülasyonu veya sakral nöromodülasyon seçenekleri vardır.' },
          ]
        }
      ]
    : [
        {
          id: "robotic-surgery",
          title: "Robotic & Laparoscopic Surgery",
          shortDesc: "Keyhole, highly precise, minimal pain, and rapid recovery surgical procedures utilizing the state-of-the-art daVinci surgical robot.",
          longDesc: "Robotic surgery is the pinnacle of technological advancements in modern urology. It allows the surgeon to perform complex procedures through a specialized console providing 3D, high-definition visualization magnified up to 15 times. The robotic instruments negate natural hand tremors and provide 540-degree range of motion inside tight spaces.",
          iconName: "Cpu",
          conditions: [
            "Prostate Cancer (Radical Prostatectomy)",
            "Kidney Tumors (Partial or Radical Nephrectomy)",
            "Bladder Cancer (Cystectomy & Neobladder)",
            "Ureteral Strictures (Pyeloplasty)"
          ],
          treatments: [
            "Robot-Assisted Radical Prostatectomy",
            "Robotic Partial Nephrectomy (Sparing the kidney tissue)",
            "Laparoscopic & Robotic Adrenalectomy (Adrenal gland)",
            "Robotic Reconstruction of the Urinary Tract"
          ],
          faq: [
            { q: 'Is robotic surgery available for international patients in Istanbul?', a: 'Yes. Prof. Dr. Çakıroğlu performs daVinci robotic prostatectomy, partial nephrectomy and cystectomy at Hisar Intercontinental Hospital in Istanbul. International patients typically stay 5-7 days in Istanbul; consultation, surgery and the first follow-up are completed within that visit.' },
            { q: 'How long is the hospital stay after robotic surgery?', a: 'Most robotic urologic procedures require 1-2 nights in hospital. Patients walk the same evening, pain is usually controlled with simple analgesics, and desk work can resume within 2-3 weeks.' },
            { q: 'Does the robot operate on its own?', a: 'No. The surgeon controls every movement from a console; the system filters hand tremor and scales motion. 3D magnified vision and wristed instruments allow more precise nerve-sparing and suturing in the narrow pelvis.' },
            { q: 'Can I send my reports before travelling?', a: 'Yes. MRI, biopsy, PSA and other reports can be sent via WhatsApp or e-mail for a preliminary review, so that the treatment plan and length of stay are clear before you book flights.' },
          ]
        },
        {
          id: "prostate-diseases",
          title: "Prostate Diseases & Laser Therapies",
          shortDesc: "Advanced minimally invasive therapies for Benign Prostate Hyperplasia (BPH) including HoLEP, ThuFLEP, and Rezum.",
          longDesc: "As the prostate gland enlarges with age, it compresses the urethra, causing severe lower urinary tract symptoms. Today, traditional open surgeries are replaced by Holmium Laser Enucleation of the Prostate (HoLEP) and Rezum water vapor therapy, delivering bloodless, painless, and sexual-function-preserving clinical results.",
          iconName: "Activity",
          conditions: [
            "Benign Prostatic Hyperplasia (BPH)",
            "Acute & Chronic Prostatitis (Prostate Inflammation)",
            "Suspected Prostate Cancer & MRI-Fusion Targeted Biopsy",
            "Urinary Urgency, Nocturia, and Weak Stream"
          ],
          treatments: [
            "HoLEP (Holmium Laser Enucleation of Prostate)",
            "ThuFLEP (Thulium Fiber Laser Enucleation)",
            "Rezum Water Vapor Therapy (Outpatient non-surgical option)",
            "High-Precision Multiparametric MRI-Fusion Biopsy"
          ],
          faq: [
            { q: 'What is the difference between HoLEP and TURP?', a: 'TURP cuts prostate tissue piece by piece with electrical energy and is generally limited to prostates under 80 ml. HoLEP detaches the enlarged tissue from its capsule in one piece with a holmium laser: it works for any prostate size, bleeds less and has a very low re-treatment rate.' },
            { q: 'How long do I need to stay in Istanbul for HoLEP?', a: 'Typically 4-5 days: consultation and tests on day 1, surgery on day 2, one night in hospital, catheter removal within 24-48 hours and a check-up before flying home. Long-haul flights are usually possible 3-4 days after surgery.' },
            { q: 'Does HoLEP affect sexual function?', a: 'Erectile function is generally preserved because the nerves lie outside the prostate capsule. Most men, however, experience retrograde ejaculation (semen goes into the bladder). This is harmless and orgasm is unaffected, but men planning children should discuss it beforehand.' },
            { q: 'Can HoLEP be done if I take blood thinners?', a: 'HoLEP is one of the safest options for patients on anticoagulants because the laser seals vessels as it cuts. Your medication plan is reviewed individually before surgery.' },
            { q: 'Is Rezum available as an alternative?', a: 'Yes. Rezum water-vapour therapy is offered for small to medium prostates in men who want a day-case procedure under local anaesthesia and wish to preserve ejaculation.' },
          ]
        },
        {
          id: "urologic-oncology",
          title: "Urologic Oncology",
          shortDesc: "Comprehensive surgical treatment of prostate, kidney, bladder, testicular, and adrenal cancers using a multidisciplinary approach.",
          longDesc: "Urologic cancers have some of the highest cure rates among all oncological diseases when diagnosed early. Our surgical objective is not only to achieve oncological clearance but also to preserve urinary continence, erectile function, and vital organ tissue to the maximum extent.",
          iconName: "ShieldAlert",
          conditions: [
            "Prostate Cancer",
            "Renal Cell Carcinoma (RCC)",
            "Bladder Cancer & Hematuria (Blood in urine)",
            "Testicular Cancer",
            "Adrenal Masses"
          ],
          treatments: [
            "Nerve-Sparing Robotic Radical Prostatectomy",
            "Nephron-Sparing (Partial) Nephrectomy",
            "Radical Cystectomy with Ileal Conduit or Orthotopic Neobladder",
            "Retroperitoneal Lymph Node Dissection (RPLND)"
          ],
          faq: [
            { q: 'Can I get a second opinion on my prostate cancer diagnosis?', a: 'Yes. Send your PSA history, MRI and biopsy report; Prof. Dr. Çakıroğlu reviews them and explains whether active surveillance, robotic surgery or radiotherapy is the most appropriate option for your risk group.' },
            { q: 'Is every prostate cancer treated with surgery?', a: 'No. Low-risk, low-volume tumours are often followed with active surveillance (regular PSA, MRI and biopsy). For intermediate and high-risk localised disease, robotic prostatectomy and radiotherapy are equivalent options chosen with the patient.' },
            { q: 'Is kidney-sparing surgery possible for kidney tumours?', a: 'In suitable tumours only the tumour is removed and the rest of the kidney is preserved (partial nephrectomy). Robotic technique makes this possible with less bleeding and shorter recovery.' },
            { q: 'Is painless blood in the urine a sign of cancer?', a: 'Painless, intermittent visible blood in the urine is the most typical sign of bladder cancer, especially in smokers over 50. It must be investigated with cystoscopy and imaging even if it happens once and stops.' },
          ]
        },
        {
          id: "stone-disease",
          title: "Kidney & Urinary Tract Stones",
          shortDesc: "Laser-assisted disintegration of stones inside the kidney without any surgical incision, reducing recovery time to a single day.",
          longDesc: "Urinary stones can cause excruciating pain and permanent kidney damage. Using advanced flexible ureteroscopes, we navigate naturally through the urethra into the kidney and pulverize the stone into dust within seconds using specialized high-power Holmium Lasers.",
          iconName: "Sparkles",
          conditions: [
            "Kidney Stones (including complex staghorn calculi)",
            "Ureteral Stones (Urinary tract obstruction)",
            "Bladder Stones",
            "Recurrent Stone Disease & Metabolic Evaluation"
          ],
          treatments: [
            "RIRS (Retrograde Intrarenal Surgery - Flexible Laser Lithotripsy)",
            "URS (Ureteroscopic Laser Stone Treatment)",
            "Mini-PCNL (Mini-Percutaneous Nephrolithotomy through a tiny back incision)",
            "Extracorporeal Shock Wave Lithotripsy (ESWL)"
          ],
          faq: [
            { q: 'What is RIRS and why travel to Turkey for it?', a: 'RIRS (retrograde intrarenal surgery) reaches the kidney through the natural urinary tract with a flexible scope and pulverises the stone with a holmium laser, without any incision. Turkey offers this technology with short waiting times; most patients are treated and fly home within 3-4 days.' },
            { q: 'Which stones pass on their own?', a: 'Most stones under 5 mm and about half of those between 5 and 10 mm pass spontaneously; stones over 10 mm usually need intervention. Waiting is generally limited to 4-6 weeks.' },
            { q: 'How long is recovery after laser stone surgery?', a: 'RIRS is performed under general anaesthesia; patients are usually discharged the same or next day and return to normal activity within a few days. A temporary ureteral stent may cause frequency and mild burning until it is removed.' },
            { q: 'When is a kidney stone an emergency?', a: 'Fever above 38°C with pain, uncontrolled pain and vomiting, a stone in a solitary kidney, or a sharp drop in urine output are emergencies: the kidney may need urgent drainage with a stent or nephrostomy before the stone is treated.' },
            { q: 'How do I prevent stones from coming back?', a: 'Drink 2.5-3 litres of water daily, reduce salt and excessive animal protein, do not restrict calcium, add citrate sources such as lemon, and have your stone analysed. Recurrent stone formers should have a 24-hour urine metabolic work-up.' },
          ]
        },
        {
          id: "andrology-infertility",
          title: "Andrology & Men's Health",
          shortDesc: "Microsurgical and innovative clinical treatments for erectile dysfunction, premature ejaculation, varicocele, and male infertility.",
          longDesc: "Male reproductive and sexual health issues require highly customized and private treatments. We utilize microsurgical varicocelectomy to eliminate recurrence risks, low-intensity shockwave therapy (ESWT) for vascular regeneration, and micro-TESE to source sperm for IVF.",
          iconName: "Heart",
          conditions: [
            "Erectile Dysfunction (ED)",
            "Male Infertility & Low Sperm Count",
            "Varicocele (Dilated testicular veins)",
            "Peyronie's Disease (Penile curvature)"
          ],
          treatments: [
            "Microsurgical Varicocelectomy (The gold standard with zero recurrence)",
            "Penile Prosthesis (Malleable or Inflatable) Implantation",
            "ESWT (Low-Intensity Extracorporeal Shockwave Therapy)",
            "Micro-TESE (Microscopic Testicular Sperm Extraction)"
          ],
          faq: [
            { q: 'Does varicocele surgery improve sperm quality?', a: 'In men with a palpable varicocele and abnormal semen parameters, microsurgical varicocelectomy improves sperm count and motility in roughly two thirds of cases. First improvement is seen at 3 months and natural pregnancy rates rise.' },
            { q: 'Which tests are done for erectile dysfunction?', a: 'After a detailed history and examination, blood glucose, lipids and morning testosterone are measured; penile Doppler ultrasound is used when a vascular cause needs confirmation. Cardiovascular risk is assessed in every man with ED.' },
            { q: 'Does a penile implant affect sensation or orgasm?', a: 'No. The implant only provides rigidity; sensation, orgasm and ejaculation are unchanged. Inflatable implants are undetectable from outside and sexual activity resumes after 4-6 weeks.' },
            { q: 'Can Peyronie’s disease (penile curvature) be treated?', a: 'Yes. In the early phase medical and traction treatments are used; once the plaque is stable, plication, plaque surgery or a penile implant is chosen according to the degree of curvature and erectile function.' },
          ]
        },
        {
          id: "urogynecology",
          title: "Female Urology & Urinary Incontinence",
          shortDesc: "Comfortable and durable surgical correction for female urinary leakage and pelvic organ prolapse.",
          longDesc: "Urinary leakage and pelvic prolapse in women are frequently underreported due to social reservations. However, with modern 15-minute outpatient sling operations or robotic suspension, these issues can be permanently and comfortably resolved.",
          iconName: "User",
          conditions: [
            "Stress Urinary Incontinence (Leakage upon coughing, laughing, exercising)",
            "Urge Incontinence & Overactive Bladder (OAB)",
            "Cystocele (Bladder Prolapse)",
            "Recurrent Urinary Tract Infections (UTIs)"
          ],
          treatments: [
            "TOT (Transobturator Tape) & TVT Sling Procedures",
            "Intravesical Botox Injections (for stubborn OAB)",
            "Robotic Sacrocolpopexy (Advanced prolapse suspension)",
            "Pelvic Floor Muscle Training & Biofeedback"
          ],
          faq: [
            { q: 'How is stress incontinence different from urge incontinence?', a: 'Stress incontinence is leakage with coughing, laughing or lifting, without the urge to void, caused by pelvic floor weakness. Urge incontinence is a sudden, uncontrollable need to void with leakage before reaching the toilet, caused by involuntary bladder contractions. Treatments differ.' },
            { q: 'What is a TOT sling operation?', a: 'A 20-30 minute procedure in which a thin tape is placed under the urethra through a small vaginal incision. Patients usually go home the same or next day and resume daily life within days; long-term dry rates are high.' },
            { q: 'How long until pelvic floor exercises work?', a: 'Done correctly and regularly, noticeable improvement usually begins within 6-12 weeks; exercises should be continued for at least 3 months. A physiotherapist and biofeedback help ensure the right muscles are trained.' },
            { q: 'Are there options if bladder medication fails?', a: 'Yes: intravesical botulinum toxin injection, tibial nerve stimulation and sacral neuromodulation are effective for overactive bladder that does not respond to medication.' },
          ]
        }
      ];
};

// High-Quality Clinical & SEO Blog Posts
export const getBlogPosts = (lang: Language): BlogPost[] => {
  if (lang === 'RU') return ARTICLES_RU;
  return lang === 'TR'
    ? [
        // Faz 2 — hasta sorularına yönelik uzun makaleler (src/content/articles.ts)
        ...ARTICLES_TR,
        {
          id: "prostate-early-diagnosis",
          title: "Prostat Sağlığında Erken Teşhisin Önemi ve PSA Taramaları",
          slug: "prostat-sagliginda-erken-teshis",
          translationOf: "prostate-health-early-diagnosis",
          excerpt: "Prostat kanseri erkeklerde en sık görülen kanser türlerinden biridir. Hiçbir belirti vermeden ilerleyebilen bu hastalıkta erken tanı hayat kurtarır.",
          category: "Onkoloji",
          date: "10 Haziran 2026",
          readTime: "5",
          author: "Prof. Dr. Basri Çakıroğlu",
          keywords: "prostat kanseri erken tanı, PSA testi, multiparametrik MR biyopsi, üroloji uzmanı istanbul, Prof Dr Basri Çakıroğlu",
          metaDescription: "Prostat kanseri ve PSA testi hakkında kapsamlı rehber. Belirtiler, risk faktörleri ve füzyon biyopsi yöntemleri - Prof. Dr. Basri Çakıroğlu.",
          content: `### Prostat Kanseri Belirti Vermeden İlerleyebilir
Prostat kanseri, erken evrelerde genellikle hiçbir klinik şikayete yol açmaz. Sık idrara çıkma, idrarda kan görülmesi veya ağrı gibi belirtiler genellikle hastalık ileri aşamalara ulaştığında ya da iyi huylu prostat büyümesi ile birlikte seyrettiğinde ortaya çıkar. Bu nedenle, hiçbir şikayeti olmayan erkeklerin de düzenli tarama yaptırması hayati öneme sahiptir.

### PSA (Prostat Spesifik Antijen) Testi Nedir?
PSA, prostat bezi hücreleri tarafından üretilen ve kanda ölçülebilen bir proteindir. Basit bir kan testi ile ölçülür. Kandaki PSA düzeyinin yükselmesi, prostat kanseri riskini gösterebileceği gibi iyi huylu büyüme (BPH) veya prostat iltihabı (prostatit) gibi durumların da habercisi olabilir. Uzman hekim değerlendirmesi ile bu ayrım doğru şekilde yapılır.

### Ne Zaman Tarama Yaptırılmalı?
* **Ailesinde prostat kanseri öyküsü olmayanlar:** 50 yaşından itibaren yılda bir kez PSA testi ve ürolojik muayene yaptırmalıdır.
* **Ailesinde (baba, erkek kardeş vb.) prostat kanseri olanlar:** Genetik yatkınlık nedeniyle taramalara 45 yaşından itibaren başlamalıdır.

### Multiparametrik MR ve Akıllı Füzyon Biyopsi
Eğer PSA testinde veya muayenede şüpheli bir bulguya rastlanırsa, günümüzde en modern teşhis yöntemi olan **Multiparametrik MR (mpMR)** çekilir. MR görüntülerinde şüpheli alanlar tespit edilirse, **MR-Ultrasound Füzyon Biyopsi** teknolojisi ile tam o noktalardan milimetrik doğrulukla örnek alınır. Bu sayede gereksiz biyopsilerin önüne geçilir ve kanser odağı kaçırılmadan teşhis edilir.`
        },
        {
          id: "holep-prostate-treatment",
          title: "HoLEP: Büyük Prostatlarda Kesisiz ve Güvenli Lazer Çözümü",
          slug: "holep-lazer-prostat-tedavisi",
          translationOf: "holep-laser-prostate-treatment",
          excerpt: "İyi huylu prostat büyümesi tedavisinde altın standart kabul edilen HoLEP yöntemi, her boyuttaki prostata kesi yapılmadan uygulanabilen modern bir teknolojidir.",
          category: "Lazer Cerrahi",
          date: "22 Mayıs 2026",
          readTime: "6",
          author: "Prof. Dr. Basri Çakıroğlu",
          keywords: "HoLEP ameliyatı, holmium lazer prostat, prostat büyümesi tedavisi, kesisiz prostat ameliyatı, Basri Çakıroğlu HoLEP",
          metaDescription: "HoLEP lazer prostat ameliyatı avantajları, iyileşme süreci ve cinsel fonksiyonların korunması. Prof. Dr. Basri Çakıroğlu bilgilendiriyor.",
          content: `### İyi Huylu Prostat Büyümesi (BPH) Nedir?
50 yaşın üzerindeki erkeklerin yarısından fazlasında görülen iyi huylu prostat büyümesi; idrar yaparken zorlanma, idrar hızında azalma, geceleri sık sık idrara çıkma ve mesaneyi tam boşaltamama hissiyle kendini gösterir. İlaç tedavilerinin yetersiz kaldığı durumlarda cerrahi müdahale gereklidir.

### HoLEP Teknolojisi Nedir?
HoLEP (Holmium Laser Enucleation of the Prostate), yüksek güçlü Holmiyum lazer kullanılarak prostat dokusunun kapsülünden tamamen sıyrılarak çıkartılması yöntemidir. İdrar kanalından girilerek (kapalı yöntemle) gerçekleştirilen bu operasyonda dışarıdan hiçbir kesi yapılmaz.

### HoLEP Ameliyatının Avantajları Nelerdir?
1. **Sınır Tanımaz:** Geleneksel kapalı ameliyatlar (TUR-P) büyük prostatlarda uygulanamazken, HoLEP 80 gramdan büyük, hatta 150-200 gramlık dev prostatlarda bile güvenle uygulanır ve açık ameliyat ihtiyacını tamamen ortadan kaldırır.
2. **Kanamasız ve Güvenli:** Lazer teknolojisi işlem sırasında damarları hemen mühürlediği için kanama riski minimumdur. Kalp veya tansiyon ilacı (kan sulandırıcı) kullanan hastalar için son derece güvenlidir.
3. **Hızlı İyileşme ve Kısa Sondalı Kalış Süresi:** Hastalar genellikle ameliyattan 24 saat sonra sondalarından kurtulur ve normal yaşantılarına dönerler.
4. **Cinsel Fonksiyonların Korunması:** HoLEP cerrahisinde prostatı çevreleyen hayati sinirler zarar görmez. Bu sayede ameliyat sonrasında sertleşme sorunu yaşanmaz.
5. **Sıfıra Yakın Tekrarlama Riski:** Dokunun tamamı kapsülünden sıyrılarak alındığı için prostatın yıllar içinde tekrar büyüme ihtimali yok denecek kadar azdır.`
        },
        {
          id: "robotic-urology-oncology",
          title: "Robotik Cerrahi ile Ürolojik Kanser Tedavilerinde Yeni Dönem",
          slug: "robotik-cerrahi-uroloji",
          translationOf: "robotic-surgery-urologic-cancer",
          excerpt: "daVinci robotik cerrahi sistemi, cerraha sunduğu 3 boyutlu yüksek çözünürlüklü görüntü ve hassas manevra kabiliyeti ile kanser ameliyatlarında başarıyı artırıyor.",
          category: "Teknoloji",
          date: "14 Nisan 2026",
          readTime: "7",
          author: "Prof. Dr. Basri Çakıroğlu",
          keywords: "robotik cerrahi üroloji, daVinci robotik prostatektomi, prostat kanseri robotik ameliyatı, Basri Çakıroğlu robotik cerrahi",
          metaDescription: "daVinci robotik cerrahi ile ürolojik kanser operasyonları. Hızlı iyileşme, idrar tutma ve ereksiyon sinirlerinin korunması - Prof. Dr. Basri Çakıroğlu.",
          content: `### Robotik Cerrahi Nedir?
Robotik cerrahi veya robot yardımlı cerrahi, hastanın vücudunda açılan birkaç küçük delikten (0.8 - 1 cm) yerleştirilen robotik kolların, cerrah tarafından özel bir konsol aracılığıyla kontrol edildiği kapalı ameliyat yöntemidir. Ürolojide özellikle prostat, böbrek ve mesane kanserlerinin tedavisinde dünya çapında en çok tercih edilen yöntem haline gelmiştir.

### Ameliyat Başarısını Artıran Teknolojik Üstünlükler
* **3 Boyutlu ve 15 Kat Büyütülmüş Görüntü:** Cerrah, çıplak gözle veya standart laparoskopi ile görülmesi çok zor olan milimetrik damarları, sinir liflerini ve tümör sınırlarını net bir şekilde ayırt edebilir.
* **Titreme Engelleme Teknolojisi (Tremor Filter):** İnsan elinde oluşabilecek en küçük fizyolojik titremeler bile robotik kollara yansımaz, böylece son derece hassas doku kesimleri ve dikiş işlemleri yapılabilir.
* **Çok Yönlü Manevra Kabiliyeti:** Robotun uç kısımlarında yer alan enstrümanlar (EndoWrist), insan bileğinden çok daha fazla derecede (540 derece) dönebilir ve bükülebilir. Bu da dar pelvis bölgelerinde (prostat gibi) kusursuz çalışmayı sağlar.

### Hastaya Sağladığı Hayati Faydalar
1. **Daha Az Kan Kaybı ve Ağrı:** Kesi boyutları küçük olduğu için kan kaybı önemsiz düzeydedir. Ameliyat sonrası ağrı, açık cerrahiye kıyasla son derece hafiftir ve ağrı kesici ihtiyacı çok azdır.
2. **Hızlı Taburculuk ve Günlük Hayata Dönüş:** Hastalar genellikle ameliyatın ertesi günü ayağa kalkar ve birkaç gün içinde taburcu edilerek sosyal hayatlarına dönebilirler.
3. **Kanserli Dokunun Tam Temizlenmesi (Negatif Cerrahi Sınır):** Yüksek görüş gücü, kanserli dokunun etrafındaki sağlıklı sınırlardan temiz bir şekilde ayrılmasını sağlar.
4. **Hayati Fonksiyonların Korunması:** Prostat kanseri ameliyatlarında prostatın hemen yanından geçen idrar tutma ve sertleşme sinirleri (ereksiyon sinirleri) robotun hassasiyeti sayesinde korunur. Böylece ameliyat sonrasında idrar kaçırma ve iktidarsızlık gibi istenmeyen yan etkiler en aza indirilir.`
        },
        {
          id: "kidney-stone-laser-rirs",
          title: "Böbrek Taşında Kesisiz Tedavi: Lazerle Taş Kırma (RIRS)",
          slug: "bobrek-tasinda-kesisiz-lazer-tedavisi-rirs",
          excerpt: "Hiçbir cerrahi kesi yapılmadan idrar kanalından böbreğe ulaşılarak uygulanan Flexible RIRS yöntemiyle böbrek taşları toza dönüştürülür.",
          category: "Taş Hastalıkları",
          date: "28 Mart 2026",
          readTime: "5",
          author: "Prof. Dr. Basri Çakıroğlu",
          keywords: "böbrek taşı lazer kırma, RIRS ameliyatı, flexible üreteroskopi, böbrek taşı ağrısı, Prof Dr Basri Çakıroğlu",
          metaDescription: "Kesisiz, dikişsiz böbrek taşı tedavisi: Flexible URS ve Lazerle Taş Kırma (RIRS). İyileşme süreci ve taş dökme aşamaları - Prof. Dr. Basri Çakıroğlu.",
          content: `### Böbrek Taşı Neden Oluşur ve Nasıl Belirti Verir?
Böbrek taşları, idrarda kalsiyum, oksalat veya ürik asit gibi kristallerin birikip birleşmesiyle meydana gelir. Yetersiz sıvı tüketimi, genetik yatkınlık ve beslenme alışkanlıkları en büyük tetikleyicilerdir. Tipik olarak bele ve kasıklara vuran şiddetli kıvrandırıcı ağrı, bulantı ve idrarda kanama ile kendini gösterir.

### Kesisiz Lazer Yöntemi (RIRS) Nedir?
RIRS (Retrograd İntrarenal Cerrahi), kıvrılabilen (flexible) çok ince optik aletlerle idrar deliğinden girilip, mesane ve idrar kanalını geçerek doğrudan böbreğin içine ulaşılmasıdır. Dışarıdan vücutta hiçbir kesi, yara veya dikiş bulunmaz.

### Holmium Lazer ile Tozlaştırma
Böbrek içindeki taşa ulaşıldığında, milimetrik lazer fiberi kullanılarak taş adeta kum tanelerine veya toza dönüştürülür. Bu sayede hastalar işlem sonrası büyük taş parçaları düşürme sancısı yaşamazlar.

### RIRS Yönteminin Sağladığı Kolaylıklar:
* Vücutta kesi olmaması nedeniyle enfeksiyon riski çok düşüktür.
* Kanama riski minimaldir.
* Hastalar aynı gün veya ertesi sabah normal iş ve sosyal hayatlarına dönebilirler.
* Böbrek dokusuna zarar vermeden, böbreğin alt odacıklarındaki (kaliks) en zorlu taşlara bile güvenle ulaşılır.`
        },
        {
          id: "female-incontinence-solutions",
          title: "Kadınlarda İdrar Kaçırma: Nedenleri ve Modern Askı Ameliyatları (TOT)",
          slug: "kadinlarda-idrar-kacirma-tedavisi-tot",
          excerpt: "Öksürme, gülme veya ağır kaldırma sırasında idrar kaçırma kader değildir. 15-20 dakikalık modern askı operasyonları ile kalıcı konfor sağlanır.",
          category: "Kadın Ürolojisi",
          date: "12 Mart 2026",
          readTime: "5",
          author: "Prof. Dr. Basri Çakıroğlu",
          keywords: "kadınlarda idrar kaçırma, TOT ameliyatı, mesane sarkması tedavisi, idrar kaçırma ameliyatı istanbul, Basri Çakıroğlu",
          metaDescription: "Kadınlarda öksürünce idrar kaçırma (stres inkontinans) nedenleri ve modern TOT askı ameliyatı ile kalıcı tedavi - Prof. Dr. Basri Çakıroğlu.",
          content: `### İdrar Kaçırma Normal Bir Yaşlanma Süreci Değildir
Pek çok kadın, özellikle doğum sonrasında veya menopoz döneminde gülünce, hapşırınca, öksürünce veya spor yaparken idrar kaçırmayı normal ve kaçınılmaz bir durum olarak görebilmektedir. Oysa bu durum tıp dilinde 'Stres Üriner İnkontinans' olarak adlandırılan ve tedavisi son derece yüz güldürücü olan bir rahatsızlıktır.

### En Sık Görülen İdrar Kaçırma Türleri
1. **Stres İnkontinans:** Karın içi basıncın arttığı anlarda (öksürme, zıplama, gülme) idrar torbası boynunu destekleyen pelvik kasların gevşemesi sonucu kaçırma.
2. **Sıkışma (Urge) Tipi İnkontinans:** Aniden gelen tuvalete yetişememe hissi ve aşırı aktif mesane.
3. **Mikst Tip:** Her iki tablonun bir arada görülmesi.

### TOT (Transobturator Tape) Askı Yöntemi ile Kalıcı Çözüm
Günümüzde stres tipi idrar kaçırmada altın standart cerrahi tedavi TOT askı operasyonudur:
* **Hızlı ve Konforlu:** Yaklaşık 15-20 dakika süren, küçük bir operasyondur.
* **Görünmeyen Kesi:** İdrar yolunun hemen altına yerleştirilen sentetik doku dostu bir meş (bant) ile idrar kanalı desteklenir.
* **Yüksek Başarı Oranı:** Başarı oranı %90'ın üzerindedir.
* **Kısa İyileşme:** Hastalar genellikle operasyonun ertesi günü günlük aktivitelerine geri dönebilirler.`
        }
      ]
    : [
        // Faz 4 — yabancı hasta odaklı İngilizce makaleler (src/content/articles-en.ts)
        ...ARTICLES_EN,
        {
          id: "prostate-early-diagnosis",
          translationOf: "prostat-sagliginda-erken-teshis",
          title: "The Importance of Early Diagnosis in Prostate Health and PSA Screening",
          slug: "prostate-health-early-diagnosis",
          excerpt: "Prostate cancer is one of the most common cancers diagnosed in men. Early detection is a lifesaver for this silent disease.",
          category: "Oncology",
          date: "June 10, 2026",
          readTime: "5",
          author: "Prof. Dr. Basri Çakıroğlu",
          content: `### Prostate Cancer Can Progress Silently
In its initial stages, prostate cancer typically does not trigger any clinical discomfort or symptoms. Warning signs such as frequent urination, weak stream, or blood in the urine usually present themselves only after the disease has reached advanced stages or is accompanied by benign enlargement. Therefore, regular screening is crucial even for men who feel entirely healthy.

### What is the PSA (Prostate-Specific Antigen) Test?
PSA is a protein produced by prostate gland cells and measured through a simple blood draw. While an elevated PSA level can indicate an increased risk of cancer, it can also be caused by benign conditions such as BPH (enlargement) or prostatitis (infection). A specialized urologist's assessment is key to accurately differentiating these etiologies.

### When Should You Get Screened?
* **Men with no family history of prostate cancer:** Should undergo an annual PSA test and urological examination starting at age 50.
* **Men with a family history (father, brother, etc.):** Due to genetic predisposition, screening should begin at age 45.

### Multiparametric MRI and Smart Fusion Biopsy
If an elevated PSA or suspicious physical examination is detected, a **Multiparametric MRI (mpMRI)** is performed. If suspicious areas are identified, **MRI-Ultrasound Fusion Biopsy** is conducted. This high-end technology matches real-time ultrasound with pre-acquired MR images to guide the biopsy needle with millimeter precision directly into the tumor core, preventing unnecessary tissue sampling and ensuring highly accurate staging.`
        },
        {
          id: "holep-prostate-treatment",
          title: "HoLEP: Incision-free and Safe Laser Solution for Enlarged Prostate",
          slug: "holep-laser-prostate-treatment",
          translationOf: "holep-lazer-prostat-tedavisi",
          excerpt: "Recognized as the gold standard in benign prostatic hyperplasia (BPH) surgery, HoLEP utilizes state-of-the-art Holmium Laser to treat any prostate size with no incision.",
          category: "Laser Surgery",
          date: "May 22, 2026",
          readTime: "6",
          author: "Prof. Dr. Basri Çakıroğlu",
          content: `### What is Benign Prostatic Hyperplasia (BPH)?
Affecting over half of all men above the age of 50, BPH occurs when the prostate gland enlarges, leading to urinary hesitation, reduced urinary speed, frequent waking at night (nocturia), and a sensation of incomplete bladder emptying. When medical therapies fail to provide relief, surgical intervention becomes necessary.

### What is HoLEP Technology?
HoLEP (Holmium Laser Enucleation of the Prostate) uses a high-power Holmium laser to anatomically peel the obstructing prostate tissue away from its outer capsule. Performed transurethrally (through the natural urinary channel), it requires absolutely no external skin incisions.

### Essential Clinical Advantages of HoLEP:
1. **No Size Limits:** While conventional endoscopic surgeries (TUR-P) cannot be safely performed on very large prostates, HoLEP is highly successful for glands exceeding 80 grams, even up to 200 grams, entirely eliminating the need for open surgery.
2. **Virtually Bloodless:** The Holmium laser coagulates blood vessels instantly as it cuts. This makes the procedure incredibly safe, even for patients who must continue taking blood thinners for cardiac conditions.
3. **Rapid Recovery:** Patients are typically catheter-free within 24 hours of surgery and can return to light daily activities immediately.
4. **Preserved Sexual Function:** Crucial nerves regulating erectile function lie just outside the prostate capsule and are spared during HoLEP's precise anatomical dissection, safeguarding potency.
5. **Near-Zero Recurrence Rate:** Because the entire adenoma is shelled out cleanly down to the surgical capsule, the probability of the prostate growing back in the future is virtually non-existent.`
        },
        {
          id: "robotic-urology-oncology",
          title: "Robotic Surgery: A New Era in Treating Urologic Cancers",
          slug: "robotic-surgery-urologic-cancer",
          translationOf: "robotik-cerrahi-uroloji",
          excerpt: "The daVinci robotic system enhances surgical accuracy with high-definition 3D imaging and micro-maneuverability, leading to superior oncological outcomes.",
          category: "Technology",
          date: "April 14, 2026",
          readTime: "7",
          author: "Prof. Dr. Basri Çakıroğlu",
          content: `### What is Robotic Surgery?
Robotic-assisted surgery is a minimally invasive technique where the surgeon sits at a specialized console, manipulating high-precision surgical instruments attached to robotic arms. These arms enter the patient through small keyhole ports (0.8 - 1 cm wide). In urology, it has become the global gold standard for treating prostate, kidney, and bladder cancers.

### Technological Advancements Enhancing Outcomes:
* **High-Definition 3D Visualization:** The surgeon views a magnified (up to 15x) stereoscopic view of the pelvic cavity. This exposes microscopic blood vessels, nerve bundles, and tumor boundaries invisible to the naked eye.
* **Tremor Filtering Technology:** Tiny physiological hand tremors of the surgeon are filtered out by the software, delivering stable and extremely precise micro-dissections.
* **EndoWrist Maneuverability:** Unlike stiff laparoscopic instruments, the robotic wrist can rotate and articulate up to 540 degrees, enabling effortless suturing and dissection even inside the narrowest recesses of the male pelvis.

### Vital Patient Benefits:
1. **Minimal Pain and Blood Loss:** Small incisions result in minimal tissue trauma, minimal blood loss, and significantly reduced postoperative discomfort.
2. **Shorter Hospital Stay:** Patients are mobile on Day 1 and are usually discharged in 1-2 days, returning to normal routines much faster than open-surgery patients.
3. **Oncological Precision (Negative Margins):** The enhanced visualization allows for optimal cancer clearance by identifying precise tissue planes around the tumor.
4. **Preserving Quality of Life (Continence & Potency):** In radical prostatectomy, the delicate neurovascular bundles responsible for erectile function and urinary continence are spared with high precision, minimizing the occurrence of post-surgical incontinence or erectile dysfunction.`
        }
      ];
};

// Professional Contact Details and Mapping Info
export const contactDetails: ContactInfo = {
  // NAP — TEK KAYNAK src/seo/site.ts (JSON-LD ile harf harf aynı olmalı)
  phone: DOCTOR.telephoneRaw,
  phoneFormatted: DOCTOR.telephone,
  email: DOCTOR.email,
  address: DOCTOR.addressLine,
  // Map Embed URL of Hisar Intercontinental Hospital corresponding to the address
  mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3010.1587375253813!2d29.1171887765545!3d41.021759418465175!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cac8edfbf4b4a1%3A0xe108398e82d733e8!2sHisar%20Intercontinental%20Hospital!5e0!3m2!1str!2str!4v1721035200000!5m2!1str!2str",
  gmapsDirectionUrl: DOCTOR.mapUrl,
  hours: [
    { days: "Pazartesi - Cuma / Mon - Fri", hours: "09:00 - 18:00" },
    { days: "Cumartesi / Saturday", hours: "09:00 - 14:00" },
    { days: "Pazar / Sunday", hours: "Kapalı / Closed" }
  ]
};
