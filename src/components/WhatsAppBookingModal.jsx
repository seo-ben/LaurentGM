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
  ChevronUp
} from 'lucide-react';
import { CONTACT_INFO } from '../data/content';

export function WhatsAppBookingModal({
  isOpen,
  onClose,
  initialSubject = '',
  bookingData = null
}) {
  const dialogRef = useRef(null);

  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [subject, setSubject] = useState('Audit Découverte Offert (30 min)');
  const [slot, setSlot] = useState('Cette semaine - Après-midi (14h-18h GMT)');
  const [note, setNote] = useState('');
  const [showOptionalFields, setShowOptionalFields] = useState(false);
  const [isSent, setIsSent] = useState(false);

  // Sync state whenever modal opens or bookingData changes
  useEffect(() => {
    if (bookingData?.planName) {
      setSubject(`${bookingData.planName} (${bookingData.planPrice} / ${bookingData.planPeriod})`);
      setNote(bookingData.whatsappPayload || '');
    } else if (initialSubject) {
      setSubject(initialSubject);
      setNote('');
    } else {
      setSubject('Audit Découverte Offert (30 min)');
      setNote('');
    }
  }, [bookingData, initialSubject, isOpen]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      if (!dialog.open) {
        dialog.showModal();
        setIsSent(false);
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
    // If it is a prefilled plan
    if (bookingData?.planName) {
      // If user kept the default or edited note
      const basePayload = note || bookingData.whatsappPayload || `Bonjour Laurent, je souhaite souscrire à la formule '${bookingData.planName} (${bookingData.planPrice} / ${bookingData.planPeriod})'.`;
      
      const optionalDetails = [];
      if (name) optionalDetails.push(`👤 *Demandeur :* ${name}`);
      if (company) optionalDetails.push(`🏢 *Structure :* ${company}`);
      if (slot && slot !== 'Créneau flexible selon disponibilités de Laurent') {
        optionalDetails.push(`⏰ *Créneau préféré :* ${slot}`);
      }

      if (optionalDetails.length > 0) {
        return `${basePayload}\n\n${optionalDetails.join('\n')}\n\n_Envoyé via laurentmanouaba.pro_`;
      }
      return `${basePayload}\n\n_Envoyé via laurentmanouaba.pro_`;
    }

    // Standard booking form message
    const lines = [
      `Bonjour Laurent Manouaba,`,
      ``,
      `Je souhaite planifier un rendez-vous / une intervention :`,
      `📌 *Objet :* ${subject || 'Audit Découverte'}`,
      name ? `👤 *Nom :* ${name}` : null,
      company ? `🏢 *Structure / Projet :* ${company}` : null,
      `⏰ *Créneau souhaité :* ${slot}`,
      note ? `📝 *Détails / Contexte :* ${note}` : null,
      ``,
      `_Envoyé via la plateforme laurentmanouaba.pro_`
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

  const isPlanBooking = Boolean(bookingData?.planName);

  const allSubjects = [
    'Audit Découverte Offert (30 min)',
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
                {isPlanBooking ? 'Réservation de la Formule' : 'Prendre Rendez-vous'}
              </h3>
              <p style={{ fontSize: '0.82rem', color: '#94a3b8', marginTop: '3px', margin: 0 }}>
                {isPlanBooking
                  ? 'Message pré-rempli pour Laurent Manouaba • Lancement direct'
                  : 'Audit confidentiel offert (30 min) sous 24h'}
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
          {isSent ? (
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
                Votre demande est transmise !
              </h4>
              <p style={{ fontSize: '0.92rem', color: '#475569', marginBottom: '24px', lineHeight: 1.6 }}>
                Votre message a été transmis directement au cabinet.
                Laurent Manouaba vous répondra personnellement sous quelques heures.
              </p>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                <button onClick={handleClose} className="btn btn-outline btn-sm">
                  Fermer la fenêtre
                </button>
                <button
                  onClick={handleLaunchWhatsApp}
                  className="btn btn-whatsapp btn-sm"
                >
                  <MessageSquare size={16} />
                  <span>Réouvrir la messagerie</span>
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
                    Formule Sélectionnée
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
                  Message pré-rempli pour Laurent Manouaba :
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
                <span>Envoyer directement ma demande</span>
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
                <span>Discussion directe avec Laurent Manouaba (+228 90 44 55 71)</span>
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
                  <span>{showOptionalFields ? 'Masquer les coordonnées' : 'Préciser mon nom ou créneau (optionnel)'}</span>
                  {showOptionalFields ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>

                {showOptionalFields && (
                  <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', marginBottom: '4px', color: '#0f172a' }}>
                          Votre Nom & Prénom
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
                          Entreprise / Projet
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
                        Créneau souhaité pour le point de cadrage
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
                        <option value="Dès demain - Matinée (9h - 12h GMT)">Dès demain — Matinée (9h - 12h GMT)</option>
                        <option value="Cette semaine - Après-midi (14h - 18h GMT)">Cette semaine — Après-midi (14h - 18h GMT)</option>
                        <option value="Cette semaine - En soirée (18h - 20h GMT)">Cette semaine — En soirée (18h - 20h GMT)</option>
                        <option value="Créneau flexible selon disponibilités de Laurent">Créneau flexible selon disponibilités de Laurent</option>
                      </select>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* ============================================================
               VUE STANDARD : DEMANDE DE RENDEZ-VOUS / AUDIT DÉCOUVERTE
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
                    Objet de la consultation
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
                      Votre Nom & Prénom
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
                      Entreprise / Organisation (facultatif)
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
                    Créneau idéal pour l'échange (GMT)
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
                    <option value="Dès demain - Matinée (9h - 12h GMT)">Dès demain — Matinée (9h - 12h GMT)</option>
                    <option value="Cette semaine - Après-midi (14h - 18h GMT)">Cette semaine — Après-midi (14h - 18h GMT)</option>
                    <option value="Cette semaine - En soirée (18h - 20h GMT)">Cette semaine — En soirée (18h - 20h GMT)</option>
                    <option value="Créneau flexible selon disponibilités de Laurent">Créneau flexible selon disponibilités de Laurent</option>
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
                    Votre projet en 2 mots (facultatif)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Ex: Nous souhaitons automatiser le traitement de nos devis avec une IA locale..."
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

                {/* Action button */}
                <button
                  type="submit"
                  className="btn btn-whatsapp btn-block btn-lg"
                  style={{ marginTop: '8px' }}
                >
                  <MessageSquare size={20} />
                  <span>Confirmer & Envoyer ma demande</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </dialog>
  );
}
