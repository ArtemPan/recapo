"use client";

import { useEffect, useState } from "react";
import { usePlan } from "@/components/plan/plan-provider";

type Notice = { tone: "success" | "warning"; text: string };

function cleanUrl() {
  window.history.replaceState(null, "", `${window.location.pathname}#pricing`);
}

async function verify(sessionId: string) {
  const response = await fetch("/api/verify", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ sessionId }),
  });
  return response.ok;
}

export function CheckoutReturn() {
  const { refresh } = usePlan();
  const [notice, setNotice] = useState<Notice | null>(null);

  useEffect(() => {
    async function handleReturn() {
      const params = new URLSearchParams(window.location.search);
      const sessionId = params.get("session_id");

      if (params.get("checkout") === "cancelled") {
        cleanUrl();
        setNotice({ tone: "warning", text: "Payment cancelled. You are still on the Free plan." });
        return;
      }
      if (!sessionId) return;

      cleanUrl();
      if (await verify(sessionId)) {
        await refresh();
        setNotice({
          tone: "success",
          text: "Payment confirmed. Pro is unlocked in the demo for the next 24 hours.",
        });
      } else {
        setNotice({ tone: "warning", text: "We couldn't confirm that payment." });
      }
    }

    handleReturn();
  }, [refresh]);

  if (!notice) return null;

  const styles =
    notice.tone === "success" ? "bg-success/10 text-success" : "bg-warning/10 text-warning";

  return (
    <p role="status" className={`mx-auto mb-8 max-w-3xl rounded-xl p-3 text-center text-sm ${styles}`}>
      {notice.text}
    </p>
  );
}
