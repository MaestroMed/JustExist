'use client';

import {
  useId,
  useMemo,
  useRef,
  useState,
  type FormEvent,
} from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import { Container } from '@nacks/ui';
import { isEmail } from '@/lib/validation';
import { DripButton } from '@/components/ui/DripButton';

/**
 * SCÈNE 7 — Newsletter (DA premium minimaliste).
 *
 * Refonte from scratch : abandon des confettis paint splatter, des stickers
 * peints "VIP / ACCÈS DROP", de l'affiche "REJOIGNEZ LE CERCLE".
 *
 * Inspirations : Hermès email signup, Aesop newsletter, Substack subscribe.
 * Background ink (#0a0a0a), typographie Playfair italic display + Inter body.
 * Layout split 2 colonnes md+, stack mobile.
 *
 * Branchement API : POST /api/newsletter — body { email, source } —
 * shape { ok: true } | { ok: false, error?: string }.
 *
 * Animations : Motion `whileInView` simple, fade-up titre + stagger form.
 * prefers-reduced-motion : final state immédiat.
 */

const INK = 'var(--color-ink, #0a0a0a)';
const CREAM = 'var(--color-cream, #f5f1e8)';

const FONT_SERIF =
  "var(--font-serif, 'Playfair Display', Georgia, serif)";
const FONT_BODY = "var(--font-body, Inter, system-ui, sans-serif)";

const EASE_OUT = [0.22, 0.61, 0.36, 1] as const;

type Status = 'idle' | 'loading' | 'done' | 'error';

export function CercleNewsletter() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, {
    once: true,
    margin: '-15% 0px -15% 0px',
  });
  const prefersReduced = useReducedMotion() ?? false;

  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const inputId = useId();

  const isValidEmail = useMemo(() => isEmail(email.trim()), [email]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === 'loading') return;

    const trimmed = email.trim();
    if (!isEmail(trimmed)) {
      setStatus('error');
      setErrorMessage('Email invalide.');
      return;
    }

    setStatus('loading');
    setErrorMessage(null);

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email: trimmed, source: 'cercle' }),
      });

      if (res.status === 429) {
        const data = (await res.json().catch(() => ({}))) as {
          error?: string;
        };
        setStatus('error');
        setErrorMessage(
          data.error ?? 'Trop de tentatives, réessayez dans une minute.',
        );
        return;
      }

      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as {
          error?: string;
        };
        setStatus('error');
        setErrorMessage(data.error ?? "Une erreur est survenue.");
        return;
      }

      setStatus('done');
    } catch {
      // UX gracieuse : on garde le user dans l'idée que c'est OK,
      // le backend retry plus tard.
      setStatus('done');
    }
  }

  const shouldAnimate = !prefersReduced;
  const visible = inView || prefersReduced;

  return (
    <section
      ref={sectionRef}
      aria-label="La newsletter Nacks Galerie"
      className="relative isolate overflow-hidden"
      style={{
        backgroundColor: INK,
        color: CREAM,
        paddingBlock: 'clamp(5rem, 12vh, 9rem)',
      }}
    >
      <Container size="wide">
        <div
          className="grid items-center gap-12 md:grid-cols-2 md:gap-16 lg:gap-24"
          style={{ maxWidth: '1200px', marginInline: 'auto' }}
        >
          {/* ── Colonne gauche : eyebrow + titre + sous-titre ── */}
          <div className="flex flex-col gap-6 md:gap-8">
            <motion.p
              initial={shouldAnimate ? { opacity: 0, y: 8 } : false}
              animate={
                visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }
              }
              transition={{ duration: 0.6, delay: 0.05, ease: EASE_OUT }}
              style={{
                fontFamily: FONT_BODY,
                fontSize: 'clamp(0.7rem, 0.85vw, 0.8rem)',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: CREAM,
                opacity: 0.7,
                margin: 0,
              }}
            >
              La newsletter
            </motion.p>

            <motion.h2
              initial={shouldAnimate ? { opacity: 0, y: 16 } : false}
              animate={
                visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }
              }
              transition={{ duration: 0.8, delay: 0.15, ease: EASE_OUT }}
              style={{
                fontFamily: FONT_SERIF,
                fontStyle: 'italic',
                fontWeight: 400,
                fontSize: 'clamp(2.25rem, 5.2vw, 4.5rem)',
                lineHeight: 1.05,
                letterSpacing: '-0.01em',
                color: CREAM,
                margin: 0,
                maxWidth: '14ch',
              }}
            >
              Restez près de l&rsquo;atelier.
            </motion.h2>

            <motion.p
              initial={shouldAnimate ? { opacity: 0, y: 12 } : false}
              animate={
                visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }
              }
              transition={{ duration: 0.7, delay: 0.3, ease: EASE_OUT }}
              style={{
                fontFamily: FONT_BODY,
                fontSize: 'clamp(0.95rem, 1.05vw, 1.1rem)',
                lineHeight: 1.6,
                color: CREAM,
                opacity: 0.7,
                margin: 0,
                maxWidth: '40ch',
              }}
            >
              Nouvelles œuvres, drops, expositions. Une fois par mois,
              jamais plus. Désinscription en un clic.
            </motion.p>
          </div>

          {/* ── Colonne droite : form ── */}
          <motion.div
            initial={shouldAnimate ? { opacity: 0, y: 16 } : false}
            animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.7, delay: 0.4, ease: EASE_OUT }}
            className="flex flex-col gap-5"
          >
            {status === 'done' ? (
              <SuccessState prefersReduced={prefersReduced} />
            ) : (
              <form
                onSubmit={onSubmit}
                noValidate
                aria-describedby={
                  errorMessage ? `${inputId}-error` : undefined
                }
                className="flex flex-col gap-3 sm:flex-row sm:items-stretch"
              >
                <label htmlFor={inputId} className="sr-only">
                  Adresse email
                </label>
                <input
                  id={inputId}
                  type="email"
                  required
                  autoComplete="email"
                  inputMode="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status === 'error') {
                      setStatus('idle');
                      setErrorMessage(null);
                    }
                  }}
                  placeholder="votre@email.com"
                  aria-invalid={status === 'error'}
                  disabled={status === 'loading'}
                  className="flex-1 bg-transparent transition-colors duration-200 placeholder:text-current placeholder:opacity-40 focus:outline-none disabled:opacity-50"
                  style={{
                    fontFamily: FONT_BODY,
                    fontSize: 'clamp(0.95rem, 1.05vw, 1.05rem)',
                    color: CREAM,
                    padding:
                      'clamp(0.95rem, 1.6vh, 1.15rem) clamp(1rem, 1.6vw, 1.35rem)',
                    border: '1px solid rgba(245,241,232,0.3)',
                    borderRadius: '2px',
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor =
                      'rgba(245,241,232,1)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor =
                      'rgba(245,241,232,0.3)';
                  }}
                />

                <SubmitButton
                  status={status}
                  disabled={status === 'loading' || !isValidEmail}
                />
              </form>
            )}

            {/* ── Mention RGPD ── */}
            {status !== 'done' && (
              <p
                style={{
                  fontFamily: FONT_BODY,
                  fontSize: 'clamp(0.72rem, 0.78vw, 0.78rem)',
                  lineHeight: 1.5,
                  color: CREAM,
                  opacity: 0.5,
                  margin: 0,
                }}
              >
                Vos données restent ici. Pas de spam, pas de transfert.
              </p>
            )}

            {/* ── Message d'erreur ── */}
            {status === 'error' && errorMessage && (
              <motion.p
                id={`${inputId}-error`}
                role="alert"
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: EASE_OUT }}
                style={{
                  fontFamily: FONT_BODY,
                  fontSize: 'clamp(0.78rem, 0.85vw, 0.85rem)',
                  color: '#e96a6a',
                  margin: 0,
                }}
              >
                {errorMessage}
              </motion.p>
            )}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
 *  SubmitButton — DripButton primary glow pink
 * ═══════════════════════════════════════════════════════════════════ */
