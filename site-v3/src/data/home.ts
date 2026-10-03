/** Accueil — source: contenu-site-web/01-accueil.md + 00-elements-globaux.md
 *  Do not invent. Do not paraphrase official formulations.
 */

export const seo = {
  title: 'Riyad Zaer Gardens — Appartements neufs à Aïn Aouda',
  description:
    "Appartements F3 et F4 de 65 à 86 m² et fonds de commerce à Aïn Aouda, à 20 min de Rabat. À partir de 420 000 DH, éligibles à l'aide au logement.",
} as const;

export const hero = {
  kicker: 'Aïn Aouda · à 20 minutes de Rabat',
  h1: 'Nouveau pôle urbain à Rabat',
  sub: "Riyad Zaer Gardens réunit des appartements F3 et F4 et des fonds de commerce dans un quartier neuf et verdoyant, sur l'Avenue Mohammed VI.",
  price: 'Appartements à partir de 420 000 DH',
  primary: { label: 'Découvrir le projet', href: '/le-projet' },
  secondary: { label: 'Être rappelé', href: '/contact' },
  alt: 'Vue du projet immobilier Riyad Zaer Gardens à Aïn Aouda',
} as const;

export const proof = [
  'Appartements F3 et F4',
  'De 65 à 86 m²',
  'À partir de 420 000 DH',
  "Éligible à l'aide au logement",
  'Parking en sous-sol',
  'Livraison prévue en septembre 2028',
] as const;

export const figures = {
  h2: 'La première tranche en chiffres',
  lead: "La première tranche de Riyad Zaer Gardens est composée d'un îlot complet, pensé comme un petit quartier avec ses logements, ses espaces verts et ses commerces.",
  items: [
    { n: '9', label: 'immeubles' },
    { n: '120', label: 'appartements' },
    { n: '49', label: 'fonds de commerce' },
  ],
} as const;

export const reasons = {
  h2: 'Quatre raisons de choisir Riyad Zaer Gardens',
  lead: 'Le projet s’installe dans une zone qui se développe vite, à la jonction entre la ville et la nature.',
  items: [
    {
      title: "Un cœur d’îlot végétalisé",
      body: "Les immeubles s’organisent autour d’une cour centrale plantée, calme et réservée aux résidents. Elle apporte de la lumière et de l’air aux appartements, et de la fraîcheur en été.",
      img: '/gen/rz-courtyard.jpg',
    },
    {
      title: 'À 20 minutes de Rabat',
      body: "Sur l’Avenue Mohammed VI, avec un accès direct à l’autoroute et aux axes qui mènent à Rabat, Témara et Salé.",
      img: '/gen/rz-avenue.jpg',
    },
    {
      title: 'Des appartements livrés finis',
      body: "Les logements sont livrés avec leurs finitions. Vous n’avez pas de travaux à prévoir avant d’emménager.",
      img: '/gen/rz-apartment.jpg',
    },
    {
      title: 'Un prix juste',
      body: "Un logement de moyen standing à un prix accessible, encore réduit par l’aide au logement.",
      img: '/gen/rz-terrace.jpg',
    },
  ],
} as const;

export const projet = {
  h2: 'Un quartier complet, pas seulement des immeubles',
  p1: 'Riyad Zaer Gardens est un projet immobilier de moyen standing développé par La Manoussa à Aïn Aouda. Les immeubles s’organisent autour d’une cour centrale plantée, avec des commerces en rez-de-chaussée.',
  p2: "Le stationnement est enterré : deux niveaux de sous-sol accueillent les voitures et les locaux techniques. L’espace extérieur reste ainsi dégagé et rendu aux résidents.",
  amenities: [
    'Ascenseur dans chaque immeuble',
    'Cœur d’îlot végétalisé et aires de jeux',
    'Parking couvert en sous-sol',
    'Résidence sécurisée et gardiennée',
    'Finitions modernes',
    'Commerces en rez-de-chaussée',
  ],
  link: { label: 'Découvrir le projet en détail', href: '/le-projet' },
  img: '/gen/rz-aerial.jpg',
  alt: 'Vue aérienne du projet Riyad Zaer Gardens',
} as const;

export const apartments = {
  h2: 'Des appartements F3 et F4 de 65 à 86 m²',
  p1: 'Deux typologies sont proposées : des F3 et des F4, de 65 à 86 m². Des surfaces pensées pour être faciles à vivre, que ce soit pour un premier achat ou pour louer.',
  p2: 'Les appartements sont livrés finis, avec balcon ou terrasse selon le lot.',
  types: ['F3', 'F4'],
  range: 'de 65 à 86 m²',
  price: 'À partir de 420 000 DH',
  priceAid: '350 000 DH avec l’aide au logement',
  cta: { label: 'Voir les appartements', href: '/appartements' },
  img: '/gen/rz-apartment.jpg',
} as const;

export const finishes = {
  h2: 'Des finitions soignées, livrées prêtes à vivre',
  p1: 'Les appartements sont livrés avec des matériaux choisis pour durer et rester faciles à entretenir : sols en céramique ou parquet stratifié, menuiseries aluminium, volets roulants motorisés et sanitaires de marque.',
  p2: 'Chaque salle de bain est équipée d’une douche à l’italienne. Les faux plafonds et l’éclairage sont intégrés dès la livraison.',
  points: [
    { title: 'Sols', body: 'céramique ou parquet stratifié' },
    { title: 'Salle de bain', body: 'douche à l’italienne, sanitaires Roca' },
    { title: 'Confort', body: 'volets roulants motorisés Somfy' },
  ],
  img: '/gen/rz-finish.jpg',
} as const;

