export default function AdminHome() {
  return (
    <main className="flex min-h-[100svh] flex-col items-center justify-center gap-6 px-6 text-center">
      <p className="font-[var(--font-mono)] text-xs uppercase tracking-[0.3em] text-[var(--color-cream-600)]">
        Nacks Galerie — admin
      </p>
      <h1
        className="font-[var(--font-display)] font-[500] leading-[0.95] tracking-[-0.03em] text-[var(--color-cream)]"
        style={{ fontSize: 'clamp(3rem, 10vw, 8rem)' }}
      >
        Accès privé
      </h1>
      <p className="max-w-lg font-[var(--font-body)] text-sm text-[var(--color-cream-600)]">
        Ce dashboard accueillera bientôt les modules : œuvres, drops, commandes, commissions,
        clients, journal, newsletter. Authentification Auth.js + rôle{' '}
        <code className="font-[var(--font-mono)] text-[var(--color-blood)]">admin</code> requis.
      </p>
      <p className="font-[var(--font-mono)] text-xs text-[var(--color-cream-400)]">
        [ sprint 1 · placeholder ]
      </p>
    </main>
  );
}
