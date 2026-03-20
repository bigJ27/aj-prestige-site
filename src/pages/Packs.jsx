import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, X } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../components/ui/accordion';

const packs = [
  {
    id: 'confort',
    label: 'Confort',
    badge: 'Essentiel',
    badgeClass: 'pack-badge-comfort',
    price: '15%',
    priceLabel: 'de commission',
    intro: "L'essentiel pour démarrer votre location courte durée en toute sérénité. Nous gérons les réservations, le ménage et l'accueil voyageurs.",
    featuresTitle: 'Inclus dans le pack',
    features: [
      'Gestion complète réservations & messages',
      'Ménage professionnel + linge',
      'Check-in & check-out',
      'Réassort produits essentiels',
      'Visite mensuelle du logement',
      'Assistance voyageurs 24/7',
    ],
    accordion: [
      { label: 'Idéal si...', content: "Vous démarrez dans la location courte durée et souhaitez déléguer l'essentiel sans vous ruiner. Votre annonce est déjà créée et votre logement équipé." },
      { label: 'Limites', content: "Pas d'optimisation de l'annonce ni de photos pro. Boîte à clés et gestion artisans non incluses. Pour aller plus loin, découvrez nos packs Sweet Home et Prestige." },
    ],
    cta: 'Choisir Confort',
    accentColor: '#f97316',
  },
  {
    id: 'sweet',
    label: 'Sweet Home',
    badge: 'Recommandé',
    badgeClass: 'pack-badge-sweet',
    recommended: true,
    price: '20%',
    priceLabel: 'de commission',
    intro: "Pack Confort + optimisation complète de votre annonce pour maximiser réservations et revenus. L'expérience voyageurs sublimée.",
    featuresTitle: 'Tout Confort +',
    features: [
      'Boîte à clés installée & gérée',
      'Photos professionnelles',
      'Optimisation annonce (titre, description, tags)',
      'Expérience "Home Feeling" renforcée',
      'Gestion active des avis voyageurs',
      "Conseils en architecture d'intérieur",
    ],
    progress: [
      { label: 'Automatisation', value: 85 },
      { label: 'Expérience voyageurs', value: 90 },
      { label: 'Optimisation annonce', value: 80 },
    ],
    cta: 'Choisir Sweet Home',
    accentColor: '#be185d',
  },
  {
    id: 'prestige',
    label: 'Prestige',
    badge: 'Premium',
    badgeClass: 'pack-badge-prestige',
    price: 'À partir de 25%',
    priceLabel: 'commission variable selon options',
    intro: "Le service le plus complet. Délégation totale avec intendance renforcée, gestion imprévus et optimisation revenus avancée.",
    featuresTitle: 'Tout Sweet Home +',
    features: [
      'Intendance renforcée (contrôles fréquents)',
      'Gestion imprévus & artisans',
      'Optimisation revenus avancée (pricing dynamique)',
      'Reporting mensuel détaillé',
      'Accueil premium personnalisé (option)',
    ],
    highlight: "Pour les propriétaires exigeants qui veulent un service irréprochable et maximiser leurs revenus sans aucune contrainte.",
    options: "Personnalisez votre pack avec des services additionnels : conciergerie événementielle, décoration saisonnière, services VIP pour vos voyageurs, et plus encore.",
    cta: 'Choisir Prestige',
    accentColor: '#9333ea',
  },
];

