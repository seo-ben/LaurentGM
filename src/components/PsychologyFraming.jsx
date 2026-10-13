import React from 'react';
import { AlertTriangle, Brain, Target, Compass, Zap, CheckCircle2 } from 'lucide-react';

export function PsychologyFraming() {
  const traps = [
    {
      icon: AlertTriangle,
      badge: "Piège N°1 : Le FOMO Technologique",
      title: "L'empilement d'outils sans colonne vertébrale",
      desc: "Sous la pression des réseaux sociaux et de la hype IA, 74% des dirigeants accumulent des abonnements et des prototypes qui ne communiquent pas entre eux. Résultat : une explosion des coûts et une équipe désorientée."
    },
    {
      icon: Brain,
      badge: "Piège N°2 : La surcharge cognitive",
      title: "Submergé de données brutes inexploitées",
      desc: "L'entreprise produit des flux constants de données (ventes, clients, stocks) mais reste aveugle au moment de décider. Les décideurs souffrent d'une 'fatigue décisionnelle' paralysante face à des tableaux de bord indigestes."
    },
    {
      icon: Target,
      badge: "Piège N°3 : Le fossé de l'exécution",
      title: "Des consultants académiques déconnectés du terrain",
      desc: "Payer des sommes colossales pour un audit de 150 pages qui finit dans un tiroir. Les entreprises n'ont pas besoin de concepts abstraits, mais d'une assistance chirurgicale de la budgétisation au déploiement."
    }
  ];

  return (
    <section id="methode" style={{ padding: '90px 0', position: 'relative' }}>
      <div className="container">
        <div className="section-center reveal-on-scroll">
          <h2 className="section-title">
            Comment les Hommes agissent sur Internet face à la révolution technologique
          </h2>
          <p className="section-subtitle">
            Comprendre les comportements humains, les freins cognitifs et les angles morts organisationnels
            est la véritable clé pour réussir son virage technologique sans gaspillage de ressources.
          </p>
        </div>

        {/* 3 Traps Grid */}
        <div className="grid-3" style={{ marginBottom: '48px' }}>
          {traps.map((trap, idx) => {
            const Icon = trap.icon;
            return (
              <div
                key={trap.title}
                className="card reveal-on-scroll"
                style={{
                  borderTop: '4px solid #ef4444',
                  backgroundColor: '#ffffff'
                }}
              >
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '0.78rem',
                    fontWeight: '700',
                    color: '#dc2626',
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                    marginBottom: '12px'
                  }}
                >
                  <Icon size={14} />
                  <span>{trap.badge}</span>
                </div>
                <h3
                  style={{
                    fontSize: '1.2rem',
                    fontWeight: '700',
                    color: 'var(--text-primary)',
                    marginBottom: '12px',
                    lineHeight: 1.3
                  }}
                >
                  {trap.title}
                </h3>
                <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  {trap.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* The Manouaba Solution Box: Eustress & Pragmatic Action */}
        <div
          className="card reveal-on-scroll"
          style={{
            background: 'linear-gradient(135deg, #f0fdfa 0%, #ffffff 100%)',
            border: '1px solid rgba(13, 148, 136, 0.25)',
            padding: '36px',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr',
              gap: '32px',
              alignItems: 'center'
            }}
            className="solution-grid"
          >
            <div>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '4px 12px',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: 'var(--color-brand-light)',
                  color: 'var(--color-brand-primary)',
                  fontSize: '0.8rem',
                  fontWeight: '700',
                  marginBottom: '14px'
                }}
              >
                <Zap size={14} />
                <span>La Réponse de Laurent Manouaba : L'Eustress d'Innovation</span>
              </div>

              <h3
                style={{
                  fontSize: '1.65rem',
                  fontWeight: '800',
                  color: 'var(--text-primary)',
                  marginBottom: '16px',
                  lineHeight: 1.25
                }}
              >
                Transformer l’anxiété du changement en levier de surperformance
              </h3>

              <p
                style={{
                  fontSize: '0.98rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.7,
                  marginBottom: '20px'
                }}
              >
                Dans la psychologie de l'innovation, <em>« l'eustress »</em> désigne le stress positif :
                l'énergie qui galvanise une équipe lorsqu'elle relève un défi clair avec une méthodologie rassurante.
                Laurent Manouaba canalise cette dynamique autour de 3 pôles indissociables :
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <CheckCircle2 size={18} color="var(--color-brand-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ color: 'var(--text-primary)' }}>Pôle Innovation & R&D :</strong> Explorer sans risque de ruine grâce à des tests de rupture ciblés.
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <CheckCircle2 size={18} color="var(--color-brand-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ color: 'var(--text-primary)' }}>Pôle Performance Industrielle :</strong> Optimiser immédiatement la chaîne d'approvisionnement et les marges opérationnelles.
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <CheckCircle2 size={18} color="var(--color-brand-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ color: 'var(--text-primary)' }}>Pôle Digitalisation & Data Science :</strong> Déployer des modèles d'IA et de datafication strictement alignés avec votre modèle de revenus.
                  </div>
                </div>
              </div>
            </div>

            <div
              style={{
                backgroundColor: '#ffffff',
                padding: '24px',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--border-subtle)',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              <div style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--color-brand-primary)', marginBottom: '8px', textTransform: 'uppercase' }}>
                Les 5 Engagements Éthiques du Cabinet
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {[
                  { title: 'Humilité', desc: 'Écoute absolue de vos réalités sans imposer de modèle préconçu.' },
                  { title: 'Solidarité & Travail d’équipe', desc: 'Co-construction main dans la main avec vos collaborateurs.' },
                  { title: 'Valeur Ajoutée Client', desc: 'Chaque euro investi doit générer un impact économique mesurable.' },
                  { title: 'Confidentialité Totale', desc: 'Secret professionnel absolu et conformité RGPD intégrée.' },
                  { title: 'Culture du Terrain', desc: 'Des solutions éprouvées sur place, adaptées à votre contexte régional.' }
                ].map((val) => (
                  <li key={val.title} style={{ fontSize: '0.86rem' }}>
                    <span style={{ fontWeight: '700', color: 'var(--text-primary)' }}>{val.title} : </span>
                    <span style={{ color: 'var(--text-secondary)' }}>{val.desc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 992px) {
          .solution-grid {
            grid-template-columns: 1.25fr 0.75fr !important;
          }
        }
      `}</style>
    </section>
  );
}
