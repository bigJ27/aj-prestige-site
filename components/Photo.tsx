// « import type » : on ne récupère que la description du type, aucun code n'est embarqué
import type { StaticImageData } from "next/image";

type Props = {
  src: StaticImageData;
  alt: string;
  /** Largeur d'affichage selon l'écran : le navigateur choisit le fichier adapté */
  sizes: string;
  /** true pour LA photo visible dès l'ouverture de la page (chargée en priorité) */
  priority?: boolean;
  className?: string;
};

/** Largeurs que le service d'images de Next.js sait produire (réglages par défaut) */
const LARGEURS = [384, 640, 750, 828, 1080, 1200, 1920];

/** Qualité de compression : doit figurer dans images.qualities (next.config.ts) */
const QUALITE = 60;

/** Adresse d'une version redimensionnée et recompressée (AVIF ou WebP selon le navigateur) */
function version(src: string, largeur: number) {
  return `/_next/image?url=${encodeURIComponent(src)}&w=${largeur}&q=${QUALITE}`;
}

/**
 * Photo optimisée, sans une ligne de JavaScript dans la page.
 *
 * Le composant <Image> de Next.js fait la même chose, mais il ajoute environ
 * 13 Ko de script à chaque page. Ici on écrit directement la balise <img> :
 *  · srcset + sizes → le téléphone télécharge une petite version, l'ordinateur une grande
 *  · width + height → la place est réservée, la page ne « saute » pas au chargement
 *  · loading="lazy" → les photos hors écran ne sont téléchargées qu'à l'approche
 *  · l'aperçu flou (quelques octets) s'affiche en fond en attendant la vraie photo
 */
export default function Photo({
  src,
  alt,
  sizes,
  priority = false,
  className,
}: Props) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={version(src.src, 1080)}
      srcSet={LARGEURS.map((l) => `${version(src.src, l)} ${l}w`).join(", ")}
      sizes={sizes}
      width={src.width}
      height={src.height}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      decoding="async"
      className={className}
      style={{
        backgroundImage: `url(${src.blurDataURL})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    />
  );
}
