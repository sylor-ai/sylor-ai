// FILE: src/app/api/system/summary/route.ts
import { NextResponse } from "next/server";
import { getAdminFirestore, verifyIdTokenFromRequest } from "@/lib/firebase-admin";

const ADMIN_UIDS = (process.env.ADMIN_UIDS || "").split(",").map((s) => s.trim()).filter(Boolean);

export async function GET(req: Request) {
  try {
    const decoded = await verifyIdTokenFromRequest(req);
    if (!decoded) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

    const isAdmin = ADMIN_UIDS.includes(decoded.uid);
    if (!isAdmin) return NextResponse.json({ error: "forbidden" }, { status: 403 });

    const db = getAdminFirestore();

    const auditSnap = await db
      .collection("auditLogs")
      .orderBy("ts", "desc")
      .limit(20)
      .get();

    const tenantsSnap = await db
      .collection("tenants")
      .orderBy("updatedAt", "desc")
      .limit(20)
      .get();

    const audits = auditSnap.docs.map((d) => ({ id: d.id, ...d.data() }));
    const tenants = tenantsSnap.docs.map((d) => ({ id: d.id, ...d.data() }));

    return NextResponse.json({ ok: true, audits, tenants });
  } catch (e) {
    console.error("[system summary] error", e);
    return NextResponse.json({ error: "server-error" }, { status: 500 });
  }
}

