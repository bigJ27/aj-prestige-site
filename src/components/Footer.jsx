import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-title">AJ Prestige</h3>
            <p className="footer-description">
              Conciergerie locative courte durée premium. 
              Délégation complète et revenus optimisés.
            </p>
            <div className="footer-social">
              <a 
                href="https://www.instagram.com/aj_prestige_paris?igsh=MTV4YW9zcnJsem84Mw==" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-icon"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h4 className="footer-section-title">Navigation</h4>
            <ul className="footer-links">
              <li><Link to="/">Accueil</Link></li>
              <li><Link to="/packs">Nos packs</Link></li>
              <li><Link to="/pourquoi-nous">Pourquoi nous ?</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-section-title">Packs</h4>
            <ul className="footer-links">
              <li><Link to="/packs#pack-confort">Pack Confort</Link></li>
              <li><Link to="/packs#pack-sweet">Pack Sweet Home</Link></li>
              <li><Link to="/packs#pack-prestige">Pack Prestige</Link></li>
              <li><Link to="/packs#comparatif">Comparatif</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-section-title">Contact</h4>
            <ul className="footer-contact">
              <li className="footer-contact-item">
                <Phone className="h-4 w-4" />
                <a href="tel:+33622185785">06 22 18 57 85</a>
              </li>
              <li className="footer-contact-item">
                <Mail className="h-4 w-4" />
                <a href="mailto:ajprestige.conciergerie@gmail.com">
                  ajprestige.conciergerie@gmail.com
                </a>
              </li>
              <li className="footer-contact-item">
                <MapPin className="h-4 w-4" />
                <span>Soisy-sous-Montmorency</span>
              </li>
            </ul>
            <a 
              href="https://www.google.com/search?kgmid=/g/11xrly8g9m&q=AJ%20PRESTIGE"
              target="_blank"
              rel="noopener noreferrer"
              className="google-business-link"
            >
              Voir sur Google
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">
            © {currentYear} AJ Prestige. Tous droits réservés.
          </p>
          <div className="footer-legal">
            <Link to="/mentions-legales" className="footer-legal-item">Mentions légales</Link>
            <span className="footer-separator">•</span>
            <Link to="/politique-confidentialite" className="footer-legal-item">Politique de confidentialité</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
