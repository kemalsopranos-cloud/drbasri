import type { BlogPost } from '../types';

// ---------------------------------------------------------------------------
// İngilizce makaleler — YABANCI HASTA odaklı (Faz 4).
//
// Bunlar Türkçe yazıların çevirisi değil: yurt dışındaki hasta "HoLEP surgery
// Turkey", "robotic prostatectomy Istanbul", "kidney stone treatment abroad"
// diye arar; seyahat, kalış süresi, uzaktan ön değerlendirme ve akreditasyon
// sorar. Metinler buna göre kurgulandı. `translationOf` en yakın Türkçe yazıyı
// gösterir (hreflang + dil düğmesi); içerikler birebir aynı değildir.
//
// ⚠️ FİYAT YAZMA: Türkiye'de hekimlerin fiyat/paket reklamı yapması Sağlık
// Bakanlığı tanıtım mevzuatına aykırıdır. "Contact us for a personalised
// quote" ile sınırlı kal.
//
// ⚠️ TIBBİ İÇERİK: EAU/AUA kılavuzlarıyla uyumlu genel bilgilendirme; yayına
// almadan önce hekim incelemesi gerekir.
// ---------------------------------------------------------------------------

const AUTHOR = 'Prof. Dr. Basri Çakıroğlu';
const DISCLAIMER =
  'This article is for general information only and does not replace a medical consultation. Treatment decisions are made after an individual evaluation of your reports and examination.';

