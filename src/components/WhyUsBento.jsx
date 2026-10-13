import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, CheckCircle2, Sparkles, TrendingUp, ShieldCheck, Zap } from 'lucide-react';

/**
 * Hook personnalisé pour calculer la progression de défilement bidirectionnelle (scroll vers le bas ET vers le haut)
 */
function useRowScrollProgress(ref) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    const calculateProgress = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const vh = window.innerHeight || 800;

      // Déclenchement dès que le haut de la ligne entre par le bas de l'écran (vh * 0.94)
      // et complétion totale quand elle s'approche du centre (vh * 0.42)
      const start = vh * 0.94;
      const end = vh * 0.42;

      let p = (start - rect.top) / (start - end);
      p = Math.max(0, Math.min(1, p));

      // Courbe d'interpolation cubique ultra-douce
      const smooth = 1 - Math.pow(1 - p, 2.5);
      setProgress(smooth);
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(calculateProgress);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    calculateProgress();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [ref]);

  return progress;
}

/**
 * Composant d'une rangée éditoriale animée avec entrées gauche/droite au scroll,
 * écriture progressive des textes (inscribe effect) et inclinaison 3D au curseur
 */
function EditorialStoryRow({
  story,
  isReverse,
  onNavigate
}) {
  const rowRef = useRef(null);
  const progress = useRowScrollProgress(rowRef);

  // Détection de révélation active (pour déclencher l'écriture progressive des textes)
  const isRevealed = progress >= 0.22;

  // État d'inclinaison 3D et de reflet lumineux dynamique selon le rapprochement du curseur
  const [tilt, setTilt] = useState({
    rotateX: 0,
    rotateY: 0,
    glareX: 50,
    glareY: 50,
    isHovered: false
  });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = ((y - centerY) / centerY) * -8.5; // max 8.5deg
    const rotY = ((x - centerX) / centerX) * 8.5;  // max 8.5deg
    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;

    setTilt({
      rotateX: rotX,
      rotateY: rotY,
      glareX,
      glareY,
      isHovered: true
    });
  };

  const handleMouseLeave = () => {
    setTilt({
      rotateX: 0,
      rotateY: 0,
      glareX: 50,
      glareY: 50,
      isHovered: false
    });
  };

  // Déplacement calculé au fur et à mesure du scroll (gauche et droite, calibré pour smartphone sans débordement)
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
  const maxShift = isMobile ? 12 : 75;
  const leftTranslate = (1 - progress) * -maxShift;
  const rightTranslate = (1 - progress) * maxShift;
  const opacity = 0.05 + progress * 0.95;

  const mediaContent = (
    <div
      className="editorial-media-wrapper"
      style={{
        transform: `translate3d(${isReverse ? rightTranslate : leftTranslate}px, 0, 0)`,
        opacity,
        transition: 'transform 0.12s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.18s ease-out',
        willChange: 'transform, opacity'
      }}
    >
      <div
        className="editorial-media-card"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          borderRadius: '24px',
          overflow: 'hidden',
          boxShadow: tilt.isHovered
            ? '0 32px 70px -15px rgba(13, 148, 136, 0.28), 0 16px 36px -10px rgba(15, 23, 42, 0.18)'
            : '0 24px 50px -15px rgba(15, 23, 42, 0.16)',
          border: '1px solid rgba(15, 23, 42, 0.08)',
          position: 'relative',
          backgroundColor: '#f1f5f9',
          transform: tilt.isHovered
            ? `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale3d(1.025, 1.025, 1.025)`
            : `perspective(1000px) scale3d(${0.96 + progress * 0.04}, ${0.96 + progress * 0.04}, 1)`,
          transition: tilt.isHovered
            ? 'transform 0.08s ease-out, box-shadow 0.2s ease'
            : 'transform 0.55s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.55s ease',
          transformStyle: 'preserve-3d',
          cursor: 'pointer'
        }}
      >
        <img
          src={story.image}
          alt={story.alt}
          style={{
            width: '100%',
            height: '100%',
            maxHeight: '440px',
            objectFit: 'cover',
            display: 'block',
            transform: tilt.isHovered ? 'scale(1.045)' : 'scale(1)',
            transition: 'transform 0.65s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        />

        {/* Reflet dynamique réactif au rapprochement et déplacement du curseur */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            background: tilt.isHovered
              ? `radial-gradient(circle at ${tilt.glareX}% ${tilt.glareY}%, rgba(255, 255, 255, 0.38) 0%, rgba(255, 255, 255, 0) 65%)`
              : 'none',
            zIndex: 3,
            transition: 'opacity 0.2s ease',
            opacity: tilt.isHovered ? 1 : 0
          }}
        />

        {/* Halo subtil de bordure au survol */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '24px',
            border: tilt.isHovered ? '2px solid rgba(13, 148, 136, 0.5)' : '2px solid transparent',
            pointerEvents: 'none',
            transition: 'border 0.25s ease',
            zIndex: 4
          }}
        />

      </div>
    </div>
  );

  const textContent = (
    <div
      className="editorial-text-wrapper"
      style={{
        transform: `translate3d(${isReverse ? leftTranslate : rightTranslate}px, 0, 0)`,
        opacity,
        transition: 'transform 0.12s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.18s ease-out',
        willChange: 'transform, opacity'
      }}
    >
      <div className="editorial-content">
        {/* Titre avec dévoilement vertical fluide */}
        <div style={{ overflow: 'hidden', marginBottom: '18px' }}>
          <h3
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(1.6rem, 2.6vw, 2.1rem)',
              fontWeight: '800',
              color: '#0f172a',
              lineHeight: 1.25,
              letterSpacing: '-0.025em',
              margin: 0,
              transform: isRevealed ? 'translateY(0)' : 'translateY(100%)',
              transition: 'transform 0.75s cubic-bezier(0.16, 1, 0.3, 1)',
              willChange: 'transform'
            }}
          >
            {story.title}
          </h3>
        </div>

        {/* Paragraphes avec écriture et fondu montant étagé */}
        {story.paragraphs.map((para, idx) => (
          <p
            key={idx}
            style={{
              fontSize: idx === 0 ? '1.04rem' : '1rem',
              color: idx === 0 ? '#334155' : '#64748b',
              lineHeight: idx === 0 ? 1.75 : 1.7,
              marginBottom: idx === story.paragraphs.length - 1 ? '26px' : '16px',
              transform: isRevealed ? 'translateY(0)' : 'translateY(22px)',
              opacity: isRevealed ? 1 : 0,
              transition: `transform 0.65s cubic-bezier(0.16, 1, 0.3, 1) ${0.1 + idx * 0.12}s, opacity 0.65s ease-out ${0.1 + idx * 0.12}s`,
              willChange: 'transform, opacity'
            }}
          >
            {para}
          </p>
        ))}

        {/* Puces clés : Révélation d'écriture progressive (clip-path de gauche à droite) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: story.hasCta ? '28px' : '0' }}>
          {story.bullets.map((bullet, idx) => {
            const delay = 0.2 + idx * 0.16;
            return (
              <div
                key={idx}
                className="editorial-bullet-item"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  fontSize: '0.94rem',
                  color: '#0f172a',
                  fontWeight: '600'
                }}
              >
                {/* Icône qui pop élastiquement */}
                <div
                  style={{
                    transform: isRevealed ? 'scale(1)' : 'scale(0)',
                    transition: `transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}s`,
                    flexShrink: 0
                  }}
                >
                  <CheckCircle2 size={18} color="#0d9488" />
                </div>

                {/* Texte qui s'écrit de gauche à droite */}
                <span
                  style={{
                    clipPath: isRevealed ? 'inset(0 0 0 0)' : 'inset(0 100% 0 0)',
                    transition: `clip-path 0.75s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
                    willChange: 'clip-path',
                    display: 'inline-block'
                  }}
                >
                  {bullet}
                </span>
              </div>
            );
          })}
        </div>

        {story.hasCta && (
          <button
            onClick={() => {
              onNavigate('about');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            style={{
              border: 'none',
              background: 'none',
              color: '#0d9488',
              fontWeight: '800',
              fontSize: '0.96rem',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: 0,
              marginTop: '16px',
              transform: isRevealed ? 'translateY(0)' : 'translateY(16px)',
              opacity: isRevealed ? 1 : 0,
              transition: 'all 0.55s ease 0.6s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.gap = '12px';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.gap = '8px';
            }}
          >
            <span>Découvrir la philosophie d'accompagnement de Laurent Manouaba</span>
            <ArrowRight size={16} />
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div
      ref={rowRef}
      className={`editorial-row ${isReverse ? 'editorial-reverse' : ''}`}
      style={{
        display: 'grid',
        gridTemplateColumns: isReverse ? '0.95fr 1.05fr' : '1.05fr 0.95fr',
        gap: '56px',
        alignItems: 'center',
        marginBottom: story.isLast ? '80px' : '90px',
        position: 'relative',
        overflow: 'hidden',
        maxWidth: '100%'
      }}
    >
      {isReverse ? (
        <>
          {textContent}
          {mediaContent}
        </>
      ) : (
        <>
          {mediaContent}
          {textContent}
        </>
      )}
    </div>
  );
}

export function WhyUsBento({ onNavigate }) {
  const headerRef = useRef(null);
  const headerProgress = useRowScrollProgress(headerRef);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const stories = [
    {
      id: 1,
      image: '/assets/tech-prospective.jpg',
      alt: 'Prospective technologique et veille algorithmique - Laurent Manouaba',
      title: 'Veille technologique permanente & prospective scientifique',
      badge: {
        label: 'Prospective R&D',
        value: '+24 à 36 mois d’avance'
      },
      paragraphs: [
        "Nous n'attendons pas qu'une innovation devienne un phénomène de mode pour en évaluer les implications. Le cabinet maintient une veille scientifique et opérationnelle continue sur les modèles fondations d'IA, les architectures distribuées, l'IoT et les ruptures quantiques.",
        "Nos clients anticipent les mutations de leur écosystème avec 24 à 36 mois d'avance, adoptant les innovations créatrices de valeur avant leurs concurrents et évitant les investissements prématurés sans pérennité."
      ],
      bullets: [
        "Anticipation continue des ruptures de marché (+24 à 36 mois d'avance)",
        "Zéro dépendance aux modes passagères et aux outils gadgets",
        "Maîtrise des standards mondiaux (Cloud, IA générative, data sovereignty)"
      ],
      isReverse: false
    },
    {
      id: 2,
      image: '/assets/strategic-audit.jpg',
      alt: 'Audit stratégique et optimisation financière - Laurent Manouaba',
      title: 'Audit sans complaisance & rationalisation des budgets technologiques',
      badge: {
        label: 'Impact Trésorerie',
        value: '-35% à -58% de dépenses'
      },
      paragraphs: [
        "Chaque euro alloué à votre écosystème technologique doit justifier un multiple mesurable. Nous menons une analyse impitoyable de vos dépenses pour identifier les redondances, les licences dormantes et les architectures surdimensionnées.",
        "Notre intervention permet fréquemment de réduire de 35% à 58% les coûts récurrents superflus, libérant une trésorerie substantielle pour réinvestir dans des projets à fort impact opérationnel et à rentabilité immédiate."
      ],
      bullets: [
        "Réduction prouvée de 35% à 58% des dépenses logicielles inutiles",
        "Réévaluation sans complaisance de chaque contrat et licence informatique",
        "Alignement strict des dépenses sur le retour sur investissement opérationnel"
      ],
      isReverse: true
    },
    {
      id: 3,
      image: '/assets/workshop-meeting.jpg',
      alt: 'Accompagnement terrain et travail collaboratif - Laurent Manouaba',
      title: "Suivi intégral : de l'élaboration à la réalisation opérationnelle",
      badge: {
        label: 'Immersion Terrain',
        value: '100% Présence Directe'
      },
      paragraphs: [
        "Pas de sous-traitance opaque ni de consultants débutants délégués à votre dossier. Laurent Manouaba s'engage personnellement sur le terrain, assurant une présence continue aux côtés de vos équipes techniques et managériales.",
        "De la première note d'intention jusqu'au déploiement effectif, chaque étape fait l'objet d'un transfert de compétences rigoureux. Votre organisation ne développe aucune dépendance envers le cabinet : vos collaborateurs gagnent en maîtrise et en autonomie pérenne."
      ],
      bullets: [
        "Implication directe de Laurent Manouaba à chaque étape clé",
        "Cohésion renforcée et autonomisation complète de vos équipes internes",
        "Orchestration agile d'un réseau international de 67+ experts pointus"
      ],
      isReverse: false
    },
    {
      id: 4,
      image: '/assets/eustress-team.jpg',
      alt: "Adhésion d'équipe et eustress positif - Laurent Manouaba",
      title: "L’Eustress face au changement : convertir l'anxiété en énergie motrice",
      badge: {
        label: 'Adhésion Équipe',
        value: 'Victoires dès J+14'
      },
      paragraphs: [
        "La peur de l'obsolescence et la surcharge mentale font échouer plus de 70% des projets technologiques d'envergure. Laurent Manouaba canalise cette appréhension en « stress positif » (eustress), en fixant des jalons courts, clairs et immédiatement gratifiants.",
        "En célébrant des victoires opérationnelles tangibles dès les 14 premiers jours, la résistance au changement s'efface naturellement pour laisser place à la curiosité, à l'enthousiasme et à la fierté collective de réussir ensemble."
      ],
      bullets: [
        "Désamorçage immédiat de la peur de l'inconnu et du sentiment d'impuissance",
        "Victoires concrètes à 14 jours pour valider la démarche auprès des équipes",
        "Accompagnement psychologique et organisationnel sans jargon technique"
      ],
      isReverse: true,
      hasCta: true,
      isLast: true
    }
  ];

  return (
    <section
      id="pourquoi-le-cabinet"
      className="why-us-bento-section"
      style={{
        padding: '100px 0 110px',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div className="container">
        {/* =========================================================================
            EN-TÊTE : LE GRAND TITRE SORT DE GAUCHE ET S'AJUSTE EN ANIMATION COMPLÈTE
            ========================================================================= */}
        <div
          ref={headerRef}
          className="why-us-header"
          style={{
            maxWidth: '880px',
            margin: '0 auto 80px',
            textAlign: 'center',
            position: 'relative'
          }}
        >
          {/* Titre : centrage strict sur mobile, micro-glide élégant sur desktop */}
          <div
            style={{
              transform: isMobile
                ? `translate3d(0, ${(1 - headerProgress) * 16}px, 0)`
                : `translate3d(${(1 - headerProgress) * -36}px, ${(1 - headerProgress) * 16}px, 0) scale(${0.96 + headerProgress * 0.04})`,
              opacity: 0.15 + headerProgress * 0.85,
              transition: 'transform 0.14s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.2s ease-out',
              willChange: 'transform, opacity'
            }}
          >
            <h2
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(2.2rem, 4.2vw, 3.4rem)',
                fontWeight: '900',
                lineHeight: 1.15,
                color: '#0f172a',
                letterSpacing: '-0.035em',
                marginBottom: '18px',
                textAlign: 'center'
              }}
            >
              Pourquoi confier votre <span style={{ color: '#0d9488' }}>transformation technologique</span> au cabinet
            </h2>
          </div>

          {/* Ligne signature architecturale */}
          <div
            style={{
              width: '100px',
              height: '3.5px',
              backgroundColor: '#0d9488',
              margin: '0 auto 22px',
              borderRadius: '9999px',
              transform: `scaleX(${headerProgress})`,
              transformOrigin: isMobile ? 'center' : 'left center',
              transition: 'transform 0.18s cubic-bezier(0.16, 1, 0.3, 1)',
              boxShadow: '0 0 10px rgba(13, 148, 136, 0.5)'
            }}
          />

          {/* Paragraphe descriptif qui s'élève doucement */}
          <div
            style={{
              transform: `translate3d(0, ${(1 - headerProgress) * 28}px, 0)`,
              opacity: Math.max(0, (headerProgress - 0.12) / 0.88),
              transition: 'transform 0.18s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.22s ease-out',
              willChange: 'transform, opacity'
            }}
          >
            <p
              style={{
                fontSize: '1.16rem',
                color: '#475569',
                lineHeight: 1.75,
                maxWidth: '780px',
                margin: '0 auto',
                textAlign: 'center'
              }}
            >
              Fini les rapports théoriques inapplicables. Le cabinet de Laurent G-M Manouaba allie rigueur prospective, rationalisation budgétaire intransigeante et présence humaine directe sur le terrain pour rentabiliser immédiatement chaque levier technologique.
            </p>
          </div>
        </div>

        {/* 4 Récits éditoriaux avec sorties gauche/droite, écriture progressive et inclinaison 3D au curseur */}
        {stories.map((story) => (
          <EditorialStoryRow
            key={story.id}
            story={story}
            isReverse={story.isReverse}
            onNavigate={onNavigate}
          />
        ))}

        {/* =========================================================================
            PASSERELLE STRATÉGIQUE (Services & Tarifs) - ZÉRO CARTE E-COMMERCE
            ========================================================================= */}
        <div
          style={{
            borderTop: '1px solid var(--border-subtle)',
            paddingTop: '48px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '24px'
          }}
        >
          <div>
            <h3
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.45rem',
                fontWeight: '900',
                color: '#0f172a',
                marginBottom: '8px',
                letterSpacing: '-0.02em'
              }}
            >
              Prêt à explorer les solutions adaptées à votre structure ?
            </h3>
            <p
              style={{
                fontSize: '0.98rem',
                color: '#64748b',
                margin: 0
              }}
            >
              Consultez le catalogue détaillé des 12 services ou accédez à nos grilles tarifaires 100% transparentes.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
            <button
              onClick={() => {
                onNavigate('services');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="btn btn-primary"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 6px 20px rgba(13, 148, 136, 0.28)'
              }}
            >
              <span>Catalogue des 12 Services</span>
              <ArrowRight size={16} />
            </button>
            <button
              onClick={() => {
                onNavigate('pricing');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="btn btn-outline"
            >
              <span>Grille des Tarifs</span>
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 992px) {
          .editorial-row {
            grid-template-columns: 1fr !important;
            gap: 36px !important;
            margin-bottom: 70px !important;
          }

          .editorial-reverse {
            display: flex !important;
            flex-direction: column-reverse !important;
          }

          .editorial-media-card img {
            max-height: 320px !important;
          }

          .editorial-media-wrapper,
          .editorial-text-wrapper {
            transition: transform 0.22s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.22s ease-out !important;
          }
        }

        @media (max-width: 768px) {
          .why-us-bento-section {
            padding-top: 36px !important;
            padding-bottom: 50px !important;
          }
          .why-us-header {
            margin-bottom: 32px !important;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .editorial-media-wrapper,
          .editorial-text-wrapper {
            transform: none !important;
            opacity: 1 !important;
          }
          .editorial-media-card {
            transform: none !important;
          }
        }
      `}</style>
    </section>
  );
}
