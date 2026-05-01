import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { PageShell } from '@/components/layouts/PageShell';
import { DripButton } from '@/components/ui/DripButton';
import { nacks } from '@/lib/content/nacks';
import { buildPerson } from '@/lib/seo/jsonld';

export const metadata: Metadata = {
  title: 'Atelier — Naguy "Nacks" Claude',
  description:
    "L'atelier de Naguy 'Nacks' Claude — Sarcelles, Val-d'Oise. Studio partagé avec La Voix Off, Pop Art × Street Art au Posca. Bio, jalons, visite sur RDV.",
};

const INK = 'var(--color-ink, #0a0a0a)';
const CREAM = 'var(--color-cream, #f5f1e8)';
const PAPER = 'var(--color-paint-white, #fafafa)';

const FONT_SERIF = "var(--font-serif, 'Playfair Display', Georgia, serif)";
const FONT_BODY = "var(--font-body, Inter, system-ui, sans-serif)";
const FONT_TAG = "var(--font-tag, 'Caveat', 'Permanent Marker', cursive)";

/* ───────── Bio canonique — vraie histoire Naguy 'Nacks' Claude ───────── */
const BIO_PARAGRAPHS: ReadonlyArray<{ body: string; emphasis?: string[] }> = [
  {
    body:
      "Né et élevé à Sarcelles, Val-d'Oise. La passion de la peinture remonte à l'enfance : vers dix ans, en vacances familiales au Maroc, je regarde un peintre travailler dans la rue. Quelque chose se met en place. Au retour, c'est le Posca avant le pinceau, le carnet avant la toile.",
    emphasis: ['Sarcelles', 'Maroc'],
  },
  {
    body:
      "Première exposition à seize ans, sous le pseudo Nacks. Plus tard, une carrière de technicien son et lumière — puis le choix de tout quitter pour peindre à temps plein. Autodidacte. C'est très compliqué de se faire un nom quand on n'y connaît rien : on apprend en faisant, en ratant, en recommençant.",
    emphasis: ['seize ans', 'autodidacte'],
  },
  {
    body:
      "Le déclic, c'est Mr Brainwash dans le documentaire de Banksy : la culture pop comme matière première, le geste sans permission. En 2018, Prix Révélation des Beaux-Arts. Le geste de la rue entre dans la salle sans rien renier — POSCA, acrylique, spray, collage, stencil, dripping, brush.",
    emphasis: ['Mr Brainwash', 'Prix Révélation'],
  },
  {
    body:
      "Mickey, Snoopy, Goku, Pink Panther, les héros Marvel et DC : la culture pop comme territoire commun. Deux mots reviennent toujours — LOVE, JUST EXIST. Le travail d'abord ; le reste — la cote, les chiffres, les vues — n'est que conséquence.",
    emphasis: ['LOVE', 'JUST EXIST'],
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
    body: 'Articles, interviews, reportages. Le Parisien, AirZen Radio, POSCA officiel.',
  },
  {
    href: '/atelier/chronologie',
    eyebrow: 'Histoire',
    title: 'Chronologie',
    body: "De l'enfance au Maroc à aujourd'hui — les jalons, les expositions, les rencontres.",
  },
  {
    href: '/atelier/contact',
    eyebrow: 'Direct',
    title: 'Contact',
    body: "Presse, collab, événement, simple message — Naguy lit tout, répond sous 48 h ouvrées.",
  },
] as const;

/* ───────── Jalons (chronologie courte — vrais jalons documentés) ───────── */
const JALONS: ReadonlyArray<{
  year: string;
  label: string;
  detail: string;
}> = [
  {
    year: 'Enfance',
    label: 'Le déclic au Maroc',
    detail: "Vers dix ans, en vacances familiales, je regarde un peintre travailler. Quelque chose se met en place.",
  },
  {
    year: '16 ans',
    label: 'Première exposition',
    detail: 'Sous le pseudonyme Nacks. Le travail commence à sortir du carnet.',
  },
  {
    year: '2018',
    label: 'Prix Révélation des Beaux-Arts',
    detail: 'Premier signal institutionnel. Le geste de la rue entre dans la salle sans rien renier.',
  },
  {
    year: '2020',
    label: 'Représentation Los Angeles',
    detail: 'Artspace Warehouse Gallery — galerie représentante aux États-Unis.',
  },
  {
    year: '2022',
    label: 'Lancement Nacks Show',
    detail: 'TikTok @nacksgalerie : fresques de prénoms en live, en duo avec La Voix Off.',
  },
  {
    year: '2023',
    label: 'Foire de Paris × IMAGINE for Margo',
    detail: "Fresque «Partage» au POSCA pour le cancer pédiatrique. Membre du jury du 1er concours Street Art de la Foire.",
  },
];

