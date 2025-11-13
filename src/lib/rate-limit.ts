// FILE: src/lib/rate-limit.ts (or wherever authRatelimit currently lives)
import { limiter } from "@/lib/limiter";

type LimitResult = {
  success: boolean;
  limit?: number;
  remaining?: number;
  reset?: number;
};

const noop = {
  async limit(_key: string): Promise<LimitResult> {
    return { success: true };
  },
};

export const authRatelimit = limiter ?? noop;
