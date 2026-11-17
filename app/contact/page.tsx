import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import {
  IconClock,
  IconInstagram,
  IconMail,
  IconPhone,
  IconPin,
  IconWhatsApp,
} from "@/components/icons";
import Photo from "@/components/Photo";
import { photos } from "@/lib/photos";
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
    icon: IconPhone,
    label: "Téléphone",
    value: PHONE_DISPLAY,
    href: `tel:${PHONE_TEL}`,
  },
  {
    icon: IconWhatsApp,
    label: "WhatsApp — la réponse la plus rapide, 7 j/7",
    value: "Écrivez-nous",
    href: WHATSAPP_URL,
    external: true,
  },
  { icon: IconMail, label: "E-mail", value: EMAIL, href: `mailto:${EMAIL}` },
  {
    icon: IconInstagram,
    label: "Instagram",
    value: INSTAGRAM_HANDLE,
    href: INSTAGRAM_URL,
    external: true,
  },
  {
    icon: IconPin,
    label: "Zone d’intervention",
    value: "Soisy-sous-Montmorency et vallée de Montmorency",
  },
  {
    icon: IconClock,
    label: "Délai de réponse",
    value: "Sous 24 h, avec une première estimation",
  },
];

export default function ContactPage() {
  return (
    // data-page sert au CSS : sur cette page, la barre mobile masque son bouton « Audit »
    <div data-page="contact">
      <section className="page-hero !pb-[clamp(28px,4vw,48px)]">
        <div className="wrap">
          <p className="label">Contact</p>
          <h1 className="h-page">
            Parlons de <em>votre bien.</em>
          </h1>
          <p className="lead">
            Audit gratuit et estimation personnalisée de vos revenus. Nous
            vous répondons sous 24&nbsp;h avec une première analyse et les
            prochaines étapes.
          </p>
        </div>
      </section>

      <section className="pb-[clamp(72px,9vw,128px)]">
        <div className="wrap grid items-start gap-x-16 gap-y-14 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
          <div>
            <h2 className="h-card">Demander un audit gratuit</h2>
            <p className="small mt-2">
              Deux minutes suffisent. Seuls les champs marqués d’un * sont
              obligatoires.
            </p>
            <div className="mt-8">
              <ContactForm />
            </div>
          </div>

          <aside className="lg:sticky lg:top-[calc(var(--header-h)+32px)]">
            <h2 className="h-card">Nous joindre directement</h2>
            <ul className="contact-list mt-5">
              {contacts.map((item) => {
                const contenu = (
                  <>
                    <item.icon size={22} />
                    <span>
                      <small>{item.label}</small>
                      <strong className={item.href?.startsWith("tel:") ? "num" : undefined}>
                        {item.value}
                      </strong>
                    </span>
                  </>
                );
                return (
                  <li key={item.label}>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="contact-row"
                        {...(item.external
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                      >
                        {contenu}
                      </a>
                    ) : (
                      <div className="contact-row">{contenu}</div>
                    )}
                  </li>
                );
              })}
            </ul>

            <figure className="mt-8 hidden lg:block">
              <div className="photo aspect-[16/10]">
                <Photo
                  src={photos.lacPonton.src}
                  alt={photos.lacPonton.alt}
                  sizes="(max-width: 1023px) 0px, 460px"
                />
              </div>
              <figcaption className="photo-caption">
                Le lac d’Enghien, au cœur de notre zone d’intervention.
              </figcaption>
            </figure>
          </aside>
        </div>
      </section>
    </div>
  );
}
