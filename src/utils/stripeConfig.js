/**
 * Gestionnaire de configuration Stripe pour le cabinet LGM Consulting
 * Permet de configurer la clé Stripe soit via .env (VITE_STRIPE_PUBLISHABLE_KEY),
 * soit directement depuis le Studio Admin (stockage persistant localStorage).
 */

const STORAGE_KEY = 'lgm_stripe_config';

// Valeurs de secours en dur (utilisées automatiquement si non trouvées dans le .env)
const FALLBACK_PUBLISHABLE_KEY = 'pk_test_51TBhNB02Ps5pF981HdEeGzZx4flN5fj8wAZ8eqMrlDGDaDQbCdfLKB6t347QcRQlzAP7jocfqM1XEtNQBW2T8YSS00EWyoR3nG';
const FALLBACK_PAYMENT_LINK = 'https://buy.stripe.com/test_bJe14f75JfJC3IqbPZ43S00';

const DEFAULT_CONFIG = {
  publishableKey: FALLBACK_PUBLISHABLE_KEY,
  secretKeyConfigured: false,
  paymentLinkUrl: FALLBACK_PAYMENT_LINK,
  appointmentPrice: 90, // Tarif par défaut d'une prise de RDV / consultation (90 $)
  currency: 'USD',
  currencySymbol: '$',
  appointmentDuration: '1 heure de cadrage stratégique + 48h de suivi',
  mode: 'test',
  enabled: true
};

/**
 * Récupère la configuration Stripe active :
 * 1. Priorité au .env
 * 2. Si non trouvé dans le .env, utilise automatiquement la valeur de secours en dur
 */
export function getStripeConfig() {
  const envPublishableKey = (import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '').trim();
  const envPaymentLink = (import.meta.env.VITE_STRIPE_PAYMENT_LINK || '').trim();

  // Résolution avec fallback automatique
  const activePublishableKey = envPublishableKey || FALLBACK_PUBLISHABLE_KEY;
  const activePaymentLink = (envPaymentLink && envPaymentLink.length > 10) ? envPaymentLink : FALLBACK_PAYMENT_LINK;

  if (typeof window === 'undefined') {
    return {
      ...DEFAULT_CONFIG,
      publishableKey: activePublishableKey,
      paymentLinkUrl: activePaymentLink
    };
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const stored = raw ? JSON.parse(raw) : {};
    
    // Si personnalisé dans l'espace Admin Studio, utilise la valeur stockée,
    // sinon prend la variable .env, sinon le fallback en dur
    const publishableKey = (stored.publishableKey && stored.publishableKey.trim()) 
      ? stored.publishableKey.trim() 
      : activePublishableKey;

    const paymentLinkUrl = (stored.paymentLinkUrl && stored.paymentLinkUrl.trim().length > 10) 
      ? stored.paymentLinkUrl.trim() 
      : activePaymentLink;

    const detectedMode = stored.mode || (publishableKey.startsWith('pk_test_') ? 'test' : 'live');

    return {
      ...DEFAULT_CONFIG,
      ...stored,
      mode: detectedMode,
      publishableKey,
      paymentLinkUrl
    };
  } catch (e) {
    console.error('Erreur lecture configuration Stripe :', e);
    return {
      ...DEFAULT_CONFIG,
      publishableKey: activePublishableKey,
      paymentLinkUrl: activePaymentLink
    };
  }
}

/**
 * Enregistre la configuration Stripe dans localStorage
 */
export function saveStripeConfig(config) {
  if (typeof window === 'undefined') return;
  try {
    const current = getStripeConfig();
    const updated = {
      ...current,
      ...config,
      updatedAt: new Date().toISOString()
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('Erreur sauvegarde configuration Stripe :', e);
    throw e;
  }
}

/**
 * Réinitialise la configuration Stripe
 */
export function resetStripeConfig() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
  return getStripeConfig();
}

/**
 * Vérifie si Stripe est configuré et prêt
 */
export function isStripeConfigured() {
  const config = getStripeConfig();
  return Boolean(
    (config.publishableKey && config.publishableKey.trim().length > 10) ||
    (config.paymentLinkUrl && config.paymentLinkUrl.trim().length > 10)
  );
}
