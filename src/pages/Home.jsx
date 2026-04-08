import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Star, TrendingUp, Shield, Target, Camera } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import MetroJourneySection from '../components/MetroJourneySection';
import RevenueSimulator from '../components/RevenueSimulator';
import ComplianceSection from '../components/ComplianceSection';

const Home = () => {
  const heroRef = useRef(null);
  const sectionsRef = useRef([]);

  useEffect(() => {
    // Scroll reveal animations
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
    <div className="home-page">
      {/* Hero Section - Video Background Minimal */}
      <section ref={heroRef} className="hero-section-video">
        <div className="hero-video-background">
          <video 
            autoPlay 
            muted 
            loop 
            playsInline
            className="hero-video-element"
          >
            <source src="https://customer-assets.emergentagent.com/job_luxury-delegation/artifacts/k3p57h38_hf_20260310_125450_493fbc0d-bc4f-4182-b683-5fa41faa0281.mp4" type="video/mp4" />
          </video>
          <div className="hero-video-overlay"></div>
        </div>
        <div className="hero-video-content">
          <div className="reveal-element" ref={addToRefs}>
            <h1 className="hero-video-title">
              Votre bien,<br />
              Notre prestige
            </h1>
            <p className="hero-video-subtitle">
              Conciergerie Airbnb premium à Paris & Île-de-France — gestion complète de A à Z
            </p>
            <div className="hero-badges">
              <span className="hero-badge">Paris & Île-de-France</span>
              <span className="hero-badge">Commission 15–25%</span>
              <span className="hero-badge">Avis 5 étoiles</span>
            </div>
            <Link to="/packs">
              <Button size="lg" className="hero-discover-btn">
                Découvrir nos offres
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Separator */}
      <div className="section-separator" style={{'--from-color': 'transparent', '--to-color': '#fdf8f5'}}></div>

      {/* Notre Activité Section */}
      <section className="activity-section section-padding" ref={addToRefs}>
        <div className="container">
          <div className="activity-layout">
            <div className="activity-content reveal-element" ref={addToRefs}>
              <h2 className="activity-title">Conciergerie locative<br />courte durée</h2>
              <p className="activity-description">
                AJ Prestige est une conciergerie spécialisée dans la gestion locative
                courte durée sur Airbnb et Booking. Nous prenons en charge
                l'intégralité de votre bien — annonce, réservations, ménages,
                voyageurs — pendant que vous encaissez.
              </p>
              <div className="activity-highlights">
                <div className="highlight-item">
                  <div className="highlight-icon"><TrendingUp className="h-5 w-5" /></div>
                  <div className="highlight-text">
                    <strong>Revenus optimisés</strong>
                    <span>Pricing dynamique et calendrier intelligent pour maximiser chaque nuit</span>
                  </div>
                </div>
                <div className="highlight-item">
                  <div className="highlight-icon"><Shield className="h-5 w-5" /></div>
                  <div className="highlight-text">
                    <strong>Gestion complète A à Z</strong>
                    <span>Réservations, ménages professionnels, check-in/out 24h/24 7j/7</span>
                  </div>
                </div>
                <div className="highlight-item">
                  <div className="highlight-icon"><Star className="h-5 w-5" /></div>
                  <div className="highlight-text">
                    <strong>Avis 5 étoiles garantis</strong>
                    <span>Standards qualité premium et expérience voyageur soignée à chaque séjour</span>
                  </div>
                </div>
                <div className="highlight-item">
                  <div className="highlight-icon"><Target className="h-5 w-5" /></div>
                  <div className="highlight-text">
                    <strong>Commission transparente 15–25%</strong>
                    <span>Tout inclus, sans frais cachés, sans engagement de durée</span>
                  </div>
                </div>
                <div className="highlight-item">
                  <div className="highlight-icon"><Camera className="h-5 w-5" /></div>
                  <div className="highlight-text">
                    <strong>Mise en place offerte</strong>
                    <span>Photos professionnelles, création et optimisation de l'annonce incluses</span>
                  </div>
                </div>
              </div>
              <Link to="/pourquoi-nous">
                <Button size="lg" className="activity-btn">
                  En savoir plus
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
            <div className="activity-visual reveal-element" ref={addToRefs}>
              <div className="simulator-embed-label">
                <span className="simulator-embed-overline">Simulateur de revenus</span>
                <p className="simulator-embed-sub">Estimez vos gains nets en quelques clics</p>
              </div>
              <RevenueSimulator embedded />
            </div>
          </div>
        </div>
      </section>

      {/* Votre Parcours Section - Serpentine Metro Line */}
      <MetroJourneySection />

      {/* Separator */}
      <div className="section-separator" style={{'--from-color': '#fdf8f5', '--to-color': '#fef3ea'}}></div>

      {/* Nos Packs Teaser */}
      <section className="packs-teaser-section section-padding" ref={addToRefs}>
        <div className="container">
          <div className="section-header reveal-element" ref={addToRefs}>
            <h2 className="section-title">Choisissez votre niveau de délégation</h2>
            <p className="section-subtitle">Du service essentiel à la gestion premium complète</p>
          </div>
          <div className="packs-grid-detailed">
            <Card className="pack-card-detailed glass-card pack-card-side reveal-element" ref={addToRefs} style={{ borderTop: '3px solid #f97316' }}>
              <CardContent className="pack-content-detailed">
                <div className="pack-badge pack-badge-comfort">Essentiel</div>
                <h3 className="pack-name">Pack Confort</h3>
                <div className="pack-price">15%</div>
                <p className="pack-description-long">
                  L'essentiel pour démarrer sereinement dans la location courte durée. 
                  Nous prenons en charge la gestion complète des réservations, les échanges 
                  avec les voyageurs, le ménage professionnel entre chaque séjour, 
                  le check-in/check-out, et le réassort des produits essentiels.
                </p>
                <ul className="pack-features-mini">
                  <li><CheckCircle className="h-4 w-4" /> Gestion réservations & messages</li>
                  <li><CheckCircle className="h-4 w-4" /> Ménage professionnel + linge</li>
                  <li><CheckCircle className="h-4 w-4" /> Check-in & Check-out</li>
                  <li><CheckCircle className="h-4 w-4" /> Assistance voyageurs 24/7</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="pack-card-detailed glass-card pack-card-featured reveal-element" ref={addToRefs} style={{ borderTop: '3px solid #be185d', boxShadow: '0 0 0 2px #be185d22' }}>
              <CardContent className="pack-content-detailed">
                <div className="pack-badge pack-badge-sweet" style={{ fontSize: '0.85rem', padding: '0.5rem 1.25rem' }}>⭐ Recommandé</div>
                <h3 className="pack-name" style={{ fontSize: '2rem' }}>Pack Sweet Home</h3>
                <div className="pack-price" style={{ fontSize: '2.75rem' }}>20%</div>
                <p className="pack-description-long">
                  Notre pack le plus populaire ! Inclut tout du Pack Confort, 
                  plus l'optimisation complète de votre annonce avec photos professionnelles, 
                  installation et gestion d'une boîte à clés sécurisée, création d'une 
                  expérience "home feeling" pour vos voyageurs, et gestion active des avis 
                  pour booster votre visibilité.
                </p>
                <ul className="pack-features-mini">
                  <li><CheckCircle className="h-4 w-4" /> Tout Pack Confort inclus</li>
                  <li><CheckCircle className="h-4 w-4" /> Photos professionnelles</li>
                  <li><CheckCircle className="h-4 w-4" /> Optimisation annonce & SEO</li>
                  <li><CheckCircle className="h-4 w-4" /> Boîte à clés installée</li>
                  <li><CheckCircle className="h-4 w-4" /> Gestion des avis</li>
                  <li><CheckCircle className="h-4 w-4" /> Conseils architecture d'intérieur</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="pack-card-detailed glass-card pack-card-side reveal-element" ref={addToRefs} style={{ borderTop: '3px solid #9333ea' }}>
              <CardContent className="pack-content-detailed">
                <div className="pack-badge pack-badge-prestige">Premium</div>
                <h3 className="pack-name">Pack Prestige</h3>
                <div className="pack-price">À partir de 25%</div>
                <p className="pack-description-long">
                  Le service le plus complet pour les propriétaires exigeants. 
                  Tout du Pack Sweet Home, avec en plus une intendance renforcée 
                  (contrôles fréquents), la gestion complète des imprévus et artisans, 
                  un pricing dynamique avancé, et des options personnalisables.
                </p>
                <ul className="pack-features-mini">
                  <li><CheckCircle className="h-4 w-4" /> Tout Pack Sweet Home inclus</li>
                  <li><CheckCircle className="h-4 w-4" /> Intendance renforcée</li>
                  <li><CheckCircle className="h-4 w-4" /> Gestion imprévus & artisans</li>
                  <li><CheckCircle className="h-4 w-4" /> Pricing dynamique avancé</li>
                  <li><CheckCircle className="h-4 w-4" /> Options sur-mesure</li>
                </ul>
              </CardContent>
            </Card>
          </div>
          
          <div className="packs-cta-center reveal-element" ref={addToRefs}>
            <Link to="/packs">
              <Button size="lg" className="packs-discover-btn">
                Comparer tous les packs en détail
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Chiffres clés */}
      <section className="stats-section section-padding" ref={addToRefs}>
        <div className="container">
          <div className="section-header reveal-element" ref={addToRefs}>
            <span className="overline-light" style={{display:'block',marginBottom:'0.75rem'}}>AJ PRESTIGE EN CHIFFRES</span>
            <h2 className="section-title">Des résultats concrets</h2>
          </div>
          <div className="stats-grid">
            <div className="stat-card glass-card reveal-element" ref={addToRefs}>
              <div className="stat-number">+35%</div>
              <div className="stat-label">de revenus vs gestion solo</div>
            </div>
            <div className="stat-card glass-card reveal-element" ref={addToRefs}>
              <div className="stat-number">4,9/5</div>
              <div className="stat-label">note moyenne des biens gérés</div>
            </div>
            <div className="stat-card glass-card reveal-element" ref={addToRefs}>
              <div className="stat-number">72h</div>
              <div className="stat-label">pour mettre votre bien en ligne</div>
            </div>
            <div className="stat-card glass-card reveal-element" ref={addToRefs}>
              <div className="stat-number">0€</div>
              <div className="stat-label">de frais cachés, jamais</div>
            </div>
          </div>
        </div>
      </section>

      {/* Avis Google */}
      <section className="google-reviews-section section-padding" ref={addToRefs}>
        <div className="container">
          <script src="https://elfsightcdn.com/platform.js" async></script>
          <div className="elfsight-app-7e4fd3be-e87d-49eb-a166-d5c14e55d69a" data-elfsight-app-lazy></div>
        </div>
      </section>

      {/* Section conformité réglementaire */}
      <ComplianceSection />

      {/* CTA Final */}
      <section className="final-cta-section section-padding" ref={addToRefs}>
        <div className="container">
          <Card className="final-cta-card glass-card reveal-element" ref={addToRefs}>
            <CardContent className="final-cta-content">
              <h2 className="final-cta-title">Prêt à déléguer en toute sérénité ?</h2>
              <p className="final-cta-subtitle">
                Demandez votre audit gratuit et découvrez le potentiel de votre bien
              </p>
              <Link to="/contact">
                <Button size="lg" className="cta-primary">
                  Demander un audit gratuit
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Home;
