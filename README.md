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

## Variables d'environnement

| Variable            | Rôle                                                                 |
| ------------------- | -------------------------------------------------------------------- |
| `NEXT_PUBLIC_GA_ID` | ID Google Analytics 4 (ex. `G-ABC1234567`). Vide = GA non injecté.   |

À configurer dans Vercel → Settings → Environment Variables.

## Déploiement Vercel

Le projet doit utiliser le preset **Next.js** :
Settings → Build & Development Settings → Framework Preset → **Next.js**
(l'ancien preset "Create React App" fait échouer le build).

## Structure

- `app/` — pages App Router (`/`, `/services`, `/tarifs`, `/contact`,
  `/mentions-legales`, `/politique-confidentialite`), pages villes SEO
  (`/conciergerie-airbnb-<ville>` via `app/[slug]`), `sitemap.ts`, `robots.ts`
- `components/` — Header, Footer, ContactForm, CtaBand, WhatsAppButton
- `lib/site.ts` — coordonnées et constantes du site
- `lib/villes.ts` — contenus SEO localisés des 8 villes

## SEO

- Canonical et Open Graph sur `https://ajprestige-conciergerie.com`
- JSON-LD LocalBusiness sur la page d'accueil
- `sitemap.xml` et `robots.txt` générés par Next
- Redirections 301 des anciennes routes (`/packs` → `/tarifs`,
  `/pourquoi-nous` → `/services`, `/avis` → `/`)
