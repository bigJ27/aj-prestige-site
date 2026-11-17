# AJ Prestige — ajprestige-conciergerie.com

Site vitrine de la conciergerie Airbnb **AJ Prestige** (Val-d'Oise et
Île-de-France), construit avec **Next.js 15** (App Router, TypeScript).
Toutes les pages sont générées à l'avance (statiques) : elles s'affichent
immédiatement, sans calcul côté serveur.

## Commandes

```bash
npm install     # installe les dépendances (une seule fois)
npm run dev     # serveur de développement : http://localhost:3000
npm run build   # fabrique la version de production
npm start       # sert la version de production
```

## Modifier le contenu

| Je veux changer…                                         | Fichier                     |
| -------------------------------------------------------- | --------------------------- |
| Téléphone, e-mail, WhatsApp, Instagram, formulaire       | `lib/site.ts`               |
| Services, packs et tarifs, comparatif, FAQ, parcours     | `lib/content.ts`            |
| Les avis clients affichés sur l'accueil                  | `lib/content.ts` (en bas)   |
| Les textes des 8 pages villes                            | `lib/villes.ts`             |
| Les photos (et leur description)                         | `public/images/` + `lib/photos.ts` |

Pas besoin de vous soucier des espaces avant `: ? ! % €` : elles sont
rendues insécables automatiquement (`lib/typo.ts`), pour qu'un signe ne se
retrouve jamais seul en début de ligne.

### Ajouter de vrais avis clients

La section « Ils nous confient leur bien » reste masquée tant que la liste
`temoignages` (dans `lib/content.ts`) est vide. Collez-y vos avis Google (avec
l'accord de leurs auteurs) : la section apparaît toute seule.

### Remplacer une photo

Déposez votre photo dans `public/images/` **sous le même nom** (JPEG, environ
2 000 px de large), puis adaptez sa description dans `lib/photos.ts` (le texte
`alt`, lu par les malvoyants et par Google). Next.js fabrique lui-même les
versions légères (AVIF/WebP) adaptées à chaque écran.

## Design

Parti pris : le « livret d'accueil » d'une maison bien tenue. Papier chaud,
une sérif douce pour les titres (Fraunces), une linéale lisible pour le texte
(Figtree), une seule couleur d'accent (terre cuite), des filets fins.

Tout le design est dans `app/globals.css` (couleurs en tête de fichier).

**Règles de performance** à respecter si vous modifiez le style — ce sont
elles qui rendaient l'ancienne version lente sur téléphone :

- pas de `backdrop-filter` (effet « verre ») ni de `filter: blur()` ;
- pas d'animation en boucle infinie (le processeur ne se repose jamais) ;
- on n'anime que `transform` et `opacity` ;
- le contenu ne doit jamais attendre le JavaScript pour s'afficher.

## Composants (`components/`)

| Composant      | Rôle                                                                 |
| -------------- | -------------------------------------------------------------------- |
| `Header`       | En-tête et menu mobile plein écran                                   |
| `ActionBar`    | Barre mobile Appeler · WhatsApp · Audit (sans JavaScript)            |
| `Journey`      | Le parcours en 6 « arrêts », dessiné comme un plan de ligne          |
| `Packs`        | La carte des tarifs (3 packs)                                        |
| `Estimator`    | L'estimateur de revenus, présenté comme un relevé mensuel            |
| `ZoneMap`      | La carte des 8 communes (+ `CityList`, la liste numérotée)           |
| `Faq`          | Questions fréquentes (balise HTML `<details>`, sans JavaScript)      |
| `Photo`        | Photo optimisée sans JavaScript (remplace `next/image`)              |
| `CtaBand`, `ContactForm`, `Testimonials`, `Footer`, `icons`           | |

Seuls `Header`, `Estimator` et `ContactForm` embarquent du JavaScript : tout le
reste est du HTML et du CSS, ce qui rend le site léger.

Le bouton « Choisir … » d'un pack ouvre le formulaire avec le pack déjà
sélectionné (`/contact?pack=sweet-home`).

## Outils (`scripts/`)

- `generer-carte.py` — redessine la carte à partir des données officielles de
  l'IGN (contours des communes, lac, forêts, voies ferrées). Produit
  `public/carte/zone.svg` et `lib/carte.ts`.
  `python3 scripts/generer-carte.py`
- `alleger-polices.py` — fabrique les fichiers de polices allégés de
  `app/fonts/` (voir l'en-tête du script).

## Variables d'environnement

| Variable            | Rôle                                                               |
| ------------------- | ------------------------------------------------------------------ |
| `NEXT_PUBLIC_GA_ID` | ID Google Analytics 4 (ex. `G-ABC1234567`). Vide = GA non injecté. |

À configurer dans Vercel → Settings → Environment Variables.

## Déploiement

Hébergé sur Vercel, preset **Next.js** (forcé par `vercel.json`).

## Référencement (SEO)

- Adresse canonique et aperçu de partage (`app/opengraph-image.jpg`) sur chaque page
- Données structurées : `LocalBusiness` (accueil), `FAQPage` (tarifs), fil d'Ariane (villes)
- `sitemap.xml` et `robots.txt` générés par Next.js
- 8 pages villes `/conciergerie-airbnb-<ville>` (via `app/[slug]`)
- Redirections permanentes des anciennes adresses (`/packs` → `/tarifs`,
  `/pourquoi-nous` → `/services`, `/avis` → `/`)

## Crédits

Photos : Unsplash (auteurs cités dans les mentions légales). Carte : IGN,
Licence Ouverte Etalab 2.0. Polices : Fraunces et Figtree, SIL Open Font
License (licences dans `app/fonts/`).
