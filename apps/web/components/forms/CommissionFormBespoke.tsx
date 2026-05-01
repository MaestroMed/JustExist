'use client';

import { useState, type FormEvent } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';

/**
 * COMMISSION FORM — Bespoke edition (DA cream/card paper).
 *
 * Form premium pour la page /atelier/commission (Agent 10 — Phase 2).
 * Inspiration Aesop bespoke / Hermès commission.
 *
 * Background cream, card paper #fafafa border ink/8% padding generous.
 * Typo Inter labels, Playfair italic pour les titres et messages success.
 *
 * Champs :
 *  - Nom (required), Email (required), Téléphone
 *  - Type de support (radio : toile / mur / sneakers / sac-cuir / tatouage / autre)
 *  - Format souhaité (text)
 *  - Description (textarea, required, min 50 chars)
 *  - Références visuelles (file input, optionnel — non wired Sprint 1)
 *  - Budget approximatif (select, required)
 *  - Délai souhaité (select)
 *  - Comment vous m'avez découvert (select)
 *
 * États : idle / loading / success / error.
 * POST /api/commission. Validation manuelle (pas de zod ni react-hook-form).
 * prefers-reduced-motion respecté.
 */

const INK = 'var(--color-ink, #0a0a0a)';
const CREAM = 'var(--color-cream, #f5f1e8)';
const PAPER = 'var(--color-paint-white, #fafafa)';

const FONT_SERIF = "var(--font-serif, 'Playfair Display', Georgia, serif)";
const FONT_BODY = "var(--font-body, Inter, system-ui, sans-serif)";

type Status = 'idle' | 'loading' | 'success' | 'error';

const SUPPORTS = [
  { value: 'toile', label: 'Toile' },
  { value: 'mur', label: 'Mur · Fresque' },
  { value: 'sneakers', label: 'Sneakers' },
  { value: 'cuir', label: 'Sac · Cuir' },
  { value: 'tatouage', label: 'Tatouage' },
  { value: 'autre', label: 'Autre' },
] as const;

const BUDGETS = [
  '< 1 500 €',
  '1 500 – 2 500 €',
  '2 500 – 4 000 €',
  '4 000 – 6 000 €',
  '6 000 € et plus',
  'À discuter',
] as const;

const DELAIS = [
  'Pas pressé',
  '1 à 2 mois',
  '3 à 6 mois',
  'Date précise',
] as const;

const SOURCES = [
  'Instagram',
  'TikTok',
  'Bouche-à-oreille',
  'Galerie',
  'Presse',
  'Autre',
] as const;

