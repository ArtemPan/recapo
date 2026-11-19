import { jwtVerify, SignJWT } from "jose";
import type { Plan } from "./plan";

export const PLAN_TOKEN_TTL_SECONDS = 60 * 60 * 24;

const ALGORITHM = "HS256";

function keyFrom(secret: string) {
  return new TextEncoder().encode(secret);
}

function toSeconds(date: Date) {
  return Math.floor(date.getTime() / 1000);
}

export async function signPlanToken(sessionId: string, secret: string, now = new Date()) {
  const issuedAt = toSeconds(now);
  return new SignJWT({ plan: "pro", sid: sessionId })
    .setProtectedHeader({ alg: ALGORITHM })
    .setIssuedAt(issuedAt)
    .setExpirationTime(issuedAt + PLAN_TOKEN_TTL_SECONDS)
    .sign(keyFrom(secret));
}

export async function verifyPlanToken(
  token: string | undefined,
  secret: string,
  now = new Date(),
): Promise<Plan> {
  if (!token) return "free";
  try {
    const { payload } = await jwtVerify(token, keyFrom(secret), {
      algorithms: [ALGORITHM],
      currentDate: now,
    });
    return payload.plan === "pro" ? "pro" : "free";
  } catch {
    return "free";
  }
}
