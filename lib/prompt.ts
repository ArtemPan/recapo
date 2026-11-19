import type { Plan } from "./plan";

const baseInstructions = `You turn raw meeting notes or chat transcripts into a clear recap for people who missed the meeting.

Rules:
- Use only what is in the notes. Never invent names, dates or decisions.
- Write in the same language as the notes.
- A decision is something the group agreed on, not an idea that was only discussed.
- An action item is a concrete task someone should do after the meeting. Merge duplicates.
- If the owner of a task is not clear, use "Unassigned". If there is no deadline, use "Not set".
- Include tasks that were mentioned but nobody took on yet, with the owner "Unassigned".
- Keep the summary to two or three short sentences.
- If the text is not a meeting or conversation, return a summary saying so and empty lists.`;

const proInstructions = `
- Also list risks, blockers and open questions that were raised but not resolved.`;

export function analysisInstructions(plan: Plan) {
  return plan === "pro" ? baseInstructions + proInstructions : baseInstructions;
}
