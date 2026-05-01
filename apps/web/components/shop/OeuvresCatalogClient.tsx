'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  formatPrice,
  type Artwork,
  type ArtworkType,
} from '@/lib/content/artworks';
import Image from 'next/image';
import { ArtPoster } from '@/components/art/ArtPoster';
import { DripButton } from '@/components/ui/DripButton';

/**
 * CATALOGUE /oeuvres — DA cream / ink, photo-first, editorial.
 *
 * Réf : David Zwirner artwork list / Hermès product catalog / Acne Studios shop.
 * Reprend l'esthétique des scènes home (NacksShow / Manifesto / JournalTease) :
 * background cream, ink texte, Playfair italic display, soft shadows, pas
 * d'urgence ni multi-couleurs spray. Filters / sort en état local.
 */

const INK = 'var(--color-ink, #0a0a0a)';
const CREAM = 'var(--color-cream, #f5f1e8)';
const PAPER = '#fafafa';

const FONT_SERIF = "var(--font-serif, 'Playfair Display', Georgia, serif)";
const FONT_BODY = "var(--font-body, Inter, system-ui, sans-serif)";

type FilterValue = 'all' | 'original' | 'edition' | 'figurine';
type SortValue = 'recent' | 'price-asc' | 'price-desc';

const FILTERS: ReadonlyArray<{ value: FilterValue; label: string }> = [
  { value: 'all', label: 'Toutes' },
  { value: 'original', label: 'Originaux' },
  { value: 'edition', label: 'Tirages' },
  { value: 'figurine', label: 'Figurines' },
];

const SORTS: ReadonlyArray<{ value: SortValue; label: string }> = [
  { value: 'recent', label: 'Plus récent' },
  { value: 'price-asc', label: 'Prix croissant' },
  { value: 'price-desc', label: 'Prix décroissant' },
];

const EDITION_TYPES = new Set<ArtworkType>(['giclee', 'serigraphie', 'poster']);

function matchesFilter(art: Artwork, f: FilterValue): boolean {
  switch (f) {
    case 'all':
      return true;
    case 'original':
      return art.type === 'original';
    case 'edition':
      return EDITION_TYPES.has(art.type);
    case 'figurine':
      return art.type === 'figurine';
  }
}

