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

/**
 * Pied de page. Ses liens ont prefetch={false} : sans cela, Next.js
 * téléchargerait en arrière-plan les 14 pages liées dès que le pied de page
 * apparaît à l'écran — inutile, et coûteux en données mobiles.
 */
export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link href="/" className="brand" aria-label="AJ Prestige — accueil">
              <img src="/logo.webp" alt="" width={30} height={40} />
              <span className="brand-name text-ink">AJ Prestige</span>
            </Link>
            <p className="mt-4">
              Conciergerie de location courte durée. Gestion complète de votre
              bien en Val-d’Oise et en Île-de-France, depuis
              Soisy-sous-Montmorency.
            </p>
            <p className="footer-links mt-3">
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
            <h2 className="footer-title">Le site</h2>
            <ul>
              <li>
                <Link prefetch={false} href="/">Accueil</Link>
              </li>
              <li>
                <Link prefetch={false} href="/services">Nos services</Link>
              </li>
              <li>
                <Link prefetch={false} href="/tarifs">Tarifs et packs</Link>
              </li>
              <li>
                <Link prefetch={false} href="/contact">Audit gratuit</Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="footer-title">Conciergerie par ville</h2>
            <ul>
              {villes.map((ville) => (
                <li key={ville.slug}>
                  <Link prefetch={false} href={`/${ville.slug}`}>{ville.nom}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="footer-title">Contact</h2>
            <ul>
              <li>
                <a href={`tel:${PHONE_TEL}`} className="num">
                  {PHONE_DISPLAY}
                </a>
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
              <li className="pt-1.5">Soisy-sous-Montmorency, Val-d’Oise</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} AJ Prestige — micro-entreprise,{" "}
            <span className="whitespace-nowrap">SIREN {SIREN}</span>
          </p>
          <p className="footer-links">
            <Link prefetch={false} href="/mentions-legales">Mentions légales</Link>
            <Link prefetch={false} href="/politique-confidentialite">Confidentialité</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
