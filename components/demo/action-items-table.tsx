import type { DeepPartial } from "ai";
import type { ActionItem } from "@/lib/schema";
import { PriorityBadge } from "./priority-badge";

type Props = {
  items: (DeepPartial<ActionItem> | undefined)[];
};

export function ActionItemsTable({ items }: Props) {
  const visible = items.filter((item): item is DeepPartial<ActionItem> => Boolean(item?.task));

  if (!visible.length) {
    return <p className="text-sm text-muted">No action items found.</p>;
  }

  return (
    <>
      <table className="hidden w-full text-left text-sm md:table">
        <thead className="text-xs uppercase tracking-wide text-muted">
          <tr>
            <th className="py-2 pr-4 font-medium">Task</th>
            <th className="py-2 pr-4 font-medium">Owner</th>
            <th className="py-2 pr-4 font-medium">Due</th>
            <th className="py-2 font-medium">Priority</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {visible.map((item, index) => (
            <tr key={index}>
              <td className="py-2.5 pr-4">{item.task}</td>
              <td className="py-2.5 pr-4 text-muted">{item.owner}</td>
              <td className="py-2.5 pr-4 text-muted">{item.due}</td>
              <td className="py-2.5">
                <PriorityBadge priority={item.priority} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ul className="space-y-2 md:hidden">
        {visible.map((item, index) => (
          <li key={index} className="rounded-xl border border-border bg-background p-3">
            <div className="flex items-start justify-between gap-3">
              <p className="text-sm font-medium">{item.task}</p>
              <PriorityBadge priority={item.priority} />
            </div>
            <p className="mt-1 text-xs text-muted">
              {item.owner} · {item.due}
            </p>
          </li>
        ))}
      </ul>
    </>
  );
}