export function OeuvresCatalogClient({ artworks }: { artworks: readonly Artwork[] }) {
  const [filter, setFilter] = useState<FilterValue>('all');
  const [sort, setSort] = useState<SortValue>('recent');

  const items = useMemo(() => {
    const filtered = artworks.filter((a) => matchesFilter(a, filter));
    const sorted = [...filtered];
    if (sort === 'price-asc') sorted.sort((a, b) => a.priceCents - b.priceCents);
    else if (sort === 'price-desc') sorted.sort((a, b) => b.priceCents - a.priceCents);
    else sorted.sort((a, b) => b.year - a.year);
    return sorted;
  }, [artworks, filter, sort]);

  const totals = useMemo(() => {
    return {
      originals: artworks.filter((a) => a.type === 'original').length,
      customs: artworks.filter((a) => a.type === 'figurine').length,
      tirages: artworks.filter((a) => EDITION_TYPES.has(a.type)).length,
    };
  }, [artworks]);

  return (
    <section
      aria-label="Catalogue des œuvres disponibles"
      style={{
        backgroundColor: CREAM,
        color: INK,
        paddingBlock: 'clamp(5rem, 10vh, 10rem)',
        paddingInline: 'clamp(1.5rem, 4vw, 5rem)',
      }}
    >
      <div
        style={{
          maxWidth: 'var(--container-max, 1440px)',
          marginInline: 'auto',
        }}
      >
        {/* ── Header ── */}
        <header style={{ marginBottom: 'clamp(2.5rem, 6vh, 5rem)' }}>
          <p
            style={{
              fontFamily: FONT_BODY,
              fontSize: '0.72rem',
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color: 'rgba(10,10,10,0.55)',
              margin: 0,
            }}
          >
            Galerie / Catalogue
          </p>

          <h1
            style={{
              fontFamily: FONT_SERIF,
              fontStyle: 'italic',
              fontWeight: 400,
              fontSize: 'clamp(2.6rem, 6vw, 5.4rem)',
              lineHeight: 1.02,
              letterSpacing: '-0.02em',
              color: INK,
              marginTop: 'clamp(1rem, 2vh, 1.5rem)',
              marginBottom: 0,
            }}
          >
            Œuvres disponibles.
          </h1>

          <p
            style={{
              fontFamily: FONT_BODY,
              fontSize: 'clamp(0.95rem, 1.05vw, 1.1rem)',
              lineHeight: 1.55,
              color: 'rgba(10,10,10,0.68)',
              marginTop: 'clamp(1rem, 2.4vh, 1.6rem)',
              marginBottom: 0,
              maxWidth: '52ch',
            }}
          >
            {totals.originals} originaux, {totals.customs} customs, {totals.tirages} reproductions
            limitées. Toutes certifiées et numérotées.
          </p>
        </header>

        {/* ── Filters bar ── */}
        <FiltersBar
          filter={filter}
          sort={sort}
          onFilterChange={setFilter}
          onSortChange={setSort}
          total={items.length}
        />

        {/* ── Grille / empty ── */}
        {items.length === 0 ? (
          <EmptyState onReset={() => setFilter('all')} />
        ) : (
          <CatalogGrid items={items} />
        )}

        {/* ── CTA bas de page ── */}
        <FooterCTA />
      </div>
    </section>
  );
}

/* ============================================================
 *  FILTERS BAR
 * ============================================================ */

function FiltersBar({
  filter,
  sort,
  onFilterChange,
  onSortChange,
  total,
}: {
  filter: FilterValue;
  sort: SortValue;
  onFilterChange: (v: FilterValue) => void;
  onSortChange: (v: SortValue) => void;
  total: number;
}) {
  return (
    <div
      role="toolbar"
      aria-label="Filtres et tri"
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 'clamp(1rem, 2vw, 1.75rem)',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBlock: 'clamp(1rem, 2vh, 1.5rem)',
        borderTop: '1px solid rgba(10,10,10,0.12)',
        borderBottom: '1px solid rgba(10,10,10,0.12)',
        marginBottom: 'clamp(2rem, 4vh, 3rem)',
      }}
    >
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
        {FILTERS.map((f) => (
          <Chip
            key={f.value}
            label={f.label}
            active={filter === f.value}
            onClick={() => onFilterChange(f.value)}
          />
        ))}
      </div>

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: 'clamp(0.75rem, 1.5vw, 1.25rem)',
        }}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {SORTS.map((s) => (
            <Chip
              key={s.value}
              label={s.label}
              active={sort === s.value}
              onClick={() => onSortChange(s.value)}
              variant="ghost"
            />
          ))}
        </div>

        <span
          style={{
            fontFamily: FONT_BODY,
            fontSize: '0.78rem',
            letterSpacing: '0.06em',
            color: 'rgba(10,10,10,0.55)',
            whiteSpace: 'nowrap',
            paddingInlineStart: 'clamp(0.5rem, 1vw, 1rem)',
            borderInlineStart: '1px solid rgba(10,10,10,0.12)',
          }}
        >
          {total} œuvre{total > 1 ? 's' : ''}
        </span>
      </div>
    </div>
  );
}

