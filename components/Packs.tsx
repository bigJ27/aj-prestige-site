import Link from "next/link";
import { IconArrow, IconCheck } from "@/components/icons";
import { packs } from "@/lib/content";
import { typo } from "@/lib/typo";

/**
 * Les trois packs, présentés comme une carte des tarifs : trois colonnes
 * séparées par des filets sur ordinateur, trois fiches empilées sur mobile
 * (plus lisible qu'un carrousel : rien n'est caché, rien ne défile tout seul).
 */
export default function Packs() {
  return (
    <div className="packs">
      {packs.map((pack) => (
        <article
          key={pack.id}
          className={`pack ${pack.recommande ? "is-featured" : ""}`}
          aria-label={`Pack ${pack.nom}`}
        >
          <p className="pack-badge">{pack.badge}</p>
          <h3 className="pack-name">Pack {pack.nom}</h3>
          <p className="pack-rate">
            {pack.prefixe ? <small>{pack.prefixe}</small> : null}
            {typo(pack.prix)}
          </p>
          <p className="pack-unit">{pack.prixLabel}</p>
          <p className="pack-intro">{typo(pack.intro)}</p>
          <p className="pack-list-title">{pack.featuresTitle}</p>
          <ul className="pack-list">
            {pack.features.map((feature) => (
              <li key={feature}>
                <IconCheck size={18} />
                {typo(feature)}
              </li>
            ))}
          </ul>
          <Link
            href={`/contact?pack=${pack.id}`}
            prefetch={false}
            className={`btn btn-block ${pack.recommande ? "btn-primary" : "btn-secondary"}`}
          >
            Choisir {pack.nom}
            <IconArrow size={18} />
          </Link>
        </article>
      ))}
    </div>
  );
}
