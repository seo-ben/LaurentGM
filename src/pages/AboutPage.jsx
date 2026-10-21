import React from 'react';
import { ShieldCheck, MessageSquare, CheckCircle, ExternalLink, MapPin } from 'lucide-react';
import { CONTACT_INFO } from '../data/content';
import { useLanguage } from '../i18n/LanguageContext';

export function AboutPage({ onOpenBooking }) {
  const { metrics, sectors, lang } = useLanguage();

  const isEn = lang === 'en';
  const isPt = lang === 'pt';

  const competencies = isEn ? [
    {
      title: "Data Privacy & Governance (GDPR / LGPD)",
      desc: "Strict isolation of sensitive corporate data, regulatory compliance, and ethical governance of algorithmic pipelines."
    },
    {
      title: "System Vulnerability & Architecture Audits",
      desc: "In-depth audit of technical, infrastructural, and human vulnerabilities to eliminate cyber risks before scale."
    },
    {
      title: "Organizational Agility & Technology Innovation",
      desc: "Modern engineering workflows, rapid adaptation to market disruptions, and revamped go-to-market technology stacks."
    },
    {
      title: "Massive Data Analytics & Datafication",
      desc: "Transforming raw company databases into actionable predictive indicators and quantifiable valuation assets."
    },
    {
      title: "Systemic Problem-Solving & Synthesis",
      desc: "Ability to deconstruct high-complexity industrial problems from all angles to engineer direct, executable solutions."
    },
    {
      title: "Enterprise Infrastructure & Network Security",
      desc: "Hardening cloud architectures, IoT communication protocols, and cryptographic information exchange pipelines."
    }
  ] : isPt ? [
    {
      title: "Privacidade de Dados & Governança (LGPD / GDPR)",
      desc: "Proteção rigorosa de dados estratégicos, conformidade regulatória e governança ética dos fluxos informacionais."
    },
    {
      title: "Análise de Vulnerabilidade e Auditoria de Sistemas",
      desc: "Auditoria aprofundada de falhas técnicas, infraestruturais e humanas para mitigar riscos cibernéticos críticos."
    },
    {
      title: "Inovação & Agilidade Organizacional",
      desc: "Novas metodologias de trabalho, resposta ágil a transformações de mercado e modernização de modelos operacionais."
    },
    {
      title: "Análise de Dados Massivos & Dataficação",
      desc: "Extração de métricas preditivas exploráveis e monetização do patrimônio informacional corporativo."
    },
    {
      title: "Resolução Sistêmica de Problemas Complexos",
      desc: "Capacidade de decompor impasses multidimensionais para formular soluções diretas, simples e de alto impacto."
    },
    {
      title: "Segurança de Redes e Infraestruturas Críticas",
      desc: "Blindagem de arquiteturas computacionais, redes comunicantes e protocolos seguros de troca de informações."
    }
  ] : [
    {
      title: "Confidentialité des données & RGPD",
      desc: "Protection stricte des données sensibles, mise en conformité réglementaire et gouvernance éthique des flux de données."
    },
    {
      title: "Analyse de vulnérabilité des systèmes",
      desc: "Audit approfondi des failles techniques, logicielles et humaines pour prévenir les cyber-risques."
    },
    {
      title: "Innovation & agilité organisationnelle",
      desc: "Nouvelles méthodes de travail, adaptation au changement rapide et révision des modèles de commercialisation."
    },
    {
      title: "Analyse des données massives",
      desc: "Extraction d'insights statistiques exploitables et valorisation du patrimoine informationnel de l'entreprise."
    },
    {
      title: "Esprit d'analyse & de synthèse",
      desc: "Capacité à appréhender un problème complexe sous tous ses angles pour produire des solutions directes et simples."
    },
    {
      title: "Protection & sécurité du SI",
      desc: "Sécurisation des architectures, des réseaux communicants et des protocoles d'échange d'informations."
    }
  ];

  const values = isEn ? [
    { title: 'Passion', desc: 'Genuine enthusiasm for breaking through complex engineering bottlenecks.' },
    { title: 'Excellence', desc: 'Relentless quest for mathematical accuracy and operational discipline.' },
    { title: 'Collective', desc: 'Empowering internal teams so that transformations remain durable.' },
    { title: 'Integrity', desc: 'Absolute transparency regarding tool limitations and financial feasibility.' }
  ] : isPt ? [
    { title: 'Entusiasmo', desc: 'Verdadeira paixão em solucionar gargalos técnicos aparentemente intransponíveis.' },
    { title: 'Excelência', desc: 'Busca permanente de precisão técnica e rigor operacional implacável.' },
    { title: 'Coletivo', desc: 'Engajar as equipes internas para garantir transformações sustentáveis.' },
    { title: 'Transparência', desc: 'Franqueza absoluta sobre limites técnicos e viabilidade econômica real.' }
  ] : [
    { title: 'Plaisir', desc: 'Prendre un réel enthousiasme à résoudre des verrous réputés insurmontables.' },
    { title: 'Excellence', desc: 'Recherche permanente de la justesse technique et de la rigueur opérationnelle.' },
    { title: 'Collectif', desc: 'Embarquer les collaborateurs pour que la transformation vive durablement.' },
    { title: 'Honnêteté', desc: 'Une franchise absolue sur les limites d’un outil ou la viabilité d’un projet.' }
  ];

  return (
    <div>
      {/* Page Header */}
      <div className="page-header">
        <div className="container">
          <h1 className="page-title">
            {isEn
              ? 'About our Advisory Firm'
              : isPt
              ? 'Sobre nossa Consultoria'
              : 'À Propos de notre Cabinet'}
          </h1>
          <p className="page-description">
            {isEn
              ? 'Specialized strategic advisory firm in technological innovations, artificial intelligence, and operational profitability.'
              : isPt
              ? 'Consultoria estratégica especializada em inovações tecnológicas, inteligência artificial e lucratividade operacional.'
              : "Cabinet de conseil stratégique en innovations technologiques, combinant recherche scientifique appliquée, transversalité technique et culture d'exécution sur le terrain."}
          </p>
        </div>
      </div>

      <div className="container" style={{ paddingBottom: '90px' }}>
        {/* Story & Visuals */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '48px',
            alignItems: 'center',
            marginBottom: '64px'
          }}
          className="about-split-grid"
        >
          {/* Photos avec animation directionnelle */}
          <div className="reveal-left">
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
                alt="Senior Strategic Consultant"
                style={{
                  width: '100%',
                  aspectRatio: '4 / 3',
                  objectFit: 'cover',
                  objectPosition: 'center 20%'
                }}
              />
            </div>

            {/* Real workshop photo */}
            <div
              style={{
                position: 'relative',
                marginTop: '-60px',
                marginLeft: 'auto',
                width: '80%',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                boxShadow: '0 16px 36px rgba(15, 23, 42, 0.2)',
                border: '4px solid #ffffff'
              }}
              className="about-sub-photo image-zoom-card reveal-scale"
            >
              <img
                src="/assets/workshop-meeting.jpg"
                alt={isEn ? "Collaborative workshop session" : isPt ? "Sessão de trabalho colaborativo" : "Atelier de travail collaboratif"}
                style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
              />
            </div>
          </div>

          {/* Narrative avec glissement depuis la droite */}
          <div className="reveal-right">
            <h2 style={{ fontSize: '1.75rem', fontWeight: '800', marginBottom: '16px', lineHeight: 1.25 }}>
              {isEn
                ? "A Clear Mandate: Transforming Technology Innovations into Bottom-Line Profitability"
                : isPt
                ? "Um Mandato Claro: Transformar Inovações Tecnológicas em Lucratividade Real"
                : "Une mission claire : Faciliter l'intégration technologique par l'innovation"}
            </h2>

            <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '16px' }}>
              {isEn
                ? "Dedicated to applied research and computational systems, our advisory firm guides forward-looking enterprises through critical technology transitions without compromising operational reality or human capital."
                : isPt
                ? "Dedicada à pesquisa aplicada e sistemas computacionais, nossa consultoria orienta empresas em transições tecnológicas cruciais, preservando a realidade operacional e o capital humano."
                : "Dédié à la recherche appliquée et aux sciences computationnelles, notre cabinet accompagne les organisations à franchir les tournants technologiques majeurs sans perdre de vue la réalité économique et humaine."}
            </p>

            <p style={{ fontSize: '0.96rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '24px' }}>
              {isEn
                ? "Our methodology combines global strategic foresight with rigorous field execution. Spanning generative AI, edge computing, cybersecurity, and financial modeling, we act as an executive bridge between engineering teams and boardroom ROI imperatives."
                : isPt
                ? "Nossa metodologia combina visão estratégica global com execução precisa em campo. Integrando IA generativa, computação em borda, segurança cibernética e modelagem financeira, atuamos como ponte entre as equipes técnicas e os imperativos de ROI dos executivos."
                : "Notre méthode réunit une vision stratégique globale et un ancrage local fort. Grâce à une expertise pluridisciplinaire (informatique, électronique, calcul distribué, modélisation économique), nous intervenons comme un traducteur entre les impératifs des ingénieurs et les objectifs financiers des dirigeants."}
            </p>

            {/* 4 Valeurs fondamentales */}
            <h3 style={{ fontSize: '1.2rem', fontWeight: '800', marginBottom: '14px' }}>
              {isEn
                ? "Core Values of our Advisory Practice"
                : isPt
                ? "Os 4 Pilares de Valor da Consultoria"
                : "Les 4 Valeurs Cardinaux du Cabinet"}
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginBottom: '28px' }}>
              {values.map((v) => (
                <div
                  key={v.title}
                  style={{
                    padding: '12px 14px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: '#ffffff',
                    border: '1px solid var(--border-subtle)'
                  }}
                >
                  <div style={{ fontWeight: '800', fontSize: '0.92rem', color: 'var(--color-brand-primary)', marginBottom: '3px' }}>
                    {v.title}
                  </div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                    {v.desc}
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => onOpenBooking(isEn ? 'Direct Discussion' : isPt ? 'Conversa Direta' : 'Échange direct')}
              className="btn btn-whatsapp"
            >
              <MessageSquare size={16} />
              <span>{isEn ? 'Schedule a Discussion' : isPt ? 'Iniciar Conversa' : 'Échanger'}</span>
            </button>
          </div>
        </div>

        {/* Chiffres clés */}
        <div
          className="card reveal-on-scroll"
          style={{
            backgroundColor: '#ffffff',
            border: '1px solid var(--border-subtle)',
            padding: '36px',
            marginBottom: '64px'
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '24px',
              textAlign: 'center'
            }}
          >
            {(metrics || []).map((m) => (
              <div key={m.label}>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2.4rem', fontWeight: '800', color: 'var(--color-brand-primary)', marginBottom: '4px' }}>
                  {m.value}
                </div>
                <div style={{ fontWeight: '700', fontSize: '0.94rem', color: 'var(--text-primary)', marginBottom: '2px' }}>
                  {m.label}
                </div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                  {m.sub}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Domaines de compétence détaillés */}
        <div style={{ marginBottom: '64px' }}>
          <div className="section-center" style={{ marginBottom: '32px' }}>
            <h2 className="section-title">
              {isEn
                ? "Strategic Core Capabilities"
                : isPt
                ? "Domínios de Competência Estratégica"
                : "Domaines de Compétence Stratégiques"}
            </h2>
            <p className="section-subtitle">
              {isEn
                ? "Proven field expertise to secure architectures and unlock profitable new business models."
                : isPt
                ? "Expertise comprovada para proteger seus sistemas e desbloquear novos mercados lucrativos."
                : "Un savoir-faire éprouvé pour sécuriser vos systèmes et débloquer de nouveaux marchés."}
            </p>
          </div>

          <div className="grid-3">
            {competencies.map((comp) => (
              <div key={comp.title} className="card reveal-on-scroll" style={{ backgroundColor: '#ffffff' }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: '800', marginBottom: '10px' }}>
                  {comp.title}
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  {comp.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Secteurs de référence */}
        <div>
          <div className="section-center" style={{ marginBottom: '32px' }}>
            <h2 className="section-title">
              {isEn
                ? "Benchmark Industry Sectors"
                : isPt
                ? "Setores de Atuação de Referência"
                : "Secteurs d’Intervention de Référence"}
            </h2>
            <p className="section-subtitle">
              {isEn
                ? "Extensive consulting track record across industrial, financial, and deep-tech sectors."
                : isPt
                ? "Experiência consolidada em setores industriais, financeiros e tecnológicos globais."
                : "Une expérience étendue à travers les filières industrielles, financières et technologiques."}
            </p>
          </div>

          <div className="grid-3">
            {(sectors || []).map((s) => (
              <div key={s.name} className="card reveal-on-scroll" style={{ backgroundColor: '#ffffff', padding: '20px' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '4px' }}>
                  {s.name}
                </h3>
                <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
                  {s.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 992px) {
          .about-split-grid {
            grid-template-columns: 1fr 1.15fr !important;
          }
        }
        @media (max-width: 640px) {
          .about-sub-photo {
            margin-top: 16px !important;
            width: 100% !important;
          }
        }
      `}</style>
    </div>
  );
}
