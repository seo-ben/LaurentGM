import React from 'react';
import { UserCheck, Shield, CheckCircle2, HeartHandshake, Eye, Award, ExternalLink } from 'lucide-react';
import { CONTACT_INFO } from '../data/content';
import { useLanguage } from '../i18n/LanguageContext';

export function AboutSection({ onOpenBooking }) {
  const { sectors, t, lang } = useLanguage();

  const contentByLang = {
    fr: {
      title: "À Propos de notre Cabinet & Vision Technologique",
      subtitle: "Une alliance rare entre rigueur scientifique, maîtrise technique pluridisciplinaire et engagement humain pour une technologie utile et accessible.",
      quote: "« La technologie n’a de valeur que si elle libère le potentiel humain. »",
      p1: "Passionné de recherche scientifique appliquée et de dynamique entrepreneuriale, notre cabinet intervient comme partenaire technologique indépendant, bureau d'études et conseiller de direction.",
      p2: "Notre approche se distingue par une solide formation multidisciplinaire couvrant : l’informatique de pointe, l’électricité & l’électronique, le génie des procédés, les techniques d’analyse statistique et le management de l’innovation. Cette transversalité permet de dialoguer aussi bien avec des ingénieurs d'infrastructure qu'avec des directeurs financiers.",
      values: [
        { title: 'Plaisir & Passion', desc: 'L’enthousiasme de résoudre des verrous complexes.' },
        { title: 'Excellence & Rigueur', desc: 'Zéro approximation sur la sécurité et le code.' },
        { title: 'Collectif & Synergie', desc: 'Valorisation de l’intelligence d’équipe locale.' },
        { title: 'Honnêteté & Transparence', desc: 'Parler vrai sur la rentabilité réelle des projets.' }
      ],
      ctaBtn: "Discuter de votre projet",
      sectorsTitle: "Secteurs d’Activité & Domaines d’Impact",
      sectorsSub: "Une adaptation prouvée aux contraintes réglementaires et opérationnelles de chaque industrie."
    },
    en: {
      title: "About our Firm & Technology Vision",
      subtitle: "A rare synergy of scientific rigor, multidisciplinary engineering, and human commitment for purposeful, accessible technology.",
      quote: "“Technology is only valuable when it unleashes human potential.”",
      p1: "Driven by applied scientific research and entrepreneurial dynamics, our firm serves as an independent technology partner, strategic R&D bureau, and board-level advisor.",
      p2: "Our approach stands out through robust multidisciplinary foundations: advanced computer systems, electrical & electronics engineering, chemical process engineering, statistical data modeling, and innovation management. This versatility bridges technical infrastructure teams and executive financial leadership.",
      values: [
        { title: 'Passion & Drive', desc: 'Solving complex engineering bottlenecks with enthusiasm.' },
        { title: 'Rigorous Excellence', desc: 'Zero compromise on architecture, security, and clean code.' },
        { title: 'Collective Synergy', desc: 'Leveraging and empowering local in-house team talent.' },
        { title: 'Honesty & Clarity', desc: 'Unvarnished truth on the actual financial ROI of projects.' }
      ],
      ctaBtn: "Discuss your project",
      sectorsTitle: "Industry Sectors & Impact Domains",
      sectorsSub: "Proven adaptability to regulatory and operational requirements across diverse industries."
    },
    pt: {
      title: "Sobre a nossa Consultoria & Visão Tecnológica",
      subtitle: "Uma aliança rara entre rigor científico, domínio técnico multidisciplinar e compromisso humano para uma tecnologia prática e acessível.",
      quote: "“A tecnologia só tem valor quando liberta o potencial humano.”",
      p1: "Movidos pela pesquisa científica aplicada e pelo dinamismo empreendedor, atuamos como parceiro tecnológico independente, centro de P&D e conselheiro estratégico da diretoria.",
      p2: "Nossa metodologia se destaca pela sólida expertise multidisciplinar: computação de ponta, engenharia elétrica e eletrônica, engenharia de processos, análise estatística e gestão da inovação. Essa visão transversal cria uma ponte direta entre equipes de infraestrutura e a diretoria financeira.",
      values: [
        { title: 'Paixão & Propósito', desc: 'Entusiasmo em resolver gargalos técnicos complexos.' },
        { title: 'Excelência com Rigor', desc: 'Zero tolerância para falhas de segurança e código.' },
        { title: 'Sinergia & Equipe', desc: 'Valorização e capacitação da inteligência interna.' },
        { title: 'Transparência Real', desc: 'Clareza absoluta sobre o retorno financeiro de cada projeto.' }
      ],
      ctaBtn: "Conversar sobre seu projeto",
      sectorsTitle: "Setores de Atuação & Áreas de Impacto",
      sectorsSub: "Adaptação comprovada às exigências regulatórias e operacionais de cada indústria."
    }
  };

  const c = contentByLang[lang] || contentByLang.fr;

  return (
    <section id="apropos" style={{ padding: '90px 0', position: 'relative' }}>
      <div className="container">
        <div className="section-center reveal-on-scroll">
          <h2 className="section-title">
            {c.title}
          </h2>
          <p className="section-subtitle">
            {c.subtitle}
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
                alt="Consultant expert en technologies et stratégie opérationnelle"
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
                alt="Session d'atelier de travail en équipe"
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
              {c.quote}
            </h3>

            <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '16px' }}>
              {c.p1}
            </p>

            <p style={{ fontSize: '0.96rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '24px' }}>
              {c.p2}
            </p>

            {/* Core Values */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px', marginBottom: '28px' }}>
              {c.values.map((val) => (
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
              onClick={() => onOpenBooking(c.ctaBtn)}
              className="btn btn-whatsapp"
            >
              <span>{c.ctaBtn}</span>
            </button>
          </div>
        </div>

        {/* Industry Sectors Grid */}
        <div className="reveal-on-scroll">
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h3 style={{ fontSize: '1.4rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '8px' }}>
              {c.sectorsTitle}
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              {c.sectorsSub}
            </p>
          </div>

          <div className="grid-3">
            {sectors.map((sec) => (
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

