import { cookies } from "next/headers";
import { z } from "zod";
import { apiError } from "@/lib/api-error";
import { getPlanEnv } from "@/lib/env";
import { PLAN_COOKIE } from "@/lib/plan";
import { PLAN_TOKEN_TTL_SECONDS, signPlanToken } from "@/lib/plan-token";
import { getStripe } from "@/lib/stripe";

const bodySchema = z.object({ sessionId: z.string().startsWith("cs_") });

export async function POST(request: Request) {
  const body = bodySchema.safeParse(await request.json().catch(() => null));
  if (!body.success) return apiError("invalid_input", 400);

  const session = await getStripe()
    .checkout.sessions.retrieve(body.data.sessionId)
    .catch(() => null);
  if (session?.status !== "complete") return apiError("payment_incomplete", 402);

  const token = await signPlanToken(session.id, getPlanEnv().PLAN_TOKEN_SECRET);
  const cookieStore = await cookies();
  cookieStore.set(PLAN_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: PLAN_TOKEN_TTL_SECONDS,
  });

  return Response.json({ plan: "pro" });
}
