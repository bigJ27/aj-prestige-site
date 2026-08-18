import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, LineChart, Sparkles } from "lucide-react";
import CtaBand from "@/components/CtaBand";
import Reveal from "@/components/Reveal";
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

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ============ HERO — photo plein écran, slogan centré ============ */}
      <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden">
        <Image
          src="/images/hero-sunset.jpg"
          alt="Salon ouvert sur la mer au coucher du soleil — image d'ambiance"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {/* Voile pour la lisibilité du slogan */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-night/65 via-night/25 to-night/20"
          aria-hidden="true"
        />

        <div className="container relative z-10 animate-fade-up py-32 text-center">
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-white/85">
            Conciergerie Airbnb premium · Val-d&apos;Oise & Île-de-France
          </p>
          <h1 className="mx-auto mt-6 max-w-4xl text-6xl leading-[1.02] text-white [text-shadow:0_2px_24px_rgba(27,73,101,0.45)] sm:text-7xl md:text-8xl">
            Votre bien,
            <br />
            <em className="text-coral">notre prestige.</em>
          </h1>
          <a href="#offre" className="btn-primary mt-12 !px-10 !py-4 text-base">
            Découvrir
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        <p className="caption absolute bottom-4 right-5 z-10 hidden text-white/70 sm:block">
          Image d&apos;ambiance
        </p>
      </section>

      {/* ============ BANDEROLE — offre d'essai ============ */}
      <section id="offre" className="bg-terracotta">
        <div className="container flex flex-col items-center gap-2 py-8 text-center md:flex-row md:justify-center md:gap-6 md:py-6">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-white">
            Offre d&apos;essai : premier mois à commission réduite
          </p>
          <span
            className="hidden h-5 w-px bg-white/40 md:block"
            aria-hidden="true"
          />
          <p className="font-serif text-lg italic text-white/95">
            Tous les avantages d&apos;un logement, sans que vous le gériez.
          </p>
        </div>
      </section>

      {/* ============ PROMESSE — éditorial asymétrique ============ */}
      <section className="bg-white py-20 md:py-28">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-12">
            <Reveal className="lg:col-span-5">
              <p className="overline-label">La promesse AJ Prestige</p>
              <h2 className="mt-4 text-4xl leading-tight md:text-5xl">
                Une conciergerie locative
                <br />
                <em className="text-sunset">qui pense comme un hôtel.</em>
              </h2>
            </Reveal>
            <Reveal
              delay={120}
              className="lg:col-span-6 lg:col-start-7 lg:border-l lg:border-coral/30 lg:pl-10"
            >
              <p className="leading-relaxed">
                AJ Prestige est une conciergerie spécialisée dans la gestion
                locative courte durée sur Airbnb et Booking. Nous prenons en
                charge l&apos;intégralité de votre bien — annonce,
                réservations, ménages, voyageurs — avec des standards de
                qualité hôteliers et une transparence totale sur vos revenus.
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
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ BENTO SERVICES + CHIFFRES ============
          Grille asymétrique : une carte principale imagée, deux cartes
          services différenciées, chiffres en Cormorant grand format. */}
      <section className="py-20 md:py-28">
        <div className="container">
          <Reveal className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="overline-label">Nos services clés</p>
              <h2 className="mt-4 text-3xl md:text-4xl">
                Trois piliers, zéro charge mentale
              </h2>
            </div>
            <Link
              href="/services"
              className="inline-flex shrink-0 items-center gap-2 text-sm font-medium text-terracotta transition-colors hover:text-sunset"
            >
              Le détail de la gestion complète
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>

          <div className="mt-12 grid auto-rows-[minmax(230px,auto)] grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {/* Carte principale — service 1, image vive + panneau bleu nuit */}
            <Reveal className="md:col-span-2 lg:row-span-2">
              <Link
                href="/services"
                className="group flex h-full min-h-[460px] flex-col overflow-hidden rounded-2xl border border-coral/30 bg-night"
              >
                <div className="relative min-h-[200px] flex-1 overflow-hidden">
                  <Image
                    src="/images/ambiance-02.jpg"
                    alt="Lumière chaude de fin de journée — image d'ambiance"
                    fill
                    sizes="(max-width: 768px) 100vw, 66vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-8 md:p-10">
                  <p className="text-xs font-medium uppercase tracking-[0.24em] text-coral">
                    Le cœur du métier
                  </p>
                  <h3 className="mt-3 text-3xl text-white md:text-4xl">
                    Gestion des annonces & réservations
                  </h3>
                  <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/80">
                    Création ou reprise de votre annonce, photos
                    professionnelles, optimisation du référencement sur Airbnb
                    et Booking, gestion des réservations et des messages
                    voyageurs, 7j/7.
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-coral transition-transform duration-300 group-hover:translate-x-1">
                    En savoir plus
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            </Reveal>

            {/* Service 2 — carte blanche */}
            <Reveal delay={100}>
              <article className="flex h-full flex-col justify-between rounded-2xl border border-coral/25 bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:border-coral">
                <Sparkles className="h-8 w-8 text-sunset" aria-hidden="true" />
                <div>
                  <h3 className="text-2xl">Accueil, ménage & linge hôtelier</h3>
                  <p className="mt-3 text-sm leading-relaxed">
                    Check-in et check-out soignés, ménage professionnel entre
                    chaque séjour avec contrôle photo, linge de qualité
                    hôtelière et réassort des essentiels. Objectif : des avis
                    5 étoiles.
                  </p>
                </div>
              </article>
            </Reveal>

            {/* Service 3 — carte sable */}
            <Reveal delay={180}>
              <article className="flex h-full flex-col justify-between rounded-2xl bg-sand-deep p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-18px_rgba(224,122,95,0.3)]">
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-terracotta/40">
                  <LineChart className="h-5 w-5 text-terracotta" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-2xl">Tarification dynamique & revenus</h3>
                  <p className="mt-3 text-sm leading-relaxed">
                    Prix ajustés en continu selon la saison, les événements
                    locaux et la concurrence. Reversement mensuel de vos
                    revenus avec un récapitulatif clair, sans frais cachés.
                  </p>
                </div>
              </article>
            </Reveal>

            {/* Chiffre 1 — terracotta */}
            <Reveal delay={80}>
              <div className="flex h-full flex-col justify-end rounded-2xl bg-sunset p-8">
                <p className="font-serif text-6xl font-bold italic text-white md:text-7xl">
                  +35&thinsp;%
                </p>
                <p className="mt-2 text-xs font-medium uppercase tracking-[0.18em] text-white/75">
                  de revenus vs gestion en solo
                </p>
              </div>
            </Reveal>

            {/* Chiffre 2 — bleu nuit */}
            <Reveal delay={160}>
              <div className="flex h-full flex-col justify-end rounded-2xl bg-night p-8">
                <p className="font-serif text-6xl font-bold italic text-coral md:text-7xl">
                  4,9/5
                </p>
                <p className="mt-2 text-xs font-medium uppercase tracking-[0.18em] text-sand/60">
                  note moyenne des biens gérés
                </p>
              </div>
            </Reveal>

            {/* Chiffres 3 & 4 — empilés, filet sunset */}
            <Reveal delay={240}>
              <div className="flex h-full flex-col justify-center rounded-2xl border border-coral/25 bg-white p-8">
                <div>
                  <p className="font-serif text-4xl font-bold text-terracotta">
                    72&thinsp;h
                  </p>
                  <p className="mt-1 text-xs font-medium uppercase tracking-[0.18em] text-muted">
                    pour mettre votre bien en ligne
                  </p>
                </div>
                <div className="hairline-gradient my-5" aria-hidden="true" />
                <div>
                  <p className="font-serif text-4xl font-bold text-terracotta">
                    0&thinsp;€
                  </p>
                  <p className="mt-1 text-xs font-medium uppercase tracking-[0.18em] text-muted">
                    de frais cachés, jamais
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ PROCESS — vertical, numéros en filigrane ============ */}
      <section className="bg-sand-deep py-20 md:py-28">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-12">
            <Reveal className="lg:col-span-4">
              <p className="overline-label">Comment ça marche</p>
              <h2 className="mt-4 text-3xl leading-tight md:text-4xl">
                De l&apos;audit à vos premiers revenus
              </h2>
              <p className="mt-5 max-w-xs text-sm leading-relaxed text-ink">
                Trois étapes, un seul interlocuteur. Votre bien peut être en
                ligne 72 heures après l&apos;audit.
              </p>
            </Reveal>

            <ol className="relative lg:col-span-7 lg:col-start-6">
              {/* Rail vertical reliant les étapes */}
              <div
                className="absolute bottom-6 left-[7px] top-3 w-px bg-coral/40"
                aria-hidden="true"
              />
              {etapes.map((etape, index) => (
                <li key={etape.numero} className="relative pb-14 pl-14 last:pb-0">
                  <span
                    className="absolute left-0 top-2 h-[15px] w-[15px] rounded-full border-2 border-terracotta bg-sand-deep"
                    aria-hidden="true"
                  />
                  <Reveal delay={index * 120}>
                    <span
                      className="pointer-events-none absolute -top-9 left-6 font-serif text-[7rem] font-bold italic leading-none text-coral/20"
                      aria-hidden="true"
                    >
                      {etape.numero}
                    </span>
                    <h3 className="relative text-2xl md:text-3xl">
                      {etape.titre}
                    </h3>
                    <p className="relative mt-3 max-w-md text-sm leading-relaxed">
                      {etape.texte}
                    </p>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ============ ZONE D'INTERVENTION — index éditorial + image ============ */}
      <section className="bg-white py-20 md:py-28">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-12">
            {/* Le sticky vit hors du wrapper Reveal : un transform sur un
                ancêtre casserait position:sticky */}
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-28">
                <Reveal>
                  <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
                    <Image
                      src="/images/ambiance-01.jpg"
                      alt="Horizon marin au crépuscule — image d'ambiance"
                      fill
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      className="object-cover"
                    />
                  </div>
                  <p className="caption mt-3">
                    Fin de journée au bord de l&apos;eau — image d&apos;ambiance
                  </p>
                </Reveal>
              </div>
            </div>

            <div className="lg:col-span-7">
              <Reveal>
                <p className="overline-label">Zone d&apos;intervention</p>
                <h2 className="mt-4 text-3xl md:text-4xl">
                  Une conciergerie ancrée dans
                  <br />
                  la vallée de Montmorency
                </h2>
                <p className="mt-5 max-w-lg text-sm leading-relaxed text-ink">
                  Huit communes, une équipe locale capable d&apos;intervenir en
                  quelques minutes. Chaque ville a son marché, ses voyageurs et
                  sa page dédiée.
                </p>
              </Reveal>

              <ol className="mt-10">
                {villes.map((ville, index) => (
                  <li key={ville.slug}>
                    <Reveal delay={Math.min(index * 60, 240)}>
                      <Link
                        href={`/${ville.slug}`}
                        className="group flex items-baseline gap-5 border-b border-night/10 py-4 transition-colors hover:border-coral md:py-5"
                      >
                        <span className="w-8 shrink-0 font-serif text-sm italic text-coral">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="font-serif text-2xl font-semibold text-night transition-colors group-hover:text-terracotta md:text-3xl">
                          {ville.nom}
                        </span>
                        <ArrowRight
                          className="ml-auto h-5 w-5 shrink-0 self-center text-coral opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100"
                          aria-hidden="true"
                        />
                      </Link>
                    </Reveal>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      <CtaBand
        title="Prêt à déléguer en toute sérénité ?"
        subtitle="Demandez votre audit gratuit : visite du bien, estimation des revenus nets et recommandations personnalisées, sans engagement."
      />
    </>
  );
}
