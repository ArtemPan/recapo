import { describe, expect, it } from "vitest";
import { freeResultSchema, proResultSchema, resultSchemaFor } from "./schema";

const validFree = {
  summary: "The team agreed to ship the beta on Friday.",
  decisions: ["Ship the beta on Friday"],
  actionItems: [
    { task: "Prepare release notes", owner: "Anna", due: "Thursday", priority: "high" },
    { task: "Update the pricing page", owner: "Unassigned", due: "Not set", priority: "low" },
  ],
};

describe("freeResultSchema", () => {
  it("accepts a complete result", () => {
    expect(freeResultSchema.safeParse(validFree).success).toBe(true);
  });

  it("rejects a result without a summary", () => {
    expect(freeResultSchema.safeParse({ ...validFree, summary: undefined }).success).toBe(false);
  });

  it("rejects an unknown priority", () => {
    const result = {
      ...validFree,
      actionItems: [{ task: "Fix login", owner: "Max", due: "Monday", priority: "urgent" }],
    };
    expect(freeResultSchema.safeParse(result).success).toBe(false);
  });

  it("accepts empty decisions and action items", () => {
    expect(
      freeResultSchema.safeParse({ ...validFree, decisions: [], actionItems: [] }).success,
    ).toBe(true);
  });
});

describe("proResultSchema", () => {
  it("requires risks", () => {
    expect(proResultSchema.safeParse(validFree).success).toBe(false);
    expect(
      proResultSchema.safeParse({ ...validFree, risks: ["Beta date depends on QA"] }).success,
    ).toBe(true);
  });
});

describe("resultSchemaFor", () => {
  it("returns the schema for each plan", () => {
    expect(resultSchemaFor("free")).toBe(freeResultSchema);
    expect(resultSchemaFor("pro")).toBe(proResultSchema);
  });
});
