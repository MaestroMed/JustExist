import type { Metadata } from 'next';
import Link from 'next/link';
import { PageShell } from '@/components/layouts/PageShell';
import { nacks } from '@/lib/content/nacks';

export const metadata: Metadata = {
  title: 'Atelier — Naguy "Nacks" Claude',
  description:
    "L'atelier de Naguy 'Nacks' Claude — Sarcelles pour les murs, Paris pour les œuvres et les rendez-vous. Bio, jalons, visite sur RDV.",
};

const INK = 'var(--color-ink, #0a0a0a)';
const CREAM = 'var(--color-cream, #f5f1e8)';
const PAPER = 'var(--color-paint-white, #fafafa)';

const FONT_SERIF = "var(--font-serif, 'Playfair Display', Georgia, serif)";
const FONT_BODY = "var(--font-body, Inter, system-ui, sans-serif)";
const FONT_TAG = "var(--font-tag, 'Caveat', 'Permanent Marker', cursive)";

/* ───────── Bio canonique (extraite du Manifesto + nacks.ts) ───────── */
const BIO_PARAGRAPHS: ReadonlyArray<{ body: string; emphasis?: string[] }> = [
  {
    body:
      "Né à Sarcelles. Élevé entre les murs et les carnets. Le Posca avant le pinceau, le spray avant le cadre. Une enfance écrite sur ce qui voulait bien recevoir l'encre — bétons, marges, peaux de papier.",
    emphasis: ['Sarcelles'],
  },
  {
    body:
      "En 2018, Prix Révélations Beaux-Arts. Mais la galerie n'a jamais remplacé le mur — elle l'a juste suivi. Les œuvres se sont mises en cadre sans rien perdre de leur origine : geste rapide, pigment franc, refus du décor.",
    emphasis: ['Beaux-Arts'],
  },
  {
    body:
      "Aujourd'hui, deux ateliers, deux villes. Sarcelles pour la fresque, le grand format, le mur. Paris pour les œuvres signées, certifiées, livrées. Chaque pièce est peinte à la main. Pas de série industrielle. Pas de campagne.",
  },
  {
    body:
      "Le travail d'abord. Le reste — la cote, les ventes, les chiffres — n'est que conséquence. JUST EXIST.",
    emphasis: ['JUST EXIST'],
  },
];

/* ───────── Sub-pages /atelier ───────── */
const SUBPAGES = [
  {
    href: '/atelier/commission',
    eyebrow: 'Sur commande',
    title: 'Commission',
    body: "Une œuvre, à votre histoire. De l'esquisse à la signature, en moyenne 4 à 8 semaines.",
  },
  {
    href: '/atelier/presse',
    eyebrow: 'Médias',
    title: 'Presse',
    body: 'Articles, interviews, reportages. Le Monde, Numéro art, Les Échos, Konbini.',
  },
  {
    href: '/atelier/chronologie',
    eyebrow: 'Histoire',
    title: 'Chronologie',
    body: 'De 2018 à aujourd\'hui — les jalons, les expositions, les rencontres.',
  },
  {
    href: '/atelier/contact',
    eyebrow: 'Direct',
    title: 'Contact',
    body: 'Presse, collab, événement, simple message — Naguy lit tout, répond sous 72 h.',
  },
] as const;

/* ───────── Jalons (chronologie courte) ───────── */
const JALONS: ReadonlyArray<{
  year: string;
  label: string;
  detail: string;
}> = [
  {
    year: '2018',
    label: 'Prix Révélations Beaux-Arts',
    detail: 'Premier signal institutionnel. Le geste de la rue entre dans la salle.',
  },
  {
    year: '2020',
    label: 'Première exposition solo',
    detail: 'Galerie Lafayette — la peinture sort du cadre, sans rien renier.',
  },
  {
    year: '2022',
    label: 'Mr Poppy series',
    detail: 'Naissance du personnage signature. 10 originaux vendus à la communauté.',
  },
  {
    year: '2024',
    label: 'Pop-up Los Angeles',
    detail: 'Artspace Warehouse Gallery — sold-out en 48 h.',
  },
  {
    year: '2025',
    label: 'Foire de Paris + Posca',
    detail: 'Première présence institutionnelle. Partenariat officiel Posca.',
  },
  {
    year: '2026',
    label: 'Galerie en ligne',
    detail: 'nacksgalerie.com. Le royaume numérique est ouvert. Plus d\'intermédiaire.',
  },
];

