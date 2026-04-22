'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { COUNTRIES, type Country } from '@/lib/seo/countries';

type Props = {
  name: string;
  defaultCode?: string;
  includeDial?: boolean;
  label?: string;
};

/**
 * Select pays custom — pill avec flag + nom, dropdown cherchable au clic.
 * Émet la valeur ISO dans <input hidden name={name} />.
 * Si includeDial, émet aussi <input hidden name={`${name}Dial`} />.
 */
export function CountrySelect({ name, defaultCode = 'FR', includeDial = false, label }: Props) {
  const [open, setOpen] = useState(false);
  const [code, setCode] = useState(defaultCode);
  const [query, setQuery] = useState('');
  const rootRef = useRef<HTMLDivElement>(null);

  const current = useMemo(
    () => COUNTRIES.find((c) => c.code === code) ?? COUNTRIES[0]!,
    [code],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return COUNTRIES;
    return COUNTRIES.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.code.toLowerCase().includes(q) ||
        c.dial.includes(q),
    );
  }, [query]);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    }
    if (open) document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, [open]);

  function select(c: Country) {
    setCode(c.code);
    setOpen(false);
    setQuery('');
  }

  return (
    <div className="flex flex-col gap-2" ref={rootRef}>
      {label && (
        <span className="font-[var(--font-mono)] text-[10px] uppercase tracking-[0.25em] text-[var(--color-cream-600)]">
          {label}
        </span>
      )}
      <input type="hidden" name={name} value={current.code} />
      {includeDial && <input type="hidden" name={`${name}Dial`} value={current.dial} />}

      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="flex w-full items-center justify-between gap-3 border-b border-[var(--color-cream-200)] bg-transparent pb-3 pt-2 font-[var(--font-body)] text-base text-[var(--color-cream)] transition-colors hover:border-[var(--color-blood)] focus:border-[var(--color-blood)] focus:outline-none"
          aria-haspopup="listbox"
          aria-expanded={open}
          data-cursor="link"
          data-no-ripple=""
        >
          <span className="flex items-center gap-3">
            <span className="text-xl leading-none">{current.flag}</span>
            <span>{current.name}</span>
            {includeDial && current.dial && (
              <span className="font-[var(--font-mono)] text-xs text-[var(--color-cream-600)]">
                {current.dial}
              </span>
            )}
          </span>
          <motion.span
            aria-hidden="true"
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.25, ease: [0.19, 1, 0.22, 1] }}
            className="text-[var(--color-cream-600)]"
          >
            ⌄
          </motion.span>
        </button>

        <AnimatePresence>
          {open && (
            <motion.div
              role="listbox"
              initial={{ y: -6, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -6, opacity: 0 }}
              transition={{ duration: 0.2, ease: [0.19, 1, 0.22, 1] }}
              className="absolute left-0 right-0 top-full z-50 mt-2 max-h-[280px] overflow-hidden rounded-sm border border-[var(--color-cream-200)] bg-[var(--color-ink)] shadow-[0_20px_60px_-20px_rgba(0,0,0,0.8)]"
            >
              <div className="border-b border-[var(--color-cream-100)] p-3">
                <input
                  autoFocus
                  type="text"
                  placeholder="Cherche un pays…"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full bg-transparent font-[var(--font-body)] text-sm text-[var(--color-cream)] outline-none placeholder:text-[var(--color-cream-400)]"
                  data-no-ripple=""
                />
              </div>
              <ul className="max-h-[220px] overflow-y-auto py-1">
                {filtered.length === 0 && (
                  <li className="px-4 py-3 font-[var(--font-mono)] text-xs uppercase tracking-[0.25em] text-[var(--color-cream-400)]">
                    Aucun pays.
                  </li>
                )}
                {filtered.map((c) => (
                  <li key={c.code}>
                    <button
                      type="button"
                      onClick={() => select(c)}
                      className={`flex w-full items-center justify-between gap-3 px-4 py-2.5 text-left text-sm transition-colors hover:bg-[var(--color-cream-100)]/10 ${
                        c.code === code
                          ? 'bg-[var(--color-cream-100)]/10 text-[var(--color-cream)]'
                          : 'text-[var(--color-cream-600)] hover:text-[var(--color-cream)]'
                      }`}
                      data-cursor="link"
                      data-no-ripple=""
                    >
                      <span className="flex items-center gap-3">
                        <span className="text-lg leading-none">{c.flag}</span>
                        <span>{c.name}</span>
                      </span>
                      <span className="font-[var(--font-mono)] text-xs tabular-nums text-[var(--color-cream-400)]">
                        {c.dial}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
