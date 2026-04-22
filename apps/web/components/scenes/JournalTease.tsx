import Link from 'next/link';
import { Container } from '@nacks/ui';
import { ArticleCard } from '@/components/journal/ArticleCard';
import { SplitHeading } from '@/components/polish/SplitHeading';
import { getFeaturedPosts } from '@/lib/content/journal';

/**
 * SCÈNE homepage (entre NacksShow et Cercle) — met en avant
 * les 3 derniers articles du Journal. Transition fond cream
 * pour marquer la respiration entre regarder Nacks et le rejoindre.
 */
export function JournalTease() {
  const posts = getFeaturedPosts(3);
  if (posts.length === 0) return null;

  return (
    <section className="relative bg-[var(--color-cream)] py-[var(--spacing-section)] text-[var(--color-ink)]">
      <Container size="full">
        <div className="mb-14 flex flex-col gap-6 md:mb-20 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-6">
            <p className="font-[var(--font-mono)] text-xs uppercase tracking-[0.3em] text-[var(--color-blood)]">
              Journal · Derniers articles
            </p>
            <SplitHeading
              text="Ce que j'écris entre deux toiles."
              as="h2"
              className="block font-[var(--font-display)] font-[500] leading-[0.95] tracking-[-0.03em] text-[var(--color-ink)] text-balance"
              style={{ fontSize: 'clamp(2rem, 5vw, 3.75rem)' }}
              mode="words"
              stagger={0.035}
              blur
              once
            />
            <p className="max-w-xl font-[var(--font-body)] text-base text-[var(--color-ink)]/60 md:text-lg">
              Behind the scenes, histoires de drops, essais. Quand je ne peins pas, j'écris. Parfois les deux en
              même temps.
            </p>
          </div>
          <Link
            href="/journal"
            className="group inline-flex items-center gap-3 font-[var(--font-mono)] text-xs uppercase tracking-[0.25em] text-[var(--color-ink)]/70 transition-colors hover:text-[var(--color-ink)] md:self-start"
            data-cursor="link"
            data-cursor-label="Tout lire"
          >
            <span>Tout le journal</span>
            <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>

        {/* Grid articles avec inversion palette (cream bg) */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {posts.map((post) => (
            <div key={post.slug} className="[&_*]:!text-[var(--color-ink)] [&_h3]:text-[var(--color-ink)] [&_p]:text-[var(--color-ink)]/60">
              <ArticleCard post={post} />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
