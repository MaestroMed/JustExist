import { NacksSignature } from '@/components/hero/NacksSignature';
import { FloatingParticles } from '@/components/hero/FloatingParticles';
import { ScrollHint } from '@/components/hero/ScrollHint';

/**
 * SCÈNE 1 — L'Arrivée
 * Fond noir + grain, wordmark NACKS révélé lettre-par-lettre,
 * trait signature qui se dessine, petits points aérosol flottants.
 */
export function HeroOpening() {
  return (
    <section className="relative grain flex min-h-[100svh] w-full items-center justify-center overflow-hidden bg-[var(--color-ink)]">
      <FloatingParticles count={14} />

      {/* Vignette subtile — concentre l'attention au centre */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.5) 100%)',
        }}
      />

      <div className="relative z-10 flex flex-col items-center px-6">
        <NacksSignature />
      </div>

      <ScrollHint />
    </section>
  );
}
