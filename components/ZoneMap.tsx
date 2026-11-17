import Link from "next/link";
import {
  CARTE_HAUTEUR,
  CARTE_KM,
  CARTE_LARGEUR,
  communesCarte,
} from "@/lib/carte";
import { villes } from "@/lib/villes";

const BASE = "conciergerie-airbnb-soisy-sous-montmorency";

/**
 * Emplacement des noms sur la carte, ajusté à la main pour ne recouvrir ni le
 * lac ni les voies ferrées (coordonnées dans le repère de la carte, 1000 de large).
 */
const etiquettes: Record<string, { x: number; y: number; lignes: string[] }> = {
  "conciergerie-airbnb-soisy-sous-montmorency": {
    x: 596,
    y: 392,
    lignes: ["Soisy-sous-", "Montmorency"],
  },
  "conciergerie-airbnb-enghien-les-bains": {
    x: 692,
    y: 640,
    lignes: ["Enghien-", "les-Bains"],
  },
  "conciergerie-airbnb-montmorency": { x: 796, y: 362, lignes: ["Montmorency"] },
  "conciergerie-airbnb-ermont": { x: 266, y: 356, lignes: ["Ermont"] },
  "conciergerie-airbnb-eaubonne": { x: 440, y: 342, lignes: ["Eaubonne"] },
  "conciergerie-airbnb-saint-gratien": {
    x: 468,
    y: 704,
    lignes: ["Saint-Gratien"],
  },
  "conciergerie-airbnb-deuil-la-barre": {
    x: 808,
    y: 518,
    lignes: ["Deuil-", "la-Barre"],
  },
  "conciergerie-airbnb-sannois": { x: 262, y: 582, lignes: ["Sannois"] },
};

type Props = {
  /** Adresse (slug) de la ville à mettre en avant, sur les pages villes */
  current?: string;
};

/**
 * Carte de la zone d'intervention : les huit communes, le lac d'Enghien,
 * la forêt de Montmorency et les lignes de train vers Paris.
 *
 * Deux couches superposées :
 *  1. le fond (public/carte/zone.svg) : une simple image de 5 Ko, téléchargée
 *     une seule fois pour tout le site et seulement à l'approche de la carte ;
 *  2. par-dessus, un calque léger avec les noms, les numéros et, sur les pages
 *     villes, la commune affichée surlignée.
 * Les deux fichiers sont produits par scripts/generer-carte.py (données IGN).
 *
 * La carte est décorative pour les lecteurs d'écran : la liste numérotée des
 * villes, juste à côté, donne les mêmes informations et les liens.
 */
export default function ZoneMap({ current }: Props) {
  // Même ordre que la liste des villes : le numéro sur la carte y correspond
  const communes = villes
    .map((ville) => communesCarte.find((c) => c.slug === ville.slug))
    .filter((commune) => commune !== undefined);
  const surlignee = communes.find((c) => c.slug === current);

  return (
    <figure>
      <div className="map">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/carte/zone.svg"
          alt=""
          width={CARTE_LARGEUR}
          height={CARTE_HAUTEUR}
          loading="lazy"
          decoding="async"
        />
        <svg
          viewBox={`0 0 ${CARTE_LARGEUR} ${CARTE_HAUTEUR}`}
          aria-hidden="true"
          focusable="false"
        >
          {surlignee ? <path className="map-current" d={surlignee.d} /> : null}

          {/* Repères : forêt, lac, directions de Paris */}
          <text className="map-note map-note-wood" x="792" y="118">
            Forêt de Montmorency
          </text>
          <text
            className="map-note map-note-water"
            x="626"
            y="654"
            textAnchor="end"
          >
            Lac d’Enghien
          </text>
          <text className="map-way" x="836" y="767" textAnchor="end">
            vers Paris-Nord · 15 min
          </text>
          <text className="map-way" x="300" y="748">
            vers Paris Saint-Lazare
          </text>

          {/* Noms des communes (grand écran) et numéros (petit écran) */}
          {communes.map((commune, i) => {
            const etiquette = etiquettes[commune.slug];
            const estBase = commune.slug === BASE;
            return (
              <g key={commune.slug}>
                <text className="map-name" x={etiquette.x} y={etiquette.y}>
                  {etiquette.lignes.map((ligne, n) => (
                    <tspan key={ligne} x={etiquette.x} dy={n === 0 ? 0 : 24}>
                      {ligne}
                    </tspan>
                  ))}
                </text>
                {estBase ? (
                  <text
                    className="map-way map-base"
                    x={etiquette.x}
                    y={etiquette.y + 24 * etiquette.lignes.length + 4}
                    textAnchor="middle"
                  >
                    NOTRE BASE
                  </text>
                ) : null}
                {/* Deux groupes : le premier place le numéro, le second (map-pin)
                    est agrandi par le CSS sur petit écran */}
                <g
                  transform={`translate(${etiquette.x} ${estBase ? etiquette.y - 42 : etiquette.y - 6})`}
                >
                  <g className={`map-pin ${estBase ? "is-base" : ""}`}>
                    <circle r="13" />
                    <text y="5">{i + 1}</text>
                  </g>
                </g>
              </g>
            );
          })}

          {/* Échelle : un kilomètre */}
          <g
            className="map-extra"
            transform={`translate(40 ${CARTE_HAUTEUR - 34})`}
          >
            <path className="map-scale" d={`M0 -5V0H${CARTE_KM}V-5`} />
            <text
              className="map-way"
              x={CARTE_KM / 2}
              y="-9"
              textAnchor="middle"
            >
              1 km
            </text>
          </g>
        </svg>
      </div>
      <figcaption className="photo-caption">
        Fond de carte : IGN (Admin Express, BD TOPO®), Licence Ouverte.
      </figcaption>
    </figure>
  );
}

/**
 * Liste numérotée des villes, à placer à côté de la carte.
 * prefetch={false} : la page de chaque ville n'est téléchargée qu'au clic,
 * et non dès que le lien apparaît à l'écran (économie de données sur mobile).
 */
export function CityList({ current }: Props) {
  return (
    <ol className="city-list">
      {villes.map((ville) => (
        <li key={ville.slug}>
          <Link
            href={`/${ville.slug}`}
            prefetch={false}
            aria-current={ville.slug === current ? "page" : undefined}
          >
            {ville.nom}
          </Link>
        </li>
      ))}
    </ol>
  );
}
