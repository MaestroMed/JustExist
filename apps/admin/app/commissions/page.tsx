import { AdminShell, AdminHeader } from '@/components/AdminShell';

export default function CommissionsAdmin() {
  return (
    <AdminShell>
      <AdminHeader eyebrow="Commandes personnalisées" title="Commissions" />
      <div className="flex flex-col items-start gap-4 rounded-sm border border-dashed border-[var(--color-cream-100)] p-12 text-center">
        <p className="font-[var(--font-mono)] text-xs uppercase tracking-[0.3em] text-[var(--color-blood)]">
          Sprint 9
        </p>
        <h2 className="font-[var(--font-display)] text-2xl font-[500] text-[var(--color-cream)]">
          Inbox candidatures + scoring auto
        </h2>
        <p className="max-w-xl font-[var(--font-body)] text-sm text-[var(--color-cream-600)]">
          Liste des demandes arrivées via /atelier/commission avec le score calculé par l'API
          (/api/commission route). Vue détaillée par demande avec réponse templatée acceptée / refusée /
          questions. Workflow statuts : new → reviewed → accepted/declined → in_progress → delivered.
        </p>
      </div>
    </AdminShell>
  );
}
