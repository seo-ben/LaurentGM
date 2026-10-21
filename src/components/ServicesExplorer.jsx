import React, { useState } from 'react';
import { Layers, ChevronDown, ChevronUp, MessageSquare, CheckCircle, Sparkles, ArrowRight, CreditCard, Lock } from 'lucide-react';
import { getStripeConfig } from '../utils/stripeConfig';
import { useLanguage } from '../i18n/LanguageContext';

export function ServicesExplorer({ onOpenBooking }) {
  const { services, pillars, t } = useLanguage();
  const stripeConfig = getStripeConfig();
  const [activePillar, setActivePillar] = useState('all');
  const [expandedId, setExpandedId] = useState(null);

  const filteredServices = activePillar === 'all'
    ? services
    : services.filter((s) => s.pillar === activePillar);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="services" style={{ padding: '90px 0', position: 'relative' }}>
      <div className="container">
        {/* Section Heading */}
        <div className="section-center reveal-on-scroll">
          <h2 className="section-title">
            {t('servicesExplorer.title')}
          </h2>
          <p className="section-subtitle">
            {t('servicesExplorer.subtitle')}
          </p>
        </div>

        {/* Filter Tabs (Hick's Law Optimization) */}
        <div
          className="reveal-on-scroll"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '10px',
            marginBottom: '40px'
          }}
        >
          {pillars.map((p) => {
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

        {/* Services Cards Grid */}
        <div className="grid-3" style={{ marginBottom: '40px' }}>
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
                  {/* Service Top Badge */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '14px'
                    }}
                  >
                    <span
                      style={{
                        fontSize: '0.75rem',
                        fontWeight: '700',
                        color: 'var(--color-brand-primary)',
                        backgroundColor: 'var(--color-brand-light)',
                        padding: '4px 10px',
                        borderRadius: 'var(--radius-full)'
                      }}
                    >
                      {service.tag}
                    </span>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-light)', fontWeight: '600' }}>
                      N° {service.id < 10 ? `0${service.id}` : service.id}
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    style={{
                      fontSize: '1.18rem',
                      fontWeight: '700',
                      color: 'var(--text-primary)',
                      marginBottom: '12px',
                      lineHeight: 1.3
                    }}
                  >
                    {service.title}
                  </h3>

                  {/* Short Description */}
                  <p
                    style={{
                      fontSize: '0.9rem',
                      color: 'var(--text-secondary)',
                      lineHeight: 1.6,
                      marginBottom: '16px'
                    }}
                  >
                    {service.shortDesc}
                  </p>

                  {/* Expandable Details for deep investigation */}
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
                        <strong style={{ color: 'var(--text-primary)' }}>Cible recommandée :</strong>
                        <p style={{ marginTop: '4px', color: 'var(--text-secondary)' }}>{service.target}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Bottom Actions */}
                <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--border-subtle)' }}>
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
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        whiteSpace: 'nowrap'
                      }}
                      title="Prendre rendez-vous avec notre cabinet"
                    >
                      <MessageSquare size={14} />
                      <span>Prendre Rendez-vous</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Global Action Banner */}
        <div
          className="card reveal-on-scroll"
          style={{
            textAlign: 'center',
            backgroundColor: '#ffffff',
            border: '1px dashed rgba(13, 148, 136, 0.4)',
            padding: '28px'
          }}
        >
          <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
            Vous avez un besoin complexe combinant plusieurs de ces technologies ?
          </p>
          <button
            onClick={() => onOpenBooking('Projet Hybride / Multi-technologies')}
            className="btn btn-primary"
          >
            <span>Planifier un entretien de cadrage sur-mesure</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
