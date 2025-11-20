import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";
import { requireSuperAdmin } from "@/lib/admin-auth";
import type { UserRole } from "@/types";

type ParamsPromise = Promise<{ uid: string }>;

export async function POST(
  req: Request,
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

    const body = await req.json().catch(() => ({}));
    const role = body?.role as UserRole | undefined;
    if (!role) {
      return NextResponse.json(
        { ok: false, error: "Missing role" },
        { status: 400 }
      );
    }

    await adminDb.collection("users").doc(uid).set({ role }, { merge: true });

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    const status = err?.status ?? 500;
    return NextResponse.json(
      { ok: false, error: err?.message ?? "Failed to update role" },
      { status }
    );
  }
}
