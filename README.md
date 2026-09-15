# Riyad Zaer Gardens

Marketing site (UI only) for **Riyad Zaer Gardens** — mid-standing Moroccan real estate in Rabat / Aïn Aouda.

Live: https://tosharelater.github.io/riyad-zaer-gardens/

## Routes

- `/` — cinematic home hero, project pitch, housing-aid callout
- `/services` — distinct blocks for F3/F4, fonds de commerce, cadre & équipements
- `/contact` — WhatsApp-first CTA + polished lead form

Base path: `/riyad-zaer-gardens/`

## Brand

| Token | Hex | Use |
| --- | --- | --- |
| Vert Forêt Profond | `#002D2D` | logo/text/main background |
| Vert Canopée | `#0A3D35` | gradients/panels |
| Or Champagne | `#C8B568` | accents, titles ornaments |
| Or Pâle | `#D9C987` | subtitles, hairlines/borders |
| Crème Ivoire | `#F7F2E8` | light surfaces / cream text on dark |

### Typography

- **Display / titles:** Audrey is not available on Google Fonts. This site uses **Bodoni Moda** (high-contrast Didone twin) for titles.
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
