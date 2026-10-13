import React, { useState, useEffect } from 'react';
import { ArrowUpRight, ArrowRight, Calendar, CheckCircle2 } from 'lucide-react';

export function Hero({ onNavigate, onOpenBooking }) {
  // Photos de Laurent Manouaba en slider
  const slides = [
    {
      id: 'suit',
      label: 'Vision Dirigeant',
      role: 'Consultant en Technologies & Stratégie',
      image: '/assets/avatar-suit.png',
      alt: 'Laurent G-M Manouaba - Consultant en Innovations Technologiques',
      objectPosition: 'center 15%'
    },
    {
      id: 'workshop',
      label: 'Ateliers & R&D',
      role: 'R&D & Transfert Opérationnel',
      image: '/assets/workshop-meeting.jpg',
      alt: 'Session d\'atelier collaboratif et R&D Laurent Manouaba',
      objectPosition: 'center center'
    },
    {
      id: 'desk',
      label: 'Conception & IA',
      role: 'Ingénierie IA & Modélisation Sur-Mesure',
      image: '/assets/avatar-desk.png',
      alt: 'Laurent G-M Manouaba au bureau - Modélisation & IA',
      objectPosition: 'center top'
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  // Défilement automatique fluide toutes les 4.2 secondes
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4200);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="hero-section">
      {/* =========================================================
          SUR MOBILE UNIQUEMENT : SLIDER EN ARRIÈRE-PLAN DERRIÈRE LE TEXTE
         ========================================================= */}
      <div className="hero-mobile-backdrop" aria-hidden="true">
        {slides.map((slide, index) => {
          const isActive = index === currentSlide;
          return (
            <div
              key={slide.id}
              className={`hero-mobile-slide ${isActive ? 'active' : ''}`}
            >
              <img
                src={slide.image}
                alt={slide.alt}
                style={{ objectPosition: slide.objectPosition }}
              />
            </div>
          );
        })}
        {/* Voile dégradé sombre immersif pour contraste et lisibilité totale du texte */}
        <div className="hero-mobile-overlay" />
      </div>

      {/* =========================================================
          SUR DESKTOP UNIQUEMENT : REPÈRES ARCHITECTURAUX BLUEPRINT
         ========================================================= */}
      <div
        className="blueprint-guide-top desktop-only"
        style={{
          position: 'absolute',
          top: '90px',
          left: '36px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          zIndex: 1,
          opacity: 0.65
        }}
      >
        <div style={{ width: '1.5px', height: '60px', backgroundColor: 'rgba(13, 148, 136, 0.4)' }} />
        <div
          style={{
            width: '7px',
            height: '7px',
            borderRadius: '50%',
            backgroundColor: '#0d9488',
            boxShadow: '0 0 8px rgba(13, 148, 136, 0.5)'
          }}
        />
      </div>

      <div
        className="blueprint-guide-bottom desktop-only"
        style={{
          position: 'absolute',
          bottom: '40px',
          left: '36px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          zIndex: 1,
          opacity: 0.65
        }}
      >
        <div
          style={{
            width: '7px',
            height: '7px',
            borderRadius: '50%',
            backgroundColor: '#0d9488',
            boxShadow: '0 0 8px rgba(13, 148, 136, 0.5)'
          }}
        />
        <div style={{ width: '1.5px', height: '60px', backgroundColor: 'rgba(13, 148, 136, 0.4)' }} />
      </div>

      <div className="container hero-container">
        <div className="hero-grid">
          {/* Colonne Gauche : Titre Bicolore, Pitch Stratégique & Actions */}
          <div className="hero-text-col">
            {/* STRICTEMENT SANS AUCUN LABEL AU-DESSUS DU TITRE (règle formelle) */}
            <h1 className="hero-main-title">
              Où l’<span className="hero-teal-accent">Innovation</span>
              <br className="desktop-br" />
              {' '}Rencontre la <span className="hero-teal-accent">Rentabilité.</span>
            </h1>

            {/* Pitch stratégique concret sans jargon */}
            <p className="hero-pitch-text">
              Fini les rapports théoriques inapplicables. <strong>Laurent G-M Manouaba</strong> transforme vos investissements en IA, data et technologies de rupture en rentabilité opérationnelle immédiate, sans jargon ni dépenses superflues.
            </p>

            {/* Deux boutons d'action */}
            <div className="hero-cta-wrapper">
              <button
                onClick={() => onOpenBooking('Audit Stratégique Initial Offert')}
                className="hero-btn-primary"
              >
                <Calendar size={18} />
                <span>Prendre Rendez-vous</span>
              </button>

              <button
                onClick={() => {
                  onNavigate('services');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="hero-btn-secondary"
              >
                <span>Découvrir les 12 Services</span>
                <ArrowRight size={17} />
              </button>
            </div>

            {/* Points chromatiques et réassurance rapide */}
            <div className="hero-reassurance-row">
              <div className="reassurance-dots">
                <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: '#0d9488', opacity: 1 }} />
                <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: '#0d9488', opacity: 0.7 }} />
                <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: '#0d9488', opacity: 0.5 }} />
                <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: '#0d9488', opacity: 0.3 }} />
              </div>
              <div className="reassurance-text">
                <CheckCircle2 size={16} className="reassurance-check" />
                <span>Audit initial offert (30 min) • Réponse sous 24h chrono • Lomé & International</span>
              </div>
            </div>
          </div>

          {/* Colonne Droite : Composition Circulaire avec Slider dans le Rond (DESKTOP UNIQUEMENT) */}
          <div className="hero-circle-col desktop-only">
            <div className="blueprint-circle-stage">
              {/* Titres / Onglets alignés sur UNE SEULE LIGNE directement au-dessus du rond */}
              <div className="circle-tabs-row">
                {slides.map((slide, index) => {
                  const isActive = index === currentSlide;
                  return (
                    <button
                      key={slide.id}
                      type="button"
                      onClick={() => setCurrentSlide(index)}
                      className={`circle-tab-btn ${isActive ? 'active' : ''}`}
                      aria-label={`Afficher ${slide.label}`}
                    >
                      <span className="circle-tab-dot" />
                      <span>{slide.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Anneau guide circulaire extérieur */}
              <div className="outer-guide-ring" />

              {/* Cercle vert menthe néon (Haut-Droit) */}
              <div className="accent-circle-top" />

              {/* Cercle vert menthe néon (Bas-Gauche, Chevauchement) */}
              <div className="accent-circle-bottom" />

              {/* Flèche oblique & 4 points d'ancrage en bas à droite */}
              <div className="blueprint-arrow-decor">
                <div style={{ color: '#0f172a', opacity: 0.85 }}>
                  <ArrowUpRight size={32} strokeWidth={2.6} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: '#0d9488', opacity: 1 }} />
                  <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: '#0d9488', opacity: 0.7 }} />
                  <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: '#0d9488', opacity: 0.5 }} />
                  <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: '#0d9488', opacity: 0.3 }} />
                </div>
              </div>

              {/* Cadre circulaire central avec Slider des photos réelles */}
              <div className="main-photo-circle">
                {slides.map((slide, index) => {
                  const isActive = index === currentSlide;
                  return (
                    <div
                      key={slide.id}
                      className={`circle-slide-img ${isActive ? 'active' : ''}`}
                    >
                      <img
                        src={slide.image}
                        alt={slide.alt}
                        style={{ objectPosition: slide.objectPosition }}
                      />
                    </div>
                  );
                })}

                {/* Voile sombre en bas du cercle pour la lisibilité du nom */}
                <div className="circle-name-overlay">
                  <div className="circle-author-name">Laurent G-M Manouaba</div>
                  <div className="circle-author-role">
                    {slides[currentSlide].role}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        /* =========================================================================
           STYLE DESKTOP (> 768px) : FOND BLANC, 2 COLONNES, ROND SLIDER À DROITE
           ========================================================================= */
        @media (min-width: 769px) {
          .hero-section {
            background-color: transparent;
            color: var(--text-primary);
            position: relative;
            overflow: hidden;
            padding-top: 120px;
            padding-bottom: 60px;
          }

          .hero-mobile-backdrop {
            display: none !important;
          }

          .desktop-only {
            display: block !important;
          }

          .hero-container {
            position: relative;
            z-index: 2;
          }

          .hero-grid {
            display: grid;
            grid-template-columns: 1.15fr 0.85fr;
            gap: 48px;
            align-items: center;
          }

          .hero-main-title {
            font-family: var(--font-heading);
            font-size: clamp(2.4rem, 4.6vw, 3.9rem);
            font-weight: 900;
            line-height: 1.14;
            color: #0f172a;
            letter-spacing: -0.035em;
            margin-bottom: 22px;
          }

          .hero-teal-accent {
            color: #0d9488;
          }

          .hero-pitch-text {
            font-size: 1.12rem;
            color: #475569;
            line-height: 1.72;
            margin-bottom: 32px;
            max-width: 560px;
          }

          .hero-cta-wrapper {
            display: flex;
            flex-wrap: wrap;
            gap: 16px;
            align-items: center;
            margin-bottom: 32px;
          }

          .hero-btn-primary {
            background-color: #00f5a0;
            color: #0a1728;
            font-weight: 800;
            font-size: 1rem;
            padding: 15px 30px;
            border-radius: 9999px;
            border: none;
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            gap: 10px;
            box-shadow: 0 4px 18px rgba(0, 245, 160, 0.4);
            transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1);
          }
          .hero-btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 26px rgba(0, 245, 160, 0.6);
            background-color: #1affad;
          }

          .hero-btn-secondary {
            background-color: #ffffff;
            color: #0f172a;
            font-weight: 700;
            font-size: 1rem;
            padding: 14px 26px;
            border-radius: 9999px;
            border: 1.5px solid rgba(15, 23, 42, 0.16);
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            gap: 10px;
            box-shadow: 0 2px 8px rgba(15, 23, 42, 0.05);
            transition: all 0.22s ease;
          }
          .hero-btn-secondary:hover {
            background-color: #f8fafc;
            border-color: #0d9488;
            color: #0d9488;
            transform: translateY(-2px);
          }

          .hero-reassurance-row {
            display: flex;
            align-items: center;
            gap: 14px;
            flex-wrap: wrap;
          }

          .reassurance-dots {
            display: flex;
            align-items: center;
            gap: 6px;
          }

          .reassurance-text {
            font-size: 0.86rem;
            color: #64748b;
            display: flex;
            align-items: center;
            gap: 7px;
          }
          .reassurance-check {
            color: #0d9488;
            flex-shrink: 0;
          }

          /* ---------------- Composition Circulaire à Droite ---------------- */
          .hero-circle-col {
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .blueprint-circle-stage {
            position: relative;
            width: 100%;
            max-width: 460px;
            height: 475px;
          }

          /* Onglets alignés sur UNE SEULE LIGNE au-dessus du rond */
          .circle-tabs-row {
            position: absolute;
            top: 0;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            white-space: nowrap;
            gap: 6px;
            background-color: #ffffff;
            padding: 5px 8px;
            border-radius: 9999px;
            border: 1px solid rgba(15, 23, 42, 0.1);
            box-shadow: 0 4px 16px rgba(15, 23, 42, 0.08);
            z-index: 10;
          }

          .circle-tab-btn {
            border: none;
            background: transparent;
            color: #64748b;
            font-weight: 600;
            font-size: 0.74rem;
            padding: 5px 12px;
            border-radius: 9999px;
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            gap: 6px;
            white-space: nowrap;
            transition: all 0.22s ease;
          }
          .circle-tab-btn:hover {
            color: #0f172a;
            background-color: rgba(15, 23, 42, 0.04);
          }
          /* Sélectionné : gris sobre / blanc sombre (et non noir brut) */
          .circle-tab-btn.active {
            background-color: #334155;
            color: #ffffff;
            font-weight: 700;
            box-shadow: 0 2px 8px rgba(51, 65, 85, 0.3);
          }
          .circle-tab-dot {
            width: 5px;
            height: 5px;
            border-radius: 50%;
            background-color: currentColor;
          }
          .circle-tab-btn.active .circle-tab-dot {
            background-color: #00f5a0;
          }

          .outer-guide-ring {
            position: absolute;
            top: 48px;
            left: 10px;
            right: 10px;
            bottom: 10px;
            border-radius: 50%;
            border: 1.5px solid rgba(13, 148, 136, 0.28);
            pointer-events: none;
          }

          .accent-circle-top {
            position: absolute;
            top: 54px;
            right: 10px;
            width: 145px;
            height: 145px;
            border-radius: 50%;
            background-color: #00f5a0;
            box-shadow: 0 10px 30px rgba(0, 245, 160, 0.35);
            z-index: 1;
          }

          .accent-circle-bottom {
            position: absolute;
            bottom: 25px;
            left: 10px;
            width: 95px;
            height: 95px;
            border-radius: 50%;
            background-color: #00f5a0;
            box-shadow: 0 8px 25px rgba(0, 245, 160, 0.35);
            z-index: 3;
          }

          .blueprint-arrow-decor {
            position: absolute;
            bottom: 12px;
            right: 15px;
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            gap: 8px;
            z-index: 4;
          }

          .main-photo-circle {
            position: absolute;
            top: 72px;
            left: 30px;
            width: 360px;
            height: 360px;
            border-radius: 50%;
            overflow: hidden;
            z-index: 2;
            border: 4px solid #ffffff;
            box-shadow: 0 20px 48px -10px rgba(15, 23, 42, 0.18);
            background-color: #f1f5f9;
          }

          .circle-slide-img {
            position: absolute;
            inset: 0;
            opacity: 0;
            transition: opacity 0.85s cubic-bezier(0.4, 0, 0.2, 1);
          }
          .circle-slide-img.active {
            opacity: 1;
          }
          .circle-slide-img img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transform: scale(1.02);
            transition: transform 5s ease-out;
          }
          .circle-slide-img.active img {
            transform: scale(1);
          }

          .circle-name-overlay {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            padding: 30px 16px 20px;
            background: linear-gradient(to top, rgba(15, 23, 42, 0.88) 0%, rgba(15, 23, 42, 0.5) 45%, rgba(15, 23, 42, 0) 100%);
            text-align: center;
            color: #ffffff;
            z-index: 5;
            pointer-events: none;
          }

          .circle-author-name {
            font-weight: 800;
            font-size: 1.05rem;
            letter-spacing: -0.01em;
            margin-bottom: 2px;
          }

          .circle-author-role {
            font-size: 0.74rem;
            color: #00f5a0;
            font-weight: 700;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }

        /* =========================================================================
           STYLE MOBILE (<= 768px) : DESIGN SPÉCIFIQUE
           TEXTE DEVANT, SLIDERS EN ARRIÈRE-PLAN DERRIÈRE LE TEXTE, ZÉRO ROND
           ========================================================================= */
        @media (max-width: 768px) {
          .hero-section {
            position: relative;
            padding-top: 100px;
            padding-bottom: 22px;
            min-height: auto;
            overflow: hidden;
            background-color: #0b1322;
          }

          .desktop-only {
            display: none !important;
          }

          .hero-mobile-backdrop {
            display: block !important;
            position: absolute;
            inset: 0;
            z-index: 1;
            pointer-events: none;
          }

          .hero-mobile-slide {
            position: absolute;
            inset: 0;
            opacity: 0;
            transition: opacity 1.1s cubic-bezier(0.4, 0, 0.2, 1);
          }
          .hero-mobile-slide.active {
            opacity: 1;
          }
          .hero-mobile-slide img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }

          .hero-mobile-overlay {
            position: absolute;
            inset: 0;
            background: linear-gradient(
              to top,
              rgba(11, 19, 34, 0.98) 0%,
              rgba(11, 19, 34, 0.88) 50%,
              rgba(11, 19, 34, 0.74) 100%
            );
          }

          .hero-container {
            position: relative;
            z-index: 5;
          }

          .hero-grid {
            display: block;
            width: 100%;
          }

          .hero-text-col {
            max-width: 100%;
            padding: 10px 0;
          }

          .hero-main-title {
            font-family: var(--font-heading);
            font-size: clamp(2rem, 8vw, 2.55rem);
            font-weight: 900;
            line-height: 1.15;
            letter-spacing: -0.03em;
            color: #ffffff;
            margin-bottom: 16px;
            text-shadow: 0 2px 14px rgba(0, 0, 0, 0.45);
          }

          .desktop-br {
            display: none;
          }

          .hero-teal-accent {
            color: #00f5a0;
            background: linear-gradient(135deg, #00f5a0 0%, #2dd4bf 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }

          .hero-pitch-text {
            font-size: 0.98rem;
            color: #cbd5e1;
            line-height: 1.62;
            margin-bottom: 24px;
          }

          .hero-cta-wrapper {
            display: flex;
            flex-direction: column;
            width: 100%;
            gap: 12px;
            margin-bottom: 22px;
          }

          .hero-btn-primary {
            width: 100%;
            justify-content: center;
            background-color: #00f5a0;
            color: #0a1728;
            font-weight: 800;
            font-size: 0.98rem;
            padding: 14px 20px;
            border-radius: 9999px;
            border: none;
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            gap: 10px;
            box-shadow: 0 6px 24px rgba(0, 245, 160, 0.45);
          }

          .hero-btn-secondary {
            width: 100%;
            justify-content: center;
            background-color: rgba(255, 255, 255, 0.08);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            color: #ffffff;
            font-weight: 700;
            font-size: 0.98rem;
            padding: 14px 20px;
            border-radius: 9999px;
            border: 1.5px solid rgba(255, 255, 255, 0.24);
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            gap: 10px;
          }

          .hero-reassurance-row {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
          }
          .reassurance-dots {
            display: none;
          }
          .reassurance-text {
            font-size: 0.84rem;
            color: #94a3b8;
            display: flex;
            align-items: center;
            gap: 8px;
          }
          .reassurance-check {
            color: #00f5a0;
            flex-shrink: 0;
          }
        }
      `}</style>
    </section>
  );
}
