import Link from "next/link";
import Photo from "@/components/Photo";
import { IconArrow, IconPhone, IconWhatsApp } from "@/components/icons";
import { photos } from "@/lib/photos";
import { PHONE_DISPLAY, PHONE_TEL, WHATSAPP_URL } from "@/lib/site";
import { typo } from "@/lib/typo";

type Props = {
  title: React.ReactNode;
  subtitle?: string;
};

/** Appel à l'action de fin de page : audit gratuit, téléphone, WhatsApp. */
export default function CtaBand({ title, subtitle }: Props) {
  return (
    <section className="section bg-pine" aria-labelledby="cta-titre">
      <div className="wrap cta-grid">
        <div>
          <p className="label">Audit gratuit, sans engagement</p>
          <h2 id="cta-titre" className="h-section">
            {title}
          </h2>
          {subtitle ? <p className="lead">{typo(subtitle)}</p> : null}
          <div className="cta-actions">
            <Link href="/contact" className="btn btn-light">
              Demander un audit gratuit
              <IconArrow size={18} />
            </Link>
            <a href={`tel:${PHONE_TEL}`} className="btn btn-outline-light num">
              <IconPhone size={18} />
              {PHONE_DISPLAY}
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline-light"
            >
              <IconWhatsApp size={18} />
              WhatsApp
            </a>
          </div>
        </div>

        <figure>
          <div className="photo cta-photo">
            <Photo
              src={photos.lacSoir.src}
              alt={photos.lacSoir.alt}
              sizes="(max-width: 959px) 100vw, 480px"
            />
          </div>
          <figcaption className="photo-caption">
            Le lac d’Enghien au coucher du soleil, à quelques minutes de notre
            base.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
