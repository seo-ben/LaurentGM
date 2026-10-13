import React, { useState } from 'react';
import { HelpCircle, CheckCircle2, ArrowRight, RotateCcw, MessageSquare, Sparkles } from 'lucide-react';

export function DiagnosticWidget({ onOpenBooking }) {
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState('');
  const [challenge, setChallenge] = useState('');
  const [timeframe, setTimeframe] = useState('');

  const profiles = [
    { id: 'solo', label: 'Indépendant / Porteur de projet', desc: 'Individu en quête de méthode et d’orientation' },
    { id: 'tpe', label: 'TPE / Startup (≤ 5 salariés)', desc: 'Structure agile voulant structurer ses outils' },
    { id: 'pme', label: 'PME en expansion (5 à 15 salariés)', desc: 'Optimisation de marge et intégration tech' },
    { id: 'grand', label: 'Entreprise > 15 salariés / International', desc: 'Défis stratégiques et restructuration d’envergure' }
  ];

  const challenges = [
    { id: 'ia', label: 'Automatiser des processus avec l’IA', desc: 'Gagner du temps sur les tâches chronophages' },
    { id: 'data', label: 'Structurer et exploiter nos données', desc: 'Sortir du flou pour piloter nos performances' },
    { id: 'marge', label: 'Optimiser nos marges & supply-chain', desc: 'Améliorer la rentabilité des opérations' },
    { id: 'rupture', label: 'Lancer un nouveau produit / Innovation', desc: 'Valider la faisabilité technique et le marché' }
  ];

  const timeframes = [
    { id: 'urgent', label: 'Immédiat (Ce mois-ci)', desc: 'Besoin de solutions opérationnelles rapides' },
    { id: 'court', label: '1 à 3 mois', desc: 'Projet planifié nécessitant un cadrage solide' },
    { id: 'veille', label: 'Veille & Prospective (3 à 6 mois)', desc: 'Anticipation des ruptures de marché' }
  ];

  const reset = () => {
    setStep(1);
    setProfile('');
    setChallenge('');
    setTimeframe('');
  };

  const getRecommendation = () => {
    if (profile === 'solo') {
      return {
        plan: 'Suivi Physique Individu (100 $/an) ou Consultance Basic (90 $)',
        why: 'Une formule légère et économique pour clarifier votre feuille de route sans engager de lourds budgets.',
        ctaPayload: `Diagnostic : Indépendant | Défi : ${challenge} | Horizon : ${timeframe}`
      };
    } else if (profile === 'tpe') {
      return {
        plan: 'Suivi Moral Petite Entreprise (200 $/an) ou Consultance Business (490 $)',
        why: 'L’idéal pour disposer d’une direction technique externalisée et tester vos scénarios d’évolution.',
        ctaPayload: `Diagnostic : TPE ≤ 5 salariés | Défi : ${challenge} | Horizon : ${timeframe}`
      };
    } else if (profile === 'pme') {
      return {
        plan: 'Suivi Moral PME Recommandé (600 $/an) ou Consultance Business (490 $)',
        why: 'La solution la plus complète pour aligner vos équipes, intégrer l’IA et sécuriser vos marges.',
        ctaPayload: `Diagnostic : PME 5-15 salariés | Défi : ${challenge} | Horizon : ${timeframe}`
      };
    } else {
      return {
        plan: 'Consultance Premium (2 000 $) ou Accompagnement Grands Projets',
        why: 'Une immersion intensive de 336 heures d’investigation avec étude comparative de scénarios.',
        ctaPayload: `Diagnostic : Grande Entreprise | Défi : ${challenge} | Horizon : ${timeframe}`
      };
    }
  };

  return (
    <section id="diagnostic" style={{ padding: '90px 0', position: 'relative' }}>
      <div className="container">
        <div className="section-center reveal-on-scroll">
          <h2 className="section-title">
            Auto-Diagnostic Stratégique en 3 Clics
          </h2>
          <p className="section-subtitle">
            Répondez à 3 questions pour identifier la formule d’accompagnement la plus rentable
            pour votre stade de maturité technologique.
          </p>
        </div>

        <div
          className="card reveal-on-scroll"
          style={{
            maxWidth: '780px',
            margin: '0 auto',
            backgroundColor: '#ffffff',
            padding: '36px',
            border: '1px solid rgba(13, 148, 136, 0.25)',
            boxShadow: 'var(--shadow-lg)'
          }}
        >
          {/* Progress Indicator */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px' }}>
            <span style={{ fontSize: '0.84rem', fontWeight: '700', color: 'var(--color-brand-primary)', textTransform: 'uppercase' }}>
              {step <= 3 ? `Étape ${step} sur 3` : 'Résultat de votre diagnostic'}
            </span>
            <div style={{ display: 'flex', gap: '6px' }}>
              {[1, 2, 3].map((s) => (
                <div
                  key={s}
                  style={{
                    width: '32px',
                    height: '6px',
                    borderRadius: '3px',
                    backgroundColor: s <= step ? 'var(--color-brand-primary)' : 'var(--bg-surface-subtle)',
                    transition: 'background-color 0.3s ease'
                  }}
                />
              ))}
            </div>
          </div>

          {/* STEP 1: Profile */}
          {step === 1 && (
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '8px' }}>
                1. Quelle est la typologie de votre structure ?
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
                Sélectionnez votre situation pour calibrer l’échelle de l’intervention.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px' }}>
                {profiles.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      setProfile(p.id);
                      setStep(2);
                    }}
                    style={{
                      textAlign: 'left',
                      padding: '16px',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-subtle)',
                      backgroundColor: profile === p.id ? 'var(--color-brand-light)' : '#ffffff',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--color-brand-primary)')}
                    onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border-subtle)')}
                  >
                    <div style={{ fontWeight: '700', fontSize: '0.95rem', color: 'var(--text-primary)', marginBottom: '4px' }}>
                      {p.label}
                    </div>
                    <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                      {p.desc}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: Challenge */}
          {step === 2 && (
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '8px' }}>
                2. Quel est votre enjeu prioritaire du moment ?
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
                Le verrou ou l’opportunité à débloquer en premier lieu.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px' }}>
                {challenges.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => {
                      setChallenge(c.label);
                      setStep(3);
                    }}
                    style={{
                      textAlign: 'left',
                      padding: '16px',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-subtle)',
                      backgroundColor: challenge === c.label ? 'var(--color-brand-light)' : '#ffffff',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--color-brand-primary)')}
                    onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border-subtle)')}
                  >
                    <div style={{ fontWeight: '700', fontSize: '0.95rem', color: 'var(--text-primary)', marginBottom: '4px' }}>
                      {c.label}
                    </div>
                    <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                      {c.desc}
                    </div>
                  </button>
                ))}
              </div>

              <button
                onClick={() => setStep(1)}
                style={{
                  marginTop: '20px',
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-muted)',
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <span>← Retour à l’étape précédente</span>
              </button>
            </div>
          )}

          {/* STEP 3: Timeframe */}
          {step === 3 && (
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '8px' }}>
                3. À quel horizon souhaitez-vous démarrer ?
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
                Permet de déterminer la disponibilité requise de l’équipe de Laurent Manouaba.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px' }}>
                {timeframes.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => {
                      setTimeframe(t.label);
                      setStep(4);
                    }}
                    style={{
                      textAlign: 'left',
                      padding: '16px',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-subtle)',
                      backgroundColor: timeframe === t.label ? 'var(--color-brand-light)' : '#ffffff',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--color-brand-primary)')}
                    onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border-subtle)')}
                  >
                    <div style={{ fontWeight: '700', fontSize: '0.95rem', color: 'var(--text-primary)', marginBottom: '4px' }}>
                      {t.label}
                    </div>
                    <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                      {t.desc}
                    </div>
                  </button>
                ))}
              </div>

              <button
                onClick={() => setStep(2)}
                style={{
                  marginTop: '20px',
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-muted)',
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <span>← Retour à l’étape précédente</span>
              </button>
            </div>
          )}

          {/* STEP 4: RECOMMENDATION RESULT */}
          {step === 4 && (
            <div>
              {(() => {
                const rec = getRecommendation();
                return (
                  <div>
                    <div
                      style={{
                        padding: '24px',
                        borderRadius: 'var(--radius-lg)',
                        backgroundColor: '#f0fdf4',
                        border: '1px solid rgba(34, 197, 94, 0.3)',
                        marginBottom: '24px'
                      }}
                    >
                      <div
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          color: 'var(--color-emerald)',
                          fontWeight: '700',
                          fontSize: '0.85rem',
                          textTransform: 'uppercase',
                          marginBottom: '8px'
                        }}
                      >
                        <Sparkles size={16} />
                        <span>Formule Recommandée pour votre profil</span>
                      </div>

                      <h4
                        style={{
                          fontSize: '1.35rem',
                          fontWeight: '800',
                          color: 'var(--text-primary)',
                          marginBottom: '10px'
                        }}
                      >
                        {rec.plan}
                      </h4>

                      <p style={{ fontSize: '0.94rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '16px' }}>
                        {rec.why}
                      </p>

                      <div
                        style={{
                          fontSize: '0.82rem',
                          color: 'var(--text-muted)',
                          padding: '10px 14px',
                          backgroundColor: '#ffffff',
                          borderRadius: 'var(--radius-md)',
                          border: '1px solid rgba(15, 23, 42, 0.08)'
                        }}
                      >
                        <strong>Synthèse de votre besoin :</strong> {rec.ctaPayload}
                      </div>
                    </div>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', alignItems: 'center' }}>
                      <button
                        onClick={() => onOpenBooking(`Résultat Auto-Diagnostic : ${rec.plan} (${rec.ctaPayload})`)}
                        className="btn btn-whatsapp btn-lg"
                        style={{ flex: '1 1 auto' }}
                      >
                        <MessageSquare size={18} />
                        <span>Transmettre ce bilan à Laurent Manouaba</span>
                      </button>

                      <button
                        onClick={reset}
                        className="btn btn-outline"
                        title="Recommencer le diagnostic"
                      >
                        <RotateCcw size={16} />
                        <span>Recommencer</span>
                      </button>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
