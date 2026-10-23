"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, Send } from "lucide-react";
import { packs } from "@/lib/content";
import { villes } from "@/lib/villes";
import {
  FORMSPREE_ENDPOINT,
  PHONE_DISPLAY,
  PHONE_TEL,
  WHATSAPP_URL,
} from "@/lib/site";

type Status = "idle" | "sending" | "success" | "error";

const typesDeBien = ["Appartement", "Maison", "Studio", "Autre"];
const packChoices = [
  ...packs.map((p) => ({
    value: p.nom,
    id: p.id,
    label: p.nom,
    hint: `${p.prefixe ? `${p.prefixe} ` : ""}${p.prix}`,
  })),
  {
    value: "Je ne sais pas encore",
    id: "conseil",
    label: "À définir",
    hint: "on vous conseille",
  },
];

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [pack, setPack] = useState("");

  // Pré-sélection du pack depuis un bouton « Choisir … » (?pack=sweet-home)
  useEffect(() => {
    const wanted = new URLSearchParams(window.location.search).get("pack");
    const match = packChoices.find((choice) => choice.id === wanted);
    if (match) setPack(match.value);
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setStatus("sending");
    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });
      if (!response.ok) throw new Error("submit failed");
      setStatus("success");
      form.reset();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="py-6 text-center" role="status">
        <span className="success-mark">
          <Check className="h-8 w-8" aria-hidden="true" />
        </span>
        <h2 className="headline mt-6">Demande bien reçue.</h2>
        <p className="lead mx-auto mt-3 max-w-md">
          Nous vous répondons sous 24 h avec une première estimation et les
          prochaines étapes. À très bientôt.
        </p>
        <Link href="/" className="btn btn-secondary mt-8">
          Retour à l’accueil
          <ArrowRight className="arrow h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-6">
      <input
        type="hidden"
        name="_subject"
        value="Nouvelle demande d’audit — AJ Prestige"
      />

      <div className="field">
        <label htmlFor="name">Nom complet *</label>
        <input
          id="name"
          name="name"
          type="text"
          required
          autoComplete="name"
          placeholder="Jean Dupont"
          className="input"
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="field">
          <label htmlFor="email">Email *</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            inputMode="email"
            placeholder="jean@exemple.com"
            className="input"
          />
        </div>
        <div className="field">
          <label htmlFor="phone">Téléphone</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            placeholder="06 12 34 56 78"
            className="input"
          />
        </div>
      </div>

      <div className="field">
        <label htmlFor="city">Ville du bien</label>
        <input
          id="city"
          name="city"
          type="text"
          list="villes-suggestions"
          autoComplete="address-level2"
          placeholder="Soisy-sous-Montmorency, Enghien-les-Bains…"
          className="input"
        />
        <datalist id="villes-suggestions">
          {villes.map((ville) => (
            <option key={ville.slug} value={ville.nom} />
          ))}
        </datalist>
      </div>

      <fieldset className="field">
        <legend className="field-label">Type de bien</legend>
        <div className="choice-grid choice-grid-4">
          {typesDeBien.map((type) => (
            <label key={type} className="choice">
              <input type="radio" name="type_de_bien" value={type} />
              <span>{type}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="field">
        <legend className="field-label">
          Pack qui vous intéresse <small>(facultatif)</small>
        </legend>
        <div className="choice-grid choice-grid-4">
          {packChoices.map((choice) => (
            <label key={choice.id} className="choice">
              <input
                type="radio"
                name="pack"
                value={choice.value}
                checked={pack === choice.value}
                onChange={() => setPack(choice.value)}
              />
              <span>
                {choice.label}
                <small>{choice.hint}</small>
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="field">
        <label htmlFor="message">Votre projet</label>
        <textarea
          id="message"
          name="message"
          rows={5}
          placeholder="Situation actuelle, capacité d’accueil, lien de votre annonce si elle existe…"
          className="input"
        />
      </div>

      <label className="check">
        <input
          id="consent"
          name="consent"
          type="checkbox"
          required
          value="oui"
        />
        <span>
          J’accepte que mes données soient utilisées pour me recontacter dans le
          cadre de ma demande. Elles ne sont jamais partagées avec des tiers.{" "}
          <Link
            href="/politique-confidentialite"
            className="underline underline-offset-2"
          >
            En savoir plus
          </Link>
        </span>
      </label>

      {status === "error" ? (
        <p
          className="rounded-2xl bg-[rgba(184,74,43,0.08)] px-4 py-3 text-[15px] text-terracotta"
          role="alert"
        >
          L’envoi n’a pas abouti. Réessayez, ou contactez-nous directement au{" "}
          <a href={`tel:${PHONE_TEL}`} className="font-semibold underline">
            {PHONE_DISPLAY}
          </a>{" "}
          ou sur{" "}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold underline"
          >
            WhatsApp
          </a>
          .
        </p>
      ) : null}

      <div>
        <button
          type="submit"
          disabled={status === "sending"}
          className="btn btn-primary btn-lg w-full disabled:opacity-70 sm:w-auto"
        >
          {status === "sending" ? (
            <>
              <span className="spinner" aria-hidden="true" />
              Envoi en cours…
            </>
          ) : (
            <>
              Envoyer ma demande
              <Send className="arrow h-4 w-4" aria-hidden="true" />
            </>
          )}
        </button>
        <p className="caption mt-3">
          Réponse sous 24 h · Audit gratuit et sans engagement
        </p>
      </div>
    </form>
  );
}
