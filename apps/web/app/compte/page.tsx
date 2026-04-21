'use client';

import { useState, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Container } from '@nacks/ui';
import { PageShell } from '@/components/layouts/PageShell';

export default function AccountPage() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email) return;
    setStatus('sending');
    setTimeout(() => setStatus('sent'), 700);
  }

  return (
    <PageShell>
      <section className="relative min-h-[80vh] overflow-hidden">
        {/* Halo discret */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at 50% 40%, rgba(230,57,70,0.08), transparent 60%)',
          }}
        />
        <Container size="content" className="relative z-10 py-20 md:py-28">
          <div className="flex flex-col items-center gap-12 text-center">
            <p className="font-[var(--font-mono)] text-xs uppercase tracking-[0.3em] text-[var(--color-blood)]">
              Accès compte
            </p>
            <h1
              className="font-[var(--font-display)] font-[500] leading-[0.92] tracking-[-0.035em] text-[var(--color-cream)] text-balance"
              style={{ fontSize: 'clamp(2.5rem, 7vw, 5.5rem)' }}
            >
              Connecte-toi au cercle.
            </h1>
            <p className="max-w-xl font-[var(--font-body)] text-lg text-[var(--color-cream-600)]">
              Pas de mot de passe. Entre ton email, on t'envoie un lien magique qui te connecte en un clic. Il expire dans 15 minutes.
            </p>

            <div className="w-full max-w-md">
              <AnimatePresence mode="wait">
                {status === 'sent' ? (
                  <motion.div
                    key="sent"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col gap-3 rounded-sm border border-[var(--color-cream-100)] p-8 text-left"
                  >
                    <span className="font-[var(--font-mono)] text-xs uppercase tracking-[0.3em] text-[var(--color-blood)]">
                      Lien envoyé
                    </span>
                    <p className="font-[var(--font-display)] text-2xl font-[500] text-[var(--color-cream)]">
                      Regarde ta boîte mail.
                    </p>
                    <p className="font-[var(--font-body)] text-sm text-[var(--color-cream-600)]">
                      Un lien vient d'être envoyé à <span className="text-[var(--color-cream)]">{email}</span>.
                      Clique dessus pour te connecter. Il expire dans 15 minutes.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={onSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col gap-6 rounded-sm border border-[var(--color-cream-100)] p-8"
                  >
                    <label className="flex flex-col gap-2 text-left">
                      <span className="font-[var(--font-mono)] text-[10px] uppercase tracking-[0.25em] text-[var(--color-cream-600)]">
                        Email
                      </span>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="ton@email.com"
                        autoComplete="email"
                        className="w-full border-b border-[var(--color-cream-200)] bg-transparent pb-3 pt-2 font-[var(--font-body)] text-lg text-[var(--color-cream)] outline-none transition-colors placeholder:text-[var(--color-cream-400)] focus:border-[var(--color-blood)]"
                      />
                    </label>
                    <button
                      type="submit"
                      disabled={status === 'sending'}
                      className="inline-flex items-center justify-center gap-3 bg-[var(--color-cream)] px-6 py-4 font-[var(--font-display)] text-sm uppercase tracking-[0.2em] text-[var(--color-ink)] transition-colors hover:bg-[var(--color-blood)] hover:text-[var(--color-cream)] disabled:opacity-60"
                      data-cursor="link"
                      data-cursor-label="Envoyer"
                    >
                      {status === 'sending' ? 'Envoi…' : 'Recevoir le lien'}
                      <span>→</span>
                    </button>
                    <p className="font-[var(--font-body)] text-xs text-[var(--color-cream-400)]">
                      En te connectant, tu acceptes les{' '}
                      <a href="/legal/cgv" className="underline hover:text-[var(--color-cream)]">CGV</a> et la{' '}
                      <a href="/legal/confidentialite" className="underline hover:text-[var(--color-cream)]">politique de confidentialité</a>.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>

            <div className="grid w-full max-w-md gap-3 border-t border-[var(--color-cream-100)] pt-10 text-left font-[var(--font-body)] text-sm text-[var(--color-cream-600)]">
              <p className="font-[var(--font-mono)] text-[10px] uppercase tracking-[0.25em] text-[var(--color-cream-600)]">
                Ce que tu peux faire une fois connecté
              </p>
              <ul className="flex flex-col gap-2">
                <li>· Voir tes commandes et numéros d'édition.</li>
                <li>· Gérer ta wishlist et ses alertes de disponibilité.</li>
                <li>· Accéder aux drops 24 h avant le public (à partir de ton 1er achat).</li>
                <li>· Recevoir un message personnel de Nacks les jours d'expédition.</li>
              </ul>
            </div>
          </div>
        </Container>
      </section>
    </PageShell>
  );
}
