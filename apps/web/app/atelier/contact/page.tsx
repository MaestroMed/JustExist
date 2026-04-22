import type { Metadata } from 'next';
import { Container } from '@nacks/ui';
import { PageShell, PageHeader } from '@/components/layouts/PageShell';
import { ContactForm } from '@/components/forms/ContactForm';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Écrire à Nacks — presse, collaboration, question, commande personnalisée.',
};

export default function ContactPage() {
  return (
    <PageShell>
      <Container size="wide" className="py-20 md:py-24">
        <PageHeader
          eyebrow="Contact"
          title="Écris-moi."
          subtitle="Je réponds à tous les messages. Presse, collab, questions, juste un mot — tout atterrit dans la même boîte et je lis tout."
        />

        <div className="mt-16 grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          <ContactForm />

          <aside className="flex flex-col gap-10 lg:sticky lg:top-28 lg:self-start">
            <div className="flex flex-col gap-4 border border-[var(--color-cream-100)] p-8">
              <p className="font-[var(--font-mono)] text-xs uppercase tracking-[0.3em] text-[var(--color-blood)]">
                Presse & interviews
              </p>
              <p className="font-[var(--font-body)] text-sm text-[var(--color-cream-600)]">
                Pour un article, une télé, un podcast, un reportage, écris-moi directement. Les
                demandes presse sont traitées en priorité.
              </p>
              <a
                href="/atelier/presse"
                className="mt-2 inline-flex items-center gap-2 font-[var(--font-mono)] text-xs uppercase tracking-[0.25em] text-[var(--color-cream)] transition-opacity hover:opacity-70"
                data-cursor="link"
              >
                Kit presse téléchargeable →
              </a>
            </div>

            <div className="flex flex-col gap-4 border border-[var(--color-cream-100)] p-8">
              <p className="font-[var(--font-mono)] text-xs uppercase tracking-[0.3em] text-[var(--color-blood)]">
                Commande personnalisée
              </p>
              <p className="font-[var(--font-body)] text-sm text-[var(--color-cream-600)]">
                Pour une œuvre sur mesure, le formulaire dédié a un workflow optimisé.
              </p>
              <a
                href="/atelier/commission"
                className="mt-2 inline-flex items-center gap-2 font-[var(--font-mono)] text-xs uppercase tracking-[0.25em] text-[var(--color-cream)] transition-opacity hover:opacity-70"
                data-cursor="link"
              >
                Passer par /atelier/commission →
              </a>
            </div>

            <div className="flex flex-col gap-2 font-[var(--font-mono)] text-xs text-[var(--color-cream-600)]">
              <p className="uppercase tracking-[0.25em] text-[var(--color-cream-400)]">Si tu préfères l'email direct</p>
              <a
                href="mailto:contact@nacksgalerie.com"
                className="text-[var(--color-cream)] transition-opacity hover:opacity-70"
                data-cursor="link"
              >
                contact@nacksgalerie.com
              </a>
              <p className="mt-4 uppercase tracking-[0.25em] text-[var(--color-cream-400)]">Réponse</p>
              <p className="text-[var(--color-cream)]">Sous 48 à 72&nbsp;h ouvrées.</p>
            </div>
          </aside>
        </div>
      </Container>
    </PageShell>
  );
}
