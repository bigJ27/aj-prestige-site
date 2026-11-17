import type { FaqItem } from "@/lib/content";
import { typo } from "@/lib/typo";

/**
 * Questions fréquentes. On utilise l'élément HTML natif <details> : il
 * s'ouvre et se ferme sans une ligne de JavaScript, au clavier comme au doigt.
 * L'attribut « name » commun fait qu'une seule réponse reste ouverte à la fois.
 */
export default function Faq({
  items,
  groupe = "faq",
}: {
  items: FaqItem[];
  groupe?: string;
}) {
  return (
    <div className="faq">
      {items.map((item) => (
        <details key={item.question} className="faq-item" name={groupe}>
          <summary>{typo(item.question)}</summary>
          <p className="faq-answer">{typo(item.reponse)}</p>
        </details>
      ))}
    </div>
  );
}
