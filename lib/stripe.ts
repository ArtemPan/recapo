import Stripe from "stripe";
import { getStripeEnv } from "./env";

let client: Stripe | undefined;

export function getStripe() {
  client ??= new Stripe(getStripeEnv().STRIPE_SECRET_KEY);
  return client;
}
