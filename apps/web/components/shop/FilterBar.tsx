'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useTransition } from 'react';

const TYPES = [
  { value: 'all', label: 'Tout' },
  { value: 'original', label: 'Originaux' },
  { value: 'giclee', label: 'Giclée' },
  { value: 'serigraphie', label: 'Sérigraphie' },
  { value: 'figurine', label: 'Figurines' },
  { value: 'poster', label: 'Posters' },
] as const;

const SORTS = [
  { value: 'new', label: 'Nouveautés' },
  { value: 'price-asc', label: 'Prix ↑' },
  { value: 'price-desc', label: 'Prix ↓' },
] as const;

export function FilterBar() {
  const router = useRouter();
  const params = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const currentType = params.get('type') ?? 'all';
  const currentSort = params.get('sort') ?? 'new';

  function setParam(key: string, value: string) {
    const next = new URLSearchParams(params.toString());
    if (value === 'all' || (key === 'sort' && value === 'new')) next.delete(key);
    else next.set(key, value);
    startTransition(() => {
      router.push(`/oeuvres${next.toString() ? `?${next.toString()}` : ''}`, { scroll: false });
    });
  }

  return (
    <div className={`sticky top-[72px] z-20 -mx-6 flex flex-col gap-4 border-b border-[var(--color-cream-100)] bg-[var(--color-ink)]/85 px-6 py-4 backdrop-blur-md md:-mx-10 md:flex-row md:items-center md:justify-between md:px-10 ${isPending ? 'opacity-70' : ''}`}>
      <div className="flex flex-wrap items-center gap-2 overflow-x-auto no-scrollbar">
        <span className="hidden font-[var(--font-mono)] text-[10px] uppercase tracking-[0.25em] text-[var(--color-cream-600)] md:inline">
          Filtrer
        </span>
        {TYPES.map((t) => (
          <button
            key={t.value}
            type="button"
            onClick={() => setParam('type', t.value)}
            className={`whitespace-nowrap rounded-full border px-4 py-1.5 font-[var(--font-mono)] text-[10px] uppercase tracking-[0.2em] transition-colors ${
              currentType === t.value
                ? 'border-[var(--color-cream)] bg-[var(--color-cream)] text-[var(--color-ink)]'
                : 'border-[var(--color-cream-200)] text-[var(--color-cream-600)] hover:text-[var(--color-cream)]'
            }`}
            data-cursor="link"
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-3">
        <span className="hidden font-[var(--font-mono)] text-[10px] uppercase tracking-[0.25em] text-[var(--color-cream-600)] md:inline">
          Trier
        </span>
        <select
          value={currentSort}
          onChange={(e) => setParam('sort', e.target.value)}
          className="rounded-full border border-[var(--color-cream-200)] bg-transparent px-4 py-1.5 font-[var(--font-mono)] text-[10px] uppercase tracking-[0.2em] text-[var(--color-cream)] focus:outline-none"
        >
          {SORTS.map((s) => (
            <option key={s.value} value={s.value} className="bg-[var(--color-ink)] text-[var(--color-cream)]">
              {s.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
