import { media } from './media';
import type { Locale } from '../i18n/paths';

export type BlogArticle = {
  slug: string;
  title: string;
  seoTitle: string;
  description: string;
  excerpt: string;
  date: string;
  updated: string;
  image: string;
  alt: string;
  tags: string[];
  sections: { h2: string; paragraphs: string[]; list?: string[] }[];
  cta?: { label: string; href: string };
};

const frArticles: BlogArticle[] = [
  {
    slug: 'aide-au-logement-maroc',
    title: 'L’aide au logement au Maroc : comment ça marche',
    seoTitle: 'Aide au logement au Maroc : comment ça marche',
    description:
      'Comprendre le programme d’aide au logement : qui peut en bénéficier, ce que cela change sur le prix, et le cas de Riyad Zaer Gardens à Aïn Aouda.',
    excerpt:
      'Comment le programme d’aide peut faire passer le prix d’entrée de 420 000 DH à 350 000 DH selon votre situation.',
    date: '2026-03-12',
    updated: '2026-09-18',
    image: media.apartment.src,
    alt: media.apartment.alt,
    tags: ['Aide au logement', 'Achat'],
    sections: [
      {
        h2: 'Ce qu’est le programme d’aide au logement',
        paragraphs: [
          'L’aide au logement est un dispositif de l’État destiné à faciliter l’accès à la propriété pour les ménages qui remplissent certaines conditions.',
          'Concrètement, elle réduit le reste à charge de l’acheteur sur des logements neufs dont le prix et la surface restent dans des plages définies.',
        ],
      },
      {
        h2: 'Qui peut en bénéficier ?',
        paragraphs: [
          'L’éligibilité dépend de votre situation personnelle : revenus, composition du foyer et nature du bien acquis.',
          'Les critères officiels évoluent : le plus sûr reste de les vérifier avec un conseiller, gratuitement et sans engagement, avant de réserver.',
        ],
      },
      {
        h2: 'Ce que cela change sur le prix d’achat',
        paragraphs: [
          'À Riyad Zaer Gardens, le prix d’entrée des appartements est de 420 000 DH. Avec l’aide au logement, ce prix peut démarrer à 350 000 DH selon votre situation.',
          'Ce n’est pas une remise commerciale du promoteur : c’est le résultat du programme d’aide, appliqué quand vous y êtes éligible.',
        ],
      },
      {
        h2: 'Les démarches, étape par étape',
        paragraphs: ['Le parcours reste simple lorsqu’on le découpe clairement :'],
        list: [
          'Confirmer votre intérêt pour une typologie (F3 ou F4)',
          'Vérifier votre éligibilité avec un conseiller',
          'Recevoir la brochure et le détail des lots disponibles',
          'Réserver, puis constituer le dossier d’aide si vous êtes éligible',
        ],
      },
      {
        h2: 'Le cas de Riyad Zaer Gardens',
        paragraphs: [
          'Le projet a été conçu dès l’origine pour répondre aux conditions du programme : surfaces de 65 à 86 m², prix d’entrée maîtrisé, livraison prévue en septembre 2028.',
          'C’est ce qui permet de parler d’un prix à partir de 350 000 DH avec l’aide, sans promesse déconnectée de la réalité du programme.',
        ],
      },
    ],
    cta: { label: 'Vérifier mon éligibilité', href: '/contact' },
  },
  {
    slug: 'f3-ou-f4-comment-choisir',
    title: 'F3 ou F4 : comment choisir son appartement',
    seoTitle: 'F3 ou F4 : comment choisir son appartement',
    description:
      'Différence entre F3 et F4, surfaces typiques, pour qui chaque typologie convient — et ce que propose Riyad Zaer Gardens à Aïn Aouda.',
    excerpt:
      'Surfaces, usages et questions à se poser avant de réserver un appartement à Riyad Zaer Gardens.',
    date: '2026-04-02',
    updated: '2026-08-21',
    image: media.terrace.src,
    alt: media.terrace.alt,
    tags: ['Appartements', 'Conseils'],
    sections: [
      {
        h2: 'Ce que veulent dire F3 et F4',
        paragraphs: [
          'Un F3 propose en général un séjour et deux chambres. Un F4 ajoute une chambre supplémentaire, avec souvent un WC séparé.',
          'Au-delà du nombre de pièces, ce qui compte vraiment, c’est la surface utile, la luminosité et la façon dont vous allez vivre le logement au quotidien.',
        ],
      },
      {
        h2: 'Les surfaces typiques',
        paragraphs: [
          'À Riyad Zaer Gardens, les appartements font de 65 à 86 m². Les F3 se situent plutôt autour de 68 à 72 m² ; les F4, autour de 77 à 86 m², selon l’étage et la position.',
        ],
      },
      {
        h2: 'Pour qui le F3 est le bon choix',
        paragraphs: [
          'Le F3 convient bien à un premier achat, à un couple, ou à une personne seule qui veut un espace clair sans surdimensionner le budget.',
          'Il reste aussi intéressant pour la location : la demande pour des deux chambres reste solide près de Rabat.',
        ],
      },
      {
        h2: 'Pour qui le F4 est le bon choix',
        paragraphs: [
          'Le F4 s’adresse surtout aux familles qui ont besoin d’une chambre en plus — enfants, bureau, ou invités.',
          'C’est aussi un choix plus confortable si vous prévoyez de rester longtemps dans le logement.',
        ],
      },
      {
        h2: 'Le critère souvent oublié : revente et location',
        paragraphs: [
          'Un bien facile à louer ou à revendre est souvent un bien « standard » : bonne surface, plan clair, finitions prêtes à vivre.',
          'Les deux typologies de Riyad Zaer Gardens ont été pensées dans cet esprit, avec des logements livrés finis.',
        ],
      },
    ],
    cta: { label: 'Voir les appartements', href: '/appartements' },
  },
  {
    slug: 'acheter-a-ain-aouda',
    title: 'Acheter à Aïn Aouda : ce qu’il faut savoir',
    seoTitle: 'Acheter à Aïn Aouda : ce qu’il faut savoir',
    description:
      'Distance de Rabat, cadre de vie, accès et points de vigilance avant d’acheter un appartement neuf à Aïn Aouda.',
    excerpt:
      'Distance de Rabat, cadre de vie et dynamisme d’une zone qui se développe rapidement.',
    date: '2026-05-14',
    updated: '2026-09-01',
    image: media.avenue.src,
    alt: media.avenue.alt,
    tags: ['Aïn Aouda', 'Localisation'],
    sections: [
      {
        h2: 'Où se situe Aïn Aouda',
        paragraphs: [
          'Aïn Aouda se trouve au sud de Rabat, sur l’axe de l’Avenue Mohammed VI. Depuis le centre, le trajet prend environ 20 minutes par l’autoroute.',
          'C’est précisément cette distance — assez proche pour travailler en ville, assez éloignée pour retrouver de l’espace — qui attire de nouveaux habitants.',
        ],
      },
      {
        h2: 'Pourquoi la zone se développe',
        paragraphs: [
          'Les prix et la densité du centre poussent une partie de la demande vers des communes mieux reliées, où l’on peut encore construire des logements à taille humaine.',
          'Aïn Aouda concentre aujourd’hui plusieurs projets neufs, des services de proximité et un tissu qui se densifie année après année.',
        ],
      },
      {
        h2: 'Le cadre de vie',
        paragraphs: [
          'On y trouve encore de la verdure, du calme et des parcelles plus généreuses qu’en ville. Pour beaucoup d’acheteurs, c’est le vrai argument.',
          'À Riyad Zaer Gardens, ce cadre se traduit concrètement par un cœur d’îlot végétalisé et un stationnement enterré, pour laisser l’extérieur aux résidents.',
        ],
      },
      {
        h2: 'Accès vers Rabat, Témara et Salé',
        paragraphs: [
          'L’Avenue Mohammed VI et l’autoroute permettent de rejoindre Rabat rapidement. Témara et Salé restent également accessibles via les axes principaux de la région.',
        ],
      },
      {
        h2: 'À quoi faire attention avant d’acheter',
        paragraphs: [
          'Dans une zone en développement, regardez la qualité du promoteur, la date de livraison, la gestion de la résidence et la réalité des accès au quotidien.',
          'Visiter le site reste le meilleur moyen de se faire une idée : terrain, orientation, voisinage immédiat.',
        ],
      },
    ],
    cta: { label: 'Voir la localisation', href: '/localisation' },
  },
  {
    slug: 'investir-neuf-pres-de-rabat',
    title: 'Investir dans l’immobilier neuf près de Rabat',
    seoTitle: 'Investir dans l’immobilier neuf près de Rabat',
    description:
      'Logement ou local commercial près de Rabat : critères, points de vigilance, et ce que propose Riyad Zaer Gardens à Aïn Aouda.',
    excerpt:
      'Appartement à louer ou fonds de commerce : comment évaluer un investissement dans une zone qui se développe.',
    date: '2026-06-20',
    updated: '2026-09-10',
    image: media.commerce.src,
    alt: media.commerce.alt,
    tags: ['Investissement', 'Neuf'],
    sections: [
      {
        h2: 'Pourquoi les zones périphériques attirent les investisseurs',
        paragraphs: [
          'Le ticket d’entrée y est souvent plus accessible qu’en centre-ville, alors que la demande locative suit l’extension urbaine.',
          'Acheter tôt dans un quartier qui se construit, c’est aussi parier sur la valorisation à moyen terme — à condition de choisir un bien liquide et bien situé.',
        ],
      },
      {
        h2: 'Logement ou local commercial',
        paragraphs: [
          'Un appartement F3 ou F4 vise une location résidentielle classique. Un fonds de commerce mise sur le passage et la clientèle du quartier.',
          'Ce sont deux logiques différentes : loyer, risques, gestion et fiscalité ne se comparent pas terme à terme.',
        ],
      },
      {
        h2: 'Les éléments à regarder avant d’investir',
        paragraphs: [
          'Emplacement, prix au m², qualité de construction, délai de livraison, charges de syndic et potentiel locatif réel du secteur.',
          'Pour un commerce : visibilité, stationnement, et présence d’habitants au-dessus du local.',
        ],
      },
      {
        h2: 'Ce que propose Riyad Zaer Gardens',
        paragraphs: [
          'La première tranche compte 120 appartements et 49 fonds de commerce, de 13 à 30 m², en rez-de-chaussée sur l’Avenue Mohammed VI.',
          'Les appartements démarrent à 420 000 DH (350 000 DH avec l’aide au logement selon éligibilité). Les locaux commerciaux sont proposés à partir de 15 000 DH le m².',
        ],
      },
    ],
    cta: { label: 'Parler à un conseiller', href: '/contact' },
  },
  {
    slug: 'visite-du-site-pourquoi-venir',
    title: 'Pourquoi venir visiter le site du projet',
    seoTitle: 'Visiter le site de Riyad Zaer Gardens à Aïn Aouda',
    description:
      'Plans et photos ne suffisent pas : ce que révèle une visite sur place à Riyad Zaer Gardens, Km 25 Avenue Mohammed VI.',
    excerpt:
      'Orientation, accès, voisinage : ce qu’une visite sur le terrain vous apprend vraiment avant de réserver.',
    date: '2026-07-08',
    updated: '2026-09-22',
    image: media.aerial.src,
    alt: media.aerial.alt,
    tags: ['Visite', 'Projet'],
    sections: [
      {
        h2: 'Ce que les images ne montrent pas',
        paragraphs: [
          'Un rendu 3D donne une idée du volume. Sur place, vous mesurez la largeur des voies, le bruit réel, la lumière à différentes heures et la proximité des services.',
        ],
      },
      {
        h2: 'Ce que nous vous montrons pendant la visite',
        paragraphs: [
          'Nous situons les immeubles, la cour centrale plantée, les commerces en rez-de-chaussée et les accès depuis l’Avenue Mohammed VI.',
          'Vous repartez avec une vision claire de l’îlot — pas seulement d’un plan en 2D.',
        ],
      },
      {
        h2: 'Comment organiser votre venue',
        paragraphs: [
          'Indiquez vos disponibilités via le formulaire de contact ou appelez le 07 08 08 08 39. Nous convenons d’un créneau avec vous.',
        ],
      },
    ],
    cta: { label: 'Planifier une visite', href: '/contact' },
  },
];