export function CommissionFormBespoke() {
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<string[]>([]);
  const prefersReducedMotion = useReducedMotion();

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg(null);
    setFieldErrors([]);

    const form = e.currentTarget;
    const data = new FormData(form);

    const firstName = String(data.get('firstName') ?? '').trim();
    const lastName = String(data.get('lastName') ?? '').trim();
    const email = String(data.get('email') ?? '').trim().toLowerCase();
    const phone = String(data.get('phone') ?? '').trim();
    const support = String(data.get('support') ?? '').trim();
    const dimensions = String(data.get('dimensions') ?? '').trim();
    const brief = String(data.get('brief') ?? '').trim();
    const budgetBand = String(data.get('budgetBand') ?? '').trim();
    const deadline = String(data.get('deadline') ?? '').trim();
    const source = String(data.get('source') ?? '').trim();

    /* Validation manuelle */
    const errs: string[] = [];
    if (!firstName) errs.push('Prénom requis.');
    if (!lastName) errs.push('Nom requis.');
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.push('Email invalide.');
    if (!support) errs.push('Choisis un type de support.');
    if (!brief || brief.length < 50) errs.push('Description : 50 caractères minimum.');
    if (!budgetBand) errs.push('Indique un budget approximatif.');

    if (errs.length > 0) {
      setFieldErrors(errs);
      setStatus('error');
      setErrorMsg('Quelques champs à corriger.');
      return;
    }

    try {
      const res = await fetch('/api/commission', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          phone: phone || undefined,
          occasion: support,
          dimensions: dimensions || undefined,
          brief,
          budgetBand: budgetBand === '< 1 500 €' || budgetBand === 'À discuter' ? null : budgetBand,
          deadline: deadline || undefined,
          source: source || undefined,
        }),
      });

      const json = (await res.json().catch(() => null)) as
        | { ok?: boolean; error?: string; errors?: string[] }
        | null;

      if (!res.ok || !json?.ok) {
        const apiErrs = json?.errors ?? (json?.error ? [json.error] : []);
        setFieldErrors(apiErrs);
        setErrorMsg(apiErrs[0] ?? 'Une erreur est survenue. Réessaie dans un instant.');
        setStatus('error');
        return;
      }

      setStatus('success');
    } catch {
      setErrorMsg('Réseau indisponible. Réessaie dans un instant.');
      setStatus('error');
    }
  }

  return (
    <motion.div
      initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full"
      style={{
        backgroundColor: PAPER,
        border: '1px solid rgba(10,10,10,0.08)',
        borderRadius: '6px',
        padding: 'clamp(1.75rem, 4vw, 3rem)',
        boxShadow: '0 1px 1px rgba(10,10,10,0.04), 0 22px 60px -28px rgba(10,10,10,0.18)',
      }}
    >
      <AnimatePresence mode="wait">
        {status === 'success' ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center gap-5 text-center"
            style={{ paddingBlock: 'clamp(2.5rem, 5vh, 4rem)' }}
          >
            <SuccessCheck />
            <h3
              style={{
                fontFamily: FONT_SERIF,
                fontStyle: 'italic',
                fontWeight: 400,
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                lineHeight: 1.05,
                letterSpacing: '-0.02em',
                color: INK,
                margin: 0,
                maxWidth: '20ch',
              }}
            >
              Merci. Naguy revient vers vous sous 48 h.
            </h3>
            <p
              style={{
                fontFamily: FONT_BODY,
                fontSize: 'clamp(0.95rem, 1.05vw, 1.1rem)',
                lineHeight: 1.6,
                color: 'rgba(10,10,10,0.6)',
                margin: 0,
                maxWidth: '32rem',
              }}
            >
              Si le projet appelle un appel, on cale un créneau ensemble. Sinon
              vous recevez un devis détaillé et un calendrier d&apos;atelier.
            </p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={onSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col gap-[clamp(1.5rem,3vh,2.25rem)]"
          >
            {/* ──── Identité ──── */}
            <fieldset className="grid grid-cols-1 sm:grid-cols-2 gap-[clamp(1rem,2vw,1.5rem)] m-0 p-0 border-0">
              <Field label="Prénom" required>
                <input name="firstName" type="text" autoComplete="given-name" required />
              </Field>
              <Field label="Nom" required>
                <input name="lastName" type="text" autoComplete="family-name" required />
              </Field>
            </fieldset>

            <fieldset className="grid grid-cols-1 sm:grid-cols-2 gap-[clamp(1rem,2vw,1.5rem)] m-0 p-0 border-0">
              <Field label="Email" required>
                <input name="email" type="email" autoComplete="email" required />
              </Field>
              <Field label="Téléphone (optionnel)">
                <input name="phone" type="tel" autoComplete="tel" placeholder="+33 …" />
              </Field>
            </fieldset>

            {/* ──── Type de support — radio pills ──── */}
            <div className="flex flex-col gap-[clamp(0.6rem,1.2vh,0.85rem)]">
              <FieldLabel label="Type de support" required />
              <div
                role="radiogroup"
                aria-label="Type de support"
                className="flex flex-wrap gap-[clamp(0.4rem,0.8vw,0.6rem)]"
              >
                {SUPPORTS.map((s) => (
                  <SupportRadio key={s.value} value={s.value} label={s.label} />
                ))}
              </div>
            </div>

            <Field label="Format souhaité (optionnel)">
              <input
                name="dimensions"
                type="text"
                placeholder="ex : Toile 100 × 80 cm · Air Force 1 pointure 42 · Mur 4 m"
              />
            </Field>

            {/* ──── Brief ──── */}
            <Field
              label="Racontez-moi votre projet"
              required
              hint="Le personnage, l'émotion, l'histoire, les couleurs. 50 caractères minimum."
            >
              <textarea
                name="brief"
                rows={6}
                required
                minLength={50}
                placeholder="Le projet, l'émotion qu'il porte, le contexte, ce que l'œuvre doit dire…"
              />
            </Field>

            {/* ──── Références visuelles ──── */}
            <Field
              label="Références visuelles (optionnel)"
              hint="Joindre des photos d'inspiration, croquis, captures. Taille max 5 Mo par fichier."
            >
              <input
                name="references"
                type="file"
                accept="image/*,application/pdf"
                multiple
              />
            </Field>

            {/* ──── Budget · Délai · Source ──── */}
            <fieldset className="grid grid-cols-1 sm:grid-cols-2 gap-[clamp(1rem,2vw,1.5rem)] m-0 p-0 border-0">
              <Field label="Budget approximatif" required>
                <select name="budgetBand" required defaultValue="">
                  <option value="" disabled>
                    Choisir une plage
                  </option>
                  {BUDGETS.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label="Délai souhaité">
                <select name="deadline" defaultValue="">
                  <option value="" disabled>
                    Choisir un horizon
                  </option>
                  {DELAIS.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </Field>
            </fieldset>

            <Field label="Comment avez-vous découvert Nacks ?">
              <select name="source" defaultValue="">
                <option value="" disabled>
                  Choisir
                </option>
                {SOURCES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </Field>

            {/* ──── Erreurs API / validation ──── */}
            {status === 'error' && errorMsg && (
              <div
                role="alert"
                className="flex flex-col gap-1"
                style={{
                  padding: 'clamp(0.85rem, 1.5vh, 1.1rem) clamp(1rem, 2vw, 1.25rem)',
                  borderLeft: '2px solid #b91c1c',
                  backgroundColor: 'rgba(185,28,28,0.05)',
                  color: '#7f1d1d',
                }}
              >
                <span
                  style={{
                    fontFamily: FONT_BODY,
                    fontWeight: 600,
                    fontSize: 'clamp(0.85rem, 0.92vw, 0.95rem)',
                  }}
                >
                  {errorMsg}
                </span>
                {fieldErrors.length > 1 && (
                  <ul
                    style={{
                      fontFamily: FONT_BODY,
                      fontSize: 'clamp(0.8rem, 0.85vw, 0.88rem)',
                      lineHeight: 1.5,
                      margin: '0.25rem 0 0 0',
                      padding: '0 0 0 1rem',
                      listStyle: 'disc',
                    }}
                  >
                    {fieldErrors.map((err, i) => (
                      <li key={i}>{err}</li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            {/* ──── Footer (RGPD + submit) ──── */}
            <div
              className="flex flex-col gap-[clamp(1rem,2vh,1.5rem)] sm:flex-row sm:items-center sm:justify-between"
              style={{
                paddingTop: 'clamp(1rem, 2vh, 1.5rem)',
                borderTop: '1px solid rgba(10,10,10,0.08)',
              }}
            >
              <p
                style={{
                  fontFamily: FONT_BODY,
                  fontSize: 'clamp(0.72rem, 0.78vw, 0.82rem)',
                  lineHeight: 1.5,
                  color: 'rgba(10,10,10,0.5)',
                  margin: 0,
                  maxWidth: '24rem',
                }}
              >
                Vos infos servent uniquement à vous répondre. Aucun partage,
                aucune revente. RGPD-compatible.
              </p>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="group inline-flex items-center justify-center transition-transform hover:scale-[1.02] disabled:opacity-60 disabled:hover:scale-100"
                style={{
                  fontFamily: FONT_SERIF,
                  fontStyle: 'italic',
                  fontSize: 'clamp(0.95rem, 1.05vw, 1.1rem)',
                  color: CREAM,
                  backgroundColor: INK,
                  padding: 'clamp(0.85rem, 1.6vh, 1.15rem) clamp(1.6rem, 2.6vw, 2.4rem)',
                  borderRadius: '999px',
                  border: 'none',
                  cursor: status === 'loading' ? 'wait' : 'pointer',
                  boxShadow:
                    '0 1px 1px rgba(10,10,10,0.18), 0 18px 40px -18px rgba(10,10,10,0.28)',
                }}
              >
                <span>
                  {status === 'loading' ? 'Envoi…' : 'Envoyer ma demande'}&nbsp;
                  <span
                    aria-hidden
                    className="inline-block transition-transform duration-300 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </span>
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ═════════════════════════════════════════════════════════════════════
 *  Field — wrapper label + input/textarea/select avec styling cream
 * ═════════════════════════════════════════════════════════════════════ */
function Field({
  label,
  required,
  hint,
  children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-[clamp(0.4rem,0.8vh,0.6rem)]">
      <FieldLabel label={label} required={required} />
      {hint && (
        <span
          style={{
            fontFamily: FONT_BODY,
            fontSize: 'clamp(0.72rem, 0.78vw, 0.82rem)',
            lineHeight: 1.5,
            color: 'rgba(10,10,10,0.5)',
            margin: 0,
          }}
        >
          {hint}
        </span>
      )}
      <div className="commission-field">{children}</div>
      <style>{`
        .commission-field input,
        .commission-field textarea,
        .commission-field select {
          width: 100%;
          font-family: ${FONT_BODY};
          font-size: clamp(0.95rem, 1.05vw, 1.05rem);
          line-height: 1.5;
          color: ${INK};
          background-color: transparent;
          border: none;
          border-bottom: 1px solid rgba(10,10,10,0.18);
          padding: 0.65rem 0;
          outline: none;
          transition: border-color 200ms ease;
          border-radius: 0;
        }
        .commission-field input::placeholder,
        .commission-field textarea::placeholder {
          color: rgba(10,10,10,0.35);
        }
        .commission-field input:focus,
        .commission-field textarea:focus,
        .commission-field select:focus {
          border-bottom-color: ${INK};
        }
        .commission-field textarea {
          resize: vertical;
          min-height: 8rem;
        }
        .commission-field select {
          appearance: none;
          background-image: linear-gradient(45deg, transparent 50%, ${INK} 50%),
            linear-gradient(135deg, ${INK} 50%, transparent 50%);
          background-position:
            calc(100% - 1rem) 1.05rem,
            calc(100% - 0.65rem) 1.05rem;
          background-size: 6px 6px, 6px 6px;
          background-repeat: no-repeat;
          padding-right: 1.75rem;
        }
        .commission-field input[type='file'] {
          padding: 0.85rem 0;
          font-size: clamp(0.85rem, 0.92vw, 0.95rem);
          color: rgba(10,10,10,0.7);
          border-bottom: 1px dashed rgba(10,10,10,0.25);
          cursor: pointer;
        }
      `}</style>
    </label>
  );
}

function FieldLabel({ label, required }: { label: string; required?: boolean }) {
  return (
    <span
      className="uppercase"
      style={{
        fontFamily: FONT_BODY,
        fontSize: 'clamp(0.65rem, 0.72vw, 0.75rem)',
        letterSpacing: '0.22em',
        fontWeight: 600,
        color: 'rgba(10,10,10,0.55)',
      }}
    >
      {label}
      {required && (
        <span aria-hidden style={{ marginLeft: '0.35rem', color: '#b91c1c', fontWeight: 700 }}>
          *
        </span>
      )}
    </span>
  );
}

/* ═════════════════════════════════════════════════════════════════════
 *  SupportRadio — pill cliquable pour le type de support
 * ═════════════════════════════════════════════════════════════════════ */
function SupportRadio({ value, label }: { value: string; label: string }) {
  return (
    <label
      className="cursor-pointer"
      style={{
        fontFamily: FONT_BODY,
        fontSize: 'clamp(0.85rem, 0.92vw, 0.95rem)',
        fontWeight: 500,
        color: INK,
      }}
    >
      <input
        type="radio"
        name="support"
        value={value}
        required
        className="peer sr-only"
      />
      <span
        className="inline-block transition-all peer-checked:bg-[var(--color-ink,#0a0a0a)] peer-checked:text-[var(--color-cream,#f5f1e8)] peer-checked:border-[var(--color-ink,#0a0a0a)]"
        style={{
          padding: 'clamp(0.6rem, 1.1vh, 0.8rem) clamp(1rem, 1.8vw, 1.4rem)',
          borderRadius: '999px',
          border: '1px solid rgba(10,10,10,0.2)',
          backgroundColor: 'transparent',
          userSelect: 'none',
        }}
      >
        {label}
      </span>
    </label>
  );
}

/* ═════════════════════════════════════════════════════════════════════
 *  SuccessCheck — petit checkmark serif italic-friendly
 * ═════════════════════════════════════════════════════════════════════ */
function SuccessCheck() {
  return (
    <motion.svg
      width="56"
      height="56"
      viewBox="0 0 56 56"
      fill="none"
      initial={{ scale: 0.7, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
    >
      <circle cx="28" cy="28" r="27" stroke={INK} strokeWidth="1.5" fill="none" />
      <motion.path
        d="M 16 28 L 25 37 L 41 21"
        stroke={INK}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.3 }}
      />
    </motion.svg>
  );
}