function Chip({
  label,
  active,
  onClick,
  variant = 'solid',
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  variant?: 'solid' | 'ghost';
}) {
  const isGhost = variant === 'ghost';
  return (
    <button
      type="button"
      onClick={onClick}
      data-cursor="link"
      aria-pressed={active}
      className="oeuvres-chip"
      style={{
        fontFamily: FONT_BODY,
        fontSize: '0.82rem',
        letterSpacing: '0.02em',
        padding: '0.5rem 1.2rem',
        borderRadius: '999px',
        border: '1px solid',
        borderColor: active ? INK : 'rgba(10,10,10,0.15)',
        backgroundColor: active ? INK : 'transparent',
        color: active ? CREAM : isGhost ? 'rgba(10,10,10,0.65)' : INK,
        cursor: 'pointer',
        transition: 'background-color 240ms ease, color 240ms ease, border-color 240ms ease',
        whiteSpace: 'nowrap',
      }}
    >
      {label}
    </button>
  );
}

/* ============================================================
 *  GRID + CARDS (Motion layout)
 * ============================================================ */

function CatalogGrid({ items }: { items: readonly Artwork[] }) {
  const reduced = useReducedMotion() ?? false;

  return (
    <motion.div
      layout
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
        gap: 'clamp(1rem, 2.5vw, 2rem)',
      }}
      className="oeuvres-grid"
    >
      {items.map((art, i) => (
        <motion.div
          key={art.slug}
          layout
          initial={reduced ? { opacity: 1 } : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: reduced ? 0 : 0.55,
            delay: reduced ? 0 : Math.min(i * 0.04, 0.32),
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <CatalogCard art={art} />
        </motion.div>
      ))}

      <style>{`
        .oeuvres-grid {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }
        @media (min-width: 768px) {
          .oeuvres-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
        }
        @media (min-width: 1100px) {
          .oeuvres-grid { grid-template-columns: repeat(4, minmax(0, 1fr)); }
        }
      `}</style>
    </motion.div>
  );
}

function CatalogCard({ art }: { art: Artwork }) {
  const isSoldOut = art.status === 'sold_out';
  const isComing = art.status === 'coming';
  const priceLabel = formatPrice(art.priceCents);

  const seriesLabel = (() => {
    if (art.edition) return `Édition de ${art.edition.size}`;
    if (art.type === 'original') return 'Pièce unique';
    if (art.type === 'poster') return 'Open edition';
    if (art.type === 'figurine') return 'Édition limitée';
    return art.subtitle;
  })();

  return (
    <Link
      href={`/oeuvres/${art.slug}`}
      data-cursor="link"
      data-cursor-label="Voir"
      className="oeuvres-card group"
      aria-label={`${art.title} — ${priceLabel}`}
      style={{
        display: 'block',
        color: INK,
        textDecoration: 'none',
      }}
    >
      <div
        className="oeuvres-card-media"
        style={{
          position: 'relative',
          overflow: 'hidden',
          aspectRatio: '4 / 5',
          backgroundColor: PAPER,
          border: '1px solid rgba(10,10,10,0.08)',
          boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
          transition:
            'box-shadow 480ms cubic-bezier(0.22,1,0.36,1), transform 480ms cubic-bezier(0.22,1,0.36,1)',
          willChange: 'transform, box-shadow',
        }}
      >
        <div
          className="oeuvres-card-img"
          style={{ position: 'absolute', inset: 0 }}
        >
          {art.photo ? (
            <Image
              src={art.photo}
              alt={art.title}
              fill
              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover"
            />
          ) : (
            <ArtPoster
              variant={art.posterVariant}
              label={art.title}
              className="absolute inset-0"
            />
          )}
        </div>

        {(isSoldOut || isComing) && (
          <div
            style={{
              position: 'absolute',
              top: '0.75rem',
              right: '0.75rem',
              padding: '0.32rem 0.6rem',
              fontFamily: FONT_BODY,
              fontSize: '0.62rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: isSoldOut ? 'rgba(10,10,10,0.7)' : PAPER,
              backgroundColor: isSoldOut ? 'rgba(250,250,250,0.92)' : 'rgba(10,10,10,0.85)',
              border: isSoldOut ? '1px solid rgba(10,10,10,0.12)' : 'none',
              backdropFilter: 'blur(4px)',
              zIndex: 2,
            }}
          >
            {isSoldOut ? 'Vendue' : 'À venir'}
          </div>
        )}
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: '0.75rem',
          marginTop: 'clamp(0.85rem, 1.4vh, 1.1rem)',
        }}
      >
        <div style={{ minWidth: 0, flex: 1 }}>
          <h3
            style={{
              fontFamily: FONT_SERIF,
              fontStyle: 'italic',
              fontWeight: 400,
              fontSize: 'clamp(1rem, 1.15vw, 1.2rem)',
              lineHeight: 1.25,
              color: INK,
              margin: 0,
            }}
          >
            {art.title}
          </h3>
          <p
            style={{
              fontFamily: FONT_BODY,
              fontSize: '0.78rem',
              lineHeight: 1.4,
              color: 'rgba(10,10,10,0.55)',
              marginTop: '0.25rem',
              letterSpacing: '0.01em',
              margin: '0.25rem 0 0',
            }}
          >
            {seriesLabel}
          </p>
        </div>
        <span
          style={{
            fontFamily: FONT_BODY,
            fontSize: 'clamp(0.9rem, 1vw, 1rem)',
            color: INK,
            whiteSpace: 'nowrap',
            fontVariantNumeric: 'tabular-nums',
            paddingTop: '0.15rem',
          }}
        >
          {isComing ? '—' : priceLabel}
        </span>
      </div>

      <style>{`
        .oeuvres-card:hover .oeuvres-card-media {
          box-shadow: 0 18px 38px -16px rgba(10,10,10,0.22), 0 2px 6px rgba(10,10,10,0.06);
        }
        .oeuvres-card:hover .oeuvres-card-img {
          transform: scale(1.018);
        }
        .oeuvres-card-img {
          transition: transform 720ms cubic-bezier(0.22,1,0.36,1);
          will-change: transform;
        }
        @media (prefers-reduced-motion: reduce) {
          .oeuvres-card:hover .oeuvres-card-img { transform: none; }
        }
      `}</style>
    </Link>
  );
}

