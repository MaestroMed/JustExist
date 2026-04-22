/**
 * Rate-limiter in-memory simple (token bucket par IP).
 * En prod on passera sur Upstash Redis ou Cloudflare Rate Limiting.
 */

type Bucket = { tokens: number; last: number };
const buckets = new Map<string, Bucket>();

export function hitRateLimit({
  key,
  capacity = 5,
  refillPerMinute = 5,
}: {
  key: string;
  capacity?: number;
  refillPerMinute?: number;
}): { ok: boolean; remaining: number; retryAfterMs: number } {
  const now = Date.now();
  const existing = buckets.get(key);
  const refillRate = refillPerMinute / 60_000;

  let bucket: Bucket;
  if (!existing) {
    bucket = { tokens: capacity - 1, last: now };
    buckets.set(key, bucket);
    return { ok: true, remaining: bucket.tokens, retryAfterMs: 0 };
  }

  const elapsed = now - existing.last;
  const refilled = Math.min(capacity, existing.tokens + elapsed * refillRate);
  if (refilled >= 1) {
    bucket = { tokens: refilled - 1, last: now };
    buckets.set(key, bucket);
    return { ok: true, remaining: Math.floor(bucket.tokens), retryAfterMs: 0 };
  }
  const retryAfterMs = (1 - refilled) / refillRate;
  return { ok: false, remaining: 0, retryAfterMs: Math.ceil(retryAfterMs) };
}

export function getClientKey(headers: Headers): string {
  return (
    headers.get('cf-connecting-ip') ??
    headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    headers.get('x-real-ip') ??
    'unknown'
  );
}
