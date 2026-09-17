# Éléments globaux

Éléments présents sur **toutes les pages**. À intégrer une seule fois en composants.

---

## 1. Header (en-tête)

**Logo** : Riyad Zaer Gardens · mention « by La Manoussa » sous le logo ou à côté.

**Navigation principale** (6 entrées, dans cet ordre) :

| Libellé | Lien |
|---|---|
| Accueil | `/` |
| Le projet | `/le-projet` |
| Appartements | `/appartements` |
| Fonds de commerce | `/fonds-de-commerce` |
| Localisation | `/localisation` |
| Contact | `/contact` |

**Bouton d'action (à droite de la nav)** : `Être rappelé` → `/contact`

**Sélecteur de langue** : `FR` / `العربية`
> Note dev : prévoir l'emplacement dès maintenant, même si l'arabe est activé plus tard.

---

## 2. Barre d'action fixe (mobile uniquement)

Barre collée en bas de l'écran, visible sur toutes les pages.

| Icône | Libellé | Action |
|---|---|---|
| Téléphone | `Appeler` | `tel:+212708080839` |
| WhatsApp | `WhatsApp` | `https://wa.me/212708080839` |
| Formulaire | `Être rappelé` | `/contact` |

> Note dev : c'est le premier levier de conversion sur mobile. Ne pas la masquer au scroll.

---

## 3. Footer (pied de page)

### Colonne 1 — Identité

**Riyad Zaer Gardens**
by La Manoussa

> Nouveau pôle urbain à Rabat.

Appartements F3 et F4 et fonds de commerce à Aïn Aouda, à 20 minutes de Rabat.

### Colonne 2 — Le projet

- Le projet → `/le-projet`
- Appartements → `/appartements`
- Fonds de commerce → `/fonds-de-commerce`
- Localisation → `/localisation`

### Colonne 3 — Informations

- Questions fréquentes → `/faq`
- Guides & actualités → `/guides`
- Le promoteur → `/la-manoussa`
- Contact → `/contact`

### Colonne 4 — Nous joindre

**Téléphone** : 07 08 08 08 39 → `tel:+212708080839`
**WhatsApp** : Écrire sur WhatsApp → `https://wa.me/212708080839`
**Adresse** : Km 25, Avenue Mohammed VI, Rabat — Aïn Aouda
**Site** : riyadzaergardens.com

[À FOURNIR : adresse e-mail officielle]
[À FOURNIR : liens Instagram, Facebook, TikTok une fois les comptes créés]

### Bandeau bas

`© 2026 Riyad Zaer Gardens — by La Manoussa. Tous droits réservés.`
`Projet éligible à l'aide au logement.`

Liens : Mentions légales → `/mentions-legales` · Politique de confidentialité → `/mentions-legales#confidentialite`

---

## 4. Bloc de conversion réutilisable

À placer en bas des pages **Accueil, Le projet, Appartements, Fonds de commerce, Localisation**.

**H2** : Parlons de votre projet

**Texte** :
Laissez-nous vos coordonnées. Un conseiller vous rappelle pour répondre à vos questions et vous transmettre la brochure du projet.

**Boutons** :
- Principal : `Être rappelé` → `/contact`
- Secondaire : `Écrire sur WhatsApp` → `https://wa.me/212708080839`

---

## 5. Rappel « Aide au logement » (bandeau court réutilisable)

À placer sur **Le projet** et **Appartements**.

**Titre** : Un projet éligible à l'aide au logement

**Texte** :
Riyad Zaer Gardens est éligible au programme d'aide au logement de l'État. Selon votre situation, le prix d'un appartement peut démarrer à 350 000 DH au lieu de 420 000 DH.

**Lien** : `Vérifier mon éligibilité` → `/contact`

---

## 6. Page « Merci » (après envoi du formulaire)

**URL** : `/merci`
**Title SEO** : Merci pour votre demande — Riyad Zaer Gardens
**Meta description** : Votre demande a bien été envoyée. Un conseiller Riyad Zaer Gardens vous rappelle prochainement.
**Balise** : `noindex`

**H1** : Merci, votre demande est bien enregistrée

**Texte** :
Un conseiller vous rappelle au plus vite pour répondre à vos questions et vous transmettre la brochure du projet.

Vous préférez ne pas attendre ? Appelez-nous directement au 07 08 08 08 39.

**Boutons** :
- `Appeler maintenant` → `tel:+212708080839`
- `Découvrir le projet` → `/le-projet`

> Note dev : cette page sert à mesurer les conversions (objectif analytics + Meta/TikTok Ads). Elle doit avoir sa propre URL, pas une simple pop-in.

---

## 7. Page 404

**H1** : Cette page n'existe pas

**Texte** :
Le lien que vous avez suivi ne mène nulle part. Revenez à l'accueil ou découvrez directement les appartements disponibles.

**Boutons** : `Retour à l'accueil` → `/` · `Voir les appartements` → `/appartements`
