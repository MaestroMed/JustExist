type Props = {
  label: string;
  value: string;
  delta?: { value: string; direction: 'up' | 'down' | 'flat' };
  hint?: string;
};

/**
 * Carte KPI admin — valeur large + delta coloré + hint contextuel.
 */
export function KPICard({ label, value, delta, hint }: Props) {
  const deltaColor =
    delta?.direction === 'up'
      ? 'text-[var(--color-acid)]'
      : delta?.direction === 'down'
        ? 'text-[var(--color-blood)]'
        : 'text-[var(--color-cream-600)]';

  return (
    <div className="flex flex-col gap-3 rounded-sm border border-[var(--color-cream-100)] bg-[var(--color-ink)] p-6">
      <span className="font-[var(--font-mono)] text-[10px] uppercase tracking-[0.3em] text-[var(--color-cream-600)]">
        {label}
      </span>
      <div className="flex items-baseline justify-between gap-4">
        <span className="font-[var(--font-display)] text-4xl font-[500] tabular-nums tracking-[-0.02em] text-[var(--color-cream)]">
          {value}
        </span>
        {delta && (
          <span className={`font-[var(--font-mono)] text-xs tabular-nums ${deltaColor}`}>
            {delta.direction === 'up' ? '↑' : delta.direction === 'down' ? '↓' : '→'} {delta.value}
          </span>
        )}
      </div>
      {hint && (
        <span className="font-[var(--font-body)] text-xs text-[var(--color-cream-600)]">{hint}</span>
      )}
    </div>
  );
}
