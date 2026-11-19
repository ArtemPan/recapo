import { describe, expect, it } from "vitest";
import { PLAN_TOKEN_TTL_SECONDS, signPlanToken, verifyPlanToken } from "./plan-token";

const secret = "test-secret-that-is-long-enough-for-hs256";
const now = new Date("2026-11-19T12:00:00Z");

describe("plan token", () => {
  it("round-trips a pro plan", async () => {
    const token = await signPlanToken("cs_test_123", secret, now);
    expect(await verifyPlanToken(token, secret, now)).toBe("pro");
  });

  it("falls back to free for a token signed with another secret", async () => {
    const token = await signPlanToken("cs_test_123", "another-secret-that-is-also-long-enough", now);
    expect(await verifyPlanToken(token, secret, now)).toBe("free");
  });

  it("falls back to free for a tampered token", async () => {
    const token = await signPlanToken("cs_test_123", secret, now);
    const tampered = `${token.slice(0, -2)}xx`;
    expect(await verifyPlanToken(tampered, secret, now)).toBe("free");
  });

  it("falls back to free once the token has expired", async () => {
    const token = await signPlanToken("cs_test_123", secret, now);
    const later = new Date(now.getTime() + (PLAN_TOKEN_TTL_SECONDS + 1) * 1000);
    expect(await verifyPlanToken(token, secret, later)).toBe("free");
  });

  it("falls back to free for a missing or malformed token", async () => {
    expect(await verifyPlanToken(undefined, secret, now)).toBe("free");
    expect(await verifyPlanToken("not-a-token", secret, now)).toBe("free");
  });
});
