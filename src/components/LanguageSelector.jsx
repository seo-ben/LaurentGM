import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check, Globe } from 'lucide-react';
import { useLanguage, AVAILABLE_LANGUAGES } from '../i18n/LanguageContext';

export function LanguageSelector({ variant = 'header' }) {
  const { lang, setLang } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  const currentLang = AVAILABLE_LANGUAGES.find((l) => l.code === lang) || AVAILABLE_LANGUAGES[0];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (code) => {
    setLang(code);
    setIsOpen(false);
  };

  // Version mobile tiroir : boutons segmentés horizontaux
  if (variant === 'mobile-drawer') {
    return (
      <div style={{ marginTop: '16px', padding: '12px 14px', backgroundColor: '#f8fafc', borderRadius: '14px', border: '1px solid rgba(15, 23, 42, 0.08)' }}>
        <div style={{ fontSize: '0.74rem', fontWeight: '700', textTransform: 'uppercase', color: '#64748b', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Globe size={13} color="#0d9488" />
          <span>Langue / Language / Idioma</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px' }}>
          {AVAILABLE_LANGUAGES.map((l) => {
            const isSelected = l.code === lang;
            return (
              <button
                key={l.code}
                type="button"
                onClick={() => handleSelect(l.code)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  padding: '9px 6px',
                  borderRadius: '10px',
                  border: isSelected ? '1.5px solid #0d9488' : '1px solid #cbd5e1',
                  backgroundColor: isSelected ? '#ffffff' : 'transparent',
                  color: isSelected ? '#0f172a' : '#475569',
                  fontWeight: isSelected ? '800' : '600',
                  fontSize: '0.82rem',
                  cursor: 'pointer',
                  boxShadow: isSelected ? '0 2px 8px rgba(13, 148, 136, 0.15)' : 'none',
                  transition: 'all 0.15s ease'
                }}
              >
                <span style={{ fontSize: '1.05rem', lineHeight: 1 }}>{l.flag}</span>
                <span>{l.short}</span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // Version Footer
  if (variant === 'footer') {
    return (
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', backgroundColor: 'rgba(255, 255, 255, 0.05)', padding: '4px', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
        {AVAILABLE_LANGUAGES.map((l) => {
          const isSelected = l.code === lang;
          return (
            <button
              key={l.code}
              type="button"
              onClick={() => handleSelect(l.code)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                padding: '4px 10px',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: isSelected ? 'rgba(13, 148, 136, 0.35)' : 'transparent',
                color: isSelected ? '#5eead4' : '#94a3b8',
                fontWeight: isSelected ? '800' : '500',
                fontSize: '0.78rem',
                cursor: 'pointer',
                transition: 'all 0.15s'
              }}
            >
              <span>{l.flag}</span>
              <span>{l.short}</span>
            </button>
          );
        })}
      </div>
    );
  }

  // Version Header Desktop Standard
  return (
    <div ref={containerRef} style={{ position: 'relative', display: 'inline-block' }}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Changer de langue"
        aria-expanded={isOpen}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          padding: '7px 11px',
          borderRadius: '9999px',
          border: '1px solid rgba(15, 23, 42, 0.12)',
          backgroundColor: isOpen ? '#ffffff' : 'rgba(15, 23, 42, 0.04)',
          color: '#0f172a',
          fontSize: '0.82rem',
          fontWeight: '700',
          cursor: 'pointer',
          boxShadow: isOpen ? '0 4px 12px rgba(15, 23, 42, 0.08)' : 'none',
          transition: 'all 0.18s ease'
        }}
        onMouseEnter={(e) => {
          if (!isOpen) e.currentTarget.style.backgroundColor = 'rgba(15, 23, 42, 0.08)';
        }}
        onMouseLeave={(e) => {
          if (!isOpen) e.currentTarget.style.backgroundColor = 'rgba(15, 23, 42, 0.04)';
        }}
      >
        <span style={{ fontSize: '1rem', lineHeight: 1 }}>{currentLang.flag}</span>
        <span style={{ letterSpacing: '0.02em' }}>{currentLang.short}</span>
        <ChevronDown size={14} style={{ color: '#64748b', transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
      </button>

      {/* Menu déroulant */}
      {isOpen && (
        <div
          style={{
            position: 'absolute',
            top: 'calc(100% + 8px)',
            right: 0,
            width: '180px',
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            boxShadow: '0 15px 35px -8px rgba(15, 23, 42, 0.22), 0 0 0 1px rgba(15, 23, 42, 0.08)',
            padding: '6px',
            zIndex: 1000,
            display: 'flex',
            flexDirection: 'column',
            gap: '2px',
            animation: 'fadeIn 0.15s ease'
          }}
        >
          {AVAILABLE_LANGUAGES.map((l) => {
            const isSelected = l.code === lang;
            return (
              <button
                key={l.code}
                type="button"
                onClick={() => handleSelect(l.code)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '9px 12px',
                  borderRadius: '10px',
                  border: 'none',
                  backgroundColor: isSelected ? 'rgba(13, 148, 136, 0.08)' : 'transparent',
                  color: isSelected ? '#0d9488' : '#1e293b',
                  fontSize: '0.84rem',
                  fontWeight: isSelected ? '800' : '500',
                  cursor: 'pointer',
                  textAlign: 'left',
                  width: '100%',
                  transition: 'background-color 0.15s'
                }}
                onMouseEnter={(e) => {
                  if (!isSelected) e.currentTarget.style.backgroundColor = '#f8fafc';
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) e.currentTarget.style.backgroundColor = isSelected ? 'rgba(13, 148, 136, 0.08)' : 'transparent';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
                  <span style={{ fontSize: '1.1rem', lineHeight: 1 }}>{l.flag}</span>
                  <span>{l.label}</span>
                </div>
                {isSelected && <Check size={15} color="#0d9488" strokeWidth={2.5} />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
