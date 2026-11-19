import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

const steps = [
  {
    title: "Paste",
    text: "Drop in meeting notes, a call transcript or a chat thread. Any language works.",
  },
  {
    title: "Analyse",
    text: "Recapo reads the conversation and separates real decisions from ideas that were only discussed.",
  },
  {
    title: "Share",
    text: "Copy the recap or export it to Markdown and send it to everyone who missed the call.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-20 border-y border-border bg-surface py-20 sm:py-24">
      <div className="mx-auto w-full max-w-6xl px-4">
        <SectionHeading eyebrow="How it works" title="From messy notes to a clear recap in three steps" />
        <ol className="grid gap-6 md:grid-cols-3">
          {steps.map((step, index) => (
            <li key={step.title}>
              <Reveal delay={index * 0.1} className="h-full rounded-2xl border border-border bg-background p-6">
                <span className="flex size-9 items-center justify-center rounded-full bg-accent-soft text-sm font-semibold text-accent">
                  {index + 1}
                </span>
                <h3 className="mt-4 font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{step.text}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
