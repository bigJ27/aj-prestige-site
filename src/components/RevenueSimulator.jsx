import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Info } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';

const BASE_RATES = {
  'paris-centre': {
    studio: 130, '2p': 175, '3p': 240, maison: 360,
    label: 'Paris centre (1er–6e)',
    desc: 'Marais, Louvre, Saint-Germain, Quartier Latin',
    occ: 82,
  },
  'paris-prestige': {
    studio: 145, '2p': 195, '3p': 280, maison: 420,
    label: 'Paris prestige (7e, 8e, 16e)',
    desc: 'Tour Eiffel, Champs-Élysées, Trocadéro, Passy',
    occ: 78,
  },
  'paris-nord-est': {
    studio: 95, '2p': 135, '3p': 195, maison: 275,
    label: 'Paris nord & est (9e–11e, 18e–20e)',
    desc: 'Montmartre, République, Bastille, Canal Saint-Martin',
    occ: 72,
  },
  'paris-residentiel': {
    studio: 85, '2p': 120, '3p': 170, maison: 240,
    label: 'Paris résidentiel (12e–15e, 17e)',
    desc: 'Nation, Montparnasse, Batignolles, Grenelle',
    occ: 68,
  },
  'idf-premium': {
    studio: 95, '2p': 140, '3p': 200, maison: 290,
    label: 'Petite couronne premium',
    desc: 'Neuilly, Levallois, Boulogne, Saint-Cloud, Vincennes',
    occ: 70,
  },
  'idf-couronne': {
    studio: 72, '2p': 105, '3p': 155, maison: 215,
    label: "Val-d'Oise & petite couronne",
    desc: 'Soisy-sous-Montmorency, Enghien, Sarcelles, Créteil',
    occ: 63,
  },
  'idf-grande': {
    studio: 60, '2p': 88, '3p': 128, maison: 180,
    label: 'Grande couronne IdF',
    desc: 'Versailles, Saint-Germain-en-Laye, Fontainebleau',
    occ: 58,
  },
};

const TYPE_LABELS = {
  studio: 'Studio / T1',
  '2p': '2 pièces / T2',
  '3p': '3 pièces et +',
  maison: 'Maison / Villa',
};

const SEASONAL = {
  1:  { label: 'Janvier',    coef: 0.78 },
  2:  { label: 'Février',    coef: 0.84 },
  3:  { label: 'Mars',       coef: 0.90 },
  4:  { label: 'Avril',      coef: 1.05 },
  5:  { label: 'Mai',        coef: 1.15 },
  6:  { label: 'Juin',       coef: 1.25 },
  7:  { label: 'Juillet',    coef: 1.18 },
  8:  { label: 'Août',       coef: 1.10 },
  9:  { label: 'Septembre',  coef: 1.20 },
  10: { label: 'Octobre',    coef: 1.22 },
  11: { label: 'Novembre',   coef: 0.82 },
  12: { label: 'Décembre',   coef: 1.00 },
};

const PACK_COMMISSIONS = { confort: 0.15, sweet: 0.20, prestige: 0.25 };
const PACK_INFO = {
  confort:  { name: 'Pack Confort',    pct: '15%', badge: 'pack-badge-comfort' },
  sweet:    { name: 'Pack Sweet Home', pct: '20%', badge: 'pack-badge-sweet'   },
  prestige: { name: 'Pack Prestige',   pct: '25%+', badge: 'pack-badge-prestige' },
};

const fmt = (n) => Math.round(n).toLocaleString('fr-FR') + ' €';
const currentMonth = new Date().getMonth() + 1;

