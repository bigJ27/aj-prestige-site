import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from './ui/button';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      <header className={`site-header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container">
          <div className="header-content">
            <Link to="/" className="logo">
              <span className="logo-aj">AJ</span>
              <span className="logo-prestige">Prestige</span>
            </Link>

            {/* Desktop Navigation - Centered */}
            <nav className="desktop-nav">
              <Link 
                to="/" 
                className={`nav-link ${isActive('/') ? 'active' : ''}`}
              >
                Accueil
              </Link>
              <Link 
                to="/packs" 
                className={`nav-link ${isActive('/packs') ? 'active' : ''}`}
              >
                Packs
              </Link>
              <Link 
                to="/pourquoi-nous" 
                className={`nav-link ${isActive('/pourquoi-nous') ? 'active' : ''}`}
              >
                Pourquoi nous ?
              </Link>
            </nav>

            {/* Contact Button - Right */}
            <div className="header-actions">
              <Link to="/contact">
                <Button size="sm" className="header-cta">
                  Contact
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="mobile-menu-button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu-overlay ${isMobileMenuOpen ? 'open' : ''}`}>
        <nav className="mobile-nav">
          <Link 
            to="/" 
            className={`mobile-nav-link ${isActive('/') ? 'active' : ''}`}
          >
            Accueil
          </Link>
          <Link 
            to="/packs" 
            className={`mobile-nav-link ${isActive('/packs') ? 'active' : ''}`}
          >
            Packs
          </Link>
          <Link 
            to="/pourquoi-nous" 
            className={`mobile-nav-link ${isActive('/pourquoi-nous') ? 'active' : ''}`}
          >
            Pourquoi nous ?
          </Link>
          <Link 
            to="/contact" 
            className={`mobile-nav-link ${isActive('/contact') ? 'active' : ''}`}
          >
            Contact
          </Link>
          <Link to="/contact" className="mobile-nav-cta">
            <Button size="lg" className="w-full cta-primary">
              Demander un audit
            </Button>
          </Link>
        </nav>
      </div>
    </>
  );
};

export default Header;
