/** Accueil — feedback client Oct 2026 */

export const seo = {
  title: 'Riyad Zaer Gardens — Appartements neufs à 25 min de Rabat',
  description:
    "Appartements 2 & 3 chambres de 65 à 86 m² et fonds de commerce à 25 min de Rabat. À partir de 420 000 DH, éligibles à l'aide au logement.",
} as const;

export const hero = {
  kicker: 'Nouveau pôle urbain à 25 minutes de Rabat',
  h1: 'Riyad Zaer Gardens',
  sub: "Riyad Zaer Gardens réunit des appartements de 2 & 3 chambres et des fonds de commerce dans un quartier neuf et verdoyant, sur l'Avenue Mohammed VI.",
  price: 'Appartements à partir de 420 000 DH',
  primary: { label: 'Découvrir le projet', href: '/le-projet' },
  secondary: { label: 'Être rappelé', href: '/contact' },
  alt: 'Vue de la résidence Riyad Zaer Gardens',
} as const;

export const proof = [
  'Appartements 2 & 3 chambres',
  "Éligible à l'aide au logement",
  'Livraison prévue en septembre 2028',
] as const;

export const figures = {
  h2: 'La première tranche en chiffres',
  lead: "La première tranche de Riyad Zaer Gardens est composée d'un îlot complet, pensé comme un petit quartier avec ses logements, ses espaces verts et ses commerces.",
  items: [
    { n: '9', label: 'immeubles', icon: 'building-2' },
    { n: '120', label: 'appartements', icon: 'home' },
    { n: '49', label: 'fonds de commerce', icon: 'store' },
  ],
} as const;

export const reasons = {
  h2: 'Quatre raisons de choisir Riyad Zaer Gardens',
  lead: 'Le projet s’installe dans une zone qui se développe vite, à la jonction entre la ville et la nature.',
  items: [
    {
      title: "Un cœur d’îlot végétalisé",
      body: "Les immeubles s’organisent autour d’une cour centrale plantée, calme et réservée aux résidents. Elle apporte de la lumière et de l’air aux appartements, et de la fraîcheur en été.",
      img: '/photos/allee-jardin.jpg',
    },
    {
      title: 'À 25 minutes de Rabat',
      body: "Sur l’Avenue Mohammed VI, avec un accès direct à l’autoroute et aux axes qui mènent à Rabat, Témara et Salé.",
      img: '/photos/facade-street.jpg',
    },
    {
      title: 'Des finitions comprises dans le prix',
      body: "Sols, menuiseries, salle de bain équipée, faux plafonds et éclairage font partie des prestations prévues. Vous n'achetez pas un logement brut.",
      img: '/photos/salon.jpg',
    },
    {
      title: 'Un prix juste',
      body: "Un logement de moyen standing à un prix accessible, encore réduit par l’aide au logement.",
      img: '/photos/facade-golden.jpg',
    },
  ],
} as const;

export const projet = {
  h2: 'Un quartier complet, pas seulement des immeubles',
  p1: "Riyad Zaer Gardens est un projet immobilier de moyen standing développé par La Manoussa, à 25 minutes de Rabat. Les immeubles s'organisent autour d'une cour centrale plantée, avec des commerces en rez-de-chaussée.",
  p2: "Le stationnement est enterré : deux niveaux de sous-sol accueillent les voitures et les locaux techniques. L'espace extérieur reste ainsi dégagé et rendu aux résidents.",
  amenities: [
    'Ascenseur dans chaque immeuble',
    'Cœur d’îlot végétalisé et aires de jeux',
    'Parking couvert en sous-sol',
    'Résidence sécurisée et gardiennée',
    'Finitions modernes',
    'Commerces en rez-de-chaussée',
  ],
  link: { label: 'Découvrir le projet en détail', href: '/le-projet' },
  img: '/photos/aerial-ilot.jpg',
  alt: 'Vue de la résidence Riyad Zaer Gardens',
} as const;

