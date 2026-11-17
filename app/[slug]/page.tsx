import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CtaBand from "@/components/CtaBand";
import Photo from "@/components/Photo";
import ZoneMap, { CityList } from "@/components/ZoneMap";
import { IconArrow } from "@/components/icons";
import { photos } from "@/lib/photos";
import { SITE_URL } from "@/lib/site";
import { typo } from "@/lib/typo";
import { getVille, villes } from "@/lib/villes";

/**
 * Photos propres à une ville, affichées en tête de la colonne de droite.
 * Dès que vous avez une belle photo d'un bien ou d'un lieu de la ville,
 * ajoutez-la ici (et dans lib/photos.ts) : rien ne vaut le vrai.
 */
const photosVilles: Partial<
  Record<string, { photo: (typeof photos)[keyof typeof photos]; legende: string }>
> = {
  "conciergerie-airbnb-enghien-les-bains": {
    photo: photos.lacBarques,
    legende: "Les barques du lac d’Enghien, à deux pas des thermes et du casino.",
  },
};

// Seules les 8 villes connues existent : toute autre adresse renvoie la page 404
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
  const photoVille = photosVilles[ville.slug];

  // Fil d'Ariane pour les moteurs de recherche
  const filAriane = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: `Conciergerie Airbnb à ${ville.nom}`,
        item: `${SITE_URL}/${ville.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(filAriane) }}
      />

      <section className="page-hero">
        <div className="wrap">
          <p className="label">Val-d’Oise · Vallée de Montmorency</p>
          <h1 className="h-page">
            Conciergerie Airbnb à <em>{ville.nom}</em>
          </h1>
          <p className="lead">{typo(ville.accroche)}</p>
          <div className="hero-actions">
            <Link href="/contact" className="btn btn-primary">
              Audit gratuit de mon bien
              <IconArrow size={18} />
            </Link>
            <Link href="/tarifs" className="link-arrow">
              Voir les tarifs
              <IconArrow size={18} />
            </Link>
          </div>
        </div>
      </section>

      <section className="section !pt-[clamp(24px,4vw,56px)]">
        <div className="wrap grid gap-x-16 gap-y-14 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
          <div className="prose">
            {ville.paragraphes.map((paragraphe, index) => (
              <p key={index}>{typo(paragraphe)}</p>
            ))}
          </div>

          <aside className="grid content-start gap-8 lg:sticky lg:top-[calc(var(--header-h)+32px)] lg:self-start">
            {photoVille ? (
              <figure>
                <div className="photo aspect-[4/3]">
                  <Photo
                    src={photoVille.photo.src}
                    alt={photoVille.photo.alt}
                    sizes="(max-width: 1023px) calc(100vw - 40px), 460px"
                    className="object-[center_72%]"
                  />
                </div>
                <figcaption className="photo-caption">
                  {photoVille.legende}
                </figcaption>
              </figure>
            ) : null}
            <div>
              <h2 className="h-card">
                Pourquoi louer en courte durée à {ville.nom}&nbsp;?
              </h2>
              <ul className="atouts mt-5">
                {ville.atouts.map((atout) => (
                  <li key={atout.titre}>
                    <strong>{typo(atout.titre)}</strong>
                    <span>{typo(atout.texte)}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="aside-card">
              <h2 className="h-card">Notre gestion complète</h2>
              <p className="small mt-2">
                Annonce et photos, voyageurs 7&nbsp;j/7, ménage et linge
                hôtelier, tarification dynamique, maintenance et conformité.
              </p>
              <div className="mt-3 grid">
                <Link href="/services" className="link-arrow">
                  Découvrir nos services
                  <IconArrow size={18} />
                </Link>
                <Link href="/tarifs" className="link-arrow">
                  Voir nos tarifs (15 à 25&nbsp;%)
                  <IconArrow size={18} />
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="section bg-linen" aria-labelledby="zone-titre">
        <div className="wrap zone-grid">
          <div className="zone-titre">
            <p className="label">Notre zone</p>
            <h2 id="zone-titre" className="h-section">
              {ville.nom} et <em>ses voisines.</em>
            </h2>
            <p className="lead mt-5">
              Depuis Soisy-sous-Montmorency, nous intervenons dans huit
              communes de la vallée. Chaque ville a sa page.
            </p>
          </div>
          <div className="zone-carte">
            <ZoneMap current={ville.slug} />
          </div>
          <div className="zone-liste">
            <CityList current={ville.slug} />
          </div>
        </div>
      </section>

      <CtaBand
        title={
          <>
            Un bien à {ville.nom}&nbsp;? <em>Faisons le point.</em>
          </>
        }
        subtitle="Visite du logement, estimation de vos revenus nets et recommandations personnalisées : l’audit est gratuit et sans engagement."
      />
    </>
  );
}
