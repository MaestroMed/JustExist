'use client';

import { useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useInView, useReducedMotion } from 'motion/react';
import { Container } from '@nacks/ui';
import { ArtPoster } from '@/components/art/ArtPoster';
import { DripButton } from '@/components/ui/DripButton';
import type { JournalPost } from '@/lib/content/journal';

const INK = 'var(--color-ink, #0a0a0a)';
const PAPER = '#fafafa';

const FONT_SERIF = "var(--font-serif, 'Playfair Display', Georgia, serif)";
const FONT_BODY = "var(--font-body, Inter, system-ui, sans-serif)";
const FONT_MONO = "var(--font-mono, ui-monospace, monospace)";

const PAGE_SIZE_INITIAL = 12;
const PAGE_SIZE_INCREMENT = 6;

type Props = {
  posts: JournalPost[];
  categories: JournalPost['category'][];
  categoryLabels: Record<JournalPost['category'], string>;
};

/**
 * Listing client : filtres catégories (chips) + grid 3-cols + load more.
 * Animation stagger sur les cards visibles, état conservé local (pas d'URL state).
 */
export function JournalListing({ posts, categories, categoryLabels }: Props) {
  const [activeCategory, setActiveCategory] = useState<
    JournalPost['category'] | 'all'
  >('all');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE_INITIAL);

  const filtered = useMemo(() => {
    if (activeCategory === 'all') return posts;
    return posts.filter((p) => p.category === activeCategory);
  }, [posts, activeCategory]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = filtered.length > visibleCount;

  function onCategoryChange(cat: JournalPost['category'] | 'all') {
    setActiveCategory(cat);
    setVisibleCount(PAGE_SIZE_INITIAL);
  }

  return (
    <section
      aria-label="Tous les articles"
      style={{ paddingBlock: 'clamp(3rem, 6vh, 5rem)' }}
    >
      <Container size="full">
        {/* ─────── Filters ─────── */}
        {categories.length > 1 && (
          <div
            role="tablist"
            aria-label="Filtrer par catégorie"
            className="mb-[clamp(2.5rem,5vh,4rem)] flex flex-wrap gap-[0.75rem] border-b pb-[clamp(1.5rem,3vh,2rem)]"
            style={{ borderColor: 'rgba(10,10,10,0.1)' }}
          >
            <FilterChip
              label="Tous"
              active={activeCategory === 'all'}
              onClick={() => onCategoryChange('all')}
            />
            {categories.map((cat) => (
              <FilterChip
                key={cat}
                label={categoryLabels[cat]}
                active={activeCategory === cat}
                onClick={() => onCategoryChange(cat)}
              />
            ))}
          </div>
        )}

        {/* ─────── Empty state ─────── */}
        {filtered.length === 0 ? (
          <div
            className="py-[clamp(3rem,6vh,5rem)] text-center"
            style={{
              fontFamily: FONT_SERIF,
              fontStyle: 'italic',
              fontSize: 'clamp(1.2rem, 1.5vw, 1.6rem)',
              color: 'rgba(10,10,10,0.55)',
            }}
          >
            Rien ici pour le moment. Reviens dans quelques semaines.
          </div>
        ) : (
          <>
            {/* ─────── Grid ─────── */}
            <ul
              className="grid list-none grid-cols-1 p-0 md:grid-cols-2 lg:grid-cols-3"
              style={{
                gap: 'clamp(2.5rem, 4vw, 3.5rem)',
                margin: 0,
              }}
            >
              {visible.map((post, i) => (
                <ArticleCardItem
                  key={post.slug}
                  post={post}
                  categoryLabel={categoryLabels[post.category]}
                  index={i}
                />
              ))}
            </ul>

            {/* ─────── Load more ─────── */}
            {hasMore && (
              <div className="mt-[clamp(3rem,6vh,5rem)] flex justify-center">
                <DripButton
                  type="button"
                  variant="secondary"
                  size="md"
                  onClick={() => setVisibleCount((c) => c + PAGE_SIZE_INCREMENT)}
                >
                  Charger plus
                </DripButton>
              </div>
            )}
          </>
        )}
      </Container>
    </section>
  );
}

/* ============================================================
 *  FilterChip — chip de filtrage catégorie
 * ============================================================ */
function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className="uppercase transition-colors"
      data-cursor="link"
      style={{
        fontFamily: FONT_MONO,
        fontSize: '0.7rem',
        letterSpacing: '0.26em',
        padding: '0.55rem 1.1rem',
        color: active ? '#fff' : 'rgba(10,10,10,0.7)',
        backgroundColor: active ? INK : 'transparent',
        border: `1px solid ${active ? INK : 'rgba(10,10,10,0.18)'}`,
        cursor: 'pointer',
        whiteSpace: 'nowrap',
      }}
    >
      {label}
    </button>
  );
}

/* ============================================================
 *  ArticleCardItem — DA cream, image 4/5, titre serif italic
 * ============================================================ */
function ArticleCardItem({
  post,
  categoryLabel,
  index,
}: {
  post: JournalPost;
  categoryLabel: string;
  index: number;
}) {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' });
  const reduced = useReducedMotion();

  const dateLabel = post.publishedAt.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <motion.li
      ref={ref}
      initial={reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
      animate={
        reduced || inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }
      }
      transition={{
        duration: 0.7,
        delay: reduced ? 0 : (index % 6) * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{ listStyle: 'none' }}
    >
      <Link
        href={`/journal/${post.slug}`}
        data-cursor="link"
        data-cursor-label="Lire"
        aria-label={`${post.title} — ${dateLabel}, ${post.readingTime} minutes de lecture`}
        className="journal-card group block"
        style={{ color: INK, textDecoration: 'none' }}
      >
        {/* Cover */}
        <div
          className="journal-card-media relative overflow-hidden"
          style={{
            aspectRatio: '4 / 5',
            backgroundColor: PAPER,
            border: '1px solid rgba(10,10,10,0.06)',
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

        {/* Info bloc */}
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
            className="journal-card-title text-balance"
            style={{
              fontFamily: FONT_SERIF,
              fontStyle: 'italic',
              fontWeight: 400,
              fontSize: 'clamp(1.3rem, 1.6vw, 1.7rem)',
              lineHeight: 1.18,
              letterSpacing: '-0.012em',
              color: INK,
              margin: 0,
            }}
          >
            <span className="journal-card-title-text">{post.title}</span>
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
      </Link>

      <style>{`
        .journal-card-img {
          transition: transform 720ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .journal-card:hover .journal-card-img,
        .journal-card:focus-visible .journal-card-img {
          transform: scale(1.02);
        }
        .journal-card-media {
          transition: box-shadow 480ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .journal-card:hover .journal-card-media,
        .journal-card:focus-visible .journal-card-media {
          box-shadow: 0 14px 40px -16px rgba(10, 10, 10, 0.22);
        }
        .journal-card-title-text {
          background-image: linear-gradient(currentColor, currentColor);
          background-size: 0% 1px;
          background-position: 0 100%;
          background-repeat: no-repeat;
          transition: background-size 360ms cubic-bezier(0.22, 1, 0.36, 1);
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
    </motion.li>
  );
}
