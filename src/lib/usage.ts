import { FieldValue } from "firebase-admin/firestore";
import { getAdminFirestore } from "./firebase-admin";
import { billSmsOverage, resolvePlanConfig, logBillingEvent } from "./billing";

const DEFAULT_MONTHLY_SMS_LIMIT = 20000;
const DEFAULT_MAX_TOKENS_PER_MESSAGE = 500;
const DEFAULT_MAX_MESSAGES_PER_CONVERSATION = 200;

type UsageResult =
  | { allowed: true }
  | { allowed: false; reason: string; limit?: number; count?: number };

export async function initTenantUsageIfMissing(tenantId: string) {
  const db = getAdminFirestore();
  const ref = db.collection("tenants").doc(tenantId);
  const snap = await ref.get();
  if (!snap.exists) return;
  const data = snap.data() as any;
  const planConfig = resolvePlanConfig(data?.planId);
  const hasUsageFields =
    typeof data?.monthlySmsLimit === "number" ||
    typeof data?.monthlySmsCount === "number" ||
    typeof data?.monthlyAiTokenCount === "number";
  if (hasUsageFields) return;
  const defaults = {
    monthlySmsLimit: planConfig.includedSms || DEFAULT_MONTHLY_SMS_LIMIT,
    monthlySmsCount: 0,
    monthlyAiTokenCount: 0,
    usageHistory: [],
    overageRate: null,
    billingCycleStart: FieldValue.serverTimestamp(),
    maxTokensPerMessage: DEFAULT_MAX_TOKENS_PER_MESSAGE,
    maxMessagesPerConversation: DEFAULT_MAX_MESSAGES_PER_CONVERSATION,
  };
  await ref.set(defaults, { merge: true });
}

export async function ensureTenantUsageDefaults(tenantId: string) {
  const db = getAdminFirestore();
  const ref = db.collection("tenants").doc(tenantId);
  const snap = await ref.get();
  if (!snap.exists) return;
  const data = snap.data() as any;
  const planLimit =
    typeof data?.planId === "string"
      ? resolvePlanConfig(data.planId).includedSms
      : null;
  const updates: Record<string, any> = {};
  if (typeof planLimit === "number" && planLimit > 0) {
    if (data?.monthlySmsLimit !== planLimit) {
      updates.monthlySmsLimit = planLimit;
    }
  } else if (typeof data?.monthlySmsLimit !== "number") {
    updates.monthlySmsLimit = DEFAULT_MONTHLY_SMS_LIMIT;
  }
  if (typeof data?.monthlySmsCount !== "number") {
    updates.monthlySmsCount = 0;
  }
  if (!data?.billingCycleStart) {
    updates.billingCycleStart = FieldValue.serverTimestamp();
  }
  if (!("overageRate" in data)) {
    updates.overageRate = null;
  }
  if (typeof data?.monthlyAiTokenCount !== "number") {
    updates.monthlyAiTokenCount = 0;
  }
  if (typeof data?.maxTokensPerMessage !== "number") {
    updates.maxTokensPerMessage = DEFAULT_MAX_TOKENS_PER_MESSAGE;
  }
  if (typeof data?.maxMessagesPerConversation !== "number") {
    updates.maxMessagesPerConversation = DEFAULT_MAX_MESSAGES_PER_CONVERSATION;
  }
  if (Object.keys(updates).length > 0) {
    await ref.set(updates, { merge: true });
  }
}

export async function checkSmsSendAllowed(tenantId: string): Promise<UsageResult> {
  const db = getAdminFirestore();
  const ref = db.collection("tenants").doc(tenantId);
  const snap = await ref.get();
  if (!snap.exists) {
    return { allowed: false, reason: "tenant-not-found" };
  }
  const data = snap.data() as any;
  const limit =
    typeof data?.monthlySmsLimit === "number"
      ? data.monthlySmsLimit
      : DEFAULT_MONTHLY_SMS_LIMIT;
  const count = typeof data?.monthlySmsCount === "number" ? data.monthlySmsCount : 0;

  if (limit > 0 && count >= limit) {
    // log blocked event
    await logSmsBlockedEvent(tenantId, {
      reason: "limit-reached",
      monthlySmsLimit: limit,
      monthlySmsCount: count,
    }).catch(() => null);
    return { allowed: false, reason: "limit-reached", limit, count };
  }
  return { allowed: true };
}

export async function recordSmsDelivery(tenantId: string, amount = 1) {
  const db = getAdminFirestore();
  const ref = db.collection("tenants").doc(tenantId);
  await ref.set(
    {
      monthlySmsCount: FieldValue.increment(amount),
    },
    { merge: true }
  );
}

