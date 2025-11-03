// FILE: src/lib/api.ts
"use client";

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  type User as FirebaseUser,
} from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  addDoc,
  orderBy,
  query,
  serverTimestamp,
  writeBatch,
  Timestamp,
} from "firebase/firestore";

import { getFirebaseAuth, getFirebaseDb } from "./firebase";

import {
  User,
  Tenant,
  Lead,
  Appointment,
  Conversation,
  Message,
  Plan,
} from "@/types";

// ─────────────────────────────────────────────────────────
// PLANS (local mirror of Stripe)
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

// ─────────────────────────────────────────────────────────
// helpers
async function ensureTenant(db: any, tenantId: string) {
  const tRef = doc(db, "tenants", tenantId);
  const snap = await getDoc(tRef);
  if (!snap.exists()) {
    await setDoc(tRef, {
      id: tenantId,
      businessName: "",
      businessPhone: "",
      planId: null,
      stripeCustomerId: `cus_${Date.now()}`,
      twilioNumber: null,
      createdAt: serverTimestamp(),
    });
  }
}

async function ensureUserDocFromFirebaseUser(
  fbUser: FirebaseUser
): Promise<User> {
  const db = getFirebaseDb();
  const uid = fbUser.uid;
  const userRef = doc(db, "users", uid);
  const snap = await getDoc(userRef);

  if (snap.exists()) {
    return { id: snap.id, ...snap.data() } as User;
  }

  // create tenant + user
  await ensureTenant(db, uid);

  const display = fbUser.displayName || fbUser.email?.split("@")[0] || "User";
  const initials = display
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  const userData: Omit<User, "id"> = {
    name: display,
    email: fbUser.email ?? "",
    avatarInitials: initials || "U",
    tenantId: uid,
  };

  await setDoc(userRef, userData);

  return { id: uid, ...userData } as User;
}

// tell server "someone logged in" → for auditLogs
async function logLoginToServer(idToken: string) {
  try {
    await fetch("/api/auth/log-login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idToken }),
    });
  } catch {
    // do not block UI
  }
}

