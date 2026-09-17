import { withBase } from './base';

export const routes = {
  home: () => withBase('/'),
  projet: () => withBase('/le-projet/'),
  appartements: () => withBase('/appartements/'),
  commerce: () => withBase('/fonds-de-commerce/'),
  localisation: () => withBase('/localisation/'),
  contact: () => withBase('/contact/'),
  faq: () => withBase('/faq/'),
  guides: () => withBase('/guides/'),
  promoteur: () => withBase('/la-manoussa/'),
  legal: () => withBase('/mentions-legales/'),
  merci: () => withBase('/merci/'),
  guide: (slug: string) => withBase(`/guides/${slug}/`),
  maps: 'https://www.google.com/maps/search/?api=1&query=Km+25+Avenue+Mohammed+VI+Ain+Aouda+Rabat',
  mapsEmbed:
    'https://maps.google.com/maps?q=Km%2025%20Avenue%20Mohammed%20VI%20Ain%20Aouda%20Rabat&z=14&output=embed',
} as const;
