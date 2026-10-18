import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, MessageSquare, ZoomIn } from 'lucide-react';

export function RealisationModal({
  item,
  items = [],
  isOpen,
  onClose,
  onSelectNext,
  onSelectPrev,
  onOpenBooking
}) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && onSelectNext) onSelectNext();
      if (e.key === 'ArrowLeft' && onSelectPrev) onSelectPrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, onClose, onSelectNext, onSelectPrev]);

  if (!isOpen || !item) return null;

  const currentIndex = items.findIndex((i) => i.id === item.id || i.image === item.image);
  const totalCount = items.length;

  return (
    <div
      role="dialog"
      aria-modal="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        backgroundColor: 'rgba(15, 23, 42, 0.92)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        animation: 'fadeIn 0.2s ease-out'
      }}
      onClick={onClose}
    >
      {/* Top Bar with counter & controls */}
      <div
        style={{
          width: '100%',
          maxWidth: '1100px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '14px',
          color: '#ffffff'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span
            style={{
              fontSize: '0.85rem',
              fontWeight: '700',
              color: '#94a3b8',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              padding: '4px 12px',
              borderRadius: '9999px',
              backdropFilter: 'blur(8px)'
            }}
          >
            {currentIndex >= 0 ? `${currentIndex + 1} / ${totalCount}` : 'Photo'}
          </span>
          {item.title && (
            <span style={{ fontSize: '0.92rem', fontWeight: '600', color: '#f8fafc' }}>
              {item.title}
            </span>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {totalCount > 1 && (
            <>
              <button
                type="button"
                onClick={onSelectPrev}
                aria-label="Photo précédente"
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.25)')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)')}
              >
                <ChevronLeft size={20} />
              </button>

              <button
                type="button"
                onClick={onSelectNext}
                aria-label="Photo suivante"
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.25)')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)')}
              >
                <ChevronRight size={20} />
              </button>
            </>
          )}

          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer"
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              backgroundColor: '#ef4444',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
              marginLeft: '6px'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#dc2626')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#ef4444')}
          >
            <X size={20} />
          </button>
        </div>
      </div>

      {/* Main Image Frame */}
      <div
        style={{
          position: 'relative',
          maxWidth: '1100px',
          maxHeight: '78vh',
          borderRadius: '20px',
          overflow: 'hidden',
          boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255, 255, 255, 0.15)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0a0f1d'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={item.image}
          alt={item.title || 'Photo de réalisation'}
          style={{
            maxWidth: '100%',
            maxHeight: '78vh',
            objectFit: 'contain',
            display: 'block'
          }}
        />
      </div>

      {/* Bottom CTA bar */}
      <div
        style={{
          marginTop: '16px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={() => {
            onClose();
            if (onOpenBooking) {
              onOpenBooking({
                subject: `Projet Réalisations : ${item.title || 'Devis Travaux & Ingénierie'}`
              });
            }
          }}
          className="btn btn-whatsapp"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 22px',
            fontSize: '0.9rem',
            fontWeight: '700',
            borderRadius: '9999px',
            boxShadow: '0 4px 16px rgba(37, 211, 102, 0.35)'
          }}
        >
          <MessageSquare size={17} />
          <span>Échanger avec Laurent sur ce projet</span>
        </button>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
