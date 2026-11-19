import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

const features = [
  {
    title: "Decisions, not noise",
    text: "Only what the group actually agreed on makes it into the decisions list.",
    icon: "M5 12l4 4L19 6",
  },
  {
    title: "Owners and due dates",
    text: "Every task gets an owner and a deadline, or a clear flag when nobody took it.",
    icon: "M12 12a4 4 0 100-8 4 4 0 000 8zm-7 8a7 7 0 0114 0",
  },
  {
    title: "Live streaming",
    text: "The recap appears section by section while the model is still writing.",
    icon: "M4 12h4l3-7 4 14 3-7h2",
  },
  {
    title: "Risks surfaced",
    text: "Pro highlights blockers and open questions that were raised but never resolved.",
    icon: "M12 4l9 16H3L12 4zm0 6v4m0 3v.5",
  },
  {
    title: "Any language",
    text: "Recaps are written in the same language as your notes.",
    icon: "M4 6h10M9 4v2c0 5-3 9-5 10m3-6c2 3 5 5 8 5m-1 3l4-9 4 9m-7-3h6",
  },
  {
    title: "Markdown export",
    text: "Paste into Notion, Linear, GitHub or Slack without fixing the formatting.",
    icon: "M4 6h16v12H4zM7 15V9l2.5 3L12 9v6m3-2l2 2 2-2m-2 2V9",
  },
];

export function Features() {
  return (
    <section id="features" className="scroll-mt-20 py-20 sm:py-24">
      <div className="mx-auto w-full max-w-6xl px-4">
        <SectionHeading
          eyebrow="Features"
          title="Everything you need after a meeting"
          description="Built for the person who always ends up writing the follow-up email."
        />
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <li key={feature.title}>
              <Reveal delay={(index % 3) * 0.08} className="h-full rounded-2xl border border-border bg-surface p-6">
                <span className="flex size-10 items-center justify-center rounded-xl bg-accent-soft text-accent">
                  <svg viewBox="0 0 24 24" className="size-5" aria-hidden>
                    <path
                      d={feature.icon}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <h3 className="mt-4 font-semibold">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{feature.text}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
