import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { EMAIL, SIREN } from "@/lib/site";

export const metadata: Metadata = {
  title: "Mentions légales",
  description:
    "Mentions légales du site AJ Prestige, conciergerie de location courte durée à Soisy-sous-Montmorency (SIREN 989 871 991).",
  alternates: { canonical: "/mentions-legales" },
  robots: { index: true, follow: true },
};

export default function MentionsLegalesPage() {
  return (
    <section className="py-16 md:py-24">
      <div className="container max-w-3xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-terracotta transition-colors hover:text-sunset"
        >
          <ArrowLeft className="h-4 w-4" />
          Retour à l&apos;accueil
        </Link>

        <h1 className="mt-8 text-4xl md:text-5xl">Mentions légales</h1>
        <p className="mt-3 text-sm text-muted">Dernière mise à jour : août 2026</p>

        <div className="prose-legal mt-6">
          <h2>1. Éditeur du site</h2>
          <p>
            <strong>AJ Prestige</strong>
            <br />
            Conciergerie de location courte durée
            <br />
            Micro-entreprise — SIREN {SIREN}
            <br />
            Soisy-sous-Montmorency, Val-d&apos;Oise, Île-de-France
            <br />
            Email : <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          </p>

          <h2>2. Hébergement</h2>
          <p>
            Ce site est hébergé par Vercel Inc., 440 N Barranca Ave #4133,
            Covina, CA 91723, États-Unis (
            <a
              href="https://vercel.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              vercel.com
            </a>
            ).
          </p>

          <h2>3. Propriété intellectuelle</h2>
          <p>
            L&apos;ensemble du contenu de ce site (textes, images, graphismes,
            logo, icônes) est la propriété exclusive d&apos;AJ Prestige, à
            l&apos;exception des marques, logos ou contenus appartenant à
            d&apos;autres sociétés partenaires ou auteurs.
          </p>
          <p>
            Toute reproduction, distribution, modification, adaptation,
            retransmission ou publication, même partielle, de ces différents
            éléments est strictement interdite sans l&apos;accord exprès par
            écrit d&apos;AJ Prestige.
          </p>

          <h2>4. Limitation de responsabilité</h2>
          <p>
            AJ Prestige s&apos;efforce d&apos;assurer l&apos;exactitude et la
            mise à jour des informations diffusées sur ce site, mais ne peut
            garantir l&apos;exactitude, la précision ou l&apos;exhaustivité des
            informations mises à disposition. En conséquence, AJ Prestige
            décline toute responsabilité pour les éventuelles imprécisions,
            inexactitudes ou omissions portant sur des informations disponibles
            sur ce site.
          </p>

          <h2>5. Liens hypertextes</h2>
          <p>
            Le site peut contenir des liens hypertextes vers d&apos;autres
            sites. AJ Prestige n&apos;exerce aucun contrôle sur ces sites et
            décline toute responsabilité quant à leur contenu.
          </p>

          <h2>6. Droit applicable</h2>
          <p>
            Les présentes mentions légales sont régies par le droit français.
            En cas de litige, les tribunaux français seront seuls compétents.
          </p>

          <h2>7. Contact</h2>
          <p>
            Pour toute question concernant ces mentions légales :{" "}
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          </p>
        </div>
      </div>
    </section>
  );
}
