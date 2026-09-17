# Page — Contact

## Paramètres techniques

- **URL** : `/contact`
- **Title SEO** (52 car.) : `Contact — Riyad Zaer Gardens, Aïn Aouda`
- **Meta description** (146 car.) : `Contactez Riyad Zaer Gardens à Aïn Aouda : demande de brochure, prix, visite du site. Un conseiller vous rappelle. Tél. 07 08 08 08 39.`
- **H1 unique** : `Contacter Riyad Zaer Gardens`
- **Mots-clés visés** : contact Riyad Zaer Gardens · brochure projet immobilier Aïn Aouda
- **Objectif** : capter le lead avec le minimum de friction.

---

## Section 1 — Introduction

**H1** : Contacter Riyad Zaer Gardens

**Chapô** :
Une question sur les typologies, les prix ou l'aide au logement ? Laissez-nous vos coordonnées : un conseiller vous rappelle et vous transmet la brochure du projet.

---

## Section 2 — Le formulaire

**H2** : Être rappelé

**Champs** :

| Champ | Type | Libellé | Obligatoire |
|---|---|---|---|
| `nom` | texte | Nom complet | Oui |
| `telephone` | téléphone | Téléphone | Oui |
| `email` | e-mail | E-mail | Non |
| `interet` | liste déroulante | Votre projet | Oui |
| `message` | zone de texte | Votre message (facultatif) | Non |

**Options de la liste « Votre projet »** :
- Appartement F3
- Appartement F4
- Fonds de commerce
- Investissement locatif
- Je me renseigne depuis l'étranger

**Bouton d'envoi** : `Envoyer ma demande`

**Mention sous le formulaire** :
Vos informations servent uniquement à vous recontacter au sujet du projet. Elles ne sont ni revendues, ni utilisées à d'autres fins.

**Après envoi** : redirection vers `/merci`

> Note dev : 5 champs maximum, dont 3 obligatoires. Ne pas ajouter de champ supplémentaire sans validation.
> Les leads doivent être transmis au CRM Odoo. Prévoir également un envoi e-mail de secours.
> Ajouter une protection anti-spam invisible (honeypot), pas de captcha visible.

---

## Section 3 — Autres moyens de contact

**H2** : Nous joindre directement

**H3** : Par téléphone
07 08 08 08 39 → `tel:+212708080839`

**H3** : Sur WhatsApp
Écrivez-nous, nous répondons rapidement. → `https://wa.me/212708080839`

**H3** : Sur place
Km 25, Avenue Mohammed VI, Rabat — Aïn Aouda

[À FOURNIR : adresse e-mail officielle et horaires de disponibilité de l'équipe commerciale.]

---

## Section 4 — Visiter le site

**H2** : Visiter le site du projet

**Texte** :
Nous organisons des visites sur le terrain pour situer les immeubles, les espaces verts et les commerces. Indiquez vos disponibilités dans le formulaire, nous convenons d'un créneau avec vous.

---

## Section 5 — Questions fréquentes

**H2** : Vous vous posez encore des questions ?

**Texte** :
Les réponses aux questions les plus courantes sur les prix, l'aide au logement et la livraison sont regroupées sur une page dédiée.

**Lien** : `Consulter la FAQ` → `/faq`
