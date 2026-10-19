import React, { useState, useEffect } from 'react';
import { Maximize2 } from 'lucide-react';
import { REALISATION_CATEGORIES } from '../data/content';
import { getStoredRealisations } from '../utils/slidesStorage';
import { RealisationModal } from '../components/RealisationModal';

export function RealisationsPage({ onOpenBooking }) {
  const [items, setItems] = useState(() => getStoredRealisations());
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Écoute les modifications de la galerie depuis l'Espace Admin
  useEffect(() => {
    const handleUpdate = () => {
      setItems(getStoredRealisations());
    };
    window.addEventListener('lgm_realisations_updated', handleUpdate);
    return () => window.removeEventListener('lgm_realisations_updated', handleUpdate);
  }, []);

  const filteredItems = activeCategory === 'all'
    ? items
    : items.filter((item) => item.category === activeCategory);

  // Trigger fluid emergence from left/right whenever category changes or page loads
  useEffect(() => {
    const cards = document.querySelectorAll('.gallery-photo-card');
    cards.forEach((card, idx) => {
      card.classList.remove('is-in-view');
      const delay = 40 + (idx % 6) * 90;
      setTimeout(() => {
        card.classList.add('is-in-view');
      }, delay);
    });
  }, [activeCategory]);

  const handleOpenItem = (item) => {
    setSelectedItem(item);
    setModalOpen(true);
  };

  const handleNextItem = () => {
    if (!selectedItem) return;
    const currentIndex = filteredItems.findIndex((i) => i.id === selectedItem.id);
    const nextIndex = (currentIndex + 1) % filteredItems.length;
    setSelectedItem(filteredItems[nextIndex]);
  };

  const handlePrevItem = () => {
    if (!selectedItem) return;
    const currentIndex = filteredItems.findIndex((i) => i.id === selectedItem.id);
    const prevIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
    setSelectedItem(filteredItems[prevIndex]);
  };

  return (
    <div>
      {/* Page Header (No labels above title as per site rule) */}
      <div className="page-header">
        <div className="container">
          <h1 className="page-title">
            Galerie des Réalisations sur le Terrain
          </h1>
          <p className="page-description">
            Explorez en photographies les ateliers pratiques, conférences, audits d'architecture et projets R&D dirigés par Laurent G-M Manouaba.
          </p>
        </div>
      </div>

      <div className="container" style={{ paddingBottom: '90px' }}>
        {/* Category Filter Controls */}
        <div
          className="reveal-on-scroll"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '10px',
            marginBottom: '46px',
            padding: '8px',
            backgroundColor: '#ffffff',
            borderRadius: '9999px',
            border: '1px solid var(--border-subtle)',
            maxWidth: 'fit-content',
            margin: '0 auto 46px',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          {REALISATION_CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            const count = cat.id === 'all'
              ? items.length
              : items.filter((r) => r.category === cat.id).length;

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.86rem',
                  fontWeight: isActive ? '700' : '500',
                  color: isActive ? '#ffffff' : '#334155',
                  backgroundColor: isActive ? 'var(--color-brand-primary)' : 'transparent',
                  border: 'none',
                  borderRadius: '9999px',
                  padding: '8px 18px',
                  cursor: 'pointer',
                  boxShadow: isActive ? '0 4px 12px rgba(13, 148, 136, 0.28)' : 'none',
                  transition: 'all 0.2s ease',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <span>{cat.label}</span>
                <span
                  style={{
                    fontSize: '0.74rem',
                    padding: '2px 6px',
                    borderRadius: '9999px',
                    backgroundColor: isActive ? 'rgba(255, 255, 255, 0.25)' : '#f1f5f9',
                    color: isActive ? '#ffffff' : '#64748b',
                    fontWeight: '700'
                  }}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Pure Visual Photography Gallery Grid (Clean Images, Rounded, Minimalist & Focused) */}
        <div
          className="gallery-photos-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: '24px',
            marginBottom: '64px'
          }}
        >
          {filteredItems.map((item, index) => {
            const isLeft = index % 2 === 0;
            return (
              <div
                key={item.id}
                className={`gallery-photo-card ${isLeft ? 'emerge-left' : 'emerge-right'}`}
                onClick={() => handleOpenItem(item)}
                style={{
                  position: 'relative',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  backgroundColor: '#0f172a',
                  boxShadow: '0 4px 20px rgba(15, 23, 42, 0.08)',
                  border: '1px solid rgba(15, 23, 42, 0.08)',
                  cursor: 'pointer',
                  aspectRatio: '16 / 10'
                }}
              >
                {/* Photo Image */}
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                    transition: 'transform 0.4s ease'
                  }}
                />

                {/* Gradient overlay for title readability on hover */}
                <div
                  className="gallery-gradient-overlay"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(to top, rgba(15, 23, 42, 0.85) 0%, rgba(15, 23, 42, 0.2) 40%, transparent 100%)',
                    opacity: 0,
                    transition: 'opacity 0.25s ease',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    padding: '18px 20px',
                    pointerEvents: 'none'
                  }}
                >
                  {/* Top zoom badge */}
                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <div
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        backgroundColor: 'rgba(255, 255, 255, 0.92)',
                        color: '#0f172a',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
                      }}
                    >
                      <Maximize2 size={16} />
                    </div>
                  </div>

                  {/* Bottom title */}
                  <div>
                    <span
                      style={{
                        display: 'inline-block',
                        fontSize: '0.72rem',
                        fontWeight: '800',
                        textTransform: 'uppercase',
                        letterSpacing: '0.04em',
                        color: '#2dd4bf',
                        marginBottom: '4px'
                      }}
                    >
                      {item.categoryLabel}
                    </span>
                    <div
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '1.05rem',
                        fontWeight: '700',
                        color: '#ffffff',
                        lineHeight: 1.3
                      }}
                    >
                      {item.title}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lightbox Modal */}
      <RealisationModal
        item={selectedItem}
        items={filteredItems}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSelectNext={handleNextItem}
        onSelectPrev={handlePrevItem}
        onOpenBooking={onOpenBooking}
      />

      <style>{`
        /* Fluid entrance out of nowhere (left/right emergence) */
        .gallery-photo-card {
          opacity: 0;
          will-change: transform, opacity, filter;
          transition: transform 1.05s cubic-bezier(0.16, 1, 0.3, 1),
                      opacity 1s cubic-bezier(0.16, 1, 0.3, 1),
                      filter 1s cubic-bezier(0.16, 1, 0.3, 1),
                      box-shadow 0.25s ease,
                      border-color 0.25s ease;
        }

        .gallery-photo-card.emerge-left {
          transform: translate3d(-100px, 0, 0) scale(0.85) rotate(-2deg);
          filter: blur(12px);
        }

        .gallery-photo-card.emerge-right {
          transform: translate3d(100px, 0, 0) scale(0.85) rotate(2deg);
          filter: blur(12px);
        }

        .gallery-photo-card.is-in-view {
          opacity: 1;
          transform: translate3d(0, 0, 0) scale(1) rotate(0deg);
          filter: blur(0px);
        }

        .gallery-photo-card.is-in-view:hover {
          transform: translateY(-5px) scale(1.02) rotate(0deg) !important;
          box-shadow: 0 18px 40px rgba(15, 23, 42, 0.18) !important;
          border-color: rgba(13, 148, 136, 0.4) !important;
        }

        .gallery-photo-card:hover img {
          transform: scale(1.05);
        }

        .gallery-photo-card:hover .gallery-gradient-overlay {
          opacity: 1 !important;
        }

        @media (max-width: 640px) {
          .gallery-photos-grid {
            grid-template-columns: 1fr !important;
          }

          .gallery-photo-card.emerge-left {
            transform: translate3d(-40px, 0, 0) scale(0.92);
          }

          .gallery-photo-card.emerge-right {
            transform: translate3d(40px, 0, 0) scale(0.92);
          }
        }
      `}</style>
    </div>
  );
}
