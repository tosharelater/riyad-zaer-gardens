export type BlogPost = {
  slug: string;
  title: string;
  titleAr: string;
  excerpt: string;
  excerptAr: string;
  date: string;
  dateLabel: string;
  dateLabelAr: string;
  img: string;
  readMin: number;
  tags: string[];
};

export const posts: BlogPost[] = [
  {
    slug: 'vivre-entre-rabat-et-ain-aouda',
    title: 'Vivre entre Rabat et Aïn Aouda',
    titleAr: 'العيش بين الرباط وعين عودة',
    excerpt:
      'Un nouveau pôle urbain qui mise sur la lumière, les jardins et un quotidien maîtrisé — sans le bruit du luxe générique.',
    excerptAr: 'قطب حضري جديد يراهن على الضوء والحدائق ويوميات متقنة — بلا ضجيج الفخامة المبتذلة.',
    date: '2026-08-12',
    dateLabel: '12 août 2026',
    dateLabelAr: '12 أغسطس 2026',
    img: 'parcours/viz-01.jpg',
    readMin: 4,
    tags: ['Cadre de vie', 'Quartier'],
  },
  {
    slug: 'choisir-entre-f3-et-f4',
    title: 'Choisir entre F3 et F4',
    titleAr: 'الاختيار بين F3 و F4',
    excerpt:
      'Surfaces, chambres, rythme familial : comment lire les typologies pour trouver l’adresse qui vous correspond.',
    excerptAr: 'مساحات وغرف وإيقاع عائلي: كيف تقرأ الأنواع لتجد العنوان الذي يناسبك.',
    date: '2026-07-28',
    dateLabel: '28 juillet 2026',
    dateLabelAr: '28 يوليو 2026',
    img: 'parcours/viz-09.jpg',
    readMin: 5,
    tags: ['Typologies', 'Guide'],
  },
  {
    slug: 'aides-au-logement-reperes',
    title: 'Aides au logement : les repères utiles',
    titleAr: 'مساعدات السكن: معالم مفيدة',
    excerpt:
      'Éligibilité, dossier, prochaines étapes — ce qu’il faut savoir avant de réserver à Riyad Zaer Gardens.',
    excerptAr: 'الأهلية والملف والخطوات التالية — ما يجب معرفته قبل الحجز في رياض زعير غاردنز.',
    date: '2026-06-15',
    dateLabel: '15 juin 2026',
    dateLabelAr: '15 يونيو 2026',
    img: 'parcours/viz-04.jpg',
    readMin: 6,
    tags: ['Aides', 'Réservation'],
  },
  {
    slug: 'matieres-et-lumiere',
    title: 'Matières & lumière',
    titleAr: 'مواد وضوء',
    excerpt:
      'Finitions pensées pour le long terme : texture, silence optique, volumes qui respirent.',
    excerptAr: 'تشطيبات للمدى الطويل: ملمس وصمت بصري وأحجام تتنفس.',
    date: '2026-05-03',
    dateLabel: '3 mai 2026',
    dateLabelAr: '3 مايو 2026',
    img: 'parcours/viz-03.jpg',
    readMin: 3,
    tags: ['Finitions', 'Design'],
  },
];

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}
