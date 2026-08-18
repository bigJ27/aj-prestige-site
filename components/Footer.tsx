import Link from "next/link";
import { Instagram, Mail, MapPin, Phone } from "lucide-react";
import { villes } from "@/lib/villes";
import {
  EMAIL,
  GOOGLE_BUSINESS_URL,
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
  PHONE_DISPLAY,
  PHONE_TEL,
  SIREN,
} from "@/lib/site";

export default function Footer() {
  return (
    <footer className="bg-night text-sand">
      {/* Filet dégradé sunset — autorisé dans le footer */}
      <div className="hairline-gradient" aria-hidden="true" />

      <div className="container pb-12 pt-16 md:pt-20">
        {/* En-tête éditorial du footer */}
        <div className="flex flex-col gap-8 border-b border-sand/15 pb-12 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="font-serif text-4xl font-bold md:text-5xl">
              AJ <em className="text-coral">Prestige</em>
            </p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-sand/70">
              Conciergerie Airbnb premium. Gestion complète de votre location
              courte durée en Val-d&apos;Oise et Île-de-France, depuis
              Soisy-sous-Montmorency.
            </p>
          </div>
          <Link
            href="/contact"
            className="btn-on-dark self-start lg:self-auto"
          >
            Demander un audit gratuit
          </Link>
        </div>

        {/* Colonnes */}
        <div className="grid gap-12 pt-12 md:grid-cols-2 lg:grid-cols-12">
          <nav className="lg:col-span-3" aria-label="Navigation du site">
            <h2 className="text-xs font-medium uppercase tracking-[0.24em] text-coral">
              Navigation
            </h2>
            <ul className="mt-5 space-y-2.5 text-sm">
              {[
                { href: "/", label: "Accueil" },
                { href: "/services", label: "Nos services" },
                { href: "/tarifs", label: "Tarifs & packs" },
                { href: "/contact", label: "Contact & audit gratuit" },
                { href: "/mentions-legales", label: "Mentions légales" },
                {
                  href: "/politique-confidentialite",
                  label: "Politique de confidentialité",
                },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sand/70 transition-colors hover:text-coral"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="lg:col-span-5" aria-label="Conciergerie Airbnb par ville">
            <h2 className="text-xs font-medium uppercase tracking-[0.24em] text-coral">
              Conciergerie Airbnb par ville
            </h2>
            <ul className="mt-5 grid grid-cols-1 gap-x-8 gap-y-2.5 text-sm sm:grid-cols-2">
              {villes.map((ville, index) => (
                <li key={ville.slug}>
                  <Link
                    href={`/${ville.slug}`}
                    className="group inline-flex items-baseline gap-2.5 text-sand/70 transition-colors hover:text-coral"
                  >
                    <span className="font-serif text-xs italic text-sand/40 transition-colors group-hover:text-coral/70">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {ville.nom}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3 lg:col-start-10">
            <h2 className="text-xs font-medium uppercase tracking-[0.24em] text-coral">
              Contact
            </h2>
            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <a
                  href={`tel:${PHONE_TEL}`}
                  className="inline-flex items-center gap-2 text-sand/70 transition-colors hover:text-coral"
                >
                  <Phone className="h-4 w-4 shrink-0" />
                  {PHONE_DISPLAY}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${EMAIL}`}
                  className="inline-flex items-center gap-2 break-all text-sand/70 transition-colors hover:text-coral"
                >
                  <Mail className="h-4 w-4 shrink-0" />
                  {EMAIL}
                </a>
              </li>
              <li className="inline-flex items-center gap-2 text-sand/70">
                <MapPin className="h-4 w-4 shrink-0" />
                Soisy-sous-Montmorency, Val-d&apos;Oise
              </li>
              <li className="pt-2">
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sand/70 transition-colors hover:text-coral"
                  aria-label={`Instagram ${INSTAGRAM_HANDLE}`}
                >
                  <Instagram className="h-4 w-4 shrink-0" />
                  {INSTAGRAM_HANDLE}
                </a>
              </li>
              <li>
                <a
                  href={GOOGLE_BUSINESS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sand/70 underline decoration-coral/50 underline-offset-4 transition-colors hover:text-coral"
                >
                  Nos avis Google
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-sand/15 pt-6 text-xs text-sand/50 sm:flex-row">
          <p>
            © {new Date().getFullYear()} AJ Prestige — Micro-entreprise, SIREN{" "}
            {SIREN}. Tous droits réservés.
          </p>
          <p>Conciergerie Airbnb en Val-d&apos;Oise & Île-de-France</p>
        </div>
      </div>
    </footer>
  );
}
