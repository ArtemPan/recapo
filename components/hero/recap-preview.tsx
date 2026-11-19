"use client";

import * as m from "motion/react-m";
import { PriorityBadge } from "@/components/demo/priority-badge";
import type { ActionItem } from "@/lib/schema";

const items: ActionItem[] = [
  { task: "Write the release notes", owner: "Anna", due: "Thu", priority: "high" },
  { task: "Run load testing", owner: "Tom", due: "Wed", priority: "high" },
  { task: "Share empty states", owner: "Lena", due: "Wed", priority: "medium" },
];

const appear = (delay: number) => ({
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.45, delay, ease: "easeOut" as const },
});

export function RecapPreview() {
  return (
    <div className="relative">
      <div
        aria-hidden
        className="absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-br from-accent/25 via-accent/5 to-transparent blur-2xl"
      />
      <m.div
        {...appear(0.1)}
        className="rounded-2xl border border-border bg-surface p-5 shadow-xl shadow-accent/5"
      >
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold">Weekly product sync</p>
          <m.span
            {...appear(1.6)}
            className="rounded-full bg-success/10 px-2.5 py-0.5 text-xs font-medium text-success"
          >
            Recap ready
          </m.span>
        </div>

        <m.p {...appear(0.4)} className="mt-4 text-sm leading-relaxed text-muted">
          Beta ships Friday with onboarding v2. Load testing and the status page are still open.
        </m.p>

        <m.p
          {...appear(0.6)}
          className="mt-5 text-xs font-semibold uppercase tracking-wide text-muted"
        >
          Action items
        </m.p>
        <ul className="mt-2 space-y-2">
          {items.map((item, index) => (
            <m.li
              key={item.task}
              {...appear(0.8 + index * 0.2)}
              className="flex items-center justify-between gap-3 rounded-xl border border-border bg-background px-3 py-2.5"
            >
              <div>
                <p className="text-sm font-medium">{item.task}</p>
                <p className="text-xs text-muted">
                  {item.owner} · {item.due}
                </p>
              </div>
              <PriorityBadge priority={item.priority} />
            </m.li>
          ))}
        </ul>
      </m.div>
    </div>
  );
}
