import { ImageResponse } from 'next/og';
import { OG_ALT, OG_COLORS, OG_CONTENT_TYPE, OG_SIZE, priceText } from '@/lib/og/shared';
import { drops, getDrop } from '@/lib/content/drops';

export const alt = OG_ALT;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export async function generateStaticParams() {
  return drops.map((d) => ({ slug: d.slug }));
}

function editionLabel(status: string, remaining: number, size: number): string {
  if (status === 'live') return `${remaining} / ${size} restants`;
  if (status === 'sold_out' || status === 'past') return `Sold out · ${size}`;
  return `${size} exemplaires`;
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const drop = getDrop(slug);
  if (!drop) {
    return new ImageResponse(
      (
        <div
          style={{
            width: '100%',
            height: '100%',
            background: OG_COLORS.ink,
            color: OG_COLORS.cream,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '72px',
            fontWeight: 700,
          }}
        >
          Drop introuvable
        </div>
      ),
      size,
    );
  }

  const statusLabel =
    drop.status === 'live'
      ? '● EN DIRECT'
      : drop.status === 'upcoming'
        ? 'À VENIR'
        : drop.status === 'sold_out' || drop.status === 'past'
          ? 'ARCHIVE'
          : '';
  const statusColor = drop.status === 'live' ? OG_COLORS.blood : OG_COLORS.cream;
  const remaining = drop.editionSize - drop.sold;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: OG_COLORS.ink,
          color: OG_COLORS.cream,
          padding: '60px',
          fontFamily: '"Helvetica", sans-serif',
          position: 'relative',
        }}
      >
        {/* Background accent */}
        <div
          style={{
            position: 'absolute',
            top: '-100px',
            right: '-100px',
            width: '600px',
            height: '600px',
            borderRadius: '9999px',
            background:
              drop.status === 'live'
                ? 'radial-gradient(circle, rgba(230,57,70,0.4), transparent 60%)'
                : 'radial-gradient(circle, rgba(30,64,175,0.3), transparent 60%)',
          }}
        />

        {/* Status */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            fontSize: '28px',
            fontWeight: 600,
            letterSpacing: '0.35em',
            color: statusColor,
          }}
        >
          {statusLabel}
        </div>

        {/* Title */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '24px',
          }}
        >
          <div
            style={{
              fontSize: '108px',
              fontWeight: 700,
              letterSpacing: '-0.03em',
              lineHeight: 1,
              color: OG_COLORS.cream,
              maxWidth: '1000px',
            }}
          >
            {drop.title}
          </div>
          <div
            style={{
              fontSize: '28px',
              color: OG_COLORS.muted,
              maxWidth: '820px',
              lineHeight: 1.4,
            }}
          >
            {drop.subtitle}
          </div>
        </div>

        {/* Footer : price + edition */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            borderTop: `2px solid rgba(245,241,232,0.12)`,
            paddingTop: '28px',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div
              style={{
                fontSize: '18px',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: OG_COLORS.muted,
              }}
            >
              Prix
            </div>
            <div
              style={{
                fontSize: '64px',
                fontWeight: 600,
                fontVariantNumeric: 'tabular-nums',
                color: OG_COLORS.cream,
                letterSpacing: '-0.02em',
              }}
            >
              {priceText(drop.priceCents)}
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', alignItems: 'flex-end' }}>
            <div
              style={{
                fontSize: '18px',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: OG_COLORS.muted,
              }}
            >
              Édition
            </div>
            <div
              style={{
                fontSize: '48px',
                fontWeight: 600,
                fontVariantNumeric: 'tabular-nums',
                color: OG_COLORS.cream,
                letterSpacing: '-0.01em',
              }}
            >
              {editionLabel(drop.status, remaining, drop.editionSize)}
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
