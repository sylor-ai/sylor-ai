(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Desktop/sylor-new/src/lib/firebase.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// src/lib/firebase.ts
__turbopack_context__.s([
    "getFirebaseApp",
    ()=>getFirebaseApp,
    "getFirebaseAuth",
    ()=>getFirebaseAuth,
    "getFirebaseDb",
    ()=>getFirebaseDb
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Desktop/sylor-new/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/sylor-new/node_modules/firebase/app/dist/esm/index.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f40$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/sylor-new/node_modules/@firebase/app/dist/esm/index.esm2017.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$firebase$2f$auth$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/sylor-new/node_modules/firebase/auth/dist/esm/index.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$firebase$2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$esm2017$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/sylor-new/node_modules/firebase/node_modules/@firebase/auth/dist/esm2017/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$firebase$2f$firestore$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/sylor-new/node_modules/firebase/firestore/dist/esm/index.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/sylor-new/node_modules/@firebase/firestore/dist/index.esm2017.js [app-client] (ecmascript)");
;
;
;
// pull from env first
const firebaseConfig = {
    apiKey: ("TURBOPACK compile-time value", "AIzaSyA6dY35xgkU54nErsM-PkMh21DL0px7oAM") || "",
    authDomain: ("TURBOPACK compile-time value", "sylor-ai.firebaseapp.com") || "",
    projectId: ("TURBOPACK compile-time value", "sylor-ai") || "",
    storageBucket: ("TURBOPACK compile-time value", "sylor-ai.firebasestorage.app") || "",
    messagingSenderId: ("TURBOPACK compile-time value", "87291214723") || "",
    appId: ("TURBOPACK compile-time value", "1:87291214723:web:ee4dde8ad238aa700214b6") || ""
};
// helper: do we actually have a real project?
const hasValidProject = typeof firebaseConfig.projectId === "string" && firebaseConfig.projectId.trim().length > 0;
function getFirebaseApp() {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f40$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getApps"])().length) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f40$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["initializeApp"])(firebaseConfig);
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f40$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getApp"])();
}
function getFirebaseAuth() {
    const app = getFirebaseApp();
    // client
    if ("TURBOPACK compile-time truthy", 1) {
        try {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$firebase$2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$esm2017$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAuth"])(app);
        } catch  {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$firebase$2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$esm2017$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["initializeAuth"])(app, {
                persistence: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$firebase$2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$esm2017$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["browserLocalPersistence"]
            });
        }
    }
    // server
    try {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$firebase$2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$esm2017$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["initializeAuth"])(app, {
            persistence: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$firebase$2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$esm2017$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["inMemoryPersistence"]
        });
    } catch  {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$firebase$2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$esm2017$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAuth"])(app);
    }
}
function getFirebaseDb() {
    const app = getFirebaseApp();
    if (!hasValidProject) {
        // don't crash SSR — just tell the caller
        throw new Error("Firestore not available: missing Firebase projectId. Set NEXT_PUBLIC_FIREBASE_PROJECT_ID or hardcode config in src/lib/firebase.ts");
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFirestore"])(app);
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/sylor-new/src/lib/api.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// FILE: src/lib/api.ts
//
// Central client-side API for Sylor.ai
// Uses Firebase Auth + Firestore
//
// NOTE: this is a browser/client API — do not import in server-only code.
__turbopack_context__.s([
    "api",
    ()=>api
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Desktop/sylor-new/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$firebase$2f$auth$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/sylor-new/node_modules/firebase/auth/dist/esm/index.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$firebase$2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$esm2017$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/sylor-new/node_modules/firebase/node_modules/@firebase/auth/dist/esm2017/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$firebase$2f$firestore$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/sylor-new/node_modules/firebase/firestore/dist/esm/index.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/sylor-new/node_modules/@firebase/firestore/dist/index.esm2017.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/sylor-new/src/lib/firebase.ts [app-client] (ecmascript)");
"use client";
;
;
;
// ─────────────────────────────────────────────────────────
// 0. LOCAL PLAN DEFINITIONS
// These are the same as before — just keep the product / price IDs
// in sync with your real Stripe dashboard.
const PLANS = {
    starter: {
        id: "starter",
        name: "Starter",
        price: 149,
        features: [
            "50 Leads/mo",
            "SMS Automation",
            "Basic Analytics"
        ],
        productId: "prod_TJgp5PFopMUBwK",
        priceId: "price_1SN3ReHBRIMb0ChwEPz1g2w5"
    },
    pro: {
        id: "pro",
        name: "Pro",
        price: 399,
        features: [
            "Unlimited Leads",
            "SMS & Voice AI",
            "Advanced Analytics",
            "Calendar Sync"
        ],
        productId: "prod_TJgplWZ9KPGuvY",
        priceId: "price_1SN3RrHBRIMb0ChwjSIbQaYn"
    }
};
const api = {
    //
    // ─── AUTH ─────────────────────────────────────────────
    //
    login: async (email, password)=>{
        const auth = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFirebaseAuth"])();
        const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFirebaseDb"])();
        const cred = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$firebase$2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$esm2017$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["signInWithEmailAndPassword"])(auth, email, password);
        const uid = cred.user.uid;
        const userSnap = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDoc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["doc"])(db, "users", uid));
        if (!userSnap.exists()) return null;
        return {
            id: userSnap.id,
            ...userSnap.data()
        };
    },
    logout: async ()=>{
        const auth = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFirebaseAuth"])();
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$firebase$2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$esm2017$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["signOut"])(auth);
    },
    signUp: async (name, email, password)=>{
        const auth = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFirebaseAuth"])();
        const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFirebaseDb"])();
        try {
            const cred = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$firebase$2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$esm2017$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createUserWithEmailAndPassword"])(auth, email, password);
            const uid = cred.user.uid;
            // create tenant
            const tenantRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["doc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["collection"])(db, "tenants"));
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setDoc"])(tenantRef, {
                businessName: "",
                businessPhone: "",
                planId: null,
                stripeCustomerId: `cus_${Date.now()}`,
                twilioNumber: null,
                createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["serverTimestamp"])()
            });
            const initials = name.split(" ").map((n)=>n[0]).join("").toUpperCase();
            // create user profile
            const userRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["doc"])(db, "users", uid);
            const userData = {
                name,
                email,
                avatarInitials: initials,
                tenantId: tenantRef.id
            };
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setDoc"])(userRef, userData);
            return {
                user: {
                    id: uid,
                    ...userData
                },
                error: null
            };
        } catch (err) {
            console.error("signUp error", err);
            if (err?.code === "auth/email-already-in-use") {
                return {
                    user: null,
                    error: "email-in-use"
                };
            }
            return {
                user: null,
                error: "unknown"
            };
        }
    },
    getUserProfile: async (uid)=>{
        const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFirebaseDb"])();
        const snap = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDoc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["doc"])(db, "users", uid));
        if (!snap.exists()) return null;
        return {
            id: snap.id,
            ...snap.data()
        };
    },
    //
    // ─── TENANT & SETUP ───────────────────────────────────
    //
    getTenant: async (tenantId)=>{
        const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFirebaseDb"])();
        const snap = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDoc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["doc"])(db, "tenants", tenantId));
        if (!snap.exists()) return null;
        return {
            id: snap.id,
            ...snap.data()
        };
    },
    updateTenant: async (tenantId, data)=>{
        const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFirebaseDb"])();
        const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["doc"])(db, "tenants", tenantId);
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updateDoc"])(ref, data);
        const snap = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDoc"])(ref);
        return {
            id: snap.id,
            ...snap.data()
        };
    },
    completeBusinessSetup: async (tenantId, data)=>{
        // fake provisioning a twilio number for now
        const mockTwilio = `+1${Math.floor(200 + Math.random() * 700)}${Math.floor(1000000 + Math.random() * 9000000)}`;
        return await api.updateTenant(tenantId, {
            ...data,
            twilioNumber: mockTwilio
        });
    },
    updateUser: async (userId, data)=>{
        const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFirebaseDb"])();
        const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["doc"])(db, "users", userId);
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updateDoc"])(ref, data);
        const snap = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDoc"])(ref);
        return {
            id: snap.id,
            ...snap.data()
        };
    },
    //
    // ─── PLANS / BILLING (REAL STRIPE CALL) ───────────────
    //
    getPlans: ()=>Object.values(PLANS),
    getCurrentPlan: async (tenantId)=>{
        const tenant = await api.getTenant(tenantId);
        if (!tenant?.planId) return null;
        return PLANS[tenant.planId] || null;
    },
    // REAL call to our Next.js route
    createStripeCheckoutSession: async (planId)=>{
        const plan = PLANS[planId];
        if (!plan) {
            throw new Error("Unknown plan");
        }
        const baseUrl = ("TURBOPACK compile-time value", "http://localhost:3000") ?? window.location.origin;
        const res = await fetch("/api/checkout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                priceId: plan.priceId,
                successUrl: `${baseUrl}/setup?plan=${planId}`,
                cancelUrl: `${baseUrl}/pricing?canceled=1`
            })
        });
        if (!res.ok) {
            const err = await res.json().catch(()=>({}));
            console.error("Stripe checkout failed:", err);
            throw new Error(err?.error ?? "Checkout failed");
        }
        const data = await res.json();
        return {
            redirectUrl: data.url
        };
    },
    confirmCheckoutSession: async (tenantId, planId)=>{
        await api.updateTenant(tenantId, {
            planId
        });
    },
    //
    // ─── LEADS ────────────────────────────────────────────
    //
    getLeads: async (tenantId)=>{
        const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFirebaseDb"])();
        const leadsCol = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["collection"])(db, "tenants", tenantId, "leads");
        const q = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["query"])(leadsCol, (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["orderBy"])("created", "desc"));
        const snap = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDocs"])(q);
        return snap.docs.map((d)=>{
            const data = d.data();
            const created = data.created ? data.created.toDate().toLocaleDateString("en-US") : "N/A";
            return {
                id: d.id,
                ...data,
                created
            };
        });
    },
    createLead: async (tenantId, leadData)=>{
        const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFirebaseDb"])();
        const leadsCol = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["collection"])(db, "tenants", tenantId, "leads");
        const newLead = {
            ...leadData,
            leadId: `L-${Math.floor(Math.random() * 9000) + 1000}`,
            created: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["serverTimestamp"])()
        };
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addDoc"])(leadsCol, newLead);
        // also create a conversation so Messages UI has something
        const convoCol = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["collection"])(db, "tenants", tenantId, "conversations");
        const convoRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["doc"])(convoCol);
        const batch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["writeBatch"])(db);
        batch.set(convoRef, {
            leadId: "temp",
            leadName: leadData.name,
            lastMessage: `Hey ${leadData.name}, thanks for contacting us!`,
            lastMessageAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["serverTimestamp"])(),
            channel: "sms",
            leadAvatarUrl: `https://i.pravatar.cc/150?u=${leadData.phone}`
        });
        const msgsCol = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["collection"])(db, "tenants", tenantId, "conversations", convoRef.id, "messages");
        const msgRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["doc"])(msgsCol);
        batch.set(msgRef, {
            from: "agent",
            direction: "outbound",
            body: `Hey ${leadData.name}, thanks for contacting us!`,
            createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["serverTimestamp"])()
        });
        await batch.commit();
    },
    //
    // ─── APPOINTMENTS ─────────────────────────────────────
    //
    getAppointments: async (tenantId)=>{
        const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFirebaseDb"])();
        const colRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["collection"])(db, "tenants", tenantId, "appointments");
        const snap = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDocs"])(colRef);
        return snap.docs.map((d)=>({
                id: d.id,
                ...d.data()
            }));
    },
    saveAppointment: async (tenantId, appt)=>{
        const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFirebaseDb"])();
        const id = appt.id?.startsWith("new-") ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["doc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["collection"])(db, "tenants", tenantId, "appointments")).id : appt.id;
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setDoc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["doc"])(db, "tenants", tenantId, "appointments", id), {
            ...appt,
            id
        }, {
            merge: true
        });
    },
    deleteAppointment: async (tenantId, id)=>{
        const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFirebaseDb"])();
        // you probably want deleteDoc, but keeping merge-empty for now
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setDoc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["doc"])(db, "tenants", tenantId, "appointments", id), {}, {
            merge: true
        });
    },
    //
    // ─── MESSAGES / CONVERSATIONS ─────────────────────────
    //
    getConversations: async (tenantId)=>{
        const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFirebaseDb"])();
        const colRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["collection"])(db, "tenants", tenantId, "conversations");
        const q = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["query"])(colRef, (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["orderBy"])("lastMessageAt", "desc"));
        const snap = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDocs"])(q);
        return snap.docs.map((d)=>({
                id: d.id,
                ...d.data()
            }));
    },
    getMessagesForConversation: async (tenantId, conversationId)=>{
        const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFirebaseDb"])();
        const colRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["collection"])(db, "tenants", tenantId, "conversations", conversationId, "messages");
        const q = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["query"])(colRef, (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["orderBy"])("createdAt", "asc"));
        const snap = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDocs"])(q);
        return snap.docs.map((d)=>({
                id: d.id,
                ...d.data()
            }));
    },
    simulateInboundSms: async (tenantId, conversationId, body)=>{
        const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFirebaseDb"])();
        const msgsCol = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["collection"])(db, "tenants", tenantId, "conversations", conversationId, "messages");
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addDoc"])(msgsCol, {
            from: "lead",
            direction: "inbound",
            body,
            createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["serverTimestamp"])()
        });
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updateDoc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["doc"])(db, "tenants", tenantId, "conversations", conversationId), {
            lastMessage: body,
            lastMessageAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["serverTimestamp"])()
        });
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/sylor-new/src/hooks/use-current-user.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// src/hooks/use-current-user.ts
__turbopack_context__.s([
    "useCurrentUser",
    ()=>useCurrentUser
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/sylor-new/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$firebase$2f$auth$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/sylor-new/node_modules/firebase/auth/dist/esm/index.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$firebase$2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$esm2017$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/sylor-new/node_modules/firebase/node_modules/@firebase/auth/dist/esm2017/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/sylor-new/src/lib/firebase.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/sylor-new/src/lib/api.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
function useCurrentUser() {
    _s();
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [tenant, setTenant] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useCurrentUser.useEffect": ()=>{
            const auth = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFirebaseAuth"])();
            const unsub = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$firebase$2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$esm2017$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["onAuthStateChanged"])(auth, {
                "useCurrentUser.useEffect.unsub": async (fbUser)=>{
                    if (!fbUser) {
                        setUser(null);
                        setTenant(null);
                        setLoading(false);
                        return;
                    }
                    // 1) get Firestore user
                    const profile = await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].getUserProfile(fbUser.uid);
                    if (!profile) {
                        setUser(null);
                        setTenant(null);
                        setLoading(false);
                        return;
                    }
                    setUser(profile);
                    // 2) get tenant
                    if (profile.tenantId) {
                        const t = await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].getTenant(profile.tenantId);
                        setTenant(t);
                    } else {
                        setTenant(null);
                    }
                    setLoading(false);
                }
            }["useCurrentUser.useEffect.unsub"]);
            return ({
                "useCurrentUser.useEffect": ()=>unsub()
            })["useCurrentUser.useEffect"];
        }
    }["useCurrentUser.useEffect"], []);
    return {
        user,
        tenant,
        loading
    };
}
_s(useCurrentUser, "XAuzN917/sxDh49ClRuUa0AzHHI=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/sylor-new/src/app/setup/setup-client.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// src/app/setup/setup-client.tsx
__turbopack_context__.s([
    "default",
    ()=>SetupClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/sylor-new/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/sylor-new/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/sylor-new/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$src$2f$hooks$2f$use$2d$current$2d$user$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/sylor-new/src/hooks/use-current-user.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/sylor-new/src/lib/api.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
function SetupClient() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const { user, tenant, loading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$src$2f$hooks$2f$use$2d$current$2d$user$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCurrentUser"])();
    const [businessName, setBusinessName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [businessPhone, setBusinessPhone] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [submitting, setSubmitting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // when tenant already done → skip
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SetupClient.useEffect": ()=>{
            if (loading) return;
            // not logged in → go login
            if (!user) {
                router.push("/login");
                return;
            }
            // logged in but no tenant yet → wait
            if (!tenant) return;
            // tenant has businessName → setup done
            if (tenant.businessName && tenant.businessName.trim().length > 0) {
                router.push("/dashboard");
                return;
            }
            // if there is a phone saved already, prefill
            if (tenant.businessPhone) setBusinessPhone(tenant.businessPhone);
        }
    }["SetupClient.useEffect"], [
        user,
        tenant,
        loading,
        router
    ]);
    async function handleSubmit(e) {
        e.preventDefault();
        if (!user || !tenant) return;
        setSubmitting(true);
        try {
            await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].completeBusinessSetup(tenant.id, {
                businessName,
                businessPhone
            });
            // after we save → go dashboard
            router.push("/dashboard");
        } catch (err) {
            console.error("setup error", err);
            alert("Could not save business info.");
        } finally{
            setSubmitting(false);
        }
    }
    // still checking auth / tenant
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen flex items-center justify-center bg-dark-bg text-slate-200",
            children: "Loading setup…"
        }, void 0, false, {
            fileName: "[project]/Desktop/sylor-new/src/app/setup/setup-client.tsx",
            lineNumber: 63,
            columnNumber: 7
        }, this);
    }
    // without user we already redirected above, but just in case:
    if (!user) {
        return null;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen flex items-center justify-center bg-dark-bg p-4",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "w-full max-w-lg bg-glass-bg border border-glass-border rounded-2xl p-10",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                    className: "text-3xl font-bold text-white mb-2",
                    children: "Finish business setup"
                }, void 0, false, {
                    fileName: "[project]/Desktop/sylor-new/src/app/setup/setup-client.tsx",
                    lineNumber: 77,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-dark-text-secondary mb-6",
                    children: "We need your business details to send SMS and book leads."
                }, void 0, false, {
                    fileName: "[project]/Desktop/sylor-new/src/app/setup/setup-client.tsx",
                    lineNumber: 80,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                    className: "space-y-5",
                    onSubmit: handleSubmit,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    htmlFor: "businessName",
                                    className: "block text-sm mb-1 text-dark-text-secondary",
                                    children: "Business name"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/sylor-new/src/app/setup/setup-client.tsx",
                                    lineNumber: 86,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    id: "businessName",
                                    name: "businessName",
                                    required: true,
                                    placeholder: "business Name",
                                    value: businessName,
                                    onChange: (e)=>setBusinessName(e.target.value),
                                    className: "w-full bg-slate-900/50 border border-glass-border rounded-md px-3 py-3 outline-none focus:ring-2 focus:ring-brand-primary text-white"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/sylor-new/src/app/setup/setup-client.tsx",
                                    lineNumber: 92,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/sylor-new/src/app/setup/setup-client.tsx",
                            lineNumber: 85,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    htmlFor: "businessPhone",
                                    className: "block text-sm mb-1 text-dark-text-secondary",
                                    children: "Business phone"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/sylor-new/src/app/setup/setup-client.tsx",
                                    lineNumber: 104,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    id: "businessPhone",
                                    name: "businessPhone",
                                    type: "tel",
                                    required: true,
                                    placeholder: "(888) 888-8888",
                                    value: businessPhone,
                                    onChange: (e)=>setBusinessPhone(e.target.value),
                                    className: "w-full bg-slate-900/50 border border-glass-border rounded-md px-3 py-3 outline-none focus:ring-2 focus:ring-brand-primary text-white"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/sylor-new/src/app/setup/setup-client.tsx",
                                    lineNumber: 110,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/sylor-new/src/app/setup/setup-client.tsx",
                            lineNumber: 103,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "submit",
                            disabled: submitting,
                            className: "w-full bg-brand-primary hover:bg-brand-secondary rounded-lg py-3 font-semibold text-white transition disabled:opacity-60",
                            children: submitting ? "Saving..." : "Finish setup →"
                        }, void 0, false, {
                            fileName: "[project]/Desktop/sylor-new/src/app/setup/setup-client.tsx",
                            lineNumber: 122,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/sylor-new/src/app/setup/setup-client.tsx",
                    lineNumber: 84,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Desktop/sylor-new/src/app/setup/setup-client.tsx",
            lineNumber: 76,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Desktop/sylor-new/src/app/setup/setup-client.tsx",
        lineNumber: 75,
        columnNumber: 5
    }, this);
}
_s(SetupClient, "kClhBV/cLTWFeQ8QdfW4sfUEaN0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$src$2f$hooks$2f$use$2d$current$2d$user$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCurrentUser"]
    ];
});
_c = SetupClient;
var _c;
__turbopack_context__.k.register(_c, "SetupClient");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=Desktop_sylor-new_src_315d283e._.js.map