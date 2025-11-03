// SERVER ROUTE – runs on server, can use firebase-admin
import { NextResponse } from "next/server";
import { getAdminAuth, getAdminFirestore } from "@/lib/firebase-admin";

export async function POST(req: Request) {
  try {
    const { uid } = await req.json();

    if (!uid) {
      return NextResponse.json({ ok: false, error: "Missing uid" }, { status: 400 });
    }

    const firestore = getAdminFirestore();

    // read user to get tenantId
    const userSnap = await firestore.collection("users").doc(uid).get();
    const userData = userSnap.data() as any;

    const tenantId = userData?.tenantId;

    // delete user doc
    await firestore.collection("users").doc(uid).delete();

    // delete tenant + shallow subcollections (for big prod you'd need a Cloud Function or batch)
    if (tenantId) {
      await firestore.collection("tenants").doc(tenantId).delete();
    }

    // delete auth user
    await getAdminAuth().deleteUser(uid);

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("delete account error", e);
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}