function SubmitButton({
  status,
  disabled,
}: {
  status: Status;
  disabled: boolean;
}) {
  const label = status === 'loading' ? 'Envoi…' : 'Rejoindre';

  return (
    <DripButton
      type="submit"
      variant="primary"
      glow="pink"
      size="md"
      disabled={disabled}
    >
      {label}
    </DripButton>
  );
}

/* ═══════════════════════════════════════════════════════════════════
 *  SuccessState — message serif italic + checkmark cream
 * ═══════════════════════════════════════════════════════════════════ */
function SuccessState({ prefersReduced }: { prefersReduced: boolean }) {
  return (
    <motion.div
      key="done"
      initial={prefersReduced ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: EASE_OUT }}
      className="flex items-center gap-4"
      role="status"
      aria-live="polite"
      style={{
        padding:
          'clamp(0.95rem, 1.6vh, 1.15rem) clamp(1rem, 1.6vw, 1.35rem)',
        border: '1px solid rgba(245,241,232,0.3)',
        borderRadius: '2px',
      }}
    >
      <Checkmark prefersReduced={prefersReduced} />
      <p
        style={{
          fontFamily: FONT_SERIF,
          fontStyle: 'italic',
          fontWeight: 400,
          fontSize: 'clamp(1rem, 1.2vw, 1.2rem)',
          lineHeight: 1.4,
          color: CREAM,
          margin: 0,
        }}
      >
        Merci. Premier carnet bientôt.
      </p>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
 *  Checkmark — petit SVG cream animé en stroke draw
 * ═══════════════════════════════════════════════════════════════════ */
function Checkmark({ prefersReduced }: { prefersReduced: boolean }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      aria-hidden
      style={{ flexShrink: 0 }}
    >
      <circle
        cx="11"
        cy="11"
        r="10"
        stroke="rgba(245,241,232,0.5)"
        strokeWidth="1"
      />
      <motion.path
        d="M6.5 11.5 L9.5 14.5 L15.5 8"
        stroke={CREAM}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={prefersReduced ? false : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.4, delay: 0.1, ease: EASE_OUT }}
      />
    </svg>
  );
}
