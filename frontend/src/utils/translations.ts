export type Language = 'en' | 'gr' | 'ru';

export type TranslationKey =
  | 'nav.home'
  | 'nav.services'
  | 'nav.about'
  | 'nav.testimonials'
  | 'nav.gallery'
  | 'nav.booking'
  | 'nav.contact'
  | 'nav.adminLogin'
  | 'hero.badge'
  | 'hero.cta'
  | 'hero.ctaSecondary'
  | 'hero.stat1Label'
  | 'hero.stat2Label'
  | 'hero.stat3Label'
  | 'services.title'
  | 'services.subtitle'
  | 'services.learnMore'
  | 'about.title'
  | 'about.subtitle'
  | 'about.highlight1'
  | 'about.highlight2'
  | 'about.highlight3'
  | 'about.highlight4'
  | 'testimonials.title'
  | 'testimonials.subtitle'
  | 'gallery.title'
  | 'gallery.subtitle'
  | 'gallery.before'
  | 'gallery.after'
  | 'gallery.toggleBefore'
  | 'gallery.toggleAfter'
  | 'booking.title'
  | 'booking.subtitle'
  | 'booking.name'
  | 'booking.email'
  | 'booking.phone'
  | 'booking.location'
  | 'booking.service'
  | 'booking.date'
  | 'booking.message'
  | 'booking.submit'
  | 'booking.submitting'
  | 'booking.success'
  | 'booking.successMsg'
  | 'booking.namePlaceholder'
  | 'booking.emailPlaceholder'
  | 'booking.phonePlaceholder'
  | 'booking.locationPlaceholder'
  | 'booking.messagePlaceholder'
  | 'booking.selectService'
  | 'booking.required'
  | 'contact.title'
  | 'contact.subtitle'
  | 'contact.phone'
  | 'contact.email'
  | 'contact.address'
  | 'contact.whatsapp'
  | 'contact.followUs'
  | 'footer.rights'
  | 'footer.builtWith';

export type Translations = Record<TranslationKey, string>;

const en: Translations = {
  'nav.home': 'Home',
  'nav.services': 'Services',
  'nav.about': 'About',
  'nav.testimonials': 'Testimonials',
  'nav.gallery': 'Gallery',
  'nav.booking': 'Book Now',
  'nav.contact': 'Contact',
  'nav.adminLogin': 'Admin',
  'hero.badge': 'Professional Drone Cleaning',
  'hero.cta': 'Get a Free Quote',
  'hero.ctaSecondary': 'View Our Work',
  'hero.stat1Label': 'Projects Completed',
  'hero.stat2Label': 'Client Satisfaction',
  'hero.stat3Label': 'Years Experience',
  'services.title': 'Our Services',
  'services.subtitle': 'Advanced drone technology for precision cleaning solutions',
  'services.learnMore': 'Learn More',
  'about.title': 'About Drone X Solutions',
  'about.subtitle': 'Pioneering the future of industrial cleaning',
  'about.highlight1': 'Eco-Friendly',
  'about.highlight2': 'Precision Tech',
  'about.highlight3': 'Certified Team',
  'about.highlight4': 'Fast Turnaround',
  'testimonials.title': 'What Our Clients Say',
  'testimonials.subtitle': 'Trusted by businesses across Cyprus',
  'gallery.title': 'Before & After',
  'gallery.subtitle': 'See the Drone X difference',
  'gallery.before': 'Before',
  'gallery.after': 'After',
  'gallery.toggleBefore': 'Before',
  'gallery.toggleAfter': 'After',
  'booking.title': 'Book a Service',
  'booking.subtitle': 'Request a free consultation and quote',
  'booking.name': 'Full Name',
  'booking.email': 'Email Address',
  'booking.phone': 'Phone Number',
  'booking.location': 'Location / Address',
  'booking.service': 'Service Type',
  'booking.date': 'Preferred Date',
  'booking.message': 'Additional Details',
  'booking.submit': 'Submit Request',
  'booking.submitting': 'Submitting...',
  'booking.success': 'Request Submitted!',
  'booking.successMsg': 'Thank you! We will contact you within 24 hours to confirm your booking.',
  'booking.namePlaceholder': 'John Smith',
  'booking.emailPlaceholder': 'john@example.com',
  'booking.phonePlaceholder': '+357 25 000 000',
  'booking.locationPlaceholder': 'Limassol, Cyprus',
  'booking.messagePlaceholder': 'Tell us about your project...',
  'booking.selectService': 'Select a service',
  'booking.required': 'This field is required',
  'contact.title': 'Contact Us',
  'contact.subtitle': 'Get in touch with our team',
  'contact.phone': 'Phone',
  'contact.email': 'Email',
  'contact.address': 'Address',
  'contact.whatsapp': 'Chat on WhatsApp',
  'contact.followUs': 'Follow Us',
  'footer.rights': 'All rights reserved.',
  'footer.builtWith': 'Built with',
};

