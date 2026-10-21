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
import { useLanguage } from '../i18n/LanguageContext';

export function BlogPage({ onOpenBooking }) {
  const { lang, t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const isEn = lang === 'en';
  const isPt = lang === 'pt';

  const categories = isEn ? [
    { id: 'all', label: 'All Publications' },
    { id: 'ia', label: 'Artificial Intelligence' },
    { id: 'blockchain', label: 'Blockchain & Cryptography' },
    { id: 'strategie', label: 'Management & Strategy' },
    { id: 'organisation', label: 'Organizational Sciences' },
    { id: 'infrastructure', label: 'Infrastructure & Resilience' }
  ] : isPt ? [
    { id: 'all', label: 'Todas as Publicações' },
    { id: 'ia', label: 'Inteligência Artificial' },
    { id: 'blockchain', label: 'Blockchain & Criptografia' },
    { id: 'strategie', label: 'Gestão & Estratégia' },
    { id: 'organisation', label: 'Ciências Organizacionais' },
    { id: 'infrastructure', label: 'Infraestrutura & Soberania' }
  ] : [
    { id: 'all', label: 'Toutes les publications' },
    { id: 'ia', label: 'Intelligence Artificielle' },
    { id: 'blockchain', label: 'Blockchain & Cryptographie' },
    { id: 'strategie', label: 'Management & Stratégie' },
    { id: 'organisation', label: 'Sciences de l\'Organisation' },
    { id: 'infrastructure', label: 'Infrastructures & Souveraineté' }
  ];

  const articles = isEn ? [
    {
      id: "virus-ia",
      categoryKey: "ia",
      category: "Artificial Intelligence & Strategic Foresight",
      date: "April 22, 2023",
      readTime: "5 min read",
      lead: true,
      image: "/assets/ai-executive-lead.jpg",
      title: "Beware the Artificial Intelligence 'Virus': Understanding the Shift Without Panicking",
      intro: "An essential historical perspective to look beyond media hype and identify true, high-ROI AI enterprise use cases.",
      abstract: "Artificial intelligence was not born yesterday with ChatGPT. Between uncritical hype and anxious rejection, corporate executives must isolate genuine profitability drivers from mere marketing novelties. This research paper traces AI milestones since its formal inception and outlines a sober, sovereign integration framework.",
      history: [
        { year: "1943", desc: "Warren McCulloch & Walter Pitts model the first formal artificial neurons." },
        { year: "1956", desc: "The Dartmouth Conference and the official birth of AI as an academic discipline." },
        { year: "1950-1990", desc: "Expert systems, fuzzy logic, and early multilayer neural networks." },
        { year: "2000-2010", desc: "Statistical voice recognition and statistical machine translation." },
        { year: "2010 to Present", desc: "The Deep Learning revolution and the rise of foundational generative models." }
      ],
      keyTakeaway: "For an operating enterprise, the immediate challenge is not training giant foundation models from scratch, but intelligently automating value extraction from proprietary internal data while safeguarding trade secrets.",
      sectors: "B2B Services, manufacturing, banking, public sector administration",
      whatsappPayload: "Hello, I read your research whitepaper on Artificial Intelligence ('Beware the AI Virus'). I would like to explore concrete data automation and monetization opportunities for our organization."
    },
    {
      id: "bitcoin-blockchain",
      categoryKey: "blockchain",
      category: "Blockchain & Cryptography",
      date: "April 23, 2023",
      readTime: "4 min read",
      image: "/assets/code-screen.jpg",
      title: "Bitcoin is a Technological Tour de Force: What Businesses Must Take Away",
      intro: "Presenting Bitcoin as an authentic cryptographic breakthrough: creating absolute non-duplicable digital scarcity constitutes a monumental paradigm shift for economic systems.",
      abstract: "Beyond volatile market speculation, the architecture designed in 2008 solves the fundamental Byzantine Generals Problem: coordinating decentralized economic actors without requiring a centralized trusted third party. For enterprises, concrete applications span ledger resilience, global supply chain provenance, and irrevocable contract automation.",
      keyTakeaway: "Blockchain solves 5 core challenges: tamper-proof security, verifiable transparency, disintermediated efficiency, industrial traceability, and contractual automation.",
      sectors: "Finance & FinTech, real estate, international logistics, pharmaceuticals",
      whatsappPayload: "Hello, following your publication on Bitcoin and blockchain architectures, I would like to discuss potential industrial applications (traceability, smart contracts, decentralization) for our operations."
    },
    {
      id: "quand-consulter",
      categoryKey: "strategie",
      category: "Management & Strategy",
      date: "April 21, 2023",
      readTime: "4 min read",
      image: "/assets/strategic-audit.jpg",
      title: "Hiring an External Advisory Firm: When Exactly Should You Take the Step?",
      intro: "Digital modernization is not an IT gadget but a comprehensive profitability driver: operational efficiency, service excellence, margin expansion, and organizational agility.",
      abstract: "Many companies wait until an open crisis or severe budget overrun erupts before seeking outside perspective. Yet the highest yield of multidisciplinary consulting occurs upstream, at the weak-signals stage: when profitability erodes despite full order books, or when a sudden technological pivot triggers executive paralysis.",
      keyTakeaway: "The optimal time to engage advisory counsel is before the crisis: as soon as the cost of inaction or misdirection vastly exceeds the fee of an independent strategic scoping mandate.",
      sectors: "Growth-stage SMBs, family corporate groups, fast-scaling startups",
      whatsappPayload: "Hello, your analysis regarding the right moment to engage external strategic counsel resonates strongly with our current operational situation. Could we schedule a discovery call?"
    },
    {
      id: "eustress-organisation",
      categoryKey: "organisation",
      category: "Organizational Sciences",
      date: "May 15, 2023",
      readTime: "6 min read",
      image: "/assets/eustress-team.jpg",
      title: "Transforming Workplace Stress into 'Eustress' for Sustainable Innovation",
      intro: "Why 70% of enterprise technology transformation initiatives fail not due to software bugs, but because of toxic distress and psychological resistance within operational teams.",
      abstract: "Technological shifts place massive cognitive burdens on staff. When unmanaged, this pressure morphs into distress (passive friction, turnover, loss of focus). Conversely, when channeled under the principles of eustress—stimulating, constructive stress—it becomes the single most potent catalyst for collective adoption.",
      keyTakeaway: "Technical architecture is sterile without psychological alignment. Lasting modernization requires engineering workflows around the human ecology of teams.",
      sectors: "Executive Leadership, HR directors, operational managers, project leaders",
      whatsappPayload: "Hello, I was deeply interested in your methodology regarding organizational eustress during technology transformations. How do you intervene on the human alignment dimension of our teams?"
    },
    {
      id: "souverainete-resilience",
      categoryKey: "infrastructure",
      category: "Infrastructure & Resilience",
      date: "June 8, 2023",
      readTime: "5 min read",
      image: "/assets/workshop-meeting.jpg",
      title: "Digital Sovereignty and Systems Resilience in Emerging Markets",
      intro: "How to engineer fault-tolerant, offline-first data architectures that withstand connectivity outages while strictly upholding local sovereignty regulations.",
      abstract: "Regional enterprises face unique operational realities: international bandwidth instability, high transit costs, and stringent regulatory demands. This study lays out the blueprint for a hybrid offline-first architecture capable of preserving critical workflows continuously without data loss.",
      keyTakeaway: "True technological modernity does not mean blindly replicating Silicon Valley cloud setups, but building resilient systems capable of operating under demanding local field realities.",
      sectors: "FinTech & Mobile Money, supply chain, port logistics, telecom networks",
      whatsappPayload: "Hello, your whitepaper on digital sovereignty and infrastructural resilience in emerging markets aligns directly with our technical roadmap. Let's schedule an architectural briefing."
    }
  ] : isPt ? [
    {
      id: "virus-ia",
      categoryKey: "ia",
      category: "Inteligência Artificial & Tendências",
      date: "22 de abril de 2023",
      readTime: "5 min de leitura",
      lead: true,
      image: "/assets/ai-executive-lead.jpg",
      title: "Cuidado com o « Vírus » da Inteligência Artificial: Compreender a Mudança Sem Pânico",
      intro: "Uma perspectiva histórica indispensável para superar o ruído publicitário e identificar o valor real da IA para a sua empresa.",
      abstract: "A inteligência artificial não começou com o ChatGPT. Entre o entusiasmo cego e o receio infundado, os líderes devem distinguir os casos de uso de alto retorno sobre investimento das meras modas comerciais. Este estudo revisita a evolução da IA e propõe um modelo metodológico de integração sustentável e soberano.",
      history: [
        { year: "1943", desc: "Warren McCulloch & Walter Pitts modelam os primeiros neurônios artificiais." },
        { year: "1956", desc: "Conferência de Dartmouth e surgimento oficial da disciplina de IA." },
        { year: "1950-1990", desc: "Sistemas especialistas, lógica difusa e primeiras redes neurais multicamadas." },
        { year: "2000-2010", desc: "Reconhecimento de fala estatístico e tradução computacional." },
        { year: "2010 até hoje", desc: "Revolução do Deep Learning e surgimento de grandes modelos generativos." }
      ],
      keyTakeaway: "Para uma empresa, o desafio urgente não é desenvolver modelos gigantescos, mas extrair valor concreto e imediato dos seus próprios dados internos, protegendo seus segredos comerciais.",
      sectors: "Serviços B2B, indústria de manufatura, bancos, gestão pública",
      whatsappPayload: "Olá, li seu artigo de pesquisa sobre Inteligência Artificial ('Cuidado com o vírus da IA'). Gostaria de conversar sobre oportunidades de automação e rentabilidade de dados para nossa empresa."
    },
    {
      id: "bitcoin-blockchain",
      categoryKey: "blockchain",
      category: "Blockchain & Criptografia",
      date: "23 de abril de 2023",
      readTime: "4 min de leitura",
      image: "/assets/code-screen.jpg",
      title: "O Bitcoin é um Feito Tecnológico: O Que as Organizações Devem Aprender com Ele",
      intro: "Apresenta o Bitcoin como uma autêntica conquista criptográfica: criar escassez digital absoluta sem intermediários é uma ruptura profunda na história econômica.",
      abstract: "Além das oscilações especulativas, a arquitetura criada em 2008 soluciona o clássico problema dos generais bizantinos: coordenar agentes econômicos independentes sem exigir autoridade central. Para as corporações, os ganhos tangíveis residem na resiliência de registros, rastreabilidade logística e automação contratual segura.",
      keyTakeaway: "A tecnologia blockchain supera 5 barreiras estruturais: segurança inviolável, transparência auditável, eficiência desintermediada, rastreabilidade industrial e contratos autônomos.",
      sectors: "Finanças & FinTech, mercado imobiliário, comércio exterior, saúde",
      whatsappPayload: "Olá, após ler sua publicação sobre Bitcoin e arquiteturas blockchain, gostaria de avaliar aplicações concretas (rastreabilidade, smart contracts, descentralização) para nosso setor."
    },
    {
      id: "quand-consulter",
      categoryKey: "strategie",
      category: "Gestão & Estratégia",
      date: "21 de abril de 2023",
      readTime: "4 min de leitura",
      image: "/assets/strategic-audit.jpg",
      title: "Contratar uma Consultoria para o Seu Negócio: Em Que Momento Exato Agir?",
      intro: "A transformação digital não é mero capricho de TI, mas uma alavanca global de lucratividade (eficiência de custos, qualidade e expansão de mercado).",
      abstract: "Muitas empresas só procuram apoio externo no auge de crises operacionais. No entanto, o retorno máximo de uma consultoria multidisciplinar ocorre preventivamente, ao notar os primeiros sinais: quando a rentabilidade cai apesar das vendas cheias, ou quando uma inovação tecnológica gera paralisia de decisão.",
      keyTakeaway: "O momento ideal para contratar consultoria é prévio à crise: assim que o custo de errar ou postergar a decisão supera em muito o investimento de um enquadramento estratégico independente.",
      sectors: "PMEs em crescimento, grupos corporativos familiares, startups em escala",
      whatsappPayload: "Olá, sua análise sobre o momento ideal para contratar consultoria externa reflete com precisão nossa situação atual. Poderíamos agendar uma conversa inicial?"
    },
    {
      id: "eustress-organisation",
      categoryKey: "organisation",
      category: "Ciências Organizacionais",
      date: "15 de maio de 2023",
      readTime: "6 min de leitura",
      image: "/assets/eustress-team.jpg",
      title: "Transformar o Estresse Corporativo em 'Eustress' para Inovar com Sustentabilidade",
      intro: "Por que 70% das modernizações tecnológicas falham não por falha de software, mas pelo estresse desestruturado e bloqueio emocional das equipes.",
      abstract: "As mudanças digitais impõem sobrecarga cognitiva extrema. Se não administrada, transforma-se em desmotivação e rotatividade. Em contrapartida, canalizada pelos princípios do eustress — a tensão positiva e mobilizadora —, converte-se no maior motor de engajamento coletivo.",
      keyTakeaway: "A engenharia técnica é inútil sem harmonia humana. Modernizar exige projetar os novos processos respeitando a ecologia psicológica dos colaboradores.",
      sectors: "Diretorias Executivas, RH, gestores de operações e líderes de projetos",
      whatsappPayload: "Olá, achei muito enriquecedora sua abordagem de eustress organizacional em transformações tecnológicas. Como vocês atuam na dimensão humana das equipes?"
    },
    {
      id: "souverainete-resilience",
      categoryKey: "infrastructure",
      category: "Infraestrutura & Soberania",
      date: "8 de junho de 2023",
      readTime: "5 min de leitura",
      image: "/assets/workshop-meeting.jpg",
      title: "Soberania Digital e Resiliência de Infraestruturas Tecnológicas",
      intro: "Como conceber arquiteturas de dados robustas, preparadas para falhas de rede e rigorosamente alinhadas à soberania dos dados.",
      abstract: "As empresas operam sob desafios específicos: oscilações de conectividade internacional, custos elevados de tráfego e exigências regulatórias rigorosas. Este artigo apresenta as diretrizes de arquitetura híbrida 'offline-first' que assegura a continuidade total dos processos críticos.",
      keyTakeaway: "A modernidade autêntica não consiste em copiar cegamente infraestruturas externas, mas em desenvolver sistemas ultra-resilientes adaptados à realidade de campo.",
      sectors: "FinTech, pagamentos móveis, logística, redes e telecomunicações",
      whatsappPayload: "Olá, seu trabalho sobre soberania digital e resiliência de infraestrutura atende diretamente aos desafios da nossa empresa. Vamos agendar uma reunião técnica?"
    }
  ] : [
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
      whatsappPayload: "Bonjour, j'ai lu votre dossier de recherche sur l'Intelligence Artificielle (« Attention au virus de l'IA »). J'aimerais échanger avec vous sur les opportunités concrètes d'automatisation et de valorisation des données pour notre entreprise."
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
      whatsappPayload: "Bonjour, suite à la lecture de votre publication sur Bitcoin et la blockchain, j'aimerais explorer avec vous les applications potentielles (traçabilité, smart contracts, décentralisation) pour nos activités."
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
      whatsappPayload: "Bonjour, votre analyse sur le moment opportun pour faire appel à un consultant a particulièrement résonné avec la situation actuelle de notre entreprise. Pouvons-nous convenir d'un échange découverte ?"
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
      whatsappPayload: "Bonjour, j'ai été très intéressé par votre approche de l'eustress organisationnel dans la transformation numérique. Comment intervenez-vous concrètement sur la dimension humaine de nos équipes ?"
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
      whatsappPayload: "Bonjour, votre travail sur la souveraineté numérique et la résilience d'infrastructure en Afrique de l'Ouest correspond directement aux défis de notre structure. Échangeons sur notre schéma directeur."
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
      {/* Page Header */}
      <div className="page-header" style={{ marginBottom: '32px' }}>
        <div className="container">
          <h1 className="page-title">
            {isEn
              ? 'Strategic Research & Technology Analyses'
              : isPt
              ? 'Pesquisas Estratégicas & Artigos Tecnológicos'
              : 'Analyses & Recherches Stratégiques'}
          </h1>
          <p className="page-description">
            {isEn
              ? 'Policy briefings, technology state-of-the-art reports, and empirical field feedback from our advisory practice.'
              : isPt
              ? 'Notas de orientação, estudos do estado da arte e análises práticas de campo da nossa consultoria.'
              : "Notes d'orientation, états de l'art technologiques et retours d'expérience terrain de notre cabinet."}
          </p>
        </div>
      </div>

      <div className="container" style={{ maxWidth: '1040px', paddingBottom: '90px' }}>
        {/* Minimalist Search & Filter Navigation */}
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
              placeholder={
                isEn
                  ? "Search by concept, keyword, or technology (AI, Bitcoin, profitability, eustress)..."
                  : isPt
                  ? "Pesquisar por conceito, palavra-chave ou tecnologia (IA, Bitcoin, rentabilidade, eustress)..."
                  : "Rechercher par concept, mot-clé ou technologie (IA, Bitcoin, rentabilité, eustress)..."
              }
              aria-label={isEn ? "Search publications" : isPt ? "Pesquisar publicações" : "Rechercher dans les publications"}
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
                title={isEn ? "Clear" : isPt ? "Limpar" : "Effacer"}
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
                <strong>{filteredArticles.length}</strong>{' '}
                {isEn
                  ? `publication${filteredArticles.length > 1 ? 's' : ''} found`
                  : isPt
                  ? `publicaç${filteredArticles.length > 1 ? 'ões' : 'ão'} encontrada${filteredArticles.length > 1 ? 's' : ''}`
                  : `publication${filteredArticles.length > 1 ? 's' : ''} trouvée${filteredArticles.length > 1 ? 's' : ''}`}
                {searchQuery && <span> {isEn ? 'for' : isPt ? 'para' : 'pour'} « <em>{searchQuery}</em> »</span>}
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
                {isEn ? 'Reset filter' : isPt ? 'Redefinir' : 'Réinitialiser'}
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
              {isEn
                ? `No publication matches « ${searchQuery} »`
                : isPt
                ? `Nenhum artigo corresponde a « ${searchQuery} »`
                : `Aucune étude ne correspond à « ${searchQuery} »`}
            </h2>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginBottom: '20px' }}>
              {isEn
                ? 'Try a different keyword or request a custom executive study directly for your organization.'
                : isPt
                ? 'Tente outra palavra-chave ou solicite um estudo personalizado para sua empresa.'
                : 'Essayez un autre mot-clé ou sollicitez directement une étude sur-mesure pour votre organisation.'}
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="btn btn-outline btn-sm"
            >
              {isEn ? 'View all publications' : isPt ? 'Ver todas as publicações' : 'Voir toutes les publications'}
            </button>
          </div>
        )}

        {/* Featured Editorial Lead Paper */}
        {leadArticle && (
          <section style={{ marginBottom: '56px' }}>
            <div className="editorial-lead">
              {/* Left Column: Narrative & Business Impact */}
              <div>
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
                    {isEn ? 'LGM Senior Advisory Team' : isPt ? 'Equipe de Consultoria LGM' : 'Équipe de Recherche LGM'}
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

                {/* Chronology List */}
                <div style={{ marginBottom: '24px' }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '10px' }}>
                    {isEn ? 'Historical AI Milestones:' : isPt ? 'Marcos Históricos da IA:' : "Jalons historiques de l'IA :"}
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
                  <span>{isEn ? 'Discuss this research' : isPt ? 'Conversar sobre este tema' : 'Échanger sur ce sujet'}</span>
                </button>
              </div>

              {/* Right Column: Clean Editorial Visual */}
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
              {leadArticle
                ? (isEn ? "Strategic Reports & Briefings" : isPt ? "Relatórios & Notas de Orientação" : "Dossiers & Notes d'Orientation")
                : (isEn ? "Matching Publications" : isPt ? "Publicações Correspondentes" : "Publications Correspondantes")}
            </h2>
          </div>
        )}

        {/* Editorial Feed */}
        <div style={{ marginBottom: '60px' }}>
          {standardArticles.map((art) => (
            <article
              key={art.id}
              className="editorial-row"
            >
              {/* Left: Text & Content */}
              <div style={{ flex: 1 }}>
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
                      {isEn ? 'Key Historical Milestones:' : isPt ? 'Marcos Históricos Chave:' : 'Jalons historiques clés :'}
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
                  <strong style={{ color: 'var(--color-brand-primary)' }}>
                    {isEn ? 'Key Takeaway: ' : isPt ? 'Síntese: ' : 'Synthèse : '}
                  </strong>
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
                    <strong>{isEn ? 'Sectors: ' : isPt ? 'Setores: ' : 'Secteurs : '}</strong>{art.sectors}
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
                    <span>{isEn ? 'Discuss this paper' : isPt ? 'Conversar sobre este tema' : 'Échanger sur ce dossier'}</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>

              {/* Right: Clean Thumbnail */}
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

        {/* Minimalist Executive Study Callout */}
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
              {isEn
                ? "Need a Custom Executive Study or Dedicated Technology Benchmark?"
                : isPt
                ? "Necessita de um Estudo Tecnológico Dedicado ou Monitoramento Setorial?"
                : "Besoin d'un État de l'Art ou d'une Veille Stratégique Dédiée ?"}
            </h2>
            <p
              style={{
                fontSize: '0.94rem',
                color: '#cbd5e1',
                lineHeight: 1.6,
                margin: 0
              }}
            >
              {isEn
                ? "Our firm produces confidential prospective studies, architecture benchmarks, and board-level technology roadmaps."
                : isPt
                ? "Nossa consultoria elabora estudos prospectivos confidenciais, auditorias comparativas e roadmaps para diretorias executivas."
                : "Le cabinet réalise des études prospectives et des benchmarks confidentiels pour les conseils d'administration et comités de direction."}
            </p>
          </div>

          <button
            onClick={() => onOpenBooking({
              subject: isEn
                ? "Request for Dedicated Strategic Benchmark / Study"
                : isPt
                ? "Solicitação de Estudo Tecnológico ou Monitoramento Setorial"
                : "Commande d'une Étude ou Veille Stratégique Dédiée",
              planName: isEn ? "Executive Technology Study" : isPt ? "Estudo Tecnológico Executivo" : "Étude Technologique / Veille Dédiée",
              initialPrice: isEn ? "Custom Scope" : isPt ? "Sob Medida" : "Sur Devis Personnalisé",
              whatsappPayload: isEn
                ? "Hello, we would like to commission a dedicated technology benchmark / strategic briefing for our organization. Can we discuss scope and deliverables?"
                : isPt
                ? "Olá, gostaríamos de solicitar um estudo tecnológico detalhado / relatório estratégico setorial para nossa empresa. Podemos alinhar o escopo?"
                : "Bonjour, nous souhaitons solliciter votre cabinet pour une étude technologique approfondie / note de veille stratégique dédiée à notre secteur. Pouvons-nous échanger sur le cahier des charges ?"
            })}
            className="btn btn-whatsapp"
          >
            <MessageSquare size={16} />
            <span>{isEn ? 'Request an executive study' : isPt ? 'Solicitar estudo executivo' : 'Solliciter une étude directement'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
