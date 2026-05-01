import type { Metadata } from 'next';
import { PageShell } from '@/components/layouts/PageShell';
import { CommissionFormBespoke } from '@/components/forms/CommissionFormBespoke';

export const metadata: Metadata = {
  title: 'Commission — Naguy "Nacks" Claude',
  description:
    "Une œuvre, à votre histoire. Demande de commission Nacks Galerie : esquisse, signature, livraison en 4 à 8 semaines. Devis gratuit sous 48h.",
};

const INK = 'var(--color-ink, #0a0a0a)';
const CREAM = 'var(--color-cream, #f5f1e8)';
const PAPER = 'var(--color-paint-white, #fafafa)';

const FONT_SERIF = "var(--font-serif, 'Playfair Display', Georgia, serif)";
const FONT_BODY = "var(--font-body, Inter, system-ui, sans-serif)";

/* ───────── Process steps ───────── */
const STEPS: ReadonlyArray<{ n: string; label: string; body: string }> = [
  {
    n: '01',
    label: 'Vous me racontez',
    body: 'Quelques minutes pour décrire le projet, l\'émotion, la pièce.',
  },
  {
    n: '02',
    label: 'Je réponds sous 48 h',
    body: 'Devis détaillé, calendrier, premières pistes d\'esquisse.',
  },
  {
    n: '03',
    label: 'Trois sessions de revue',
    body: 'Esquisse, mi-parcours, signature. Pas de validation à chaque coup de pinceau.',
  },
  {
    n: '04',
    label: 'Livraison & certificat',
    body: 'Expédition assurée ou remise en atelier. COA + dédicace manuscrite.',
  },
];

export default function CommissionPage() {
  return (
    <PageShell>
      {/* ═════════ Section 1 — Header (cream) ═════════ */}
      <section
        aria-label="Commission — sur commande"
        className="relative w-full overflow-hidden"
        style={{
          backgroundColor: CREAM,
          color: INK,
          paddingBlock: 'clamp(5rem, 12vh, 10rem)',
        }}
      >
        <div
          className="relative mx-auto"
          style={{
            maxWidth: 'var(--container-max, 1440px)',
            paddingInline: 'clamp(1.5rem, 4vw, 5rem)',
          }}
        >
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
            Customs &middot; Sur commande
          </p>

          <h1
            className="mt-[clamp(1.5rem,3vh,2.5rem)] text-balance"
            style={{
              fontFamily: FONT_SERIF,
              fontStyle: 'italic',
              fontWeight: 400,
              fontSize: 'clamp(3rem, 8vw, 7rem)',
              lineHeight: 0.96,
              letterSpacing: '-0.025em',
              color: INK,
              margin: 0,
              maxWidth: '18ch',
            }}
          >
            Une œuvre,
            <br />à votre histoire.
          </h1>

          <p
            className="mt-[clamp(1.5rem,3vh,2.5rem)]"
            style={{
              fontFamily: FONT_BODY,
              fontSize: 'clamp(1rem, 1.15vw, 1.25rem)',
              lineHeight: 1.6,
              color: 'rgba(10,10,10,0.7)',
              maxWidth: '38rem',
              margin: 0,
            }}
          >
            De l&apos;esquisse à la signature, en moyenne 4 à 8 semaines.
            Trois sessions de revue. Formats libres — toile, mur, sneakers,
            cuir, peau.
          </p>

          <p
            className="mt-[clamp(0.75rem,1.5vh,1.25rem)]"
            style={{
              fontFamily: FONT_BODY,
              fontWeight: 600,
              fontSize: 'clamp(0.78rem, 0.85vw, 0.9rem)',
              color: 'rgba(10,10,10,0.55)',
              margin: 0,
            }}
          >
            À partir de 800&nbsp;€ &middot; Devis gratuit sous 48&nbsp;h
          </p>
        </div>
      </section>

      {/* ═════════ Section 2 — Form (cream + card paper) ═════════ */}
      <section
        aria-label="Formulaire de demande"
        className="relative w-full overflow-hidden"
        style={{
          backgroundColor: CREAM,
          color: INK,
          paddingBottom: 'clamp(5rem, 10vh, 10rem)',
        }}
      >
        <div
          className="relative mx-auto"
          style={{
            maxWidth: '52rem',
            paddingInline: 'clamp(1rem, 4vw, 2rem)',
          }}
        >
          <CommissionFormBespoke />
        </div>
      </section>

      {/* ═════════ Section 3 — Process (ink) ═════════ */}
      <section
        aria-label="Comment se déroule une commission"
        className="relative w-full overflow-hidden"
        style={{
          backgroundColor: INK,
          color: CREAM,
          paddingBlock: 'clamp(5rem, 10vh, 10rem)',
        }}
      >
        <div
          className="relative mx-auto"
          style={{
            maxWidth: 'var(--container-max, 1440px)',
            paddingInline: 'clamp(1.5rem, 4vw, 5rem)',
          }}
        >
          <p
            className="uppercase"
            style={{
              fontFamily: FONT_BODY,
              fontSize: 'clamp(0.7rem, 0.78vw, 0.82rem)',
              letterSpacing: '0.28em',
              color: 'rgba(245,241,232,0.55)',
              margin: 0,
            }}
          >
            Comment ça se passe
          </p>

          <h2
            className="mt-[clamp(1rem,2vh,1.75rem)]"
            style={{
              fontFamily: FONT_SERIF,
              fontStyle: 'italic',
              fontWeight: 400,
              fontSize: 'clamp(2.25rem, 5vw, 4rem)',
              lineHeight: 1,
              letterSpacing: '-0.025em',
              color: CREAM,
              margin: 0,
            }}
          >
            Quatre étapes, sans bruit.
          </h2>

          <ol
            className="mt-[clamp(2.5rem,5vh,4rem)] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[clamp(1rem,2vw,2rem)]"
            style={{ listStyle: 'none', padding: 0, margin: 0 }}
          >
            {STEPS.map((s) => (
              <li
                key={s.n}
                className="flex flex-col gap-[clamp(0.75rem,1.5vh,1.25rem)]"
                style={{
                  padding: 'clamp(1.5rem, 2.5vw, 2rem)',
                  borderTop: '1px solid rgba(245,241,232,0.18)',
                }}
              >
                <span
                  style={{
                    fontFamily: FONT_SERIF,
                    fontStyle: 'italic',
                    fontWeight: 400,
                    fontSize: 'clamp(1.75rem, 2.6vw, 2.25rem)',
                    lineHeight: 1,
                    color: 'rgba(245,241,232,0.6)',
                  }}
                >
                  {s.n}
                </span>
                <span
                  style={{
                    fontFamily: FONT_BODY,
                    fontWeight: 600,
                    fontSize: 'clamp(1rem, 1.1vw, 1.15rem)',
                    lineHeight: 1.3,
                    color: CREAM,
                  }}
                >
                  {s.label}
                </span>
                <span
                  style={{
                    fontFamily: FONT_BODY,
                    fontSize: 'clamp(0.88rem, 0.95vw, 1rem)',
                    lineHeight: 1.55,
                    color: 'rgba(245,241,232,0.65)',
                  }}
                >
                  {s.body}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </PageShell>
  );
}
