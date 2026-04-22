import { NacksSignature } from '@/components/hero/NacksSignature';
import { FloatingParticles } from '@/components/hero/FloatingParticles';
import { ScrollHint } from '@/components/hero/ScrollHint';
import { MouseParallaxLayer } from '@/components/polish/MouseParallaxLayer';

/**
 * SCÈNE 1 — L'Arrivée
 * Fond noir + grain, wordmark NACKS révélé lettre-par-lettre,
 * trait signature qui se dessine, petits points aérosol flottants,
 * le tout réagissant subtilement à la position de la souris (parallax).
 */
export function HeroOpening() {
  return (
    <section
      id="main-content"
      className="relative grain flex min-h-[100svh] w-full items-center justify-center overflow-hidden bg-[var(--color-ink)]"
      aria-label="Accueil"
    >
      <MouseParallaxLayer intensity={22} className="absolute inset-0">
        <FloatingParticles count={14} />
      </MouseParallaxLayer>

      {/* Vignette subtile — concentre l'attention au centre */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.5) 100%)',
        }}
      />

      <MouseParallaxLayer intensity={10} className="relative z-10 flex flex-col items-center px-6">
        <NacksSignature />
      </MouseParallaxLayer>

      <ScrollHint />
    </section>
  );
}
