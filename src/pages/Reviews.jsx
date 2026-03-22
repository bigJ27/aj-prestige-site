import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Star, ArrowRight, Quote } from 'lucide-react';
import { Button } from '../components/ui/button';

const Reviews = () => {
  const sectionsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('reveal-visible'); }),
      { threshold: 0.1 }
    );
    sectionsRef.current.forEach(el => { if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  const addToRefs = (el) => {
    if (el && !sectionsRef.current.includes(el)) sectionsRef.current.push(el);
  };

  return (
    <div className="reviews-page">

      {/* Hero */}
      <section className="reviews-hero section-padding">
        <div className="container">
          <div className="reviews-hero-content reveal-element" ref={addToRefs}>
            <span className="overline" style={{ color: '#f97316' }}>TÉMOIGNAGES CLIENTS</span>
            <h1 className="reviews-hero-title">
              Nos clients parlent<br />pour nous
            </h1>
            <p className="reviews-hero-subtitle">
              Des propriétaires satisfaits, des voyageurs comblés.
              Découvrez pourquoi AJ Prestige est la conciergerie de référence
              en Île-de-France.
            </p>
            <div className="reviews-rating-badge">
              <div className="reviews-stars-row">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5" fill="#f97316" color="#f97316" />
                ))}
              </div>
              <span className="reviews-score">5,0</span>
              <span className="reviews-platform">· Avis Google vérifiés</span>
            </div>
          </div>
        </div>
      </section>

      {/* Elfsight Widget */}
      <section className="reviews-widget-section section-padding">
        <div className="container">
          <script src="https://elfsightcdn.com/platform.js" async></script>
          <div
            className="elfsight-app-7e4fd3be-e87d-49eb-a166-d5c14e55d69a"
            data-elfsight-app-lazy
          ></div>
        </div>
      </section>

      {/* CTA */}
      <section className="reviews-cta-section section-padding">
        <div className="container">
          <div className="reviews-cta-content reveal-element" ref={addToRefs}>
            <Quote className="reviews-cta-icon" />
            <h2 className="reviews-cta-title">
              Rejoignez nos propriétaires satisfaits
            </h2>
            <p className="reviews-cta-subtitle">
              Confiez votre bien à AJ Prestige et bénéficiez d'une gestion
              locative d'excellence — sans effort de votre part.
            </p>
            <Link to="/contact">
              <Button size="lg" className="cta-primary">
                Demander un audit gratuit
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Reviews;
