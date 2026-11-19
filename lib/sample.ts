import type { ProResult } from "./schema";

export const sampleNotes = `Weekly product sync, Tuesday

Anna (PM): Beta launch is still planned for Friday. Marketing needs the release notes by Thursday noon.
Tom (backend): The payment webhook retries are fixed, but load testing hasn't been done yet. I can run it tomorrow.
Lena (design): New onboarding screens are ready in Figma. I still need feedback on the empty states.
Anna: OK, let's agree we ship onboarding v2 with the beta and keep the old pricing page for now.
Tom: If load testing fails we might need to push the launch. Also, who is updating the status page?
Anna: I'll write the release notes. Lena, can you share the empty states with Mark by Wednesday?
Lena: Sure.
Mark (frontend): I'll pick up the onboarding implementation, should be done Thursday.
Nobody volunteered for the status page yet.`;

export const sampleResult: ProResult = {
  summary:
    "The team confirmed the beta launch for Friday, shipping onboarding v2 and keeping the current pricing page. Load testing and the status page update are still open.",
  decisions: [
    "Launch the beta on Friday",
    "Ship onboarding v2 with the beta",
    "Keep the current pricing page for now",
  ],
  actionItems: [
    { task: "Write the release notes for marketing", owner: "Anna", due: "Thursday noon", priority: "high" },
    { task: "Run load testing on payment webhooks", owner: "Tom", due: "Wednesday", priority: "high" },
    { task: "Share empty state designs with Mark", owner: "Lena", due: "Wednesday", priority: "medium" },
    { task: "Implement onboarding v2", owner: "Mark", due: "Thursday", priority: "high" },
    { task: "Update the status page", owner: "Unassigned", due: "Not set", priority: "low" },
  ],
  risks: [
    "Launch may slip if load testing fails",
    "Nobody owns the status page update",
    "Feedback on empty states is still pending",
  ],
};