const arArticles: BlogArticle[] = [
  {
    slug: 'aide-au-logement-maroc',
    title: 'دعم السكن في المغرب: كيف يعمل؟',
    seoTitle: 'دعم السكن في المغرب: كيف يعمل؟',
    description:
      'فهم برنامج دعم السكن: من يمكنه الاستفادة، ماذا يتغير في السعر، وحالة رياض زعير غاردنز في عين عودة.',
    excerpt: 'كيف يمكن أن ينخفض سعر الدخول من 420 000 درهم إلى 350 000 درهم حسب وضعيتكم.',
    date: '2026-03-12',
    updated: '2026-09-18',
    image: media.apartment.src,
    alt: 'شقة في رياض زعير غاردنز',
    tags: ['دعم السكن', 'الشراء'],
    sections: [
      {
        h2: 'ما هو برنامج دعم السكن؟',
        paragraphs: [
          'دعم السكن مبادرة من الدولة تهدف إلى تسهيل تملك السكن للأسر التي تستوفي شروطاً محددة.',
          'عملياً، يقلّل المبلغ المتبقي على المشتري في المساكن الجديدة ذات الأسعار والمساحات المحددة.',
        ],
      },
      {
        h2: 'من يمكنه الاستفادة؟',
        paragraphs: [
          'تعتمد الأهلية على وضعيتكم الشخصية: الدخل وتكوين الأسرة وطبيعة العقار.',
          'أفضل طريقة هي التحقق مع مستشار، مجاناً ودون التزام، قبل الحجز.',
        ],
      },
      {
        h2: 'ماذا يتغير في سعر الشراء؟',
        paragraphs: [
          'في رياض زعير غاردنز، يبدأ سعر الشقق من 420 000 درهم. مع دعم السكن، يمكن أن يبدأ من 350 000 درهم حسب الحالة.',
        ],
      },
      {
        h2: 'حالة رياض زعير غاردنز',
        paragraphs: [
          'صُمّم المشروع منذ البداية ليستجيب لشروط البرنامج: مساحات من 65 إلى 86 م²، وسعر دخول مضبوط، وتسليم متوقع في سبتمبر 2028.',
        ],
      },
    ],
    cta: { label: 'تحقق من أهليتي', href: '/contact' },
  },
  {
    slug: 'f3-ou-f4-comment-choisir',
    title: 'F3 أو F4: كيف تختارون شقتكم؟',
    seoTitle: 'F3 أو F4: كيف تختارون شقتكم؟',
    description: 'الفرق بين F3 و F4، المساحات، ولمن تناسب كل صيغة في رياض زعير غاردنز.',
    excerpt: 'المساحات والاستعمالات والأسئلة التي ينبغي طرحها قبل الحجز.',
    date: '2026-04-02',
    updated: '2026-08-21',
    image: media.terrace.src,
    alt: 'شرفة مطلة على الفناء',
    tags: ['الشقق', 'نصائح'],
    sections: [
      {
        h2: 'ماذا تعني F3 و F4؟',
        paragraphs: [
          'F3 تضم عادة صالوناً وغرفتين. F4 تضيف غرفة ثالثة، وغالباً مرحاضاً منفصلاً.',
          'الأهم هو المساحة المفيدة والإضاءة وطريقة عيشكم اليومي في الشقة.',
        ],
      },
      {
        h2: 'المساحات في رياض زعير غاردنز',
        paragraphs: [
          'تتراوح الشقق بين 65 و 86 م². F3 حوالي 68 إلى 72 م²، و F4 حوالي 77 إلى 86 م² حسب الطابق والموقع.',
        ],
      },
      {
        h2: 'لمن يناسب F3؟',
        paragraphs: [
          'مناسب للشراء الأول أو للزوجين أو لمن يريد مساحة واضحة دون تضخيم الميزانية، كما أنه مطلوب في الإيجار.',
        ],
      },
      {
        h2: 'لمن يناسب F4؟',
        paragraphs: [
          'مناسب للعائلات التي تحتاج غرفة إضافية — أطفال أو مكتب أو ضيوف — ولمن يخطط للبقاء طويلاً.',
        ],
      },
    ],
    cta: { label: 'اطلعوا على الشقق', href: '/appartements' },
  },
  {
    slug: 'acheter-a-ain-aouda',
    title: 'الشراء في عين عودة: ما يجب معرفته',
    seoTitle: 'الشراء في عين عودة: ما يجب معرفته',
    description: 'المسافة من الرباط، جودة العيش، والوصول قبل شراء شقة جديدة في عين عودة.',
    excerpt: 'المسافة من الرباط وجودة العيش وحيوية منطقة تتطور بسرعة.',
    date: '2026-05-14',
    updated: '2026-09-01',
    image: media.avenue.src,
    alt: 'شارع محمد السادس عين عودة',
    tags: ['عين عودة', 'الموقع'],
    sections: [
      {
        h2: 'أين تقع عين عودة؟',
        paragraphs: [
          'تقع عين عودة جنوب الرباط على محور شارع محمد السادس. تستغرق الرحلة من المركز حوالي 20 دقيقة عبر الطريق السيار.',
        ],
      },
      {
        h2: 'لماذا تتطور المنطقة؟',
        paragraphs: [
          'أسعار وكثافة المركز تدفع جزءاً من الطلب نحو جماعات أفضل ربطاً، حيث ما زال بالإمكان بناء مساكن بمقياس إنساني.',
        ],
      },
      {
        h2: 'جودة العيش',
        paragraphs: [
          'ما زال هناك خضرة وهدوء ومساحات أوسع من المدينة. في رياض زعير غاردنز يترجم ذلك إلى فناء مركزي أخضر وموقف تحت الأرض.',
        ],
      },
    ],
    cta: { label: 'اطلعوا على الموقع', href: '/localisation' },
  },
  {
    slug: 'investir-neuf-pres-de-rabat',
    title: 'الاستثمار في العقار الجديد قرب الرباط',
    seoTitle: 'الاستثمار في العقار الجديد قرب الرباط',
    description: 'سكن أو محل تجاري قرب الرباط: معايير الحذر وما يقترحه رياض زعير غاردنز.',
    excerpt: 'شقة للإيجار أو محل تجاري: كيف تقيّمون استثماراً في منطقة قيد التطور.',
    date: '2026-06-20',
    updated: '2026-09-10',
    image: media.commerce.src,
    alt: 'محلات تجارية',
    tags: ['استثمار', 'جديد'],
    sections: [
      {
        h2: 'لماذا تجذب المناطق المحيطة المستثمرين؟',
        paragraphs: [
          'غالباً ما يكون سعر الدخول أيسر من وسط المدينة، بينما يتبع الطلب الإيجاري توسّع العمران.',
        ],
      },
      {
        h2: 'سكن أو محل تجاري',
        paragraphs: [
          'شقة F3 أو F4 موجّهة للإيجار السكني. المحل التجاري يعتمد على المرور وزبائن الحي. منطقان مختلفان.',
        ],
      },
      {
        h2: 'ما يقدمه رياض زعير غاردنز',
        paragraphs: [
          'تضم الشطر الأول 120 شقة و 49 محلاً تجارياً من 13 إلى 30 م² في الطابق الأرضي على شارع محمد السادس.',
        ],
      },
    ],
    cta: { label: 'تحدثوا إلى مستشار', href: '/contact' },
  },
  {
    slug: 'visite-du-site-pourquoi-venir',
    title: 'لماذا زيارة موقع المشروع؟',
    seoTitle: 'زيارة موقع رياض زعير غاردنز في عين عودة',
    description: 'الصور لا تكفي: ماذا تكشف الزيارة الميدانية في كلم 25 شارع محمد السادس.',
    excerpt: 'التوجيه والوصول والجوار: ما تتعلمونه فعلياً قبل الحجز.',
    date: '2026-07-08',
    updated: '2026-09-22',
    image: media.aerial.src,
    alt: 'نظرة عامة على المشروع',
    tags: ['زيارة', 'المشروع'],
    sections: [
      {
        h2: 'ما لا تظهره الصور',
        paragraphs: [
          'الرسم ثلاثي الأبعاد يعطي فكرة عن الحجم. في الموقع تقيسون عرض الطرق والضوء وقرب الخدمات.',
        ],
      },
      {
        h2: 'ماذا نعرض أثناء الزيارة؟',
        paragraphs: [
          'نحدد مواقع العمارات والفناء الأخضر والمحلات ومداخل شارع محمد السادس.',
        ],
      },
      {
        h2: 'كيف تنظّمون زيارتكم؟',
        paragraphs: [
          'اتركوا أوقات فراغكم عبر نموذج الاتصال أو اتصلوا على 07 08 08 08 39.',
        ],
      },
    ],
    cta: { label: 'حدّدوا موعد زيارة', href: '/contact' },
  },
];

export function getArticles(locale: Locale = 'fr'): BlogArticle[] {
  return locale === 'ar' ? arArticles : frArticles;
}

export function getArticle(slug: string, locale: Locale = 'fr'): BlogArticle | undefined {
  return getArticles(locale).find((a) => a.slug === slug);
}

export const blogListing = {
  fr: {
    seo: {
      title: 'Blog — Riyad Zaer Gardens',
      description:
        'Guides et articles pour acheter à Aïn Aouda : aide au logement, F3 ou F4, investissement locatif près de Rabat.',
    },
    h1: 'Blog & guides',
    lead: 'Des repères simples pour préparer votre achat à Aïn Aouda : aide au logement, typologies, localisation et investissement.',
  },
  ar: {
    seo: {
      title: 'المدونة — رياض زعير غاردنز',
      description:
        'أدلة ومقالات للشراء في عين عودة: دعم السكن، F3 أو F4، والاستثمار الإيجاري قرب الرباط.',
    },
    h1: 'المدونة والأدلة',
    lead: 'مراجع واضحة لتحضير شرائكم في عين عودة: دعم السكن، الصيغ، الموقع والاستثمار.',
  },
} as const;
