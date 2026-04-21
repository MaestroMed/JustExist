'use client';

import { useState, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function CommissionForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'done'>('idle');

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');
    setTimeout(() => setStatus('done'), 900);
  }

  return (
    <AnimatePresence mode="wait">
      {status === 'done' ? (
        <motion.div
          key="done"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center gap-4 rounded-sm border border-[var(--color-cream-100)] p-16 text-center"
        >
          <span className="font-[var(--font-mono)] text-xs uppercase tracking-[0.3em] text-[var(--color-blood)]">
            Candidature reçue
          </span>
          <h3 className="font-[var(--font-display)] text-3xl font-[500] text-[var(--color-cream)]">
            Merci. Je te lis.
          </h3>
          <p className="max-w-md font-[var(--font-body)] text-sm text-[var(--color-cream-600)]">
            Si ton projet me parle, je te réponds sous 72 heures. Sinon, je t'envoie un message honnête.
          </p>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          onSubmit={onSubmit}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="grid gap-8 rounded-sm border border-[var(--color-cream-100)] p-8 md:p-12"
        >
          <div className="grid gap-6 md:grid-cols-2">
            <Field label="Prénom">
              <input required type="text" autoComplete="given-name" />
            </Field>
            <Field label="Nom">
              <input required type="text" autoComplete="family-name" />
            </Field>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Field label="Email">
              <input required type="email" autoComplete="email" />
            </Field>
            <Field label="Téléphone (optionnel)">
              <input type="tel" autoComplete="tel" />
            </Field>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Field label="Occasion">
              <select required defaultValue="">
                <option value="" disabled>Choisis</option>
                <option>Cadeau</option>
                <option>Décoration personnelle</option>
                <option>Anniversaire</option>
                <option>Événement</option>
                <option>Entreprise</option>
                <option>Autre</option>
              </select>
            </Field>
            <Field label="Budget">
              <select required defaultValue="">
                <option value="" disabled>Choisis une fourchette</option>
                <option>1 500 – 2 500 €</option>
                <option>2 500 – 4 000 €</option>
                <option>4 000 – 6 000 €</option>
                <option>6 000 € et plus</option>
              </select>
            </Field>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Field label="Dimensions souhaitées">
              <input type="text" placeholder="ex : 80 × 100 cm" />
            </Field>
            <Field label="Délai souhaité">
              <input type="text" placeholder="ex : 6 à 8 semaines" />
            </Field>
          </div>

          <Field label="Brief — raconte-moi ce que tu veux voir">
            <textarea required rows={6} placeholder="Le personnage, l'émotion, les couleurs, ce que l'œuvre doit dire…" />
          </Field>

          <Field label="Comment as-tu entendu parler de moi ?">
            <select defaultValue="">
              <option value="" disabled>Choisis</option>
              <option>TikTok</option>
              <option>Instagram</option>
              <option>Bouche-à-oreille</option>
              <option>Presse</option>
              <option>Une œuvre aperçue ailleurs</option>
              <option>Autre</option>
            </select>
          </Field>

          <div className="flex flex-col gap-4 border-t border-[var(--color-cream-100)] pt-8 md:flex-row md:items-center md:justify-between">
            <p className="font-[var(--font-body)] text-xs text-[var(--color-cream-400)]">
              Tes infos ne servent qu'à te répondre. Aucun partage, aucune revente. RGPD-compatible.
            </p>
            <button
              type="submit"
              disabled={status === 'loading'}
              className="inline-flex items-center gap-3 bg-[var(--color-cream)] px-8 py-4 font-[var(--font-display)] text-sm uppercase tracking-[0.2em] text-[var(--color-ink)] transition-colors hover:bg-[var(--color-blood)] hover:text-[var(--color-cream)] disabled:opacity-60"
              data-cursor="link"
              data-cursor-label="Envoyer"
            >
              {status === 'loading' ? 'Envoi…' : 'Envoyer ma candidature'}
              <span>→</span>
            </button>
          </div>
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
      <div className="[&_input]:w-full [&_input]:border-b [&_input]:border-[var(--color-cream-200)] [&_input]:bg-transparent [&_input]:pb-3 [&_input]:pt-2 [&_input]:font-[var(--font-body)] [&_input]:text-base [&_input]:text-[var(--color-cream)] [&_input]:outline-none [&_input]:transition-colors focus-within:[&_input]:border-[var(--color-blood)] [&_textarea]:w-full [&_textarea]:resize-none [&_textarea]:border-b [&_textarea]:border-[var(--color-cream-200)] [&_textarea]:bg-transparent [&_textarea]:pb-3 [&_textarea]:pt-2 [&_textarea]:font-[var(--font-body)] [&_textarea]:text-base [&_textarea]:text-[var(--color-cream)] [&_textarea]:outline-none focus-within:[&_textarea]:border-[var(--color-blood)] [&_select]:w-full [&_select]:border-b [&_select]:border-[var(--color-cream-200)] [&_select]:bg-transparent [&_select]:pb-3 [&_select]:pt-2 [&_select]:font-[var(--font-body)] [&_select]:text-base [&_select]:text-[var(--color-cream)] [&_select]:outline-none focus-within:[&_select]:border-[var(--color-blood)] [&_option]:bg-[var(--color-ink)] [&_option]:text-[var(--color-cream)]">
        {children}
      </div>
    </label>
  );
}
