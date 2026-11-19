import { Demo } from "@/components/demo/demo";

export function DemoSection() {
  return (
    <section id="demo" className="scroll-mt-20 py-20 sm:py-24">
      <div className="mx-auto w-full max-w-6xl px-4">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <p className="text-sm font-semibold text-accent">Live demo</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
            Try it on your own notes
          </h2>
          <p className="mt-3 text-muted">
            Paste a meeting transcript or load the sample. The recap streams in as the model
            writes it.
          </p>
        </div>
        <Demo />
      </div>
    </section>
  );
}
