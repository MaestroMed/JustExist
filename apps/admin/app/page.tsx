import { AdminShell, AdminHeader } from '@/components/AdminShell';
import { KPICard } from '@/components/KPICard';
import { SparkChart } from '@/components/SparkChart';

// Données mock — remplacées par requêtes DB au Sprint 2.
const SALES_30D = [2400, 3200, 2800, 3800, 4200, 3600, 4800, 5400, 4200, 5000, 6200, 5800, 7200, 6800, 7400, 8200, 9000, 8400, 7800, 9200, 10400, 9800, 11200, 10800, 12400, 13200, 12800, 14000, 13600, 15200];

const RECENT_ORDERS = [
  { id: '#NCK-1042', client: 'Alex M.', item: 'Mr Poppy — Neon Night', amount: '450 €', status: 'Payée', when: 'il y a 2 min' },
  { id: '#NCK-1041', client: 'Yasmine D.', item: 'Poppy — Studio Session', amount: '190 €', status: 'Expédiée', when: 'il y a 34 min' },
  { id: '#NCK-1040', client: 'Karim B.', item: 'Mr Poppy — Origine', amount: '280 €', status: 'Livrée', when: 'il y a 2 h' },
  { id: '#NCK-1039', client: 'Sophie P.', item: 'Figurine Mr Poppy', amount: '220 €', status: 'Payée', when: 'il y a 3 h' },
  { id: '#NCK-1038', client: 'Thomas V.', item: 'Gorille — Luxe Print', amount: '680 €', status: 'Expédiée', when: 'il y a 5 h' },
];

const ACTIVE_DROPS = [
  { slug: 'poppy-neon-night', title: 'Poppy — Neon Night', sold: 77, size: 100, status: 'live' as const },
  { slug: 'poppy-lama-collab', title: 'Poppy & Lama — Collab', sold: 0, size: 120, status: 'upcoming' as const },
];

