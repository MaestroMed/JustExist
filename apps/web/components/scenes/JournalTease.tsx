import Link from 'next/link';
import { Container } from '@nacks/ui';
import { ArtPoster } from '@/components/art/ArtPoster';
import { getFeaturedPosts, type JournalPost } from '@/lib/content/journal';
import { JournalTeaseAnim } from './JournalTeaseAnim';

/**
 * SCÈNE — Journal Tease (DA editorial premium).
 *
 * Inspirations : The Gentlewoman, Apartamento Magazine, Frieze.com, Aesop journal.
 * "Last from the journal" : 3 articles récents, calme, typographique, photos
 * éditoriales. Background ink (alternance avec NacksShow cream juste au-dessus).
 *
 * Server component shell (data fetching) + sous-composant client pour
 * l'animation stagger Motion whileInView.
 */

const INK = 'var(--color-ink, #0a0a0a)';
const CREAM = 'var(--color-cream, #f5f1e8)';
const PAPER = '#fafafa';

const FONT_SERIF = "var(--font-serif, 'Playfair Display', Georgia, serif)";
const FONT_BODY = "var(--font-body, Inter, system-ui, sans-serif)";

const CATEGORY_LABEL: Record<JournalPost['category'], string> = {
  'behind-the-scenes': 'Processus',
  'drop-story': 'Voyage',
  interview: 'Rencontre',
  guide: 'Guide',
  essai: 'Essai',
  news: 'News',
};

export function JournalTease() {
  const posts = getFeaturedPosts(3);
  if (posts.length === 0) return null;

  return (
    <section
      aria-label="Journal — derniers articles"
      className="relative"
      style={{
        backgroundColor: INK,
        color: CREAM,
        paddingBlock: 'clamp(5rem, 10vh, 10rem)',
      }}
    >
      <Container size="full">
        {/* ── Header ── */}
        <header className="mb-[clamp(3rem,6vh,5rem)] grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p
              style={{
                fontFamily: FONT_BODY,
                fontSize: '0.72rem',
                letterSpacing: '0.28em',
                textTransform: 'uppercase',
                color: 'rgba(245,241,232,0.55)',
                marginBottom: 'clamp(1rem, 2vh, 1.5rem)',
              }}
            >
              Journal
            </p>

            <h2
              style={{
                fontFamily: FONT_SERIF,
                fontStyle: 'italic',
                fontWeight: 400,
                fontSize: 'clamp(2.4rem, 5.5vw, 4.6rem)',
                lineHeight: 1.02,
                letterSpacing: '-0.015em',
                color: CREAM,
                margin: 0,
              }}
            >
              Carnet de l&apos;atelier.
            </h2>

            <p
              style={{
                fontFamily: FONT_BODY,
                fontSize: 'clamp(0.95rem, 1.05vw, 1.1rem)',
                lineHeight: 1.55,
                color: 'rgba(245,241,232,0.68)',
                marginTop: 'clamp(1rem, 2.2vh, 1.5rem)',
                maxWidth: '42ch',
              }}
            >
              Coulisses, processus, rencontres. Trois articles récents.
            </p>
          </div>

          <Link
            href="/journal"
            data-cursor="link"
            data-cursor-label="Journal"
            className="group inline-flex items-center self-end whitespace-nowrap"
            style={{
              fontFamily: FONT_SERIF,
              fontStyle: 'italic',
              fontSize: 'clamp(1rem, 1.05vw, 1.15rem)',
              color: CREAM,
              paddingBottom: '4px',
              borderBottom: '1px solid rgba(245,241,232,0.35)',
              transition: 'border-color 280ms ease',
            }}
          >
            <span className="journal-tease-cta">Voir tout le journal&nbsp;→</span>
          </Link>
        </header>

        {/* ── Grille articles (animée client-side) ── */}
        <JournalTeaseAnim>
          {posts.map((post) => (
            <ArticleCard key={post.slug} post={post} />
          ))}
        </JournalTeaseAnim>
      </Container>

      <style>{`
        .journal-tease-cta {
          background-image: linear-gradient(currentColor, currentColor);
          background-size: 100% 1px;
          background-position: 0 100%;
          background-repeat: no-repeat;
          transition: background-size 320ms cubic-bezier(0.65,0,0.35,1);
        }
        a:hover .journal-tease-cta { background-size: 0% 1px; background-position: 100% 100%; }
      `}</style>
    </section>
  );
}

