/**
 * Loading state racine — affiché pendant streaming des Server Components.
 * Petit wordmark NACKS pulsé, sans blocage UI.
 */
export default function Loading() {
  return (
    <div className="grain fixed inset-0 z-[var(--z-overlay)] flex items-center justify-center bg-[var(--color-ink)]">
      <div className="flex flex-col items-center gap-5">
        <span
          className="font-[var(--font-display)] font-[600] text-[var(--color-cream)]"
          style={{ fontSize: 'clamp(3rem, 8vw, 5rem)', letterSpacing: '-0.04em' }}
        >
          NACKS
        </span>
        <div className="flex items-center gap-3">
          <span className="h-[3px] w-[48px] origin-left animate-[nacks-draw-line_1.4s_ease-in-out_infinite] bg-[var(--color-blood)]" />
          <span className="font-[var(--font-mono)] text-[10px] uppercase tracking-[0.3em] text-[var(--color-cream-600)]">
            Chargement
          </span>
        </div>
      </div>
    </div>
  );
}
