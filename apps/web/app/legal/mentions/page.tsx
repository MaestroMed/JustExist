import type { Metadata } from 'next';
import { LegalLayout, LegalSection } from '@/components/layouts/LegalLayout';

export const metadata: Metadata = {
  title: 'Mentions légales',
  description: 'Mentions légales de Nacks Galerie.',
  robots: { index: true, follow: true },
};

export default function MentionsPage() {
  return (
    <LegalLayout
      eyebrow="Informations obligatoires"
      title="Mentions légales"
      lastUpdated="22 avril 2026"
      neighbors={[
        { href: '/legal/cgv', label: 'CGV' },
        { href: '/legal/confidentialite', label: 'Confidentialité' },
      ]}
    >
      <LegalSection title="Éditeur du site">
        <p>
          <strong>Nacks Galerie</strong> — nom d'exploitation de Naguy Claude.<br />
          SIRET : <em>à renseigner après immatriculation SASU</em>.<br />
          Adresse postale : <em>communiquée sur demande</em>.<br />
          Email : <a href="mailto:contact@nacksgalerie.com" className="underline">contact@nacksgalerie.com</a>.<br />
          Directeur de la publication : Naguy Claude.
        </p>
      </LegalSection>

      <LegalSection title="Hébergement">
        <p>
          <strong>Vercel Inc.</strong> — 440 N Barranca Ave #4133, Covina CA 91723, USA.<br />
          <strong>Neon Inc.</strong> (base de données) — 1111B S Governors Ave, Dover DE 19904, USA,
          serveurs EU (Francfort).<br />
          <strong>Cloudflare Inc.</strong> (CDN + R2 storage) — 101 Townsend St, San Francisco CA 94107, USA.
        </p>
      </LegalSection>

      <LegalSection title="Propriété intellectuelle">
        <p>
          L'ensemble du site (code, design, textes, œuvres reproduites, personnages, typographies personnalisées,
          vidéos, sons) est la propriété exclusive de Naguy Claude. Toute reproduction, même partielle,
          est interdite sauf autorisation écrite préalable.
        </p>
        <p>
          Les marques tierces citées (Posca, LV, Kaws, Fortnite, Moleskine…) appartiennent à leurs
          détenteurs respectifs et sont mentionnées à titre descriptif ou artistique.
        </p>
      </LegalSection>

      <LegalSection title="Crédits">
        <p>
          Architecture & développement : Mehdi (Kairos) — Claude Code.<br />
          Direction artistique : Naguy « Nacks » Claude.<br />
          Typographies : Space Grotesk (Pangram), Inter (Rasmus Andersson), JetBrains Mono.<br />
          Animation : GSAP, Lenis, Motion, Three.js.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
