export const locales = ['fr', 'ar'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'fr';

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** Strip locale prefix and trailing slash */
export function stripLocale(pathname: string): string {
  const clean = pathname.replace(/\/$/, '') || '/';
  if (clean === '/ar') return '/';
  if (clean.startsWith('/ar/')) return clean.slice(3) || '/';
  return clean;
}

export function getLocaleFromPath(pathname: string): Locale {
  const clean = pathname.replace(/\/$/, '') || '/';
  if (clean === '/ar' || clean.startsWith('/ar/')) return 'ar';
  return 'fr';
}

/** Build a localized path for a route like `/le-projet` or `/` */
export function localePath(locale: Locale, path = '/'): string {
  const base = path === '/' ? '' : path.replace(/\/$/, '');
  if (locale === 'fr') return base || '/';
  return `/ar${base || ''}` || '/ar';
}

/** Switch current path to another locale */
export function switchLocalePath(pathname: string, target: Locale): string {
  return localePath(target, stripLocale(pathname));
}
