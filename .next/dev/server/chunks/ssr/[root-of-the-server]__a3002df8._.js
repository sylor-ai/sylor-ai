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
"use client";
;
;
;
const firebaseConfig = {
    apiKey: ("TURBOPACK compile-time value", "AIzaSyA6dY35xgkU54nErsM-PkMh21DL0px7oAM"),
    authDomain: ("TURBOPACK compile-time value", "sylor-ai.firebaseapp.com"),
    projectId: ("TURBOPACK compile-time value", "sylor-ai"),
    storageBucket: ("TURBOPACK compile-time value", "sylor-ai.firebasestorage.app"),
    messagingSenderId: ("TURBOPACK compile-time value", "87291214723"),
    appId: ("TURBOPACK compile-time value", "1:87291214723:web:ee4dde8ad238aa700214b6")
};
const app = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f40$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm2017$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getApps"])().length ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f40$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm2017$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getApp"])() : (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f40$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm2017$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["initializeApp"])(firebaseConfig);
function getFirebaseDb() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getFirestore"])(app);
}
function getFirebaseAuth() {
    const auth = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$firebase$2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$node$2d$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAuth"])(app);
    // persist in browser
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    return auth;
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
"[project]/Desktop/sylor-new/src/hooks/use-current-user.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// src/hooks/use-current-user.ts
__turbopack_context__.s([
    "useCurrentUser",
    ()=>useCurrentUser
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/sylor-new/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$firebase$2f$auth$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/sylor-new/node_modules/firebase/auth/dist/index.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$firebase$2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$node$2d$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/sylor-new/node_modules/firebase/node_modules/@firebase/auth/dist/node-esm/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/sylor-new/src/lib/firebase.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/sylor-new/src/lib/api.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
function useCurrentUser() {
    const [currentUser, setCurrentUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const auth = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getFirebaseAuth"])();
        const unsub = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$firebase$2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$node$2d$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["onAuthStateChanged"])(auth, async (fbUser)=>{
            if (!fbUser) {
                setCurrentUser(null);
                setLoading(false);
                return;
            }
            const profile = await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].getUserProfile(fbUser.uid);
            setCurrentUser(profile);
            setLoading(false);
        });
        return ()=>unsub();
    }, []);
    return {
        currentUser,
        loading
    };
}
}),
"[project]/Desktop/sylor-new/src/app/(dashboard)/billing/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>BillingPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/sylor-new/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/sylor-new/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/sylor-new/src/lib/api.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$src$2f$hooks$2f$use$2d$current$2d$user$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/sylor-new/src/hooks/use-current-user.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
function BillingPage() {
    const { currentUser, loading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$src$2f$hooks$2f$use$2d$current$2d$user$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCurrentUser"])();
    const [plan, setPlan] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!currentUser) return;
        (async ()=>{
            const p = await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].getCurrentPlan(currentUser.tenantId);
            setPlan(p);
        })();
    }, [
        currentUser
    ]);
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center justify-center h-[60vh]",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "h-8 w-8 rounded-full border-2 border-brand-primary border-t-transparent animate-spin"
            }, void 0, false, {
                fileName: "[project]/Desktop/sylor-new/src/app/(dashboard)/billing/page.tsx",
                lineNumber: 23,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/Desktop/sylor-new/src/app/(dashboard)/billing/page.tsx",
            lineNumber: 22,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "max-w-4xl mx-auto space-y-8",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-3xl font-bold text-white",
                        children: "Billing & Plan"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/sylor-new/src/app/(dashboard)/billing/page.tsx",
                        lineNumber: 31,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-dark-text-secondary mt-2",
                        children: "Manage your subscription and invoices."
                    }, void 0, false, {
                        fileName: "[project]/Desktop/sylor-new/src/app/(dashboard)/billing/page.tsx",
                        lineNumber: 32,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/sylor-new/src/app/(dashboard)/billing/page.tsx",
                lineNumber: 30,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-dark-card rounded-xl border border-slate-800/40 p-6 flex items-center justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-dark-text-secondary",
                                children: "Current plan"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/sylor-new/src/app/(dashboard)/billing/page.tsx",
                                lineNumber: 40,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xl font-semibold text-white mt-1",
                                children: plan ? plan.name : "No plan"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/sylor-new/src/app/(dashboard)/billing/page.tsx",
                                lineNumber: 41,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-dark-text-secondary mt-1",
                                children: plan ? `$${plan.price}/month` : "Select a plan to start"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/sylor-new/src/app/(dashboard)/billing/page.tsx",
                                lineNumber: 44,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/sylor-new/src/app/(dashboard)/billing/page.tsx",
                        lineNumber: 39,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                            href: "/pricing",
                            className: "bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-md text-sm font-semibold text-white",
                            children: "Change plan"
                        }, void 0, false, {
                            fileName: "[project]/Desktop/sylor-new/src/app/(dashboard)/billing/page.tsx",
                            lineNumber: 49,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Desktop/sylor-new/src/app/(dashboard)/billing/page.tsx",
                        lineNumber: 48,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/sylor-new/src/app/(dashboard)/billing/page.tsx",
                lineNumber: 38,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-dark-card rounded-xl border border-slate-800/40 p-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-lg font-semibold text-white mb-4",
                        children: "Invoices"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/sylor-new/src/app/(dashboard)/billing/page.tsx",
                        lineNumber: 60,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                        className: "w-full text-sm text-left text-dark-text-secondary",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                className: "border-b border-slate-800",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            className: "py-2",
                                            children: "Date"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/sylor-new/src/app/(dashboard)/billing/page.tsx",
                                            lineNumber: 64,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            className: "py-2",
                                            children: "Amount"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/sylor-new/src/app/(dashboard)/billing/page.tsx",
                                            lineNumber: 65,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            className: "py-2",
                                            children: "Status"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/sylor-new/src/app/(dashboard)/billing/page.tsx",
                                            lineNumber: 66,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            className: "py-2"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/sylor-new/src/app/(dashboard)/billing/page.tsx",
                                            lineNumber: 67,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/sylor-new/src/app/(dashboard)/billing/page.tsx",
                                    lineNumber: 63,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Desktop/sylor-new/src/app/(dashboard)/billing/page.tsx",
                                lineNumber: 62,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "py-3 text-white",
                                                children: "Nov 1, 2025"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/sylor-new/src/app/(dashboard)/billing/page.tsx",
                                                lineNumber: 72,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "py-3 text-white",
                                                children: "$399.00"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/sylor-new/src/app/(dashboard)/billing/page.tsx",
                                                lineNumber: 73,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "py-3",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "px-2 py-1 rounded-full bg-green-500/20 text-green-200 text-xs",
                                                    children: "Paid"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/sylor-new/src/app/(dashboard)/billing/page.tsx",
                                                    lineNumber: 75,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/sylor-new/src/app/(dashboard)/billing/page.tsx",
                                                lineNumber: 74,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "py-3 text-right",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    className: "text-brand-primary text-sm",
                                                    children: "Download"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/sylor-new/src/app/(dashboard)/billing/page.tsx",
                                                    lineNumber: 80,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/sylor-new/src/app/(dashboard)/billing/page.tsx",
                                                lineNumber: 79,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/sylor-new/src/app/(dashboard)/billing/page.tsx",
                                        lineNumber: 71,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "py-3 text-white",
                                                children: "Oct 1, 2025"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/sylor-new/src/app/(dashboard)/billing/page.tsx",
                                                lineNumber: 86,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "py-3 text-white",
                                                children: "$399.00"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/sylor-new/src/app/(dashboard)/billing/page.tsx",
                                                lineNumber: 87,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "py-3",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "px-2 py-1 rounded-full bg-green-500/20 text-green-200 text-xs",
                                                    children: "Paid"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/sylor-new/src/app/(dashboard)/billing/page.tsx",
                                                    lineNumber: 89,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/sylor-new/src/app/(dashboard)/billing/page.tsx",
                                                lineNumber: 88,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "py-3 text-right",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    className: "text-brand-primary text-sm",
                                                    children: "Download"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/sylor-new/src/app/(dashboard)/billing/page.tsx",
                                                    lineNumber: 94,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/sylor-new/src/app/(dashboard)/billing/page.tsx",
                                                lineNumber: 93,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/sylor-new/src/app/(dashboard)/billing/page.tsx",
                                        lineNumber: 85,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/sylor-new/src/app/(dashboard)/billing/page.tsx",
                                lineNumber: 70,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/sylor-new/src/app/(dashboard)/billing/page.tsx",
                        lineNumber: 61,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/sylor-new/src/app/(dashboard)/billing/page.tsx",
                lineNumber: 59,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/sylor-new/src/app/(dashboard)/billing/page.tsx",
        lineNumber: 29,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__a3002df8._.js.map