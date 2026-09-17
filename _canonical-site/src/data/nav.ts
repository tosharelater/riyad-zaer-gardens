import { routes } from '../lib/routes';

export const navLinks = [
  { id: 'home', href: routes.home(), key: 'nav_home', label: 'Accueil' },
  { id: 'projet', href: routes.projet(), key: 'nav_projet', label: 'Le projet' },
  { id: 'appartements', href: routes.appartements(), key: 'nav_appartements', label: 'Appartements' },
  { id: 'commerce', href: routes.commerce(), key: 'nav_commerce', label: 'Fonds de commerce' },
  { id: 'location', href: routes.localisation(), key: 'nav_location', label: 'Localisation' },
  { id: 'contact', href: routes.contact(), key: 'nav_contact', label: 'Contact' },
] as const;

export const footerProject = [
  { href: routes.projet(), key: 'nav_projet', label: 'Le projet' },
  { href: routes.appartements(), key: 'nav_appartements', label: 'Appartements' },
  { href: routes.commerce(), key: 'nav_commerce', label: 'Fonds de commerce' },
  { href: routes.localisation(), key: 'nav_location', label: 'Localisation' },
] as const;

export const footerInfo = [
  { href: routes.faq(), key: 'nav_faq', label: 'Questions fréquentes' },
  { href: routes.guides(), key: 'nav_guides', label: 'Guides & actualités' },
  { href: routes.promoteur(), key: 'nav_promoteur', label: 'Le promoteur' },
  { href: routes.contact(), key: 'nav_contact', label: 'Contact' },
] as const;
