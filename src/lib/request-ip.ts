// src/lib/request-ip.ts
import type { NextRequest } from "next/server";

export function getClientIp(req: NextRequest): string {
  // Common header set by Vercel / proxies
  const xff = req.headers.get("x-forwarded-for");
  if (xff) {
    const [ip] = xff.split(",").map((v) => v.trim());
    if (ip) return ip;
  }

  // Some environments use this header instead
  const realIp = req.headers.get("x-real-ip");
  if (realIp) return realIp;

  // Last fallback — prevents undefined errors
  return "unknown";
}
