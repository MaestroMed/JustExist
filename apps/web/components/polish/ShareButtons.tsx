'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

type Props = {
  url: string;
  title: string;
  description?: string;
  className?: string;
};

/**
 * Partage natif : copie du lien + Twitter + LinkedIn + WhatsApp.
 * Layout pill compact, accessible clavier.
 */
export function ShareButtons({ url, title, description, className }: Props) {
  const [copied, setCopied] = useState(false);

  const absoluteUrl = url.startsWith('http')
    ? url
    : `${typeof window !== 'undefined' ? window.location.origin : ''}${url}`;

  async function onCopy() {
    try {
      await navigator.clipboard.writeText(absoluteUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore clipboard failures silently (iframe sandbox, etc.)
    }
  }

  const shareText = encodeURIComponent(description ? `${title} — ${description}` : title);
  const shareUrl = encodeURIComponent(absoluteUrl);

  const targets = [
    {
      id: 'copy',
      label: 'Copier le lien',
      onClick: onCopy,
    },
    {
      id: 'x',
      label: 'X / Twitter',
      href: `https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`,
    },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`,
    },
    {
      id: 'whatsapp',
      label: 'WhatsApp',
      href: `https://wa.me/?text=${shareText}%20${shareUrl}`,
    },
  ];

  return (
    <div className={`flex flex-wrap items-center gap-2 ${className ?? ''}`}>
      <span className="mr-2 font-[var(--font-mono)] text-[10px] uppercase tracking-[0.3em] text-[var(--color-cream-600)]">
        Partager
      </span>
      {targets.map((t) =>
        t.onClick ? (
          <button
            key={t.id}
            type="button"
            onClick={t.onClick}
            className="relative rounded-full border border-[var(--color-cream-200)] px-4 py-1.5 font-[var(--font-mono)] text-[10px] uppercase tracking-[0.25em] text-[var(--color-cream)] transition-colors hover:border-[var(--color-blood)] hover:bg-[var(--color-cream-100)]/10"
            data-cursor="link"
            data-no-ripple=""
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={copied ? 'copied' : 'idle'}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.2 }}
                className="inline-block"
              >
                {copied ? '✓ Copié' : t.label}
              </motion.span>
            </AnimatePresence>
          </button>
        ) : (
          <a
            key={t.id}
            href={t.href}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-[var(--color-cream-200)] px-4 py-1.5 font-[var(--font-mono)] text-[10px] uppercase tracking-[0.25em] text-[var(--color-cream)] transition-colors hover:border-[var(--color-blood)] hover:bg-[var(--color-cream-100)]/10"
            data-cursor="link"
            data-cursor-label="Partager"
          >
            {t.label}
          </a>
        ),
      )}
    </div>
  );
}
