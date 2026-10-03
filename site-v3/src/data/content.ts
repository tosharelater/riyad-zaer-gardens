import type { Locale } from '../i18n/paths';
import * as fr from './home';
import * as ar from './home.ar';

export function getHome(locale: Locale = 'fr') {
  const src = locale === 'ar' ? ar : fr;
  return {
    seo: src.seo,
    hero: src.hero,
    proof: src.proof,
    figures: src.figures,
    reasons: src.reasons,
    projet: src.projet,
    apartments: src.apartments,
    finishes: src.finishes,
    commerce: src.commerce,
    aid: src.aid,
    ways: src.ways,
    lieu: src.lieu,
    contact: src.contact,
    gallery: fr.gallery,
  };
}
