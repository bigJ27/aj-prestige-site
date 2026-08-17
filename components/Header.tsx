"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const links = [
  { href: "/", label: "Accueil" },
  { href: "/services", label: "Services" },
  { href: "/tarifs", label: "Tarifs" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? "border-night/10 bg-sand/90 shadow-[0_4px_24px_-12px_rgba(30,58,95,0.15)] backdrop-blur-md"
          : "border-transparent bg-sand/70 backdrop-blur-sm"
      }`}
    >
      <div className="container flex h-16 items-center justify-between md:h-20">
        <Link href="/" className="font-serif text-2xl font-bold tracking-wide">
          <span className="text-night">AJ</span>{" "}
          <span className="italic text-sunset">Prestige</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Navigation principale">
          {links.slice(0, 3).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium tracking-wide transition-colors ${
                pathname === link.href
                  ? "text-terracotta"
                  : "text-night hover:text-sunset"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/contact" className="btn-primary !px-6 !py-2.5">
            Audit gratuit
          </Link>
        </nav>

        <button
          type="button"
          className="text-night md:hidden"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={open}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <nav
          className="border-t border-night/10 bg-sand px-5 pb-8 pt-4 md:hidden"
          aria-label="Navigation mobile"
        >
          <ul className="space-y-1">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`block rounded-lg px-3 py-3 font-serif text-2xl ${
                    pathname === link.href ? "text-terracotta" : "text-night"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/contact" className="btn-primary mt-4 w-full">
            Demander un audit gratuit
          </Link>
        </nav>
      )}
    </header>
  );
}
