import { ImageResponse } from 'next/og';
import { OG_ALT, OG_COLORS, OG_CONTENT_TYPE, OG_SIZE } from '@/lib/og/shared';
import { characters, getCharacter, type CharacterSlug } from '@/lib/content/characters';

export const alt = OG_ALT;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export async function generateStaticParams() {
  return characters.map((c) => ({ character: c.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ character: string }>;
}) {
  const { character } = await params;
  const data = getCharacter(character as CharacterSlug);
  if (!data) {
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
            fontSize: '64px',
          }}
        >
          Personnage inconnu
        </div>
      ),
      size,
    );
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: data.primaryColor,
          color: OG_COLORS.cream,
          padding: '80px',
          fontFamily: '"Helvetica", sans-serif',
          position: 'relative',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            fontSize: '22px',
            letterSpacing: '0.35em',
            textTransform: 'uppercase',
            color: 'rgba(245,241,232,0.75)',
          }}
        >
          <div>Univers Nacks</div>
          <div>·</div>
          <div>{`Introduit ${data.introducedAt}`}</div>
        </div>

        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '28px',
          }}
        >
          <div
            style={{
              fontSize: '32px',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: data.accentColor,
            }}
          >
            {data.tagline}
          </div>
          <div
            style={{
              fontSize: '200px',
              fontWeight: 700,
              letterSpacing: '-0.05em',
              lineHeight: 0.9,
              color: OG_COLORS.cream,
            }}
          >
            {data.name}
          </div>
          <div
            style={{
              fontSize: '32px',
              fontStyle: 'italic',
              color: 'rgba(245,241,232,0.9)',
              maxWidth: '900px',
              lineHeight: 1.3,
            }}
          >
            {`« ${data.phrase} »`}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            fontSize: '22px',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: 'rgba(245,241,232,0.75)',
            borderTop: '2px solid rgba(245,241,232,0.2)',
            paddingTop: '24px',
          }}
        >
          <div>{`${data.drops} drops · ${data.artworks} œuvres`}</div>
          <div>nacksgalerie.com</div>
        </div>
      </div>
    ),
    size,
  );
}
