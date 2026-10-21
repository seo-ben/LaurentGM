// Données exhaustives issues de la synthèse officielle du cabinet LGM Consulting & Innovations
// Structurées selon les principes de psychologie décisionnelle et de clarté cognitive

export const CONTACT_INFO = {
  name: "LGM Consulting & Innovations",
  title: "Consultant en Innovations Technologiques & Stratégie Opérationnelle",
  tagline: "« La technologie révolutionnaire à la portée de tous »",
  phoneDisplay: "+228 90 44 55 71 / 98 19 17 70",
  whatsappNumber: "22890445571", // Format international sans '+' pour wa.me
  whatsappSecondary: "22898191770",
  email: "Contact@laurentmanouaba.pro",
  address: "AGOE-ZONGO, Rue, LOME; 19BP439, Lomé-TOGO",
  calendly: "https://calendly.com/laurentmanouaba/prise-de-rendez-vous",
  socials: {
    whatsapp: "https://wa.me/22890445571",
    linkedin: "https://www.linkedin.com/in/laurent-g-m-manouaba-33b0901b7/",
    facebook: "https://www.facebook.com/LMGmanouaba",
    twitter: "https://twitter.com/maucinguo"
  }
};

export const METRICS = [
  { value: "24 000+", label: "Bénéficiaires & Utilisateurs", sub: "Projets et initiatives accompagnés" },
  { value: "240+", label: "Sujets de Recherche Explorés", sub: "R&D, modélisation et data science" },
  { value: "67+", label: "Experts dans le Réseau Actif", sub: "Partenaires pluridisciplinaires" },
  { value: "100%", label: "Approche Terrain Personnalisée", sub: "Zéro jargon, 100% faisabilité" }
];

export const PILLARS = [
  { id: "all", name: "Tous les Domaines (12)" },
  { id: "ia-data", name: "Intelligence Artificielle & Data (4)" },
  { id: "deep-tech", name: "Deep Tech & R&D de Rupture (4)" },
  { id: "strategie", name: "Stratégie & Performance Industrielle (4)" }
];