export async function resetTenantUsage(tenantId: string) {
  const db = getAdminFirestore();
  const ref = db.collection("tenants").doc(tenantId);
  const snap = await ref.get();
  if (!snap.exists) return { ok: false, error: "tenant-not-found" };
  const data = snap.data() as any;
  const planConfig = resolvePlanConfig(data?.planId);
  const count = typeof data?.monthlySmsCount === "number" ? data.monthlySmsCount : 0;
  const limit =
    typeof data?.monthlySmsLimit === "number"
      ? data.monthlySmsLimit
      : planConfig.includedSms || DEFAULT_MONTHLY_SMS_LIMIT;
  const overageRate =
    typeof data?.overageRate === "number"
      ? data.overageRate
      : planConfig.overagePerSms ?? null;
  const billingCycleStart = data?.billingCycleStart ?? null;
  const aiTokens = typeof data?.monthlyAiTokenCount === "number" ? data.monthlyAiTokenCount : 0;

  const now = new Date();
  const historyEntry = {
    periodStart: billingCycleStart || null,
    periodEnd: now,
    smsCount: count,
    limit,
    overageRate,
    overageCount: limit > 0 ? Math.max(0, count - limit) : 0,
    aiTokens,
  };

  const usageHistory = Array.isArray(data?.usageHistory) ? data.usageHistory : [];
  usageHistory.push(historyEntry);

  const firstOfMonth = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1));

  // Bill overage if applicable
  const overageCount = historyEntry.overageCount;
  if (overageRate && overageCount > 0) {
    const periodLabel = `${now.getUTCFullYear()}-${now.getUTCMonth() + 1}`;
    const billed = await billSmsOverage({
      tenantId,
      overageCount,
      overageRateUsd: overageRate,
      periodLabel,
    }).catch(() => ({ ok: false, billed: false }));
    await logBillingEvent(tenantId, {
      type: "billing_overage",
      amount: overageRate * overageCount,
      billingPeriod: periodLabel,
      status: billed?.billed ? "invoiced" : "pending",
    }).catch(() => null);
  }

  await ref.set(
    {
      monthlySmsCount: 0,
      billingCycleStart: firstOfMonth,
      usageHistory,
      monthlyAiTokenCount: 0,
    },
    { merge: true }
  );
  return { ok: true };
}

export async function getUsageStats(tenantId: string) {
  const db = getAdminFirestore();
  const ref = db.collection("tenants").doc(tenantId);
  const snap = await ref.get();
  if (!snap.exists) return null;
  const data = snap.data() as any;
  const monthlySmsCount = typeof data?.monthlySmsCount === "number" ? data.monthlySmsCount : 0;
  const planLimit =
    typeof data?.planId === "string"
      ? resolvePlanConfig(data.planId).includedSms
      : null;
  const monthlySmsLimit =
    planLimit ??
    (typeof data?.monthlySmsLimit === "number"
      ? data.monthlySmsLimit
      : DEFAULT_MONTHLY_SMS_LIMIT);
  const overageRate =
    typeof data?.overageRate === "number" ? data.overageRate : data?.overageRate ?? null;
  const overageCount =
    monthlySmsLimit > 0 ? Math.max(0, monthlySmsCount - monthlySmsLimit) : 0;
  const estimatedBill =
    overageRate && overageCount > 0 ? overageRate * overageCount : 0;
  return {
    monthlySmsCount,
    monthlySmsLimit,
    overageRate,
    overageCount,
    estimatedBill,
    billingCycleStart: data?.billingCycleStart || null,
    usageHistory: Array.isArray(data?.usageHistory) ? data.usageHistory : [],
  };
}

export async function logSmsBlockedEvent(
  tenantId: string,
  info: { reason: string; monthlySmsLimit?: number; monthlySmsCount?: number }
) {
  const db = getAdminFirestore();
  const ref = db.collection("tenants").doc(tenantId);
  await ref.collection("events").add({
    type: "sms_blocked",
    createdAt: FieldValue.serverTimestamp(),
    ...info,
  });
}

export async function logAiBlockedEvent(
  tenantId: string,
  info: { reason: string; maxTokensPerMessage?: number; messageCount?: number; maxMessagesPerConversation?: number }
) {
  const db = getAdminFirestore();
  const ref = db.collection("tenants").doc(tenantId);
  await ref.collection("events").add({
    type: "ai_blocked",
    createdAt: FieldValue.serverTimestamp(),
    ...info,
  });
}

export async function checkAiGuardrails(
  tenantId: string,
  opts: { tokensExpected?: number; messageCount?: number }
) {
  const db = getAdminFirestore();
  const ref = db.collection("tenants").doc(tenantId);
  const snap = await ref.get();
  if (!snap.exists) {
    return { allowed: false, reason: "tenant-not-found" };
  }
  const data = snap.data() as any;
  const maxTokensPerMessage =
    typeof data?.maxTokensPerMessage === "number"
      ? data.maxTokensPerMessage
      : DEFAULT_MAX_TOKENS_PER_MESSAGE;
  const maxMessagesPerConversation =
    typeof data?.maxMessagesPerConversation === "number"
      ? data.maxMessagesPerConversation
      : DEFAULT_MAX_MESSAGES_PER_CONVERSATION;

  if (
    opts.tokensExpected &&
    maxTokensPerMessage > 0 &&
    opts.tokensExpected > maxTokensPerMessage
  ) {
    await logAiBlockedEvent(tenantId, {
      reason: "max-tokens-per-message",
      maxTokensPerMessage,
      messageCount: opts.messageCount,
      maxMessagesPerConversation,
    }).catch(() => null);
    return { allowed: false, reason: "max-tokens-per-message" };
  }

  if (
    typeof opts.messageCount === "number" &&
    maxMessagesPerConversation > 0 &&
    opts.messageCount >= maxMessagesPerConversation
  ) {
    await logAiBlockedEvent(tenantId, {
      reason: "max-messages",
      maxTokensPerMessage,
      messageCount: opts.messageCount,
      maxMessagesPerConversation,
    }).catch(() => null);
    return { allowed: false, reason: "max-messages" };
  }

  return { allowed: true };
}

export async function recordAiTokens(tenantId: string, tokens: number) {
  const db = getAdminFirestore();
  const ref = db.collection("tenants").doc(tenantId);
  await ref.set(
    {
      monthlyAiTokenCount: FieldValue.increment(tokens),
    },
    { merge: true }
  );
}
