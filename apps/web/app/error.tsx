'use client';

import { useEffect } from 'react';
import { Container } from '@nacks/ui';
import { PageShell } from '@/components/layouts/PageShell';
import { DripButton } from '@/components/ui/DripButton';

const INK = 'var(--color-ink, #0a0a0a)';
const CREAM = 'var(--color-cream, #f5f1e8)';

const FONT_SERIF =
  "var(--font-serif, 'Playfair Display', Georgia, serif)";
const FONT_BODY = "var(--font-body, Inter, system-ui, sans-serif)";
const FONT_GRAFFITI =
  "var(--font-graffiti, 'Permanent Marker', system-ui, sans-serif)";

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

/**
 * Root error boundary — Next.js spec : MUST be a client component.
 *
 * DA pivot e-commerce galerie premium :
 *   cream background, ink text, Playfair italic display, Inter body.
 *   Pas d'urgence, pas de panique. Posé, calme, pro.
 *   1 micro tag NACKS coin haut droit (max 1 spray accent).
 */
export default function Error({ error, reset }: Props) {
  useEffect(() => {
    // Log côté client. Sentry est branché ailleurs si dispo.
    console.error('[nacks] route error:', error);
  }, [error]);

  return (
    <PageShell>
      <section
        aria-labelledby="err-title"
        className="relative w-full overflow-hidden"
        style={{
          backgroundColor: CREAM,
          color: INK,
          paddingBlock: 'clamp(5rem, 14vh, 10rem)',
          minHeight: 'calc(100svh - 5rem)',
        }}
      >
        {/* Micro tag NACKS — coin haut droit, ultra discret */}
        <span
          aria-hidden
          className="pointer-events-none absolute select-none"
          style={{
            top: 'clamp(1.5rem, 3vh, 2.5rem)',
            right: 'clamp(1.5rem, 4vw, 5rem)',
            fontFamily: FONT_GRAFFITI,
            fontSize: 'clamp(0.85rem, 1vw, 1rem)',
            letterSpacing: '0.18em',
            color: INK,
            opacity: 0.55,
            transform: 'rotate(-4deg)',
          }}
        >
          NACKS
        </span>

        <Container size="content" className="relative flex flex-col items-start gap-[clamp(1.75rem,3vh,2.5rem)]">
          {/* Eyebrow */}
          <p
            className="uppercase"
            style={{
              fontFamily: FONT_BODY,
              fontSize: 'clamp(0.7rem, 0.78vw, 0.82rem)',
              letterSpacing: '0.28em',
              color: 'rgba(10,10,10,0.55)',
              margin: 0,
            }}
          >
            Erreur · Service interrompu
          </p>

          {/* Titre serif italic XL */}
          <h1
            id="err-title"
            style={{
              fontFamily: FONT_SERIF,
              fontStyle: 'italic',
              fontWeight: 400,
              fontSize: 'clamp(2.5rem, 7vw, 5.5rem)',
              lineHeight: 1.0,
              letterSpacing: '-0.025em',
              color: INK,
              margin: 0,
            }}
          >
            Une erreur est survenue.
          </h1>

          {/* Sous-titre rassurant */}
          <p
            className="max-w-xl"
            style={{
              fontFamily: FONT_BODY,
              fontSize: 'clamp(1rem, 1.05vw, 1.15rem)',
              lineHeight: 1.55,
              color: 'rgba(10,10,10,0.7)',
              margin: 0,
            }}
          >
            Pas de panique. Naguy a été prévenu, on regarde.
          </p>

          {/* Référence digest (si dispo) */}
          {error?.digest ? (
            <p
              style={{
                fontFamily: FONT_BODY,
                fontSize: 'clamp(0.78rem, 0.85vw, 0.9rem)',
                letterSpacing: '0.04em',
                color: 'rgba(10,10,10,0.5)',
                margin: 0,
              }}
            >
              Référence&nbsp;: <span style={{ fontFamily: 'var(--font-mono)' }}>{error.digest}</span>
            </p>
          ) : (
            <p
              style={{
                fontFamily: FONT_BODY,
                fontSize: 'clamp(0.78rem, 0.85vw, 0.9rem)',
                letterSpacing: '0.04em',
                color: 'rgba(10,10,10,0.5)',
                margin: 0,
              }}
            >
              NACKS GALERIE · Erreur applicative
            </p>
          )}

          {/* CTAs pill — Réessayer (primary) + Accueil (secondary) */}
          <div
            className="flex flex-wrap items-center"
            style={{
              gap: 'clamp(0.7rem, 1.3vw, 1.2rem)',
              marginTop: 'clamp(1rem, 2vh, 1.5rem)',
            }}
          >
            <DripButton
              type="button"
              variant="primary"
              glow="pink"
              size="md"
              onClick={() => reset()}
            >
              Réessayer
            </DripButton>

            <DripButton href="/" variant="secondary" size="md">
              Retour à l&apos;accueil
            </DripButton>
          </div>
        </Container>
      </section>
    </PageShell>
  );
}
