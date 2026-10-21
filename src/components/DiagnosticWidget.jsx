import React, { useState } from 'react';
import { HelpCircle, CheckCircle2, ArrowRight, RotateCcw, MessageSquare, Sparkles } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export function DiagnosticWidget({ onOpenBooking }) {
  const { lang, t } = useLanguage();
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState('');
  const [challenge, setChallenge] = useState('');
  const [timeframe, setTimeframe] = useState('');

  const DATA_BY_LANG = {
    fr: {
      title: "Auto-Diagnostic Stratégique en 3 Clics",
      subtitle: "Répondez à 3 questions pour identifier la formule d’accompagnement la plus rentable pour votre stade de maturité technologique.",
      stepLabel: (s) => s <= 3 ? `Étape ${s} sur 3` : 'Résultat de votre diagnostic',
      backBtn: "← Retour à l’étape précédente",
      restartBtn: "Recommencer",
      recBadge: "Formule Recommandée pour votre profil",
      synthesisLabel: "Synthèse de votre besoin :",
      submitBtn: "Transmettre ce bilan au cabinet",
      step1Title: "1. Quelle est la typologie de votre structure ?",
      step1Sub: "Sélectionnez votre situation pour calibrer l’échelle de l’intervention.",
      profiles: [
        { id: 'solo', label: 'Indépendant / Porteur de projet', desc: 'Individu en quête de méthode et d’orientation' },
        { id: 'tpe', label: 'TPE / Startup (≤ 5 salariés)', desc: 'Structure agile voulant structurer ses outils' },
        { id: 'pme', label: 'PME en expansion (5 à 15 salariés)', desc: 'Optimisation de marge et intégration tech' },
        { id: 'grand', label: 'Entreprise > 15 salariés / International', desc: 'Défis stratégiques et restructuration d’envergure' }
      ],
      step2Title: "2. Quel est votre enjeu prioritaire du moment ?",
      step2Sub: "Le verrou ou l’opportunité à débloquer en premier lieu.",
      challenges: [
        { id: 'ia', label: 'Automatiser des processus avec l’IA', desc: 'Gagner du temps sur les tâches chronophages' },
        { id: 'data', label: 'Structurer et exploiter nos données', desc: 'Sortir du flou pour piloter nos performances' },
        { id: 'marge', label: 'Optimiser nos marges & supply-chain', desc: 'Améliorer la rentabilité des opérations' },
        { id: 'rupture', label: 'Lancer un nouveau produit / Innovation', desc: 'Valider la faisabilité technique et le marché' }
      ],
      step3Title: "3. À quel horizon souhaitez-vous démarrer ?",
      step3Sub: "Permet de calibrer le calendrier d’intervention du cabinet.",
      timeframes: [
        { id: 'urgent', label: 'Immédiat (Ce mois-ci)', desc: 'Besoin de solutions opérationnelles rapides' },
        { id: 'court', label: '1 à 3 mois', desc: 'Projet planifié nécessitant un cadrage solide' },
        { id: 'veille', label: 'Veille & Prospective (3 à 6 mois)', desc: 'Anticipation des ruptures de marché' }
      ],
      recommendations: {
        solo: {
          plan: 'Suivi Individuel (100 $/an) ou Consultation Basic (90 $)',
          why: 'Une formule légère et économique pour clarifier votre feuille de route sans engager de lourds budgets.'
        },
        tpe: {
          plan: 'Accompagnement Petite Entreprise (200 $/an) ou Pack Business (490 $)',
          why: 'L’idéal pour disposer d’une direction technique externalisée et tester vos scénarios d’évolution.'
        },
        pme: {
          plan: 'Accompagnement PME Recommandé (600 $/an) ou Pack Business (490 $)',
          why: 'La solution la plus complète pour aligner vos équipes, intégrer l’IA et sécuriser vos marges.'
        },
        grand: {
          plan: 'Consultation Stratégique Premium (2 000 $) ou Accompagnement Grands Projets',
          why: 'Une immersion intensive de 336 heures d’investigation avec étude comparative de scénarios.'
        }
      }
    },
    en: {
      title: "3-Step Strategic Tech Diagnostic",
      subtitle: "Answer 3 quick questions to identify the highest-ROI advisory tier for your stage of growth.",
      stepLabel: (s) => s <= 3 ? `Step ${s} of 3` : 'Your Diagnostic Result',
      backBtn: "← Back to previous step",
      restartBtn: "Restart Test",
      recBadge: "Recommended Advisory Formula",
      synthesisLabel: "Summary of your needs:",
      submitBtn: "Submit this assessment to our firm",
      step1Title: "1. What is the scale of your organization?",
      step1Sub: "Select your profile to accurately size the advisory scope.",
      profiles: [
        { id: 'solo', label: 'Solo Founder / Specialist', desc: 'Professional seeking method, guidance and orientation' },
        { id: 'tpe', label: 'Startup / Small Team (≤ 5 staff)', desc: 'Agile team requiring fractional CTO guidance' },
        { id: 'pme', label: 'Growing SMB (5 to 15 staff)', desc: 'Margin optimization, data governance, and AI integration' },
        { id: 'grand', label: 'Large Enterprise (> 15 staff) / Global', desc: 'Complex strategic challenges and organizational restructuring' }
      ],
      step2Title: "2. What is your primary priority bottleneck?",
      step2Sub: "The core challenge or market opportunity to unlock first.",
      challenges: [
        { id: 'ia', label: 'Automate workflows with AI', desc: 'Save critical time on repetitive operational tasks' },
        { id: 'data', label: 'Structure & monetize corporate data', desc: 'Eliminate blind spots with automated executive dashboards' },
        { id: 'marge', label: 'Optimize operating margins & supply chain', desc: 'Directly increase net cash flow and efficiency' },
        { id: 'rupture', label: 'Launch disruptive product / Deep-tech R&D', desc: 'Validate technical feasibility and business model' }
      ],
      step3Title: "3. What is your desired timeline?",
      step3Sub: "Enables our consultants to schedule dedicated team capacity.",
      timeframes: [
        { id: 'urgent', label: 'Immediate (This month)', desc: 'Need rapid, pragmatic operational answers' },
        { id: 'court', label: '1 to 3 months', desc: 'Planned initiative requiring thorough strategic scoping' },
        { id: 'veille', label: 'Exploration & Foresight (3 to 6 months)', desc: 'Proactive anticipation of technology shifts' }
      ],
      recommendations: {
        solo: {
          plan: 'Individual Retainer ($100/yr) or Basic Consultation ($90)',
          why: 'A lean, budget-conscious plan to clarify your tech roadmap without heavy financial commitments.'
        },
        tpe: {
          plan: 'Small Business Retainer ($200/yr) or Business Package ($490)',
          why: 'Ideal for securing an external fractional CTO to stress-test your tech decisions.'
        },
        pme: {
          plan: 'Recommended SMB Retainer ($600/yr) or Business Package ($490)',
          why: 'The complete solution to align engineering, integrate AI, and protect operating margins.'
        },
        grand: {
          plan: 'Premium Strategic Package ($2,000) or Large Enterprise Mandate',
          why: 'An intensive 336-hour field immersion with comprehensive multi-scenario modeling.'
        }
      }
    },
    pt: {
      title: "Auto-Diagnóstico Estratégico em 3 Cliques",
      subtitle: "Responda a 3 perguntas rápidas para descobrir o plano de consultoria com maior retorno para o seu momento.",
      stepLabel: (s) => s <= 3 ? `Etapa ${s} de 3` : 'Resultado do seu diagnóstico',
      backBtn: "← Voltar à etapa anterior",
      restartBtn: "Refazer teste",
      recBadge: "Plano Recomendado para o seu perfil",
      synthesisLabel: "Resumo da sua necessidade:",
      submitBtn: "Enviar este diagnóstico para a consultoria",
      step1Title: "1. Qual é o porte da sua organização?",
      step1Sub: "Selecione o seu perfil para calibrar a escala da consultoria.",
      profiles: [
        { id: 'solo', label: 'Profissional Autônomo / Fundador Solo', desc: 'Em busca de orientação técnica e método claro' },
        { id: 'tpe', label: 'Startup / Microempresa (≤ 5 pessoas)', desc: 'Estrutura ágil necessitando de direção tecnológica (Fractional CTO)' },
        { id: 'pme', label: 'PME em Expansão (5 a 15 pessoas)', desc: 'Otimização de margem, governança de dados e IA' },
        { id: 'grand', label: 'Média/Grande Empresa (> 15 pessoas) / Global', desc: 'Projetos complexos e reestruturação corporativa' }
      ],
      step2Title: "2. Qual é a sua prioridade imediata?",
      step2Sub: "O gargalo ou a oportunidade central que precisa destravar primeiro.",
      challenges: [
        { id: 'ia', label: 'Automatizar processos com Inteligência Artificial', desc: 'Economizar tempo em tarefas repetitivas' },
        { id: 'data', label: 'Estruturar e monetizar o patrimônio de dados', desc: 'Tomar decisões com indicadores confiáveis em tempo real' },
        { id: 'marge', label: 'Otimizar margens e cadeia de suprimentos', desc: 'Aumentar a lucratividade operacional do negócio' },
        { id: 'rupture', label: 'Lançar novo produto inovador / P&D', desc: 'Validar viabilidade técnica e posicionamento de mercado' }
      ],
      step3Title: "3. Em quanto tempo pretende iniciar?",
      step3Sub: "Permite dimensionar a disponibilidade da equipe de consultores.",
      timeframes: [
        { id: 'urgent', label: 'Imediato (Neste mês)', desc: 'Necessidade de soluções práticas e rápidas' },
        { id: 'court', label: '1 a 3 meses', desc: 'Projeto planejado que exige enquadramento prévio' },
        { id: 'veille', label: 'Exploração e Tendências (3 a 6 meses)', desc: 'Antecipação de rupturas tecnológicas futuras' }
      ],
      recommendations: {
        solo: {
          plan: 'Acompanhamento Individual (100 $/ano) ou Consulta Básica (90 $)',
          why: 'Uma fórmula enxuta e econômica para estruturar sua rota tecnológica com baixo investimento.'
        },
        tpe: {
          plan: 'Acompanhamento Pequena Empresa (200 $/ano) ou Pacote Business (490 $)',
          why: 'Ideal para ter um diretor de tecnologia externo e avaliar seus cenários de crescimento.'
        },
        pme: {
          plan: 'Acompanhamento PME Recomendado (600 $/ano) ou Pacote Business (490 $)',
          why: 'A solução ideal para alinhar suas equipes, adotar IA e proteger suas margens financeiras.'
        },
        grand: {
          plan: 'Consultoria Estratégica Premium (2.000 $) ou Grandes Projetos',
          why: 'Uma imersão intensiva de 336 horas com estudo comparativo aprofundado de cenários.'
        }
      }
    }
  };

  const d = DATA_BY_LANG[lang] || DATA_BY_LANG.fr;

  const reset = () => {
    setStep(1);
    setProfile('');
    setChallenge('');
    setTimeframe('');
  };

  const getRecommendation = () => {
    const rec = d.recommendations[profile] || d.recommendations.pme;
    return {
      plan: rec.plan,
      why: rec.why,
      ctaPayload: `${profile} | ${challenge} | ${timeframe}`
    };
  };

  return (
    <section id="diagnostic" style={{ padding: '90px 0', position: 'relative' }}>
      <div className="container">
        <div className="section-center reveal-on-scroll">
          <h2 className="section-title">
            {d.title}
          </h2>
          <p className="section-subtitle">
            {d.subtitle}
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
              {d.stepLabel(step)}
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
                {d.step1Title}
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
                {d.step1Sub}
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px' }}>
                {d.profiles.map((p) => (
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
                {d.step2Title}
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
                {d.step2Sub}
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px' }}>
                {d.challenges.map((c) => (
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
                <span>{d.backBtn}</span>
              </button>
            </div>
          )}

          {/* STEP 3: Timeframe */}
          {step === 3 && (
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '8px' }}>
                {d.step3Title}
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
                {d.step3Sub}
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px' }}>
                {d.timeframes.map((tItem) => (
                  <button
                    key={tItem.id}
                    onClick={() => {
                      setTimeframe(tItem.label);
                      setStep(4);
                    }}
                    style={{
                      textAlign: 'left',
                      padding: '16px',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-subtle)',
                      backgroundColor: timeframe === tItem.label ? 'var(--color-brand-light)' : '#ffffff',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--color-brand-primary)')}
                    onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border-subtle)')}
                  >
                    <div style={{ fontWeight: '700', fontSize: '0.95rem', color: 'var(--text-primary)', marginBottom: '4px' }}>
                      {tItem.label}
                    </div>
                    <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                      {tItem.desc}
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
                <span>{d.backBtn}</span>
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
                        <span>{d.recBadge}</span>
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
                        <strong>{d.synthesisLabel}</strong> {rec.ctaPayload}
                      </div>
                    </div>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', alignItems: 'center' }}>
                      <button
                        onClick={() => onOpenBooking(`Diagnostic: ${rec.plan} (${rec.ctaPayload})`)}
                        className="btn btn-whatsapp btn-lg"
                        style={{ flex: '1 1 auto' }}
                      >
                        <MessageSquare size={18} />
                        <span>{d.submitBtn}</span>
                      </button>

                      <button
                        onClick={reset}
                        className="btn btn-outline"
                        title={d.restartBtn}
                      >
                        <RotateCcw size={16} />
                        <span>{d.restartBtn}</span>
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
