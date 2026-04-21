import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@nacks/ui';
import { PageShell, PageHeader } from '@/components/layouts/PageShell';
import { nacks } from '@/lib/content/nacks';

export const metadata: Metadata = {
  title: 'Atelier',
  description:
    "L'atelier de Nacks à Sarcelles — sa bio, sa technique, son équipe, sa presse, ses partenaires.",
};

export default function AtelierPage() {
  return (
    <PageShell>
      <Container size="full" className="py-20 md:py-24">
        <PageHeader
          eyebrow="L'atelier — Sarcelles"
          title="Qui je suis."
          subtitle="Peintre. Né à Sarcelles. Basé entre le 95 et Paris. Représenté à Los Angeles. Peint des ours, des gorilles, des renards, des lions."
        />

        {/* Bio */}
        <section className="mt-20 grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="font-[var(--font-mono)] text-xs uppercase tracking-[0.3em] text-[var(--color-blood)]">
              Mon histoire
            </p>
            <h2
              className="mt-4 font-[var(--font-display)] font-[500] leading-[1] tracking-[-0.025em] text-[var(--color-cream)]"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
            >
              D'un mur à un site.
            </h2>
          </div>
          <div className="flex flex-col gap-6 font-[var(--font-body)] text-lg leading-[1.7] text-[var(--color-cream)]">
            {nacks.bio.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
            <p className="mt-4 font-[var(--font-mono)] text-sm text-[var(--color-blood)]">— Nacks</p>
          </div>
        </section>

        {/* Timeline */}
        <section className="mt-28 border-t border-[var(--color-cream-100)] pt-16">
          <p className="font-[var(--font-mono)] text-xs uppercase tracking-[0.3em] text-[var(--color-cream-600)]">
            Timeline
          </p>
          <div className="mt-8 grid gap-8 md:grid-cols-5">
            {nacks.timeline.map((item) => (
              <div key={item.year} className="flex flex-col gap-3 border-t-2 border-[var(--color-cream)] pt-4">
                <span className="font-[var(--font-mono)] text-4xl font-[500] tabular-nums text-[var(--color-cream)]">
                  {item.year}
                </span>
                <p className="font-[var(--font-display)] text-lg font-[500] text-[var(--color-cream)]">
                  {item.label}
                </p>
                <p className="font-[var(--font-body)] text-sm text-[var(--color-cream-600)]">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Atelier atmosphere + techniques */}
        <section className="mt-28 grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="font-[var(--font-mono)] text-xs uppercase tracking-[0.3em] text-[var(--color-blood)]">
              Dans l'atelier
            </p>
            <h2
              className="mt-4 font-[var(--font-display)] font-[500] leading-[1] tracking-[-0.025em] text-[var(--color-cream)]"
              style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)' }}
            >
              {nacks.atelier.city}, {nacks.atelier.department}
            </h2>
            <ul className="mt-8 flex flex-col gap-3 font-[var(--font-body)] text-[var(--color-cream-600)]">
              {nacks.atelier.mood.map((line, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-2 h-1 w-4 flex-shrink-0 bg-[var(--color-blood)]" />
                  {line}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-[var(--font-mono)] text-xs uppercase tracking-[0.3em] text-[var(--color-blood)]">
              Techniques
            </p>
            <h2
              className="mt-4 font-[var(--font-display)] font-[500] leading-[1] tracking-[-0.025em] text-[var(--color-cream)]"
              style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)' }}
            >
              Acrylique, Posca, aérosol.
            </h2>
            <dl className="mt-8 grid gap-6">
              {nacks.atelier.techniques.map((t) => (
                <div key={t.name} className="border-t border-[var(--color-cream-100)] pt-4">
                  <dt className="font-[var(--font-display)] text-lg font-[500] text-[var(--color-cream)]">
                    {t.name}
                  </dt>
                  <dd className="mt-1 font-[var(--font-body)] text-sm text-[var(--color-cream-600)]">
                    {t.detail}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* Partners + press */}
        <section className="mt-28 grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="font-[var(--font-mono)] text-xs uppercase tracking-[0.3em] text-[var(--color-blood)]">
              Partenaires
            </p>
            <ul className="mt-8 grid grid-cols-2 gap-4">
              {nacks.partners.map((p) => (
                <li
                  key={p.name}
                  className="flex flex-col gap-1 border border-[var(--color-cream-100)] px-5 py-6 transition-colors hover:border-[var(--color-cream)]"
                >
                  <span className="font-[var(--font-display)] text-lg text-[var(--color-cream)]">
                    {p.name}
                  </span>
                  <span className="font-[var(--font-mono)] text-[10px] uppercase tracking-[0.2em] text-[var(--color-cream-600)]">
                    {p.role}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-[var(--font-mono)] text-xs uppercase tracking-[0.3em] text-[var(--color-blood)]">
              Presse
            </p>
            <ul className="mt-8 flex flex-col gap-4">
              {nacks.press.map((p, i) => (
                <li
                  key={i}
                  className="flex flex-col gap-1 border-b border-[var(--color-cream-100)] py-4"
                >
                  <span className="font-[var(--font-display)] text-base text-[var(--color-cream)]">
                    {p.title}
                  </span>
                  <span className="font-[var(--font-mono)] text-xs uppercase tracking-[0.2em] text-[var(--color-cream-600)]">
                    {p.outlet} · {p.year}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* CTAs */}
        <section className="mt-28 grid gap-6 md:grid-cols-2">
          <Link
            href="/atelier/commission"
            className="group relative flex flex-col justify-between gap-8 border border-[var(--color-cream-100)] p-10 transition-colors hover:border-[var(--color-blood)]"
            data-cursor="link"
          >
            <div>
              <p className="font-[var(--font-mono)] text-xs uppercase tracking-[0.3em] text-[var(--color-blood)]">
                Commande personnalisée
              </p>
              <h3
                className="mt-4 font-[var(--font-display)] font-[500] leading-[1] tracking-[-0.02em] text-[var(--color-cream)]"
                style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)' }}
              >
                Une œuvre faite pour toi.
              </h3>
              <p className="mt-3 font-[var(--font-body)] text-sm text-[var(--color-cream-600)]">
                2 à 3 commandes par mois, sur candidature. Budget à partir de 1 500 €.
              </p>
            </div>
            <span className="font-[var(--font-mono)] text-xs uppercase tracking-[0.25em] text-[var(--color-cream-600)] transition-transform group-hover:translate-x-2">
              Postuler →
            </span>
          </Link>

          <a
            href="mailto:contact@nacksgalerie.com"
            className="group relative flex flex-col justify-between gap-8 border border-[var(--color-cream-100)] p-10 transition-colors hover:border-[var(--color-cream)]"
            data-cursor="link"
          >
            <div>
              <p className="font-[var(--font-mono)] text-xs uppercase tracking-[0.3em] text-[var(--color-cream-600)]">
                Contact direct
              </p>
              <h3
                className="mt-4 font-[var(--font-display)] font-[500] leading-[1] tracking-[-0.02em] text-[var(--color-cream)]"
                style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)' }}
              >
                Parle-moi.
              </h3>
              <p className="mt-3 font-[var(--font-body)] text-sm text-[var(--color-cream-600)]">
                Presse, collab, événement, ou juste un mot. Je lis tout.
              </p>
            </div>
            <span className="font-[var(--font-mono)] text-xs uppercase tracking-[0.25em] text-[var(--color-cream-600)] transition-transform group-hover:translate-x-2">
              contact@nacksgalerie.com →
            </span>
          </a>
        </section>
      </Container>
    </PageShell>
  );
}
