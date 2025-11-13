import { NextResponse } from "next/server";

export type Session = {
  uid: string;
  tenantId?: string;
  issuedAt: number;
  lastActiveAt: number;
  token?: string;
};

export const SESSION_COOKIE = "sylor_session";
export const ACTIVE_TENANT_COOKIE = "sylor_active_tenant";

export const IDLE_TIMEOUT_MS = 30 * 60 * 1000; // 30 minutes
export const ABSOLUTE_TIMEOUT_MS = 8 * 60 * 60 * 1000; // 8 hours
const REFRESH_THRESHOLD_MS = 5 * 60 * 1000; // refresh if idle > 5 minutes

const PROD = process.env.NODE_ENV === "production";

const baseCookieConfig = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: PROD,
  path: "/",
};

const toBase64 = (value: string) => {
  if (typeof Buffer !== "undefined") {
    return Buffer.from(value, "utf8").toString("base64");
  }
  const utf8 = encodeURIComponent(value).replace(
    /%([0-9A-F]{2})/g,
    (_, p1) => String.fromCharCode(parseInt(p1, 16))
  );
  return btoa(utf8);
};

const fromBase64 = (value: string) => {
  if (typeof Buffer !== "undefined") {
    return Buffer.from(value, "base64").toString("utf8");
  }
  const decoded = atob(value);
  try {
    return decodeURIComponent(
      decoded
        .split("")
        .map((c) => `%${c.charCodeAt(0).toString(16).padStart(2, "0")}`)
        .join("")
    );
  } catch {
    return decoded;
  }
};

function encodeSession(session: Session): string {
  return toBase64(JSON.stringify(session));
}

function decodeSession(raw: string): Session | null {
  try {
    const json = fromBase64(raw);
    const parsed = JSON.parse(json) as Session;
    if (typeof parsed?.uid === "string" && typeof parsed?.issuedAt === "number") {
      return parsed;
    }
  } catch {
    // ignore parse errors
  }
  return null;
}

export function createSessionCookie(
  uid: string,
  tenantId?: string,
  token?: string
): string {
  const now = Date.now();
  const session: Session = {
    uid,
    tenantId,
    issuedAt: now,
    lastActiveAt: now,
    token,
  };
  return encodeSession(session);
}

export function parseSessionCookie(raw?: string | null): {
  session: Session | null;
  isExpired: boolean;
  shouldRefresh: boolean;
} {
  if (!raw) {
    return { session: null, isExpired: true, shouldRefresh: false };
  }
  const session = decodeSession(raw);
  if (!session) {
    return { session: null, isExpired: true, shouldRefresh: false };
  }

  const now = Date.now();
  const idleMs = now - session.lastActiveAt;
  const livedMs = now - session.issuedAt;

  const isExpired =
    idleMs > IDLE_TIMEOUT_MS || livedMs > ABSOLUTE_TIMEOUT_MS;
  const shouldRefresh = !isExpired && idleMs > REFRESH_THRESHOLD_MS;

  return { session, isExpired, shouldRefresh };
}

export function refreshSession(session: Session, tenantId?: string): Session {
  return {
    ...session,
    tenantId: tenantId ?? session.tenantId,
    lastActiveAt: Date.now(),
  };
}

export function getSessionToken(value?: string | null): string | null {
  const { session, isExpired } = parseSessionCookie(value);
  if (!session || isExpired) return null;
  return session.token ?? null;
}

export function sessionCookieValue(session: Session): string {
  return encodeSession(session);
}

export function remainingSessionSeconds(session: Session): number {
  const elapsed = Date.now() - session.issuedAt;
  return Math.max(1, Math.floor((ABSOLUTE_TIMEOUT_MS - elapsed) / 1000));
}

export function setTenantCookie(
  res: NextResponse,
  tenantId: string,
  session?: Session | null
) {
  if (session) {
    const updated = refreshSession(session, tenantId);
    res.cookies.set(SESSION_COOKIE, sessionCookieValue(updated), {
      ...baseCookieConfig,
      maxAge: remainingSessionSeconds(updated),
    });
  }

  res.cookies.set(ACTIVE_TENANT_COOKIE, tenantId, {
    ...baseCookieConfig,
    maxAge: 60 * 60 * 24 * 30,
  });
}
