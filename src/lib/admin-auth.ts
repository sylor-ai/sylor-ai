import { cookies } from "next/headers";
import { verifySylorSession } from "@/lib/auth-server";
import { getAdminFirestore } from "@/lib/firebase-admin";
import type { User } from "@/types";

export type AdminContext = {
  firebaseUid: string;
  userDoc: User;
};

function buildError(message: string, status: number) {
  const err = new Error(message);
  (err as any).status = status;
  return err;
}

export async function requireSuperAdmin(): Promise<AdminContext> {
  const cookieStore = await cookies();
  const rawSession = cookieStore.get("sylor_session")?.value ?? null;
  if (!rawSession) {
    throw buildError("Unauthorized", 401);
  }

  const verified = await verifySylorSession(rawSession);
  if (!verified) {
    throw buildError("Unauthorized", 401);
  }

  const db = getAdminFirestore();
  const snap = await db.collection("users").doc(verified.id).get();
  if (!snap.exists) {
    throw buildError("Forbidden", 403);
  }

  const userDoc = snap.data() as User;
  if (userDoc?.role !== "super_admin") {
    throw buildError("Forbidden", 403);
  }

  return {
    firebaseUid: verified.id,
    userDoc: { ...userDoc, id: verified.id },
  };
}
