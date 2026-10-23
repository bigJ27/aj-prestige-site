import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BedDouble,
  CalendarCheck,
  Check,
  ChevronRight,
  FileCheck,
  LineChart,
  MessagesSquare,
  Sparkles,
  Wrench,
} from "lucide-react";
import CtaBand from "@/components/CtaBand";
import Estimator from "@/components/Estimator";
import Faq from "@/components/Faq";
import MetroJourney from "@/components/MetroJourney";
import PricingCards from "@/components/PricingCards";
import Reveal from "@/components/Reveal";
import ZoneMap from "@/components/ZoneMap";
import { GoogleStars } from "@/components/icons";
import { faq, photos } from "@/lib/content";
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

const stats = [
  { value: "15–25 %", label: "de commission, rien d’autre" },
  { value: "0 €", label: "de frais de mise en place" },
  { value: "7j/7", label: "gestion des voyageurs" },
];

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ================= HÉROS ================= */}
      <section className="hero">
        <div className="aurora" aria-hidden="true" />
        <div className="shell hero-inner">
          <Reveal>
            <a
              href={GOOGLE_BUSINESS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="chip glass"
            >
              <GoogleStars />
              <span>
                <strong className="font-semibold">5/5</strong> sur Google
              </span>
              <ChevronRight
                className="h-4 w-4 text-[color:var(--label-3)]"
                aria-hidden="true"
              />
            </a>
            <h1 className="display-xl mt-7">
              Votre bien.
              <br />
              <span className="text-gradient">Notre prestige.</span>
            </h1>
            <p className="lead">
              La conciergerie Airbnb qui gère votre location courte durée de A à
              Z, en Val-d’Oise et en Île-de-France. Vous percevez les revenus,
              nous nous occupons du reste.
            </p>
            <div className="hero-actions">
              <Link href="/contact" className="btn btn-primary btn-lg">
                Demander un audit gratuit
                <ArrowRight className="arrow h-4 w-4" aria-hidden="true" />
              </Link>
              <a href="#estimation" className="btn btn-secondary btn-lg">
                Estimer mes revenus
              </a>
            </div>
            <ul className="hero-proof">
              <li>
                <Check className="h-4 w-4" aria-hidden="true" />
                Sans engagement de durée
              </li>
              <li>
                <Check className="h-4 w-4" aria-hidden="true" />
                Mise en place offerte
              </li>
              <li>
                <Check className="h-4 w-4" aria-hidden="true" />
                Équipe basée à Soisy
              </li>
            </ul>
          </Reveal>
        </div>

        <div className="shell hero-media-wrap">
          <Reveal delay={150}>
            <div className="hero-media">
              <Image
                src={photos.dusk.src}
                alt={photos.dusk.alt}
                fill
                priority
                sizes="(max-width: 1180px) 100vw, 1180px"
                className="object-cover"
              />
              <div className="toast toast-1 glass">
                <span className="toast-icon">
                  <CalendarCheck className="h-5 w-5" aria-hidden="true" />
                </span>
                <span>
                  <span className="toast-title block">
                    Réservation confirmée
                  </span>
                  <span className="toast-text block">
                    3 nuits · voyageurs vérifiés
                  </span>
                </span>
                <span className="toast-time">maintenant</span>
              </div>
              <div className="toast toast-2 glass">
                <span className="toast-icon">
                  <Sparkles className="h-5 w-5" aria-hidden="true" />
                </span>
                <span>
                  <span className="toast-title block">Ménage terminé</span>
                  <span className="toast-text block">
                    Contrôle photo validé · linge hôtelier
                  </span>
                </span>
                <span className="toast-time">14:32</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================= PROMESSE + CHIFFRES ================= */}
      <section className="section">
        <div className="shell">
          <Reveal className="section-head">
            <span className="eyebrow">La promesse AJ Prestige</span>
            <h2 className="display mt-3">
              Une conciergerie qui pense{" "}
              <span className="text-gradient">comme un hôtel.</span>
            </h2>
            <p className="lead mt-6">
              Annonce, réservations, ménages, voyageurs : nous prenons en charge
              l’intégralité de votre bien avec des standards hôteliers et une
              transparence totale sur vos revenus. Vous restez maître de votre
              calendrier.
            </p>
          </Reveal>

          <div className="stats">
            {stats.map((stat, i) => (
              <Reveal key={stat.label} delay={i * 90} className="stat">
                <span className="stat-value text-gradient">{stat.value}</span>
                <span className="stat-label">{stat.label}</span>
              </Reveal>
            ))}
            <Reveal delay={270}>
              <a
                href={GOOGLE_BUSINESS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="stat block"
              >
                <span className="stat-value text-gradient">5/5</span>
                <span className="stat-label">
                  note de nos propriétaires sur Google ›
                </span>
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ================= SERVICES (BENTO) ================= */}
      <section className="section bg-sand-soft">
        <div className="shell">
          <Reveal className="section-head">
            <span className="eyebrow">Gestion complète</span>
            <h2 className="display mt-3">
              Tout est pris en charge. Vraiment tout.
            </h2>
            <p className="lead mt-6">
              Six métiers, un seul interlocuteur. Vous déléguez, nous
              orchestrons.
            </p>
          </Reveal>

          <div className="bento">
            <Reveal className="area-photo">
              <div className="tile tile-photo h-full">
                <Image
                  src={photos.sunsetWindow.src}
                  alt={photos.sunsetWindow.alt}
                  fill
                  sizes="(max-width: 720px) 100vw, (max-width: 1080px) 100vw, 33vw"
                />
                <div className="tile-photo-body">
                  <span className="tag tag-glass">Mise en place offerte</span>
                  <h3 className="title mt-4">
                    Annonces & photos professionnelles
                  </h3>
                  <p className="mt-2">
                    Création ou reprise de votre annonce, photos pro, titre et
                    description optimisés pour Airbnb et Booking.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal className="area-a" delay={80}>
              <div className="tile h-full">
                <span className="tile-icon">
                  <MessagesSquare className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="title">Voyageurs 7j/7</h3>
                <p>
                  Réponses rapides, check-in et check-out soignés, assistance
                  pendant tout le séjour.
                </p>
              </div>
            </Reveal>

            <Reveal className="area-b" delay={160}>
              <div className="tile h-full">
                <span className="tile-icon">
                  <BedDouble className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="title">Ménage & linge hôtelier</h3>
                <p>
                  Ménage entre chaque séjour avec contrôle photo, linge de
                  qualité hôtelière.
                </p>
              </div>
            </Reveal>

            <Reveal className="area-c" delay={80}>
              <div className="tile h-full">
                <div className="grid h-full items-end gap-6 md:grid-cols-[1fr_1.1fr]">
                  <div>
                    <span className="tile-icon">
                      <LineChart className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <h3 className="title mt-[18px]">Tarification dynamique</h3>
                    <p className="mt-3">
                      Vos prix s’ajustent à la saison, aux événements locaux et
                      à la concurrence. Reversement mensuel, récapitulatif
                      clair.
                    </p>
                  </div>
                  <svg
                    className="spark"
                    viewBox="0 0 320 140"
                    aria-hidden="true"
                  >
                    <defs>
                      <linearGradient
                        id="spark-line"
                        x1="0"
                        x2="1"
                        y1="0"
                        y2="0"
                      >
                        <stop offset="0%" stopColor="#F2A65A" />
                        <stop offset="55%" stopColor="#E8734A" />
                        <stop offset="100%" stopColor="#D45463" />
                      </linearGradient>
                      <linearGradient
                        id="spark-fill"
                        x1="0"
                        x2="0"
                        y1="0"
                        y2="1"
                      >
                        <stop
                          offset="0%"
                          stopColor="#E8734A"
                          stopOpacity="0.22"
                        />
                        <stop
                          offset="100%"
                          stopColor="#E8734A"
                          stopOpacity="0"
                        />
                      </linearGradient>
                    </defs>
                    <path
                      d="M0 112 C 30 108, 44 92, 70 96 S 112 70, 140 76 S 182 44, 210 52 S 262 18, 320 22 L 320 140 L 0 140 Z"
                      fill="url(#spark-fill)"
                    />
                    <path
                      d="M0 112 C 30 108, 44 92, 70 96 S 112 70, 140 76 S 182 44, 210 52 S 262 18, 320 22"
                      fill="none"
                      stroke="url(#spark-line)"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                    <circle
                      cx="320"
                      cy="22"
                      r="7"
                      fill="#fff"
                      stroke="#D45463"
                      strokeWidth="4"
                    />
                  </svg>
                </div>
              </div>
            </Reveal>

            <Reveal className="area-d" delay={80}>
              <div className="tile h-full">
                <span className="tile-icon">
                  <Wrench className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="title">Maintenance & imprévus</h3>
                <p>
                  Petites réparations, artisans, incidents en cours de séjour :
                  nous intervenons vite.
                </p>
              </div>
            </Reveal>

            <Reveal className="area-e" delay={160}>
              <div className="tile tile-warm h-full">
                <span className="tile-icon">
                  <FileCheck className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="title">Conformité réglementaire</h3>
                <p>
                  Déclaration en mairie, numéro d’enregistrement, limite des
                  nuitées, taxe de séjour : la réglementation évolue, nous la
                  gérons pour vous.
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal className="mt-10 text-center">
            <Link href="/services" className="link-more">
              Voir le détail de nos services
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ================= PARCOURS (LIGNE DE MÉTRO) ================= */}
      <MetroJourney />

      {/* ================= TARIFS ================= */}
      <section className="section" id="tarifs">
        <div className="shell">
          <Reveal className="section-head">
            <span className="eyebrow">Tarifs</span>
            <h2 className="display mt-3">
              Une commission transparente.{" "}
              <span className="text-gradient">Rien d’autre.</span>
            </h2>
            <p className="lead mt-6">
              Uniquement sur les réservations confirmées. Sans frais fixes, sans
              frais cachés, sans engagement de durée.
            </p>
          </Reveal>
          <PricingCards />
          <Reveal className="mt-10 text-center">
            <Link href="/tarifs" className="link-more">
              Comparer les packs en détail
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ================= ESTIMATEUR ================= */}
      <section className="section bg-sand-soft" id="estimation">
        <div className="shell">
          <Reveal className="section-head">
            <span className="eyebrow">Estimation</span>
            <h2 className="display mt-3">
              Combien pourrait vous rapporter votre bien ?
            </h2>
            <p className="lead mt-6">
              Deux curseurs, un pack : voyez tout de suite ce qui vous revient.
            </p>
          </Reveal>
          <Reveal delay={100}>
            <Estimator />
          </Reveal>
        </div>
      </section>

      {/* ================= ZONE D'INTERVENTION ================= */}
      <section className="section" id="zone">
        <div className="shell">
          <Reveal className="section-head">
            <span className="eyebrow">Zone d’intervention</span>
            <h2 className="display mt-3">
              Ancrés dans la vallée de Montmorency.
            </h2>
            <p className="lead mt-6">
              Notre équipe est basée à Soisy-sous-Montmorency : nous intervenons
              en quelques minutes dans toute la vallée, et en Île-de-France sur
              demande.
            </p>
          </Reveal>
          <Reveal delay={100}>
            <ZoneMap />
          </Reveal>
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <section className="section bg-sand-soft">
        <div className="shell-narrow">
          <Reveal className="section-head">
            <span className="eyebrow">Questions fréquentes</span>
            <h2 className="display mt-3">Vos questions, nos réponses.</h2>
          </Reveal>
          <Reveal delay={80}>
            <Faq items={faq.slice(0, 5)} />
          </Reveal>
          <Reveal className="mt-10 text-center">
            <Link href="/tarifs#faq" className="link-more">
              Toutes les questions
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </section>

      <div className="h-3 bg-sand-soft md:h-5" aria-hidden="true" />
      <div className="bg-sand-soft">
        <CtaBand
          title="Prêt à déléguer en toute sérénité ?"
          subtitle="Visite du bien, estimation de vos revenus nets et recommandations personnalisées : l’audit est gratuit et sans engagement."
        />
      </div>
    </>
  );
}
