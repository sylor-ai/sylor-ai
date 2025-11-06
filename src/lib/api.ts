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
  starter: {
    id: "starter",
    name: "Starter",
    price: 149,
    features: ["50 Leads/mo", "SMS Automation", "Basic Analytics"],
    productId: "prod_TJgp5PFopMUBwK",
    priceId: "price_1SN3ReHBRIMb0ChwEPz1g2w5",
  },
  pro: {
    id: "pro",
    name: "Pro",
    price: 399,
    features: [
      "Unlimited Leads",
      "SMS & Voice AI",
      "Advanced Analytics",
      "Calendar Sync",
    ],
    productId: "prod_TJgplWZ9KPGuvY",
    priceId: "price_1SN3RrHBRIMb0ChwjSIbQaYn",
  },
};

export const api = {
  // Email/password login via Firebase, then set session cookie
  login: async (email: string, password: string): Promise<FirebaseUser | null> => {
    const auth = getFirebaseAuth();
    const cred = await signInWithEmailAndPassword(auth, email, password);
    const user = cred.user;
    try {
      const idToken = await user.getIdToken();
      await fetch("/api/auth/log-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken }),
      });
    } catch {}
    return user ?? null;
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
      await fetch("/api/auth/log-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken }),
      }).catch(() => {});
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
      await fetch("/api/auth/log-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken }),
      });
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

  // Create a Stripe checkout session for a given plan (starter|pro)
  createStripeCheckoutSession: async (
    planId: Plan["id"]
  ): Promise<{ redirectUrl: string }> => {
    const plan = PLANS[planId];
    if (!plan) throw new Error("Unknown plan");

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? window.location.origin;

    // include ID token so server can associate checkout with the tenant
    let authHeader: Record<string, string> = {};
    try {
      const auth = getFirebaseAuth();
      const token = await auth.currentUser?.getIdToken();
      if (token) authHeader = { Authorization: `Bearer ${token}` };
    } catch {}

    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json", ...authHeader },
      body: JSON.stringify({
        priceId: plan.priceId,
        planId,
        successUrl: `${baseUrl}/billing?checkout=success&plan=${planId}`,
        cancelUrl: `${baseUrl}/billing?checkout=canceled`,
      }),
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
};
