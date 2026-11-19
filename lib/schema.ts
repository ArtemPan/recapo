import { z } from "zod";
import type { Plan } from "./plan";

export const prioritySchema = z
  .enum(["high", "medium", "low"])
  .describe("high if it blocks other work or has a close deadline, low if it is optional");

export const actionItemSchema = z.object({
  task: z.string().min(1).describe("What needs to be done, as a short imperative sentence"),
  owner: z
    .string()
    .min(1)
    .describe('Name of the person responsible, or "Unassigned" if the notes do not say'),
  due: z
    .string()
    .min(1)
    .describe('Deadline as written in the notes, or "Not set" if there is none'),
  priority: prioritySchema,
});

export const freeResultSchema = z.object({
  summary: z
    .string()
    .min(1)
    .describe("Two or three plain sentences on what the meeting was about and its outcome"),
  decisions: z
    .array(z.string().min(1))
    .describe("Decisions the participants actually agreed on, one per item"),
  actionItems: z
    .array(actionItemSchema)
    .describe("Concrete follow-up tasks mentioned in the meeting"),
});

export const proResultSchema = freeResultSchema.extend({
  risks: z
    .array(z.string().min(1))
    .describe("Risks, blockers and open questions that were raised but not resolved"),
});

export type Priority = z.infer<typeof prioritySchema>;
export type ActionItem = z.infer<typeof actionItemSchema>;
export type FreeResult = z.infer<typeof freeResultSchema>;
export type ProResult = z.infer<typeof proResultSchema>;
export type AnalysisResult = FreeResult & Partial<Pick<ProResult, "risks">>;

export function resultSchemaFor(plan: Plan) {
  return plan === "pro" ? proResultSchema : freeResultSchema;
}
