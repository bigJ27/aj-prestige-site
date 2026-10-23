import Image from "next/image";
import Link from "next/link";
import { villes } from "@/lib/villes";
import {
  EMAIL,
  GOOGLE_BUSINESS_URL,
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
  PHONE_DISPLAY,
  PHONE_TEL,
  SIREN,
  WHATSAPP_URL,
} from "@/lib/site";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="shell">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5"
              aria-label="AJ Prestige — accueil"
            >
              <Image src="/logo192.png" alt="" width={34} height={34} />
              <span className="wordmark !text-[20px]">AJ Prestige</span>
            </Link>
            <p className="mt-4 max-w-xs">
              Conciergerie Airbnb premium. Gestion complète de votre location
              courte durée en Val-d’Oise et Île-de-France, depuis
              Soisy-sous-Montmorency.
            </p>
            <p className="mt-4 flex flex-wrap gap-x-4 gap-y-1">
              <a
                href={GOOGLE_BUSINESS_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                Nos avis Google
              </a>
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
                Instagram {INSTAGRAM_HANDLE}
              </a>
            </p>
          </div>

          <div>
            <h2>Navigation</h2>
            <ul>
              <li>
                <Link href="/">Accueil</Link>
              </li>
              <li>
                <Link href="/services">Nos services</Link>
              </li>
              <li>
                <Link href="/tarifs">Tarifs & packs</Link>
              </li>
              <li>
                <Link href="/contact">Audit gratuit</Link>
              </li>
            </ul>
          </div>

          <div>
            <h2>Conciergerie par ville</h2>
            <ul>
              {villes.map((ville) => (
                <li key={ville.slug}>
                  <Link href={`/${ville.slug}`}>{ville.nom}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2>Contact</h2>
            <ul>
              <li>
                <a href={`tel:${PHONE_TEL}`}>{PHONE_DISPLAY}</a>
              </li>
              <li>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp
                </a>
              </li>
              <li>
                <a href={`mailto:${EMAIL}`} className="break-all">
                  {EMAIL}
                </a>
              </li>
              <li>Soisy-sous-Montmorency, Val-d’Oise</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} AJ Prestige — Micro-entreprise,{" "}
            <span className="whitespace-nowrap">SIREN {SIREN}</span>.
          </p>
          <p className="flex flex-wrap gap-x-5 gap-y-1">
            <Link href="/mentions-legales">Mentions légales</Link>
            <Link href="/politique-confidentialite">Confidentialité</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
