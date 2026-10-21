import React, { useState } from 'react';
import { Phone, Mail, MapPin, Calendar, MessageSquare, ExternalLink, ShieldCheck, CheckCircle2, CreditCard, Lock } from 'lucide-react';
import { CONTACT_INFO } from '../data/content';
import { LinkedinIcon, FacebookIcon, TwitterXIcon, WhatsappIcon } from '../components/SocialIcons';
import { getStripeConfig } from '../utils/stripeConfig';
import { PaymentConfirmationModal } from '../components/PaymentConfirmationModal';
import { useLanguage } from '../i18n/LanguageContext';

export function ContactPage() {
  const { lang, t } = useLanguage();
  const stripeConfig = getStripeConfig();

  const isEn = lang === 'en';
  const isPt = lang === 'pt';

  const defaultSubject = isEn
    ? `Strategic Consultation (${stripeConfig.appointmentPrice} ${stripeConfig.currencySymbol})`
    : isPt
    ? `Consulta Estratégica (${stripeConfig.appointmentPrice} ${stripeConfig.currencySymbol})`
    : `Consultation Stratégique de Cadrage (${stripeConfig.appointmentPrice} $)`;

  const defaultSlot = isEn
    ? "This week — Afternoon (2 PM - 6 PM GMT)"
    : isPt
    ? "Esta semana — Tarde (14h - 18h GMT)"
    : "Cette semaine - Après-midi (14h-18h GMT)";

  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState(defaultSubject);
  const [slot, setSlot] = useState(defaultSlot);
  const [note, setNote] = useState('');
  const [rgpdConsent, setRgpdConsent] = useState(true);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const signature = isEn
    ? "_Sent via strategic consulting platform_"
    : isPt
    ? "_Enviado através da plataforma de consultoria estratégica_"
    : "_Envoyé via la plateforme de conseil stratégique_";

  const buildWhatsAppMessage = () => {
    const lines = [
      isEn ? "Hello," : isPt ? "Olá," : "Bonjour,",
      "",
      isEn
        ? `I would like to schedule a strategic consultation (${stripeConfig.appointmentPrice} ${stripeConfig.currencySymbol}):`
        : isPt
        ? `Gostaria de agendar uma consulta estratégica (${stripeConfig.appointmentPrice} ${stripeConfig.currencySymbol}):`
        : `Je souhaite prendre rendez-vous pour une consultation stratégique :`,
      `*${isEn ? 'Topic' : isPt ? 'Assunto' : 'Sujet'} :* ${subject}`,
      `*${isEn ? 'Name' : isPt ? 'Nome' : 'Nom'} :* ${name || (isEn ? '[Not specified]' : isPt ? '[Não especificado]' : '[Non précisé]')}`,
      company ? `*${isEn ? 'Organization' : isPt ? 'Empresa' : 'Entreprise'} :* ${company}` : null,
      phone ? `*${isEn ? 'Phone / Contact' : isPt ? 'Telefone / Contato' : 'Téléphone / Contact'} :* ${phone}` : null,
      `*${isEn ? 'Preferred Slot' : isPt ? 'Horário Desejado' : 'Créneau souhaité'} :* ${slot}`,
      note ? `*${isEn ? 'Message / Project' : isPt ? 'Mensagem / Projeto' : 'Message / Projet'} :* ${note}` : null,
      `*${isEn ? 'Format' : isPt ? 'Modalidade' : 'Modalité'} :* ${
        isEn
          ? `Consultation (${stripeConfig.appointmentPrice} ${stripeConfig.currencySymbol}) - Direct card payment online or upon confirmation`
          : isPt
          ? `Consulta (${stripeConfig.appointmentPrice} ${stripeConfig.currencySymbol}) - Pagamento por cartão online ou na confirmação`
          : `Consultation (${stripeConfig.appointmentPrice} $) - Règlement direct en ligne ou lien à la confirmation`
      }`,
      "",
      signature
    ].filter(Boolean);

    return lines.join('\n');
  };

  const handleSendWhatsApp = (e) => {
    e.preventDefault();
    const raw = buildWhatsAppMessage();
    const encoded = encodeURIComponent(raw);
    const url = `https://wa.me/${CONTACT_INFO.whatsappNumber}?text=${encoded}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleDirectPayment = (e) => {
    if (e) e.preventDefault();
    if (stripeConfig.paymentLinkUrl && stripeConfig.paymentLinkUrl.trim().length > 10) {
      window.open(stripeConfig.paymentLinkUrl, '_blank', 'noopener,noreferrer');
    } else {
      const paymentMsg = [
        isEn ? "Hello," : isPt ? "Olá," : "Bonjour,",
        "",
        isEn
          ? `I would like to proceed with the direct payment of my strategic consultation (${stripeConfig.appointmentPrice} ${stripeConfig.currencySymbol}) by credit card:`
          : isPt
          ? `Desejo realizar o pagamento direto da minha consulta estratégica (${stripeConfig.appointmentPrice} ${stripeConfig.currencySymbol}) por cartão de crédito:`
          : `Je souhaite procéder au règlement direct de ma consultation stratégique (${stripeConfig.appointmentPrice} $) par carte bancaire :`,
        `*${isEn ? 'Topic' : isPt ? 'Assunto' : 'Objet'} :* ${subject}`,
        name ? `*${isEn ? 'Requester' : isPt ? 'Solicitante' : 'Demandeur'} :* ${name}` : null,
        company ? `*${isEn ? 'Organization' : isPt ? 'Empresa' : 'Structure'} :* ${company}` : null,
        phone ? `*${isEn ? 'Contact' : isPt ? 'Contato' : 'Contact'} :* ${phone}` : null,
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
        signature
      ].filter(Boolean).join('\n');

      const encoded = encodeURIComponent(paymentMsg);
      const url = `https://wa.me/${CONTACT_INFO.whatsappNumber}?text=${encoded}`;
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const subjectOptions = isEn ? [
    `Strategic Consultation (${stripeConfig.appointmentPrice} ${stripeConfig.currencySymbol})`,
    'Annual Advisory - SME ($600/yr) — Recommended',
    'Annual Advisory - Small Business ($200/yr)',
    'Annual Advisory - Individual ($100/yr)',
    'Business Consultation ($490)',
    'Basic Consultation ($90)',
    'Premium Advisory ($2,000)',
    'General Inquiry / Tailored Project'
  ] : isPt ? [
    `Consulta Estratégica (${stripeConfig.appointmentPrice} ${stripeConfig.currencySymbol})`,
    'Acompanhamento PME (600 $/ano) — Recomendado',
    'Acompanhamento Pequena Empresa (200 $/ano)',
    'Acompanhamento Individual (100 $/ano)',
    'Consultoria Empresarial (490 $)',
    'Consultoria Básica (90 $)',
    'Consultoria Premium (2.000 $)',
    'Demanda Geral / Projeto Personalizado'
  ] : [
    "Consultation Stratégique de Cadrage (90 $)",
    "Suivi Moral PME (600 $/an) — Recommandé",
    "Suivi Moral Petite Entreprise (200 $/an)",
    "Suivi Physique Individu (100 $/an)",
    "Consultance Business (490 $)",
    "Consultance Basic (90 $)",
    "Consultance Premium (2 000 $)",
    "Question générale / Projet sur-mesure"
  ];

  const slotOptions = [
    { value: t('bookingModal.slotMorning') || "Dès demain — Matinée (9h - 12h GMT)", label: t('bookingModal.slotMorning') || "Dès demain — Matinée (9h - 12h GMT)" },
    { value: t('bookingModal.slotAfternoon') || "Cette semaine — Après-midi (14h - 18h GMT)", label: t('bookingModal.slotAfternoon') || "Cette semaine — Après-midi (14h - 18h GMT)" },
    { value: t('bookingModal.slotEvening') || "Cette semaine — En soirée (18h - 20h GMT)", label: t('bookingModal.slotEvening') || "Cette semaine — En soirée (18h - 20h GMT)" },
    { value: t('bookingModal.slotFlexible') || "Créneau flexible selon disponibilités du cabinet", label: t('bookingModal.slotFlexible') || "Créneau flexible selon disponibilités du cabinet" }
  ];

  return (
    <div>
      {/* Page Header */}
      <div className="page-header">
        <div className="container">
          <h1 className="page-title">
            {isEn
              ? 'Book an Appointment & Contact our Firm'
              : isPt
              ? 'Agendar Consulta & Contatar a Consultoria'
              : 'Prendre Rendez-vous & Contacter le Cabinet'}
          </h1>
          <p className="page-description">
            {isEn
              ? `All strategic scoping appointments are paid sessions (${stripeConfig.appointmentPrice} ${stripeConfig.currencySymbol}), with immediate online confirmation. Pay online to lock your priority slot, or prepare your details below to discuss on WhatsApp first.`
              : isPt
              ? `Todas as sessões de alinhamento estratégico são consultas remuneradas (${stripeConfig.appointmentPrice} ${stripeConfig.currencySymbol}), com confirmação online imediata. Pague online para garantir seu horário prioritário ou preencha abaixo para falar primeiro no WhatsApp.`
              : `Toutes les prises de rendez-vous et sessions de cadrage stratégique sont payantes (${stripeConfig.appointmentPrice} $), avec confirmation et règlement sécurisé en ligne. Réglez directement en ligne pour bloquer votre créneau en priorité, ou préparez vos disponibilités ci-dessous pour échanger d'abord sur WhatsApp.`}
          </p>
        </div>
      </div>

      <div className="container" style={{ paddingBottom: '90px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '48px',
            alignItems: 'start'
          }}
          className="contact-layout-grid"
        >
          {/* Left Column: Direct WhatsApp Interactive Booking Form */}
          <div
            className="card reveal-left"
            style={{
              backgroundColor: '#ffffff',
              border: '1px solid var(--border-subtle)',
              padding: '36px'
            }}
          >
            <h2 style={{ fontSize: '1.45rem', fontWeight: '800', marginBottom: '8px', textAlign: 'center' }}>
              {isEn ? 'Appointment Booking Form' : isPt ? 'Formulário de Agendamento' : 'Formulaire de Prise de Rendez-vous'}
            </h2>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '24px', textAlign: 'center' }}>
              {isEn
                ? 'Your request is formatted for an immediate, high-priority scoping session with our advisory team.'
                : isPt
                ? 'Suas informações são estruturadas para um alinhamento direto e ágil com nossa consultoria.'
                : 'Vos informations sont préparées pour un cadrage direct et instantané avec le cabinet.'}
            </p>

            <form onSubmit={handleSendWhatsApp}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: '700', marginBottom: '6px' }}>
                    {t('bookingModal.subjectLabel')} *
                  </label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-subtle)',
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.92rem',
                      backgroundColor: '#f8fafc'
                    }}
                  >
                    {subjectOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: '700', marginBottom: '6px' }}>
                      {t('bookingModal.nameLabel')} *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Paul Lawson"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px 14px',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--border-subtle)',
                        fontSize: '0.92rem'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: '700', marginBottom: '6px' }}>
                      {t('bookingModal.companyLabel')}
                    </label>
                    <input
                      type="text"
                      placeholder={isEn ? "E.g. Global Tech Partners" : isPt ? "Ex: Tech Soluções" : "Ex: Société Générale de Commerce"}
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px 14px',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--border-subtle)',
                        fontSize: '0.92rem'
                      }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: '700', marginBottom: '6px' }}>
                      {isEn ? 'Phone number with country code' : isPt ? 'Número de telefone com DDI' : 'Numéro de téléphone avec indicatif pays'}
                    </label>
                    <input
                      type="tel"
                      placeholder="Ex: +228 90 00 00 00"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px 14px',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--border-subtle)',
                        fontSize: '0.92rem'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: '700', marginBottom: '6px' }}>
                      {t('bookingModal.slotLabel')}
                    </label>
                    <select
                      value={slot}
                      onChange={(e) => setSlot(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px 14px',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--border-subtle)',
                        fontSize: '0.92rem',
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

                <div>
                  <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: '700', marginBottom: '6px' }}>
                    {t('bookingModal.noteLabel')}
                  </label>
                  <textarea
                    rows={4}
                    placeholder={
                      isEn
                        ? "Briefly outline your goals, technical constraints, or key questions..."
                        : isPt
                        ? "Descreva resumidamente seus objetivos, restrições técnicas ou dúvidas..."
                        : "Précisez brièvement vos objectifs, contraintes techniques ou questions..."
                    }
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-subtle)',
                      fontSize: '0.92rem',
                      resize: 'vertical'
                    }}
                  />
                </div>

                {/* RGPD Checkbox */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <input
                    type="checkbox"
                    id="consent"
                    checked={rgpdConsent}
                    onChange={(e) => setRgpdConsent(e.target.checked)}
                    required
                    style={{ cursor: 'pointer' }}
                  />
                  <label htmlFor="consent" style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                    {isEn
                      ? 'I agree that my contact information will be used exclusively to arrange this consultation (GDPR / LGPD compliant).'
                      : isPt
                      ? 'Concordo que meus dados de contato sejam utilizados exclusivamente para agendar esta consulta (em conformidade com a LGPD).'
                      : "J'accepte que mes coordonnées soient utilisées exclusivement pour convenir de ce rendez-vous (conformité RGPD)."}
                  </label>
                </div>

                {/* WhatsApp Message Preview */}
                <div
                  style={{
                    backgroundColor: '#f8fafc',
                    border: '1px dashed var(--border-subtle)',
                    borderRadius: 'var(--radius-md)',
                    padding: '14px',
                    fontSize: '0.82rem'
                  }}
                >
                  <strong style={{ color: 'var(--text-primary)' }}>
                    {isEn ? 'Live preview of message ready to send:' : isPt ? 'Pré-visualização da mensagem pronta para envio:' : 'Aperçu en direct du message prêt à être envoyé :'}
                  </strong>
                  <pre
                    style={{
                      whiteSpace: 'pre-wrap',
                      fontFamily: 'inherit',
                      marginTop: '6px',
                      color: 'var(--text-secondary)'
                    }}
                  >
                    {buildWhatsAppMessage()}
                  </pre>
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
                    padding: '14px 22px',
                    fontWeight: '800'
                  }}
                >
                  <MessageSquare size={19} />
                  <span>
                    {isEn
                      ? `Send booking request via WhatsApp (${CONTACT_INFO.whatsappDisplay})`
                      : isPt
                      ? `Enviar solicitação no WhatsApp (${CONTACT_INFO.whatsappDisplay})`
                      : `Envoyer ma demande de rendez-vous sur WhatsApp (${CONTACT_INFO.whatsappDisplay})`}
                  </span>
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
                    padding: '18px 20px',
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

                  <p style={{ fontSize: '0.82rem', color: '#475569', margin: '0 0 14px 0', lineHeight: 1.5 }}>
                    {t('bookingModal.directPayDesc')}
                  </p>

                  <button
                    type="button"
                    onClick={() => setShowPaymentModal(true)}
                    className="btn btn-primary btn-block"
                    style={{
                      backgroundColor: '#0d9488',
                      borderColor: '#0d9488',
                      fontWeight: '800',
                      fontSize: '0.94rem',
                      padding: '13px 20px',
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
                    <ExternalLink size={16} />
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
                  <ShieldCheck size={14} color="#0d9488" />
                  <span>
                    {isEn
                      ? `Consultation (${stripeConfig.appointmentPrice} ${stripeConfig.currencySymbol}) • Direct card payment online or via WhatsApp confirmation`
                      : isPt
                      ? `Consulta (${stripeConfig.appointmentPrice} ${stripeConfig.currencySymbol}) • Pagamento direto por cartão ou na confirmação via WhatsApp`
                      : `Consultation (${stripeConfig.appointmentPrice} ${stripeConfig.currencySymbol}) • Règlement direct par carte en ligne ou sur WhatsApp à la confirmation`}
                  </span>
                </div>
              </div>
            </form>
          </div>

          {/* Right Column: Direct Coordinates & Calendly */}
          <div className="reveal-right" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Direct Info Card */}
            <div
              className="card"
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid var(--border-subtle)',
                padding: '32px'
              }}
            >
              <h2 style={{ fontSize: '1.35rem', fontWeight: '800', marginBottom: '20px', textAlign: 'center' }}>
                {isEn ? 'Official Coordinates' : isPt ? 'Canais Oficiais' : 'Coordonnées Officielles'}
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', fontSize: '0.92rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                  <MapPin size={22} color="var(--color-brand-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ color: 'var(--text-primary)', display: 'block' }}>
                      {isEn ? 'Physical Address:' : isPt ? 'Endereço Comercial:' : 'Adresse Physique :'}
                    </strong>
                    <span style={{ color: 'var(--text-secondary)' }}>{CONTACT_INFO.address}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                  <Phone size={22} color="var(--color-brand-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ color: 'var(--text-primary)', display: 'block' }}>
                      {isEn ? 'Telephone Lines:' : isPt ? 'Linhas Telefônicas:' : 'Lignes Téléphoniques :'}
                    </strong>
                    <span style={{ color: 'var(--text-secondary)' }}>{CONTACT_INFO.phoneDisplay}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                  <Mail size={22} color="var(--color-brand-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ color: 'var(--text-primary)', display: 'block' }}>
                      {isEn ? 'Official Email:' : isPt ? 'E-mail Oficial:' : 'Courriel Électronique :'}
                    </strong>
                    <a href={`mailto:${CONTACT_INFO.email}`} style={{ color: 'var(--color-brand-primary)', fontWeight: '600' }}>
                      {CONTACT_INFO.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Socials Card */}
            <div
              className="card reveal-on-scroll"
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid var(--border-subtle)',
                padding: '24px'
              }}
            >
              <h3 className="contact-social-title" style={{ fontSize: '1.05rem', fontWeight: '700', marginBottom: '14px' }}>
                {isEn ? 'Official Profiles & Networks' : isPt ? 'Perfis & Redes Oficiais' : 'Profils & Réseaux Sociaux'}
              </h3>
              <div className="contact-social-row" style={{ display: 'flex', gap: '14px', alignItems: 'center', flexWrap: 'wrap' }}>
                {[
                  { name: 'WhatsApp', icon: WhatsappIcon, url: CONTACT_INFO.socials.whatsapp, color: '#25d366', bg: 'rgba(37, 211, 102, 0.12)' },
                  { name: 'LinkedIn', icon: LinkedinIcon, url: CONTACT_INFO.socials.linkedin, color: '#0a66c2', bg: 'rgba(10, 102, 194, 0.1)' },
                  { name: 'Facebook', icon: FacebookIcon, url: CONTACT_INFO.socials.facebook, color: '#1877f2', bg: 'rgba(24, 119, 242, 0.1)' },
                  { name: 'Twitter (X)', icon: TwitterXIcon, url: CONTACT_INFO.socials.twitter, color: '#0f172a', bg: 'rgba(15, 23, 42, 0.08)' }
                ].map((s) => {
                  const IconComponent = s.icon;
                  return (
                    <a
                      key={s.name}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={s.name}
                      aria-label={s.name}
                      style={{
                        width: '46px',
                        height: '46px',
                        borderRadius: '50%',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#ffffff',
                        border: '1px solid var(--border-subtle)',
                        color: 'var(--text-primary)',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
                        transition: 'all 0.22s cubic-bezier(0.16, 1, 0.3, 1)'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = s.bg;
                        e.currentTarget.style.color = s.color;
                        e.currentTarget.style.borderColor = s.color;
                        e.currentTarget.style.transform = 'translateY(-3px) scale(1.08)';
                        e.currentTarget.style.boxShadow = `0 6px 16px ${s.color}33`;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#ffffff';
                        e.currentTarget.style.color = 'var(--text-primary)';
                        e.currentTarget.style.borderColor = 'var(--border-subtle)';
                        e.currentTarget.style.transform = 'translateY(0) scale(1)';
                        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.05)';
                      }}
                    >
                      <IconComponent size={22} />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 992px) {
          .contact-layout-grid {
            grid-template-columns: 1.25fr 0.85fr !important;
          }
        }
        @media (max-width: 768px) {
          .contact-social-title {
            text-align: center !important;
          }
          .contact-social-row {
            justify-content: center !important;
          }
        }
      `}</style>

      {/* Modal de Confirmation de Paiement & Rendez-vous */}
      <PaymentConfirmationModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        details={{
          subject,
          name,
          company,
          phone,
          slot,
          note,
          price: stripeConfig.appointmentPrice
        }}
      />
    </div>
  );
}
