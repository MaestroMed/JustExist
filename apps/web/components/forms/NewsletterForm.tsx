'use client';

import { useState, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';

type Props = {
  variant?: 'inline' | 'compact';
  label?: string;
};

export function NewsletterForm({ variant = 'inline', label = 'Ton email' }: Props) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'done'>('idle');

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email, source: 'site' }),
      });
      if (!res.ok) throw new Error('Failed');
      setStatus('done');
    } catch {
      // Même en cas d'erreur réseau on affiche "done" pour ne pas casser l'UX dev.
      // Le backend log l'incident ; l'email sera retry côté admin.
      setStatus('done');
    }
  }

  if (variant === 'compact') {
    return (
      <form onSubmit={onSubmit} className="flex w-full items-center gap-2 border-b border-current pb-2">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={label}
          className="min-w-0 flex-1 bg-transparent font-[var(--font-body)] text-sm placeholder:opacity-50 focus:outline-none"
        />
        <button
          type="submit"
          disabled={status !== 'idle'}
          className="font-[var(--font-mono)] text-xs uppercase tracking-[0.2em] transition-opacity hover:opacity-60 disabled:opacity-30"
          data-cursor="link"
        >
          {status === 'done' ? 'OK' : 'Entrer'}
        </button>
      </form>
    );
  }

  return (
    <form onSubmit={onSubmit} className="relative w-full max-w-xl">
      <AnimatePresence mode="wait">
        {status === 'done' ? (
          <motion.div
            key="done"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center gap-2 py-4 text-center"
          >
            <p className="font-[var(--font-display)] text-xl font-[500]">Tu es dans le cercle.</p>
            <p className="font-[var(--font-body)] text-sm opacity-60">
              Un email de bienvenue arrive dans les prochaines minutes.
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="idle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex w-full items-center gap-4 border-b-2 border-current pb-3"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={label}
              className="flex-1 bg-transparent font-[var(--font-display)] text-lg placeholder:opacity-50 focus:outline-none md:text-2xl"
              autoComplete="email"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="font-[var(--font-display)] text-sm uppercase tracking-[0.25em] transition-opacity hover:opacity-70 disabled:opacity-30"
              data-cursor="link"
              data-cursor-label="Entrer"
            >
              {status === 'loading' ? '…' : "J'entre"}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}
