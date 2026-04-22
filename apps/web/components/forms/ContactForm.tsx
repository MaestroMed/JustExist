'use client';

import { useState, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CountrySelect } from './CountrySelect';

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const payload = Object.fromEntries(form.entries());
    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload),
      });
      setStatus(res.ok ? 'done' : 'error');
    } catch {
      setStatus('error');
    }
  }

  return (
    <AnimatePresence mode="wait">
      {status === 'done' ? (
        <motion.div
          key="done"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center gap-4 rounded-sm border border-[var(--color-cream-100)] p-12 text-center"
        >
          <span className="font-[var(--font-mono)] text-xs uppercase tracking-[0.3em] text-[var(--color-blood)]">
            Message reçu
          </span>
          <h3 className="font-[var(--font-display)] text-3xl font-[500] text-[var(--color-cream)]">
            Merci. Je te lis.
          </h3>
          <p className="max-w-md font-[var(--font-body)] text-sm text-[var(--color-cream-600)]">
            Je réponds personnellement à chaque message. Compte 48 à 72 heures selon la file.
          </p>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          onSubmit={onSubmit}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="grid gap-6 rounded-sm border border-[var(--color-cream-100)] p-8 md:p-10"
        >
          <Field label="Ton nom">
            <input name="name" required type="text" autoComplete="name" />
          </Field>
          <Field label="Ton email">
            <input name="email" required type="email" autoComplete="email" />
          </Field>
          <CountrySelect name="country" label="Pays (optionnel)" defaultCode="FR" />
          <Field label="Sujet">
            <select name="type" defaultValue="general">
              <option value="general">Question générale</option>
              <option value="press">Presse</option>
              <option value="collab">Collaboration / partenariat</option>
              <option value="commission">Commande personnalisée</option>
              <option value="other">Autre</option>
            </select>
          </Field>
          <Field label="En un mot">
            <input name="subject" required type="text" placeholder="ex : demande interview" />
          </Field>
          <Field label="Ton message">
            <textarea name="message" required rows={6} placeholder="Raconte…" />
          </Field>

          <div className="flex flex-col gap-4 border-t border-[var(--color-cream-100)] pt-6 md:flex-row md:items-center md:justify-between">
            <p className="font-[var(--font-body)] text-xs text-[var(--color-cream-400)]">
              Aucune revente. Aucun suivi externe. Les messages sensibles sont supprimés après réponse.
            </p>
            <button
              type="submit"
              disabled={status === 'loading'}
              className="inline-flex items-center gap-3 bg-[var(--color-cream)] px-6 py-3 font-[var(--font-display)] text-sm uppercase tracking-[0.2em] text-[var(--color-ink)] transition-colors hover:bg-[var(--color-blood)] hover:text-[var(--color-cream)] disabled:opacity-60"
              data-cursor="link"
              data-cursor-label="Envoyer"
            >
              {status === 'loading' ? 'Envoi…' : 'Envoyer'}
              <span>→</span>
            </button>
          </div>
          {status === 'error' && (
            <p className="font-[var(--font-mono)] text-xs text-[var(--color-blood)]">
              Erreur d'envoi. Réessaie ou écris directement à contact@nacksgalerie.com.
            </p>
          )}
        </motion.form>
      )}
    </AnimatePresence>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="font-[var(--font-mono)] text-[10px] uppercase tracking-[0.25em] text-[var(--color-cream-600)]">
        {label}
      </span>
      <div className="[&_input]:w-full [&_input]:border-b [&_input]:border-[var(--color-cream-200)] [&_input]:bg-transparent [&_input]:pb-3 [&_input]:pt-2 [&_input]:font-[var(--font-body)] [&_input]:text-base [&_input]:text-[var(--color-cream)] [&_input]:outline-none focus-within:[&_input]:border-[var(--color-blood)] [&_textarea]:w-full [&_textarea]:resize-none [&_textarea]:border-b [&_textarea]:border-[var(--color-cream-200)] [&_textarea]:bg-transparent [&_textarea]:pb-3 [&_textarea]:pt-2 [&_textarea]:font-[var(--font-body)] [&_textarea]:text-base [&_textarea]:text-[var(--color-cream)] [&_textarea]:outline-none focus-within:[&_textarea]:border-[var(--color-blood)] [&_select]:w-full [&_select]:border-b [&_select]:border-[var(--color-cream-200)] [&_select]:bg-transparent [&_select]:pb-3 [&_select]:pt-2 [&_select]:font-[var(--font-body)] [&_select]:text-base [&_select]:text-[var(--color-cream)] [&_select]:outline-none focus-within:[&_select]:border-[var(--color-blood)] [&_option]:bg-[var(--color-ink)] [&_option]:text-[var(--color-cream)]">
        {children}
      </div>
    </label>
  );
}
