type Props = {
  notes: string;
  limit: number;
  isLoading: boolean;
  message: string | null;
  onChange: (notes: string) => void;
  onSample: () => void;
  onSubmit: () => void;
  onStop: () => void;
};

export function DemoInput({
  notes,
  limit,
  isLoading,
  message,
  onChange,
  onSample,
  onSubmit,
  onStop,
}: Props) {
  const length = notes.length;
  const overLimit = length > limit;
  const canSubmit = notes.trim().length > 0 && !overLimit && !isLoading;

  return (
    <form
      className="flex h-full flex-col gap-3"
      onSubmit={(event) => {
        event.preventDefault();
        if (canSubmit) onSubmit();
      }}
    >
      <div className="flex items-center justify-between">
        <label htmlFor="notes" className="text-sm font-medium">
          Meeting notes
        </label>
        <button
          type="button"
          onClick={onSample}
          className="text-sm font-medium text-accent underline-offset-4 hover:underline"
        >
          Use sample meeting
        </button>
      </div>

      <textarea
        id="notes"
        value={notes}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Paste notes, a transcript or a chat thread from your meeting..."
        className="min-h-72 flex-1 resize-y rounded-xl border border-border bg-background p-4 text-sm leading-relaxed outline-none focus:border-accent focus:ring-2 focus:ring-accent/30"
        aria-describedby="notes-help"
      />

      <div id="notes-help" className="flex items-center justify-between text-xs text-muted">
        <span>Don&apos;t paste confidential meetings.</span>
        <span className={overLimit ? "font-medium text-danger" : undefined}>
          {length.toLocaleString("en-GB")} / {limit.toLocaleString("en-GB")}
        </span>
      </div>

      {message ? (
        <p role="alert" className="text-sm text-danger">
          {message}
        </p>
      ) : null}

      {isLoading ? (
        <button
          type="button"
          onClick={onStop}
          className="rounded-xl border border-border px-4 py-2.5 text-sm font-semibold"
        >
          Stop
        </button>
      ) : (
        <button
          type="submit"
          disabled={!canSubmit}
          className="rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-accent-foreground transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
        >
          Analyse meeting
        </button>
      )}
    </form>
  );
}
