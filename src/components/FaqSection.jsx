import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, MessageSquare } from 'lucide-react';
import { FAQ_ITEMS } from '../data/content';

export function FaqSection({ onOpenBooking }) {
  const [openIdx, setOpenIdx] = useState(0);

  const toggle = (idx) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" style={{ padding: '90px 0', position: 'relative' }}>
      <div className="container">
        <div className="section-center reveal-on-scroll">
          <h2 className="section-title">
            Questions Fréquentes sur Nos Interventions
          </h2>
          <p className="section-subtitle">
            Toutes les réponses pour aborder votre collaboration avec Laurent Manouaba en toute sérénité.
          </p>
        </div>

        <div style={{ maxWidth: '820px', margin: '0 auto 40px' }}>
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={item.q}
                className="reveal-on-scroll"
                style={{
                  marginBottom: '14px',
                  backgroundColor: '#ffffff',
                  borderRadius: 'var(--radius-lg)',
                  border: isOpen ? '1px solid var(--color-brand-primary)' : '1px solid var(--border-subtle)',
                  boxShadow: isOpen ? 'var(--shadow-md)' : 'var(--shadow-sm)',
                  overflow: 'hidden',
                  transition: 'all 0.2s ease'
                }}
              >
                <button
                  onClick={() => toggle(idx)}
                  style={{
                    width: '100%',
                    padding: '20px 24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '16px',
                    textAlign: 'left',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.05rem',
                    fontWeight: '700',
                    color: isOpen ? 'var(--color-brand-primary)' : 'var(--text-primary)'
                  }}
                >
                  <span>{item.q}</span>
                  {isOpen ? <ChevronUp size={20} color="var(--color-brand-primary)" /> : <ChevronDown size={20} color="var(--text-muted)" />}
                </button>

                {isOpen && (
                  <div
                    style={{
                      padding: '0 24px 22px',
                      fontSize: '0.94rem',
                      color: 'var(--text-secondary)',
                      lineHeight: 1.7,
                      borderTop: '1px solid #f1f5f9'
                    }}
                  >
                    <p style={{ marginTop: '14px' }}>{item.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* WhatsApp Help CTA */}
        <div
          className="reveal-on-scroll"
          style={{
            maxWidth: '680px',
            margin: '0 auto',
            textAlign: 'center',
            padding: '24px',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-subtle)'
          }}
        >
          <p style={{ fontSize: '0.94rem', color: 'var(--text-secondary)', marginBottom: '14px' }}>
            Vous avez une question spécifique sur votre cas d'usage ou vos systèmes informatiques ?
          </p>
          <button
            onClick={() => onOpenBooking('Question spécifique')}
            className="btn btn-whatsapp btn-sm"
          >
            <MessageSquare size={16} />
            <span>Poser ma question directement à Laurent Manouaba</span>
          </button>
        </div>
      </div>
    </section>
  );
}
