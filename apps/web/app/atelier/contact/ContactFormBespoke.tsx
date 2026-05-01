'use client';

import { useState, type FormEvent } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';

const INK = 'var(--color-ink, #0a0a0a)';
const CREAM = 'var(--color-cream, #f5f1e8)';
const PAPER = 'var(--color-paint-white, #fafafa)';

const FONT_SERIF = "var(--font-serif, 'Playfair Display', Georgia, serif)";
const FONT_BODY = "var(--font-body, Inter, system-ui, sans-serif)";

type Status = 'idle' | 'loading' | 'done' | 'error';

const SUBJECT_OPTIONS: ReadonlyArray<{ value: string; label: string }> = [
  { value: 'achat', label: 'Achat d\'œuvre' },
  { value: 'press', label: 'Presse' },
  { value: 'collab', label: 'Collaboration' },
  { value: 'commission', label: 'Custom / Commande' },
  { value: 'autre', label: 'Autre' },
];

export function ContactFormBespoke() {
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const reduceMotion = useReducedMotion();

  function validate(form: FormData) {
    const e: Record<string, string> = {};
    const name = String(form.get('name') ?? '').trim();
    const email = String(form.get('email') ?? '').trim();
    const message = String(form.get('message') ?? '').trim();

    if (name.length < 2) e.name = 'Indiquez votre nom.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      e.email = 'Email non valide.';
    if (message.length < 30) e.message = 'Message trop court (30 car. min).';

    return e;
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setStatus('loading');
    try {
      const payload = Object.fromEntries(form.entries());
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

  const transition = reduceMotion ? { duration: 0 } : { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const };

  return (
    <AnimatePresence mode="wait" initial={false}>
      {status === 'done' ? (
        <motion.div
          key="done"
          initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={transition}
          className="flex flex-col items-start gap-5"
          style={{
            backgroundColor: PAPER,
            padding: 'clamp(2.5rem, 5vw, 4rem)',
            borderRadius: '4px',
            boxShadow:
              '0 1px 1px rgba(0,0,0,0.06), 0 18px 40px -22px rgba(10,10,10,0.18)',
          }}
        >
          <span
            className="uppercase"
            style={{
              fontFamily: FONT_BODY,
              fontSize: 'clamp(0.7rem, 0.78vw, 0.82rem)',
              letterSpacing: '0.28em',
              color: 'rgba(10,10,10,0.55)',
            }}
          >
            Message reçu
          </span>
          <h3
            style={{
              fontFamily: FONT_SERIF,
              fontStyle: 'italic',
              fontWeight: 400,
              fontSize: 'clamp(2rem, 4vw, 3.25rem)',
              lineHeight: 1,
              letterSpacing: '-0.025em',
              color: INK,
              margin: 0,
            }}
          >
            Merci. Je vous lis.
          </h3>
          <p
            style={{
              fontFamily: FONT_BODY,
              fontSize: 'clamp(0.95rem, 1vw, 1.05rem)',
              lineHeight: 1.6,
              color: 'rgba(10,10,10,0.7)',
              maxWidth: '32rem',
              margin: 0,
            }}
          >
            Naguy répond personnellement à chaque message. Comptez 48 à 72&nbsp;heures
            ouvrées selon la file.
          </p>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          onSubmit={onSubmit}
          noValidate
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={transition}
          className="grid gap-[clamp(1.25rem,2.5vh,2rem)]"
          style={{
            backgroundColor: PAPER,
            padding: 'clamp(2rem, 4vw, 3rem)',
            borderRadius: '4px',
            boxShadow:
              '0 1px 1px rgba(0,0,0,0.06), 0 18px 40px -22px rgba(10,10,10,0.18)',
          }}
        >
          <Field label="Nom" error={errors.name}>
            <input
              name="name"
              required
              type="text"
              autoComplete="name"
              placeholder="Marie Dupont"
            />
          </Field>

          <Field label="Email" error={errors.email}>
            <input
              name="email"
              required
              type="email"
              autoComplete="email"
              placeholder="vous@exemple.com"
            />
          </Field>

          <Field label="Sujet">
            <select name="subject_type" defaultValue="achat">
              {SUBJECT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Message" error={errors.message}>
            <textarea
              name="message"
              required
              rows={6}
              minLength={30}
              placeholder="Racontez votre projet, votre demande, votre intuition…"
            />
          </Field>

          <div
            className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
            style={{
              borderTop: '1px solid rgba(10,10,10,0.08)',
              paddingTop: 'clamp(1.25rem, 2.5vh, 1.75rem)',
              marginTop: 'clamp(0.5rem,1vh,0.75rem)',
            }}
          >
            <p
              style={{
                fontFamily: FONT_BODY,
                fontSize: 'clamp(0.7rem, 0.78vw, 0.82rem)',
                lineHeight: 1.5,
                color: 'rgba(10,10,10,0.5)',
                maxWidth: '20rem',
                margin: 0,
              }}
            >
              Aucune revente. Aucun suivi externe.
              <br />
              Données supprimées après réponse.
            </p>

            <button
              type="submit"
              disabled={status === 'loading'}
              data-cursor="link"
              data-cursor-label="Envoyer"
              className="group relative inline-flex items-center justify-center transition-transform hover:scale-[1.02] disabled:opacity-60 disabled:hover:scale-100"
              style={{
                fontFamily: FONT_SERIF,
                fontStyle: 'italic',
                fontSize: 'clamp(1rem, 1.1vw, 1.15rem)',
                color: CREAM,
                backgroundColor: INK,
                padding: 'clamp(0.85rem,1.6vh,1.1rem) clamp(1.5rem,2.4vw,2.2rem)',
                borderRadius: '999px',
                boxShadow:
                  '0 1px 1px rgba(10,10,10,0.18), 0 18px 40px -18px rgba(10,10,10,0.28)',
                border: 'none',
                cursor: status === 'loading' ? 'wait' : 'pointer',
              }}
            >
              <span className="relative z-10">
                {status === 'loading' ? 'Envoi…' : 'Envoyer'}
                {status !== 'loading' && (
                  <>
                    {' '}
                    <span
                      aria-hidden
                      className="inline-block transition-transform duration-300 group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </>
                )}
              </span>
            </button>
          </div>

          {status === 'error' && (
            <p
              role="alert"
              style={{
                fontFamily: FONT_BODY,
                fontSize: 'clamp(0.85rem, 0.92vw, 0.95rem)',
                color: '#a8331f',
                margin: 0,
              }}
            >
              Erreur d&apos;envoi. Réessayez ou écrivez directement à{' '}
              <a
                href="mailto:contact@nacksgalerie.com"
                style={{ textDecoration: 'underline' }}
              >
                contact@nacksgalerie.com
              </a>
              .
            </p>
          )}
        </motion.form>
      )}
    </AnimatePresence>
  );
}

/* ───────── Field — label + input/textarea/select cream/ink premium ───────── */
function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span
        className="uppercase"
        style={{
          fontFamily: FONT_BODY,
          fontSize: 'clamp(0.62rem, 0.7vw, 0.72rem)',
          letterSpacing: '0.22em',
          color: 'rgba(10,10,10,0.5)',
        }}
      >
        {label}
      </span>
      <div
        className="
          [&_input]:w-full [&_input]:bg-transparent [&_input]:py-3
          [&_input]:font-[var(--font-body,Inter,system-ui,sans-serif)]
          [&_input]:text-base [&_input]:text-[var(--color-ink,#0a0a0a)]
          [&_input]:outline-none
          [&_input]:border-0 [&_input]:border-b [&_input]:border-[rgba(10,10,10,0.18)]
          [&_input]:transition-colors
          focus-within:[&_input]:border-[var(--color-ink,#0a0a0a)]
          [&_input::placeholder]:text-[rgba(10,10,10,0.35)]

          [&_textarea]:w-full [&_textarea]:bg-transparent [&_textarea]:py-3
          [&_textarea]:font-[var(--font-body,Inter,system-ui,sans-serif)]
          [&_textarea]:text-base [&_textarea]:text-[var(--color-ink,#0a0a0a)]
          [&_textarea]:outline-none [&_textarea]:resize-none
          [&_textarea]:border-0 [&_textarea]:border-b [&_textarea]:border-[rgba(10,10,10,0.18)]
          [&_textarea]:transition-colors
          focus-within:[&_textarea]:border-[var(--color-ink,#0a0a0a)]
          [&_textarea::placeholder]:text-[rgba(10,10,10,0.35)]

          [&_select]:w-full [&_select]:bg-transparent [&_select]:py-3
          [&_select]:font-[var(--font-body,Inter,system-ui,sans-serif)]
          [&_select]:text-base [&_select]:text-[var(--color-ink,#0a0a0a)]
          [&_select]:outline-none [&_select]:appearance-none
          [&_select]:border-0 [&_select]:border-b [&_select]:border-[rgba(10,10,10,0.18)]
          [&_select]:transition-colors
          focus-within:[&_select]:border-[var(--color-ink,#0a0a0a)]
          [&_option]:bg-[var(--color-paint-white,#fafafa)] [&_option]:text-[var(--color-ink,#0a0a0a)]
        "
      >
        {children}
      </div>
      {error && (
        <span
          role="alert"
          style={{
            fontFamily: FONT_BODY,
            fontSize: 'clamp(0.75rem, 0.82vw, 0.85rem)',
            color: '#a8331f',
            marginTop: '0.25rem',
          }}
        >
          {error}
        </span>
      )}
    </label>
  );
}
