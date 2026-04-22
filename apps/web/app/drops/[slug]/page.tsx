import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Container } from '@nacks/ui';
import { PageShell } from '@/components/layouts/PageShell';
import { DropHero } from '@/components/drops/DropHero';
import { Countdown } from '@/components/drops/Countdown';
import { DropCard } from '@/components/drops/DropCard';
import { SplitHeading } from '@/components/polish/SplitHeading';
import { drops, getDrop, getPastDrops } from '@/lib/content/drops';
import { formatPrice, getArtwork } from '@/lib/content/artworks';
import {
  buildBreadcrumb,
  buildDropEvent,
  serializeJsonLd,
} from '@/lib/seo/jsonld';

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const drop = getDrop(slug);
  if (!drop) return { title: 'Drop introuvable' };
  return { title: drop.title, description: drop.subtitle };
}

export async function generateStaticParams() {
  return drops.map((d) => ({ slug: d.slug }));
}

export default async function DropDetailPage({ params }: { params: Params }) {
  const { slug } = await params;
  const drop = getDrop(slug);
  if (!drop) notFound();

  const isLive = drop.status === 'live';
  const isUpcoming = drop.status === 'upcoming';
  const isPast = drop.status === 'past' || drop.status === 'sold_out';
  const remaining = drop.editionSize - drop.sold;
  const others = getPastDrops().filter((d) => d.slug !== drop.slug).slice(0, 3);

  return (
    <PageShell>
      {/* Hero plein cadre — scroll-parallax */}
      <DropHero title={drop.title} variant={drop.posterVariant} />

      <Container size="full" className="relative -mt-[30vh] pt-16">
        {/* Title + status */}
        <div className="relative flex flex-col gap-6 pb-12 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-[var(--font-mono)] text-xs uppercase tracking-[0.3em] text-[var(--color-blood)]">
              {isLive && '● En direct'}
              {isUpcoming && 'À venir'}
              {isPast && 'Archive'}
            </p>
            <SplitHeading
              text={drop.title}
              as="h1"
              className="mt-4 block font-[var(--font-display)] font-[500] leading-[0.92] tracking-[-0.03em] text-[var(--color-cream)]"
              style={{ fontSize: 'clamp(2.5rem, 7vw, 6rem)' }}
              mode="chars"
              stagger={0.02}
              blur
              once
            />
            <p className="mt-4 max-w-2xl font-[var(--font-body)] text-lg text-[var(--color-cream-600)]">
              {drop.subtitle}
            </p>
          </div>
        </div>

        {/* Countdown + achat */}
        {!isPast && (
          <section className="flex flex-col items-center gap-10 border-y border-[var(--color-cream-100)] py-16 text-center">
            <Countdown
              target={isLive ? drop.closesAt ?? new Date(Date.now() + 48 * 3600 * 1000) : drop.opensAt}
              label={isLive ? 'Fin du drop' : 'Ouverture dans'}
            />

            {isLive && (
              <div className="flex w-full max-w-md flex-col gap-3">
                <div className="flex items-baseline justify-between font-[var(--font-mono)] text-xs uppercase tracking-[0.2em] text-[var(--color-cream-600)]">
                  <span>{drop.sold} / {drop.editionSize} vendus</span>
                  <span>{remaining} restants</span>
                </div>
                <div className="h-[2px] overflow-hidden bg-[var(--color-cream-100)]">
                  <div
                    className="h-full bg-[var(--color-blood)]"
                    style={{ width: `${(drop.sold / drop.editionSize) * 100}%` }}
                  />
                </div>
              </div>
            )}

            <div className="flex flex-col items-center gap-2">
              <span className="font-[var(--font-mono)] text-xs uppercase tracking-[0.25em] text-[var(--color-cream-600)]">
                Prix
              </span>
              <span className="font-[var(--font-mono)] text-5xl font-[500] tabular-nums text-[var(--color-cream)] md:text-7xl">
                {formatPrice(drop.priceCents)}
              </span>
            </div>

            <button
              type="button"
              disabled
              className="group inline-flex min-w-[280px] items-center justify-between bg-[var(--color-blood)] px-8 py-5 font-[var(--font-display)] text-sm font-[500] uppercase tracking-[0.2em] text-[var(--color-cream)] transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-80"
              data-cursor="buy"
              data-cursor-label={isLive ? 'Acheter' : 'Rappel'}
              title="Sprint 4 : Stripe + Cloudflare Turnstile"
            >
              <span>{isLive ? 'Acheter maintenant' : "Me prévenir à l'ouverture"}</span>
              <span>→</span>
            </button>

            <p className="max-w-md font-[var(--font-body)] text-xs text-[var(--color-cream-400)]">
              1 exemplaire par personne. Paiement Stripe sécurisé. Anti-bot activé (Cloudflare Turnstile). Signé au Posca, livré sous 7 jours.
            </p>
          </section>
        )}

        {isPast && (
          <section className="border-y border-[var(--color-cream-100)] py-16 text-center">
            <p className="font-[var(--font-mono)] text-xs uppercase tracking-[0.3em] text-[var(--color-cream-600)]">
              Drop clôturé le {drop.closesAt?.toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' })}
            </p>
            <p className="mt-6 font-[var(--font-display)] text-2xl text-[var(--color-cream)]">
              Tous les {drop.editionSize} exemplaires ont été acquis.
            </p>
            <p className="mt-2 font-[var(--font-body)] text-sm text-[var(--color-cream-600)]">
              Rejoins le cercle pour ne rater aucun drop à venir.
            </p>
          </section>
        )}

        {/* Lore */}
        <section className="mx-auto max-w-3xl py-20">
          <p className="font-[var(--font-mono)] text-xs uppercase tracking-[0.3em] text-[var(--color-cream-600)]">
            L'histoire
          </p>
          <SplitHeading
            text={drop.lore}
            as="p"
            className="mt-6 block font-[var(--font-display)] font-[400] leading-[1.25] tracking-[-0.01em] text-balance text-[var(--color-cream)]"
            style={{ fontSize: 'clamp(1.25rem, 2.4vw, 1.875rem)' }}
            mode="words"
            stagger={0.025}
            blur={false}
            once
          />
          <p className="mt-8 font-[var(--font-mono)] text-sm text-[var(--color-blood)]">— Nacks</p>
        </section>

        {/* Specs */}
        <section className="grid gap-10 border-y border-[var(--color-cream-100)] py-16 md:grid-cols-2">
          <div>
            <h3 className="font-[var(--font-mono)] text-xs uppercase tracking-[0.3em] text-[var(--color-cream-600)]">
              Spécifications techniques
            </h3>
          </div>
          <dl className="grid grid-cols-[auto_1fr] gap-x-8 gap-y-4 font-[var(--font-body)]">
            {drop.spec.map((s) => (
              <div key={s.label} className="contents">
                <dt className="font-[var(--font-mono)] text-xs uppercase tracking-[0.2em] text-[var(--color-cream-600)]">{s.label}</dt>
                <dd className="text-[var(--color-cream)]">{s.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        {others.length > 0 && (
          <section className="py-20">
            <div className="mb-8 flex items-end justify-between">
              <h3 className="font-[var(--font-display)] text-2xl font-[500] tracking-[-0.02em] text-[var(--color-cream)]">
                Drops passés
              </h3>
              <Link
                href="/drops"
                className="font-[var(--font-mono)] text-xs uppercase tracking-[0.25em] text-[var(--color-cream-600)] hover:text-[var(--color-cream)]"
                data-cursor="link"
              >
                Tous les drops →
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {others.map((d) => (
                <DropCard key={d.slug} drop={d} />
              ))}
            </div>
          </section>
        )}
      </Container>

      {/* JSON-LD Event + BreadcrumbList */}
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd([
            buildDropEvent(drop, getArtwork(drop.artworkSlug)),
            buildBreadcrumb([
              { name: 'Accueil', href: '/' },
              { name: 'Drops', href: '/drops' },
              { name: drop.title, href: `/drops/${drop.slug}` },
            ]),
          ]),
        }}
      />
    </PageShell>
  );
}
