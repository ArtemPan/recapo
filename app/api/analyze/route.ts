import { google } from "@ai-sdk/google";
import { Output, streamText } from "ai";
import { z } from "zod";
import { apiError } from "@/lib/api-error";
import { clientIp } from "@/lib/client-ip";
import { currentPlan } from "@/lib/current-plan";
import { getAiEnv } from "@/lib/env";
import { PLAN_LIMITS } from "@/lib/plan";
import { analysisInstructions } from "@/lib/prompt";
import { createRateLimiter } from "@/lib/rate-limit";
import { resultSchemaFor } from "@/lib/schema";

export const maxDuration = 60;

const bodySchema = z.object({ notes: z.string() });

const limiter = createRateLimiter({ limit: 10, windowMs: 10 * 60 * 1000 });

export async function POST(request: Request) {
  const env = getAiEnv();
  const body = bodySchema.safeParse(await request.json().catch(() => null));
  const notes = body.success ? body.data.notes.trim() : "";
  if (!notes) return apiError("invalid_input", 400);

  const plan = await currentPlan();
  if (notes.length > PLAN_LIMITS[plan]) return apiError("too_long", 413);

  const rate = limiter.check(clientIp(request));
  if (!rate.allowed) {
    return apiError("rate_limited", 429, { "Retry-After": String(rate.retryAfterSeconds) });
  }

  const result = streamText({
    model: google(env.GEMINI_MODEL),
    instructions: analysisInstructions(plan),
    prompt: notes,
    output: Output.object({ schema: resultSchemaFor(plan), name: "meeting_recap" }),
    maxRetries: 1,
    onError: ({ error }) => {
      console.error("analyze stream failed", error);
    },
  });

  return result.toTextStreamResponse();
}