export default function AtelierPage() {
  return (
    <PageShell>
      {/* ═════════ Section 1 — Hero atelier (cream) ═════════ */}
      <section
        aria-label="L'atelier"
        className="relative w-full overflow-hidden"
        style={{
          backgroundColor: CREAM,
          color: INK,
          paddingBlock: 'clamp(6rem, 14vh, 12rem)',
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
            L&apos;Atelier &middot; Depuis 2018
          </p>

          <h1
            className="mt-[clamp(1.5rem,3vh,2.5rem)] text-balance"
            style={{
              fontFamily: FONT_SERIF,
              fontStyle: 'italic',
              fontWeight: 400,
              fontSize: 'clamp(3rem, 8vw, 7.5rem)',
              lineHeight: 0.96,
              letterSpacing: '-0.025em',
              color: INK,
              margin: 0,
              maxWidth: '20ch',
            }}
          >
            Un atelier, deux villes,
            <br />
            une signature.
          </h1>

          <p
            className="mt-[clamp(1.5rem,3vh,2.5rem)]"
            style={{
              fontFamily: FONT_BODY,
              fontSize: 'clamp(1rem, 1.15vw, 1.25rem)',
              lineHeight: 1.6,
              color: 'rgba(10,10,10,0.7)',
              maxWidth: '36rem',
              margin: 0,
            }}
          >
            Sarcelles pour les murs. Paris pour les œuvres et les rendez-vous.
            Tout passe par la main.
          </p>
        </div>
      </section>

      {/* ═════════ Section 2 — Bio Naguy (cream split) ═════════ */}
      <section
        aria-label="Bio — Naguy 'Nacks' Claude"
        className="relative w-full"
        style={{
          backgroundColor: CREAM,
          color: INK,
          paddingBlock: 'clamp(4rem, 8vh, 8rem)',
          borderTop: '1px solid rgba(10,10,10,0.08)',
        }}
      >
        <div
          className="relative mx-auto"
          style={{
            maxWidth: 'var(--container-max, 1440px)',
            paddingInline: 'clamp(1.5rem, 4vw, 5rem)',
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-[clamp(2.5rem,6vw,6rem)]">
            {/* Colonne gauche — Portrait illustré + eyebrow */}
            <div className="flex flex-col gap-[clamp(2rem,4vh,3rem)] lg:sticky lg:top-28 lg:self-start">
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
                L&apos;artiste
              </p>

              <h2
                style={{
                  fontFamily: FONT_SERIF,
                  fontStyle: 'italic',
                  fontWeight: 400,
                  fontSize: 'clamp(2.25rem, 5vw, 4rem)',
                  lineHeight: 1,
                  letterSpacing: '-0.02em',
                  color: INK,
                  margin: 0,
                }}
              >
                Naguy
                <br />
                &lsquo;Nacks&rsquo; Claude.
              </h2>

              {/* Portrait illustré SVG — silhouette éditoriale, sobre */}
              <figure
                aria-hidden
                className="mt-4"
                style={{
                  width: '100%',
                  maxWidth: '20rem',
                  aspectRatio: '4 / 5',
                  backgroundColor: PAPER,
                  borderRadius: '4px',
                  overflow: 'hidden',
                  position: 'relative',
                  boxShadow: '0 1px 1px rgba(0,0,0,0.06), 0 18px 40px -22px rgba(10,10,10,0.18)',
                }}
              >
                <svg
                  viewBox="0 0 200 250"
                  preserveAspectRatio="xMidYMid slice"
                  className="absolute inset-0 h-full w-full"
                >
                  {/* Bg subtle gradient cream → paper */}
                  <defs>
                    <linearGradient id="bg-portrait" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#fafafa" />
                      <stop offset="100%" stopColor="#efe9d9" />
                    </linearGradient>
                  </defs>
                  <rect width="200" height="250" fill="url(#bg-portrait)" />
                  {/* Silhouette tête + épaules */}
                  <ellipse cx="100" cy="95" rx="38" ry="46" fill={INK} opacity="0.92" />
                  <path
                    d="M 40 250 L 40 200 Q 100 165 160 200 L 160 250 Z"
                    fill={INK}
                    opacity="0.92"
                  />
                  {/* Mini drip décoratif */}
                  <path
                    d="M 100 142 C 100 158 99 168 100 174 Q 100 178 101 174 C 101 168 100 158 100 142 Z"
                    fill={INK}
                    opacity="0.55"
                  />
                  <circle cx="100" cy="176" r="1.4" fill={INK} opacity="0.55" />
                </svg>
              </figure>

              <p
                className="uppercase"
                style={{
                  fontFamily: FONT_BODY,
                  fontSize: 'clamp(0.65rem, 0.72vw, 0.75rem)',
                  letterSpacing: '0.22em',
                  color: 'rgba(10,10,10,0.5)',
                  margin: 0,
                }}
              >
                {nacks.birthplace} &middot; {nacks.base}
              </p>
            </div>

            {/* Colonne droite — Bio paragraphs */}
            <div className="flex flex-col gap-[clamp(1.25rem,2.5vh,2rem)]" style={{ maxWidth: '40rem' }}>
              {BIO_PARAGRAPHS.map((p, i) => (
                <p
                  key={i}
                  style={{
                    fontFamily: FONT_SERIF,
                    fontStyle: 'normal',
                    fontWeight: 400,
                    fontSize: 'clamp(1.05rem, 1.35vw, 1.4rem)',
                    lineHeight: 1.55,
                    color: INK,
                    margin: 0,
                  }}
                >
                  {renderEmphasis(p.body, p.emphasis ?? [])}
                </p>
              ))}

              <div className="mt-[clamp(1.5rem,3vh,2.5rem)] flex flex-col gap-1">
                <span
                  style={{
                    fontFamily: FONT_TAG,
                    fontSize: 'clamp(1.6rem, 2.4vw, 2.2rem)',
                    fontWeight: 600,
                    color: INK,
                    lineHeight: 1,
                    letterSpacing: '-0.01em',
                  }}
                >
                  — Naguy &lsquo;Nacks&rsquo; Claude
                </span>
                <span
                  className="uppercase"
                  style={{
                    fontFamily: FONT_BODY,
                    fontSize: 'clamp(0.7rem, 0.78vw, 0.82rem)',
                    letterSpacing: '0.22em',
                    color: 'rgba(10,10,10,0.5)',
                  }}
                >
                  Atelier &middot; Sarcelles &middot; Paris
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═════════ Section 3 — Chronologie (ink) ═════════ */}
      <section
        aria-label="Quelques jalons"
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
            Chronologie
          </p>

          <h2
            className="mt-[clamp(1rem,2vh,1.75rem)]"
            style={{
              fontFamily: FONT_SERIF,
              fontStyle: 'italic',
              fontWeight: 400,
              fontSize: 'clamp(2.5rem, 6vw, 5rem)',
              lineHeight: 1,
              letterSpacing: '-0.025em',
              color: CREAM,
              margin: 0,
            }}
          >
            Quelques jalons.
          </h2>

          {/* Timeline left-aligned */}
          <ol
            className="mt-[clamp(3rem,6vh,5rem)] grid grid-cols-1 lg:grid-cols-[14rem_1fr] gap-x-[clamp(2rem,4vw,4rem)] gap-y-0"
            style={{ listStyle: 'none', padding: 0, margin: 0 }}
          >
            {JALONS.map((j, i) => (
              <li
                key={j.year}
                className="contents"
              >
                {/* Année — serif italic XL cream */}
                <div
                  className="flex items-baseline gap-2 lg:justify-end"
                  style={{
                    paddingBlock: 'clamp(1.25rem, 2.5vh, 2rem)',
                    borderTop: i === 0 ? '1px solid rgba(245,241,232,0.18)' : 'none',
                  }}
                >
                  <span
                    style={{
                      fontFamily: FONT_SERIF,
                      fontStyle: 'italic',
                      fontWeight: 400,
                      fontSize: 'clamp(2rem, 3.5vw, 3rem)',
                      lineHeight: 1,
                      color: CREAM,
                      letterSpacing: '-0.02em',
                    }}
                  >
                    {j.year}
                  </span>
                </div>

                {/* Titre + description */}
                <div
                  className="flex flex-col gap-2"
                  style={{
                    paddingBlock: 'clamp(1.25rem, 2.5vh, 2rem)',
                    borderTop: i === 0
                      ? '1px solid rgba(245,241,232,0.18)'
                      : '1px solid rgba(245,241,232,0.08)',
                  }}
                >
                  <span
                    style={{
                      fontFamily: FONT_BODY,
                      fontWeight: 600,
                      fontSize: 'clamp(1rem, 1.1vw, 1.15rem)',
                      lineHeight: 1.3,
                      color: CREAM,
                    }}
                  >
                    {j.label}
                  </span>
                  <span
                    style={{
                      fontFamily: FONT_BODY,
                      fontSize: 'clamp(0.9rem, 0.95vw, 1rem)',
                      lineHeight: 1.55,
                      color: 'rgba(245,241,232,0.65)',
                      maxWidth: '36rem',
                    }}
                  >
                    {j.detail}
                  </span>
                </div>
              </li>
            ))}
            {/* Ligne finale */}
            <li className="contents">
              <div
                style={{
                  borderTop: '1px solid rgba(245,241,232,0.08)',
                }}
              />
              <div
                style={{
                  borderTop: '1px solid rgba(245,241,232,0.08)',
                }}
              />
            </li>
          </ol>
        </div>
      </section>

      {/* ═════════ Section 4 — Visiter l'atelier (cream) ═════════ */}
      <section
        aria-label="Visiter l'atelier — sur rendez-vous"
        className="relative w-full overflow-hidden"
        style={{
          backgroundColor: CREAM,
          color: INK,
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
          <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-[clamp(2.5rem,6vw,6rem)] lg:items-end">
            <div>
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
                Visite &middot; Sur réservation
              </p>

              <h2
                className="mt-[clamp(1rem,2vh,1.75rem)]"
                style={{
                  fontFamily: FONT_SERIF,
                  fontStyle: 'italic',
                  fontWeight: 400,
                  fontSize: 'clamp(2.5rem, 6vw, 5rem)',
                  lineHeight: 1,
                  letterSpacing: '-0.025em',
                  color: INK,
                  margin: 0,
                }}
              >
                Sur rendez-vous.
              </h2>

              <p
                className="mt-[clamp(1.5rem,3vh,2.5rem)]"
                style={{
                  fontFamily: FONT_BODY,
                  fontSize: 'clamp(1rem, 1.1vw, 1.2rem)',
                  lineHeight: 1.65,
                  color: 'rgba(10,10,10,0.72)',
                  maxWidth: '36rem',
                  margin: 0,
                }}
              >
                L&apos;atelier reçoit collectionneurs, journalistes et
                partenaires sur rendez-vous, du mardi au vendredi. Adresse
                communiquée à la confirmation.
              </p>
            </div>

            {/* CTAs — pill ink + ghost ink */}
            <div className="flex flex-col gap-3">
              <Link
                href="/atelier/contact"
                className="group relative inline-flex items-center justify-center transition-transform hover:scale-[1.02]"
                data-cursor="link"
                style={{
                  fontFamily: FONT_SERIF,
                  fontStyle: 'italic',
                  fontSize: 'clamp(1rem, 1.1vw, 1.2rem)',
                  color: CREAM,
                  backgroundColor: INK,
                  padding: 'clamp(0.95rem,1.8vh,1.25rem) clamp(1.6rem,2.6vw,2.4rem)',
                  borderRadius: '999px',
                  boxShadow:
                    '0 1px 1px rgba(10,10,10,0.18), 0 18px 40px -18px rgba(10,10,10,0.28)',
                }}
              >
                <span className="relative z-10">
                  Prendre rendez-vous&nbsp;
                  <span
                    aria-hidden
                    className="inline-block transition-transform duration-300 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </span>
              </Link>

              <Link
                href="/atelier/commission"
                className="group relative inline-flex items-center justify-center transition-colors"
                data-cursor="link"
                style={{
                  fontFamily: FONT_SERIF,
                  fontStyle: 'italic',
                  fontSize: 'clamp(1rem, 1.1vw, 1.2rem)',
                  color: INK,
                  backgroundColor: 'transparent',
                  padding: 'clamp(0.95rem,1.8vh,1.25rem) clamp(1.6rem,2.6vw,2.4rem)',
                  borderRadius: '999px',
                  border: '1px solid rgba(10,10,10,0.18)',
                }}
              >
                <span className="relative z-10">
                  Demander un custom&nbsp;
                  <span
                    aria-hidden
                    className="inline-block transition-transform duration-300 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═════════ Section 5 — Sub-pages /atelier (ink) ═════════ */}
      <section
        aria-label="Explorer l'atelier"
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
            Explorer
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
            Le reste de l&apos;atelier.
          </h2>

          <ul
            className="mt-[clamp(2.5rem,5vh,4rem)] grid grid-cols-1 sm:grid-cols-2 gap-[clamp(0.75rem,1.6vw,1.5rem)]"
            style={{ listStyle: 'none', padding: 0, margin: 0 }}
          >
            {SUBPAGES.map((p) => (
              <li key={p.href}>
                <Link
                  href={p.href}
                  className="group relative flex flex-col justify-between gap-[clamp(2rem,4vh,3rem)] transition-colors"
                  data-cursor="link"
                  style={{
                    padding: 'clamp(1.75rem, 3vw, 2.5rem)',
                    backgroundColor: 'transparent',
                    border: '1px solid rgba(245,241,232,0.12)',
                    borderRadius: '4px',
                    minHeight: 'clamp(11rem, 16vh, 14rem)',
                  }}
                >
                  <div className="flex flex-col gap-[clamp(0.5rem,1vh,0.75rem)]">
                    <span
                      className="uppercase"
                      style={{
                        fontFamily: FONT_BODY,
                        fontSize: 'clamp(0.65rem, 0.72vw, 0.75rem)',
                        letterSpacing: '0.22em',
                        color: 'rgba(245,241,232,0.45)',
                      }}
                    >
                      {p.eyebrow}
                    </span>
                    <span
                      style={{
                        fontFamily: FONT_SERIF,
                        fontStyle: 'italic',
                        fontWeight: 400,
                        fontSize: 'clamp(1.5rem, 2.4vw, 2rem)',
                        lineHeight: 1.05,
                        letterSpacing: '-0.02em',
                        color: CREAM,
                      }}
                    >
                      {p.title}
                    </span>
                    <span
                      style={{
                        fontFamily: FONT_BODY,
                        fontSize: 'clamp(0.88rem, 0.95vw, 1rem)',
                        lineHeight: 1.55,
                        color: 'rgba(245,241,232,0.62)',
                        maxWidth: '28rem',
                      }}
                    >
                      {p.body}
                    </span>
                  </div>
                  <span
                    className="uppercase transition-transform group-hover:translate-x-2"
                    style={{
                      fontFamily: FONT_BODY,
                      fontSize: 'clamp(0.7rem, 0.78vw, 0.82rem)',
                      letterSpacing: '0.25em',
                      color: 'rgba(245,241,232,0.55)',
                    }}
                  >
                    Voir &rarr;
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </PageShell>
  );
}

/* ═════════════════════════════════════════════════════════════════════
 *  renderEmphasis — italic bold sur mots-clés (Sarcelles, JUST EXIST…)
 * ═════════════════════════════════════════════════════════════════════ */
function renderEmphasis(body: string, emphasis: string[]) {
  if (emphasis.length === 0) return body;
  const pattern = new RegExp(
    `(${emphasis.map(escapeRegExp).join('|')})`,
    'g',
  );
  const parts = body.split(pattern);
  return parts.map((part, idx) => {
    if (emphasis.includes(part)) {
      return (
        <em
          key={idx}
          style={{
            fontStyle: 'italic',
            fontWeight: 700,
            color: INK,
          }}
        >
          {part}
        </em>
      );
    }
    return <span key={idx}>{part}</span>;
  });
}

function escapeRegExp(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
