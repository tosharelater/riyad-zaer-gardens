import { defineConfig } from 'astro/config';

export default defineConfig({
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
