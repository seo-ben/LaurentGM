import React, { useState, useMemo } from 'react';
import {
  Search,
  X,
  Calendar,
  Clock,
  MessageSquare,
  ArrowRight,
  ExternalLink,
  Sparkles
} from 'lucide-react';

export function BlogPage({ onOpenBooking }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'Toutes les publications' },
    { id: 'ia', label: 'Intelligence Artificielle' },
    { id: 'blockchain', label: 'Blockchain & Cryptographie' },
    { id: 'strategie', label: 'Management & Stratégie' },
    { id: 'organisation', label: 'Sciences de l\'Organisation' },
    { id: 'infrastructure', label: 'Infrastructures & Souveraineté' }
  ];

  const articles = [
    {
      id: "virus-ia",
      categoryKey: "ia",
      category: "Intelligence Artificielle & Prospective",
      date: "22 avril 2023",
      readTime: "5 min de lecture",
      lead: true,
      image: "/assets/ai-executive-lead.jpg",
      title: "Attention au « virus » de l'intelligence artificielle : Comprendre l'évolution sans panique",
      intro: "Une mise en perspective historique indispensable pour dépasser le bruit médiatique et identifier la valeur réelle de l'IA pour l'entreprise.",
      abstract: "L'intelligence artificielle n'est pas née avec ChatGPT. Entre fascination démesurée et rejet craintif, les dirigeants d'entreprise doivent discerner les véritables cas d'usage à fort retour sur investissement des simples gadgets commerciaux. Cette étude retrace la trajectoire de l'IA depuis sa formalisation pionnière et propose un cadre méthodologique d'intégration sobre et souverain.",
      history: [
        { year: "1943", desc: "Warren McCulloch & Walter Pitts modélisent les premiers neurones formels." },
        { year: "1956", desc: "Conférence de Dartmouth et naissance officielle du concept d'IA." },
        { year: "1950-1990", desc: "Systèmes experts, logique floue et réseaux de neurones pionniers." },
        { year: "2000-2010", desc: "Reconnaissance vocale statistique et traduction automatique." },
        { year: "2010 à aujourd'hui", desc: "Révolution du Deep Learning et essor des modèles génératifs." }
      ],
      keyTakeaway: "Pour une PME, l'enjeu immédiat n'est pas de courir après les modèles géants de la Silicon Valley, mais d'automatiser sobrement l'extraction de valeur dans ses données internes tout en sanctuarisant ses secrets d'affaires.",
      sectors: "Services B2B, industrie manufacturière, banques, administration publique",
      whatsappPayload: "Bonjour Laurent, j'ai lu votre dossier de recherche sur l'Intelligence Artificielle (« Attention au virus de l'IA »). J'aimerais échanger avec vous sur les opportunités concrètes d'automatisation et de valorisation des données pour notre entreprise."
    },
    {
      id: "bitcoin-blockchain",
      categoryKey: "blockchain",
      category: "Blockchain & Cryptographie",
      date: "23 avril 2023",
      readTime: "4 min de lecture",
      image: "/assets/code-screen.jpg",
      title: "Bitcoin est un tour de force technologique : Ce que les entreprises doivent en retenir",
      intro: "Présente Bitcoin comme une authentique réussite cryptographique : réussir à créer un bien non-duplicable dans un univers purement numérique constitue une rupture fondamentale pour l'économie.",
      abstract: "Au-delà de la spéculation financière, l'architecture conçue en 2008 résout le problème fondamental des généraux byzantins : coordonner des acteurs économiques sans nécessiter un tiers de confiance centralisé. Pour les organisations, les applications concrètes touchent la résilience des registres, la traçabilité des chaînes d'approvisionnement et l'automatisation contractuelle irrévocable.",
      keyTakeaway: "La blockchain résout 5 verrous fondamentaux : sécurité inviolable, transparence vérifiable, efficacité sans tiers, traçabilité industrielle intégrale et automatisation contractuelle.",
      sectors: "Finance & FinTech, immobilier, logistique internationale, santé pharmaceutique",
      whatsappPayload: "Bonjour Laurent, suite à la lecture de votre publication sur Bitcoin et la blockchain, j'aimerais explorer avec vous les applications potentielles (traçabilité, smart contracts, décentralisation) pour nos activités."
    },
    {
      id: "quand-consulter",
      categoryKey: "strategie",
      category: "Management & Stratégie",
      date: "21 avril 2023",
      readTime: "4 min de lecture",
      image: "/assets/strategic-audit.jpg",
      title: "Faire appel à un consultant pour son entreprise : À quel moment précis franchir le pas ?",
      intro: "La transformation digitale n'est pas un gadget technique mais un levier de rentabilité globale (efficacité, qualité de service, expansion des parts de marché, agilité organisationnelle).",
      abstract: "Beaucoup d'entreprises attendent la crise ouverte ou le dérapage budgétaire majeur avant de solliciter un regard externe. Or, la valeur maximale d'un conseil pluridisciplinaire se situe en amont, au moment des signaux faibles : quand la rentabilité s'érode malgré des carnets de commandes pleins, ou quand un virage technologique crée une paralysie décisionnelle.",
      keyTakeaway: "Le moment optimal pour consulter survient avant l'urgence : dès que le coût de l'inaction ou de l'erreur d'aiguillage dépasse de loin l'investissement d'une mission de cadrage stratégique indépendant.",
      sectors: "PME en croissance, groupes familiaux, startups en accélération",
      whatsappPayload: "Bonjour Laurent, votre analyse sur le moment opportun pour faire appel à un consultant a particulièrement résonné avec la situation actuelle de notre entreprise. Pouvons-nous convenir d'un échange découverte ?"
    },
    {
      id: "eustress-organisation",
      categoryKey: "organisation",
      category: "Sciences de l'Organisation",
      date: "15 mai 2023",
      readTime: "6 min de lecture",
      image: "/assets/eustress-team.jpg",
      title: "Transformer le stress organisationnel en « Eustress » d'innovation durable",
      intro: "Pourquoi 70% des projets de transformation technologique échouent non pas à cause du code informatique, mais en raison du stress toxique et du blocage psychologique des équipes.",
      abstract: "Le changement impose une charge cognitive colossale aux collaborateurs. Lorsque ce stress n'est pas régulé, il se mue en détresse (résistance passive, démotivation, turn-over). À l'inverse, canalisé selon les principes de l'eustress — le stress positif et stimulant — il devient le plus puissant catalyseur d'adoption collective.",
      keyTakeaway: "L'ingénierie technique est stérile sans alignement psychologique. Réussir une modernisation exige de concevoir les processus autour de l'écologie humaine des équipes.",
      sectors: "Directions Générales, RH, équipes opérationnelles, managers de projets",
      whatsappPayload: "Bonjour Laurent, j'ai été très intéressé par votre approche de l'eustress organisationnel dans la transformation numérique. Comment intervenez-vous concrètement sur la dimension humaine de nos équipes ?"
    },
    {
      id: "souverainete-resilience",
      categoryKey: "infrastructure",
      category: "Infrastructures & Souveraineté",
      date: "8 juin 2023",
      readTime: "5 min de lecture",
      image: "/assets/workshop-meeting.jpg",
      title: "Souveraineté numérique et résilience des systèmes en Afrique de l'Ouest",
      intro: "Comment concevoir des architectures d'information robustes, tolérantes aux pannes de connectivité et conformes aux exigences de souveraineté locale.",
      abstract: "Les entreprises régionales font face à des contraintes spécifiques : instabilité des débits internationaux, coûts élevés du transit de données et exigences des régulateurs sur la protection des données. Cette étude expose les principes d'une architecture hybride 'offline-first' capable de maintenir les opérations critiques en continu.",
      keyTakeaway: "La véritable modernité ne consiste pas à copier aveuglément les architectures californiennes, mais à forger des systèmes d'une robustesse à toute épreuve face aux réalités environnementales du terrain.",
      sectors: "FinTech & Mobile Money, distribution, logistique portuaire, télécoms",
      whatsappPayload: "Bonjour Laurent, votre travail sur la souveraineté numérique et la résilience d'infrastructure en Afrique de l'Ouest correspond directement aux défis de notre structure. Échangeons sur notre schéma directeur."
    }
  ];

  // Filter and search
  const filteredArticles = useMemo(() => {
    return articles.filter((art) => {
      const matchesCategory = selectedCategory === 'all' || art.categoryKey === selectedCategory;
      if (!matchesCategory) return false;

      if (!searchQuery.trim()) return true;

      const query = searchQuery.toLowerCase();
      return (
        art.title.toLowerCase().includes(query) ||
        art.intro.toLowerCase().includes(query) ||
        art.abstract.toLowerCase().includes(query) ||
        art.category.toLowerCase().includes(query) ||
        art.keyTakeaway.toLowerCase().includes(query) ||
        art.sectors.toLowerCase().includes(query)
      );
    });
  }, [searchQuery, selectedCategory]);

  const handleOpenArticleBooking = (art) => {
    onOpenBooking({
      subject: `Discussion sur l'article : ${art.title}`,
      planName: `Veille & Recherche : ${art.category}`,
      initialPrice: "Consultance Stratégique",
      whatsappPayload: art.whatsappPayload
    });
  };

  const leadArticle = (!searchQuery && selectedCategory === 'all')
    ? articles.find((a) => a.lead)
    : null;

  const standardArticles = leadArticle
    ? filteredArticles.filter((a) => a.id !== leadArticle.id)
    : filteredArticles;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#ffffff' }}>
      {/* Page Header (STRICT: NO LABELS ABOVE TITLE) */}
      <div className="page-header" style={{ marginBottom: '32px' }}>
        <div className="container">
          <h1 className="page-title">
            Analyses & Recherches Stratégiques
          </h1>
          <p className="page-description">
            Notes d'orientation, états de l'art technologiques et retours d'expérience terrain par Laurent G-M Manouaba.
          </p>
        </div>
      </div>

      <div className="container" style={{ maxWidth: '1040px', paddingBottom: '90px' }}>
        {/* Minimalist Search & Filter Navigation (NO BULKY CARD CONTAINER) */}
        <div style={{ marginBottom: '40px' }}>
          <div className="editorial-search-bar">
            <Search
              size={18}
              style={{
                position: 'absolute',
                left: '18px',
                color: 'var(--text-muted)',
                pointerEvents: 'none'
              }}
            />
            <input
              type="text"
              className="editorial-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher par concept, mot-clé ou technologie (IA, Bitcoin, rentabilité, eustress)..."
              aria-label="Rechercher dans les publications"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                style={{
                  position: 'absolute',
                  right: '16px',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--text-muted)',
                  display: 'flex',
                  alignItems: 'center'
                }}
                title="Effacer"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Minimalist Topic Selector */}
          <div className="editorial-filter-pills">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`editorial-pill ${isActive ? 'active' : ''}`}
                >
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Active Search Summary */}
          {(searchQuery || selectedCategory !== 'all') && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingBottom: '16px',
                borderBottom: '1px solid rgba(15, 23, 42, 0.08)',
                fontSize: '0.88rem',
                color: 'var(--text-secondary)'
              }}
            >
              <span>
                <strong>{filteredArticles.length}</strong> publication{filteredArticles.length > 1 ? 's' : ''} trouvée{filteredArticles.length > 1 ? 's' : ''}
                {searchQuery && <span> pour « <em>{searchQuery}</em> »</span>}
              </span>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--color-brand-primary)',
                  fontWeight: '600',
                  cursor: 'pointer',
                  fontSize: '0.84rem'
                }}
              >
                Réinitialiser
              </button>
            </div>
          )}
        </div>

        {/* Zero Results State */}
        {filteredArticles.length === 0 && (
          <div
            style={{
              padding: '60px 20px',
              textAlign: 'center',
              borderTop: '1px solid rgba(15, 23, 42, 0.08)',
              borderBottom: '1px solid rgba(15, 23, 42, 0.08)',
              marginBottom: '48px'
            }}
          >
            <h2 style={{ fontSize: '1.3rem', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '8px' }}>
              Aucune étude ne correspond à « {searchQuery} »
            </h2>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginBottom: '20px' }}>
              Essayez un autre mot-clé ou sollicitez directement une étude sur-mesure pour votre organisation.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="btn btn-outline btn-sm"
            >
              Voir toutes les publications
            </button>
          </div>
        )}

        {/* Featured Editorial Lead Paper (OPEN & AIRY MAGAZINE LAYOUT, ZERO BOX CLUTTER) */}
        {leadArticle && (
          <section style={{ marginBottom: '56px' }}>
            <div className="editorial-lead">
              {/* Left Column: Narrative & Business Impact */}
              <div>
                {/* Topic / Category in subtle uppercase under title */}
                <h2
                  style={{
                    fontSize: 'clamp(1.75rem, 2.7vw, 2.3rem)',
                    fontWeight: '800',
                    color: 'var(--text-primary)',
                    marginBottom: '12px',
                    lineHeight: 1.25,
                    letterSpacing: '-0.025em'
                  }}
                >
                  {leadArticle.title}
                </h2>

                {/* Metadata strictly BELOW title */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '12px',
                    fontSize: '0.84rem',
                    color: 'var(--text-muted)',
                    marginBottom: '18px'
                  }}
                >
                  <span style={{ fontWeight: '700', color: 'var(--color-brand-primary)' }}>
                    {leadArticle.category}
                  </span>
                  <span>•</span>
                  <span>{leadArticle.date}</span>
                  <span>•</span>
                  <span>{leadArticle.readTime}</span>
                  <span>•</span>
                  <span style={{ color: 'var(--text-primary)', fontWeight: '600' }}>
                    Laurent G-M Manouaba
                  </span>
                </div>

                <p
                  style={{
                    fontSize: '1.02rem',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.7,
                    marginBottom: '20px'
                  }}
                >
                  {leadArticle.abstract}
                </p>

                {/* Chronology List (Discrete & Integrated) */}
                <div style={{ marginBottom: '24px' }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '10px' }}>
                    Jalons historiques de l'IA :
                  </div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {leadArticle.history.map((h) => (
                      <li key={h.year} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
                        <span style={{ color: 'var(--color-brand-primary)', fontWeight: '800', minWidth: '42px' }}>{h.year}</span>
                        <span>{h.desc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Subtle Takeaway Quote */}
                <div
                  style={{
                    borderLeft: '3px solid var(--color-brand-primary)',
                    paddingLeft: '16px',
                    marginBottom: '24px',
                    fontSize: '0.92rem',
                    color: 'var(--text-primary)',
                    lineHeight: 1.6,
                    fontStyle: 'italic'
                  }}
                >
                  « {leadArticle.keyTakeaway} »
                </div>

                {/* Action CTA */}
                <button
                  onClick={() => handleOpenArticleBooking(leadArticle)}
                  className="btn btn-whatsapp btn-sm"
                >
                  <MessageSquare size={16} />
                  <span>Échanger avec Laurent Manouaba sur ce sujet</span>
                </button>
              </div>

              {/* Right Column: Clean Editorial Visual (ZERO OVERLAYS OR BADGES ON IMAGE) */}
              <div>
                <img
                  src={leadArticle.image}
                  alt={leadArticle.title}
                  style={{
                    width: '100%',
                    height: '380px',
                    objectFit: 'cover',
                    borderRadius: 'var(--radius-lg)',
                    display: 'block',
                    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.08)'
                  }}
                />
              </div>
            </div>

            <hr style={{ border: 'none', borderTop: '1px solid rgba(15, 23, 42, 0.08)', margin: '48px 0 36px' }} />
          </section>
        )}

        {/* Section Heading for other analyses */}
        {standardArticles.length > 0 && (
          <div style={{ marginBottom: '24px' }}>
            <h2
              style={{
                fontSize: '1.45rem',
                fontWeight: '800',
                color: 'var(--text-primary)',
                letterSpacing: '-0.02em',
                margin: 0
              }}
            >
              {leadArticle ? "Dossiers & Notes d'Orientation" : "Publications Correspondantes"}
            </h2>
          </div>
        )}

        {/* Editorial Feed: Clean, Airy Rows (NO BULKY CARDS) */}
        <div style={{ marginBottom: '60px' }}>
          {standardArticles.map((art) => (
            <article
              key={art.id}
              className="editorial-row"
            >
              {/* Left: Text & Content */}
              <div style={{ flex: 1 }}>
                {/* Title FIRST: Strictly NO labels or badges above title */}
                <h3 className="editorial-row-title">
                  {art.title}
                </h3>

                {/* Metadata strictly BELOW title */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '10px',
                    fontSize: '0.8rem',
                    color: 'var(--text-muted)',
                    marginBottom: '12px'
                  }}
                >
                  <span style={{ fontWeight: '700', color: 'var(--color-brand-primary)' }}>
                    {art.category}
                  </span>
                  <span>•</span>
                  <span>{art.date}</span>
                  <span>•</span>
                  <span>{art.readTime}</span>
                </div>

                <p
                  style={{
                    fontSize: '0.94rem',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.65,
                    marginBottom: '14px'
                  }}
                >
                  {art.abstract}
                </p>

                {art.history && (
                  <div style={{ marginBottom: '14px' }}>
                    <div style={{ fontSize: '0.82rem', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '6px' }}>
                      Jalons historiques clés :
                    </div>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      {art.history.map((h) => (
                        <li key={h.year} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
                          <span style={{ color: 'var(--color-brand-primary)', fontWeight: '800', minWidth: '40px' }}>{h.year}</span>
                          <span>{h.desc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Single concrete takeaway line */}
                <div
                  style={{
                    fontSize: '0.86rem',
                    color: 'var(--text-primary)',
                    marginBottom: '14px',
                    lineHeight: 1.5
                  }}
                >
                  <strong style={{ color: 'var(--color-brand-primary)' }}>Synthèse : </strong>
                  {art.keyTakeaway}
                </div>

                {/* Sectors and CTA */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '12px',
                    paddingTop: '8px'
                  }}
                >
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    <strong>Secteurs :</strong> {art.sectors}
                  </span>

                  <button
                    onClick={() => handleOpenArticleBooking(art)}
                    style={{
                      background: 'none',
                      border: 'none',
                      padding: 0,
                      color: 'var(--color-brand-primary)',
                      fontWeight: '700',
                      fontSize: '0.86rem',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px'
                    }}
                  >
                    <span>Échanger sur ce dossier</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>

              {/* Right: Clean Thumbnail (STRICT: ZERO OVERLAYS ON IMAGE) */}
              <div
                style={{
                  width: '210px',
                  height: '140px',
                  flexShrink: 0,
                  overflow: 'hidden',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: '#f1f5f9'
                }}
              >
                <img
                  src={art.image}
                  alt={art.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block'
                  }}
                />
              </div>
            </article>
          ))}
        </div>

        {/* Minimalist Executive Study Callout (CHIC & CONCRET, ZERO CLUTTER) */}
        <div
          style={{
            backgroundColor: '#0f172a',
            color: '#ffffff',
            borderRadius: 'var(--radius-lg)',
            padding: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '32px',
            flexWrap: 'wrap'
          }}
        >
          <div style={{ maxWidth: '620px' }}>
            <h2
              style={{
                fontSize: '1.45rem',
                fontWeight: '800',
                color: '#ffffff',
                marginBottom: '8px',
                lineHeight: 1.3
              }}
            >
              Besoin d'un État de l'Art ou d'une Veille Stratégique Dédiée ?
            </h2>
            <p
              style={{
                fontSize: '0.94rem',
                color: '#cbd5e1',
                lineHeight: 1.6,
                margin: 0
              }}
            >
              Laurent G-M Manouaba réalise des études prospectives et des benchmarks confidentiels pour les conseils d'administration et comités de direction.
            </p>
          </div>

          <button
            onClick={() => onOpenBooking({
              subject: "Commande d'une Étude ou Veille Stratégique Dédiée",
              planName: "Étude Technologique / Veille Dédiée",
              initialPrice: "Sur Devis Personnalisé",
              whatsappPayload: "Bonjour Laurent, nous souhaitons solliciter votre cabinet pour une étude technologique approfondie / note de veille stratégique dédiée à notre secteur. Pouvons-nous échanger sur le cahier des charges ?"
            })}
            className="btn btn-whatsapp"
          >
            <MessageSquare size={16} />
            <span>Solliciter une étude directement</span>
          </button>
        </div>
      </div>
    </div>
  );
}
