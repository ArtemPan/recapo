import type { Priority } from "@/lib/schema";

const styles: Record<Priority, string> = {
  high: "bg-danger/10 text-danger",
  medium: "bg-warning/10 text-warning",
  low: "bg-success/10 text-success",
};

export function PriorityBadge({ priority }: { priority?: Priority }) {
  if (!priority) return null;
  return (
    <span
      className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium capitalize ${styles[priority]}`}
    >
      {priority}
    </span>
  );
}