export const SERVICES = [
  {
    id: 1,
    title: "Intelligence Artificielle & Machine Learning",
    pillar: "ia-data",
    tag: "IA & Modélisation",
    shortDesc: "Reconnaissance vocale, traitement automatique du langage naturel, algorithmes d'aide à la décision et prédictions métier fiables.",
    fullDesc: "Intégration pragmatique d'algorithmes d'apprentissage automatique supervisé et non-supervisé pour transformer vos processus décisionnels en moteurs prédictifs ultra-rapides.",
    deliverable: "Audit de faisabilité IA, sélection du modèle adapté (LLM, vision, séries temporelles) et intégration sur-mesure dans vos outils de production.",
    target: "PME et grands comptes souhaitant dépasser le simple effet d'annonce pour des gains mesurables de productivité."
  },
  {
    id: 2,
    title: "Datafication & Traitement Massif",
    pillar: "ia-data",
    tag: "Big Data & Pipelines",
    shortDesc: "Captation, structuration et valorisation de la croissance exponentielle des données produites par vos machines et vos équipes.",
    fullDesc: "Transformation du patrimoine brut de votre entreprise en tableaux de bord stratégiques et flux exploitables, en éliminant les silos d'information.",
    deliverable: "Architecture de données unifiée, pipelines automatisés et conformité rigoureuse RGPD / protection de la vie privée.",
    target: "Entreprises submergées de données éparses nécessitant une vision centralisée infaillible."
  },
  {
    id: 3,
    title: "Étude & Prédiction sur l'Influence du Marché",
    pillar: "ia-data",
    tag: "Analyse Prédictive",
    shortDesc: "Modélisation de l'adoption par les consommateurs, dynamique de l'offre et de la demande et cartographie de la structure concurrentielle.",
    fullDesc: "Utilisation des sciences de la donnée et des lois de marché pour anticiper les retournements de cycle économique avant vos concurrents.",
    deliverable: "Rapport prospectif quantifié, scoring d'adoption consommateur et simulation de scénarios de lancement.",
    target: "Porteurs de projets et directions générales préparant un investissement stratégique."
  },
  {
    id: 4,
    title: "Réalité Augmentée & Interfaces Immersives",
    pillar: "ia-data",
    tag: "Immersif",
    shortDesc: "Superposition en temps réel d'éléments virtuels au monde réel pour la maintenance industrielle, la formation et le commerce.",
    fullDesc: "Création d'expériences interactives augmentées qui réduisent le taux d'erreur opérationnel et démultiplient l'engagement utilisateur.",
    deliverable: "Cahier des charges technique, sélection des frameworks AR et prototypage rapide d'usage terrain.",
    target: "Secteurs BTP, industrie manufacturière, logistique et e-commerce premium."
  },
  {
    id: 5,
    title: "Informatique Quantique & Simulation",
    pillar: "deep-tech",
    tag: "Futur Technologique",
    shortDesc: "Anticipation des ruptures en optimisation combinatoire, cryptographie post-quantique, chimie computationnelle et simulation.",
    fullDesc: "Préparation de vos systèmes d'information aux architectures quantiques hybrides et sécurisation préventive contre les algorithmes de déchiffrement quantique.",
    deliverable: "Veille technologique ciblée, roadmap d'adaptation cryptographique et identification des cas d'usage à haute valeur.",
    target: "Banques, assurances, santé pharmaceutique et secteurs sous contraintes critiques de souveraineté."
  },
  {
    id: 6,
    title: "Appareils Plus Intelligents & IoT",
    pillar: "deep-tech",
    tag: "Objets Connectés",
    shortDesc: "Déploiement d'écosystèmes d'objets connectés et de capteurs communicants pour le monitoring et la télémétrie en temps réel.",
    fullDesc: "Connexion de votre matériel physique au cloud pour automatiser la maintenance, réduire les temps d'arrêt et piloter vos actifs à distance.",
    deliverable: "Spécification électronique et réseau (LoRa, MQTT, 5G), protocole de sécurité IoT et interface de supervision.",
    target: "Exploitants d'infrastructures, agriculture connectée, transport et gestionnaires de parcs industriels."
  },
  {
    id: 7,
    title: "Puissance Informatique & Calcul Distribué",
    pillar: "deep-tech",
    tag: "Infrastructures Cloud",
    shortDesc: "Optimisation des capacités de stockage et calcul haute performance (HPC) pour un traitement instantané des volumes massifs.",
    fullDesc: "Dimensionnement des architectures cloud, hybrides ou on-premise pour garantir une scalabilité absolue au meilleur coût d'exploitation.",
    deliverable: "Audit de dimensionnement des serveurs, plan de réduction de la facture cloud et sécurisation des clusters.",
    target: "Équipes techniques confrontées à des goulots d'étranglement de calcul ou des surcoûts d'infrastructure."
  },
  {
    id: 8,
    title: "Innovation de Rupture (Disruptive)",
    pillar: "deep-tech",
    tag: "Rupture de Marché",
    shortDesc: "Création de valeur à partir du décalage entre les offres traditionnelles et les besoins réels émergents des usagers.",
    fullDesc: "Identification des angles morts des acteurs dominants pour concevoir une proposition de valeur plus agile, accessible et irrésistible.",
    deliverable: "Diagnostic de rupture, matrice d'opportunités sous-exploitées et feuille de route de mise sur le marché.",
    target: "Challengers et visionnaires voulant redéfinir les règles de leur secteur."
  },
  {
    id: 9,
    title: "Étude, Recherche & Résolution Systémique",
    pillar: "strategie",
    tag: "Diagnostic & Solutions",
    shortDesc: "Identification de la cause racine des blocages techniques ou organisationnels à travers des méthodes pluridisciplinaires éprouvées.",
    fullDesc: "Dépassement du simple traitement des symptômes pour éradiquer les inefficacités chroniques de vos systèmes et de vos équipes.",
    deliverable: "Diagnostic d'audit approfondi, 3 scénarios de résolution comparés avec estimation ROI et plan d'exécution.",
    target: "Directions opérationnelles cherchant une solution définitive à un problème technique persistant."
  },
  {
    id: 10,
    title: "Innovation Incrémentale & Amélioration Continue",
    pillar: "strategie",
    tag: "Optimisation de Marge",
    shortDesc: "Perfectionnement graduel et continu de vos produits, services et processus pour maximiser la rentabilité sans risques inconsidérés.",
    fullDesc: "Génération de flux de trésorerie supplémentaires en optimisant la chaîne des achats, la supply-chain et l'expérience client par petites itérations mesurées.",
    deliverable: "Plan d'optimisation par étapes, indicateurs de performance (KPI) et accompagnement des équipes au changement.",
    target: "Entreprises matures souhaitant consolider leur leadership et booster leur marge opérationnelle."
  },
  {
    id: 11,
    title: "Innovation Adjacente & Nouveaux Territoires",
    pillar: "strategie",
    tag: "Expansion Commerciale",
    shortDesc: "Transposition d'une expertise ou d'un produit existant vers un nouveau marché, ou greffe d'un nouveau service sur votre clientèle captive.",
    fullDesc: "Croissance rapide à investissement maîtrisé en exploitant vos actifs déjà rentabilisés sur des segments connexes inexplorés.",
    deliverable: "Étude d'accessibilité de marché, matrice de transposition de compétences et plan de go-to-market.",
    target: "PME et ETI en quête de nouveaux relais de croissance rentables."
  },
  {
    id: 12,
    title: "Innovation Radicale & Création de Catégorie",
    pillar: "strategie",
    tag: "Nouveaux Marchés",
    shortDesc: "Conception de produits et services pionniers sans équivalent direct sur le marché, ouvrant un océan bleu concurrentiel.",
    fullDesc: "Structuration complète de la phase d'idéation jusqu'au brevetage et prototypage de technologies totalement inédites.",
    deliverable: "Dossier d'ingénierie et de faisabilité, modélisation économique et stratégie de protection intellectuelle.",
    target: "Startups deep-tech, laboratoires de R&D et consortiums d'innovation."
  }
];

