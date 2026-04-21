import type { Metadata } from 'next';
import { Container } from '@nacks/ui';
import { PageShell, PageHeader } from '@/components/layouts/PageShell';
import { ArticleCard } from '@/components/journal/ArticleCard';
import { journalPosts } from '@/lib/content/journal';

export const metadata: Metadata = {
  title: 'Journal',
  description:
    "Le journal de Nacks — behind the scenes, histoires de drops, essais. Écrit entre deux coups de Posca.",
};

export default function JournalPage() {
  const [hero, ...rest] = [...journalPosts].sort(
    (a, b) => b.publishedAt.getTime() - a.publishedAt.getTime(),
  );

  return (
    <PageShell>
      <Container size="full" className="py-20 md:py-24">
        <PageHeader
          eyebrow={`${journalPosts.length} articles`}
          title="Journal"
          subtitle="Ce que je n'arrive pas à peindre, je l'écris. Entre deux drops, un texte par semaine, sans filtre."
        />

        {hero && (
          <section className="mt-16">
            <ArticleCard post={hero} size="lg" />
          </section>
        )}

        {rest.length > 0 && (
          <section className="mt-20 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((p) => (
              <ArticleCard key={p.slug} post={p} />
            ))}
          </section>
        )}
      </Container>
    </PageShell>
  );
}
