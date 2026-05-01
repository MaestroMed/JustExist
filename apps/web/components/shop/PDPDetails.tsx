'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const INK = 'var(--color-ink, #0a0a0a)';
const FONT_SERIF = "var(--font-serif, 'Playfair Display', Georgia, serif)";
const FONT_BODY = "var(--font-body, Inter, system-ui, sans-serif)";

type Row = { label: string; value: string };

type Props = {
  rows: Row[];
};

/**
 * Détails techniques expandable.
 * Header cliquable, body fade+height au déploiement, dl proprement structuré.
 */
export function PDPDetails({ rows }: Props) {
  const [open, setOpen] = useState(true);

  return (
    <div
      className="pdp-details"
      style={{
        borderTop: '1px solid rgba(10,10,10,0.12)',
        borderBottom: '1px solid rgba(10,10,10,0.12)',
        paddingBlock: 'clamp(1rem, 1.5vh, 1.25rem)',
      }}
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center justify-between"
        data-cursor="link"
        data-no-ripple=""
        style={{
          fontFamily: FONT_BODY,
          fontSize: '0.72rem',
          letterSpacing: '0.24em',
          textTransform: 'uppercase',
          color: INK,
          background: 'transparent',
          border: 'none',
          padding: 0,
          cursor: 'pointer',
        }}
      >
        <span>Détails techniques</span>
        <motion.span
          aria-hidden
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          style={{
            display: 'inline-block',
            fontSize: '1.1rem',
            lineHeight: 1,
          }}
        >
          +
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <dl
              className="grid"
              style={{
                gridTemplateColumns: 'auto 1fr',
                columnGap: 'clamp(1.5rem, 3vw, 2.5rem)',
                rowGap: 'clamp(0.6rem, 1vh, 0.85rem)',
                marginTop: 'clamp(1rem, 1.6vh, 1.25rem)',
              }}
            >
              {rows.map((r) => (
                <div key={r.label} style={{ display: 'contents' }}>
                  <dt
                    style={{
                      fontFamily: FONT_BODY,
                      fontSize: '0.72rem',
                      letterSpacing: '0.18em',
                      textTransform: 'uppercase',
                      color: 'rgba(10,10,10,0.55)',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {r.label}
                  </dt>
                  <dd
                    style={{
                      fontFamily: FONT_SERIF,
                      fontStyle: 'italic',
                      fontWeight: 400,
                      fontSize: '0.95rem',
                      lineHeight: 1.5,
                      color: INK,
                      margin: 0,
                    }}
                  >
                    {r.value}
                  </dd>
                </div>
              ))}
            </dl>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
