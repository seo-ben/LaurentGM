import React, { useState, useRef } from 'react';
import {
  Check,
  Star,
  Clock,
  MessageSquare,
  Info,
  ShieldCheck,
  ArrowRight,
  Lock,
  Award,
  Sparkles
} from 'lucide-react';
import { ANNUAL_PLANS, SPOT_PLANS } from '../data/content';

/**
 * Animated 3D Interactive Pricing Card
 * STRICT RULES APPLIED:
 * 1. ZERO labels, pills, or tags above titles (Title is strictly the first element inside the card).
 * 2. No clipped text (No overflow-hidden negative-margin badges).
 * 3. Strict container containment: minmax(0, 1fr) grid to guarantee all 3 cards fit on screen without overflowing.
 * 4. Clicking button passes full plan object to launch prefilled modal immediately.
 */
function PricingCard({ plan, index, onSelect, tabKey }) {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({
    x: 0,
    y: 0,
    glareX: 50,
    glareY: 50,
    isHovered: false
  });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Gentle 3D rotation (-3deg to +3deg)
    const rotateX = ((y - centerY) / centerY) * -3;
    const rotateY = ((x - centerX) / centerX) * 3;

    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;

    setTilt({
      x: rotateX,
      y: rotateY,
      glareX,
      glareY,
      isHovered: true
    });
  };

  const handleMouseLeave = () => {
    setTilt({
      x: 0,
      y: 0,
      glareX: 50,
      glareY: 50,
      isHovered: false
    });
  };

  const isRec = Boolean(plan.recommended);

  // Staggered animation delay
  const enterDelay = `${0.06 + index * 0.1}s`;

  const handleSelectPlan = () => {
    onSelect({
      plan: plan,
      planName: plan.name,
      planPrice: plan.price,
      planPeriod: plan.period,
      planDuration: plan.duration,
      badge: plan.badge,
      whatsappPayload: plan.whatsappPayload,
      summary: plan.summary
    });
  };

  return (
    <div
      key={`${tabKey}-${plan.id}`}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
        width: '100%',
        minWidth: 0,
        boxSizing: 'border-box',
        backgroundColor: '#ffffff',
        borderRadius: '20px',
        padding: '30px 20px',
        border: isRec
          ? '2.5px solid #0d9488'
          : '1px solid rgba(15, 23, 42, 0.1)',
        boxShadow: tilt.isHovered
          ? isRec
            ? '0 24px 48px -10px rgba(13, 148, 136, 0.28), 0 0 0 2px rgba(13, 148, 136, 0.9)'
            : '0 20px 40px -12px rgba(15, 23, 42, 0.14), 0 0 0 1px rgba(13, 148, 136, 0.3)'
          : isRec
          ? '0 14px 32px -8px rgba(13, 148, 136, 0.22), 0 0 0 2px rgba(13, 148, 136, 0.75)'
          : '0 4px 16px -2px rgba(15, 23, 42, 0.05)',
        transform: tilt.isHovered
          ? `perspective(1000px) rotateX(${tilt.x.toFixed(2)}deg) rotateY(${tilt.y.toFixed(2)}deg) translateY(-6px)`
          : 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)',
        transition: tilt.isHovered
          ? 'transform 0.1s ease-out, box-shadow 0.25s ease'
          : 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s ease',
        animation: `pricingCardEnter 0.65s cubic-bezier(0.16, 1, 0.3, 1) both`,
        animationDelay: enterDelay
      }}
    >
      {/* Dynamic Specular Glare */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          pointerEvents: 'none',
          borderRadius: '18px',
          background: tilt.isHovered
            ? `radial-gradient(circle 320px at ${tilt.glareX}% ${tilt.glareY}%, rgba(255, 255, 255, 0.65), transparent 75%)`
            : 'none',
          transition: 'opacity 0.25s ease',
          opacity: tilt.isHovered ? 1 : 0,
          zIndex: 1
        }}
      />

      {/* Top Accent Gradient on Recommended Card (Inside card, no clipping) */}
      {isRec && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '5px',
            borderTopLeftRadius: '18px',
            borderTopRightRadius: '18px',
            background: 'linear-gradient(90deg, #0d9488, #10b981)',
            zIndex: 2
          }}
        />
      )}

      {/* Card Content Top Section */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        {/* ============================================================
            TITRE DIRECT - STRICTEMENT AUCUN LABEL AU-DESSUS DU TITRE
            ============================================================ */}
        <h2
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(1.22rem, 1.4vw, 1.38rem)',
            fontWeight: '800',
            color: '#0f172a',
            marginBottom: '6px',
            lineHeight: 1.25,
            letterSpacing: '-0.02em',
            minHeight: '38px',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          {plan.name}
        </h2>

        {/* Sous-titre descriptif / Catégorie placé SOUS le titre */}
        <div
          style={{
            minHeight: '26px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            marginBottom: '12px',
            fontSize: '0.84rem',
            fontWeight: '700',
            color: isRec ? '#0d9488' : '#64748b'
          }}
        >
          {isRec ? (
            <>
              <Star size={13} fill="#0d9488" color="#0d9488" />
              <span>Formule la plus sollicitée {plan.badge ? `(${plan.badge})` : ''}</span>
            </>
          ) : (
            <span>{plan.badge || 'Formule Entrepreneuriale'}</span>
          )}
        </div>

        {/* Résumé synthétique */}
        <p
          style={{
            fontSize: '0.86rem',
            color: '#475569',
            lineHeight: 1.5,
            marginBottom: '20px',
            minHeight: '44px'
          }}
        >
          {plan.summary}
        </p>

        {/* Bloc Tarif */}
        <div
          style={{
            marginBottom: '20px',
            paddingBottom: '18px',
            borderBottom: '1px solid rgba(15, 23, 42, 0.08)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
            <span
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '2.4rem',
                fontWeight: '800',
                color: '#0f172a',
                lineHeight: 1,
                letterSpacing: '-0.03em'
              }}
            >
              {plan.price}
            </span>
            <span
              style={{
                fontSize: '0.88rem',
                fontWeight: '600',
                color: '#64748b'
              }}
            >
              / {plan.period}
            </span>
          </div>

          {/* Durée pour les missions ponctuelles */}
          {plan.duration && (
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.78rem',
                color: '#0f766e',
                marginTop: '8px',
                fontWeight: '600',
                backgroundColor: '#f0fdfa',
                padding: '4px 10px',
                borderRadius: '6px',
                border: '1px solid rgba(13, 148, 136, 0.2)'
              }}
            >
              <Clock size={12} />
              <span>{plan.duration}</span>
            </div>
          )}
        </div>

        {/* Prestations Incluses */}
        <div style={{ marginBottom: '28px' }}>
          <div
            style={{
              fontSize: '0.75rem',
              fontWeight: '800',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              color: '#64748b',
              marginBottom: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <span>Prestations Incluses :</span>
            <div
              style={{
                flex: 1,
                height: '1px',
                backgroundColor: 'rgba(15, 23, 42, 0.08)'
              }}
            />
          </div>

          <ul
            style={{
              listStyle: 'none',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              margin: 0,
              padding: 0
            }}
          >
            {plan.features.map((feat, i) => (
              <li
                key={i}
                className="pricing-feature-row"
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '8px',
                  fontSize: '0.84rem',
                  lineHeight: '1.45',
                  color: '#334155',
                  transition: 'transform 0.18s ease, color 0.18s ease'
                }}
              >
                <span
                  className="pricing-feature-icon"
                  style={{
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    backgroundColor: '#ecfdf5',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    marginTop: '2px',
                    border: '1px solid rgba(5, 150, 105, 0.25)',
                    transition: 'all 0.18s ease'
                  }}
                >
                  <Check size={11} color="#059669" strokeWidth={3} />
                </span>
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Card Bottom Action */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        <button
          onClick={handleSelectPlan}
          className="btn btn-block"
          style={{
            backgroundColor: isRec ? '#0d9488' : '#ffffff',
            color: isRec ? '#ffffff' : '#0f172a',
            fontWeight: '700',
            fontSize: '0.88rem',
            padding: '12px 14px',
            borderRadius: '12px',
            border: isRec ? 'none' : '1.5px solid rgba(15, 23, 42, 0.14)',
            boxShadow: isRec
              ? '0 6px 18px rgba(13, 148, 136, 0.35)'
              : '0 2px 6px rgba(15, 23, 42, 0.04)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            cursor: 'pointer',
            transition: 'all 0.22s ease',
            whiteSpace: 'normal',
            textAlign: 'center',
            lineHeight: 1.3,
            width: '100%'
          }}
          onMouseEnter={(e) => {
            if (isRec) {
              e.currentTarget.style.backgroundColor = '#0f766e';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 10px 24px rgba(13, 148, 136, 0.45)';
            } else {
              e.currentTarget.style.borderColor = '#0d9488';
              e.currentTarget.style.color = '#0d9488';
              e.currentTarget.style.backgroundColor = '#f0fdfa';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }
          }}
          onMouseLeave={(e) => {
            if (isRec) {
              e.currentTarget.style.backgroundColor = '#0d9488';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 6px 18px rgba(13, 148, 136, 0.35)';
            } else {
              e.currentTarget.style.borderColor = 'rgba(15, 23, 42, 0.14)';
              e.currentTarget.style.color = '#0f172a';
              e.currentTarget.style.backgroundColor = '#ffffff';
              e.currentTarget.style.transform = 'translateY(0)';
            }
          }}
        >
          <MessageSquare size={15} style={{ flexShrink: 0 }} />
          <span>{plan.ctaText}</span>
          <ArrowRight size={14} style={{ flexShrink: 0 }} />
        </button>

        <p
          style={{
            textAlign: 'center',
            fontSize: '0.74rem',
            color: '#64748b',
            marginTop: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '4px'
          }}
        >
          <ShieldCheck size={12} color="#0d9488" />
          <span>Entretien initial offert • Sans engagement</span>
        </p>
      </div>
    </div>
  );
}

export function PricingPage({ onOpenBooking }) {
  const [tab, setTab] = useState('annual'); // 'annual' | 'spot'

  const currentPlans = tab === 'annual' ? ANNUAL_PLANS : SPOT_PLANS;

  return (
    <div style={{ position: 'relative' }}>
      {/* Inline styles for keyframe animations & responsive layout */}
      <style>{`
        @keyframes pricingCardEnter {
          0% {
            opacity: 0;
            transform: perspective(1000px) translateY(28px) scale(0.97);
          }
          100% {
            opacity: 1;
            transform: perspective(1000px) translateY(0) scale(1);
          }
        }
        .pricing-feature-row:hover {
          transform: translateX(4px);
          color: #0f172a !important;
        }
        .pricing-feature-row:hover .pricing-feature-icon {
          background-color: #d1fae5 !important;
          transform: scale(1.18);
          border-color: #059669 !important;
        }
        .guide-step-card {
          transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
        }
        .guide-step-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 14px 28px -6px rgba(15, 23, 42, 0.08);
          border-color: rgba(13, 148, 136, 0.35) !important;
        }
        .pricing-grid-3-clean {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 18px;
          align-items: stretch;
          width: 100%;
          max-width: 100%;
        }
        @media (max-width: 860px) {
          .pricing-grid-3-clean {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
        }
      `}</style>

      {/* En-tête de page officiel centré */}
      <div className="page-header">
        <div className="container">
          <h1 className="page-title">
            Grille des Prix & Formules d'Accompagnement
          </h1>
          <p className="page-description">
            Un appel téléphonique de découverte (30 min) est systématiquement offert et sans engagement avec Laurent Manouaba.
            Tarifs clairs, prévisibles et transparents sans coûts cachés.
          </p>

          {/* Ligne d'accent technologique sous le titre */}
          <div
            style={{
              width: '80px',
              height: '3px',
              background: 'linear-gradient(90deg, #0d9488, #10b981)',
              borderRadius: '9999px',
              margin: '22px auto 0 auto'
            }}
          />
        </div>
      </div>

      <div className="container" style={{ paddingBottom: '90px', maxWidth: '1240px' }}>
        {/* Toggle between Annual & Spot */}
        <div style={{ textAlign: 'center', marginBottom: '44px' }}>
          <div
            style={{
              display: 'inline-flex',
              padding: '5px',
              backgroundColor: '#f1f5f9',
              borderRadius: '9999px',
              border: '1px solid rgba(15, 23, 42, 0.08)',
              boxShadow: '0 2px 10px rgba(15, 23, 42, 0.04)'
            }}
          >
            <button
              onClick={() => setTab('annual')}
              style={{
                padding: '11px 24px',
                borderRadius: '9999px',
                fontFamily: 'var(--font-body)',
                fontWeight: '700',
                fontSize: '0.92rem',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.24s cubic-bezier(0.16, 1, 0.3, 1)',
                backgroundColor: tab === 'annual' ? '#ffffff' : 'transparent',
                color: tab === 'annual' ? '#0d9488' : '#64748b',
                boxShadow: tab === 'annual' ? '0 4px 12px rgba(15, 23, 42, 0.08)' : 'none',
                transform: tab === 'annual' ? 'scale(1)' : 'scale(0.98)'
              }}
            >
              Suivi Entrepreneurial Annuel (3 Formules)
            </button>
            <button
              onClick={() => setTab('spot')}
              style={{
                padding: '11px 24px',
                borderRadius: '9999px',
                fontFamily: 'var(--font-body)',
                fontWeight: '700',
                fontSize: '0.92rem',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.24s cubic-bezier(0.16, 1, 0.3, 1)',
                backgroundColor: tab === 'spot' ? '#ffffff' : 'transparent',
                color: tab === 'spot' ? '#0d9488' : '#64748b',
                boxShadow: tab === 'spot' ? '0 4px 12px rgba(15, 23, 42, 0.08)' : 'none',
                transform: tab === 'spot' ? 'scale(1)' : 'scale(0.98)'
              }}
            >
              Consultance Ponctuelle (3 Packs)
            </button>
          </div>
        </div>

        {/* 3 Pricing Cards Grid: Confinement strict 100% sans débordement */}
        <div
          className="pricing-grid-3-clean"
          style={{
            marginBottom: '72px'
          }}
        >
          {currentPlans.map((plan, index) => (
            <PricingCard
              key={`${tab}-${plan.id}`}
              plan={plan}
              index={index}
              onSelect={onOpenBooking}
              tabKey={tab}
            />
          ))}
        </div>

        {/* Engagements & Déontologie du Cabinet */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '20px',
            marginBottom: '60px'
          }}
        >
          <div
            className="guide-step-card reveal-on-scroll"
            style={{
              backgroundColor: '#ffffff',
              border: '1px solid rgba(15, 23, 42, 0.08)',
              borderRadius: '16px',
              padding: '24px',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '16px',
              boxShadow: '0 2px 8px rgba(15, 23, 42, 0.03)'
            }}
          >
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '12px',
                backgroundColor: '#f0fdfa',
                color: '#0d9488',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}
            >
              <Lock size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: '800', color: '#0f172a', marginBottom: '6px' }}>
                Confidentialité & Accords NDA
              </h3>
              <p style={{ fontSize: '0.86rem', color: '#475569', lineHeight: 1.5, margin: 0 }}>
                Signature systématique d'un accord de non-divulgation avant tout échange sur vos secrets d'affaires et brevets.
              </p>
            </div>
          </div>

          <div
            className="guide-step-card reveal-on-scroll"
            style={{
              backgroundColor: '#ffffff',
              border: '1px solid rgba(15, 23, 42, 0.08)',
              borderRadius: '16px',
              padding: '24px',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '16px',
              boxShadow: '0 2px 8px rgba(15, 23, 42, 0.03)'
            }}
          >
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '12px',
                backgroundColor: '#ecfdf5',
                color: '#059669',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}
            >
              <Award size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: '800', color: '#0f172a', marginBottom: '6px' }}>
                Zéro Dépendance Client
              </h3>
              <p style={{ fontSize: '0.86rem', color: '#475569', lineHeight: 1.5, margin: 0 }}>
                Transfert intégral des compétences, schémas directeurs et documentations techniques à vos équipes internes.
              </p>
            </div>
          </div>

          <div
            className="guide-step-card reveal-on-scroll"
            style={{
              backgroundColor: '#ffffff',
              border: '1px solid rgba(15, 23, 42, 0.08)',
              borderRadius: '16px',
              padding: '24px',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '16px',
              boxShadow: '0 2px 8px rgba(15, 23, 42, 0.03)'
            }}
          >
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '12px',
                backgroundColor: '#eff6ff',
                color: '#2563eb',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}
            >
              <Sparkles size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: '800', color: '#0f172a', marginBottom: '6px' }}>
                Clarté Budgétaire Totale
              </h3>
              <p style={{ fontSize: '0.86rem', color: '#475569', lineHeight: 1.5, margin: 0 }}>
                Honoraires prévisibles et fermes. Aucun dépassement non préalablement validé d'un commun accord.
              </p>
            </div>
          </div>
        </div>

        {/* Guide Pratique : Comment Bien Choisir Votre Consultant */}
        <div
          style={{
            backgroundColor: '#ffffff',
            border: '1px solid rgba(15, 23, 42, 0.09)',
            borderRadius: '24px',
            padding: '42px 36px',
            boxShadow: '0 4px 20px -2px rgba(15, 23, 42, 0.04)'
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              marginBottom: '10px',
              textAlign: 'center'
            }}
          >
            <Info size={24} color="#0d9488" />
            <h2
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.45rem',
                fontWeight: '800',
                color: '#0f172a',
                textAlign: 'center',
                margin: 0
              }}
            >
              Guide Pratique : Comment Bien Choisir Votre Consultant
            </h2>
          </div>

          <p
            style={{
              textAlign: 'center',
              fontSize: '0.94rem',
              color: '#64748b',
              maxWidth: '680px',
              margin: '0 auto 36px auto',
              lineHeight: 1.6
            }}
          >
            Recommandations méthodologiques issues de la synthèse officielle du cabinet Laurent G-M Manouaba.
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '24px'
            }}
          >
            {[
              {
                num: '01',
                title: 'Expertise fonctionnelle & transversale',
                text: "Privilégiez un consultant spécialiste d'un domaine mais aussi compétent dans les domaines voisins (électricité, informatique, génie des procédés). Cela évite souvent d'engager plusieurs personnes."
              },
              {
                num: '02',
                title: "Pluralité de méthodes d'approche",
                text: "Demandez comment il compte résoudre le problème. Un bon consultant propose plusieurs méthodes, ce qui évite de refaire une approche déjà tentée sans succès."
              },
              {
                num: '03',
                title: 'Références réelles & cas concrets',
                text: "Les études de cas et les retours d'expérience vérifiables valent infiniment mieux qu'un CV purement théorique."
              },
              {
                num: '04',
                title: 'Disponibilité & engagement',
                text: 'Vérifiez sa charge de travail réelle, surtout si votre projet stratégique requiert un engagement exclusif et réactif.'
              },
              {
                num: '05',
                title: 'TJM & rentabilité mesurable',
                text: "L'important est la valeur nette obtenue pour le prix payé. Les structures d'honoraires doivent être définies et contractualisées en amont."
              }
            ].map((item) => (
              <div
                key={item.num}
                className="guide-step-card reveal-on-scroll"
                style={{
                  backgroundColor: '#f8fafc',
                  border: '1px solid rgba(15, 23, 42, 0.07)',
                  borderRadius: '16px',
                  padding: '24px',
                  position: 'relative'
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.25rem',
                    fontWeight: '800',
                    color: '#0d9488',
                    marginBottom: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <span
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '8px',
                      backgroundColor: 'rgba(13, 148, 136, 0.12)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.8rem',
                      fontWeight: '800'
                    }}
                  >
                    {item.num}
                  </span>
                  <span style={{ fontSize: '0.98rem', color: '#0f172a' }}>{item.title}</span>
                </div>
                <p
                  style={{
                    fontSize: '0.87rem',
                    color: '#475569',
                    lineHeight: 1.6,
                    margin: 0
                  }}
                >
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
