import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { TRANSLATIONS } from './translations';
import {
  SERVICES_DATA,
  PILLARS_DATA,
  ANNUAL_PLANS_DATA,
  SPOT_PLANS_DATA,
  ARTICLES_DATA,
  FAQ_DATA,
  REALISATIONS_DATA,
  REALISATION_CATEGORIES_DATA,
  METRICS_DATA,
  SECTORS_DATA,
  PAGE_SEO_DATA
} from './contentData';

export const AVAILABLE_LANGUAGES = [
  { code: 'fr', label: 'Français', flag: '🇫🇷', short: 'FR' },
  { code: 'en', label: 'English', flag: '🇺🇸', short: 'EN' },
  { code: 'pt', label: 'Brasil', flag: '🇧🇷', short: 'BR' }
];

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    if (typeof window === 'undefined') return 'fr';
    const saved = localStorage.getItem('lgm_lang');
    if (saved && ['fr', 'en', 'pt'].includes(saved)) {
      return saved;
    }
    const browserLang = (navigator.language || navigator.userLanguage || '').toLowerCase();
    if (browserLang.startsWith('pt')) return 'pt';
    if (browserLang.startsWith('en')) return 'en';
    return 'fr';
  });

  const setLang = (newLang) => {
    if (!['fr', 'en', 'pt'].includes(newLang)) return;
    setLangState(newLang);
    try {
      localStorage.setItem('lgm_lang', newLang);
      document.documentElement.lang = newLang === 'pt' ? 'pt-BR' : newLang;
    } catch (e) {
      console.error('Error saving language:', e);
    }
  };

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang === 'pt' ? 'pt-BR' : lang;
    }
  }, [lang]);

  // Fonction de traduction simple par clé 'section.cle' ou 'cle'
  const t = useMemo(() => {
    const dict = TRANSLATIONS[lang] || TRANSLATIONS.fr;
    return (path, fallback = '') => {
      if (!path) return fallback;
      const parts = path.split('.');
      let current = dict;
      for (const part of parts) {
        if (current && typeof current === 'object' && part in current) {
          current = current[part];
        } else {
          // Fallback sur le dictionnaire français
          let frCurrent = TRANSLATIONS.fr;
          for (const frPart of parts) {
            if (frCurrent && typeof frCurrent === 'object' && frPart in frCurrent) {
              frCurrent = frCurrent[frPart];
            } else {
              return fallback || path;
            }
          }
          return frCurrent;
        }
      }
      return current ?? fallback;
    };
  }, [lang]);

  // Données dynamiques selon la langue active
  const localizedData = useMemo(() => ({
    services: SERVICES_DATA[lang] || SERVICES_DATA.fr,
    pillars: PILLARS_DATA[lang] || PILLARS_DATA.fr,
    annualPlans: ANNUAL_PLANS_DATA[lang] || ANNUAL_PLANS_DATA.fr,
    spotPlans: SPOT_PLANS_DATA[lang] || SPOT_PLANS_DATA.fr,
    articles: ARTICLES_DATA[lang] || ARTICLES_DATA.fr,
    faq: FAQ_DATA[lang] || FAQ_DATA.fr,
    realisations: REALISATIONS_DATA[lang] || REALISATIONS_DATA.fr,
    realisationCategories: REALISATION_CATEGORIES_DATA[lang] || REALISATION_CATEGORIES_DATA.fr,
    metrics: METRICS_DATA[lang] || METRICS_DATA.fr,
    sectors: SECTORS_DATA[lang] || SECTORS_DATA.fr,
    pageSeo: PAGE_SEO_DATA[lang] || PAGE_SEO_DATA.fr
  }), [lang]);

  const value = useMemo(() => ({
    lang,
    setLang,
    t,
    languages: AVAILABLE_LANGUAGES,
    ...localizedData
  }), [lang, t, localizedData]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
