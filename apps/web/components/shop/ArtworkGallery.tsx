'use client';

import { ArtPoster } from '@/components/art/ArtPoster';
import { ImageLightbox } from './ImageLightbox';

type Variant =
  | 'poppy-neon'
  | 'poppy-classic'
  | 'gorille-gold'
  | 'fox-paris'
  | 'lion-eiffel'
  | 'poster-abstract-1'
  | 'poster-abstract-2'
  | 'figurine-mr-poppy';

type Props = {
  variant: Variant;
  title: string;
};

/**
 * Wrapper client qui combine l'image principale + les 3 thumbnails + le lightbox.
 * Permet à la page détail de rester Server Component.
 */
export function ArtworkGallery({ variant, title }: Props) {
  const items = [
    {
      id: 'full',
      label: `${title} — vue complète`,
      render: () => <ArtPoster variant={variant} label={title} />,
    },
    {
      id: 'detail',
      label: `${title} — détail`,
      render: () => <ArtPoster variant={variant} label={`${title} — détail`} />,
    },
    {
      id: 'signature',
      label: `${title} — signature`,
      render: () => <ArtPoster variant={variant} label={`${title} — signature`} />,
    },
    {
      id: 'context',
      label: `${title} — accroché`,
      render: () => <ArtPoster variant={variant} label={`${title} — contexte`} />,
    },
  ];

  const thumbs: { i: number; label: string }[] = [
    { i: 1, label: 'Détail' },
    { i: 2, label: 'Signature' },
    { i: 3, label: 'Accroché' },
  ];

  return (
    <ImageLightbox
      items={items}
      trigger={(openAt) => (
        <>
          <button
            type="button"
            onClick={() => openAt(0)}
            className="group relative block aspect-[4/5] w-full overflow-hidden rounded-sm shadow-[0_60px_160px_-60px_rgba(0,0,0,0.9)]"
            data-cursor="image"
            data-cursor-label="Zoomer"
          >
            <ArtPoster variant={variant} label={title} />
            <span className="pointer-events-none absolute right-4 top-4 rounded-full bg-[var(--color-ink)]/80 px-4 py-1.5 font-[var(--font-mono)] text-[10px] uppercase tracking-[0.25em] text-[var(--color-cream)] backdrop-blur-md opacity-0 transition-opacity group-hover:opacity-100">
              Clic pour zoomer
            </span>
          </button>
          <div className="mt-4 grid grid-cols-3 gap-3">
            {thumbs.map((v) => (
              <button
                key={v.i}
                type="button"
                onClick={() => openAt(v.i)}
                className="group relative aspect-square overflow-hidden rounded-sm bg-[var(--color-cream-100)] opacity-70 transition-opacity hover:opacity-100"
                data-cursor="image"
                data-cursor-label={v.label}
              >
                <ArtPoster variant={variant} label={`${title} — ${v.label}`} />
              </button>
            ))}
          </div>
        </>
      )}
    />
  );
}
