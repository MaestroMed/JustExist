'use client';

import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';

type Section = { id: string; label: string };

/**
 * Navigation flottante à droite de la homepage — un dot par scène.
 * Active le dot de la section en vue via IntersectionObserver.
 * Clic = scroll smooth vers la section.
 * Mobile : masqué (la nav top-bar suffit).
 */
export function HomeScrollNav({ sections }: { sections: Section[] }) {
  const [activeId, setActiveId] = useState<string | null>(sections[0]?.id ?? null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const observers: IntersectionObserver[] = [];
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (!el) return;
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio > 0.35) {
              setActiveId(s.id);
            }
          });
        },
        { threshold: [0.35, 0.7] },
      );
      observer.observe(el);
      observers.push(observer);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [sections]);

  function scrollTo(id: string) {
    const el = document.getElementById(id);
    if (!el) return;
    if (reduce) {
      el.scrollIntoView({ behavior: 'auto', block: 'start' });
    } else {
      const lenis = (window as unknown as { __lenis?: { scrollTo: (t: HTMLElement) => void } })
        .__lenis;
      if (lenis) lenis.scrollTo(el);
      else el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  return (
    <nav
      aria-label="Navigation des scènes"
      className="pointer-events-none fixed right-6 top-1/2 z-[var(--z-sticky)] hidden -translate-y-1/2 md:block"
    >
      <ul className="pointer-events-auto flex flex-col gap-3">
        {sections.map((s) => {
          const isActive = s.id === activeId;
          return (
            <li key={s.id} className="relative flex items-center">
              <button
                type="button"
                onClick={() => scrollTo(s.id)}
                aria-current={isActive ? 'true' : undefined}
                aria-label={s.label}
                className="group flex items-center gap-3"
                data-cursor="link"
                data-cursor-label={s.label}
                data-no-ripple=""
              >
                <motion.span
                  className="block h-[2px] origin-right bg-[var(--color-cream)] opacity-0 transition-opacity group-hover:opacity-100"
                  animate={{
                    width: isActive ? 34 : 0,
                    opacity: isActive ? 1 : 0,
                  }}
                  transition={{ duration: 0.35, ease: [0.19, 1, 0.22, 1] }}
                />
                <span
                  className={`font-[var(--font-mono)] text-[10px] uppercase tracking-[0.25em] transition-colors ${
                    isActive ? 'text-[var(--color-cream)]' : 'text-transparent group-hover:text-[var(--color-cream-600)]'
                  }`}
                  aria-hidden="true"
                >
                  {s.label}
                </span>
                <motion.span
                  className={`block rounded-full ${isActive ? 'bg-[var(--color-blood)]' : 'bg-[var(--color-cream-400)]'}`}
                  animate={{
                    width: isActive ? 10 : 5,
                    height: isActive ? 10 : 5,
                  }}
                  transition={{ duration: 0.35, ease: [0.19, 1, 0.22, 1] }}
                />
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
