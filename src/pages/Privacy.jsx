import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const Privacy = () => {
  return (
    <div className="legal-page">
      <div className="container">
        <Link to="/" className="back-link">
          <ArrowLeft className="h-4 w-4" />
          Retour à l'accueil
        </Link>
        
        <h1 className="legal-title">Politique de Confidentialité</h1>
        <p className="legal-date">Dernière mise à jour : Mars 2026</p>

        <section className="legal-section">
          <h2>1. Introduction</h2>
          <p>
            AJ Prestige s'engage à protéger la vie privée des utilisateurs de son site. 
            Cette politique de confidentialité explique comment nous collectons, utilisons, 
            stockons et protégeons vos données personnelles conformément au Règlement Général 
            sur la Protection des Données (RGPD).
          </p>
        </section>

        <section className="legal-section">
          <h2>2. Données collectées</h2>
          <p>Nous collectons les données suivantes via notre formulaire de contact :</p>
          <ul>
            <li>Nom et prénom</li>
            <li>Adresse email</li>
            <li>Numéro de téléphone</li>
            <li>Ville du bien</li>
            <li>Type de bien (appartement, maison, etc.)</li>
            <li>Capacité d'accueil</li>
            <li>Plateforme de location utilisée</li>
            <li>Lien vers l'annonce (optionnel)</li>
            <li>Message libre</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>3. Finalités du traitement</h2>
          <p>Vos données sont collectées pour :</p>
          <ul>
            <li>Répondre à vos demandes de contact et d'audit gratuit</li>
            <li>Vous fournir des informations sur nos services de conciergerie</li>
            <li>Établir un devis personnalisé</li>
            <li>Améliorer nos services</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>4. Base légale du traitement</h2>
          <p>
            Le traitement de vos données est basé sur votre consentement explicite, 
            donné lors de la soumission du formulaire de contact via la case à cocher RGPD.
          </p>
        </section>

        <section className="legal-section">
          <h2>5. Durée de conservation</h2>
          <p>
            Vos données sont conservées pendant une durée de 3 ans à compter de votre 
            dernière interaction avec AJ Prestige, conformément aux recommandations de la CNIL.
          </p>
        </section>

        <section className="legal-section">
          <h2>6. Destinataires des données</h2>
          <p>
            Vos données sont uniquement accessibles par l'équipe AJ Prestige. 
            Elles ne sont en aucun cas vendues, louées ou partagées avec des tiers 
            à des fins commerciales.
          </p>
        </section>

        <section className="legal-section">
          <h2>7. Vos droits</h2>
          <p>Conformément au RGPD, vous disposez des droits suivants :</p>
          <ul>
            <li><strong>Droit d'accès :</strong> obtenir une copie de vos données</li>
            <li><strong>Droit de rectification :</strong> corriger vos données inexactes</li>
            <li><strong>Droit à l'effacement :</strong> demander la suppression de vos données</li>
            <li><strong>Droit à la limitation :</strong> limiter le traitement de vos données</li>
            <li><strong>Droit à la portabilité :</strong> récupérer vos données dans un format structuré</li>
            <li><strong>Droit d'opposition :</strong> vous opposer au traitement de vos données</li>
          </ul>
          <p>
            Pour exercer ces droits, contactez-nous à : 
            <a href="mailto:ajprestige.conciergerie@gmail.com">ajprestige.conciergerie@gmail.com</a>
          </p>
        </section>

        <section className="legal-section">
          <h2>8. Sécurité des données</h2>
          <p>
            Nous mettons en œuvre des mesures techniques et organisationnelles appropriées 
            pour protéger vos données contre tout accès non autorisé, modification, 
            divulgation ou destruction.
          </p>
        </section>

        <section className="legal-section">
          <h2>9. Cookies</h2>
          <p>
            Ce site utilise uniquement des cookies techniques essentiels au bon fonctionnement 
            du site. Aucun cookie publicitaire ou de tracking n'est utilisé.
          </p>
        </section>

        <section className="legal-section">
          <h2>10. Modifications</h2>
          <p>
            Cette politique de confidentialité peut être mise à jour. 
            La date de dernière mise à jour est indiquée en haut de cette page.
          </p>
        </section>

        <section className="legal-section">
          <h2>11. Contact</h2>
          <p>
            Pour toute question concernant cette politique de confidentialité :<br />
            <strong>AJ Prestige</strong><br />
            Email : <a href="mailto:ajprestige.conciergerie@gmail.com">ajprestige.conciergerie@gmail.com</a>
          </p>
          <p>
            Vous pouvez également introduire une réclamation auprès de la CNIL 
            (Commission Nationale de l'Informatique et des Libertés) : 
            <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer">www.cnil.fr</a>
          </p>
        </section>
      </div>
    </div>
  );
};

export default Privacy;
