import { ImageResponse } from 'next/og';
import { OG_ALT, OG_COLORS, OG_CONTENT_TYPE, OG_SIZE, loadGoogleFont } from '@/lib/og/shared';

export const alt = OG_ALT;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

const SPRAY_PINK = '#FF1F8F';
const SPRAY_YELLOW = '#FAE600';
const SPRAY_BLUE = '#0044FF';

type Drip = { left: number; height: number; width: number; color: string; bulb: number };
const DRIPS: Drip[] = [
  { left: 88, height: 86, width: 8, color: OG_COLORS.blood, bulb: 9 },
  { left: 138, height: 46, width: 6, color: SPRAY_PINK, bulb: 7 },
  { left: 196, height: 118, width: 9, color: SPRAY_YELLOW, bulb: 10 },
  { left: 246, height: 32, width: 6, color: OG_COLORS.bubble, bulb: 6 },
  { left: 1014, height: 72, width: 7, color: OG_COLORS.bubble, bulb: 8 },
  { left: 1066, height: 102, width: 8, color: SPRAY_BLUE, bulb: 9 },
  { left: 1118, height: 44, width: 6, color: OG_COLORS.pop, bulb: 7 },
];

export default async function Image() {
  const [display, displayBlack, serifItalic, script, mono] = await Promise.all([
    loadGoogleFont('Space Grotesk', '700'),
    loadGoogleFont('Archivo Black'),
    loadGoogleFont('Playfair Display', '500italic'),
    loadGoogleFont('Caveat', '600'),
    loadGoogleFont('JetBrains Mono', '500'),
  ]);

  type LoadedFont = {
    name: string;
    data: ArrayBuffer;
    weight: 500 | 600 | 700 | 900;
    style: 'normal' | 'italic';
  };
  const fonts: LoadedFont[] = [];
  if (display) fonts.push({ name: 'Display', data: display, weight: 700, style: 'normal' });
  if (displayBlack) fonts.push({ name: 'DisplayBlack', data: displayBlack, weight: 900, style: 'normal' });
  if (serifItalic) fonts.push({ name: 'SerifItalic', data: serifItalic, weight: 500, style: 'italic' });
  if (script) fonts.push({ name: 'Script', data: script, weight: 600, style: 'normal' });
  if (mono) fonts.push({ name: 'Mono', data: mono, weight: 500, style: 'normal' });

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: OG_COLORS.ink,
          backgroundImage: `
            radial-gradient(ellipse 700px 500px at 18% 22%, rgba(230,57,70,0.32) 0%, transparent 65%),
            radial-gradient(ellipse 800px 600px at 85% 78%, rgba(30,64,175,0.34) 0%, transparent 65%),
            radial-gradient(ellipse 600px 400px at 50% 100%, rgba(255,31,143,0.10) 0%, transparent 70%)
          `,
          color: OG_COLORS.cream,
          padding: '72px 88px',
          fontFamily: 'Display, Helvetica, sans-serif',
          position: 'relative',
        }}
      >
        {/* Drips déco — fresh paint qui pend du bord top du canvas (avant le padding) */}
        {DRIPS.map((d, i) => (
          <div key={i} style={{ position: 'absolute', top: 0, left: d.left, display: 'flex' }}>
            <div
              style={{
                width: d.width,
                height: d.height,
                background: d.color,
                borderRadius: `0 0 ${d.width / 2}px ${d.width / 2}px`,
                opacity: 0.94,
              }}
            />
            <div
              style={{
                position: 'absolute',
                left: d.width / 2 - d.bulb,
                top: d.height - d.bulb / 2,
                width: d.bulb * 2,
                height: d.bulb * 2,
                background: d.color,
                borderRadius: '9999px',
                opacity: 0.94,
              }}
            />
          </div>
        ))}

        {/* Top eyebrow */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 48,
            fontFamily: 'Mono, monospace',
            fontSize: '20px',
            letterSpacing: '0.42em',
            textTransform: 'uppercase',
            color: 'rgba(245, 241, 232, 0.7)',
            zIndex: 2,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: '9999px',
                background: OG_COLORS.blood,
                boxShadow: '0 0 24px rgba(230,57,70,0.7)',
              }}
            />
            <div style={{ display: 'flex' }}>Royaume&nbsp;numérique</div>
          </div>
          <div style={{ color: 'rgba(245,241,232,0.45)' }}>Est. Sarcelles · 2024</div>
        </div>

        {/* Hero — wordmark + signature + tagline */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '14px',
            zIndex: 2,
          }}
        >
          {/* Wordmark NACKS. — Archivo Black, le "." en blood */}
          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              fontFamily: 'DisplayBlack, Display, Helvetica, sans-serif',
              fontWeight: 900,
              fontSize: '196px',
              letterSpacing: '-0.04em',
              lineHeight: 0.9,
              color: OG_COLORS.cream,
              textShadow: '0 8px 32px rgba(0,0,0,0.45)',
            }}
          >
            <div style={{ display: 'flex' }}>NACKS</div>
            <div
              style={{
                marginLeft: 4,
                color: OG_COLORS.blood,
                textShadow: '0 0 28px rgba(230,57,70,0.65)',
              }}
            >
              .
            </div>
          </div>

          {/* Ligne signature blood */}
          <div
            style={{
              width: 160,
              height: 5,
              background: OG_COLORS.blood,
              borderRadius: 9999,
              marginTop: 4,
              boxShadow: '0 0 24px rgba(230,57,70,0.55)',
            }}
          />

          {/* Subtitle Playfair Italic — 1 ligne */}
          <div
            style={{
              marginTop: 18,
              fontFamily: 'SerifItalic, "Times New Roman", serif',
              fontStyle: 'italic',
              fontWeight: 500,
              fontSize: '36px',
              lineHeight: 1.15,
              color: OG_COLORS.cream,
            }}
          >
            Galerie d&apos;art pop urbain.
          </div>

          {/* Signature manuscrite Caveat */}
          <div
            style={{
              marginTop: 22,
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              fontFamily: 'Script, "Brush Script MT", cursive',
              fontWeight: 600,
              fontSize: '40px',
              color: 'rgba(245,241,232,0.78)',
              letterSpacing: '0.005em',
            }}
          >
            <div style={{ display: 'flex' }}>~ Naguy «&nbsp;Nacks&nbsp;» Claude</div>
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '18px',
            zIndex: 2,
          }}
        >
          {/* Tagline mono */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 18,
              fontFamily: 'Mono, monospace',
              fontWeight: 500,
              fontSize: '18px',
              letterSpacing: '0.42em',
              textTransform: 'uppercase',
              color: OG_COLORS.cream,
            }}
          >
            <div style={{ display: 'flex' }}>Originaux</div>
            <div style={{ color: OG_COLORS.blood }}>·</div>
            <div style={{ display: 'flex' }}>Drops</div>
            <div style={{ color: OG_COLORS.blood }}>·</div>
            <div style={{ display: 'flex' }}>Éditions</div>
            <div style={{ color: OG_COLORS.blood }}>·</div>
            <div style={{ display: 'flex' }}>Univers</div>
          </div>

          {/* Hairline + cities/url */}
          <div
            style={{
              width: '100%',
              height: 1,
              background: 'rgba(245,241,232,0.18)',
            }}
          />
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontFamily: 'Mono, monospace',
              fontWeight: 500,
              fontSize: '19px',
              letterSpacing: '0.32em',
              textTransform: 'uppercase',
              color: 'rgba(245,241,232,0.62)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ color: 'rgba(245,241,232,0.85)' }}>Sarcelles</div>
              <div style={{ color: OG_COLORS.blood }}>/</div>
              <div style={{ color: 'rgba(245,241,232,0.85)' }}>Paris</div>
              <div style={{ color: OG_COLORS.blood }}>/</div>
              <div style={{ color: 'rgba(245,241,232,0.85)' }}>Los&nbsp;Angeles</div>
            </div>
            <div style={{ color: OG_COLORS.cream, letterSpacing: '0.3em' }}>
              nacksgalerie.com
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: fonts.length > 0 ? fonts : undefined,
    },
  );
}
