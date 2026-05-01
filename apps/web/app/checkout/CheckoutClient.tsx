'use client';

import { useMemo, useState, type FormEvent } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArtPoster } from '@/components/art/ArtPoster';
import { DripButton } from '@/components/ui/DripButton';
import { useCart } from '@/lib/hooks/useCart';
import { formatPrice } from '@/lib/content/artworks';

/**
 * CHECKOUT — page finalisation commande.
 *
 * Layout 2 colonnes desktop (1.2fr / 1fr) :
 *  - Gauche : steps + form adresse + livraison + paiement
 *  - Droite : récap panier sticky avec totaux + CTA submit
 *
 * Stripe : pas branché Sprint 1 (pas de @stripe/* dans package.json),
 * placeholder visuel "à brancher Sprint 6". Submit = mock POST → success
 * affichée inline (toast-like) avec lien vers /oeuvres.
 *
 * État panier vide : card centrée + CTA /oeuvres.
 *
 * Animations Motion subtle, prefers-reduced-motion respect.
 */

const INK = 'var(--color-ink, #0a0a0a)';
const PAPER = 'var(--color-paint-white, #fafafa)';

const FONT_SERIF = "var(--font-serif, 'Playfair Display', Georgia, serif)";
const FONT_BODY = "var(--font-body, Inter, system-ui, sans-serif)";

type ShippingId = 'standard' | 'express' | 'international';

type Shipping = {
  id: ShippingId;
  label: string;
  delay: string;
  priceCents: number | null; // null = sur devis
};

const SHIPPING_OPTIONS: ReadonlyArray<Shipping> = [
  { id: 'standard', label: 'Standard', delay: '5 à 7 jours · France', priceCents: 1200 },
  { id: 'express', label: 'Express', delay: '2 à 3 jours · France', priceCents: 3500 },
  { id: 'international', label: 'International', delay: 'Sur devis · monde entier', priceCents: null },
];

const COUNTRIES = [
  { value: 'FR', label: 'France' },
  { value: 'BE', label: 'Belgique' },
  { value: 'CH', label: 'Suisse' },
  { value: 'LU', label: 'Luxembourg' },
  { value: 'DE', label: 'Allemagne' },
  { value: 'GB', label: 'Royaume-Uni' },
  { value: 'US', label: 'États-Unis' },
  { value: 'CA', label: 'Canada' },
  { value: 'OTHER', label: 'Autre · International' },
] as const;

type Status = 'idle' | 'loading' | 'success' | 'error';

