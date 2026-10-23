"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, ChevronRight, Phone } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons";
import { PHONE_DISPLAY, PHONE_TEL, WHATSAPP_URL } from "@/lib/site";

const links = [
  { href: "/", label: "Accueil" },
  { href: "/services", label: "Services" },
  { href: "/tarifs", label: "Tarifs" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Ferme le menu à chaque changement de page
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Menu ouvert : on bloque le défilement, Échap pour fermer
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    firstLinkRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        burgerRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      root.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={`nav ${open ? "menu-open" : ""}`}
      data-scrolled={scrolled || open}
    >
      <div className="nav-edge" aria-hidden="true" />

      <nav className="nav-island glass" aria-label="Navigation principale">
        <Link href="/" className="nav-logo" aria-label="AJ Prestige — accueil">
          <Image src="/logo192.png" alt="" width={30} height={30} priority />
          <span className="wordmark">AJ Prestige</span>
        </Link>

        <ul className="nav-links">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="nav-link"
                aria-current={isActive(link.href) ? "page" : undefined}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="nav-actions">
          <Link href="/contact" className="btn btn-primary btn-sm nav-cta">
            Audit gratuit
          </Link>
          <button
            ref={burgerRef}
            type="button"
            className="nav-burger"
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={open}
            aria-controls="menu-mobile"
            onClick={() => setOpen((value) => !value)}
          >
            <span aria-hidden="true" />
          </button>
        </div>
      </nav>

      <div
        className="menu-scrim"
        aria-hidden="true"
        onClick={() => setOpen(false)}
      />
      <div
        id="menu-mobile"
        className="menu-sheet glass glass-solid"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        inert={!open}
      >
        <ul>
          {links.map((link, index) => (
            <li key={link.href}>
              <Link
                ref={index === 0 ? firstLinkRef : undefined}
                href={link.href}
                className="menu-link"
                aria-current={isActive(link.href) ? "page" : undefined}
                onClick={() => setOpen(false)}
              >
                {link.label}
                <ChevronRight className="h-5 w-5" aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
        <div className="menu-quick">
          <a
            href={`tel:${PHONE_TEL}`}
            aria-label={`Appeler le ${PHONE_DISPLAY}`}
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            Appeler
          </a>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
            <WhatsAppIcon className="h-4 w-4" />
            WhatsApp
          </a>
        </div>
        <div className="px-1.5">
          <Link
            href="/contact"
            className="btn btn-primary btn-block"
            onClick={() => setOpen(false)}
          >
            Demander un audit gratuit
            <ArrowRight className="arrow h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </header>
  );
}