/* ============================================================
 *  EMPTY STATE
 * ============================================================ */

function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 'clamp(1rem, 2.5vh, 1.75rem)',
        padding: 'clamp(4rem, 12vh, 8rem) 1rem',
        textAlign: 'center',
      }}
    >
      <p
        style={{
          fontFamily: FONT_SERIF,
          fontStyle: 'italic',
          fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
          lineHeight: 1.15,
          color: INK,
          margin: 0,
          maxWidth: '24ch',
        }}
      >
        Aucune œuvre dans cette catégorie.
      </p>
      <DripButton
        type="button"
        variant="primary"
        glow="pink"
        size="md"
        onClick={onReset}
      >
        Voir toutes les œuvres
      </DripButton>
    </div>
  );
}

/* ============================================================
 *  FOOTER CTA
 * ============================================================ */

function FooterCTA() {
  return (
    <div
      style={{
        marginTop: 'clamp(4rem, 10vh, 8rem)',
        paddingTop: 'clamp(2rem, 4vh, 3rem)',
        borderTop: '1px solid rgba(10,10,10,0.12)',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '1.5rem',
        alignItems: 'baseline',
        justifyContent: 'space-between',
      }}
    >
      <p
        style={{
          fontFamily: FONT_SERIF,
          fontStyle: 'italic',
          fontWeight: 400,
          fontSize: 'clamp(1.4rem, 2.6vw, 2.2rem)',
          lineHeight: 1.15,
          color: INK,
          margin: 0,
          maxWidth: '36ch',
        }}
      >
        Pas trouvé ce que vous cherchez&nbsp;?
      </p>

      <DripButton
        href="/atelier/commission"
        variant="primary"
        glow="pink"
        size="md"
      >
        Demandez un custom
      </DripButton>
    </div>
  );
}
