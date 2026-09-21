export const guides = [
  {
    slug: 'aide-au-logement-maroc',
    date: '2026-09-17',
    titleFr: 'Aide au logement au Maroc : comment ça marche',
    titleAr: 'دعم السكن في المغرب: كيف يعمل',
    kickerFr: 'Aide au logement',
    kickerAr: 'دعم السكن',
    excerptFr:
      'Le programme d’aide au logement change le prix d’entrée d’un appartement neuf. Voici ce que cela signifie concrètement à Riyad Zaer Gardens.',
    excerptAr:
      'يغيّر برنامج دعم السكن ثمن الدخول لشقة جديدة. هذا معناه عملياً في رياض زعير غاردنز.',
    seoTitle: 'Aide au logement au Maroc : comment ça marche',
    description:
      'Comprendre l’aide au logement au Maroc et ce qu’elle change sur le prix d’un appartement à Aïn Aouda, à partir de 350 000 DH.',
  },
  {
    slug: 'f3-ou-f4-comment-choisir',
    date: '2026-09-17',
    titleFr: 'F3 ou F4 : comment choisir son appartement',
    titleAr: 'F3 أو F4: كيف تختارون شقتكم',
    kickerFr: 'Typologies',
    kickerAr: 'الأنماط',
    excerptFr:
      'Deux chambres ou trois, 68 m² ou 86 m² : les critères simples pour choisir entre un F3 et un F4 à Aïn Aouda.',
    excerptAr:
      'غرفتان أو ثلاث، 68 م² أو 86 م²: معايير بسيطة للاختيار بين F3 و F4 في عين عودة.',
    seoTitle: 'F3 ou F4 : comment choisir son appartement',
    description: 'Différence entre F3 et F4, surfaces et usages : comment choisir son appartement neuf à Aïn Aouda.',
  },
  {
    slug: 'acheter-a-ain-aouda',
    date: '2026-09-17',
    titleFr: 'Acheter à Aïn Aouda : ce qu’il faut savoir',
    titleAr: 'الشراء في عين عودة: ما يجب معرفته',
    kickerFr: 'Localisation',
    kickerAr: 'الموقع',
    excerptFr:
      'Aïn Aouda se développe vite, à 20 minutes de Rabat. Ce qu’il faut regarder avant d’acheter dans une zone en expansion.',
    excerptAr:
      'عين عودة تتوسع بسرعة، على بعد 20 دقيقة من الرباط. ما يجب النظر إليه قبل الشراء في منطقة نامية.',
    seoTitle: 'Acheter à Aïn Aouda : ce qu’il faut savoir',
    description: 'Vivre et acheter à Aïn Aouda, à 20 minutes de Rabat : accès, cadre de vie et points de vigilance.',
  },
  {
    slug: 'investir-neuf-pres-de-rabat',
    date: '2026-09-17',
    titleFr: 'Investir dans l’immobilier neuf près de Rabat',
    titleAr: 'الاستثمار في العقار الجديد قرب الرباط',
    kickerFr: 'Investissement',
    kickerAr: 'الاستثمار',
    excerptFr:
      'Logement ou local commercial : deux logiques d’investissement dans un quartier neuf à Aïn Aouda.',
    excerptAr:
      'سكن أو محل تجاري: منطقان للاستثمار في حي جديد بعين عودة.',
    seoTitle: 'Investir dans l’immobilier neuf près de Rabat',
    description: 'Investissement locatif près de Rabat : appartements et fonds de commerce neufs à Aïn Aouda.',
  },
] as const;

export type GuideSlug = (typeof guides)[number]['slug'];
