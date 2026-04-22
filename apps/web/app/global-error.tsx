'use client';

import { useEffect } from 'react';

/**
 * Global error — intercepte les erreurs qui cassent le root layout.
 * Doit inclure son propre <html> + <body> (le layout a crashé).
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('[nacks] global error:', error);
  }, [error]);

  return (
    <html lang="fr">
      <body
        style={{
          backgroundColor: '#0A0A0A',
          color: '#F5F1E8',
          fontFamily: 'sans-serif',
          margin: 0,
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px',
        }}
      >
        <div style={{ maxWidth: '560px', textAlign: 'center' }}>
          <p
            style={{
              fontSize: '12px',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: '#E63946',
              marginBottom: '20px',
            }}
          >
            Erreur critique
          </p>
          <h1
            style={{
              fontSize: 'clamp(2.5rem, 8vw, 5rem)',
              fontWeight: 500,
              letterSpacing: '-0.035em',
              lineHeight: 0.95,
              margin: '0 0 24px',
            }}
          >
            Le royaume<br />s'est interrompu.
          </h1>
          <p style={{ fontSize: '16px', lineHeight: 1.6, color: '#9a958c', marginBottom: '32px' }}>
            Le site a rencontré une erreur profonde. Je reprends le contrôle : essaie un refresh, sinon
            reviens dans quelques minutes.
          </p>
          <button
            type="button"
            onClick={reset}
            style={{
              background: '#F5F1E8',
              color: '#0A0A0A',
              border: 'none',
              padding: '14px 28px',
              fontSize: '13px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              fontWeight: 500,
            }}
          >
            Retenter
          </button>
        </div>
      </body>
    </html>
  );
}
