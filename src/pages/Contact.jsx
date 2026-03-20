import React, { useState, useEffect, useRef } from 'react';
import { Instagram, Mail, MapPin, Phone, Send } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Checkbox } from '../components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { useToast } from '../hooks/use-toast';

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    propertyType: '',
    capacity: '',
    platform: '',
    listingUrl: '',
    message: '',
    consent: false
  });
  const [selectedPack, setSelectedPack] = useState('');
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleConsentChange = (checked) => {
    setFormData(prev => ({
      ...prev,
      consent: checked
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.consent) {
      toast({
        title: "Erreur",
        description: "Veuillez accepter la politique de confidentialité",
        variant: "destructive"
      });
      return;
    }

    if (!formData.name || !formData.email) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir les champs obligatoires",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Formspree - remplacez YOUR_FORM_ID par votre vrai ID Formspree
      // Ex: https://formspree.io/f/mwkgabcd
      const response = await fetch('https://formspree.io/f/xaqpbvjq', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone || '',
          city: formData.city || '',
          propertyType: formData.propertyType || '',
          capacity: formData.capacity || '',
          platform: formData.platform || '',
          listingUrl: formData.listingUrl || '',
          selectedPack: selectedPack || 'Non précisé',
          message: formData.message || ''
        })
      });

      if (response.ok) {
        toast({
          title: "Message envoyé !",
          description: "Nous vous répondrons sous 24h. À très bientôt !",
        });
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          city: '',
          propertyType: '',
          capacity: '',
          platform: '',
          listingUrl: '',
          message: '',
          consent: false
        });
        setSelectedPack('');
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue. Veuillez réessayer ou nous contacter directement.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-page">
      {/* Hero with Background Image */}
      <section className="page-hero-section">
        <div className="page-hero-background">
          <img 
            src="https://images.unsplash.com/photo-1649180447214-8deda9813f7f?crop=entropy&cs=srgb&fm=jpg&q=85"
            alt="Vue sur la ville au coucher de soleil depuis appartement"
            className="page-hero-image"
          />
          <div className="page-hero-overlay"></div>
        </div>
        <div className="page-hero-content">
          <div className="reveal-element" ref={addToRefs}>
            <h1 className="page-hero-title">
              Démarrons<br />
              ensemble
            </h1>
            <p className="page-hero-subtitle">
              Audit gratuit et estimation personnalisée de vos revenus potentiels
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="contact-content-section section-padding">
        <div className="container">
          <div className="contact-layout">
            {/* Form */}
            <div className="contact-form-wrapper reveal-element" ref={addToRefs}>
              <Card className="glass-card contact-form-card">
                <CardContent className="contact-form-content">
                  <h2 className="form-title">Demander un audit gratuit</h2>
                  <form onSubmit={handleSubmit} className="contact-form">
                    <div className="form-group">
                      <Label htmlFor="name">Nom complet *</Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        placeholder="Jean Dupont"
                      />
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          placeholder="jean@exemple.com"
                        />
                      </div>
                      <div className="form-group">
                        <Label htmlFor="phone">Téléphone</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="06 12 34 56 78"
                        />
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <Label htmlFor="city">Ville</Label>
                        <Input
                          id="city"
                          name="city"
                          type="text"
                          value={formData.city}
                          onChange={handleInputChange}
                          placeholder="Paris, Soisy-sous-Montmorency..."
                        />
                      </div>
                      <div className="form-group">
                        <Label htmlFor="propertyType">Type de bien</Label>
                        <Select 
                          value={formData.propertyType}
                          onValueChange={(value) => handleSelectChange('propertyType', value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="appartement">Appartement</SelectItem>
                            <SelectItem value="maison">Maison</SelectItem>
                            <SelectItem value="studio">Studio</SelectItem>
                            <SelectItem value="autre">Autre</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <Label htmlFor="capacity">Capacité (voyageurs)</Label>
                        <Input
                          id="capacity"
                          name="capacity"
                          type="number"
                          value={formData.capacity}
                          onChange={handleInputChange}
                          placeholder="2, 4, 6..."
                        />
                      </div>
                      <div className="form-group">
                        <Label htmlFor="platform">Plateforme</Label>
                        <Select 
                          value={formData.platform}
                          onValueChange={(value) => handleSelectChange('platform', value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="airbnb">Airbnb</SelectItem>
                            <SelectItem value="booking">Booking.com</SelectItem>
                            <SelectItem value="both">Les deux</SelectItem>
                            <SelectItem value="none">Aucune (nouveau)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="form-group">
                      <Label htmlFor="listingUrl">Lien de votre annonce (optionnel)</Label>
                      <Input
                        id="listingUrl"
                        name="listingUrl"
                        type="url"
                        value={formData.listingUrl}
                        onChange={handleInputChange}
                        placeholder="https://airbnb.com/..."
                      />
                    </div>

                    {/* Sélection du pack */}
                    <div className="form-group">
                      <Label>Pack qui vous intéresse</Label>
                      <div className="pack-selector">
                        {[
                          { id: "confort", label: "Pack Confort", price: "15%", desc: "L'essentiel pour démarrer" },
                          { id: "sweet", label: "Pack Sweet Home", price: "20%", desc: "Notre pack recommandé" },
                          { id: "prestige", label: "Pack Prestige", price: "25%+", desc: "Service premium complet" },
                        ].map(pack => (
                          <button
                            key={pack.id}
                            type="button"
                            className={`pack-select-btn ${selectedPack === pack.id ? 'selected' : ''} pack-select-${pack.id}`}
                            onClick={() => setSelectedPack(pack.id)}
                          >
                            <span className="pack-select-price">{pack.price}</span>
                            <span className="pack-select-name">{pack.label}</span>
                            <span className="pack-select-desc">{pack.desc}</span>
                            {selectedPack === pack.id && <span className="pack-select-check">✓</span>}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="form-group">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Parlez-nous de votre projet..."
                        rows={4}
                      />
                    </div>

                    <div className="form-group consent-group">
                      <div className="consent-wrapper">
                        <Checkbox 
                          id="consent"
                          checked={formData.consent}
                          onCheckedChange={handleConsentChange}
                        />
                        <Label htmlFor="consent" className="consent-label">
                          J'accepte que mes données soient utilisées pour me recontacter dans le cadre 
                          de ma demande. Vos données ne seront jamais partagées avec des tiers.
                        </Label>
                      </div>
                    </div>

                    <Button 
                      type="submit" 
                      size="lg" 
                      className="submit-button cta-primary"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Envoi en cours...' : 'Envoyer la demande'}
                      <Send className="ml-2 h-5 w-5" />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Info */}
            <div className="contact-info-wrapper">
              <Card className="glass-card contact-info-card reveal-element" ref={addToRefs}>
                <CardContent className="contact-info-content">
                  <h3 className="info-title">Informations</h3>
                  <div className="info-items">
                    <div className="info-item">
                      <div className="info-icon">
                        <Phone className="h-5 w-5" />
                      </div>
                      <div className="info-text">
                        <p className="info-label">Téléphone</p>
                        <a href="tel:+33622185785" className="info-value">
                          06 22 18 57 85
                        </a>
                      </div>
                    </div>
                    <div className="info-item">
                      <div className="info-icon">
                        <Mail className="h-5 w-5" />
                      </div>
                      <div className="info-text">
                        <p className="info-label">Email</p>
                        <a href="mailto:ajprestige.conciergerie@gmail.com" className="info-value">
                          ajprestige.conciergerie@gmail.com
                        </a>
                      </div>
                    </div>
                    <div className="info-item">
                      <div className="info-icon">
                        <MapPin className="h-5 w-5" />
                      </div>
                      <div className="info-text">
                        <p className="info-label">Zone d'intervention</p>
                        <p className="info-value">Soisy-sous-Montmorency<br />et région parisienne</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card social-card reveal-element" ref={addToRefs}>
                <CardContent className="social-content">
                  <h3 className="info-title">Suivez-nous</h3>
                  <div className="social-links">
                    <a 
                      href="https://www.instagram.com/aj_prestige_paris?igsh=MTV4YW9zcnJsem84Mw==" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="social-link"
                    >
                      <Instagram className="h-6 w-6" />
                      <span>@aj_prestige_paris</span>
                    </a>
                  </div>
                </CardContent>
              </Card>

              <div className="contact-note reveal-element" ref={addToRefs}>
                <p className="note-text">
                  💡 <strong>Réponse rapide garantie</strong><br />
                  Nous vous répondons sous 24h avec une première estimation 
                  et les prochaines étapes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
