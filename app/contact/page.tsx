import type { Metadata } from "next";
import { Clock, Instagram, Mail, MapPin, Phone } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import Reveal from "@/components/Reveal";
import { WhatsAppIcon } from "@/components/icons";
import {
  EMAIL,
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
  PHONE_DISPLAY,
  PHONE_TEL,
  WHATSAPP_URL,
} from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact — audit gratuit de votre bien",
  description:
    "Contactez AJ Prestige pour un audit gratuit de votre location courte durée en Val-d'Oise et Île-de-France : estimation des revenus, visite du bien, réponse sous 24 h.",
  alternates: { canonical: "/contact" },
  openGraph: {
    url: "/contact",
    title: "Contact | AJ Prestige",
    description:
      "Audit gratuit et estimation personnalisée de vos revenus potentiels. Réponse sous 24 h.",
  },
};

const contacts = [
  {
    icon: Phone,
    label: "Téléphone",
    value: PHONE_DISPLAY,
    href: `tel:${PHONE_TEL}`,
  },
  { icon: Mail, label: "Email", value: EMAIL, href: `mailto:${EMAIL}` },
  {
    icon: Instagram,
    label: "Instagram",
    value: INSTAGRAM_HANDLE,
    href: INSTAGRAM_URL,
    external: true,
  },
  {
    icon: MapPin,
    label: "Zone d’intervention",
    value: "Soisy-sous-Montmorency & vallée de Montmorency",
  },
];

export default function ContactPage() {
  return (
    <>
      <section className="page-hero !pb-[clamp(40px,5vw,64px)]">
        <div className="aurora" aria-hidden="true" />
        <Reveal className="shell-narrow">
          <span className="eyebrow">Contact</span>
          <h1 className="display-xl mt-4">
            Démarrons <span className="text-gradient">ensemble.</span>
          </h1>
          <p className="lead mx-auto mt-6 max-w-xl">
            Audit gratuit et estimation personnalisée de vos revenus. Nous vous
            répondons sous 24 h avec une première analyse et les prochaines
            étapes.
          </p>
        </Reveal>
      </section>

      <section className="bg-sand-soft pb-[clamp(72px,9vw,120px)]">
        <div className="shell grid items-start gap-5 lg:grid-cols-[1.45fr_1fr]">
          <Reveal>
            <div className="form-card">
              <h2 className="headline">Demander un audit gratuit</h2>
              <p className="body-2 mt-2">
                Deux minutes suffisent. Les champs marqués d’un * sont
                obligatoires.
              </p>
              <div className="mt-8">
                <ContactForm />
              </div>
            </div>
          </Reveal>

          <Reveal delay={120} className="grid gap-5 lg:sticky lg:top-28">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="info-card flex items-center gap-4"
            >
              <span className="wa-dot !h-12 !w-12">
                <WhatsAppIcon className="h-6 w-6" />
              </span>
              <span>
                <strong className="block text-[17px] font-semibold">
                  Écrivez-nous sur WhatsApp
                </strong>
                <span className="body-2">La réponse la plus rapide, 7j/7.</span>
              </span>
            </a>

            <div className="info-card">
              <h2 className="title mb-2">Nous joindre directement</h2>
              <ul>
                {contacts.map((item) => {
                  const content = (
                    <>
                      <span className="info-icon">
                        <item.icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <span>
                        <small>{item.label}</small>
                        <strong>{item.value}</strong>
                      </span>
                    </>
                  );
                  return (
                    <li key={item.label}>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="info-row"
                          {...(item.external
                            ? { target: "_blank", rel: "noopener noreferrer" }
                            : {})}
                        >
                          {content}
                        </a>
                      ) : (
                        <div className="info-row">{content}</div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="info-card flex gap-4">
              <span className="info-icon">
                <Clock className="h-5 w-5" aria-hidden="true" />
              </span>
              <p className="body-2">
                <strong className="block font-semibold text-label">
                  Réponse sous 24 h
                </strong>
                Une première estimation et les prochaines étapes. L’audit est
                gratuit et sans engagement.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
