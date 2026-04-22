/**
 * Validation maison — léger, typé, sans dépendance.
 * Pour les cas où zod serait overkill (3 formulaires simples).
 */

export type ValidationResult<T> = { ok: true; data: T } | { ok: false; errors: string[] };

export function isEmail(value: unknown): value is string {
  return (
    typeof value === 'string' &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) &&
    value.length <= 320
  );
}

export function isNonEmptyString(value: unknown, max = 500): value is string {
  return typeof value === 'string' && value.trim().length > 0 && value.length <= max;
}

export function sanitizeText(value: unknown, max = 2000): string {
  if (typeof value !== 'string') return '';
  return value.trim().slice(0, max);
}
