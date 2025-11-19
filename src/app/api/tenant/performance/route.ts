import { NextRequest, NextResponse } from "next/server";
import {
  getAdminFirestore,
} from "@/lib/firebase-admin";
import { assertTenantMembership } from "@/lib/tenant-context";
import { handleTenantApiError } from "@/lib/api-error";

type Metrics = {
  totalLeads: number;
  conversationsEvaluated: number;
  avgFirstResponseMs: number | null;
  leadRepliedCount: number;
  leadRepliedNoAgentResponse: number;
  churnRiskScore: number;
};

function computeChurnRisk(
  leadRepliedNoAgentResponse: number,
  totalLeads: number
): number {
  if (!totalLeads) return 0;
  const ratio = leadRepliedNoAgentResponse / totalLeads;
  return Math.min(100, Math.round(ratio * 100));
}

export async function GET(req: NextRequest) {
  try {
    const { tenantId } = await assertTenantMembership(req as any);
    const db = getAdminFirestore();

    const leadsCol = db
      .collection("tenants")
      .doc(tenantId)
      .collection("leads");
    const leadsSnap = await leadsCol.get();
    const totalLeads = leadsSnap.size;

    const convoCol = db
      .collection("tenants")
      .doc(tenantId)
      .collection("conversations");

    // Evaluate recent conversations to avoid massive scans
    const convoSnap = await convoCol
      .orderBy("lastMessageAt", "desc")
      .limit(200)
      .get()
      .catch(() => null);

    let totalFirstResponseMs = 0;
    let firstResponseSamples = 0;
    let leadRepliedCount = 0;
    let leadRepliedNoAgentResponse = 0;
    let conversationsEvaluated = 0;

    if (convoSnap && !convoSnap.empty) {
      for (const convo of convoSnap.docs) {
        const messagesSnap = await convo.ref
          .collection("messages")
          .orderBy("createdAt", "asc")
          .limit(50)
          .get()
          .catch(() => null);

        if (!messagesSnap || messagesSnap.empty) continue;
        conversationsEvaluated++;

        let firstLeadTs: number | null = null;
        let firstAgentTs: number | null = null;
        let hasLeadReply = false;
        let hasAgentReply = false;

        for (const msg of messagesSnap.docs) {
          const data = msg.data() as any;
          const ts =
            (data.createdAt?.toDate?.() as Date | undefined)?.getTime?.() ??
            null;
          if (data.from === "lead") {
            hasLeadReply = true;
            if (!firstLeadTs && ts) firstLeadTs = ts;
          } else {
            hasAgentReply = true;
            if (!firstAgentTs && ts) firstAgentTs = ts;
          }
        }

        if (firstLeadTs && firstAgentTs) {
          const diff = firstAgentTs - firstLeadTs;
          if (diff >= 0) {
            totalFirstResponseMs += diff;
            firstResponseSamples++;
          }
        }

        if (hasLeadReply) {
          leadRepliedCount++;
          if (!hasAgentReply) {
            leadRepliedNoAgentResponse++;
          }
        }
      }
    }

    const avgFirstResponseMs =
      firstResponseSamples > 0
        ? Math.round(totalFirstResponseMs / firstResponseSamples)
        : null;

    const churnRiskScore = computeChurnRisk(
      leadRepliedNoAgentResponse,
      totalLeads
    );

    const metrics: Metrics = {
      totalLeads,
      conversationsEvaluated,
      avgFirstResponseMs,
      leadRepliedCount,
      leadRepliedNoAgentResponse,
      churnRiskScore,
    };

    return NextResponse.json({ ok: true, metrics });
  } catch (err) {
    return handleTenantApiError(err, "[tenant/performance] error");
  }
}
