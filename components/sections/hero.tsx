import { RecapPreview } from "@/components/hero/recap-preview";

export function Hero() {
  return (
    <section className="overflow-hidden pb-16 pt-16 sm:pb-24 sm:pt-24">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-14 px-4 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <p className="inline-flex rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-muted">
            AI meeting recaps
          </p>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
            <span className="block">Meeting notes in.</span>
            <span className="block">Decisions and action items out.</span>
          </h1>
          <p className="mt-5 max-w-xl text-lg text-pretty text-muted">
            Paste notes, a call transcript or a Slack thread. Recapo pulls out what was decided,
            who owns what and when it is due, in seconds.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#demo"
              className="rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground"
            >
              Try the live demo
            </a>
            <a
              href="#pricing"
              className="rounded-xl border border-border px-5 py-3 text-sm font-semibold hover:bg-surface"
            >
              See pricing
            </a>
          </div>
          <p className="mt-4 text-sm text-muted">No sign-up needed.</p>
        </div>
        <RecapPreview />
      </div>
    </section>
  );
}
