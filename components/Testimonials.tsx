import { Stars } from "@/components/icons";
import { temoignages } from "@/lib/content";
import { GOOGLE_BUSINESS_URL } from "@/lib/site";
import { typo } from "@/lib/typo";

/**
 * Avis de propriétaires. La section ne s'affiche que si lib/content.ts
 * contient de vrais témoignages : aucun avis inventé sur ce site.
 */
export default function Testimonials() {
  if (temoignages.length === 0) return null;

  return (
    <section className="section bg-linen" aria-labelledby="avis-titre">
      <div className="wrap">
        <div className="section-head">
          <p className="label">Avis de propriétaires</p>
          <h2 id="avis-titre" className="h-section">
            Ils nous confient <em>leur bien.</em>
          </h2>
        </div>
        <div className="quotes">
          {temoignages.slice(0, 3).map((avis) => (
            <figure key={avis.auteur + avis.texte} className="quote">
              <Stars />
              <blockquote>« {typo(avis.texte)} »</blockquote>
              <figcaption>
                <strong>{avis.auteur}</strong>
                {avis.contexte}
              </figcaption>
            </figure>
          ))}
        </div>
        <p className="mt-8">
          <a
            href={GOOGLE_BUSINESS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="link-arrow"
          >
            Lire tous nos avis sur Google
          </a>
        </p>
      </div>
    </section>
  );
}