export default function AdminDashboard() {
  return (
    <AdminShell>
      <AdminHeader
        eyebrow="Vue d'ensemble"
        title="Tableau de bord"
        actions={
          <>
            <button
              type="button"
              className="rounded-sm border border-[var(--color-cream-100)] px-4 py-2 font-[var(--font-mono)] text-xs uppercase tracking-[0.25em] text-[var(--color-cream-600)] transition-colors hover:text-[var(--color-cream)]"
            >
              30 derniers jours
            </button>
            <button
              type="button"
              className="rounded-sm bg-[var(--color-cream)] px-4 py-2 font-[var(--font-display)] text-xs uppercase tracking-[0.25em] text-[var(--color-ink)] transition-opacity hover:opacity-90"
            >
              Exporter CSV
            </button>
          </>
        }
      />

      <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <KPICard
          label="CA 30 jours"
          value="187 420 €"
          delta={{ value: '+28 %', direction: 'up' }}
          hint="vs. 30 jours précédents"
        />
        <KPICard
          label="Commandes"
          value="214"
          delta={{ value: '+42', direction: 'up' }}
          hint="18 en cours d'expédition"
        />
        <KPICard
          label="Visiteurs uniques"
          value="42 180"
          delta={{ value: '+12 %', direction: 'up' }}
          hint="Plausible — sans cookie"
        />
        <KPICard
          label="Taux conversion"
          value="1,8 %"
          delta={{ value: '-0,3 pt', direction: 'down' }}
          hint="Objectif v1 : 2,2 %"
        />
      </section>

      {/* Chart */}
      <section className="mt-10 rounded-sm border border-[var(--color-cream-100)] bg-[var(--color-ink)] p-6">
        <div className="flex items-baseline justify-between pb-4">
          <h2 className="font-[var(--font-display)] text-lg font-[500] text-[var(--color-cream)]">
            Chiffre d'affaires — 30 derniers jours
          </h2>
          <span className="font-[var(--font-mono)] text-xs text-[var(--color-cream-600)]">
            Max : 15 200 € · Min : 2 400 €
          </span>
        </div>
        <div className="h-[200px]">
          <SparkChart data={SALES_30D} />
        </div>
      </section>

      <section className="mt-10 grid gap-6 lg:grid-cols-[2fr_1fr]">
        {/* Recent orders */}
        <div className="rounded-sm border border-[var(--color-cream-100)] bg-[var(--color-ink)] p-6">
          <div className="mb-6 flex items-baseline justify-between">
            <h2 className="font-[var(--font-display)] text-lg font-[500] text-[var(--color-cream)]">
              Dernières commandes
            </h2>
            <a
              href="/commandes"
              className="font-[var(--font-mono)] text-xs uppercase tracking-[0.25em] text-[var(--color-cream-600)] hover:text-[var(--color-cream)]"
            >
              Tout voir →
            </a>
          </div>
          <table className="w-full">
            <thead>
              <tr className="border-b border-[var(--color-cream-100)] text-left font-[var(--font-mono)] text-[10px] uppercase tracking-[0.25em] text-[var(--color-cream-600)]">
                <th className="pb-3">Réf</th>
                <th className="pb-3">Client</th>
                <th className="pb-3">Œuvre</th>
                <th className="pb-3 text-right">Montant</th>
                <th className="pb-3 text-right">Statut</th>
              </tr>
            </thead>
            <tbody>
              {RECENT_ORDERS.map((o, i) => (
                <tr
                  key={o.id}
                  className={i < RECENT_ORDERS.length - 1 ? 'border-b border-[var(--color-cream-100)]' : ''}
                >
                  <td className="py-4 font-[var(--font-mono)] text-xs text-[var(--color-cream)]">{o.id}</td>
                  <td className="py-4 font-[var(--font-body)] text-sm text-[var(--color-cream)]">{o.client}</td>
                  <td className="py-4 font-[var(--font-body)] text-sm text-[var(--color-cream-600)]">{o.item}</td>
                  <td className="py-4 text-right font-[var(--font-mono)] text-sm tabular-nums text-[var(--color-cream)]">
                    {o.amount}
                  </td>
                  <td className="py-4 text-right">
                    <span
                      className={`rounded-full px-2 py-0.5 font-[var(--font-mono)] text-[10px] uppercase tracking-[0.2em] ${
                        o.status === 'Payée'
                          ? 'bg-[var(--color-blood)]/20 text-[var(--color-blood)]'
                          : o.status === 'Expédiée'
                            ? 'bg-[var(--color-poppy)]/20 text-[var(--color-cyan)]'
                            : 'bg-[var(--color-acid)]/20 text-[var(--color-acid)]'
                      }`}
                    >
                      {o.status}
                    </span>
                    <span className="ml-2 font-[var(--font-mono)] text-[10px] text-[var(--color-cream-600)]">
                      {o.when}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Active drops */}
        <div className="rounded-sm border border-[var(--color-cream-100)] bg-[var(--color-ink)] p-6">
          <div className="mb-6 flex items-baseline justify-between">
            <h2 className="font-[var(--font-display)] text-lg font-[500] text-[var(--color-cream)]">
              Drops actifs
            </h2>
            <a
              href="/drops"
              className="font-[var(--font-mono)] text-xs uppercase tracking-[0.25em] text-[var(--color-cream-600)] hover:text-[var(--color-cream)]"
            >
              Gérer →
            </a>
          </div>
          <ul className="flex flex-col gap-5">
            {ACTIVE_DROPS.map((d) => {
              const pct = Math.round((d.sold / d.size) * 100);
              return (
                <li key={d.slug} className="flex flex-col gap-2 border-b border-[var(--color-cream-100)] pb-4 last:border-b-0">
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="font-[var(--font-display)] text-sm font-[500] text-[var(--color-cream)]">
                      {d.title}
                    </span>
                    <span
                      className={`rounded-full px-2 py-0.5 font-[var(--font-mono)] text-[10px] uppercase tracking-[0.2em] ${
                        d.status === 'live'
                          ? 'bg-[var(--color-blood)]/20 text-[var(--color-blood)]'
                          : 'bg-[var(--color-cream-100)]/10 text-[var(--color-cream-600)]'
                      }`}
                    >
                      {d.status === 'live' ? '● live' : 'À venir'}
                    </span>
                  </div>
                  <div className="flex items-baseline justify-between font-[var(--font-mono)] text-[10px] uppercase tracking-[0.2em] text-[var(--color-cream-600)]">
                    <span>
                      {d.sold} / {d.size} vendus
                    </span>
                    <span>{pct}%</span>
                  </div>
                  <div className="h-[2px] overflow-hidden bg-[var(--color-cream-100)]">
                    <div
                      className="h-full bg-[var(--color-blood)] transition-[width] duration-700"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="mt-10 rounded-sm border border-dashed border-[var(--color-cream-100)] p-8 text-center">
        <p className="font-[var(--font-mono)] text-xs uppercase tracking-[0.3em] text-[var(--color-cream-600)]">
          Données de démonstration
        </p>
        <p className="mt-2 font-[var(--font-body)] text-sm text-[var(--color-cream-600)]">
          Les chiffres affichés sont des placeholders. Dès que la DB Neon est branchée (Sprint 2), les valeurs
          reflètent les commandes/drops/clients réels en temps réel.
        </p>
      </section>
    </AdminShell>
  );
}
