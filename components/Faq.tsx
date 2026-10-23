"use client";

import { useId, useState } from "react";
import type { FaqItem } from "@/lib/content";

/** Accordéon de questions : une seule ouverte à la fois, ouverture fluide. */
export default function Faq({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const baseId = useId();

  return (
    <div className="faq">
      {items.map((item, i) => {
        const isOpen = open === i;
        const buttonId = `${baseId}-q-${i}`;
        const panelId = `${baseId}-a-${i}`;
        return (
          <div key={item.question} className="faq-item" data-open={isOpen}>
            <h3>
              <button
                id={buttonId}
                type="button"
                className="faq-q"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
              >
                {item.question}
                <span className="faq-icon" aria-hidden="true" />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className="faq-panel"
              inert={!isOpen}
            >
              <div>
                <p>{item.reponse}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
