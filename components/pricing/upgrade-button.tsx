"use client";

import { useState } from "react";
import type { BillingInterval } from "@/lib/pricing";

function checkoutUrl(body: unknown) {
  if (typeof body !== "object" || body === null || !("url" in body)) return null;
  return typeof body.url === "string" && body.url.startsWith("https://") ? body.url : null;
}

export function UpgradeButton({ interval }: { interval: BillingInterval }) {
  const [pending, setPending] = useState(false);
  const [failed, setFailed] = useState(false);

  async function upgrade() {
    setPending(true);
    setFailed(false);
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ interval }),
      });
      const url = checkoutUrl(await response.json());
      if (!url) throw new Error("Checkout unavailable");
      window.location.assign(url);
    } catch {
      setFailed(true);
      setPending(false);
    }
  }

  return (
    <div className="space-y-2">
      <button
        type="button"
        onClick={upgrade}
        disabled={pending}
        className="w-full rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-accent-foreground transition-opacity disabled:opacity-60"
      >
        {pending ? "Opening checkout..." : "Upgrade to Pro"}
      </button>
      {failed ? (
        <p role="alert" className="text-sm text-danger">
          Checkout is unavailable right now. Please try again.
        </p>
      ) : null}
    </div>
  );
}
