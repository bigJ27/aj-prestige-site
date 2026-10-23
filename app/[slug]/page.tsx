import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ChevronRight, MapPin } from "lucide-react";
import CtaBand from "@/components/CtaBand";
import Reveal from "@/components/Reveal";
import ZoneMap from "@/components/ZoneMap";
import { getVille, villes } from "@/lib/villes";

export const dynamicParams = false;

export function generateStaticParams() {
  return villes.map((ville) => ({ slug: ville.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const ville = getVille(slug);
  if (!ville) return {};

  return {
    title: `Conciergerie Airbnb à ${ville.nom}`,
    description: ville.metaDescription,
    alternates: { canonical: `/${ville.slug}` },
    openGraph: {
      url: `/${ville.slug}`,
      title: `Conciergerie Airbnb à ${ville.nom} | AJ Prestige`,
      description: ville.metaDescription,
    },
  };
}

export default async function VillePage({ params }: Props) {
  const { slug } = await params;
  const ville = getVille(slug);
  if (!ville) notFound();

  const voisins = ville.voisins
    .map((slugVoisin) => getVille(slugVoisin))
    .filter((voisin) => voisin !== undefined);

  return (
    <>
      <section className="page-hero">
        <div className="aurora" aria-hidden="true" />
        <Reveal className="shell-narrow">
          <span className="eyebrow inline-flex items-center gap-1.5">
            <MapPin className="h-4 w-4" aria-hidden="true" />
            Val-d’Oise · Vallée de Montmorency
          </span>
          <h1 className="display-xl mt-4">
            Conciergerie Airbnb à{" "}
            <span className="text-gradient">{ville.nom}</span>
          </h1>
          <p className="lead mx-auto mt-6 max-w-2xl">{ville.accroche}</p>
          <div className="hero-actions">
            <Link href="/contact" className="btn btn-primary btn-lg">
              Audit gratuit de mon bien
              <ArrowRight className="arrow h-4 w-4" aria-hidden="true" />
            </Link>
            <Link href="/tarifs" className="btn btn-secondary btn-lg">
              Voir les tarifs
            </Link>
          </div>
        </Reveal>
      </section>

      <section className="section">
        <div className="shell grid gap-12 lg:grid-cols-[1.6fr_1fr] lg:gap-16">
          <Reveal className="prose-site">
            {ville.paragraphes.map((paragraphe, index) => (
              <p key={index}>{paragraphe}</p>
            ))}
          </Reveal>

          <div>
            <div className="grid gap-4 lg:sticky lg:top-28">
              <div className="aside-card">
                <h2 className="title">
                  Pourquoi louer en courte durée à {ville.nom} ?
                </h2>
                <ul className="mt-5 grid gap-5">
                  {ville.atouts.map((atout) => (
                    <li key={atout.titre}>
                      <p className="font-semibold">{atout.titre}</p>
                      <p className="body-2 mt-1">{atout.texte}</p>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="aside-card !bg-white !shadow-[inset_0_0_0_1px_var(--hairline)]">
                <h2 className="title">Notre gestion complète</h2>
                <p className="body-2 mt-2">
                  Annonce & photos pro, voyageurs 24/7, ménage & linge hôtelier,
                  tarification dynamique, maintenance et conformité.
                </p>
                <div className="mt-4 grid gap-2">
                  <Link href="/services" className="link-more">
                    Découvrir nos services
                    <ChevronRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                  <Link href="/tarifs" className="link-more">
                    Voir nos tarifs (15–25 %)
                    <ChevronRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-sand-soft">
        <div className="shell">
          <Reveal className="section-head">
            <span className="eyebrow">Notre zone</span>
            <h2 className="display mt-3">
              Nous intervenons aussi autour de {ville.nom}.
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <ZoneMap current={ville.slug} showList={false} />
          </Reveal>
          {voisins.length > 0 ? (
            <Reveal className="mt-8">
              <ul className="city-list">
                {voisins.map((voisin) => (
                  <li key={voisin.slug}>
                    <Link href={`/${voisin.slug}`} className="city-link">
                      Conciergerie Airbnb {voisin.nom}
                      <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            </Reveal>
          ) : null}
        </div>
      </section>

      <div className="bg-sand-soft">
        <CtaBand
          title={`Un bien à ${ville.nom} ? Faisons le point.`}
          subtitle="Visite du logement, estimation des revenus nets et recommandations personnalisées : l’audit est gratuit et sans engagement."
        />
      </div>
    </>
  );
}
