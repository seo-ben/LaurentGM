import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  MessageSquare,
  Send,
  CheckCircle2,
  Clock,
  Sparkles,
  Building2,
  User,
  ShieldCheck,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  CreditCard,
  Lock,
  Calendar,
  FileText
} from 'lucide-react';
import { CONTACT_INFO } from '../data/content';
import { getStripeConfig, isStripeConfigured } from '../utils/stripeConfig';
import { useLanguage } from '../i18n/LanguageContext';

export function WhatsAppBookingModal({
  isOpen,
  onClose,
  initialSubject = '',
  bookingData = null
}) {
  const { t, lang } = useLanguage();
  const dialogRef = useRef(null);
  const stripeConfig = getStripeConfig();

  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [subject, setSubject] = useState('Consultation Stratégique (90 $)');
  const [slot, setSlot] = useState("Cette semaine — Après-midi (14h - 18h GMT)");
  const [note, setNote] = useState('');
  const [showOptionalFields, setShowOptionalFields] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [isConfirmingPayment, setIsConfirmingPayment] = useState(false);

  // Sync state whenever modal opens or bookingData changes
  useEffect(() => {
    if (bookingData?.planName) {
      setSubject(`${bookingData.planName} (${bookingData.planPrice} / ${bookingData.planPeriod})`);
      setNote(bookingData.whatsappPayload || '');
    } else if (initialSubject) {
      setSubject(initialSubject);
      setNote('');
    } else {
      const defaultSub = lang === 'en'
        ? `Strategic Consultation (${stripeConfig.appointmentPrice} ${stripeConfig.currencySymbol})`
        : lang === 'pt'
        ? `Consulta Estratégica (${stripeConfig.appointmentPrice} ${stripeConfig.currencySymbol})`
        : `Consultation Stratégique (${stripeConfig.appointmentPrice} ${stripeConfig.currencySymbol})`;
      setSubject(defaultSub);
      setNote('');
    }
  }, [bookingData, initialSubject, isOpen, lang, stripeConfig.appointmentPrice, stripeConfig.currencySymbol]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      if (!dialog.open) {
        dialog.showModal();
        setIsSent(false);
        setIsConfirmingPayment(false);
      }
    } else {
      if (dialog.open) {
        dialog.close();
      }
    }
  }, [isOpen]);

  const handleClose = () => {
    onClose();
  };

  const handleBackdropClick = (e) => {
    if (e.target === dialogRef.current) {
      handleClose();
    }
  };

  // Build the complete WhatsApp message
  const buildWhatsAppMessage = () => {
    const isEn = lang === 'en';
    const isPt = lang === 'pt';

    const lblRequester = isEn ? "Requester" : isPt ? "Solicitante" : "Demandeur";
    const lblOrg = isEn ? "Organization" : isPt ? "Empresa / Projeto" : "Structure";
    const lblSlot = isEn ? "Preferred Slot" : isPt ? "Horário Desejado" : "Créneau souhaité";
    const lblSubject = isEn ? "Topic" : isPt ? "Assunto" : "Objet";
    const lblDetails = isEn ? "Context / Details" : isPt ? "Detalhes / Contexto" : "Détails / Contexte";
    const lblModalities = isEn ? "Format" : isPt ? "Modalidade" : "Modalité";
    const signature = isEn
      ? "_Strategic & Technology Consulting Platform_"
      : isPt
      ? "_Plataforma de Consultoria Estratégica e Tecnológica_"
      : "_Cabinet de conseil technologique et stratégique_";

    // If it is a prefilled plan
    if (bookingData?.planName) {
      const defaultPayload = isEn
        ? `Hello, I would like to subscribe to the '${bookingData.planName} (${bookingData.planPrice} / ${bookingData.planPeriod})' package.`
        : isPt
        ? `Olá, desejo contratar o plano '${bookingData.planName} (${bookingData.planPrice} / ${bookingData.planPeriod})'.`
        : `Bonjour, je souhaite souscrire à la formule '${bookingData.planName} (${bookingData.planPrice} / ${bookingData.planPeriod})'.`;

      const basePayload = note || bookingData.whatsappPayload || defaultPayload;
      
      const optionalDetails = [];
      if (name) optionalDetails.push(`*${lblRequester} :* ${name}`);
      if (company) optionalDetails.push(`*${lblOrg} :* ${company}`);
      if (slot && !slot.toLowerCase().includes('flexible')) {
        optionalDetails.push(`*${lblSlot} :* ${slot}`);
      }

      if (optionalDetails.length > 0) {
        return `${basePayload}\n\n${optionalDetails.join('\n')}\n\n${signature}`;
      }
      return `${basePayload}\n\n${signature}`;
    }

    // Standard booking form message
    const intro = isEn
      ? `Hello,\n\nI would like to schedule a strategic consultation (${stripeConfig.appointmentPrice} ${stripeConfig.currencySymbol}):`
      : isPt
      ? `Olá,\n\nGostaria de agendar uma consulta estratégica (${stripeConfig.appointmentPrice} ${stripeConfig.currencySymbol}):`
      : `Bonjour,\n\nJe souhaite planifier une consultation stratégique (${stripeConfig.appointmentPrice} $) :`;

    const modVal = isEn
      ? `Consultation (${stripeConfig.appointmentPrice} ${stripeConfig.currencySymbol}) - Direct card payment online or upon confirmation`
      : isPt
      ? `Consulta (${stripeConfig.appointmentPrice} ${stripeConfig.currencySymbol}) - Pagamento com cartão online ou na confirmação`
      : `Consultation (${stripeConfig.appointmentPrice} $) - Règlement direct en ligne ou lien à la confirmation`;

    const lines = [
      intro,
      `*${lblSubject} :* ${subject || 'Consultation Stratégique'}`,
      name ? `*${lblRequester} :* ${name}` : null,
      company ? `*${lblOrg} :* ${company}` : null,
      `*${lblSlot} :* ${slot}`,
      note ? `*${lblDetails} :* ${note}` : null,
      `*${lblModalities} :* ${modVal}`,
      ``,
      signature
    ].filter(Boolean);

    return lines.join('\n');
  };

  const handleLaunchWhatsApp = (e) => {
    if (e) e.preventDefault();
    const rawMessage = buildWhatsAppMessage();
    const encoded = encodeURIComponent(rawMessage);
    const whatsappUrl = `https://wa.me/${CONTACT_INFO.whatsappNumber}?text=${encoded}`;

    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    setIsSent(true);
  };

  const handleDirectPayment = (e) => {
    if (e) e.preventDefault();
    setIsConfirmingPayment(true);
  };

  const executeCardPayment = () => {
    if (stripeConfig.paymentLinkUrl && stripeConfig.paymentLinkUrl.trim().length > 10) {
      window.open(stripeConfig.paymentLinkUrl, '_blank', 'noopener,noreferrer');
      setIsSent(true);
      setIsConfirmingPayment(false);
    } else {
      const isEn = lang === 'en';
      const isPt = lang === 'pt';

      const paymentMsg = [
        isEn ? "Hello," : isPt ? "Olá," : "Bonjour,",
        "",
        isEn
          ? `I would like to proceed with the direct payment of my strategic consultation (${stripeConfig.appointmentPrice} ${stripeConfig.currencySymbol}) by credit card:`
          : isPt
          ? `Desejo realizar o pagamento direto da minha consulta estratégica (${stripeConfig.appointmentPrice} ${stripeConfig.currencySymbol}) por cartão de crédito:`
          : `Je souhaite procéder au règlement direct de ma consultation stratégique (${stripeConfig.appointmentPrice} $) par carte bancaire :`,
        `*${isEn ? 'Topic' : isPt ? 'Assunto' : 'Objet'} :* ${subject || (isEn ? 'Strategic Consultation' : isPt ? 'Consulta Estratégica' : 'Consultation Stratégique')}`,
        name ? `*${isEn ? 'Requester' : isPt ? 'Solicitante' : 'Demandeur'} :* ${name}` : null,
        company ? `*${isEn ? 'Organization' : isPt ? 'Empresa' : 'Structure'} :* ${company}` : null,
        `*${isEn ? 'Preferred Slot' : isPt ? 'Horário Desejado' : 'Créneau souhaité'} :* ${slot}`,
        note ? `*${isEn ? 'Details' : isPt ? 'Detalhes' : 'Détails'} :* ${note}` : null,
        `*${isEn ? 'Request' : isPt ? 'Solicitação' : 'Demande'} :* ${
          isEn
            ? 'Please provide the direct secure card payment link.'
            : isPt
            ? 'Por favor, envie o link seguro para pagamento direto com cartão.'
            : 'Merci de me transmettre le lien direct de paiement par carte sécurisée.'
        }`,
        "",
        isEn
          ? "_Sent via strategic consulting platform_"
          : isPt
          ? "_Enviado através da plataforma de consultoria estratégica_"
          : "_Envoyé via la plateforme de conseil stratégique_"
      ].filter(Boolean).join('\n');

      const encoded = encodeURIComponent(paymentMsg);
      const whatsappUrl = `https://wa.me/${CONTACT_INFO.whatsappNumber}?text=${encoded}`;
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      setIsSent(true);
      setIsConfirmingPayment(false);
    }
  };

  const isPlanBooking = Boolean(bookingData?.planName);

  const allSubjects = lang === 'en' ? [
    `Strategic Consultation (${stripeConfig.appointmentPrice} ${stripeConfig.currencySymbol})`,
    'Annual Advisory - SME ($600/yr) — Recommended',
    'Annual Advisory - Small Business ($200/yr)',
    'Annual Advisory - Individual ($100/yr)',
    'Business Consultation ($490)',
    'Basic Consultation ($90)',
    'Premium Advisory ($2,000)',
    'AI & Machine Learning Project',
    'Datafication & Mass Processing',
    'Systemic Audit & Problem Solving',
    'Custom Project / Tailored Advisory'
  ] : lang === 'pt' ? [
    `Consulta Estratégica (${stripeConfig.appointmentPrice} ${stripeConfig.currencySymbol})`,
    'Acompanhamento PME (600 $/ano) — Recomendado',
    'Acompanhamento Pequena Empresa (200 $/ano)',
    'Acompanhamento Individual (100 $/ano)',
    'Consultoria Empresarial (490 $)',
    'Consultoria Básica (90 $)',
    'Consultoria Premium (2.000 $)',
    'Projeto de IA e Machine Learning',
    'Dataficação e Processamento Massivo',
    'Auditoria e Resolução Sistêmica',
    'Projeto sob medida / Demanda personalizada'
  ] : [
    `Consultation Stratégique (${stripeConfig.appointmentPrice} $)`,
    'Suivi Moral PME (600 $/an) — Recommandé',
    'Suivi Moral Petite Entreprise (200 $/an)',
    'Suivi Physique Individu (100 $/an)',
    'Consultance Business (490 $)',
    'Consultance Basic (90 $)',
    'Consultance Premium (2 000 $)',
    'Projet IA & Machine Learning',
    'Datafication & Traitement Massif',
    'Audit & Résolution Systémique',
    'Question spécifique / Projet sur-mesure'
  ];

  const slotOptions = [
    { value: t('bookingModal.slotMorning') || "Dès demain — Matinée (9h - 12h GMT)", label: t('bookingModal.slotMorning') || "Dès demain — Matinée (9h - 12h GMT)" },
    { value: t('bookingModal.slotAfternoon') || "Cette semaine — Après-midi (14h - 18h GMT)", label: t('bookingModal.slotAfternoon') || "Cette semaine — Après-midi (14h - 18h GMT)" },
    { value: t('bookingModal.slotEvening') || "Cette semaine — En soirée (18h - 20h GMT)", label: t('bookingModal.slotEvening') || "Cette semaine — En soirée (18h - 20h GMT)" },
    { value: t('bookingModal.slotFlexible') || "Créneau flexible selon disponibilités du cabinet", label: t('bookingModal.slotFlexible') || "Créneau flexible selon disponibilités du cabinet" }
  ];

  // Ensure current subject is in the dropdown if not already
  if (subject && !allSubjects.includes(subject)) {
    allSubjects.unshift(subject);
  }

  return (
    <dialog
      ref={dialogRef}
      onClick={handleBackdropClick}
      onCancel={handleClose}
      style={{
        borderRadius: '24px',
        border: 'none',
        maxWidth: '580px',
        width: 'calc(100% - 32px)',
        backgroundColor: '#ffffff',
        padding: 0,
        boxShadow: '0 25px 60px -15px rgba(15, 23, 42, 0.35)',
        overflow: 'hidden'
      }}
    >
      <div style={{ position: 'relative' }}>
        {/* Header Bar */}
        <div
          style={{
            padding: '22px 28px',
            backgroundColor: '#0f172a',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'relative'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-whatsapp)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                boxShadow: '0 4px 14px rgba(37, 211, 102, 0.35)'
              }}
            >
              <MessageSquare size={22} color="#ffffff" />
            </div>
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#ffffff', lineHeight: 1.2, margin: 0 }}>
                {isConfirmingPayment
                  ? (lang === 'en' ? `Booking Confirmation ($${stripeConfig.appointmentPrice})` : lang === 'pt' ? `Confirmação da Consulta (${stripeConfig.appointmentPrice} $)` : `Confirmation du Rendez-vous (${stripeConfig.appointmentPrice} $)`)
                  : isPlanBooking
                  ? (t('bookingModal.titlePlan') || 'Réservation de la Formule')
                  : (t('bookingModal.titleConsultation') || `Prendre Rendez-vous • Consultation (${stripeConfig.appointmentPrice} $)`)}
              </h3>
              <p style={{ fontSize: '0.82rem', color: '#94a3b8', marginTop: '3px', margin: 0 }}>
                {isConfirmingPayment
                  ? (lang === 'en' ? 'Secure checkout for your strategic scoping session' : lang === 'pt' ? 'Pagamento seguro da sua consulta estratégica' : 'Règlement sécurisé de votre consultation de cadrage')
                  : isPlanBooking
                  ? (lang === 'en' ? 'Prefilled message for our firm • Instant launch' : lang === 'pt' ? 'Mensagem pré-preenchida para a consultoria • Envio direto' : 'Message pré-rempli pour le cabinet • Lancement direct')
                  : (t('bookingModal.subtitle') || 'Règlement direct par carte bancaire ou échange préalable sur WhatsApp')}
              </p>
            </div>
          </div>

          <button
            onClick={handleClose}
            aria-label="Fermer"
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              border: 'none',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#ffffff',
              transition: 'background 0.2s'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)')}
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '26px 28px', maxHeight: '78vh', overflowY: 'auto' }}>
          {isConfirmingPayment ? (
            /* ============================================================
               VUE MODAL DE CONFIRMATION DU RÈGLEMENT
               ============================================================ */
            <div>
              {/* Carte Récapitulative */}
              <div
                style={{
                  backgroundColor: '#f8fafc',
                  border: '1.5px solid rgba(13, 148, 136, 0.35)',
                  borderRadius: '16px',
                  padding: '20px',
                  marginBottom: '20px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px', marginBottom: '14px' }}>
                  <div>
                    <span
                      style={{
                        fontSize: '0.74rem',
                        fontWeight: '800',
                        textTransform: 'uppercase',
                        letterSpacing: '0.06em',
                        color: '#0d9488'
                      }}
                    >
                      {lang === 'en' ? 'Selected Service' : lang === 'pt' ? 'Serviço Selecionado' : 'Prestation Sélectionnée'}
                    </span>
                    <h4 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#0f172a', margin: '4px 0' }}>
                      {subject}
                    </h4>
                    <div style={{ fontSize: '0.82rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Clock size={13} color="#0d9488" />
                      <span>{lang === 'en' ? '1-hour strategic scoping session with our senior advisory team' : lang === 'pt' ? '1 hora de alinhamento estratégico com nossa consultoria' : '1 heure de cadrage stratégique avec notre cabinet'}</span>
                    </div>
                  </div>

                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <div
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '2rem',
                        fontWeight: '900',
                        color: '#0f172a',
                        lineHeight: 1
                      }}
                    >
                      {stripeConfig.appointmentPrice} {stripeConfig.currencySymbol}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '3px' }}>
                      {lang === 'en' ? 'One-time payment' : lang === 'pt' ? 'Pagamento único' : 'Paiement unique'}
                    </div>
                  </div>
                </div>

                {/* Badges de Cartes Acceptées */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: '12px',
                    borderTop: '1px solid rgba(15, 23, 42, 0.08)',
                    flexWrap: 'wrap',
                    gap: '8px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Lock size={13} color="#0d9488" />
                    <span style={{ fontSize: '0.78rem', color: '#334155', fontWeight: '600' }}>
                      {lang === 'en' ? 'SSL 256-bit secure checkout' : lang === 'pt' ? 'Pagamento seguro SSL 256 bits' : 'Paiement sécurisé SSL 256 bits'}
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <span style={{ fontSize: '0.68rem', fontWeight: '800', padding: '3px 6px', borderRadius: '4px', backgroundColor: '#e2e8f0', color: '#1e293b' }}>CB</span>
                    <span style={{ fontSize: '0.68rem', fontWeight: '800', padding: '3px 6px', borderRadius: '4px', backgroundColor: '#e0e7ff', color: '#1e40af' }}>VISA</span>
                    <span style={{ fontSize: '0.68rem', fontWeight: '800', padding: '3px 6px', borderRadius: '4px', backgroundColor: '#ffedd5', color: '#c2410c' }}>MASTERCARD</span>
                  </div>
                </div>
              </div>

              {/* Récapitulatif Coordonnées (si saisies) */}
              {(name || company || slot) && (
                <div
                  style={{
                    backgroundColor: '#ffffff',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '12px',
                    padding: '14px 16px',
                    marginBottom: '20px',
                    fontSize: '0.84rem'
                  }}
                >
                  <div style={{ fontSize: '0.76rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '8px' }}>
                    {lang === 'en' ? 'Appointment Details:' : lang === 'pt' ? 'Detalhes do Agendamento:' : 'Détails du Rendez-vous :'}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {name && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#334155' }}>
                        <User size={14} color="#64748b" />
                        <span><strong>{lang === 'en' ? 'Requester:' : lang === 'pt' ? 'Solicitante:' : 'Demandeur :'}</strong> {name}</span>
                      </div>
                    )}
                    {company && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#334155' }}>
                        <Building2 size={14} color="#64748b" />
                        <span><strong>{lang === 'en' ? 'Organization:' : lang === 'pt' ? 'Empresa:' : 'Structure :'}</strong> {company}</span>
                      </div>
                    )}
                    {slot && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#334155' }}>
                        <Calendar size={14} color="#64748b" />
                        <span><strong>{lang === 'en' ? 'Time Slot:' : lang === 'pt' ? 'Horário:' : 'Créneau :'}</strong> {slot}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Garanties */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '10px',
                  marginBottom: '22px'
                }}
              >
                <div
                  style={{
                    padding: '10px 12px',
                    borderRadius: '10px',
                    backgroundColor: 'rgba(13, 148, 136, 0.05)',
                    border: '1px solid rgba(13, 148, 136, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '0.78rem',
                    color: '#0f172a'
                  }}
                >
                  <CheckCircle2 size={15} color="#0d9488" style={{ flexShrink: 0 }} />
                  <span>{lang === 'en' ? 'Priority slot guaranteed' : lang === 'pt' ? 'Horário prioritário garantido' : 'Créneau prioritaire garanti'}</span>
                </div>
                <div
                  style={{
                    padding: '10px 12px',
                    borderRadius: '10px',
                    backgroundColor: 'rgba(13, 148, 136, 0.05)',
                    border: '1px solid rgba(13, 148, 136, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '0.78rem',
                    color: '#0f172a'
                  }}
                >
                  <FileText size={15} color="#0d9488" style={{ flexShrink: 0 }} />
                  <span>{lang === 'en' ? 'Instant tax invoice' : lang === 'pt' ? 'Recibo fiscal imediato' : 'Facture fiscale immédiate'}</span>
                </div>
              </div>

              {/* Actions de confirmation */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <button
                  type="button"
                  onClick={executeCardPayment}
                  className="btn btn-primary btn-block btn-lg"
                  style={{
                    backgroundColor: '#0d9488',
                    borderColor: '#0d9488',
                    fontWeight: '800',
                    fontSize: '0.98rem',
                    padding: '14px 20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    boxShadow: '0 8px 20px rgba(13, 148, 136, 0.3)',
                    borderRadius: '12px',
                    cursor: 'pointer'
                  }}
                >
                  <CreditCard size={19} />
                  <span>
                    {lang === 'en'
                      ? `Confirm & Pay by Card (${stripeConfig.appointmentPrice} ${stripeConfig.currencySymbol})`
                      : lang === 'pt'
                      ? `Confirmar e Pagar por Cartão (${stripeConfig.appointmentPrice} ${stripeConfig.currencySymbol})`
                      : `Confirmer & Régler par Carte (${stripeConfig.appointmentPrice} ${stripeConfig.currencySymbol})`}
                  </span>
                  <ArrowRight size={18} />
                </button>

                <button
                  type="button"
                  onClick={handleLaunchWhatsApp}
                  className="btn btn-whatsapp btn-block"
                  style={{
                    fontWeight: '700',
                    fontSize: '0.92rem',
                    padding: '12px 20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    borderRadius: '12px',
                    cursor: 'pointer'
                  }}
                >
                  <MessageSquare size={17} />
                  <span>
                    {lang === 'en'
                      ? `Confirm slot first on WhatsApp (${CONTACT_INFO.whatsappDisplay})`
                      : lang === 'pt'
                      ? `Confirmar horário primeiro no WhatsApp (${CONTACT_INFO.whatsappDisplay})`
                      : `Valider mon créneau d'abord sur WhatsApp (${CONTACT_INFO.whatsappDisplay})`}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsConfirmingPayment(false)}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: '8px 12px',
                    color: 'var(--text-muted)',
                    fontSize: '0.84rem',
                    cursor: 'pointer',
                    textAlign: 'center',
                    textDecoration: 'underline'
                  }}
                >
                  {lang === 'en' ? 'Back to form to edit' : lang === 'pt' ? 'Voltar ao formulário para editar' : 'Revenir au formulaire pour modifier'}
                </button>
              </div>
            </div>
          ) : isSent ? (
            <div style={{ textAlign: 'center', padding: '24px 0' }}>
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  backgroundColor: '#dcfce7',
                  color: 'var(--color-emerald)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px'
                }}
              >
                <CheckCircle2 size={36} />
              </div>
              <h4 style={{ fontSize: '1.3rem', fontWeight: '800', marginBottom: '8px', color: '#0f172a' }}>
                {lang === 'en' ? 'Your request has been sent on WhatsApp!' : lang === 'pt' ? 'Sua solicitação foi enviada no WhatsApp!' : 'Votre demande est transmise sur WhatsApp !'}
              </h4>
              <p style={{ fontSize: '0.92rem', color: '#475569', marginBottom: '20px', lineHeight: 1.6 }}>
                {lang === 'en'
                  ? 'Your message has been sent directly to our advisory firm. Our team will confirm your time slot shortly.'
                  : lang === 'pt'
                  ? 'Sua mensagem foi enviada diretamente à nossa consultoria. Nossa equipe confirmará seu horário em breve.'
                  : 'Votre message a été transmis directement au cabinet. Notre équipe va confirmer votre créneau sous quelques heures.'}
              </p>

              {/* Proposition de paiement direct post-envoi */}
              <div
                style={{
                  backgroundColor: '#f8fafc',
                  border: '1.5px solid rgba(13, 148, 136, 0.35)',
                  borderRadius: '16px',
                  padding: '18px 20px',
                  marginBottom: '20px',
                  textAlign: 'left'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', marginBottom: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CreditCard size={18} color="#0d9488" />
                    <strong style={{ fontSize: '0.94rem', color: '#0f172a' }}>
                      {lang === 'en'
                        ? `Pay for my consultation now (${stripeConfig.appointmentPrice} ${stripeConfig.currencySymbol})`
                        : lang === 'pt'
                        ? `Pagar minha consulta agora (${stripeConfig.appointmentPrice} ${stripeConfig.currencySymbol})`
                        : `Régler ma consultation dès maintenant (${stripeConfig.appointmentPrice} ${stripeConfig.currencySymbol})`}
                    </strong>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span style={{ fontSize: '0.65rem', fontWeight: '800', padding: '2px 5px', borderRadius: '4px', backgroundColor: '#e2e8f0', color: '#1e293b' }}>CB</span>
                    <span style={{ fontSize: '0.65rem', fontWeight: '800', padding: '2px 5px', borderRadius: '4px', backgroundColor: '#e0e7ff', color: '#1e40af' }}>VISA</span>
                    <span style={{ fontSize: '0.65rem', fontWeight: '800', padding: '2px 5px', borderRadius: '4px', backgroundColor: '#ffedd5', color: '#c2410c' }}>MASTERCARD</span>
                  </div>
                </div>
                <p style={{ fontSize: '0.82rem', color: '#64748b', margin: '0 0 14px 0', lineHeight: 1.5 }}>
                  {lang === 'en'
                    ? `To permanently lock your slot right away, you can pay for the consultation (${stripeConfig.appointmentPrice} ${stripeConfig.currencySymbol}) online by credit card. You will automatically receive your receipt and tax invoice by email.`
                    : lang === 'pt'
                    ? `Para garantir definitivamente seu horário agora, você pode pagar a consulta (${stripeConfig.appointmentPrice} ${stripeConfig.currencySymbol}) online por cartão. Você receberá seu recibo e nota por e-mail.`
                    : `Pour bloquer définitivement votre créneau immédiatement, vous pouvez régler la consultation (${stripeConfig.appointmentPrice} ${stripeConfig.currencySymbol}) en ligne par carte bancaire. Vous recevrez automatiquement votre reçu et votre facture par email.`}
                </p>
                <button
                  type="button"
                  onClick={executeCardPayment}
                  className="btn btn-primary btn-block"
                  style={{
                    backgroundColor: '#0d9488',
                    borderColor: '#0d9488',
                    fontWeight: '800',
                    fontSize: '0.94rem',
                    padding: '12px 20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    borderRadius: '10px',
                    cursor: 'pointer'
                  }}
                >
                  <CreditCard size={18} />
                  <span>
                    {lang === 'en'
                      ? `Pay consultation by Card (${stripeConfig.appointmentPrice} ${stripeConfig.currencySymbol})`
                      : lang === 'pt'
                      ? `Pagar consulta por Cartão (${stripeConfig.appointmentPrice} ${stripeConfig.currencySymbol})`
                      : `Régler ma consultation par Carte (${stripeConfig.appointmentPrice} ${stripeConfig.currencySymbol})`}
                  </span>
                </button>
              </div>

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                <button onClick={handleClose} className="btn btn-outline btn-sm">
                  {t('bookingModal.closeBtn') || 'Fermer'}
                </button>
                <button
                  onClick={handleLaunchWhatsApp}
                  className="btn btn-whatsapp btn-sm"
                >
                  <MessageSquare size={16} />
                  <span>{lang === 'en' ? 'Reopen WhatsApp' : lang === 'pt' ? 'Reabrir WhatsApp' : 'Réouvrir WhatsApp'}</span>
                </button>
              </div>
            </div>
          ) : isPlanBooking ? (
            /* ============================================================
               VUE FORMULE PRÉ-REMPLIE : DIRECTEMENT PRÊTE À ÊTRE LANCÉE
               ============================================================ */
            <div>
              {/* Carte Récapitulative de la Formule */}
              <div
                style={{
                  backgroundColor: '#f8fafc',
                  border: '1.5px solid rgba(13, 148, 136, 0.35)',
                  borderRadius: '16px',
                  padding: '18px 20px',
                  marginBottom: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '16px'
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: '0.76rem',
                      fontWeight: '800',
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      color: '#0d9488',
                      marginBottom: '4px'
                    }}
                  >
                    {lang === 'en' ? 'Selected Package' : lang === 'pt' ? 'Plano Selecionado' : 'Formule Sélectionnée'}
                  </div>
                  <h4 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>
                    {bookingData.planName}
                  </h4>
                  {bookingData.planDuration && (
                    <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Clock size={13} />
                      <span>{bookingData.planDuration}</span>
                    </div>
                  )}
                </div>

                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <div
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '1.8rem',
                      fontWeight: '800',
                      color: '#0f172a',
                      lineHeight: 1
                    }}
                  >
                    {bookingData.planPrice}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '2px' }}>
                    / {bookingData.planPeriod}
                  </div>
                </div>
              </div>

              {/* Message WhatsApp Pré-rempli */}
              <div style={{ marginBottom: '20px' }}>
                <label
                  style={{
                    display: 'block',
                    fontSize: '0.84rem',
                    fontWeight: '700',
                    color: '#0f172a',
                    marginBottom: '8px'
                  }}
                >
                  {lang === 'en'
                    ? 'Prefilled message for our advisory firm:'
                    : lang === 'pt'
                    ? 'Mensagem pré-preenchida para a consultoria:'
                    : 'Message pré-rempli pour le cabinet :'}
                </label>
                <textarea
                  rows={3}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: '12px',
                    border: '1px solid rgba(15, 23, 42, 0.12)',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.9rem',
                    color: '#334155',
                    backgroundColor: '#ffffff',
                    resize: 'vertical',
                    lineHeight: 1.5
                  }}
                />
              </div>

              {/* BOUTON D'ACTION IMMÉDIAT : LANCER DIRECTEMENT */}
              <button
                onClick={handleLaunchWhatsApp}
                className="btn btn-whatsapp btn-block btn-lg"
                style={{
                  fontSize: '1.02rem',
                  fontWeight: '800',
                  padding: '16px 24px',
                  borderRadius: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  boxShadow: '0 8px 24px rgba(37, 211, 102, 0.35)',
                  cursor: 'pointer'
                }}
              >
                <MessageSquare size={20} />
                <span>{lang === 'en' ? 'Send my request directly' : lang === 'pt' ? 'Enviar minha solicitação diretamente' : 'Envoyer directement ma demande'}</span>
                <ArrowRight size={18} />
              </button>

              <div
                style={{
                  textAlign: 'center',
                  fontSize: '0.78rem',
                  color: '#64748b',
                  marginTop: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px'
                }}
              >
                <ShieldCheck size={14} color="#0d9488" />
                <span>
                  {lang === 'en'
                    ? `Direct discussion with our firm (${CONTACT_INFO.whatsappDisplay})`
                    : lang === 'pt'
                    ? `Conversa direta com a consultoria (${CONTACT_INFO.whatsappDisplay})`
                    : `Discussion directe avec le cabinet (${CONTACT_INFO.whatsappDisplay})`}
                </span>
              </div>

              {/* Section Accordéon pour Personnaliser (Optionnel) */}
              <div style={{ marginTop: '22px', borderTop: '1px solid rgba(15, 23, 42, 0.08)', paddingTop: '16px' }}>
                <button
                  type="button"
                  onClick={() => setShowOptionalFields(!showOptionalFields)}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    color: '#0d9488',
                    fontWeight: '700',
                    fontSize: '0.86rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    margin: '0 auto'
                  }}
                >
                  <span>
                    {showOptionalFields
                      ? (lang === 'en' ? 'Hide contact details' : lang === 'pt' ? 'Ocultar dados de contato' : 'Masquer les coordonnées')
                      : (lang === 'en' ? 'Add my name or preferred slot (optional)' : lang === 'pt' ? 'Especificar nome ou horário (opcional)' : 'Préciser mon nom ou créneau (optionnel)')}
                  </span>
                  {showOptionalFields ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>

                {showOptionalFields && (
                  <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', marginBottom: '4px', color: '#0f172a' }}>
                          {t('bookingModal.nameLabel')}
                        </label>
                        <input
                          type="text"
                          placeholder="Ex: Marc Koffi"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          style={{
                            width: '100%',
                            padding: '10px 12px',
                            borderRadius: '8px',
                            border: '1px solid rgba(15, 23, 42, 0.12)',
                            fontSize: '0.88rem'
                          }}
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', marginBottom: '4px', color: '#0f172a' }}>
                          {t('bookingModal.companyLabel')}
                        </label>
                        <input
                          type="text"
                          placeholder="Ex: InnovTech"
                          value={company}
                          onChange={(e) => setCompany(e.target.value)}
                          style={{
                            width: '100%',
                            padding: '10px 12px',
                            borderRadius: '8px',
                            border: '1px solid rgba(15, 23, 42, 0.12)',
                            fontSize: '0.88rem'
                          }}
                        />
                      </div>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', marginBottom: '4px', color: '#0f172a' }}>
                        {t('bookingModal.slotLabel')}
                      </label>
                      <select
                        value={slot}
                        onChange={(e) => setSlot(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          borderRadius: '8px',
                          border: '1px solid rgba(15, 23, 42, 0.12)',
                          fontSize: '0.88rem',
                          backgroundColor: '#ffffff'
                        }}
                      >
                        {slotOptions.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* ============================================================
               VUE STANDARD : PRISE DE RENDEZ-VOUS / CONSULTATION PAYANTE
               ============================================================ */
            <form onSubmit={handleLaunchWhatsApp}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {/* Sujet de la consultation */}
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '0.84rem',
                      fontWeight: '700',
                      color: 'var(--text-primary)',
                      marginBottom: '6px'
                    }}
                  >
                    {t('bookingModal.subjectLabel')}
                  </label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '11px 14px',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-subtle)',
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.92rem',
                      backgroundColor: '#f8fafc',
                      color: 'var(--text-primary)',
                      cursor: 'pointer'
                    }}
                  >
                    {allSubjects.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Nom & Contact */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
                  <div>
                    <label
                      style={{
                        display: 'block',
                        fontSize: '0.84rem',
                        fontWeight: '700',
                        color: 'var(--text-primary)',
                        marginBottom: '6px'
                      }}
                    >
                      {t('bookingModal.nameLabel')}
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: Marc Koffi"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '11px 14px',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--border-subtle)',
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.92rem'
                      }}
                    />
                  </div>

                  <div>
                    <label
                      style={{
                        display: 'block',
                        fontSize: '0.84rem',
                        fontWeight: '700',
                        color: 'var(--text-primary)',
                        marginBottom: '6px'
                      }}
                    >
                      {t('bookingModal.companyLabel')}
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: InnovTech SARL"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '11px 14px',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--border-subtle)',
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.92rem'
                      }}
                    />
                  </div>
                </div>

                {/* Créneau horaire préféré */}
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '0.84rem',
                      fontWeight: '700',
                      color: 'var(--text-primary)',
                      marginBottom: '6px'
                    }}
                  >
                    {t('bookingModal.slotLabel')}
                  </label>
                  <select
                    value={slot}
                    onChange={(e) => setSlot(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '11px 14px',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-subtle)',
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.92rem',
                      backgroundColor: '#ffffff',
                      color: 'var(--text-primary)',
                      cursor: 'pointer'
                    }}
                  >
                    {slotOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Note ou Contexte */}
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '0.84rem',
                      fontWeight: '700',
                      color: 'var(--text-primary)',
                      marginBottom: '6px'
                    }}
                  >
                    {t('bookingModal.noteLabel')}
                  </label>
                  <textarea
                    rows={3}
                    placeholder={
                      lang === 'en'
                        ? 'E.g. We wish to automate our quote processing with an on-premise AI model...'
                        : lang === 'pt'
                        ? 'Ex: Desejamos automatizar a emissão de propostas com inteligência artificial...'
                        : 'Ex: Nous souhaitons automatiser le traitement de nos devis avec une IA locale...'
                    }
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-subtle)',
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.9rem',
                      resize: 'vertical'
                    }}
                  />
                </div>

                {/* Bouton d'action principal WhatsApp */}
                <button
                  type="submit"
                  className="btn btn-whatsapp btn-block btn-lg"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    fontWeight: '800'
                  }}
                >
                  <MessageSquare size={20} />
                  <span>{t('bookingModal.submitWhatsApp')}</span>
                </button>

                {/* Séparateur pour option paiement direct */}
                <div style={{ display: 'flex', alignItems: 'center', margin: '4px 0', gap: '12px' }}>
                  <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--border-subtle)' }} />
                  <span style={{ fontSize: '0.74rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-muted)' }}>
                    {t('bookingModal.orPayOnline')}
                  </span>
                  <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--border-subtle)' }} />
                </div>

                {/* Carte de Paiement Direct en bas du formulaire */}
                <div
                  style={{
                    backgroundColor: '#f8fafc',
                    border: '1.5px solid rgba(13, 148, 136, 0.35)',
                    borderRadius: '16px',
                    padding: '16px 18px',
                    boxShadow: '0 4px 16px rgba(13, 148, 136, 0.08)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px', marginBottom: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div
                        style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '8px',
                          backgroundColor: 'rgba(13, 148, 136, 0.12)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0
                        }}
                      >
                        <CreditCard size={18} color="#0d9488" />
                      </div>
                      <div>
                        <span style={{ fontSize: '0.94rem', fontWeight: '800', color: '#0f172a' }}>
                          {t('bookingModal.directPayTitle')}
                        </span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <span style={{ fontSize: '0.65rem', fontWeight: '800', padding: '2px 5px', borderRadius: '4px', backgroundColor: '#e2e8f0', color: '#1e293b' }}>CB</span>
                      <span style={{ fontSize: '0.65rem', fontWeight: '800', padding: '2px 5px', borderRadius: '4px', backgroundColor: '#e0e7ff', color: '#1e40af' }}>VISA</span>
                      <span style={{ fontSize: '0.65rem', fontWeight: '800', padding: '2px 5px', borderRadius: '4px', backgroundColor: '#ffedd5', color: '#c2410c' }}>MASTERCARD</span>
                    </div>
                  </div>

                  <p style={{ fontSize: '0.82rem', color: '#475569', margin: '0 0 12px 0', lineHeight: 1.5 }}>
                    {t('bookingModal.directPayDesc')}
                  </p>

                  <button
                    type="button"
                    onClick={handleDirectPayment}
                    className="btn btn-primary btn-block"
                    style={{
                      backgroundColor: '#0d9488',
                      borderColor: '#0d9488',
                      fontWeight: '800',
                      fontSize: '0.94rem',
                      padding: '12px 18px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      boxShadow: '0 4px 14px rgba(13, 148, 136, 0.25)',
                      borderRadius: '10px',
                      cursor: 'pointer'
                    }}
                  >
                    <CreditCard size={18} />
                    <span>{t('bookingModal.payCardBtn')}</span>
                    <ArrowRight size={16} />
                  </button>
                </div>

                <div
                  style={{
                    textAlign: 'center',
                    fontSize: '0.78rem',
                    color: '#64748b',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px'
                  }}
                >
                  <Lock size={13} color="#0d9488" />
                  <span>
                    {lang === 'en'
                      ? `Consultation (${stripeConfig.appointmentPrice} ${stripeConfig.currencySymbol}) • Direct card payment or on WhatsApp`
                      : lang === 'pt'
                      ? `Consulta (${stripeConfig.appointmentPrice} ${stripeConfig.currencySymbol}) • Pagamento por cartão ou WhatsApp`
                      : `Consultation (${stripeConfig.appointmentPrice} ${stripeConfig.currencySymbol}) • Règlement direct par carte bancaire ou sur WhatsApp`}
                  </span>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </dialog>
  );
}
