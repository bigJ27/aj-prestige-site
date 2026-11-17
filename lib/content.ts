/**
 * Contenus partagés du site : services, packs, comparatif, FAQ, parcours…
 *
 * C'est LE fichier à modifier pour changer un texte ou un tarif : la
 * modification se répercute sur toutes les pages qui l'utilisent.
 * Les espaces avant « : ? ! % € » sont rendues insécables automatiquement
 * (voir lib/typo.ts), inutile de s'en soucier ici.
 */

/* ------------------------------------------------------------------ */
/* Repères chiffrés (bandeau sous le haut de la page d'accueil)        */
/* ------------------------------------------------------------------ */
export const reperes = [
  {
    valeur: "15 à 25 %",
    texte: "de commission, uniquement sur les réservations confirmées",
  },
  {
    valeur: "0 €",
    texte: "de frais de mise en place, de frais fixes ou cachés",
  },
  {
    valeur: "72 h",
    texte: "pour mettre votre bien en ligne après la signature",
  },
  {
    valeur: "7 j/7",
    texte: "auprès de vos voyageurs, du premier message au départ",
  },
];

/* ------------------------------------------------------------------ */
/* Services                                                            */
/* ------------------------------------------------------------------ */
export type Service = {
  titre: string;
  /** Une phrase, affichée sur la page d'accueil */
  resume: string;
  /** Accroche et texte complet, affichés sur la page Services */
  accroche: string;
  texte: string;
};

export const services: Service[] = [
  {
    titre: "Annonce et photos professionnelles",
    resume:
      "Création ou reprise de votre annonce sur Airbnb et Booking : photos, titre et description travaillés. La mise en place est offerte.",
    accroche: "La première source de réservations.",
    texte:
      "Nous créons ou reprenons entièrement votre annonce sur Airbnb et Booking : photos professionnelles, titre et description optimisés, mots-clés travaillés pour le référencement. Une annonce soignée est la première source de réservations — et la mise en place est offerte.",
  },
  {
    titre: "Voyageurs, 7 jours sur 7",
    resume:
      "Réponses rapides, arrivées et départs soignés, assistance pendant tout le séjour.",
    accroche: "Rassurer, guider, fidéliser.",
    texte:
      "Réponses rapides aux demandes, sélection des voyageurs, arrivées et départs soignés, assistance pendant tout le séjour et gestion des avis après le départ. Chaque voyageur est rassuré et guidé, à toute heure.",
  },
  {
    titre: "Ménage et linge hôtelier",
    resume:
      "Un ménage complet entre chaque séjour, contrôlé en photos, et du linge de qualité hôtelière.",
    accroche: "Ce qui fait les avis cinq étoiles.",
    texte:
      "Ménage complet entre chaque séjour, avec listes de contrôle détaillées et vérification en photos. Linge de qualité hôtelière lavé et repassé, réassort des produits essentiels. La propreté est notre priorité absolue : c’est elle qui fait les avis cinq étoiles.",
  },
  {
    titre: "Tarification dynamique",
    resume:
      "Vos prix suivent la saison, les événements locaux et la concurrence. Reversement mensuel, récapitulatif clair.",
    accroche: "Le bon prix, chaque nuit.",
    texte:
      "Vos tarifs sont ajustés en continu selon la demande, la saison, les événements locaux et la concurrence. Nous équilibrons taux d’occupation et prix par nuit pour faire progresser vos revenus, avec un reversement mensuel et un récapitulatif détaillé.",
  },
  {
    titre: "Maintenance et imprévus",
    resume:
      "Petites réparations, artisans, incidents en cours de séjour : nous intervenons vite.",
    accroche: "Réactifs, parce que nous sommes à côté.",
    texte:
      "Petites réparations, coordination des artisans, incidents en cours de séjour : nous intervenons vite pour que votre bien reste impeccable et que les voyageurs ne manquent de rien. Les dégradations sont documentées et signalées aux plateformes.",
  },
  {
    titre: "Conformité réglementaire",
    resume:
      "Déclaration en mairie, numéro d’enregistrement, plafond de nuitées, taxe de séjour : nous suivons la réglementation pour vous.",
    accroche: "La réglementation, sans y penser.",
    texte:
      "Déclaration en mairie et numéro d’enregistrement, suivi du plafond de nuitées pour les résidences principales, taxe de séjour, accompagnement sur le changement d’usage : la réglementation évolue sans cesse, nous la suivons pour vous.",
  },
];

