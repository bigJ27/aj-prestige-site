"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { FORMSPREE_ENDPOINT } from "@/lib/site";

type Status = "idle" | "sending" | "success" | "error";

const inputClasses =
  "w-full rounded-lg border border-night/15 bg-white px-4 py-3 text-ink placeholder:text-muted focus:border-sunset focus:outline-none focus:ring-2 focus:ring-coral/40 transition-colors";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

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
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-xl border border-coral/40 bg-sand-deep p-10 text-center">
        <p className="font-serif text-2xl text-night">Message bien reçu !</p>
        <p className="mt-3 text-ink">
          Nous vous répondons sous 24&nbsp;h avec une première estimation et
          les prochaines étapes. À très bientôt.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-night">
          Nom complet *
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          autoComplete="name"
          placeholder="Jean Dupont"
          className={inputClasses}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-night">
            Email *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="jean@exemple.com"
            className={inputClasses}
          />
        </div>
        <div>
          <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-night">
            Téléphone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="06 12 34 56 78"
            className={inputClasses}
          />
        </div>
      </div>

      <div>
        <label htmlFor="city" className="mb-1.5 block text-sm font-medium text-night">
          Ville du bien
        </label>
        <input
          id="city"
          name="city"
          type="text"
          placeholder="Soisy-sous-Montmorency, Enghien-les-Bains…"
          className={inputClasses}
        />
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-night">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          placeholder="Parlez-nous de votre projet : type de bien, situation actuelle, objectifs…"
          className={inputClasses}
        />
      </div>

      <div className="flex items-start gap-3">
        <input
          id="consent"
          name="consent"
          type="checkbox"
          required
          className="mt-1 h-4 w-4 shrink-0 accent-terracotta"
        />
        <label htmlFor="consent" className="text-sm leading-relaxed text-ink">
          J&apos;accepte que mes données soient utilisées pour me recontacter
          dans le cadre de ma demande. Elles ne sont jamais partagées avec des
          tiers.
        </label>
      </div>

      {status === "error" ? (
        <p className="rounded-lg border border-terracotta/40 bg-sand-deep px-4 py-3 text-sm text-terracotta">
          Une erreur est survenue. Réessayez, ou contactez-nous directement par
          téléphone ou par email.
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "sending"}
        className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {status === "sending" ? "Envoi en cours…" : "Envoyer ma demande"}
        <Send className="h-4 w-4" />
      </button>
    </form>
  );
}
