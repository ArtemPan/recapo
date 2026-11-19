import { PlanProvider } from "@/components/plan/plan-provider";
import { DemoSection } from "@/components/sections/demo-section";
import { PricingSection } from "@/components/sections/pricing-section";

export default function Home() {
  return (
    <PlanProvider>
      <main className="flex-1">
        <DemoSection />
        <PricingSection />
      </main>
    </PlanProvider>
  );
}
