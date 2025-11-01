// src/hooks/use-current-user.ts
"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { getFirebaseAuth } from "@/lib/firebase";
import { api } from "@/lib/api";
import type { User } from "@/types";

export function useCurrentUser() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getFirebaseAuth();
    const unsub = onAuthStateChanged(auth, async (fbUser) => {
      if (!fbUser) {
        setCurrentUser(null);
        setLoading(false);
        return;
      }
      const profile = await api.getUserProfile(fbUser.uid);
      setCurrentUser(profile);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  return { currentUser, loading };
}
