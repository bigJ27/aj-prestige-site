import type { Metadata } from "next";
import CtaBand from "@/components/CtaBand";
import Estimator from "@/components/Estimator";
import Faq from "@/components/Faq";
import Packs from "@/components/Packs";
import { IconCheck, IconMinus } from "@/components/icons";
import { comparatif, faq, packs } from "@/lib/content";
import { typo } from "@/lib/typo";

export const metadata: Metadata = {
  title: "Tarifs — commission transparente de 15 à 25 %",
  description:
    "Trois packs de conciergerie Airbnb à commission transparente : Confort 15 %, Sweet Home 20 %, Prestige dès 25 %. Sans frais cachés, sans engagement de durée. Audit gratuit de votre bien.",
  alternates: { canonical: "/tarifs" },
  openGraph: {
    url: "/tarifs",
    title: "Tarifs | AJ Prestige",
    description:
      "Packs Confort 15 %, Sweet Home 20 %, Prestige dès 25 %. Commission transparente, sans engagement.",
  },
};

// Données structurées de la FAQ (aident les moteurs à lire questions et réponses)
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.reponse },
  })),
};

export default function TarifsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <section className="page-hero !pb-0">
        <div className="wrap">
          <p className="label">Tarifs</p>
          <h1 className="h-page">
            Une commission, <em>et rien d’autre.</em>
          </h1>
          <p className="lead">
            Trois niveaux de délégation, de 15 à 25&nbsp;% sur les
            réservations confirmées. Sans frais fixes, sans frais cachés, sans
            engagement de durée — et l’audit initial est toujours gratuit.
          </p>
          <h2 className="sr-only">Nos trois packs</h2>
          <Packs />
        </div>
      </section>

      <section className="section" id="comparatif" aria-labelledby="comparatif-titre">
        <div className="wrap">
          <div className="section-head">
            <p className="label">Comparatif</p>
            <h2 id="comparatif-titre" className="h-section">
              Les trois packs, <em>ligne par ligne.</em>
            </h2>
          </div>
          <div className="compare-scroll">
            <table className="compare">
              <caption className="sr-only">
                Comparatif des packs Confort, Sweet Home et Prestige
              </caption>
              <thead>
                <tr>
                  <th scope="col">
                    <span className="sr-only">Prestation</span>
                  </th>
                  {packs.map((pack) => (
                    <th
                      key={pack.id}
                      scope="col"
                      className={pack.recommande ? "is-featured" : undefined}
                    >
                      {pack.nom}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparatif.map((ligne) => (
                  <tr key={ligne.label}>
                    <th scope="row">{typo(ligne.label)}</th>
                    {ligne.valeurs.map((valeur, index) => (
                      <td
                        key={index}
                        className={
                          packs[index]?.recommande ? "is-featured" : undefined
                        }
                      >
                        {typeof valeur === "string" ? (
                          <strong className="font-semibold">{typo(valeur)}</strong>
                        ) : valeur ? (
                          <>
                            <IconCheck size={20} className="yes" />
                            <span className="sr-only">Inclus</span>
                          </>
                        ) : (
                          <>
                            <IconMinus size={20} className="no" />
                            <span className="sr-only">Non inclus</span>
                          </>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section
        className="section bg-linen"
        id="estimation"
        aria-labelledby="estimation-titre"
      >
        <div className="wrap">
          <div className="section-head">
            <p className="label">Estimation</p>
            <h2 id="estimation-titre" className="h-section">
              Ce que chaque pack <em>vous rapporterait.</em>
            </h2>
            <p className="lead">
              Ajustez le prix et l’occupation, puis passez d’un pack à l’autre
              pour comparer.
            </p>
          </div>
          <Estimator />
        </div>
      </section>

      <section className="section" id="faq" aria-labelledby="faq-titre">
        <div className="wrap split">
          <div className="split-aside">
            <p className="label">Questions fréquentes</p>
            <h2 id="faq-titre" className="h-section">
              Ce que les propriétaires <em>nous demandent.</em>
            </h2>
          </div>
          <Faq items={faq} />
        </div>
      </section>

      <CtaBand
        title={
          <>
            Besoin d’un conseil <em>pour choisir&nbsp;?</em>
          </>
        }
        subtitle="Demandez votre audit gratuit : nous chiffrons le potentiel de votre bien et vous recommandons le pack le plus adapté."
      />
    </>
  );
}
