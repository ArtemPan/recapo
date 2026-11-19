import { PlanProvider } from "@/components/plan/plan-provider";
import { DemoSection } from "@/components/sections/demo-section";

export default function Home() {
  return (
    <PlanProvider>
      <main className="flex-1">
        <DemoSection />
      </main>
    </PlanProvider>
  );
}
