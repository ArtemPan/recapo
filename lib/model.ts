import { google } from "@ai-sdk/google";
import { APICallError, wrapLanguageModel, type LanguageModelMiddleware } from "ai";

const RETRYABLE_STATUS = new Set([404, 429, 500, 503]);
const PRIMARY_RESPONSE_TIMEOUT_MS = 15_000;

class PrimaryTimeoutError extends Error {}

function isRetryable(error: unknown) {
  if (error instanceof PrimaryTimeoutError) return true;
  return APICallError.isInstance(error) && RETRYABLE_STATUS.has(error.statusCode ?? 0);
}

function withTimeout<T>(promise: PromiseLike<T>, ms: number) {
  let timer: ReturnType<typeof setTimeout> | undefined;
  const timeout = new Promise<never>((_, reject) => {
    timer = setTimeout(() => reject(new PrimaryTimeoutError(`No response in ${ms}ms`)), ms);
  });
  return Promise.race([promise, timeout]).finally(() => clearTimeout(timer));
}

export function modelWithFallback(primaryId: string, fallbackId: string) {
  const primary = google(primaryId);
  if (primaryId === fallbackId) return primary;

  const fallback = google(fallbackId);
  const middleware: LanguageModelMiddleware = {
    wrapStream: async ({ doStream, params }) => {
      try {
        return await withTimeout(doStream(), PRIMARY_RESPONSE_TIMEOUT_MS);
      } catch (error) {
        if (!isRetryable(error)) throw error;
        console.warn(`${primaryId} unavailable, falling back to ${fallbackId}`);
        return fallback.doStream(params);
      }
    },
  };

  return wrapLanguageModel({ model: primary, middleware });
}
