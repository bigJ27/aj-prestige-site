import type { Metadata } from "next";
import { Instagram, Mail, MapPin, Phone } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import {
  EMAIL,
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
  PHONE_DISPLAY,
  PHONE_TEL,
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

export default function ContactPage() {
  return (
    <>
      <section className="border-b border-coral/20 bg-sand-deep py-16 md:py-24">
        <div className="container max-w-3xl text-center">
          <p className="overline-label">Contact</p>
          <h1 className="mt-4 text-4xl md:text-5xl">
            Démarrons <em className="text-terracotta">ensemble.</em>
          </h1>
          <p className="mx-auto mt-6 max-w-xl leading-relaxed">
            Audit gratuit et estimation personnalisée de vos revenus
            potentiels. Nous vous répondons sous 24&nbsp;h avec une première
            analyse et les prochaines étapes.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <div className="rounded-xl border border-coral/25 bg-white p-7 md:p-10">
            <h2 className="text-3xl">Demander un audit gratuit</h2>
            <p className="mt-2 text-sm text-muted">
              Les champs marqués d&apos;un * sont obligatoires.
            </p>
            <div className="mt-8">
              <ContactForm />
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-xl border border-coral/25 bg-sand-deep p-8">
              <h2 className="text-2xl">Nous joindre directement</h2>
              <ul className="mt-6 space-y-5">
                <li>
                  <p className="text-xs font-medium uppercase tracking-widest text-muted">
                    Téléphone
                  </p>
                  <a
                    href={`tel:${PHONE_TEL}`}
                    className="mt-1 inline-flex items-center gap-2 font-medium text-night transition-colors hover:text-sunset"
                  >
                    <Phone className="h-4 w-4 text-sunset" aria-hidden="true" />
                    {PHONE_DISPLAY}
                  </a>
                </li>
                <li>
                  <p className="text-xs font-medium uppercase tracking-widest text-muted">
                    Email
                  </p>
                  <a
                    href={`mailto:${EMAIL}`}
                    className="mt-1 inline-flex items-center gap-2 break-all font-medium text-night transition-colors hover:text-sunset"
                  >
                    <Mail className="h-4 w-4 shrink-0 text-sunset" aria-hidden="true" />
                    {EMAIL}
                  </a>
                </li>
                <li>
                  <p className="text-xs font-medium uppercase tracking-widest text-muted">
                    Zone d&apos;intervention
                  </p>
                  <p className="mt-1 inline-flex items-center gap-2 font-medium text-night">
                    <MapPin className="h-4 w-4 text-sunset" aria-hidden="true" />
                    Soisy-sous-Montmorency & vallée de Montmorency
                  </p>
                </li>
                <li>
                  <p className="text-xs font-medium uppercase tracking-widest text-muted">
                    Instagram
                  </p>
                  <a
                    href={INSTAGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-flex items-center gap-2 font-medium text-night transition-colors hover:text-sunset"
                  >
                    <Instagram className="h-4 w-4 text-sunset" aria-hidden="true" />
                    {INSTAGRAM_HANDLE}
                  </a>
                </li>
              </ul>
            </div>

            <div className="rounded-xl border border-coral/25 bg-white p-8">
              <h3 className="font-serif text-xl text-night">
                Réponse rapide garantie
              </h3>
              <p className="mt-2 text-sm leading-relaxed">
                Nous vous répondons sous 24&nbsp;h avec une première estimation
                et les prochaines étapes. L&apos;audit est gratuit et sans
                engagement.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
