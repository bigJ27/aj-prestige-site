/**
 * Contenus partagés du site (packs, comparatif, FAQ, parcours…).
 * Modifiez les textes ici : ils se mettent à jour sur toutes les pages.
 */

export type PackId = "confort" | "sweet-home" | "prestige";

export type Pack = {
  id: PackId;
  nom: string;
  badge: string;
  prefixe?: string; // ex. « dès »
  prix: string;
  prixLabel: string;
  taux: number; // commission utilisée par l'estimateur
  intro: string;
  featuresTitle: string;
  features: string[];
  recommande: boolean;
};

export const packs: Pack[] = [
  {
    id: "confort",
    nom: "Confort",
    badge: "Essentiel",
    prix: "15 %",
    prixLabel: "de commission sur les réservations",
    taux: 0.15,
    intro:
      "L’essentiel pour démarrer votre location courte durée en toute sérénité : réservations, ménage et accueil voyageurs.",
    featuresTitle: "Inclus dans le pack",
    features: [
      "Gestion complète réservations & messages",
      "Ménage professionnel + linge",
      "Check-in & check-out",
      "Réassort des produits essentiels",
      "Visite mensuelle du logement",
      "Assistance voyageurs 24/7",
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
      "Le pack Confort, plus l’optimisation complète de votre annonce pour maximiser réservations et revenus.",
    featuresTitle: "Tout Confort, plus",
    features: [
      "Boîte à clés installée & gérée",
      "Photos professionnelles",
      "Optimisation annonce (titre, description, tags)",
      "Expérience « Home Feeling » renforcée",
      "Gestion active des avis voyageurs",
      "Conseils en architecture d’intérieur",
    ],
    recommande: true,
  },
  {
    id: "prestige",
    nom: "Prestige",
    badge: "Premium",
    prefixe: "dès",
    prix: "25 %",
    prixLabel: "commission variable selon options",
    taux: 0.25,
    intro:
      "La délégation totale : intendance renforcée, gestion des imprévus et optimisation avancée des revenus.",
    featuresTitle: "Tout Sweet Home, plus",
    features: [
      "Intendance renforcée (contrôles fréquents)",
      "Gestion imprévus & artisans",
      "Pricing dynamique avancé",
      "Reporting mensuel détaillé",
      "Accueil premium personnalisé (option)",
    ],
    recommande: false,
  },
];

export const comparatif: { label: string; valeurs: (boolean | string)[] }[] = [
  { label: "Commission", valeurs: ["15 %", "20 %", "dès 25 %"] },
  { label: "Réservations & messages", valeurs: [true, true, true] },
  { label: "Ménage professionnel", valeurs: [true, true, true] },
  { label: "Check-in / check-out", valeurs: [true, true, true] },
  { label: "Assistance 24/7", valeurs: [true, true, true] },
  { label: "Boîte à clés", valeurs: [false, true, true] },
  { label: "Photos professionnelles", valeurs: [false, true, true] },
  { label: "Optimisation annonce", valeurs: [false, true, true] },
  { label: "Imprévus & artisans", valeurs: [false, false, true] },
  { label: "Reporting mensuel", valeurs: [false, false, true] },
  { label: "Pricing dynamique avancé", valeurs: [false, false, true] },
];

export type FaqItem = { question: string; reponse: string };

export const faq: FaqItem[] = [
  {
    question: "Comment fonctionne la commission ?",
    reponse:
      "La commission est prélevée uniquement sur les réservations confirmées. Sur 1 000 € de revenus bruts, le pack Confort (15 %) représente 150 € — vous recevez 850 €. Aucun frais fixe, aucun frais caché.",
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
      "Absolument. Vous restez propriétaire et maître de votre calendrier. Il vous suffit de nous prévenir à l’avance et nous bloquons les dates souhaitées sur toutes les plateformes.",
  },
  {
    question: "Que comprend l’audit gratuit ?",
    reponse:
      "L’audit inclut une visite de votre bien, une analyse du potentiel locatif basée sur les données du marché local, une estimation des revenus nets mensuels et nos recommandations personnalisées pour maximiser votre rendement.",
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

/** Les 6 stations de la ligne « Votre parcours » */
export const parcours = [
  {
    titre: "Premier contact",
    texte:
      "Formulaire, téléphone ou WhatsApp : nous échangeons sur votre bien, vos objectifs et vos attentes.",
  },
  {
    titre: "Audit gratuit",
    texte:
      "Visite de votre bien, analyse du potentiel locatif sur le marché local et estimation de vos revenus nets. Sans engagement.",
  },
  {
    titre: "Signature & onboarding",
    texte:
      "Signature du mandat de gestion et mise en place de tous les accès nécessaires à notre équipe.",
  },
  {
    titre: "Mise en ligne en 72 h",
    texte:
      "Photos professionnelles, annonce percutante, tarification calibrée : votre bien est prêt à recevoir ses premiers voyageurs.",
  },
  {
    titre: "Gestion au quotidien",
    texte:
      "Réservations, accueil, ménage, imprévus : nous gérons tout. Vous suivez vos revenus, nous nous occupons du reste.",
  },
  {
    titre: "Premiers revenus 🎉",
    texte:
      "Vos revenus vous sont reversés chaque mois, avec un récapitulatif clair. Vous profitez, on s’occupe du reste.",
  },
];

export const inclus = [
  "Gestion des réservations multi-plateformes",
  "Communication voyageurs avant, pendant et après le séjour",
  "Ménage professionnel & linge",
  "Check-in / check-out",
  "Assistance 24/7",
  "Réassort des produits essentiels",
  "Gestion des avis",
  "Reporting transparent",
];

export const nonInclus = [
  "Grosses réparations & travaux",
  "Remplacement de mobilier ou d’électroménager",
  "Assurance propriétaire (à votre charge)",
  "Charges courantes (eau, électricité, internet)",
  "Décoration initiale du logement",
];

/** Photos d’ambiance (Unsplash, autorisé dans next.config.ts) */
export const photos = {
  dusk: {
    src: "https://images.unsplash.com/photo-1712111891126-8496eb91f0a0?crop=entropy&cs=srgb&fm=jpg&q=80&w=2000",
    alt: "Salon baigné de la lumière du soir, vue sur la ville — image d’ambiance",
  },
  sunsetWindow: {
    src: "https://images.unsplash.com/photo-1649180447214-8deda9813f7f?crop=entropy&cs=srgb&fm=jpg&q=80&w=1200",
    alt: "Coucher de soleil vu depuis la fenêtre d’un appartement — image d’ambiance",
  },
  balcony: {
    src: "https://images.unsplash.com/photo-1689849714441-6372a33af0d4?crop=entropy&cs=srgb&fm=jpg&q=80&w=1200",
    alt: "Chambre ouverte sur un balcon au coucher du soleil — image d’ambiance",
  },
};
