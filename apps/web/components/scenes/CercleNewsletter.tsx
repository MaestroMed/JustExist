import { Container } from '@nacks/ui';
import { NewsletterForm } from '@/components/forms/NewsletterForm';

/**
 * SCÈNE 7 — Le Cercle.
 * Fond noir, grande promesse, form inline newsletter.
 */
export function CercleNewsletter() {
  return (
    <section className="relative overflow-hidden bg-[var(--color-ink)] py-[var(--spacing-section)] text-[var(--color-cream)]">
      {/* Halo doux */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 50% 50%, rgba(230,57,70,0.08), transparent 60%)',
        }}
      />
      <Container size="wide">
        <div className="flex flex-col items-center gap-12 text-center">
          <p className="font-[var(--font-mono)] text-xs uppercase tracking-[0.3em] text-[var(--color-cream-600)]">
            Le cercle
          </p>
          <h2
            className="max-w-4xl font-[var(--font-display)] font-[500] leading-[0.95] tracking-[-0.03em] text-balance"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
          >
            Rejoins le cercle.
          </h2>
          <p className="max-w-2xl font-[var(--font-body)] text-base text-[var(--color-cream-600)] md:text-lg">
            Chaque mardi, une lettre courte. Les drops en avant-première. Les coulisses. Les histoires derrière les œuvres.
            <br />
            <span className="mt-2 inline-block text-sm opacity-70">Jamais de spam. Jamais de promotion agressive.</span>
          </p>
          <div className="w-full">
            <div className="mx-auto">
              <NewsletterForm variant="inline" label="ton@email.com" />
            </div>
          </div>
          <p className="font-[var(--font-mono)] text-xs text-[var(--color-cream-400)]">
            Un email par semaine. Désinscription en un clic. Tes données restent à Sarcelles.
          </p>
        </div>
      </Container>
    </section>
  );
}