export function CheckoutClient() {
  const { items, subtotal, count, hydrated } = useCart();
  const prefersReducedMotion = useReducedMotion();

  const [shipping, setShipping] = useState<ShippingId>('standard');
  const [country, setCountry] = useState('FR');
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<string[]>([]);

  const shippingPriceCents = useMemo(() => {
    const opt = SHIPPING_OPTIONS.find((s) => s.id === shipping);
    return opt?.priceCents ?? null;
  }, [shipping]);

  const total = useMemo(() => {
    if (shippingPriceCents == null) return subtotal;
    return subtotal + shippingPriceCents;
  }, [subtotal, shippingPriceCents]);

  /* Étape active inférée pour la steps progress */
  const currentStep = useMemo(() => {
    if (status === 'success') return 4;
    return 1; // Sprint 1 : visuel statique
  }, [status]);

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
    const address = String(data.get('address') ?? '').trim();
    const city = String(data.get('city') ?? '').trim();
    const zip = String(data.get('zip') ?? '').trim();

    const errs: string[] = [];
    if (!firstName) errs.push('Prénom requis.');
    if (!lastName) errs.push('Nom requis.');
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.push('Email invalide.');
    if (!address) errs.push('Adresse requise.');
    if (!city) errs.push('Ville requise.');
    if (!zip) errs.push('Code postal requis.');

    if (errs.length > 0) {
      setFieldErrors(errs);
      setStatus('error');
      setErrorMsg('Quelques champs à corriger.');
      return;
    }

    /* Sprint 1 : mock submit. Pas de Stripe, pas d'API. */
    await new Promise((r) => setTimeout(r, 800));
    setStatus('success');
  }

  /* État panier vide : carte centrale */
  if (hydrated && items.length === 0 && status !== 'success') {
    return (
      <section
        className="relative w-full overflow-hidden"
        style={{
          backgroundColor: 'var(--color-cream, #f5f1e8)',
          color: INK,
          paddingBlock: 'clamp(5rem, 12vh, 10rem)',
        }}
      >
        <div
          className="relative mx-auto"
          style={{
            maxWidth: '32rem',
            paddingInline: 'clamp(1.5rem, 4vw, 5rem)',
          }}
        >
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center gap-5 text-center"
            style={{
              backgroundColor: PAPER,
              border: '1px solid rgba(10,10,10,0.08)',
              borderRadius: '6px',
              padding: 'clamp(2.5rem, 5vh, 4rem) clamp(1.5rem, 4vw, 3rem)',
              boxShadow: '0 1px 1px rgba(10,10,10,0.04), 0 22px 60px -28px rgba(10,10,10,0.18)',
            }}
          >
            <p
              className="uppercase"
              style={{
                fontFamily: FONT_BODY,
                fontSize: 'clamp(0.7rem, 0.78vw, 0.82rem)',
                letterSpacing: '0.28em',
                color: 'rgba(10,10,10,0.55)',
                margin: 0,
              }}
            >
              Checkout · Paiement
            </p>
            <h1
              style={{
                fontFamily: FONT_SERIF,
                fontStyle: 'italic',
                fontWeight: 400,
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                lineHeight: 1.05,
                letterSpacing: '-0.025em',
                color: INK,
                margin: 0,
                maxWidth: '20ch',
              }}
            >
              Aucune œuvre dans votre panier.
            </h1>
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
              Le tunnel de paiement s’active dès qu’une œuvre rejoint votre
              panier.
            </p>
            <div style={{ marginTop: '0.5rem' }}>
              <DripButton href="/oeuvres" variant="primary" glow="pink" size="md">
                Voir les œuvres
              </DripButton>
            </div>
          </motion.div>
        </div>
        <CheckoutStyles />
      </section>
    );
  }

  /* État succès : carte centrale */
  if (status === 'success') {
    return (
      <section
        className="relative w-full overflow-hidden"
        style={{
          backgroundColor: 'var(--color-cream, #f5f1e8)',
          color: INK,
          paddingBlock: 'clamp(5rem, 12vh, 10rem)',
        }}
      >
        <div
          className="relative mx-auto"
          style={{
            maxWidth: '36rem',
            paddingInline: 'clamp(1.5rem, 4vw, 5rem)',
          }}
        >
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center gap-5 text-center"
            style={{
              backgroundColor: PAPER,
              border: '1px solid rgba(10,10,10,0.08)',
              borderRadius: '6px',
              padding: 'clamp(2.5rem, 5vh, 4rem) clamp(1.5rem, 4vw, 3rem)',
              boxShadow: '0 1px 1px rgba(10,10,10,0.04), 0 22px 60px -28px rgba(10,10,10,0.18)',
            }}
          >
            <SuccessCheck reduced={!!prefersReducedMotion} />
            <h2
              style={{
                fontFamily: FONT_SERIF,
                fontStyle: 'italic',
                fontWeight: 400,
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                lineHeight: 1.05,
                letterSpacing: '-0.02em',
                color: INK,
                margin: 0,
                maxWidth: '22ch',
              }}
            >
              Commande prête à partir.
            </h2>
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
              Sprint 1 : le paiement Stripe sera branché Sprint 6. Vous recevrez
              un email de confirmation, le certificat d’authenticité et un suivi
              d’expédition dès que la pièce quitte l’atelier.
            </p>
            <div style={{ marginTop: '0.5rem' }}>
              <DripButton href="/oeuvres" variant="primary" glow="green" size="md">
                Continuer la visite
              </DripButton>
            </div>
          </motion.div>
        </div>
        <CheckoutStyles />
      </section>
    );
  }

  /* État principal : 2 colonnes */
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{
        backgroundColor: 'var(--color-cream, #f5f1e8)',
        color: INK,
        paddingBlock: 'clamp(3rem, 7vh, 6rem)',
      }}
    >
      <div
        className="relative mx-auto"
        style={{
          maxWidth: 'var(--container-max, 1440px)',
          paddingInline: 'clamp(1.25rem, 4vw, 5rem)',
        }}
      >
        <motion.header
          initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-[clamp(1rem,2vh,1.5rem)]"
          style={{ marginBottom: 'clamp(2rem, 4vh, 3rem)' }}
        >
          <p
            className="uppercase"
            style={{
              fontFamily: FONT_BODY,
              fontSize: 'clamp(0.7rem, 0.78vw, 0.82rem)',
              letterSpacing: '0.28em',
              color: 'rgba(10,10,10,0.55)',
              margin: 0,
            }}
          >
            Checkout · Paiement
          </p>
          <h1
            className="text-balance"
            style={{
              fontFamily: FONT_SERIF,
              fontStyle: 'italic',
              fontWeight: 400,
              fontSize: 'clamp(2.5rem, 6vw, 5rem)',
              lineHeight: 0.98,
              letterSpacing: '-0.025em',
              color: INK,
              margin: 0,
              maxWidth: '18ch',
            }}
          >
            Finaliser la commande.
          </h1>
          <Steps current={currentStep} />
        </motion.header>

        <div
          className="grid gap-[clamp(2rem,4vw,3.5rem)]"
          style={{ gridTemplateColumns: '1fr' }}
        >
          <div
            className="checkout-grid"
            style={{ display: 'grid', gap: 'clamp(2rem,4vw,3.5rem)' }}
          >
            {/* ───────────── Colonne gauche : form ───────────── */}
            <motion.form
              onSubmit={onSubmit}
              noValidate
              initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
              className="flex flex-col gap-[clamp(2rem,4vh,3rem)]"
              style={{
                backgroundColor: PAPER,
                border: '1px solid rgba(10,10,10,0.08)',
                borderRadius: '6px',
                padding: 'clamp(1.75rem, 3.5vw, 3rem)',
                boxShadow:
                  '0 1px 1px rgba(10,10,10,0.04), 0 22px 60px -28px rgba(10,10,10,0.18)',
              }}
            >
              {/* ─── Adresse ─── */}
              <SectionHeading n="01" label="Adresse de livraison" />

              <div className="checkout-fields">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-[clamp(1rem,2vw,1.5rem)]">
                  <Field label="Prénom" required>
                    <input name="firstName" type="text" autoComplete="given-name" required />
                  </Field>
                  <Field label="Nom" required>
                    <input name="lastName" type="text" autoComplete="family-name" required />
                  </Field>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-[clamp(1rem,2vw,1.5rem)] mt-[clamp(1rem,2vh,1.5rem)]">
                  <Field label="Email" required>
                    <input name="email" type="email" autoComplete="email" required />
                  </Field>
                  <Field label="Téléphone (optionnel)">
                    <input name="phone" type="tel" autoComplete="tel" placeholder="+33 …" />
                  </Field>
                </div>

                <div className="mt-[clamp(1rem,2vh,1.5rem)]">
                  <Field label="Adresse" required>
                    <input
                      name="address"
                      type="text"
                      autoComplete="street-address"
                      placeholder="Numéro et rue"
                      required
                    />
                  </Field>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-[1fr_1fr_1.2fr] gap-[clamp(1rem,2vw,1.5rem)] mt-[clamp(1rem,2vh,1.5rem)]">
                  <Field label="Code postal" required>
                    <input
                      name="zip"
                      type="text"
                      inputMode="numeric"
                      autoComplete="postal-code"
                      required
                    />
                  </Field>
                  <Field label="Ville" required>
                    <input
                      name="city"
                      type="text"
                      autoComplete="address-level2"
                      required
                    />
                  </Field>
                  <Field label="Pays" required>
                    <select
                      name="country"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      required
                    >
                      {COUNTRIES.map((c) => (
                        <option key={c.value} value={c.value}>
                          {c.label}
                        </option>
                      ))}
                    </select>
                  </Field>
                </div>
              </div>

              {/* ─── Livraison ─── */}
              <div>
                <SectionHeading n="02" label="Mode de livraison" />
                <div
                  role="radiogroup"
                  aria-label="Mode de livraison"
                  className="flex flex-col gap-[clamp(0.6rem,1vh,0.85rem)]"
                >
                  {SHIPPING_OPTIONS.map((opt) => (
                    <ShippingOption
                      key={opt.id}
                      option={opt}
                      checked={shipping === opt.id}
                      onChange={() => setShipping(opt.id)}
                    />
                  ))}
                </div>
              </div>

              {/* ─── Paiement (placeholder Sprint 6) ─── */}
              <div>
                <SectionHeading n="03" label="Paiement sécurisé" />
                <PaymentPlaceholder />
              </div>

              {/* ─── Erreurs ─── */}
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

              {/* Submit visible mobile (le sticky récap n'est pas sticky en mobile, on duplique pour ergonomie) */}
              <div className="lg:hidden">
                <SubmitButton status={status} />
              </div>
            </motion.form>

            {/* ───────────── Colonne droite : récap ───────────── */}
            <motion.aside
              initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.16 }}
              aria-label="Récapitulatif de commande"
              className="checkout-aside"
            >
              <div
                className="flex flex-col gap-[clamp(1.25rem,2.5vh,1.75rem)]"
                style={{
                  backgroundColor: PAPER,
                  border: '1px solid rgba(10,10,10,0.08)',
                  borderRadius: '6px',
                  padding: 'clamp(1.5rem, 3vw, 2.25rem)',
                  boxShadow:
                    '0 1px 1px rgba(10,10,10,0.04), 0 22px 60px -28px rgba(10,10,10,0.18)',
                }}
              >
                <div className="flex items-baseline justify-between gap-3">
                  <h2
                    style={{
                      fontFamily: FONT_SERIF,
                      fontStyle: 'italic',
                      fontWeight: 400,
                      fontSize: 'clamp(1.4rem, 1.8vw, 1.65rem)',
                      lineHeight: 1.1,
                      letterSpacing: '-0.01em',
                      color: INK,
                      margin: 0,
                    }}
                  >
                    Récapitulatif
                  </h2>
                  <span
                    className="uppercase"
                    style={{
                      fontFamily: FONT_BODY,
                      fontSize: '0.7rem',
                      letterSpacing: '0.22em',
                      color: 'rgba(10,10,10,0.55)',
                    }}
                  >
                    {hydrated ? `${count} ${count > 1 ? 'œuvres' : 'œuvre'}` : '—'}
                  </span>
                </div>

                <ul
                  className="flex flex-col gap-[clamp(0.85rem,1.5vh,1.1rem)]"
                  style={{ listStyle: 'none', padding: 0, margin: 0 }}
                >
                  {hydrated &&
                    items.map((it) => (
                      <li
                        key={it.handle}
                        className="flex items-start gap-[clamp(0.85rem,1.5vw,1.1rem)]"
                      >
                        <div
                          aria-hidden
                          style={{
                            width: 64,
                            height: 80,
                            flexShrink: 0,
                            backgroundColor: 'rgba(10,10,10,0.04)',
                            borderRadius: '3px',
                            overflow: 'hidden',
                            border: '1px solid rgba(10,10,10,0.08)',
                          }}
                        >
                          <ArtPoster
                            variant={it.artwork.posterVariant}
                            label={it.artwork.title}
                          />
                        </div>
                        <div className="flex flex-1 flex-col gap-1 min-w-0">
                          <span
                            style={{
                              fontFamily: FONT_SERIF,
                              fontStyle: 'italic',
                              fontWeight: 400,
                              fontSize: 'clamp(0.95rem, 1.05vw, 1.05rem)',
                              lineHeight: 1.25,
                              color: INK,
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              display: '-webkit-box',
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: 'vertical',
                            }}
                          >
                            {it.artwork.title}
                          </span>
                          <span
                            style={{
                              fontFamily: FONT_BODY,
                              fontSize: '0.78rem',
                              color: 'rgba(10,10,10,0.55)',
                            }}
                          >
                            Quantité {it.qty}
                          </span>
                        </div>
                        <span
                          style={{
                            fontFamily: FONT_BODY,
                            fontSize: 'clamp(0.9rem, 1vw, 1rem)',
                            fontWeight: 500,
                            color: INK,
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {formatPrice(it.artwork.priceCents * it.qty)}
                        </span>
                      </li>
                    ))}
                </ul>

                <div
                  className="flex flex-col gap-[clamp(0.5rem,1vh,0.75rem)]"
                  style={{
                    paddingTop: 'clamp(1rem, 2vh, 1.5rem)',
                    borderTop: '1px solid rgba(10,10,10,0.08)',
                  }}
                >
                  <Row label="Sous-total" value={formatPrice(subtotal)} />
                  <Row
                    label="Livraison"
                    value={
                      shippingPriceCents == null
                        ? 'Sur devis'
                        : shippingPriceCents === 0
                          ? 'Offerte'
                          : formatPrice(shippingPriceCents)
                    }
                  />
                </div>

                <div
                  className="flex items-baseline justify-between gap-3"
                  style={{
                    paddingTop: 'clamp(0.85rem, 1.6vh, 1.25rem)',
                    borderTop: '1px solid rgba(10,10,10,0.18)',
                  }}
                >
                  <span
                    className="uppercase"
                    style={{
                      fontFamily: FONT_BODY,
                      fontSize: 'clamp(0.7rem, 0.78vw, 0.82rem)',
                      letterSpacing: '0.24em',
                      fontWeight: 600,
                      color: 'rgba(10,10,10,0.65)',
                    }}
                  >
                    Total
                  </span>
                  <span
                    style={{
                      fontFamily: FONT_SERIF,
                      fontStyle: 'italic',
                      fontWeight: 600,
                      fontSize: 'clamp(1.6rem, 2.2vw, 2rem)',
                      lineHeight: 1,
                      letterSpacing: '-0.01em',
                      color: INK,
                    }}
                  >
                    {shippingPriceCents == null
                      ? `${formatPrice(subtotal)} +`
                      : formatPrice(total)}
                  </span>
                </div>

                {/* CTA submit visible desktop (sticky aside) */}
                <div className="hidden lg:block">
                  <SubmitButton status={status} />
                </div>

                <p
                  style={{
                    fontFamily: FONT_BODY,
                    fontSize: 'clamp(0.72rem, 0.78vw, 0.8rem)',
                    lineHeight: 1.55,
                    color: 'rgba(10,10,10,0.55)',
                    margin: 0,
                    textAlign: 'center',
                  }}
                >
                  Certificat d’authenticité inclus · 14 jours pour changer d’avis.
                </p>
              </div>
            </motion.aside>
          </div>
        </div>
      </div>

      <CheckoutStyles />
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
 *  Steps progress — 3 dots + connecteurs
 * ═══════════════════════════════════════════════════════════════ */
function Steps({ current }: { current: number }) {
  const labels = ['Adresse', 'Livraison', 'Paiement'];
  return (
    <ol
      className="flex items-center"
      style={{ listStyle: 'none', padding: 0, margin: 0, gap: 'clamp(0.5rem,1.2vw,1rem)' }}
      aria-label="Étapes de la commande"
    >
      {labels.map((l, i) => {
        const n = i + 1;
        const active = n <= current;
        return (
          <li key={l} className="flex items-center" style={{ gap: 'clamp(0.5rem,1.2vw,1rem)' }}>
            <span className="flex items-center" style={{ gap: '0.65rem' }}>
              <span
                aria-hidden
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: 9999,
                  backgroundColor: active ? INK : 'transparent',
                  border: `1.5px solid ${active ? INK : 'rgba(10,10,10,0.3)'}`,
                  transition: 'background-color 240ms ease, border-color 240ms ease',
                }}
              />
              <span
                className="uppercase"
                style={{
                  fontFamily: FONT_BODY,
                  fontSize: 'clamp(0.7rem, 0.78vw, 0.82rem)',
                  letterSpacing: '0.22em',
                  fontWeight: 600,
                  color: active ? INK : 'rgba(10,10,10,0.5)',
                }}
              >
                {String(n).padStart(2, '0')} {l}
              </span>
            </span>
            {i < labels.length - 1 && (
              <span
                aria-hidden
                style={{
                  flex: '0 0 clamp(1.5rem,4vw,3rem)',
                  height: '1px',
                  backgroundColor: active ? INK : 'rgba(10,10,10,0.18)',
                  transition: 'background-color 240ms ease',
                }}
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}

/* ═══════════════════════════════════════════════════════════════
 *  SectionHeading — eyebrow + label
 * ═══════════════════════════════════════════════════════════════ */
function SectionHeading({ n, label }: { n: string; label: string }) {
  return (
    <div
      className="flex items-baseline gap-3"
      style={{ marginBottom: 'clamp(1rem,2vh,1.5rem)' }}
    >
      <span
        style={{
          fontFamily: FONT_SERIF,
          fontStyle: 'italic',
          fontWeight: 400,
          fontSize: '1.25rem',
          color: 'rgba(10,10,10,0.4)',
          lineHeight: 1,
        }}
      >
        {n}
      </span>
      <h2
        style={{
          fontFamily: FONT_SERIF,
          fontStyle: 'italic',
          fontWeight: 400,
          fontSize: 'clamp(1.4rem, 2vw, 1.85rem)',
          letterSpacing: '-0.01em',
          color: INK,
          lineHeight: 1.1,
          margin: 0,
        }}
      >
        {label}
      </h2>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
 *  Field — input/select wrapper
 * ═══════════════════════════════════════════════════════════════ */
function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-[clamp(0.4rem,0.8vh,0.55rem)]">
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
      <div className="checkout-control">{children}</div>
    </label>
  );
}

/* ═══════════════════════════════════════════════════════════════
 *  ShippingOption — radio card
 * ═══════════════════════════════════════════════════════════════ */
function ShippingOption({
  option,
  checked,
  onChange,
}: {
  option: Shipping;
  checked: boolean;
  onChange: () => void;
}) {
  const priceLabel =
    option.priceCents == null
      ? 'Sur devis'
      : option.priceCents === 0
        ? 'Offerte'
        : formatPrice(option.priceCents);

  return (
    <label
      className="cursor-pointer"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'clamp(0.85rem, 1.5vw, 1.1rem)',
        padding: 'clamp(0.95rem, 1.8vh, 1.25rem) clamp(1rem, 2vw, 1.4rem)',
        border: `1px solid ${checked ? INK : 'rgba(10,10,10,0.1)'}`,
        backgroundColor: checked ? 'rgba(10,10,10,0.02)' : PAPER,
        borderRadius: '4px',
        transition: 'border-color 200ms ease, background-color 200ms ease',
      }}
    >
      <input
        type="radio"
        name="shipping"
        value={option.id}
        checked={checked}
        onChange={onChange}
        className="sr-only"
      />
      <span
        aria-hidden
        style={{
          width: 16,
          height: 16,
          borderRadius: 9999,
          flexShrink: 0,
          border: `1.5px solid ${checked ? INK : 'rgba(10,10,10,0.3)'}`,
          backgroundColor: PAPER,
          position: 'relative',
          transition: 'border-color 200ms ease',
        }}
      >
        {checked && (
          <span
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 8,
              height: 8,
              borderRadius: 9999,
              backgroundColor: INK,
            }}
          />
        )}
      </span>
      <span className="flex flex-1 flex-col gap-1 min-w-0">
        <span
          style={{
            fontFamily: FONT_SERIF,
            fontStyle: 'italic',
            fontWeight: 400,
            fontSize: 'clamp(1.05rem, 1.2vw, 1.2rem)',
            color: INK,
            lineHeight: 1.2,
          }}
        >
          {option.label}
        </span>
        <span
          style={{
            fontFamily: FONT_BODY,
            fontSize: 'clamp(0.78rem, 0.85vw, 0.88rem)',
            color: 'rgba(10,10,10,0.55)',
          }}
        >
          {option.delay}
        </span>
      </span>
      <span
        style={{
          fontFamily: FONT_BODY,
          fontSize: 'clamp(0.9rem, 1vw, 1rem)',
          fontWeight: 500,
          color: INK,
          whiteSpace: 'nowrap',
        }}
      >
        {priceLabel}
      </span>
    </label>
  );
}

/* ═══════════════════════════════════════════════════════════════
 *  PaymentPlaceholder — Stripe Elements à brancher Sprint 6
 * ═══════════════════════════════════════════════════════════════ */
function PaymentPlaceholder() {
  return (
    <div className="flex flex-col gap-[clamp(1rem,2vh,1.4rem)]">
      <div
        style={{
          padding: 'clamp(1rem, 2vw, 1.4rem)',
          border: '1px dashed rgba(10,10,10,0.2)',
          borderRadius: '4px',
          backgroundColor: 'rgba(10,10,10,0.02)',
        }}
      >
        <p
          className="uppercase"
          style={{
            fontFamily: FONT_BODY,
            fontSize: 'clamp(0.65rem, 0.72vw, 0.75rem)',
            letterSpacing: '0.22em',
            fontWeight: 600,
            color: 'rgba(10,10,10,0.55)',
            margin: 0,
          }}
        >
          Stripe Elements · Sprint 6
        </p>
        <div
          className="flex flex-col gap-[clamp(0.6rem,1.2vh,0.85rem)]"
          style={{ marginTop: 'clamp(0.85rem,1.5vh,1.15rem)' }}
        >
          <FakeInput label="Numéro de carte" placeholder="•••• •••• •••• ••••" />
          <div className="grid grid-cols-2 gap-[clamp(0.85rem,1.5vw,1.1rem)]">
            <FakeInput label="Expiration" placeholder="MM / AA" />
            <FakeInput label="CVC" placeholder="•••" />
          </div>
        </div>
      </div>

      <div
        className="flex flex-wrap items-center justify-between gap-3"
        style={{ paddingInline: '0.25rem' }}
      >
        <p
          style={{
            fontFamily: FONT_BODY,
            fontSize: 'clamp(0.72rem, 0.78vw, 0.82rem)',
            color: 'rgba(10,10,10,0.55)',
            margin: 0,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
          }}
        >
          <LockGlyph />
          Paiement sécurisé Stripe · Cryptage SSL
        </p>
        <div className="flex items-center" style={{ gap: '0.5rem' }}>
          <CardLogo type="visa" />
          <CardLogo type="mastercard" />
          <CardLogo type="amex" />
        </div>
      </div>
    </div>
  );
}

function FakeInput({ label, placeholder }: { label: string; placeholder: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span
        className="uppercase"
        style={{
          fontFamily: FONT_BODY,
          fontSize: '0.62rem',
          letterSpacing: '0.22em',
          fontWeight: 600,
          color: 'rgba(10,10,10,0.45)',
        }}
      >
        {label}
      </span>
      <span
        aria-hidden
        style={{
          fontFamily: FONT_BODY,
          fontSize: '0.95rem',
          color: 'rgba(10,10,10,0.35)',
          padding: '0.6rem 0',
          borderBottom: '1px solid rgba(10,10,10,0.18)',
          display: 'block',
          letterSpacing: '0.05em',
        }}
      >
        {placeholder}
      </span>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
 *  Row — sous-total / livraison
 * ═══════════════════════════════════════════════════════════════ */
function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <span
        className="uppercase"
        style={{
          fontFamily: FONT_BODY,
          fontSize: '0.72rem',
          letterSpacing: '0.22em',
          color: 'rgba(10,10,10,0.55)',
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontFamily: FONT_BODY,
          fontSize: 'clamp(0.9rem, 1vw, 1rem)',
          color: INK,
        }}
      >
        {value}
      </span>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
 *  SubmitButton — pill ink full-width (DripButton primary green)
 * ═══════════════════════════════════════════════════════════════ */
function SubmitButton({ status }: { status: Status }) {
  const loading = status === 'loading';
  return (
    <DripButton
      type="submit"
      variant="primary"
      glow="green"
      size="md"
      fullWidth
      disabled={loading}
    >
      {loading ? 'Traitement…' : 'Confirmer et payer'}
    </DripButton>
  );
}

/* ═══════════════════════════════════════════════════════════════
 *  Glyphs (lock + cards)
 * ═══════════════════════════════════════════════════════════════ */
function LockGlyph() {
  return (
    <svg
      width="12"
      height="14"
      viewBox="0 0 12 14"
      aria-hidden
      style={{ flexShrink: 0 }}
    >
      <rect
        x="1.5"
        y="6"
        width="9"
        height="7"
        rx="1"
        fill="none"
        stroke="rgba(10,10,10,0.55)"
        strokeWidth="1"
      />
      <path
        d="M3 6 V4 a3 3 0 0 1 6 0 V6"
        fill="none"
        stroke="rgba(10,10,10,0.55)"
        strokeWidth="1"
      />
    </svg>
  );
}

function CardLogo({ type }: { type: 'visa' | 'mastercard' | 'amex' }) {
  const w = 32;
  const h = 20;
  const stroke = 'rgba(10,10,10,0.4)';
  const fill = 'rgba(10,10,10,0.4)';
  const common = (
    <rect
      x="0.5"
      y="0.5"
      width={w - 1}
      height={h - 1}
      rx="2"
      fill="none"
      stroke={stroke}
      strokeWidth="1"
    />
  );

  if (type === 'visa') {
    return (
      <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} aria-label="Visa">
        {common}
        <text
          x={w / 2}
          y={h / 2 + 4}
          textAnchor="middle"
          fontFamily="Inter, system-ui, sans-serif"
          fontSize="9"
          fontWeight="700"
          fontStyle="italic"
          fill={fill}
          letterSpacing="0.05em"
        >
          VISA
        </text>
      </svg>
    );
  }

  if (type === 'mastercard') {
    return (
      <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} aria-label="Mastercard">
        {common}
        <circle cx={w / 2 - 4} cy={h / 2} r="4.5" fill="none" stroke={fill} strokeWidth="1" />
        <circle cx={w / 2 + 4} cy={h / 2} r="4.5" fill="none" stroke={fill} strokeWidth="1" />
      </svg>
    );
  }

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} aria-label="American Express">
      {common}
      <text
        x={w / 2}
        y={h / 2 + 3.5}
        textAnchor="middle"
        fontFamily="Inter, system-ui, sans-serif"
        fontSize="7"
        fontWeight="700"
        fill={fill}
        letterSpacing="0.04em"
      >
        AMEX
      </text>
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════
 *  SuccessCheck — checkmark animé
 * ═══════════════════════════════════════════════════════════════ */
function SuccessCheck({ reduced }: { reduced: boolean }) {
  return (
    <motion.svg
      width="56"
      height="56"
      viewBox="0 0 56 56"
      fill="none"
      initial={reduced ? { scale: 1, opacity: 1 } : { scale: 0.7, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
    >
      <circle cx="28" cy="28" r="27" stroke="#0a0a0a" strokeWidth="1.5" fill="none" />
      <motion.path
        d="M 16 28 L 25 37 L 41 21"
        stroke="#0a0a0a"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        initial={reduced ? { pathLength: 1 } : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.25 }}
      />
    </motion.svg>
  );
}

/* ═══════════════════════════════════════════════════════════════
 *  Styles globaux scopés
 * ═══════════════════════════════════════════════════════════════ */
function CheckoutStyles() {
  return (
    <style>{`
      .checkout-grid {
        grid-template-columns: 1fr;
      }
      @media (min-width: 1024px) {
        .checkout-grid {
          grid-template-columns: 1.2fr 1fr;
          align-items: start;
        }
        .checkout-aside {
          position: sticky;
          top: 6rem;
        }
      }
      .checkout-control input,
      .checkout-control select,
      .checkout-control textarea {
        width: 100%;
        font-family: ${FONT_BODY};
        font-size: clamp(0.95rem, 1.05vw, 1.05rem);
        line-height: 1.5;
        color: ${INK};
        background-color: transparent;
        border: 1px solid rgba(10,10,10,0.15);
        padding: 0.85rem 1rem;
        outline: none;
        transition: border-color 200ms ease, box-shadow 200ms ease;
        border-radius: 3px;
        appearance: none;
      }
      .checkout-control input::placeholder,
      .checkout-control textarea::placeholder {
        color: rgba(10,10,10,0.35);
      }
      .checkout-control input:focus,
      .checkout-control select:focus,
      .checkout-control textarea:focus {
        border-color: ${INK};
        box-shadow: 0 0 0 3px rgba(10,10,10,0.06);
      }
      .checkout-control select {
        background-image: linear-gradient(45deg, transparent 50%, ${INK} 50%),
          linear-gradient(135deg, ${INK} 50%, transparent 50%);
        background-position:
          calc(100% - 1.05rem) 1.1rem,
          calc(100% - 0.7rem) 1.1rem;
        background-size: 6px 6px, 6px 6px;
        background-repeat: no-repeat;
        padding-right: 2rem;
        cursor: pointer;
      }
      @media (prefers-reduced-motion: reduce) {
        .checkout-control input,
        .checkout-control select {
          transition: none !important;
        }
      }
    `}</style>
  );
}
