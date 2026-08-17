import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, Minus } from "lucide-react";
import CtaBand from "@/components/CtaBand";

export const metadata: Metadata = {
  title: "Tarifs — commission transparente de 15 à 25 %",
  description:
    "Trois packs de conciergerie Airbnb à commission transparente : Confort 15 %, Sweet Home 20 %, Prestige dès 25 %. Sans frais cachés, sans engagement de durée. Audit gratuit de votre bien.",
  alternates: { canonical: "/tarifs" },
  openGraph: {
    url: "/tarifs",
    title: "Tarifs | AJ Prestige",
    description:
      "Packs Confort 15 %, Sweet Home 20 %, Prestige dès 25 %. Commission transparente, sans engagement.",
  },
};

const packs = [
  {
    nom: "Confort",
    badge: "Essentiel",
    prix: "15 %",
    prixLabel: "de commission",
    intro:
      "L'essentiel pour démarrer votre location courte durée en toute sérénité : réservations, ménage et accueil voyageurs.",
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
    nom: "Sweet Home",
    badge: "Recommandé",
    prix: "20 %",
    prixLabel: "de commission",
    intro:
      "Le pack Confort + l'optimisation complète de votre annonce pour maximiser réservations et revenus.",
    featuresTitle: "Tout Confort, plus",
    features: [
      "Boîte à clés installée & gérée",
      "Photos professionnelles",
      "Optimisation annonce (titre, description, tags)",
      "Expérience « Home Feeling » renforcée",
      "Gestion active des avis voyageurs",
      "Conseils en architecture d'intérieur",
    ],
    recommande: true,
  },
  {
    nom: "Prestige",
    badge: "Premium",
    prix: "dès 25 %",
    prixLabel: "commission variable selon options",
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

const comparatif: { label: string; valeurs: (boolean | string)[] }[] = [
  { label: "Commission", valeurs: ["15 %", "20 %", "dès 25 %"] },
  { label: "Gestion réservations & messages", valeurs: [true, true, true] },
  { label: "Ménage professionnel", valeurs: [true, true, true] },
  { label: "Check-in / check-out", valeurs: [true, true, true] },
  { label: "Assistance 24/7", valeurs: [true, true, true] },
  { label: "Boîte à clés", valeurs: [false, true, true] },
  { label: "Photos professionnelles", valeurs: [false, true, true] },
  { label: "Optimisation annonce", valeurs: [false, true, true] },
  { label: "Gestion imprévus & artisans", valeurs: [false, false, true] },
  { label: "Reporting mensuel", valeurs: [false, false, true] },
  { label: "Pricing dynamique avancé", valeurs: [false, false, true] },
];

const faq = [
  {
    question: "Comment fonctionne la commission ?",
    reponse:
      "La commission est prélevée uniquement sur les réservations confirmées. Sur 1 000 € de revenus bruts, le pack Confort (15 %) représente 150 € — vous recevez 850 €. Aucun frais fixe, aucun frais caché.",
  },
  {
    question: "Y a-t-il un engagement minimum de durée ?",
    reponse:
      "Non. Pas d'engagement de durée, pas de frais de résiliation. Un préavis de 30 jours suffit pour mettre fin au mandat, à tout moment.",
  },
  {
    question: "Quels sont les délais de paiement ?",
    reponse:
      "Les revenus de vos réservations vous sont reversés chaque mois, après déduction de notre commission, avec un récapitulatif détaillé de toutes les réservations du mois.",
  },
  {
    question: "Que se passe-t-il si un voyageur casse quelque chose ?",
    reponse:
      "Nous documentons l'état du logement avant et après chaque séjour (photos horodatées). En cas de dégradation, nous gérons le signalement auprès de la plateforme (Airbnb AirCover ou Booking) et vous accompagnons dans la procédure de remboursement.",
  },
  {
    question: "Comment gérez-vous les avis négatifs ?",
    reponse:
      "Nous répondons à chaque avis au nom du propriétaire, de façon professionnelle et constructive. En cas d'avis injustifié, nous accompagnons la contestation auprès de la plateforme. Notre objectif : maintenir une note moyenne supérieure à 4,8/5.",
  },
  {
    question: "Puis-je bloquer des dates pour mon usage personnel ?",
    reponse:
      "Absolument. Vous restez propriétaire et maître de votre calendrier. Il vous suffit de nous prévenir à l'avance et nous bloquons les dates souhaitées sur toutes les plateformes.",
  },
  {
    question: "Que comprend l'audit gratuit ?",
    reponse:
      "L'audit inclut une visite de votre bien, une analyse du potentiel locatif basée sur les données du marché local, une estimation des revenus nets mensuels et nos recommandations personnalisées pour maximiser votre rendement.",
  },
];

export default function TarifsPage() {
  return (
    <>
      <section className="border-b border-coral/20 bg-sand-deep py-16 md:py-24">
        <div className="container max-w-3xl text-center">
          <p className="overline-label">Tarifs</p>
          <h1 className="mt-4 text-4xl md:text-5xl">
            Une commission transparente,
            <br />
            <em className="text-terracotta">rien d&apos;autre.</em>
          </h1>
          <p className="mx-auto mt-6 max-w-xl leading-relaxed">
            Trois niveaux de délégation, de 15 à 25 % de commission sur les
            réservations confirmées. Sans frais fixes, sans frais cachés, sans
            engagement de durée — et l&apos;audit initial est toujours gratuit.
          </p>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container grid gap-6 lg:grid-cols-3">
          {packs.map((pack) => (
            <article
              key={pack.nom}
              className={`flex flex-col rounded-xl border bg-white p-8 ${
                pack.recommande
                  ? "border-terracotta shadow-[0_24px_50px_-24px_rgba(184,74,43,0.35)]"
                  : "border-coral/25"
              }`}
            >
              <p
                className={`self-start rounded-full px-3 py-1 text-xs font-medium uppercase tracking-widest ${
                  pack.recommande
                    ? "bg-terracotta text-white"
                    : "bg-sand-deep text-terracotta"
                }`}
              >
                {pack.badge}
              </p>
              <h2 className="mt-5 text-3xl">Pack {pack.nom}</h2>
              <p className="mt-3 font-serif text-5xl font-bold text-terracotta">
                {pack.prix}
              </p>
              <p className="mt-1 text-sm text-muted">{pack.prixLabel}</p>
              <p className="mt-5 text-sm leading-relaxed">{pack.intro}</p>
              <p className="mt-6 text-xs font-medium uppercase tracking-widest text-muted">
                {pack.featuresTitle}
              </p>
              <ul className="mt-3 flex-1 space-y-2.5">
                {pack.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm">
                    <Check
                      className="mt-0.5 h-4 w-4 shrink-0 text-sunset"
                      aria-hidden="true"
                    />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                href="/contact"
                className={`${pack.recommande ? "btn-primary" : "btn-outline"} mt-8 w-full`}
              >
                Choisir {pack.nom}
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-white py-20 md:py-28">
        <div className="container">
          <div className="max-w-2xl">
            <p className="overline-label">Comparatif</p>
            <h2 className="mt-4 text-3xl md:text-4xl">
              Les trois packs en un coup d&apos;œil
            </h2>
          </div>
          <div className="mt-10 overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-sm">
              <thead>
                <tr className="border-b-2 border-night/15 text-left">
                  <th className="py-4 pr-4 font-medium text-muted">
                    Fonctionnalité
                  </th>
                  <th className="px-4 py-4 text-center font-serif text-lg text-night">
                    Confort
                  </th>
                  <th className="bg-sand-deep px-4 py-4 text-center font-serif text-lg text-terracotta">
                    Sweet Home
                  </th>
                  <th className="px-4 py-4 text-center font-serif text-lg text-night">
                    Prestige
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparatif.map((ligne) => (
                  <tr key={ligne.label} className="border-b border-night/10">
                    <td className="py-3.5 pr-4 text-ink">{ligne.label}</td>
                    {ligne.valeurs.map((valeur, index) => (
                      <td
                        key={index}
                        className={`px-4 py-3.5 text-center ${
                          index === 1 ? "bg-sand-deep" : ""
                        }`}
                      >
                        {typeof valeur === "string" ? (
                          <span className="font-medium text-night">{valeur}</span>
                        ) : valeur ? (
                          <Check
                            className="mx-auto h-4 w-4 text-sunset"
                            aria-label="Inclus"
                          />
                        ) : (
                          <Minus
                            className="mx-auto h-4 w-4 text-muted/50"
                            aria-label="Non inclus"
                          />
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container max-w-3xl">
          <div className="text-center">
            <p className="overline-label">Questions fréquentes</p>
            <h2 className="mt-4 text-3xl md:text-4xl">
              Tout ce que les propriétaires nous demandent
            </h2>
          </div>
          <div className="mt-12 space-y-3">
            {faq.map((item) => (
              <details
                key={item.question}
                className="group rounded-xl border border-coral/25 bg-white px-6 py-1 open:border-coral"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 font-medium text-night [&::-webkit-details-marker]:hidden">
                  {item.question}
                  <ArrowRight
                    className="h-4 w-4 shrink-0 text-coral transition-transform group-open:rotate-90"
                    aria-hidden="true"
                  />
                </summary>
                <p className="pb-5 text-sm leading-relaxed text-ink">
                  {item.reponse}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Besoin d'un conseil pour choisir ?"
        subtitle="Demandez votre audit gratuit : nous chiffrons le potentiel de votre bien et vous recommandons le pack idéal."
      />
    </>
  );
}
