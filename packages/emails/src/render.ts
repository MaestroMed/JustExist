import { render } from '@react-email/render';
import type { ReactElement } from 'react';

/**
 * Rend un template React Email en HTML + plain text.
 * Usage côté serveur (Resend `html` + `text` fields).
 */
export async function renderEmail(element: ReactElement): Promise<{ html: string; text: string }> {
  const [html, text] = await Promise.all([
    render(element),
    render(element, { plainText: true }),
  ]);
  return { html, text };
}
