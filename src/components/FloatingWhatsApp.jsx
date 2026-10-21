import React, { useState } from 'react';
import { MessageSquare, X } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export function FloatingWhatsApp({ onOpenBooking }) {
  const { lang } = useLanguage();
  const [showTooltip, setShowTooltip] = useState(false);

  const texts = {
    fr: {
      tooltipBold: "Défi tech ou IA ?",
      tooltipText: " Consultation stratégique avec nos experts (règlement Stripe sécurisé).",
      bookingSubject: "Consultation Stratégique (90 $)",
      floatingSubject: "Prise de contact rapide via bulle flottante",
      ariaLabel: "Prendre contact avec notre cabinet",
      closeLabel: "Fermer"
    },
    en: {
      tooltipBold: "Tech or AI challenge?",
      tooltipText: " Strategic consultation with our senior advisors (secure Stripe checkout).",
      bookingSubject: "Strategic Consultation ($90)",
      floatingSubject: "Quick inquiry via floating messenger",
      ariaLabel: "Contact our advisory firm",
      closeLabel: "Close"
    },
    pt: {
      tooltipBold: "Desafio tech ou IA?",
      tooltipText: " Consultoria estratégica com nossos especialistas (pagamento seguro via Stripe).",
      bookingSubject: "Consultoria Estratégica (US$ 90)",
      floatingSubject: "Contato rápido via botão flutuante",
      ariaLabel: "Entrar em contato com nossa consultoria",
      closeLabel: "Fechar"
    }
  }[lang] || {
    tooltipBold: "Défi tech ou IA ?",
    tooltipText: " Consultation stratégique avec nos experts (règlement Stripe sécurisé).",
    bookingSubject: "Consultation Stratégique (90 $)",
    floatingSubject: "Prise de contact rapide via bulle flottante",
    ariaLabel: "Prendre contact avec notre cabinet",
    closeLabel: "Fermer"
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 90,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: '8px'
      }}
    >
      {/* Floating high-converting hook pill */}
      {showTooltip && (
        <div
          onClick={() => onOpenBooking(texts.bookingSubject)}
          style={{
            backgroundColor: '#ffffff',
            borderRadius: 'var(--radius-lg)',
            padding: '12px 16px',
            boxShadow: 'var(--shadow-xl)',
            border: '1px solid rgba(13, 148, 136, 0.25)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontSize: '0.84rem',
            maxWidth: '310px',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.borderColor = 'var(--color-brand-primary)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.borderColor = 'rgba(13, 148, 136, 0.25)';
          }}
        >
          <span
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-whatsapp)',
              boxShadow: '0 0 6px rgba(37, 211, 102, 0.8)',
              flexShrink: 0
            }}
          />
          <div style={{ flex: 1, color: 'var(--text-primary)', lineHeight: 1.35 }}>
            <strong>{texts.tooltipBold}</strong>{texts.tooltipText}
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowTooltip(false);
            }}
            aria-label={texts.closeLabel}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-light)',
              cursor: 'pointer',
              padding: '2px',
              display: 'flex',
              alignItems: 'center',
              flexShrink: 0
            }}
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* Main floating action button */}
      <button
        onClick={() => onOpenBooking(texts.floatingSubject)}
        className="btn-whatsapp"
        aria-label={texts.ariaLabel}
        style={{
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 8px 24px rgba(37, 211, 102, 0.45)',
          transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
          position: 'relative'
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.08)')}
        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
      >
        {/* Glowing pulse ring */}
        <span
          className="pulse-circle"
          style={{
            position: 'absolute',
            inset: '-4px',
            borderRadius: '50%',
            border: '2px solid var(--color-whatsapp)',
            pointerEvents: 'none'
          }}
        />
        <MessageSquare size={30} color="#ffffff" />
      </button>
    </div>
  );
}
