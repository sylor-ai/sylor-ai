// FILE: src/app/api/conversations/toggle-ai/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getAdminFirestore } from "@/lib/firebase-admin";
import { assertTenantMembership } from "@/lib/tenant-context";
import { handleTenantApiError } from "@/lib/api-error";

export async function POST(req: NextRequest) {
  try {
    const { tenantId } = await assertTenantMembership(req);

    const { conversationId, aiEnabled } = await req.json().catch(() => ({} as any));
    if (!conversationId || typeof aiEnabled !== "boolean") {
      return NextResponse.json({ ok: false, error: "missing-fields" }, { status: 400 });
    }

    const db = getAdminFirestore();

    const convoRef = db
      .collection("tenants")
      .doc(tenantId)
      .collection("conversations")
      .doc(conversationId);

    await convoRef.set({ aiEnabled }, { merge: true });
    return NextResponse.json({ ok: true });
  } catch (e) {
    return handleTenantApiError(e, "[toggle-ai] error");
  }
}
