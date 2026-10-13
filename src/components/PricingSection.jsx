import React, { useState } from 'react';
import { Tag, Check, Star, ShieldCheck, MessageSquare, Info, Clock, ArrowRight } from 'lucide-react';
import { ANNUAL_PLANS, SPOT_PLANS } from '../data/content';

export function PricingSection({ onOpenBooking }) {
  const [billingTab, setBillingTab] = useState('annual'); // 'annual' or 'spot'

  return (
    <section id="tarifs" style={{ padding: '90px 0', position: 'relative' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-center reveal-on-scroll">
          <h2 className="section-title">
            Investissez dans des Formules à Fort Rendement
          </h2>
          <p className="section-subtitle">
            Un appel téléphonique de découverte est systématiquement offert.
            Choisissez entre un accompagnement annuel continu ou une mission ponctuelle d’intervention ciblée.
          </p>

          {/* Toggle between Annual Mentoring & Spot Consulting */}
          <div
            style={{
              display: 'inline-flex',
              padding: '4px',
              backgroundColor: '#f1f5f9',
              borderRadius: 'var(--radius-full)',
              border: '1px solid var(--border-subtle)',
              marginBottom: '48px'
            }}
          >
            <button
              onClick={() => setBillingTab('annual')}
              style={{
                padding: '10px 24px',
                borderRadius: 'var(--radius-full)',
                fontFamily: 'var(--font-body)',
                fontWeight: '700',
                fontSize: '0.9rem',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                backgroundColor: billingTab === 'annual' ? '#ffffff' : 'transparent',
                color: billingTab === 'annual' ? 'var(--color-brand-primary)' : 'var(--text-muted)',
                boxShadow: billingTab === 'annual' ? 'var(--shadow-sm)' : 'none'
              }}
            >
              Suivi Entrepreneurial Annuel (3 Formules)
            </button>
            <button
              onClick={() => setBillingTab('spot')}
              style={{
                padding: '10px 24px',
                borderRadius: 'var(--radius-full)',
                fontFamily: 'var(--font-body)',
                fontWeight: '700',
                fontSize: '0.9rem',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                backgroundColor: billingTab === 'spot' ? '#ffffff' : 'transparent',
                color: billingTab === 'spot' ? 'var(--color-brand-primary)' : 'var(--text-muted)',
                boxShadow: billingTab === 'spot' ? 'var(--shadow-sm)' : 'none'
              }}
            >
              Consultance Ponctuelle (3 Packs)
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid-3" style={{ marginBottom: '56px' }}>
          {(billingTab === 'annual' ? ANNUAL_PLANS : SPOT_PLANS).map((plan) => {
            return (
              <div
                key={plan.id}
                className="card reveal-on-scroll"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  backgroundColor: '#ffffff',
                  border: plan.recommended ? '2px solid var(--color-brand-primary)' : '1px solid var(--border-subtle)',
                  boxShadow: plan.recommended ? 'var(--shadow-xl)' : 'var(--shadow-sm)',
                  position: 'relative'
                }}
              >
                {/* Recommended Top Accent */}
                {plan.recommended && (
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '4px',
                      background: 'linear-gradient(90deg, #0d9488, #10b981)',
                      borderTopLeftRadius: 'var(--radius-lg)',
                      borderTopRightRadius: 'var(--radius-lg)'
                    }}
                  />
                )}

                <div style={{ position: 'relative' }}>
                  {/* DIRECT TITLE - ZERO LABELS ABOVE IT */}
                  <h3
                    style={{
                      fontSize: '1.4rem',
                      fontWeight: '800',
                      color: 'var(--text-primary)',
                      marginBottom: '6px',
                      lineHeight: 1.25,
                      minHeight: '38px',
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    {plan.name}
                  </h3>

                  {/* Subtitle / Category below title */}
                  <div
                    style={{
                      minHeight: '24px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      marginBottom: '12px',
                      fontSize: '0.84rem',
                      fontWeight: '700',
                      color: plan.recommended ? 'var(--color-brand-primary)' : 'var(--text-muted)'
                    }}
                  >
                    {plan.recommended ? (
                      <>
                        <Star size={14} fill="var(--color-brand-primary)" color="var(--color-brand-primary)" />
                        <span>Formule la plus sollicitée {plan.badge ? `(${plan.badge})` : ''}</span>
                      </>
                    ) : (
                      <span>{plan.badge || 'Formule Entrepreneuriale'}</span>
                    )}
                  </div>

                  <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '20px', minHeight: '44px' }}>
                    {plan.summary}
                  </p>

                  {/* Price Block */}
                  <div style={{ marginBottom: '20px', paddingBottom: '20px', borderBottom: '1px solid var(--border-subtle)' }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                      <span
                        style={{
                          fontFamily: 'var(--font-heading)',
                          fontSize: '2.4rem',
                          fontWeight: '800',
                          color: 'var(--text-primary)',
                          lineHeight: 1
                        }}
                      >
                        {plan.price}
                      </span>
                      <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                        / {plan.period}
                      </span>
                    </div>

                    {plan.duration && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', color: 'var(--color-brand-primary)', marginTop: '8px', fontWeight: '600' }}>
                        <Clock size={14} />
                        <span>{plan.duration}</span>
                      </div>
                    )}
                  </div>

                  {/* Features List */}
                  <div style={{ marginBottom: '28px' }}>
                    <div style={{ fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '12px' }}>
                      Ce qui est inclus :
                    </div>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {plan.features.map((feat) => (
                        <li key={feat} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.88rem' }}>
                          <Check size={16} color="var(--color-emerald)" style={{ flexShrink: 0, marginTop: '3px' }} />
                          <span style={{ color: 'var(--text-secondary)' }}>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Direct Clear-Purpose WhatsApp Booking CTA */}
                <div>
                  <button
                    onClick={() => onOpenBooking({
                      plan: plan,
                      planName: plan.name,
                      planPrice: plan.price,
                      planPeriod: plan.period,
                      planDuration: plan.duration,
                      badge: plan.badge,
                      whatsappPayload: plan.whatsappPayload,
                      summary: plan.summary
                    })}
                    className={`btn btn-block ${plan.recommended ? 'btn-whatsapp' : 'btn-outline'}`}
                  >
                    <MessageSquare size={16} />
                    <span>{plan.ctaText}</span>
                  </button>
                  <p style={{ textAlign: 'center', fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '8px' }}>
                    Entretien initial offert • Sans engagement
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Advisory Checklist: How to choose a consultant (From Synthesis document) */}
        <div
          className="card reveal-on-scroll"
          style={{
            backgroundColor: '#ffffff',
            border: '1px solid var(--border-subtle)',
            padding: '32px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <Info size={20} color="var(--color-brand-primary)" />
            <h4 style={{ fontSize: '1.2rem', fontWeight: '700', color: 'var(--text-primary)' }}>
              Les 5 règles d'or pour bien choisir votre consultant (Conseils du Cabinet)
            </h4>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '20px',
              fontSize: '0.88rem',
              color: 'var(--text-secondary)'
            }}
          >
            <div>
              <strong style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '4px' }}>
                1. Expertise transversale :
              </strong>
              Privilégiez un profil qui maîtrise aussi les domaines voisins (électricité, data, organisation), évitant d’embaucher 3 prestataires distincts.
            </div>
            <div>
              <strong style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '4px' }}>
                2. Pluralité d'approches :
              </strong>
              Un bon consultant propose plusieurs scénarios de résolution, pour ne pas répéter une méthode déjà tentée sans succès.
            </div>
            <div>
              <strong style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '4px' }}>
                3. Preuves concrètes vs CV :
              </strong>
              Les cas réels et les témoignages de terrain valent infiniment mieux qu’un diplôme théorique sans application.
            </div>
            <div>
              <strong style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '4px' }}>
                4. Disponibilité exclusive :
              </strong>
              Vérifiez la charge de travail réelle du consultant pour garantir son immersion pleine sur votre dossier.
            </div>
            <div>
              <strong style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '4px' }}>
                5. Clarté des honoraires (TJM) :
              </strong>
              Ce qui compte est la valeur nette dégagée pour le prix payé. Tout doit être cadré avant de signer.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
