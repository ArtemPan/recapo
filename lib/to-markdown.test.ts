import { describe, expect, it } from "vitest";
import { toMarkdown } from "./to-markdown";

const result = {
  summary: "Beta ships on Friday.",
  decisions: ["Ship onboarding v2"],
  actionItems: [
    { task: "Write notes | marketing", owner: "Anna", due: "Thursday", priority: "high" as const },
  ],
};

describe("toMarkdown", () => {
  it("renders summary, decisions and an action item table", () => {
    const markdown = toMarkdown(result);
    expect(markdown).toContain("# Meeting recap");
    expect(markdown).toContain("## Summary\n\nBeta ships on Friday.");
    expect(markdown).toContain("## Decisions\n\n- Ship onboarding v2");
    expect(markdown).toContain("| Task | Owner | Due | Priority |");
    expect(markdown).toContain("| Write notes \\| marketing | Anna | Thursday | high |");
  });

  it("marks empty lists", () => {
    const markdown = toMarkdown({ ...result, decisions: [], actionItems: [] });
    expect(markdown).toContain("## Decisions\n\n_None_");
    expect(markdown).toContain("## Action items\n\n_None_");
  });

  it("adds risks only when present", () => {
    expect(toMarkdown(result)).not.toContain("## Risks");
    expect(toMarkdown({ ...result, risks: ["QA may slip"] })).toContain(
      "## Risks and open questions\n\n- QA may slip",
    );
  });
});
