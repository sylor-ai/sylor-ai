// FILE: src/lib/rate-limit.ts (or wherever authRatelimit currently lives)
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

type LimitResult = {
  success: boolean;
  // other fields from Upstash are fine but optional for us
  limit?: number;
  remaining?: number;
  reset?: number;
};

// Fallback "no-op" limiter (always allows)
const noopRatelimit = {
  async limit(_key: string): Promise<LimitResult> {
    return {
      success: true,
      limit: 999999,
      remaining: 999999,
      reset: 0,
    };
  },
};

let authRatelimit: { limit: (key: string) => Promise<LimitResult> };

if (redisUrl && redisToken) {
  console.log("[authRatelimit] Using Upstash Redis rate limiter");

  const redis = new Redis({
    url: redisUrl,
    token: redisToken,
  });

  authRatelimit = new Ratelimit({
    redis,
    // adjust window as you like (5 requests per minute here)
    limiter: Ratelimit.slidingWindow(5, "1 m"),
    analytics: true,
  });
} else {
  console.warn(
    "[authRatelimit] UPSTASH_REDIS_REST_URL / TOKEN missing – disabling rate limiting (dev mode)"
  );
  authRatelimit = noopRatelimit;
}

export { authRatelimit };
