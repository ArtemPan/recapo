import { z } from "zod";

export const apiErrorCodeSchema = z.enum([
  "invalid_input",
  "too_long",
  "rate_limited",
  "busy",
  "payment_incomplete",
]);

export type ApiErrorCode = z.infer<typeof apiErrorCodeSchema>;

const apiErrorBodySchema = z.object({ error: apiErrorCodeSchema });

export function apiError(code: ApiErrorCode, status: number, headers?: HeadersInit) {
  return Response.json({ error: code }, { status, headers });
}

export function parseApiErrorCode(message: string): ApiErrorCode {
  try {
    const parsed = apiErrorBodySchema.safeParse(JSON.parse(message));
    return parsed.success ? parsed.data.error : "busy";
  } catch {
    return "busy";
  }
}
