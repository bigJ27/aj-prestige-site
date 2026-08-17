import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  CalendarCheck,
  KeyRound,
  LineChart,
  Sparkles,
} from "lucide-react";
import CtaBand from "@/components/CtaBand";
import { villes } from "@/lib/villes";
import {
  EMAIL,
  GOOGLE_BUSINESS_URL,
  INSTAGRAM_URL,
  PHONE_TEL,
  SITE_URL,
} from "@/lib/site";

export const metadata: Metadata = {
  title: {
    absolute:
      "AJ Prestige | Conciergerie Airbnb premium en Val-d'Oise & Île-de-France",
  },
  description:
    "Conciergerie Airbnb premium basée à Soisy-sous-Montmorency : gestion complète de votre location courte durée (annonces, voyageurs, ménage, tarification) en Val-d'Oise et Île-de-France. Commission transparente 15–25 %, audit gratuit.",
  alternates: { canonical: "/" },
  openGraph: {
    url: "/",
    title: "AJ Prestige | Conciergerie Airbnb premium en Val-d'Oise",
    description:
      "Déléguez la gestion complète de votre location courte durée. Commission transparente 15–25 %, audit gratuit.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${SITE_URL}/#localbusiness`,
  name: "AJ Prestige",
  description:
    "Conciergerie Airbnb premium : gestion complète de locations courte durée en Val-d'Oise et Île-de-France (annonces, voyageurs, ménage, linge, tarification dynamique).",
  url: SITE_URL,
  telephone: PHONE_TEL,
  email: EMAIL,
  image: `${SITE_URL}/logo512.png`,
  priceRange: "Commission 15–25 %",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Soisy-sous-Montmorency",
    addressRegion: "Île-de-France",
    addressCountry: "FR",
  },
  areaServed: [
    { "@type": "AdministrativeArea", name: "Val-d'Oise" },
    { "@type": "AdministrativeArea", name: "Île-de-France" },
    ...villes.map((v) => ({ "@type": "City", name: v.nom })),
  ],
  sameAs: [INSTAGRAM_URL, GOOGLE_BUSINESS_URL],
};

const services = [
  {
    icon: KeyRound,
    title: "Gestion des annonces & réservations",
    text: "Création ou reprise de votre annonce, photos professionnelles, optimisation du référencement sur Airbnb et Booking, gestion des réservations et des messages voyageurs, 7j/7.",
  },
  {
    icon: Sparkles,
    title: "Accueil, ménage & linge hôtelier",
    text: "Check-in et check-out soignés, ménage professionnel entre chaque séjour avec contrôle photo, linge de qualité hôtelière et réassort des essentiels. Objectif : des avis 5 étoiles.",
  },
  {
    icon: LineChart,
    title: "Tarification dynamique & revenus",
    text: "Prix ajustés en continu selon la saison, les événements locaux et la concurrence. Reversement mensuel de vos revenus avec un récapitulatif clair, sans frais cachés.",
  },
];

const etapes = [
  {
    numero: "01",
    titre: "Audit gratuit",
    texte:
      "Visite de votre bien, analyse du potentiel locatif sur le marché local et estimation de vos revenus nets. Sans engagement.",
  },
  {
    numero: "02",
    titre: "Mise en ligne optimisée",
    texte:
      "Photos professionnelles, annonce percutante, tarification calibrée : votre bien est prêt à recevoir ses premiers voyageurs en 72 h.",
  },
  {
    numero: "03",
    titre: "Vous encaissez, on gère",
    texte:
      "Réservations, accueil, ménage, imprévus : nous gérons tout au quotidien. Vous suivez vos revenus, nous nous occupons du reste.",
  },
];

