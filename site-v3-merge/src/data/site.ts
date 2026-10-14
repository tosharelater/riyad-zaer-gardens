/** Global site chrome — source: contenu-site-web/00-elements-globaux.md */

export const brand = {
  name: 'Riyad Zaer Gardens',
  by: 'by La Manoussa',
  slogan: 'Nouveau pôle urbain à Rabat.',
  about: 'Appartements 2 & 3 chambres et fonds de commerce à 25 minutes de Rabat.',
} as const;

export const contactInfo = {
  phone: '06 30 88 44 44',
  phoneTel: '+212630884444',
  whatsapp: 'https://wa.me/212630884444',
  address: 'Km 25, Avenue Mohammed VI, Rabat',
  domain: 'riyadzaergardens.com',
  mapsHref:
    'https://www.google.com/maps/search/?api=1&query=Km+25+Avenue+Mohammed+VI+Rabat',
  mapEmbed:
    'https://maps.google.com/maps?q=Km+25,+Avenue+Mohammed+VI,+Rabat&hl=fr&z=14&output=embed',
} as const;

/** Main nav — 6 entries in official order */
export const mainNav = [
  { label: 'Accueil', href: '/' },
  { label: 'Le projet', href: '/le-projet' },
  { label: 'Appartements', href: '/appartements' },
  { label: 'Fonds de commerce', href: '/fonds-de-commerce' },
  { label: 'Localisation', href: '/localisation' },
  { label: 'Contact', href: '/contact' },
] as const;

export const footerProject = [
  { label: 'Le projet', href: '/le-projet' },
  { label: 'Appartements', href: '/appartements' },
  { label: 'Fonds de commerce', href: '/fonds-de-commerce' },
  { label: 'Localisation', href: '/localisation' },
] as const;

export const footerInfo = [
  { label: 'Questions fréquentes', href: '/faq' },
  { label: 'Blog', href: '/blog' },
  { label: 'Le promoteur', href: '/la-manoussa' },
  { label: 'Contact', href: '/contact' },
] as const;

export const convert = {
  h2: 'Parlons de votre projet',
  body: 'Laissez-nous vos coordonnées. Un conseiller vous rappelle pour répondre à vos questions et vous transmettre la brochure du projet.',
  primary: { label: 'Être rappelé', href: '/contact' },
  secondary: { label: 'Écrire sur WhatsApp', href: contactInfo.whatsapp },
} as const;

export const aidBand = {
  h2: 'Un projet éligible à l’aide au logement',
  body: 'Riyad Zaer Gardens est éligible au programme d’aide au logement de l’État. Selon votre situation, le prix d’un appartement peut démarrer à 350 000 DH au lieu de 420 000 DH.',
  link: { label: 'Vérifier mon éligibilité', href: '/contact' },
} as const;

export const legal = {
  copy: '© 2026 Riyad Zaer Gardens — by La Manoussa. Tous droits réservés.',
  aidNote: 'Projet éligible à l’aide au logement.',
  mentions: { label: 'Mentions légales', href: '/mentions-legales' },
  privacy: { label: 'Politique de confidentialité', href: '/mentions-legales#confidentialite' },
} as const;
