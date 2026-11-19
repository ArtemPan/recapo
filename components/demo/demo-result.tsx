import type { DeepPartial } from "ai";
import type { AnalysisResult } from "@/lib/schema";
import { ActionItemsTable } from "./action-items-table";

type Props = {
  result: DeepPartial<AnalysisResult> | undefined;
  isLoading: boolean;
  showRisks: boolean;
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-2">
      <h3 className="text-xs font-semibold uppercase tracking-wide text-muted">{title}</h3>
      {children}
    </section>
  );
}

function Skeleton() {
  return (
    <div className="space-y-2" aria-hidden>
      <div className="h-3 w-full animate-pulse rounded bg-border" />
      <div className="h-3 w-4/5 animate-pulse rounded bg-border" />
    </div>
  );
}

function BulletList({ items }: { items: (string | undefined)[] | undefined }) {
  const visible = (items ?? []).filter((item): item is string => Boolean(item));
  if (!visible.length) return <p className="text-sm text-muted">None.</p>;
  return (
    <ul className="list-disc space-y-1 pl-5 text-sm">
      {visible.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}

export function DemoResult({ result, isLoading, showRisks }: Props) {
  const waiting = (value: unknown) => isLoading && value === undefined;

  return (
    <div className="space-y-6" aria-live="polite" aria-busy={isLoading}>
      <Section title="Summary">
        {waiting(result?.summary) ? <Skeleton /> : <p className="text-sm leading-relaxed">{result?.summary}</p>}
      </Section>

      <Section title="Decisions">
        {waiting(result?.decisions) ? <Skeleton /> : <BulletList items={result?.decisions} />}
      </Section>

      <Section title="Action items">
        {waiting(result?.actionItems) ? (
          <Skeleton />
        ) : (
          <ActionItemsTable items={result?.actionItems ?? []} />
        )}
      </Section>

      {showRisks ? (
        <Section title="Risks and open questions">
          {waiting(result?.risks) ? <Skeleton /> : <BulletList items={result?.risks} />}
        </Section>
      ) : (
        <a
          href="#pricing"
          className="block rounded-xl border border-dashed border-border p-4 text-sm text-muted hover:border-accent"
        >
          <span className="font-medium text-foreground">Risks and open questions</span> are
          included in Pro. See pricing.
        </a>
      )}
    </div>
  );
}
