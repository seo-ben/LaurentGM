import React from 'react';
import { MapPin, Phone, Mail, Calendar, MessageSquare, ExternalLink, Shield } from 'lucide-react';
import { CONTACT_INFO } from '../data/content';
import { LinkedinIcon, FacebookIcon, TwitterXIcon, WhatsappIcon } from './SocialIcons';

export function Footer({ onNavigate, onOpenBooking }) {
  const currentYear = new Date().getFullYear();

  const handleNav = (page) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      style={{
        backgroundColor: '#0f172a',
        color: '#f8fafc',
        padding: '72px 0 36px',
        position: 'relative',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)'
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '40px',
            marginBottom: '56px'
          }}
        >
          {/* Identity & Mission */}
          <div>
            <div
              onClick={() => handleNav('home')}
              style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px', cursor: 'pointer' }}
            >
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  background: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '3px'
                }}
              >
                <img src="/assets/logo.png" alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              </div>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', fontWeight: '800', color: '#ffffff' }}>
                Laurent G-M Manouaba
              </div>
            </div>

            <p style={{ fontSize: '0.9rem', color: '#94a3b8', lineHeight: 1.6, marginBottom: '16px' }}>
              {CONTACT_INFO.tagline}
            </p>

            <p style={{ fontSize: '0.84rem', color: '#64748b', lineHeight: 1.6 }}>
              Cabinet de conseil en innovations technologiques, IA et performance industrielle.
              Accompagnement local dans une démarche globale.
            </p>
          </div>

          {/* Site Navigation */}
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: '800', color: '#ffffff', marginBottom: '16px' }}>
              Pages du Site
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.88rem' }}>
              {[
                { id: 'home', label: 'Accueil' },
                { id: 'services', label: '12 Services & Expertises' },
                { id: 'pricing', label: 'Prix & Formules' },
                { id: 'about', label: 'À Propos de Laurent' },
                { id: 'blog', label: 'Blog & Articles' },
                { id: 'contact', label: 'Contact & Rendez-vous' }
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => handleNav(link.id)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#cbd5e1',
                      cursor: 'pointer',
                      padding: 0,
                      fontSize: 'inherit',
                      textAlign: 'left',
                      transition: 'color 0.2s'
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-brand-primary)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#cbd5e1')}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Coordinates */}
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: '800', color: '#ffffff', marginBottom: '16px' }}>
              Coordonnées Officielles
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.86rem' }}>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', color: '#cbd5e1' }}>
                <MapPin size={16} color="var(--color-brand-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>{CONTACT_INFO.address}</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#cbd5e1' }}>
                <Phone size={16} color="var(--color-brand-primary)" style={{ flexShrink: 0 }} />
                <span>{CONTACT_INFO.phoneDisplay}</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#cbd5e1' }}>
                <Mail size={16} color="var(--color-brand-primary)" style={{ flexShrink: 0 }} />
                <a href={`mailto:${CONTACT_INFO.email}`} style={{ color: '#cbd5e1' }}>
                  {CONTACT_INFO.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Rendez-vous WhatsApp & Socials */}
          <div className="footer-col-contact">
            <h4 style={{ fontSize: '1rem', fontWeight: '800', color: '#ffffff', marginBottom: '16px' }}>
              Prise de Contact
            </h4>
            <button
              onClick={() => onOpenBooking('Prise de contact depuis le footer')}
              className="btn btn-whatsapp btn-block btn-sm"
              style={{ marginBottom: '12px' }}
            >
              <MessageSquare size={16} />
              <span>Prendre Rendez-vous</span>
            </button>

          

            <div className="footer-social-row" style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              {[
                { name: 'WhatsApp', icon: WhatsappIcon, url: CONTACT_INFO.socials.whatsapp, hoverColor: '#25d366', hoverBg: 'rgba(37, 211, 102, 0.2)' },
                { name: 'LinkedIn', icon: LinkedinIcon, url: CONTACT_INFO.socials.linkedin, hoverColor: '#0a66c2', hoverBg: 'rgba(10, 102, 194, 0.2)' },
                { name: 'Facebook', icon: FacebookIcon, url: CONTACT_INFO.socials.facebook, hoverColor: '#1877f2', hoverBg: 'rgba(24, 119, 242, 0.2)' },
                { name: 'Twitter (X)', icon: TwitterXIcon, url: CONTACT_INFO.socials.twitter, hoverColor: '#ffffff', hoverBg: 'rgba(255, 255, 255, 0.2)' }
              ].map((s) => {
                const IconComponent = s.icon;
                return (
                  <a
                    key={s.name}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={s.name}
                    aria-label={s.name}
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '50%',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: 'rgba(255, 255, 255, 0.08)',
                      color: '#cbd5e1',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      transition: 'all 0.22s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = s.hoverBg;
                      e.currentTarget.style.color = s.hoverColor;
                      e.currentTarget.style.borderColor = s.hoverColor;
                      e.currentTarget.style.transform = 'translateY(-2px) scale(1.08)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
                      e.currentTarget.style.color = '#cbd5e1';
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
                      e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    }}
                  >
                    <IconComponent size={18} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div
          className="footer-bottom-copy"
          style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            paddingTop: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px',
            fontSize: '0.8rem',
            color: '#64748b'
          }}
        >
          <div>
            © {currentYear} Laurent G-M Manouaba • Tous droits réservés.
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .footer-col-contact {
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            text-align: center !important;
          }
          .footer-social-row {
            justify-content: center !important;
            width: 100% !important;
            margin: 6px auto 0 !important;
          }
          .footer-calendly-link {
            justify-content: center !important;
            width: 100% !important;
          }
          .footer-bottom-copy {
            justify-content: center !important;
            text-align: center !important;
          }
        }
      `}</style>
    </footer>
  );
}
