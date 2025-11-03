// FILE: src/hooks/use-current-user.ts
"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { getFirebaseAuth, getFirebaseDb } from "@/lib/firebase";
import type { User } from "@/types";

type CurrentUserState = {
  currentUser: User | null;
  loading: boolean;
};

export function useCurrentUser(): CurrentUserState {
  const [state, setState] = useState<CurrentUserState>({
    currentUser: null,
    loading: true,
  });

  useEffect(() => {
    const auth = getFirebaseAuth();
    const db = getFirebaseDb();

    const unsub = onAuthStateChanged(auth, async (fbUser) => {
      if (!fbUser) {
        setState({ currentUser: null, loading: false });
        return;
      }

      const snap = await getDoc(doc(db, "users", fbUser.uid));
      if (snap.exists()) {
        setState({
          currentUser: { id: snap.id, ...snap.data() } as User,
          loading: false,
        });
      } else {
        // user logged in but no Firestore doc yet
        setState({
          currentUser: {
            id: fbUser.uid,
            name: fbUser.displayName ?? fbUser.email ?? "User",
            email: fbUser.email ?? "",
            tenantId: fbUser.uid,
            avatarInitials:
              (fbUser.displayName?.[0] ?? fbUser.email?.[0] ?? "U").toUpperCase(),
          } as User,
          loading: false,
        });
      }
    });

    return () => unsub();
  }, []);

  return state;
}
