/**
 * Photos du site.
 *
 * Les fichiers sont dans public/images. Pour REMPLACER une photo par l'une des
 * vôtres : déposez votre fichier dans ce dossier sous le même nom (JPEG,
 * 2 000 px de large environ) et ajustez le texte « alt » ci-dessous.
 * Next.js se charge de créer les versions légères (AVIF/WebP) pour chaque écran.
 *
 * Les deux vues du lac sont de vraies photos du lac d'Enghien. Les intérieurs
 * sont des images d'ambiance (banque d'images libre Unsplash) : dès que vous
 * avez des photos de vos biens, ce sont elles qu'il faut mettre ici.
 */
import fenetreFleurs from "@/public/images/fenetre-fleurs.jpg";
import lacBarques from "@/public/images/lac-barques.jpg";
import lacPonton from "@/public/images/lac-ponton.jpg";
import lacSoir from "@/public/images/lac-soir.jpg";
import oreillerLin from "@/public/images/oreiller-lin.jpg";
import salonVert from "@/public/images/salon-vert.jpg";
import serviettes from "@/public/images/serviettes.jpg";

export const photos = {
  fenetreFleurs: {
    src: fenetreFleurs,
    alt: "Table bistrot fleurie devant une porte-fenêtre, voilages tirés et lumière douce",
  },
  oreillerLin: {
    src: oreillerLin,
    alt: "Deux mains lissent un oreiller en lin sur un lit fraîchement préparé",
  },
  serviettes: {
    src: serviettes,
    alt: "Serviettes blanches pliées, au soleil",
  },
  salonVert: {
    src: salonVert,
    alt: "Salon d’une maison ancienne : murs vert sauge, parquet, fauteuils et lumière du jardin",
  },
  lacBarques: {
    src: lacBarques,
    alt: "Barques vertes amarrées sur le lac d’Enghien, sous un ciel d’été",
  },
  lacPonton: {
    src: lacPonton,
    alt: "Le lac d’Enghien vu de la promenade, bordée de roseaux et de fleurs",
  },
  lacSoir: {
    src: lacSoir,
    alt: "Un canard glisse sur le lac d’Enghien cuivré par le coucher du soleil",
  },
} as const;

/** Auteurs des photos (licence Unsplash), cités dans les mentions légales */
export const creditsPhotos = [
  "Jackson Sears",
  "Oleg",
  "Mads Leif Hansen",
  "Eder Pozo Pérez",
  "Elsa Assindo",
  "Haim Charbit",
];
