import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@nacks/ui';
import { PageShell } from '@/components/layouts/PageShell';
import { ArtPoster } from '@/components/art/ArtPoster';
import { JournalListing } from '@/components/journal/JournalListing';
import { journalPosts, type JournalPost } from '@/lib/content/journal';

export const metadata: Metadata = {
  title: 'Journal — Carnet de l\'atelier',
  description:
    "Coulisses, processus, rencontres. Le carnet de l'atelier Nacks — un texte par mois, sans filtre, écrit entre deux Posca.",
  openGraph: {
    title: "Journal — Carnet de l'atelier · Nacks Galerie",
    description:
      "Coulisses, processus, rencontres. Le carnet de l'atelier Nacks — un texte par mois.",
    type: 'website',
    locale: 'fr_FR',
    siteName: 'Nacks Galerie',
    url: '/journal',
  },
  alternates: { canonical: '/journal' },
};

const INK = 'var(--color-ink, #0a0a0a)';
const CREAM = 'var(--color-cream, #f5f1e8)';

const FONT_SERIF = "var(--font-serif, 'Playfair Display', Georgia, serif)";
const FONT_BODY = "var(--font-body, Inter, system-ui, sans-serif)";
const FONT_MONO = "var(--font-mono, ui-monospace, monospace)";

const CATEGORY_LABEL: Record<JournalPost['category'], string> = {
  'behind-the-scenes': 'Processus',
  'drop-story': 'Voyage',
  interview: 'Rencontre',
  guide: 'Guide',
  essai: 'Essai',
  news: 'News',
};