// ─────────────────────────────────────────────────────────
// MAIN API
export const api = {
  // ─── AUTH (EMAIL+PASSWORD LOGIN) ──────────────────────
  login: async (email: string, password: string): Promise<User | null> => {
    const auth = getFirebaseAuth();
    const db = getFirebaseDb();

    const cred = await signInWithEmailAndPassword(auth, email, password);
    const uid = cred.user.uid;

    // audit on server
    const idToken = await cred.user.getIdToken();
    await logLoginToServer(idToken);

    const userRef = doc(db, "users", uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      return { id: userSnap.id, ...userSnap.data() } as User;
    }

    // Firestore doc missing → rebuild
    const fallbackName = cred.user.email?.split("@")[0] ?? "User";
    const initials = fallbackName[0]?.toUpperCase() ?? "U";

    await ensureTenant(db, uid);

    const rebuiltUser: Omit<User, "id"> = {
      name: fallbackName,
      email: cred.user.email ?? "",
      avatarInitials: initials,
      tenantId: uid,
    };

    await setDoc(userRef, rebuiltUser);

    return { id: uid, ...rebuiltUser } as User;
  },

  logout: async (): Promise<void> => {
    const auth = getFirebaseAuth();
    await signOut(auth);
  },

  // ─── LEGACY DIRECT SIGNUP (keep for admin/superuser) ──
  signUp: async (
    name: string,
    email: string,
    password: string
  ): Promise<{ user: User | null; error: string | null }> => {
    const auth = getFirebaseAuth();
    const db = getFirebaseDb();

    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      const uid = cred.user.uid;

      // tenant = uid
      const tenantRef = doc(db, "tenants", uid);
      await setDoc(tenantRef, {
        id: uid,
        businessName: "",
        businessPhone: "",
        planId: null,
        stripeCustomerId: `cus_${Date.now()}`,
        twilioNumber: null,
        createdAt: serverTimestamp(),
      });

      const initials = name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase();

      const userRef = doc(db, "users", uid);
      const userData: Omit<User, "id"> = {
        name,
        email,
        avatarInitials: initials || "U",
        tenantId: uid,
      };
      await setDoc(userRef, userData);

      // audit this too
      const idToken = await cred.user.getIdToken();
      await logLoginToServer(idToken);

      return { user: { id: uid, ...userData }, error: null };
    } catch (err: any) {
      console.error("signUp error", err);
      if (err?.code === "auth/email-already-in-use") {
        return { user: null, error: "email-in-use" };
      }
      return { user: null, error: "unknown" };
    }
  },

  // ─── EMAIL-CODE SIGNUP (step 1) ───────────────────────
  requestSignupCode: async (payload: {
    name: string;
    email: string;
    password: string;
    plan?: string;
  }): Promise<{ ok: boolean; error?: string }> => {
    const res = await fetch("/api/auth/request-code", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    try {
      return await res.json();
    } catch {
      return { ok: false, error: "SERVER_HTML_RESPONSE" };
    }
  },

  // ─── EMAIL-CODE SIGNUP (step 2) ───────────────────────
  verifySignupCode: async (payload: {
    email: string;
    code: string;
  }): Promise<{ ok: boolean; error?: string }> => {
    const res = await fetch("/api/auth/verify-code", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    try {
      return await res.json();
    } catch {
      return { ok: false, error: "SERVER_HTML_RESPONSE" };
    }
  },

  // ─── CHECKOUT (step 3) ─────────────────────────────────
  startCheckoutForEmail: async (
    email: string
  ): Promise<{ ok: boolean; url?: string; error?: string }> => {
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    try {
      const data = await res.json();
      if (res.ok) {
        return { ok: true, url: data.url as string };
      }
      return { ok: false, error: data.error ?? "Checkout failed" };
    } catch {
      return { ok: false, error: "SERVER_HTML_RESPONSE" };
    }
  },

  // ─── FINALIZE (step 4) ─────────────────────────────────
  finalizeSignup: async (
    sessionId: string
  ): Promise<{
    ok: boolean;
    error?: string;
    user?: { uid: string; email: string; tenantId: string };
  }> => {
    const res = await fetch("/api/auth/finalize-signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ session_id: sessionId }),
    });

    try {
      return await res.json();
    } catch {
      return { ok: false, error: "SERVER_HTML_RESPONSE" };
    }
  },

  // ─── GOOGLE SIGN-IN ───────────────────────────────────
  googleSignIn: async (): Promise<User | null> => {
    const auth = getFirebaseAuth();
    const provider = new GoogleAuthProvider();
    const cred = await signInWithPopup(auth, provider);
    const fbUser = cred.user;

    // audit
    const idToken = await fbUser.getIdToken();
    await logLoginToServer(idToken);

    return await ensureUserDocFromFirebaseUser(fbUser);
  },

  // ─── TENANT / USER ────────────────────────────────────
  getUserProfile: async (uid: string): Promise<User | null> => {
    const db = getFirebaseDb();
    const snap = await getDoc(doc(db, "users", uid));
    if (!snap.exists()) return null;
    return { id: snap.id, ...snap.data() } as User;
  },

  getTenant: async (tenantId: string): Promise<Tenant | null> => {
    const db = getFirebaseDb();
    const snap = await getDoc(doc(db, "tenants", tenantId));
    if (!snap.exists()) return null;
    return { id: snap.id, ...snap.data() } as Tenant;
  },

  updateTenant: async (
    tenantId: string,
    data: Partial<Tenant>
  ): Promise<Tenant> => {
    const db = getFirebaseDb();
    const ref = doc(db, "tenants", tenantId);
    await setDoc(ref, { id: tenantId, ...data }, { merge: true });
    const snap = await getDoc(ref);
    return { id: snap.id, ...snap.data() } as Tenant;
  },

  completeBusinessSetup: async (
    tenantId: string,
    data: Partial<Tenant>
  ): Promise<Tenant> => {
    const mockTwilio = `+1${Math.floor(200 + Math.random() * 700)}${Math.floor(
      1000000 + Math.random() * 9000000
    )}`;
    return await api.updateTenant(tenantId, {
      ...data,
      twilioNumber: mockTwilio,
    });
  },

  updateUser: async (userId: string, data: Partial<User>): Promise<User> => {
    const db = getFirebaseDb();
    const ref = doc(db, "users", userId);
    await updateDoc(ref, data);
    const snap = await getDoc(ref);
    return { id: snap.id, ...snap.data() } as User;
  },

  // ─── ACCOUNT MANAGEMENT ───────────────────────────────
  requestPasswordReset: async (
    email: string
  ): Promise<{ ok: boolean; error?: string }> => {
    const res = await fetch("/api/auth/request-password-reset", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    try {
      return await res.json();
    } catch {
      return { ok: false, error: "SERVER_HTML_RESPONSE" };
    }
  },

  deleteMyAccount: async (): Promise<{ ok: boolean; error?: string }> => {
    const auth = getFirebaseAuth();
    const current = auth.currentUser;
    if (!current) return { ok: false, error: "not-logged-in" };

    const idToken = await current.getIdToken();

    const res = await fetch("/api/auth/delete-account", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`,
      },
    });

    try {
      return await res.json();
    } catch {
      return { ok: false, error: "SERVER_HTML_RESPONSE" };
    }
  },

  // ─── PLANS / BILLING (in-app upgrades) ────────────────
  getPlans: (): Plan[] => Object.values(PLANS),

  getCurrentPlan: async (tenantId: string): Promise<Plan | null> => {
    const tenant = await api.getTenant(tenantId);
    if (!tenant?.planId) return null;
    return PLANS[tenant.planId] || null;
  },

  createStripeCheckoutSession: async (
    planId: Plan["id"]
  ): Promise<{ redirectUrl: string }> => {
    const plan = PLANS[planId];
    if (!plan) throw new Error("Unknown plan");

    const baseUrl =
      process.env.NEXT_PUBLIC_APP_URL ?? window.location.origin;

    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        priceId: plan.priceId,
        successUrl: `${baseUrl}/setup?plan=${planId}`,
        cancelUrl: `${baseUrl}/pricing?canceled=1`,
      }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      console.error("Stripe checkout failed:", err);
      throw new Error(err?.error ?? "Checkout failed");
    }

    const data = await res.json();
    return { redirectUrl: data.url as string };
  },

  confirmCheckoutSession: async (
    tenantId: string,
    planId: Plan["id"]
  ): Promise<void> => {
    await api.updateTenant(tenantId, { planId });
  },

  // ─── LEADS ────────────────────────────────────────────
  getLeads: async (tenantId: string): Promise<Lead[]> => {
    const db = getFirebaseDb();
    const leadsCol = collection(db, "tenants", tenantId, "leads");
    const q = query(leadsCol, orderBy("created", "desc"));
    const snap = await getDocs(q);

    return snap.docs.map((d) => {
      const data = d.data() as any;
      const created = data.created
        ? (data.created as Timestamp).toDate().toLocaleDateString("en-US")
        : "N/A";
      return {
        id: d.id,
        ...data,
        created,
      } as Lead;
    });
  },

  createLead: async (
    tenantId: string,
    leadData: Omit<Lead, "id" | "leadId" | "created">
  ): Promise<void> => {
    const db = getFirebaseDb();
    const leadsCol = collection(db, "tenants", tenantId, "leads");
    const newLead = {
      ...leadData,
      leadId: `L-${Math.floor(Math.random() * 9000) + 1000}`,
      created: serverTimestamp(),
    };
    await addDoc(leadsCol, newLead);

    // create a conversation
    const convoCol = collection(db, "tenants", tenantId, "conversations");
    const convoRef = doc(convoCol);
    const batch = writeBatch(db);

    batch.set(convoRef, {
      leadId: "temp",
      leadName: leadData.name,
      lastMessage: `Hey ${leadData.name}, thanks for contacting us!`,
      lastMessageAt: serverTimestamp(),
      channel: "sms",
      leadAvatarUrl: `https://i.pravatar.cc/150?u=${leadData.phone}`,
    } satisfies Omit<Conversation, "id">);

    const msgsCol = collection(
      db,
      "tenants",
      tenantId,
      "conversations",
      convoRef.id,
      "messages"
    );
    const msgRef = doc(msgsCol);
    batch.set(msgRef, {
      from: "agent",
      direction: "outbound",
      body: `Hey ${leadData.name}, thanks for contacting us!`,
      createdAt: serverTimestamp(),
    } satisfies Omit<Message, "id">);

    await batch.commit();
  },

  // ─── APPOINTMENTS ─────────────────────────────────────
  getAppointments: async (tenantId: string): Promise<Appointment[]> => {
    const db = getFirebaseDb();
    const colRef = collection(db, "tenants", tenantId, "appointments");
    const snap = await getDocs(colRef);
    return snap.docs.map(
      (d) => ({ id: d.id, ...d.data() } as Appointment)
    );
  },

  saveAppointment: async (
    tenantId: string,
    appt: Appointment
  ): Promise<void> => {
    const db = getFirebaseDb();
    const id = appt.id?.startsWith("new-")
      ? doc(collection(db, "tenants", tenantId, "appointments")).id
      : appt.id;

    await setDoc(
      doc(db, "tenants", tenantId, "appointments", id),
      { ...appt, id },
      { merge: true }
    );
  },

  deleteAppointment: async (
    tenantId: string,
    id: string
  ): Promise<void> => {
    const db = getFirebaseDb();
    await setDoc(
      doc(db, "tenants", tenantId, "appointments", id),
      {},
      { merge: true }
    );
  },

  // ─── MESSAGES ─────────────────────────────────────────
  getConversations: async (tenantId: string): Promise<Conversation[]> => {
    const db = getFirebaseDb();
    const colRef = collection(db, "tenants", tenantId, "conversations");
    const q = query(colRef, orderBy("lastMessageAt", "desc"));
    const snap = await getDocs(q);
    return snap.docs.map(
      (d) => ({ id: d.id, ...d.data() } as Conversation)
    );
  },

  getMessagesForConversation: async (
    tenantId: string,
    conversationId: string
  ): Promise<Message[]> => {
    const db = getFirebaseDb();
    const colRef = collection(
      db,
      "tenants",
      tenantId,
      "conversations",
      conversationId,
      "messages"
    );
    const q = query(colRef, orderBy("createdAt", "asc"));
    const snap = await getDocs(q);
    return snap.docs.map(
      (d) => ({ id: d.id, ...d.data() } as Message)
    );
  },

  simulateInboundSms: async (
    tenantId: string,
    conversationId: string,
    body: string
  ): Promise<void> => {
    const db = getFirebaseDb();
    const msgsCol = collection(
      db,
      "tenants",
      tenantId,
      "conversations",
      conversationId,
      "messages"
    );
    await addDoc(msgsCol, {
      from: "lead",
      direction: "inbound",
      body,
      createdAt: serverTimestamp(),
    });
    await updateDoc(
      doc(db, "tenants", tenantId, "conversations", conversationId),
      {
        lastMessage: body,
        lastMessageAt: serverTimestamp(),
      }
    );
  },
};