export default function RevenueSimulator() {
  const [zone,        setZone]        = useState('idf-couronne');
  const [type,        setType]        = useState('2p');
  const [nights,      setNights]      = useState(20);
  const [month,       setMonth]       = useState(currentMonth);
  const [pack,        setPack]        = useState('sweet');
  const [showDetails, setShowDetails] = useState(false);

  const zoneData  = BASE_RATES[zone];
  const baseRate  = zoneData[type];
  const seasonal  = SEASONAL[month];
  const packComm  = PACK_COMMISSIONS[pack];

  const r = useMemo(() => {
    const rateAdj   = baseRate * seasonal.coef;
    const gross     = rateAdj * nights;
    const ajComm    = gross * packComm;
    const net       = gross - ajComm;
    const annualNet = Object.values(SEASONAL).reduce((acc, s) => {
      const g = baseRate * s.coef * nights;
      return acc + (g - g * packComm);
    }, 0);
    const longTermEquiv = net / 2.6;
    return { rateAdj, gross, ajComm, net, annualNet, longTermEquiv, gain: net - longTermEquiv };
  }, [zone, type, nights, month, pack, baseRate, seasonal, packComm]);

  const bars = useMemo(() =>
    Object.entries(SEASONAL).map(([m, s]) => {
      const g = baseRate * s.coef * nights;
      return { lbl: s.label.slice(0, 3), net: g - g * packComm, m: Number(m) };
    }), [baseRate, nights, packComm]);
  const maxBar = Math.max(...bars.map(b => b.net));

  return (
    <section className="simulator-section section-padding">
      <div className="container">
        <div className="simulator-layout">

          <div className="simulator-intro reveal-element">
            <span className="overline">SIMULATEUR DE REVENUS</span>
            <h2 className="section-title simulator-title">
              Combien peut rapporter<br />votre bien ?
            </h2>
            <p className="simulator-desc">
              Notre simulateur intègre les données de marché réelles Paris &amp; Île-de-France
              2025–2026 avec les coefficients de saisonnalité mensuels pour estimer
              précisément vos revenus nets.
            </p>
            <div className="sim-market-stats">
              <div className="sim-mstat">
                <div className="sim-mstat-val">162 €</div>
                <div className="sim-mstat-lbl">Tarif moyen / nuit Paris</div>
              </div>
              <div className="sim-mstat">
                <div className="sim-mstat-val">80 %</div>
                <div className="sim-mstat-lbl">Taux d'occupation médian</div>
              </div>
              <div className="sim-mstat">
                <div className="sim-mstat-val">43 k€</div>
                <div className="sim-mstat-lbl">Revenu annuel moyen hôte</div>
              </div>
            </div>
            <div className="sim-source-note">
              Sources : AirDNA · Airbtics 2024–2025 · allovoyages.fr 2026 · Welkeys
            </div>
          </div>

          <Card className="glass-card simulator-card">
            <CardContent className="simulator-card-content">

              <div className="sim-field sim-field-full">
                <label className="sim-label">Secteur géographique</label>
                <div className="sim-select-wrapper">
                  <select className="sim-select" value={zone} onChange={e => setZone(e.target.value)}>
                    {Object.entries(BASE_RATES).map(([v, d]) => (
                      <option key={v} value={v}>{d.label}</option>
                    ))}
                  </select>
                </div>
                <div className="sim-zone-desc">{zoneData.desc} — occ. moy. {zoneData.occ} %/an</div>
              </div>

              <div className="sim-fields-grid">
                <div className="sim-field">
                  <label className="sim-label">Type de bien</label>
                  <div className="sim-select-wrapper">
                    <select className="sim-select" value={type} onChange={e => setType(e.target.value)}>
                      {Object.entries(TYPE_LABELS).map(([v, l]) => (
                        <option key={v} value={v}>{l}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="sim-field">
                  <label className="sim-label">Mois simulé</label>
                  <div className="sim-select-wrapper">
                    <select className="sim-select" value={month} onChange={e => setMonth(Number(e.target.value))}>
                      {Object.entries(SEASONAL).map(([m, s]) => (
                        <option key={m} value={m}>{s.label} (×{s.coef})</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="sim-field" style={{ margin: '1rem 0' }}>
                <div className="sim-slider-header">
                  <label className="sim-label">Nuits disponibles / mois</label>
                  <span className="sim-nights-value">{nights} nuits</span>
                </div>
                <input type="range" min={3} max={30} step={1} value={nights}
                  onChange={e => setNights(Number(e.target.value))} className="sim-slider" />
                <div className="sim-slider-labels"><span>3</span><span>30</span></div>
              </div>

              <div className="sim-pack-selector">
                {Object.entries(PACK_INFO).map(([k, p]) => (
                  <button key={k} type="button"
                    className={`sim-pack-btn ${pack === k ? 'active' : ''}`}
                    onClick={() => setPack(k)}>
                    <span className={`pack-badge ${p.badge}`}>{p.pct}</span>
                    <span className="sim-pack-name">{p.name}</span>
                  </button>
                ))}
              </div>

              <div className="sim-results">
                <div className="sim-result-grid">
                  <div className="sim-result-item">
                    <div className="sim-result-label">Revenu net / mois</div>
                    <div className="sim-result-value sim-result-highlight">{fmt(r.net)}</div>
                    <div className="sim-result-sub">après commission {PACK_INFO[pack].pct}</div>
                  </div>
                  <div className="sim-result-item">
                    <div className="sim-result-label">Revenus bruts</div>
                    <div className="sim-result-value">{fmt(r.gross)}</div>
                    <div className="sim-result-sub">{fmt(r.rateAdj)} / nuit (saisonnier)</div>
                  </div>
                  <div className="sim-result-item">
                    <div className="sim-result-label">vs location nue</div>
                    <div className="sim-result-value sim-result-gain">+{fmt(r.gain)}</div>
                    <div className="sim-result-sub">de revenus supplémentaires</div>
                  </div>
                </div>

                <button className="sim-details-toggle" type="button"
                  onClick={() => setShowDetails(v => !v)}>
                  {showDetails ? '▲ Masquer le détail' : '▼ Voir le détail des calculs'}
                </button>

                {showDetails && (
                  <div className="sim-details-panel">
                    <div className="sim-detail-row">
                      <span>Tarif de base ({TYPE_LABELS[type]})</span>
                      <span>{fmt(baseRate)} / nuit</span>
                    </div>
                    <div className="sim-detail-row">
                      <span>Coefficient saisonnier ({SEASONAL[month].label})</span>
                      <span>× {seasonal.coef.toFixed(2)}</span>
                    </div>
                    <div className="sim-detail-row">
                      <span>Tarif ajusté</span>
                      <span>{fmt(r.rateAdj)} / nuit</span>
                    </div>
                    <div className="sim-detail-row">
                      <span>Revenus bruts ({nights} nuits)</span>
                      <span>{fmt(r.gross)}</span>
                    </div>
                    <div className="sim-detail-row sim-detail-deduction">
                      <span>Commission AJ Prestige ({Math.round(packComm * 100)}% — tout inclus)</span>
                      <span>− {fmt(r.ajComm)}</span>
                    </div>
                    <div className="sim-detail-row sim-detail-total">
                      <span>Votre revenu net</span>
                      <span>{fmt(r.net)}</span>
                    </div>
                    <div className="sim-detail-info">
                      <Info size={12} style={{ flexShrink: 0, marginTop: 2 }} />
                      La commission Airbnb plateforme (≈15%) est déduite directement par Airbnb — elle ne figure pas dans vos revenus bruts.
                    </div>
                    <div className="sim-detail-row" style={{ marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px dashed #e5e7eb' }}>
                      <span>Taux d'occupation annuel moyen (zone)</span>
                      <span>{zoneData.occ} %</span>
                    </div>
                    <div className="sim-detail-row">
                      <span>Équivalent location nue classique</span>
                      <span>≈ {fmt(r.longTermEquiv)} / mois</span>
                    </div>
                    <div className="sim-detail-row sim-detail-total" style={{ color: '#10b981' }}>
                      <span>Gain Airbnb vs location nue</span>
                      <span>+ {fmt(r.gain)}</span>
                    </div>
                  </div>
                )}

                <div className="sim-yearly">
                  <div className="sim-yearly-title">Projection annuelle du revenu net</div>
                  <div className="sim-bars">
                    {bars.map((b) => (
                      <div key={b.m} className={`sim-bar-col ${b.m === month ? 'active' : ''}`}>
                        <div className="sim-bar-wrap">
                          <div className="sim-bar-fill"
                            style={{ height: `${Math.round((b.net / maxBar) * 100)}%` }} />
                        </div>
                        <div className="sim-bar-label">{b.lbl}</div>
                      </div>
                    ))}
                  </div>
                  <div className="sim-yearly-total">
                    Total estimé sur 12 mois : <strong>{fmt(r.annualNet)}</strong>
                  </div>
                </div>

                <Link to="/contact">
                  <Button size="lg" className="cta-primary sim-cta-btn">
                    Obtenir mon estimation personnalisée
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <p className="sim-disclaimer">
                  * Basé sur les données AirDNA · Airbtics Paris &amp; IdF 2024–2026.
                  Les résultats réels varient selon l'état du bien, ses équipements et la stratégie tarifaire.
                </p>
              </div>

            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
