export function DemoPlaceholder() {
  return (
    <div className="grid gap-6 lg:grid-cols-2" aria-hidden>
      <div className="min-h-[30rem] rounded-2xl border border-border bg-surface p-5 sm:p-6">
        <div className="h-4 w-32 rounded bg-border" />
        <div className="mt-4 h-72 rounded-xl border border-border bg-background" />
        <div className="mt-12 h-10 rounded-xl bg-accent/40" />
      </div>
      <div className="min-h-[30rem] rounded-2xl border border-border bg-surface p-5 sm:p-6">
        <div className="h-4 w-20 rounded bg-border" />
      </div>
    </div>
  );
}
