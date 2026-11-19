"use client";

import { useObject } from "@ai-sdk/react";
import type { DeepPartial } from "ai";
import { useState } from "react";
import { usePlan } from "@/components/plan/plan-provider";
import { parseApiErrorCode, type ApiErrorCode } from "@/lib/api-error";
import { PLAN_LIMITS } from "@/lib/plan";
import { sampleNotes, sampleResult } from "@/lib/sample";
import { resultSchemaFor, type AnalysisResult } from "@/lib/schema";
import { DemoInput } from "./demo-input";
import { DemoResult } from "./demo-result";
import { ResultActions } from "./result-actions";

const inputMessages: Partial<Record<ApiErrorCode, (limit: number) => string>> = {
  invalid_input: () => "Paste some meeting notes first.",
  too_long: (limit) =>
    `Your notes are over the ${limit.toLocaleString("en-GB")} character limit for your plan.`,
  rate_limited: () => "Too many analyses in a short time. Try again in a few minutes.",
};

export function Demo() {
  const { plan } = usePlan();
  const limit = PLAN_LIMITS[plan];
  const isPro = plan === "pro";
  const [notes, setNotes] = useState("");
  const [failure, setFailure] = useState<ApiErrorCode | null>(null);

  const { object, submit, isLoading, stop } = useObject({
    api: "/api/analyze",
    schema: resultSchemaFor(plan),
    onError: (error) => setFailure(parseApiErrorCode(error.message)),
    onFinish: ({ error }) => {
      if (error) setFailure("busy");
    },
  });

  const streamed = object as DeepPartial<AnalysisResult> | undefined;
  const failedEarly = failure === "busy" && !streamed?.summary;
  const stoppedMidway = failure === "busy" && Boolean(streamed?.summary);
  const shown: DeepPartial<AnalysisResult> | undefined = failedEarly
    ? { ...sampleResult, risks: isPro ? sampleResult.risks : undefined }
    : streamed;
  const complete = resultSchemaFor(plan).safeParse(shown);
  const inputMessage = failure ? (inputMessages[failure]?.(limit) ?? null) : null;

  function analyse() {
    setFailure(null);
    submit({ notes });
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="rounded-2xl border border-border bg-surface p-5 sm:p-6">
        <DemoInput
          notes={notes}
          limit={limit}
          isLoading={isLoading}
          message={inputMessage}
          onChange={setNotes}
          onSample={() => setNotes(sampleNotes)}
          onSubmit={analyse}
          onStop={stop}
        />
      </div>

      <div className="rounded-2xl border border-border bg-surface p-5 sm:p-6">
        <div className="mb-5 flex items-center justify-between gap-3">
          <h3 className="font-semibold">Recap</h3>
          <span className="rounded-full bg-accent-soft px-2.5 py-0.5 text-xs font-medium text-accent">
            {isPro ? "Pro" : "Free"}
          </span>
        </div>

        {failedEarly ? (
          <p className="mb-5 rounded-xl bg-warning/10 p-3 text-sm text-warning">
            The demo is busy right now, so here is a sample result.
          </p>
        ) : null}

        {stoppedMidway ? (
          <div className="mb-5 flex items-center justify-between gap-3 rounded-xl bg-warning/10 p-3 text-sm text-warning">
            <span>The analysis stopped early.</span>
            <button type="button" onClick={analyse} className="font-semibold underline">
              Try again
            </button>
          </div>
        ) : null}

        {shown || isLoading ? (
          <DemoResult result={shown} isLoading={isLoading} showRisks={isPro} />
        ) : (
          <p className="py-16 text-center text-sm text-muted">
            Your summary, decisions and action items will appear here.
          </p>
        )}

        {complete.success && !isLoading ? (
          <div className="mt-6 border-t border-border pt-4">
            <ResultActions result={complete.data} canExport={isPro} />
          </div>
        ) : null}
      </div>
    </div>
  );
}
