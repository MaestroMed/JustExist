'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { ArtPoster } from '@/components/art/ArtPoster';
import type { JournalPost } from '@/lib/content/journal';

type Props = { post: JournalPost };

const CATEGORY_LABEL: Record<JournalPost['category'], string> = {
  'behind-the-scenes': 'Atelier',
  'drop-story': 'Drop',
  interview: 'Interview',
  guide: 'Guide',
  essai: 'Essai',
  news: 'News',
};

/**
 * Carte d'article suivant — plein bandeau, image massive + titre XL,
 * tilt léger sur hover, flèche animée. CTA de continuité de lecture.
 */
export function NextArticleCard({ post }: Props) {
  const ref = useRef<HTMLAnchorElement>(null);
  const mouseX = useMotionValue(0);
  const rotate = useSpring(useTransform(mouseX, [-0.5, 0.5], [-1.5, 1.5]), {
    stiffness: 200,
    damping: 25,
  });

  function onMove(e: React.MouseEvent<HTMLAnchorElement>) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
  }

  return (
    <motion.div style={{ rotate }} className="relative">
      <Link
        ref={ref}
        href={`/journal/${post.slug}`}
        onMouseMove={onMove}
        onMouseLeave={() => mouseX.set(0)}
        className="group relative flex flex-col overflow-hidden rounded-sm border border-[var(--color-cream-100)] bg-[var(--color-ink)] transition-colors hover:border-[var(--color-blood)] md:flex-row md:items-stretch"
        data-cursor="image"
        data-cursor-label="Lire"
      >
        <div className="relative aspect-[16/10] w-full overflow-hidden md:aspect-auto md:w-[46%] md:min-h-[300px]">
          <motion.div
            className="absolute inset-0"
            whileHover={{ scale: 1.04 }}
            transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
          >
            <ArtPoster variant={post.coverVariant} label={post.title} />
          </motion.div>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent to-[var(--color-ink)]/30 md:to-[var(--color-ink)]/70" />
        </div>

        <div className="flex flex-1 flex-col justify-between gap-8 p-8 md:p-12">
          <div>
            <p className="font-[var(--font-mono)] text-[10px] uppercase tracking-[0.35em] text-[var(--color-blood)]">
              Article suivant · {CATEGORY_LABEL[post.category]}
            </p>
            <h3
              className="mt-5 font-[var(--font-display)] font-[500] leading-[1] tracking-[-0.025em] text-[var(--color-cream)] transition-colors group-hover:text-[var(--color-blood)]"
              style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)' }}
            >
              {post.title}
            </h3>
            <p className="mt-4 max-w-xl font-[var(--font-body)] text-base text-[var(--color-cream-600)]">
              {post.excerpt}
            </p>
          </div>

          <div className="flex items-center justify-between gap-4 font-[var(--font-mono)] text-xs uppercase tracking-[0.25em] text-[var(--color-cream-600)]">
            <span>
              {post.publishedAt.toLocaleDateString('fr-FR', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
              })}{' '}
              · {post.readingTime} min
            </span>
            <motion.span
              aria-hidden="true"
              className="flex items-center gap-2 text-[var(--color-cream)]"
              initial={{ x: 0 }}
              whileHover={{ x: 10 }}
            >
              Continuer <span className="text-xl">→</span>
            </motion.span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