/* ------------------------------------------------------------------ */
/* Packs et tarifs                                                     */
/* ------------------------------------------------------------------ */
export type PackId = "confort" | "sweet-home" | "prestige";

export type Pack = {
  id: PackId;
  nom: string;
  badge: string;
  prefixe?: string; // ex. « dès »
  prix: string;
  prixLabel: string;
  taux: number; // commission utilisée par l'estimateur (0.15 = 15 %)
  intro: string;
  featuresTitle: string;
  features: string[];
  recommande: boolean;
};

export const packs: Pack[] = [
  {
    id: "confort",
    nom: "Confort",
    badge: "L’essentiel",
    prix: "15 %",
    prixLabel: "de commission sur les réservations",
    taux: 0.15,
    intro:
      "L’essentiel pour louer en courte durée l’esprit tranquille : réservations, ménage et accueil des voyageurs.",
    featuresTitle: "Inclus dans le pack",
    features: [
      "Gestion complète des réservations et des messages",
      "Ménage professionnel et linge",
      "Arrivées et départs des voyageurs",
      "Réassort des produits essentiels",
      "Visite mensuelle du logement",
      "Assistance voyageurs 24 h/24, 7 j/7",
    ],
    recommande: false,
  },
  {
    id: "sweet-home",
    nom: "Sweet Home",
    badge: "Recommandé",
    prix: "20 %",
    prixLabel: "de commission sur les réservations",
    taux: 0.2,
    intro:
      "Le pack Confort, plus l’optimisation complète de votre annonce pour gagner en réservations et en revenus.",
    featuresTitle: "Tout le pack Confort, plus",
    features: [
      "Boîte à clés installée et gérée",
      "Photos professionnelles",
      "Optimisation de l’annonce (titre, description, mots-clés)",
      "Expérience « Home Feeling » renforcée",
      "Gestion active des avis voyageurs",
      "Conseils en architecture d’intérieur",
    ],
    recommande: true,
  },
  {
    id: "prestige",
    nom: "Prestige",
    badge: "Sur mesure",
    prefixe: "dès",
    prix: "25 %",
    prixLabel: "commission variable selon les options",
    taux: 0.25,
    intro:
      "La délégation totale : intendance renforcée, gestion des imprévus et optimisation avancée des revenus.",
    featuresTitle: "Tout le pack Sweet Home, plus",
    features: [
      "Intendance renforcée (contrôles fréquents)",
      "Gestion des imprévus et des artisans",
      "Tarification dynamique avancée",
      "Rapport mensuel détaillé",
      "Accueil premium personnalisé (en option)",
    ],
    recommande: false,
  },
];

export const comparatif: { label: string; valeurs: (boolean | string)[] }[] = [
  { label: "Commission", valeurs: ["15 %", "20 %", "dès 25 %"] },
  { label: "Réservations et messages", valeurs: [true, true, true] },
  { label: "Ménage professionnel", valeurs: [true, true, true] },
  { label: "Arrivées et départs", valeurs: [true, true, true] },
  { label: "Assistance 24 h/24", valeurs: [true, true, true] },
  { label: "Boîte à clés", valeurs: [false, true, true] },
  { label: "Photos professionnelles", valeurs: [false, true, true] },
  { label: "Optimisation de l’annonce", valeurs: [false, true, true] },
  { label: "Imprévus et artisans", valeurs: [false, false, true] },
  { label: "Rapport mensuel détaillé", valeurs: [false, false, true] },
  { label: "Tarification dynamique avancée", valeurs: [false, false, true] },
];

/* ------------------------------------------------------------------ */
/* Questions fréquentes                                                */
/* ------------------------------------------------------------------ */
export type FaqItem = { question: string; reponse: string };

