/**
 * Skeleton neutre pour grille œuvres / drops / articles pendant chargement.
 * Shimmer subtile (animation CSS sans JS).
 */
type Aspect = '4/5' | 'square' | '16/9' | '4/3';

export function SkeletonCard({ aspect = '4/5' }: { aspect?: Aspect }) {
  const aspectClass =
    aspect === 'square'
      ? 'aspect-square'
      : aspect === '16/9'
        ? 'aspect-[16/9]'
        : aspect === '4/3'
          ? 'aspect-[4/3]'
          : 'aspect-[4/5]';
  return (
    <div className="flex flex-col gap-4">
      <div
        className={`${aspectClass} skeleton-shimmer relative w-full overflow-hidden rounded-sm bg-[var(--color-cream-100)]/5`}
        aria-hidden="true"
      />
      <div className="flex flex-col gap-2">
        <div className="skeleton-shimmer h-4 w-2/3 rounded-full bg-[var(--color-cream-100)]/10" />
        <div className="skeleton-shimmer h-3 w-1/3 rounded-full bg-[var(--color-cream-100)]/10" />
      </div>
    </div>
  );
}

export function SkeletonGrid({
  count = 6,
  aspect = '4/5',
  cols = 3,
}: {
  count?: number;
  aspect?: Aspect;
  cols?: 1 | 2 | 3 | 4;
}) {
  const colClass =
    cols === 1
      ? 'grid-cols-1'
      : cols === 2
        ? 'grid-cols-1 md:grid-cols-2'
        : cols === 4
          ? 'grid-cols-2 md:grid-cols-4'
          : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';
  return (
    <div className={`grid gap-8 ${colClass}`}>
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} aspect={aspect} />
      ))}
    </div>
  );
}
