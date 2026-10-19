import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Apparaît dès que l'utilisateur a défilé de plus de 280px vers le bas
      if (window.scrollY > 280) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    toggleVisibility();

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      <button
        type="button"
        onClick={scrollToTop}
        className={`scroll-to-top-btn ${isVisible ? 'visible' : ''}`}
        aria-label="Remonter en haut de la page"
        title="Remonter en haut de page"
      >
        <ArrowUp size={22} strokeWidth={2.4} />
      </button>

      <style>{`
        .scroll-to-top-btn {
          position: fixed;
          bottom: 96px;
          right: 30px;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background-color: #0f172a;
          color: #ffffff;
          border: 1.5px solid rgba(255, 255, 255, 0.16);
          box-shadow: 0 8px 24px rgba(15, 23, 42, 0.28), 0 2px 6px rgba(0, 0, 0, 0.12);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 89;
          opacity: 0;
          transform: translateY(18px) scale(0.85);
          pointer-events: none;
          transition: opacity 0.28s ease, transform 0.28s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.2s ease, box-shadow 0.2s ease;
          outline: none;
        }

        .scroll-to-top-btn.visible {
          opacity: 1;
          transform: translateY(0) scale(1);
          pointer-events: auto;
        }

        .scroll-to-top-btn:hover {
          background-color: #0d9488;
          color: #00f5a0;
          transform: translateY(-4px) scale(1.06);
          box-shadow: 0 12px 30px rgba(13, 148, 136, 0.45), 0 4px 10px rgba(0, 0, 0, 0.15);
          border-color: rgba(0, 245, 160, 0.4);
        }

        .scroll-to-top-btn:active {
          transform: translateY(-1px) scale(0.96);
        }

        @media (max-width: 768px) {
          .scroll-to-top-btn {
            bottom: 92px;
            right: 28px;
            width: 44px;
            height: 44px;
          }
        }

        @media (max-width: 480px) {
          .scroll-to-top-btn {
            bottom: 88px;
            right: 22px;
            width: 42px;
            height: 42px;
          }
        }
      `}</style>
    </>
  );
}
