import React from 'react';
import { UserCheck, Shield, CheckCircle2, HeartHandshake, Eye, Award, ExternalLink } from 'lucide-react';
import { CONTACT_INFO, SECTORS } from '../data/content';

export function AboutSection({ onOpenBooking }) {
  return (
    <section id="apropos" style={{ padding: '90px 0', position: 'relative' }}>
      <div className="container">
        <div className="section-center reveal-on-scroll">
          <h2 className="section-title">
            À Propos de Laurent G-M Manouaba
          </h2>
          <p className="section-subtitle">
            Une alliance rare entre rigueur scientifique, maîtrise technique pluridisciplinaire
            et engagement humain pour une technologie utile et accessible.
          </p>
        </div>

        {/* 2-Column Story: Photo + Narrative */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '48px',
            alignItems: 'center',
            marginBottom: '64px'
          }}
          className="about-grid"
        >
          {/* Images collage avec animation directionnelle */}
          <div className="reveal-left" style={{ position: 'relative' }}>
            <div
              className="image-zoom-card reveal-scale"
              style={{
                borderRadius: 'var(--radius-xl)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-xl)',
                border: '1px solid var(--border-subtle)',
                backgroundColor: '#ffffff'
              }}
            >
              <img
                src="/assets/avatar-suit.png"
                alt="Laurent G-M Manouaba en costume de travail"
                style={{
                  width: '100%',
                  aspectRatio: '4 / 3',
                  objectFit: 'cover',
                  objectPosition: 'center 20%'
                }}
              />
            </div>

            {/* Overlapping workshop photo: Real meeting proof */}
            <div
              style={{
                position: 'relative',
                marginTop: '-60px',
                marginLeft: 'auto',
                width: '78%',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                boxShadow: '0 16px 36px rgba(15, 23, 42, 0.2)',
                border: '4px solid #ffffff'
              }}
              className="workshop-badge-img image-zoom-card reveal-scale"
            >
              <img
                src="/assets/workshop-meeting.jpg"
                alt="Session d'atelier de travail en équipe avec Laurent Manouaba"
                style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
              />
            </div>
          </div>

          {/* Narrative & Credentials depuis la droite */}
          <div className="reveal-right">
            <h3
              style={{
                fontSize: '1.75rem',
                fontWeight: '800',
                color: 'var(--text-primary)',
                marginBottom: '16px',
                lineHeight: 1.25
              }}
            >
              « La technologie n’a de valeur que si elle libère le potentiel humain. »
            </h3>

            <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '16px' }}>
              Passionné de recherche scientifique appliquée et de dynamique entrepreneuriale,{' '}
              <strong>Laurent G-M Manouaba</strong> intervient comme consultant indépendant,
              partenaire de cabinets spécialisés ou conseiller de direction.
            </p>

            <p style={{ fontSize: '0.96rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '24px' }}>
              Son approche se distingue par une solide formation multidisciplinaire couvrant :
              l’<strong>informatique de pointe</strong>, l’<strong>électricité & l’électronique</strong>,
              le <strong>génie des procédés</strong>, les <strong>techniques d’analyse statistique</strong> et
              le <strong>management de l’innovation</strong>. Cette transversalité lui permet de dialoguer
              aussi bien avec des ingénieurs d'infrastructure qu'avec des directeurs financiers.
            </p>

            {/* Core Values */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px', marginBottom: '28px' }}>
              {[
                { title: 'Plaisir & Passion', desc: 'L’enthousiasme de résoudre des verrous complexes.' },
                { title: 'Excellence Rigueur', desc: 'Zéro approximation sur la sécurité et le code.' },
                { title: 'Collectif & Synergie', desc: 'Valorisation de l’intelligence d’équipe locale.' },
                { title: 'Honnêteté & Transparence', desc: 'Parler vrai sur la rentabilité réelle des projets.' }
              ].map((val) => (
                <div
                  key={val.title}
                  style={{
                    padding: '12px 14px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: '#ffffff',
                    border: '1px solid var(--border-subtle)'
                  }}
                >
                  <div style={{ fontWeight: '700', fontSize: '0.88rem', color: 'var(--color-brand-primary)', marginBottom: '2px' }}>
                    {val.title}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    {val.desc}
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => onOpenBooking('Échange direct avec Laurent Manouaba')}
              className="btn btn-whatsapp"
            >
              <span>Discuter de votre projet avec Laurent Manouaba</span>
            </button>
          </div>
        </div>

        {/* Industry Sectors Grid */}
        <div className="reveal-on-scroll">
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h3 style={{ fontSize: '1.4rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '8px' }}>
              Secteurs d’Activité & Domaines d’Impact
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              Une adaptation prouvée aux contraintes réglementaires et opérationnelles de chaque industrie.
            </p>
          </div>

          <div className="grid-3">
            {SECTORS.map((sec) => (
              <div
                key={sec.name}
                className="card"
                style={{
                  padding: '20px',
                  backgroundColor: '#ffffff',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px'
                }}
              >
                <div style={{ fontWeight: '700', fontSize: '0.98rem', color: 'var(--text-primary)' }}>
                  {sec.name}
                </div>
                <div style={{ fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
                  {sec.detail}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 992px) {
          .about-grid {
            grid-template-columns: 1fr 1.15fr !important;
          }
        }
        @media (max-width: 640px) {
          .workshop-badge-img {
            margin-top: 16px !important;
            width: 100% !important;
          }
        }
      `}</style>
    </section>
  );
}
