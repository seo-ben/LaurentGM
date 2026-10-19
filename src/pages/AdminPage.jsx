import React, { useState, useEffect, useRef } from 'react';
import {
  Upload,
  Image as ImageIcon,
  Trash2,
  ArrowUp,
  ArrowDown,
  RotateCcw,
  CheckCircle,
  AlertCircle,
  Eye,
  Lock,
  Unlock,
  LogOut,
  ExternalLink,
  Sparkles,
  Settings,
  Copy,
  Check,
  Plus,
  Edit3,
  Calendar,
  MapPin,
  Briefcase,
  Layers,
  Filter,
  Camera,
  X
} from 'lucide-react';
import {
  getStoredSlides,
  saveStoredSlides,
  resetStoredSlides,
  getStoredRealisations,
  saveStoredRealisations,
  resetStoredRealisations,
  getCloudinaryConfig,
  saveCloudinaryConfig,
  uploadToCloudinary,
  DEFAULT_HERO_SLIDES
} from '../utils/slidesStorage';
import { REALISATION_CATEGORIES } from '../data/content';

const CATEGORY_META = {
  ateliers: { label: 'Ateliers & Formations', bg: 'rgba(13, 148, 136, 0.1)', color: '#0d9488' },
  conferences: { label: 'Conférences & Keynotes', bg: 'rgba(59, 130, 246, 0.1)', color: '#2563eb' },
  'rd-tech': { label: 'R&D & Deep Tech', bg: 'rgba(139, 92, 246, 0.1)', color: '#7c3aed' },
  audits: { label: 'Audits & Stratégie', bg: 'rgba(245, 158, 11, 0.1)', color: '#d97706' }
};

