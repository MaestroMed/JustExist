import Link from 'next/link';
import { ArtPoster } from '@/components/art/ArtPoster';
import type { JournalPost } from '@/lib/content/journal';

const INK = 'var(--color-ink, #0a0a0a)';
const PAPER = '#fafafa';

const FONT_SERIF = "var(--font-serif, 'Playfair Display', Georgia, serif)";
const FONT_BODY = "var(--font-body, Inter, system-ui, sans-serif)";
const FONT_MONO = "var(--font-mono, ui-monospace, monospace)";

type Props = {
  post: JournalPost;
  categoryLabel: string;
};

/**
 * Card cream pour la section "À lire aussi" des articles.
 * Pattern aligné sur JournalListing card mais sans Motion (server component).
 */
export function JournalRelatedCard({ post, categoryLabel }: Props) {
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
      aria-label={`${post.title} — ${dateLabel}, ${post.readingTime} minutes de lecture`}
      className="journal-related-card group block"
      style={{ color: INK, textDecoration: 'none' }}
    >
      <div
        className="journal-related-media relative overflow-hidden"
        style={{
          aspectRatio: '4 / 5',
          backgroundColor: PAPER,
          border: '1px solid rgba(10,10,10,0.06)',
        }}
      >
        <div className="journal-related-img absolute inset-0">
          <ArtPoster
            variant={post.coverVariant}
            label={post.title}
            className="absolute inset-0"
          />
        </div>
      </div>

      <div
        className="flex flex-col"
        style={{
          marginTop: 'clamp(1rem, 1.6vh, 1.4rem)',
          gap: 'clamp(0.5rem, 0.8vh, 0.75rem)',
        }}
      >
        <p
          className="uppercase"
          style={{
            fontFamily: FONT_BODY,
            fontSize: '0.68rem',
            letterSpacing: '0.26em',
            color: 'rgba(10,10,10,0.55)',
            margin: 0,
          }}
        >
          {categoryLabel}
        </p>

        <h3
          className="text-balance"
          style={{
            fontFamily: FONT_SERIF,
            fontStyle: 'italic',
            fontWeight: 400,
            fontSize: 'clamp(1.25rem, 1.5vw, 1.55rem)',
            lineHeight: 1.18,
            letterSpacing: '-0.01em',
            color: INK,
            margin: 0,
          }}
        >
          <span className="journal-related-title-text">{post.title}</span>
        </h3>

        <p
          style={{
            fontFamily: FONT_BODY,
            fontSize: '0.95rem',
            lineHeight: 1.55,
            color: 'rgba(10,10,10,0.65)',
            margin: 0,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {post.excerpt}
        </p>

        <p
          style={{
            fontFamily: FONT_MONO,
            fontSize: '0.72rem',
            letterSpacing: '0.04em',
            color: 'rgba(10,10,10,0.45)',
            margin: 0,
            marginTop: '0.35rem',
          }}
        >
          <time dateTime={post.publishedAt.toISOString()}>{dateLabel}</time>
          <span aria-hidden> · </span>
          <span>{post.readingTime} min</span>
        </p>
      </div>

      <style>{`
        .journal-related-img {
          transition: transform 720ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .journal-related-card:hover .journal-related-img,
        .journal-related-card:focus-visible .journal-related-img {
          transform: scale(1.02);
        }
        .journal-related-media {
          transition: box-shadow 480ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .journal-related-card:hover .journal-related-media,
        .journal-related-card:focus-visible .journal-related-media {
          box-shadow: 0 14px 40px -16px rgba(10, 10, 10, 0.22);
        }
        .journal-related-title-text {
          background-image: linear-gradient(currentColor, currentColor);
          background-size: 0% 1px;
          background-position: 0 100%;
          background-repeat: no-repeat;
          transition: background-size 360ms cubic-bezier(0.22, 1, 0.36, 1);
          padding-bottom: 2px;
        }
        .journal-related-card:hover .journal-related-title-text,
        .journal-related-card:focus-visible .journal-related-title-text {
          background-size: 100% 1px;
        }
        @media (prefers-reduced-motion: reduce) {
          .journal-related-img,
          .journal-related-media,
          .journal-related-title-text {
            transition: none !important;
          }
        }
      `}</style>
    </Link>
  );
}
