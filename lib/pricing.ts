export type BillingInterval = "month" | "year";

export const PRO_PRICE_CENTS: Record<BillingInterval, number> = {
  month: 1_200,
  year: 12_000,
};

export const CURRENCY = "usd";

export function formatPrice(cents: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: CURRENCY,
    maximumFractionDigits: 0,
  }).format(cents / 100);
}
