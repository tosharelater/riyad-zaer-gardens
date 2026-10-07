import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://riyadzaergardens.com',
  output: 'static',
  compressHTML: true,
  i18n: {
    defaultLocale: 'fr',
    locales: ['fr', 'ar'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
