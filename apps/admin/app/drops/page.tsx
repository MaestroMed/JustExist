import { AdminShell, AdminHeader } from '@/components/AdminShell';

export default function DropsAdmin() {
  return (
    <AdminShell>
      <AdminHeader
        eyebrow="Événements"
        title="Drops"
        actions={
          <button
            type="button"
            className="rounded-sm bg-[var(--color-blood)] px-4 py-2 font-[var(--font-display)] text-xs uppercase tracking-[0.25em] text-[var(--color-cream)] transition-opacity hover:opacity-90"
          >
            + Créer un drop
          </button>
        }
      />
      <div className="flex flex-col items-start gap-4 rounded-sm border border-dashed border-[var(--color-cream-100)] p-12 text-center">
        <p className="font-[var(--font-mono)] text-xs uppercase tracking-[0.3em] text-[var(--color-blood)]">
          Sprint 4
        </p>
        <h2 className="font-[var(--font-display)] text-2xl font-[500] text-[var(--color-cream)]">
          Créer un drop en 3 étapes.
        </h2>
        <p className="max-w-xl font-[var(--font-body)] text-sm text-[var(--color-cream-600)]">
          Informations (titre, œuvre liée, édition, prix) → Planning (ouverture VIP 24h avant, ouverture
          publique, fermeture au sold-out ou à date) → Contenu (lore, vidéo, specs). Preview live avant
          publication. WebSocket sold counter intégré.
        </p>
      </div>
    </AdminShell>
  );
}
