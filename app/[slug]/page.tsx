import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, MapPin } from "lucide-react";
import CtaBand from "@/components/CtaBand";
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
      <section className="border-b border-coral/20 bg-sand-deep py-16 md:py-24">
        <div className="container max-w-3xl">
          <p className="overline-label">
            <MapPin className="mr-1 inline h-3.5 w-3.5" aria-hidden="true" />
            Val-d&apos;Oise · Vallée de Montmorency
          </p>
          <h1 className="mt-4 text-4xl md:text-5xl">
            Conciergerie Airbnb à{" "}
            <em className="text-terracotta">{ville.nom}</em>
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-ink">
            {ville.accroche}
          </p>
          <Link href="/contact" className="btn-primary mt-8">
            Audit gratuit de mon bien à {ville.nom}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container grid gap-12 lg:grid-cols-[1.5fr_1fr]">
          <div className="max-w-2xl space-y-6">
            {ville.paragraphes.map((paragraphe, index) => (
              <p key={index} className="leading-relaxed">
                {paragraphe}
              </p>
            ))}
          </div>

          <aside className="space-y-6 lg:pt-2">
            <div className="rounded-xl border border-coral/25 bg-sand-deep p-8">
              <h2 className="text-2xl">
                Pourquoi louer en courte durée à {ville.nom} ?
              </h2>
              <ul className="mt-6 space-y-5">
                {ville.atouts.map((atout) => (
                  <li key={atout.titre}>
                    <p className="font-medium text-night">{atout.titre}</p>
                    <p className="mt-1 text-sm leading-relaxed text-ink">
                      {atout.texte}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-coral/25 bg-white p-8">
              <h2 className="font-serif text-xl text-night">
                Notre gestion complète
              </h2>
              <p className="mt-2 text-sm leading-relaxed">
                Annonce & photos pro, voyageurs 24/7, ménage & linge hôtelier,
                tarification dynamique, maintenance et conformité.
              </p>
              <div className="mt-4 flex flex-col gap-2 text-sm font-medium">
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 text-terracotta transition-colors hover:text-sunset"
                >
                  Découvrir nos services
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <Link
                  href="/tarifs"
                  className="inline-flex items-center gap-2 text-terracotta transition-colors hover:text-sunset"
                >
                  Voir nos tarifs (15–25 %)
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {voisins.length > 0 ? (
        <section className="border-t border-coral/20 bg-white py-14">
          <div className="container">
            <h2 className="text-2xl">
              Nous intervenons aussi autour de {ville.nom}
            </h2>
            <ul className="mt-6 flex flex-wrap gap-3">
              {voisins.map((voisin) => (
                <li key={voisin.slug}>
                  <Link
                    href={`/${voisin.slug}`}
                    className="inline-flex items-center gap-2 rounded-full border border-coral/40 bg-sand px-5 py-2.5 text-sm font-medium text-night transition-colors hover:border-coral hover:text-terracotta"
                  >
                    Conciergerie Airbnb {voisin.nom}
                    <ArrowRight className="h-3.5 w-3.5 text-coral" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <CtaBand
        title={`Un bien à ${ville.nom} ? Faisons le point.`}
        subtitle="Visite du logement, estimation des revenus nets et recommandations personnalisées : l'audit est gratuit et sans engagement."
      />
    </>
  );
}
