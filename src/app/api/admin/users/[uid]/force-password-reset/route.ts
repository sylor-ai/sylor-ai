import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";
import { requireSuperAdmin } from "@/lib/admin-auth";
import { createPasswordResetRequest } from "@/lib/password-resets";

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

    const snap = await adminDb.collection("users").doc(uid).get();
    if (!snap.exists) {
      return NextResponse.json(
        { ok: false, error: "User not found" },
        { status: 404 }
      );
    }

    const email = snap.data()?.email as string | undefined;
    if (!email) {
      return NextResponse.json(
        { ok: false, error: "User has no email" },
        { status: 400 }
      );
    }

    await createPasswordResetRequest(email.toLowerCase(), req.headers);

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    const status = err?.status ?? 500;
    return NextResponse.json(
      { ok: false, error: err?.message ?? "Failed to trigger reset" },
      { status }
    );
  }
}
