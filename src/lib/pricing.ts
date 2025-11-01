// src/lib/pricing.ts
import { Plan } from "@/types";

export const PLANS: Record<string, Plan> = {
  starter: {
    id: "starter",
    name: "Starter",
    price: 149,
    features: ["50 Leads/mo", "SMS automation", "Basic analytics"],
    productId: "prod_TJgp5PFopMUBwK",
    priceId: "price_1SN3ReHBRIMb0ChwEPz1g2w5",
  },
  pro: {
    id: "pro",
    name: "Pro",
    price: 399,
    features: [
      "Unlimited Leads",
      "SMS & Voice AI",
      "Advanced analytics",
      "Calendar sync",
    ],
    productId: "prod_TJgplWZ9KPGuvY",
    priceId: "price_1SN3RrHBRIMb0ChwjSIbQaYn",
  },
};

export function getPlans(): Plan[] {
  return Object.values(PLANS);
}
