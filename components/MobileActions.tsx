"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons";
import { PHONE_DISPLAY, PHONE_TEL, WHATSAPP_URL } from "@/lib/site";

/**
 * Mobile : barre d'actions flottante (Appeler · WhatsApp · Audit gratuit),
 * qui se compacte quand on fait défiler vers le bas.
 * Ordinateur : bouton WhatsApp flottant en bas à droite.
 */
export default function MobileActions() {
  const pathname = usePathname();
  const [compact, setCompact] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      // La barre apparaît une fois les boutons du haut de page dépassés
      setVisible(y > window.innerHeight * 0.55);
      if (Math.abs(y - last) < 12) return;
      setCompact(y > last && y > 320);
      last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  const onContact = pathname === "/contact";

  return (
    <>
      <nav
        className="dock glass"
        aria-label="Actions rapides"
        data-compact={compact}
        data-hidden={!visible}
        inert={!visible}
      >
        <a
          href={`tel:${PHONE_TEL}`}
          className="dock-btn"
          aria-label={`Appeler le ${PHONE_DISPLAY}`}
        >
          <Phone className="h-[18px] w-[18px]" aria-hidden="true" />
          <span className="dock-label">Appeler</span>
        </a>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="dock-btn"
          aria-label="Écrire sur WhatsApp"
        >
          <WhatsAppIcon className="h-[18px] w-[18px]" />
          <span className="dock-label">WhatsApp</span>
        </a>
        {!onContact && (
          <Link href="/contact" className="btn btn-primary btn-sm">
            Audit gratuit
          </Link>
        )}
      </nav>

      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="wa-float glass"
        aria-label="Nous écrire sur WhatsApp"
      >
        <span className="wa-dot">
          <WhatsAppIcon className="h-4 w-4" />
        </span>
        WhatsApp
      </a>
    </>
  );
}
