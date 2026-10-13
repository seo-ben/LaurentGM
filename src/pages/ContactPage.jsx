import React, { useState } from 'react';
import { Phone, Mail, MapPin, Calendar, MessageSquare, ExternalLink, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { CONTACT_INFO } from '../data/content';
import { LinkedinIcon, FacebookIcon, TwitterXIcon, WhatsappIcon } from '../components/SocialIcons';

export function ContactPage() {
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('Audit Découverte Initial Offert (30 min)');
  const [slot, setSlot] = useState('Cette semaine - Après-midi (14h-18h GMT)');
  const [note, setNote] = useState('');
  const [rgpdConsent, setRgpdConsent] = useState(true);

  const buildWhatsAppMessage = () => {
    const lines = [
      `Bonjour Laurent Manouaba,`,
      ``,
      `Je souhaite prendre rendez-vous avec votre cabinet :`,
      `*Sujet :* ${subject}`,
      `*Nom :* ${name || '[Non précisé]'}`,
      company ? `*Entreprise :* ${company}` : null,
      phone ? `*Téléphone / Contact :* ${phone}` : null,
      `*Créneau souhaité :* ${slot}`,
      note ? `*Message / Projet :* ${note}` : null,
      ``,
      `_Envoyé depuis la page contact de laurentmanouaba.pro_`
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

  return (
    <div>
      {/* Page Header (NO LABELS ABOVE TITLE) */}
      <div className="page-header">
        <div className="container">
          <h1 className="page-title">
            Prendre Rendez-vous & Contacter le Cabinet
          </h1>
          <p className="page-description">
            Le premier appel découverte (30 min) est totalement gratuit.
            Remplissez les informations ci-dessous pour transmettre votre demande directement à Laurent Manouaba.
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
              Formulaire de Prise de Rendez-vous
            </h2>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '24px', textAlign: 'center' }}>
              Vos informations sont préparées pour un envoi direct et instantané à Laurent Manouaba.
            </p>

            <form onSubmit={handleSendWhatsApp}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: '700', marginBottom: '6px' }}>
                    Objet du Rendez-vous ou Formule souhaitée *
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
                    <option value="Audit Découverte Initial Offert (30 min)">Audit Découverte Initial Offert (30 min - Gratuit)</option>
                    <option value="Suivi Moral PME (600 $/an) — Formule Recommandée">Suivi Moral PME (600 $/an) — Recommandé</option>
                    <option value="Suivi Moral Petite Entreprise (200 $/an)">Suivi Moral Petite Entreprise (200 $/an)</option>
                    <option value="Suivi Physique Individu (100 $/an)">Suivi Physique Individu (100 $/an)</option>
                    <option value="Consultance Business (490 $)">Consultance Business (490 $)</option>
                    <option value="Consultance Basic (90 $)">Consultance Basic (90 $)</option>
                    <option value="Consultance Premium (2 000 $)">Consultance Premium (2 000 $)</option>
                    <option value="Question générale / Projet sur-mesure">Question générale / Projet sur-mesure</option>
                  </select>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: '700', marginBottom: '6px' }}>
                      Votre Nom & Prénom *
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
                      Entreprise / Structure (facultatif)
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: Société Générale de Commerce"
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
                      Numéro de téléphone avec indicatif pays
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
                      Créneau préféré (GMT)
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
                      <option value="Dès demain - Matinée (9h-12h GMT)">Dès demain — Matinée (9h-12h GMT)</option>
                      <option value="Cette semaine - Après-midi (14h-18h GMT)">Cette semaine — Après-midi (14h-18h GMT)</option>
                      <option value="En soirée (18h-20h GMT)">En soirée (18h-20h GMT)</option>
                      <option value="Créneau flexible">Créneau flexible</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: '700', marginBottom: '6px' }}>
                    Description de votre besoin / Projet
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Précisez brièvement vos objectifs, contraintes techniques ou questions..."
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
                    J'accepte que mes coordonnées soient utilisées exclusivement pour convenir de ce rendez-vous (conformité RGPD).
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
                  <strong style={{ color: 'var(--text-primary)' }}>Aperçu en direct du message prêt à être envoyé :</strong>
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

                <button
                  type="submit"
                  className="btn btn-whatsapp btn-lg btn-block"
                >
                  <MessageSquare size={20} />
                  <span>Envoyer ma demande de rendez-vous (+228 90 44 55 71)</span>
                </button>
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
                Coordonnées Officielles
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', fontSize: '0.92rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                  <MapPin size={22} color="var(--color-brand-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ color: 'var(--text-primary)', display: 'block' }}>Adresse Physique :</strong>
                    <span style={{ color: 'var(--text-secondary)' }}>{CONTACT_INFO.address}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                  <Phone size={22} color="var(--color-brand-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ color: 'var(--text-primary)', display: 'block' }}>Lignes Téléphoniques :</strong>
                    <span style={{ color: 'var(--text-secondary)' }}>{CONTACT_INFO.phoneDisplay}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                  <Mail size={22} color="var(--color-brand-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ color: 'var(--text-primary)', display: 'block' }}>Courriel Électronique :</strong>
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
                Profils & Réseaux Sociaux
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
    </div>
  );
}
