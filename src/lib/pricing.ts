// src/lib/pricing.ts
import { Plan, PlanId } from "@/types";

export const PLANS: Record<string, Plan> = {
  agency_core: {
    id: "agency_core",
    name: "Agency Core",
    price: 1499,
    includedSms: 20000,
    overageRate: 0.02,
    maxSubAccounts: 10,
    features: ["20,000 SMS included", "Up to 10 client accounts", "AI SMS follow-up + booking"],
    priceId: process.env.NEXT_PUBLIC_STRIPE_AGENCY_CORE_PRICE_ID,
  },
  agency_scale: {
    id: "agency_scale",
    name: "Agency Scale",
    price: 2499,
    includedSms: 50000,
    overageRate: 0.018,
    maxSubAccounts: 25,
    features: [
      "50,000 SMS included",
      "Up to 25 client accounts",
      "AI SMS follow-up + booking",
      "Lower overage: $0.018/SMS",
    ],
    priceId: process.env.NEXT_PUBLIC_STRIPE_AGENCY_SCALE_PRICE_ID,
  },
};

export function getPlans(): Plan[] {
  return Object.values(PLANS);
}

export function getPlanById(planId: PlanId | null | undefined): Plan | null {
  if (!planId) return null;
  return PLANS[planId] || null;
}
