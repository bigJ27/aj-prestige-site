import Link from "next/link";
import { IconArrow } from "@/components/icons";
import { parcours } from "@/lib/content";
import { typo } from "@/lib/typo";

/**
 * Le parcours du propriétaire, dessiné comme un plan de ligne : six arrêts,
 * du premier contact aux premiers revenus. Clin d'œil à la ligne H qui
 * dessert la vallée.
 *
 * Aucun JavaScript : là où le navigateur le permet, la ligne « se parcourt »
 * au fil du défilement grâce au CSS seul (voir .stop dans globals.css).
 * La variable --i donne à chaque arrêt son rang, pour décaler son allumage.
 */
export default function Journey() {
  return (
    <section className="section bg-pine" aria-labelledby="parcours-titre">
      <div className="wrap">
        <div className="section-head">
          <p className="label label-plain">
            <span className="line-badge">AJ</span>
            Votre parcours · 6 arrêts
          </p>
          <h2 id="parcours-titre" className="h-section">
            De votre premier message à vos <em>premiers revenus.</em>
          </h2>
        </div>

        <ol className="line">
          {parcours.map((arret, i) => (
            <li
              key={arret.titre}
              className="stop"
              style={{ "--i": i } as React.CSSProperties}
            >
              <span className="stop-mark" aria-hidden="true" />
              <p className="stop-num">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="stop-title">{typo(arret.titre)}</h3>
              <p className="stop-text">{typo(arret.texte)}</p>
            </li>
          ))}
        </ol>

        <div className="journey-cta">
          <Link href="/contact" className="btn btn-light">
            Commencer par l’audit gratuit
            <IconArrow size={18} />
          </Link>
          <p className="small">
            Un seul interlocuteur du début à la fin, sans engagement de durée.
          </p>
        </div>
      </div>
    </section>
  );
}
