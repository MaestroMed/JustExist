import { Container } from '@nacks/ui';
import { PageShell } from '@/components/layouts/PageShell';

/**
 * Loading skeleton — /journal (édito + articles).
 *
 * DA pivot e-commerce galerie : cream background, ink subtle blocks.
 * Pattern : header + featured 16/9 + grid 4/3 articles.
 * .skeleton-shimmer respecte prefers-reduced-motion (globals.css §152).
 */
export default function Loading() {
  return (
    <PageShell>
      <section
        aria-busy="true"
        aria-label="Chargement du journal"
        className="relative w-full"
        style={{
          backgroundColor: 'var(--color-cream, #f5f1e8)',
          color: 'var(--color-ink, #0a0a0a)',
          paddingBlock: 'clamp(5rem, 10vh, 8rem)',
        }}
      >
        <Container size="full">
          {/* Header */}
          <div className="flex flex-col gap-6">
            <div className="skeleton-shimmer h-3 w-32 rounded-full bg-[rgba(10,10,10,0.08)]" />
            <div className="flex flex-col gap-3">
              <div className="skeleton-shimmer h-12 w-[min(80vw,440px)] rounded-sm bg-[rgba(10,10,10,0.08)] md:h-16" />
              <div className="skeleton-shimmer h-4 w-[min(70vw,560px)] rounded-full bg-[rgba(10,10,10,0.06)]" />
            </div>
          </div>

          {/* Article featured 16/9 */}
          <div className="mt-16 flex flex-col gap-4">
            <div className="skeleton-shimmer aspect-[16/9] w-full rounded-sm bg-[rgba(10,10,10,0.06)]" />
            <div className="flex flex-col gap-2">
              <div className="skeleton-shimmer h-3 w-28 rounded-full bg-[rgba(10,10,10,0.08)]" />
              <div className="skeleton-shimmer h-6 w-1/2 rounded-sm bg-[rgba(10,10,10,0.08)]" />
              <div className="skeleton-shimmer h-3 w-2/3 rounded-full bg-[rgba(10,10,10,0.06)]" />
            </div>
          </div>

          {/* Grid 3 cards 4/3 */}
          <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex flex-col gap-4">
                <div className="skeleton-shimmer aspect-[4/3] w-full rounded-sm bg-[rgba(10,10,10,0.06)]" />
                <div className="flex flex-col gap-2">
                  <div className="skeleton-shimmer h-3 w-24 rounded-full bg-[rgba(10,10,10,0.08)]" />
                  <div className="skeleton-shimmer h-5 w-3/4 rounded-sm bg-[rgba(10,10,10,0.08)]" />
                  <div className="skeleton-shimmer h-3 w-1/2 rounded-full bg-[rgba(10,10,10,0.06)]" />
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </PageShell>
  );
}