export const commerce = {
  h2: '49 fonds de commerce en rez-de-chaussée',
  p1: 'La première tranche compte 49 locaux commerciaux, de 13 à 30 m², en rez-de-chaussée sur l’Avenue Mohammed VI.',
  p2: 'Le terrain donne sur trois voies, dont un axe principal au sud : les locaux bénéficient d’une vraie visibilité.',
  facts: [
    ['Nombre de lots', '49'],
    ['Surfaces', 'de 13 à 30 m²'],
    ['Prix', 'à partir de 15 000 DH le m²'],
  ],
  cta: { label: 'Voir les fonds de commerce', href: '/fonds-de-commerce' },
  img: '/gen/rz-commerce.jpg',
} as const;

export const aid = {
  h2: 'Un projet éligible à l’aide au logement',
  p1: 'Riyad Zaer Gardens est éligible au programme d’aide au logement de l’État. Les surfaces et les prix des appartements ont été conçus dès le départ pour répondre aux conditions du programme.',
  p2: 'Concrètement, cela change le prix d’entrée : selon votre situation, un appartement peut démarrer à 350 000 DH au lieu de 420 000 DH.',
  p3: 'L’éligibilité dépend de votre situation personnelle. Nos conseillers la vérifient avec vous, gratuitement et sans engagement.',
  without: 'à partir de 420 000 DH',
  withAid: 'à partir de 350 000 DH',
  cta: { label: 'Vérifier mon éligibilité', href: '/contact' },
} as const;

export const ways = {
  h2: 'Trois façons d’être à Riyad Zaer Gardens',
  items: [
    {
      title: 'Y vivre',
      body: 'Votre premier logement, prêt à habiter, dans un quartier calme et verdoyant à 20 minutes de Rabat.',
    },
    {
      title: 'Y investir',
      body: 'Un bien neuf à louer dans une zone qui se développe, avec un ticket d’entrée maîtrisé.',
    },
    {
      title: 'Y revenir',
      body: 'Un pied-à-terre au Maroc, livré fini et sécurisé, prêt à vous accueillir à chaque retour.',
    },
  ],
} as const;

export const lieu = {
  h2: 'Km 25, Avenue Mohammed VI',
  body: 'Le projet se situe à Aïn Aouda, sur l’Avenue Mohammed VI, à 20 minutes de Rabat par l’autoroute. Une pharmacie, un cabinet vétérinaire et des commerces de proximité sont déjà installés dans le quartier.',
  address: 'Km 25, Avenue Mohammed VI, Aïn Aouda',
  cta: {
    label: 'Ouvrir dans Google Maps',
    href: 'https://www.google.com/maps/search/?api=1&query=Km+25+Avenue+Mohammed+VI+Ain+Aouda',
  },
  mapEmbed:
    'https://maps.google.com/maps?q=Km+25,+Avenue+Mohammed+VI,+A%C3%AFn+Aouda&hl=fr&z=14&output=embed',
  img: '/gen/rz-avenue.jpg',
} as const;

export const gallery = [
  { src: '/gen/rz-hero.jpg', alt: 'Vue du projet Riyad Zaer Gardens' },
  { src: '/gen/rz-courtyard.jpg', alt: 'Cour centrale plantée' },
  { src: '/gen/rz-aerial.jpg', alt: 'Vue d’ensemble de l’îlot' },
  { src: '/gen/rz-apartment.jpg', alt: 'Intérieur appartement' },
  { src: '/gen/rz-facade.jpg', alt: 'Détail de façade' },
  { src: '/gen/rz-commerce.jpg', alt: 'Commerces en rez-de-chaussée' },
  { src: '/gen/rz-terrace.jpg', alt: 'Terrasse sur cour' },
  { src: '/gen/rz-finish.jpg', alt: 'Finitions' },
] as const;

export const contact = {
  h2: 'Parlons de votre projet',
  body: 'Laissez-nous vos coordonnées. Un conseiller vous rappelle pour répondre à vos questions et vous transmettre la brochure du projet.',
  phone: '07 08 08 08 39',
  phoneTel: '+212708080839',
  whatsapp: 'https://wa.me/212708080839',
  primary: 'Être rappelé',
  secondary: 'Écrire sur WhatsApp',
} as const;

export const nav = [
  { label: 'Le projet', href: '#projet' },
  { label: 'Appartements', href: '#appartements' },
  { label: 'Commerces', href: '#commerces' },
  { label: 'Localisation', href: '#lieu' },
  { label: 'Contact', href: '#contact' },
] as const;

export const footer = {
  slogan: 'Nouveau pôle urbain à Rabat.',
  about: 'Appartements F3 et F4 et fonds de commerce à Aïn Aouda, à 20 minutes de Rabat.',
  address: 'Km 25, Avenue Mohammed VI, Rabat — Aïn Aouda',
  domain: 'riyadzaergardens.com',
  legal: '© 2026 Riyad Zaer Gardens — by La Manoussa. Tous droits réservés.',
  aidNote: 'Projet éligible à l’aide au logement.',
} as const;