const gr: Translations = {
  'nav.home': 'Αρχική',
  'nav.services': 'Υπηρεσίες',
  'nav.about': 'Σχετικά',
  'nav.testimonials': 'Μαρτυρίες',
  'nav.gallery': 'Γκαλερί',
  'nav.booking': 'Κράτηση',
  'nav.contact': 'Επικοινωνία',
  'nav.adminLogin': 'Διαχειριστής',
  'hero.badge': 'Επαγγελματικός Καθαρισμός Drone',
  'hero.cta': 'Δωρεάν Προσφορά',
  'hero.ctaSecondary': 'Δείτε τις Εργασίες μας',
  'hero.stat1Label': 'Ολοκληρωμένα Έργα',
  'hero.stat2Label': 'Ικανοποίηση Πελατών',
  'hero.stat3Label': 'Χρόνια Εμπειρίας',
  'services.title': 'Οι Υπηρεσίες μας',
  'services.subtitle': 'Προηγμένη τεχνολογία drone για λύσεις καθαρισμού ακριβείας',
  'services.learnMore': 'Μάθετε Περισσότερα',
  'about.title': 'Σχετικά με Drone X Solutions',
  'about.subtitle': 'Πρωτοπόροι στο μέλλον του βιομηχανικού καθαρισμού',
  'about.highlight1': 'Φιλικό προς το Περιβάλλον',
  'about.highlight2': 'Τεχνολογία Ακριβείας',
  'about.highlight3': 'Πιστοποιημένη Ομάδα',
  'about.highlight4': 'Γρήγορη Εκτέλεση',
  'testimonials.title': 'Τι Λένε οι Πελάτες μας',
  'testimonials.subtitle': 'Εμπιστευόμαστε από επιχειρήσεις σε όλη την Κύπρο',
  'gallery.title': 'Πριν & Μετά',
  'gallery.subtitle': 'Δείτε τη διαφορά Drone X',
  'gallery.before': 'Πριν',
  'gallery.after': 'Μετά',
  'gallery.toggleBefore': 'Πριν',
  'gallery.toggleAfter': 'Μετά',
  'booking.title': 'Κλείστε Ραντεβού',
  'booking.subtitle': 'Ζητήστε δωρεάν συμβουλή και προσφορά',
  'booking.name': 'Πλήρες Όνομα',
  'booking.email': 'Διεύθυνση Email',
  'booking.phone': 'Αριθμός Τηλεφώνου',
  'booking.location': 'Τοποθεσία / Διεύθυνση',
  'booking.service': 'Τύπος Υπηρεσίας',
  'booking.date': 'Προτιμώμενη Ημερομηνία',
  'booking.message': 'Επιπλέον Λεπτομέρειες',
  'booking.submit': 'Υποβολή Αιτήματος',
  'booking.submitting': 'Υποβολή...',
  'booking.success': 'Το Αίτημα Υποβλήθηκε!',
  'booking.successMsg': 'Ευχαριστούμε! Θα επικοινωνήσουμε μαζί σας εντός 24 ωρών.',
  'booking.namePlaceholder': 'Γιάννης Παπαδόπουλος',
  'booking.emailPlaceholder': 'giannis@example.com',
  'booking.phonePlaceholder': '+357 25 000 000',
  'booking.locationPlaceholder': 'Λεμεσός, Κύπρος',
  'booking.messagePlaceholder': 'Πείτε μας για το έργο σας...',
  'booking.selectService': 'Επιλέξτε υπηρεσία',
  'booking.required': 'Αυτό το πεδίο είναι υποχρεωτικό',
  'contact.title': 'Επικοινωνήστε μαζί μας',
  'contact.subtitle': 'Επικοινωνήστε με την ομάδα μας',
  'contact.phone': 'Τηλέφωνο',
  'contact.email': 'Email',
  'contact.address': 'Διεύθυνση',
  'contact.whatsapp': 'Συνομιλία στο WhatsApp',
  'contact.followUs': 'Ακολουθήστε μας',
  'footer.rights': 'Όλα τα δικαιώματα διατηρούνται.',
  'footer.builtWith': 'Φτιαγμένο με',
};

