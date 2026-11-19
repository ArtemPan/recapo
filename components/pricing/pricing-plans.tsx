"use client";

import { useState } from "react";
import { usePlan } from "@/components/plan/plan-provider";
import { formatPrice, PRO_PRICE_CENTS, type BillingInterval } from "@/lib/pricing";
import { UpgradeButton } from "./upgrade-button";

const freeFeatures = [
  "Up to 4,000 characters per recap",
  "Summary, decisions and action items",
  "Copy the recap as Markdown",
];

const proFeatures = [
  "Everything in Free",
  "Up to 20,000 characters per recap",
  "Risks and open questions",
  "Export recaps to Markdown files",
];

function FeatureList({ items }: { items: string[] }) {
  return (
    <ul className="mt-6 space-y-2.5 text-sm">
      {items.map((item) => (
        <li key={item} className="flex gap-2">
          <span aria-hidden className="text-accent">
            ✓
          </span>
          {item}
        </li>
      ))}
    </ul>
  );
}

const intervals: { value: BillingInterval; label: string }[] = [
  { value: "month", label: "Monthly" },
  { value: "year", label: "Yearly" },
];

export function PricingPlans() {
  const { plan } = usePlan();
  const [interval, setBillingInterval] = useState<BillingInterval>("month");
  const isPro = plan === "pro";

  return (
    <div>
      <div
        role="radiogroup"
        aria-label="Billing period"
        className="mx-auto mb-10 flex w-fit rounded-full border border-border bg-surface p-1"
      >
        {intervals.map((option) => (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={interval === option.value}
            onClick={() => setBillingInterval(option.value)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              interval === option.value ? "bg-accent text-accent-foreground" : "text-muted"
            }`}
          >
            {option.label}
            {option.value === "year" ? " · 2 months free" : ""}
          </button>
        ))}
      </div>

      <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
        <article className="flex flex-col rounded-2xl border border-border bg-surface p-6">
          <h3 className="font-semibold">Free</h3>
          <p className="mt-4 text-4xl font-semibold tracking-tight">$0</p>
          <p className="mt-1 text-sm text-muted">For trying Recapo on a few meetings.</p>
          <FeatureList items={freeFeatures} />
          <div className="mt-auto pt-8">
            <a
              href="#demo"
              className="block rounded-xl border border-border px-4 py-2.5 text-center text-sm font-semibold hover:bg-background"
            >
              Try the demo
            </a>
            <p className="mt-3 text-center text-xs text-muted">
              No card or sign-up needed.
              <br />
              Just paste your notes.
            </p>
          </div>
        </article>

        <article className="flex flex-col rounded-2xl border-2 border-accent bg-surface p-6">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Pro</h3>
            <span className="rounded-full bg-accent-soft px-2.5 py-0.5 text-xs font-medium text-accent">
              Most popular
            </span>
          </div>
          <p className="mt-4 text-4xl font-semibold tracking-tight">
            {formatPrice(PRO_PRICE_CENTS[interval])}
            <span className="text-base font-normal text-muted">/{interval}</span>
          </p>
          <p className="mt-1 text-sm text-muted">For teams with long, busy meetings.</p>
          <FeatureList items={proFeatures} />
          <div className="mt-auto pt-8">
            {isPro ? (
              <p className="rounded-xl bg-success/10 px-4 py-2.5 text-center text-sm font-semibold text-success">
                You&apos;re on Pro
              </p>
            ) : (
              <UpgradeButton interval={interval} />
            )}
            <p className="mt-3 text-center text-xs text-muted">
              Stripe test mode: pay with 4242 4242 4242 4242, any future date and any CVC.
            </p>
          </div>
        </article>
      </div>
    </div>
  );
}
