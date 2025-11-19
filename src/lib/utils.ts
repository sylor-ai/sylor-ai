import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTimestamp(ts: any): string {
  try {
    if (!ts) return "N/A";
    if (typeof ts.toDate === "function") {
      return ts.toDate().toLocaleString();
    }
    if (typeof ts.seconds === "number") {
      return new Date(ts.seconds * 1000).toLocaleString();
    }
    return new Date(ts).toLocaleString();
  } catch {
    return "N/A";
  }
}

export function normalizeTimestamps<T extends Record<string, any>>(obj: T): T {
  if (!obj || typeof obj !== "object") return obj;

  const clone: any = Array.isArray(obj) ? [] : {};

  for (const [key, value] of Object.entries(obj)) {
    if (!value) {
      clone[key] = value;
      continue;
    }

    if (typeof (value as any).toDate === "function") {
      clone[key] = (value as any).toDate();
      continue;
    }

    if (
      typeof value === "object" &&
      "seconds" in (value as any) &&
      typeof (value as any).seconds === "number"
    ) {
      clone[key] = new Date((value as any).seconds * 1000);
      continue;
    }

    if (typeof value === "object") {
      clone[key] = normalizeTimestamps(value as any);
      continue;
    }

    clone[key] = value;
  }

  return clone as T;
}
