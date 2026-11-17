"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { IconArrow, IconCheck } from "@/components/icons";
import { packs } from "@/lib/content";
import { typo } from "@/lib/typo";
import { villes } from "@/lib/villes";
import {
  FORMSPREE_ENDPOINT,
  PHONE_DISPLAY,
  PHONE_TEL,
  WHATSAPP_URL,
} from "@/lib/site";

type Etat = "repos" | "envoi" | "succes" | "erreur";

const typesDeBien = ["Appartement", "Maison", "Studio", "Autre"];
const choixPack = [
  ...packs.map((p) => ({
    value: p.nom,
    id: p.id,
    label: p.nom,
    detail: typo(`${p.prefixe ? `${p.prefixe} ` : ""}${p.prix}`),
  })),
  {
    value: "Je ne sais pas encore",
    id: "conseil",
    label: "À définir",
    detail: "on vous conseille",
  },
];

/**
 * Formulaire de demande d'audit, envoyé à Formspree.
 * Avec JavaScript : envoi sans quitter la page et message de confirmation.
 * Sans JavaScript : le formulaire s'envoie quand même (attributs action/method).
 */
export default function ContactForm() {
  const [etat, setEtat] = useState<Etat>("repos");
  const [pack, setPack] = useState("");
  const confirmationRef = useRef<HTMLDivElement>(null);

  // Pack présélectionné depuis un bouton « Choisir … » (/contact?pack=sweet-home)
  useEffect(() => {
    const voulu = new URLSearchParams(window.location.search).get("pack");
    const trouve = choixPack.find((choix) => choix.id === voulu);
    if (trouve) setPack(trouve.value);
  }, []);

  async function envoyer(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formulaire = event.currentTarget;
    setEtat("envoi");
    try {
      const reponse = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(formulaire),
      });
      if (!reponse.ok) throw new Error("envoi refusé");
      setEtat("succes");
      formulaire.reset();
    } catch {
      setEtat("erreur");
    }
  }

  // Une fois la demande partie, le formulaire laisse place à un court message :
  // on le ramène à l'écran et on y place le focus (lecteurs d'écran, clavier).
  useEffect(() => {
    if (etat !== "succes") return;
    confirmationRef.current?.scrollIntoView({ block: "center" });
    confirmationRef.current?.focus();
  }, [etat]);

  if (etat === "succes") {
    return (
      <div
        ref={confirmationRef}
        role="status"
        tabIndex={-1}
        className="py-4 outline-none"
      >
        <span className="success-mark">
          <IconCheck size={30} />
        </span>
        <h2 className="h-section mt-6">Demande bien reçue.</h2>
        <p className="lead mt-3 max-w-md">
          Nous vous répondons sous 24&nbsp;h avec une première estimation et
          les prochaines étapes. À très bientôt.
        </p>
        <Link href="/" className="link-arrow mt-6">
          Retour à l’accueil
          <IconArrow size={18} />
        </Link>
      </div>
    );
  }

  return (
    <form
      className="form"
      action={FORMSPREE_ENDPOINT}
      method="POST"
      onSubmit={envoyer}
    >
      <input
        type="hidden"
        name="_subject"
        value="Nouvelle demande d’audit — AJ Prestige"
      />
      {/* Champ piège anti-robots : invisible, un humain ne le remplit jamais */}
      <input
        type="text"
        name="_gotcha"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      <div className="field">
        <label htmlFor="name">Nom et prénom *</label>
        <input
          id="name"
          name="name"
          type="text"
          required
          autoComplete="name"
          className="input"
        />
      </div>

      <div className="grid gap-[26px] sm:grid-cols-2">
        <div className="field">
          <label htmlFor="email">E-mail *</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            inputMode="email"
            className="input"
          />
        </div>
        <div className="field">
          <label htmlFor="phone">
            Téléphone <small>(facultatif)</small>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            className="input"
          />
        </div>
      </div>

      <div className="field">
        <label htmlFor="city">
          Ville du bien <small>(facultatif)</small>
        </label>
        <input
          id="city"
          name="city"
          type="text"
          list="villes-suggestions"
          autoComplete="address-level2"
          placeholder="Ex. Enghien-les-Bains"
          className="input"
        />
        <datalist id="villes-suggestions">
          {villes.map((ville) => (
            <option key={ville.slug} value={ville.nom} />
          ))}
        </datalist>
      </div>

      <fieldset className="field">
        <legend>
          Type de bien <small>(facultatif)</small>
        </legend>
        <div className="choices">
          {typesDeBien.map((type) => (
            <label key={type} className="choice">
              <input type="radio" name="type_de_bien" value={type} />
              <span>{type}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="field">
        <legend>
          Pack qui vous intéresse <small>(facultatif)</small>
        </legend>
        <div className="choices">
          {choixPack.map((choix) => (
            <label key={choix.id} className="choice">
              <input
                type="radio"
                name="pack"
                value={choix.value}
                checked={pack === choix.value}
                onChange={() => setPack(choix.value)}
              />
              <span>
                {choix.label}
                <small>{choix.detail}</small>
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="field">
        <label htmlFor="message">
          Votre projet <small>(facultatif)</small>
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          placeholder="Situation actuelle, nombre de couchages, lien de votre annonce si elle existe…"
          className="input"
        />
      </div>

      <label className="check">
        <input name="consent" type="checkbox" required value="oui" />
        <span>
          J’accepte que mes données soient utilisées pour me recontacter au
          sujet de ma demande. Elles ne sont jamais transmises à des tiers.{" "}
          <Link href="/politique-confidentialite">En savoir plus</Link>
        </span>
      </label>

      {etat === "erreur" ? (
        <p className="alert" role="alert">
          L’envoi n’a pas abouti. Réessayez, ou contactez-nous directement au{" "}
          <a href={`tel:${PHONE_TEL}`}>{PHONE_DISPLAY}</a> ou sur{" "}
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
            WhatsApp
          </a>
          .
        </p>
      ) : null}

      <div>
        <button
          type="submit"
          disabled={etat === "envoi"}
          className="btn btn-primary w-full disabled:opacity-70 sm:w-auto"
        >
          {etat === "envoi" ? (
            <>
              <span className="spinner" aria-hidden="true" />
              Envoi en cours…
            </>
          ) : (
            <>
              Envoyer ma demande
              <IconArrow size={18} />
            </>
          )}
        </button>
        <p className="caption mt-3">
          Réponse sous 24&nbsp;h · Audit gratuit et sans engagement
        </p>
      </div>
    </form>
  );
}