const ru: Translations = {
  'nav.home': 'Главная',
  'nav.services': 'Услуги',
  'nav.about': 'О нас',
  'nav.testimonials': 'Отзывы',
  'nav.gallery': 'Галерея',
  'nav.booking': 'Записаться',
  'nav.contact': 'Контакты',
  'nav.adminLogin': 'Админ',
  'hero.badge': 'Профессиональная чистка дронами',
  'hero.cta': 'Получить бесплатную смету',
  'hero.ctaSecondary': 'Посмотреть наши работы',
  'hero.stat1Label': 'Выполненных проектов',
  'hero.stat2Label': 'Довольных клиентов',
  'hero.stat3Label': 'Лет опыта',
  'services.title': 'Наши услуги',
  'services.subtitle': 'Передовые технологии дронов для точной очистки',
  'services.learnMore': 'Подробнее',
  'about.title': 'О Drone X Solutions',
  'about.subtitle': 'Пионеры будущего промышленной очистки',
  'about.highlight1': 'Экологичность',
  'about.highlight2': 'Точные технологии',
  'about.highlight3': 'Сертифицированная команда',
  'about.highlight4': 'Быстрое выполнение',
  'testimonials.title': 'Что говорят наши клиенты',
  'testimonials.subtitle': 'Нам доверяют компании по всему Кипру',
  'gallery.title': 'До и после',
  'gallery.subtitle': 'Оцените разницу Drone X',
  'gallery.before': 'До',
  'gallery.after': 'После',
  'gallery.toggleBefore': 'До',
  'gallery.toggleAfter': 'После',
  'booking.title': 'Записаться на услугу',
  'booking.subtitle': 'Запросите бесплатную консультацию и смету',
  'booking.name': 'Полное имя',
  'booking.email': 'Электронная почта',
  'booking.phone': 'Номер телефона',
  'booking.location': 'Местоположение / Адрес',
  'booking.service': 'Тип услуги',
  'booking.date': 'Предпочтительная дата',
  'booking.message': 'Дополнительные сведения',
  'booking.submit': 'Отправить заявку',
  'booking.submitting': 'Отправка...',
  'booking.success': 'Заявка отправлена!',
  'booking.successMsg': 'Спасибо! Мы свяжемся с вами в течение 24 часов для подтверждения.',
  'booking.namePlaceholder': 'Иван Иванов',
  'booking.emailPlaceholder': 'ivan@example.com',
  'booking.phonePlaceholder': '+357 25 000 000',
  'booking.locationPlaceholder': 'Лимасол, Кипр',
  'booking.messagePlaceholder': 'Расскажите нам о вашем проекте...',
  'booking.selectService': 'Выберите услугу',
  'booking.required': 'Это поле обязательно',
  'contact.title': 'Свяжитесь с нами',
  'contact.subtitle': 'Обратитесь к нашей команде',
  'contact.phone': 'Телефон',
  'contact.email': 'Email',
  'contact.address': 'Адрес',
  'contact.whatsapp': 'Написать в WhatsApp',
  'contact.followUs': 'Следите за нами',
  'footer.rights': 'Все права защищены.',
  'footer.builtWith': 'Создано с',
};

export const translations: Record<Language, Translations> = { en, gr, ru };

// Alias exported for backward compatibility with useTranslation and AdminTranslationsTab
export const defaultTranslations: Record<Language, Translations> = translations;

export function getTranslation(lang: Language, key: TranslationKey): string {
  return translations[lang][key] || translations['en'][key] || key;
}
