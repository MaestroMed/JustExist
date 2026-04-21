import type { Metadata } from 'next';
import { Container } from '@nacks/ui';
import { PageShell, PageHeader } from '@/components/layouts/PageShell';
import { CommissionForm } from '@/components/forms/CommissionForm';

export const metadata: Metadata = {
  title: 'Commande personnalisée',
  description:
    "Commander une œuvre Nacks sur-mesure — candidature filtrée, 2 à 3 projets par mois, à partir de 1 500 €.",
};

export default function CommissionPage() {
  return (
    <PageShell>
      <Container size="wide" className="py-20 md:py-24">
        <PageHeader
          eyebrow="Commande personnalisée"
          title="Une œuvre, pour toi."
          subtitle="2 à 3 commandes par mois. Candidature obligatoire — je choisis les projets qui me parlent. Prix à partir de 1 500 €."
        />

        <div className="mt-16 grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          <div>
            <CommissionForm />
          </div>

          <aside className="flex flex-col gap-10 lg:sticky lg:top-28 lg:self-start">
            <div>
              <p className="font-[var(--font-mono)] text-xs uppercase tracking-[0.3em] text-[var(--color-blood)]">
                Comment ça se passe
              </p>
              <ol className="mt-6 flex flex-col gap-4 font-[var(--font-body)] text-[var(--color-cream)]">
                <Step n={1} label="Tu remplis le formulaire" body="Prends 5 minutes. Plus c'est précis, plus je peux te dire vite si c'est faisable." />
                <Step n={2} label="Je te réponds sous 72 h" body="Si ton projet me parle, on passe en appel. Si ce n'est pas le bon moment, je te le dis clairement." />
                <Step n={3} label="Devis + acompte 30 %" body="On cale le cahier des charges, je bloque le créneau dans l'atelier." />
                <Step n={4} label="Création, 4 à 8 semaines" body="Je t'envoie 2 photos mi-parcours. Pas de validation par étape — ça casse le geste." />
                <Step n={5} label="Livraison, certificat, signature dédiée" body="Expédition assurée ou remise en atelier. COA + ta dédicace manuscrite au dos." />
              </ol>
            </div>

            <div>
              <p className="font-[var(--font-mono)] text-xs uppercase tracking-[0.3em] text-[var(--color-cream-600)]">
                Ce que je refuse
              </p>
              <ul className="mt-6 flex flex-col gap-3 font-[var(--font-body)] text-sm text-[var(--color-cream-600)]">
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-1 w-3 flex-shrink-0 bg-[var(--color-blood)]" />
                  Les copies d'œuvres existantes (les miennes ou celles d'autres artistes).
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-1 w-3 flex-shrink-0 bg-[var(--color-blood)]" />
                  Les délais absurdes (moins de 4 semaines).
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-1 w-3 flex-shrink-0 bg-[var(--color-blood)]" />
                  Les briefs trop contrôlants (validation à chaque étape).
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-1 w-3 flex-shrink-0 bg-[var(--color-blood)]" />
                  Les projets sans dimension humaine (logos, mascottes d'entreprise).
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </Container>
    </PageShell>
  );
}

function Step({ n, label, body }: { n: number; label: string; body: string }) {
  return (
    <li className="flex items-start gap-5 border-b border-[var(--color-cream-100)] pb-4">
      <span className="font-[var(--font-mono)] text-2xl font-[500] tabular-nums text-[var(--color-blood)]">
        0{n}
      </span>
      <div className="flex-1">
        <p className="font-[var(--font-display)] text-lg font-[500]">{label}</p>
        <p className="mt-1 font-[var(--font-body)] text-sm text-[var(--color-cream-600)]">{body}</p>
      </div>
    </li>
  );
}
