import React from 'react';
import { AlertTriangle, Brain, Target, Compass, Zap, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export function PsychologyFraming() {
  const { lang } = useLanguage();

  const CONTENT_BY_LANG = {
    fr: {
      title: "Comment les Hommes agissent face à la révolution technologique",
      subtitle: "Comprendre les comportements humains, les freins cognitifs et les angles morts organisationnels est la véritable clé pour réussir son virage technologique sans gaspillage de ressources.",
      traps: [
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
      ],
      solutionBadge: "Notre Réponse Méthodologique : L'Eustress d'Innovation",
      solutionTitle: "Transformer l’anxiété du changement en levier de surperformance",
      solutionDesc: "Dans la psychologie de l'innovation, « l'eustress » désigne le stress positif : l'énergie qui galvanise une équipe lorsqu'elle relève un défi clair avec une méthodologie rassurante. Notre cabinet canalise cette dynamique autour de 3 pôles indissociables :",
      poles: [
        { title: "Pôle Innovation & R&D :", desc: "Explorer sans risque de ruine grâce à des tests de rupture ciblés." },
        { title: "Pôle Performance Industrielle :", desc: "Optimiser immédiatement la chaîne d'approvisionnement et les marges opérationnelles." },
        { title: "Pôle Digitalisation & Data Science :", desc: "Déployer des modèles d'IA et de datafication strictement alignés avec votre modèle de revenus." }
      ],
      commitmentsTitle: "Les 5 Engagements Éthiques du Cabinet",
      commitments: [
        { title: 'Humilité', desc: 'Écoute absolue de vos réalités sans imposer de modèle préconçu.' },
        { title: 'Solidarité & Travail d’équipe', desc: 'Co-construction main dans la main avec vos collaborateurs.' },
        { title: 'Valeur Ajoutée Client', desc: 'Chaque euro investi doit générer un impact économique mesurable.' },
        { title: 'Confidentialité Totale', desc: 'Secret professionnel absolu et conformité RGPD intégrée.' },
        { title: 'Culture du Terrain', desc: 'Des solutions éprouvées sur place, adaptées à votre contexte régional.' }
      ]
    },
    en: {
      title: "How Human Psychology Drives Tech Adoption & Decision Making",
      subtitle: "Understanding human behavior, cognitive friction, and organizational blind spots is the true key to modernizing without wasting capital or confusing teams.",
      traps: [
        {
          icon: AlertTriangle,
          badge: "Trap #1: Technology FOMO",
          title: "Stacking SaaS tools without an architectural backbone",
          desc: "Driven by social media hype and AI fear-of-missing-out, 74% of corporate leaders amass disconnected subscriptions and pilot projects. The result: skyrocketing software bills and confused, frustrated teams."
        },
        {
          icon: Brain,
          badge: "Trap #2: Cognitive Overload",
          title: "Drowning in raw data, blind in real-time execution",
          desc: "Companies generate massive data streams (sales, logistics, user retention) yet freeze at decision time. Leaders suffer crippling decision fatigue caused by overly complex, bloated dashboards."
        },
        {
          icon: Target,
          badge: "Trap #3: The Execution Chasm",
          title: "Ivory-tower consultants divorced from operational reality",
          desc: "Spending five-figure sums on a 150-page theoretical audit that collects dust in a drawer. Modern businesses don't need academic slide decks; they need precision engineering from budget to rollout."
        }
      ],
      solutionBadge: "Our Methodological Answer: Organizational Eustress",
      solutionTitle: "Turning the anxiety of change into an engine of peak performance",
      solutionDesc: "In the psychology of innovation, 'eustress' is positive, stimulating stress—the surge of shared energy when an organization takes on a clearly framed challenge with a reassuring roadmap. Our firm focuses this momentum across 3 core pillars:",
      poles: [
        { title: "Innovation & R&D Pillar:", desc: "Exploring new horizons without existential downside through calculated stress-tests." },
        { title: "Industrial Performance Pillar:", desc: "Directly streamlining supply chain operations and boosting net margins." },
        { title: "Digitalization & Data Pillar:", desc: "Deploying AI and automated data architectures strictly anchored in revenue generation." }
      ],
      commitmentsTitle: "Our 5 Core Ethical Commitments",
      commitments: [
        { title: 'Humility', desc: 'Deep listening to your unique realities without dogmatic, one-size-fits-all blueprints.' },
        { title: 'True Collaboration', desc: 'Working shoulder-to-shoulder with your frontline operators and managers.' },
        { title: 'Client ROI', desc: 'Every dollar invested must create measurable bottom-line economic value.' },
        { title: 'Total Confidentiality', desc: 'Institutional non-disclosure agreements and strict data isolation.' },
        { title: 'Field-Proven Solutions', desc: 'Pragmatic approaches tested live in complex operational environments.' }
      ]
    },
    pt: {
      title: "Como os Seres Humanos Reagem à Revolução Tecnológica",
      subtitle: "Compreender o comportamento humano, as barreiras cognitivas e os pontos cegos organizacionais é o verdadeiro segredo para inovar sem desperdício de recursos.",
      traps: [
        {
          icon: AlertTriangle,
          badge: "Armadilha N°1: O FOMO Tecnológico",
          title: "Acúmulo de softwares sem integração e sem espinha dorsal",
          desc: "Pela pressão das redes sociais e do hype de IA, 74% dos executivos acumulam assinaturas e protótipos que não conversam entre si. Resultado: custos explodindo e equipes desorientadas."
        },
        {
          icon: Brain,
          badge: "Armadilha N°2: Sobrecarga Cognitiva",
          title: "Sufocados por dados brutos, sem visão clara para decidir",
          desc: "A empresa gera dados contínuos de vendas, estoque e clientes, mas permanece no escuro na hora de agir. Gestores sofrem de 'fadiga decisional' paralisante diante de painéis complexos demais."
        },
        {
          icon: Target,
          badge: "Armadilha N°3: O Abismo da Execução",
          title: "Consultores acadêmicos desconectados da realidade de campo",
          desc: "Pagar quantias elevadas por relatórios de centenas de páginas que terminam esquecidos em uma gaveta. As empresas precisam de apoio cirúrgico do orçamento à implantação real."
        }
      ],
      solutionBadge: "Nossa Abordagem: O Eustress da Inovação",
      solutionTitle: "Transformar o receio da mudança em alavanca de alta performance",
      solutionDesc: "Na psicologia da inovação, o « eustress » é o estresse positivo: a energia que mobiliza uma equipe quando ela enfrenta um desafio claro com uma metodologia segura. Nossa consultoria canaliza esse dinamismo em 3 pilares:",
      poles: [
        { title: "Pilar de Inovação & P&D:", desc: "Explorar novas tecnologias sem risco financeiro por meio de testes controlados." },
        { title: "Pilar de Performance Operacional:", desc: "Otimizar imediatamente a cadeia de suprimentos e os custos de produção." },
        { title: "Pilar de Dados & IA:", desc: "Implantar inteligência artificial e automação diretamente alinhadas à receita do negócio." }
      ],
      commitmentsTitle: "Os 5 Compromissos Éticos da Consultoria",
      commitments: [
        { title: 'Humildade', desc: 'Escuta atenta das suas particularidades sem impor modelos prontos de prateleira.' },
        { title: 'Trabalho em Equipe', desc: 'Construção conjunta com os seus colaboradores e lideranças internas.' },
        { title: 'Retorno para o Cliente', desc: 'Cada investimento precisa gerar impacto financeiro comprovado.' },
        { title: 'Sigilo Absoluto', desc: 'Termos formais de confidencialidade (NDA) e proteção estrita de dados.' },
        { title: 'Cultura Prática', desc: 'Soluções validadas na prática, ajustadas à sua realidade de mercado.' }
      ]
    }
  };

  const c = CONTENT_BY_LANG[lang] || CONTENT_BY_LANG.fr;

  return (
    <section id="methode" style={{ padding: '90px 0', position: 'relative' }}>
      <div className="container">
        <div className="section-center reveal-on-scroll">
          <h2 className="section-title">
            {c.title}
          </h2>
          <p className="section-subtitle">
            {c.subtitle}
          </p>
        </div>

        {/* 3 Traps Grid */}
        <div className="grid-3" style={{ marginBottom: '48px' }}>
          {c.traps.map((trap, idx) => {
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

        {/* The Pragmatic Solution Box */}
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
                <span>{c.solutionBadge}</span>
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
                {c.solutionTitle}
              </h3>

              <p
                style={{
                  fontSize: '0.98rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.7,
                  marginBottom: '20px'
                }}
              >
                {c.solutionDesc}
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {c.poles.map((pole) => (
                  <div key={pole.title} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <CheckCircle2 size={18} color="var(--color-brand-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <div>
                      <strong style={{ color: 'var(--text-primary)' }}>{pole.title} </strong>
                      <span>{pole.desc}</span>
                    </div>
                  </div>
                ))}
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
                {c.commitmentsTitle}
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', padding: 0, margin: 0 }}>
                {c.commitments.map((val) => (
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
