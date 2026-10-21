import React, { useState } from 'react';
import { MessageSquare, ChevronDown, ChevronUp, ShieldCheck, Send, CheckCircle2 } from 'lucide-react';
import { getStripeConfig } from '../utils/stripeConfig';
import { useLanguage } from '../i18n/LanguageContext';

export function ServicesPage({ onOpenBooking }) {
  const { services, pillars, t, lang } = useLanguage();
  const stripeConfig = getStripeConfig();
  const [activePillar, setActivePillar] = useState('all');
  const [expandedId, setExpandedId] = useState(null);

  // Multi-domain quote form state
  const [selectedDomains, setSelectedDomains] = useState([]);
  const [quoteName, setQuoteName] = useState('');
  const [quoteCompany, setQuoteCompany] = useState('');
  const [quotePhone, setQuotePhone] = useState('');
  const [quoteDetails, setQuoteDetails] = useState('');
  const [quoteSubmitted, setQuoteSubmitted] = useState(false);

  const pageTexts = {
    fr: {
      title: "12 Domaines d’Intervention Technologique & R&D",
      desc: "Une approche pragmatique « locale dans une démarche globale », structurée autour de 3 pôles d'excellence : Innovation & R&D, Performance Industrielle, Digitalisation & Data Science.",
      domainPrefix: "Domaine",
      viewDeliverables: "Voir les livrables",
      lessDetails: "Moins de détails",
      deliverableLabel: "Livrable & Méthode :",
      targetLabel: "Public recommandé :",
      bookBtn: "Prendre Rendez-vous",
      bookTitle: "Prendre rendez-vous avec notre cabinet",
      mixedBadge: "Projets Mixtes & Sur-Mesure",
      mixedTitle: "Vous souhaitez combiner plusieurs domaines sur un même projet ?",
      mixedDesc: "Notre cabinet conçoit des schémas directeurs transversaux adaptés à vos contraintes de temps et de budget. Remplissez ce formulaire pour recevoir un chiffrage personnalisé sous 24h.",
      step1: "1. Cochez les domaines à combiner dans votre devis :",
      step2Name: "Votre Nom & Prénom *",
      step2NamePh: "Ex: Jean Paul",
      step2Company: "Structure / Entreprise",
      step2CompanyPh: "Ex: FinTech Africa",
      step2Phone: "Numéro Téléphone / WhatsApp *",
      step2PhonePh: "Ex: +228 90 00 00 00",
      step2Desc: "Description de votre besoin / Objectifs du projet",
      step2DescPh: "Précisez les défis techniques, le calendrier souhaité ou vos attentes spécifiques...",
      reassurance: "Réponse sous 24h ouvrées • Zéro engagement • Confidentialité garantie",
      submitBtn: "Transmettre ma demande de devis personnalisé",
      successTitle: "Demande de devis transmise avec succès !",
      successDesc: "Vos informations et les domaines sélectionnés ont été transmis directement au cabinet. Nous reviendrons vers vous sous quelques heures.",
      anotherBtn: "Faire une autre demande",
      greeting: "Bonjour,",
      quoteIntro: "Je souhaite obtenir un devis personnalisé pour un projet combiné :",
      quoteSelected: "Domaines sélectionnés :",
      quoteApplicant: "Demandeur :",
      quoteStructure: "Structure :",
      quoteContact: "Téléphone / WhatsApp :",
      quoteContext: "Contexte du projet :",
      quoteSignature: "_Envoyé depuis le configurateur de mandat LGM Consulting_"
    },
    en: {
      title: "12 Technology & R&D Practice Areas",
      desc: "A pragmatic 'think global, act local' framework structured around 3 pillars: Innovation & R&D, Industrial Performance, Digitalization & Data Science.",
      domainPrefix: "Practice",
      viewDeliverables: "View deliverables",
      lessDetails: "Less details",
      deliverableLabel: "Deliverable & Method:",
      targetLabel: "Target Audience:",
      bookBtn: "Book an Appointment",
      bookTitle: "Book an advisory consultation with our firm",
      mixedBadge: "Tailored & Multi-Disciplinary Mandates",
      mixedTitle: "Need to combine multiple technical practice areas?",
      mixedDesc: "Our advisory firm engineers cross-disciplinary masterplans tailored to your business timeline and budget constraints. Fill out this brief to receive a customized scoping quote within 24 hours.",
      step1: "1. Select the practice areas to combine:",
      step2Name: "Full Name *",
      step2NamePh: "e.g. John Doe",
      step2Company: "Company / Organization",
      step2CompanyPh: "e.g. Apex Global Systems",
      step2Phone: "Phone / WhatsApp *",
      step2PhonePh: "e.g. +1 415 555 2671",
      step2Desc: "Project context / High-level objectives",
      step2DescPh: "Outline key technical hurdles, desired timeline, or critical constraints...",
      reassurance: "Response within 24h • Zero commitment • Strict NDA confidentiality",
      submitBtn: "Send Custom Project Request",
      successTitle: "Project request transmitted successfully!",
      successDesc: "Your details and chosen practice areas have been forwarded directly to our partners. We will reach back out within a few hours.",
      anotherBtn: "Submit another request",
      greeting: "Hello,",
      quoteIntro: "I would like to request a tailored quote for a multi-disciplinary engagement:",
      quoteSelected: "Selected Practice Areas:",
      quoteApplicant: "Applicant:",
      quoteStructure: "Company:",
      quoteContact: "Phone / WhatsApp:",
      quoteContext: "Project Context:",
      quoteSignature: "_Sent from LGM Consulting project configurator_"
    },
    pt: {
      title: "12 Áreas de Intervenção Tecnológica e P&D",
      desc: "Uma abordagem pragmática 'pensar global, agir local' estruturada em 3 pilares de excelência: Inovação & P&D, Performance Industrial, Digitalização & Ciência de Dados.",
      domainPrefix: "Área",
      viewDeliverables: "Ver entregáveis",
      lessDetails: "Menos detalhes",
      deliverableLabel: "Entregável & Método:",
      targetLabel: "Público Recomendado:",
      bookBtn: "Agendar Reunião",
      bookTitle: "Agendar consultoria com nossos especialistas",
      mixedBadge: "Projetos Sob Medida & Multidisciplinares",
      mixedTitle: "Deseja combinar diferentes áreas em um mesmo projeto?",
      mixedDesc: "Nossa consultoria projeta planos diretores transversais adaptados aos prazos e ao orçamento da sua empresa. Preencha este formulário para receber uma proposta técnica em até 24 horas.",
      step1: "1. Selecione as áreas a combinar na sua proposta:",
      step2Name: "Nome Completo *",
      step2NamePh: "Ex: Carlos Silva",
      step2Company: "Empresa / Organização",
      step2CompanyPh: "Ex: Brasil Tech Soluções",
      step2Phone: "Telefone / WhatsApp *",
      step2PhonePh: "Ex: +55 11 99999-8888",
      step2Desc: "Descrição da necessidade / Objetivos do projeto",
      step2DescPh: "Descreva seus desafios técnicos, cronograma pretendido ou metas operacionais...",
      reassurance: "Resposta em até 24h • Sem compromisso • Confidencialidade estrita",
      submitBtn: "Enviar Solicitação de Proposta",
      successTitle: "Solicitação de proposta enviada com sucesso!",
      successDesc: "Suas informações e as áreas selecionadas foram enviadas diretamente aos nossos diretores. Entraremos em contato em breve.",
      anotherBtn: "Fazer outra solicitação",
      greeting: "Olá,",
      quoteIntro: "Gostaria de solicitar uma proposta personalizada para um projeto multidisciplinar:",
      quoteSelected: "Áreas selecionadas:",
      quoteApplicant: "Solicitante:",
      quoteStructure: "Empresa:",
      quoteContact: "Telefone / WhatsApp:",
      quoteContext: "Contexto do projeto:",
      quoteSignature: "_Enviado pelo configurador de projetos da LGM Consulting_"
    }
  };

  const currentTexts = pageTexts[lang] || pageTexts.fr;

  const toggleDomain = (title) => {
    setSelectedDomains((prev) =>
      prev.includes(title) ? prev.filter((d) => d !== title) : [...prev, title]
    );
  };

  const handleQuoteSubmit = (e) => {
    e.preventDefault();
    const domainsList = selectedDomains.length > 0 ? selectedDomains.join(', ') : 'Multi-domaines transversaux';
    const lines = [
      currentTexts.greeting,
      ``,
      currentTexts.quoteIntro,
      `*${currentTexts.quoteSelected}* ${domainsList}`,
      quoteName ? `*${currentTexts.quoteApplicant}* ${quoteName}` : null,
      quoteCompany ? `*${currentTexts.quoteStructure}* ${quoteCompany}` : null,
      quotePhone ? `*${currentTexts.quoteContact}* ${quotePhone}` : null,
      quoteDetails ? `*${currentTexts.quoteContext}* ${quoteDetails}` : null,
      ``,
      currentTexts.quoteSignature
    ].filter(Boolean);

    const raw = lines.join('\n');
    const url = `https://wa.me/22890445571?text=${encodeURIComponent(raw)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setQuoteSubmitted(true);
  };

  const filteredServices = activePillar === 'all'
    ? services
    : services.filter((s) => s.pillar === activePillar);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div>
      {/* Page Header (NO LABELS ABOVE TITLE) */}
      <div className="page-header">
        <div className="container">
          <h1 className="page-title">
            {currentTexts.title}
          </h1>
          <p className="page-description">
            {currentTexts.desc}
          </p>
        </div>
      </div>

      <div className="container" style={{ paddingBottom: '90px' }}>
        {/* Filter Switcher */}
        <div
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

        {/* 12 Services Detailed Grid (NO LABELS ABOVE TITLES) */}
        <div className="grid-3" style={{ marginBottom: '48px' }}>
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
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <span style={{ fontSize: '0.82rem', fontWeight: '800', color: 'var(--color-brand-primary)' }}>
                      {currentTexts.domainPrefix} {service.id < 10 ? `0${service.id}` : service.id}
                    </span>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                      {service.tag}
                    </span>
                  </div>

                  <h3
                    style={{
                      fontSize: '1.2rem',
                      fontWeight: '800',
                      color: 'var(--text-primary)',
                      marginBottom: '12px',
                      lineHeight: 1.3
                    }}
                  >
                    {service.title}
                  </h3>

                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '16px' }}>
                    {service.shortDesc}
                  </p>

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
                        <strong style={{ color: 'var(--text-primary)' }}>{currentTexts.deliverableLabel}</strong>
                        <p style={{ marginTop: '4px', color: 'var(--text-secondary)' }}>{service.deliverable}</p>
                      </div>
                      <div>
                        <strong style={{ color: 'var(--text-primary)' }}>{currentTexts.targetLabel}</strong>
                        <p style={{ marginTop: '4px', color: 'var(--text-secondary)' }}>{service.target}</p>
                      </div>
                    </div>
                  )}
                </div>

                <div style={{ paddingTop: '16px', borderTop: '1px solid var(--border-subtle)' }}>
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
                      <span>{isExpanded ? currentTexts.lessDetails : currentTexts.viewDeliverables}</span>
                      {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>

                    <button
                      onClick={() => onOpenBooking(`${currentTexts.domainPrefix} N°${service.id} : ${service.title}`)}
                      className="btn btn-whatsapp btn-sm"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        whiteSpace: 'nowrap'
                      }}
                      title={currentTexts.bookTitle}
                    >
                      <MessageSquare size={14} />
                      <span>{currentTexts.bookBtn}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Formulaire Devis Multi-Domaines Interactif */}
        <div
          className="card reveal-on-scroll"
          style={{
            backgroundColor: '#ffffff',
            padding: '38px 28px',
            border: '1.5px solid rgba(13, 148, 136, 0.3)',
            borderRadius: '20px',
            boxShadow: '0 10px 30px -5px rgba(15, 23, 42, 0.06)'
          }}
        >
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 28px' }}>
            <div
              style={{
                fontSize: '0.78rem',
                fontWeight: '800',
                color: 'var(--color-brand-primary)',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                marginBottom: '6px'
              }}
            >
              {currentTexts.mixedBadge}
            </div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '10px', color: '#0f172a' }}>
              {currentTexts.mixedTitle}
            </h2>
            <p style={{ fontSize: '0.94rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.6 }}>
              {currentTexts.mixedDesc}
            </p>
          </div>

          {quoteSubmitted ? (
            <div
              style={{
                textAlign: 'center',
                padding: '32px 20px',
                backgroundColor: '#f0fdf4',
                borderRadius: '16px',
                border: '1px solid #bbf7d0'
              }}
            >
              <CheckCircle2 size={42} color="#16a34a" style={{ margin: '0 auto 12px' }} />
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#166534', marginBottom: '6px' }}>
                {currentTexts.successTitle}
              </h3>
              <p style={{ fontSize: '0.9rem', color: '#15803d', maxWidth: '520px', margin: '0 auto 20px' }}>
                {currentTexts.successDesc}
              </p>
              <button
                type="button"
                onClick={() => setQuoteSubmitted(false)}
                className="btn btn-outline btn-sm"
              >
                <span>{currentTexts.anotherBtn}</span>
              </button>
            </div>
          ) : (
            <form onSubmit={handleQuoteSubmit} style={{ maxWidth: '820px', margin: '0 auto' }}>
              {/* Étape 1 : Sélection des domaines */}
              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: '800', color: '#0f172a', marginBottom: '10px' }}>
                  {currentTexts.step1}
                </label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {services.map((s) => {
                    const isSelected = selectedDomains.includes(s.title);
                    return (
                      <button
                        type="button"
                        key={s.id}
                        onClick={() => toggleDomain(s.title)}
                        style={{
                          fontSize: '0.82rem',
                          fontWeight: isSelected ? '700' : '500',
                          padding: '7px 13px',
                          borderRadius: '9999px',
                          border: isSelected ? '1.5px solid var(--color-brand-primary)' : '1px solid var(--border-subtle)',
                          backgroundColor: isSelected ? 'var(--color-brand-light)' : '#f8fafc',
                          color: isSelected ? 'var(--color-brand-primary)' : 'var(--text-secondary)',
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          transition: 'all 0.18s ease'
                        }}
                      >
                        <span
                          style={{
                            width: '14px',
                            height: '14px',
                            borderRadius: '50%',
                            border: isSelected ? '4px solid var(--color-brand-primary)' : '1px solid #cbd5e1',
                            backgroundColor: '#ffffff'
                          }}
                        />
                        <span>N°{s.id < 10 ? `0${s.id}` : s.id} — {s.title}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Étape 2 : Coordonnées & Projet */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px', marginBottom: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: '#0f172a', marginBottom: '4px' }}>
                    {currentTexts.step2Name}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={currentTexts.step2NamePh}
                    value={quoteName}
                    onChange={(e) => setQuoteName(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '8px',
                      border: '1px solid var(--border-subtle)',
                      fontSize: '0.9rem'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: '#0f172a', marginBottom: '4px' }}>
                    {currentTexts.step2Company}
                  </label>
                  <input
                    type="text"
                    placeholder={currentTexts.step2CompanyPh}
                    value={quoteCompany}
                    onChange={(e) => setQuoteCompany(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '8px',
                      border: '1px solid var(--border-subtle)',
                      fontSize: '0.9rem'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: '#0f172a', marginBottom: '4px' }}>
                    {currentTexts.step2Phone}
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder={currentTexts.step2PhonePh}
                    value={quotePhone}
                    onChange={(e) => setQuotePhone(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '8px',
                      border: '1px solid var(--border-subtle)',
                      fontSize: '0.9rem'
                    }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '18px' }}>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: '#0f172a', marginBottom: '4px' }}>
                  {currentTexts.step2Desc}
                </label>
                <textarea
                  rows={3}
                  placeholder={currentTexts.step2DescPh}
                  value={quoteDetails}
                  onChange={(e) => setQuoteDetails(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    border: '1px solid var(--border-subtle)',
                    fontSize: '0.9rem',
                    resize: 'vertical'
                  }}
                />
              </div>

              {/* Bouton de soumission */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', color: '#64748b' }}>
                  <ShieldCheck size={16} color="#0d9488" />
                  <span>{currentTexts.reassurance}</span>
                </div>

                <button
                  type="submit"
                  className="btn btn-whatsapp btn-lg"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '13px 26px',
                    fontSize: '0.95rem'
                  }}
                >
                  <Send size={18} />
                  <span>{currentTexts.submitBtn}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
