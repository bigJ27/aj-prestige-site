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
      <div className="hairline-gradient" aria-hidden="true" />
      <div className="container py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-serif text-2xl font-bold">
              AJ <span className="italic text-coral">Prestige</span>
            </p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-sand/70">
              Conciergerie Airbnb premium. Gestion complète de votre location
              courte durée en Val-d&apos;Oise et Île-de-France, depuis
              Soisy-sous-Montmorency.
            </p>
            <div className="mt-5 flex items-center gap-4">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sand/70 transition-colors hover:text-coral"
                aria-label={`Instagram ${INSTAGRAM_HANDLE}`}
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href={GOOGLE_BUSINESS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-sand/70 underline decoration-coral/50 underline-offset-4 transition-colors hover:text-coral"
              >
                Nos avis Google
              </a>
            </div>
          </div>

          <div>
            <h2 className="font-serif text-lg text-coral">Navigation</h2>
            <ul className="mt-4 space-y-2 text-sm">
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
          </div>

          <div>
            <h2 className="font-serif text-lg text-coral">
              Conciergerie Airbnb par ville
            </h2>
            <ul className="mt-4 space-y-2 text-sm">
              {villes.map((ville) => (
                <li key={ville.slug}>
                  <Link
                    href={`/${ville.slug}`}
                    className="text-sand/70 transition-colors hover:text-coral"
                  >
                    {ville.nom}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-serif text-lg text-coral">Contact</h2>
            <ul className="mt-4 space-y-3 text-sm">
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
