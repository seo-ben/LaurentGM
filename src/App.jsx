import React, { useState, useEffect } from 'react';
import { useScrollReveal } from './hooks/useScrollReveal';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { WhatsAppBookingModal } from './components/WhatsAppBookingModal';
import { PaymentSuccessModal } from './components/PaymentSuccessModal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { ScrollToTop } from './components/ScrollToTop';

import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { RealisationsPage } from './pages/RealisationsPage';
import { PricingPage } from './pages/PricingPage';
import { AboutPage } from './pages/AboutPage';
import { BlogPage } from './pages/BlogPage';
import { ContactPage } from './pages/ContactPage';
import { AdminPage } from './pages/AdminPage';

import { useLanguage } from './i18n/LanguageContext';

export default function App() {
  const { pageSeo, lang } = useLanguage();
  const [currentPage, setCurrentPage] = useState(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      const validPages = ['home', 'services', 'realisations', 'pricing', 'about', 'blog', 'contact', 'studio'];
      if (validPages.includes(hash)) return hash;
    }
    return 'home';
  });
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [bookingData, setBookingData] = useState(null);
  const [paymentSuccessOpen, setPaymentSuccessOpen] = useState(false);

  // Détection du retour de paiement Stripe (?paiement=succes ou ?payment=success ou #paiement-succes)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const hasPaiementSucces =
      params.get('paiement') === 'succes' ||
      params.get('payment') === 'success' ||
      window.location.hash === '#paiement-succes';

    if (hasPaiementSucces) {
      setPaymentSuccessOpen(true);
    }
  }, []);

  const handleClosePaymentSuccess = () => {
    setPaymentSuccessOpen(false);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.delete('paiement');
      url.searchParams.delete('payment');
      if (url.hash === '#paiement-succes') {
        url.hash = '';
      }
      history.replaceState(null, '', url.pathname + (url.search ? url.search : '') + (url.hash ? url.hash : ''));
    }
  };

  // Dynamic SEO, title and meta description update on every page change AND language change
  useEffect(() => {
    const seo = (pageSeo && pageSeo[currentPage]) || (pageSeo && pageSeo.home) || {
      title: "LGM Consulting | Innovation & Rentabilité",
      description: "Cabinet de conseil en innovations technologiques, IA et rentabilité opérationnelle."
    };
    document.title = seo.title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', seo.description);
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', seo.title);
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', seo.description);
    const twTitle = document.querySelector('meta[name="twitter:title"]');
    if (twTitle) twTitle.setAttribute('content', seo.title);
    const twDesc = document.querySelector('meta[name="twitter:description"]');
    if (twDesc) twDesc.setAttribute('content', seo.description);

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
  }, [currentPage, lang, pageSeo]);

  // Handle browser back/forward and deep link hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      const validPages = ['home', 'services', 'realisations', 'pricing', 'about', 'blog', 'contact', 'studio'];
      if (validPages.includes(hash)) {
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

  const handleOpenBooking = (payload = 'Consultation Stratégique (90 $)') => {
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
        {currentPage === 'studio' && (
          <AdminPage onNavigate={setCurrentPage} />
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

      {/* Modale Succès Paiement Stripe avec notification WhatsApp immédiate au cabinet */}
      <PaymentSuccessModal
        isOpen={paymentSuccessOpen}
        onClose={handleClosePaymentSuccess}
      />

      {/* Floating WhatsApp Quick Contact Button */}
      <FloatingWhatsApp onOpenBooking={handleOpenBooking} />

      {/* Floating Scroll to Top Button */}
      <ScrollToTop />
    </div>
  );
}
