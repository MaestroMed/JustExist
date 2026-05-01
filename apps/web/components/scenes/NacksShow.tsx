import Link from 'next/link';
import { Container } from '@nacks/ui';
import { getFeaturedArtworks, formatPrice, type Artwork } from '@/lib/content/artworks';
import { ArtPoster } from '@/components/art/ArtPoster';
import { NacksShowAnim } from './NacksShowAnim';

/**
 * SCÈNE — ŒUVRES PHARES (NacksShow).
 *
 * DA e-commerce galerie premium 2028 (David Zwirner / Hauser & Wirth + Hermès / Aesop).
 * Background cream, grille produits sobre, photo-first, prix lisibles.
 * Server component pour data-fetch ; animations client via NacksShowAnim wrapper.
 *
 * Données : getFeaturedArtworks (8 max, fallback aux non-featured si moins de 8).
 * Animations : stagger Motion whileInView, prefers-reduced-motion respecté.
 */

const INK = 'var(--color-ink, #0a0a0a)';
const CREAM = 'var(--color-cream, #f5f1e8)';
const PAPER = '#fafafa';

const FONT_SERIF = "var(--font-serif, 'Playfair Display', Georgia, serif)";
const FONT_BODY = "var(--font-body, Inter, system-ui, sans-serif)";

export function NacksShow() {
  const featured = getFeaturedArtworks(8);

  return (
    <section
      aria-label="Œuvres phares disponibles à l'achat"
      className="relative"
      style={{
        backgroundColor: CREAM,
        color: INK,
        paddingBlock: 'clamp(5rem, 10vh, 10rem)',
      }}
    >
      <Container size="full">
        {/* ── Header section ── */}
        <header className="mb-[clamp(3rem,6vh,5rem)] grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p
              style={{
                fontFamily: FONT_BODY,
                fontSize: '0.72rem',
                letterSpacing: '0.28em',
                textTransform: 'uppercase',
                color: 'rgba(10,10,10,0.55)',
                marginBottom: 'clamp(1rem, 2vh, 1.5rem)',
              }}
            >
              Œuvres phares
            </p>

            <h2
              style={{
                fontFamily: FONT_SERIF,
                fontStyle: 'italic',
                fontWeight: 400,
                fontSize: 'clamp(2.4rem, 5.5vw, 4.6rem)',
                lineHeight: 1.02,
                letterSpacing: '-0.015em',
                color: INK,
                margin: 0,
              }}
            >
              Disponibles à l&apos;achat.
            </h2>

            <p
              style={{
                fontFamily: FONT_BODY,
                fontSize: 'clamp(0.95rem, 1.05vw, 1.1rem)',
                lineHeight: 1.55,
                color: 'rgba(10,10,10,0.68)',
                marginTop: 'clamp(1rem, 2.2vh, 1.5rem)',
                maxWidth: '38ch',
              }}
            >
              Originaux et tirages limités, certificats d&apos;authenticité numérotés.
            </p>
          </div>

          <Link
            href="/oeuvres"
            data-cursor="link"
            data-cursor-label="Galerie"
            className="group inline-flex items-center self-end whitespace-nowrap"
            style={{
              fontFamily: FONT_SERIF,
              fontStyle: 'italic',
              fontSize: 'clamp(1rem, 1.05vw, 1.15rem)',
              color: INK,
              paddingBottom: '4px',
              borderBottom: '1px solid rgba(10,10,10,0.35)',
              transition: 'border-color 280ms ease',
            }}
          >
            <span className="nacks-show-cta">Voir toutes les œuvres&nbsp;→</span>
          </Link>
        </header>

        {/* ── Grille des œuvres (animée client-side) ── */}
        <NacksShowAnim>
          {featured.map((art) => (
            <ArtworkCard key={art.slug} art={art} />
          ))}
        </NacksShowAnim>
      </Container>

      <style>{`
        .nacks-show-cta {
          background-image: linear-gradient(currentColor, currentColor);
          background-size: 100% 1px;
          background-position: 0 100%;
          background-repeat: no-repeat;
          transition: background-size 320ms cubic-bezier(0.65,0,0.35,1);
        }
        a:hover .nacks-show-cta { background-size: 0% 1px; background-position: 100% 100%; }
        a:hover .nacks-show-cta::after { content: none; }
      `}</style>
    </section>
  );
}

/* ============================================================
 *  ArtworkCard — server component, image first, infos sous
 * ============================================================ */
function ArtworkCard({ art }: { art: Artwork }) {
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
      className="nacks-card group block"
      aria-label={`${art.title} — ${priceLabel}`}
      style={{ color: INK, textDecoration: 'none' }}
    >
      {/* ── Image œuvre ── */}
      <div
        className="nacks-card-media relative overflow-hidden"
        style={{
          aspectRatio: '4 / 5',
          backgroundColor: PAPER,
          border: '1px solid rgba(10,10,10,0.08)',
          boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
          transition:
            'box-shadow 480ms cubic-bezier(0.22,1,0.36,1), transform 480ms cubic-bezier(0.22,1,0.36,1)',
          willChange: 'transform, box-shadow',
        }}
      >
        <div className="nacks-card-img absolute inset-0">
          <ArtPoster
            variant={art.posterVariant}
            label={art.title}
            className="absolute inset-0"
          />
        </div>

        {/* Status badge — discret */}
        {(isSoldOut || isComing) && (
          <div
            className="absolute z-10"
            style={{
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
            }}
          >
            {isSoldOut ? 'Vendue' : 'À venir'}
          </div>
        )}
      </div>

      {/* ── Info bloc ── */}
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
          {priceLabel}
        </span>
      </div>

      {/* ── Hover styles (scoped via class) ── */}
      <style>{`
        .nacks-card:hover .nacks-card-media {
          box-shadow: 0 18px 38px -16px rgba(10,10,10,0.22), 0 2px 6px rgba(10,10,10,0.06);
        }
        .nacks-card:hover .nacks-card-img {
          transform: scale(1.018);
        }
        .nacks-card-img {
          transition: transform 720ms cubic-bezier(0.22,1,0.36,1);
          will-change: transform;
        }
        @media (prefers-reduced-motion: reduce) {
          .nacks-card:hover .nacks-card-img { transform: none; }
        }
      `}</style>
    </Link>
  );
}
