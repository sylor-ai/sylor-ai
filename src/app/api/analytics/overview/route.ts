import { NextRequest, NextResponse } from "next/server";
import type { FirebaseFirestore } from "firebase-admin/firestore";
import { getAdminFirestore } from "@/lib/firebase-admin";
import { getAuthContext } from "@/lib/auth-server";

const DAY_MS = 24 * 60 * 60 * 1000;

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
});

export async function GET(req: NextRequest) {
  try {
    const ctx = await getAuthContext(req);
    if (!ctx) {
      return NextResponse.json(
        { ok: false, error: "unauthorized" },
        { status: 401 }
      );
    }

    const db = getAdminFirestore();
    const tenantRef = db.collection("tenants").doc(ctx.tenantId);
    const leadsCol = tenantRef.collection("leads");
    const appointmentsCol = tenantRef.collection("appointments");

    const now = new Date();
    const startOfToday = new Date(now);
    startOfToday.setHours(0, 0, 0, 0);
    const sevenDaysAgo = new Date(now.getTime() - 7 * DAY_MS);
    const fourteenDaysAgo = new Date(now.getTime() - 14 * DAY_MS);

    const [leadsCreatedAtSnap, leadsCreatedSnap, appointmentsSnap, aiMessagesSnap] =
      await Promise.all([
        leadsCol
          .where("createdAt", ">=", fourteenDaysAgo)
          .get()
          .catch(() => null),
        leadsCol
          .where("created", ">=", fourteenDaysAgo)
          .get()
          .catch(() => null),
        appointmentsCol.get().catch(() => null),
        db
          .collectionGroup("messages")
          .where("tenantId", "==", ctx.tenantId)
          .where("via", "==", "ai")
          .where("createdAt", ">=", sevenDaysAgo)
          .get()
          .catch(() => null),
      ]);

    const leadDocs = mergeSnapshots(leadsCreatedAtSnap, leadsCreatedSnap);
    const leadsCountLast7Days = leadDocs.filter((doc) => {
      const created = resolveDate(doc.get("createdAt") ?? doc.get("created"));
      return created ? created >= sevenDaysAgo : false;
    }).length;

    const leadsCountToday = leadDocs.filter((doc) => {
      const created = resolveDate(doc.get("createdAt") ?? doc.get("created"));
      return created ? created >= startOfToday : false;
    }).length;

    const appointmentsLast7Days =
      appointmentsSnap?.docs.filter((doc) => {
        const start = resolveDate(
          doc.get("startTime") ?? doc.get("start") ?? doc.get("date")
        );
        return start ? start >= sevenDaysAgo && start <= now : false;
      }).length ?? 0;

    const aiMessagesLast7Days = aiMessagesSnap?.size ?? 0;

    const leadsByDay = buildLeadsSeries(leadDocs, fourteenDaysAgo, startOfToday);

    return NextResponse.json({
      ok: true,
      leadsCountToday,
      leadsCountLast7Days,
      appointmentsLast7Days,
      aiMessagesLast7Days,
      leadsByDay,
    });
  } catch (err) {
    console.error("[analytics-overview] failed", err);
    return NextResponse.json(
      { ok: false, error: "internal_error" },
      { status: 500 }
    );
  }
}

function mergeSnapshots(
  ...snaps: Array<FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData> | null>
) {
  const map = new Map<string, FirebaseFirestore.QueryDocumentSnapshot>();
  snaps.forEach((snap) => {
    snap?.forEach((doc) => {
      map.set(doc.id, doc);
    });
  });
  return Array.from(map.values());
}

function resolveDate(value: any): Date | null {
  if (!value) return null;
  if (value instanceof Date) return value;
  if (typeof value.toDate === "function") return value.toDate();
  if (typeof value === "number") return new Date(value);
  if (typeof value === "string") {
    const parsed = new Date(value);
    return isNaN(parsed.getTime()) ? null : parsed;
  }
  return null;
}

function buildLeadsSeries(
  docs: FirebaseFirestore.QueryDocumentSnapshot[],
  windowStart: Date,
  todayStart: Date
) {
  const buckets = new Map<string, { count: number; label: string }>();
  for (let i = 13; i >= 0; i--) {
    const date = new Date(todayStart.getTime() - i * DAY_MS);
    const key = date.toISOString().slice(0, 10);
    buckets.set(key, {
      count: 0,
      label: dateFormatter.format(date),
    });
  }

  docs.forEach((doc) => {
    const created = resolveDate(doc.get("createdAt") ?? doc.get("created"));
    if (!created) return;
    if (created < windowStart) return;
    const key = created.toISOString().slice(0, 10);
    if (buckets.has(key)) {
      const bucket = buckets.get(key)!;
      bucket.count += 1;
    }
  });

  return Array.from(buckets.entries()).map(([date, payload]) => ({
    date,
    label: payload.label,
    count: payload.count,
  }));
}
