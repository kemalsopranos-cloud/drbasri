// ---------------------------------------------------------------------------
// Rusça arayüz metinleri.
//
// Anahtar = kaynaktaki TÜRKÇE metin (bkz. src/i18n.ts → L()). Böylece her
// L(language, {...}) çağrısına üçüncü bir alan eklemek gerekmez ve çeviriler
// tek dosyada gözden geçirilebilir. Karşılığı olmayan metin İNGİLİZCEYE düşer.
//
// Yeni bir L() çağrısı eklerken Türkçe metnin karşılığını buraya da ekle;
// eksik kalırsa sayfa bozulmaz ama o cümle İngilizce görünür.
// ---------------------------------------------------------------------------

export const RU_TEXT: Record<string, string> = {
  // --- Kahraman bölümü / genel ---
  'Modern Üroloji · Akademik Vizyon · İstanbul': 'Современная урология · Научный подход · Стамбул',
  'Hızlı Randevu Formu': 'Быстрая запись на приём',
  'Klinik asistanımız sizi arayarak randevuyu teyit edecektir.':
    'Наш координатор перезвонит вам и подтвердит приём.',
  'Örn: Ahmet Yılmaz': 'Например: Иван Петров',
  'Uzmanlık Seçiniz': 'Выберите направление',
  'Mesajınız (Opsiyonel)': 'Сообщение (необязательно)',
  'Şikayetinizi kısaca açıklayabilirsiniz...': 'Кратко опишите вашу жалобу…',
  'Talep Gönderildi!': 'Заявка отправлена!',
  'Randevu talebiniz başarıyla alınmıştır. Klinik asistanımız en kısa sürede sizinle iletişime geçecektir.':
    'Ваша заявка принята. Наш координатор свяжется с вами в ближайшее время.',
  'Yeni Talep': 'Новая заявка',
  'Lütfen bizi arayın': 'Пожалуйста, свяжитесь с нами',
  'Talebiniz kaydedildi, lütfen bizi arayın': 'Заявка сохранена — свяжитесь с нами',
  'Talebiniz kaydedildi ancak bildirim gönderilemedi. Randevunuz için lütfen telefon veya WhatsApp ile ulaşın.':
    'Заявка сохранена, но уведомление не было доставлено. Пожалуйста, позвоните нам или напишите в WhatsApp.',
  'Talebiniz kaydedildi ancak bildirim gönderilemedi. Randevunuzun kesinleşmesi için lütfen telefon veya WhatsApp ile bize ulaşın.':
    'Заявка сохранена, но уведомление не было доставлено. Чтобы подтвердить приём, позвоните нам или напишите в WhatsApp.',

  // --- İstatistikler / rozetler ---
  'Yıllık Deneyim': 'лет опыта',
  'Başarılı Ameliyat': 'успешных операций',
  'Bilimsel Yayın': 'научных публикаций',
  'Uluslararası Yayın': 'Международные публикации',
  'Uluslararası saygın hakemli dergilerde yayınlanmış 80+ bilimsel makale ve yayın.':
    'Более 80 научных статей в рецензируемых международных журналах.',
  'Akademik geçmişi ile binlerce başarılı operasyona imza atmış cerrah.':
    'Хирург с научной школой и тысячами успешно проведённых операций.',
  'daVinci Robotik Cerrahi ve Holmiyum Lazer (HoLEP) teknolojilerinde uzman sertifikalı klinisyen.':
    'Сертифицированный специалист по роботической хирургии daVinci и гольмиевому лазеру (HoLEP).',
  'Tıp & Üroloji Pratiği': 'Медицинская практика',
  'Minimal İnvaziv Yaklaşımlar': 'Малоинвазивные методы',
  'Hızlı İyileşme Protokolleri': 'Протоколы быстрого восстановления',
  'Kişiselleştirilmiş Cerrahi Plan': 'Индивидуальный план операции',
  'Multidisipliner Onkoloji': 'Мультидисциплинарная онкология',
  'Mikro & Lazer Cerrahi': 'Микро- и лазерная хирургия',

  // --- Gezinme / bölüm başlıkları ---
  'Uzmanlık Alanlarımız': 'Направления лечения',
  'Uzmanlık Alanı': 'Направление',
  'İlgili Diğer Uzmanlık Alanları': 'Другие направления',
  'Detaylı Sayfayı Görüntüle': 'Подробнее',
  'Sayfayı Aç': 'Открыть страницу',
  'Tam Sayfayı Görüntüle →': 'Открыть страницу →',
  'ÜROLOJİ': 'УРОЛОГИЯ',
  'ÜROLOJİ · İSTANBUL / ÜMRANİYE': 'УРОЛОГИЯ · СТАМБУЛ / УМРАНИЕ',
  'PROF. DR. BASRİ ÇAKIROĞLU': 'ПРОФ. Д-Р БАСРИ ЧАКЫРОГЛУ',

  // --- Blog ---
  'Tıbbi Bilgi & Sağlık Rehberi': 'Медицинские материалы',
  'Tıbbi Bilgi Portalı & Sağlık Rehberi': 'Медицинский портал для пациентов',
  'Tıbbi Yayınlar (Blog)': 'Статьи для пациентов',
  'Üroloji & Robotik Cerrahi Makaleleri': 'Статьи об урологии и роботической хирургии',
  'Prof. Dr. Basri Çakıroğlu tarafından kaleme alınan güncel tedavi yöntemleri, HoLEP lazer cerrahisi, prostat sağlığı ve klinik rehberler.':
    'Материалы проф. д-ра Басри Чакыроглу: современные методы лечения, лазерная хирургия HoLEP, здоровье простаты и клинические руководства.',
  'Makalelerde veya konularda ara...': 'Поиск по статьям и темам…',
  'Aranan kriterlere uygun makale bulunamadı.': 'По заданным условиям статьи не найдены.',
  'Tüm Makalelere Dön': 'Ко всем статьям',
  'Önerilen Diğer Tıbbi Makaleler': 'Другие статьи по теме',
  'Bu Konuda Hazırladığımız Rehberler': 'Материалы по этой теме',
  'İçindekiler': 'Содержание',
  'İlgili Konu Etiketleri': 'Теги',
  'İlgili Tedavi Sayfası': 'Страница лечения',
  'Kaynaklar ve Kılavuzlar': 'Источники и клинические рекомендации',
  'Yazar Hakkında': 'Об авторе',
  'Akademik özgeçmiş': 'Научная биография',
  'Üroloji Profesörü (Üsküdar Üniversitesi Tıp Fakültesi), Hisar Intercontinental Hospital Üroloji Kliniği Sorumlusu. HoLEP lazer prostat cerrahisi, daVinci robotik cerrahi ve endoürolojik taş tedavileri alanında 30 yılı aşkın klinik deneyim.':
    'Профессор урологии (медицинский факультет Университета Ускюдар), руководитель урологической клиники Hisar Intercontinental Hospital. Более 30 лет клинического опыта в лазерной хирургии простаты HoLEP, роботической хирургии daVinci и эндоурологическом лечении камней.',
  'Güncelleme: ': 'Обновлено: ',
  'Paylaş': 'Поделиться',
  'Kopyalandı!': 'Скопировано!',
  'Sık Sorulan Sorular': 'Частые вопросы',

  // --- İletişim ---
  'Hemen Arayın': 'Позвонить',
  'Direkt asistan hattı': 'Прямая линия координатора',
  'Hastane santrali: ': 'Телефон больницы: ',
  'Ümraniye ve Anadolu Yakası’nda Üroloji': 'Урология в Стамбуле (Умрание, азиатская часть)',
  'Randevu Oluştur': 'Записаться на приём',
  'Bu Konuda Uzman Görüşü veya Randevu mu Almak İstiyorsunuz?':
    'Нужна консультация специалиста или запись на приём?',
  'Prof. Dr. Basri Çakıroğlu ile muayene planlamak veya ameliyat süreçleri hakkında bilgi almak için iletişime geçebilirsiniz.':
    'Свяжитесь с нами, чтобы записаться на приём к проф. д-ру Басри Чакыроглу или узнать подробности об операции.',

  // --- Form doğrulama ---
  'Lütfen adınızı ve soyadınızı tam giriniz.': 'Укажите имя и фамилию полностью.',
  'Geçerli bir telefon numarası giriniz.': 'Укажите корректный номер телефона.',
  'Geçerli bir telefon numarası giriniz (En az 10 hane).':
    'Укажите корректный номер телефона (не менее 10 цифр).',
  'E-posta formatı geçersizdir.': 'Некорректный формат e-mail.',
  'Geçmiş bir tarih seçemezsiniz.': 'Нельзя выбрать прошедшую дату.',
  'Saat seçiniz...': 'Выберите время…',
  'Lütfen tüm zorunlu alanları doldurunuz.': 'Заполните все обязательные поля.',
  'Randevu için aydınlatma metnini onaylamanız gerekmektedir.':
    'Для записи необходимо согласиться с политикой обработки данных.',

  // --- Görsel alt metni ---
  'Prof. Dr. Basri Çakıroğlu ameliyathanede endoskopik böbrek taşı ameliyatı sırasında':
    'Проф. д-р Басри Чакыроглу во время эндоскопической операции по удалению камня в почке',

  // --- Hekim paneli (ziyaretçiye görünmez; yine de çevrildi) ---
  'Hekim Girişi': 'Вход для врача',
  'Hekim & Yazar Giriş Paneli': 'Панель врача и автора',
  'Yazar Paneli': 'Панель автора',
  'Yazar Paneli Aktif': 'Панель автора активна',
  'Yazar Panelini Kapat ve Çıkış Yap': 'Закрыть панель и выйти',
  'Paneli Kapat': 'Закрыть панель',
  'Yeni Makale Yayınla': 'Опубликовать статью',
  'Yeni SEO Makalesi Yayınla': 'Опубликовать SEO-статью',
  'Makaleyi Sil': 'Удалить статью',
  'Bu makaleyi silmek istediğinize emin misiniz?': 'Удалить эту статью?',
};
