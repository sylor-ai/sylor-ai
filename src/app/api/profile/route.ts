// FILE: src/app/api/profile/route.ts
import { NextResponse } from "next/server";
import { getAdminFirestore, verifyIdTokenFromRequest } from "@/lib/firebase-admin";

export async function GET(req: Request) {
  const decoded = await verifyIdTokenFromRequest(req);
  if (!decoded) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  const db = getAdminFirestore();
  const uid = decoded.uid;

  const [userDoc, tenantDoc] = await Promise.all([
    db.collection("users").doc(uid).get(),
    db.collection("tenants").doc(uid).get(),
  ]);

  return NextResponse.json({
    ok: true,
    user: userDoc.exists ? { id: userDoc.id, ...userDoc.data() } : null,
    tenant: tenantDoc.exists ? { id: tenantDoc.id, ...tenantDoc.data() } : null,
  });
}

export async function POST(req: Request) {
  const decoded = await verifyIdTokenFromRequest(req);
  if (!decoded) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  const db = getAdminFirestore();
  const uid = decoded.uid;
  const body = await req.json();
  const { businessName, businessPhone } = body || {};

  await db.collection("tenants").doc(uid).set(
    {
      id: uid,
      businessName: businessName ?? "",
      businessPhone: businessPhone ?? "",
      updatedAt: Date.now(),
    },
    { merge: true }
  );

  return NextResponse.json({ ok: true });
}
