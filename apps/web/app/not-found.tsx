import Link from 'next/link';
import { Container } from '@nacks/ui';

export default function NotFound() {
  return (
    <main className="grain relative flex min-h-[100svh] items-center bg-[var(--color-ink)] text-[var(--color-cream)]">
      <Container
        size="content"
        className="relative z-10 flex flex-col items-center gap-6 text-center"
      >
        <p className="font-[var(--font-mono)] text-xs uppercase tracking-[0.3em] text-[var(--color-cream-600)]">
          Erreur 404
        </p>
        <h1
          className="font-[var(--font-display)] font-[500] leading-[0.95] tracking-[-0.03em]"
          style={{ fontSize: 'clamp(3rem, 10vw, 8rem)' }}
        >
          Cette toile
          <br />
          <span className="text-[var(--color-blood)]">n'existe pas.</span>
        </h1>
        <p className="max-w-md font-[var(--font-body)] text-[var(--color-cream-600)]">
          La page que tu cherches n'a jamais été peinte — ou elle a été décrochée.
          Reviens à la maison, tu trouveras ce qu'il te faut.
        </p>
        <Link
          href="/"
          className="mt-4 inline-flex items-center gap-2 border border-[var(--color-cream)] px-8 py-3 font-[var(--font-display)] text-sm uppercase tracking-[0.2em] transition-colors hover:bg-[var(--color-cream)] hover:text-[var(--color-ink)]"
          data-cursor="link"
        >
          Retourner dans le monde
        </Link>
      </Container>
    </main>
  );
}
