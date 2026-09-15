# Riyad Zaer Gardens

Premium Astro + Tailwind showroom for **Riyad Zaer Gardens** (mid-standing, Rabat / Aïn Aouda).

Live: https://tosharelater.github.io/riyad-zaer-gardens/

## Stack

- Astro 7 + Tailwind CSS v4 (`@tailwindcss/vite`)
- FR / AR i18n · base `/riyad-zaer-gardens/`
- Display Latin: Audrey when present, else Cormorant Garamond · UI Latin: Poppins
- Arabic: IBM Plex Sans Arabic (UI) + Noto Naskh Arabic (display) on `html[lang=ar]` / `[dir=rtl]`

## Structure

- **Home** — Hero → Cadre de vie (lighter fullscreen sticky scroll) → Promesse → Explorer (compact plan) → Emplacement (map feel) → Finitions → FAQ → WhatsApp handoff
- **Prestations** (`/services`) — premium typologies & amenities storytelling
- **À propos** (`/about`) — vision & project scale
- **Blog** (`/blog`, `/blog/[slug]`) — index + sample articles
- **Contact** (`/contact`) — WhatsApp + form + FAQ

Splash: exact 3s every visit, logo on `#002D2D`, soft angled gold fade band L→R.

## Brand

| Token | Hex |
| --- | --- |
| Vert Forêt Profond | `#002D2D` |
| Vert Canopée | `#0A3D35` |
| Or Champagne | `#C8B568` |
| Or Pâle | `#D9C987` |
| Crème Ivoire | `#F7F2E8` |

WhatsApp placeholder: `wa.me/212600000000`

## Develop

```bash
npm install
npm run dev
npm run build && npm run preview
```

## Deploy (GitHub Pages)

```bash
npm run build
npx gh-pages -d dist -b gh-pages --dotfiles
```

Keep `public/.nojekyll`. Requires Node.js ≥ 22.12.
