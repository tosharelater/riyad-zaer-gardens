# Riyad Zaer Gardens

Public marketing site for Riyad Zaer Gardens (FR / AR), built with Astro.

Live: https://tosharelater.github.io/riyad-zaer-gardens-web/

```bash
npm install
npm run dev
```

## Admin (local)

1. Start the API from a sibling `backend` folder if you have it:

```bash
cd ../backend
copy .env.example .env
.venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

2. Open http://localhost:4321/admin/
3. Key: `rzg-local-admin`

Leads, prices, remaining stock, chantier, gallery and FAQ are editable there. On GitHub Pages the contact form falls back to WhatsApp if the API is offline, then redirects to `/merci`.

## Content

Official page copy lives in `contenu-site-web/`. Do not invent missing `[À FOURNIR]` facts.
