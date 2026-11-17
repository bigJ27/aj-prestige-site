"use client";

import { useState } from "react";
import Link from "next/link";
import { IconArrow } from "@/components/icons";
import { packs, type PackId } from "@/lib/content";
import { typo } from "@/lib/typo";

const euros = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

const PRIX = { min: 40, max: 350, pas: 5 };
const OCCUPATION = { min: 30, max: 95, pas: 5 };
const JOURS = 30;

const arrondi10 = (valeur: number) => Math.round(valeur / 10) * 10;
const position = (valeur: number, min: number, max: number) =>
  `${((valeur - min) / (max - min)) * 100}%`;

/**
 * Estimateur de revenus : prix par nuit × nuits réservées, moins la commission
 * du pack choisi. Le calcul est volontairement simple et affiché ligne à
 * ligne, comme le relevé que reçoit le propriétaire chaque mois.
 */
export default function Estimator() {
  const [prix, setPrix] = useState(90);
  const [occupation, setOccupation] = useState(70);
  const [packId, setPackId] = useState<PackId>("sweet-home");

  const pack = packs.find((p) => p.id === packId) ?? packs[1];
  const nuits = Math.round((JOURS * occupation) / 100);
  const brut = arrondi10((prix * JOURS * occupation) / 100);
  const commission = arrondi10(brut * pack.taux);
  const net = brut - commission;

  return (
    <div className="estimator">
      <div className="est-controls">
        <div>
          <div className="est-head">
            <label htmlFor="est-prix">Prix moyen par nuit</label>
            <output htmlFor="est-prix">{euros.format(prix)}</output>
          </div>
          <input
            id="est-prix"
            className="range"
            type="range"
            min={PRIX.min}
            max={PRIX.max}
            step={PRIX.pas}
            value={prix}
            onChange={(event) => setPrix(Number(event.target.value))}
            style={
              { "--p": position(prix, PRIX.min, PRIX.max) } as React.CSSProperties
            }
          />
          <p className="est-hint">
            Le tarif que vous visez, ou celui de biens comparables au vôtre.
          </p>
        </div>

        <div>
          <div className="est-head">
            <label htmlFor="est-occupation">Taux d’occupation</label>
            <output htmlFor="est-occupation">{occupation}&nbsp;%</output>
          </div>
          <input
            id="est-occupation"
            className="range"
            type="range"
            min={OCCUPATION.min}
            max={OCCUPATION.max}
            step={OCCUPATION.pas}
            value={occupation}
            onChange={(event) => setOccupation(Number(event.target.value))}
            style={
              {
                "--p": position(occupation, OCCUPATION.min, OCCUPATION.max),
              } as React.CSSProperties
            }
          />
          <p className="est-hint">
            Soit environ {nuits} nuits réservées sur 30&nbsp;jours.
          </p>
        </div>

        <fieldset>
          <legend className="est-legend">Pack</legend>
          <div className="est-packs">
            {packs.map((p) => (
              <label key={p.id} className="est-pack">
                <input
                  type="radio"
                  name="est-pack"
                  value={p.id}
                  checked={p.id === packId}
                  onChange={() => setPackId(p.id)}
                />
                <span>
                  {p.nom}
                  <small>
                    {p.prefixe ? `${p.prefixe} ` : ""}
                    {typo(p.prix)}
                  </small>
                </span>
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      <div className="receipt" aria-live="polite">
        <p className="label label-plain">Relevé mensuel estimatif</p>
        <dl className="receipt-lines">
          <div>
            <dt>
              {nuits} nuits × {euros.format(prix)}
            </dt>
            <dd>{euros.format(brut)}</dd>
          </div>
          <div>
            <dt>
              Commission {pack.prefixe ?? "de"} {typo(pack.prix)}
            </dt>
            <dd>−&nbsp;{euros.format(commission)}</dd>
          </div>
        </dl>
        <p className="receipt-total">
          <span>Vous recevez</span>
          <strong>{euros.format(net)}</strong>
          <small>par mois, après notre commission</small>
        </p>
        <p className="receipt-note">
          Estimation indicative sur 30&nbsp;jours, hors frais de ménage,
          charges et fiscalité. Vos revenus réels dépendent du bien, de la
          saison et de la demande locale&nbsp;: l’audit gratuit les chiffre
          précisément.
        </p>
        <Link
          href={`/contact?pack=${pack.id}`}
          prefetch={false}
          className="btn btn-primary btn-block"
        >
          Faire estimer mon bien
          <IconArrow size={18} />
        </Link>
      </div>
    </div>
  );
}
