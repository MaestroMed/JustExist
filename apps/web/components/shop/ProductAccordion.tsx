'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';

type Tone = 'peach' | 'blue' | 'rose' | 'acid';

type Item = {
  id: string;
  title: string;
  tone: Tone;
  content: React.ReactNode;
};

const TONES: Record<Tone, { bg: string; fg: string; accent: string }> = {
  peach: { bg: 'rgba(255,221,191,0.08)', fg: 'rgba(255,221,191,1)', accent: '#FFDDBF' },
  blue: { bg: 'rgba(6,182,212,0.08)', fg: 'rgba(6,182,212,1)', accent: '#06B6D4' },
  rose: { bg: 'rgba(236,72,153,0.08)', fg: 'rgba(236,72,153,1)', accent: '#EC4899' },
  acid: { bg: 'rgba(74,222,128,0.08)', fg: 'rgba(74,222,128,1)', accent: '#4ADE80' },
};

/**
 * Accordéon coloré type PDP Leo&Steph — 4 blocs FAQ/Shipping/Authenticité/Contact.
 * Chaque bloc a son ton pastel, ouvre et ferme avec animation soft.
 */
export function ProductAccordion({ items }: { items: Item[] }) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);

  return (
    <div className="flex flex-col gap-3">
      {items.map((item) => {
        const open = openId === item.id;
        const tone = TONES[item.tone];
        return (
          <div
            key={item.id}
            className="overflow-hidden rounded-sm"
            style={{ backgroundColor: tone.bg, border: `1px solid ${tone.bg}` }}
          >
            <button
              type="button"
              onClick={() => setOpenId(open ? null : item.id)}
              aria-expanded={open}
              aria-controls={`acc-${item.id}`}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-[var(--color-cream-100)]/5"
              data-cursor="link"
            >
              <span className="flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="inline-block h-2 w-2 rounded-full"
                  style={{ backgroundColor: tone.accent }}
                />
                <span
                  className="font-[var(--font-display)] text-base font-[500] tracking-[-0.005em]"
                  style={{ color: tone.fg }}
                >
                  {item.title}
                </span>
              </span>
              <motion.span
                aria-hidden="true"
                animate={{ rotate: open ? 45 : 0 }}
                transition={{ duration: 0.3, ease: [0.19, 1, 0.22, 1] }}
                className="text-xl"
                style={{ color: tone.fg }}
              >
                +
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  key="body"
                  id={`acc-${item.id}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.19, 1, 0.22, 1] }}
                  className="overflow-hidden"
                >
                  <div
                    className="px-5 pb-5 pt-1 font-[var(--font-body)] text-sm leading-[1.6]"
                    style={{ color: tone.fg }}
                  >
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
