import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, FileCheck, Calendar, Building2, Euro } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';

const items = [
  {
    Icon: FileCheck,
    title: 'Déclaration en mairie',
    desc: 'Enregistrement de votre meublé de tourisme et obtention du numéro obligatoire. AJ Prestige gère toutes les formalités administratives à votre place.',
  },
  {
    Icon: Calendar,
    title: 'Limite des 90 jours',
    desc: 'Suivi automatique du compteur de nuits pour les résidences principales parisiennes (90 j/an depuis 2025). Zéro risque de dépassement.',
  },
  {
    Icon: Building2,
    title: "Changement d'usage",
    desc: "Pour les résidences secondaires : accompagnement complet sur les autorisations de changement d'usage et compensations financières requises.",
  },
  {
    Icon: Euro,
    title: 'Taxe de séjour',
    desc: 'Déclaration et reversement automatique de la taxe de séjour aux collectivités. Vous ne touchez à rien, nous gérons tout.',
  },
];

export default function ComplianceSection() {
  const sectionsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('reveal-visible'); }),
      { threshold: 0.1, rootMargin: '0px 0px -80px 0px' }
    );
    sectionsRef.current.forEach(el => { if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  const addToRefs = (el) => {
    if (el && !sectionsRef.current.includes(el)) sectionsRef.current.push(el);
  };

  return (
    <section className="compliance-section section-padding">
      <div className="container">
        <div className="compliance-layout">

          <div className="compliance-header reveal-element" ref={addToRefs}>
            <span className="overline" style={{ color: 'rgba(255,255,255,0.9)', textShadow: '0 1px 4px rgba(0,0,0,0.4)' }}>CONFORMITÉ RÉGLEMENTAIRE</span>
            <h2 className="section-title" style={{ color: 'var(--color-white)', textShadow: '0 2px 12px rgba(0,0,0,0.35)' }}>
              Nous gérons votre<br />conformité intégrale
            </h2>
            <p className="section-subtitle" style={{ color: 'rgba(255,255,255,0.85)', textShadow: '0 1px 6px rgba(0,0,0,0.3)' }}>
              La réglementation Airbnb évolue en permanence à Paris et en Île-de-France.
              AJ Prestige est votre expert administratif et juridique.
            </p>
          </div>

          <div className="compliance-grid">
            {items.map(({ Icon, title, desc }, i) => (
              <Card
                key={i}
                className="compliance-card reveal-element"
                ref={addToRefs}
                style={{ transitionDelay: `${i * 0.08}s` }}
              >
                <CardContent className="compliance-card-content">
                  <div className="compliance-icon">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="compliance-card-title">{title}</h3>
                  <p className="compliance-card-desc">{desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="compliance-cta-block reveal-element" ref={addToRefs}>
            <div className="compliance-cta-text">
              <strong>Vous ne savez pas si votre bien est conforme ?</strong>
              <span> Demandez un audit gratuit — nous vérifions tout pour vous.</span>
            </div>
            <Link to="/contact">
              <Button size="lg" className="cta-primary">
                Audit de conformité gratuit
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
