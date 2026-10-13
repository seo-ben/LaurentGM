import React from 'react';
import { METRICS } from '../data/content';

export function MetricsTicker() {
  // Duplicate items for continuous smooth infinite scrolling
  const tickerItems = [...METRICS, ...METRICS, ...METRICS];

  return (
    <section
      className="metrics-ticker-section"
      style={{
        padding: '16px 0',
        backgroundColor: 'rgba(255, 255, 255, 0.85)',
        backdropFilter: 'blur(10px)',
        borderTop: '1px solid rgba(15, 23, 42, 0.08)',
        borderBottom: '1px solid rgba(15, 23, 42, 0.08)',
        overflow: 'hidden',
        position: 'relative',
        zIndex: 10
      }}
    >
      {/* Left and right fade gradient masks */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          width: '80px',
          background: 'linear-gradient(to right, rgba(255, 255, 255, 0.95), transparent)',
          zIndex: 2,
          pointerEvents: 'none'
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          width: '80px',
          background: 'linear-gradient(to left, rgba(255, 255, 255, 0.95), transparent)',
          zIndex: 2,
          pointerEvents: 'none'
        }}
      />

      {/* Infinite scrolling track */}
      <div className="metrics-ticker-wrapper">
        <div className="metrics-ticker-track">
          {tickerItems.map((metric, idx) => {
            return (
              <div
                key={`${metric.label}-${idx}`}
                className="metrics-ticker-item"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '8px 24px',
                  borderRadius: '9999px',
                  backgroundColor: '#ffffff',
                  border: '1px solid rgba(15, 23, 42, 0.08)',
                  boxShadow: '0 2px 8px rgba(15, 23, 42, 0.04)',
                  flexShrink: 0,
                  whiteSpace: 'nowrap',
                  cursor: 'default',
                  transition: 'all 0.25s ease'
                }}
              >
                {/* Metric Value */}
                <span
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.42rem',
                    fontWeight: '900',
                    color: '#0d9488',
                    letterSpacing: '-0.02em',
                    lineHeight: 1
                  }}
                >
                  {metric.value}
                </span>

                {/* Metric Label */}
                <span
                  style={{
                    fontWeight: '800',
                    fontSize: '0.92rem',
                    color: '#0f172a',
                    lineHeight: 1.2
                  }}
                >
                  {metric.label}
                </span>

                {/* Subtitle in subtle gray */}
                <span
                  style={{
                    fontSize: '0.8rem',
                    color: '#64748b'
                  }}
                >
                  • {metric.sub}
                </span>

                {/* Separator icon */}
                <span
                  style={{
                    color: '#cbd5e1',
                    fontSize: '0.85rem',
                    marginLeft: '8px',
                    display: 'inline-flex',
                    alignItems: 'center'
                  }}
                >
                  ✦
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .metrics-ticker-wrapper {
          display: flex;
          overflow: hidden;
          width: 100%;
        }

        .metrics-ticker-track {
          display: flex;
          align-items: center;
          gap: 16px;
          animation: metricsTickerScroll 42s linear infinite;
          will-change: transform;
        }

        .metrics-ticker-track:hover {
          animation-play-state: paused;
        }

        .metrics-ticker-item:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 14px rgba(13, 148, 136, 0.15);
          border-color: rgba(13, 148, 136, 0.35);
        }

        @keyframes metricsTickerScroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }

        @media (max-width: 768px) {
          .metrics-ticker-section {
            padding: 10px 0 !important;
          }
        }
      `}</style>
    </section>
  );
}
