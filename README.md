# Riyad Zaer Gardens

Cinematic Astro showroom for **Riyad Zaer Gardens** (mid-standing, Rabat / Aïn Aouda).

Live: https://tosharelater.github.io/riyad-zaer-gardens/

## Structure

- **Home** — 4 beats: Hero (where + scale) → Living (Cadre de vie + quiet trust) → Explore typology (monumental plan L / panel R) → WhatsApp handoff
- **Prestations** (`/services`) — deep typologies & amenities
- **Contact** (`/contact`) — one WhatsApp conversion + quiet form (prefills typology from session)

No chapter labels, no progress-dot tour UI, no 5-step game framing.

Hero motion: Arrive / Live / Explore use `public/parcours/video/{arrive,live,explore}.*` (poster-first, `preload=none` until in view; `prefers-reduced-motion` keeps still posters). Clips are Ken Burns / crossfades rebuilt from `public/parcours/viz-*.jpg`.

Base path: `/riyad-zaer-gardens/`

## Brand

| Token | Hex |
| --- | --- |
| Vert Forêt Profond | `#002D2D` |
| Vert Canopée | `#0A3D35` |
| Or Champagne | `#C8B568` |
| Or Pâle | `#D9C987` |
| Crème Ivoire | `#F7F2E8` |

Display: Audrey when present, else Cormorant Garamond (temp) · Body/UI: Poppins · FR / AR RTL

WhatsApp placeholder: `wa.me/212600000000`

## Develop

```bash
npm install
npm run dev
npm run build && npm run preview
```

## Deploy (GitHub Pages)

Keep `public/.nojekyll` and publish with `--dotfiles`:

```bash
npm run build
npx gh-pages -d dist -b gh-pages --dotfiles
```

Requires Node.js ≥ 22.12.
