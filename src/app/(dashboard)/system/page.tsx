import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifySylorSession } from "@/lib/auth-server";
import SystemClient from "./system-client";

function isAdmin(uid: string | null | undefined): boolean {
  if (!uid) return false;
  const raw = process.env.ADMIN_UIDS || "";
  const ids = raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  return ids.includes(uid);
}

export default async function SystemPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get("sylor_session")?.value || null;

  let uid: string | null = null;

  if (session) {
    try {
      const user = await verifySylorSession(session);
      uid = user?.id ?? null;
    } catch (err) {
      console.error("[/system] verifySylorSession failed", err);
    }
  }

  if (!isAdmin(uid)) {
    return redirect("/dashboard");
  }

  return <SystemClient />;
}
