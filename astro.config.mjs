// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

const pages = process.env.GITHUB_PAGES === 'true';
const repo = 'riyad-zaer-gardens-web';

// https://astro.build/config
export default defineConfig({
  srcDir: './_canonical-site/src',
  publicDir: './_canonical-site/public',
  site: pages ? `https://tosharelater.github.io/${repo}` : undefined,
  base: pages ? `/${repo}` : '/',
  trailingSlash: 'ignore',
  redirects: {
    '/projet': '/le-projet/',
    '/typologies': '/appartements/',
    '/equipements': '/le-projet/',
    '/chantier': '/le-projet/',
    '/a-propos': '/le-projet/',
    '/about': '/le-projet/',
    '/services': '/appartements/',
    '/emplacement': '/localisation/',
    '/galerie': '/',
    '/aides': '/contact/',
    '/blog': '/guides/',
    '/design-system': '/',
    '/staging': '/',
    '/staging-2': '/',
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
