import React from 'react';
import { MessageSquare, ArrowRight, CheckCircle2, ShieldCheck, MapPin, Award, Calendar } from 'lucide-react';
import { CONTACT_INFO } from '../data/content';
import { PartnersMarquee } from '../components/PartnersMarquee';
import { MetricsTicker } from '../components/MetricsTicker';
import { Hero } from '../components/Hero';

import { WhyUsBento } from '../components/WhyUsBento';
import { RealisationsSection } from '../components/RealisationsSection';

export function HomePage({ onNavigate, onOpenBooking }) {
  return (
    <div>
      {/* Blueprint Architectural Hero Section (Matching user mockup) */}
      <Hero onNavigate={onNavigate} onOpenBooking={onOpenBooking} />

      {/* Ligne Déroulante des Indicateurs Stratégiques */}
      <MetricsTicker />

      {/* Pourquoi confier votre transformation technologique au cabinet - Bento Grid d'Élite */}
      <WhyUsBento onNavigate={onNavigate} />

      {/* Galerie des Réalisations de terrain LGM */}
      <RealisationsSection onNavigate={onNavigate} onOpenBooking={onOpenBooking} />


      {/* Call to action section - Direct sur le fond sans carte */}
      <section style={{ padding: '60px 0 80px', textAlign: 'center' }}>
        <div className="container">
          <div
            className="reveal-on-scroll"
            style={{
              maxWidth: '760px',
              margin: '0 auto',
              textAlign: 'center'
            }}
          >
            <h2
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(1.9rem, 3.2vw, 2.4rem)',
                fontWeight: '800',
                color: 'var(--text-primary)',
                letterSpacing: '-0.02em',
                marginBottom: '16px'
              }}
            >
              Un projet technologique ou une question stratégique ?
            </h2>
            <p
              style={{
                fontSize: '1.05rem',
                color: 'var(--text-secondary)',
                maxWidth: '640px',
                margin: '0 auto 28px',
                lineHeight: 1.65
              }}
            >
              Toutes les prises de rendez-vous et sessions de cadrage stratégique sont payantes, avec règlement sécurisé en ligne.
              Bénéficiez d'une étude approfondie et personnalisée pour structurer vos projets technologiques.
            </p>
            <button
              onClick={() => onNavigate('contact')}
              className="btn btn-whatsapp btn-lg"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                boxShadow: '0 8px 24px rgba(37, 211, 102, 0.28)'
              }}
            >
              <Calendar size={20} />
              <span>Prendre Rendez-vous</span>
            </button>
          </div>
        </div>
      </section>

      {/* Écosystèmes, Plateformes Cloud & Standards Technologiques Intégrés - Exactement avant le footer */}
      <PartnersMarquee />

      <style>{`
        @media (min-width: 992px) {
          .home-hero-grid {
            grid-template-columns: 1.15fr 0.85fr !important;
          }
        }
        @media (max-width: 768px) {
          .metric-box {
            border-right: none !important;
            border-bottom: 1px solid var(--border-subtle);
            padding-bottom: 14px;
          }
          .metric-box:last-child {
            border-bottom: none;
          }
        }
      `}</style>
    </div>
  );
}
