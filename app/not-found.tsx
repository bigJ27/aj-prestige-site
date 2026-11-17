import Link from "next/link";
import { IconArrow } from "@/components/icons";

export default function NotFound() {
  return (
    <section className="page-hero flex min-h-[62svh] items-center">
      <div className="wrap">
        <p className="label">Erreur 404</p>
        <h1 className="h-page">
          Cette page a pris <em>des vacances.</em>
        </h1>
        <p className="lead">
          La page que vous cherchez n’existe pas ou a été déplacée. Nos
          services, nos tarifs et nos villes d’intervention sont accessibles
          depuis l’accueil.
        </p>
        <div className="hero-actions">
          <Link href="/" className="btn btn-primary">
            Retour à l’accueil
            <IconArrow size={18} />
          </Link>
          <Link href="/contact" className="link-arrow">
            Nous contacter
            <IconArrow size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