export const SECTORS = [
  { name: "Santé & Biomédical", icon: "Activity", detail: "Télémédecine, dispositifs connectés, sécurisation des dossiers patients" },
  { name: "Banque & Finance", icon: "CreditCard", detail: "Cryptographie, détection de fraude, smart contracts et scoring IA" },
  { name: "Agrobusiness", icon: "Sprout", detail: "Agritech, traçabilité des filières agricoles, capteurs connectés et optimisation des rendements" },
  { name: "Transport & Logistique", icon: "Truck", detail: "Optimisation de tournées, traçabilité temps réel et maintenance prédictive" },
  { name: "Eduformation", icon: "GraduationCap", detail: "EdTech, plateformes LMS immersives, digitalisation des compétences et formation continue augmentée" },
  { name: "Commerce & Industrie", icon: "ShoppingBag", detail: "Automatisation de la chaîne d'approvisionnement et supply-chain agile" }
];

export const ANNUAL_PLANS = [
  {
    id: "annuel-individu",
    name: "Suivi Physique (Individu)",
    badge: "Indépendants & Créateurs",
    price: "100 $",
    period: "par an",
    recommended: false,
    summary: "Accompagnement continu pour professionnels indépendants, innovateurs solo et porteurs de projet.",
    features: [
      "Évaluation approfondie de votre socle de compétences",
      "Définition d'une stratégie de carrière technologique claire",
      "Suivi trimestriel de vos projets d'innovation personnels",
      "Mise en relation avec le réseau d'experts",
      "Assistance à la budgétisation et recherche d'opportunités",
      "Échanges directs réguliers et visio"
    ],
    ctaText: "Sélectionner le Suivi Individu (100 $/an)",
    whatsappPayload: "Bonjour, je souhaite souscrire au 'Suivi Physique Individu (100 $/an)'. Pouvons-nous valider les prochaines étapes ?"
  },
  {
    id: "annuel-startup",
    name: "Suivi Moral (Petite Entreprise)",
    badge: "5 employés ou moins",
    price: "200 $",
    period: "par an",
    recommended: false,
    summary: "Idéal pour les startups et très petites entreprises nécessitant une direction technologique externalisée.",
    features: [
      "Analyse de la performance globale de vos processus",
      "Conseil stratégique en choix d'outils et de plateformes",
      "Assistance continue à la mise en place opérationnelle",
      "Montée en compétences de votre noyau d'équipe",
      "Cadrage budgétaire pour éviter les dérapages de coûts",
      "Ligne d'assistance prioritaire pour vos arbitrages techniques"
    ],
    ctaText: "Sélectionner le Suivi Petite Entreprise (200 $/an)",
    whatsappPayload: "Bonjour, je souhaite inscrire mon entreprise de 5 personnes ou moins à votre 'Suivi Moral (200 $/an)'. Discutons de notre projet."
  },
  {
    id: "annuel-pme",
    name: "Suivi Moral (PME en Croissance)",
    badge: "Le Plus Sollicité ★",
    price: "600 $",
    period: "par an",
    recommended: true,
    summary: "Le partenariat annuel stratégique le plus plébiscité par les entreprises de 5 à 15 collaborateurs.",
    features: [
      "Audit régulier de votre gouvernance des données et conformité",
      "Feuille de route d'intégration de l'IA adaptée à votre métier",
      "Optimisation de la marge opérationnelle et chaîne logistique",
      "Évaluation continue de la performance des collaborateurs",
      "Assistance à la négociation avec vos prestataires tech",
      "Accès direct au réseau de 67+ partenaires spécialisés",
      "Accompagnement psychologique du changement (gestion de l'eustress)"
    ],
    ctaText: "Activer le Suivi PME Recommandé (600 $/an)",
    whatsappPayload: "Bonjour, nous souhaitons engager notre PME (5 à 15 collaborateurs) sur votre formule 'Suivi Moral PME (600 $/an)'. Quels sont vos créneaux pour le cadrage ?"
  }
];

