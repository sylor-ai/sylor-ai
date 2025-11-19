import { NextRequest, NextResponse } from "next/server";
import {
  getAdminFirestore,
} from "@/lib/firebase-admin";
import { assertTenantMembership } from "@/lib/tenant-context";
import { handleTenantApiError } from "@/lib/api-error";

export async function GET(req: NextRequest) {
  try {
    const { tenantId } = await assertTenantMembership(req as any);
    const db = getAdminFirestore();

    const url = new URL(req.url);
    const staleDays = parseInt(url.searchParams.get("staleDays") || "0", 10);
    const filterNoAgent = url.searchParams.get("noAgent") === "true";

    let query = db
      .collection("tenants")
      .doc(tenantId)
      .collection("conversations")
      .orderBy("lastMessageAt", "desc")
      .limit(50) as any;

    const snap = await query.get();
    const now = Date.now();
    const threshold =
      staleDays > 0 ? now - staleDays * 24 * 60 * 60 * 1000 : null;

    const items: any[] = [];
    for (const doc of snap.docs) {
      const data = doc.data() as any;
      const lastMsgTs =
        (data.lastMessageAt?.toDate?.() as Date | undefined)?.getTime?.() ??
        null;
      if (threshold && lastMsgTs && lastMsgTs > threshold) {
        continue; // not stale enough
      }

      if (filterNoAgent) {
        // skip if any agent messages exist
        const msgsSnap = await doc.ref
          .collection("messages")
          .where("from", "==", "agent")
          .limit(1)
          .get()
          .catch(() => null);
        if (msgsSnap && !msgsSnap.empty) continue;
      }

      items.push({
        id: doc.id,
        leadId: data.leadId || null,
        leadName: data.leadName || "Unknown",
        lastMessage: data.lastMessage || "",
        lastMessageAt: data.lastMessageAt || null,
        aiPaused: !!data.aiPaused,
        aiEnabled: data.aiEnabled ?? true,
        channel: data.channel || "sms",
      });
    }

    return NextResponse.json({ ok: true, conversations: items });
  } catch (err) {
    return handleTenantApiError(err, "[conversations/list] error");
  }
}
