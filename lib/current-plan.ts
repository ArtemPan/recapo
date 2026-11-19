import { cookies } from "next/headers";
import { getPlanEnv } from "./env";
import { PLAN_COOKIE, type Plan } from "./plan";
import { verifyPlanToken } from "./plan-token";

export async function currentPlan(): Promise<Plan> {
  const cookieStore = await cookies();
  return verifyPlanToken(cookieStore.get(PLAN_COOKIE)?.value, getPlanEnv().PLAN_TOKEN_SECRET);
}
