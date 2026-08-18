import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BedDouble,
  Check,
  FileCheck,
  LineChart,
  MessagesSquare,
  Camera,
  Wrench,
} from "lucide-react";
import CtaBand from "@/components/CtaBand";

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
    texte:
      "Création ou reprise complète de votre annonce sur Airbnb et Booking : photos professionnelles, titre et description optimisés, tags travaillés pour le référencement. Une annonce percutante est la première source de réservations — la mise en place est offerte.",
  },
  {
    icon: MessagesSquare,
    titre: "Gestion des voyageurs 24/7",
    texte:
      "Réponses rapides aux demandes, sélection des voyageurs, check-in et check-out soignés, assistance pendant tout le séjour et gestion des avis après le départ. Nous rassurons, guidons et fidélisons chaque voyageur, à toute heure.",
  },
  {
    icon: BedDouble,
    titre: "Ménage professionnel & linge hôtelier",
    texte:
      "Ménage complet entre chaque séjour avec checklists détaillées et contrôle photo, linge de qualité hôtelière lavé et repassé, réassort des produits essentiels. L'hygiène est notre priorité absolue : c'est elle qui fait les avis 5 étoiles.",
  },
  {
    icon: LineChart,
    titre: "Tarification dynamique",
    texte:
      "Vos tarifs sont ajustés en continu selon la demande, la saison, les événements locaux et la concurrence. Nous équilibrons taux d'occupation et prix par nuit pour maximiser vos revenus, avec un reversement mensuel et un récapitulatif détaillé.",
  },
  {
    icon: Wrench,
    titre: "Maintenance & imprévus",
    texte:
      "Petites réparations, coordination des artisans, gestion des incidents en cours de séjour : nous intervenons vite pour que votre bien reste impeccable et que les voyageurs ne manquent de rien. Les dégradations sont documentées et signalées aux plateformes.",
  },
  {
    icon: FileCheck,
    titre: "Conformité réglementaire",
    texte:
      "Déclaration en mairie et numéro d'enregistrement, suivi de la limite des nuitées pour les résidences principales, taxe de séjour, accompagnement sur le changement d'usage : la réglementation évolue en permanence, nous la gérons pour vous.",
  },
];

const inclus = [
  "Gestion des réservations multi-plateformes",
  "Communication voyageurs avant, pendant et après le séjour",
  "Ménage professionnel & linge",
  "Check-in / check-out",
  "Assistance 24/7",
  "Réassort des produits essentiels",
  "Gestion des avis",
  "Reporting transparent",
];

const nonInclus = [
  "Grosses réparations & travaux",
  "Remplacement de mobilier ou d'électroménager",
  "Assurance propriétaire (à votre charge)",
  "Charges courantes (eau, électricité, internet)",
  "Décoration initiale du logement",
];

export default function ServicesPage() {
  return (
    <>
      <section className="border-b border-coral/20 bg-sand-deep">
        <div className="container grid items-center gap-10 py-16 md:py-24 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <p className="overline-label">Nos services</p>
            <h1 className="mt-4 text-4xl md:text-5xl">
              La gestion Airbnb complète,
              <br />
              <em className="text-terracotta">de A à Z.</em>
            </h1>
            <p className="mt-6 max-w-xl leading-relaxed">
              Annonce, voyageurs, ménage, linge, tarification, maintenance :
              nous prenons tout en charge avec des standards hôteliers, pour
              que votre bien travaille pour vous — jamais l&apos;inverse.
            </p>
            <Link href="/contact" className="btn-primary mt-8">
              Demander un audit gratuit
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="hidden lg:block">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
              <Image
                src="/images/ambiance-03.jpg"
                alt="Ciel du soir entre bleu nuit et corail — image d'ambiance"
                fill
                sizes="(max-width: 1024px) 0px, 40vw"
                className="object-cover"
              />
            </div>
            <p className="caption mt-3">
              Tombée du jour — image d&apos;ambiance
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <article key={service.titre} className="card-sand">
              <service.icon className="h-8 w-8 text-sunset" aria-hidden="true" />
              <h2 className="mt-5 text-2xl">{service.titre}</h2>
              <p className="mt-3 text-sm leading-relaxed">{service.texte}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-white py-20 md:py-28">
        <div className="container">
          <div className="max-w-2xl">
            <p className="overline-label">Transparence totale</p>
            <h2 className="mt-4 text-3xl md:text-4xl">
              Ce qui est inclus, ce qui ne l&apos;est pas
            </h2>
            <p className="mt-4 leading-relaxed">
              Aucune mauvaise surprise : voici précisément le périmètre de
              notre gestion.
            </p>
          </div>
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <div className="rounded-xl border border-coral/30 bg-sand p-8">
              <h3 className="text-2xl text-terracotta">Inclus dans nos services</h3>
              <ul className="mt-5 space-y-3">
                {inclus.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-sunset" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-night/15 bg-sand p-8">
              <h3 className="text-2xl">Non inclus (selon pack)</h3>
              <ul className="mt-5 space-y-3">
                {nonInclus.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm">
                    <span
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-muted"
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-sm italic text-muted">
                En pack Prestige, nous coordonnons les artisans pour les petits
                imprévus ; les coûts restent à votre charge.
              </p>
            </div>
          </div>
          <div className="mt-10">
            <Link
              href="/tarifs"
              className="inline-flex items-center gap-2 font-medium text-terracotta transition-colors hover:text-sunset"
            >
              Comparer nos trois packs et leurs tarifs
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <CtaBand
        title="Un doute sur ce dont votre bien a besoin ?"
        subtitle="L'audit gratuit inclut une visite, une analyse du marché local et nos recommandations personnalisées."
      />
    </>
  );
}
