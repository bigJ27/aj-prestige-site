import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const Legal = () => {
  return (
    <div className="legal-page">
      <div className="container">
        <Link to="/" className="back-link">
          <ArrowLeft className="h-4 w-4" />
          Retour à l'accueil
        </Link>
        
        <h1 className="legal-title">Mentions Légales</h1>
        <p className="legal-date">Dernière mise à jour : Mars 2026</p>

        <section className="legal-section">
          <h2>1. Éditeur du site</h2>
          <p>
            <strong>AJ Prestige</strong><br />
            Conciergerie locative courte durée<br />
            Soisy-sous-Montmorency, Île-de-France<br />
            Email : ajprestige.conciergerie@gmail.com
          </p>
        </section>

        <section className="legal-section">
          <h2>2. Hébergement</h2>
          <p>
            Ce site est hébergé par des services cloud professionnels 
            garantissant la sécurité et la disponibilité des données.
          </p>
        </section>

        <section className="legal-section">
          <h2>3. Propriété intellectuelle</h2>
          <p>
            L'ensemble du contenu de ce site (textes, images, graphismes, logo, icônes, etc.) 
            est la propriété exclusive d'AJ Prestige, à l'exception des marques, logos ou 
            contenus appartenant à d'autres sociétés partenaires ou auteurs.
          </p>
          <p>
            Toute reproduction, distribution, modification, adaptation, retransmission ou 
            publication, même partielle, de ces différents éléments est strictement interdite 
            sans l'accord exprès par écrit d'AJ Prestige.
          </p>
        </section>

        <section className="legal-section">
          <h2>4. Limitation de responsabilité</h2>
          <p>
            AJ Prestige s'efforce d'assurer l'exactitude et la mise à jour des informations 
            diffusées sur ce site. Toutefois, AJ Prestige ne peut garantir l'exactitude, 
            la précision ou l'exhaustivité des informations mises à disposition sur ce site.
          </p>
          <p>
            En conséquence, AJ Prestige décline toute responsabilité pour les éventuelles 
            imprécisions, inexactitudes ou omissions portant sur des informations disponibles 
            sur ce site.
          </p>
        </section>

        <section className="legal-section">
          <h2>5. Liens hypertextes</h2>
          <p>
            Le site peut contenir des liens hypertextes vers d'autres sites. AJ Prestige 
            n'exerce aucun contrôle sur ces sites et décline toute responsabilité quant 
            à leur contenu.
          </p>
        </section>

        <section className="legal-section">
          <h2>6. Droit applicable</h2>
          <p>
            Les présentes mentions légales sont régies par le droit français. 
            En cas de litige, les tribunaux français seront seuls compétents.
          </p>
        </section>

        <section className="legal-section">
          <h2>7. Contact</h2>
          <p>
            Pour toute question concernant ces mentions légales, vous pouvez nous contacter à :<br />
            <a href="mailto:ajprestige.conciergerie@gmail.com">ajprestige.conciergerie@gmail.com</a>
          </p>
        </section>
      </div>
    </div>
  );
};

export default Legal;
