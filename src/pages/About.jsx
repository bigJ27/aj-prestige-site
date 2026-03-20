import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Star, TrendingUp, CheckCircle, Target } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';

const About = () => {
  const sectionsRef = useRef([]);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-visible');
        }
      });
    }, observerOptions);

    sectionsRef.current.forEach(section => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const addToRefs = (el) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  return (
    <div className="about-page">
      {/* Hero with Background Image */}
      <section className="page-hero-section">
        <div className="page-hero-background">
          <img 
            src="https://images.unsplash.com/photo-1689849714441-6372a33af0d4?crop=entropy&cs=srgb&fm=jpg&q=85"
            alt="Chambre avec vue sur mer et coucher de soleil rose"
            className="page-hero-image"
          />
          <div className="page-hero-overlay"></div>
        </div>
        <div className="page-hero-content">
          <div className="reveal-element" ref={addToRefs}>
            <h1 className="page-hero-title">
              Pourquoi<br />
              AJ Prestige ?
            </h1>
            <p className="page-hero-subtitle">
              Une conciergerie locative nouvelle génération, transparente et orientée résultats
            </p>
          </div>
        </div>
      </section>

      {/* Notre Méthode */}
      <section className="method-section section-padding">
        <div className="container">
          <div className="section-header reveal-element" ref={addToRefs}>
            <h2 className="section-title">Notre méthode</h2>
            <p className="section-subtitle">
              Une approche structurée pour des résultats mesurables
            </p>
          </div>
          <div className="method-grid">
            <Card className="method-card glass-card reveal-element" ref={addToRefs}>
              <CardContent className="method-content">
                <div className="method-icon">
                  <Target className="h-8 w-8" />
                </div>
                <h3 className="method-title">Analyse & Diagnostic</h3>
                <p className="method-description">
                  Audit complet de votre bien : emplacement, équipements, concurrence. 
                  Nous identifions votre potentiel réel et les axes d'amélioration.
                </p>
              </CardContent>
            </Card>
            <Card className="method-card glass-card reveal-element" ref={addToRefs}>
              <CardContent className="method-content">
                <div className="method-icon">
                  <Star className="h-8 w-8" />
                </div>
                <h3 className="method-title">Optimisation</h3>
                <p className="method-description">
                  Photos pro, annonce percutante, pricing dynamique. Nous maximisons 
                  votre visibilité et votre taux d'occupation sur toutes les plateformes.
                </p>
              </CardContent>
            </Card>
            <Card className="method-card glass-card reveal-element" ref={addToRefs}>
              <CardContent className="method-content">
                <div className="method-icon">
                  <Shield className="h-8 w-8" />
                </div>
                <h3 className="method-title">Gestion & Suivi</h3>
                <p className="method-description">
                  Gestion quotidienne irréprochable : réservations, ménages, voyageurs. 
                  Standards qualité stricts et reporting transparent.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Standards Qualité */}
      <section className="standards-section section-padding">
        <div className="container">
          <div className="standards-layout">
            <div className="standards-text reveal-element" ref={addToRefs}>
              <h2 className="section-title">Standards qualité</h2>
              <p className="standards-intro">
                Nous appliquons des protocoles rigoureux à chaque étape pour garantir 
                une expérience irréprochable aux voyageurs et des avis 5 étoiles.
              </p>
              <ul className="standards-list">
                <li className="standards-item">
                  <CheckCircle className="h-5 w-5" />
                  <span>Checklists détaillées pour chaque ménage</span>
                </li>
                <li className="standards-item">
                  <CheckCircle className="h-5 w-5" />
                  <span>Contrôle photo après chaque passage</span>
                </li>
                <li className="standards-item">
                  <CheckCircle className="h-5 w-5" />
                  <span>Équipes formées et évaluées régulièrement</span>
                </li>
                <li className="standards-item">
                  <CheckCircle className="h-5 w-5" />
                  <span>Réactivité garantie (réponse sous 1h)</span>
                </li>
                <li className="standards-item">
                  <CheckCircle className="h-5 w-5" />
                  <span>Suivi des indicateurs de performance</span>
                </li>
              </ul>
            </div>
            <div className="standards-visual reveal-element" ref={addToRefs}>
              <Card className="glass-card standards-card">
                <CardContent className="standards-card-content">
                  <div className="stat-item">
                    <div className="stat-number">5/5</div>
                    <div className="stat-label">Note Google</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-number">100%</div>
                    <div className="stat-label">Clients satisfaits</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-number">24/7</div>
                    <div className="stat-label">Disponibilité</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Transparence */}
      <section className="transparency-section section-padding">
        <div className="container">
          <div className="section-header reveal-element" ref={addToRefs}>
            <h2 className="section-title">Transparence totale</h2>
            <p className="section-subtitle">
              Ce qui est inclus, ce qui ne l'est pas. Aucune mauvaise surprise.
            </p>
          </div>
          <div className="transparency-grid">
            <Card className="transparency-card glass-card reveal-element" ref={addToRefs}>
              <CardContent className="transparency-content">
                <h3 className="transparency-title included">Inclus dans nos services</h3>
                <ul className="transparency-list">
                  <li>Gestion réservations multi-plateformes</li>
                  <li>Communication voyageurs (avant, pendant, après)</li>
                  <li>Ménage professionnel & linge</li>
                  <li>Check-in / Check-out</li>
                  <li>Assistance 24/7</li>
                  <li>Réassort produits essentiels</li>
                  <li>Gestion des avis</li>
                  <li>Reporting transparent</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="transparency-card glass-card reveal-element" ref={addToRefs}>
              <CardContent className="transparency-content">
                <h3 className="transparency-title not-included">Non inclus (selon pack)</h3>
                <ul className="transparency-list">
                  <li>Grosses réparations & travaux</li>
                  <li>Remplacement mobilier / électroménager</li>
                  <li>Assurance propriétaire (à votre charge)</li>
                  <li>Charges courantes (eau, électricité, internet)</li>
                  <li>Décoration initiale du logement</li>
                  <li>Frais bancaires de transfert</li>
                </ul>
                <p className="transparency-note">
                  En pack Prestige, nous gérons les artisans pour petits imprévus, 
                  mais les coûts restent à votre charge.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Expérience Voyageurs */}
      <section className="experience-section section-padding">
        <div className="container">
          <div className="experience-layout">
            <div className="experience-visual reveal-element" ref={addToRefs}>
              <img 
                src="https://customer-assets.emergentagent.com/job_luxury-delegation/artifacts/gpocc742_Capture%20d%E2%80%99%C3%A9cran_10-3-2026_14151_higgsfield.ai.jpeg" 
                alt="Expérience voyageurs premium"
                className="experience-image"
              />
            </div>
            <div className="experience-text reveal-element" ref={addToRefs}>
              <h2 className="section-title">Expérience voyageurs</h2>
              <p className="experience-intro">
                Des avis 5 étoiles ne sont pas le fruit du hasard. Nous créons une expérience 
                mémorable qui transforme vos hôtes en ambassadeurs.
              </p>
              <div className="experience-points">
                <div className="experience-point">
                  <div className="point-icon">
                    <Star className="h-6 w-6" />
                  </div>
                  <div className="point-content">
                    <h4 className="point-title">Communication impeccable</h4>
                    <p className="point-description">
                      Réponses rapides, infos claires, anticipation des besoins. 
                      Nous rassurons et guidons chaque voyageur.
                    </p>
                  </div>
                </div>
                <div className="experience-point">
                  <div className="point-icon">
                    <Shield className="h-6 w-6" />
                  </div>
                  <div className="point-content">
                    <h4 className="point-title">Propreté irréprochable</h4>
                    <p className="point-description">
                      Checklists strictes, contrôle photo, linge impeccable. 
                      L'hygiène est notre priorité absolue.
                    </p>
                  </div>
                </div>
                <div className="experience-point">
                  <div className="point-icon">
                    <CheckCircle className="h-6 w-6" />
                  </div>
                  <div className="point-content">
                    <h4 className="point-title">Attention aux détails</h4>
                    <p className="point-description">
                      Petites attentions, équipements de qualité, livret d'accueil personnalisé. 
                      Chaque détail compte.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Optimisation Revenus */}
      <section className="revenue-section section-padding">
        <div className="container">
          <div className="section-header reveal-element" ref={addToRefs}>
            <h2 className="section-title">Optimisation des revenus</h2>
            <p className="section-subtitle">
              Des stratégies éprouvées pour maximiser votre rentabilité
            </p>
          </div>
          <div className="revenue-grid">
            <Card className="revenue-card glass-card reveal-element" ref={addToRefs}>
              <CardContent className="revenue-content">
                <div className="revenue-icon">
                  <TrendingUp className="h-8 w-8" />
                </div>
                <h3 className="revenue-title">Pricing dynamique</h3>
                <p className="revenue-description">
                  Nous ajustons vos tarifs en temps réel selon la demande, les événements locaux, 
                  la saison et la concurrence. Objectif : maximiser chaque nuitée.
                </p>
              </CardContent>
            </Card>
            <Card className="revenue-card glass-card reveal-element" ref={addToRefs}>
              <CardContent className="revenue-content">
                <div className="revenue-icon">
                  <Target className="h-8 w-8" />
                </div>
                <h3 className="revenue-title">Gestion du calendrier</h3>
                <p className="revenue-description">
                  Équilibre intelligent entre durée de séjour et taux d'occupation. 
                  Nous refusons les réservations non rentables et optimisons les créneaux.
                </p>
              </CardContent>
            </Card>
            <Card className="revenue-card glass-card reveal-element" ref={addToRefs}>
              <CardContent className="revenue-content">
                <div className="revenue-icon">
                  <Star className="h-8 w-8" />
                </div>
                <h3 className="revenue-title">Visibilité maximale</h3>
                <p className="revenue-description">
                  Annonce optimisée SEO, multi-diffusion, photos attractives. 
                  Nous vous positionnons en tête des résultats sur toutes les plateformes.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="final-cta-section section-padding">
        <div className="container">
          <Card className="final-cta-card glass-card reveal-element" ref={addToRefs}>
            <CardContent className="final-cta-content">
              <h2 className="final-cta-title">Convaincu ? Parlons de votre projet</h2>
              <p className="final-cta-subtitle">
                Audit gratuit et estimation personnalisée de vos revenus potentiels
              </p>
              <div className="cta-buttons">
                <Link to="/contact">
                  <Button size="lg" className="cta-primary">
                    Demander un audit
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/packs">
                  <Button size="lg" variant="outline">
                    Voir les packs
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default About;
