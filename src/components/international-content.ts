import {
  FileText, Plane, Building2, Stethoscope, HeartPulse, type LucideIcon,
} from 'lucide-react';

// ---------------------------------------------------------------------------
// /en/international-patients ve /ru/lechenie-v-turcii sayfalarının metinleri.
//
// İki dil aynı bileşeni (InternationalPage) kullanır; yalnızca bu sözlük
// değişir. Rusça metinler çeviri değil, BDT'den gelen hastanın sorduğu
// sırayla yazıldı (vize, refakatçi, uçuş, tercüman).
//
// ⚠️ FİYAT YAZMA — Sağlık Bakanlığı tanıtım mevzuatı.
// ---------------------------------------------------------------------------

export type IntlLang = 'EN' | 'RU';

interface Step { icon: LucideIcon; title: string; text: string }
interface Stay { procedure: string; days: string; id: string }
interface Faq { q: string; a: string }

export interface IntlContent {
  eyebrow: string;
  h1: string;
  lede: string;
  waCta: string;
  waMessage: string;
  stepsHeading: string;
  stepLabel: (i: number) => string;
  steps: Step[];
  stayHeading: string;
  stayNote: string;
  colProcedure: string;
  colStay: string;
  colDetails: string;
  stays: Stay[];
  hospitalHeading: string;
  hospitalPoints: string[];
  surgeonHeading: string;
  surgeonPoints: string[];
  servicesHeading: string;
  learnMore: string;
  guidesHeading: string;
  faqHeading: string;
  faq: Faq[];
  ctaHeading: string;
  ctaText: string;
  breadcrumbHome: string;
  breadcrumbSelf: string;
  headerTitle: string;
  headerSub: string;
  backHome: string;
  requestConsultation: string;
  footerTitle: string;
  footerDisclaimer: string;
}

