import { currentPlan } from "@/lib/current-plan";

export async function GET() {
  return Response.json(
    { plan: await currentPlan() },
    { headers: { "Cache-Control": "no-store" } },
  );
}
