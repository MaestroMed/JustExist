import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Container } from '@nacks/ui';
import { PageShell } from '@/components/layouts/PageShell';
import { ArticleCard } from '@/components/journal/ArticleCard';
import { ArtPoster } from '@/components/art/ArtPoster';
import { NewsletterForm } from '@/components/forms/NewsletterForm';
import { ReadingProgress } from '@/components/polish/ReadingProgress';
import { SplitHeading } from '@/components/polish/SplitHeading';
import { buildBlogPosting, buildBreadcrumb, serializeJsonLd } from '@/lib/seo/jsonld';
import { journalPosts, getPost } from '@/lib/content/journal';

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: 'Article introuvable' };
  return { title: post.title, description: post.excerpt };
}

export async function generateStaticParams() {
  return journalPosts.map((p) => ({ slug: p.slug }));
}

export default async function ArticlePage({ params }: { params: Params }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const related = journalPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <PageShell>
      <ReadingProgress targetSelector="article" />
      {/* Hero cover */}
      <section className="relative">
        <div className="relative mx-auto aspect-[16/9] w-full max-w-[var(--container-max)] overflow-hidden">
          <ArtPoster variant={post.coverVariant} label={post.title} />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)] via-transparent" />
        </div>
      </section>

      <Container size="content" className="pt-12">
        <nav className="mb-6 flex items-center gap-2 font-[var(--font-mono)] text-[10px] uppercase tracking-[0.25em] text-[var(--color-cream-600)]">
          <Link href="/journal" className="hover:text-[var(--color-cream)]" data-cursor="link">Journal</Link>
          <span>/</span>
          <span className="text-[var(--color-cream)]">{post.title.slice(0, 50)}</span>
        </nav>

        <div className="flex items-center gap-3 font-[var(--font-mono)] text-[10px] uppercase tracking-[0.25em] text-[var(--color-cream-600)]">
          <span className="text-[var(--color-blood)]">{post.category}</span>
          <span>·</span>
          <time>{post.publishedAt.toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' })}</time>
          <span>·</span>
          <span>{post.readingTime} min</span>
        </div>

        <SplitHeading
          text={post.title}
          as="h1"
          className="mt-6 block font-[var(--font-display)] font-[500] leading-[0.95] tracking-[-0.03em] text-[var(--color-cream)] text-balance"
          style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}
          mode="words"
          stagger={0.04}
          blur
          once
        />

        <p className="mt-6 font-[var(--font-body)] text-xl italic leading-[1.5] text-[var(--color-cream-600)]">
          {post.subtitle}
        </p>

        <article
          className="mt-16 flex flex-col gap-8 font-[var(--font-body)] leading-[1.7] text-[var(--color-cream)]"
          style={{ fontSize: 'clamp(1.0625rem, 1.4vw, 1.25rem)' }}
        >
          {post.body.map((paragraph, i) => (
            <p key={i} className={i === 0 ? 'first-letter:float-left first-letter:mr-3 first-letter:font-[var(--font-display)] first-letter:text-7xl first-letter:font-[600] first-letter:leading-[0.85] first-letter:text-[var(--color-blood)]' : ''}>
              {paragraph}
            </p>
          ))}
        </article>

        <div className="mt-20 border-y border-[var(--color-cream-100)] py-12 text-center">
          <p className="font-[var(--font-mono)] text-xs uppercase tracking-[0.3em] text-[var(--color-cream-600)]">
            Reçois le prochain
          </p>
          <h3 className="mt-4 font-[var(--font-display)] text-2xl font-[500] text-[var(--color-cream)] md:text-3xl">
            Chaque mardi, une lettre courte.
          </h3>
          <div className="mx-auto mt-8 max-w-md">
            <NewsletterForm variant="compact" />
          </div>
        </div>
      </Container>

      {related.length > 0 && (
        <Container size="full" className="py-20">
          <h3 className="mb-10 font-[var(--font-display)] text-2xl font-[500] text-[var(--color-cream)]">
            À lire aussi
          </h3>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
            {related.map((p) => (
              <ArticleCard key={p.slug} post={p} />
            ))}
          </div>
        </Container>
      )}

      {/* JSON-LD BlogPosting + BreadcrumbList */}
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
    </PageShell>
  );
}
