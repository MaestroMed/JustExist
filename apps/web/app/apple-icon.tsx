import { ImageResponse } from 'next/og';
import { OG_COLORS } from '@/lib/og/shared';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: OG_COLORS.ink,
          backgroundImage: `radial-gradient(ellipse at 25% 25%, rgba(230,57,70,0.18) 0%, transparent 55%), radial-gradient(ellipse at 80% 80%, rgba(30,64,175,0.18) 0%, transparent 55%)`,
          position: 'relative',
          fontFamily: 'Helvetica, sans-serif',
        }}
      >
        {/* N — wordmark central */}
        <div
          style={{
            display: 'flex',
            color: OG_COLORS.cream,
            fontSize: 140,
            fontWeight: 900,
            letterSpacing: '-0.05em',
            lineHeight: 1,
            transform: 'translateY(-4px)',
          }}
        >
          N
        </div>

        {/* Drip rouge qui coule de la barre droite du N */}
        <div
          style={{
            position: 'absolute',
            left: 112,
            top: 132,
            width: 14,
            height: 22,
            background: OG_COLORS.blood,
            borderRadius: '0 0 4px 4px',
          }}
        />
        {/* Goutte arrondie au bout du drip */}
        <div
          style={{
            position: 'absolute',
            left: 109,
            top: 148,
            width: 20,
            height: 20,
            background: OG_COLORS.blood,
            borderRadius: '50%',
          }}
        />

        {/* Splash spray-pink subtil top-left (vibe street art) */}
        <div
          style={{
            position: 'absolute',
            top: 18,
            left: 22,
            width: 10,
            height: 10,
            background: '#FF1F8F',
            borderRadius: '50%',
            opacity: 0.65,
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 28,
            left: 36,
            width: 5,
            height: 5,
            background: '#FAE600',
            borderRadius: '50%',
            opacity: 0.75,
          }}
        />
      </div>
    ),
    size,
  );
}
