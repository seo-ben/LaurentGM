import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Calendar } from 'lucide-react';

export function Header({ currentPage, onNavigate, onOpenBooking }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Accueil' },
    { id: 'services', label: 'Services' },
    { id: 'realisations', label: 'Réalisations' },
    { id: 'pricing', label: 'Prix & Formules' },
    { id: 'about', label: 'À Propos' },
    { id: 'blog', label: 'Blog & Recherche' },
    { id: 'contact', label: 'Contact' }
  ];

  const handleLinkClick = (id) => {
    onNavigate(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.94)' : 'rgba(255, 255, 255, 0.88)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(15, 23, 42, 0.08)',
        transition: 'all 0.25s ease'
      }}
    >
      <div className="container" style={{ maxWidth: '1280px' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '70px',
            gap: '20px'
          }}
        >
          {/* Brand Logo & Name */}
          <div
            onClick={() => handleLinkClick('home')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              cursor: 'pointer',
              flexShrink: 0,
              userSelect: 'none'
            }}
          >
            <img
              src="/assets/logo.png"
              alt="Logo Laurent Manouaba"
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                objectFit: 'contain',
                boxShadow: '0 2px 8px rgba(13, 148, 136, 0.25)'
              }}
            />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.05rem',
                  fontWeight: '800',
                  color: 'var(--text-primary)',
                  letterSpacing: '-0.02em',
                  lineHeight: 1.15
                }}
              >
                Laurent G-M Manouaba
              </span>
              <span
                style={{
                  fontSize: '0.74rem',
                  fontWeight: '500',
                  color: '#64748b',
                  letterSpacing: '0.01em',
                  lineHeight: 1.2
                }}
              >
                Innovations Technologiques & R&D
              </span>
            </div>
          </div>

          {/* Desktop Navigation: Centered Capsule (Never Wrapping) */}
          <nav
            className="pro-desktop-nav"
            style={{
              display: 'none',
              alignItems: 'center',
              gap: '4px',
              backgroundColor: 'rgba(15, 23, 42, 0.04)',
              padding: '4px 6px',
              borderRadius: '9999px',
              border: '1px solid rgba(15, 23, 42, 0.08)'
            }}
          >
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleLinkClick(item.id)}
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.83rem',
                    fontWeight: isActive ? '700' : '500',
                    color: isActive ? '#0f172a' : '#475569',
                    backgroundColor: isActive ? '#ffffff' : 'transparent',
                    boxShadow: isActive ? '0 1px 4px rgba(15, 23, 42, 0.08)' : 'none',
                    border: 'none',
                    borderRadius: '9999px',
                    padding: '6px 13px',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    flexShrink: 0,
                    transition: 'all 0.18s ease'
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color = '#0f172a';
                      e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.6)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color = '#475569';
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Action CTA: Mint Pill in exact harmony with mockup */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
            <button
              onClick={() => onOpenBooking('Audit Découverte Offert (30 min)')}
              className="pro-header-cta"
              style={{
                display: 'none',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: '#00f5a0',
                color: '#0a1728',
                fontFamily: 'var(--font-body)',
                fontSize: '0.86rem',
                fontWeight: '800',
                padding: '9px 20px',
                borderRadius: '9999px',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 2px 10px rgba(0, 245, 160, 0.35)',
                transition: 'all 0.2s ease',
                whiteSpace: 'nowrap'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 4px 18px rgba(0, 245, 160, 0.6)';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 2px 10px rgba(0, 245, 160, 0.35)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <Calendar size={16} />
              <span>Prendre RDV</span>
              <ArrowUpRight size={14} />
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="pro-mobile-toggle"
              aria-label="Menu"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '40px',
                height: '40px',
                borderRadius: '8px',
                border: '1px solid rgba(15, 23, 42, 0.1)',
                backgroundColor: '#ffffff',
                color: '#0f172a',
                cursor: 'pointer'
              }}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div
            style={{
              padding: '16px',
              backgroundColor: '#ffffff',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border-subtle)',
              boxShadow: 'var(--shadow-xl)',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
              marginBottom: '16px'
            }}
          >
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleLinkClick(item.id)}
                  style={{
                    textAlign: 'left',
                    fontSize: '0.94rem',
                    fontWeight: isActive ? '700' : '500',
                    color: isActive ? '#0f172a' : '#475569',
                    backgroundColor: isActive ? 'rgba(15, 23, 42, 0.05)' : 'transparent',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  {item.label}
                </button>
              );
            })}
            <div style={{ height: '1px', backgroundColor: 'var(--border-subtle)', margin: '6px 0' }} />
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking('Audit Découverte Initial');
              }}
              style={{
                backgroundColor: '#00f5a0',
                color: '#0a1728',
                fontWeight: '800',
                padding: '12px',
                borderRadius: '9999px',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                cursor: 'pointer'
              }}
            >
              <Calendar size={17} />
              <span>Prendre RDV</span>
            </button>
          </div>
        )}
      </div>

      <style>{`
        @media (min-width: 1040px) {
          .pro-desktop-nav {
            display: flex !important;
          }
          .pro-header-cta {
            display: inline-flex !important;
          }
          .pro-mobile-toggle {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
}
