import { Demo } from "@/components/demo/demo";
import { SectionHeading } from "@/components/ui/section-heading";

export function DemoSection() {
  return (
    <section id="demo" className="scroll-mt-20 py-20 sm:py-24">
      <div className="mx-auto w-full max-w-6xl px-4">
        <SectionHeading
          eyebrow="Live demo"
          title="Try it on your own notes"
          description="Paste a meeting transcript or load the sample. The recap streams in as the model writes it."
        />
        <Demo />
      </div>
    </section>
  );
}
