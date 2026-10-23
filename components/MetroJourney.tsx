"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Play, RotateCcw } from "lucide-react";
import Reveal from "@/components/Reveal";
import { parcours } from "@/lib/content";

const STEP = 2000; // une station toutes les 2 secondes
const TRAVEL = 900; // durée d'un trajet entre deux stations (cf. CSS .metro-train)

type Geo = { top: number; bottom: number; ys: number[] };
type StopState = "upcoming" | "done" | "active";

/**
 * Ligne de métro verticale : un « train » lumineux part de la première
 * station et s'arrête à chacune (2 s), qui s'illumine à son arrivée.
 * Survol = mise en valeur ; clic = le train y va directement.
 */
export default function MetroJourney() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const timers = useRef<number[]>([]);
  const last = parcours.length - 1;

  const [geo, setGeo] = useState<Geo | null>(null);
  const [index, setIndex] = useState(-1);
  const [prevIndex, setPrevIndex] = useState(-1);
  const [arrived, setArrived] = useState(false);
  const [moving, setMoving] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [finished, setFinished] = useState(false);
  const [paused, setPaused] = useState(false);
  const [instant, setInstant] = useState(false);
  const [reduced, setReduced] = useState(false);

  const later = (fn: () => void, ms: number) => {
    timers.current.push(window.setTimeout(fn, ms));
  };
  const clearTimers = () => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  };

  /* ---- Mesure de la position des stations ---- */
  const measure = useCallback(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const base = wrap.getBoundingClientRect().top;
    const ys = nodeRefs.current.map((node) =>
      node
        ? node.getBoundingClientRect().top - base + node.offsetHeight / 2
        : 0,
    );
    if (ys.length < 2) return;
    setGeo({ top: ys[0], bottom: ys[ys.length - 1], ys });
  }, []);

  useEffect(() => {
    measure();
    const observer = new ResizeObserver(measure);
    if (wrapRef.current) observer.observe(wrapRef.current);
    document.fonts?.ready.then(measure).catch(() => undefined);
    return () => observer.disconnect();
  }, [measure]);

  /* ---- Déplacement du train ---- */
  const goTo = useCallback((target: number, from: number) => {
    setPrevIndex(from);
    setIndex(target);
    setArrived(false);
    setMoving(true);
    later(() => {
      setMoving(false);
      setArrived(true);
    }, TRAVEL);
  }, []);

  const start = useCallback(() => {
    clearTimers();
    setInstant(true);
    setPrevIndex(-1);
    setIndex(0);
    setArrived(false);
    setMoving(false);
    setFinished(false);
    setPaused(false);
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        setInstant(false);
        setArrived(true);
        setPlaying(true);
      }),
    );
  }, []);

  // Arrivé en gare : on repart après le temps d'arrêt
  useEffect(() => {
    if (!playing || !arrived || index < 0) return;
    if (index >= last) {
      setPlaying(false);
      setFinished(true);
      return;
    }
    const dwell = index === 0 ? STEP - 300 : STEP - TRAVEL;
    const timer = window.setTimeout(() => goTo(index + 1, index), dwell);
    return () => window.clearTimeout(timer);
  }, [playing, arrived, index, last, goTo]);

  /* ---- Lancement à l'arrivée à l'écran, pause en dehors ---- */
  const finishedRef = useRef(false);
  const pausedRef = useRef(false);
  useEffect(() => {
    finishedRef.current = finished;
  }, [finished]);
  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) {
      setReduced(true);
      setIndex(last);
      setArrived(true);
      return;
    }
    const wrap = wrapRef.current;
    if (!wrap) return;
    let hasStarted = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!hasStarted) {
            hasStarted = true;
            later(start, 350);
          } else if (finishedRef.current) {
            later(start, 250);
          } else if (!pausedRef.current) {
            setPlaying(true);
          }
        } else {
          setPlaying(false);
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(wrap);
    return () => {
      observer.disconnect();
      clearTimers();
    };
  }, [last, start]);

  /* ---- Interaction : clic sur une station ---- */
  const select = (target: number) => {
    if (reduced || target === index) return;
    clearTimers();
    setPlaying(false);
    setFinished(false);
    setPaused(true);
    goTo(target, index);
  };

  const resume = () => {
    if (index >= last) {
      start();
      return;
    }
    setPaused(false);
    setPlaying(true);
    if (arrived) {
      // relance immédiate depuis la station courante
      goTo(index + 1, index);
    }
  };

  const stateOf = (i: number): StopState => {
    if (reduced) return i === last ? "active" : "done";
    if (index < 0 || i > index) return "upcoming";
    if (i < index) return "done";
    return arrived ? "active" : "upcoming";
  };

  const trainY = geo ? geo.ys[Math.max(index, 0)] : 0;
  const fill = geo && index >= 0 ? geo.ys[index] - geo.top : 0;
  const goingUp = prevIndex > index;
  // Au (re)départ, le train apparaît en fondu sans glisser depuis l'ancienne position
  const noTransition = instant ? { transition: "none" } : undefined;
  const trainInstant = instant
    ? { transition: "opacity 0.5s ease" }
    : undefined;

  return (
    <section
      className="bg-sand-soft pb-3 md:pb-5"
      aria-labelledby="parcours-title"
    >
      <div className="panel-dark metro-wrap">
        <div className="metro-glow metro-glow-1" aria-hidden="true" />
        <div className="metro-glow metro-glow-2" aria-hidden="true" />

        <div className="shell-narrow">
          <Reveal className="section-head">
            <span className="eyebrow eyebrow-dark">Votre parcours</span>
            <h2 id="parcours-title" className="display mt-3">
              De la prise de contact <br className="hidden md:block" />
              <span className="text-gradient-dark">
                à vos premiers revenus.
              </span>
            </h2>
            <p className="lead lead-dark mt-5">
              Un seul interlocuteur, six étapes claires. Suivez le train.
            </p>
          </Reveal>

          <div className="metro" ref={wrapRef}>
            {geo && (
              <div
                className="metro-track"
                style={{ top: geo.top, height: geo.bottom - geo.top }}
                aria-hidden="true"
              >
                <div
                  className="metro-fill"
                  style={{ height: fill, ...noTransition }}
                />
              </div>
            )}
            {geo && !reduced && (
              <div
                className="metro-train"
                data-moving={moving}
                data-dir={goingUp ? "up" : "down"}
                data-final={index === last && arrived}
                style={{
                  transform: `translateY(${trainY}px)`,
                  opacity: index < 0 ? 0 : 1,
                  ...trainInstant,
                }}
                aria-hidden="true"
              />
            )}

            <ol>
              {parcours.map((station, i) => (
                <li
                  key={station.titre}
                  className="metro-stop"
                  data-state={stateOf(i)}
                  data-final={i === last}
                  onClick={() => select(i)}
                >
                  <span
                    className="metro-node"
                    ref={(el) => {
                      nodeRefs.current[i] = el;
                    }}
                    aria-hidden="true"
                  >
                    <i />
                    <b />
                  </span>
                  <div className="metro-body">
                    <span className="metro-num">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="metro-title">
                      <button
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation();
                          select(i);
                        }}
                        aria-current={
                          stateOf(i) === "active" ? "step" : undefined
                        }
                      >
                        {station.titre}
                      </button>
                    </h3>
                    <p className="metro-desc">{station.texte}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="metro-cta">
            <Link href="/contact" className="btn btn-primary btn-lg">
              Toucher mes premiers revenus
              <ArrowRight className="arrow h-4 w-4" aria-hidden="true" />
            </Link>
            {!reduced && (finished || paused) && (
              <button type="button" className="metro-replay" onClick={resume}>
                {finished || index >= last ? (
                  <RotateCcw className="h-4 w-4" aria-hidden="true" />
                ) : (
                  <Play className="h-4 w-4" aria-hidden="true" />
                )}
                {finished || index >= last
                  ? "Rejouer le parcours"
                  : "Reprendre"}
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
