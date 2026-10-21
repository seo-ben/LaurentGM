/**
 * Gestion du stockage et de l'upload des images (Slider Hero & Galerie Réalisations)
 * Connecteur direct Cloudinary (Cloud Name: ssovwgsl / Preset: ml_default)
 */
import { REALISATIONS } from '../data/content';

export const DEFAULT_HERO_SLIDES = [
  {
    id: 'suit',
    role: 'Consultant en Technologies & Stratégie',
    image: '/assets/avatar-suit.png',
    alt: 'LGM Consulting - Consultant en Innovations Technologiques',
    objectPosition: 'center 15%'
  },
  {
    id: 'workshop',
    role: 'R&D & Transfert Opérationnel',
    image: '/assets/workshop-meeting.jpg',
    alt: 'Session d\'atelier collaboratif et R&D en entreprise',
    objectPosition: 'center center'
  },
  {
    id: 'desk',
    role: 'Ingénierie IA & Modélisation Sur-Mesure',
    image: '/assets/avatar-desk.png',
    alt: 'Laboratoire R&D LGM Consulting - Modélisation & IA',
    objectPosition: 'center top'
  }
];

export const DEFAULT_CLOUDINARY_CONFIG = {
  cloudName: 'ssovwgsl',
  uploadPreset: 'ml_default'
};

const STORAGE_KEY_SLIDES = 'lgm_hero_slides';
const STORAGE_KEY_REALISATIONS = 'lgm_realisations_data';
const STORAGE_KEY_CLOUDINARY = 'lgm_cloudinary_config';

/**
 * =========================================================
 * GESTION DES PHOTOS DU SLIDER HERO
 * =========================================================
 */
export function getStoredSlides() {
  if (typeof window === 'undefined') return DEFAULT_HERO_SLIDES;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_SLIDES);
    if (!raw) return DEFAULT_HERO_SLIDES;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
  } catch (err) {
    console.error('Erreur lecture slides depuis localStorage:', err);
  }
  return DEFAULT_HERO_SLIDES;
}

export function saveStoredSlides(slides) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY_SLIDES, JSON.stringify(slides));
    window.dispatchEvent(new CustomEvent('lgm_slides_updated', { detail: slides }));
  } catch (err) {
    console.error('Erreur sauvegarde slides dans localStorage:', err);
  }
}

export function resetStoredSlides() {
  saveStoredSlides(DEFAULT_HERO_SLIDES);
  return DEFAULT_HERO_SLIDES;
}

/**
 * =========================================================
 * GESTION DES PHOTOS DE LA GALERIE & RÉALISATIONS
 * =========================================================
 */
export function getStoredRealisations() {
  if (typeof window === 'undefined') return REALISATIONS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_REALISATIONS);
    if (!raw) return REALISATIONS;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
  } catch (err) {
    console.error('Erreur lecture réalisations depuis localStorage:', err);
  }
  return REALISATIONS;
}

export function saveStoredRealisations(items) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY_REALISATIONS, JSON.stringify(items));
    window.dispatchEvent(new CustomEvent('lgm_realisations_updated', { detail: items }));
  } catch (err) {
    console.error('Erreur sauvegarde réalisations dans localStorage:', err);
  }
}

export function resetStoredRealisations() {
  saveStoredRealisations(REALISATIONS);
  return REALISATIONS;
}

/**
 * =========================================================
 * CONFIGURATION & UPLOAD CLOUDINARY
 * =========================================================
 */
export function getCloudinaryConfig() {
  if (typeof window === 'undefined') return DEFAULT_CLOUDINARY_CONFIG;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_CLOUDINARY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed.cloudName && parsed.uploadPreset) return parsed;
    }
  } catch (err) {
    console.error('Erreur lecture config Cloudinary:', err);
  }
  return DEFAULT_CLOUDINARY_CONFIG;
}

export function saveCloudinaryConfig(config) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY_CLOUDINARY, JSON.stringify(config));
}

export function uploadToCloudinary(file, onProgress) {
  return new Promise((resolve, reject) => {
    const config = getCloudinaryConfig();
    const url = `https://api.cloudinary.com/v1_1/${config.cloudName}/image/upload`;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', config.uploadPreset);

    const xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);

    if (xhr.upload && onProgress) {
      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) {
          const percent = Math.round((e.loaded / e.total) * 100);
          onProgress(percent);
        }
      };
    }

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const res = JSON.parse(xhr.responseText);
          resolve({
            url: res.secure_url || res.url,
            publicId: res.public_id,
            width: res.width,
            height: res.height,
            format: res.format
          });
        } catch (e) {
          reject(new Error('Format de réponse Cloudinary invalide'));
        }
      } else {
        try {
          const errRes = JSON.parse(xhr.responseText);
          reject(new Error(errRes.error?.message || `Erreur Cloudinary HTTP ${xhr.status}`));
        } catch (e) {
          reject(new Error(`Erreur lors de l'envoi sur Cloudinary (Code ${xhr.status})`));
        }
      }
    };

    xhr.onerror = () => {
      reject(new Error('Erreur réseau lors de la communication avec Cloudinary'));
    };

    xhr.send(formData);
  });
}
