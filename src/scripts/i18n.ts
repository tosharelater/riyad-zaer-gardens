import { strings, type Lang, type StringKey } from '../i18n/strings';

const STORAGE_KEY = 'rzg-lang';

function applyLang(lang: Lang) {
  const html = document.documentElement;
  html.lang = lang;
  html.dir = lang === 'ar' ? 'rtl' : 'ltr';
  localStorage.setItem(STORAGE_KEY, lang);

  document.querySelectorAll<HTMLElement>('[data-i18n]').forEach((el) => {
    const key = el.dataset.i18n as StringKey | undefined;
    if (!key || !(key in strings[lang])) return;
    el.textContent = strings[lang][key];
  });

  document.querySelectorAll<HTMLElement>('[data-i18n-placeholder]').forEach((el) => {
    const key = el.dataset.i18nPlaceholder as StringKey | undefined;
    if (!key || !(key in strings[lang])) return;
    if ('placeholder' in el) (el as HTMLInputElement).placeholder = strings[lang][key];
  });

  document.querySelectorAll<HTMLButtonElement>('.lang-toggle button').forEach((btn) => {
    btn.setAttribute('aria-pressed', btn.dataset.lang === lang ? 'true' : 'false');
  });
}

export function initLangToggle() {
  const saved = (localStorage.getItem(STORAGE_KEY) as Lang | null) ?? 'fr';
  applyLang(saved === 'ar' ? 'ar' : 'fr');

  document.querySelectorAll<HTMLButtonElement>('.lang-toggle button').forEach((btn) => {
    btn.addEventListener('click', () => {
      const lang = (btn.dataset.lang as Lang) || 'fr';
      applyLang(lang);
    });
  });
}
