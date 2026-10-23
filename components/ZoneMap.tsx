import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { villes } from "@/lib/villes";

/** Coordonnées approximatives (centre-ville) — carte schématique */
const coords: Record<string, [number, number]> = {
  "conciergerie-airbnb-soisy-sous-montmorency": [48.9886, 2.2994],
  "conciergerie-airbnb-enghien-les-bains": [48.9697, 2.3081],
  "conciergerie-airbnb-montmorency": [48.9897, 2.3219],
  "conciergerie-airbnb-eaubonne": [48.9922, 2.2778],
  "conciergerie-airbnb-ermont": [48.99, 2.2581],
  "conciergerie-airbnb-saint-gratien": [48.9719, 2.2847],
  "conciergerie-airbnb-deuil-la-barre": [48.9675, 2.3253],
  "conciergerie-airbnb-sannois": [48.9722, 2.2578],
};

const BASE = "conciergerie-airbnb-soisy-sous-montmorency";
const LABELS_LEFT = new Set([
  "conciergerie-airbnb-soisy-sous-montmorency",
  "conciergerie-airbnb-montmorency",
  "conciergerie-airbnb-deuil-la-barre",
  "conciergerie-airbnb-enghien-les-bains",
]);

const lats = Object.values(coords).map(([lat]) => lat);
const lons = Object.values(coords).map(([, lon]) => lon);
const [latMin, latMax] = [Math.min(...lats), Math.max(...lats)];
const [lonMin, lonMax] = [Math.min(...lons), Math.max(...lons)];

function position(slug: string) {
  const [lat, lon] = coords[slug];
  const x = 10 + ((lon - lonMin) / (lonMax - lonMin)) * 78;
  const y = 16 + ((latMax - lat) / (latMax - latMin)) * 68;
  return { x, y };
}

type Props = {
  current?: string;
  showList?: boolean;
};

/**
 * Carte schématique des villes d'intervention autour de Soisy-sous-Montmorency
 * (notre base). Chaque point mène à la page de la ville.
 */
export default function ZoneMap({ current, showList = true }: Props) {
  const base = position(BASE);

  return (
    <>
      <div
        className="zone-map"
        role="group"
        aria-label="Carte de nos villes d’intervention"
      >
        <svg
          className="zone-rings"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {[14, 28, 44, 62].map((r, i) => (
            <ellipse
              key={r}
              cx={base.x}
              cy={base.y}
              rx={r * 0.62}
              ry={r}
              fill="none"
              stroke="rgba(232,115,74,0.22)"
              strokeWidth={1}
              strokeDasharray={i === 0 ? undefined : "2 5"}
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </svg>

        {villes.map((ville) => {
          const { x, y } = position(ville.slug);
          const isBase = ville.slug === BASE;
          const isCurrent = ville.slug === current;
          const label = isBase ? "Soisy · notre base" : ville.nom;
          return (
            <Link
              key={ville.slug}
              href={`/${ville.slug}`}
              className="zone-pin"
              style={{ left: `${x}%`, top: `${y}%` }}
              data-base={isBase}
              data-current={isCurrent}
              data-side={LABELS_LEFT.has(ville.slug) ? "left" : "right"}
              aria-label={`Conciergerie Airbnb à ${ville.nom}`}
              aria-current={isCurrent ? "page" : undefined}
            >
              <span aria-hidden="true" />
              <span className="zone-pin-label" aria-hidden="true">
                {label}
              </span>
            </Link>
          );
        })}

        <p className="zone-legend">Carte schématique · Val-d’Oise</p>
      </div>

      {showList ? (
        <ul className="city-list">
          {villes.map((ville) => (
            <li key={ville.slug}>
              <Link
                href={`/${ville.slug}`}
                className="city-link"
                aria-current={ville.slug === current ? "page" : undefined}
              >
                {ville.nom}
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </>
  );
}
