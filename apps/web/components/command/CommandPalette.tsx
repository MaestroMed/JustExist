'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Command } from 'cmdk';
import { AnimatePresence, motion } from 'motion/react';
import { artworks } from '@/lib/content/artworks';
import { drops } from '@/lib/content/drops';
import { characters } from '@/lib/content/characters';
import { journalPosts } from '@/lib/content/journal';

type Destination = { href: string; label: string; section: string };

const NAV: Destination[] = [
  { href: '/', label: 'Accueil', section: 'Navigation' },
  { href: '/oeuvres', label: 'Œuvres', section: 'Navigation' },
  { href: '/drops', label: 'Drops', section: 'Navigation' },
  { href: '/univers', label: 'Univers', section: 'Navigation' },
  { href: '/journal', label: 'Journal', section: 'Navigation' },
  { href: '/atelier', label: 'Atelier', section: 'Navigation' },
  { href: '/atelier/commission', label: 'Commande personnalisée', section: 'Navigation' },
  { href: '/atelier/contact', label: 'Contact', section: 'Navigation' },
  { href: '/atelier/presse', label: 'Kit presse', section: 'Navigation' },
  { href: '/compte', label: 'Mon compte', section: 'Navigation' },
  { href: '/panier', label: 'Mon panier', section: 'Navigation' },
];

/**
 * Palette clavier — CMD+K / CTRL+K pour ouvrir.
 * Vim-style : g puis o = Œuvres, g d = Drops, g u = Univers, g j = Journal, g a = Atelier, g h = home.
 * `?` ouvre la palette. Tout est navigable clavier uniquement.
 */
