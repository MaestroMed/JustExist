import { ImageResponse } from 'next/og';
import { OG_ALT, OG_COLORS, OG_CONTENT_TYPE, OG_SIZE, priceText } from '@/lib/og/shared';
import { getArtwork, artworks } from '@/lib/content/artworks';
import { getCharacterOrProject } from '@/lib/content/characters';

export const alt = OG_ALT;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export async function generateStaticParams() {
  return artworks.map((a) => ({ handle: a.slug }));
}

export default async function Image({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params;
  const artwork = getArtwork(handle);
  if (!artwork) return fallback();

  const character = artwork.character ? getCharacterOrProject(artwork.character) : null;
  const accent = character?.primaryColor ?? OG_COLORS.blood;
  const txtOnAccent = contrastOf(accent);
  const statusLabel = artwork.status === 'sold_out' ? 'Vendu' : artwork.status === 'coming' ? 'Bientôt' : 'Prix';
  const priceLabel = artwork.status === 'coming' ? '—' : priceText(artwork.priceCents);
  const bigName = character?.name?.split(' ')[0] ?? 'NACKS';
  const editionLabel = artwork.edition ? `Édition ${artwork.edition.size}` : '';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'row',
          backgroundColor: OG_COLORS.ink,
          color: OG_COLORS.cream,
          fontFamily: 'sans-serif',
        }}
      >
        {/* LEFT PANEL — accent color */}
        <div
          style={{
            width: '46%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '60px',
            backgroundColor: accent,
            color: txtOnAccent,
          }}
        >
          <div
            style={{
              display: 'flex',
              fontSize: '20px',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              opacity: 0.75,
            }}
          >
            {typeLabel(artwork.type)}
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: '180px',
              fontWeight: 700,
              letterSpacing: '-0.05em',
              lineHeight: 0.9,
            }}
          >
            {bigName}
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: '22px',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              opacity: 0.75,
            }}
          >
            {String(artwork.year)}
          </div>
        </div>

        {/* RIGHT PANEL — info */}
        <div
          style={{
            width: '54%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '60px',
          }}
        >
          {/* Eyebrow */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              fontSize: '20px',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: OG_COLORS.blood,
            }}
          >
            <div
              style={{
                display: 'flex',
                width: '10px',
                height: '10px',
                borderRadius: '9999px',
                backgroundColor: OG_COLORS.blood,
                marginRight: '14px',
              }}
            />
            <div style={{ display: 'flex' }}>Nacks Galerie</div>
          </div>

          {/* Title + subtitle */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div
              style={{
                display: 'flex',
                fontSize: '72px',
                fontWeight: 600,
                letterSpacing: '-0.02em',
                lineHeight: 1.05,
                color: OG_COLORS.cream,
                marginBottom: '18px',
              }}
            >
              {artwork.title}
            </div>
            <div
              style={{
                display: 'flex',
                fontSize: '26px',
                color: OG_COLORS.muted,
                lineHeight: 1.4,
              }}
            >
              {artwork.subtitle}
            </div>
          </div>

          {/* Price + edition + dimensions */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div
              style={{
                display: 'flex',
                fontSize: '20px',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: OG_COLORS.muted,
                marginBottom: '10px',
              }}
            >
              {statusLabel}
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline' }}>
              <div
                style={{
                  display: 'flex',
                  fontSize: '80px',
                  fontWeight: 600,
                  color: OG_COLORS.cream,
                  letterSpacing: '-0.02em',
                }}
              >
                {priceLabel}
              </div>
              {editionLabel ? (
                <div
                  style={{
                    display: 'flex',
                    fontSize: '22px',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: OG_COLORS.muted,
                    marginLeft: '28px',
                    alignSelf: 'flex-end',
                    marginBottom: '18px',
                  }}
                >
                  {editionLabel}
                </div>
              ) : null}
            </div>
            <div
              style={{
                display: 'flex',
                fontSize: '18px',
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: OG_COLORS.muted,
                marginTop: '16px',
              }}
            >
              {artwork.dimensions}
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}

function fallback() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: OG_COLORS.ink,
          color: OG_COLORS.cream,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '120px',
          fontWeight: 700,
          letterSpacing: '-0.05em',
        }}
      >
        NACKS
      </div>
    ),
    size,
  );
}

function contrastOf(bgHex: string): string {
  const lightHexes = ['#FFD43B', '#F5F1E8', '#D4A056'];
  return lightHexes.includes(bgHex) ? OG_COLORS.ink : OG_COLORS.cream;
}

function typeLabel(t: string): string {
  const map: Record<string, string> = {
    original: 'Original unique',
    giclee: 'Giclée signée',
    serigraphie: 'Sérigraphie limitée',
    poster: 'Poster open edition',
    figurine: 'Figurine résine',
    merch: 'Merch',
  };
  return map[t] ?? t;
}
