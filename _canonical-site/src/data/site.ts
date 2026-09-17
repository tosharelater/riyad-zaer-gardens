import { withBase } from '../lib/base';

export const site = {
  name: 'Riyad Zaer Gardens',
  slogan: 'Nouveau pôle urbain à Rabat',
  promoter: 'La Manoussa',
  architect: 'Mabani Architects',
  phone: '07 08 08 08 39',
  phoneTel: '+212708080839',
  whatsapp: 'https://wa.me/212708080839',
  domain: 'riyadzaergardens.com',
  delivery: 'septembre 2028',
  deliveryShort: 'Septembre 2028',
  address: 'Km 25, Avenue Mohammed VI, Rabat',
  locationReal: 'Aïn Aouda',
  distance: 'à 20 minutes de Rabat',
  priceFrom: '420 000 DH',
  priceWithAid: '350 000 DH',
  commercePrice: '15 000 DH le m²',
  apartments: 120,
  commercial: 49,
  buildings: 9,
  surfaceRange: 'de 65 à 86 m²',
  commerceSurface: 'de 13 à 30 m²',
} as const;

export const typologies = [
  {
    id: 'f3',
    titleFr: 'Appartement F3',
    titleAr: 'شقة F3',
    surfaceFr: 'environ 68 à 72 m²',
    surfaceAr: 'حوالي 68 إلى 72 م²',
    priceFr: 'à partir de 420 000 DH',
    priceAr: 'ابتداءً من 420 000 درهم',
    bodyFr:
      'Un séjour, deux chambres, une cuisine et une salle de bain. Selon le lot : balcon ou terrasse, buanderie et placards intégrés.',
    bodyAr:
      'صالون، غرفتان، مطبخ وحمام. حسب الوحدة: شرفة أو تراس، غسيل وخزائن مدمجة.',
    image: withBase('/gallery/render-1.jpg'),
  },
  {
    id: 'f4',
    titleFr: 'Appartement F4',
    titleAr: 'شقة F4',
    surfaceFr: 'environ 77 à 86 m²',
    surfaceAr: 'حوالي 77 إلى 86 م²',
    priceFr: 'à partir de 420 000 DH',
    priceAr: 'ابتداءً من 420 000 درهم',
    bodyFr:
      'Un séjour, trois chambres, une cuisine, une salle de bain et un WC séparé. Selon le lot : balcon ou terrasse, buanderie et placards intégrés.',
    bodyAr:
      'صالون، ثلاث غرف، مطبخ، حمام ومرحاض منفصل. حسب الوحدة: شرفة أو تراس، غسيل وخزائن مدمجة.',
    image: withBase('/gallery/render-6.jpg'),
  },
  {
    id: 'fonds',
    titleFr: 'Fonds de commerce',
    titleAr: 'محلات تجارية',
    surfaceFr: 'de 13 à 30 m²',
    surfaceAr: 'من 13 إلى 30 م²',
    priceFr: 'à partir de 15 000 DH le m²',
    priceAr: 'ابتداءً من 15 000 درهم للمتر المربع',
    bodyFr: '49 locaux en rez-de-chaussée sur l’Avenue Mohammed VI.',
    bodyAr: '49 محلاً في الطابق الأرضي على شارع محمد السادس.',
    image: withBase('/gallery/render-8.jpg'),
  },
] as const;

export const amenities = [
  { fr: 'Ascenseur dans chaque immeuble', ar: 'مصعد في كل عمارة' },
  { fr: 'Cœur d’îlot végétalisé et aires de jeux', ar: 'فناء أخضر ومناطق لعب' },
  { fr: 'Parking couvert en sous-sol', ar: 'موقف مغطى تحت الأرض' },
  { fr: 'Résidence sécurisée et gardiennée', ar: 'إقامة مؤمنة بحراسة' },
  { fr: 'Finitions modernes', ar: 'تشطيبات عصرية' },
  { fr: 'Commerces en rez-de-chaussée', ar: 'محلات في الطابق الأرضي' },
] as const;

export const finishes = [
  { fr: 'Sols — céramique ou parquet stratifié', ar: 'الأرضيات — سيراميك أو باركيه' },
  { fr: 'Salle de bain — douche à l’italienne, sanitaires Roca', ar: 'الحمام — دش إيطالي وتجهيزات Roca' },
  { fr: 'Confort — volets roulants motorisés Somfy', ar: 'الراحة — ستائر كهربائية Somfy' },
] as const;