export default function JournalPage() {
  // Tri chrono desc, séparation featured hero / reste
  const sorted = [...journalPosts].sort(
    (a, b) => b.publishedAt.getTime() - a.publishedAt.getTime(),
  );
  const hero = sorted.find((p) => p.featured) ?? sorted[0];
  const rest = sorted.filter((p) => p.slug !== hero?.slug);

  // Catégories disponibles pour filtres (uniquement celles présentes dans rest)
  const availableCategories = Array.from(
    new Set(rest.map((p) => p.category)),
  ) as JournalPost['category'][];

  const heroDate = hero
    ? hero.publishedAt.toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : '';

  return (
    <PageShell>
      <main
        style={{
          backgroundColor: CREAM,
          color: INK,
        }}
      >
        {/* ─────────── Header section ─────────── */}
        <section
          aria-label="Journal — en-tête"
          style={{
            paddingBlock: 'clamp(4rem, 10vh, 8rem)',
          }}
        >
          <Container size="full">
            <div className="grid gap-[clamp(2rem,4vw,4rem)] md:grid-cols-[1fr_auto] md:items-end">
              <div className="flex flex-col gap-[clamp(1rem,2.2vh,1.6rem)]">
                <p
                  className="uppercase"
                  style={{
                    fontFamily: FONT_BODY,
                    fontSize: '0.72rem',
                    letterSpacing: '0.3em',
                    color: 'rgba(10,10,10,0.55)',
                    margin: 0,
                  }}
                >
                  Journal
                </p>
                <h1
                  className="text-balance"
                  style={{
                    fontFamily: FONT_SERIF,
                    fontStyle: 'italic',
                    fontWeight: 400,
                    fontSize: 'clamp(2.8rem, 7vw, 6.5rem)',
                    lineHeight: 0.98,
                    letterSpacing: '-0.02em',
                    color: INK,
                    margin: 0,
                  }}
                >
                  Carnet de l&apos;atelier.
                </h1>
                <p
                  className="text-balance"
                  style={{
                    fontFamily: FONT_BODY,
                    fontSize: 'clamp(1rem, 1.15vw, 1.2rem)',
                    lineHeight: 1.55,
                    color: 'rgba(10,10,10,0.65)',
                    maxWidth: '52ch',
                    margin: 0,
                  }}
                >
                  Coulisses, processus, rencontres. Mise à jour mensuelle, sans filtre.
                </p>
              </div>

              <p
                className="self-end whitespace-nowrap uppercase"
                style={{
                  fontFamily: FONT_MONO,
                  fontSize: '0.7rem',
                  letterSpacing: '0.28em',
                  color: 'rgba(10,10,10,0.45)',
                  margin: 0,
                }}
              >
                {sorted.length} {sorted.length > 1 ? 'articles' : 'article'}
              </p>
            </div>
          </Container>
        </section>

        {/* ─────────── Featured hero article ─────────── */}
        {hero && (
          <section
            aria-label="Article à la une"
            style={{
              paddingBlock: 'clamp(2rem, 5vh, 4rem)',
            }}
          >
            <Container size="full">
              <Link
                href={`/journal/${hero.slug}`}
                data-cursor="link"
                data-cursor-label="Lire"
                aria-label={`À la une — ${hero.title}, ${hero.readingTime} minutes de lecture`}
                className="journal-hero group block"
                style={{ color: INK, textDecoration: 'none' }}
              >
                <div
                  className="grid gap-[clamp(1.5rem,3vw,3rem)] md:grid-cols-[6fr_5fr] md:items-center"
                >
                  {/* Image gauche */}
                  <div
                    className="journal-hero-media relative overflow-hidden"
                    style={{
                      aspectRatio: '4 / 5',
                      backgroundColor: '#fafafa',
                      border: '1px solid rgba(10,10,10,0.06)',
                    }}
                  >
                    <div className="journal-hero-img absolute inset-0">
                      <ArtPoster
                        variant={hero.coverVariant}
                        label={hero.title}
                        className="absolute inset-0"
                      />
                    </div>
                  </div>

                  {/* Info droite */}
                  <div className="flex flex-col gap-[clamp(1rem,1.6vh,1.5rem)] md:pl-[clamp(0rem,2vw,2rem)]">
                    <p
                      className="uppercase"
                      style={{
                        fontFamily: FONT_BODY,
                        fontSize: '0.7rem',
                        letterSpacing: '0.3em',
                        color: 'rgba(10,10,10,0.55)',
                        margin: 0,
                      }}
                    >
                      <span style={{ color: 'var(--color-blood, #e63946)' }}>
                        À la une
                      </span>
                      <span aria-hidden style={{ margin: '0 0.6em' }}>
                        ·
                      </span>
                      {CATEGORY_LABEL[hero.category]}
                    </p>

                    <h2
                      className="journal-hero-title text-balance"
                      style={{
                        fontFamily: FONT_SERIF,
                        fontStyle: 'italic',
                        fontWeight: 400,
                        fontSize: 'clamp(2rem, 4.2vw, 3.8rem)',
                        lineHeight: 1.02,
                        letterSpacing: '-0.018em',
                        color: INK,
                        margin: 0,
                      }}
                    >
                      <span className="journal-hero-title-text">{hero.title}</span>
                    </h2>

                    <p
                      className="text-balance"
                      style={{
                        fontFamily: FONT_BODY,
                        fontSize: 'clamp(1rem, 1.1vw, 1.15rem)',
                        lineHeight: 1.6,
                        color: 'rgba(10,10,10,0.7)',
                        maxWidth: '46ch',
                        margin: 0,
                      }}
                    >
                      {hero.excerpt}
                    </p>

                    <div
                      className="mt-[clamp(0.5rem,1vh,1rem)] flex items-center gap-[1ch] uppercase"
                      style={{
                        fontFamily: FONT_MONO,
                        fontSize: '0.72rem',
                        letterSpacing: '0.18em',
                        color: 'rgba(10,10,10,0.45)',
                      }}
                    >
                      <time dateTime={hero.publishedAt.toISOString()}>
                        {heroDate}
                      </time>
                      <span aria-hidden>·</span>
                      <span>{hero.readingTime} min de lecture</span>
                    </div>

                    <span
                      className="mt-[clamp(0.5rem,1.2vh,1rem)] inline-flex items-center gap-[0.5ch] self-start"
                      style={{
                        fontFamily: FONT_SERIF,
                        fontStyle: 'italic',
                        fontSize: 'clamp(1rem, 1.1vw, 1.2rem)',
                        color: INK,
                        paddingBottom: '4px',
                        borderBottom: '1px solid rgba(10,10,10,0.4)',
                      }}
                    >
                      Lire l&apos;article&nbsp;→
                    </span>
                  </div>
                </div>
              </Link>
            </Container>
          </section>
        )}

        {/* ─────────── Listing (filters + grid) — client ─────────── */}
        {rest.length > 0 && (
          <JournalListing
            posts={rest}
            categories={availableCategories}
            categoryLabels={CATEGORY_LABEL}
          />
        )}

        {/* ─────────── Spacer fin ─────────── */}
        <div style={{ height: 'clamp(4rem, 8vh, 6rem)' }} />
      </main>

      <style>{`
        .journal-hero-img {
          transition: transform 800ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .journal-hero:hover .journal-hero-img,
        .journal-hero:focus-visible .journal-hero-img {
          transform: scale(1.025);
        }
        .journal-hero-media {
          transition: box-shadow 480ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .journal-hero:hover .journal-hero-media,
        .journal-hero:focus-visible .journal-hero-media {
          box-shadow: 0 18px 50px -18px rgba(10, 10, 10, 0.25);
        }
        .journal-hero-title-text {
          background-image: linear-gradient(currentColor, currentColor);
          background-size: 0% 1px;
          background-position: 0 100%;
          background-repeat: no-repeat;
          transition: background-size 480ms cubic-bezier(0.22, 1, 0.36, 1);
          padding-bottom: 4px;
        }
        .journal-hero:hover .journal-hero-title-text,
        .journal-hero:focus-visible .journal-hero-title-text {
          background-size: 100% 1px;
        }
        @media (prefers-reduced-motion: reduce) {
          .journal-hero-img,
          .journal-hero-media,
          .journal-hero-title-text {
            transition: none !important;
          }
        }
      `}</style>
    </PageShell>
  );
}
