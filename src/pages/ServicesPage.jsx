import React, { useState } from 'react';
import { MessageSquare, Check, ChevronDown, ChevronUp, ArrowRight, ShieldCheck, Cpu, Zap, Activity } from 'lucide-react';
import { SERVICES, PILLARS } from '../data/content';

export function ServicesPage({ onOpenBooking }) {
  const [activePillar, setActivePillar] = useState('all');
  const [expandedId, setExpandedId] = useState(null);

  const filteredServices = activePillar === 'all'
    ? SERVICES
    : SERVICES.filter((s) => s.pillar === activePillar);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div>
      {/* Page Header (NO LABELS ABOVE TITLE) */}
      <div className="page-header">
        <div className="container">
          <h1 className="page-title">
            12 Domaines d’Intervention Technologique & R&D
          </h1>
          <p className="page-description">
            Une approche pragmatique « locale dans une démarche globale », structurée autour de 3 pôles d'excellence :
            Innovation & R&D, Performance Industrielle, Digitalisation & Data Science.
          </p>
        </div>
      </div>

      <div className="container" style={{ paddingBottom: '90px' }}>
        {/* Core Method and Qualities Box */}
        <div
          className="card reveal-on-scroll"
          style={{
            backgroundColor: '#ffffff',
            border: '1px solid var(--border-subtle)',
            padding: '32px',
            marginBottom: '48px'
          }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '28px' }}>
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', marginBottom: '12px' }}>
                Modalités & Cadre d'Intervention
              </h3>
              <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: '12px' }}>
                Laurent Manouaba s’adapte à votre gouvernance : il peut intervenir <strong>en interne</strong> au sein de vos équipes,
                en tant que <strong>salarié ou partenaire de cabinet de conseil</strong>, ou en <strong>mandat freelance indépendant</strong>.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.86rem', color: 'var(--text-secondary)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Check size={16} color="var(--color-emerald)" />
                  <span>Management de proximité & suivi local dans chaque région</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Check size={16} color="var(--color-emerald)" />
                  <span>Accords de confidentialité et secret professionnel stricts</span>
                </div>
              </div>
            </div>

            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', marginBottom: '12px' }}>
                Socle de Compétences Techniques
              </h3>
              <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: '12px' }}>
                Une double culture ingénierie et management :
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px', fontSize: '0.84rem' }}>
                <div style={{ padding: '8px 10px', backgroundColor: '#f8fafc', borderRadius: 'var(--radius-sm)' }}>
                  <strong>Informatique & Données</strong>
                </div>
                <div style={{ padding: '8px 10px', backgroundColor: '#f8fafc', borderRadius: 'var(--radius-sm)' }}>
                  <strong>Électricité & Électronique</strong>
                </div>
                <div style={{ padding: '8px 10px', backgroundColor: '#f8fafc', borderRadius: 'var(--radius-sm)' }}>
                  <strong>Génie des procédés</strong>
                </div>
                <div style={{ padding: '8px 10px', backgroundColor: '#f8fafc', borderRadius: 'var(--radius-sm)' }}>
                  <strong>Management d’innovation</strong>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Switcher */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '10px',
            marginBottom: '40px'
          }}
        >
          {PILLARS.map((p) => {
            const isActive = activePillar === p.id;
            return (
              <button
                key={p.id}
                onClick={() => setActivePillar(p.id)}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.88rem',
                  fontWeight: '600',
                  padding: '10px 20px',
                  borderRadius: 'var(--radius-full)',
                  border: isActive
                    ? '1px solid var(--color-brand-primary)'
                    : '1px solid var(--border-subtle)',
                  backgroundColor: isActive ? 'var(--color-brand-primary)' : '#ffffff',
                  color: isActive ? '#ffffff' : 'var(--text-secondary)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: isActive ? '0 4px 12px rgba(13, 148, 136, 0.25)' : 'var(--shadow-sm)'
                }}
              >
                {p.name}
              </button>
            );
          })}
        </div>

        {/* 12 Services Detailed Grid (NO LABELS ABOVE TITLES) */}
        <div className="grid-3" style={{ marginBottom: '48px' }}>
          {filteredServices.map((service) => {
            const isExpanded = expandedId === service.id;
            return (
              <div
                key={service.id}
                className="card reveal-on-scroll"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  backgroundColor: '#ffffff'
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <span style={{ fontSize: '0.82rem', fontWeight: '800', color: 'var(--color-brand-primary)' }}>
                      Domaine {service.id < 10 ? `0${service.id}` : service.id}
                    </span>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                      {service.tag}
                    </span>
                  </div>

                  <h3
                    style={{
                      fontSize: '1.2rem',
                      fontWeight: '800',
                      color: 'var(--text-primary)',
                      marginBottom: '12px',
                      lineHeight: 1.3
                    }}
                  >
                    {service.title}
                  </h3>

                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '16px' }}>
                    {service.shortDesc}
                  </p>

                  {isExpanded && (
                    <div
                      style={{
                        padding: '14px',
                        backgroundColor: '#f8fafc',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--border-subtle)',
                        marginBottom: '16px',
                        fontSize: '0.85rem'
                      }}
                    >
                      <div style={{ marginBottom: '10px' }}>
                        <strong style={{ color: 'var(--text-primary)' }}>Livrable & Méthode :</strong>
                        <p style={{ marginTop: '4px', color: 'var(--text-secondary)' }}>{service.deliverable}</p>
                      </div>
                      <div>
                        <strong style={{ color: 'var(--text-primary)' }}>Public recommandé :</strong>
                        <p style={{ marginTop: '4px', color: 'var(--text-secondary)' }}>{service.target}</p>
                      </div>
                    </div>
                  )}
                </div>

                <div style={{ paddingTop: '16px', borderTop: '1px solid var(--border-subtle)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                    <button
                      onClick={() => toggleExpand(service.id)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--text-secondary)',
                        fontSize: '0.82rem',
                        fontWeight: '600',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        padding: '6px 0'
                      }}
                    >
                      <span>{isExpanded ? 'Moins de détails' : 'Voir les livrables'}</span>
                      {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>

                    <button
                      onClick={() => onOpenBooking(`Service N°${service.id} : ${service.title}`)}
                      className="btn btn-whatsapp btn-sm"
                    >
                      <MessageSquare size={14} />
                      <span>Prendre RDV</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Global CTA Box */}
        <div
          className="card reveal-on-scroll"
          style={{
            textAlign: 'center',
            backgroundColor: '#ffffff',
            padding: '36px 20px',
            border: '1px solid var(--border-subtle)'
          }}
        >
          <h2 style={{ fontSize: '1.45rem', fontWeight: '800', marginBottom: '10px' }}>
            Vous souhaitez combiner plusieurs domaines sur un même projet ?
          </h2>
          <p style={{ fontSize: '0.94rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto 20px' }}>
            Laurent Manouaba conçoit des schémas directeurs transversaux adaptés à vos contraintes de temps et de budget.
          </p>
          <button
            onClick={() => onOpenBooking('Étude transversale multi-services')}
            className="btn btn-whatsapp btn-lg"
          >
            <MessageSquare size={18} />
            <span>Demander un devis personnalisé</span>
          </button>
        </div>
      </div>
    </div>
  );
}