/* ============================================================
 *  ArticleCard — server component, image first, infos sous
 * ============================================================ */
function ArticleCard({ post }: { post: JournalPost }) {
  const dateLabel = post.publishedAt.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <Link
      href={`/journal/${post.slug}`}
      data-cursor="link"
      data-cursor-label="Lire"
      className="journal-card group block"
      aria-label={`${post.title} — ${dateLabel}, ${post.readingTime} minutes de lecture`}
      style={{ color: CREAM, textDecoration: 'none' }}
    >
      {/* ── Cover ── */}
      <div
        className="journal-card-media relative overflow-hidden"
        style={{
          aspectRatio: '4 / 5',
          backgroundColor: PAPER,
          border: '1px solid rgba(245,241,232,0.06)',
          transition:
            'box-shadow 480ms cubic-bezier(0.22,1,0.36,1)',
          willChange: 'transform',
        }}
      >
        <div className="journal-card-img absolute inset-0">
          <ArtPoster
            variant={post.coverVariant}
            label={post.title}
            className="absolute inset-0"
          />
        </div>
      </div>

      {/* ── Info bloc ── */}
      <div
        className="flex flex-col"
        style={{
          marginTop: 'clamp(1rem, 1.6vh, 1.4rem)',
          gap: 'clamp(0.5rem, 0.8vh, 0.75rem)',
        }}
      >
        {/* Catégorie eyebrow */}
        <p
          style={{
            fontFamily: FONT_BODY,
            fontSize: '0.68rem',
            letterSpacing: '0.24em',
            textTransform: 'uppercase',
            color: 'rgba(245,241,232,0.55)',
            margin: 0,
          }}
        >
          {CATEGORY_LABEL[post.category]}
        </p>

        {/* Titre serif italic */}
        <h3
          className="journal-card-title text-balance"
          style={{
            fontFamily: FONT_SERIF,
            fontStyle: 'italic',
            fontWeight: 400,
            fontSize: 'clamp(1.25rem, 1.5vw, 1.55rem)',
            lineHeight: 1.2,
            letterSpacing: '-0.01em',
            color: CREAM,
            margin: 0,
          }}
        >
          <span className="journal-card-title-text">{post.title}</span>
        </h3>

        {/* Excerpt */}
        <p
          className="text-balance"
          style={{
            fontFamily: FONT_BODY,
            fontSize: '0.95rem',
            lineHeight: 1.55,
            color: 'rgba(245,241,232,0.7)',
            margin: 0,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {post.excerpt}
        </p>

        {/* Date · temps lecture */}
        <p
          style={{
            fontFamily: 'var(--font-mono, ui-monospace, monospace)',
            fontSize: '0.72rem',
            letterSpacing: '0.04em',
            color: 'rgba(245,241,232,0.45)',
            marginTop: '0.25rem',
          }}
        >
          <time dateTime={post.publishedAt.toISOString()}>{dateLabel}</time>
          <span aria-hidden> · </span>
          <span>{post.readingTime} min</span>
        </p>
      </div>

      <style>{`
        .journal-card-img {
          transition: transform 720ms cubic-bezier(0.22,1,0.36,1);
        }
        .journal-card:hover .journal-card-img,
        .journal-card:focus-visible .journal-card-img {
          transform: scale(1.02);
        }
        .journal-card-media {
          transition: box-shadow 480ms cubic-bezier(0.22,1,0.36,1);
        }
        .journal-card:hover .journal-card-media,
        .journal-card:focus-visible .journal-card-media {
          box-shadow: 0 12px 40px -12px rgba(0,0,0,0.6);
        }
        .journal-card-title-text {
          background-image: linear-gradient(currentColor, currentColor);
          background-size: 0% 1px;
          background-position: 0 100%;
          background-repeat: no-repeat;
          transition: background-size 360ms cubic-bezier(0.22,1,0.36,1);
          padding-bottom: 2px;
        }
        .journal-card:hover .journal-card-title-text,
        .journal-card:focus-visible .journal-card-title-text {
          background-size: 100% 1px;
        }
        @media (prefers-reduced-motion: reduce) {
          .journal-card-img,
          .journal-card-media,
          .journal-card-title-text {
            transition: none !important;
          }
        }
      `}</style>
    </Link>
  );
}
