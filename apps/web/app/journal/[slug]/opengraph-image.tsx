import { ImageResponse } from 'next/og';
import { OG_ALT, OG_COLORS, OG_CONTENT_TYPE, OG_SIZE } from '@/lib/og/shared';
import { journalPosts, getPost } from '@/lib/content/journal';

export const alt = OG_ALT;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export async function generateStaticParams() {
  return journalPosts.map((p) => ({ slug: p.slug }));
}

const CATEGORY_LABEL: Record<string, string> = {
  'behind-the-scenes': 'Atelier',
  'drop-story': 'Drop',
  interview: 'Interview',
  guide: 'Guide',
  essai: 'Essai',
  news: 'News',
};

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) {
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
          Article introuvable
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
          background: OG_COLORS.ink,
          color: OG_COLORS.cream,
          padding: '60px',
          fontFamily: '"Helvetica", sans-serif',
          position: 'relative',
        }}
      >
        {/* Accent radial */}
        <div
          style={{
            position: 'absolute',
            bottom: '-200px',
            left: '-120px',
            width: '600px',
            height: '600px',
            borderRadius: '9999px',
            background: 'radial-gradient(circle, rgba(230,57,70,0.18), transparent 65%)',
          }}
        />

        {/* Header : category + date */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            fontSize: '22px',
            letterSpacing: '0.35em',
            textTransform: 'uppercase',
          }}
        >
          <div style={{ color: OG_COLORS.blood }}>{CATEGORY_LABEL[post.category] ?? post.category}</div>
          <div style={{ color: OG_COLORS.muted }}>·</div>
          <div style={{ color: OG_COLORS.muted }}>
            {post.publishedAt.toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' })}
          </div>
          <div style={{ color: OG_COLORS.muted }}>·</div>
          <div style={{ color: OG_COLORS.muted }}>{`${post.readingTime} min`}</div>
        </div>

        {/* Title with initial letter in blood */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '20px',
          }}
        >
          <div
            style={{
              fontSize: post.title.length > 60 ? '64px' : '80px',
              fontWeight: 600,
              letterSpacing: '-0.03em',
              lineHeight: 1.05,
              color: OG_COLORS.cream,
              maxWidth: '1080px',
            }}
          >
            {post.title}
          </div>
          <div
            style={{
              fontSize: '26px',
              color: OG_COLORS.muted,
              maxWidth: '900px',
              lineHeight: 1.4,
              fontStyle: 'italic',
            }}
          >
            {post.subtitle}
          </div>
        </div>

        {/* Signature footer */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '2px solid rgba(245,241,232,0.12)',
            paddingTop: '24px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              fontSize: '22px',
              fontWeight: 600,
              letterSpacing: '0.05em',
            }}
          >
            <div>NACKS</div>
            <div
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '9999px',
                background: OG_COLORS.blood,
              }}
            />
            <div style={{ color: OG_COLORS.muted, fontWeight: 400, letterSpacing: '0.2em', fontSize: '18px', textTransform: 'uppercase' }}>
              Journal
            </div>
          </div>
          <div style={{ fontSize: '20px', letterSpacing: '0.25em', textTransform: 'uppercase', color: OG_COLORS.muted }}>
            nacksgalerie.com
          </div>
        </div>
      </div>
    ),
    size,
  );
}
