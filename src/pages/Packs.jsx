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
              <div className="tab-stats-section">
                {activePack.progress.map((p, i) => (
                  <div key={i} className="tab-stat-item">
                    <div className="tab-stat-number">{p.value}%</div>
                    <div className="tab-stat-label">{p.label}</div>
                  </div>
                ))}
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
            <div className="comparatif-cta-row">
              <div className="comparatif-cta-col">
                <Link to="/contact">
                  <Button size="sm" className="comparatif-cta-btn comparatif-cta-btn--confort">
                    Choisir Confort
                  </Button>
                </Link>
              </div>
              <div className="comparatif-cta-col comparatif-cta-col--featured">
                <Link to="/contact">
                  <Button size="sm" className="comparatif-cta-btn comparatif-cta-btn--sweet">
                    Choisir Sweet Home
                  </Button>
                </Link>
              </div>
              <div className="comparatif-cta-col">
                <Link to="/contact">
                  <Button size="sm" className="comparatif-cta-btn comparatif-cta-btn--prestige">
                    Choisir Prestige
                  </Button>
                </Link>
              </div>
            </div>
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
              <AccordionItem value="q1">
                <AccordionTrigger>Comment fonctionne la commission ?</AccordionTrigger>
                <AccordionContent>
                  <p>La commission est prélevée uniquement sur les réservations confirmées.
                  Sur 1 000€ de revenus bruts, le Pack Confort (15%) représente 150€ —
                  vous recevez 850€. Aucun frais fixe, aucun frais caché.</p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="q2">
                <AccordionTrigger>Que se passe-t-il si un voyageur casse quelque chose ?</AccordionTrigger>
                <AccordionContent>
                  <p>Nous documentons l'état du logement avant et après chaque séjour
                  (photos horodatées). En cas de dégradation, nous gérons le signalement
                  auprès de la plateforme (Airbnb AirCover ou Booking) et vous accompagnons
                  dans la procédure de remboursement.</p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="q3">
                <AccordionTrigger>Y a-t-il un engagement minimum de durée ?</AccordionTrigger>
                <AccordionContent>
                  <p>Non. Pas d'engagement de durée, pas de frais de résiliation.
                  Un préavis de 30 jours suffit pour mettre fin au mandat, à tout moment.</p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="q4">
                <AccordionTrigger>Quels sont les délais de paiement ?</AccordionTrigger>
                <AccordionContent>
                  <p>Les revenus de vos réservations vous sont reversés chaque mois,
                  après déduction de notre commission. Vous recevez un récapitulatif
                  détaillé de toutes les réservations du mois.</p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="q5">
                <AccordionTrigger>Comment gérez-vous les avis négatifs ?</AccordionTrigger>
                <AccordionContent>
                  <p>Nous répondons à chaque avis au nom du propriétaire, de façon
                  professionnelle et constructive. En cas d'avis injustifié, nous
                  accompagnons la contestation auprès de la plateforme. Notre objectif :
                  maintenir une note moyenne supérieure à 4,8/5.</p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="q6">
                <AccordionTrigger>Êtes-vous déclarés et assurés ?</AccordionTrigger>
                <AccordionContent>
                  <p>Oui. AJ Prestige est une société légalement constituée, titulaire
                  d'une assurance Responsabilité Civile Professionnelle. Nous vous
                  accompagnons également dans vos démarches de déclaration en mairie
                  (numéro d'enregistrement obligatoire à Paris et en IDF).</p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="q7">
                <AccordionTrigger>Puis-je bloquer des dates pour usage personnel ?</AccordionTrigger>
                <AccordionContent>
                  <p>Absolument. Vous restez propriétaire et maître de votre calendrier.
                  Il vous suffit de nous prévenir à l'avance et nous bloquons les dates
                  souhaitées sur toutes les plateformes.</p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="q8">
                <AccordionTrigger>Que comprend l'audit gratuit ?</AccordionTrigger>
                <AccordionContent>
                  <p>L'audit inclut une visite de votre bien, une analyse du potentiel
                  locatif basée sur les données du marché local (AirDNA, Airbtics),
                  une estimation des revenus nets mensuels et nos recommandations
                  personnalisées pour maximiser votre rendement.</p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      <section className="simple-cta-section section-padding">
        <div className="container">
          <div className="simple-cta-card reveal-element" ref={addToRefs}>
            <h2 className="simple-cta-title">Besoin d'un conseil ?</h2>
            <p className="simple-cta-subtitle">Demandez votre audit gratuit, nous vous recommanderons le pack idéal</p>
            <Link to="/contact">
              <Button size="lg" className="cta-primary">
                Demander un audit
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Packs;
