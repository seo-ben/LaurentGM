import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ArrowUpRight, Calendar } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { LanguageSelector } from './LanguageSelector';

export function Header({ currentPage, onNavigate, onOpenBooking }) {
  const { t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Triple-clic secret sur le logo pour accéder à l'espace Admin Studio
  const logoClicksRef = useRef(0);
  const clickTimerRef = useRef(null);

  const handleLogoClick = () => {
    logoClicksRef.current += 1;
    if (clickTimerRef.current) clearTimeout(clickTimerRef.current);

    if (logoClicksRef.current >= 3) {
      logoClicksRef.current = 0;
      onNavigate('studio');
      setMobileMenuOpen(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    handleLinkClick('home');

    clickTimerRef.current = setTimeout(() => {
      logoClicksRef.current = 0;
    }, 800);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: t('nav.home') },
    { id: 'services', label: t('nav.services') },
    { id: 'realisations', label: t('nav.realisations') },
    { id: 'pricing', label: t('nav.pricing') },
    { id: 'about', label: t('nav.about') },
    { id: 'blog', label: t('nav.blog') },
    { id: 'contact', label: t('nav.contact') }
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
        <div className="header-inner">
          {/* Brand Logo & Name avec triple-clic secret */}
          <div
            onClick={handleLogoClick}
            className="header-brand"
          >
            <img
              src="/assets/logo.png"
              alt="Logo LGM Consulting"
              className="header-brand-logo"
            />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span className="header-brand-title">
                LGM Consulting
              </span>
              <span className="header-brand-sub">
                {t('header.brandSub')}
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

          {/* Action CTA: Mint Pill & Sélecteur de Langue */}
          <div className="header-actions">
            {/* Sélecteur de Langue */}
            <LanguageSelector />

            <button
              onClick={() => onNavigate('contact')}
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
                padding: '9px 18px',
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
              <span>{t('header.ctaBook')}</span>
              <ArrowUpRight size={14} />
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="pro-mobile-toggle"
              aria-label="Menu"
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
              borderRadius: '16px',
              border: '1px solid rgba(15, 23, 42, 0.08)',
              boxShadow: '0 20px 40px -12px rgba(15, 23, 42, 0.18)',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
              marginBottom: '16px',
              maxHeight: 'calc(100vh - 80px)',
              overflowY: 'auto'
            }}
          >
            {/* Header branding inside drawer */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '4px 6px 12px',
                borderBottom: '1px solid rgba(15, 23, 42, 0.08)',
                marginBottom: '4px'
              }}
            >
              <img
                src="/assets/logo.png"
                alt="Logo LGM Consulting"
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  objectFit: 'contain'
                }}
              />
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontWeight: '800', fontSize: '0.95rem', color: '#0f172a' }}>
                  LGM Consulting
                </span>
                <span style={{ fontSize: '0.72rem', color: '#64748b' }}>
                  {t('header.brandSub')}
                </span>
              </div>
            </div>

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

            {/* Sélecteur de Langue dans le menu mobile */}
            <LanguageSelector variant="mobile-drawer" />

            <div style={{ height: '1px', backgroundColor: 'var(--border-subtle)', margin: '8px 0' }} />
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate('contact');
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
              <span>{t('header.ctaBook')}</span>
            </button>
          </div>
        )}
      </div>

      <style>{`
        .header-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 70px;
          gap: 16px;
          width: 100%;
          box-sizing: border-box;
        }

        .header-brand {
          display: flex;
          align-items: center;
          gap: 12px;
          cursor: pointer;
          flex-shrink: 0;
          user-select: none;
          min-width: 0;
        }

        .header-brand-logo {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          object-fit: contain;
          box-shadow: 0 2px 8px rgba(13, 148, 136, 0.25);
          flex-shrink: 0;
          transition: transform 0.2s ease;
        }

        .header-brand:hover .header-brand-logo {
          transform: scale(1.04);
        }

        .header-brand-title {
          font-family: var(--font-heading);
          font-size: 1.05rem;
          fontWeight: 800;
          color: var(--text-primary);
          letter-spacing: -0.02em;
          line-height: 1.15;
          white-space: nowrap;
        }

        .header-brand-sub {
          font-size: 0.74rem;
          font-weight: 500;
          color: #64748b;
          letter-spacing: 0.01em;
          line-height: 1.2;
          white-space: nowrap;
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-shrink: 0;
        }

        .pro-mobile-toggle {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 10px;
          border: 1px solid rgba(15, 23, 42, 0.12);
          background-color: #ffffff;
          color: #0f172a;
          cursor: pointer;
          flex-shrink: 0;
          box-shadow: 0 1px 3px rgba(15, 23, 42, 0.05);
          transition: all 0.2s ease;
        }

        .pro-mobile-toggle:hover {
          background-color: #f8fafc;
          border-color: rgba(15, 23, 42, 0.2);
        }

        .pro-mobile-toggle:active {
          transform: scale(0.96);
        }

        @media (max-width: 640px) {
          .header-inner {
            height: 62px;
            gap: 8px;
          }
          .header-brand {
            gap: 10px;
          }
          .header-brand-logo {
            width: 35px;
            height: 35px;
          }
          .header-brand-title {
            font-size: 1rem;
          }
          .header-brand-sub {
            display: none !important;
          }
          .header-actions {
            gap: 6px;
          }
          .pro-mobile-toggle {
            width: 38px;
            height: 38px;
            border-radius: 9px;
          }
        }

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
