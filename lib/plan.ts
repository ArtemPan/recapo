export type Plan = "free" | "pro";

export const PLAN_LIMITS: Record<Plan, number> = {
  free: 4_000,
  pro: 20_000,
};

export const PLAN_COOKIE = "recapo_plan";
