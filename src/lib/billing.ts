import Stripe from "stripe";
import { getAdminFirestore } from "./firebase-admin";

export type BillingPlanId = "agency_core" | "agency_scale";

export type BillingPlanConfig = {
  id: BillingPlanId;
  name: string;
  monthlyFee: number;
  includedSms: number;
  overagePerSms: number;
  maxSubAccounts: number;
};

export const BILLING_PLANS: Record<BillingPlanId, BillingPlanConfig> = {
  agency_core: {
    id: "agency_core",
    name: "Agency Core",
    monthlyFee: 1499,
    includedSms: 20000,
    overagePerSms: 0.02,
    maxSubAccounts: 10,
  },
  agency_scale: {
    id: "agency_scale",
    name: "Agency Scale",
    monthlyFee: 2499,
    includedSms: 50000,
    overagePerSms: 0.018,
    maxSubAccounts: 25,
  },
};

export function resolvePlanConfig(planId?: string | null): BillingPlanConfig {
  if (planId && planId in BILLING_PLANS) {
    return BILLING_PLANS[planId as BillingPlanId];
  }
  return BILLING_PLANS.agency_core;
}

export async function logBillingEvent(
  tenantId: string,
  info: { type: string; amount?: number; billingPeriod?: string; status?: string }
) {
  const db = getAdminFirestore();
  await db
    .collection("tenants")
    .doc(tenantId)
    .collection("events")
    .add({
      type: info.type,
      amount: info.amount ?? null,
      billingPeriod: info.billingPeriod ?? null,
      status: info.status ?? null,
      createdAt: new Date(),
    });
}

export async function billSmsOverage(opts: {
  tenantId: string;
  overageCount: number;
  overageRateUsd: number;
  periodLabel?: string;
}) {
  const { tenantId, overageCount, overageRateUsd, periodLabel } = opts;
  if (overageCount <= 0 || overageRateUsd <= 0) return { ok: true, billed: false };

  const stripeSecret = process.env.STRIPE_SECRET_KEY;
  if (!stripeSecret) {
    console.warn("[billing] STRIPE_SECRET_KEY missing, cannot bill overage");
    return { ok: false, billed: false, error: "missing-stripe-key" };
  }

  const db = getAdminFirestore();
  const tenantSnap = await db.collection("tenants").doc(tenantId).get();
  const tenant = tenantSnap.exists ? (tenantSnap.data() as any) : null;
  const customerId = tenant?.stripeCustomerId;
  if (!customerId) {
    console.warn("[billing] stripeCustomerId missing for tenant", tenantId);
    return { ok: false, billed: false, error: "missing-customer" };
  }

  const stripe = new Stripe(stripeSecret, { apiVersion: "2025-10-29.clover" });
  const amountUsd = overageCount * overageRateUsd;
  const amountCents = Math.max(1, Math.round(amountUsd * 100));

  const description =
    periodLabel && periodLabel.trim().length > 0
      ? `SMS overage (${periodLabel})`
      : "SMS overage";

  try {
    await stripe.invoiceItems.create({
      customer: customerId,
      amount: amountCents,
      currency: "usd",
      description,
      metadata: {
        tenantId,
        overageCount: String(overageCount),
        overageRateUsd: String(overageRateUsd),
      },
    });
    return { ok: true, billed: true, amountCents };
  } catch (err) {
    console.error("[billing] invoice item create failed", err);
    return { ok: false, billed: false, error: "stripe-error" };
  }
}
