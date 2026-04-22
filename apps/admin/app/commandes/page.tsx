import { AdminShell, AdminHeader } from '@/components/AdminShell';

export default function CommandesAdmin() {
  return (
    <AdminShell>
      <AdminHeader
        eyebrow="Opérations"
        title="Commandes"
        actions={
          <button
            type="button"
            className="rounded-sm border border-[var(--color-cream-100)] px-4 py-2 font-[var(--font-mono)] text-xs uppercase tracking-[0.25em] text-[var(--color-cream-600)] transition-colors hover:text-[var(--color-cream)]"
          >
            Export CSV
          </button>
        }
      />
      <div className="flex flex-col items-start gap-4 rounded-sm border border-dashed border-[var(--color-cream-100)] p-12 text-center">
        <p className="font-[var(--font-mono)] text-xs uppercase tracking-[0.3em] text-[var(--color-blood)]">
          Sprint 6
        </p>
        <h2 className="font-[var(--font-display)] text-2xl font-[500] text-[var(--color-cream)]">
          Suivi commandes + emballage
        </h2>
        <p className="max-w-xl font-[var(--font-body)] text-sm text-[var(--color-cream-600)]">
          Table filtrable (statut, date, type), vue détaillée par commande (produits, client, adresse, paiement),
          boutons "Marquer expédié" → déclenche l'email #2 automatique, "Marquer livré" → déclenche l'email #4
          demande de photo.
        </p>
      </div>
    </AdminShell>
  );
}
