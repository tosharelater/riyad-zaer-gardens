# Riyad Zaer Gardens

Premium Astro + Tailwind showroom for **Riyad Zaer Gardens** (mid-standing, Rabat / Aïn Aouda).

Live: https://tosharelater.github.io/riyad-zaer-gardens/

## Stack

- Astro 7 + Tailwind CSS v4 (`@tailwindcss/vite`)
- FR / AR i18n · base `/riyad-zaer-gardens/`
- Display: Audrey when present, else Cormorant Garamond (temp) · UI: Poppins

## Structure

- **Home** — Hero → Cadre de vie (fullscreen sticky scroll story) → Promesse → Explorer (compact plan + F3 default) → Emplacement / Finitions → FAQ → WhatsApp handoff
- **Prestations** (`/services`) — typologies & amenities
- **Contact** (`/contact`) — solid WhatsApp + visible form + FAQ

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
