import React from 'react';
import { BookOpen, Calendar, Clock, ArrowRight, MessageSquare } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export function ArticlesSection({ onOpenBooking }) {
  const { articles, t, lang } = useLanguage();

  const labels = {
    fr: {
      takeaway: "Ce qu'il faut en retenir :",
      btn: "Échanger sur cette analyse"
    },
    en: {
      takeaway: "Key Takeaway:",
      btn: "Discuss this analysis"
    },
    pt: {
      takeaway: "O que você precisa saber:",
      btn: "Conversar sobre esta análise"
    }
  };

  const l = labels[lang] || labels.fr;

  return (
    <section id="articles" style={{ padding: '90px 0', position: 'relative' }}>
      <div className="container">
        <div className="section-center reveal-on-scroll">
          <h2 className="section-title">
            {t('articlesSection.title') || "Analyses & Décryptages Technologiques"}
          </h2>
          <p className="section-subtitle">
            {t('articlesSection.subtitle') || "Comprendre les sous-jacents technologiques pour prendre des décisions d’affaires éclairées, sans céder aux effets de mode passagers."}
          </p>
        </div>

        <div className="grid-3" style={{ marginBottom: '40px' }}>
          {articles.map((art) => (
            <div
              key={art.id}
              className="card reveal-on-scroll"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                backgroundColor: '#ffffff'
              }}
            >
              <div>
                {/* Meta details */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '0.78rem',
                    color: 'var(--text-muted)',
                    marginBottom: '12px'
                  }}
                >
                  <span
                    style={{
                      fontWeight: '700',
                      color: 'var(--color-brand-primary)',
                      backgroundColor: 'var(--color-brand-light)',
                      padding: '3px 8px',
                      borderRadius: 'var(--radius-sm)'
                    }}
                  >
                    {art.category}
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Clock size={12} />
                    <span>{art.readTime}</span>
                  </div>
                </div>

                <h3
                  style={{
                    fontSize: '1.18rem',
                    fontWeight: '700',
                    color: 'var(--text-primary)',
                    marginBottom: '12px',
                    lineHeight: 1.35
                  }}
                >
                  {art.title}
                </h3>

                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '16px' }}>
                  {art.excerpt}
                </p>

                {/* Key Takeaway Box */}
                <div
                  style={{
                    padding: '12px',
                    backgroundColor: '#f8fafc',
                    borderRadius: 'var(--radius-md)',
                    borderLeft: '3px solid var(--color-brand-primary)',
                    fontSize: '0.82rem',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.5,
                    marginBottom: '16px'
                  }}
                >
                  <strong style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '2px' }}>
                    {l.takeaway}
                  </strong>
                  {art.keyTakeaway}
                </div>
              </div>

              {/* Action Button */}
              <div style={{ paddingTop: '14px', borderTop: '1px solid var(--border-subtle)' }}>
                <button
                  onClick={() => onOpenBooking(`Discussion : ${art.title}`)}
                  className="btn btn-outline btn-sm btn-block"
                >
                  <MessageSquare size={14} color="var(--color-brand-primary)" />
                  <span>{l.btn}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
