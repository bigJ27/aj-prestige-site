import type { Metadata } from "next";
import Link from "next/link";
import CtaBand from "@/components/CtaBand";
import Photo from "@/components/Photo";
import { IconArrow, IconCheck, IconMinus } from "@/components/icons";
import { inclus, nonInclus, services } from "@/lib/content";
import { photos } from "@/lib/photos";
import { typo } from "@/lib/typo";

export const metadata: Metadata = {
  title: "Nos services de gestion Airbnb complète",
  description:
    "Gestion complète de votre location courte durée : annonce et photos pro, accueil des voyageurs 7 j/7, ménage et linge hôtelier, tarification dynamique, maintenance et conformité réglementaire. Val-d'Oise et Île-de-France.",
  alternates: { canonical: "/services" },
  openGraph: {
    url: "/services",
    title: "Nos services | AJ Prestige",
    description:
      "Annonce, voyageurs, ménage, tarification dynamique, maintenance : la gestion Airbnb complète, poste par poste.",
  },
};

export default function ServicesPage() {
  return (
    <>
      <section className="page-hero">
        <div className="wrap page-hero-grid">
          <div>
            <p className="label">Nos services</p>
            <h1 className="h-page">
              La gestion complète de votre location,{" "}
              <em>poste par poste.</em>
            </h1>
            <p className="lead">
              Annonce, voyageurs, ménage, linge, tarifs, maintenance&nbsp;:
              nous prenons tout en charge avec des standards hôteliers, pour
              que votre bien travaille pour vous — jamais l’inverse.
            </p>
            <div className="hero-actions">
              <Link href="/contact" className="btn btn-primary">
                Demander un audit gratuit
                <IconArrow size={18} />
              </Link>
              <Link href="/tarifs" className="link-arrow">
                Voir les tarifs
                <IconArrow size={18} />
              </Link>
            </div>
          </div>
          <div className="hero-figure">
            <div className="arch">
              <Photo
                src={photos.salonVert.src}
                alt={photos.salonVert.alt}
                priority
                sizes="(max-width: 959px) min(100vw - 40px, 440px), 470px"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="metiers-titre">
        <div className="wrap split">
          <div className="split-aside">
            <p className="label">Six métiers, un interlocuteur</p>
            <h2 id="metiers-titre" className="h-section">
              Ce que nous faisons <em>pour vous.</em>
            </h2>
            <figure className="mt-10 hidden lg:block">
              <div className="photo aspect-[6/5]">
                <Photo
                  src={photos.serviettes.src}
                  alt={photos.serviettes.alt}
                  sizes="(max-width: 1023px) 0px, 470px"
                />
              </div>
              <figcaption className="photo-caption">
                Linge lavé, repassé et renouvelé entre chaque séjour.
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
                <p className="service-accroche">{typo(service.accroche)}</p>
                <p className="service-text">{typo(service.texte)}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section bg-linen" aria-labelledby="perimetre-titre">
        <div className="wrap">
          <div className="section-head">
            <p className="label">En toute transparence</p>
            <h2 id="perimetre-titre" className="h-section">
              Ce qui est inclus, <em>ce qui ne l’est pas.</em>
            </h2>
            <p className="lead">
              Pas de mauvaise surprise&nbsp;: voici précisément le périmètre
              de notre gestion.
            </p>
          </div>

          <div className="mt-12 grid gap-x-16 gap-y-12 lg:grid-cols-2">
            <div>
              <h3 className="h-card">Inclus dans nos services</h3>
              <ul className="atouts mt-5">
                {inclus.map((item) => (
                  <li key={item} className="flex items-start gap-3 !py-3.5">
                    <IconCheck size={20} className="mt-0.5 shrink-0 text-terra" />
                    {typo(item)}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="h-card">Non inclus (selon le pack)</h3>
              <ul className="atouts mt-5">
                {nonInclus.map((item) => (
                  <li key={item} className="flex items-start gap-3 !py-3.5">
                    <IconMinus size={20} className="mt-0.5 shrink-0 text-ink-3" />
                    {typo(item)}
                  </li>
                ))}
              </ul>
              <p className="small mt-5">
                Avec le pack Prestige, nous coordonnons les artisans pour les
                petits imprévus&nbsp;; les coûts restent à votre charge.
              </p>
            </div>
          </div>

          <p className="mt-10">
            <Link href="/tarifs" className="link-arrow">
              Comparer nos trois packs et leurs tarifs
              <IconArrow size={18} />
            </Link>
          </p>
        </div>
      </section>

      <CtaBand
        title={
          <>
            Un doute sur ce dont votre bien <em>a besoin&nbsp;?</em>
          </>
        }
        subtitle="L’audit gratuit comprend une visite, une analyse du marché local et nos recommandations personnalisées."
      />
    </>
  );
}
