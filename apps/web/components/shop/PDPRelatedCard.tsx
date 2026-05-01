'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import type { Artwork } from '@/lib/content/artworks';
import { formatPrice } from '@/lib/content/artworks';
import Image from 'next/image';
import { ArtPoster } from '@/components/art/ArtPoster';

const INK = 'var(--color-ink, #0a0a0a)';
const PAPER = '#fafafa';

const FONT_SERIF = "var(--font-serif, 'Playfair Display', Georgia, serif)";
const FONT_BODY = "var(--font-body, Inter, system-ui, sans-serif)";

/**
 * Card "Œuvres dans la même série" — DA cream/ink alignée NacksShow.
 * Plus calme, photo-first, prix lisible sous l'image.
 */
export function PDPRelatedCard({
  art,
  index,
}: {
  art: Artwork;
  index: number;
}) {
  const isSoldOut = art.status === 'sold_out';
  const isComing = art.status === 'coming';

  const seriesLabel = (() => {
    if (art.edition) return `Édition de ${art.edition.size}`;
    if (art.type === 'original') return 'Pièce unique';
    if (art.type === 'poster') return 'Open edition';
    if (art.type === 'figurine') return 'Édition limitée';
    return art.subtitle;
  })();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{
        duration: 0.6,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <Link
        href={`/oeuvres/${art.slug}`}
        data-cursor="link"
        data-cursor-label="Voir"
        className="pdp-related-card group block"
        aria-label={`${art.title} — ${formatPrice(art.priceCents)}`}
        style={{ color: INK, textDecoration: 'none' }}
      >
        {/* Image œuvre */}
        <div
          className="pdp-related-media relative overflow-hidden"
          style={{
            aspectRatio: '4 / 5',
            backgroundColor: PAPER,
            border: '1px solid rgba(10,10,10,0.06)',
            transition:
              'box-shadow 480ms cubic-bezier(0.22,1,0.36,1)',
          }}
        >
          <div className="pdp-related-img absolute inset-0">
            {art.photo ? (
              <Image
                src={art.photo}
                alt={art.title}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
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
              className="absolute"
              style={{
                top: '0.75rem',
                right: '0.75rem',
                padding: '0.32rem 0.6rem',
                fontFamily: FONT_BODY,
                fontSize: '0.62rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: isSoldOut ? 'rgba(10,10,10,0.7)' : PAPER,
                backgroundColor: isSoldOut
                  ? 'rgba(250,250,250,0.92)'
                  : 'rgba(10,10,10,0.85)',
                border: isSoldOut ? '1px solid rgba(10,10,10,0.12)' : 'none',
                backdropFilter: 'blur(4px)',
              }}
            >
              {isSoldOut ? 'Vendue' : 'À venir'}
            </div>
          )}
        </div>

        {/* Info */}
        <div
          className="flex items-start justify-between gap-3"
          style={{ marginTop: 'clamp(0.85rem, 1.4vh, 1.1rem)' }}
        >
          <div className="min-w-0 flex-1">
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
            {isComing ? '—' : formatPrice(art.priceCents)}
          </span>
        </div>

        <style>{`
          .pdp-related-card:hover .pdp-related-media {
            box-shadow: 0 18px 38px -16px rgba(10,10,10,0.22),
              0 2px 6px rgba(10,10,10,0.06);
          }
          .pdp-related-card:hover .pdp-related-img {
            transform: scale(1.018);
          }
          .pdp-related-img {
            transition: transform 720ms cubic-bezier(0.22,1,0.36,1);
            will-change: transform;
          }
          @media (prefers-reduced-motion: reduce) {
            .pdp-related-card:hover .pdp-related-img { transform: none; }
          }
        `}</style>
      </Link>
    </motion.div>
  );
}
