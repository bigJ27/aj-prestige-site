import type { MetadataRoute } from "next";
import { villes } from "@/lib/villes";
import { SITE_URL } from "@/lib/site";

/**
 * Date de dernière modification réelle des contenus.
 * À mettre à jour quand vous changez les textes : annoncer une date fausse
 * (par exemple « aujourd'hui » à chaque déploiement) fait perdre aux moteurs
 * de recherche leur confiance dans ce champ.
 */
const DERNIERE_MISE_A_JOUR = new Date("2026-11-17");

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    { chemin: "/", priority: 1 },
    { chemin: "/services", priority: 0.9 },
    { chemin: "/tarifs", priority: 0.9 },
    { chemin: "/contact", priority: 0.8 },
    ...villes.map((ville) => ({ chemin: `/${ville.slug}`, priority: 0.8 })),
    { chemin: "/mentions-legales", priority: 0.2 },
    { chemin: "/politique-confidentialite", priority: 0.2 },
  ];

  return pages.map(({ chemin, priority }) => ({
    url: `${SITE_URL}${chemin}`,
    lastModified: DERNIERE_MISE_A_JOUR,
    changeFrequency: "monthly",
    priority,
  }));
}
