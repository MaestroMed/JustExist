import type { Metadata } from 'next';
import { Container } from '@nacks/ui';
import { PageShell, PageHeader } from '@/components/layouts/PageShell';
import { DropCard } from '@/components/drops/DropCard';
import { drops, getLiveDrop, getUpcomingDrop, getPastDrops } from '@/lib/content/drops';

export const metadata: Metadata = {
  title: 'Drops',
  description:
    'Éditions événementielles, rares, numérotées. Le rituel Nacks — chaque drop est une histoire, une heure, une pièce.',
};

export default function DropsPage() {
  const live = getLiveDrop();
  const upcoming = getUpcomingDrop();
  const past = getPastDrops();

  return (
    <PageShell>
      <Container size="full" className="py-20 md:py-24">
        <PageHeader
          eyebrow={`${drops.length} drops depuis 2022`}
          title="Drops"
          subtitle="Un drop, c'est un rendez-vous. Une œuvre, une édition, une fenêtre de temps. Après, c'est fini."
        />

        {/* Live */}
        {live && (
          <section className="mt-20">
            <SectionLabel label="● En direct" blood />
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <DropCard drop={live} />
            </div>
          </section>
        )}

        {/* Upcoming */}
        {upcoming && (
          <section className="mt-20">
            <SectionLabel label="À venir" />
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <DropCard drop={upcoming} />
            </div>
          </section>
        )}

        {/* Past */}
        {past.length > 0 && (
          <section className="mt-20">
            <SectionLabel label="Archive" />
            <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {past.map((d) => (
                <DropCard key={d.slug} drop={d} />
              ))}
            </div>
          </section>
        )}

        <section className="mt-24 rounded-sm border border-[var(--color-cream-100)] p-10 text-center md:p-16">
          <p className="font-[var(--font-mono)] text-xs uppercase tracking-[0.3em] text-[var(--color-blood)]">
            Accès privilégié
          </p>
          <h2
            className="mx-auto mt-4 max-w-2xl font-[var(--font-display)] font-[500] leading-[1] tracking-[-0.02em] text-balance"
            style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)' }}
          >
            Les drops ouvrent 24 h avant pour la communauté.
          </h2>
          <p className="mx-auto mt-4 max-w-xl font-[var(--font-body)] text-[var(--color-cream-600)]">
            Une fois que tu as acquis une œuvre, tu passes en mode VIP. Les prochains drops t'arrivent un jour avant tout le monde.
          </p>
        </section>
      </Container>
    </PageShell>
  );
}

function SectionLabel({ label, blood = false }: { label: string; blood?: boolean }) {
  return (
    <div className="flex items-center gap-4">
      <span
        className={`font-[var(--font-mono)] text-xs uppercase tracking-[0.3em] ${
          blood ? 'text-[var(--color-blood)]' : 'text-[var(--color-cream-600)]'
        }`}
      >
        {label}
      </span>
      <span className="h-px flex-1 bg-[var(--color-cream-100)]" />
    </div>
  );
}
