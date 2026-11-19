import { z } from "zod";
import { apiError } from "@/lib/api-error";
import { CURRENCY, PRO_PRICE_CENTS } from "@/lib/pricing";
import { getStripe } from "@/lib/stripe";

const bodySchema = z.object({ interval: z.enum(["month", "year"]) });

export async function POST(request: Request) {
  const body = bodySchema.safeParse(await request.json().catch(() => null));
  if (!body.success) return apiError("invalid_input", 400);

  const { interval } = body.data;
  const origin = new URL(request.url).origin;

  const session = await getStripe().checkout.sessions.create({
    mode: "subscription",
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: CURRENCY,
          unit_amount: PRO_PRICE_CENTS[interval],
          recurring: { interval },
          product_data: { name: "Recapo Pro" },
        },
      },
    ],
    success_url: `${origin}/?session_id={CHECKOUT_SESSION_ID}#pricing`,
    cancel_url: `${origin}/?checkout=cancelled#pricing`,
  });

  if (!session.url) return apiError("busy", 503);
  return Response.json({ url: session.url });
}
