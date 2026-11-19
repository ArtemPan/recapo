import { MotionRoot } from "@/components/motion/motion-root";
import { PlanProvider } from "@/components/plan/plan-provider";
import { DemoSection } from "@/components/sections/demo-section";
import { Faq } from "@/components/sections/faq";
import { Features } from "@/components/sections/features";
import { Footer } from "@/components/sections/footer";
import { Header } from "@/components/sections/header";
import { Hero } from "@/components/sections/hero";
import { HowItWorks } from "@/components/sections/how-it-works";
import { PricingSection } from "@/components/sections/pricing-section";

export default function Home() {
  return (
    <PlanProvider>
      <MotionRoot>
        <div id="top" className="flex min-h-full flex-col">
          <Header />
          <main className="flex-1">
            <Hero />
            <HowItWorks />
            <DemoSection />
            <Features />
            <PricingSection />
            <Faq />
          </main>
          <Footer />
        </div>
      </MotionRoot>
    </PlanProvider>
  );
}