export const ARTICLES_EN: BlogPost[] = [
  // =========================================================================
  // 1. HoLEP IN TURKEY
  // =========================================================================
  {
    id: 'en-holep-turkey',
    title: 'HoLEP Laser Prostate Surgery in Turkey: What International Patients Should Know',
    slug: 'holep-prostate-surgery-turkey-guide',
    translations: { TR: 'holep-ameliyati-sonrasi-iyilesme-sureci', RU: 'holep-lazernaya-operaciya-prostaty-turciya' },
    language: 'EN',
    excerpt:
      'HoLEP is the size-independent, low-bleeding gold standard for enlarged prostate. Here is how the procedure, hospital stay, recovery and travel planning work for patients coming to Istanbul from abroad.',
    category: 'Laser Surgery',
    date: 'September 18, 2026',
    datePublished: '2026-09-18',
    dateModified: '2026-09-18',
    readTime: '7',
    author: AUTHOR,
    keywords:
      'HoLEP surgery Turkey, HoLEP Istanbul, laser prostate surgery abroad, enlarged prostate treatment Turkey, BPH surgery Istanbul, HoLEP recovery time, urologist Istanbul international patients',
    metaDescription:
      'HoLEP laser prostate surgery in Istanbul, Turkey: how it works, who it suits, hospital stay, recovery timeline and how to plan your trip. By Prof. Dr. Basri Çakıroğlu.',
    relatedService: 'prostate-diseases',
    content: `### Why Men Travel for HoLEP
Benign prostatic hyperplasia (BPH) affects more than half of men over 50. In many countries the wait for prostate surgery is measured in months, and HoLEP — the technique international guidelines now consider a gold standard — is available only in a limited number of centres. Turkey combines high-volume laser and robotic urology with short waiting times, JCI-accredited private hospitals and direct flights from Europe, the UK, the Gulf and the CIS. That is why Istanbul has become one of the most visited cities for prostate surgery.

### What Exactly Is HoLEP?
HoLEP stands for **Holmium Laser Enucleation of the Prostate**. Through the urethra — with no external incision — the surgeon uses a high-power holmium laser to separate the enlarged inner prostate tissue from its capsule in one piece, much like peeling an orange from the inside. The tissue is then pushed into the bladder, fragmented with a morcellator and removed. Because the entire adenoma is taken out, the result is durable and the chance of needing a second operation years later is very low.

### HoLEP Compared with TURP and Open Surgery
* **TURP** removes tissue piece by piece with electrical energy; it is usually limited to prostates below 80 ml and carries a higher bleeding and re-growth rate.
* **Open (simple) prostatectomy** is the traditional answer for very large glands but needs an abdominal incision and a longer hospital stay.
* **HoLEP** works for **any prostate size** — including glands of 150-200 ml — with a catheter time of 1-2 days, minimal bleeding and no incision. It is also one of the safest choices for men on **blood thinners**, since the laser seals vessels as it cuts.

### Who Is a Good Candidate?
HoLEP is considered when medication no longer controls symptoms or is not tolerated, and when complications have appeared: urinary retention (a catheter), recurrent infections, bladder stones, bleeding, or a large residual volume that threatens the kidneys. Men who want a definitive, single-session solution with the lowest re-treatment rate are typical candidates. A very small prostate with mainly irritative symptoms may be better served by other options, which is why every patient's reports are reviewed first.

### Remote Evaluation Before You Travel
Most of the planning happens before you book a flight:
1. Send your **urine flow test, ultrasound (prostate volume, residual urine), PSA** and any previous reports via WhatsApp or e-mail.
2. Prof. Dr. Çakıroğlu reviews them and, if necessary, arranges a short video call.
3. You receive a written plan: whether HoLEP is appropriate, the expected length of stay and which medications to stop before surgery (blood thinners are managed individually).
4. Only then are travel dates fixed.

### A Typical Stay in Istanbul
* **Day 1:** Consultation and examination at Hisar Intercontinental Hospital (Ümraniye, Asian side of Istanbul), pre-operative blood tests, ECG and anaesthesia assessment.
* **Day 2:** Surgery under general or spinal anaesthesia; 1-2 hours depending on prostate size. One night in hospital.
* **Day 3:** Catheter removal (24-48 hours after surgery) and confirmation that you empty your bladder well. Discharge.
* **Day 4-5:** Rest at your hotel, a final check-up, then fly home. Long-haul flights are generally fine 3-4 days after surgery; walk regularly during the flight.

Total: **4-5 days** in Istanbul for most patients. A companion is welcome but not required.

### Recovery at Home
* Light blood in the urine on and off for 2-4 weeks is normal; drink 2-2.5 litres of water a day.
* Frequency, urgency and mild burning improve over 4-8 weeks as the bladder adapts to the open channel.
* A few drops of leakage when coughing or standing up affects some men early on and is almost always temporary; pelvic floor exercises speed recovery.
* No heavy lifting (over 5 kg), cycling or strenuous sport for 2-3 weeks; desk work after 1-2 weeks.
* Sexual activity after 3-4 weeks. Erections are generally preserved; **retrograde ejaculation** (semen entering the bladder) is common and harmless but should be discussed by men planning children.
* The removed tissue is examined by pathology and the report is sent to you electronically.

### Follow-Up from Abroad
Your first follow-up is done before you leave. Afterwards, a urine test and flow measurement can be performed by your local doctor at 4-6 weeks and the results shared with us; a video consultation is available whenever needed. Yearly PSA and check-ups continue at home, as the outer prostate capsule remains.

### Questions to Ask Any Centre Abroad
* How many HoLEP procedures does the surgeon perform per year?
* Is the hospital accredited (JCI or equivalent) and does it have 24-hour intensive care?
* Who do I contact after I return home, and how quickly do they respond?
* Are anaesthesia, hospital stay and follow-up included in the plan?

Clear answers to these questions matter more than the price quoted.

${DISCLAIMER}`,
    faq: [
      {
        q: 'How many days do I need to stay in Istanbul for HoLEP?',
        a: 'Typically 4-5 days: consultation and tests on day 1, surgery on day 2 with one night in hospital, catheter removal within 24-48 hours, and a final check before flying home. Long-haul flights are usually possible 3-4 days after surgery.',
      },
      {
        q: 'Can I have HoLEP if I take blood thinners?',
        a: 'HoLEP is among the safest prostate operations for patients on anticoagulants because the laser seals vessels as it cuts. Whether and when to pause your medication is decided individually before you travel.',
      },
      {
        q: 'Is HoLEP suitable for a very large prostate?',
        a: 'Yes. Unlike TURP, HoLEP is size-independent and is routinely performed on prostates of 150-200 ml, avoiding open surgery.',
      },
      {
        q: 'Will HoLEP affect my sex life?',
        a: 'Erectile function is generally preserved. Most men experience retrograde ejaculation (semen goes into the bladder), which is harmless and does not change orgasm, but is important for men who plan to have children.',
      },
      {
        q: 'How is follow-up handled after I return home?',
        a: 'The first check is done in Istanbul before departure. Later tests can be done by your local doctor and shared with us; video consultations are available at any time, and the pathology report is sent electronically.',
      },
    ],
    sources: [
      { title: 'EAU Guidelines: Management of Non-neurogenic Male LUTS', url: 'https://uroweb.org/guidelines/management-of-non-neurogenic-male-luts' },
      { title: 'AUA Guideline: Management of Benign Prostatic Hyperplasia', url: 'https://www.auanet.org/guidelines-and-quality/guidelines/benign-prostatic-hyperplasia-(bph)-guideline' },
    ],
  },

  // =========================================================================
  // 2. ROBOTIC PROSTATECTOMY IN TURKEY
  // =========================================================================
  {
    id: 'en-robotic-prostatectomy-turkey',
    title: 'Robotic Prostatectomy in Istanbul: A Guide for Patients Considering Treatment in Turkey',
    slug: 'robotic-prostatectomy-istanbul-turkey',
    translations: { TR: 'robotik-prostat-kanseri-ameliyati', RU: 'robotichenskaya-prostatektomiya-stambul' },
    language: 'EN',
    excerpt:
      'Nerve-sparing daVinci robotic prostatectomy for localised prostate cancer: who benefits, how continence and erectile function are protected, what the hospital stay looks like and how follow-up works when you live abroad.',
    category: 'Oncology',
    date: 'September 18, 2026',
    datePublished: '2026-09-18',
    dateModified: '2026-09-18',
    readTime: '8',
    author: AUTHOR,
    keywords:
      'robotic prostatectomy Turkey, robotic prostate surgery Istanbul, daVinci prostatectomy abroad, prostate cancer treatment Turkey, nerve sparing prostatectomy, prostate cancer second opinion Istanbul',
    metaDescription:
      'Robotic (daVinci) radical prostatectomy in Istanbul, Turkey: candidates, nerve-sparing technique, continence and potency recovery, hospital stay and remote follow-up. Prof. Dr. Basri Çakıroğlu.',
    relatedService: 'robotic-surgery',
    content: `### First: Do You Need Surgery at All?
Prostate cancer is not one disease. Before discussing surgery abroad, the most important step is to confirm your **risk group** from three pieces of information: PSA level, the Gleason score / ISUP grade on your biopsy, and MRI or staging findings.
* **Low-risk, low-volume** cancer is often best managed with **active surveillance** — regular PSA, MRI and repeat biopsy — with treatment deferred, sometimes for years.
* **Intermediate- and high-risk localised** cancer is where radical prostatectomy and radiotherapy are both curative options with comparable long-term results; the choice depends on side-effect profile, age and personal preference.
* **Metastatic** disease is treated primarily with hormonal and systemic therapy.

If your reports place you in the second group and you are fit for surgery with a life expectancy of at least 10 years, robotic prostatectomy is a reasonable option to consider — and a second opinion on your reports can be given remotely before you travel.

### What Robotic Prostatectomy Involves
Through five or six 8-mm ports in the abdomen, the daVinci system's instruments are controlled by the surgeon from a console. The robot never moves on its own; it translates the surgeon's hand movements while filtering tremor. Three features make it valuable in the pelvis:
* **3D vision magnified 10-15 times** — the neurovascular bundles and the sphincter are seen clearly.
* **Wristed instruments** that turn in ways a human hand cannot inside a narrow space.
* **Low blood loss** thanks to gas pressure and magnification; transfusion is rarely needed.

The prostate and seminal vesicles are removed, pelvic lymph nodes are taken when indicated, and the bladder is reconnected to the urethra. The operation takes about 2-3 hours.

### Protecting Continence and Erections
**Nerve-sparing.** The nerves responsible for erection run along the sides of the prostate. When the tumour is not close to them, they are carefully peeled off and preserved. Recovery of erections depends on age, pre-operative function, whether one or both sides could be spared, and conditions such as diabetes; it is gradual and may take 12-24 months. Early **penile rehabilitation** (PDE5 inhibitors, vacuum device) supports nerve recovery. Ejaculation no longer produces semen; men who want children should discuss sperm banking beforehand.

**Continence.** Leakage in the first weeks after catheter removal is expected. Most men regain control within 3-6 months and the majority of the rest by 12 months. Pelvic floor exercises started **before** surgery are the single most effective aid.

### Hospital Stay and Travel Plan
* **Before travel:** reports reviewed remotely; you receive a written plan and a list of medications to stop.
* **Day 1:** consultation, pre-operative tests and anaesthesia assessment at Hisar Intercontinental Hospital, Istanbul.
* **Day 2:** surgery. You are walked the same evening.
* **Day 3-4:** discharge after 1-2 nights.
* **Day 8-10:** catheter removal (the bladder-urethra join needs 7-10 days to heal) and final check.

International patients therefore usually plan **10-12 days** in Istanbul. Desk work resumes 2-3 weeks after surgery, heavier work after 4-6 weeks.

### Pathology and Follow-Up from Abroad
The final pathology report (stage, grade, margin status) determines whether any further treatment is needed and is sent to you electronically. PSA is checked 6-8 weeks after surgery and is expected to be undetectable; thereafter every 3 months in the first year, then every 6 months. These blood tests can be done at home and shared with us. If PSA ever rises, early salvage radiotherapy is highly effective — which is why follow-up must not lapse.

### Is Robotic Better Than Open Surgery?
For cancer control in experienced hands, open, laparoscopic and robotic approaches give similar long-term results. The robotic advantage lies in less blood loss, shorter hospital stay, less pain and faster return to normal life, plus the precision that magnified vision gives nerve- and sphincter-sparing steps. The strongest predictor of outcome is not the machine but the **surgeon's experience and case volume** — ask about it.

${DISCLAIMER}`,
    faq: [
      {
        q: 'How long do I need to stay in Istanbul for robotic prostatectomy?',
        a: 'Usually 10-12 days: consultation and tests, surgery with 1-2 nights in hospital, then catheter removal 7-10 days after surgery followed by a final check before you fly home.',
      },
      {
        q: 'Can you review my biopsy and MRI before I travel?',
        a: 'Yes. Send your PSA history, MRI and biopsy report via WhatsApp or e-mail. You receive a written assessment of your risk group and the most appropriate options — including whether surgery is needed at all.',
      },
      {
        q: 'How long does incontinence last after robotic prostatectomy?',
        a: 'Leakage is common in the first weeks after catheter removal. Most men regain control within 3-6 months and the majority of the rest within 12 months; pelvic floor exercises started before surgery speed recovery.',
      },
      {
        q: 'Will I recover erections after surgery?',
        a: 'With nerve-sparing surgery in younger men with good pre-operative function, erections return gradually over 12-24 months, supported by early rehabilitation with medication or a vacuum device. Semen is no longer produced, but orgasm is preserved.',
      },
      {
        q: 'How is follow-up done when I live abroad?',
        a: 'The pathology report is sent electronically. PSA tests at 6-8 weeks, then every 3 months in the first year and every 6 months afterwards can be done locally and shared with us; video consultations are arranged as needed.',
      },
    ],
    sources: [
      { title: 'EAU-EANM-ESTRO-ESUR-ISUP-SIOG Guidelines: Prostate Cancer', url: 'https://uroweb.org/guidelines/prostate-cancer' },
      { title: 'AUA/ASTRO Guideline: Clinically Localized Prostate Cancer', url: 'https://www.auanet.org/guidelines-and-quality/guidelines/clinically-localized-prostate-cancer-aua/astro-guideline-2022' },
    ],
  },

  // =========================================================================
  // 3. KIDNEY STONE (RIRS) IN TURKEY
  // =========================================================================
  {
    id: 'en-kidney-stone-rirs-turkey',
    title: 'Kidney Stone Laser Treatment (RIRS) in Turkey: Incision-Free Surgery and a 3-Day Stay',
    slug: 'kidney-stone-laser-treatment-rirs-turkey',
    translations: { TR: 'bobrek-tasi-belirtileri-nasil-duser', RU: 'lechenie-kamney-v-pochkah-lazerom-rirs' },
    language: 'EN',
    excerpt:
      'Which stones pass on their own, which need treatment, and how flexible ureteroscopy with holmium laser (RIRS) removes kidney stones without any incision — with a typical stay of only three days in Istanbul.',
    category: 'Stone Disease',
    date: 'September 18, 2026',
    datePublished: '2026-09-18',
    dateModified: '2026-09-18',
    readTime: '7',
    author: AUTHOR,
    keywords:
      'kidney stone treatment Turkey, RIRS Istanbul, laser kidney stone surgery abroad, ureteroscopy Turkey, kidney stone removal Istanbul, flexible ureteroscopy holmium laser, PCNL Turkey',
    metaDescription:
      'Kidney stone laser treatment (RIRS, URS, mini-PCNL) in Istanbul, Turkey: which stones need surgery, how incision-free laser removal works, recovery and travel planning. Prof. Dr. Basri Çakıroğlu.',
    relatedService: 'stone-disease',
    content: `### Does Your Stone Need Treatment?
Two factors decide whether a stone will pass on its own: **size** and **location**.
* Stones **under 5 mm** pass spontaneously in the large majority of cases.
* Stones of **5-10 mm** pass in roughly half of cases, more often when they are low in the ureter.
* Stones **over 10 mm** rarely pass and usually need intervention.

Medical expulsive therapy — fluids, anti-inflammatory painkillers and an alpha-blocker such as tamsulosin — is given for up to 4-6 weeks when passage is realistic. Beyond that, or when pain recurs and the kidney remains swollen, waiting risks permanent kidney damage. Stones sitting inside the kidney without symptoms are treated when they grow, cause infection or bleeding, or when the patient's occupation (pilots, frequent travellers) makes an unpredictable colic unacceptable.

### Red Flags — Do Not Travel, Seek Care Now
Fever above 38°C with stone pain, uncontrolled pain and vomiting, a stone in a solitary kidney, or a sharp drop in urine output are emergencies. An infected, obstructed kidney needs urgent drainage locally; planned stone treatment abroad comes afterwards.

### Diagnosis: What to Send Us
A **non-contrast CT scan** is the key investigation: it shows the exact size, location and density of every stone and lets us choose the right technique before you travel. If you have only an ultrasound report, send it together with your blood tests (kidney function, calcium, uric acid) and urine analysis; a CT can be performed on arrival if needed.

### Treatment Options and When Each Is Used
**ESWL (shock wave lithotripsy).** External sound waves fragment the stone without anaesthesia; suitable for kidney stones under 2 cm that are not too hard. Several sessions may be needed and complete clearance rates are lower than with endoscopic methods.

**URS (ureteroscopy).** A thin rigid or semi-rigid scope passed through the urethra reaches a stone in the ureter, which is fragmented with a holmium laser. First-line for ureteral stones; high single-session stone-free rates.

**RIRS (retrograde intrarenal surgery / flexible ureteroscopy).** A flexible scope is steered through the natural urinary tract into the kidney itself and the stone is dusted with a holmium laser. **No incision at all.** Ideal for kidney stones up to about 2 cm, for hard stones that resist ESWL, for patients on blood thinners and for those with bleeding risk. A temporary ureteral stent (DJ stent) may be left for days to a few weeks.

**Mini-PCNL (percutaneous nephrolithotomy).** For stones larger than 2 cm or complex staghorn stones, a 5-10 mm tract is made through the back directly into the kidney and the stone is fragmented and extracted. Miniaturised instruments reduce bleeding and pain compared with standard PCNL.

Laparoscopic or robotic stone surgery is reserved for rare anatomical situations; open stone surgery is now exceptional.

### A Typical Stay in Istanbul for RIRS
* **Day 1:** consultation, review of CT, urine culture and pre-operative tests at Hisar Intercontinental Hospital.
* **Day 2:** RIRS under general anaesthesia (usually 45-90 minutes). Discharge the same evening or next morning.
* **Day 3:** check-up, then fly home.

Most patients therefore spend **3 days** in Istanbul; mini-PCNL adds one or two nights. If a stent has been placed, it is either removed before departure or — when it must stay longer — removed by your local urologist with our written instructions; some stents have a thread for simple removal at home.

### After Treatment
A few days of mild burning, frequency and pink urine are expected, especially while a stent is in place. Normal activity resumes within days. The stone fragments are **analysed** and you receive a prevention plan: 2.5-3 litres of fluid daily, less salt and excess animal protein, normal (not reduced) calcium intake, citrate sources such as lemon, and — for recurrent stone formers — a 24-hour urine metabolic evaluation that your home doctor can arrange.

### Why Patients Choose Turkey for Stone Surgery
Short waiting times matter with stones: a stone that could be dusted in one session today may need a more invasive procedure after months of obstruction. Turkish endourology centres perform high volumes of RIRS and PCNL with current-generation lasers and flexible scopes, at accredited hospitals, and Istanbul is a 3-4 hour flight from most of Europe and the Middle East.

${DISCLAIMER}`,
    faq: [
      {
        q: 'How many days do I need in Istanbul for kidney stone laser treatment?',
        a: 'For RIRS or ureteroscopy, typically 3 days: consultation and tests, surgery with discharge the same or next day, and a check-up before flying home. Mini-PCNL for large stones adds one or two nights.',
      },
      {
        q: 'Is RIRS painful and does it leave a scar?',
        a: 'RIRS is done under general anaesthesia through the natural urinary tract, so there is no incision and no scar. Afterwards there may be mild burning and frequency for a few days, mainly due to the temporary stent.',
      },
      {
        q: 'What if a stent is left in and I have to fly home?',
        a: 'Stents are removed before departure whenever possible. If one must stay longer, it can be removed by your local urologist with our instructions, or a stent with a removal thread is used so it can be taken out simply at home.',
      },
      {
        q: 'Which scan should I send before travelling?',
        a: 'A non-contrast CT is ideal because it shows stone size, location and hardness and allows the right technique to be chosen in advance. If you only have an ultrasound, send it with blood and urine results; CT can be done on arrival.',
      },
      {
        q: 'Can kidney stones be treated while I take blood thinners?',
        a: 'Yes. RIRS with holmium laser is the preferred option for patients on anticoagulants because there is no incision and bleeding risk is low; ESWL is generally avoided in this group.',
      },
    ],
    sources: [
      { title: 'EAU Guidelines: Urolithiasis', url: 'https://uroweb.org/guidelines/urolithiasis' },
      { title: 'AUA Guideline: Surgical Management of Stones', url: 'https://www.auanet.org/guidelines-and-quality/guidelines/kidney-stones-surgical-management-guideline' },
    ],
  },

  // =========================================================================
  // 4. VARICOCELE MICROSURGERY
  // =========================================================================
  {
    id: 'en-varicocele-microsurgery',
    title: 'Microsurgical Varicocele Repair in Istanbul: Improving Male Fertility Without a Long Stay',
    slug: 'varicocele-microsurgery-istanbul',
    translations: { TR: 'varikosel-belirtileri-ve-tedavisi', RU: 'varikocele-simptomy-mikrohirurgicheskaya-operaciya' },
    language: 'EN',
    excerpt:
      'Varicocele is the most common correctable cause of male infertility. Learn who benefits from repair, why the microsurgical subinguinal technique is the gold standard, and how a day-case operation fits into a short trip to Istanbul.',
    category: 'Andrology',
    date: 'September 18, 2026',
    datePublished: '2026-09-18',
    dateModified: '2026-09-18',
    readTime: '6',
    author: AUTHOR,
    keywords:
      'varicocele surgery Turkey, microsurgical varicocelectomy Istanbul, varicocele repair abroad, male infertility treatment Turkey, varicocele and sperm count, andrologist Istanbul',
    metaDescription:
      'Microsurgical varicocelectomy in Istanbul, Turkey: indications, why microsurgery has the lowest recurrence, day-case procedure, recovery and when sperm improves. Prof. Dr. Basri Çakıroğlu.',
    relatedService: 'andrology-infertility',
    content: `### What a Varicocele Is — and Why It Matters
A varicocele is a dilation of the veins draining the testicle, similar to varicose veins in the leg. Because of venous anatomy it is far more common on the **left**. About 15% of all men have one; among men investigated for **primary infertility the figure is 35-40%**, making varicocele the most frequent correctable cause of male infertility. Pooled blood raises testicular temperature and oxidative stress, which lowers sperm count and motility, increases abnormal forms and DNA fragmentation, and over years can shrink the testicle and reduce testosterone.

Not every man with a varicocele is infertile — many father children without ever knowing they have one. The decision to treat is therefore based on semen analysis and clinical findings, not on the varicocele alone.

### Symptoms and Grading
Most varicoceles are silent and found during a fertility work-up. When symptomatic they cause a dull ache or heaviness that worsens after standing and eases lying down, visible "bag of worms" veins, or a smaller testicle on the affected side. Clinical grades:
* **Grade 1:** palpable only when straining
* **Grade 2:** palpable without straining, not visible
* **Grade 3:** visible through the scrotal skin
* **Subclinical:** seen only on ultrasound — treatment is generally not recommended

Diagnosis is by standing examination confirmed with **scrotal Doppler ultrasound**, plus at least two semen analyses and hormone tests (FSH, testosterone) in men seeking fertility. A varicocele appearing suddenly on the right side requires abdominal imaging to exclude a mass.

### Who Should Have Surgery?
Current guidelines recommend repair when:
1. A **clinical (palpable) varicocele** coexists with **abnormal semen parameters** and the couple has not conceived — the partner should also have been evaluated.
2. There is **chronic testicular pain** not explained by other causes.
3. An **adolescent** shows arrested growth of the affected testicle or worsening semen quality.
4. Selected men with very low sperm counts before IVF/ICSI, to improve sperm quality and DNA integrity.

Men with normal semen, no pain and no wish for children do not need surgery; an annual check is enough.

### Why Microsurgery Is the Gold Standard
Through a 2-3 cm incision just below the groin crease, the operating microscope magnifies the spermatic cord 10-15 times. Every dilated vein is ligated individually while the testicular artery and lymphatic channels are preserved. Compared with laparoscopic or conventional open techniques, **microsurgical subinguinal varicocelectomy** has the lowest recurrence rate (about 1-2%), the lowest risk of hydrocele, and the best improvement in semen parameters. It is performed as a **day case** under general or spinal anaesthesia; you return to your hotel the same day.

### Planning Your Visit to Istanbul
* **Before travel:** send your semen analyses, hormone results and Doppler report for review.
* **Day 1:** consultation and examination at Hisar Intercontinental Hospital, pre-operative tests.
* **Day 2:** surgery (about 1 hour per side), discharge the same day.
* **Day 3-4:** rest, wound check, fly home.

A **3-4 day** stay is sufficient for most patients. Both sides can be repaired in one session when indicated.

### Recovery and Results
Mild pain and swelling last a few days and respond to simple analgesics. Desk work after 2-3 days, sport after 2-3 weeks, sexual activity after 1-2 weeks. Because the sperm production cycle takes about three months, the first control semen analysis is done at **3 months** and again at 6 months — these can be done at home and shared with us. Semen parameters improve in roughly **two thirds** of men, natural pregnancy rates rise, and where assisted reproduction is still needed its success improves. In men operated for pain, the great majority report relief.

${DISCLAIMER}`,
    faq: [
      {
        q: 'How long do I need to stay in Istanbul for varicocele surgery?',
        a: 'Usually 3-4 days. Microsurgical varicocelectomy is a day-case operation: consultation on day 1, surgery on day 2 with same-day discharge, then a wound check before flying home.',
      },
      {
        q: 'When will my sperm count improve after varicocele repair?',
        a: 'Sperm production takes about three months, so the first meaningful improvement is seen at 3 months and the full effect by 6-12 months. Roughly two thirds of men show improved count and motility.',
      },
      {
        q: 'Why choose microsurgery over laparoscopic or open repair?',
        a: 'Microsurgical subinguinal varicocelectomy has the lowest recurrence rate (about 1-2%), the lowest hydrocele risk and the best semen improvement, because the artery and lymphatics are preserved under 10-15x magnification.',
      },
      {
        q: 'Should varicocele be repaired before IVF?',
        a: 'In men with a palpable varicocele and abnormal semen, repair before IVF/ICSI can improve sperm quality and DNA integrity and increase success; in some couples it removes the need for IVF altogether. The decision considers the partner’s age and female factors.',
      },
      {
        q: 'Can I send my results for an opinion before booking travel?',
        a: 'Yes. Send at least two semen analyses, hormone results and a scrotal Doppler report via WhatsApp or e-mail; you will receive an assessment of whether surgery is likely to help.',
      },
    ],
    sources: [
      { title: 'EAU Guidelines: Sexual and Reproductive Health', url: 'https://uroweb.org/guidelines/sexual-and-reproductive-health' },
      { title: 'AUA/ASRM Guideline: Diagnosis and Treatment of Infertility in Men', url: 'https://www.auanet.org/guidelines-and-quality/guidelines/male-infertility' },
    ],
  },

  // =========================================================================
  // 5. PSA / SECOND OPINION
  // =========================================================================
  {
    id: 'en-psa-second-opinion',
    title: 'High PSA: Getting a Second Opinion Before a Prostate Biopsy',
    slug: 'high-psa-second-opinion-prostate-mri',
    translations: { TR: 'psa-yuksekligi-ne-anlama-gelir', RU: 'povyshennyy-psa-chto-delat' },
    language: 'EN',
    excerpt:
      'A raised PSA is not a cancer diagnosis. Learn what pushes PSA up, how free PSA, PSA density and multiparametric MRI refine the decision, and how MRI-fusion biopsy avoids unnecessary procedures — including how to get an expert review of your results remotely.',
    category: 'Oncology',
    date: 'September 18, 2026',
    datePublished: '2026-09-18',
    dateModified: '2026-09-18',
    readTime: '7',
    author: AUTHOR,
    keywords:
      'high PSA second opinion, elevated PSA what to do, PSA 4 to 10, prostate MRI before biopsy, MRI fusion biopsy Istanbul, prostate cancer screening Turkey, urologist second opinion online',
    metaDescription:
      'Elevated PSA explained: non-cancer causes, free/total ratio, PSA density, PI-RADS on multiparametric MRI and MRI-fusion biopsy. How to obtain a remote second opinion from Prof. Dr. Basri Çakıroğlu.',
    relatedService: 'urologic-oncology',
    content: `### PSA Is Prostate-Specific, Not Cancer-Specific
Prostate-specific antigen is a protein made by all prostate tissue. Anything that enlarges, inflames or presses on the prostate raises it. Among men biopsied for a PSA between 4 and 10 ng/mL, the majority turn out **not** to have cancer. A raised PSA is therefore the start of a structured evaluation, not a verdict.

### Common Non-Cancer Causes
* **Benign prostatic hyperplasia** — the larger the gland, the more PSA it makes
* **Prostatitis or urinary infection** — can multiply PSA several-fold; repeat 6-8 weeks after treatment
* **Ejaculation within 48 hours**, long **cycling**, recent **rectal examination, cystoscopy, catheter** or biopsy
* **Urinary retention**

A single raised value should be **repeated** under proper conditions before any decision. Men taking **finasteride or dutasteride** (for prostate or hair loss) have their PSA roughly halved — the measured value must be doubled for interpretation.

### Age Matters More Than a Fixed Cut-Off
The traditional 4 ng/mL threshold is only a rough guide. Approximate age-specific upper limits are 2.5 (40-49), 3.5 (50-59), 4.5 (60-69) and 6.5 ng/mL (70+). Equally important is the **trend**: a rise of more than 0.75 ng/mL per year deserves attention even within the "normal" range.

### Refining the Picture Before Biopsy
* **Free/total PSA ratio:** above 25% favours benign disease; below 10% raises suspicion.
* **PSA density** (PSA ÷ prostate volume): values above 0.15 are more concerning.
* Blood or urine biomarkers such as PHI, 4Kscore or PCA3 in selected cases.
* **Multiparametric MRI (mpMRI)** — now recommended by European guidelines **before** a first biopsy. Findings are graded **PI-RADS 1-5**: scores 1-2 make clinically significant cancer unlikely and allow biopsy to be deferred in many men; 4-5 call for targeted biopsy; 3 is decided with density and other factors.

MRI's greatest contribution is avoiding unnecessary biopsies and the over-diagnosis of small, slow-growing tumours that would never need treatment.

### MRI-Fusion Biopsy
When biopsy is indicated, the MRI images are fused with live ultrasound so that cores are taken precisely from the suspicious area, in addition to a limited systematic sampling. Compared with the traditional 12-core "blind" biopsy this detects more clinically significant cancers with fewer cores. The **transperineal** route (through the skin rather than the rectum) markedly reduces infection risk. The procedure takes 15-20 minutes under local anaesthesia or light sedation; a few days of blood in urine and semen is expected.

### How a Remote Second Opinion Works
1. Send your PSA results with dates, prostate volume (from ultrasound or MRI), any MRI report with PI-RADS score, and previous biopsy reports.
2. Prof. Dr. Çakıroğlu reviews them and explains, in writing or by video call, whether repeat PSA, MRI, biopsy or simple follow-up is appropriate.
3. If MRI or fusion biopsy is advised, both can be completed during a **2-3 day** visit to Istanbul, with the pathology result sent to you electronically within days.

### Who Should Be Screened at All?
Screening is a shared decision. It is generally offered from **age 50**, from **45** in men with a father or brother affected or with BRCA mutations, and is usually not recommended when life expectancy is under 10-15 years. The interval depends on the first PSA: every 2-4 years when very low, yearly when close to the threshold.

### The Right Response to a High PSA
Neither panic nor neglect. Repeat the test properly, exclude infection, add free PSA and density, obtain an MRI when suspicion persists, and biopsy only what the MRI shows. Following this sequence catches significant cancer early while sparing most men an unnecessary procedure.

${DISCLAIMER}`,
    faq: [
      {
        q: 'Does a PSA above 4 mean I have prostate cancer?',
        a: 'No. Most men with a PSA between 4 and 10 ng/mL who undergo biopsy do not have cancer; benign enlargement and inflammation are far more common causes. The value should be repeated, interpreted with free PSA and prostate volume, and followed by MRI when suspicion persists.',
      },
      {
        q: 'Should I have an MRI before a prostate biopsy?',
        a: 'Yes. European guidelines recommend multiparametric MRI before a first biopsy. A PI-RADS 1-2 result allows many men to defer biopsy; a PI-RADS 4-5 lesion is biopsied with MRI-fusion targeting.',
      },
      {
        q: 'Can I get a second opinion on my PSA results online?',
        a: 'Yes. Send your PSA history, prostate volume, MRI report and any biopsy results via WhatsApp or e-mail. You receive a written assessment or a video consultation explaining the recommended next step.',
      },
      {
        q: 'How long would I need to stay in Istanbul for MRI and fusion biopsy?',
        a: 'Typically 2-3 days: MRI on the first day, targeted transperineal fusion biopsy on the second, and the pathology report sent electronically within days after you return home.',
      },
      {
        q: 'What should I avoid before a PSA test?',
        a: 'Avoid ejaculation for 48 hours and long cycling; postpone the test during a urinary infection and for several days after a rectal examination, cystoscopy or catheter. Tell your doctor if you take finasteride or dutasteride, which halve PSA.',
      },
    ],
    sources: [
      { title: 'EAU Guidelines: Prostate Cancer', url: 'https://uroweb.org/guidelines/prostate-cancer' },
      { title: 'AUA Guideline: Early Detection of Prostate Cancer', url: 'https://www.auanet.org/guidelines-and-quality/guidelines/early-detection-of-prostate-cancer-guidelines' },
      { title: 'National Cancer Institute: PSA Test', url: 'https://www.cancer.gov/types/prostate/psa-fact-sheet' },
    ],
  },
  // =========================================================================
  // 6. BPH — belirtiler ve tedavi seçenekleri (HoLEP yazısıyla çakışmaz:
  //    orada ameliyat süreci, burada tanı + hangi tedavi kime uygun)
  // =========================================================================
  {
    id: 'en-bph-options',
    title: 'Enlarged Prostate (BPH): Symptoms, Tests and Which Treatment Fits',
    slug: 'enlarged-prostate-bph-treatment-options',
    translations: { TR: 'prostat-buyumesi-belirtileri-ve-tedavisi', RU: 'uvelichenie-prostaty-dgpzh-lechenie' },
    language: 'EN',
    excerpt:
      'Waking at night, a weak stream, difficulty starting — benign prostatic hyperplasia affects most men over 50. What the tests mean, when medication is enough, and how to choose between HoLEP, Rezum and surgery.',
    category: 'Prostate Health',
    date: 'October 1, 2026',
    datePublished: '2026-10-01',
    dateModified: '2026-10-01',
    readTime: '8',
    author: AUTHOR,
    keywords:
      'enlarged prostate treatment, BPH symptoms, benign prostatic hyperplasia, nocturia treatment, weak urine stream, prostate medication vs surgery, BPH treatment Turkey, IPSS score',
    metaDescription:
      'Enlarged prostate (BPH): symptoms, IPSS score, the tests that matter, when medication is enough and how HoLEP, Rezum and TURP compare. Prof. Dr. Basri Çakıroğlu.',
    relatedService: 'prostate-diseases',
    content: `### What Benign Prostatic Hyperplasia Means
The prostate sits directly below the bladder and surrounds the urethra. From around the age of 40 it slowly enlarges under hormonal influence. This growth is **not cancer**; it is benign prostatic hyperplasia (BPH). The problem is mechanical: the enlarged tissue squeezes the channel urine passes through, and over the years the bladder has to work harder to push against it.

BPH affects roughly half of men over 50 and the large majority over 70. Not every enlarged prostate needs treatment. What matters is not the size of the gland but how much it disturbs your life and whether it is damaging the bladder or kidneys.

### The Symptoms
They usually begin quietly and worsen over years, which is why many men dismiss them as "getting older". They fall into two groups:

**Obstructive (emptying) symptoms**
* Hesitancy — waiting for the stream to start
* A weak, thin or interrupted stream
* Dribbling at the end
* The feeling that the bladder is not empty
* Needing to strain

**Irritative (storage) symptoms**
* Frequency — passing urine more than eight times a day
* **Nocturia** — waking at night to urinate, the symptom that most often ruins sleep
* Sudden, hard-to-postpone urgency
* Not reaching the toilet in time

Severity is measured with the **IPSS** (International Prostate Symptom Score), a seven-question form: under 8 is mild, 8-19 moderate, 20 and above severe. Filling it in before your appointment makes the conversation far more precise.

### What Happens If It Is Left
Untreated obstruction does more than reduce quality of life. The bladder muscle thickens, then gradually weakens. In advanced cases:
* **Acute urinary retention** — suddenly being unable to pass urine at all, requiring an emergency catheter
* Recurrent urinary infections and bladder stones
* Visible blood in the urine
* Urine retained permanently in the bladder, back-pressure on the kidneys (hydronephrosis) and loss of kidney function

Once any of these appears, treatment is no longer a matter of preference.

### The Tests That Matter
1. History and the IPSS questionnaire
2. Digital rectal examination — size, consistency, any suspicious firmness
3. **PSA** blood test, to rule out prostate cancer
4. Urine analysis
5. **Uroflowmetry** — a peak flow below 10 ml per second suggests obstruction
6. Ultrasound for prostate volume and post-void residual urine

Together these confirm BPH and separate it from conditions that cause similar symptoms: bladder cancer, urethral stricture, overactive bladder or a neurological cause.

### When Medication Is Enough
For moderate symptoms without complications, drugs are the first step.
* **Alpha blockers** (tamsulosin, silodosin, alfuzosin) relax the muscle in the prostate and bladder neck and improve flow within days. They do not shrink the prostate. Dizziness and absent ejaculation are possible side effects.
* **5-alpha reductase inhibitors** (finasteride, dutasteride) shrink the gland by about a quarter over 6-12 months and suit prostates above 40 ml. They act slowly and may reduce libido and erectile quality. They also halve PSA, so follow-up values must be doubled when interpreted.

The two groups are often combined. Where nocturia dominates, limiting evening fluids, caffeine and alcohol helps. Men who also have erectile difficulty may benefit from tadalafil, which addresses both.

### When Surgery Becomes the Answer
Surgery is considered when symptoms persist despite medication or side effects are intolerable, and whenever retention, recurrent infection, stones, bleeding or kidney back-pressure has appeared.

Almost all operations today are endoscopic, through the urethra, with no external incision:

**HoLEP (holmium laser enucleation).** The enlarged tissue is separated from its capsule in one piece and removed. Works at **any prostate size**, including 150-200 ml glands that would once have required open surgery. Low bleeding risk makes it one of the safest choices for men on blood thinners, and re-growth is very unlikely because the whole adenoma is taken out. Catheter usually comes out within 24-48 hours. The common trade-off is retrograde ejaculation.

**Rezum (water vapour therapy).** A few seconds of steam injected into the prostate shrink the tissue. Day-case, under local anaesthesia, with a high chance of preserving ejaculation. Suited to small and medium glands; the effect appears over weeks.

**TUR-P.** The long-established endoscopic method, cutting tissue piece by piece with electrical energy. Generally limited to prostates under 80 ml, with higher bleeding and re-growth rates than laser enucleation.

**Robotic or laparoscopic simple prostatectomy.** For very large glands where endoscopic enucleation is not suitable.

The right choice depends on prostate size, your age, medications, other conditions and how much weight you place on preserving ejaculation. This is a decision made together, not a ranking.

### Planning Treatment from Abroad
Your uroflowmetry, ultrasound (prostate volume and residual urine) and PSA can be reviewed before you travel, so the recommended method and the length of stay are known in advance. HoLEP typically requires 4-5 days in Istanbul; the dedicated guide on that operation covers the stay and recovery day by day.

${DISCLAIMER}`,
    faq: [
      {
        q: 'Does an enlarged prostate turn into cancer?',
        a: 'No. Benign prostatic hyperplasia and prostate cancer are different diseases, and BPH does not become cancer. They can coexist, which is why men with prostate symptoms are also assessed with a PSA test and examination.',
      },
      {
        q: 'Do I have to take prostate medication for life?',
        a: 'Medication controls symptoms rather than removing the prostate, so it is usually continued for as long as it works. Symptoms generally return if it is stopped. Men who want a definitive solution, or who do not benefit from drugs, are offered surgery.',
      },
      {
        q: 'Which operation is best for a large prostate?',
        a: 'HoLEP is size-independent and is routinely performed on glands of 150-200 ml, avoiding open surgery. TURP is generally limited to prostates under 80 ml, and Rezum suits small to medium glands.',
      },
      {
        q: 'Will treatment affect my sex life?',
        a: 'Erectile function is generally preserved after laser enucleation, but most men experience retrograde ejaculation — semen passes into the bladder. This is harmless and does not remove the sensation of orgasm, though it matters for men planning children. Rezum has a higher chance of preserving normal ejaculation.',
      },
      {
        q: 'When should I see a urologist?',
        a: 'As soon as nocturia, a weak stream or frequency begins to affect daily life, regardless of age. Even without symptoms, an annual prostate check is advised from 50 — or from 45 with a family history of prostate cancer.',
      },
    ],
    sources: [
      { title: 'EAU Guidelines: Management of Non-neurogenic Male LUTS', url: 'https://uroweb.org/guidelines/management-of-non-neurogenic-male-luts' },
      { title: 'AUA Guideline: Management of Benign Prostatic Hyperplasia', url: 'https://www.auanet.org/guidelines-and-quality/guidelines/benign-prostatic-hyperplasia-(bph)-guideline' },
    ],
  },

  // =========================================================================
  // 7. ERECTILE DYSFUNCTION
  // =========================================================================
  {
    id: 'en-erectile-dysfunction',
    title: 'Erectile Dysfunction: Causes, Tests and Treatment Options in Istanbul',
    slug: 'erectile-dysfunction-treatment-istanbul',
    translations: { TR: 'sertlesme-sorunu-nedenleri-ve-tedavisi', RU: 'erektilnaya-disfunkciya-lechenie-stambul' },
    language: 'EN',
    excerpt:
      'Erectile dysfunction is often the earliest warning sign of vascular disease, not merely a sexual problem. What causes it, which tests are worth doing, and how treatment progresses from tablets to shockwave therapy and penile implants.',
    category: 'Andrology',
    date: 'October 1, 2026',
    datePublished: '2026-10-01',
    dateModified: '2026-10-01',
    readTime: '8',
    author: AUTHOR,
    keywords:
      'erectile dysfunction treatment, ED treatment Turkey, penile implant Istanbul, shockwave therapy ED, penile Doppler ultrasound, PDE5 inhibitors, male sexual health Turkey',
    metaDescription:
      'Erectile dysfunction explained: vascular, hormonal and psychological causes, the tests that matter, and treatment from tablets to shockwave therapy and penile implants in Istanbul.',
    relatedService: 'andrology-infertility',
    content: `### What Counts as Erectile Dysfunction
Erectile dysfunction (ED) is the **persistent or recurrent** inability to achieve or maintain an erection sufficient for satisfactory intercourse. Isolated failures, which almost every man experiences, do not meet that definition; the problem is assessed when it has lasted at least three months. Roughly half of men over 40 are affected to some degree, and the proportion rises with age — but ED is not rare in younger men either.

### Why It Happens
An erection depends on a chain: brain, nerves, hormones, arteries and the erectile tissue itself. Cerebral arousal widens the penile arteries, the spongy tissue fills with blood, and the filled tissue compresses the veins so blood stays in. A fault anywhere along that chain impairs the erection. ED is therefore a **symptom**, not a disease in itself.

**Vascular — the most common cause.** The penile arteries are among the narrowest in the body, so atherosclerosis shows there first. This is why ED can appear **two to five years before** coronary artery disease announces itself. Diabetes, hypertension, high cholesterol, smoking and inactivity are the main risk factors.

**Hormonal.** Low testosterone (hypogonadism), thyroid disorders, raised prolactin. Low testosterone typically reduces desire as well.

**Neurological.** Diabetic nerve damage, spinal injury, multiple sclerosis, Parkinson's disease, pelvic surgery (radical prostatectomy, rectal surgery) and radiotherapy.

**Medication.** Some blood pressure drugs — particularly beta blockers and thiazides — antidepressants, prostate medication (5-alpha reductase inhibitors) and certain psychiatric drugs.

**Psychological.** Performance anxiety, depression, stress, relationship difficulties; more often prominent in younger men. Preserved morning and masturbatory erections point towards a psychogenic cause, though psychological and organic factors frequently coexist.

**Lifestyle and structural.** Smoking, excess alcohol, obesity, sleep apnoea, and Peyronie's disease (a plaque causing curvature).

### The Tests Worth Doing
1. **Detailed history** — onset (sudden or gradual), morning erections, desire, ejaculation, relationship context, medication, smoking and alcohol. The **IIEF** questionnaire quantifies severity.
2. **Examination** — penis, testes, pulses, prostate where age-appropriate, secondary sexual characteristics.
3. **Blood tests** — fasting glucose or HbA1c, lipid profile, morning **total testosterone**; prolactin, thyroid and PSA where indicated.
4. **Penile Doppler ultrasound** — arterial inflow and venous leak measured after an intracavernosal injection. The most informative test for confirming a vascular cause and choosing treatment, though not every man needs it.

Every man presenting with ED should also have his **cardiovascular risk** assessed. An ED diagnosis is sometimes the first clue to silent heart disease.

### Treatment, Step by Step
**1. Treat the cause and the lifestyle.** Controlling diabetes and blood pressure, losing weight, stopping smoking and exercising regularly can improve ED on their own and make every other treatment work better. Where a drug is responsible, it can be changed under medical supervision; where testosterone is low, replacement is considered in suitable men. Where a psychological component exists, sex therapy — ideally involving the partner — matters.

**2. Oral medication (PDE5 inhibitors).** Sildenafil, tadalafil, vardenafil and avanafil strengthen the vascular response **when sexual stimulation is present**; they do not create an erection on their own. Most men respond. Tadalafil's long action also suits low-dose daily use. Headache, flushing, nasal congestion and indigestion are the usual side effects. They must **never** be combined with nitrate heart medication (isosorbide, nitroglycerin), which causes a dangerous drop in blood pressure. Use prescribed medication and avoid counterfeit products sold online.

**3. Low-intensity shockwave therapy (Li-ESWT).** Low-energy sound waves applied externally aim to stimulate new vessel formation. Painless, no anaesthesia, typically 6-12 sessions. It may help men with mild to moderate **vascular** ED who respond partially to tablets. Guidelines describe it as an option in selected patients rather than a standard for everyone; long-term evidence is still accumulating.

**4. Vacuum erection device.** A cylinder draws blood into the penis, held by a ring at the base. Drug-free and safe; particularly useful in rehabilitation after prostate surgery and for men who cannot take tablets.

**5. Intracavernosal injection.** Alprostadil, alone or in combination, injected into the side of the penis before intercourse. Highly effective in men who do not respond to tablets; the first doses are titrated under medical supervision. Dose rules must be followed because of the risk of a prolonged erection (priapism).

**6. Penile implant.** The definitive solution when other methods fail or are unsuitable. **Inflatable** three-piece implants (a pump in the scrotum inflates and deflates them, giving the most natural result) or **malleable** semi-rigid devices allow an erection whenever wanted. Sensation, orgasm and ejaculation are unaffected. Patient and partner satisfaction is the highest of all ED treatments; infection is the main risk, reduced by modern antibiotic-coated devices. Surgery takes about an hour, with one night in hospital and a return to sexual activity after 4-6 weeks.

### When to Seek Help
Erectile difficulty lasting more than three months, loss of morning erections, a marked drop in desire, penile curvature or pain, or symptoms starting before the age of 40 all deserve assessment. ED is a treatable medical condition — and often a valuable opportunity to protect your cardiovascular health.

${DISCLAIMER}`,
    faq: [
      {
        q: 'Can erectile dysfunction be a sign of heart disease?',
        a: 'Yes. Because the penile arteries are very narrow, atherosclerosis affects them first, and ED can appear two to five years before coronary disease becomes apparent. Every man presenting with ED should have blood sugar, blood pressure, cholesterol and cardiovascular risk assessed.',
      },
      {
        q: 'Are ED tablets safe for the heart?',
        a: 'In men with stable heart disease who do not take nitrates, these drugs are safe. They must never be combined with nitrate medication (isosorbide, nitroglycerin). Men with a recent heart attack or uncontrolled cardiac disease should be assessed by a cardiologist first, and medication should always be prescribed rather than bought online.',
      },
      {
        q: 'Does shockwave therapy cure erectile dysfunction permanently?',
        a: 'In mild to moderate vascular ED it may help by stimulating new vessel formation, and it is painless with 6-12 sessions. It does not work for everyone, and guidelines present it as an option in selected patients. Evidence on how long the benefit lasts is still accumulating.',
      },
      {
        q: 'Does a penile implant feel natural?',
        a: 'Inflatable three-piece implants are not visible from outside and are inflated and deflated as wanted. Sensation, orgasm and ejaculation are unchanged. Satisfaction rates among patients and partners are the highest of all ED treatments, and sexual activity resumes after 4-6 weeks.',
      },
      {
        q: 'How can I tell whether the cause is psychological or physical?',
        a: 'Preserved morning and masturbatory erections, a sudden onset and variation by partner or situation suggest a psychological cause. A gradual problem present in all circumstances, with morning erections also diminishing, points to an organic (vascular or hormonal) cause. Blood tests and, where needed, penile Doppler ultrasound distinguish them — and the two often coexist.',
      },
    ],
    sources: [
      { title: 'EAU Guidelines: Sexual and Reproductive Health', url: 'https://uroweb.org/guidelines/sexual-and-reproductive-health' },
      { title: 'AUA Guideline: Erectile Dysfunction', url: 'https://www.auanet.org/guidelines-and-quality/guidelines/erectile-dysfunction-(ed)-guideline' },
    ],
  },

  // =========================================================================
  // 8. FEMALE URINARY INCONTINENCE
  // =========================================================================
  {
    id: 'en-female-incontinence',
    title: 'Urinary Incontinence in Women: Types, Treatment and the TOT Sling',
    slug: 'female-urinary-incontinence-treatment-turkey',
    translations: { TR: 'kadinlarda-idrar-kacirma-nedenleri-ve-tedavisi', RU: 'nederzhanie-mochi-u-zhenshchin-lechenie' },
    language: 'EN',
    excerpt:
      'Leaking when you cough, laugh or cannot reach the toilet in time is not an inevitable part of ageing. How stress and urge incontinence differ, what pelvic floor training achieves, and when a 30-minute sling operation is the answer.',
    category: 'Female Urology',
    date: 'October 1, 2026',
    datePublished: '2026-10-01',
    dateModified: '2026-10-01',
    readTime: '8',
    author: AUTHOR,
    keywords:
      'urinary incontinence treatment women, stress incontinence surgery, TOT sling Turkey, overactive bladder treatment, pelvic floor exercises, bladder botox, incontinence surgery Istanbul',
    metaDescription:
      'Urinary incontinence in women: stress versus urge type, pelvic floor training, medication, bladder Botox and the TOT sling operation. Prof. Dr. Basri Çakıroğlu, Istanbul.',
    relatedService: 'urogynecology',
    content: `### A Common Problem That Goes Unspoken
Urinary incontinence affects roughly one in three women at some point, far more commonly after childbirth and after the menopause. Despite that, many women wait years before seeking help — out of embarrassment, or because they believe it is simply part of growing older. They withdraw from social life, stop exercising and adapt to wearing pads. In reality, most cases are treated successfully once the type is correctly identified.

### The Three Types
Correct treatment begins with correct classification.

**1. Stress incontinence.** Leakage during coughing, sneezing, laughing, lifting, running or jumping — anything that raises abdominal pressure. The cause is weakness of the pelvic floor muscles and the connective tissue supporting the bladder neck and urethra. Childbirth, the menopause, excess weight and chronic coughing are the main contributors. Typically there is no urge beforehand; the leak happens with the movement.

**2. Urge incontinence.** A sudden, overwhelming need to pass urine and leakage before reaching the toilet, accompanied by frequency (more than eight times a day) and waking at night. The cause is involuntary contraction of the bladder muscle, a picture called **overactive bladder**. The classic example is a sudden urge on hearing running water or turning the key in the front door.

**3. Mixed.** Both together, common with increasing age. Which component dominates determines the order of treatment.

Less common causes include overflow incontinence from incomplete bladder emptying, neurogenic bladder, and fistulae after childbirth or surgery.

### Risk Factors
* Vaginal delivery, particularly multiple births or a large baby
* Menopause and falling oestrogen
* Excess weight
* Chronic cough (smoking, asthma, COPD) and chronic constipation
* Recurrent urinary infections
* Diabetes and neurological disease
* Certain medications (diuretics, muscle relaxants)
* Pelvic organ prolapse

### Assessment
Most women need no elaborate investigation:
* A detailed history — when does it happen, how often, how much?
* A **bladder diary** kept for three days, recording fluids, voiding times and leaks. One of the most valuable tools in diagnosis.
* Urine analysis, and culture where indicated — infection alone can cause urgency
* Examination: cough test, pelvic floor strength, presence of prolapse
* Post-void residual urine on ultrasound
* **Urodynamics** — bladder filling and voiding pressures. Not needed in every woman; reserved for unclear cases, previous surgery or when an operation is planned.

### Treatment, from Simple to Complex
Guidelines recommend starting with conservative measures in every type; many women improve without medication or surgery.

**Lifestyle.** Even 5-10% weight loss markedly reduces leakage episodes. Reducing caffeine, carbonated drinks and alcohol, spreading fluids through the day and stopping 2-3 hours before bed, treating constipation and chronic cough, and stopping smoking all help.

**Pelvic floor (Kegel) exercises.** First-line treatment for stress incontinence and useful in the urge type too. Contract and relax the pelvic muscles as if holding urine, 5-10 seconds at a time, three sets of 10-15 repetitions daily, consistently for at least three months. **Biofeedback** or electrical stimulation with a physiotherapist helps confirm that the right muscles are working. Done properly, more than half of women improve meaningfully.

**Bladder training.** For the urge type, gradually extending the interval between visits to the toilet — starting at an hour and adding 15 minutes a week towards 3-4 hours — restores bladder capacity and control.

**Medication (urge type / overactive bladder).**
* **Antimuscarinics** (solifenacin, tolterodine) reduce bladder contractions; dry mouth and constipation are common.
* **Beta-3 agonists** (mirabegron) are similarly effective without dry mouth; blood pressure is monitored.
* **Vaginal oestrogen** cream strengthens the mucosa in postmenopausal women and reduces urgency and infections.
There is no effective drug for stress incontinence; there the treatment is exercise and, where needed, surgery.

**Advanced options for drug-resistant urge incontinence.**
* **Botulinum toxin** injected into the bladder during cystoscopy; the effect lasts 6-9 months and can be repeated.
* **Tibial nerve stimulation** — a weekly fine-needle stimulus at the ankle.
* **Sacral neuromodulation** — an implanted "bladder pacemaker".

**Surgery for stress incontinence.**
* **Mid-urethral sling (TOT / TVT).** Through a 1-2 cm vaginal incision a thin tape is placed beneath the urethra; it supports the urethra at the moment of coughing. The procedure takes 20-30 minutes, with discharge the same or next day, and long-term dry rates are high.
* **Urethral bulking injections.** Can be done under local anaesthesia; the effect is shorter-lived than a sling, suiting women who prefer to avoid surgery or carry higher surgical risk.
* **Burch colposuspension.** The classic approach, performed laparoscopically or robotically, often chosen when other pelvic surgery is planned in the same session.
* Where prolapse coexists, repair is planned together with the incontinence procedure.

### When to Seek Help
Any leakage that affects your quality of life is reason enough. Blood in the urine, pain, recurrent infections, sudden severe symptoms or neurological signs (numbness or weakness in the legs) should be assessed without delay. Incontinence treatment today is a stepwise, patient-led field with high success rates — living with pads is not the only option.

${DISCLAIMER}`,
    faq: [
      {
        q: 'Do pelvic floor exercises really stop leakage?',
        a: 'Yes — they are the first-line treatment for stress incontinence and, done correctly and consistently, produce meaningful improvement in more than half of women. They should be continued for at least three months, three sets a day. A physiotherapist and biofeedback help confirm the right muscles are being used.',
      },
      {
        q: 'What is the difference between stress and urge incontinence?',
        a: 'In stress incontinence urine leaks with coughing, laughing or lifting, without a preceding urge; the cause is pelvic floor weakness. In urge incontinence a sudden overwhelming need arises and leakage occurs before reaching the toilet; the cause is involuntary bladder contraction. The treatments differ.',
      },
      {
        q: 'What does a TOT sling operation involve?',
        a: 'A thin tape is placed under the urethra through a 1-2 cm vaginal incision in a 20-30 minute procedure. Most women go home the same or next day and return to daily life within days. Long-term dry rates are high, making it one of the most effective treatments for stress incontinence.',
      },
      {
        q: 'Is there medication for incontinence?',
        a: 'Antimuscarinics and mirabegron are effective for urge incontinence (overactive bladder). There is no effective drug for stress incontinence; treatment there is pelvic floor training and, where needed, a sling operation.',
      },
      {
        q: 'Does incontinence after childbirth resolve?',
        a: 'Mild leakage in the first months after delivery usually improves with pelvic floor exercises. Leakage continuing beyond a year, or affecting quality of life, should be assessed — physiotherapy or surgical options are then discussed.',
      },
    ],
    sources: [
      { title: 'EAU Guidelines: Non-neurogenic Female LUTS', url: 'https://uroweb.org/guidelines/non-neurogenic-female-luts' },
      { title: 'AUA/SUFU Guideline: Surgical Treatment of Female Stress Urinary Incontinence', url: 'https://www.auanet.org/guidelines-and-quality/guidelines/stress-urinary-incontinence-(sui)-guideline' },
    ],
  },
];