const Packs = () => {
  const [activeTab, setActiveTab] = useState('sweet');
  const sectionsRef = useRef([]);
  const autoplayRef = useRef(null);
  const pauseRef = useRef(null);
  const packIds = ['confort', 'sweet', 'prestige'];

  const startAutoplay = () => {
    if (autoplayRef.current) clearInterval(autoplayRef.current);
    autoplayRef.current = setInterval(() => {
      setActiveTab(prev => {
        const idx = packIds.indexOf(prev);
        return packIds[(idx + 1) % packIds.length];
      });
    }, 6000);
  };

  useEffect(() => {
    startAutoplay();
    return () => {
      clearInterval(autoplayRef.current);
      clearTimeout(pauseRef.current);
    };
  }, []);

  const handleTabClick = (id) => {
    setActiveTab(id);
    if (autoplayRef.current) clearInterval(autoplayRef.current);
    if (pauseRef.current) clearTimeout(pauseRef.current);
    pauseRef.current = setTimeout(() => {
      startAutoplay();
    }, 15000);
  };

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('reveal-visible');
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -100px 0px' });
    sectionsRef.current.forEach(s => { if (s) observer.observe(s); });
    return () => observer.disconnect();
  }, []);

  const addToRefs = (el) => {
    if (el && !sectionsRef.current.includes(el)) sectionsRef.current.push(el);
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const activePack = packs.find(p => p.id === activeTab);

  return (
    <div className="packs-page">
      <section className="page-hero-section">
        <div className="page-hero-background">
          <img src="https://images.unsplash.com/photo-1712111891126-8496eb91f0a0?crop=entropy&cs=srgb&fm=jpg&q=85" alt="Salon vue ville" className="page-hero-image" />
          <div className="page-hero-overlay"></div>
        </div>
        <div className="page-hero-content">
          <div className="reveal-element" ref={addToRefs}>
            <h1 className="page-hero-title">Choisissez votre niveau<br />de délégation</h1>
            <p className="page-hero-subtitle">De l'essentiel au service premium complet, trouvez la formule adaptée à vos besoins</p>
          </div>
        </div>
      </section>

      <section className="tabs-section section-padding">
        <div className="container">

          <div className="tabs-selector">
            {packs.map(pack => (
              <button
                key={pack.id}
                className={`tab-btn ${activeTab === pack.id ? 'active' : ''}`}
                onClick={() => handleTabClick(pack.id)}
              >
                <span className="tab-btn-text">
                  {pack.label}
                  {pack.recommended && <span className="tab-badge">Recommandé</span>}
                </span>
              </button>
            ))}
          </div>

          <div className={`tab-content tab-content-${activeTab}`}>

            <div className="tab-header">
              <div className="tab-header-left">
                <span className={`pack-badge ${activePack.badgeClass}`}>{activePack.badge}</span>
                <h2 className="tab-pack-title">Pack {activePack.label}</h2>
                <div className="tab-price">
                  <span className="tab-price-number">{activePack.price}</span>
                  <span className="tab-price-label">{activePack.priceLabel}</span>
                </div>
              </div>
              <div className="tab-header-right">
                <p className="tab-intro">{activePack.intro}</p>
                <Link to="/contact">
                  <Button size="lg" className="tab-cta-btn">
                    {activePack.cta}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>

            <div className="tab-features-section">
              <h3 className="tab-features-title">{activePack.featuresTitle}</h3>
              <div className="tab-features-grid">
                {activePack.features.map((f, i) => (
                  <div key={i} className="tab-feature-item">
                    <Check className="h-4 w-4" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            {activePack.progress && (
              <div className="tab-progress-section">
                <h4 className="tab-progress-title">Performance</h4>
                <div className="tab-progress-grid">
                  {activePack.progress.map((p, i) => (
                    <div key={i} className="tab-progress-item">
                      <div className="tab-progress-label">
                        <span>{p.label}</span>
                        <span className="tab-progress-value">{p.value}%</span>
                      </div>
                      <div className="tab-progress-bar">
                        <div className="tab-progress-fill" style={{ width: `${p.value}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activePack.highlight && (
              <div className="tab-highlight">
                <p>{activePack.highlight}</p>
              </div>
            )}

            {activePack.options && (
              <div className="tab-options">
                <h4 className="tab-options-title">Options disponibles</h4>
                <p className="tab-options-desc">{activePack.options}</p>
              </div>
            )}

            {activePack.accordion && (
              <div className="tab-accordion">
                <Accordion type="single" collapsible>
                  {activePack.accordion.map((item, i) => (
                    <AccordionItem key={i} value={`item-${i}`}>
                      <AccordionTrigger>{item.label}</AccordionTrigger>
                      <AccordionContent><p>{item.content}</p></AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            )}
          </div>

          <div className="tabs-nav-links">
            <button className="tabs-nav-link" onClick={() => scrollToSection('comparatif')}>
              ⇄ Voir le comparatif
            </button>
            <span className="tabs-nav-separator">·</span>
            <button className="tabs-nav-link" onClick={() => scrollToSection('faq')}>
              ? Questions fréquentes
            </button>
          </div>
        </div>
      </section>

      <section id="comparatif" className="comparatif-section section-padding">
        <div className="container">
          <div className="section-header reveal-element" ref={addToRefs}>
            <h2 className="section-title">Comparatif des packs</h2>
            <p className="section-subtitle">
              Trouvez la <span className="comparatif-subtitle-highlight">formule</span> qui vous correspond
            </p>
          </div>
          <div className="table-wrapper reveal-element" ref={addToRefs}>
            <table className="comparison-table">
              <thead>
                <tr><th>Fonctionnalité</th><th>Confort</th><th>Sweet Home</th><th>Prestige</th></tr>
              </thead>
              <tbody>
                <tr><td>Commission</td><td>15%</td><td>20%</td><td>25%</td></tr>
                <tr><td>Gestion réservations & messages</td><td><Check className="h-5 w-5 check-icon" /></td><td><Check className="h-5 w-5 check-icon" /></td><td><Check className="h-5 w-5 check-icon" /></td></tr>
                <tr><td>Ménage professionnel</td><td><Check className="h-5 w-5 check-icon" /></td><td><Check className="h-5 w-5 check-icon" /></td><td><Check className="h-5 w-5 check-icon" /></td></tr>
                <tr><td>Check-in / Check-out</td><td><Check className="h-5 w-5 check-icon" /></td><td><Check className="h-5 w-5 check-icon" /></td><td><Check className="h-5 w-5 check-icon" /></td></tr>
                <tr><td>Assistance 24/7</td><td><Check className="h-5 w-5 check-icon" /></td><td><Check className="h-5 w-5 check-icon" /></td><td><Check className="h-5 w-5 check-icon" /></td></tr>
                <tr><td>Boîte à clés</td><td><X className="h-5 w-5 cross-icon" /></td><td><Check className="h-5 w-5 check-icon" /></td><td><Check className="h-5 w-5 check-icon" /></td></tr>
                <tr><td>Photos professionnelles</td><td><X className="h-5 w-5 cross-icon" /></td><td><Check className="h-5 w-5 check-icon" /></td><td><Check className="h-5 w-5 check-icon" /></td></tr>
                <tr><td>Optimisation annonce</td><td><X className="h-5 w-5 cross-icon" /></td><td><Check className="h-5 w-5 check-icon" /></td><td><Check className="h-5 w-5 check-icon" /></td></tr>
                <tr><td>Gestion imprévus & artisans</td><td><X className="h-5 w-5 cross-icon" /></td><td><X className="h-5 w-5 cross-icon" /></td><td><Check className="h-5 w-5 check-icon" /></td></tr>
                <tr><td>Reporting mensuel</td><td><X className="h-5 w-5 cross-icon" /></td><td><X className="h-5 w-5 cross-icon" /></td><td><Check className="h-5 w-5 check-icon" /></td></tr>
                <tr><td>Pricing dynamique avancé</td><td><X className="h-5 w-5 cross-icon" /></td><td><X className="h-5 w-5 cross-icon" /></td><td><Check className="h-5 w-5 check-icon" /></td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section id="faq" className="faq-section section-padding">
        <div className="container">
          <div className="section-header reveal-element" ref={addToRefs}>
            <h2 className="section-title">Questions fréquentes</h2>
          </div>
          <div className="faq-content reveal-element" ref={addToRefs}>
            <Accordion type="single" collapsible className="faq-accordion">
              <AccordionItem value="q1"><AccordionTrigger>Comment fonctionne la commission ?</AccordionTrigger><AccordionContent>La commission est prélevée uniquement sur les réservations confirmées. Si vous générez 1000€ de revenus, avec le pack Confort (15%), nous prélevons 150€ et vous recevez 850€. Simple et transparent.</AccordionContent></AccordionItem>
              <AccordionItem value="q2"><AccordionTrigger>Puis-je changer de pack ?</AccordionTrigger><AccordionContent>Oui, vous pouvez évoluer d'un pack à l'autre à tout moment selon vos besoins.</AccordionContent></AccordionItem>
              <AccordionItem value="q3"><AccordionTrigger>Y a-t-il un engagement minimum ?</AccordionTrigger><AccordionContent>Non, nous ne demandons aucun engagement de durée. Vous pouvez arrêter notre prestation avec un préavis de 30 jours.</AccordionContent></AccordionItem>
              <AccordionItem value="q4"><AccordionTrigger>Que comprend l'audit gratuit ?</AccordionTrigger><AccordionContent>L'audit inclut une visite de votre bien, une analyse du potentiel locatif, une estimation des revenus possibles et nos recommandations personnalisées.</AccordionContent></AccordionItem>
              <AccordionItem value="q5"><AccordionTrigger>Gérez-vous Airbnb et Booking ?</AccordionTrigger><AccordionContent>Oui, nous gérons tous les canaux de réservation : Airbnb, Booking.com, et autres plateformes. Calendrier synchronisé pour éviter les doublons.</AccordionContent></AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      <section className="final-cta-section section-padding">
        <div className="container">
          <Card className="final-cta-card glass-card reveal-element" ref={addToRefs}>
            <CardContent className="final-cta-content">
              <h2 className="final-cta-title">Besoin d'un conseil ?</h2>
              <p className="final-cta-subtitle">Demandez votre audit gratuit, nous vous recommanderons le pack idéal</p>
              <div className="cta-buttons">
                <Link to="/contact"><Button size="lg" className="cta-primary">Demander un audit<ArrowRight className="ml-2 h-5 w-5" /></Button></Link>
                <Link to="/pourquoi-nous"><Button size="lg" variant="outline">Pourquoi nous ?</Button></Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Packs;
