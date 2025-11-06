import { getAdminFirestore } from "@/lib/firebase-admin";

export async function getTenantBySlug(slug: string) {
  const db = getAdminFirestore();
  const snap = await db
    .collection("tenants")
    .where("publicSlug", "==", slug)
    .limit(1)
    .get();

  if (snap.empty) return null;

  const doc = snap.docs[0];
  return { id: doc.id, ...(doc.data() as any) } as any;
}

