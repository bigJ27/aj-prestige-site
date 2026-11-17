import type { Metadata } from "next";
import Link from "next/link";
import CtaBand from "@/components/CtaBand";
import Estimator from "@/components/Estimator";
import Faq from "@/components/Faq";
import Journey from "@/components/Journey";
import Packs from "@/components/Packs";
import Testimonials from "@/components/Testimonials";
import ZoneMap, { CityList } from "@/components/ZoneMap";
import Photo from "@/components/Photo";
import { IconArrow, IconCheck, Stars } from "@/components/icons";
import { faq, reperes, services } from "@/lib/content";
import { photos } from "@/lib/photos";
import { villes } from "@/lib/villes";
import {
  EMAIL,
  GOOGLE_BUSINESS_URL,
  INSTAGRAM_URL,
  PHONE_TEL,
  SITE_URL,
} from "@/lib/site";
import { typo } from "@/lib/typo";

export const metadata: Metadata = {
  title: {
    absolute: "AJ Prestige | Conciergerie Airbnb en Val-d'Oise (Enghien, Soisy)",
  },
  description:
    "Conciergerie Airbnb installée à Soisy-sous-Montmorency : annonce, voyageurs, ménage, linge et tarifs gérés de bout en bout en Val-d'Oise. Commission de 15 à 25 %, sans frais fixes. Audit gratuit.",
  alternates: { canonical: "/" },
  openGraph: {
    url: "/",
    title: "AJ Prestige | Conciergerie Airbnb en Val-d'Oise",
    description:
      "Votre location courte durée gérée de bout en bout par une équipe installée à Soisy-sous-Montmorency. Commission de 15 à 25 %, audit gratuit.",
  },
};

