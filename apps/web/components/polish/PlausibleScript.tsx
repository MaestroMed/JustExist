import Script from 'next/script';

/**
 * Plausible Analytics — no cookie, GDPR-friendly, self-hosted chez plausible.io.
 * N'injecte le script que si NEXT_PUBLIC_PLAUSIBLE_DOMAIN défini.
 * Défère (lazyOnload) pour ne pas peser sur le LCP.
 */
export function PlausibleScript() {
  const domain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
  if (!domain) return null;
  return (
    <Script
      defer
      src="https://plausible.io/js/script.js"
      data-domain={domain}
      strategy="afterInteractive"
    />
  );
}
