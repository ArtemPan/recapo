type RateLimitOptions = {
  limit: number;
  windowMs: number;
};

export type RateLimitResult = {
  allowed: boolean;
  retryAfterSeconds: number;
};

export function createRateLimiter({ limit, windowMs }: RateLimitOptions) {
  const hits = new Map<string, number[]>();

  function check(key: string, now = Date.now()): RateLimitResult {
    const recent = (hits.get(key) ?? []).filter((time) => time > now - windowMs);

    if (recent.length >= limit) {
      hits.set(key, recent);
      const oldest = recent[0] ?? now;
      return {
        allowed: false,
        retryAfterSeconds: Math.ceil((oldest + windowMs - now) / 1000),
      };
    }

    recent.push(now);
    hits.set(key, recent);
    return { allowed: true, retryAfterSeconds: 0 };
  }

  return { check };
}
