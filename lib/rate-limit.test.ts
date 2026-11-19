import { describe, expect, it } from "vitest";
import { createRateLimiter } from "./rate-limit";

const windowMs = 10 * 60 * 1000;

describe("createRateLimiter", () => {
  it("allows requests up to the limit and blocks the next one", () => {
    const limiter = createRateLimiter({ limit: 3, windowMs });
    const start = 1_000_000;
    expect(limiter.check("1.1.1.1", start).allowed).toBe(true);
    expect(limiter.check("1.1.1.1", start + 1).allowed).toBe(true);
    expect(limiter.check("1.1.1.1", start + 2).allowed).toBe(true);
    const blocked = limiter.check("1.1.1.1", start + 3);
    expect(blocked.allowed).toBe(false);
    expect(blocked.retryAfterSeconds).toBe(600);
  });

  it("tracks each key separately", () => {
    const limiter = createRateLimiter({ limit: 1, windowMs });
    expect(limiter.check("a", 0).allowed).toBe(true);
    expect(limiter.check("b", 0).allowed).toBe(true);
    expect(limiter.check("a", 1).allowed).toBe(false);
  });

  it("allows requests again once the oldest one leaves the window", () => {
    const limiter = createRateLimiter({ limit: 2, windowMs });
    limiter.check("a", 0);
    limiter.check("a", 1000);
    expect(limiter.check("a", 2000).allowed).toBe(false);
    expect(limiter.check("a", windowMs).allowed).toBe(true);
    expect(limiter.check("a", windowMs + 1).allowed).toBe(false);
  });

  it("does not count blocked requests", () => {
    const limiter = createRateLimiter({ limit: 1, windowMs });
    limiter.check("a", 0);
    limiter.check("a", 100);
    limiter.check("a", 200);
    expect(limiter.check("a", windowMs).allowed).toBe(true);
  });
});
