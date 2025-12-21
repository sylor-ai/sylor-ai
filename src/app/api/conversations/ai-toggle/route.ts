// FILE: src/app/api/conversations/ai-toggle/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getAdminFirestore } from "@/lib/firebase-admin";
import { assertTenantWriteContext } from "@/lib/tenant-context";
import { handleTenantApiError } from "@/lib/api-error";

export async function POST(req: NextRequest) {
  try {
    // REQUIRE_TENANT_WRITE_CONTEXT
    const { tenantId } = await assertTenantWriteContext(req as any);
    const db = getAdminFirestore();

    const { conversationId, aiPaused } = await req.json().catch(() => ({} as any));
    if (!conversationId || typeof aiPaused !== "boolean") {
      return NextResponse.json({ ok: false, error: "missing-fields" }, { status: 400 });
    }

    const convoRef = db
      .collection("tenants")
      .doc(tenantId)
      .collection("conversations")
      .doc(conversationId);

    await convoRef.set(
      {
        aiPaused,
        aiLastStatus: aiPaused ? "off" : "on",
      },
      { merge: true }
    );

    return NextResponse.json({ ok: true });
  } catch (err) {
    return handleTenantApiError(err, "[ai-toggle] error");
  }
}
