import { NacksSignature } from '@/components/hero/NacksSignature';
import { FloatingParticles } from '@/components/hero/FloatingParticles';
import { ScrollHint } from '@/components/hero/ScrollHint';
import { ShaderBackgroundClient as ShaderBackground } from '@/components/hero/ShaderBackground.client';
import { MouseParallaxLayer } from '@/components/polish/MouseParallaxLayer';
import { SignatureMarquee } from '@/components/marquee/SignatureMarquee';

/**
 * SCÈNE 1 — L'Arrivée
 * Fond : WebGL shader noise Posca + mouse reactive (packages/hero/ShaderBackground).
 * Particules aérosol flottantes en parallax.
 * Wordmark typographique qui respire au passage de la souris.
 * Cycling tagline sous le wordmark.
 * Marquee signature ancré en bas de la scène.
 */
export function HeroOpening() {
  return (
    <section
      id="main-content"
      className="relative grain flex min-h-[100svh] w-full flex-col items-center justify-center overflow-hidden bg-[var(--color-ink)]"
      aria-label="Accueil"
    >
      {/* Shader WebGL plein cadre */}
      <ShaderBackground />

      {/* Particules aérosol — par-dessus le shader */}
      <MouseParallaxLayer intensity={22} className="absolute inset-0">
        <FloatingParticles count={14} />
      </MouseParallaxLayer>

      {/* Vignette subtile pour focus central */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.55) 90%)',
        }}
      />

      {/* Contenu central */}
      <MouseParallaxLayer intensity={10} className="relative z-10 flex flex-1 flex-col items-center justify-center px-6">
        <NacksSignature />
      </MouseParallaxLayer>

      {/* Marquee signature ancré en bas */}
      <div className="relative z-10 w-full">
        <SignatureMarquee variant="outline" dense speed={55} />
      </div>

      <ScrollHint />
    </section>
  );
}
