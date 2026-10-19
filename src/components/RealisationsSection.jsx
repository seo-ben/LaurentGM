import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Maximize2 } from 'lucide-react';
import { getStoredRealisations } from '../utils/slidesStorage';
import { RealisationModal } from './RealisationModal';

export function RealisationsSection({ onNavigate, onOpenBooking }) {
  const [items, setItems] = useState(() => getStoredRealisations());
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  // Écoute les modifications de la galerie depuis l'Espace Admin
  useEffect(() => {
    const handleUpdate = () => {
      setItems(getStoredRealisations());
    };
    window.addEventListener('lgm_realisations_updated', handleUpdate);
    return () => window.removeEventListener('lgm_realisations_updated', handleUpdate);
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsVisible(true);
      return;
    }

    // Check if initially in view
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.85 && rect.bottom > 0) {
      setIsVisible(true);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else if (entry.boundingClientRect.top > (window.innerHeight || document.documentElement.clientHeight)) {
          // If user scrolls back up above this section, reset so coming down triggers it again smoothly
          setIsVisible(false);
        }
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px -30px 0px'
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleOpenImage = (item) => {
    setSelectedItem(item);
    setModalOpen(true);
  };

  const handleNextItem = () => {
    if (!selectedItem || !items.length) return;
    const currentIndex = items.findIndex((i) => i.id === selectedItem.id);
    const nextIndex = (currentIndex + 1) % items.length;
    setSelectedItem(items[nextIndex]);
  };

  const handlePrevItem = () => {
    if (!selectedItem || !items.length) return;
    const currentIndex = items.findIndex((i) => i.id === selectedItem.id);
    const prevIndex = (currentIndex - 1 + items.length) % items.length;
    setSelectedItem(items[prevIndex]);
  };

  // Find images by id or fallback to item index
  const img1 = items.find((r) => r.id === 'realisation-1') || items[0] || {};
  const img2 = items.find((r) => r.id === 'realisation-2') || items[1] || items[0] || {};
  const img3 = items.find((r) => r.id === 'realisation-3') || items[2] || items[0] || {};
  const img4 = items.find((r) => r.id === 'realisation-4') || items[3] || items[0] || {};
  const img5 = items.find((r) => r.id === 'realisation-5') || items[4] || items[0] || {};
  const img6 = items.find((r) => r.id === 'realisation-6') || items[5] || items[0] || {};
  const img7 = items.find((r) => r.id === 'realisation-7') || items[6] || items[0] || {};
  const img8 = items.find((r) => r.id === 'realisation-8') || items[7] || items[0] || {};

  return (
    <section
      ref={sectionRef}
      id="realisations-section"
      className="realisations-section-wrapper"
      style={{
        padding: '75px 0 90px',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div className="container" style={{ maxWidth: '1240px' }}>
        {/* Section Header (Pure direct title without labels above, fluid entrance) */}
        <div
          className={`realisations-header-block ${isVisible ? 'is-in-view' : ''}`}
          style={{
            maxWidth: '780px',
            margin: '0 auto 48px',
            textAlign: 'center'
          }}
        >
          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2rem, 3.4vw, 2.7rem)',
              fontWeight: '800',
              color: 'var(--text-primary)',
              letterSpacing: '-0.025em',
              marginBottom: '16px'
            }}
          >
            Galerie & Réalisations sur le Terrain
          </h2>
          <p
            style={{
              fontSize: '1.05rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.65,
              maxWidth: '680px',
              margin: '0 auto'
            }}
          >
            Découvrez en photographies nos interventions de conseil, ateliers exécutifs d'IA, audits stratégiques et projets R&D sur le terrain.
          </p>
        </div>

        {/* Master Mosaic Gallery (Pure Images, No Text, Fluid Left/Right Emergence) */}
        <div
          className={`realisations-mosaic-container ${isVisible ? 'is-in-view' : ''}`}
        >
          {/* Left & Center Main Block */}
          <div className="mosaic-left-block">
            {/* Top Row: 2 images */}
            <div className="mosaic-top-row">
              <div
                className="mosaic-tile tile-img1"
                onClick={() => handleOpenImage(img1)}
              >
                <img src={img1.image} alt={img1.title} loading="lazy" />
                <div className="mosaic-hover-overlay">
                  <div className="mosaic-zoom-btn">
                    <Maximize2 size={16} />
                  </div>
                </div>
              </div>

              <div
                className="mosaic-tile tile-img2"
                onClick={() => handleOpenImage(img2)}
              >
                <img src={img2.image} alt={img2.title} loading="lazy" />
                <div className="mosaic-hover-overlay">
                  <div className="mosaic-zoom-btn">
                    <Maximize2 size={16} />
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Row: 3 columns */}
            <div className="mosaic-bottom-row">
              {/* Col A (Left portrait room: img4) */}
              <div
                className="mosaic-tile tile-col-left"
                onClick={() => handleOpenImage(img4)}
              >
                <img src={img4.image} alt={img4.title} loading="lazy" />
                <div className="mosaic-hover-overlay">
                  <div className="mosaic-zoom-btn">
                    <Maximize2 size={16} />
                  </div>
                </div>
              </div>

              {/* Col B (Center: img5 on top, img6 & img7 on bottom) */}
              <div className="mosaic-col-center">
                <div
                  className="mosaic-tile tile-center-top"
                  onClick={() => handleOpenImage(img5)}
                >
                  <img src={img5.image} alt={img5.title} loading="lazy" />
                  <div className="mosaic-hover-overlay">
                    <div className="mosaic-zoom-btn">
                      <Maximize2 size={16} />
                    </div>
                  </div>
                </div>

                <div className="mosaic-center-split">
                  <div
                    className="mosaic-tile tile-split-left"
                    onClick={() => handleOpenImage(img6)}
                  >
                    <img src={img6.image} alt={img6.title} loading="lazy" />
                    <div className="mosaic-hover-overlay">
                      <div className="mosaic-zoom-btn">
                        <Maximize2 size={14} />
                      </div>
                    </div>
                  </div>

                  <div
                    className="mosaic-tile tile-split-right"
                    onClick={() => handleOpenImage(img7)}
                  >
                    <img src={img7.image} alt={img7.title} loading="lazy" />
                    <div className="mosaic-hover-overlay">
                      <div className="mosaic-zoom-btn">
                        <Maximize2 size={14} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Col C (Right portrait room: img8) */}
              <div
                className="mosaic-tile tile-col-right"
                onClick={() => handleOpenImage(img8)}
              >
                <img src={img8.image} alt={img8.title} loading="lazy" />
                <div className="mosaic-hover-overlay">
                  <div className="mosaic-zoom-btn">
                    <Maximize2 size={16} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Tall vertical image (Worker on ceiling: img3) */}
          <div
            className="mosaic-tile mosaic-tall-column"
            onClick={() => handleOpenImage(img3)}
          >
            <img src={img3.image} alt={img3.title} loading="lazy" />
            <div className="mosaic-hover-overlay">
              <div className="mosaic-zoom-btn">
                <Maximize2 size={18} />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Navigation CTA */}
        {onNavigate && (
          <div
            className="reveal-on-scroll"
            style={{
              textAlign: 'center',
              marginTop: '44px'
            }}
          >
            <button
              type="button"
              onClick={() => {
                onNavigate('realisations');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="btn btn-secondary btn-lg"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '12px 28px',
                fontSize: '0.92rem',
                fontWeight: '700',
                borderRadius: '9999px',
                backgroundColor: '#ffffff',
                border: '1px solid rgba(15, 23, 42, 0.12)',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              <span>Consulter toutes nos réalisations & détails</span>
              <ArrowRight size={17} />
            </button>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      <RealisationModal
        item={selectedItem}
        items={items}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSelectNext={handleNextItem}
        onSelectPrev={handlePrevItem}
        onOpenBooking={onOpenBooking}
      />

      <style>{`
        /* Master Mosaic Grid Styles */
        .realisations-mosaic-container {
          display: flex;
          gap: 16px;
          width: 100%;
          align-items: stretch;
        }

        .mosaic-left-block {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 16px;
          min-width: 0;
        }

        .mosaic-top-row {
          display: flex;
          gap: 16px;
          height: 220px;
        }

        .tile-img1 {
          flex: 1.15;
          min-width: 0;
        }

        .tile-img2 {
          flex: 1;
          min-width: 0;
        }

        .mosaic-bottom-row {
          display: flex;
          gap: 16px;
          height: 330px;
        }

        .tile-col-left {
          flex: 0.85;
          min-width: 0;
        }

        .mosaic-col-center {
          flex: 2.3;
          display: flex;
          flex-direction: column;
          gap: 14px;
          min-width: 0;
        }

        .tile-center-top {
          flex: 1.8;
          min-width: 0;
        }

        .mosaic-center-split {
          flex: 1;
          display: flex;
          gap: 14px;
          min-width: 0;
        }

        .tile-split-left {
          flex: 1;
          min-width: 0;
        }

        .tile-split-right {
          flex: 1.45;
          min-width: 0;
        }

        .tile-col-right {
          flex: 1.4;
          min-width: 0;
        }

        .mosaic-tall-column {
          width: 220px;
          flex-shrink: 0;
          min-width: 0;
        }

        /* Section Header Animation */
        .realisations-header-block {
          opacity: 0;
          transform: translateY(28px);
          filter: blur(6px);
          transition: opacity 0.85s cubic-bezier(0.16, 1, 0.3, 1),
                      transform 0.85s cubic-bezier(0.16, 1, 0.3, 1),
                      filter 0.85s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .realisations-header-block.is-in-view {
          opacity: 1;
          transform: translateY(0);
          filter: blur(0px);
        }

        /* Generic Mosaic Tile (Initial Hidden State: Coming from nowhere / lateral emergence) */
        .mosaic-tile {
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          background-color: #0f172a;
          box-shadow: 0 4px 18px rgba(15, 23, 42, 0.08);
          border: 1px solid rgba(15, 23, 42, 0.08);
          cursor: pointer;
          opacity: 0;
          will-change: transform, opacity, filter;
          transition: transform 1.15s cubic-bezier(0.16, 1, 0.3, 1),
                      opacity 1.1s cubic-bezier(0.16, 1, 0.3, 1),
                      filter 1.1s cubic-bezier(0.16, 1, 0.3, 1),
                      box-shadow 0.25s ease,
                      border-color 0.25s ease;
        }

        /* Coming from nowhere: Distinct lateral initial offsets (Left, Right, and Center Depth) */
        /* Top Row Left -> Emerge from deep Left */
        .tile-img1 {
          transform: translate3d(-180px, -20px, 0) scale(0.82) rotate(-3deg);
          filter: blur(14px);
        }

        /* Top Row Right -> Emerge from deep Right */
        .tile-img2 {
          transform: translate3d(180px, -20px, 0) scale(0.82) rotate(3deg);
          filter: blur(14px);
        }

        /* Tall Column Far Right -> Emerge from far Right */
        .mosaic-tall-column {
          transform: translate3d(240px, 0, 0) scale(0.84) rotate(2.5deg);
          filter: blur(16px);
        }

        /* Bottom Row Left -> Emerge from deep Left */
        .tile-col-left {
          transform: translate3d(-200px, 20px, 0) scale(0.82) rotate(-2.5deg);
          filter: blur(14px);
        }

        /* Center Top -> Emerge upwards from nowhere / depth */
        .tile-center-top {
          transform: translate3d(0, 110px, 0) scale(0.78);
          filter: blur(16px);
        }

        /* Center Split Left -> Emerge from Left-Center */
        .tile-split-left {
          transform: translate3d(-130px, 60px, 0) scale(0.8) rotate(-2deg);
          filter: blur(12px);
        }

        /* Center Split Right -> Emerge from Right-Center */
        .tile-split-right {
          transform: translate3d(130px, 60px, 0) scale(0.8) rotate(2deg);
          filter: blur(12px);
        }

        /* Bottom Row Right -> Emerge from deep Right */
        .tile-col-right {
          transform: translate3d(190px, 20px, 0) scale(0.82) rotate(2.5deg);
          filter: blur(14px);
        }

        /* Fluid Staggered Delays when arriving in view */
        .realisations-mosaic-container.is-in-view .tile-img1 {
          transition-delay: 60ms;
        }

        .realisations-mosaic-container.is-in-view .tile-img2 {
          transition-delay: 140ms;
        }

        .realisations-mosaic-container.is-in-view .mosaic-tall-column {
          transition-delay: 220ms;
        }

        .realisations-mosaic-container.is-in-view .tile-col-left {
          transition-delay: 300ms;
        }

        .realisations-mosaic-container.is-in-view .tile-center-top {
          transition-delay: 380ms;
        }

        .realisations-mosaic-container.is-in-view .tile-split-left {
          transition-delay: 460ms;
        }

        .realisations-mosaic-container.is-in-view .tile-split-right {
          transition-delay: 540ms;
        }

        .realisations-mosaic-container.is-in-view .tile-col-right {
          transition-delay: 620ms;
        }

        /* In-View Landed State: Perfectly aligned, zero blur, full opacity */
        .realisations-mosaic-container.is-in-view .mosaic-tile {
          opacity: 1;
          transform: translate3d(0, 0, 0) scale(1) rotate(0deg);
          filter: blur(0px);
        }

        /* Hover elevation once landed */
        .realisations-mosaic-container.is-in-view .mosaic-tile:hover {
          transform: translateY(-5px) scale(1.02) rotate(0deg);
          box-shadow: 0 20px 42px rgba(15, 23, 42, 0.18);
          border-color: rgba(13, 148, 136, 0.4);
          transition-delay: 0ms !important;
          transition-duration: 0.25s !important;
          z-index: 5;
        }

        .mosaic-tile img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.4s ease;
        }

        .mosaic-tile:hover img {
          transform: scale(1.05);
        }

        .mosaic-hover-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(15, 23, 42, 0.25);
          opacity: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: opacity 0.25s ease;
          pointer-events: none;
        }

        .mosaic-tile:hover .mosaic-hover-overlay {
          opacity: 1;
        }

        .mosaic-zoom-btn {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.92);
          color: #0f172a;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.2);
          transform: scale(0.9);
          transition: transform 0.2s ease;
        }

        .mosaic-tile:hover .mosaic-zoom-btn {
          transform: scale(1);
        }

        /* Mobile & Tablet Responsiveness */
        @media (max-width: 900px) {
          .realisations-mosaic-container {
            flex-direction: column;
          }

          .mosaic-top-row {
            height: 200px;
          }

          .mosaic-bottom-row {
            height: 300px;
          }

          .mosaic-tall-column {
            width: 100%;
            height: 270px;
            transform: translate3d(80px, 0, 0) scale(0.88);
            filter: blur(12px);
          }

          .tile-img1, .tile-col-left, .tile-split-left {
            transform: translate3d(-80px, 0, 0) scale(0.88);
            filter: blur(12px);
          }

          .tile-img2, .tile-col-right, .tile-split-right {
            transform: translate3d(80px, 0, 0) scale(0.88);
            filter: blur(12px);
          }

          .tile-center-top {
            transform: translate3d(0, 60px, 0) scale(0.85);
            filter: blur(12px);
          }
        }

        @media (max-width: 640px) {
          .mosaic-top-row {
            flex-direction: column;
            height: auto;
          }

          .tile-img1, .tile-img2 {
            height: 190px;
          }

          .mosaic-bottom-row {
            flex-direction: column;
            height: auto;
          }

          .tile-col-left {
            height: 200px;
          }

          .tile-center-top {
            height: 180px;
          }

          .mosaic-center-split {
            height: 140px;
          }

          .tile-col-right {
            height: 200px;
          }

          .mosaic-tall-column {
            height: 260px;
          }

          .tile-img1, .tile-col-left, .tile-split-left {
            transform: translate3d(-50px, 0, 0) scale(0.9);
            filter: blur(8px);
          }

          .tile-img2, .tile-col-right, .tile-split-right, .mosaic-tall-column {
            transform: translate3d(50px, 0, 0) scale(0.9);
            filter: blur(8px);
          }
        }
      `}</style>
    </section>
  );
}
