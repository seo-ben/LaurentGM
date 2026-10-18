import React, { useState, useEffect } from 'react';
import { useScrollReveal } from './hooks/useScrollReveal';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { WhatsAppBookingModal } from './components/WhatsAppBookingModal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';

import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { RealisationsPage } from './pages/RealisationsPage';
import { PricingPage } from './pages/PricingPage';
import { AboutPage } from './pages/AboutPage';
import { BlogPage } from './pages/BlogPage';
import { ContactPage } from './pages/ContactPage';

const PAGE_SEO = {
  home: {
    title: "Laurent G-M Manouaba | Où l’Innovation Rencontre la Rentabilité",
    description: "Cabinet de conseil en innovations technologiques, IA et rentabilité opérationnelle dirigé par Laurent G-M Manouaba. Réservez votre audit stratégique de 30 min offert."
  },
  services: {
    title: "12 Services & Expertises Technologiques | Laurent G-M Manouaba",
    description: "Catalogue complet des 12 services : IA & Machine Learning, Big Data, R&D de rupture, audit d'architecture et stratégie de rentabilité opérationnelle."
  },
  realisations: {
    title: "Galerie & Réalisations de Terrain | Laurent G-M Manouaba",
    description: "Portfolio photographique et études de cas réels : ateliers pour dirigeants, audits stratégiques de rentabilité, R&D et keynotes de Laurent G-M Manouaba."
  },
  pricing: {
    title: "Prix & Formules de Consultance 100% Transparentes | Laurent G-M Manouaba",
    description: "Découvrez nos forfaits d'accompagnement moral annuel et nos packs d'intervention ponctuelle (Basic 90 $, Business 490 $, Premium 2000 $). Zéro frais caché."
  },
  about: {
    title: "À Propos de Laurent G-M Manouaba | Parcours, Vision & Réseau d'Experts",
    description: "Découvrez le parcours multidisciplinaire de Laurent Manouaba : ingénierie de pointe, immersion terrain et réseau actif de 67+ experts internationaux."
  },
  blog: {
    title: "Blog & Publications de Prospective Technologique | Laurent G-M Manouaba",
    description: "Articles et analyses approfondies sur Bitcoin, l'intelligence artificielle, la gestion de l'eustress et le management de la transformation numérique."
  },
  contact: {
    title: "Contact & Prise de Rendez-vous | Laurent G-M Manouaba",
    description: "Prenez rendez-vous directement pour un appel de cadrage stratégique gratuit de 30 minutes avec Laurent Manouaba. Réponse sous quelques heures."
  }
};

export default function App() {
  const [currentPage, setCurrentPage] = useState(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (PAGE_SEO[hash]) return hash;
    }
    return 'home';
  });
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [bookingData, setBookingData] = useState(null);

  // Dynamic SEO, title and meta description update on every page change
  useEffect(() => {
    const seo = PAGE_SEO[currentPage] || PAGE_SEO.home;
    document.title = seo.title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', seo.description);
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', seo.title);
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', seo.description);

    if (currentPage === 'home') {
      if (window.location.hash) {
        history.replaceState(null, '', window.location.pathname + window.location.search);
      }
    } else {
      if (window.location.hash !== `#${currentPage}`) {
        history.pushState(null, '', `#${currentPage}`);
      }
    }
    window.scrollTo(0, 0);
  }, [currentPage]);

  // Handle browser back/forward and deep link hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (PAGE_SEO[hash]) {
        setCurrentPage(hash);
      } else if (!hash) {
        setCurrentPage('home');
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Observe and animate scroll-revealed elements (cards, text, images) on every page change
  useScrollReveal([currentPage]);

  const handleOpenBooking = (payload = 'Audit Découverte Initial Offert') => {
    if (typeof payload === 'object' && payload !== null) {
      setBookingData(payload);
      setSelectedSubject(payload.subject || payload.planName || '');
    } else {
      setBookingData(null);
      setSelectedSubject(payload);
    }
    setBookingModalOpen(true);
  };

  const handleCloseBooking = () => {
    setBookingModalOpen(false);
    setBookingData(null);
  };

  return (
    <div className="app-wrapper" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Top Multi-page Header */}
      <Header
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        onOpenBooking={handleOpenBooking}
      />

      {/* Real Multi-page Views */}
      <main style={{ flex: 1 }}>
        {currentPage === 'home' && (
          <HomePage onNavigate={setCurrentPage} onOpenBooking={handleOpenBooking} />
        )}
        {currentPage === 'services' && (
          <ServicesPage onOpenBooking={handleOpenBooking} />
        )}
        {currentPage === 'realisations' && (
          <RealisationsPage onOpenBooking={handleOpenBooking} />
        )}
        {currentPage === 'pricing' && (
          <PricingPage onOpenBooking={handleOpenBooking} />
        )}
        {currentPage === 'about' && (
          <AboutPage onOpenBooking={handleOpenBooking} />
        )}
        {currentPage === 'blog' && (
          <BlogPage onOpenBooking={handleOpenBooking} />
        )}
        {currentPage === 'contact' && (
          <ContactPage />
        )}
      </main>

      {/* Multi-page Footer */}
      <Footer
        onNavigate={setCurrentPage}
        onOpenBooking={handleOpenBooking}
      />

      {/* WhatsApp Modal with live message generator and prefilled launch */}
      <WhatsAppBookingModal
        isOpen={bookingModalOpen}
        onClose={handleCloseBooking}
        initialSubject={selectedSubject}
        bookingData={bookingData}
      />

      {/* Floating WhatsApp Quick Contact Button */}
      <FloatingWhatsApp onOpenBooking={handleOpenBooking} />
    </div>
  );
}
