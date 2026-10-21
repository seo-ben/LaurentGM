import React, { useRef, useEffect, useMemo } from 'react';
import {
  Check,
  MessageSquare,
  ArrowRight,
  ShieldCheck,
  X,
  CreditCard
} from 'lucide-react';
import { CONTACT_INFO } from '../data/content';
import { getStripeConfig } from '../utils/stripeConfig';
import { useLanguage } from '../i18n/LanguageContext';

export function PaymentSuccessModal({
  isOpen,
  onClose
}) {
  const { t, lang } = useLanguage();
  const dialogRef = useRef(null);
  const stripeConfig = getStripeConfig();
  const price = stripeConfig.appointmentPrice || 90;
  const currencySymbol = stripeConfig.currencySymbol || '$';

  // Formatage de la date en direct selon la langue active
  const formattedDate = useMemo(() => {
    try {
      const now = new Date();
      const locale = lang === 'en' ? 'en-US' : lang === 'pt' ? 'pt-BR' : 'fr-FR';
      return new Intl.DateTimeFormat(locale, {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }).format(now);
    } catch {
      return '21 oct. 2026';
    }
  }, [lang]);

  // Récupération de l'identifiant de transaction s'il existe dans l'URL ou génération d'une référence propre
  const refNumber = useMemo(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const session = params.get('session_id');
      if (session && session.length > 6) {
        return `TXN-${session.slice(-8).toUpperCase()}`;
      }
    }
    return 'TXN-8829-001';
  }, []);

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

  // Message WhatsApp multilingue sans mention de nom propre
  const whatsappMessage = useMemo(() => {
    const hello = t('paymentSuccess.msgHello') || "Bonjour,";
    const paid = t('paymentSuccess.msgPaid') || `Je viens d'effectuer avec succès le règlement de ma consultation stratégique (${price} ${currencySymbol}) sur votre plateforme.`;
    const contact = t('paymentSuccess.msgContact') || "Je vous contacte afin de convenir de la date et de l'heure de notre rendez-vous.";
    const refLabel = t('paymentSuccess.refLabel') || "Réf. Transaction";
    const serviceLabel = t('paymentSuccess.serviceLabel') || "Prestation";
    const serviceVal = t('paymentSuccess.serviceValue') || "Consultation (1h)";
    const amountLabel = lang === 'en' ? "Amount Paid" : lang === 'pt' ? "Valor Pago" : "Montant réglé";
    const thanks = lang === 'en' ? "Thank you!" : lang === 'pt' ? "Obrigado!" : "Merci !";

    return [
      hello,
      ``,
      paid,
      ``,
      `*${refLabel} :* ${refNumber}`,
      `*${serviceLabel} :* ${serviceVal}`,
      `*${amountLabel} :* ${price} ${currencySymbol}`,
      ``,
      contact,
      ``,
      thanks
    ].join('\n');
  }, [lang, price, currencySymbol, refNumber, t]);

  const whatsappUrl = `https://wa.me/${CONTACT_INFO.whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  const handleOpenWhatsApp = () => {
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  if (!isOpen) return null;

  return (
    <dialog
      ref={dialogRef}
      onClick={handleBackdropClick}
      onCancel={onClose}
      style={{
        borderRadius: '28px',
        border: 'none',
        maxWidth: '430px',
        width: 'calc(100% - 32px)',
        backgroundColor: '#ffffff',
        padding: '32px 26px 26px',
        boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.04)',
        position: 'relative',
        textAlign: 'center',
        margin: 'auto'
      }}
    >
      {/* Bouton de fermeture discret */}
      <button
        onClick={onClose}
        aria-label="Fermer"
        style={{
          position: 'absolute',
          top: '16px',
          right: '16px',
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          border: 'none',
          backgroundColor: '#f1f5f9',
          color: '#64748b',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          transition: 'background-color 0.2s, color 0.2s'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#e2e8f0';
          e.currentTarget.style.color = '#0f172a';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = '#f1f5f9';
          e.currentTarget.style.color = '#64748b';
        }}
      >
        <X size={17} />
      </button>

      {/* Icône Cercle Vert Minimaliste (comme l'image de référence) */}
      <div
        style={{
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          backgroundColor: '#10b981',
          color: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 18px',
          boxShadow: '0 8px 20px rgba(16, 185, 129, 0.25)'
        }}
      >
        <Check size={34} strokeWidth={3} />
      </div>

      {/* Titre & Sous-titre épurés */}
      <h3
        style={{
          fontSize: '1.35rem',
          fontWeight: '800',
          color: '#0f172a',
          margin: '0 0 4px',
          fontFamily: 'var(--font-heading)'
        }}
      >
        {t('paymentSuccess.title') || "Paiement Réussi"}
      </h3>
      <p
        style={{
          fontSize: '0.88rem',
          color: '#64748b',
          margin: '0 0 20px'
        }}
      >
        {t('paymentSuccess.subtitle') || "Votre réservation est confirmée"}
      </p>

      {/* Grand Montant FinTech */}
      <div
        style={{
          fontSize: '2.5rem',
          fontWeight: '900',
          color: '#0f172a',
          fontFamily: 'var(--font-heading)',
          letterSpacing: '-0.02em',
          lineHeight: 1,
          marginBottom: '26px'
        }}
      >
        {price}.00 {currencySymbol}
      </div>

      {/* Fiche de Transaction Épurée (Style Billet / Reçu Fintech) */}
      <div
        style={{
          backgroundColor: '#f8fafc',
          border: '1px solid #e2e8f0',
          borderRadius: '16px',
          padding: '16px 18px',
          textAlign: 'left',
          marginBottom: '22px'
        }}
      >
        <div
          style={{
            fontSize: '0.72rem',
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            color: '#94a3b8',
            marginBottom: '12px'
          }}
        >
          {t('paymentSuccess.detailsTitle') || "Détails de la transaction"}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.84rem' }}>
          {/* Ligne Date */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: '#64748b' }}>{t('paymentSuccess.dateLabel') || "Date"}</span>
            <span style={{ fontWeight: '600', color: '#0f172a' }}>{formattedDate}</span>
          </div>

          {/* Ligne Réf */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: '#64748b' }}>{t('paymentSuccess.refLabel') || "Réf. Numéro"}</span>
            <span style={{ fontWeight: '700', color: '#0f172a', fontFamily: 'monospace', fontSize: '0.86rem' }}>
              {refNumber}
            </span>
          </div>

          {/* Ligne Prestation */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: '#64748b' }}>{t('paymentSuccess.serviceLabel') || "Prestation"}</span>
            <span style={{ fontWeight: '600', color: '#0f172a' }}>{t('paymentSuccess.serviceValue') || "Consultation (1h)"}</span>
          </div>

          {/* Ligne Mode de Paiement */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: '#64748b' }}>{t('paymentSuccess.methodLabel') || "Méthode"}</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '600', color: '#0f172a' }}>
              <CreditCard size={14} color="#64748b" />
              <span>{t('paymentSuccess.methodValue') || "Carte"}</span>
            </span>
          </div>

          {/* Badge VÉRIFIÉ */}
          <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '8px', borderTop: '1px solid #f1f5f9' }}>
            <span
              style={{
                fontSize: '0.72rem',
                fontWeight: '800',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                backgroundColor: '#dcfce7',
                color: '#15803d',
                padding: '4px 12px',
                borderRadius: '12px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px'
              }}
            >
              <ShieldCheck size={13} />
              {t('paymentSuccess.verifiedBadge') || "Vérifié & Sécurisé"}
            </span>
          </div>
        </div>
      </div>

      {/* Bouton d'action principal : Envoyer la confirmation sur WhatsApp */}
      <button
        type="button"
        onClick={handleOpenWhatsApp}
        className="btn btn-whatsapp btn-block btn-lg"
        style={{
          width: '100%',
          backgroundColor: '#10b981',
          borderColor: '#10b981',
          fontSize: '0.96rem',
          fontWeight: '800',
          padding: '14px 20px',
          borderRadius: '14px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '9px',
          boxShadow: '0 8px 20px rgba(16, 185, 129, 0.3)',
          cursor: 'pointer',
          marginBottom: '12px',
          transition: 'transform 0.15s, background-color 0.2s'
        }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#059669')}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#10b981')}
      >
        <MessageSquare size={19} />
        <span>{t('paymentSuccess.whatsappBtn') || "Envoyer la confirmation sur WhatsApp"}</span>
        <ArrowRight size={17} />
      </button>

      {/* Lien secondaire discret : Fermer */}
      <div>
        <button
          type="button"
          onClick={onClose}
          style={{
            background: 'none',
            border: 'none',
            color: '#64748b',
            fontSize: '0.82rem',
            cursor: 'pointer',
            padding: '6px 12px',
            textDecoration: 'underline',
            fontWeight: '500'
          }}
        >
          {t('paymentSuccess.closeBtn') || "Fermer et retourner au site"}
        </button>
      </div>
    </dialog>
  );
}
