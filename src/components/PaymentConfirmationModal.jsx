import React, { useRef, useEffect } from 'react';
import {
  X,
  CreditCard,
  ShieldCheck,
  Lock,
  Calendar,
  User,
  Building2,
  Clock,
  ArrowRight,
  MessageSquare,
  CheckCircle2,
  FileText,
  Sparkles
} from 'lucide-react';
import { CONTACT_INFO } from '../data/content';
import { getStripeConfig } from '../utils/stripeConfig';
import { useLanguage } from '../i18n/LanguageContext';

export function PaymentConfirmationModal({
  isOpen,
  onClose,
  details = {}
}) {
  const { lang, t } = useLanguage();
  const dialogRef = useRef(null);
  const stripeConfig = getStripeConfig();

  const isEn = lang === 'en';
  const isPt = lang === 'pt';

  const price = details.price || stripeConfig.appointmentPrice || 90;
  const currencySymbol = stripeConfig.currencySymbol || '$';
  const subject = details.subject || (isEn ? `Strategic Consultation (${price} ${currencySymbol})` : isPt ? `Consulta Estratégica (${price} ${currencySymbol})` : `Consultation Stratégique (${price} $)`);
  const name = details.name || '';
  const company = details.company || '';
  const slot = details.slot || (isEn ? 'This week — Afternoon (2 PM - 6 PM GMT)' : isPt ? 'Esta semana — Tarde (14h - 18h GMT)' : 'Cette semaine - Après-midi (14h-18h GMT)');
  const phone = details.phone || '';
  const note = details.note || '';

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      if (!dialog.open) {
        dialog.showModal();
      }
    } else {
      if (dialog.open) {
        dialog.close();
      }
    }
  }, [isOpen]);

  const handleBackdropClick = (e) => {
    if (e.target === dialogRef.current) {
      onClose();
    }
  };

  // Action 1: Paiement par Carte
  const handlePayByCard = () => {
    const paymentUrl = (stripeConfig.paymentLinkUrl && stripeConfig.paymentLinkUrl.trim().length > 10)
      ? stripeConfig.paymentLinkUrl.trim()
      : 'https://buy.stripe.com/test_bJe14f75JfJC3IqbPZ43S00';

    window.open(paymentUrl, '_blank', 'noopener,noreferrer');
    onClose();
  };

  // Action 2: Transmettre sur WhatsApp
  const handleConfirmOnWhatsApp = () => {
    const lines = [
      isEn ? "Hello," : isPt ? "Olá," : "Bonjour,",
      "",
      isEn
        ? `I would like to schedule my strategic consultation (${price} ${currencySymbol}):`
        : isPt
        ? `Gostaria de agendar minha consulta estratégica (${price} ${currencySymbol}):`
        : `Je souhaite planifier ma consultation stratégique (${price} ${currencySymbol}) :`,
      `*${isEn ? 'Topic' : isPt ? 'Assunto' : 'Objet'} :* ${subject}`,
      name ? `*${isEn ? 'Requester' : isPt ? 'Solicitante' : 'Demandeur'} :* ${name}` : null,
      company ? `*${isEn ? 'Organization' : isPt ? 'Empresa' : 'Structure'} :* ${company}` : null,
      phone ? `*${isEn ? 'Contact' : isPt ? 'Contato' : 'Contact'} :* ${phone}` : null,
      slot ? `*${isEn ? 'Preferred Slot' : isPt ? 'Horário Desejado' : 'Créneau souhaité'} :* ${slot}` : null,
      note ? `*${isEn ? 'Details' : isPt ? 'Detalhes' : 'Détails'} :* ${note}` : null,
      `*${isEn ? 'Format' : isPt ? 'Modalidade' : 'Modalité'} :* ${
        isEn
          ? `Consultation (${price} ${currencySymbol}) - Direct card payment online or upon confirmation`
          : isPt
          ? `Consulta (${price} ${currencySymbol}) - Pagamento por cartão online ou na confirmação`
          : `Consultation (${price} ${currencySymbol}) - Règlement direct par carte en ligne ou à la confirmation`
      }`,
      "",
      isEn
        ? "_Sent via strategic consulting platform_"
        : isPt
        ? "_Enviado através da plataforma de consultoria estratégica_"
        : "_Envoyé via la plateforme de conseil stratégique_"
    ].filter(Boolean);

    const url = `https://wa.me/${CONTACT_INFO.whatsappNumber}?text=${encodeURIComponent(lines.join('\n'))}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <dialog
      ref={dialogRef}
      onClick={handleBackdropClick}
      onCancel={onClose}
      style={{
        borderRadius: '24px',
        border: 'none',
        maxWidth: '560px',
        width: 'calc(100% - 32px)',
        backgroundColor: '#ffffff',
        padding: 0,
        boxShadow: '0 25px 60px -15px rgba(15, 23, 42, 0.4)',
        overflow: 'hidden'
      }}
    >
      <div>
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
                borderRadius: '12px',
                backgroundColor: 'rgba(13, 148, 136, 0.25)',
                border: '1px solid rgba(13, 148, 136, 0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}
            >
              <CreditCard size={22} color="#2dd4bf" />
            </div>
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#ffffff', lineHeight: 1.2, margin: 0 }}>
                {isEn ? `Booking Confirmation ($${price})` : isPt ? `Confirmação da Consulta (${price} $)` : `Confirmation du Rendez-vous (${price} $)`}
              </h3>
              <p style={{ fontSize: '0.82rem', color: '#94a3b8', marginTop: '3px', margin: 0 }}>
                {isEn ? 'Secure checkout for your strategic scoping session' : isPt ? 'Pagamento seguro da sua consulta estratégica' : 'Règlement sécurisé de votre consultation de cadrage'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label={t('bookingModal.closeBtn') || 'Fermer'}
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
          {/* Récapitulatif Tarifaire */}
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
                  {isEn ? 'Selected Service' : isPt ? 'Serviço Selecionado' : 'Prestation Sélectionnée'}
                </span>
                <h4 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#0f172a', margin: '4px 0' }}>
                  {subject}
                </h4>
                <div style={{ fontSize: '0.82rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Clock size={13} color="#0d9488" />
                  <span>
                    {isEn ? '1-hour strategic scoping session with our senior advisory team' : isPt ? '1 hora de alinhamento estratégico com nossa consultoria' : '1 heure de cadrage stratégique avec notre cabinet'}
                  </span>
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
                  {price} {currencySymbol}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '3px' }}>
                  {isEn ? 'One-time payment' : isPt ? 'Pagamento único' : 'Paiement unique'}
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
                  {isEn ? 'SSL 256-bit secure checkout' : isPt ? 'Pagamento seguro SSL 256 bits' : 'Paiement sécurisé SSL 256 bits'}
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
                {isEn ? 'Appointment Details:' : isPt ? 'Detalhes do Agendamento:' : 'Détails du Rendez-vous :'}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {name && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#334155' }}>
                    <User size={14} color="#64748b" />
                    <span><strong>{isEn ? 'Requester:' : isPt ? 'Solicitante:' : 'Demandeur :'}</strong> {name}</span>
                  </div>
                )}
                {company && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#334155' }}>
                    <Building2 size={14} color="#64748b" />
                    <span><strong>{isEn ? 'Organization:' : isPt ? 'Empresa:' : 'Structure :'}</strong> {company}</span>
                  </div>
                )}
                {slot && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#334155' }}>
                    <Calendar size={14} color="#64748b" />
                    <span><strong>{isEn ? 'Time Slot:' : isPt ? 'Horário:' : 'Créneau :'}</strong> {slot}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Garanties & Livrables */}
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
              <span>{isEn ? 'Priority slot guaranteed' : isPt ? 'Horário prioritário garantido' : 'Créneau prioritaire garanti'}</span>
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
              <span>{isEn ? 'Instant tax invoice' : isPt ? 'Recibo fiscal imediato' : 'Facture fiscale immédiate'}</span>
            </div>
          </div>

          {/* Boutons d'Action Principaux */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <button
              type="button"
              onClick={handlePayByCard}
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
                {isEn
                  ? `Confirm & Pay by Card (${price} ${currencySymbol})`
                  : isPt
                  ? `Confirmar e Pagar por Cartão (${price} ${currencySymbol})`
                  : `Confirmer & Régler par Carte (${price} ${currencySymbol})`}
              </span>
              <ArrowRight size={18} />
            </button>

            <button
              type="button"
              onClick={handleConfirmOnWhatsApp}
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
                {isEn
                  ? `Confirm slot first on WhatsApp (${CONTACT_INFO.whatsappDisplay})`
                  : isPt
                  ? `Confirmar horário primeiro no WhatsApp (${CONTACT_INFO.whatsappDisplay})`
                  : `Valider mon créneau d'abord sur WhatsApp (${CONTACT_INFO.whatsappDisplay})`}
              </span>
            </button>

            <button
              type="button"
              onClick={onClose}
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
              {isEn ? 'Back to form to edit' : isPt ? 'Voltar ao formulário para editar' : 'Revenir au formulaire pour modifier'}
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
}
