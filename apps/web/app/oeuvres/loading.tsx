import { Container } from '@nacks/ui';
import { PageShell } from '@/components/layouts/PageShell';

/**
 * Loading skeleton — /oeuvres (catalogue galerie).
 *
 * DA pivot e-commerce galerie : cream background, ink subtle blocks.
 * Pattern : eyebrow + titre + filtres pills + grid cards 4/5.
 * .skeleton-shimmer respecte prefers-reduced-motion (globals.css §152).
 */
export default function Loading() {
  return (
    <PageShell>
      <section
        aria-busy="true"
        aria-label="Chargement du catalogue"
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
            <div className="skeleton-shimmer h-3 w-40 rounded-full bg-[rgba(10,10,10,0.08)]" />
            <div className="flex flex-col gap-3">
              <div className="skeleton-shimmer h-12 w-[min(80vw,520px)] rounded-sm bg-[rgba(10,10,10,0.08)] md:h-16" />
              <div className="skeleton-shimmer h-4 w-[min(70vw,420px)] rounded-full bg-[rgba(10,10,10,0.06)]" />
            </div>
          </div>

          {/* Filtres pills */}
          <div className="mt-12 flex flex-wrap gap-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="skeleton-shimmer h-9 w-24 rounded-full bg-[rgba(10,10,10,0.06)] ring-1 ring-[rgba(10,10,10,0.1)] ring-inset"
              />
            ))}
          </div>

          {/* Grid cards 4/5 */}
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex flex-col gap-4">
                <div className="skeleton-shimmer aspect-[4/5] w-full rounded-sm bg-[rgba(10,10,10,0.06)]" />
                <div className="flex items-end justify-between gap-3">
                  <div className="flex flex-1 flex-col gap-2">
                    <div className="skeleton-shimmer h-4 w-2/3 rounded-full bg-[rgba(10,10,10,0.08)]" />
                    <div className="skeleton-shimmer h-3 w-1/3 rounded-full bg-[rgba(10,10,10,0.06)]" />
                  </div>
                  <div className="skeleton-shimmer h-4 w-16 rounded-full bg-[rgba(10,10,10,0.08)]" />
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </PageShell>
  );
}
