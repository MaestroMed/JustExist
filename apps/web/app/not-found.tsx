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

export const metadata = {
  title: 'Page introuvable — Nacks Galerie',
  description:
    "Cette adresse ne mène nulle part. Peut-être un lien ancien ou une typo.",
  robots: { index: false, follow: false },
};

/**
 * 404 — Page introuvable.
 *
 * DA pivot e-commerce galerie premium :
 *   cream background, ink text, Playfair italic display, Inter body.
 *   1 mini drip noir SVG sous le titre + 1 micro tag NACKS coin haut droit.
 *   Calme, posé, espace négatif généreux. Aucune urgence, aucun marketing.
 */
export default function NotFound() {
  return (
    <PageShell>
      <section
        aria-labelledby="nf-title"
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
            404 · Page introuvable
          </p>

          {/* Titre serif italic XXL + mini drip dessous */}
          <div className="relative">
            <h1
              id="nf-title"
              style={{
                fontFamily: FONT_SERIF,
                fontStyle: 'italic',
                fontWeight: 400,
                fontSize: 'clamp(3rem, 9vw, 7rem)',
                lineHeight: 0.98,
                letterSpacing: '-0.025em',
                color: INK,
                margin: 0,
              }}
            >
              Œuvre introuvable.
            </h1>

            {/* Mini drip noir SVG — sous le point final, signature graffiti subtle */}
            <svg
              aria-hidden="true"
              viewBox="0 0 60 36"
              width="60"
              height="36"
              className="pointer-events-none absolute"
              style={{
                left: 'clamp(0rem, 0.5vw, 0.5rem)',
                bottom: '-1.4rem',
                opacity: 0.85,
              }}
            >
              <path
                d="M4 0 C4 8, 2 14, 4 20 Q5 24 6 20 C8 14, 6 8, 6 0 Z"
                fill={INK}
              />
              <circle cx="5" cy="22" r="1.4" fill={INK} />
              <path
                d="M22 0 C22 6, 21 11, 22 16 Q22.6 18 23.2 16 C24 11, 23 6, 23 0 Z"
                fill={INK}
              />
              <circle cx="22.6" cy="17.6" r="1.1" fill={INK} />
            </svg>
          </div>

          {/* Sous-titre */}
          <p
            className="max-w-xl"
            style={{
              fontFamily: FONT_BODY,
              fontSize: 'clamp(1rem, 1.05vw, 1.15rem)',
              lineHeight: 1.55,
              color: 'rgba(10,10,10,0.7)',
              margin: 0,
              marginTop: '0.5rem',
            }}
          >
            Cette adresse ne mène nulle part. Peut-être un lien ancien ou une typo.
          </p>

          {/* Détail technique discret */}
          <p
            style={{
              fontFamily: FONT_BODY,
              fontSize: 'clamp(0.78rem, 0.85vw, 0.9rem)',
              letterSpacing: '0.04em',
              color: 'rgba(10,10,10,0.5)',
              margin: 0,
            }}
          >
            Code 404 · NACKS GALERIE
          </p>

          {/* CTAs pill — 3 actions, alignées gauche, espacement aéré */}
          <nav
            aria-label="Navigation de secours"
            className="flex flex-wrap items-center"
            style={{
              gap: 'clamp(0.7rem, 1.3vw, 1.2rem)',
              marginTop: 'clamp(1rem, 2vh, 1.5rem)',
            }}
          >
            <DripButton href="/" variant="primary" glow="pink" size="md">
              Retour à l&apos;accueil
            </DripButton>
            <DripButton href="/oeuvres" variant="secondary" size="md">
              Voir les œuvres
            </DripButton>
            <DripButton href="/atelier" variant="secondary" size="md">
              Voir l&apos;atelier
            </DripButton>
          </nav>
        </Container>
      </section>
    </PageShell>
  );
}
