import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from './ui/button';

/* ─── Station data ─────────────────────────────────────────────── */
const STATIONS = [
  {
    id: '01',
    title: 'Premier contact',
    desc: 'Vous nous contactez via le formulaire ou par téléphone. Nous échangeons sur votre bien, vos objectifs et vos attentes.',
    isFirst: true,
  },
  {
    id: '02',
    title: 'Audit gratuit',
    desc: 'Visite de votre logement, analyse du potentiel locatif, estimation des revenus possibles et recommandations personnalisées.',
  },
  {
    id: '03',
    title: 'Signature & onboarding',
    desc: 'Signature du contrat de gestion et mise en place de tous les accès nécessaires à notre équipe.',
  },
  {
    id: '04',
    title: 'Mise en ligne & gestion',
    desc: "Création ou optimisation de l'annonce, photos professionnelles, gestion complète des réservations 24/7.",
  },
  {
    id: '05',
    title: 'Optimisation continue',
    desc: 'Ajustement permanent du pricing, optimisation du calendrier, amélioration des avis et maximisation de vos revenus.',
  },
  {
    id: '06',
    title: 'Premiers revenus 🎉',
    desc: "Votre bien génère ses premiers revenus. Vous profitez, on s'occupe du reste.",
    isLast: true,
  },
];

const TOTAL_DUR = 4.5; // seconds – total travel time of the train

/* ─── Component ────────────────────────────────────────────────── */
const MetroJourneySection = () => {
  const sectionRef  = useRef(null);
  const wrapperRef  = useRef(null);
  const pointRefs   = useRef([]);
  const linePathRef = useRef(null);
  const timeoutsRef = useRef([]);

  const [svgInfo, setSvgInfo]         = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [litSet, setLitSet]           = useState(new Set());

  /* ── Measure station dot positions ── */
  const measure = useCallback(() => {
    if (!wrapperRef.current) return;
    const wRect = wrapperRef.current.getBoundingClientRect();
    const ys = pointRefs.current
      .filter(Boolean)
      .map(el => {
        const r = el.getBoundingClientRect();
        return Math.round(r.top - wRect.top + r.height / 2);
      });
    if (ys.length < 2) return;
    setSvgInfo({
      svgH: Math.ceil(wRect.height),
      ys,
      pathD: `M 22,${ys[0]} L 22,${ys[ys.length - 1]}`,
    });
  }, []);

  useLayoutEffect(() => {
    measure();
    const ro = new ResizeObserver(measure);
    if (wrapperRef.current) ro.observe(wrapperRef.current);
    return () => ro.disconnect();
  }, [measure]);

  /* ── Drive progressive line drawing via stroke-dashoffset ── */
  useEffect(() => {
    const path = linePathRef.current;
    if (!path || !svgInfo) return;

    if (isAnimating) {
      const len = path.getTotalLength();
      path.style.transition = 'none';
      path.style.strokeDasharray = `${len}`;
      path.style.strokeDashoffset = `${len}`;
      void path.getBoundingClientRect();
      path.style.transition = `stroke-dashoffset ${TOTAL_DUR}s linear`;
      path.style.strokeDashoffset = '0';
    } else {
      const len = path.getTotalLength ? path.getTotalLength() : 0;
      path.style.transition = 'none';
      if (len) {
        path.style.strokeDasharray = `${len}`;
        path.style.strokeDashoffset = `${len}`;
      }
    }
  }, [isAnimating, svgInfo]);

  /* ── Animation helpers ── */
  const clearTos = () => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  };

  const startAnimation = useCallback(() => {
    clearTos();
    setLitSet(new Set());
    setIsAnimating(true);

    setSvgInfo(info => {
      if (!info) return info;
      const { ys } = info;
      const total = ys[ys.length - 1] - ys[0];

      ys.forEach((y, i) => {
        const delay = total > 0
          ? ((y - ys[0]) / total) * TOTAL_DUR * 1000
          : i * (TOTAL_DUR / (ys.length - 1)) * 1000;

        const id = setTimeout(() => {
          setLitSet(prev => new Set([...prev, i]));
        }, delay);
        timeoutsRef.current.push(id);
      });
      return info;
    });
  }, []);

  const resetAnimation = useCallback(() => {
    clearTos();
    setIsAnimating(false);
    setLitSet(new Set());
  }, []);

  /* ── IntersectionObserver ── */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) startAnimation();
        else resetAnimation();
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      observer.disconnect();
      clearTos();
    };
  }, [startAnimation, resetAnimation]);

  /* ── Render ── */
  return (
    <section ref={sectionRef} className="journey-metro-section">
      <div className="container">

        {/* ── Header ── */}
        <div className="section-header-light">
          <span className="overline-light">VOTRE PARCOURS</span>
          <h2 className="section-title-light">
            De la prise de contact<br />à l'optimisation de vos revenus
          </h2>
        </div>

        <div className="metro-timeline-v3" ref={wrapperRef}>

          {/* ── SVG: ghost track + animated line + traveling train ── */}
          {svgInfo && (
            <svg
              className="metro-line-svg"
              style={{ height: svgInfo.svgH }}
              viewBox={`0 0 44 ${svgInfo.svgH}`}
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <defs>
                {/* Sunset gradient for the active track */}
                <linearGradient
                  id="metroLineGrad"
                  x1="22" y1={svgInfo.ys[0]}
                  x2="22" y2={svgInfo.ys[svgInfo.ys.length - 1]}
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0%"   stopColor="#fbbf24" />
                  <stop offset="35%"  stopColor="#f97316" />
                  <stop offset="70%"  stopColor="#ea580c" />
                  <stop offset="100%" stopColor="#9333ea" />
                </linearGradient>
              </defs>

              {/* Ghost track — always visible, shows the full route */}
              <path
                d={svgInfo.pathD}
                fill="none"
                stroke="#dde3ec"
                strokeWidth="8"
                strokeLinecap="round"
              />

              {/* Active track — progressively revealed */}
              <path
                ref={linePathRef}
                d={svgInfo.pathD}
                fill="none"
                stroke="url(#metroLineGrad)"
                strokeWidth="8"
                strokeLinecap="round"
              />


            </svg>
          )}

          {/* ── Station stops (HTML) ── */}
          {STATIONS.map((s, i) => {
            const isLit      = litSet.has(i);
            const isTerminal = s.isFirst || s.isLast;
            return (
              <div
                key={i}
                className={[
                  'metro-stop-v3',
                  isLit      ? 'stop-lit'            : '',
                  s.isLast   ? 'stop-last'            : '',
                  s.isFirst  ? 'stop-terminal-first'  : '',
                  s.isLast   ? 'stop-terminal-last'   : '',
                ].join(' ')}
              >
                {/* Dot marker */}
                <div
                  className="metro-point-v3"
                  ref={el => { pointRefs.current[i] = el; }}
                >
                  <div
                    className={[
                      'metro-dot-v3',
                      s.isLast && isLit ? 'dot-pulse' : '',
                    ].join(' ')}
                  />
                </div>

                {/* Text content */}
                <div className="metro-content-v3">
                  <div className="metro-number-v3">{s.id}</div>
                  <h3 className="metro-title-v3">{s.title}</h3>
                  <p className="metro-desc-v3">{s.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── CTA ── */}
        <div className="journey-metro-cta">
          <Link to="/contact">
            <Button size="lg" className="journey-metro-cta-btn">
              Toucher mes premiers revenus
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>

      </div>
    </section>
  );
};

export default MetroJourneySection;
