import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <section className="page-hero flex min-h-[80svh] items-center">
      <div className="aurora" aria-hidden="true" />
      <div className="shell-narrow">
        <span className="eyebrow">Erreur 404</span>
        <h1 className="display-xl mt-4">
          Cette page a pris <span className="text-gradient">des vacances.</span>
        </h1>
        <p className="lead mx-auto mt-6 max-w-xl">
          La page que vous cherchez n’existe pas ou a été déplacée. Retrouvez
          nos services, nos tarifs et nos villes d’intervention depuis
          l’accueil.
        </p>
        <div className="hero-actions">
          <Link href="/" className="btn btn-primary btn-lg">
            Retour à l’accueil
            <ArrowRight className="arrow h-4 w-4" aria-hidden="true" />
          </Link>
          <Link href="/contact" className="btn btn-secondary btn-lg">
            Nous contacter
          </Link>
        </div>
      </div>
    </section>
  );
}