export const SPOT_PLANS = [
  {
    id: "consult-basic",
    name: "Consultance Basic",
    badge: "Idéation & Validation",
    price: "90 $",
    period: "mission ponctuelle",
    recommended: false,
    duration: "1 h d'appel + 48 h d'assistance d'étude",
    summary: "Idéal pour valider la viabilité d'une idée ou débloquer une impasse technique immédiate.",
    features: [
      "1 heure d'entretien stratégique approfondi",
      "48 heures d'assistance et d'analyse documentaire dédiée",
      "Schéma directeur d'orientation technologique",
      "Étude comparative de 2 à 3 scénarios de résolution",
      "Recommandation des axes prioritaires et estimation budgétaire"
    ],
    ctaText: "Réserver la Consultance Basic (90 $)",
    whatsappPayload: "Bonjour, je souhaite réserver la formule 'Consultance Basic (90 $)'. Mon projet est en phase d'idée/cadrage. Quand pouvons-nous planifier l'appel ?"
  },
  {
    id: "consult-business",
    name: "Consultance Business",
    badge: "Entreprise Locale ★",
    price: "490 $",
    period: "mission ponctuelle",
    recommended: true,
    duration: "3 h d'appels + 168 h (1 sem.) d'assistance",
    summary: "Diagnostic complet de l'existant, cadrage stratégique et plan d'action opérationnel.",
    features: [
      "3 heures d'ateliers stratégiques personnalisés",
      "168 heures d'assistance d'étude et d'investigation terrain",
      "Critique méthodique de vos systèmes et blocages actuels",
      "Élaboration des scénarios d'évolution et trajectoire ROI",
      "Cadrage des investissements et budgétisation prévisionnelle",
      "Rapport exécutif prêt pour présentation au conseil ou investisseurs"
    ],
    ctaText: "Activer la Consultance Business (490 $)",
    whatsappPayload: "Bonjour, je souhaite activer le pack 'Consultance Business (490 $)' pour notre structure. Pouvons-nous convenir d'un premier point ?"
  },
  {
    id: "consult-premium",
    name: "Consultance Premium",
    badge: "Envergure Internationale",
    price: "2 000 $",
    period: "mission de fond",
    recommended: false,
    duration: "24 h d'appels + 336 h (2 sem.) d'étude intensive",
    summary: "Intervention d'élite pour projets stratégiques critiques, restructuration ou lancement d'envergure.",
    features: [
      "24 heures d'ateliers et de sessions de travail avec vos directions",
      "336 heures d'immersion analytique et d'investigation poussée",
      "Analyse exhaustive des insuffisances structurelles et failles",
      "Intégration technologique adéquate (IA, Cloud, Process)",
      "Négociation des offres fournisseurs et suivi du déploiement",
      "Planification financière complète et gestion des risques"
    ],
    ctaText: "Solliciter la Consultance Premium (2 000 $)",
    whatsappPayload: "Bonjour, je représente une entreprise internationale / projet d'envergure et souhaite solliciter votre pack 'Consultance Premium (2 000 $)'. Quel est votre calendrier de démarrage ?"
  }
];

