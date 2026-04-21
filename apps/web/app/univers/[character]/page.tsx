import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Container } from '@nacks/ui';
import { PageShell } from '@/components/layouts/PageShell';
import { CharacterPortrait } from '@/components/art/CharacterPortrait';
import { ArtworkCard } from '@/components/shop/ArtworkCard';
import { characters, getCharacter } from '@/lib/content/characters';
import { getArtworksByCharacter } from '@/lib/content/artworks';
import type { CharacterSlug } from '@/lib/content/characters';

type Params = Promise<{ character: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { character } = await params;
  const data = getCharacter(character as CharacterSlug);
  if (!data) return { title: 'Personnage introuvable' };
  return { title: data.name, description: data.tagline };
}

export async function generateStaticParams() {
  return characters.map((c) => ({ character: c.slug }));
}

export default async function CharacterPage({ params }: { params: Params }) {
  const { character } = await params;
  const data = getCharacter(character as CharacterSlug);
  if (!data) notFound();

  const artworks = getArtworksByCharacter(data.slug);

  return (
    <PageShell>
      {/* Hero avec couleur de personnage */}
      <section
        className="relative overflow-hidden"
        style={{ backgroundColor: data.primaryColor }}
      >
        <Container size="full" className="relative z-10 py-16 md:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="flex flex-col gap-6 text-[var(--color-cream)]">
              <Link
                href="/univers"
                className="inline-flex items-center gap-2 font-[var(--font-mono)] text-xs uppercase tracking-[0.25em] opacity-70 hover:opacity-100"
                data-cursor="link"
              >
                ← Univers
              </Link>
              <p
                className="font-[var(--font-display)] text-sm uppercase tracking-[0.3em]"
                style={{ color: data.accentColor }}
              >
                {data.tagline}
              </p>
              <h1
                className="font-[var(--font-display)] font-[500] leading-[0.9] tracking-[-0.04em]"
                style={{ fontSize: 'clamp(3rem, 9vw, 8rem)' }}
              >
                {data.name}
              </h1>
              <p
                className="max-w-xl font-[var(--font-body)] text-xl italic leading-[1.4]"
                style={{ color: 'var(--color-cream)' }}
              >
                « {data.phrase} »
              </p>
              <div className="mt-4 grid max-w-md grid-cols-3 gap-4 border-t border-current/20 pt-6 font-[var(--font-mono)] text-xs uppercase tracking-[0.2em]">
                <div>
                  <span className="opacity-70">Introduit</span>
                  <p className="mt-1 text-xl font-[500] tabular-nums">{data.introducedAt}</p>
                </div>
                <div>
                  <span className="opacity-70">Drops</span>
                  <p className="mt-1 text-xl font-[500] tabular-nums">{data.drops}</p>
                </div>
                <div>
                  <span className="opacity-70">Œuvres</span>
                  <p className="mt-1 text-xl font-[500] tabular-nums">{data.artworks}</p>
                </div>
              </div>
            </div>
            <div className="relative aspect-square w-full max-w-[min(70vh,600px)] justify-self-center">
              <CharacterPortrait character={data.slug} className="h-full w-full" />
            </div>
          </div>
        </Container>
      </section>

      {/* Signature — accessoires / détails */}
      <section className="bg-[var(--color-ink)] py-16 md:py-24">
        <Container size="wide">
          <p className="font-[var(--font-mono)] text-xs uppercase tracking-[0.3em] text-[var(--color-blood)]">
            Sa signature
          </p>
          <h2
            className="mt-4 font-[var(--font-display)] font-[500] leading-[1] tracking-[-0.025em] text-[var(--color-cream)]"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
          >
            Ce qui le fait lui.
          </h2>
          <ul className="mt-10 grid gap-4 md:grid-cols-2">
            {data.signature.map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-4 border-b border-[var(--color-cream-100)] py-5 font-[var(--font-display)] text-lg text-[var(--color-cream)] md:text-xl"
              >
                <span className="font-[var(--font-mono)] text-xs tabular-nums text-[var(--color-cream-600)]">
                  0{i + 1}
                </span>
                <span className="flex-1">{item}</span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Lore */}
      <section className="bg-[var(--color-ink)] py-16 md:py-24">
        <Container size="content">
          <p className="font-[var(--font-mono)] text-xs uppercase tracking-[0.3em] text-[var(--color-cream-600)]">
            Son histoire, par Nacks
          </p>
          <div className="mt-8 flex flex-col gap-6 font-[var(--font-display)] text-2xl leading-[1.35] text-[var(--color-cream)] md:text-3xl">
            {data.lore.map((paragraph, i) => (
              <p key={i} className={i === 0 ? 'first-letter:float-left first-letter:mr-3 first-letter:text-7xl first-letter:font-[600] first-letter:leading-[0.85] first-letter:text-[var(--color-blood)]' : ''}>
                {paragraph}
              </p>
            ))}
          </div>
          <p className="mt-10 font-[var(--font-mono)] text-sm text-[var(--color-blood)]">— Nacks</p>
        </Container>
      </section>

      {/* Gallery */}
      {artworks.length > 0 && (
        <section className="bg-[var(--color-ink)] py-16 md:py-24">
          <Container size="full">
            <div className="mb-10 flex items-end justify-between">
              <h2
                className="font-[var(--font-display)] font-[500] leading-[1] tracking-[-0.02em] text-[var(--color-cream)]"
                style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)' }}
              >
                La galerie de {data.name}
              </h2>
              <Link
                href={`/oeuvres?character=${data.slug}`}
                className="font-[var(--font-mono)] text-xs uppercase tracking-[0.25em] text-[var(--color-cream-600)] hover:text-[var(--color-cream)]"
                data-cursor="link"
              >
                Voir tout →
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {artworks.map((a) => (
                <ArtworkCard key={a.slug} artwork={a} />
              ))}
            </div>
          </Container>
        </section>
      )}
    </PageShell>
  );
}
