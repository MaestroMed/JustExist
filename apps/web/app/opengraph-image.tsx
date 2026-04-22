import { ImageResponse } from 'next/og';
import { OG_ALT, OG_COLORS, OG_CONTENT_TYPE, OG_SIZE } from '@/lib/og/shared';

export const alt = OG_ALT;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: OG_COLORS.ink,
          backgroundImage:
            'radial-gradient(ellipse at 30% 30%, rgba(30,64,175,0.45) 0%, transparent 50%), radial-gradient(ellipse at 80% 70%, rgba(230,57,70,0.35) 0%, transparent 50%)',
          color: OG_COLORS.cream,
          padding: '80px',
          fontFamily: '"Helvetica", sans-serif',
          position: 'relative',
        }}
      >
        {/* Top eyebrow */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            fontSize: '22px',
            letterSpacing: '0.35em',
            textTransform: 'uppercase',
            color: OG_COLORS.muted,
          }}
        >
          <div
            style={{
              width: '10px',
              height: '10px',
              borderRadius: '9999px',
              background: OG_COLORS.blood,
            }}
          />
          <div>Royaume numérique</div>
        </div>

        {/* Central wordmark */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
            marginLeft: '-8px',
          }}
        >
          <div
            style={{
              fontSize: '280px',
              fontWeight: 700,
              letterSpacing: '-0.05em',
              lineHeight: 1,
              display: 'flex',
              alignItems: 'baseline',
              color: OG_COLORS.cream,
            }}
          >
            NACKS
            <span
              style={{
                width: '24px',
                height: '24px',
                borderRadius: '9999px',
                background: OG_COLORS.blood,
                marginLeft: '20px',
                transform: 'translateY(-8px)',
              }}
            />
          </div>
          {/* Red signature line */}
          <div
            style={{
              marginTop: '24px',
              width: '540px',
              height: '4px',
              background: OG_COLORS.blood,
              borderRadius: '9999px',
            }}
          />
          <div
            style={{
              marginTop: '28px',
              fontSize: '36px',
              lineHeight: 1.2,
              maxWidth: '900px',
              color: OG_COLORS.cream,
            }}
          >
            Originaux, drops, éditions, univers.
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            fontSize: '22px',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: OG_COLORS.muted,
          }}
        >
          <div>Naguy « Nacks » Claude — Sarcelles · Paris · Los Angeles</div>
          <div style={{ color: OG_COLORS.cream }}>nacksgalerie.com</div>
        </div>
      </div>
    ),
    size,
  );
}
