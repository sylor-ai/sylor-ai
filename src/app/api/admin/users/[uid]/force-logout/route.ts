import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";
import { requireSuperAdmin } from "@/lib/admin-auth";

type ParamsPromise = Promise<{ uid: string }>;

export async function POST(
  _req: Request,
  context: { params: ParamsPromise }
) {
  try {
    await requireSuperAdmin();
    const { uid } = await context.params;

    if (!uid) {
      return NextResponse.json(
        { ok: false, error: "Missing uid" },
        { status: 400 }
      );
    }

    await adminDb
      .collection("users")
      .doc(uid)
      .set(
        {
          forceLogoutAt: new Date().toISOString(),
        },
        { merge: true }
      );

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error("[admin] force-logout failed", err);
    return NextResponse.json(
      { ok: false, error: err?.message ?? "Failed to flag logout" },
      { status: 500 }
    );
  }
}
