// FILE: src/app/api/health/route.ts
import { NextResponse } from "next/server";
import Stripe from "stripe";

type ServiceStatus = {
  ok: boolean;
  reason?: string;
};

function missing(message: string): ServiceStatus {
  return { ok: false, reason: message };
}

export async function GET() {
  const results: Record<string, ServiceStatus> = {
    stripe: { ok: false },
    openai: { ok: false },
    redis: { ok: false },
    telnyx: { ok: false },
  };

  const stripeKey = process.env.STRIPE_SECRET_KEY || "";
  if (!stripeKey) {
    results.stripe = missing("STRIPE_SECRET_KEY missing");
  } else {
    try {
      const stripe = new Stripe(stripeKey, { apiVersion: "2025-10-29.clover" });
      await stripe.accounts.retrieve();
      results.stripe.ok = true;
    } catch (err: any) {
      results.stripe = {
        ok: false,
        reason: err?.message || "Stripe check failed",
      };
    }
  }

  const openaiKey = process.env.OPENAI_API_KEY || "";
  if (!openaiKey) {
    results.openai = missing("OPENAI_API_KEY missing");
  } else {
    results.openai.ok = true;
  }

  const redisUrl = process.env.UPSTASH_REDIS_REST_URL || "";
  const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN || "";
  if (!redisUrl || !redisToken) {
    results.redis = missing("Redis envs missing");
  } else {
    results.redis.ok = true;
  }

  const telnyxKey = process.env.TELNYX_API_KEY || "";
  const telnyxProfile = process.env.TELNYX_MESSAGING_PROFILE_ID || "";
  const telnyxFrom = process.env.TELNYX_DEFAULT_FROM || "";
  if (!telnyxKey || !telnyxProfile || !telnyxFrom) {
    results.telnyx = missing("Telnyx envs missing");
  } else {
    results.telnyx.ok = true;
  }

  const ok = Object.values(results).every((svc) => svc.ok);

  return NextResponse.json({
    ok,
    services: results,
    env: {
      nodeEnv: process.env.NODE_ENV,
      commit: process.env.VERCEL_GIT_COMMIT_SHA || null,
    },
  });
}
