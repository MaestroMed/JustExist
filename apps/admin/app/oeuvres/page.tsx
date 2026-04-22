import { AdminShell, AdminHeader } from '@/components/AdminShell';

export default function OeuvresAdmin() {
  return (
    <AdminShell>
      <AdminHeader
        eyebrow="Catalogue"
        title="Œuvres"
        actions={
          <button
            type="button"
            className="rounded-sm bg-[var(--color-blood)] px-4 py-2 font-[var(--font-display)] text-xs uppercase tracking-[0.25em] text-[var(--color-cream)] transition-opacity hover:opacity-90"
          >
            + Nouvelle œuvre
          </button>
        }
      />
      <div className="flex flex-col items-start gap-4 rounded-sm border border-dashed border-[var(--color-cream-100)] p-12 text-center">
        <p className="font-[var(--font-mono)] text-xs uppercase tracking-[0.3em] text-[var(--color-blood)]">
          Sprint 2
        </p>
        <h2 className="font-[var(--font-display)] text-2xl font-[500] text-[var(--color-cream)]">
          CRUD œuvres bientôt.
        </h2>
        <p className="max-w-xl font-[var(--font-body)] text-sm text-[var(--color-cream-600)]">
          Cette vue recensera les 11 œuvres actuellement dans la galerie, permettra d'uploader des images vers
          Cloudflare R2, de gérer les variants et stocks, de publier/dépublier. Le design est prêt, il attend
          la connexion DB.
        </p>
      </div>
    </AdminShell>
  );
}
