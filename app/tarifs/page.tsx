import type { Metadata } from "next";
import { Check, Minus } from "lucide-react";
import CtaBand from "@/components/CtaBand";
import Estimator from "@/components/Estimator";
import Faq from "@/components/Faq";
import PricingCards from "@/components/PricingCards";
import Reveal from "@/components/Reveal";
import { comparatif, faq, packs } from "@/lib/content";

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

export default function TarifsPage() {
  return (
    <>
      <section className="page-hero !pb-0">
        <div className="aurora" aria-hidden="true" />
        <Reveal className="shell-narrow">
          <span className="eyebrow">Tarifs</span>
          <h1 className="display-xl mt-4">
            Une commission transparente.
            <br />
            <span className="text-gradient">Rien d’autre.</span>
          </h1>
          <p className="lead mx-auto mt-6 max-w-2xl">
            Trois niveaux de délégation, de 15 à 25 % sur les réservations
            confirmées. Sans frais fixes, sans frais cachés, sans engagement de
            durée — et l’audit initial est toujours gratuit.
          </p>
        </Reveal>
        <div className="shell pb-[clamp(56px,8vw,104px)]">
          <h2 className="sr-only">Nos trois packs</h2>
          <PricingCards />
        </div>
      </section>

      <section className="section" id="comparatif">
        <div className="shell-narrow">
          <Reveal className="section-head">
            <span className="eyebrow">Comparatif</span>
            <h2 className="display mt-3">Les trois packs en un coup d’œil.</h2>
          </Reveal>
          <Reveal delay={80}>
            <div className="compare">
              <table>
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
                        className={pack.recommande ? "col-featured" : undefined}
                      >
                        {pack.nom}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {comparatif.map((ligne) => (
                    <tr key={ligne.label}>
                      <th scope="row" className="font-normal">
                        {ligne.label}
                      </th>
                      {ligne.valeurs.map((valeur, index) => (
                        <td
                          key={index}
                          className={
                            packs[index]?.recommande
                              ? "col-featured"
                              : undefined
                          }
                        >
                          {typeof valeur === "string" ? (
                            <span className="font-semibold">{valeur}</span>
                          ) : valeur ? (
                            <>
                              <Check
                                className="yes h-5 w-5"
                                aria-hidden="true"
                              />
                              <span className="sr-only">Inclus</span>
                            </>
                          ) : (
                            <>
                              <Minus
                                className="no h-5 w-5"
                                aria-hidden="true"
                              />
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
          </Reveal>
        </div>
      </section>

      <section className="section bg-sand-soft" id="estimation">
        <div className="shell">
          <Reveal className="section-head">
            <span className="eyebrow">Estimation</span>
            <h2 className="display mt-3">
              Ce que chaque pack vous rapporterait.
            </h2>
            <p className="lead mt-6">
              Ajustez le prix et l’occupation, comparez les packs en un geste.
            </p>
          </Reveal>
          <Reveal delay={100}>
            <Estimator />
          </Reveal>
        </div>
      </section>

      <section className="section" id="faq">
        <div className="shell-narrow">
          <Reveal className="section-head">
            <span className="eyebrow">Questions fréquentes</span>
            <h2 className="display mt-3">
              Tout ce que les propriétaires nous demandent.
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <Faq items={faq} />
          </Reveal>
        </div>
      </section>

      <CtaBand
        title="Besoin d’un conseil pour choisir ?"
        subtitle="Demandez votre audit gratuit : nous chiffrons le potentiel de votre bien et vous recommandons le pack idéal."
      />
    </>
  );
}