export default function AtelierPage() {
  const personJsonLd = buildPerson();
  return (
    <PageShell>
      {/* JSON-LD Schema.org Person — SEO + rich snippets */}
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
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
            L&apos;Atelier &middot; Sarcelles, Val-d&apos;Oise
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
            Un studio, deux mains,
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
            Sarcelles. Studio partagé avec La Voix Off. Le Nacks Show diffuse
            chaque semaine en direct sur TikTok — fresques de prénoms, POSCA,
            spray. Tout passe par la main.
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

              {/* Portrait — vraie photo atelier Sarcelles */}
              <figure
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
                  margin: 0,
                }}
              >
                <Image
                  src="/photos/portrait/naguy-atelier-portrait.jpg"
                  alt="Naguy 'Nacks' Claude debout dans son atelier de Sarcelles, devant l'œuvre Mickey en mots, POSCAs au premier plan"
                  fill
                  sizes="(min-width: 1024px) 20rem, 80vw"
                  className="object-cover"
                  loading="lazy"
                />
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
                  Atelier &middot; Sarcelles &middot; Val-d&apos;Oise
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═════════ Mosaïque vie d'atelier (cream) ═════════ */}
      <section
        aria-label="Vie d'atelier"
        className="relative w-full overflow-hidden"
        style={{
          backgroundColor: CREAM,
          paddingBlock: 'clamp(3rem, 6vh, 6rem)',
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
              margin: '0 0 clamp(1.25rem, 2.5vh, 2rem) 0',
            }}
          >
            En atelier · Sarcelles
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4" style={{ gap: 'clamp(0.5rem, 1.2vw, 1rem)' }}>
            {[
              { src: '/photos/portrait/naguy-livepainting-words.jpg', alt: 'Naguy en live painting — fresque de prénoms', ratio: '3 / 4' },
              { src: '/photos/portrait/naguy-goku-dbz.jpg', alt: 'Naguy devant un Goku Dragon Ball Z en mots', ratio: '3 / 4' },
              { src: '/photos/portrait/naguy-mickey-bowling.jpg', alt: 'Naguy avec un Mickey custom bowling', ratio: '3 / 4' },
              { src: '/photos/portrait/naguy-naruto-bio.jpg', alt: 'Naguy peignant un Naruto en mots', ratio: '3 / 4' },
              { src: '/photos/portrait/naguy-mickey-tiktok.jpg', alt: 'Naguy en TikTok live avec œuvre Mickey', ratio: '3 / 4' },
              { src: '/photos/portrait/naguy-mickey-words-studio.png', alt: "Naguy devant l'œuvre OG Mickey en mots, atelier complet", ratio: '3 / 4' },
              { src: '/photos/portrait/naguy-atelier-portrait.jpg', alt: "Portrait studio de Naguy avec POSCAs au premier plan", ratio: '3 / 4' },
              { src: '/photos/branding/banner-artiste-pop-art.jpg', alt: 'Identité ARTISTE NACKS POP ART', ratio: '3 / 4' },
            ].map((p) => (
              <figure
                key={p.src}
                className="relative w-full overflow-hidden"
                style={{
                  margin: 0,
                  aspectRatio: p.ratio,
                  backgroundColor: PAPER,
                  border: '1px solid rgba(10,10,10,0.06)',
                }}
              >
                <Image
                  src={p.src}
                  alt={p.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover"
                />
              </figure>
            ))}
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
            <div className="flex flex-col items-start gap-3">
              <DripButton href="/atelier/contact" variant="primary" glow="pink" size="md">
                Prendre rendez-vous
              </DripButton>

              <DripButton href="/atelier/commission" variant="secondary" size="md">
                Demander un custom
              </DripButton>
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
