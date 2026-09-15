// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://tosharelater.github.io',
  base: '/riyad-zaer-gardens/',
  vite: {
    plugins: [tailwindcss()],
  },
});
