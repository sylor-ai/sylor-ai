(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Desktop/sylor-ai/src/app/(dashboard)/messages/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>MessagesPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$ai$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/sylor-ai/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$ai$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/sylor-ai/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$ai$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/sylor-ai/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$ai$2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/sylor-ai/src/lib/firebase.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$ai$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/sylor-ai/src/lib/api.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$ai$2f$node_modules$2f$firebase$2f$firestore$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/sylor-ai/node_modules/firebase/firestore/dist/esm/index.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$ai$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/sylor-ai/node_modules/@firebase/firestore/dist/index.esm2017.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
function MessagesPage() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$ai$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [tenantId, setTenantId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$ai$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isPro, setIsPro] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$ai$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [conversations, setConversations] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$ai$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [selectedConversationId, setSelectedConversationId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$ai$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [selectedConversation, setSelectedConversation] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$ai$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [messages, setMessages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$ai$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [selectedLead, setSelectedLead] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$ai$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$ai$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [err, setErr] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$ai$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$ai$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MessagesPage.useEffect": ()=>{
            ({
                "MessagesPage.useEffect": async ()=>{
                    try {
                        const auth = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$ai$2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFirebaseAuth"])();
                        const current = auth.currentUser;
                        if (!current) {
                            router.push("/login?redirectTo=/messages");
                            return;
                        }
                        const user = await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$ai$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].getUserProfile(current.uid);
                        if (!user?.tenantId) {
                            setErr("Missing workspace.");
                            setLoading(false);
                            return;
                        }
                        setTenantId(user.tenantId);
                        try {
                            const plan = await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$ai$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].getCurrentPlan(user.tenantId);
                            setIsPro(plan?.id === "pro");
                        } catch  {}
                    } catch (e) {
                        console.error(e);
                        setErr("Could not load workspace.");
                        setLoading(false);
                    }
                }
            })["MessagesPage.useEffect"]();
        }
    }["MessagesPage.useEffect"], [
        router
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$ai$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MessagesPage.useEffect": ()=>{
            if (!tenantId) return;
            const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$ai$2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFirebaseDb"])();
            const convCol = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$ai$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["collection"])(db, "tenants", tenantId, "conversations");
            const unsub = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$ai$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["onSnapshot"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$ai$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["query"])(convCol, (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$ai$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["orderBy"])("lastMessageAt", "desc")), {
                "MessagesPage.useEffect.unsub": (snap)=>{
                    const list = snap.docs.map({
                        "MessagesPage.useEffect.unsub.list": (d)=>({
                                id: d.id,
                                ...d.data()
                            })
                    }["MessagesPage.useEffect.unsub.list"]);
                    setConversations(list);
                    if (!selectedConversationId && list.length > 0) setSelectedConversationId(list[0].id);
                    setLoading(false);
                }
            }["MessagesPage.useEffect.unsub"], {
                "MessagesPage.useEffect.unsub": (error)=>{
                    console.error(error);
                    setErr("Could not load conversations.");
                    setLoading(false);
                }
            }["MessagesPage.useEffect.unsub"]);
            return ({
                "MessagesPage.useEffect": ()=>unsub()
            })["MessagesPage.useEffect"];
        }
    }["MessagesPage.useEffect"], [
        tenantId,
        selectedConversationId
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$ai$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MessagesPage.useEffect": ()=>{
            if (!tenantId || !selectedConversationId) {
                setSelectedConversation(null);
                setMessages([]);
                return;
            }
            const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$ai$2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFirebaseDb"])();
            const convo = conversations.find({
                "MessagesPage.useEffect": (c)=>c.id === selectedConversationId
            }["MessagesPage.useEffect"]) || null;
            setSelectedConversation(convo || null);
            if (!convo) {
                setMessages([]);
                return;
            }
            const msgsCol = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$ai$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["collection"])(db, "tenants", tenantId, "conversations", selectedConversationId, "messages");
            const unsub = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$ai$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["onSnapshot"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$ai$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["query"])(msgsCol, (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$ai$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["orderBy"])("createdAt", "asc")), {
                "MessagesPage.useEffect.unsub": (snap)=>{
                    setMessages(snap.docs.map({
                        "MessagesPage.useEffect.unsub": (d)=>({
                                id: d.id,
                                ...d.data()
                            })
                    }["MessagesPage.useEffect.unsub"]));
                }
            }["MessagesPage.useEffect.unsub"], {
                "MessagesPage.useEffect.unsub": (error)=>setErr("Could not load messages.")
            }["MessagesPage.useEffect.unsub"]);
            return ({
                "MessagesPage.useEffect": ()=>unsub()
            })["MessagesPage.useEffect"];
        }
    }["MessagesPage.useEffect"], [
        tenantId,
        selectedConversationId,
        conversations
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$ai$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MessagesPage.useEffect": ()=>{
            ({
                "MessagesPage.useEffect": async ()=>{
                    if (!tenantId || !selectedConversation?.leadId) {
                        setSelectedLead(null);
                        return;
                    }
                    try {
                        const lead = await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$ai$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].getLead(tenantId, selectedConversation.leadId);
                        setSelectedLead(lead);
                    } catch (e) {
                        console.error(e);
                    }
                }
            })["MessagesPage.useEffect"]();
        }
    }["MessagesPage.useEffect"], [
        tenantId,
        selectedConversation
    ]);
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$ai$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-[60vh] flex items-center justify-center text-white/60",
            children: "Loading..."
        }, void 0, false, {
            fileName: "[project]/Desktop/sylor-ai/src/app/(dashboard)/messages/page.tsx",
            lineNumber: 97,
            columnNumber: 12
        }, this);
    }
    if (err) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$ai$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-[60vh] flex items-center justify-center text-red-300",
            children: err
        }, void 0, false, {
            fileName: "[project]/Desktop/sylor-ai/src/app/(dashboard)/messages/page.tsx",
            lineNumber: 101,
            columnNumber: 12
        }, this);
    }
    const leadUnsubscribed = !!selectedLead?.unsubscribed;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$ai$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "grid gap-4 lg:grid-cols-[320px,1fr] h-[calc(100vh-4rem)]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$ai$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "panel p-3 overflow-y-auto",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$ai$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between mb-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$ai$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm font-medium",
                                children: "Messages"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/sylor-ai/src/app/(dashboard)/messages/page.tsx",
                                lineNumber: 110,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$ai$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "text-xs text-white/60 hover:text-white",
                                children: "+ New"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/sylor-ai/src/app/(dashboard)/messages/page.tsx",
                                lineNumber: 111,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/sylor-ai/src/app/(dashboard)/messages/page.tsx",
                        lineNumber: 109,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$ai$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-2",
                        children: [
                            conversations.map((conv)=>{
                                const active = conv.id === selectedConversationId;
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$ai$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setSelectedConversationId(conv.id),
                                    className: `w-full text-left rounded-[12px] px-3 py-2 transition ${active ? "bg-white/12 text-white" : "text-white/55 hover:bg-white/10"}`,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$ai$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center justify-between",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$ai$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-sm font-medium truncate",
                                                    children: conv.leadName || "Unknown lead"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/sylor-ai/src/app/(dashboard)/messages/page.tsx",
                                                    lineNumber: 123,
                                                    columnNumber: 19
                                                }, this),
                                                conv.aiLastStatus === "unsubscribed" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$ai$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "chip !border-red-500/40 !text-red-200 !bg-red-500/10",
                                                    children: "STOP"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/sylor-ai/src/app/(dashboard)/messages/page.tsx",
                                                    lineNumber: 125,
                                                    columnNumber: 21
                                                }, this) : conv.aiPaused ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$ai$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "chip !border-yellow-500/30 !text-yellow-200 !bg-yellow-500/10",
                                                    children: "AI Paused"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/sylor-ai/src/app/(dashboard)/messages/page.tsx",
                                                    lineNumber: 127,
                                                    columnNumber: 21
                                                }, this) : conv.aiLastStatus === "on" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$ai$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "chip !border-emerald-500/30 !text-emerald-200 !bg-emerald-500/10",
                                                    children: "AI On"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/sylor-ai/src/app/(dashboard)/messages/page.tsx",
                                                    lineNumber: 129,
                                                    columnNumber: 21
                                                }, this) : null
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/sylor-ai/src/app/(dashboard)/messages/page.tsx",
                                            lineNumber: 122,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$ai$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mt-1 text-xs text-white/40 truncate",
                                            children: conv.lastMessage || "No messages yet"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/sylor-ai/src/app/(dashboard)/messages/page.tsx",
                                            lineNumber: 132,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, conv.id, true, {
                                    fileName: "[project]/Desktop/sylor-ai/src/app/(dashboard)/messages/page.tsx",
                                    lineNumber: 117,
                                    columnNumber: 15
                                }, this);
                            }),
                            conversations.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$ai$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-sm text-white/50 text-center py-10",
                                children: "No conversations yet. Share your lead link to start."
                            }, void 0, false, {
                                fileName: "[project]/Desktop/sylor-ai/src/app/(dashboard)/messages/page.tsx",
                                lineNumber: 137,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/sylor-ai/src/app/(dashboard)/messages/page.tsx",
                        lineNumber: 113,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/sylor-ai/src/app/(dashboard)/messages/page.tsx",
                lineNumber: 108,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$ai$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "panel flex flex-col",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$ai$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "border-b border-white/10 px-4 py-3 flex items-center justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$ai$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$ai$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm font-medium",
                                        children: selectedConversation?.leadName || "Conversation"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/sylor-ai/src/app/(dashboard)/messages/page.tsx",
                                        lineNumber: 147,
                                        columnNumber: 13
                                    }, this),
                                    selectedLead?.phone && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$ai$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-white/45",
                                        children: [
                                            "SMS - ",
                                            selectedLead.phone
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/sylor-ai/src/app/(dashboard)/messages/page.tsx",
                                        lineNumber: 148,
                                        columnNumber: 37
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/sylor-ai/src/app/(dashboard)/messages/page.tsx",
                                lineNumber: 146,
                                columnNumber: 11
                            }, this),
                            selectedConversation?.aiLastStatus === "unsubscribed" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$ai$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "chip !border-red-500/40 !text-red-200 !bg-red-500/10",
                                children: "STOP"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/sylor-ai/src/app/(dashboard)/messages/page.tsx",
                                lineNumber: 151,
                                columnNumber: 13
                            }, this) : selectedConversation?.aiPaused ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$ai$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "chip !border-yellow-500/30 !text-yellow-200 !bg-yellow-500/10",
                                children: "AI Paused"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/sylor-ai/src/app/(dashboard)/messages/page.tsx",
                                lineNumber: 153,
                                columnNumber: 13
                            }, this) : selectedConversation?.aiLastStatus === "on" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$ai$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "chip !border-emerald-500/30 !text-emerald-200 !bg-emerald-500/10",
                                children: "AI replying"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/sylor-ai/src/app/(dashboard)/messages/page.tsx",
                                lineNumber: 155,
                                columnNumber: 13
                            }, this) : null
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/sylor-ai/src/app/(dashboard)/messages/page.tsx",
                        lineNumber: 145,
                        columnNumber: 9
                    }, this),
                    leadUnsubscribed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$ai$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "px-4 pt-4",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$ai$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "rounded-[12px] bg-red-500/10 border border-red-500/30 px-3 py-2 text-xs text-red-200",
                            children: "This lead replied STOP. SMS (including Sylor AI) is blocked until they send START."
                        }, void 0, false, {
                            fileName: "[project]/Desktop/sylor-ai/src/app/(dashboard)/messages/page.tsx",
                            lineNumber: 161,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Desktop/sylor-ai/src/app/(dashboard)/messages/page.tsx",
                        lineNumber: 160,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$ai$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 overflow-y-auto px-4 pb-4 space-y-3 text-sm",
                        children: [
                            messages.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$ai$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-white/45 text-sm pt-8",
                                children: "No messages yet. Type a message below to start the conversation."
                            }, void 0, false, {
                                fileName: "[project]/Desktop/sylor-ai/src/app/(dashboard)/messages/page.tsx",
                                lineNumber: 169,
                                columnNumber: 13
                            }, this),
                            messages.map((msg)=>{
                                const outbound = msg.direction === "outbound";
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$ai$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: `flex ${outbound ? "justify-end" : "justify-start"}`,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$ai$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: `max-w-[70%] rounded-[12px] px-3 py-2 ${outbound ? "bg-purple-500/15" : "bg-white/5"}`,
                                        children: msg.body
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/sylor-ai/src/app/(dashboard)/messages/page.tsx",
                                        lineNumber: 175,
                                        columnNumber: 17
                                    }, this)
                                }, msg.id, false, {
                                    fileName: "[project]/Desktop/sylor-ai/src/app/(dashboard)/messages/page.tsx",
                                    lineNumber: 174,
                                    columnNumber: 15
                                }, this);
                            })
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/sylor-ai/src/app/(dashboard)/messages/page.tsx",
                        lineNumber: 167,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$ai$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "border-t border-white/10 p-3 flex gap-2 items-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$ai$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                className: "flex-1",
                                placeholder: "Type a message..."
                            }, void 0, false, {
                                fileName: "[project]/Desktop/sylor-ai/src/app/(dashboard)/messages/page.tsx",
                                lineNumber: 184,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$ai$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                disabled: !isPro || leadUnsubscribed,
                                className: "btn-primary px-3 py-2 disabled:opacity-50",
                                children: "Send"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/sylor-ai/src/app/(dashboard)/messages/page.tsx",
                                lineNumber: 185,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/sylor-ai/src/app/(dashboard)/messages/page.tsx",
                        lineNumber: 183,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/sylor-ai/src/app/(dashboard)/messages/page.tsx",
                lineNumber: 144,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/sylor-ai/src/app/(dashboard)/messages/page.tsx",
        lineNumber: 107,
        columnNumber: 5
    }, this);
}
_s(MessagesPage, "RDq4CKdEC6VPIrLuv8RSpyAaLH0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$ai$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = MessagesPage;
var _c;
__turbopack_context__.k.register(_c, "MessagesPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=Desktop_sylor-ai_src_app_%28dashboard%29_messages_page_tsx_51d5cfc4._.js.map