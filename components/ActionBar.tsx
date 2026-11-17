import Link from "next/link";
import { IconPhone, IconWhatsApp } from "@/components/icons";
import { PHONE_DISPLAY, PHONE_TEL, WHATSAPP_URL } from "@/lib/site";

/**
 * Barre d'actions fixée en bas de l'écran, sur mobile uniquement :
 * appeler, écrire sur WhatsApp, demander l'audit — toujours à portée de pouce.
 * Aucun JavaScript : elle est affichée ou masquée par le CSS seul
 * (y compris sur la page contact, où le bouton « Audit » disparaît).
 */
export default function ActionBar() {
  return (
    <nav className="actionbar" aria-label="Nous contacter">
      <a
        href={`tel:${PHONE_TEL}`}
        className="actionbar-item"
        aria-label={`Appeler le ${PHONE_DISPLAY}`}
      >
        <IconPhone size={18} />
        Appeler
      </a>
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="actionbar-item"
        aria-label="Écrire sur WhatsApp"
      >
        <IconWhatsApp size={18} />
        WhatsApp
      </a>
      <Link href="/contact" className="actionbar-cta">
        Audit gratuit
      </Link>
    </nav>
  );
}
