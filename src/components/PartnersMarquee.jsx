import React from 'react';

export function PartnersMarquee() {
  const partners = [
    { 
      name: 'Google Cloud & AI', 
      logo: '/assets/partner-google.svg', 
      height: 38,
      maxWidth: 240
    },
    { 
      name: 'Microsoft Azure & Tech', 
      logo: '/assets/partner-microsoft.svg', 
      height: 38,
      maxWidth: 190
    },
    { 
      name: 'OpenAI ChatGPT & LLMs', 
      logo: '/assets/partner-openai.svg', 
      height: 40,
      maxWidth: 170
    },
    { 
      name: 'Meta AI & Open Models', 
      logo: '/assets/partner-meta.svg', 
      height: 36,
      maxWidth: 180
    },
    { 
      name: 'Amazon AWS Cloud', 
      logo: '/assets/partner-amazon.svg', 
      height: 48,
      maxWidth: 110
    },
    { 
      name: 'Alibaba Cloud & Global Trade', 
      logo: '/assets/partner-alibaba.svg', 
      height: 34,
      maxWidth: 250
    }
  ];

  return (
    <section
      style={{
        padding: '52px 0 64px',
        borderTop: '1px solid var(--border-subtle)',
        borderBottom: '1px solid var(--border-subtle)',
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        backdropFilter: 'blur(6px)'
      }}
    >
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <p
            style={{
              fontSize: '0.8125rem',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '0.09em',
              color: 'var(--text-muted)'
            }}
          >
            Écosystèmes, Plateformes Cloud & Standards Technologiques Intégrés
          </p>
        </div>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '44px 54px'
          }}
        >
          {partners.map((partner) => (
            <div
              key={partner.name}
              title={partner.name}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'transform 0.25s ease, opacity 0.25s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <img
                src={partner.logo}
                alt={partner.name}
                style={{
                  height: `${partner.height}px`,
                  maxWidth: `${partner.maxWidth}px`,
                  width: 'auto',
                  objectFit: 'contain',
                  opacity: 0.88,
                  transition: 'opacity 0.25s ease, filter 0.25s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = '1';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = '0.88';
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
