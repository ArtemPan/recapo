import { CheckoutReturn } from "@/components/pricing/checkout-return";
import { PricingPlans } from "@/components/pricing/pricing-plans";
import { SectionHeading } from "@/components/ui/section-heading";

export function PricingSection() {
  return (
    <section id="pricing" className="scroll-mt-20 border-t border-border py-20 sm:py-24">
      <div className="mx-auto w-full max-w-6xl px-4">
        <SectionHeading eyebrow="Pricing" title="Start free, upgrade when meetings get long" />
        <CheckoutReturn />
        <PricingPlans />
      </div>
    </section>
  );
}
