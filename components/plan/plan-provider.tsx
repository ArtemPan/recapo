"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { z } from "zod";
import type { Plan } from "@/lib/plan";

const planResponseSchema = z.object({ plan: z.enum(["free", "pro"]) });

async function fetchPlan(): Promise<Plan> {
  try {
    const response = await fetch("/api/plan", { cache: "no-store" });
    const parsed = planResponseSchema.safeParse(await response.json());
    return parsed.success ? parsed.data.plan : "free";
  } catch {
    return "free";
  }
}

type PlanState = {
  plan: Plan;
  refresh: () => Promise<void>;
};

const PlanContext = createContext<PlanState>({ plan: "free", refresh: async () => {} });

export function PlanProvider({ children }: { children: React.ReactNode }) {
  const [plan, setPlan] = useState<Plan>("free");

  const refresh = useCallback(async () => {
    setPlan(await fetchPlan());
  }, []);

  useEffect(() => {
    let active = true;
    fetchPlan().then((next) => {
      if (active) setPlan(next);
    });
    return () => {
      active = false;
    };
  }, []);

  return <PlanContext value={{ plan, refresh }}>{children}</PlanContext>;
}

export function usePlan() {
  return useContext(PlanContext);
}
