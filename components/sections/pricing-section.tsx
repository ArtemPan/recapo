import { CheckoutReturn } from "@/components/pricing/checkout-return";
import { PricingPlans } from "@/components/pricing/pricing-plans";

export function PricingSection() {
  return (
    <section id="pricing" className="scroll-mt-20 py-20 sm:py-24">
      <div className="mx-auto w-full max-w-6xl px-4">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <p className="text-sm font-semibold text-accent">Pricing</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
            Start free, upgrade when meetings get long
          </h2>
        </div>
        <CheckoutReturn />
        <PricingPlans />
      </div>
    </section>
  );
}
