import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BedDouble,
  Camera,
  Check,
  ChevronRight,
  FileCheck,
  LineChart,
  MessagesSquare,
  Minus,
  Wrench,
} from "lucide-react";
import CtaBand from "@/components/CtaBand";
import Reveal from "@/components/Reveal";
import { inclus, nonInclus, photos } from "@/lib/content";

export const metadata: Metadata = {
  title: "Nos services de gestion Airbnb complète",
  description:
    "Gestion complète de votre location courte durée : annonces et photos pro, accueil voyageurs 24/7, ménage et linge hôtelier, tarification dynamique, maintenance et conformité réglementaire. Val-d'Oise & Île-de-France.",
  alternates: { canonical: "/services" },
  openGraph: {
    url: "/services",
    title: "Nos services | AJ Prestige",
    description:
      "Annonces, voyageurs, ménage, tarification dynamique, maintenance : la gestion Airbnb complète, de A à Z.",
  },
};

const services = [
  {
    icon: Camera,
    titre: "Annonces & photos professionnelles",
    accroche: "La première source de réservations.",
    texte:
      "Création ou reprise complète de votre annonce sur Airbnb et Booking : photos professionnelles, titre et description optimisés, tags travaillés pour le référencement. Une annonce percutante est la première source de réservations — la mise en place est offerte.",
  },
  {
    icon: MessagesSquare,
    titre: "Gestion des voyageurs 24/7",
    accroche: "Rassurer, guider, fidéliser.",
    texte:
      "Réponses rapides aux demandes, sélection des voyageurs, check-in et check-out soignés, assistance pendant tout le séjour et gestion des avis après le départ. Nous rassurons, guidons et fidélisons chaque voyageur, à toute heure.",
  },
  {
    icon: BedDouble,
    titre: "Ménage professionnel & linge hôtelier",
    accroche: "Ce qui fait les avis 5 étoiles.",
    texte:
      "Ménage complet entre chaque séjour avec checklists détaillées et contrôle photo, linge de qualité hôtelière lavé et repassé, réassort des produits essentiels. L’hygiène est notre priorité absolue : c’est elle qui fait les avis 5 étoiles.",
  },
  {
    icon: LineChart,
    titre: "Tarification dynamique",
    accroche: "Le bon prix, chaque nuit.",
    texte:
      "Vos tarifs sont ajustés en continu selon la demande, la saison, les événements locaux et la concurrence. Nous équilibrons taux d’occupation et prix par nuit pour maximiser vos revenus, avec un reversement mensuel et un récapitulatif détaillé.",
  },
  {
    icon: Wrench,
    titre: "Maintenance & imprévus",
    accroche: "Réactifs, vraiment.",
    texte:
      "Petites réparations, coordination des artisans, gestion des incidents en cours de séjour : nous intervenons vite pour que votre bien reste impeccable et que les voyageurs ne manquent de rien. Les dégradations sont documentées et signalées aux plateformes.",
  },
  {
    icon: FileCheck,
    titre: "Conformité réglementaire",
    accroche: "La réglementation, sans y penser.",
    texte:
      "Déclaration en mairie et numéro d’enregistrement, suivi de la limite des nuitées pour les résidences principales, taxe de séjour, accompagnement sur le changement d’usage : la réglementation évolue en permanence, nous la gérons pour vous.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <section className="page-hero">
        <div className="aurora" aria-hidden="true" />
        <Reveal className="shell-narrow">
          <span className="eyebrow">Nos services</span>
          <h1 className="display-xl mt-4">
            La gestion Airbnb complète.
            <br />
            <span className="text-gradient">De A à Z.</span>
          </h1>
          <p className="lead mx-auto mt-6 max-w-2xl">
            Annonce, voyageurs, ménage, linge, tarification, maintenance : nous
            prenons tout en charge avec des standards hôteliers, pour que votre
            bien travaille pour vous — jamais l’inverse.
          </p>
          <div className="hero-actions">
            <Link href="/contact" className="btn btn-primary btn-lg">
              Demander un audit gratuit
              <ArrowRight className="arrow h-4 w-4" aria-hidden="true" />
            </Link>
            <Link href="/tarifs" className="btn btn-secondary btn-lg">
              Voir les tarifs
            </Link>
          </div>
        </Reveal>
        <Reveal className="shell hero-media-wrap" delay={150}>
          <div className="hero-media">
            <Image
              src={photos.balcony.src}
              alt={photos.balcony.alt}
              fill
              priority
              sizes="(max-width: 1180px) 100vw, 1180px"
              className="object-cover"
            />
          </div>
        </Reveal>
      </section>

      <section className="section">
        <div className="shell">
          <Reveal className="section-head">
            <span className="eyebrow">Six métiers, un interlocuteur</span>
            <h2 className="display mt-3">Ce que nous faisons pour vous.</h2>
          </Reveal>
          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {services.map((service, i) => (
              <Reveal key={service.titre} delay={(i % 2) * 90}>
                <article className="tile h-full !bg-[var(--sand)]">
                  <span className="tile-icon">
                    <service.icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <p className="mt-5 text-[15px] font-semibold text-terracotta">
                    {service.accroche}
                  </p>
                  <h3 className="headline !mt-1">{service.titre}</h3>
                  <p className="!text-[17px]">{service.texte}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-sand-soft">
        <div className="shell">
          <Reveal className="section-head">
            <span className="eyebrow">Transparence totale</span>
            <h2 className="display mt-3">
              Ce qui est inclus. Ce qui ne l’est pas.
            </h2>
            <p className="lead mt-6">
              Aucune mauvaise surprise : voici précisément le périmètre de notre
              gestion.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-4 lg:grid-cols-2">
            <Reveal>
              <div className="tile h-full">
                <h3 className="title">Inclus dans nos services</h3>
                <ul className="mt-4 grid gap-3">
                  {inclus.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-[16px] text-label"
                    >
                      <Check
                        className="mt-0.5 h-5 w-5 shrink-0 text-sunset"
                        aria-hidden="true"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={90}>
              <div className="tile h-full">
                <h3 className="title">Non inclus (selon pack)</h3>
                <ul className="mt-4 grid gap-3">
                  {nonInclus.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-[16px] text-label"
                    >
                      <Minus
                        className="mt-0.5 h-5 w-5 shrink-0 text-[color:var(--label-3)]"
                        aria-hidden="true"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="caption mt-auto pt-6">
                  En pack Prestige, nous coordonnons les artisans pour les
                  petits imprévus ; les coûts restent à votre charge.
                </p>
              </div>
            </Reveal>
          </div>
          <Reveal className="mt-10 text-center">
            <Link href="/tarifs" className="link-more">
              Comparer nos trois packs et leurs tarifs
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </section>

      <div className="bg-sand-soft">
        <CtaBand
          title="Un doute sur ce dont votre bien a besoin ?"
          subtitle="L’audit gratuit inclut une visite, une analyse du marché local et nos recommandations personnalisées."
        />
      </div>
    </>
  );
}