export const ARTICLES = [
  {
    id: "bitcoin-blockchain",
    date: "23 avril 2023",
    readTime: "4 min de lecture",
    category: "Blockchain & Confiance Numérique",
    title: "Bitcoin est un tour de force technologique : Ce que les entreprises doivent en retenir",
    excerpt: "Pourquoi la véritable prouesse de Satoshi Nakamoto ne réside pas dans la spéculation, mais dans la création de la rareté numérique absolue et de la confiance distribuée sans intermédiaire.",
    keyTakeaway: "La blockchain résout 5 enjeux majeurs : Sécurité inviolable, transparence vérifiable, efficacité sans tiers de confiance, traçabilité industrielle intégrale et automatisation contractuelle (smart contracts)."
  },
  {
    id: "virus-ia",
    date: "22 avril 2023",
    readTime: "5 min de lecture",
    category: "Prospective & IA",
    title: "Attention au « virus » de l'intelligence artificielle : Comprendre l'évolution sans céder à la panique",
    excerpt: "De la formalisation du neurone artificiel en 1943 à Dartmouth en 1956, jusqu'à l'explosion du deep learning post-2010 : repères historiques pour dompter l'IA sans se laisser dévorer par l'illusion publicitaire.",
    keyTakeaway: "Pour une PME, l'enjeu immédiat n'est pas de créer un modèle géant, mais d'automatiser intelligemment l'extraction de valeur dans ses données internes tout en protégeant ses secrets d'affaires."
  },
  {
    id: "quand-consulter",
    date: "21 avril 2023",
    readTime: "4 min de lecture",
    category: "Management Stratégique",
    title: "Faire appel à un consultant pour son entreprise : À quel moment précis franchir le pas ?",
    excerpt: "Comment identifier le seuil critique où l'intervention d'un regard extérieur pluridisciplinaire vous fait économiser 10 fois son coût en erreurs évitées et opportunités débloquées.",
    keyTakeaway: "Le bon moment se produit quand vos marges s'effritent malgré la hausse de charge de travail, ou quand un saut technologique (IA, Cloud) menace votre pertinence sans que vos équipes n'aient le recul pour l'exécuter sereinement."
  }
];

export const FAQ_ITEMS = [
  {
    q: "Comment se déroule la prise de rendez-vous et le premier contact ?",
    a: "La réservation d'une session de cadrage stratégique (consultation payante) s'effectue directement via notre module en ligne. Vous sélectionnez votre domaine d'intervention et créneau souhaité, puis finalisez la réservation avec confirmation immédiate et règlement sécurisé en ligne."
  },
  {
    q: "Pourquoi privilégier la messagerie directe plutôt que par e-mail ?",
    a: "La sociologie de la décision nous montre que les échanges par e-mail subissent des délais de friction inutiles (boîtes spams, formalisme excessif). La messagerie instantanée garantit un contact humain immédiat, direct avec le cabinet, permettant de partager rapidement vos documents préparatoires ou messages vocaux de cadrage."
  },
  {
    q: "Qu'est-ce qui différencie votre cabinet d'un cabinet de conseil classique ?",
    a: "Une approche 'locale dans une démarche globale' sans jargon théorique : notre cabinet combine une formation d'ingénierie technique (électricité, génie des procédés, data, électronique) avec une culture du terrain et de la rentabilité. Nous ne produisons pas des rapports de 200 pages destinés à un tiroir, mais des schémas directeurs concrets et immédiatement applicables."
  },
  {
    q: "Vos missions s'effectuent-elles à distance ou en présentiel ?",
    a: "Les deux modes sont pratiqués en toute fluidité : les missions peuvent être conduites intégralement à distance (visio haute définition, échanges directs, espaces partagés sécurisés) partout dans le monde, ou en immersion présentielle à Lomé, dans la sous-région ou à l'international selon l'envergure du mandat."
  },
  {
    q: "Comment garantissez-vous la confidentialité de nos données stratégiques ?",
    a: "La confidentialité et l'éthique font partie des 5 piliers cardinaux du cabinet (conformité stricte aux standards RGPD, accords de non-divulgation NDA systématiques avant toute consultation approfondie, et isolation hermétique des données clients)."
  }
];

export const REALISATION_CATEGORIES = [
  { id: "all", label: "Toutes les Réalisations" },
  { id: "ateliers", label: "Ateliers & Masterclasses" },
  { id: "conferences", label: "Conférences & Keynotes" },
  { id: "audits", label: "Audits & Stratégie" },
  { id: "rd-tech", label: "R&D & Deep Tech" }
];

