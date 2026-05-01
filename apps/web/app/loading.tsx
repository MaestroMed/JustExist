/**
 * Root loading — skeleton premium home page.
 *
 * DA pivot e-commerce galerie premium :
 *   cream background, ink subtle blocks (ink/8%), Inter/Playfair vibes.
 *   Pattern : Hero skeleton (full-bleed) + Manifesto skeleton (split 40/60) + grid skeleton.
 *   prefers-reduced-motion : pulse désactivé via la classe .skeleton-shimmer
 *   (déjà guardée dans globals.css §152).
 */
export default function Loading() {
  return (
    <div
      aria-busy="true"
      aria-label="Chargement de la galerie"
      className="relative min-h-[100svh] w-full"
      style={{
        backgroundColor: 'var(--color-cream, #f5f1e8)',
        color: 'var(--color-ink, #0a0a0a)',
      }}
    >
      {/* ───────── Hero skeleton (above the fold) ───────── */}
      <section
        aria-hidden="true"
        className="relative w-full overflow-hidden"
        style={{
          minHeight: '100svh',
          paddingBlock: 'clamp(2.5rem, 6vh, 5rem)',
          paddingInline: 'clamp(1.5rem, 4vw, 5rem)',
        }}
      >
        <div className="mx-auto flex h-full w-full max-w-[var(--container-max,1440px)] flex-col justify-end gap-6">
          {/* Eyebrow */}
          <div className="skeleton-shimmer h-3 w-40 rounded-full bg-[rgba(10,10,10,0.08)]" />
          {/* Headline 2 lignes */}
          <div className="flex flex-col gap-3">
            <div className="skeleton-shimmer h-12 w-[min(80vw,560px)] rounded-sm bg-[rgba(10,10,10,0.08)] md:h-16" />
            <div className="skeleton-shimmer h-12 w-[min(60vw,420px)] rounded-sm bg-[rgba(10,10,10,0.08)] md:h-16" />
          </div>
          {/* CTA pills */}
          <div className="mt-4 flex gap-3">
            <div className="skeleton-shimmer h-12 w-44 rounded-full bg-[rgba(10,10,10,0.08)]" />
            <div className="skeleton-shimmer h-12 w-48 rounded-full bg-[rgba(10,10,10,0.06)] ring-1 ring-[rgba(10,10,10,0.12)] ring-inset" />
          </div>
        </div>
      </section>

      {/* ───────── Manifesto skeleton (split 40/60) ───────── */}
      <section
        aria-hidden="true"
        className="relative w-full"
        style={{
          paddingBlock: 'clamp(5rem, 10vh, 10rem)',
          paddingInline: 'clamp(1.5rem, 4vw, 5rem)',
        }}
      >
        <div className="mx-auto grid w-full max-w-[var(--container-max,1440px)] grid-cols-1 gap-[clamp(2.5rem,6vw,6rem)] lg:grid-cols-[2fr_3fr]">
          {/* Col gauche : titre + signature */}
          <div className="flex flex-col gap-6">
            <div className="skeleton-shimmer h-3 w-32 rounded-full bg-[rgba(10,10,10,0.08)]" />
            <div className="flex flex-col gap-3">
              <div className="skeleton-shimmer h-10 w-3/4 rounded-sm bg-[rgba(10,10,10,0.08)]" />
              <div className="skeleton-shimmer h-10 w-2/3 rounded-sm bg-[rgba(10,10,10,0.08)]" />
              <div className="skeleton-shimmer h-10 w-1/2 rounded-sm bg-[rgba(10,10,10,0.08)]" />
            </div>
          </div>
          {/* Col droite : 4 paragraphes */}
          <div className="flex flex-col gap-8">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex flex-col gap-2">
                <div className="skeleton-shimmer h-3 w-full rounded-full bg-[rgba(10,10,10,0.08)]" />
                <div className="skeleton-shimmer h-3 w-[95%] rounded-full bg-[rgba(10,10,10,0.08)]" />
                <div className="skeleton-shimmer h-3 w-[88%] rounded-full bg-[rgba(10,10,10,0.08)]" />
                <div className="skeleton-shimmer h-3 w-2/3 rounded-full bg-[rgba(10,10,10,0.08)]" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── Grid œuvres skeleton (3 cards) ───────── */}
      <section
        aria-hidden="true"
        className="relative w-full"
        style={{
          paddingBlock: 'clamp(5rem, 10vh, 10rem)',
          paddingInline: 'clamp(1.5rem, 4vw, 5rem)',
        }}
      >
        <div className="mx-auto w-full max-w-[var(--container-max,1440px)]">
          {/* Header de section */}
          <div className="mb-12 flex flex-col gap-4">
            <div className="skeleton-shimmer h-3 w-28 rounded-full bg-[rgba(10,10,10,0.08)]" />
            <div className="skeleton-shimmer h-10 w-[min(80vw,440px)] rounded-sm bg-[rgba(10,10,10,0.08)]" />
          </div>
          {/* Grid cards 4/5 */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex flex-col gap-4">
                <div className="skeleton-shimmer aspect-[4/5] w-full rounded-sm bg-[rgba(10,10,10,0.06)]" />
                <div className="skeleton-shimmer h-4 w-2/3 rounded-full bg-[rgba(10,10,10,0.08)]" />
                <div className="skeleton-shimmer h-3 w-1/3 rounded-full bg-[rgba(10,10,10,0.06)]" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