export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  // CMD+K / CTRL+K + ? ouvrent ; vim g+[letter] navigue.
  useEffect(() => {
    let gArmed = false;
    let gTimer: number | null = null;

    const clearG = () => {
      gArmed = false;
      if (gTimer) {
        window.clearTimeout(gTimer);
        gTimer = null;
      }
    };

    const onKey = (e: KeyboardEvent) => {
      // Ignore si on tape dans un input
      const target = e.target as HTMLElement | null;
      if (target && ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName)) return;

      // CMD+K / CTRL+K
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((o) => !o);
        return;
      }

      // ? seul = ouvre la palette
      if (e.key === '?' && !e.metaKey && !e.ctrlKey) {
        e.preventDefault();
        setOpen(true);
        return;
      }

      // Vim g+[letter]
      if (gArmed) {
        clearG();
        const map: Record<string, string> = {
          h: '/',
          o: '/oeuvres',
          d: '/drops',
          u: '/univers',
          j: '/journal',
          a: '/atelier',
          c: '/compte',
          p: '/panier',
        };
        const dest = map[e.key.toLowerCase()];
        if (dest) {
          e.preventDefault();
          router.push(dest as never);
        }
        return;
      }
      if (e.key === 'g' && !e.metaKey && !e.ctrlKey && !e.altKey) {
        gArmed = true;
        gTimer = window.setTimeout(clearG, 900);
        return;
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      clearG();
    };
  }, [router]);

  const go = useCallback(
    (href: string) => {
      setOpen(false);
      router.push(href as never);
    },
    [router],
  );

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Palette de commandes"
          className="fixed inset-0 z-[var(--z-modal)] flex items-start justify-center bg-[var(--color-ink)]/80 p-6 pt-[12vh] backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={() => setOpen(false)}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.19, 1, 0.22, 1] }}
            className="relative w-full max-w-xl overflow-hidden rounded-sm border border-[var(--color-cream-100)] bg-[var(--color-ink)] text-[var(--color-cream)] shadow-[0_40px_120px_-30px_rgba(0,0,0,0.9)]"
          >
            <Command label="Palette de commandes" className="flex flex-col">
              <div className="flex items-center gap-4 border-b border-[var(--color-cream-100)] px-5 py-4">
                <span className="font-[var(--font-mono)] text-xs uppercase tracking-[0.3em] text-[var(--color-cream-600)]">
                  Cherche
                </span>
                <Command.Input
                  placeholder="œuvre, drop, personnage, article…"
                  className="flex-1 bg-transparent font-[var(--font-body)] text-lg text-[var(--color-cream)] outline-none placeholder:text-[var(--color-cream-400)]"
                  data-no-ripple=""
                />
                <span className="hidden items-center gap-1 font-[var(--font-mono)] text-[10px] uppercase tracking-[0.2em] text-[var(--color-cream-400)] md:flex">
                  <Kbd>esc</Kbd>
                  <span>fermer</span>
                </span>
              </div>

              <Command.List className="max-h-[60vh] overflow-y-auto px-2 py-3">
                <Command.Empty className="px-4 py-8 text-center font-[var(--font-mono)] text-sm text-[var(--color-cream-400)]">
                  Aucun résultat.
                </Command.Empty>

                <Command.Group
                  heading="Navigation"
                  className="[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:font-[var(--font-mono)] [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-[0.3em] [&_[cmdk-group-heading]]:text-[var(--color-cream-600)]"
                >
                  {NAV.map((d) => (
                    <PaletteItem key={d.href} onSelect={() => go(d.href)} label={d.label} hint="→" />
                  ))}
                </Command.Group>

                <Command.Group
                  heading="Œuvres"
                  className="[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:font-[var(--font-mono)] [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-[0.3em] [&_[cmdk-group-heading]]:text-[var(--color-cream-600)]"
                >
                  {artworks.slice(0, 6).map((a) => (
                    <PaletteItem
                      key={a.slug}
                      onSelect={() => go(`/oeuvres/${a.slug}`)}
                      label={a.title}
                      hint={a.type}
                    />
                  ))}
                </Command.Group>

                <Command.Group
                  heading="Drops"
                  className="[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:font-[var(--font-mono)] [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-[0.3em] [&_[cmdk-group-heading]]:text-[var(--color-cream-600)]"
                >
                  {drops.map((d) => (
                    <PaletteItem
                      key={d.slug}
                      onSelect={() => go(`/drops/${d.slug}`)}
                      label={d.title}
                      hint={d.status}
                    />
                  ))}
                </Command.Group>

                <Command.Group
                  heading="Personnages"
                  className="[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:font-[var(--font-mono)] [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-[0.3em] [&_[cmdk-group-heading]]:text-[var(--color-cream-600)]"
                >
                  {characters.map((c) => (
                    <PaletteItem
                      key={c.slug}
                      onSelect={() => go(`/univers/${c.slug}`)}
                      label={c.name}
                      hint={c.tagline}
                    />
                  ))}
                </Command.Group>

                <Command.Group
                  heading="Journal"
                  className="[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:font-[var(--font-mono)] [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-[0.3em] [&_[cmdk-group-heading]]:text-[var(--color-cream-600)]"
                >
                  {journalPosts.map((p) => (
                    <PaletteItem
                      key={p.slug}
                      onSelect={() => go(`/journal/${p.slug}`)}
                      label={p.title}
                      hint={p.category}
                    />
                  ))}
                </Command.Group>
              </Command.List>

              <div className="flex items-center gap-4 border-t border-[var(--color-cream-100)] px-5 py-3 font-[var(--font-mono)] text-[10px] uppercase tracking-[0.2em] text-[var(--color-cream-400)]">
                <span className="flex items-center gap-1">
                  <Kbd>g</Kbd> + <Kbd>o</Kbd> <span>œuvres</span>
                </span>
                <span className="flex items-center gap-1">
                  <Kbd>g</Kbd> + <Kbd>d</Kbd> <span>drops</span>
                </span>
                <span className="hidden items-center gap-1 md:flex">
                  <Kbd>g</Kbd> + <Kbd>u</Kbd> <span>univers</span>
                </span>
                <span className="ml-auto hidden items-center gap-1 md:flex">
                  <Kbd>?</Kbd> <span>aide</span>
                </span>
              </div>
            </Command>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function PaletteItem({
  label,
  hint,
  onSelect,
}: {
  label: string;
  hint?: string;
  onSelect: () => void;
}) {
  return (
    <Command.Item
      value={label + (hint ? ` ${hint}` : '')}
      onSelect={onSelect}
      className="flex cursor-pointer items-center justify-between gap-4 rounded-[2px] px-3 py-2.5 text-sm text-[var(--color-cream)] aria-selected:bg-[var(--color-cream-100)]"
    >
      <span className="truncate">{label}</span>
      {hint && (
        <span className="flex-shrink-0 font-[var(--font-mono)] text-[10px] uppercase tracking-[0.2em] text-[var(--color-cream-400)]">
          {hint}
        </span>
      )}
    </Command.Item>
  );
}

function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="rounded border border-[var(--color-cream-200)] bg-[var(--color-cream-100)] px-1.5 py-0.5 font-[var(--font-mono)] text-[9px] uppercase tracking-wider text-[var(--color-cream)]">
      {children}
    </kbd>
  );
}
