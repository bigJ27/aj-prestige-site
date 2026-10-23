"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { packs, type PackId } from "@/lib/content";

const euros = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

const PRICE = { min: 40, max: 350, step: 5 };
const OCCUPANCY = { min: 30, max: 95, step: 5 };
const DAYS = 30;

const round10 = (value: number) => Math.round(value / 10) * 10;
const percent = (value: number, min: number, max: number) =>
  `${((value - min) / (max - min)) * 100}%`;

/**
 * Estimateur de revenus : prix par nuit × taux d'occupation, moins la
 * commission du pack choisi. Calcul simple et transparent, affiché tel quel.
 */
export default function Estimator() {
  const [price, setPrice] = useState(90);
  const [occupancy, setOccupancy] = useState(70);
  const [packId, setPackId] = useState<PackId>("sweet-home");

  const pack = packs.find((p) => p.id === packId) ?? packs[1];
  const packIndex = packs.findIndex((p) => p.id === packId);

  const result = useMemo(() => {
    const nights = (DAYS * occupancy) / 100;
    const gross = price * nights;
    const commission = gross * pack.taux;
    return {
      nights: Math.round(nights),
      gross: round10(gross),
      commission: round10(commission),
      net: round10(gross - commission),
    };
  }, [price, occupancy, pack.taux]);

  return (
    <div className="estimator">
      <div className="est-controls">
        <div className="est-row">
          <label htmlFor="est-price">
            Prix moyen par nuit
            <output htmlFor="est-price" className="num">
              {euros.format(price)}
            </output>
          </label>
          <input
            id="est-price"
            className="range"
            type="range"
            min={PRICE.min}
            max={PRICE.max}
            step={PRICE.step}
            value={price}
            onChange={(event) => setPrice(Number(event.target.value))}
            style={
              {
                "--p": percent(price, PRICE.min, PRICE.max),
              } as React.CSSProperties
            }
          />
          <p className="est-hint">
            Le tarif que vous visez, ou celui de biens similaires.
          </p>
        </div>

        <div className="est-row">
          <label htmlFor="est-occupancy">
            Taux d’occupation
            <output htmlFor="est-occupancy" className="num">
              {occupancy} %
            </output>
          </label>
          <input
            id="est-occupancy"
            className="range"
            type="range"
            min={OCCUPANCY.min}
            max={OCCUPANCY.max}
            step={OCCUPANCY.step}
            value={occupancy}
            onChange={(event) => setOccupancy(Number(event.target.value))}
            style={
              {
                "--p": percent(occupancy, OCCUPANCY.min, OCCUPANCY.max),
              } as React.CSSProperties
            }
          />
          <p className="est-hint">
            Soit environ {result.nights} nuits réservées sur 30 jours.
          </p>
        </div>

        <div className="est-row">
          <span className="est-label" id="est-pack-label">
            Pack
          </span>
          <div
            className="segmented"
            role="group"
            aria-labelledby="est-pack-label"
          >
            <span
              className="segmented-thumb"
              style={{ transform: `translateX(${packIndex * 100}%)` }}
              aria-hidden="true"
            />
            {packs.map((p) => (
              <button
                key={p.id}
                type="button"
                aria-pressed={p.id === packId}
                onClick={() => setPackId(p.id)}
              >
                {p.nom}
                <small>
                  {p.prefixe ? `${p.prefixe} ` : ""}
                  {p.prix}
                </small>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="est-result" aria-live="polite">
        <span className="eyebrow eyebrow-dark">Revenus nets estimés</span>
        <p className="est-net">
          <span className="text-gradient-dark">{euros.format(result.net)}</span>
        </p>
        <p className="mt-2 text-[15px] text-[color:var(--on-dark-2)]">
          par mois, après notre commission
        </p>

        <div className="est-lines">
          <div>
            <span>Revenus bruts</span>
            <strong>{euros.format(result.gross)}</strong>
          </div>
          <div>
            <span>
              Commission {pack.prefixe ? `${pack.prefixe} ` : ""}
              {pack.prix}
            </span>
            <strong>− {euros.format(result.commission)}</strong>
          </div>
        </div>

        <p className="est-note">
          Estimation indicative sur 30 jours, hors frais de ménage, charges et
          fiscalité. Vos revenus réels dépendent du bien, de la saison et de la
          demande locale — l’audit gratuit les chiffre précisément.
        </p>

        <div className="mt-auto pt-7">
          <Link
            href={`/contact?pack=${pack.id}`}
            className="btn btn-primary btn-block"
          >
            Obtenir mon estimation précise
            <ArrowRight className="arrow h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}
