import Link from 'next/link';
import type { JournalPost } from '@/lib/content/journal';
import { ArtPoster } from '@/components/art/ArtPoster';

const CATEGORY_LABEL: Record<JournalPost['category'], string> = {
  'behind-the-scenes': 'Atelier',
  'drop-story': 'Drop',
  interview: 'Interview',
  guide: 'Guide',
  essai: 'Essai',
  news: 'News',
};

export function ArticleCard({ post, size = 'md' }: { post: JournalPost; size?: 'md' | 'lg' }) {
  return (
    <Link
      href={`/journal/${post.slug}`}
      className="group block"
      data-cursor="image"
      data-cursor-label="Lire"
    >
      <div className={`relative overflow-hidden bg-[var(--color-ink)] ${size === 'lg' ? 'aspect-[16/10]' : 'aspect-[4/3]'}`}>
        <div className="absolute inset-0 transition-transform duration-[var(--duration-slow)] ease-[var(--ease-nacks)] group-hover:scale-[1.04]">
          <ArtPoster variant={post.coverVariant} label={post.title} />
        </div>
      </div>
      <div className="mt-5 flex flex-col gap-3">
        <div className="flex items-center gap-3 font-[var(--font-mono)] text-[10px] uppercase tracking-[0.25em] text-[var(--color-cream-600)]">
          <span className="text-[var(--color-blood)]">{CATEGORY_LABEL[post.category]}</span>
          <span>·</span>
          <time>{post.publishedAt.toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' })}</time>
          <span>·</span>
          <span>{post.readingTime} min</span>
        </div>
        <h3
          className={`font-[var(--font-display)] font-[500] leading-[1.1] tracking-[-0.02em] text-[var(--color-cream)] transition-colors group-hover:text-[var(--color-blood)] ${
            size === 'lg' ? 'text-3xl md:text-4xl' : 'text-xl md:text-2xl'
          }`}
        >
          {post.title}
        </h3>
        <p className="font-[var(--font-body)] text-sm text-[var(--color-cream-600)]">
          {post.excerpt}
        </p>
      </div>
    </Link>
  );
}
