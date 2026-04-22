import { Container } from '@nacks/ui';
import { PageShell } from '@/components/layouts/PageShell';
import { SkeletonGrid } from '@/components/polish/SkeletonCard';

export default function Loading() {
  return (
    <PageShell>
      <Container size="full" className="py-20 md:py-24">
        <div className="flex flex-col gap-6">
          <div className="skeleton-shimmer h-4 w-32 rounded-full bg-[var(--color-cream-100)]/10" />
          <div
            className="skeleton-shimmer h-24 w-72 rounded-sm bg-[var(--color-cream-100)]/10"
            style={{ maxWidth: 'min(90vw, 640px)' }}
          />
        </div>
        <div className="mt-20">
          <SkeletonGrid count={2} aspect="4/5" cols={2} />
        </div>
        <div className="mt-20">
          <SkeletonGrid count={3} aspect="4/5" cols={3} />
        </div>
      </Container>
    </PageShell>
  );
}
