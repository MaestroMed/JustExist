import type { Metadata } from 'next';
import { Container } from '@nacks/ui';
import { PageShell, PageHeader } from '@/components/layouts/PageShell';
import { nacks } from '@/lib/content/nacks';

export const metadata: Metadata = {
  title: 'Kit presse',
  description: 'Kit presse Nacks Galerie — bio, photos HD, logo, interviews.',
};

export default function PressePage() {
  return (
    <PageShell>
      <Container size="wide" className="py-20 md:py-24">
        <PageHeader
          eyebrow="Kit presse"
          title="Pour la presse."
          subtitle="Tout ce qu'il te faut pour écrire sur Nacks : bio officielle, photos HD, logo, dossiers de presse des dernières expositions."
        />

        <div className="mt-16 grid gap-12 lg:grid-cols-3">
          <aside className="lg:col-span-1">
            <div className="sticky top-28 flex flex-col gap-6">
              <div className="border border-[var(--color-cream-100)] p-6">
                <p className="font-[var(--font-mono)] text-xs uppercase tracking-[0.25em] text-[var(--color-blood)]">
                  Contact presse
                </p>
                <a
                  href="mailto:presse@nacksgalerie.com"
                  className="mt-2 block font-[var(--font-display)] text-lg text-[var(--color-cream)] transition-opacity hover:opacity-70"
                  data-cursor="link"
                >
                  presse@nacksgalerie.com
                </a>
                <p className="mt-3 font-[var(--font-body)] text-xs text-[var(--color-cream-600)]">
                  Réponse sous 24 à 48&nbsp;h.
                </p>
              </div>
              <div className="border border-[var(--color-cream-100)] p-6">
                <p className="font-[var(--font-mono)] text-xs uppercase tracking-[0.25em] text-[var(--color-cream-600)]">
                  Téléphone
                </p>
                <p className="mt-2 font-[var(--font-body)] text-sm text-[var(--color-cream)]">
                  Sur demande, par mail, pour interview programmée.
                </p>
              </div>
            </div>
          </aside>

          <div className="flex flex-col gap-12 lg:col-span-2">
            <section>
              <h2 className="font-[var(--font-display)] text-3xl font-[500] tracking-[-0.02em] text-[var(--color-cream)]">
                Bio courte (50 mots)
              </h2>
              <p className="mt-6 font-[var(--font-body)] text-base leading-[1.7] text-[var(--color-cream-600)]">
                Naguy Claude, alias NACKS, est un peintre français né à Sarcelles. Acrylique, Posca,
                aérosol. Ses personnages iconiques — Mr Poppy, le Gorille de Rome, le Renard de Paris,
                le Lion d'Eiffel — sont suivis par plus de 500 000 abonnés sur TikTok. Représenté à Los
                Angeles par Artspace Warehouse Gallery.
              </p>
            </section>

            <section>
              <h2 className="font-[var(--font-display)] text-3xl font-[500] tracking-[-0.02em] text-[var(--color-cream)]">
                Bio longue (250 mots)
              </h2>
              <div className="mt-6 flex flex-col gap-4 font-[var(--font-body)] text-base leading-[1.7] text-[var(--color-cream-600)]">
                {nacks.bio.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </section>

            <section>
              <h2 className="font-[var(--font-display)] text-3xl font-[500] tracking-[-0.02em] text-[var(--color-cream)]">
                Expositions et dates clés
              </h2>
              <ul className="mt-6 flex flex-col gap-3">
                {nacks.timeline.map((t) => (
                  <li
                    key={t.year}
                    className="flex items-start gap-6 border-t border-[var(--color-cream-100)] py-3 font-[var(--font-body)] text-sm"
                  >
                    <span className="w-16 font-[var(--font-mono)] text-sm font-[500] tabular-nums text-[var(--color-cream)]">
                      {t.year}
                    </span>
                    <div>
                      <p className="font-[var(--font-display)] text-base text-[var(--color-cream)]">{t.label}</p>
                      <p className="mt-1 text-[var(--color-cream-600)]">{t.detail}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="font-[var(--font-display)] text-3xl font-[500] tracking-[-0.02em] text-[var(--color-cream)]">
                Assets téléchargeables
              </h2>
              <p className="mt-3 font-[var(--font-body)] text-sm text-[var(--color-cream-600)]">
                Photos haute définition, logos, signatures vectorielles — disponibles sur demande par
                email. Chaque demande est traitée personnellement pour éviter la diffusion non autorisée.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3">
                {['Bio DOCX', 'Logo SVG', 'Photos HD ZIP', 'Œuvres référence', 'Revue de presse', 'Interview prête'].map((asset) => (
                  <a
                    key={asset}
                    href={`mailto:presse@nacksgalerie.com?subject=${encodeURIComponent(`Asset : ${asset}`)}`}
                    className="flex aspect-square flex-col items-start justify-between border border-[var(--color-cream-100)] p-4 transition-colors hover:border-[var(--color-cream)]"
                    data-cursor="link"
                    data-cursor-label="Demander"
                  >
                    <span className="font-[var(--font-mono)] text-[10px] uppercase tracking-[0.25em] text-[var(--color-cream-600)]">
                      Asset
                    </span>
                    <span className="font-[var(--font-display)] text-base text-[var(--color-cream)]">
                      {asset}
                    </span>
                  </a>
                ))}
              </div>
            </section>

            <section>
              <h2 className="font-[var(--font-display)] text-3xl font-[500] tracking-[-0.02em] text-[var(--color-cream)]">
                Presse récente
              </h2>
              <ul className="mt-6 flex flex-col gap-4">
                {nacks.press.map((p, i) => (
                  <li key={i} className="flex flex-col gap-1 border-b border-[var(--color-cream-100)] py-4">
                    <span className="font-[var(--font-display)] text-base text-[var(--color-cream)]">{p.title}</span>
                    <span className="font-[var(--font-mono)] text-xs uppercase tracking-[0.2em] text-[var(--color-cream-600)]">
                      {p.outlet} · {p.year}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </Container>
    </PageShell>
  );
}
