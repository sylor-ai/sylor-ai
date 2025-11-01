module.exports = [
"[externals]/util [external] (util, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("util", () => require("util"));

module.exports = mod;
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/process [external] (process, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("process", () => require("process"));

module.exports = mod;
}),
"[externals]/tls [external] (tls, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("tls", () => require("tls"));

module.exports = mod;
}),
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/os [external] (os, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("os", () => require("os"));

module.exports = mod;
}),
"[externals]/net [external] (net, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("net", () => require("net"));

module.exports = mod;
}),
"[externals]/events [external] (events, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("events", () => require("events"));

module.exports = mod;
}),
"[externals]/stream [external] (stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[externals]/http2 [external] (http2, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("http2", () => require("http2"));

module.exports = mod;
}),
"[externals]/http [external] (http, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("http", () => require("http"));

module.exports = mod;
}),
"[externals]/url [external] (url, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("url", () => require("url"));

module.exports = mod;
}),
"[externals]/dns [external] (dns, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("dns", () => require("dns"));

module.exports = mod;
}),
"[externals]/zlib [external] (zlib, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("zlib", () => require("zlib"));

module.exports = mod;
}),
"[project]/Desktop/sylor-new/src/lib/firebase.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$firebase$2f$app$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/sylor-new/node_modules/firebase/app/dist/index.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f40$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm2017$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/sylor-new/node_modules/@firebase/app/dist/esm/index.esm2017.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$firebase$2f$auth$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/sylor-new/node_modules/firebase/auth/dist/index.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$firebase$2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$node$2d$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/sylor-new/node_modules/firebase/node_modules/@firebase/auth/dist/node-esm/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$firebase$2f$firestore$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/sylor-new/node_modules/firebase/firestore/dist/index.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/sylor-new/node_modules/@firebase/firestore/dist/index.node.mjs [app-ssr] (ecmascript)");
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
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f40$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm2017$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getApps"])().length) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f40$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm2017$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["initializeApp"])(firebaseConfig);
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f40$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm2017$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getApp"])();
}
function getFirebaseAuth() {
    const app = getFirebaseApp();
    // client
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    // server
    try {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$firebase$2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$node$2d$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["initializeAuth"])(app, {
            persistence: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$firebase$2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$node$2d$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["inMemoryPersistence"]
        });
    } catch  {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$firebase$2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$node$2d$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAuth"])(app);
    }
}
function getFirebaseDb() {
    const app = getFirebaseApp();
    if (!hasValidProject) {
        // don't crash SSR — just tell the caller
        throw new Error("Firestore not available: missing Firebase projectId. Set NEXT_PUBLIC_FIREBASE_PROJECT_ID or hardcode config in src/lib/firebase.ts");
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getFirestore"])(app);
}
}),
"[project]/Desktop/sylor-new/src/lib/api.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$firebase$2f$auth$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/sylor-new/node_modules/firebase/auth/dist/index.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$firebase$2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$node$2d$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/sylor-new/node_modules/firebase/node_modules/@firebase/auth/dist/node-esm/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$firebase$2f$firestore$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/sylor-new/node_modules/firebase/firestore/dist/index.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/sylor-new/node_modules/@firebase/firestore/dist/index.node.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/sylor-new/src/lib/firebase.ts [app-ssr] (ecmascript)");
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
        const auth = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getFirebaseAuth"])();
        const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getFirebaseDb"])();
        const cred = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$firebase$2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$node$2d$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["signInWithEmailAndPassword"])(auth, email, password);
        const uid = cred.user.uid;
        const userSnap = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getDoc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["doc"])(db, "users", uid));
        if (!userSnap.exists()) return null;
        return {
            id: userSnap.id,
            ...userSnap.data()
        };
    },
    logout: async ()=>{
        const auth = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getFirebaseAuth"])();
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$firebase$2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$node$2d$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["signOut"])(auth);
    },
    signUp: async (name, email, password)=>{
        const auth = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getFirebaseAuth"])();
        const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getFirebaseDb"])();
        try {
            const cred = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$firebase$2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$node$2d$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createUserWithEmailAndPassword"])(auth, email, password);
            const uid = cred.user.uid;
            // create tenant
            const tenantRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["doc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["collection"])(db, "tenants"));
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["setDoc"])(tenantRef, {
                businessName: "",
                businessPhone: "",
                planId: null,
                stripeCustomerId: `cus_${Date.now()}`,
                twilioNumber: null,
                createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["serverTimestamp"])()
            });
            const initials = name.split(" ").map((n)=>n[0]).join("").toUpperCase();
            // create user profile
            const userRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["doc"])(db, "users", uid);
            const userData = {
                name,
                email,
                avatarInitials: initials,
                tenantId: tenantRef.id
            };
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["setDoc"])(userRef, userData);
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
        const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getFirebaseDb"])();
        const snap = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getDoc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["doc"])(db, "users", uid));
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
        const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getFirebaseDb"])();
        const snap = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getDoc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["doc"])(db, "tenants", tenantId));
        if (!snap.exists()) return null;
        return {
            id: snap.id,
            ...snap.data()
        };
    },
    updateTenant: async (tenantId, data)=>{
        const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getFirebaseDb"])();
        const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["doc"])(db, "tenants", tenantId);
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["updateDoc"])(ref, data);
        const snap = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getDoc"])(ref);
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
        const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getFirebaseDb"])();
        const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["doc"])(db, "users", userId);
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["updateDoc"])(ref, data);
        const snap = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getDoc"])(ref);
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
        const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getFirebaseDb"])();
        const leadsCol = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["collection"])(db, "tenants", tenantId, "leads");
        const q = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["query"])(leadsCol, (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["orderBy"])("created", "desc"));
        const snap = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getDocs"])(q);
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
        const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getFirebaseDb"])();
        const leadsCol = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["collection"])(db, "tenants", tenantId, "leads");
        const newLead = {
            ...leadData,
            leadId: `L-${Math.floor(Math.random() * 9000) + 1000}`,
            created: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["serverTimestamp"])()
        };
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["addDoc"])(leadsCol, newLead);
        // also create a conversation so Messages UI has something
        const convoCol = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["collection"])(db, "tenants", tenantId, "conversations");
        const convoRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["doc"])(convoCol);
        const batch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["writeBatch"])(db);
        batch.set(convoRef, {
            leadId: "temp",
            leadName: leadData.name,
            lastMessage: `Hey ${leadData.name}, thanks for contacting us!`,
            lastMessageAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["serverTimestamp"])(),
            channel: "sms",
            leadAvatarUrl: `https://i.pravatar.cc/150?u=${leadData.phone}`
        });
        const msgsCol = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["collection"])(db, "tenants", tenantId, "conversations", convoRef.id, "messages");
        const msgRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["doc"])(msgsCol);
        batch.set(msgRef, {
            from: "agent",
            direction: "outbound",
            body: `Hey ${leadData.name}, thanks for contacting us!`,
            createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["serverTimestamp"])()
        });
        await batch.commit();
    },
    //
    // ─── APPOINTMENTS ─────────────────────────────────────
    //
    getAppointments: async (tenantId)=>{
        const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getFirebaseDb"])();
        const colRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["collection"])(db, "tenants", tenantId, "appointments");
        const snap = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getDocs"])(colRef);
        return snap.docs.map((d)=>({
                id: d.id,
                ...d.data()
            }));
    },
    saveAppointment: async (tenantId, appt)=>{
        const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getFirebaseDb"])();
        const id = appt.id?.startsWith("new-") ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["doc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["collection"])(db, "tenants", tenantId, "appointments")).id : appt.id;
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["setDoc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["doc"])(db, "tenants", tenantId, "appointments", id), {
            ...appt,
            id
        }, {
            merge: true
        });
    },
    deleteAppointment: async (tenantId, id)=>{
        const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getFirebaseDb"])();
        // you probably want deleteDoc, but keeping merge-empty for now
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["setDoc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["doc"])(db, "tenants", tenantId, "appointments", id), {}, {
            merge: true
        });
    },
    //
    // ─── MESSAGES / CONVERSATIONS ─────────────────────────
    //
    getConversations: async (tenantId)=>{
        const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getFirebaseDb"])();
        const colRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["collection"])(db, "tenants", tenantId, "conversations");
        const q = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["query"])(colRef, (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["orderBy"])("lastMessageAt", "desc"));
        const snap = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getDocs"])(q);
        return snap.docs.map((d)=>({
                id: d.id,
                ...d.data()
            }));
    },
    getMessagesForConversation: async (tenantId, conversationId)=>{
        const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getFirebaseDb"])();
        const colRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["collection"])(db, "tenants", tenantId, "conversations", conversationId, "messages");
        const q = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["query"])(colRef, (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["orderBy"])("createdAt", "asc"));
        const snap = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getDocs"])(q);
        return snap.docs.map((d)=>({
                id: d.id,
                ...d.data()
            }));
    },
    simulateInboundSms: async (tenantId, conversationId, body)=>{
        const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getFirebaseDb"])();
        const msgsCol = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["collection"])(db, "tenants", tenantId, "conversations", conversationId, "messages");
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["addDoc"])(msgsCol, {
            from: "lead",
            direction: "inbound",
            body,
            createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["serverTimestamp"])()
        });
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["updateDoc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["doc"])(db, "tenants", tenantId, "conversations", conversationId), {
            lastMessage: body,
            lastMessageAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["serverTimestamp"])()
        });
    }
};
}),
"[project]/Desktop/sylor-new/src/lib/use-current-user.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// src/lib/use-current-user.ts
__turbopack_context__.s([
    "useCurrentUser",
    ()=>useCurrentUser
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/sylor-new/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$firebase$2f$auth$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/sylor-new/node_modules/firebase/auth/dist/index.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$firebase$2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$node$2d$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/sylor-new/node_modules/firebase/node_modules/@firebase/auth/dist/node-esm/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/sylor-new/src/lib/firebase.ts [app-ssr] (ecmascript)"); // <- relative import inside /lib
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$firebase$2f$firestore$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/sylor-new/node_modules/firebase/firestore/dist/index.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/sylor-new/node_modules/@firebase/firestore/dist/index.node.mjs [app-ssr] (ecmascript)");
"use client";
;
;
;
;
function useCurrentUser() {
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [firebaseUser, setFirebaseUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const auth = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getFirebaseAuth"])();
        const unsubscribe = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$firebase$2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$node$2d$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["onAuthStateChanged"])(auth, async (fbUser)=>{
            setFirebaseUser(fbUser);
            if (fbUser) {
                try {
                    const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getFirebaseDb"])();
                    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["doc"])(db, "users", fbUser.uid);
                    const snap = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getDoc"])(ref);
                    if (snap.exists()) {
                        setUser({
                            id: snap.id,
                            ...snap.data()
                        });
                    } else {
                        // fallback if Firestore user doc doesn't exist yet
                        const initials = fbUser.displayName?.split(" ").map((n)=>n[0]).join("").toUpperCase() || "U";
                        setUser({
                            id: fbUser.uid,
                            name: fbUser.displayName || "User",
                            email: fbUser.email || "",
                            avatarInitials: initials,
                            tenantId: ""
                        });
                    }
                } catch (err) {
                    console.error("Error loading user profile:", err);
                    setUser(null);
                }
            } else {
                setUser(null);
            }
            setLoading(false);
        });
        return ()=>unsubscribe();
    }, []);
    return {
        user,
        firebaseUser,
        loading
    };
}
}),
"[project]/Desktop/sylor-new/src/app/(dashboard)/dashboard/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// FILE: src/app/(dashboard)/dashboard/page.tsx
__turbopack_context__.s([
    "default",
    ()=>DashboardPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/sylor-new/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/sylor-new/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/sylor-new/node_modules/recharts/es6/component/ResponsiveContainer.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$AreaChart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/sylor-new/node_modules/recharts/es6/chart/AreaChart.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Area$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/sylor-new/node_modules/recharts/es6/cartesian/Area.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/sylor-new/node_modules/recharts/es6/cartesian/XAxis.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/sylor-new/node_modules/recharts/es6/cartesian/YAxis.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/sylor-new/node_modules/recharts/es6/component/Tooltip.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/sylor-new/src/lib/api.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$src$2f$lib$2f$use$2d$current$2d$user$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/sylor-new/src/lib/use-current-user.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
const chartData = [
    {
        name: "14d",
        value: 23
    },
    {
        name: "13d",
        value: 25
    },
    {
        name: "12d",
        value: 22
    },
    {
        name: "11d",
        value: 28
    },
    {
        name: "10d",
        value: 32
    },
    {
        name: "9d",
        value: 30
    },
    {
        name: "8d",
        value: 35
    },
    {
        name: "7d",
        value: 38
    },
    {
        name: "6d",
        value: 36
    },
    {
        name: "5d",
        value: 42
    },
    {
        name: "4d",
        value: 45
    },
    {
        name: "3d",
        value: 43
    },
    {
        name: "2d",
        value: 48
    },
    {
        name: "Today",
        value: 51
    }
];
function MetricCard({ metric }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-dark-card rounded-lg p-5",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-dark-text-secondary",
                        children: metric.title
                    }, void 0, false, {
                        fileName: "[project]/Desktop/sylor-new/src/app/(dashboard)/dashboard/page.tsx",
                        lineNumber: 31,
                        columnNumber: 9
                    }, this),
                    metric.change ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: `text-sm font-semibold ${metric.change.startsWith("↑") ? "text-green-400" : "text-red-400"}`,
                        children: metric.change
                    }, void 0, false, {
                        fileName: "[project]/Desktop/sylor-new/src/app/(dashboard)/dashboard/page.tsx",
                        lineNumber: 33,
                        columnNumber: 11
                    }, this) : null
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/sylor-new/src/app/(dashboard)/dashboard/page.tsx",
                lineNumber: 30,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-4xl font-semibold mt-2",
                children: metric.value
            }, void 0, false, {
                fileName: "[project]/Desktop/sylor-new/src/app/(dashboard)/dashboard/page.tsx",
                lineNumber: 42,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-sm text-dark-text-secondary mt-1",
                children: metric.subtitle
            }, void 0, false, {
                fileName: "[project]/Desktop/sylor-new/src/app/(dashboard)/dashboard/page.tsx",
                lineNumber: 43,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/sylor-new/src/app/(dashboard)/dashboard/page.tsx",
        lineNumber: 29,
        columnNumber: 5
    }, this);
}
function DashboardPage() {
    const user = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$src$2f$lib$2f$use$2d$current$2d$user$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCurrentUser"])();
    const [metrics, setMetrics] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const run = async ()=>{
            if (!user) {
                setLoading(false);
                return;
            }
            const leads = await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].getLeads(user.tenantId);
            const totalValue = leads.reduce((acc, lead)=>acc + lead.value, 0);
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
                minimumFractionDigits: 0
            }).format(totalValue);
            const contacted = leads.filter((l)=>[
                    "Contacted",
                    "Booked",
                    "Closed"
                ].includes(l.status)).length;
            const booked = leads.filter((l)=>l.status === "Booked").length;
            const winRate = contacted > 0 ? `${Math.round(booked / contacted * 100)}% win rate` : "0% win rate";
            setMetrics([
                {
                    title: "Leads",
                    value: leads.length.toString(),
                    subtitle: "Last 14 days"
                },
                {
                    title: "Conversations",
                    value: "742",
                    change: "↑ 12%",
                    subtitle: "vs previous 14d"
                },
                {
                    title: "Bookings",
                    value: booked.toString(),
                    change: winRate,
                    subtitle: "From contacted"
                },
                {
                    title: "Revenue Impact",
                    value: formatted,
                    subtitle: "Est. client value"
                }
            ]);
            setLoading(false);
        };
        run();
    }, [
        user
    ]);
    if (loading) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: "Loading..."
    }, void 0, false, {
        fileName: "[project]/Desktop/sylor-new/src/app/(dashboard)/dashboard/page.tsx",
        lineNumber: 85,
        columnNumber: 23
    }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 md:grid-cols-4 gap-6",
                children: metrics.map((m)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(MetricCard, {
                        metric: m
                    }, m.title, false, {
                        fileName: "[project]/Desktop/sylor-new/src/app/(dashboard)/dashboard/page.tsx",
                        lineNumber: 91,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/Desktop/sylor-new/src/app/(dashboard)/dashboard/page.tsx",
                lineNumber: 89,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-dark-card rounded-lg p-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between items-center mb-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-lg font-semibold",
                                children: "Performance"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/sylor-new/src/app/(dashboard)/dashboard/page.tsx",
                                lineNumber: 96,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-sm text-dark-text-secondary",
                                children: "Last 14 days"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/sylor-new/src/app/(dashboard)/dashboard/page.tsx",
                                lineNumber: 97,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/sylor-new/src/app/(dashboard)/dashboard/page.tsx",
                        lineNumber: 95,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "h-80",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ResponsiveContainer"], {
                            width: "100%",
                            height: "100%",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$AreaChart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AreaChart"], {
                                data: chartData,
                                margin: {
                                    top: 5,
                                    right: 20,
                                    left: -20,
                                    bottom: 5
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("linearGradient", {
                                            id: "chartGradient",
                                            x1: "0",
                                            y1: "0",
                                            x2: "0",
                                            y2: "1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                                    offset: "5%",
                                                    stopColor: "#6366f1",
                                                    stopOpacity: 0.4
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/sylor-new/src/app/(dashboard)/dashboard/page.tsx",
                                                    lineNumber: 104,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                                    offset: "95%",
                                                    stopColor: "#6366f1",
                                                    stopOpacity: 0
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/sylor-new/src/app/(dashboard)/dashboard/page.tsx",
                                                    lineNumber: 105,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/sylor-new/src/app/(dashboard)/dashboard/page.tsx",
                                            lineNumber: 103,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/sylor-new/src/app/(dashboard)/dashboard/page.tsx",
                                        lineNumber: 102,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Tooltip"], {
                                        contentStyle: {
                                            backgroundColor: "#0f172a",
                                            border: "none",
                                            borderRadius: "0.5rem"
                                        },
                                        cursor: {
                                            stroke: "#6366f1",
                                            strokeWidth: 1,
                                            strokeDasharray: "3 3"
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/sylor-new/src/app/(dashboard)/dashboard/page.tsx",
                                        lineNumber: 108,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["XAxis"], {
                                        dataKey: "name",
                                        stroke: "#475569",
                                        fontSize: 12,
                                        tickLine: false,
                                        axisLine: false
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/sylor-new/src/app/(dashboard)/dashboard/page.tsx",
                                        lineNumber: 116,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["YAxis"], {
                                        stroke: "#475569",
                                        fontSize: 12,
                                        tickLine: false,
                                        axisLine: false
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/sylor-new/src/app/(dashboard)/dashboard/page.tsx",
                                        lineNumber: 117,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Area$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Area"], {
                                        type: "monotone",
                                        dataKey: "value",
                                        stroke: "#6366f1",
                                        strokeWidth: 2,
                                        fill: "url(#chartGradient)"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/sylor-new/src/app/(dashboard)/dashboard/page.tsx",
                                        lineNumber: 118,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/sylor-new/src/app/(dashboard)/dashboard/page.tsx",
                                lineNumber: 101,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Desktop/sylor-new/src/app/(dashboard)/dashboard/page.tsx",
                            lineNumber: 100,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Desktop/sylor-new/src/app/(dashboard)/dashboard/page.tsx",
                        lineNumber: 99,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/sylor-new/src/app/(dashboard)/dashboard/page.tsx",
                lineNumber: 94,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/sylor-new/src/app/(dashboard)/dashboard/page.tsx",
        lineNumber: 88,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__65a08919._.js.map