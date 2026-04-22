'use client';

import Script from 'next/script';
import { useEffect, useRef, useState } from 'react';

type Props = {
  siteKey?: string;
  onToken: (token: string) => void;
  onExpired?: () => void;
  theme?: 'dark' | 'light';
  size?: 'normal' | 'compact' | 'invisible';
};

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: string | HTMLElement,
        options: {
          sitekey: string;
          callback?: (token: string) => void;
          'expired-callback'?: () => void;
          theme?: 'dark' | 'light' | 'auto';
          size?: 'normal' | 'compact' | 'invisible';
        },
      ) => string | undefined;
      remove: (widgetId: string) => void;
      reset: (widgetId?: string) => void;
    };
    onloadTurnstile?: () => void;
  }
}

/**
 * Cloudflare Turnstile — protection bot non-intrusive, lazy-loaded.
 * N'affiche rien si NEXT_PUBLIC_TURNSTILE_SITE_KEY absent (dev/dégradé).
 * Usage typique : <TurnstileWidget siteKey={...} onToken={(t) => setToken(t)} />
 */
export function TurnstileWidget({
  siteKey: siteKeyProp,
  onToken,
  onExpired,
  theme = 'dark',
  size = 'normal',
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | undefined>(undefined);
  const [ready, setReady] = useState(false);

  const siteKey = siteKeyProp ?? process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  useEffect(() => {
    if (!siteKey || !ready || !containerRef.current) return;
    if (!window.turnstile) return;

    widgetIdRef.current = window.turnstile.render(containerRef.current, {
      sitekey: siteKey,
      callback: (token: string) => onToken(token),
      'expired-callback': () => onExpired?.(),
      theme,
      size,
    });

    const widgetId = widgetIdRef.current;
    return () => {
      if (widgetId && window.turnstile) {
        try {
          window.turnstile.remove(widgetId);
        } catch {
          // Widget déjà nettoyé.
        }
      }
    };
  }, [siteKey, ready, theme, size, onToken, onExpired]);

  if (!siteKey) {
    return (
      <p className="font-[var(--font-mono)] text-[10px] uppercase tracking-[0.2em] text-[var(--color-cream-400)]">
        Anti-bot désactivé (Turnstile non configuré)
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="lazyOnload"
        onLoad={() => setReady(true)}
      />
      <div ref={containerRef} className="min-h-[70px]" />
    </div>
  );
}