export function AdminPage({ onNavigate }) {
  // -------------------------------------------------------------
  // AUTHENTIFICATION
  // -------------------------------------------------------------
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    if (typeof window === 'undefined') return false;
    return sessionStorage.getItem('lgm_admin_auth') === 'true';
  });
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');

  // -------------------------------------------------------------
  // ONGLET ACTIF : 'hero' | 'realisations'
  // -------------------------------------------------------------
  const [activeTab, setActiveTab] = useState('hero');

  // -------------------------------------------------------------
  // GESTION DU SLIDER HERO
  // -------------------------------------------------------------
  const [slides, setSlides] = useState(() => getStoredSlides());
  const [currentSlidePreview, setCurrentSlidePreview] = useState(0);

  // Formulaire Hero
  const [heroFile, setHeroFile] = useState(null);
  const [heroFilePreview, setHeroFilePreview] = useState(null);
  const [heroRoleInput, setHeroRoleInput] = useState('');
  const [heroPositionInput, setHeroPositionInput] = useState('center 15%');
  const [isUploadingHero, setIsUploadingHero] = useState(false);
  const [uploadProgressHero, setUploadProgressHero] = useState(0);

  // -------------------------------------------------------------
  // GESTION DE LA GALERIE & RÉALISATIONS
  // -------------------------------------------------------------
  const [realisations, setRealisations] = useState(() => getStoredRealisations());
  const [galleryCategoryFilter, setGalleryCategoryFilter] = useState('all');

  // Formulaire nouvelle photo de galerie
  const [realFile, setRealFile] = useState(null);
  const [realFilePreview, setRealFilePreview] = useState(null);
  const [realTitle, setRealTitle] = useState('');
  const [realCategory, setRealCategory] = useState('ateliers');
  const [isUploadingReal, setIsUploadingReal] = useState(false);
  const [uploadProgressReal, setUploadProgressReal] = useState(0);

  // Remplacement rapide de photo pour une réalisation
  const [itemToReplacePhoto, setItemToReplacePhoto] = useState(null);
  const [isReplacingPhoto, setIsReplacingPhoto] = useState(false);
  const [replaceProgress, setReplaceProgress] = useState(0);

  // -------------------------------------------------------------
  // CONFIGURATION & NOTIFICATIONS
  // -------------------------------------------------------------
  const [notification, setNotification] = useState(null);
  const [cloudinaryConfig, setCloudinaryConfig] = useState(() => getCloudinaryConfig());
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [tempCloudName, setTempCloudName] = useState(cloudinaryConfig.cloudName);
  const [tempPreset, setTempPreset] = useState(cloudinaryConfig.uploadPreset);
  const [copiedCode, setCopiedCode] = useState(false);

  // Mot de passe
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Refs de fichiers
  const heroFileInputRef = useRef(null);
  const realFileInputRef = useRef(null);
  const replaceFileInputRef = useRef(null);

  // -------------------------------------------------------------
  // EFFETS & LISTENERS
  // -------------------------------------------------------------
  // Rotation automatique aperçu Hero
  useEffect(() => {
    if (!slides.length) return;
    const timer = setInterval(() => {
      setCurrentSlidePreview((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [slides.length]);

  // Écoute des mises à jour externes
  useEffect(() => {
    const handleSlidesUpdate = () => setSlides(getStoredSlides());
    const handleRealUpdate = () => setRealisations(getStoredRealisations());

    window.addEventListener('lgm_slides_updated', handleSlidesUpdate);
    window.addEventListener('lgm_realisations_updated', handleRealUpdate);
    return () => {
      window.removeEventListener('lgm_slides_updated', handleSlidesUpdate);
      window.removeEventListener('lgm_realisations_updated', handleRealUpdate);
    };
  }, []);

  // Notifications
  const showNotif = (type, message) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 5000);
  };

  // -------------------------------------------------------------
  // AUTHENTIFICATION HANDLERS
  // -------------------------------------------------------------
  const handleLogin = (e) => {
    e.preventDefault();
    const storedPwd = localStorage.getItem('lgm_admin_pwd') || 'lgm2026';
    if (passwordInput.trim() === storedPwd) {
      setIsAuthenticated(true);
      sessionStorage.setItem('lgm_admin_auth', 'true');
      setAuthError('');
    } else {
      setAuthError('Mot de passe incorrect.');
    }
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (!newPassword || newPassword.length < 4) {
      showNotif('error', 'Le mot de passe doit comporter au moins 4 caractères.');
      return;
    }
    if (newPassword !== confirmPassword) {
      showNotif('error', 'Les deux mots de passe ne correspondent pas.');
      return;
    }
    localStorage.setItem('lgm_admin_pwd', newPassword);
    setShowPasswordModal(false);
    setNewPassword('');
    setConfirmPassword('');
    showNotif('success', 'Votre mot de passe secret a été mis à jour avec succès !');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('lgm_admin_auth');
    setPasswordInput('');
  };

  // -------------------------------------------------------------
  // HERO SLIDER HANDLERS
  // -------------------------------------------------------------
  const handleHeroFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        showNotif('error', 'Format d\'image invalide (choisir JPG, PNG ou WebP).');
        return;
      }
      setHeroFile(file);
      const reader = new FileReader();
      reader.onload = () => setHeroFilePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleHeroDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setHeroFile(file);
      const reader = new FileReader();
      reader.onload = () => setHeroFilePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleUploadAndAddHero = async (e) => {
    e.preventDefault();
    if (!heroFile) {
      showNotif('error', 'Veuillez sélectionner une photo pour le slider.');
      return;
    }

    try {
      setIsUploadingHero(true);
      setUploadProgressHero(10);

      const result = await uploadToCloudinary(heroFile, (percent) => {
        setUploadProgressHero(percent);
      });

      const newSlide = {
        id: `slide_${Date.now()}`,
        role: heroRoleInput.trim() || 'Consultant en Innovations & R&D',
        image: result.url,
        alt: `Laurent G-M Manouaba - ${heroRoleInput.trim() || 'Innovations Technologiques'}`,
        objectPosition: heroPositionInput
      };

      const updated = [newSlide, ...slides];
      setSlides(updated);
      saveStoredSlides(updated);

      setHeroFile(null);
      setHeroFilePreview(null);
      setHeroRoleInput('');
      setIsUploadingHero(false);
      setUploadProgressHero(0);
      if (heroFileInputRef.current) heroFileInputRef.current.value = '';

      showNotif('success', 'Photo du slider hero uploadée avec succès sur Cloudinary !');
    } catch (err) {
      console.error(err);
      setIsUploadingHero(false);
      setUploadProgressHero(0);
      showNotif('error', `Échec de l'upload : ${err.message}`);
    }
  };

  const handleDeleteSlide = (id) => {
    if (slides.length <= 1) {
      showNotif('error', 'Le slider doit conserver au minimum une photo.');
      return;
    }
    const updated = slides.filter((s) => s.id !== id);
    setSlides(updated);
    saveStoredSlides(updated);
    showNotif('success', 'Photo retirée du slider.');
  };

  const handleMoveSlideUp = (index) => {
    if (index === 0) return;
    const updated = [...slides];
    const temp = updated[index - 1];
    updated[index - 1] = updated[index];
    updated[index] = temp;
    setSlides(updated);
    saveStoredSlides(updated);
  };

  const handleMoveSlideDown = (index) => {
    if (index === slides.length - 1) return;
    const updated = [...slides];
    const temp = updated[index + 1];
    updated[index + 1] = updated[index];
    updated[index] = temp;
    setSlides(updated);
    saveStoredSlides(updated);
  };

  const handleResetSlides = () => {
    if (window.confirm('Voulez-vous restaurer les 3 photos d\'origine du slider Hero ?')) {
      const reset = resetStoredSlides();
      setSlides(reset);
      showNotif('success', 'Photos d\'origine du slider restaurées.');
    }
  };

  // -------------------------------------------------------------
  // GALERIE & RÉALISATIONS HANDLERS
  // -------------------------------------------------------------
  const handleRealFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        showNotif('error', 'Format d\'image invalide (choisir JPG, PNG ou WebP).');
        return;
      }
      setRealFile(file);
      const reader = new FileReader();
      reader.onload = () => setRealFilePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleRealDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setRealFile(file);
      const reader = new FileReader();
      reader.onload = () => setRealFilePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleAddRealisation = async (e) => {
    e.preventDefault();
    if (!realFile) {
      showNotif('error', 'Veuillez sélectionner une photographie pour cette réalisation.');
      return;
    }
    if (!realTitle.trim()) {
      showNotif('error', 'Veuillez indiquer le titre de la réalisation ou de l\'atelier.');
      return;
    }

    try {
      setIsUploadingReal(true);
      setUploadProgressReal(10);

      const result = await uploadToCloudinary(realFile, (percent) => {
        setUploadProgressReal(percent);
      });

      const catLabel = CATEGORY_META[realCategory]?.label || 'Ateliers & Formations';
      const newItem = {
        id: `realisation-${Date.now()}`,
        title: realTitle.trim(),
        category: realCategory,
        categoryLabel: catLabel,
        image: result.url
      };

      const updated = [newItem, ...realisations];
      setRealisations(updated);
      saveStoredRealisations(updated);

      // Reset
      setRealFile(null);
      setRealFilePreview(null);
      setRealTitle('');
      setIsUploadingReal(false);
      setUploadProgressReal(0);
      if (realFileInputRef.current) realFileInputRef.current.value = '';

      showNotif('success', 'Nouvelle photo ajoutée avec succès à la galerie !');
    } catch (err) {
      console.error(err);
      setIsUploadingReal(false);
      setUploadProgressReal(0);
      showNotif('error', `Échec de l'upload : ${err.message}`);
    }
  };

  // Déclencher le remplacement rapide d'image
  const handleTriggerReplacePhoto = (item) => {
    setItemToReplacePhoto(item);
    replaceFileInputRef.current?.click();
  };

  const handleReplacePhotoSelected = async (e) => {
    const file = e.target.files?.[0];
    if (!file || !itemToReplacePhoto) return;
    if (!file.type.startsWith('image/')) {
      showNotif('error', 'Format d\'image invalide.');
      return;
    }

    try {
      setIsReplacingPhoto(true);
      setReplaceProgress(10);

      const result = await uploadToCloudinary(file, (percent) => {
        setReplaceProgress(percent);
      });

      const updated = realisations.map((r) =>
        r.id === itemToReplacePhoto.id ? { ...r, image: result.url } : r
      );
      setRealisations(updated);
      saveStoredRealisations(updated);

      showNotif('success', `Photo de « ${itemToReplacePhoto.title} » remplacée avec succès !`);
    } catch (err) {
      console.error(err);
      showNotif('error', `Échec du remplacement de la photo : ${err.message}`);
    } finally {
      setIsReplacingPhoto(false);
      setItemToReplacePhoto(null);
      if (replaceFileInputRef.current) replaceFileInputRef.current.value = '';
    }
  };

  // Réordonner la galerie
  const handleMoveRealisationUp = (index) => {
    if (index === 0) return;
    const updated = [...realisations];
    const temp = updated[index - 1];
    updated[index - 1] = updated[index];
    updated[index] = temp;
    setRealisations(updated);
    saveStoredRealisations(updated);
  };

  const handleMoveRealisationDown = (index) => {
    if (index === realisations.length - 1) return;
    const updated = [...realisations];
    const temp = updated[index + 1];
    updated[index + 1] = updated[index];
    updated[index] = temp;
    setRealisations(updated);
    saveStoredRealisations(updated);
  };

  // Supprimer une réalisation
  const handleDeleteRealisation = (id, title) => {
    if (window.confirm(`Voulez-vous vraiment supprimer « ${title || 'cette réalisation'} » de la galerie ?`)) {
      const updated = realisations.filter((r) => r.id !== id);
      setRealisations(updated);
      saveStoredRealisations(updated);
      showNotif('success', 'Réalisation supprimée de la galerie.');
    }
  };

  // Réinitialiser la galerie aux 8 projets d'origine
  const handleResetRealisations = () => {
    if (window.confirm('Voulez-vous restaurer les 8 réalisations et photographies d\'origine ?')) {
      const reset = resetStoredRealisations();
      setRealisations(reset);
      showNotif('success', 'Galerie restaurée aux 8 réalisations d\'origine !');
    }
  };

  // -------------------------------------------------------------
  // CONFIGURATION CLOUDINARY & EXPORT
  // -------------------------------------------------------------
  const handleSaveConfig = (e) => {
    e.preventDefault();
    const newConfig = {
      cloudName: tempCloudName.trim() || 'ssovwgsl',
      uploadPreset: tempPreset.trim() || 'ml_default'
    };
    setCloudinaryConfig(newConfig);
    saveCloudinaryConfig(newConfig);
    setShowConfigModal(false);
    showNotif('success', 'Configuration Cloudinary mise à jour.');
  };

  const handleCopyJSON = () => {
    const payload = activeTab === 'hero' ? slides : realisations;
    navigator.clipboard.writeText(JSON.stringify(payload, null, 2));
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
    showNotif('success', 'Configuration JSON copiée dans le presse-papiers.');
  };

  // -------------------------------------------------------------
  // FILTRAGE DES RÉALISATIONS
  // -------------------------------------------------------------
  const filteredRealisations = galleryCategoryFilter === 'all'
    ? realisations
    : realisations.filter((r) => r.category === galleryCategoryFilter);

  // -------------------------------------------------------------
  // ÉCRAN DE VERROUILLAGE / LOGIN (FOND BLANC POINTILLÉ)
  // -------------------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="admin-login-wrapper">
        <div className="admin-login-card">
          <div className="admin-lock-icon">
            <Lock size={28} color="#0d9488" />
          </div>

          <h1 className="admin-login-title">LGM Studio</h1>
          <p className="admin-login-subtitle">
            Espace d'administration privé & gestion des photos de Laurent G-M Manouaba.
          </p>

          <form onSubmit={handleLogin} className="admin-login-form">
            <div className="form-group">
              <label htmlFor="admin-pwd">Code d'accès sécurisé</label>
              <input
                id="admin-pwd"
                type="password"
                placeholder="Entrez votre mot de passe..."
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                autoFocus
                className="admin-input"
              />
            </div>

            {authError && <div className="admin-error-badge">{authError}</div>}

            <button type="submit" className="admin-btn-primary">
              <Unlock size={18} />
              <span>Ouvrir l'Espace Admin</span>
            </button>
          </form>

          <div className="admin-login-footer">
            <button
              onClick={() => onNavigate('home')}
              className="admin-link-back"
            >
              ← Retour au site public
            </button>
          </div>
        </div>

        <style>{`
          .admin-login-wrapper {
            min-height: 88vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 40px 20px;
            /* Fond blanc pointillé signature */
            background-color: #ffffff;
            background-image: radial-gradient(rgba(15, 23, 42, 0.12) 1.25px, transparent 1.25px);
            background-size: 24px 24px;
            background-position: 0 0;
          }
          .admin-login-card {
            background-color: #ffffff;
            border: 1px solid rgba(15, 23, 42, 0.1);
            border-radius: 24px;
            padding: clamp(28px, 6vw, 44px);
            max-width: 440px;
            width: 100%;
            box-shadow: 0 20px 48px -12px rgba(15, 23, 42, 0.12), 0 8px 24px -4px rgba(15, 23, 42, 0.06);
            text-align: center;
            color: #0f172a;
          }
          .admin-lock-icon {
            width: 58px;
            height: 58px;
            border-radius: 50%;
            background: rgba(13, 148, 136, 0.1);
            border: 1.5px solid rgba(13, 148, 136, 0.25);
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 18px;
          }
          .admin-login-title {
            font-size: 1.65rem;
            font-weight: 900;
            color: #0f172a;
            letter-spacing: -0.025em;
            margin-bottom: 8px;
          }
          .admin-login-subtitle {
            font-size: 0.9rem;
            color: #475569;
            margin-bottom: 26px;
            line-height: 1.5;
          }
          .admin-login-form {
            display: flex;
            flex-direction: column;
            gap: 18px;
            text-align: left;
          }
          .admin-login-form label {
            display: block;
            font-size: 0.86rem;
            font-weight: 700;
            color: #0f172a;
            margin-bottom: 6px;
          }
          .admin-input {
            width: 100%;
            padding: 13px 16px;
            background-color: #ffffff;
            border: 1.5px solid rgba(15, 23, 42, 0.16);
            border-radius: 12px;
            color: #0f172a;
            font-size: 0.95rem;
            outline: none;
            transition: all 0.2s ease;
          }
          .admin-input:focus {
            border-color: #0d9488;
            box-shadow: 0 0 0 3px rgba(13, 148, 136, 0.15);
          }
          .admin-btn-primary {
            background-color: #00f5a0;
            color: #0a1728;
            border: none;
            border-radius: 9999px;
            padding: 14px 20px;
            font-weight: 800;
            font-size: 0.98rem;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            transition: all 0.22s ease;
            box-shadow: 0 4px 18px rgba(0, 245, 160, 0.4);
          }
          .admin-btn-primary:hover {
            background-color: #1effb1;
            transform: translateY(-2px);
            box-shadow: 0 6px 24px rgba(0, 245, 160, 0.55);
          }
          .admin-error-badge {
            background-color: #fef2f2;
            color: #dc2626;
            border: 1px solid #fecaca;
            padding: 10px 14px;
            border-radius: 10px;
            font-size: 0.85rem;
            font-weight: 600;
          }
          .admin-login-footer {
            margin-top: 24px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 0.85rem;
          }
          .admin-link-back {
            background: none;
            border: none;
            color: #64748b;
            cursor: pointer;
            font-weight: 600;
            transition: color 0.2s ease;
          }
          .admin-link-back:hover {
            color: #0d9488;
            text-decoration: underline;
          }
        `}</style>
      </div>
    );
  }

  // -------------------------------------------------------------
  // TABLEAU DE BORD CONNECTÉ (FOND BLANC POINTILLÉ + ONGLETS)
  // -------------------------------------------------------------
  const activePreviewSlide = slides[currentSlidePreview % slides.length] || slides[0] || {};

  return (
    <div className="admin-page-container">
      {/* Toast Notification */}
      {notification && (
        <div className={`admin-toast ${notification.type}`}>
          {notification.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
          <span>{notification.message}</span>
        </div>
      )}

      {/* Hidden file input for fast image replacement */}
      <input
        ref={replaceFileInputRef}
        type="file"
        accept="image/png, image/jpeg, image/jpg, image/webp"
        onChange={handleReplacePhotoSelected}
        style={{ display: 'none' }}
      />

      {/* Top Header */}
      <header className="admin-header">
        <div className="container admin-header-inner">
          <div className="admin-brand">
            <span className="admin-badge">Studio Privé</span>
            <h2>Gestionnaire de Contenu & Photos Cloudinary</h2>
          </div>

          <div className="admin-actions-bar">
            <div className="cloudinary-status-pill" title={`Cloud Name: ${cloudinaryConfig.cloudName}`}>
              <span className="status-dot-active" />
              <span>Cloudinary : <strong>{cloudinaryConfig.cloudName}</strong></span>
              <button
                type="button"
                onClick={() => setShowConfigModal(true)}
                className="btn-icon-subtle"
                title="Modifier les identifiants Cloudinary"
              >
                <Settings size={15} />
              </button>
            </div>

            <button
              type="button"
              onClick={() => setShowPasswordModal(true)}
              className="admin-nav-btn"
              title="Modifier votre mot de passe secret"
            >
              <Lock size={15} />
              <span>Mot de Passe</span>
            </button>

            <button
              onClick={() => onNavigate('home')}
              className="admin-nav-btn"
              title="Voir le site en direct"
            >
              <ExternalLink size={16} />
              <span>Voir le Site</span>
            </button>

            <button
              onClick={handleLogout}
              className="admin-logout-btn"
              title="Déconnexion"
            >
              <LogOut size={16} />
              <span>Quitter</span>
            </button>
          </div>
        </div>
      </header>

      {/* Navigation Principale par Onglets : Hero vs Galerie */}
      <div className="admin-tabs-nav-bar">
        <div className="container admin-tabs-nav-inner">
          <button
            type="button"
            className={`admin-tab-item ${activeTab === 'hero' ? 'active' : ''}`}
            onClick={() => setActiveTab('hero')}
          >
            <Sparkles size={18} />
            <span>Photos du Slider Hero (Accueil)</span>
            <span className="admin-tab-count">{slides.length}</span>
          </button>

          <button
            type="button"
            className={`admin-tab-item ${activeTab === 'realisations' ? 'active' : ''}`}
            onClick={() => setActiveTab('realisations')}
          >
            <ImageIcon size={18} />
            <span>Galerie & Réalisations (Portfolio)</span>
            <span className="admin-tab-count">{realisations.length}</span>
          </button>
        </div>
      </div>

      {/* Notification bandeau de remplacement en cours */}
      {isReplacingPhoto && (
        <div className="container" style={{ marginTop: '16px' }}>
          <div className="replacing-banner">
            <span className="spinner-dot" />
            <span>
              Téléversement de la nouvelle photo vers Cloudinary... <strong>{replaceProgress}%</strong>
            </span>
          </div>
        </div>
      )}

      {/* =========================================================
          CONTENU : ONGLET 1 - SLIDER HERO (ACCUEIL)
         ========================================================= */}
      {activeTab === 'hero' && (
        <main className="container admin-content-grid">
          {/* Colonne Gauche : Upload & Liste */}
          <div className="admin-main-col">
            {/* Bloc 1 : Upload */}
            <section className="admin-card">
              <div className="admin-card-header">
                <div className="card-header-icon">
                  <Upload size={22} color="#0d9488" />
                </div>
                <div>
                  <h3>Ajouter une Photo au Slider d'Accueil</h3>
                  <p>Téléversez votre photo haute définition directement vers votre compte Cloudinary.</p>
                </div>
              </div>

              <form onSubmit={handleUploadAndAddHero} className="admin-upload-form">
                <div
                  className={`dropzone-area ${heroFilePreview ? 'has-preview' : ''}`}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleHeroDrop}
                  onClick={() => heroFileInputRef.current?.click()}
                >
                  <input
                    ref={heroFileInputRef}
                    type="file"
                    accept="image/png, image/jpeg, image/jpg, image/webp"
                    onChange={handleHeroFileChange}
                    style={{ display: 'none' }}
                  />

                  {heroFilePreview ? (
                    <div className="dropzone-preview">
                      <img
                        src={heroFilePreview}
                        alt="Prévisualisation"
                        style={{ objectPosition: heroPositionInput }}
                      />
                      <div className="preview-overlay-info">
                        <span>✓ Photo sélectionnée • Cliquez pour en choisir une autre</span>
                      </div>
                    </div>
                  ) : (
                    <div className="dropzone-placeholder">
                      <div className="upload-cloud-circle">
                        <ImageIcon size={30} color="#0d9488" />
                      </div>
                      <div className="dropzone-text">
                        <strong>Glissez votre photo ici</strong> ou cliquez pour parcourir
                      </div>
                      <span className="dropzone-hint">Format JPG, PNG ou WebP haute qualité</span>
                    </div>
                  )}
                </div>

                <div className="form-row">
                  <div className="form-field">
                    <label htmlFor="hero-role">Intitulé / Rôle sous votre nom</label>
                    <input
                      id="hero-role"
                      type="text"
                      placeholder="Ex: Consultant Stratégique en IA & R&D"
                      value={heroRoleInput}
                      onChange={(e) => setHeroRoleInput(e.target.value)}
                      className="admin-input-field"
                    />
                    <span className="field-hint">Ce texte s'affiche sous votre nom au bas du grand rond.</span>
                  </div>

                  <div className="form-field">
                    <label htmlFor="hero-pos">Cadrage de la photo</label>
                    <select
                      id="hero-pos"
                      value={heroPositionInput}
                      onChange={(e) => setHeroPositionInput(e.target.value)}
                      className="admin-select-field"
                    >
                      <option value="center 15%">Visage en gros plan (Haut 15%)</option>
                      <option value="center top">Centré en haut</option>
                      <option value="center center">Centré au milieu</option>
                      <option value="center bottom">Centré en bas</option>
                    </select>
                    <span className="field-hint">Ajuste le centrage dans le grand rond circulaire.</span>
                  </div>
                </div>

                {isUploadingHero && (
                  <div className="upload-progress-wrapper">
                    <div className="progress-info">
                      <span>Téléversement vers Cloudinary...</span>
                      <strong>{uploadProgressHero}%</strong>
                    </div>
                    <div className="progress-bar-track">
                      <div className="progress-bar-fill" style={{ width: `${uploadProgressHero}%` }} />
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isUploadingHero || !heroFile}
                  className="btn-submit-upload"
                >
                  {isUploadingHero ? (
                    <>
                      <span className="spinner-dot" />
                      <span>Envoi vers Cloudinary en cours...</span>
                    </>
                  ) : (
                    <>
                      <Upload size={18} />
                      <span>Uploader sur Cloudinary & Ajouter au Slider</span>
                    </>
                  )}
                </button>
              </form>
            </section>

            {/* Bloc 2 : Liste des slides */}
            <section className="admin-card">
              <div className="admin-card-header flex-between">
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div className="card-header-icon">
                    <ImageIcon size={22} color="#0d9488" />
                  </div>
                  <div>
                    <h3>Photos Actuelles du Slider ({slides.length})</h3>
                    <p>Réorganisez l'ordre de défilement ou supprimez des photos.</p>
                  </div>
                </div>

                <div className="admin-card-header-actions">
                  <button
                    type="button"
                    onClick={handleCopyJSON}
                    className="btn-action-outline"
                    title="Copier la configuration JSON"
                  >
                    {copiedCode ? <Check size={15} color="#0d9488" /> : <Copy size={15} />}
                    <span>{copiedCode ? 'Copié !' : 'Exporter JSON'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleResetSlides}
                    className="btn-action-outline danger"
                    title="Restaurer les 3 photos d'origine"
                  >
                    <RotateCcw size={15} />
                    <span>Réinitialiser</span>
                  </button>
                </div>
              </div>

              <div className="slides-list">
                {slides.map((slide, index) => {
                  const isCloudinary = slide.image.includes('cloudinary');
                  return (
                    <div key={slide.id || index} className="slide-item-card">
                      <div className="slide-thumb-wrapper">
                        <img
                          src={slide.image}
                          alt={slide.alt || 'Photo'}
                          style={{ objectPosition: slide.objectPosition || 'center center' }}
                        />
                        <span className="slide-order-badge">#{index + 1}</span>
                      </div>

                      <div className="slide-info-col">
                        <div className="slide-role-text">{slide.role}</div>
                        <div className="slide-meta-row">
                          <span className={`source-tag ${isCloudinary ? 'cloud' : 'local'}`}>
                            {isCloudinary ? 'Cloudinary' : 'Photo Originale'}
                          </span>
                          <span className="pos-tag">Cadrage: {slide.objectPosition || 'center'}</span>
                        </div>
                      </div>

                      <div className="slide-actions-col">
                        <button
                          type="button"
                          onClick={() => handleMoveSlideUp(index)}
                          disabled={index === 0}
                          className="btn-move"
                          title="Monter"
                          aria-label="Monter"
                        >
                          <ArrowUp size={16} />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleMoveSlideDown(index)}
                          disabled={index === slides.length - 1}
                          className="btn-move"
                          title="Descendre"
                          aria-label="Descendre"
                        >
                          <ArrowDown size={16} />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDeleteSlide(slide.id)}
                          className="btn-delete"
                          title="Supprimer cette photo"
                          aria-label="Supprimer"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          </div>

          {/* Colonne Droite : Prévisualisation en direct */}
          <aside className="admin-preview-col">
            <div className="admin-preview-card">
              <div className="preview-card-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Eye size={18} color="#0d9488" />
                  <h4>Aperçu en Direct sur le Site</h4>
                </div>
                <span className="live-indicator">
                  <span className="live-dot" />
                  Live
                </span>
              </div>
              <p className="preview-helper-text">
                Rendu exact du grand rond circulaire sur la page d'accueil.
              </p>

              <div className="preview-stage-container">
                <div className="preview-circle-stage">
                  <div className="preview-guide-ring" />
                  <div className="preview-accent-top" />
                  <div className="preview-accent-bottom" />

                  <div className="preview-photo-circle">
                    {slides.map((s, idx) => {
                      const isActive = idx === (currentSlidePreview % slides.length);
                      return (
                        <div
                          key={s.id || idx}
                          className={`preview-slide-img ${isActive ? 'active' : ''}`}
                        >
                          <img
                            src={s.image}
                            alt={s.alt}
                            style={{ objectPosition: s.objectPosition }}
                          />
                        </div>
                      );
                    })}

                    <div className="preview-name-overlay">
                      <div className="preview-author-name">Laurent G-M Manouaba</div>
                      <div className="preview-author-role">
                        {activePreviewSlide.role}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="preview-dots-row">
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setCurrentSlidePreview(idx)}
                    className={`dot-indicator ${idx === (currentSlidePreview % slides.length) ? 'active' : ''}`}
                    aria-label={`Slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </aside>
        </main>
      )}

      {/* =========================================================
          CONTENU : ONGLET 2 - GALERIE & RÉALISATIONS
         ========================================================= */}
      {activeTab === 'realisations' && (
        <main className="container" style={{ marginTop: '32px' }}>
          {/* Bloc 1 : Ajouter une Nouvelle Réalisation */}
          <section className="admin-card">
            <div className="admin-card-header">
              <div className="card-header-icon">
                <Plus size={22} color="#0d9488" />
              </div>
              <div>
                <h3>Ajouter une Nouvelle Photo / Projet à la Galerie</h3>
                <p>Uploadez la photo de votre intervention et renseignez le titre, la catégorie et le contexte.</p>
              </div>
            </div>

            <form onSubmit={handleAddRealisation} className="admin-upload-form">
              {/* Dropzone Galerie */}
              <div
                className={`dropzone-area ${realFilePreview ? 'has-preview' : ''}`}
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleRealDrop}
                onClick={() => realFileInputRef.current?.click()}
              >
                <input
                  ref={realFileInputRef}
                  type="file"
                  accept="image/png, image/jpeg, image/jpg, image/webp"
                  onChange={handleRealFileChange}
                  style={{ display: 'none' }}
                />

                {realFilePreview ? (
                  <div className="dropzone-preview">
                    <img
                      src={realFilePreview}
                      alt="Prévisualisation réalisation"
                      style={{ objectFit: 'cover' }}
                    />
                    <div className="preview-overlay-info">
                      <span>✓ Photo de la réalisation prête • Cliquez pour modifier</span>
                    </div>
                  </div>
                ) : (
                  <div className="dropzone-placeholder">
                    <div className="upload-cloud-circle">
                      <Camera size={30} color="#0d9488" />
                    </div>
                    <div className="dropzone-text">
                      <strong>Glissez la photo de votre réalisation ici</strong> ou cliquez pour parcourir
                    </div>
                    <span className="dropzone-hint">JPG, PNG ou WebP haute qualité (recommandé 16:9 ou 4:3)</span>
                  </div>
                )}
              </div>

              {/* Champs du projet */}
              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="real-title">Titre du Projet ou de l'Atelier *</label>
                  <input
                    id="real-title"
                    type="text"
                    placeholder="Ex: Masterclass IA Générative & Automatisation Métier"
                    value={realTitle}
                    onChange={(e) => setRealTitle(e.target.value)}
                    className="admin-input-field"
                    required
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="real-cat">Catégorie *</label>
                  <select
                    id="real-cat"
                    value={realCategory}
                    onChange={(e) => setRealCategory(e.target.value)}
                    className="admin-select-field"
                  >
                    <option value="ateliers">Ateliers & Formations</option>
                    <option value="conferences">Conférences & Keynotes</option>
                    <option value="rd-tech">R&D & Deep Tech</option>
                    <option value="audits">Audits & Stratégie</option>
                  </select>
                </div>
              </div>

              {isUploadingReal && (
                <div className="upload-progress-wrapper">
                  <div className="progress-info">
                    <span>Téléversement vers Cloudinary...</span>
                    <strong>{uploadProgressReal}%</strong>
                  </div>
                  <div className="progress-bar-track">
                    <div className="progress-bar-fill" style={{ width: `${uploadProgressReal}%` }} />
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={isUploadingReal || !realFile}
                className="btn-submit-upload"
              >
                {isUploadingReal ? (
                  <>
                    <span className="spinner-dot" />
                    <span>Upload Cloudinary en cours...</span>
                  </>
                ) : (
                  <>
                    <Upload size={18} />
                    <span>Uploader sur Cloudinary & Ajouter à la Galerie</span>
                  </>
                )}
              </button>
            </form>
          </section>

          {/* Bloc 2 : Gestion des Réalisations Actuelles */}
          <section className="admin-card">
            <div className="admin-card-header flex-between">
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div className="card-header-icon">
                  <Layers size={22} color="#0d9488" />
                </div>
                <div>
                  <h3>Photos & Réalisations de la Galerie ({realisations.length})</h3>
                  <p>Remplacez les photos en 1 clic, modifiez les textes ou réordonnez l'affichage.</p>
                </div>
              </div>

              <div className="admin-card-header-actions">
                <button
                  type="button"
                  onClick={handleCopyJSON}
                  className="btn-action-outline"
                  title="Exporter les données JSON"
                >
                  {copiedCode ? <Check size={15} color="#0d9488" /> : <Copy size={15} />}
                  <span>{copiedCode ? 'Copié !' : 'Exporter JSON'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleResetRealisations}
                  className="btn-action-outline danger"
                  title="Restaurer les 8 réalisations d'origine"
                >
                  <RotateCcw size={15} />
                  <span>Restaurer par défaut</span>
                </button>
              </div>
            </div>

            {/* Filtres par catégorie */}
            <div className="filter-pills-row">
              <button
                type="button"
                className={`filter-pill-btn ${galleryCategoryFilter === 'all' ? 'active' : ''}`}
                onClick={() => setGalleryCategoryFilter('all')}
              >
                Toutes ({realisations.length})
              </button>

              {REALISATION_CATEGORIES.filter((c) => c.id !== 'all').map((cat) => {
                const count = realisations.filter((r) => r.category === cat.id).length;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    className={`filter-pill-btn ${galleryCategoryFilter === cat.id ? 'active' : ''}`}
                    onClick={() => setGalleryCategoryFilter(cat.id)}
                  >
                    <span>{cat.label}</span>
                    <span className="pill-count">{count}</span>
                  </button>
                );
              })}
            </div>

            {/* Grille des réalisations */}
            <div className="gallery-admin-grid">
              {filteredRealisations.map((item, index) => {
                const catMeta = CATEGORY_META[item.category] || CATEGORY_META.ateliers;
                const isCloudinary = item.image.includes('cloudinary');
                const realIndex = realisations.findIndex((r) => r.id === item.id);

                return (
                  <div key={item.id || index} className="gallery-admin-card">
                    {/* Image & Badge */}
                    <div className="gallery-card-img-wrap">
                      <img src={item.image} alt={item.title} loading="lazy" />
                      <div className="gallery-card-badge-top">
                        <span
                          className="gallery-cat-badge"
                          style={{ backgroundColor: catMeta.bg, color: catMeta.color }}
                        >
                          {catMeta.label}
                        </span>
                        <span className="gallery-order-tag">#{realIndex + 1}</span>
                      </div>

                      <div className="gallery-card-img-actions">
                        <button
                          type="button"
                          onClick={() => handleTriggerReplacePhoto(item)}
                          className="btn-overlay-replace"
                          title="Remplacer cette photo par une nouvelle via Cloudinary"
                        >
                          <Camera size={14} />
                          <span>Changer la photo</span>
                        </button>
                      </div>
                    </div>

                    {/* Contenu épuré & centré sur la photo */}
                    <div className="gallery-card-content">
                      <h4 className="gallery-card-title">{item.title}</h4>

                      {/* Barre d'actions */}
                      <div className="gallery-card-footer-actions">
                        <button
                          type="button"
                          onClick={() => handleTriggerReplacePhoto(item)}
                          className="btn-card-action primary"
                          title="Remplacer cette photo via Cloudinary"
                        >
                          <Camera size={15} />
                          <span>Changer la photo</span>
                        </button>

                        <div style={{ display: 'flex', gap: '4px' }}>
                          <button
                            type="button"
                            onClick={() => handleMoveRealisationUp(realIndex)}
                            disabled={realIndex === 0}
                            className="btn-move"
                            title="Monter"
                            aria-label="Monter"
                          >
                            <ArrowUp size={15} />
                          </button>

                          <button
                            type="button"
                            onClick={() => handleMoveRealisationDown(realIndex)}
                            disabled={realIndex === realisations.length - 1}
                            className="btn-move"
                            title="Descendre"
                            aria-label="Descendre"
                          >
                            <ArrowDown size={15} />
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDeleteRealisation(item.id, item.title)}
                            className="btn-delete"
                            title="Supprimer cette réalisation"
                            aria-label="Supprimer"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </main>
      )}



      {/* =========================================================
          MODAL 2 : CONFIGURATION CLOUDINARY
         ========================================================= */}
      {showConfigModal && (
        <div className="modal-backdrop" onClick={() => setShowConfigModal(false)}>
          <div className="modal-content-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Paramètres Cloudinary</h3>
              <button
                type="button"
                onClick={() => setShowConfigModal(false)}
                className="btn-close-modal"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveConfig} className="modal-form">
              <div className="form-group">
                <label>Cloud Name</label>
                <input
                  type="text"
                  value={tempCloudName}
                  onChange={(e) => setTempCloudName(e.target.value)}
                  className="admin-input-field"
                  required
                />
              </div>

              <div className="form-group">
                <label>Upload Preset (Unsigned)</label>
                <input
                  type="text"
                  value={tempPreset}
                  onChange={(e) => setTempPreset(e.target.value)}
                  className="admin-input-field"
                  required
                />
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  onClick={() => setShowConfigModal(false)}
                  className="btn-cancel"
                >
                  Annuler
                </button>
                <button type="submit" className="admin-btn-primary" style={{ padding: '10px 22px' }}>
                  Enregistrer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================
          MODAL 3 : MODIFIER MOT DE PASSE
         ========================================================= */}
      {showPasswordModal && (
        <div className="modal-backdrop" onClick={() => setShowPasswordModal(false)}>
          <div className="modal-content-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Modifier votre Mot de Passe Secret</h3>
              <button
                type="button"
                onClick={() => setShowPasswordModal(false)}
                className="btn-close-modal"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleChangePassword} className="modal-form">
              <div className="form-group">
                <label>Nouveau Mot de Passe</label>
                <input
                  type="password"
                  placeholder="Minimum 4 caractères..."
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="admin-input-field"
                  required
                />
              </div>

              <div className="form-group">
                <label>Confirmer le Nouveau Mot de Passe</label>
                <input
                  type="password"
                  placeholder="Retapez le mot de passe..."
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="admin-input-field"
                  required
                />
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  onClick={() => setShowPasswordModal(false)}
                  className="btn-cancel"
                >
                  Annuler
                </button>
                <button type="submit" className="admin-btn-primary" style={{ padding: '10px 22px' }}>
                  Mettre à Jour
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================
          STYLES CSS PREMIUM & 100% RESPONSIVE (FOND BLANC POINTILLÉ)
         ========================================================= */}
      <style>{`
        .admin-page-container {
          min-height: 100vh;
          /* Fond blanc pointillé signature */
          background-color: #ffffff;
          background-image: radial-gradient(rgba(15, 23, 42, 0.12) 1.25px, transparent 1.25px);
          background-size: 24px 24px;
          background-position: 0 0;
          color: #0f172a;
          padding-bottom: 90px;
        }

        /* En-tête */
        .admin-header {
          background-color: rgba(255, 255, 255, 0.94);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border-bottom: 1px solid rgba(15, 23, 42, 0.08);
          padding: 14px 0;
          position: sticky;
          top: 0;
          z-index: 100;
          box-shadow: 0 2px 10px rgba(15, 23, 42, 0.04);
        }
        .admin-header-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 14px;
        }
        .admin-brand {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .admin-badge {
          background-color: #00f5a0;
          color: #0a1728;
          font-weight: 800;
          font-size: 0.72rem;
          padding: 4px 10px;
          border-radius: 9999px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .admin-brand h2 {
          font-size: 1.15rem;
          font-weight: 800;
          color: #0f172a;
          margin: 0;
          letter-spacing: -0.015em;
        }

        .admin-actions-bar {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }
        .cloudinary-status-pill {
          display: flex;
          align-items: center;
          gap: 8px;
          background-color: #f8fafc;
          border: 1.5px solid rgba(15, 23, 42, 0.1);
          padding: 6px 12px;
          border-radius: 9999px;
          font-size: 0.8rem;
          color: #334155;
        }
        .status-dot-active {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: #00f5a0;
          box-shadow: 0 0 6px rgba(0, 245, 160, 0.8);
        }
        .btn-icon-subtle {
          background: none;
          border: none;
          color: #64748b;
          cursor: pointer;
          padding: 2px;
          display: inline-flex;
          align-items: center;
          transition: color 0.2s ease;
        }
        .btn-icon-subtle:hover {
          color: #0d9488;
        }
        .admin-nav-btn {
          background-color: #ffffff;
          color: #0f172a;
          border: 1.5px solid rgba(15, 23, 42, 0.14);
          padding: 7px 14px;
          border-radius: 9999px;
          font-size: 0.82rem;
          font-weight: 700;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 7px;
          transition: all 0.2s ease;
          box-shadow: 0 1px 3px rgba(15, 23, 42, 0.04);
        }
        .admin-nav-btn:hover {
          background-color: #f8fafc;
          border-color: #0d9488;
          color: #0d9488;
          transform: translateY(-1px);
        }
        .admin-logout-btn {
          background: none;
          border: none;
          color: #64748b;
          font-size: 0.82rem;
          font-weight: 700;
          padding: 7px 10px;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          transition: color 0.2s ease;
        }
        .admin-logout-btn:hover {
          color: #ef4444;
        }

        /* Navigation par Onglets */
        .admin-tabs-nav-bar {
          background-color: #ffffff;
          border-bottom: 1.5px solid rgba(15, 23, 42, 0.08);
          box-shadow: 0 2px 8px rgba(15, 23, 42, 0.02);
        }
        .admin-tabs-nav-inner {
          display: flex;
          align-items: center;
          gap: 12px;
          padding-top: 8px;
          padding-bottom: 8px;
          overflow-x: auto;
        }
        .admin-tab-item {
          background: none;
          border: none;
          padding: 10px 18px;
          border-radius: 9999px;
          font-family: inherit;
          font-size: 0.92rem;
          font-weight: 700;
          color: #475569;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 9px;
          transition: all 0.2s ease;
          white-space: nowrap;
        }
        .admin-tab-item:hover {
          background-color: #f1f5f9;
          color: #0f172a;
        }
        .admin-tab-item.active {
          background-color: #0d9488;
          color: #ffffff;
          box-shadow: 0 4px 14px rgba(13, 148, 136, 0.35);
        }
        .admin-tab-count {
          font-size: 0.76rem;
          padding: 2px 7px;
          border-radius: 9999px;
          background-color: rgba(15, 23, 42, 0.08);
          color: inherit;
        }
        .admin-tab-item.active .admin-tab-count {
          background-color: rgba(255, 255, 255, 0.25);
          color: #ffffff;
        }

        /* Remplacement en cours */
        .replacing-banner {
          background: linear-gradient(90deg, #0d9488, #00f5a0);
          color: #0a1728;
          padding: 12px 20px;
          border-radius: 12px;
          font-weight: 700;
          font-size: 0.92rem;
          display: flex;
          align-items: center;
          gap: 12px;
          box-shadow: 0 4px 16px rgba(0, 245, 160, 0.3);
        }

        /* Cartes & Conteneurs */
        .admin-content-grid {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 32px;
          margin-top: 32px;
          align-items: start;
        }
        .admin-card {
          background-color: #ffffff;
          border: 1px solid rgba(15, 23, 42, 0.08);
          border-radius: 20px;
          padding: clamp(20px, 4vw, 28px);
          margin-bottom: 28px;
          box-shadow: 0 4px 20px -2px rgba(15, 23, 42, 0.06), 0 2px 8px -1px rgba(15, 23, 42, 0.03);
        }
        .admin-card-header {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          margin-bottom: 22px;
        }
        .admin-card-header.flex-between {
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 14px;
        }
        .card-header-icon {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: rgba(13, 148, 136, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .admin-card-header h3 {
          font-size: 1.15rem;
          font-weight: 800;
          color: #0f172a;
          margin-bottom: 3px;
        }
        .admin-card-header p {
          font-size: 0.85rem;
          color: #64748b;
          margin: 0;
        }
        .admin-card-header-actions {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        /* Dropzone */
        .dropzone-area {
          border: 2px dashed rgba(13, 148, 136, 0.4);
          background-color: #f8fafc;
          border-radius: 16px;
          padding: clamp(24px, 4vw, 34px) 20px;
          text-align: center;
          cursor: pointer;
          transition: all 0.22s ease;
          margin-bottom: 20px;
        }
        .dropzone-area:hover {
          border-color: #0d9488;
          background-color: rgba(13, 148, 136, 0.04);
        }
        .upload-cloud-circle {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: rgba(13, 148, 136, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 12px;
        }
        .dropzone-text {
          font-size: 0.95rem;
          color: #1e293b;
          margin-bottom: 4px;
        }
        .dropzone-text strong {
          color: #0d9488;
        }
        .dropzone-hint {
          font-size: 0.78rem;
          color: #64748b;
        }
        .dropzone-preview {
          position: relative;
          max-height: 280px;
          overflow: hidden;
          border-radius: 12px;
        }
        .dropzone-preview img {
          width: 100%;
          max-height: 280px;
          object-fit: cover;
          border-radius: 12px;
        }
        .preview-overlay-info {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: rgba(15, 23, 42, 0.85);
          color: #00f5a0;
          font-weight: 700;
          font-size: 0.8rem;
          padding: 8px;
        }

        /* Formulaire */
        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-bottom: 18px;
        }
        .form-field {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .form-field label, .form-group label {
          font-size: 0.85rem;
          font-weight: 700;
          color: #0f172a;
        }
        .admin-input-field, .admin-select-field {
          background-color: #ffffff;
          border: 1.5px solid rgba(15, 23, 42, 0.15);
          border-radius: 10px;
          color: #0f172a;
          padding: 11px 14px;
          font-size: 0.9rem;
          outline: none;
          transition: all 0.2s ease;
          width: 100%;
        }
        .admin-input-field:focus, .admin-select-field:focus {
          border-color: #0d9488;
          box-shadow: 0 0 0 3px rgba(13, 148, 136, 0.15);
        }
        .admin-select-field option {
          background-color: #ffffff;
          color: #0f172a;
        }
        .field-hint {
          font-size: 0.75rem;
          color: #64748b;
        }

        /* Upload Progress */
        .upload-progress-wrapper {
          margin-bottom: 20px;
        }
        .progress-info {
          display: flex;
          justify-content: space-between;
          font-size: 0.84rem;
          color: #334155;
          margin-bottom: 6px;
        }
        .progress-bar-track {
          width: 100%;
          height: 8px;
          background-color: rgba(15, 23, 42, 0.1);
          border-radius: 9999px;
          overflow: hidden;
        }
        .progress-bar-fill {
          height: 100%;
          background: linear-gradient(90deg, #0d9488 0%, #00f5a0 100%);
          transition: width 0.3s ease;
        }

        .btn-submit-upload {
          width: 100%;
          background-color: #00f5a0;
          color: #0a1728;
          border: none;
          border-radius: 9999px;
          padding: 14px 24px;
          font-size: 0.98rem;
          font-weight: 800;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          transition: all 0.22s ease;
          box-shadow: 0 4px 18px rgba(0, 245, 160, 0.4);
        }
        .btn-submit-upload:hover:not(:disabled) {
          background-color: #1effb1;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0, 245, 160, 0.55);
        }
        .btn-submit-upload:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          box-shadow: none;
        }

        /* Liste des slides Hero */
        .slides-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .slide-item-card {
          display: flex;
          align-items: center;
          gap: 16px;
          background-color: #f8fafc;
          border: 1px solid rgba(15, 23, 42, 0.08);
          border-radius: 14px;
          padding: 12px 16px;
          transition: all 0.2s ease;
        }
        .slide-item-card:hover {
          border-color: rgba(13, 148, 136, 0.3);
          background-color: #ffffff;
          box-shadow: 0 4px 12px rgba(15, 23, 42, 0.04);
        }
        .slide-thumb-wrapper {
          position: relative;
          width: 72px;
          height: 72px;
          border-radius: 12px;
          overflow: hidden;
          background-color: #0f172a;
          flex-shrink: 0;
        }
        .slide-thumb-wrapper img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .slide-order-badge {
          position: absolute;
          top: 4px;
          left: 4px;
          background: rgba(15, 23, 42, 0.8);
          color: #00f5a0;
          font-weight: 800;
          font-size: 0.7rem;
          padding: 2px 6px;
          border-radius: 6px;
        }
        .slide-info-col {
          flex: 1;
          min-width: 0;
        }
        .slide-role-text {
          font-size: 0.95rem;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 4px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .slide-meta-row {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }
        .source-tag {
          font-size: 0.72rem;
          font-weight: 700;
          padding: 2px 8px;
          border-radius: 9999px;
        }
        .source-tag.cloud {
          background-color: rgba(0, 245, 160, 0.15);
          color: #059669;
        }
        .source-tag.local {
          background-color: rgba(15, 23, 42, 0.08);
          color: #475569;
        }
        .pos-tag {
          font-size: 0.72rem;
          color: #64748b;
        }
        .slide-actions-col {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .btn-move, .btn-delete {
          width: 34px;
          height: 34px;
          border-radius: 8px;
          border: 1px solid rgba(15, 23, 42, 0.12);
          background-color: #ffffff;
          color: #475569;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.18s ease;
        }
        .btn-move:hover:not(:disabled) {
          background-color: #f1f5f9;
          color: #0d9488;
          border-color: #0d9488;
        }
        .btn-move:disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }
        .btn-delete:hover {
          background-color: #fef2f2;
          color: #ef4444;
          border-color: #fca5a5;
        }
        .btn-action-outline {
          background-color: #ffffff;
          border: 1.5px solid rgba(15, 23, 42, 0.12);
          color: #334155;
          padding: 6px 12px;
          border-radius: 9999px;
          font-size: 0.78rem;
          font-weight: 700;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          transition: all 0.2s ease;
        }
        .btn-action-outline:hover {
          border-color: #0d9488;
          color: #0d9488;
        }
        .btn-action-outline.danger:hover {
          border-color: #ef4444;
          color: #ef4444;
          background-color: #fef2f2;
        }

        /* Aperçu direct Hero (circulaire) */
        .admin-preview-col {
          position: sticky;
          top: 86px;
        }
        .admin-preview-card {
          background-color: #ffffff;
          border: 1px solid rgba(15, 23, 42, 0.08);
          border-radius: 20px;
          padding: 24px;
          box-shadow: 0 4px 20px -2px rgba(15, 23, 42, 0.06);
          text-align: center;
        }
        .preview-card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 4px;
        }
        .preview-card-header h4 {
          font-size: 1rem;
          font-weight: 800;
          color: #0f172a;
          margin: 0;
        }
        .live-indicator {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 0.74rem;
          font-weight: 800;
          color: #059669;
          background-color: rgba(0, 245, 160, 0.18);
          padding: 3px 9px;
          border-radius: 9999px;
          text-transform: uppercase;
        }
        .live-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: #00f5a0;
          animation: pulseDot 1.5s infinite;
        }
        @keyframes pulseDot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.8); }
        }
        .preview-helper-text {
          font-size: 0.8rem;
          color: #64748b;
          margin-bottom: 24px;
          text-align: left;
        }

        .preview-stage-container {
          display: flex;
          justify-content: center;
          padding: 10px 0 20px;
        }
        .preview-circle-stage {
          position: relative;
          width: 300px;
          height: 300px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .preview-guide-ring {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          border: 1.5px dashed rgba(13, 148, 136, 0.35);
          animation: spinSlow 30s linear infinite;
        }
        @keyframes spinSlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .preview-accent-top {
          position: absolute;
          top: -2px;
          left: 50%;
          transform: translateX(-50%);
          width: 48px;
          height: 4px;
          border-radius: 9999px;
          background-color: #00f5a0;
        }
        .preview-accent-bottom {
          position: absolute;
          bottom: -2px;
          left: 50%;
          transform: translateX(-50%);
          width: 32px;
          height: 4px;
          border-radius: 9999px;
          background-color: #0d9488;
        }
        .preview-photo-circle {
          position: relative;
          width: 265px;
          height: 265px;
          border-radius: 50%;
          overflow: hidden;
          background-color: #0a0f1d;
          box-shadow: 0 16px 36px -8px rgba(13, 148, 136, 0.28), 0 0 0 4px #ffffff;
        }
        .preview-slide-img {
          position: absolute;
          inset: 0;
          opacity: 0;
          transition: opacity 0.8s ease-in-out;
        }
        .preview-slide-img.active {
          opacity: 1;
        }
        .preview-slide-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .preview-name-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 16px 12px 14px;
          background: linear-gradient(180deg, transparent 0%, rgba(10, 15, 29, 0.92) 80%);
          color: #ffffff;
          text-align: center;
          z-index: 5;
        }
        .preview-author-name {
          font-size: 0.86rem;
          font-weight: 800;
          color: #ffffff;
          letter-spacing: -0.01em;
        }
        .preview-author-role {
          font-size: 0.68rem;
          color: #00f5a0;
          font-weight: 600;
          margin-top: 2px;
        }
        .preview-dots-row {
          display: flex;
          justify-content: center;
          gap: 6px;
          margin-top: 14px;
        }
        .dot-indicator {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          border: none;
          background-color: rgba(15, 23, 42, 0.2);
          cursor: pointer;
          transition: all 0.2s ease;
          padding: 0;
        }
        .dot-indicator.active {
          width: 24px;
          border-radius: 9999px;
          background-color: #0d9488;
        }

        /* =========================================================
           STYLES SPÉCIFIQUES À LA GALERIE & RÉALISATIONS
           ========================================================= */
        .filter-pills-row {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
          margin-bottom: 24px;
          padding-bottom: 16px;
          border-bottom: 1px solid rgba(15, 23, 42, 0.08);
        }
        .filter-pill-btn {
          background-color: #f8fafc;
          border: 1.5px solid rgba(15, 23, 42, 0.1);
          color: #334155;
          padding: 7px 14px;
          border-radius: 9999px;
          font-size: 0.82rem;
          font-weight: 600;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 7px;
          transition: all 0.2s ease;
        }
        .filter-pill-btn:hover {
          background-color: #ffffff;
          border-color: #0d9488;
          color: #0d9488;
        }
        .filter-pill-btn.active {
          background-color: #0d9488;
          border-color: #0d9488;
          color: #ffffff;
          box-shadow: 0 2px 8px rgba(13, 148, 136, 0.3);
        }
        .pill-count {
          font-size: 0.72rem;
          padding: 2px 6px;
          border-radius: 9999px;
          background-color: rgba(15, 23, 42, 0.08);
        }
        .filter-pill-btn.active .pill-count {
          background-color: rgba(255, 255, 255, 0.25);
          color: #ffffff;
        }

        .gallery-admin-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 22px;
        }
        .gallery-admin-card {
          background-color: #ffffff;
          border: 1.5px solid rgba(15, 23, 42, 0.09);
          border-radius: 18px;
          overflow: hidden;
          transition: all 0.22s ease;
          display: flex;
          flex-direction: column;
        }
        .gallery-admin-card:hover {
          border-color: #0d9488;
          box-shadow: 0 8px 24px -4px rgba(13, 148, 136, 0.15);
          transform: translateY(-2px);
        }
        .gallery-card-img-wrap {
          position: relative;
          width: 100%;
          height: 190px;
          background-color: #0f172a;
          overflow: hidden;
        }
        .gallery-card-img-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }
        .gallery-admin-card:hover .gallery-card-img-wrap img {
          transform: scale(1.03);
        }
        .gallery-card-badge-top {
          position: absolute;
          top: 10px;
          left: 10px;
          right: 10px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .gallery-cat-badge {
          font-size: 0.72rem;
          font-weight: 800;
          padding: 4px 10px;
          border-radius: 9999px;
          backdrop-filter: blur(8px);
          background-color: #ffffff !important;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
        }
        .gallery-order-tag {
          font-size: 0.72rem;
          font-weight: 800;
          padding: 3px 8px;
          border-radius: 9999px;
          background-color: rgba(15, 23, 42, 0.85);
          color: #00f5a0;
        }

        .gallery-card-img-actions {
          position: absolute;
          bottom: 10px;
          right: 10px;
        }
        .btn-overlay-replace {
          background-color: rgba(15, 23, 42, 0.85);
          backdrop-filter: blur(6px);
          color: #ffffff;
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 9999px;
          padding: 5px 12px;
          font-size: 0.76rem;
          font-weight: 700;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          transition: all 0.2s ease;
        }
        .btn-overlay-replace:hover {
          background-color: #0d9488;
          border-color: #0d9488;
          color: #ffffff;
        }

        .gallery-card-content {
          padding: 16px;
          display: flex;
          flex-direction: column;
          flex: 1;
        }
        .gallery-card-title {
          font-size: 1rem;
          font-weight: 800;
          color: #0f172a;
          margin-bottom: 10px;
          line-height: 1.35;
        }
        .gallery-card-meta-list {
          display: flex;
          flex-direction: column;
          gap: 4px;
          margin-bottom: 10px;
        }
        .meta-item {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.78rem;
          color: #475569;
        }
        .gallery-card-desc {
          font-size: 0.82rem;
          color: #64748b;
          line-height: 1.45;
          margin-bottom: 12px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .gallery-card-impact {
          display: flex;
          align-items: center;
          gap: 8px;
          background-color: rgba(13, 148, 136, 0.08);
          border: 1px solid rgba(13, 148, 136, 0.18);
          border-radius: 8px;
          padding: 6px 10px;
          font-size: 0.78rem;
          color: #0d9488;
          font-weight: 700;
          margin-bottom: 16px;
          margin-top: auto;
        }
        .impact-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: #00f5a0;
        }
        .gallery-card-footer-actions {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          padding-top: 12px;
          border-top: 1px solid rgba(15, 23, 42, 0.08);
        }
        .btn-card-action {
          padding: 6px 12px;
          border-radius: 8px;
          font-size: 0.78rem;
          font-weight: 700;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 5px;
          transition: all 0.18s ease;
          border: none;
        }
        .btn-card-action.primary {
          background-color: rgba(13, 148, 136, 0.12);
          color: #0d9488;
        }
        .btn-card-action.primary:hover {
          background-color: #0d9488;
          color: #ffffff;
        }
        .btn-card-action.secondary {
          background-color: #f1f5f9;
          color: #334155;
        }
        .btn-card-action.secondary:hover {
          background-color: #e2e8f0;
          color: #0f172a;
        }

        /* Modals */
        .modal-backdrop {
          position: fixed;
          inset: 0;
          background-color: rgba(15, 23, 42, 0.6);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 20px;
        }
        .modal-content-card {
          background-color: #ffffff;
          border: 1px solid rgba(15, 23, 42, 0.12);
          border-radius: 20px;
          max-width: 460px;
          width: 100%;
          padding: 28px;
          color: #0f172a;
          box-shadow: 0 25px 60px rgba(15, 23, 42, 0.25);
          max-height: 90vh;
          overflow-y: auto;
        }
        .modal-content-card.modal-large {
          max-width: 580px;
        }
        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }
        .modal-header h3 {
          font-size: 1.2rem;
          font-weight: 800;
          color: #0f172a;
          margin: 0;
        }
        .btn-close-modal {
          background: none;
          border: none;
          color: #64748b;
          font-size: 1.2rem;
          cursor: pointer;
        }
        .btn-close-modal:hover {
          color: #0f172a;
        }
        .modal-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .modal-actions {
          display: flex;
          justify-content: flex-end;
          gap: 12px;
          margin-top: 10px;
        }
        .btn-cancel {
          background: none;
          border: 1.5px solid rgba(15, 23, 42, 0.15);
          color: #475569;
          font-weight: 600;
          border-radius: 9999px;
          padding: 10px 18px;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .btn-cancel:hover {
          background-color: #f8fafc;
          color: #0f172a;
        }

        /* Toasts */
        .admin-toast {
          position: fixed;
          bottom: 24px;
          right: 24px;
          padding: 14px 20px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          gap: 12px;
          z-index: 2000;
          font-weight: 700;
          font-size: 0.92rem;
          box-shadow: 0 10px 30px rgba(15, 23, 42, 0.18);
          animation: slideUpToast 0.3s ease-out;
        }
        @keyframes slideUpToast {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .admin-toast.success {
          background-color: #0f172a;
          color: #00f5a0;
          border: 1px solid rgba(0, 245, 160, 0.3);
        }
        .admin-toast.error {
          background-color: #fef2f2;
          color: #dc2626;
          border: 1px solid #fecaca;
        }

        .spinner-dot {
          width: 14px;
          height: 14px;
          border: 2px solid rgba(10, 23, 40, 0.25);
          border-top-color: #0a1728;
          border-radius: 50%;
          animation: spinSpinner 0.8s linear infinite;
        }
        @keyframes spinSpinner {
          to { transform: rotate(360deg); }
        }

        /* =========================================================
           RESPONSIVE MOBILE & TABLETTE
           ========================================================= */
        @media (max-width: 1024px) {
          .admin-content-grid {
            grid-template-columns: 1fr;
            gap: 24px;
          }
          .admin-preview-col {
            position: static;
            order: -1;
          }
          .preview-circle-stage {
            width: 260px;
            height: 260px;
          }
          .preview-photo-circle {
            width: 228px;
            height: 228px;
          }
        }

        @media (max-width: 768px) {
          .admin-header-inner {
            flex-direction: column;
            align-items: stretch;
            gap: 12px;
          }
          .admin-brand {
            justify-content: center;
          }
          .admin-actions-bar {
            justify-content: center;
            width: 100%;
          }
          .form-row {
            grid-template-columns: 1fr;
          }
          .gallery-admin-grid {
            grid-template-columns: 1fr;
          }
          .slide-item-card {
            flex-wrap: wrap;
          }
          .slide-actions-col {
            margin-left: auto;
          }
          .admin-card-header.flex-between {
            flex-direction: column;
            align-items: flex-start;
          }
          .admin-card-header-actions {
            width: 100%;
            justify-content: flex-start;
          }
        }

        @media (max-width: 480px) {
          .admin-brand h2 {
            font-size: 1rem;
          }
          .admin-tab-item {
            font-size: 0.82rem;
            padding: 8px 12px;
          }
          .admin-actions-bar {
            gap: 6px;
          }
          .cloudinary-status-pill {
            font-size: 0.74rem;
            padding: 5px 10px;
          }
          .admin-nav-btn {
            font-size: 0.78rem;
            padding: 6px 10px;
          }
          .btn-submit-upload {
            font-size: 0.92rem;
            padding: 12px 18px;
          }
        }
      `}</style>
    </div>
  );
}
