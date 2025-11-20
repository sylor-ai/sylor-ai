// FILE: src/lib/api.ts
"use client";

import {
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithCustomToken,
  signInWithEmailAndPassword,
  type User as FirebaseUser,
} from "firebase/auth";
import {
  doc,
  getDoc,
  collection,
  getDocs,
  query,
  orderBy,
  addDoc,
  setDoc,
} from "firebase/firestore";
import { getFirebaseAuth, getFirebaseDb } from "./firebase";
import type { User, Tenant, Plan } from "@/types";

// Local plan mirror (used to render Billing/Plans)
const PLANS: Record<string, Plan> = {
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

// Log login + set sylor_session cookie on the server
export async function logLoginToServer(idToken: string): Promise<{
  ok: boolean;
  status?: number;
  error?: string;
}> {
  try {
    const res = await fetch("/api/auth/log-login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ idToken }),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      console.error("[logLoginToServer] non-OK", res.status, text);
      return { ok: false, status: res.status, error: text || "non-ok" };
    }

    const data = await res.json().catch(() => ({ ok: true }));
    return data?.ok === false ? data : { ok: true, ...data };
  } catch (err: any) {
    console.error("[logLoginToServer] error", err);
    return { ok: false, error: err?.message || String(err) };
  }
}

// ─────────────────────────────────────────────────────────
// Public lead link settings
// GET /api/settings/public-link
export async function getPublicLinkSettings(): Promise<{
  ok: boolean;
  publicSlug?: string | null;
  publicCaptureEnabled?: boolean | null;
  businessName?: string | null;
  error?: string;
}> {
  try {
    const res = await fetch("/api/settings/public-link", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const text = await res.text();
      return {
        ok: false,
        error: text || "Failed to load public link settings",
      };
    }

    const data = await res.json();

    return {
      ok: true,
      publicSlug: data.publicSlug ?? null,
      publicCaptureEnabled: data.publicCaptureEnabled ?? false,
      businessName: data.businessName ?? null,
    };
  } catch (err: any) {
    console.error("Error in getPublicLinkSettings:", err);
    return { ok: false, error: err?.message ?? "Unknown error" };
  }
}

// POST /api/settings/public-link
export async function savePublicLinkSettings(payload: {
  publicSlug: string | null;
  publicCaptureEnabled: boolean;
}): Promise<{
  ok: boolean;
  publicSlug?: string | null;
  publicCaptureEnabled?: boolean | null;
  businessName?: string | null;
  error?: string;
}> {
  try {
    const res = await fetch("/api/settings/public-link", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok || data?.ok === false) {
      const error =
        typeof data?.error === "string"
          ? data.error
          : "Failed to save public link settings";
      return { ok: false, error };
    }

    return {
      ok: true,
      publicSlug: data.publicSlug ?? payload.publicSlug ?? null,
      publicCaptureEnabled:
        data.publicCaptureEnabled ?? payload.publicCaptureEnabled ?? false,
      businessName: data.businessName ?? null,
    };
  } catch (err: any) {
    console.error("Error in savePublicLinkSettings:", err);
    return { ok: false, error: err?.message ?? "Unknown error" };
  }
}

export const api = {
  // Email/password login via Firebase, then set session cookie
  login: async (email: string, password: string): Promise<FirebaseUser | null> => {
    const auth = getFirebaseAuth();
    const cred = await signInWithEmailAndPassword(auth, email, password);
    return cred.user ?? null;
  },
  // Send signup code to email and stash pending signup
  requestSignupCode: async (opts: {
    name: string;
    email: string;
    password: string;
    plan?: string;
  }): Promise<{ ok: boolean; error?: string }> => {
    const res = await fetch("/api/auth/request-code", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(opts),
    });
    try {
      return await res.json();
    } catch {
      return { ok: false, error: "SERVER_HTML_RESPONSE" };
    }
  },

  // List conversations for a tenant (most recent first)
  getConversations: async (
    tenantId: string
  ): Promise<Array<{
    id: string;
    leadId: string;
    leadName: string;
    lastMessage: string;
    lastMessageAt: any;
    channel: "sms";
    leadAvatarUrl?: string;
    aiPaused?: boolean;
    aiLastStatus?: "on" | "off" | "blocked" | "unsubscribed";
  }>> => {
    const db = getFirebaseDb();
    const convCol = collection(db, "tenants", tenantId, "conversations");
    let snap;
    try {
      snap = await getDocs(query(convCol, orderBy("lastMessageAt", "desc")));
    } catch {
      // fallback without index
      snap = await getDocs(convCol);
    }
    return snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) }));
  },

  // List messages for a conversation (ascending by time)
  getMessagesForConversation: async (
    tenantId: string,
    conversationId: string
  ): Promise<Array<{ id: string; from: "lead" | "agent"; direction: "inbound" | "outbound"; body: string; createdAt: any; via?: string }>> => {
    const db = getFirebaseDb();
    const msgsCol = collection(db, "tenants", tenantId, "conversations", conversationId, "messages");
    let snap;
    try {
      snap = await getDocs(query(msgsCol, orderBy("createdAt", "asc")));
    } catch {
      snap = await getDocs(msgsCol);
    }
    return snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) }));
  },

  // Fetch a single lead by id
  getLead: async (tenantId: string, leadId: string) => {
    const db = getFirebaseDb();
    const ref = doc(db, "tenants", tenantId, "leads", leadId);
    const snap = await getDoc(ref);
    if (!snap.exists()) return null;
    return { id: snap.id, ...(snap.data() as any) };
  },

  // List leads for a tenant
  getLeads: async (tenantId: string) => {
    const db = getFirebaseDb();
    const leadsCol = collection(db, "tenants", tenantId, "leads");
    let snap;
    try {
      snap = await getDocs(query(leadsCol, orderBy("created", "desc")));
    } catch {
      snap = await getDocs(leadsCol);
    }
    return snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) }));
  },

  // Create a lead (minimal fields supported by UI)
  createLead: async (
    tenantId: string,
    lead: {
      name: string;
      phone: string;
      service: string;
      city?: string;
      value?: number;
      status: "New" | "Contacted" | "Booked" | "Closed";
      email?: string;
    }
  ) => {
    const db = getFirebaseDb();
    const leadsCol = collection(db, "tenants", tenantId, "leads");
    const ref = await addDoc(leadsCol, {
      name: lead.name || "New Lead",
      phone: lead.phone || "",
      service: lead.service || "General",
      city: lead.city || "",
      value: lead.value ?? 0,
      status: lead.status,
      email: lead.email || "",
      created: new Date().toISOString(),
    });
    // denormalize id if needed by UI that expects leadId
    await setDoc(ref, { leadId: ref.id }, { merge: true });
    return { id: ref.id };
  },

  // Verify code, sign in with custom token, set cookie via server
  verifySignupCode: async (opts: {
    email: string;
    code: string;
  }): Promise<{ ok: boolean; error?: string }> => {
    const res = await fetch("/api/auth/verify-code", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(opts),
    });

    const data = await res.json().catch(() => null as any);
    if (!res.ok || !data?.ok) {
      return { ok: false, error: data?.error || "verify-failed" };
    }

    const auth = getFirebaseAuth();
    await signInWithCustomToken(auth, data.customToken);
    const current = auth.currentUser;
    const idToken = await current?.getIdToken();
    if (idToken) {
      await logLoginToServer(idToken);
    }

    return { ok: true };
  },

  // Google OAuth sign-in via Firebase, then set cookie via server
  googleSignIn: async (): Promise<FirebaseUser | null> => {
    const auth = getFirebaseAuth();
    const provider = new GoogleAuthProvider();
    const cred = await signInWithPopup(auth, provider);
    const user = cred.user;
    try {
      const idToken = await user.getIdToken();
      await logLoginToServer(idToken);
    } catch {}
    return user ?? null;
  },
  // Return current user profile (from Firestore)
  getUserProfile: async (uid: string): Promise<User | null> => {
    const db = getFirebaseDb();
    const snap = await getDoc(doc(db, "users", uid));
    if (!snap.exists()) return null;
    return { id: snap.id, ...(snap.data() as any) } as User;
  },

  // Return tenant by id
  getTenant: async (tenantId: string): Promise<Tenant | null> => {
    const db = getFirebaseDb();
    const snap = await getDoc(doc(db, "tenants", tenantId));
    if (!snap.exists()) return null;
    return { id: snap.id, ...(snap.data() as any) } as Tenant;
  },

  // Get the current plan object for a tenant
  getCurrentPlan: async (tenantId: string): Promise<Plan | null> => {
    const tenant = await api.getTenant(tenantId);
    if (!tenant?.planId) return null;
    return PLANS[tenant.planId] || null;
  },

  // Create a Stripe checkout session for a given plan
  createStripeCheckoutSession: async (
    planId: Plan["id"]
  ): Promise<{ redirectUrl: string }> => {
    if (!planId) throw new Error("Unknown plan");

    let authHeader: Record<string, string> = {};
    try {
      const auth = getFirebaseAuth();
      const token = await auth.currentUser?.getIdToken();
      if (token) authHeader = { Authorization: `Bearer ${token}` };
    } catch {}

    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json", ...authHeader },
      body: JSON.stringify({ planId }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err?.error ?? "Checkout failed");
    }

    const data = await res.json();
    return { redirectUrl: data.url as string };
  },

  // Sign out (and clear server cookie)
  logout: async (): Promise<void> => {
    const auth = getFirebaseAuth();
    await signOut(auth);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch {}
  },

  // Toggle Sylor AI auto-replies per conversation
  toggleConversationAi: async (
    conversationId: string,
    aiPaused: boolean
  ): Promise<{ ok: boolean; error?: string }> => {
    const auth = getFirebaseAuth();
    const current = auth.currentUser;
    if (!current) return { ok: false, error: "not-logged-in" };
    const idToken = await current.getIdToken();

    const res = await fetch("/api/conversations/ai-toggle", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`,
      },
      body: JSON.stringify({ conversationId, aiPaused }),
    });

    try {
      return await res.json();
    } catch {
      return { ok: false, error: "SERVER_HTML_RESPONSE" };
    }
  },

  logLoginToServer,
  getPublicLinkSettings,
  savePublicLinkSettings,
};
