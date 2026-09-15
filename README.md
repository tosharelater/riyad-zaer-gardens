# Riyad Zaer Gardens — Le parcours Riyad

Single Astro story-showroom for **Riyad Zaer Gardens** (mid-standing, Rabat / Aïn Aouda).

Live: https://tosharelater.github.io/riyad-zaer-gardens/

## Parcours (Home)

Five scroll chapters on one page:

1. **Arrive** `#arrive` — full-bleed 3D, clamp() type, **Commencer le parcours** only (WhatsApp on Talk)
2. **Live** `#live` — lifestyle / cadre de vie (folder photography)
3. **Choose** `#choose` — interactive plan hotspots → F3 / F4 / fonds panels
4. **Trust** `#trust` — aides + chantier markers (no forms)
5. **Talk** `#talk` — WhatsApp CTA (prefills chosen typology client-side)

Optional sticky progress dots (skippable). `/services` and `/contact` redirect into `#choose` / `#talk`.

Hero motion: Arrive + Live use `public/parcours/video/*` (WebM/MP4), poster-first, `preload=none` until in view; `prefers-reduced-motion` keeps still posters only. Choose/Trust stay photo.

Base path: `/riyad-zaer-gardens/`

## Brand

| Token | Hex |
| --- | --- |
| Vert Forêt Profond | `#002D2D` |
| Vert Canopée | `#0A3D35` |
| Or Champagne | `#C8B568` |
| Or Pâle | `#D9C987` |
| Crème Ivoire | `#F7F2E8` |

Display: Bodoni Moda (TODO → Audrey) · Body/UI: Poppins · FR / AR RTL

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
