# Riyad Zaer Gardens

Marketing site (UI only) for **Riyad Zaer Gardens** — mid-standing Moroccan real estate in Rabat / Aïn Aouda.

Live: https://tosharelater.github.io/riyad-zaer-gardens/

## Routes

- `/` — editorial asymmetric hero, project stats, pull-quote, family story
- `/services` — photography-led F3 / F4 / fonds stories + quiet amenities
- `/contact` — WhatsApp-first CTA + quiet lead form

Base path: `/riyad-zaer-gardens/`

## Brand

Editorial Moroccan real-estate magazine — photography-led, cream/dark section rhythm.

| Token | Hex | Use |
| --- | --- | --- |
| Vert Forêt Profond | `#002D2D` | main dark surfaces |
| Vert Canopée | `#0A3D35` | panels |
| Or Champagne | `#C8B568` | accents |
| Or Pâle | `#D9C987` | soft accents |
| Crème Ivoire | `#F7F2E8` | light sections / cream text on dark |

### Typography

- **Display (sparingly):** Bodoni Moda
- **Body / UI:** Poppins (300 / 400 / 500 / 700)

FR / AR language toggle with real RTL for Arabic.

## Develop

```bash
npm install
npm run dev
npm run build && npm run preview
```

## Deploy (GitHub Pages)

Always keep `public/.nojekyll` and publish with `--dotfiles` so `_astro` CSS is not stripped by Jekyll:

```bash
npm run build
npx gh-pages -d dist -b gh-pages --dotfiles
```

Requires Node.js ≥ 22.12.
