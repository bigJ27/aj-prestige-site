import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <section className="flex min-h-[60svh] items-center py-20">
      <div className="container max-w-xl text-center">
        <p className="overline-label">Erreur 404</p>
        <h1 className="mt-4 text-4xl md:text-5xl">
          Cette page a pris <em className="text-terracotta">des vacances.</em>
        </h1>
        <p className="mt-5 leading-relaxed">
          La page que vous cherchez n&apos;existe pas ou a été déplacée.
          Retrouvez nos services, nos tarifs et nos villes d&apos;intervention
          depuis l&apos;accueil.
        </p>
        <Link href="/" className="btn-primary mt-8">
          Retour à l&apos;accueil
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
