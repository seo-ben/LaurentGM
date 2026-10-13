import React from 'react';
import { ShieldCheck, MessageSquare, CheckCircle, ExternalLink, MapPin } from 'lucide-react';
import { CONTACT_INFO, SECTORS, METRICS } from '../data/content';

export function AboutPage({ onOpenBooking }) {
  const competencies = [
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

  return (
    <div>
      {/* Page Header (NO LABELS ABOVE TITLE) */}
      <div className="page-header">
        <div className="container">
          <h1 className="page-title">
            À Propos de Laurent G-M Manouaba
          </h1>
          <p className="page-description">
            Consultant indépendant en innovations technologiques, combinant recherche scientifique appliquée,
            transversalité technique et culture d'exécution sur le terrain.
          </p>
        </div>
      </div>

      <div className="container" style={{ paddingBottom: '90px' }}>
        {/* Story & Visuals (NO LABELS ABOVE TITLES) */}
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
                alt="Laurent G-M Manouaba en tenue de travail"
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
                alt="Atelier de travail collaboratif"
                style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
              />
            </div>
          </div>

          {/* Narrative avec glissement depuis la droite */}
          <div className="reveal-right">
            <h2 style={{ fontSize: '1.75rem', fontWeight: '800', marginBottom: '16px', lineHeight: 1.25 }}>
              Une mission claire : Faciliter l'intégration technologique par l'innovation
            </h2>

            <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '16px' }}>
              Passionné de recherche scientifique et de sciences computationnelles, <strong>Laurent G-M Manouaba</strong> aide
              les organisations à traverser les tournants technologiques majeurs sans perdre de vue la réalité économique et humaine.
            </p>

            <p style={{ fontSize: '0.96rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '24px' }}>
              Sa méthode réunit une vision stratégique globale et un ancrage local fort. Grâce à une formation pluridisciplinaire
              (informatique, électricité, électronique, techniques d’analyse, génie des procédés), il intervient
              comme un traducteur entre les impératifs des ingénieurs et les objectifs financiers des dirigeants.
            </p>

            {/* 4 Valeurs fondamentales */}
            <h3 style={{ fontSize: '1.2rem', fontWeight: '800', marginBottom: '14px' }}>
              Les 4 Valeurs Cardinaux du Cabinet
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginBottom: '28px' }}>
              {[
                { title: 'Plaisir', desc: 'Prendre un réel enthousiasme à résoudre des verrous réputés insurmontables.' },
                { title: 'Excellence', desc: 'Recherche permanente de la justesse technique et de la rigueur opérationnelle.' },
                { title: 'Collectif', desc: 'Embarquer les collaborateurs pour que la transformation vive durablement.' },
                { title: 'Honnêteté', desc: 'Une franchise absolue sur les limites d’un outil ou la viabilité d’un projet.' }
              ].map((v) => (
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
              onClick={() => onOpenBooking('Échange direct avec Laurent Manouaba')}
              className="btn btn-whatsapp"
            >
              <MessageSquare size={16} />
              <span>Échanger avec Laurent Manouaba</span>
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
            {METRICS.map((m) => (
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

        {/* Domaines de compétence détaillés (NO LABELS ABOVE TITLES) */}
        <div style={{ marginBottom: '64px' }}>
          <div className="section-center" style={{ marginBottom: '32px' }}>
            <h2 className="section-title">
              Domaines de Compétence Stratégiques
            </h2>
            <p className="section-subtitle">
              Un savoir-faire éprouvé pour sécuriser vos systèmes et débloquer de nouveaux marchés.
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
              Secteurs d’Intervention de Référence
            </h2>
            <p className="section-subtitle">
              Une expérience étendue à travers les filières industrielles, financières et technologiques.
            </p>
          </div>

          <div className="grid-3">
            {SECTORS.map((s) => (
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
