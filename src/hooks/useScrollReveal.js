import { useEffect } from 'react';

/**
 * High-performance Scroll Reveal Hook (Executive Lateral Motion)
 * Animates text, cards, and sections as they enter the viewport.
 * On mobile and across all pages, alternates entrance from Left and Right
 * to convey confidence, prestige, and forward momentum.
 */
export function useScrollReveal(dependencies = []) {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const targetSelectors = [
      '.reveal-on-scroll',
      '.reveal-left',
      '.reveal-right',
      '.reveal-scale',
      '.card',
      '.guide-step-card',
      '.pricing-card-clean',
      '.editorial-row',
      '.article-card'
    ];

    const selectorQuery = targetSelectors.join(', ');

    if (prefersReducedMotion) {
      document.querySelectorAll(selectorQuery).forEach((el) => {
        el.classList.add('is-revealed');
      });
      return;
    }

    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.04,
        rootMargin: '0px 0px -20px 0px'
      }
    );

    const observeElements = () => {
      const elements = Array.from(document.querySelectorAll(selectorQuery));

      elements.forEach((el, index) => {
        // Sur mobile, assignation systématique d'une alternance gauche / droite pour le rythme visuel
        if (isMobile) {
          if (!el.classList.contains('reveal-scale')) {
            if (index % 2 === 0) {
              el.classList.remove('reveal-right', 'reveal-on-scroll');
              el.classList.add('reveal-left');
            } else {
              el.classList.remove('reveal-left', 'reveal-on-scroll');
              el.classList.add('reveal-right');
            }
          }
        } else {
          // Sur ordinateur, conserver reveal-on-scroll par défaut si aucune direction latérale spécifiée
          if (!el.classList.contains('reveal-left') && !el.classList.contains('reveal-right') && !el.classList.contains('reveal-scale')) {
            el.classList.add('reveal-on-scroll');
          }
        }

        // Si l'élément est déjà visible dans l'écran au chargement initial, on l'affiche avec un micro-délai étagé
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.92 && rect.bottom > 0) {
          setTimeout(() => {
            el.classList.add('is-revealed');
          }, 30 + (index % 4) * 60);
        } else if (!el.classList.contains('is-revealed')) {
          observer.observe(el);
        }
      });
    };

    // Premier passage après stabilisation du DOM
    const timer = setTimeout(observeElements, 40);

    // MutationObserver pour réactiver les animations lors des changements d'onglets ou filtres
    let mutationObserver = null;
    if (typeof MutationObserver !== 'undefined') {
      mutationObserver = new MutationObserver(() => {
        observeElements();
      });
      const rootNode = document.getElementById('root') || document.body;
      if (rootNode) {
        mutationObserver.observe(rootNode, { childList: true, subtree: true });
      }
    }

    return () => {
      clearTimeout(timer);
      observer.disconnect();
      if (mutationObserver) {
        mutationObserver.disconnect();
      }
    };
  }, dependencies);
}
