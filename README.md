# AJ Prestige — ajprestige-conciergerie.com

Site vitrine de la conciergerie Airbnb **AJ Prestige** (Val-d'Oise &
Île-de-France), construit avec **Next.js 15** (App Router, TypeScript,
Tailwind CSS). Toutes les pages sont générées statiquement (SSG).

## Commandes

```bash
npm install     # installe les dépendances
npm run dev     # serveur de développement (http://localhost:3000)
npm run build   # build de production (SSG)
npm start       # sert le build de production
```

## Modifier les textes

| Contenu                                            | Fichier          |
| -------------------------------------------------- | ---------------- |
| Téléphone, email, WhatsApp, Instagram, Formspree   | `lib/site.ts`    |
| Packs, comparatif, FAQ, étapes du parcours, photos | `lib/content.ts` |
| Pages villes (textes SEO localisés)                | `lib/villes.ts`  |

## Design

Langage visuel inspiré d'Apple (îlot de navigation en verre flottant,
grandes typographies Inter, sections claires / panneaux sombres arrondis,
apparitions douces au défilement) avec la palette coucher de soleil de la
marque (sable, orange, corail, terracotta, bleu nuit).
Tout le design système est dans `app/globals.css` (variables en tête de
fichier). Les animations respectent le réglage « réduire les animations ».

Composants principaux (`components/`) :

- `Header` — îlot de navigation + menu mobile en feuille de verre
- `MobileActions` — barre mobile Appeler · WhatsApp · Audit, bouton WhatsApp sur ordinateur
- `MetroJourney` — ligne de métro animée (le train s'arrête 2 s à chaque étape)
- `PricingCards` — les 3 packs (carrousel automatique sur mobile)
- `Estimator` — estimateur de revenus (prix/nuit × occupation − commission)
- `ZoneMap` — carte schématique des 8 villes d'intervention
- `Faq`, `CtaBand`, `ContactForm`, `Reveal`, `Footer`

Le bouton « Choisir … » d'un pack ouvre le formulaire avec le pack déjà
sélectionné (`/contact?pack=sweet-home`).

## Variables d'environnement

| Variable            | Rôle                                                               |
| ------------------- | ------------------------------------------------------------------ |
| `NEXT_PUBLIC_GA_ID` | ID Google Analytics 4 (ex. `G-ABC1234567`). Vide = GA non injecté. |

À configurer dans Vercel → Settings → Environment Variables.

## Déploiement Vercel

Le projet doit utiliser le preset **Next.js** (forcé par `vercel.json`).

## SEO

- Canonical et Open Graph sur `https://ajprestige-conciergerie.com`
- JSON-LD LocalBusiness sur la page d'accueil
- `sitemap.xml` et `robots.txt` générés par Next
- 8 pages villes `/conciergerie-airbnb-<ville>` (via `app/[slug]`)
- Redirections 301 des anciennes routes (`/packs` → `/tarifs`,
  `/pourquoi-nous` → `/services`, `/avis` → `/`)