const chiffres = [
  { valeur: "+35 %", label: "de revenus vs gestion en solo" },
  { valeur: "4,9/5", label: "note moyenne des biens gérés" },
  { valeur: "72 h", label: "pour mettre votre bien en ligne" },
  { valeur: "0 €", label: "de frais cachés, jamais" },
];

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero — seul endroit (avec le footer) où le dégradé sunset est autorisé */}
      <section className="relative flex min-h-[92svh] items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-gradient-to-b from-coral/35 via-sunset/15 to-sand"
          aria-hidden="true"
        />
        <div
          className="absolute left-1/2 top-[-18rem] h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(232,115,74,0.28)_0%,rgba(242,166,90,0.12)_55%,transparent_72%)]"
          aria-hidden="true"
        />
        <div className="container relative py-24">
          <div className="max-w-3xl animate-fade-up">
            <p className="overline-label">
              Conciergerie Airbnb premium · Val-d&apos;Oise &
              Île-de-France
            </p>
            <h1 className="mt-5 text-5xl leading-[1.05] sm:text-6xl md:text-7xl">
              Votre bien,
              <br />
              <em className="text-terracotta">notre prestige.</em>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink">
              Déléguez l&apos;intégralité de votre location courte durée —
              annonce, voyageurs, ménage, linge, tarification — pendant que
              vous encaissez. Gestion complète de A à Z, depuis
              Soisy-sous-Montmorency.
            </p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <Link href="/contact" className="btn-primary">
                Demander un audit gratuit
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/services" className="btn-outline">
                Découvrir nos services
              </Link>
            </div>
            <ul className="mt-12 flex flex-wrap gap-x-8 gap-y-3 text-sm font-medium text-night/80">
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-sunset" aria-hidden="true" />
                Commission transparente 15–25 %
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-sunset" aria-hidden="true" />
                Sans engagement de durée
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-sunset" aria-hidden="true" />
                Avis voyageurs 5 étoiles
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Promesse */}
      <section className="bg-white py-20 md:py-28">
        <div className="container grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="overline-label">La promesse AJ Prestige</p>
            <h2 className="mt-4 text-3xl md:text-4xl">
              Une conciergerie locative
              <br />
              <em className="text-sunset">qui pense comme un hôtel.</em>
            </h2>
            <p className="mt-6 leading-relaxed">
              AJ Prestige est une conciergerie spécialisée dans la gestion
              locative courte durée sur Airbnb et Booking. Nous prenons en
              charge l&apos;intégralité de votre bien — annonce, réservations,
              ménages, voyageurs — avec des standards de qualité hôteliers et
              une transparence totale sur vos revenus.
            </p>
            <p className="mt-4 leading-relaxed">
              Mise en place offerte : photos professionnelles, création et
              optimisation de l&apos;annonce incluses. Vous restez maître de
              votre calendrier et pouvez bloquer des dates pour votre usage
              personnel à tout moment.
            </p>
            <Link
              href="/services"
              className="mt-7 inline-flex items-center gap-2 font-medium text-terracotta transition-colors hover:text-sunset"
            >
              Tout ce que nous gérons pour vous
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
            <Image
              src="https://images.unsplash.com/photo-1649180447214-8deda9813f7f?crop=entropy&cs=srgb&fm=jpg&q=80&w=1200"
              alt="Vue sur la ville au coucher de soleil depuis un appartement géré par AJ Prestige"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* 3 services clés */}
      <section className="py-20 md:py-28">
        <div className="container">
          <div className="max-w-2xl">
            <p className="overline-label">Nos services clés</p>
            <h2 className="mt-4 text-3xl md:text-4xl">
              Trois piliers, zéro charge mentale
            </h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {services.map((service) => (
              <article key={service.title} className="card-sand">
                <service.icon className="h-8 w-8 text-sunset" aria-hidden="true" />
                <h3 className="mt-5 text-2xl">{service.title}</h3>
                <p className="mt-3 text-sm leading-relaxed">{service.text}</p>
              </article>
            ))}
          </div>
          <div className="mt-10">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 font-medium text-terracotta transition-colors hover:text-sunset"
            >
              Voir le détail de la gestion complète
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Process 3 étapes */}
      <section className="bg-sand-deep py-20 md:py-28">
        <div className="container">
          <div className="max-w-2xl">
            <p className="overline-label">Comment ça marche</p>
            <h2 className="mt-4 text-3xl md:text-4xl">
              De l&apos;audit à vos premiers revenus,
              <br />
              en trois étapes
            </h2>
          </div>
          <ol className="mt-14 grid gap-10 md:grid-cols-3">
            {etapes.map((etape) => (
              <li key={etape.numero} className="relative">
                <span
                  className="font-serif text-6xl font-bold text-coral/70"
                  aria-hidden="true"
                >
                  {etape.numero}
                </span>
                <h3 className="mt-3 text-2xl">{etape.titre}</h3>
                <p className="mt-3 text-sm leading-relaxed">{etape.texte}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Chiffres */}
      <section className="border-y border-coral/20 bg-white">
        <div className="container grid grid-cols-2 gap-y-10 py-14 md:grid-cols-4">
          {chiffres.map((chiffre) => (
            <div key={chiffre.label} className="text-center">
              <p className="font-serif text-4xl font-bold text-terracotta">
                {chiffre.valeur}
              </p>
              <p className="mt-1 text-sm text-muted">{chiffre.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Zone d'intervention */}
      <section className="py-20 md:py-28">
        <div className="container">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="overline-label">Zone d&apos;intervention</p>
              <h2 className="mt-4 text-3xl md:text-4xl">
                Une conciergerie ancrée dans la vallée de Montmorency
              </h2>
            </div>
            <p className="flex items-center gap-2 text-sm text-muted">
              <CalendarCheck className="h-4 w-4 text-sunset" aria-hidden="true" />
              Intervention rapide, équipe locale
            </p>
          </div>
          <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {villes.map((ville) => (
              <li key={ville.slug}>
                <Link
                  href={`/${ville.slug}`}
                  className="group flex items-center justify-between rounded-lg border border-coral/25 bg-sand-deep px-5 py-4 transition-colors hover:border-coral"
                >
                  <span className="font-medium text-night">{ville.nom}</span>
                  <ArrowRight
                    className="h-4 w-4 text-coral transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand
        title="Prêt à déléguer en toute sérénité ?"
        subtitle="Demandez votre audit gratuit : visite du bien, estimation des revenus nets et recommandations personnalisées, sans engagement."
      />
    </>
  );
}
