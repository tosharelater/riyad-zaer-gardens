import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://riyadzaergardens.com',
  output: 'static',
  compressHTML: true,
  // The merged copy shares ../site-v3/node_modules through a junction (fonts live there)
  vite: { server: { fs: { allow: ['..'] } } },
  i18n: {
    defaultLocale: 'fr',
    locales: ['fr', 'ar'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
