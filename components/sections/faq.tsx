import { SectionHeading } from "@/components/ui/section-heading";

const questions = [
  {
    q: "Is Recapo a real product?",
    a: "Recapo is a portfolio project. The AI demo is real and runs on Google Gemini, and the checkout is a real Stripe flow in test mode, so no money is ever charged.",
  },
  {
    q: "Do you store my meeting notes?",
    a: "No. Notes are sent to the model for analysis and are not saved by Recapo. The demo uses Gemini's free tier, where Google may use inputs to improve its models, so please don't paste confidential meetings.",
  },
  {
    q: "What can I paste?",
    a: "Typed notes, transcripts from Zoom, Google Meet or Teams, and Slack or email threads all work. Free recaps take up to 4,000 characters, Pro up to 20,000.",
  },
  {
    q: "Which languages are supported?",
    a: "The recap is written in the same language as your notes, including English, Polish, Ukrainian, German and Spanish.",
  },
  {
    q: "How do I try Pro?",
    a: "Click Upgrade in the pricing section and pay with the Stripe test card 4242 4242 4242 4242, any future date and any CVC. Pro unlocks in this browser for 24 hours.",
  },
];

export function Faq() {
  return (
    <section id="faq" className="scroll-mt-20 border-t border-border py-20 sm:py-24">
      <div className="mx-auto w-full max-w-3xl px-4">
        <SectionHeading eyebrow="FAQ" title="Questions people ask" />
        <div className="divide-y divide-border rounded-2xl border border-border bg-surface">
          {questions.map((item) => (
            <details key={item.q} className="group p-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium [&::-webkit-details-marker]:hidden">
                {item.q}
                <span
                  aria-hidden
                  className="text-xl leading-none text-muted transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-muted">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
