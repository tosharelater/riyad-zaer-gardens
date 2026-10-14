import type { Locale } from './paths';
import { contactInfo } from '../data/site';

const fr = {
  brand: {
    name: 'Riyad Zaer Gardens',
    by: 'by La Manoussa',
    slogan: 'Nouveau pôle urbain à Rabat.',
    about: 'Appartements 2 & 3 chambres et fonds de commerce à 25 minutes de Rabat.',
  },
  nav: [
    { label: 'Accueil', path: '/' },
    { label: 'Le projet', path: '/le-projet' },
    { label: 'Appartements', path: '/appartements' },
    { label: 'Fonds de commerce', path: '/fonds-de-commerce' },
    { label: 'Localisation', path: '/localisation' },
    { label: 'Blog', path: '/blog' },
    { label: 'Contact', path: '/contact' },
  ],
  footerProject: [
    { label: 'Le projet', path: '/le-projet' },
    { label: 'Appartements', path: '/appartements' },
    { label: 'Fonds de commerce', path: '/fonds-de-commerce' },
    { label: 'Localisation', path: '/localisation' },
  ],
  footerInfo: [
    { label: 'Questions fréquentes', path: '/faq' },
    { label: 'Blog', path: '/blog' },
    { label: 'Le promoteur', path: '/la-manoussa' },
    { label: 'Contact', path: '/contact' },
  ],
  footerCols: {
    project: 'Le projet',
    info: 'Informations',
    contact: 'Nous joindre',
  },
  cta: 'Être rappelé',
  call: 'Appeler',
  whatsapp: 'WhatsApp',
  writeWhatsapp: 'Écrire sur WhatsApp',
  menu: 'Menu',
  convert: {
    h2: 'Parlons de votre projet',
    body: 'Laissez-nous vos coordonnées. Un conseiller vous rappelle pour répondre à vos questions et vous transmettre la brochure du projet.',
    primary: 'Être rappelé',
    secondary: 'Écrire sur WhatsApp',
  },
  aidBand: {
    h2: 'Un projet éligible à l’aide au logement',
    body: 'Riyad Zaer Gardens est éligible au programme d’aide au logement de l’État. Selon votre situation, le prix d’un appartement peut démarrer à 350 000 DH au lieu de 420 000 DH.',
    link: 'Vérifier mon éligibilité',
  },
  legal: {
    copy: '© 2026 Riyad Zaer Gardens — by La Manoussa. Tous droits réservés.',
    aidNote: 'Projet éligible à l’aide au logement.',
    mentions: 'Mentions légales',
    privacy: 'Politique de confidentialité',
  },
  blog: {
    read: 'Lire l’article',
    back: 'Retour au blog',
    more: 'Autres articles',
    published: 'Publié le',
    updated: 'Mis à jour le',
    kicker: 'Blog',
  },
  lang: { fr: 'FR', ar: 'العربية' },
} as const;

const ar = {
  brand: {
    name: 'رياض زعير غاردنز',
    by: 'من تطوير المناوسة',
    slogan: 'قطب حضري جديد في الرباط.',
    about: 'شقق F3 و F4 ومحلات تجارية في عين عودة، على بعد 20 دقيقة من الرباط.',
  },
  nav: [
    { label: 'الرئيسية', path: '/' },
    { label: 'المشروع', path: '/le-projet' },
    { label: 'الشقق', path: '/appartements' },
    { label: 'المحلات التجارية', path: '/fonds-de-commerce' },
    { label: 'الموقع', path: '/localisation' },
    { label: 'المدونة', path: '/blog' },
    { label: 'اتصل بنا', path: '/contact' },
  ],
  footerProject: [
    { label: 'المشروع', path: '/le-projet' },
    { label: 'الشقق', path: '/appartements' },
    { label: 'المحلات التجارية', path: '/fonds-de-commerce' },
    { label: 'الموقع', path: '/localisation' },
  ],
  footerInfo: [
    { label: 'الأسئلة الشائعة', path: '/faq' },
    { label: 'المدونة', path: '/blog' },
    { label: 'المطوّر', path: '/la-manoussa' },
    { label: 'اتصل بنا', path: '/contact' },
  ],
  footerCols: {
    project: 'المشروع',
    info: 'معلومات',
    contact: 'تواصل معنا',
  },
  cta: 'اطلب اتصالاً',
  call: 'اتصال',
  whatsapp: 'واتساب',
  writeWhatsapp: 'راسلنا عبر واتساب',
  menu: 'القائمة',
  convert: {
    h2: 'لنتحدث عن مشروعكم',
    body: 'اتركوا لنا بياناتكم. يتصل بكم مستشار للإجابة عن أسئلتكم وإرسال كتيّب المشروع.',
    primary: 'اطلب اتصالاً',
    secondary: 'راسلنا عبر واتساب',
  },
  aidBand: {
    h2: 'مشروع مؤهل لدعم السكن',
    body: 'رياض زعير غاردنز مؤهل لبرنامج دعم السكن. حسب وضعيتكم، يمكن أن يبدأ سعر الشقة من 350 000 درهم بدل 420 000 درهم.',
    link: 'تحقق من أهليتي',
  },
  legal: {
    copy: '© 2026 رياض زعير غاردنز — من تطوير المناوسة. جميع الحقوق محفوظة.',
    aidNote: 'مشروع مؤهل لدعم السكن.',
    mentions: 'الإشارات القانونية',
    privacy: 'سياسة الخصوصية',
  },
  blog: {
    read: 'اقرأ المقال',
    back: 'العودة إلى المدونة',
    more: 'مقالات أخرى',
    published: 'نُشر في',
    updated: 'حُدّث في',
    kicker: 'المدونة',
  },
  lang: { fr: 'FR', ar: 'العربية' },
} as const;

export type UiDict = typeof fr;

export function ui(locale: Locale): UiDict {
  return locale === 'ar' ? (ar as unknown as UiDict) : fr;
}

export { contactInfo };
