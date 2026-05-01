import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@nacks/ui';
import { PageShell } from '@/components/layouts/PageShell';
import { ArtPoster } from '@/components/art/ArtPoster';
import { ReadingProgress } from '@/components/polish/ReadingProgress';
import { ShareButtons } from '@/components/polish/ShareButtons';
import { RevealParagraph } from '@/components/journal/RevealParagraph';
import { JournalRelatedCard } from '@/components/journal/JournalRelatedCard';
import { NewsletterForm } from '@/components/forms/NewsletterForm';
import { buildBlogPosting, buildBreadcrumb, serializeJsonLd } from '@/lib/seo/jsonld';
import { journalPosts, getPost, type JournalPost } from '@/lib/content/journal';

type Params = Promise<{ slug: string }>;

const INK = 'var(--color-ink, #0a0a0a)';
const CREAM = 'var(--color-cream, #f5f1e8)';
const BLOOD = 'var(--color-blood, #e63946)';

const FONT_SERIF = "var(--font-serif, 'Playfair Display', Georgia, serif)";
const FONT_BODY = "var(--font-body, Inter, system-ui, sans-serif)";
const FONT_MONO = "var(--font-mono, ui-monospace, monospace)";

const CATEGORY_LABEL: Record<JournalPost['category'], string> = {
  'behind-the-scenes': 'Processus',
  'drop-story': 'Voyage',
  interview: 'Rencontre',
  guide: 'Guide',
  essai: 'Essai',
  news: 'News',
};

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: 'Article introuvable' };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: `${post.title} — Journal Nacks`,
      description: post.excerpt,
      type: 'article',
      locale: 'fr_FR',
      siteName: 'Nacks Galerie',
      url: `/journal/${post.slug}`,
      publishedTime: post.publishedAt.toISOString(),
      authors: ['Naguy Claude'],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${post.title} — Journal Nacks`,
      description: post.excerpt,
    },
    alternates: { canonical: `/journal/${post.slug}` },
  };
}

export async function generateStaticParams() {
  return journalPosts.map((p) => ({ slug: p.slug }));
}

export default async function ArticlePage({ params }: { params: Params }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const sorted = [...journalPosts].sort(
    (a, b) => b.publishedAt.getTime() - a.publishedAt.getTime(),
  );
  const related = sorted.filter((p) => p.slug !== post.slug).slice(0, 3);

  const dateLabel = post.publishedAt.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <PageShell>
      <ReadingProgress targetSelector="article" />

      <main
        style={{
          backgroundColor: CREAM,
          color: INK,
        }}
      >
        {/* ─────────── Hero méta + titre ─────────── */}
        <section
          aria-label="En-tête article"
          style={{
            paddingBlock: 'clamp(3rem, 7vh, 6rem)',
          }}
        >
          <Container size="full">
            {/* Breadcrumb minimal */}
            <nav
              aria-label="Fil d'Ariane"
              className="mb-[clamp(2rem,4vh,3rem)] flex items-center gap-[0.6ch] uppercase"
              style={{
                fontFamily: FONT_MONO,
                fontSize: '0.7rem',
                letterSpacing: '0.26em',
                color: 'rgba(10,10,10,0.45)',
              }}
            >
              <Link
                href="/"
                data-cursor="link"
                style={{ color: 'rgba(10,10,10,0.45)' }}
              >
                Accueil
              </Link>
              <span aria-hidden>/</span>
              <Link
                href="/journal"
                data-cursor="link"
                style={{ color: 'rgba(10,10,10,0.45)' }}
              >
                Journal
              </Link>
              <span aria-hidden>/</span>
              <span style={{ color: INK }}>
                {CATEGORY_LABEL[post.category]}
              </span>
            </nav>

            {/* Eyebrow catégorie */}
            <p
              className="uppercase"
              style={{
                fontFamily: FONT_BODY,
                fontSize: '0.72rem',
                letterSpacing: '0.32em',
                color: BLOOD,
                margin: 0,
              }}
            >
              {CATEGORY_LABEL[post.category]}
            </p>

            {/* Titre serif italic XXXL */}
            <h1
              className="text-balance"
              style={{
                fontFamily: FONT_SERIF,
                fontStyle: 'italic',
                fontWeight: 400,
                fontSize: 'clamp(2.6rem, 7vw, 6.5rem)',
                lineHeight: 0.96,
                letterSpacing: '-0.022em',
                color: INK,
                margin: 0,
                marginTop: 'clamp(1.5rem, 3vh, 2.4rem)',
                maxWidth: '18ch',
              }}
            >
              {post.title}
            </h1>

            {/* Sous-titre */}
            <p
              className="text-balance"
              style={{
                fontFamily: FONT_BODY,
                fontSize: 'clamp(1.1rem, 1.4vw, 1.45rem)',
                lineHeight: 1.5,
                color: 'rgba(10,10,10,0.65)',
                fontStyle: 'italic',
                margin: 0,
                marginTop: 'clamp(1.5rem, 3vh, 2rem)',
                maxWidth: '52ch',
              }}
            >
              {post.subtitle}
            </p>

            {/* Méta auteur + date + lecture */}
            <div
              className="flex flex-wrap items-center gap-[0.6ch] uppercase"
              style={{
                fontFamily: FONT_MONO,
                fontSize: '0.72rem',
                letterSpacing: '0.22em',
                color: 'rgba(10,10,10,0.55)',
                margin: 0,
                marginTop: 'clamp(2rem, 4vh, 3rem)',
              }}
            >
              <span>Par Naguy &laquo;&nbsp;Nacks&nbsp;&raquo; Claude</span>
              <span aria-hidden>·</span>
              <time dateTime={post.publishedAt.toISOString()}>{dateLabel}</time>
              <span aria-hidden>·</span>
              <span>{post.readingTime} min de lecture</span>
            </div>
          </Container>
        </section>

        {/* ─────────── Cover full-width ─────────── */}
        <section
          aria-label="Image de couverture"
          style={{ paddingBlock: 'clamp(1rem, 2vh, 2rem)' }}
        >
          <Container size="full">
            <div
              className="relative overflow-hidden"
              style={{
                aspectRatio: '16 / 9',
                backgroundColor: '#fafafa',
                border: '1px solid rgba(10,10,10,0.06)',
              }}
            >
              <ArtPoster
                variant={post.coverVariant}
                label={post.title}
                className="absolute inset-0"
              />
            </div>
          </Container>
        </section>

        {/* ─────────── Article body (max-w 680) ─────────── */}
        <section
          aria-label="Contenu de l'article"
          style={{ paddingBlock: 'clamp(4rem, 8vh, 7rem)' }}
        >
          <div
            className="mx-auto"
            style={{
              maxWidth: '680px',
              paddingInline: 'clamp(1.5rem, 4vw, 2rem)',
            }}
          >
            <article
              className="flex flex-col"
              style={{
                fontFamily: FONT_BODY,
                fontSize: 'clamp(1.0625rem, 1.15vw, 1.18rem)',
                lineHeight: 1.75,
                color: 'rgba(10,10,10,0.85)',
                gap: 'clamp(1.5rem, 3vh, 2rem)',
              }}
            >
              {post.body.map((paragraph, i) => (
                <RevealParagraph
                  key={i}
                  index={i}
                  className={
                    i === 0
                      ? 'journal-article-first'
                      : 'journal-article-para'
                  }
                >
                  {paragraph}
                </RevealParagraph>
              ))}
            </article>

            {/* Share buttons */}
            <div
              className="mt-[clamp(3rem,6vh,5rem)] border-t pt-[clamp(2rem,4vh,3rem)]"
              style={{ borderColor: 'rgba(10,10,10,0.12)' }}
            >
              <ShareButtons
                url={`/journal/${post.slug}`}
                title={`${post.title} — Journal Nacks`}
                description={post.excerpt}
              />
            </div>

            {/* Auteur footer */}
            <div
              className="mt-[clamp(3rem,6vh,5rem)] flex flex-col gap-[1.5rem] border-t pt-[clamp(2rem,4vh,3rem)] md:flex-row md:items-center md:gap-[2rem]"
              style={{ borderColor: 'rgba(10,10,10,0.12)' }}
            >
              <div
                className="relative shrink-0 overflow-hidden"
                style={{
                  width: '88px',
                  height: '88px',
                  borderRadius: '50%',
                  border: '1px solid rgba(10,10,10,0.1)',
                  backgroundColor: '#fafafa',
                }}
              >
                <Image
                  src="/photos/portrait/naguy-bureau-profile.jpg"
                  alt="Naguy 'Nacks' Claude"
                  fill
                  sizes="88px"
                  className="object-cover"
                  style={{ borderRadius: '50%' }}
                />
              </div>
              <div className="flex flex-col gap-[0.5rem]">
                <p
                  className="uppercase"
                  style={{
                    fontFamily: FONT_MONO,
                    fontSize: '0.7rem',
                    letterSpacing: '0.26em',
                    color: 'rgba(10,10,10,0.5)',
                    margin: 0,
                  }}
                >
                  Écrit par
                </p>
                <p
                  style={{
                    fontFamily: FONT_SERIF,
                    fontStyle: 'italic',
                    fontWeight: 400,
                    fontSize: '1.45rem',
                    lineHeight: 1.1,
                    color: INK,
                    margin: 0,
                  }}
                >
                  Naguy &laquo;&nbsp;Nacks&nbsp;&raquo; Claude
                </p>
                <p
                  style={{
                    fontFamily: FONT_BODY,
                    fontSize: '0.95rem',
                    lineHeight: 1.5,
                    color: 'rgba(10,10,10,0.65)',
                    margin: 0,
                    maxWidth: '52ch',
                  }}
                >
                  Peintre. Né à Sarcelles. Atelier à Paris. Posca, acrylique,
                  bombe — dans cet ordre.
                </p>
              </div>
            </div>

            {/* Newsletter inline */}
            <div
              className="mt-[clamp(3rem,6vh,5rem)] border-y py-[clamp(2.5rem,5vh,4rem)] text-center"
              style={{ borderColor: 'rgba(10,10,10,0.12)' }}
            >
              <p
                className="uppercase"
                style={{
                  fontFamily: FONT_MONO,
                  fontSize: '0.7rem',
                  letterSpacing: '0.3em',
                  color: 'rgba(10,10,10,0.55)',
                  margin: 0,
                }}
              >
                Reçois le prochain
              </p>
              <h3
                className="text-balance"
                style={{
                  fontFamily: FONT_SERIF,
                  fontStyle: 'italic',
                  fontWeight: 400,
                  fontSize: 'clamp(1.6rem, 2.4vw, 2.2rem)',
                  lineHeight: 1.1,
                  color: INK,
                  margin: 0,
                  marginTop: '1rem',
                }}
              >
                Chaque mois, une lettre courte.
              </h3>
              <div className="mx-auto mt-[clamp(1.5rem,3vh,2.5rem)] max-w-md">
                <NewsletterForm variant="compact" />
              </div>
            </div>
          </div>
        </section>

        {/* ─────────── Articles similaires ─────────── */}
        {related.length > 0 && (
          <section
            aria-label="Articles similaires"
            style={{ paddingBlock: 'clamp(4rem, 8vh, 7rem)' }}
          >
            <Container size="full">
              <h2
                className="text-balance mb-[clamp(2.5rem,5vh,4rem)]"
                style={{
                  fontFamily: FONT_SERIF,
                  fontStyle: 'italic',
                  fontWeight: 400,
                  fontSize: 'clamp(2rem, 3.5vw, 3.2rem)',
                  lineHeight: 1.05,
                  letterSpacing: '-0.018em',
                  color: INK,
                  margin: 0,
                }}
              >
                À lire aussi.
              </h2>

              <ul
                className="grid list-none grid-cols-1 p-0 md:grid-cols-3"
                style={{
                  gap: 'clamp(2rem, 3.5vw, 3rem)',
                  margin: 0,
                }}
              >
                {related.map((p) => (
                  <li key={p.slug} style={{ listStyle: 'none' }}>
                    <JournalRelatedCard
                      post={p}
                      categoryLabel={CATEGORY_LABEL[p.category]}
                    />
                  </li>
                ))}
              </ul>
            </Container>
          </section>
        )}

        <div style={{ height: 'clamp(3rem, 6vh, 5rem)' }} />
      </main>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd([
            buildBlogPosting(post),
            buildBreadcrumb([
              { name: 'Accueil', href: '/' },
              { name: 'Journal', href: '/journal' },
              { name: post.title, href: `/journal/${post.slug}` },
            ]),
          ]),
        }}
      />

      {/* Article body styling — drop cap, blockquote, links */}
      <style>{`
        .journal-article-first::first-letter {
          float: left;
          margin-right: 0.6rem;
          margin-top: 0.2rem;
          font-family: ${FONT_SERIF};
          font-style: italic;
          font-weight: 500;
          font-size: 5rem;
          line-height: 0.85;
          color: ${BLOOD};
        }
        .journal-article-para,
        .journal-article-first {
          margin: 0;
        }
        .journal-article-para a,
        .journal-article-first a {
          color: ${INK};
          text-decoration: underline;
          text-decoration-color: rgba(10, 10, 10, 0.4);
          text-underline-offset: 3px;
          transition: text-decoration-color 220ms ease;
        }
        .journal-article-para a:hover,
        .journal-article-first a:hover {
          text-decoration-color: ${INK};
        }
      `}</style>
    </PageShell>
  );
}
