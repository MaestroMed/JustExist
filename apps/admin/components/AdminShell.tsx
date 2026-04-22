import type { ReactNode } from 'react';
import { Sidebar } from './Sidebar';

export function AdminShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[var(--color-ink)] text-[var(--color-cream)]">
      <Sidebar />
      <main className="flex-1 overflow-x-hidden">
        <div className="mx-auto max-w-[1280px] px-10 py-12">{children}</div>
      </main>
    </div>
  );
}

export function AdminHeader({
  eyebrow,
  title,
  actions,
}: {
  eyebrow?: string;
  title: string;
  actions?: ReactNode;
}) {
  return (
    <header className="mb-10 flex flex-wrap items-end justify-between gap-6 border-b border-[var(--color-cream-100)] pb-6">
      <div className="flex flex-col gap-2">
        {eyebrow && (
          <p className="font-[var(--font-mono)] text-xs uppercase tracking-[0.3em] text-[var(--color-cream-600)]">
            {eyebrow}
          </p>
        )}
        <h1 className="font-[var(--font-display)] text-4xl font-[500] tracking-[-0.02em] text-[var(--color-cream)]">
          {title}
        </h1>
      </div>
      {actions && <div className="flex items-center gap-3">{actions}</div>}
    </header>
  );
}
