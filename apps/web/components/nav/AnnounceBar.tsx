'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useCountdown } from '@/lib/hooks/useCountdown';

type Props = {
  dropSlug: string;
  title: string;
  closesAt: Date | string | number | null;
  remaining: number;
  editionSize: number;
};

const DISMISSED_KEY = 'nacks:announce-dismissed';

/**
 * Bande d'annonce sticky top — visible si un drop est live.
 * Rouge, clic vers le drop. Dismissable pour la session (pas forever).
 * Countdown live si closesAt défini, sinon compteur restants.
 */
export function AnnounceBar({ dropSlug, title, closesAt, remaining, editionSize }: Props) {
  const [dismissed, setDismissed] = useState(false);
  const countdown = useCountdown(
    closesAt ?? new Date(Date.now() + 48 * 3600 * 1000),
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (sessionStorage.getItem(DISMISSED_KEY) === dropSlug) setDismissed(true);
  }, [dropSlug]);

  function dismiss() {
    setDismissed(true);
    if (typeof window !== 'undefined') sessionStorage.setItem(DISMISSED_KEY, dropSlug);
  }

  return (
    <AnimatePresence>
      {!dismissed && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
          className="relative z-[var(--z-modal)] overflow-hidden bg-[var(--color-blood)] text-[var(--color-cream)]"
          role="status"
        >
          <Link
            href={`/drops/${dropSlug}`}
            className="group flex w-full items-center justify-center gap-3 px-6 py-2.5 font-[var(--font-mono)] text-[10px] uppercase tracking-[0.3em] transition-opacity hover:opacity-90 md:gap-5 md:text-xs"
            data-cursor="link"
            data-cursor-label="Entrer"
          >
            <span className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-cream)] opacity-60" />
                <span className="relative inline-flex h-full w-full rounded-full bg-[var(--color-cream)]" />
              </span>
              En direct
            </span>
            <span className="hidden h-[10px] w-px bg-[var(--color-cream)]/40 md:inline" />
            <span className="font-[500]">{title}</span>
            <span className="hidden h-[10px] w-px bg-[var(--color-cream)]/40 md:inline" />
            <span className="tabular-nums">
              {remaining}/{editionSize} restants
            </span>
            {closesAt && !countdown.isPast && (
              <>
                <span className="hidden h-[10px] w-px bg-[var(--color-cream)]/40 md:inline" />
                <span className="hidden tabular-nums md:inline">
                  {countdown.days > 0 && `${countdown.days}j `}
                  {String(countdown.hours).padStart(2, '0')}:
                  {String(countdown.minutes).padStart(2, '0')}:
                  {String(countdown.seconds).padStart(2, '0')}
                </span>
              </>
            )}
            <span className="ml-1 transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              dismiss();
            }}
            aria-label="Fermer l'annonce"
            className="absolute right-3 top-1/2 -translate-y-1/2 font-[var(--font-mono)] text-xs text-[var(--color-cream)]/80 transition-opacity hover:opacity-100"
            data-cursor="link"
            data-no-ripple=""
          >
            ×
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
