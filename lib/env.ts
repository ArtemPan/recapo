import { z } from "zod";

const aiEnvSchema = z.object({
  GOOGLE_GENERATIVE_AI_API_KEY: z.string().min(1),
  GEMINI_MODEL: z.string().min(1).default("gemini-flash-lite-latest"),
  GEMINI_FALLBACK_MODEL: z.string().min(1).default("gemini-3.1-flash-lite"),
});

const stripeEnvSchema = z.object({
  STRIPE_SECRET_KEY: z.string().startsWith("sk_test_"),
  NEXT_PUBLIC_SITE_URL: z.url(),
});

const planEnvSchema = z.object({
  PLAN_TOKEN_SECRET: z.string().min(32),
});

function readEnv<T extends z.ZodType>(schema: T): z.infer<T> {
  const parsed = schema.safeParse(process.env);
  if (!parsed.success) {
    const fields = parsed.error.issues.map((issue) => issue.path.join(".")).join(", ");
    throw new Error(`Invalid or missing environment variables: ${fields}`);
  }
  return parsed.data;
}

export const getAiEnv = () => readEnv(aiEnvSchema);
export const getStripeEnv = () => readEnv(stripeEnvSchema);
export const getPlanEnv = () => readEnv(planEnvSchema);
