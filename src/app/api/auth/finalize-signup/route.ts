// FILE: src/app/api/auth/finalize-signup/route.ts
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getAdminAuth, getAdminFirestore } from "@/lib/firebase-admin";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-10-29.clover",
});

export async function POST(req: Request) {
  try {
    const { session_id } = await req.json();
    if (!session_id) {
      return NextResponse.json(
        { ok: false, error: "Missing session_id" },
        { status: 400 }
      );
    }

    const stripeSession = await stripe.checkout.sessions.retrieve(session_id);

    if (
      stripeSession.payment_status !== "paid" &&
      stripeSession.status !== "complete"
    ) {
      return NextResponse.json(
        { ok: false, error: "Payment not completed" },
        { status: 400 }
      );
    }

    const email =
      (stripeSession.metadata?.email as string) ||
      (stripeSession.customer_details?.email as string);

    if (!email) {
      return NextResponse.json(
        { ok: false, error: "No email on Stripe session" },
        { status: 400 }
      );
    }

    const normEmail = email.toLowerCase();
    const firestore = getAdminFirestore();
    const adminAuth = getAdminAuth();

    const snap = await firestore
      .collection("pendingSignups")
      .doc(normEmail)
      .get();

    if (!snap.exists) {
      return NextResponse.json(
        { ok: false, error: "No pending signup for this email" },
        { status: 404 }
      );
    }

    const data = snap.data() as any;

    // 1) create Firebase Auth user
    let userRecord;
    try {
      userRecord = await adminAuth.createUser({
        email: normEmail,
        password: data.password,
        displayName: data.name,
      });
    } catch (e: any) {
      if (e?.code === "auth/email-already-exists") {
        userRecord = await adminAuth.getUserByEmail(normEmail);
      } else {
        throw e;
      }
    }

    const uid = userRecord.uid;
    const plan = data.plan || "starter";

    // 2) create tenant
    const tenantRef = firestore.collection("tenants").doc(uid);
    await tenantRef.set({
      id: uid,
      ownerUid: uid,
      businessName: data.name || "My Business",
      planId: plan,
      stripeCustomerId: stripeSession.customer?.toString() || null,
      createdAt: Date.now(),
    });

    // 3) create user doc
    await firestore.collection("users").doc(uid).set({
      name: data.name,
      email: normEmail,
      avatarInitials: (data.name || normEmail)[0]?.toUpperCase() || "U",
      tenantId: uid,
      createdAt: Date.now(),
    });

    // 4) cleanup
    await snap.ref.delete();

    return NextResponse.json({
      ok: true,
      user: {
        uid,
        email: normEmail,
        tenantId: uid,
      },
    });
  } catch (e: any) {
    console.error("finalize-signup error", e);
    return NextResponse.json(
      { ok: false, error: "Server error finalizing signup" },
      { status: 500 }
    );
  }
}
