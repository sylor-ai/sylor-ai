// FILE: src/lib/firebase-admin.ts
// ✅ SERVER-ONLY — never import this in React components
import "server-only";

import { getApps, getApp, initializeApp, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

// FIREBASE_SERVICE_ACCOUNT_KEY should be a JSON string in .env.local
// Example:
// FIREBASE_SERVICE_ACCOUNT_KEY={"type":"service_account","project_id":"...","private_key":"-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n","client_email":"...","token_uri":"https://oauth2.googleapis.com/token"}

const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

let app;
if (!getApps().length) {
  if (serviceAccountJson) {
    let parsed: any;
    try {
      parsed = JSON.parse(serviceAccountJson);
    } catch (err) {
      console.error(
        "[firebase-admin] FIREBASE_SERVICE_ACCOUNT_KEY is not valid JSON"
      );
      throw err;
    }
    app = initializeApp({ credential: cert(parsed) });
  } else {
    // fallback if GOOGLE_APPLICATION_CREDENTIALS is configured
    app = initializeApp();
  }
} else {
  app = getApp();
}

// singletons
const adminAuth = getAuth(app);
const adminDb = getFirestore(app);

export function getAdminAuth() {
  return adminAuth;
}

export function getAdminFirestore() {
  return adminDb;
}

// Verify a raw ID token string
export async function verifyIdToken(token: string) {
  return adminAuth.verifyIdToken(token);
}

// Convenience: verify token directly from a Next Request
export async function verifyIdTokenFromRequest(req: Request) {
  const header =
    req.headers.get("authorization") || req.headers.get("Authorization");
  if (!header) return null;

  const [scheme, token] = header.split(" ");
  if (scheme !== "Bearer" || !token) return null;

  try {
    return await verifyIdToken(token); // decoded { uid, email, ... }
  } catch (err) {
    console.warn("[firebase-admin] invalid id token", err);
    return null;
  }
}
