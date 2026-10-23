"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { packs } from "@/lib/content";

const AUTOPLAY = 4500;

/**
 * Les 3 packs côte à côte sur ordinateur. Sur mobile : carrousel à balayer,
 * centré sur le pack recommandé, qui défile tout seul tant que le visiteur
 * n'y touche pas.
 */
export default function PricingCards() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const activeRef = useRef(1);
  const interacted = useRef(false);
  const [active, setActive] = useState(1);

  const scrollToCard = (i: number, behavior: ScrollBehavior = "smooth") => {
    const scroller = scrollerRef.current;
    const card = cardRefs.current[i];
    if (!scroller || !card) return;
    const left =
      card.offsetLeft - (scroller.clientWidth - card.clientWidth) / 2;
    scroller.scrollTo({ left, behavior });
  };

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const mobile = window.matchMedia("(max-width: 899px)");
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (mobile.matches) scrollToCard(1, "auto");

    // Carte active = la plus proche du centre
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const center = scroller.scrollLeft + scroller.clientWidth / 2;
        let best = 0;
        let bestDistance = Infinity;
        cardRefs.current.forEach((card, i) => {
          if (!card) return;
          const distance = Math.abs(
            card.offsetLeft + card.clientWidth / 2 - center,
          );
          if (distance < bestDistance) {
            bestDistance = distance;
            best = i;
          }
        });
        activeRef.current = best;
        setActive(best);
      });
    };
    const stop = () => {
      interacted.current = true;
    };
    scroller.addEventListener("scroll", onScroll, { passive: true });
    scroller.addEventListener("pointerdown", stop, { passive: true });
    scroller.addEventListener("touchstart", stop, { passive: true });
    scroller.addEventListener("wheel", stop, { passive: true });

    // Défilement automatique (mobile, visible à l'écran, sans interaction)
    let inView = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
      },
      { threshold: 0.5 },
    );
    observer.observe(scroller);
    const timer = window.setInterval(() => {
      if (!mobile.matches || reduced || interacted.current || !inView) return;
      scrollToCard((activeRef.current + 1) % packs.length);
    }, AUTOPLAY);

    return () => {
      cancelAnimationFrame(frame);
      window.clearInterval(timer);
      observer.disconnect();
      scroller.removeEventListener("scroll", onScroll);
      scroller.removeEventListener("pointerdown", stop);
      scroller.removeEventListener("touchstart", stop);
      scroller.removeEventListener("wheel", stop);
    };
  }, []);

  return (
    <>
      <div className="pricing" ref={scrollerRef}>
        {packs.map((pack, i) => (
          <article
            key={pack.id}
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
            className={`price-card ${pack.recommande ? "is-featured" : ""}`}
            aria-label={`Pack ${pack.nom}`}
          >
            <span className="price-badge">{pack.badge}</span>
            <h3 className="price-name">Pack {pack.nom}</h3>
            <p className="price-value num">
              {pack.prefixe ? <small>{pack.prefixe}</small> : null}
              {pack.prix}
            </p>
            <p className="price-unit">{pack.prixLabel}</p>
            <p className="price-intro">{pack.intro}</p>
            <div className="price-sep" aria-hidden="true" />
            <p className="price-features-title">{pack.featuresTitle}</p>
            <ul className="price-features">
              {pack.features.map((feature) => (
                <li key={feature}>
                  <Check className="h-4 w-4" aria-hidden="true" />
                  {feature}
                </li>
              ))}
            </ul>
            <Link
              href={`/contact?pack=${pack.id}`}
              className={`btn ${pack.recommande ? "btn-primary" : "btn-secondary"} btn-block`}
            >
              Choisir {pack.nom}
              <ArrowRight className="arrow h-4 w-4" aria-hidden="true" />
            </Link>
          </article>
        ))}
      </div>
      <div className="pricing-dots">
        {packs.map((pack, i) => (
          <button
            key={pack.id}
            type="button"
            aria-label={`Voir le pack ${pack.nom}`}
            aria-current={active === i}
            onClick={() => {
              interacted.current = true;
              scrollToCard(i);
            }}
          >
            <span />
          </button>
        ))}
      </div>
    </>
  );
}
