"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const links = [
  { href: "/", label: "Accueil" },
  { href: "/services", label: "Services" },
  { href: "/tarifs", label: "Tarifs" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  // L'îlot est opaque en haut de page, puis devient translucide
  // une fois le hero dépassé.
  const [pastHero, setPastHero] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > window.innerHeight * 0.65);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="fixed inset-x-3 top-3 z-50 flex justify-center md:top-4">
      <div
        className={`w-full max-w-3xl border transition-all duration-500 ${
          open ? "rounded-3xl" : "rounded-full"
        } ${
          pastHero && !open
            ? "border-white/40 bg-white/55 shadow-[0_8px_30px_-16px_rgba(27,73,101,0.35)] backdrop-blur-md"
            : "border-muted/10 bg-white/95 shadow-[0_14px_40px_-18px_rgba(27,73,101,0.4)]"
        }`}
      >
        <div className="flex h-14 items-center justify-between pl-3 pr-2 md:h-16 md:pl-4 md:pr-2.5">
          <Link href="/" className="flex items-center gap-2.5">
            <Image
              src="/logo192.png"
              alt=""
              width={38}
              height={38}
              className="h-9 w-9 md:h-10 md:w-10"
            />
            <span className="font-serif text-lg font-bold tracking-wide text-night md:text-xl">
              AJ <em className="text-terracotta">Prestige</em>
            </span>
          </Link>

          <nav className="hidden items-center gap-7 md:flex" aria-label="Navigation principale">
            {links.slice(0, 3).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium tracking-wide transition-colors ${
                  pathname === link.href
                    ? "text-terracotta"
                    : "text-night hover:text-terracotta"
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
            className="pr-2 text-night md:hidden"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={open}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {open && (
          <nav
            className="border-t border-muted/10 px-5 pb-6 pt-3 md:hidden"
            aria-label="Navigation mobile"
          >
            <ul>
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`block py-2.5 font-serif text-2xl ${
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
      </div>
    </header>
  );
}