// Données structurées : aident Google à comprendre qui vous êtes et où vous intervenez
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${SITE_URL}/#localbusiness`,
  name: "AJ Prestige",
  description:
    "Conciergerie Airbnb : gestion complète de locations courte durée en Val-d'Oise et Île-de-France (annonces, voyageurs, ménage, linge, tarification dynamique).",
  url: SITE_URL,
  telephone: PHONE_TEL,
  email: EMAIL,
  image: `${SITE_URL}/opengraph-image.jpg`,
  logo: `${SITE_URL}/logo512.png`,
  priceRange: "Commission 15–25 %",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Soisy-sous-Montmorency",
    postalCode: "95230",
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

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ================= HAUT DE PAGE ================= */}
      <section className="hero">
        <div className="wrap hero-grid">
          <div>
            <h1 className="h-display">
              <span className="label hero-kicker">
                Conciergerie Airbnb · Val-d’Oise
              </span>
              Votre location courte durée, gérée <em>en voisins.</em>
            </h1>
            <p className="lead">
              Annonce, voyageurs, ménage, linge, tarifs&nbsp;: nous nous
              occupons de tout, avec le soin d’un hôtel et la réactivité d’une
              équipe installée à Soisy-sous-Montmorency. Vous gardez la main
              sur votre calendrier et recevez vos revenus chaque mois.
            </p>
            <div className="hero-actions">
              <Link href="/contact" className="btn btn-primary">
                Demander un audit gratuit
                <IconArrow size={18} />
              </Link>
              <a href="#estimation" className="link-arrow">
                Estimer mes revenus
                <IconArrow size={18} />
              </a>
            </div>
            <ul className="hero-proof">
              <li>
                <a
                  href={GOOGLE_BUSINESS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Stars />
                  5/5 sur Google
                </a>
              </li>
              <li>
                <IconCheck size={16} className="text-terra" />
                Sans engagement de durée
              </li>
              <li>
                <IconCheck size={16} className="text-terra" />
                Mise en place offerte
              </li>
            </ul>
          </div>

          <div className="hero-figure">
            <div className="hero-sun" aria-hidden="true" />
            <div className="arch">
              <Photo
                src={photos.fenetreFleurs.src}
                alt={photos.fenetreFleurs.alt}
                priority
                sizes="(max-width: 959px) min(100vw - 40px, 440px), 470px"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ================= REPÈRES ================= */}
      <section aria-label="L’essentiel en quatre chiffres" className="pb-4">
        <div className="wrap">
          <dl className="facts">
            {reperes.map((repere) => (
              <div key={repere.valeur} className="fact">
                <dt className="fact-value">{typo(repere.valeur)}</dt>
                <dd className="fact-text">{typo(repere.texte)}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ================= SERVICES ================= */}
      <section className="section" aria-labelledby="services-titre">
        <div className="wrap split">
          <div className="split-aside">
            <p className="label">Ce que nous faisons</p>
            <h2 id="services-titre" className="h-section">
              Six métiers, <em>un seul interlocuteur.</em>
            </h2>
            <p className="lead mt-5">
              Louer en courte durée, c’est faire tourner un petit hôtel. Nous
              en assurons chaque poste, pour que votre bien reste impeccable
              et votre agenda libre.
            </p>
            <Link href="/services" className="link-arrow mt-5">
              Le détail de nos services
              <IconArrow size={18} />
            </Link>
            <figure className="mt-10 hidden lg:block">
              <div className="photo aspect-[3/2]">
                <Photo
                  src={photos.oreillerLin.src}
                  alt={photos.oreillerLin.alt}
                  sizes="(max-width: 1023px) 0px, 470px"
                />
              </div>
              <figcaption className="photo-caption">
                Entre deux séjours, chaque lit est refait avec du linge de
                qualité hôtelière.
              </figcaption>
            </figure>
          </div>

          <ol className="service-list">
            {services.map((service, i) => (
              <li key={service.titre} className="service-row">
                <span className="service-num" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="h-card">{typo(service.titre)}</h3>
                <p className="service-text">{typo(service.resume)}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ================= PARCOURS ================= */}
      <Journey />

      {/* ================= TARIFS ================= */}
      <section className="section" id="tarifs" aria-labelledby="tarifs-titre">
        <div className="wrap">
          <div className="section-head">
            <p className="label">Tarifs</p>
            <h2 id="tarifs-titre" className="h-section">
              Une commission, <em>et rien d’autre.</em>
            </h2>
            <p className="lead">
              Elle ne s’applique qu’aux réservations confirmées. Pas de frais
              fixes, pas de frais cachés, pas d’engagement de durée.
            </p>
          </div>
          <Packs />
          <p className="mt-8">
            <Link href="/tarifs#comparatif" className="link-arrow">
              Comparer les packs en détail
              <IconArrow size={18} />
            </Link>
          </p>
        </div>
      </section>

      {/* ================= ESTIMATEUR ================= */}
      <section
        className="section bg-linen"
        id="estimation"
        aria-labelledby="estimation-titre"
      >
        <div className="wrap">
          <div className="section-head">
            <p className="label">Estimation</p>
            <h2 id="estimation-titre" className="h-section">
              Combien votre bien peut-il <em>vous rapporter&nbsp;?</em>
            </h2>
            <p className="lead">
              Indiquez un prix par nuit et un taux d’occupation&nbsp;: le
              calcul s’affiche ligne à ligne, sans rien cacher.
            </p>
          </div>
          <Estimator />
        </div>
      </section>

      {/* ================= ZONE D'INTERVENTION ================= */}
      <section className="section" id="zone" aria-labelledby="zone-titre">
        <div className="wrap zone-grid">
          <div className="zone-titre">
            <p className="label">Zone d’intervention</p>
            <h2 id="zone-titre" className="h-section">
              Huit communes, <em>une équipe sur place.</em>
            </h2>
            <p className="lead mt-5">
              Nous sommes installés à Soisy-sous-Montmorency. Enghien-les-Bains,
              Montmorency, Eaubonne et les communes voisines sont à quelques
              minutes&nbsp;: c’est ce qui nous permet d’intervenir vite.
            </p>
          </div>
          <div className="zone-carte">
            <ZoneMap />
          </div>
          <div className="zone-liste">
            <CityList />
            <p className="small mt-5">
              Votre bien est ailleurs en Île-de-France&nbsp;?{" "}
              <Link
                href="/contact"
                className="font-semibold text-ink underline underline-offset-4"
              >
                Parlons-en
              </Link>
              , nous étudions chaque demande.
            </p>
          </div>
        </div>
      </section>

      {/* ================= AVIS (si renseignés) ================= */}
      <Testimonials />

      {/* ================= FAQ ================= */}
      <section className="section bg-linen" aria-labelledby="faq-titre">
        <div className="wrap split">
          <div className="split-aside">
            <p className="label">Questions fréquentes</p>
            <h2 id="faq-titre" className="h-section">
              Ce que les propriétaires <em>nous demandent.</em>
            </h2>
            <Link href="/tarifs#faq" className="link-arrow mt-5">
              Toutes les questions
              <IconArrow size={18} />
            </Link>
          </div>
          <Faq items={faq.slice(0, 5)} />
        </div>
      </section>

      <CtaBand
        title={
          <>
            Parlons de <em>votre bien.</em>
          </>
        }
        subtitle="Visite du logement, estimation de vos revenus nets, recommandations personnalisées : l’audit est gratuit et sans engagement."
      />
    </>
  );
}
