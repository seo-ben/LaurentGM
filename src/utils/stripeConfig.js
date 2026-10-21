/**
 * Gestionnaire de configuration Stripe pour le cabinet LGM Consulting
 * Permet de configurer la clé Stripe soit via .env (VITE_STRIPE_PUBLISHABLE_KEY),
 * soit directement depuis le Studio Admin (stockage persistant localStorage).
 */

const STORAGE_KEY = 'lgm_stripe_config';

const DEFAULT_CONFIG = {
  publishableKey: '',
  secretKeyConfigured: false,
  paymentLinkUrl: '', // Configurable via .env (VITE_STRIPE_PAYMENT_LINK) ou Admin
  appointmentPrice: 90, // Tarif par défaut d'une prise de RDV / consultation (90 $)
  currency: 'USD',
  currencySymbol: '$',
  appointmentDuration: '1 heure de cadrage stratégique + 48h de suivi',
  mode: 'live',
  enabled: true
};

/**
 * Récupère la configuration Stripe active en priorité depuis le .env
 */
export function getStripeConfig() {
  const envPublishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '';
  const envPaymentLink = import.meta.env.VITE_STRIPE_PAYMENT_LINK || '';

  if (typeof window === 'undefined') {
    return {
      ...DEFAULT_CONFIG,
      publishableKey: envPublishableKey,
      paymentLinkUrl: envPaymentLink
    };
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const stored = raw ? JSON.parse(raw) : {};
    
    // Priorité : stockage admin si personnalisé, sinon variable d'environnement .env
    const publishableKey = (stored.publishableKey && stored.publishableKey.trim()) 
      ? stored.publishableKey 
      : envPublishableKey;

    const paymentLinkUrl = (stored.paymentLinkUrl && stored.paymentLinkUrl.trim().length > 10) 
      ? stored.paymentLinkUrl 
      : envPaymentLink;

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
      publishableKey: envPublishableKey,
      paymentLinkUrl: envPaymentLink
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