export const finishTable = [
  { fr: 'Sols', frVal: 'Carreau céramique ou parquet stratifié', ar: 'الأرضيات', arVal: 'سيراميك أو باركيه' },
  { fr: 'Salle de bain', frVal: 'Douche à l’italienne, sanitaires et robinetterie Roca', ar: 'الحمام', arVal: 'دش إيطالي وتجهيزات Roca' },
  { fr: 'Menuiseries extérieures', frVal: 'Aluminium', ar: 'النجارة الخارجية', arVal: 'ألومنيوم' },
  { fr: 'Volets', frVal: 'Volets roulants motorisés Somfy', ar: 'الستائر', arVal: 'ستائر كهربائية Somfy' },
  { fr: 'Portes intérieures', frVal: 'Finition bois', ar: 'الأبواب الداخلية', arVal: 'تشطيب خشبي' },
  { fr: 'Plafonds', frVal: 'Faux plafonds avec éclairage LED intégré', ar: 'الأسقف', arVal: 'أسقف معلقة بإضاءة LED' },
  { fr: 'Cuisine', frVal: 'Meubles en MDF', ar: 'المطبخ', arVal: 'أثاث MDF' },
  { fr: 'Parties communes', frVal: 'Éclairage LED, détecteurs de mouvement dans les circulations et escaliers', ar: 'الأجزاء المشتركة', arVal: 'إضاءة LED وكواشف حركة' },
] as const;

export const reasons = [
  {
    titleFr: 'Un cœur d’îlot végétalisé',
    titleAr: 'فناء أخضر في قلب الإقامة',
    bodyFr:
      'Les immeubles s’organisent autour d’une cour centrale plantée, calme et réservée aux résidents. Elle apporte de la lumière et de l’air aux appartements, et de la fraîcheur en été.',
    bodyAr:
      'تنتظم العمارات حول فناء مركزي مغروس، هادئ ومخصص للسكان. يمنح الشقق الضوء والهواء، والبرودة في الصيف.',
  },
  {
    titleFr: 'À 20 minutes de Rabat',
    titleAr: 'على بعد 20 دقيقة من الرباط',
    bodyFr:
      'Sur l’Avenue Mohammed VI, avec un accès direct à l’autoroute et aux axes qui mènent à Rabat, Témara et Salé.',
    bodyAr:
      'على شارع محمد السادس، مع ولوج مباشر إلى الطريق السيار والمحاور نحو الرباط وتمارة وسلا.',
  },
  {
    titleFr: 'Des appartements livrés finis',
    titleAr: 'شقق تُسلَّم منتهية',
    bodyFr: 'Les logements sont livrés avec leurs finitions. Vous n’avez pas de travaux à prévoir avant d’emménager.',
    bodyAr: 'تُسلَّم المساكن بتشطيباتها. لا أعمال تنتظركم قبل الانتقال.',
  },
  {
    titleFr: 'Un prix juste',
    titleAr: 'سعر منصف',
    bodyFr: 'Un logement de moyen standing à un prix accessible, encore réduit par l’aide au logement.',
    bodyAr: 'سكن متوسط الوقوف بسعر في المتناول، ينخفض أكثر مع دعم السكن.',
  },
] as const;

export const waysToBe = [
  {
    titleFr: 'Y vivre',
    titleAr: 'للسكن',
    bodyFr: 'Votre premier logement, prêt à habiter, dans un quartier calme et verdoyant à 20 minutes de Rabat.',
    bodyAr: 'مسكنكم الأول، جاهز للسكن، في حي هادئ وأخضر على بعد 20 دقيقة من الرباط.',
  },
  {
    titleFr: 'Y investir',
    titleAr: 'للاستثمار',
    bodyFr: 'Un bien neuf à louer dans une zone qui se développe, avec un ticket d’entrée maîtrisé.',
    bodyAr: 'عقار جديد للكراء في منطقة تتوسع، بتكلفة دخول محسوبة.',
  },
  {
    titleFr: 'Y revenir',
    titleAr: 'للعودة',
    bodyFr: 'Un pied-à-terre au Maroc, livré fini et sécurisé, prêt à vous accueillir à chaque retour.',
    bodyAr: 'موطئ قدم في المغرب، منتهٍ ومؤمَّن، جاهز لاستقبالكم في كل عودة.',
  },
] as const;

export const contactInterests = [
  { id: 'f3', fr: 'Appartement F3', ar: 'شقة F3' },
  { id: 'f4', fr: 'Appartement F4', ar: 'شقة F4' },
  { id: 'fonds', fr: 'Fonds de commerce', ar: 'محل تجاري' },
  { id: 'investissement', fr: 'Investissement locatif', ar: 'استثمار للكراء' },
  { id: 'etranger', fr: 'Je me renseigne depuis l’étranger', ar: 'أستعلم من الخارج' },
] as const;

export const galleryImages = Array.from({ length: 12 }, (_, i) => ({
  src: withBase(`/gallery/render-${i + 1}.jpg`),
  altFr: `Vue du projet immobilier Riyad Zaer Gardens à Aïn Aouda — visuel ${i + 1}`,
  altAr: `منظر مشروع رياض زائر غاردنز في عين عودة — صورة ${i + 1}`,
}));