export const REALISATIONS = [
  {
    id: "realisation-1",
    title: "Atelier Stratégique & Masterclass IA Générative",
    category: "ateliers",
    categoryLabel: "Ateliers & Formations",
    image: "/assets/realisations/realisation-1.jpg",
    location: "Lomé, Togo",
    date: "2023 - 2024",
    client: "Cadres Décisionnaires & Dirigeants de PME",
    shortDesc: "Animation d'un atelier exécutif interactif dédié à l'intégration concrète de l'IA dans les processus métiers.",
    impact: "45+ cadres formés • 3 cas d'usage déployés en 30 jours"
  },
  {
    id: "realisation-2",
    title: "Conférence Prospective : Technologies de Rupture & Économie Africaine",
    category: "conferences",
    categoryLabel: "Conférences & Keynotes",
    image: "/assets/realisations/realisation-2.jpg",
    location: "Forum Régional de l'Innovation",
    date: "2023",
    client: "Écosystème Entrepreneuriat & Investisseurs",
    shortDesc: "Keynote plénière sur les opportunités concrètes offertes par l'IA, la blockchain et l'informatique quantique.",
    impact: "300+ participants • Retombées presse et partenariats créés"
  },
  {
    id: "realisation-3",
    title: "Architecture Deep Tech & Ingénierie des Modèles IA",
    category: "rd-tech",
    categoryLabel: "R&D & Deep Tech",
    image: "/assets/realisations/realisation-3.jpg",
    location: "Laboratoire R&D",
    date: "2024",
    client: "Projet d'Innovation Deep Tech",
    shortDesc: "Recherche appliquée sur les réseaux de neurones, vision par ordinateur et modèles prédictifs adaptés au terrain.",
    impact: "99.4% de précision algorithmique • Souveraineté des données"
  },
  {
    id: "realisation-4",
    title: "Session de Recherche & Modélisation R&D Approfondie",
    category: "rd-tech",
    categoryLabel: "R&D & Deep Tech",
    image: "/assets/realisations/realisation-4.jpg",
    location: "Laboratoire R&D LGM Consulting",
    date: "2024",
    client: "Études Stratégiques Internes",
    shortDesc: "Immersion analytique, revue d'architectures logicielles et modélisation de solutions algorithmiques sur-mesure.",
    impact: "240+ sujets de recherche explorés et documentés"
  },
  {
    id: "realisation-5",
    title: "Audit Stratégique & Optimisation de Marge Opérationnelle",
    category: "audits",
    categoryLabel: "Audits & Stratégie",
    image: "/assets/realisations/realisation-5.jpg",
    location: "Sous-région Ouest-Africaine",
    date: "2023",
    client: "PME & Directions Générales",
    shortDesc: "Diagnostic de performance opérationnelle, analyse de rentabilité et restructuration des flux de production.",
    impact: "+35% de marge opérationnelle dégagée en 6 mois"
  },
  {
    id: "realisation-6",
    title: "Développement & Supervision des Architectures Logicielles",
    category: "rd-tech",
    categoryLabel: "R&D & Deep Tech",
    image: "/assets/realisations/realisation-6.jpg",
    location: "Lomé & International",
    date: "2024",
    client: "Fintech & Plateformes Web",
    shortDesc: "Déploiement de micro-services scalables, conteneurisation sécurisée et pipelines de données automatisés.",
    impact: "Temps de calcul divisé par 4 • Réduction facture cloud -28%"
  },
  {
    id: "realisation-7",
    title: "Accompagnement Terrain & Conseil Exécutif Personnalisé",
    category: "audits",
    categoryLabel: "Audits & Stratégie",
    image: "/assets/realisations/realisation-7.jpg",
    location: "Lomé, Togo",
    date: "2023 - 2024",
    client: "Entreprises & Porteurs de Projets",
    shortDesc: "Séances de travail en présentiel et mentorat stratégique pour l'arbitrage des investissements technologiques critiques.",
    impact: "100% de missions délivrées à terme sans dépassement budgétaire"
  },
  {
    id: "realisation-8",
    title: "Management de l'Eustress & Conduite du Changement en Équipe",
    category: "ateliers",
    categoryLabel: "Ateliers & Formations",
    image: "/assets/realisations/realisation-8.jpg",
    location: "Séminaire d'Entreprise",
    date: "2023",
    client: "Équipes Techniques & Chefs de Projet",
    shortDesc: "Accompagnement psychologique et organisationnel pour transformer le stress en force motrice positive.",
    impact: "100% d'adhésion des équipes • Climat social consolidé"
  }
];


