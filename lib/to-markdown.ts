import type { ActionItem, AnalysisResult } from "./schema";

const NONE = "_None_";

function escapeCell(value: string) {
  return value.replaceAll("|", "\\|").replaceAll("\n", " ");
}

function list(items: string[]) {
  return items.length ? items.map((item) => `- ${item}`).join("\n") : NONE;
}

function table(items: ActionItem[]) {
  if (!items.length) return NONE;
  const rows = items.map(
    ({ task, owner, due, priority }) =>
      `| ${[task, owner, due, priority].map(escapeCell).join(" | ")} |`,
  );
  return ["| Task | Owner | Due | Priority |", "| --- | --- | --- | --- |", ...rows].join("\n");
}

export function toMarkdown(result: AnalysisResult) {
  const sections = [
    "# Meeting recap",
    `## Summary\n\n${result.summary}`,
    `## Decisions\n\n${list(result.decisions)}`,
    `## Action items\n\n${table(result.actionItems)}`,
  ];
  if (result.risks?.length) {
    sections.push(`## Risks and open questions\n\n${list(result.risks)}`);
  }
  return `${sections.join("\n\n")}\n`;
}