export const INTL_CONTENT: Record<IntlLang, IntlContent> = {
  EN: {
    eyebrow: 'Urology care for patients from abroad',
    h1: 'Urology Treatment in Istanbul for International Patients',
    lede:
      'Prof. Dr. Basri Çakıroğlu, Professor of Urology and robotic surgeon, treats patients from the United Kingdom, Europe, the Gulf, the Balkans and the CIS at Hisar Intercontinental Hospital in Istanbul. Most cases — HoLEP laser prostate surgery, laser kidney stone removal, robotic prostatectomy and male fertility microsurgery — are planned remotely from your reports and completed within a single short visit.',
    waCta: 'Send reports on WhatsApp',
    waMessage: 'Hello, I am an international patient and would like to send my reports for evaluation.',
    stepsHeading: 'How it works',
    stepLabel: (i) => `Step ${i}`,
    steps: [
      { icon: FileText, title: 'Send your reports', text: 'Share your MRI, CT, ultrasound, PSA, semen analysis or biopsy reports by WhatsApp or e-mail. No appointment is needed for this first review.' },
      { icon: Stethoscope, title: 'Remote evaluation', text: 'Prof. Dr. Çakıroğlu reviews your case and, when useful, arranges a short video consultation. You receive a written plan: recommended treatment, length of stay and medications to stop.' },
      { icon: Plane, title: 'Travel planning', text: 'Once the plan is clear, you book flights and accommodation. Our coordinator advises on hotels near the hospital and can arrange airport transfer on request.' },
      { icon: Building2, title: 'Treatment in Istanbul', text: 'Consultation, pre-operative tests and surgery take place at Hisar Intercontinental Hospital, a JCI-accredited private hospital on the Asian side of Istanbul with 24-hour intensive care.' },
      { icon: HeartPulse, title: 'Follow-up from home', text: 'Your first check is completed before departure. Pathology and discharge reports are sent electronically; later tests can be done locally and shared with us, with video consultations whenever needed.' },
    ],
    stayHeading: 'Typical length of stay in Istanbul',
    stayNote: 'Includes consultation, pre-operative tests, surgery, hospital nights and the check-up before you fly. Individual plans may differ.',
    colProcedure: 'Procedure',
    colStay: 'Stay',
    colDetails: 'Details',
    stays: [
      { procedure: 'HoLEP laser prostate surgery', days: '4–5 days', id: 'prostate-diseases' },
      { procedure: 'Kidney stone laser treatment (RIRS / URS)', days: '3 days', id: 'stone-disease' },
      { procedure: 'Mini-PCNL for large kidney stones', days: '4–5 days', id: 'stone-disease' },
      { procedure: 'Robotic radical prostatectomy', days: '10–12 days', id: 'robotic-surgery' },
      { procedure: 'Robotic partial nephrectomy', days: '7–10 days', id: 'robotic-surgery' },
      { procedure: 'Microsurgical varicocele repair', days: '3–4 days', id: 'andrology-infertility' },
      { procedure: 'Penile implant surgery', days: '4–5 days', id: 'andrology-infertility' },
      { procedure: 'MRI + fusion prostate biopsy', days: '2–3 days', id: 'urologic-oncology' },
      { procedure: 'TOT sling for stress incontinence', days: '3 days', id: 'urogynecology' },
    ],
    hospitalHeading: 'The hospital',
    hospitalPoints: [
      'Hisar Intercontinental Hospital, Ümraniye — Asian side of Istanbul, 35 min from Sabiha Gökçen Airport',
      'JCI-accredited private hospital with 24-hour intensive care and on-site imaging (MRI, CT)',
      'daVinci surgical robot, holmium laser and current-generation flexible endoscopy',
      'Single rooms with companion bed; halal and special-diet meals available',
    ],
    surgeonHeading: 'The surgeon',
    surgeonPoints: [
      'Professor of Urology, Üsküdar University Faculty of Medicine',
      'Head of the Urology Clinic at Hisar Intercontinental Hospital since 2010',
      'More than 30 years of clinical practice; over 10,000 surgical procedures',
      'Focus: HoLEP laser prostate surgery, daVinci robotic uro-oncology, endourological stone surgery, andrology microsurgery',
    ],
    servicesHeading: 'Treatments for international patients',
    learnMore: 'Learn more',
    guidesHeading: 'Patient guides',
    faqHeading: 'Frequently asked questions',
    faq: [
      { q: 'Do I need a visa to come to Turkey for treatment?', a: 'Citizens of many countries enter Turkey visa-free or with an e-Visa obtained online in minutes. Check the official e-Visa website for your nationality; we provide an invitation letter on request for visa applications.' },
      { q: 'Is there an English-speaking coordinator?', a: 'Yes. An English-speaking patient coordinator handles communication before, during and after your visit; Arabic and Russian interpretation can be arranged at the hospital.' },
      { q: 'Can my companion stay with me in the hospital?', a: 'Yes. Rooms at Hisar Intercontinental Hospital accommodate one companion, and hotels within a few minutes of the hospital are available for the rest of the stay.' },
      { q: 'How soon after surgery can I fly?', a: 'It depends on the procedure: typically 2–3 days after stone or varicocele surgery, 3–4 days after HoLEP and about 10 days after robotic prostatectomy (after catheter removal). Your discharge plan states the earliest safe date.' },
      { q: 'How do I get a cost estimate?', a: 'After the remote review of your reports you receive a personalised treatment plan and the hospital provides a written estimate covering surgery, anaesthesia and hospital stay. Contact us by WhatsApp or e-mail to start.' },
    ],
    ctaHeading: 'Start with a free review of your reports',
    ctaText: 'Send your reports by WhatsApp or e-mail. You will receive a written assessment and a treatment plan before you make any travel arrangements.',
    breadcrumbHome: 'Home',
    breadcrumbSelf: 'International Patients',
    headerTitle: 'International Patients',
    headerSub: 'Istanbul, Turkey',
    backHome: 'Back to home',
    requestConsultation: 'Request Consultation',
    footerTitle: 'Prof. Dr. Basri Çakıroğlu — International Patients',
    footerDisclaimer: 'Content on this page is for information only and does not replace an individual medical consultation.',
  },

  RU: {
    eyebrow: 'Урология для пациентов из-за рубежа',
    h1: 'Лечение урологических заболеваний в Стамбуле для иностранных пациентов',
    lede:
      'Проф. д-р Басри Чакыроглу — профессор урологии и роботический хирург — принимает пациентов из России, Казахстана, Азербайджана и других стран СНГ в клинике Hisar Intercontinental Hospital в Стамбуле. Большинство случаев — лазерная операция простаты HoLEP, лазерное удаление камней в почках, роботическая простатэктомия и микрохирургия при мужском бесплодии — планируются дистанционно по вашим документам и выполняются за одну короткую поездку.',
    waCta: 'Отправить документы в WhatsApp',
    waMessage: 'Здравствуйте! Я пациент из-за рубежа и хочу прислать свои обследования на оценку.',
    stepsHeading: 'Как это работает',
    stepLabel: (i) => `Шаг ${i}`,
    steps: [
      { icon: FileText, title: 'Пришлите обследования', text: 'Отправьте МРТ, КТ, УЗИ, ПСА, спермограмму или результат биопсии в WhatsApp либо по e-mail. Для первичной оценки запись не нужна.' },
      { icon: Stethoscope, title: 'Дистанционная оценка', text: 'Проф. д-р Чакыроглу изучает документы и при необходимости назначает короткую видеоконсультацию. Вы получаете письменный план: рекомендуемое лечение, сроки пребывания и препараты, которые нужно отменить.' },
      { icon: Plane, title: 'Планирование поездки', text: 'Когда план согласован, вы покупаете билеты и бронируете проживание. Координатор подскажет отели рядом с клиникой и при необходимости организует трансфер из аэропорта.' },
      { icon: Building2, title: 'Лечение в Стамбуле', text: 'Консультация, предоперационное обследование и операция проходят в Hisar Intercontinental Hospital — частной клинике с аккредитацией JCI на азиатской стороне Стамбула и круглосуточной реанимацией.' },
      { icon: HeartPulse, title: 'Наблюдение после возвращения', text: 'Первый контроль проводится до вылета. Гистологическое заключение и выписка направляются в электронном виде; дальнейшие анализы можно сдавать по месту жительства и присылать нам, видеоконсультации — по необходимости.' },
    ],
    stayHeading: 'Сколько дней нужно провести в Стамбуле',
    stayNote: 'Включает консультацию, обследование, операцию, ночи в стационаре и контрольный осмотр перед вылетом. Индивидуальный план может отличаться.',
    colProcedure: 'Операция',
    colStay: 'Срок',
    colDetails: 'Подробнее',
    stays: [
      { procedure: 'Лазерная операция простаты HoLEP', days: '4–5 дней', id: 'prostate-diseases' },
      { procedure: 'Лазерное удаление камней (RIRS / URS)', days: '3 дня', id: 'stone-disease' },
      { procedure: 'Мини-ПНЛ при крупных камнях почки', days: '4–5 дней', id: 'stone-disease' },
      { procedure: 'Роботическая радикальная простатэктомия', days: '10–12 дней', id: 'robotic-surgery' },
      { procedure: 'Роботическая резекция почки', days: '7–10 дней', id: 'robotic-surgery' },
      { procedure: 'Микрохирургическая операция при варикоцеле', days: '3–4 дня', id: 'andrology-infertility' },
      { procedure: 'Установка пенильного протеза', days: '4–5 дней', id: 'andrology-infertility' },
      { procedure: 'МРТ и фьюжн-биопсия простаты', days: '2–3 дня', id: 'urologic-oncology' },
      { procedure: 'Слинговая операция TOT при недержании', days: '3 дня', id: 'urogynecology' },
    ],
    hospitalHeading: 'О клинике',
    hospitalPoints: [
      'Hisar Intercontinental Hospital, район Умрание — азиатская часть Стамбула, 35 минут от аэропорта Сабиха Гёкчен',
      'Частная клиника с международной аккредитацией JCI, круглосуточная реанимация и собственная диагностика (МРТ, КТ)',
      'Роботическая система daVinci, гольмиевый лазер и гибкая эндоскопия последнего поколения',
      'Одноместные палаты с местом для сопровождающего; халяльное и диетическое питание',
    ],
    surgeonHeading: 'О враче',
    surgeonPoints: [
      'Профессор урологии, медицинский факультет Университета Ускюдар',
      'Руководитель урологической клиники Hisar Intercontinental Hospital с 2010 года',
      'Более 30 лет клинической практики, свыше 10 000 выполненных операций',
      'Основные направления: лазерная хирургия простаты HoLEP, роботическая онкоурология daVinci, эндоурологическое лечение камней, микрохирургия в андрологии',
    ],
    servicesHeading: 'Направления лечения для иностранных пациентов',
    learnMore: 'Подробнее',
    guidesHeading: 'Материалы для пациентов',
    faqHeading: 'Частые вопросы',
    faq: [
      { q: 'Нужна ли виза для поездки на лечение в Турцию?', a: 'Граждане России, Казахстана, Азербайджана и ряда других стран въезжают в Турцию без визы или по электронной визе, которая оформляется онлайн за несколько минут. Уточните правила для своего гражданства на официальном сайте e-Visa; при необходимости мы предоставим приглашение от клиники.' },
      { q: 'Есть ли русскоговорящий координатор?', a: 'Да. Координатор сопровождает вас до, во время и после поездки на русском языке; в клинике также доступен перевод во время консультаций и госпитализации.' },
      { q: 'Может ли сопровождающий остаться со мной в больнице?', a: 'Да. В палатах Hisar Intercontinental Hospital предусмотрено место для одного сопровождающего, а на остальные дни можно разместиться в отеле в нескольких минутах от клиники.' },
      { q: 'Через сколько дней после операции можно лететь?', a: 'Зависит от вмешательства: обычно через 2–3 дня после операции по поводу камней или варикоцеле, через 3–4 дня после HoLEP и примерно через 10 дней после роботической простатэктомии (после удаления катетера). Точная дата указывается в выписке.' },
      { q: 'Как узнать стоимость лечения?', a: 'После дистанционной оценки документов вы получаете индивидуальный план лечения, а клиника предоставляет письменный расчёт, включающий операцию, анестезию и пребывание в стационаре. Напишите нам в WhatsApp или на e-mail, чтобы начать.' },
    ],
    ctaHeading: 'Начните с бесплатной оценки ваших обследований',
    ctaText: 'Пришлите документы в WhatsApp или по e-mail. Вы получите письменное заключение и план лечения ещё до того, как планировать поездку.',
    breadcrumbHome: 'Главная',
    breadcrumbSelf: 'Лечение в Турции',
    headerTitle: 'Лечение в Турции',
    headerSub: 'Стамбул, Турция',
    backHome: 'На главную',
    requestConsultation: 'Записаться на консультацию',
    footerTitle: 'Проф. д-р Басри Чакыроглу — пациентам из-за рубежа',
    footerDisclaimer: 'Информация на этой странице носит ознакомительный характер и не заменяет очную консультацию врача.',
  },
};
