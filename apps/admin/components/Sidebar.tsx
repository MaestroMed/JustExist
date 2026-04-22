'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

type SidebarItem = {
  href: string;
  label: string;
  badge?: number;
};

const MODULES: SidebarItem[] = [
  { href: '/', label: 'Tableau de bord' },
  { href: '/oeuvres', label: 'Œuvres' },
  { href: '/drops', label: 'Drops' },
  { href: '/commandes', label: 'Commandes', badge: 3 },
  { href: '/commissions', label: 'Commissions', badge: 2 },
  { href: '/clients', label: 'Clients' },
  { href: '/journal', label: 'Journal' },
  { href: '/newsletter', label: 'Newsletter' },
  { href: '/parametres', label: 'Paramètres' },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 flex h-screen w-[240px] flex-shrink-0 flex-col justify-between border-r border-[var(--color-cream-100)] bg-[var(--color-ink)] p-6">
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-2">
          <Link
            href="/"
            className="font-[var(--font-display)] text-xl font-[600] tracking-[-0.02em] text-[var(--color-cream)] transition-opacity hover:opacity-70"
          >
            NACKS
          </Link>
          <p className="font-[var(--font-mono)] text-[10px] uppercase tracking-[0.3em] text-[var(--color-cream-600)]">
            Admin interne
          </p>
        </div>

        <nav aria-label="Navigation admin">
          <ul className="flex flex-col gap-1">
            {MODULES.map((m) => {
              const isActive = m.href === '/' ? pathname === '/' : pathname.startsWith(m.href);
              return (
                <li key={m.href}>
                  <Link
                    href={m.href}
                    className={`group flex items-center justify-between gap-2 rounded-sm px-3 py-2.5 font-[var(--font-body)] text-sm transition-colors ${
                      isActive
                        ? 'bg-[var(--color-cream)] text-[var(--color-ink)]'
                        : 'text-[var(--color-cream-600)] hover:bg-[var(--color-cream-100)]/10 hover:text-[var(--color-cream)]'
                    }`}
                  >
                    <span>{m.label}</span>
                    {m.badge && m.badge > 0 && (
                      <span
                        className={`rounded-full px-2 py-0.5 font-[var(--font-mono)] text-[10px] tabular-nums ${
                          isActive
                            ? 'bg-[var(--color-blood)] text-[var(--color-cream)]'
                            : 'bg-[var(--color-blood)]/20 text-[var(--color-blood)]'
                        }`}
                      >
                        {m.badge}
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      <div className="flex flex-col gap-4 border-t border-[var(--color-cream-100)] pt-6">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-blood)] font-[var(--font-display)] text-sm font-[500] text-[var(--color-cream)]">
            N
          </div>
          <div className="flex flex-col">
            <span className="font-[var(--font-display)] text-sm text-[var(--color-cream)]">Nacks</span>
            <span className="font-[var(--font-mono)] text-[10px] uppercase tracking-[0.2em] text-[var(--color-cream-600)]">
              Admin
            </span>
          </div>
        </div>
        <a
          href="https://nacksgalerie.com"
          target="_blank"
          rel="noreferrer"
          className="font-[var(--font-mono)] text-[10px] uppercase tracking-[0.25em] text-[var(--color-cream-600)] transition-colors hover:text-[var(--color-cream)]"
        >
          Voir le site public ↗
        </a>
      </div>
    </aside>
  );
}