export const faq: FaqItem[] = [
  {
    question: "Comment fonctionne la commission ?",
    reponse:
      "La commission est prélevée uniquement sur les réservations confirmées. Sur 1 000 € de revenus bruts, le pack Confort (15 %) représente 150 € : vous recevez 850 €. Aucun frais fixe, aucun frais caché.",
  },
  {
    question: "Y a-t-il un engagement minimum de durée ?",
    reponse:
      "Non. Pas d’engagement de durée, pas de frais de résiliation. Un préavis de 30 jours suffit pour mettre fin au mandat, à tout moment.",
  },
  {
    question: "Quels sont les délais de paiement ?",
    reponse:
      "Les revenus de vos réservations vous sont reversés chaque mois, après déduction de notre commission, avec un récapitulatif détaillé de toutes les réservations du mois.",
  },
  {
    question: "Puis-je bloquer des dates pour mon usage personnel ?",
    reponse:
      "Bien sûr. Vous restez propriétaire et maître de votre calendrier. Il suffit de nous prévenir à l’avance : nous bloquons les dates souhaitées sur toutes les plateformes.",
  },
  {
    question: "Que comprend l’audit gratuit ?",
    reponse:
      "Une visite de votre bien, une analyse de son potentiel locatif à partir des données du marché local, une estimation de vos revenus nets mensuels et nos recommandations personnalisées pour améliorer votre rendement.",
  },
  {
    question: "Que se passe-t-il si un voyageur casse quelque chose ?",
    reponse:
      "Nous documentons l’état du logement avant et après chaque séjour (photos horodatées). En cas de dégradation, nous gérons le signalement auprès de la plateforme (Airbnb AirCover ou Booking) et vous accompagnons dans la procédure de remboursement.",
  },
  {
    question: "Comment gérez-vous les avis négatifs ?",
    reponse:
      "Nous répondons à chaque avis au nom du propriétaire, de façon professionnelle et constructive. En cas d’avis injustifié, nous accompagnons la contestation auprès de la plateforme. Notre objectif : maintenir une note moyenne supérieure à 4,8/5.",
  },
];

/* ------------------------------------------------------------------ */
/* Parcours : les six « arrêts » de la ligne                           */
/* ------------------------------------------------------------------ */
export const parcours = [
  {
    titre: "Premier contact",
    texte:
      "Formulaire, téléphone ou WhatsApp : nous échangeons sur votre bien, vos objectifs et vos attentes.",
  },
  {
    titre: "Audit gratuit",
    texte:
      "Visite de votre bien, analyse du marché local et estimation de vos revenus nets. Sans engagement.",
  },
  {
    titre: "Signature",
    texte:
      "Signature du mandat de gestion et mise en place des accès nécessaires à notre équipe.",
  },
  {
    titre: "Mise en ligne en 72 h",
    texte:
      "Photos professionnelles, annonce rédigée, tarifs calibrés : votre bien est prêt à recevoir ses premiers voyageurs.",
  },
  {
    titre: "Gestion au quotidien",
    texte:
      "Réservations, accueil, ménage, imprévus : nous gérons tout. Vous suivez vos revenus.",
  },
  {
    titre: "Premiers revenus",
    texte:
      "Vos revenus vous sont reversés chaque mois, avec un récapitulatif clair de chaque réservation.",
  },
];

/* ------------------------------------------------------------------ */
/* Périmètre de la gestion (page Services)                             */
/* ------------------------------------------------------------------ */
export const inclus = [
  "Gestion des réservations sur toutes les plateformes",
  "Échanges avec les voyageurs avant, pendant et après le séjour",
  "Ménage professionnel et linge",
  "Arrivées et départs des voyageurs",
  "Assistance 24 h/24, 7 j/7",
  "Réassort des produits essentiels",
  "Gestion des avis",
  "Récapitulatif mensuel transparent",
];

export const nonInclus = [
  "Grosses réparations et travaux",
  "Remplacement de mobilier ou d’électroménager",
  "Assurance propriétaire (à votre charge)",
  "Charges courantes (eau, électricité, internet)",
  "Décoration initiale du logement",
];

/* ------------------------------------------------------------------ */
/* Témoignages                                                         */
/* ------------------------------------------------------------------ */
export type Temoignage = {
  texte: string;
  /** Prénom et initiale, ex. « Claire M. » */
  auteur: string;
  /** Contexte, ex. « Propriétaire à Enghien-les-Bains » */
  contexte: string;
};

/**
 * Collez ici vos VRAIS avis Google (avec l'accord de leurs auteurs).
 * Tant que cette liste est vide, la section « Ils nous confient leur bien »
 * ne s'affiche pas sur le site. Exemple de format :
 *
 *   {
 *     texte: "Un suivi irréprochable, je recommande.",
 *     auteur: "Claire M.",
 *     contexte: "Propriétaire à Enghien-les-Bains",
 *   },
 */
export const temoignages: Temoignage[] = [];
