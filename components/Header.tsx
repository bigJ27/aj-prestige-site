"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  IconArrow,
  IconClose,
  IconMenu,
  IconPhone,
  IconWhatsApp,
} from "@/components/icons";
import { PHONE_DISPLAY, PHONE_TEL, WHATSAPP_URL } from "@/lib/site";

const liens = [
  { href: "/services", label: "Services" },
  { href: "/tarifs", label: "Tarifs" },
  { href: "/#zone", label: "Zone d’intervention" },
  { href: "/contact", label: "Contact" },
];

/**
 * En-tête du site. C'est l'un des rares composants « client » (qui embarque
 * du JavaScript) : il doit savoir quelle page est affichée et ouvrir le menu
 * sur mobile. Fond plein, aucun effet de flou : il ne coûte rien au défilement.
 */
export default function Header() {
  const pathname = usePathname();
  const [ouvert, setOuvert] = useState(false);
  const boutonRef = useRef<HTMLButtonElement>(null);
  const fermerRef = useRef<HTMLButtonElement>(null);

  // Le menu se referme à chaque changement de page
  useEffect(() => {
    setOuvert(false);
  }, [pathname]);

  // Menu ouvert : la page derrière ne défile plus, Échap referme
  useEffect(() => {
    if (!ouvert) return;
    const racine = document.documentElement;
    const precedent = racine.style.overflow;
    racine.style.overflow = "hidden";
    fermerRef.current?.focus();
    const surTouche = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOuvert(false);
        boutonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", surTouche);
    return () => {
      racine.style.overflow = precedent;
      window.removeEventListener("keydown", surTouche);
    };
  }, [ouvert]);

  const estActif = (href: string) => {
    if (href === "/#zone") return pathname.startsWith("/conciergerie-airbnb-");
    return pathname.startsWith(href);
  };

  const fermer = () => {
    setOuvert(false);
    boutonRef.current?.focus();
  };

  return (
    <>
      <header className="site-header">
        <div className="wrap site-header-inner">
          <Link href="/" className="brand" aria-label="AJ Prestige — accueil">
            <img src="/logo.webp" alt="" width={30} height={40} />
            <span className="brand-name">AJ Prestige</span>
          </Link>

          <nav className="nav" aria-label="Navigation principale">
            {liens.map((lien) => (
              <Link
                key={lien.href}
                href={lien.href}
                className="nav-link"
                aria-current={estActif(lien.href) ? "page" : undefined}
              >
                {lien.label}
              </Link>
            ))}
          </nav>

          <div className="header-actions">
            <a href={`tel:${PHONE_TEL}`} className="header-phone num">
              <IconPhone size={18} />
              {PHONE_DISPLAY}
            </a>
            <Link href="/contact" className="btn btn-primary btn-sm header-cta">
              Audit gratuit
            </Link>
            <button
              ref={boutonRef}
              type="button"
              className="menu-toggle"
              aria-expanded={ouvert}
              aria-controls="menu-mobile"
              onClick={() => setOuvert(true)}
            >
              Menu
              <IconMenu size={18} />
            </button>
          </div>
        </div>
      </header>

      <div
        id="menu-mobile"
        className="menu-panel"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        data-open={ouvert}
        inert={!ouvert}
      >
        <div className="wrap menu-top">
          <Link
            href="/"
            className="brand"
            aria-label="AJ Prestige — accueil"
            onClick={() => setOuvert(false)}
          >
            <img src="/logo.webp" alt="" width={30} height={40} />
            <span className="brand-name">AJ Prestige</span>
          </Link>
          <button
            ref={fermerRef}
            type="button"
            className="menu-toggle"
            onClick={fermer}
          >
            Fermer
            <IconClose size={18} />
          </button>
        </div>

        <nav className="wrap menu-links" aria-label="Menu principal">
          {[{ href: "/", label: "Accueil" }, ...liens].map((lien) => (
            <Link
              key={lien.href}
              href={lien.href}
              className="menu-link"
              aria-current={
                (lien.href === "/" ? pathname === "/" : estActif(lien.href))
                  ? "page"
                  : undefined
              }
              onClick={() => setOuvert(false)}
            >
              {lien.label}
              <IconArrow size={22} />
            </Link>
          ))}
        </nav>

        <div className="wrap menu-contact">
          <a href={`tel:${PHONE_TEL}`} className="btn btn-secondary">
            <IconPhone size={18} />
            Appeler
          </a>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary"
          >
            <IconWhatsApp size={18} />
            WhatsApp
          </a>
          <Link
            href="/contact"
            className="btn btn-primary"
            onClick={() => setOuvert(false)}
          >
            Demander un audit gratuit
            <IconArrow size={18} />
          </Link>
        </div>
      </div>
    </>
  );
}
