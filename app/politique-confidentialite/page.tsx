import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description:
    "Politique de confidentialité du site AJ Prestige : données collectées via le formulaire de contact, finalités, durée de conservation et droits RGPD.",
  alternates: { canonical: "/politique-confidentialite" },
  robots: { index: true, follow: true },
};

export default function PolitiqueConfidentialitePage() {
  return (
    <section className="pb-16 pt-32 md:pb-24 md:pt-40">
      <div className="container max-w-3xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-terracotta transition-colors hover:text-sunset"
        >
          <ArrowLeft className="h-4 w-4" />
          Retour à l&apos;accueil
        </Link>

        <h1 className="mt-8 text-4xl md:text-5xl">
          Politique de confidentialité
        </h1>
        <p className="mt-3 text-sm text-muted">Dernière mise à jour : août 2026</p>

        <div className="prose-legal mt-6">
          <h2>1. Introduction</h2>
          <p>
            AJ Prestige s&apos;engage à protéger la vie privée des utilisateurs
            de son site. Cette politique explique comment nous collectons,
            utilisons, stockons et protégeons vos données personnelles,
            conformément au Règlement Général sur la Protection des Données
            (RGPD).
          </p>

          <h2>2. Données collectées</h2>
          <p>Nous collectons les données suivantes via notre formulaire de contact :</p>
          <ul>
            <li>Nom et prénom</li>
            <li>Adresse email</li>
            <li>Numéro de téléphone</li>
            <li>Ville du bien</li>
            <li>Message libre</li>
          </ul>

          <h2>3. Finalités du traitement</h2>
          <p>Vos données sont collectées pour :</p>
          <ul>
            <li>Répondre à vos demandes de contact et d&apos;audit gratuit</li>
            <li>Vous fournir des informations sur nos services de conciergerie</li>
            <li>Établir un devis personnalisé</li>
            <li>Améliorer nos services</li>
          </ul>

          <h2>4. Base légale du traitement</h2>
          <p>
            Le traitement de vos données est fondé sur votre consentement
            explicite, donné lors de la soumission du formulaire de contact via
            la case à cocher prévue à cet effet.
          </p>

          <h2>5. Durée de conservation</h2>
          <p>
            Vos données sont conservées pendant une durée de 3 ans à compter de
            votre dernière interaction avec AJ Prestige, conformément aux
            recommandations de la CNIL.
          </p>

          <h2>6. Destinataires des données</h2>
          <p>
            Vos données sont uniquement accessibles par l&apos;équipe AJ
            Prestige. Elles ne sont en aucun cas vendues, louées ou partagées
            avec des tiers à des fins commerciales.
          </p>

          <h2>7. Vos droits</h2>
          <p>Conformément au RGPD, vous disposez des droits suivants :</p>
          <ul>
            <li>
              <strong>Droit d&apos;accès :</strong> obtenir une copie de vos
              données
            </li>
            <li>
              <strong>Droit de rectification :</strong> corriger vos données
              inexactes
            </li>
            <li>
              <strong>Droit à l&apos;effacement :</strong> demander la
              suppression de vos données
            </li>
            <li>
              <strong>Droit à la limitation :</strong> limiter le traitement de
              vos données
            </li>
            <li>
              <strong>Droit à la portabilité :</strong> récupérer vos données
              dans un format structuré
            </li>
            <li>
              <strong>Droit d&apos;opposition :</strong> vous opposer au
              traitement de vos données
            </li>
          </ul>
          <p>
            Pour exercer ces droits, contactez-nous à :{" "}
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          </p>

          <h2>8. Sécurité des données</h2>
          <p>
            Nous mettons en œuvre des mesures techniques et organisationnelles
            appropriées pour protéger vos données contre tout accès non
            autorisé, modification, divulgation ou destruction.
          </p>

          <h2>9. Cookies et mesure d&apos;audience</h2>
          <p>
            Ce site n&apos;utilise pas de cookie publicitaire. Une mesure
            d&apos;audience anonyme (Google Analytics) peut être activée pour
            comprendre l&apos;usage du site et l&apos;améliorer.
          </p>

          <h2>10. Modifications</h2>
          <p>
            Cette politique de confidentialité peut être mise à jour. La date
            de dernière mise à jour est indiquée en haut de cette page.
          </p>

          <h2>11. Contact et réclamation</h2>
          <p>
            Pour toute question concernant cette politique :{" "}
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>. Vous pouvez également
            introduire une réclamation auprès de la CNIL :{" "}
            <a
              href="https://www.cnil.fr"
              target="_blank"
              rel="noopener noreferrer"
            >
              www.cnil.fr
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