export const apartments = {
  h2: 'Des appartements 2 & 3 chambres de 65 à 86 m²',
  p1: 'Deux typologies sont proposées : des F3 et des F4, de 65 à 86 m². Des surfaces pensées pour être faciles à vivre, que ce soit pour un premier achat ou pour louer.',
  p2: 'Les appartements seront livrés et finis, avec balcon ou terrasse selon le lot.',
  types: ['2 & 3 chambres'],
  range: 'de 65 à 86 m²',
  price: 'À partir de 420 000 DH',
  priceAid: '350 000 DH avec l’aide au logement',
  cta: { label: 'Voir les appartements', href: '/appartements' },
  img: '/photos/salon.jpg',
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
  img: '/photos/cuisine.jpg',
} as const;

export const commerce = {
  h2: '49 fonds de commerce en rez-de-chaussée',
  p1: 'La première tranche compte 49 locaux commerciaux, de 13 à 30 m², en rez-de-chaussée sur l’Avenue Mohammed VI.',
  p2: 'Le terrain donne sur trois voies, dont un axe principal au sud : les locaux bénéficient d’une vraie visibilité.',
  facts: [
    ['Nombre de lots', '49'],
    ['Surfaces', 'de 13 à 30 m²'],
    ['Prix', 'à partir de 200 000 DH'],
  ],
  cta: { label: 'Voir les fonds de commerce', href: '/fonds-de-commerce' },
  img: '/photos/commerce-angle.jpg',
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
      body: 'Votre premier logement, prêt à habiter, dans un quartier calme et verdoyant à 25 minutes de Rabat.',
    },
    {
      title: 'Y investir',
      body: 'Un bien neuf à louer dans une zone qui se développe, avec un ticket d’entrée maîtrisé.',
    },
    {
      title: 'Y revenir',
      body: "Un pied-à-terre au Maroc, dans une résidence sécurisée et entretenue toute l'année, même en votre absence.",
    },
  ],
} as const;

export const lieu = {
  h2: 'Km 25, Avenue Mohammed VI, Rabat',
  body: "Le projet se situe sur l'Avenue Mohammed VI, à 25 minutes de Rabat. La ville autour est déjà équipée : pharmacie, cabinet vétérinaire, écoles et mosquée se trouvent à quelques minutes.",
  address: 'Km 25, Avenue Mohammed VI, Rabat',
  cta: {
    label: 'Ouvrir dans Google Maps',
    href: 'https://www.google.com/maps/search/?api=1&query=Km+25+Avenue+Mohammed+VI+Rabat',
  },
  mapEmbed:
    'https://maps.google.com/maps?q=Km+25,+Avenue+Mohammed+VI,+Rabat&hl=fr&z=14&output=embed',
  img: '/photos/facade-street.jpg',
} as const;

export const gallery = [
  { src: '/photos/facade-nuit.jpg', alt: 'Vue du projet Riyad Zaer Gardens' },
  { src: '/photos/allee-jardin.jpg', alt: 'Cœur d’îlot végétalisé' },
  { src: '/photos/salon.jpg', alt: 'Salon d’un appartement' },
  { src: '/photos/facade-golden.jpg', alt: 'Façade au coucher du soleil' },
  { src: '/photos/commerce-angle.jpg', alt: 'Commerces en rez-de-chaussée' },
  { src: '/photos/salon-balcon.jpg', alt: 'Salon avec balcon' },
  { src: '/photos/aerial-ilot.jpg', alt: 'Vue d’ensemble de l’îlot' },
  { src: '/photos/cuisine.jpg', alt: 'Finitions' },
] as const;

export const contact = {
  h2: 'Parlons de votre projet',
  body: 'Laissez-nous vos coordonnées. Un conseiller vous rappelle pour répondre à vos questions et vous transmettre la brochure du projet.',
  phone: '06 30 88 44 44',
  phoneTel: '+212630884444',
  whatsapp: 'https://wa.me/212630884444',
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
  about: 'Appartements 2 & 3 chambres et fonds de commerce à 25 minutes de Rabat.',
  address: 'Km 25, Avenue Mohammed VI, Rabat',
  domain: 'riyadzaergardens.com',
  legal: '© 2026 Riyad Zaer Gardens — by La Manoussa. Tous droits réservés.',
  aidNote: 'Projet éligible à l’aide au logement.',
} as const;
