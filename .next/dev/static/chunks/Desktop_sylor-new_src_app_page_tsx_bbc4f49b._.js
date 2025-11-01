(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Desktop/sylor-new/src/app/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>HomePage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/sylor-new/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/sylor-new/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/sylor-new/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
const NAV_ITEMS = [
    {
        label: "Features",
        href: "#features"
    },
    {
        label: "Product",
        href: "#product"
    },
    {
        label: "Customers",
        href: "#customers"
    },
    {
        label: "Pricing",
        href: "#pricing"
    },
    {
        label: "Docs",
        href: "#docs"
    }
];
function HomePage() {
    _s();
    // which button opened the picker: "nav" | "hero" | null
    const [planPickerOpen, setPlanPickerOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    function goTo(plan) {
        // use your existing onboarding
        window.location.href = `/onboarding?plan=${plan}`;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-[#0a0a0b] text-white scroll-smooth",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-full bg-gradient-to-r from-[#0a0a0b] via-purple-700/10 to-[#0a0a0b] border-b border-white/5 py-2 text-center text-sm",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-white/70",
                        children: [
                            "Meet Sylor Agent — your AI dispatcher for service leads.",
                            " "
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/sylor-new/src/app/page.tsx",
                        lineNumber: 29,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: "#features",
                        className: "text-white font-medium hover:underline",
                        children: "Learn more →"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/sylor-new/src/app/page.tsx",
                        lineNumber: 32,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/sylor-new/src/app/page.tsx",
                lineNumber: 28,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "sticky top-2 z-50 flex justify-center pointer-events-none",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "pointer-events-auto mx-auto mt-2 flex h-14 max-w-6xl items-center justify-between gap-4 rounded-[20px] border border-white/5 bg-[#0d0d0e]/80 px-4 backdrop-blur-md",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: "/",
                            className: "flex items-center gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "h-8 w-8 rounded-full bg-gradient-to-br from-[#5d5ff7] to-[#43e7e1] flex items-center justify-center text-sm font-bold",
                                    children: "S"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/sylor-new/src/app/page.tsx",
                                    lineNumber: 42,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-base font-semibold tracking-tight",
                                    children: "Sylor.ai"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/sylor-new/src/app/page.tsx",
                                    lineNumber: 45,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/sylor-new/src/app/page.tsx",
                            lineNumber: 41,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                            className: "hidden md:flex items-center gap-2 text-sm text-white/60",
                            children: NAV_ITEMS.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: item.href,
                                    className: "rounded-[10px] px-3 py-1 hover:bg-white/5 hover:text-white transition",
                                    children: item.label
                                }, item.label, false, {
                                    fileName: "[project]/Desktop/sylor-new/src/app/page.tsx",
                                    lineNumber: 51,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/Desktop/sylor-new/src/app/page.tsx",
                            lineNumber: 49,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-3 relative",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/login",
                                    className: "rounded-[10px] bg-[#161616] border border-white/5 px-4 py-1.5 text-sm text-white/80 hover:border-white/30 transition",
                                    children: "Log in"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/sylor-new/src/app/page.tsx",
                                    lineNumber: 63,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setPlanPickerOpen((prev)=>prev === "nav" ? null : "nav"),
                                    className: "rounded-[10px] bg-white text-sm text-black font-medium px-4 py-1.5 hover:bg-white/90 transition",
                                    children: "Get started"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/sylor-new/src/app/page.tsx",
                                    lineNumber: 71,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    className: "flex h-8 w-8 items-center justify-center rounded-[10px] bg-white/0 hover:bg-white/5 transition md:hidden",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "sr-only",
                                            children: "Menu"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/sylor-new/src/app/page.tsx",
                                            lineNumber: 85,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "block h-0.5 w-4 bg-white/70 rounded"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/sylor-new/src/app/page.tsx",
                                                    lineNumber: 87,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "block h-0.5 w-4 bg-white/70 rounded"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/sylor-new/src/app/page.tsx",
                                                    lineNumber: 88,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/sylor-new/src/app/page.tsx",
                                            lineNumber: 86,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/sylor-new/src/app/page.tsx",
                                    lineNumber: 81,
                                    columnNumber: 13
                                }, this),
                                planPickerOpen === "nav" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute right-0 top-14 z-50 w-52 rounded-[16px] border border-white/10 bg-[#0f1011] shadow-xl p-2 space-y-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs text-white/40 px-2 pb-1",
                                            children: "Choose a plan to start"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/sylor-new/src/app/page.tsx",
                                            lineNumber: 95,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>goTo("starter"),
                                            className: "w-full text-left rounded-[10px] px-2 py-1.5 text-sm hover:bg-white/5 flex items-center justify-between",
                                            children: [
                                                "Starter ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-white/30 text-xs",
                                                    children: "$149/mo"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/sylor-new/src/app/page.tsx",
                                                    lineNumber: 102,
                                                    columnNumber: 27
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/sylor-new/src/app/page.tsx",
                                            lineNumber: 98,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>goTo("pro"),
                                            className: "w-full text-left rounded-[10px] px-2 py-1.5 text-sm hover:bg-white/5 flex items-center justify-between",
                                            children: [
                                                "Pro ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-white/30 text-xs",
                                                    children: "$399/mo"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/sylor-new/src/app/page.tsx",
                                                    lineNumber: 108,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/sylor-new/src/app/page.tsx",
                                            lineNumber: 104,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/sylor-new/src/app/page.tsx",
                                    lineNumber: 94,
                                    columnNumber: 15
                                }, this) : null
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/sylor-new/src/app/page.tsx",
                            lineNumber: 62,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/sylor-new/src/app/page.tsx",
                    lineNumber: 39,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Desktop/sylor-new/src/app/page.tsx",
                lineNumber: 38,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "relative overflow-hidden",
                        id: "hero",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "pointer-events-none absolute inset-0",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute right-[-120px] top-[-80px] h-80 w-80 rounded-full bg-purple-700/20 blur-[90px]"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/sylor-new/src/app/page.tsx",
                                        lineNumber: 122,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute left-[-120px] bottom-[-120px] h-64 w-64 rounded-full bg-amber-500/10 blur-[90px]"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/sylor-new/src/app/page.tsx",
                                        lineNumber: 123,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/sylor-new/src/app/page.tsx",
                                lineNumber: 121,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mx-auto flex max-w-6xl flex-col gap-10 px-4 pb-16 pt-16 md:flex-row md:items-center md:pb-20 md:pt-20",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "relative z-10 flex-1 space-y-6",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "inline-flex items-center gap-2 rounded-[10px] border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "h-2 w-2 rounded-full bg-emerald-400"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/sylor-new/src/app/page.tsx",
                                                        lineNumber: 130,
                                                        columnNumber: 17
                                                    }, this),
                                                    "AI lead intake & dispatching for service businesses"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/sylor-new/src/app/page.tsx",
                                                lineNumber: 129,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                                className: "text-4xl font-semibold leading-tight tracking-tight text-white md:text-5xl",
                                                children: [
                                                    "The next generation",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                                        fileName: "[project]/Desktop/sylor-new/src/app/page.tsx",
                                                        lineNumber: 135,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-300 to-amber-200",
                                                        children: "of AI operations."
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/sylor-new/src/app/page.tsx",
                                                        lineNumber: 136,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/sylor-new/src/app/page.tsx",
                                                lineNumber: 133,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "max-w-xl text-base text-white/55 md:text-lg",
                                                children: "Sylor.ai replies to new leads in seconds, books them on your Google Calendar, and syncs every message into your dashboard — so no job is left behind."
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/sylor-new/src/app/page.tsx",
                                                lineNumber: 140,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex flex-wrap gap-3 relative",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>setPlanPickerOpen((prev)=>prev === "hero" ? null : "hero"),
                                                        className: "rounded-[10px] bg-white px-5 py-2 text-sm font-medium text-black hover:bg-white/90 transition",
                                                        children: "Get started for free →"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/sylor-new/src/app/page.tsx",
                                                        lineNumber: 148,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        href: "#product",
                                                        className: "rounded-[10px] border border-white/10 bg-white/0 px-5 py-2 text-sm text-white/80 hover:border-white/40 transition",
                                                        children: "Request a demo"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/sylor-new/src/app/page.tsx",
                                                        lineNumber: 156,
                                                        columnNumber: 17
                                                    }, this),
                                                    planPickerOpen === "hero" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "absolute top-12 left-0 z-50 w-56 rounded-[16px] border border-white/10 bg-[#0f1011] shadow-xl p-2 space-y-1",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-xs text-white/40 px-2 pb-1",
                                                                children: "Choose a plan to start"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/sylor-new/src/app/page.tsx",
                                                                lineNumber: 166,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                onClick: ()=>goTo("starter"),
                                                                className: "w-full text-left rounded-[10px] px-2 py-1.5 text-sm hover:bg-white/5 flex items-center justify-between",
                                                                children: [
                                                                    "Starter ",
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-white/30 text-xs",
                                                                        children: "$149/mo"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Desktop/sylor-new/src/app/page.tsx",
                                                                        lineNumber: 173,
                                                                        columnNumber: 31
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Desktop/sylor-new/src/app/page.tsx",
                                                                lineNumber: 169,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                onClick: ()=>goTo("pro"),
                                                                className: "w-full text-left rounded-[10px] px-2 py-1.5 text-sm hover:bg-white/5 flex items-center justify-between",
                                                                children: [
                                                                    "Pro ",
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-white/30 text-xs",
                                                                        children: "$399/mo"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Desktop/sylor-new/src/app/page.tsx",
                                                                        lineNumber: 179,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Desktop/sylor-new/src/app/page.tsx",
                                                                lineNumber: 175,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Desktop/sylor-new/src/app/page.tsx",
                                                        lineNumber: 165,
                                                        columnNumber: 19
                                                    }, this) : null
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/sylor-new/src/app/page.tsx",
                                                lineNumber: 146,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "pt-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-xs uppercase tracking-wide text-white/40",
                                                        children: "Trusted by teams building on"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/sylor-new/src/app/page.tsx",
                                                        lineNumber: 186,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "mt-3 flex flex-wrap gap-6 text-sm text-white/30",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "flex items-center gap-2",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "h-1.5 w-1.5 rounded-full bg-green-400"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Desktop/sylor-new/src/app/page.tsx",
                                                                        lineNumber: 191,
                                                                        columnNumber: 21
                                                                    }, this),
                                                                    "Vercel"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Desktop/sylor-new/src/app/page.tsx",
                                                                lineNumber: 190,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                children: "Firebase"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/sylor-new/src/app/page.tsx",
                                                                lineNumber: 194,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                children: "Stripe"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/sylor-new/src/app/page.tsx",
                                                                lineNumber: 195,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                children: "Twilio"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/sylor-new/src/app/page.tsx",
                                                                lineNumber: 196,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Desktop/sylor-new/src/app/page.tsx",
                                                        lineNumber: 189,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/sylor-new/src/app/page.tsx",
                                                lineNumber: 185,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/sylor-new/src/app/page.tsx",
                                        lineNumber: 128,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "relative z-10 flex-1 flex justify-center md:justify-end",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-full max-w-md rounded-[20px] border border-white/5 bg-[#0c0c0d]/80 p-4 shadow-[0_0_80px_rgba(83,51,237,0.25)]",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center justify-between mb-4",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-sm text-white/60",
                                                            children: "Leads inbox"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/sylor-new/src/app/page.tsx",
                                                            lineNumber: 205,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "rounded-[10px] bg-emerald-500/10 px-2 py-1 text-xs text-emerald-300",
                                                            children: "12 new"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/sylor-new/src/app/page.tsx",
                                                            lineNumber: 206,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Desktop/sylor-new/src/app/page.tsx",
                                                    lineNumber: 204,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "space-y-2",
                                                    children: [
                                                        {
                                                            name: "Kitchen remodel - Encino",
                                                            time: "2m ago",
                                                            status: "Scheduled",
                                                            color: "bg-emerald-500/10 text-emerald-200"
                                                        },
                                                        {
                                                            name: "Roof repair - Calabasas",
                                                            time: "4m ago",
                                                            status: "SMS sent",
                                                            color: "bg-white/5 text-white/40"
                                                        },
                                                        {
                                                            name: "Pool build - Thousand Oaks",
                                                            time: "8m ago",
                                                            status: "Awaiting reply",
                                                            color: "bg-white/5 text-white/40"
                                                        },
                                                        {
                                                            name: "Landscaping - Woodland Hills",
                                                            time: "12m ago",
                                                            status: "Booked",
                                                            color: "bg-amber-500/10 text-amber-200"
                                                        }
                                                    ].map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center justify-between rounded-[10px] bg-white/[0.015] px-3 py-2.5",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "text-sm text-white/95",
                                                                            children: item.name
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/Desktop/sylor-new/src/app/page.tsx",
                                                                            lineNumber: 242,
                                                                            columnNumber: 25
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "text-xs text-white/30",
                                                                            children: item.time
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/Desktop/sylor-new/src/app/page.tsx",
                                                                            lineNumber: 243,
                                                                            columnNumber: 25
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/Desktop/sylor-new/src/app/page.tsx",
                                                                    lineNumber: 241,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: `rounded-[10px] px-2 py-1 text-xs ${item.color}`,
                                                                    children: item.status
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Desktop/sylor-new/src/app/page.tsx",
                                                                    lineNumber: 245,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, item.name, true, {
                                                            fileName: "[project]/Desktop/sylor-new/src/app/page.tsx",
                                                            lineNumber: 237,
                                                            columnNumber: 21
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/sylor-new/src/app/page.tsx",
                                                    lineNumber: 210,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "mt-5 rounded-[14px] border border-purple-500/40 bg-purple-500/5 p-4",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-xs text-purple-50/70",
                                                            children: "Sylor Agent · Smart reply"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/sylor-new/src/app/page.tsx",
                                                            lineNumber: 254,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "mt-2 text-sm text-white/90",
                                                            children: [
                                                                "“Hi John 👋 We got your request for a roof inspection. I can book you for ",
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                                                    children: "Tue 10:30am"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Desktop/sylor-new/src/app/page.tsx",
                                                                    lineNumber: 259,
                                                                    columnNumber: 34
                                                                }, this),
                                                                " — does that work?”"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Desktop/sylor-new/src/app/page.tsx",
                                                            lineNumber: 257,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Desktop/sylor-new/src/app/page.tsx",
                                                    lineNumber: 253,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/sylor-new/src/app/page.tsx",
                                            lineNumber: 203,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/sylor-new/src/app/page.tsx",
                                        lineNumber: 202,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/sylor-new/src/app/page.tsx",
                                lineNumber: 126,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/sylor-new/src/app/page.tsx",
                        lineNumber: 119,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        id: "features",
                        className: "mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col gap-6 md:flex-row md:items-center md:justify-between",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                className: "text-2xl font-semibold text-white",
                                                children: "Built for teams that can’t miss a lead"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/sylor-new/src/app/page.tsx",
                                                lineNumber: 274,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "mt-2 max-w-xl text-sm text-white/50",
                                                children: "Every new submission, call, or SMS becomes a tracked conversation. Your crew sees the same data, in real time."
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/sylor-new/src/app/page.tsx",
                                                lineNumber: 277,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/sylor-new/src/app/page.tsx",
                                        lineNumber: 273,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                href: "#product",
                                                className: "rounded-[10px] border border-white/10 px-4 py-1.5 text-sm text-white/70 hover:border-white/40",
                                                children: "Watch demo"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/sylor-new/src/app/page.tsx",
                                                lineNumber: 283,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                href: "#docs",
                                                className: "rounded-[10px] bg-white/5 px-4 py-1.5 text-sm text-white/90 hover:bg-white/10",
                                                children: "Explore docs"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/sylor-new/src/app/page.tsx",
                                                lineNumber: 289,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/sylor-new/src/app/page.tsx",
                                        lineNumber: 282,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/sylor-new/src/app/page.tsx",
                                lineNumber: 272,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-10 grid gap-6 md:grid-cols-3",
                                children: [
                                    {
                                        title: "Instant SMS reply",
                                        desc: "Respond in <5 seconds to every lead across web, forms, or ads."
                                    },
                                    {
                                        title: "Calendar auto-booking",
                                        desc: "AI proposes times and writes to Google Calendar for you."
                                    },
                                    {
                                        title: "Multi-tenant ready",
                                        desc: "Your current Firestore tenant model drops in cleanly."
                                    }
                                ].map((card)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "rounded-[10px] border border-white/5 bg-white/2 p-5 hover:border-purple-400/40 hover:-translate-y-1 transition",
                                        style: {
                                            backgroundColor: "rgba(13,13,14,0.35)"
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mb-4 flex h-10 w-10 items-center justify-center rounded-[10px] bg-white/5",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-lg",
                                                    children: "✦"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/sylor-new/src/app/page.tsx",
                                                    lineNumber: 319,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/sylor-new/src/app/page.tsx",
                                                lineNumber: 318,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "text-base font-semibold text-white",
                                                children: card.title
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/sylor-new/src/app/page.tsx",
                                                lineNumber: 321,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "mt-2 text-sm text-white/50",
                                                children: card.desc
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/sylor-new/src/app/page.tsx",
                                                lineNumber: 324,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                href: "#docs",
                                                className: "mt-4 inline-block text-sm text-purple-200/80 hover:text-purple-100",
                                                children: "Learn more →"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/sylor-new/src/app/page.tsx",
                                                lineNumber: 325,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, card.title, true, {
                                        fileName: "[project]/Desktop/sylor-new/src/app/page.tsx",
                                        lineNumber: 313,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/Desktop/sylor-new/src/app/page.tsx",
                                lineNumber: 298,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/sylor-new/src/app/page.tsx",
                        lineNumber: 268,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        id: "product",
                        className: "mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "rounded-[10px] border border-white/5 bg-gradient-to-b from-white/5 to-white/[0.01] p-6 md:p-10",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-col gap-6 md:flex-row md:items-center md:justify-between",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-xs text-white/40 uppercase tracking-wide",
                                                    children: "SYLOR OPS VIEW"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/sylor-new/src/app/page.tsx",
                                                    lineNumber: 344,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                    className: "mt-2 text-2xl font-semibold text-white",
                                                    children: "One place for leads, SMS, calls and appointments."
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/sylor-new/src/app/page.tsx",
                                                    lineNumber: 347,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "mt-3 max-w-xl text-sm text-white/50",
                                                    children: "Stop switching tabs. Your dispatcher, your AI agent, and your client comms all stay in a single modern interface."
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/sylor-new/src/app/page.tsx",
                                                    lineNumber: 350,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/sylor-new/src/app/page.tsx",
                                            lineNumber: 343,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            href: "/onboarding?plan=starter",
                                            className: "rounded-[10px] bg-white/10 px-4 py-1.5 text-sm text-white hover:bg-white/15",
                                            children: "Start chatting →"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/sylor-new/src/app/page.tsx",
                                            lineNumber: 355,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/sylor-new/src/app/page.tsx",
                                    lineNumber: 342,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-8 overflow-hidden rounded-[10px] border border-white/10 bg-[#0a0a0b]",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2 border-b border-white/5 bg-white/5 px-4 py-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex gap-1.5",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "h-2.5 w-2.5 rounded-full bg-red-400"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/sylor-new/src/app/page.tsx",
                                                            lineNumber: 367,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "h-2.5 w-2.5 rounded-full bg-amber-400"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/sylor-new/src/app/page.tsx",
                                                            lineNumber: 368,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "h-2.5 w-2.5 rounded-full bg-emerald-400"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/sylor-new/src/app/page.tsx",
                                                            lineNumber: 369,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Desktop/sylor-new/src/app/page.tsx",
                                                    lineNumber: 366,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "ml-3 text-xs text-white/40",
                                                    children: "sylor.ai/dashboard/leads"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/sylor-new/src/app/page.tsx",
                                                    lineNumber: 371,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/sylor-new/src/app/page.tsx",
                                            lineNumber: 365,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "grid gap-0 md:grid-cols-[280px,1fr]",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "border-r border-white/5 bg-[#0c0c0d] p-4",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-xs text-white/40 mb-3 uppercase tracking-wide",
                                                            children: "Inbox"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/sylor-new/src/app/page.tsx",
                                                            lineNumber: 378,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "space-y-2",
                                                            children: [
                                                                "Needs reply",
                                                                "Scheduled today",
                                                                "Follow up",
                                                                "Missed"
                                                            ].map((l, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    type: "button",
                                                                    className: `flex w-full items-center justify-between rounded-[10px] px-3 py-2 text-sm text-left ${idx === 0 ? "bg-white/5 text-white" : "text-white/40 hover:bg-white/5 hover:text-white"}`,
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            children: l
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/Desktop/sylor-new/src/app/page.tsx",
                                                                            lineNumber: 393,
                                                                            columnNumber: 27
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "rounded-[10px] bg-white/10 px-2 py-0.5 text-xs text-white/70",
                                                                            children: idx === 0 ? 6 : idx === 1 ? 3 : 2
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/Desktop/sylor-new/src/app/page.tsx",
                                                                            lineNumber: 394,
                                                                            columnNumber: 27
                                                                        }, this)
                                                                    ]
                                                                }, l, true, {
                                                                    fileName: "[project]/Desktop/sylor-new/src/app/page.tsx",
                                                                    lineNumber: 384,
                                                                    columnNumber: 25
                                                                }, this))
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/sylor-new/src/app/page.tsx",
                                                            lineNumber: 381,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "mt-6 text-xs text-white/30",
                                                            children: "Synced with Firebase → tenants → leads"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/sylor-new/src/app/page.tsx",
                                                            lineNumber: 401,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Desktop/sylor-new/src/app/page.tsx",
                                                    lineNumber: 377,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "p-5 space-y-4",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-sm text-white/50",
                                                            id: "demo",
                                                            children: "Conversation · #1342"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/sylor-new/src/app/page.tsx",
                                                            lineNumber: 408,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "space-y-3",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "inline-block max-w-lg rounded-[10px] bg-white/5 px-4 py-2 text-sm text-white/90",
                                                                    children: "Client: “Hi, I need a bathroom remodel in Winnetka.”"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Desktop/sylor-new/src/app/page.tsx",
                                                                    lineNumber: 412,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "inline-block max-w-lg rounded-[10px] bg-purple-500/10 px-4 py-2 text-sm text-white/90",
                                                                    children: "Sylor Agent: “Thanks! I can send someone **tomorrow 11:30 AM** or **Thu 9:00 AM**. Which works?”"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Desktop/sylor-new/src/app/page.tsx",
                                                                    lineNumber: 415,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "inline-block max-w-lg rounded-[10px] bg-white/5 px-4 py-2 text-sm text-white/80",
                                                                    children: "Client: “Tomorrow is good.”"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Desktop/sylor-new/src/app/page.tsx",
                                                                    lineNumber: 419,
                                                                    columnNumber: 21
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Desktop/sylor-new/src/app/page.tsx",
                                                            lineNumber: 411,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "rounded-[10px] border border-white/10 bg-white/0 p-3 flex items-center justify-between",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-sm text-white/50",
                                                                    children: "Google Calendar · Appointment will be created"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Desktop/sylor-new/src/app/page.tsx",
                                                                    lineNumber: 424,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    type: "button",
                                                                    className: "rounded-[10px] bg-white/10 px-3 py-1 text-xs text-white hover:bg-white/15",
                                                                    children: "Confirm"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Desktop/sylor-new/src/app/page.tsx",
                                                                    lineNumber: 427,
                                                                    columnNumber: 21
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Desktop/sylor-new/src/app/page.tsx",
                                                            lineNumber: 423,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Desktop/sylor-new/src/app/page.tsx",
                                                    lineNumber: 407,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/sylor-new/src/app/page.tsx",
                                            lineNumber: 375,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/sylor-new/src/app/page.tsx",
                                    lineNumber: 364,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/sylor-new/src/app/page.tsx",
                            lineNumber: 341,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Desktop/sylor-new/src/app/page.tsx",
                        lineNumber: 337,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        id: "pricing",
                        className: "mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "rounded-[10px] border border-white/5 bg-gradient-to-r from-purple-500/5 via-slate-900 to-slate-900/30 p-8 text-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm text-white/50",
                                    children: "Pricing"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/sylor-new/src/app/page.tsx",
                                    lineNumber: 446,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "mt-2 text-2xl font-semibold text-white",
                                    children: "Start free. Then just $149/mo."
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/sylor-new/src/app/page.tsx",
                                    lineNumber: 447,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mt-2 text-sm text-white/50 max-w-2xl mx-auto",
                                    children: "Perfect for contractors, remodeling companies, pool & landscaping, roofing, ADU teams — anyone who lives on inbound leads."
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/sylor-new/src/app/page.tsx",
                                    lineNumber: 450,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-6 flex flex-wrap justify-center gap-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "rounded-[10px] bg-black/10 border border-white/5 px-6 py-4 text-left w-full max-w-sm",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-xs text-white/40 uppercase tracking-wide",
                                                    children: "Starter"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/sylor-new/src/app/page.tsx",
                                                    lineNumber: 457,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "mt-2 text-3xl font-bold",
                                                    children: "$149"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/sylor-new/src/app/page.tsx",
                                                    lineNumber: 460,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-sm text-white/40",
                                                    children: "per month"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/sylor-new/src/app/page.tsx",
                                                    lineNumber: 461,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                                    className: "mt-4 space-y-2 text-sm text-white/70",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                            children: "• 50 leads / mo"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/sylor-new/src/app/page.tsx",
                                                            lineNumber: 463,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                            children: "• SMS automation"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/sylor-new/src/app/page.tsx",
                                                            lineNumber: 464,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                            children: "• Google Calendar booking"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/sylor-new/src/app/page.tsx",
                                                            lineNumber: 465,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Desktop/sylor-new/src/app/page.tsx",
                                                    lineNumber: 462,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    href: "/onboarding?plan=starter",
                                                    className: "mt-4 inline-flex rounded-[10px] bg-white/10 px-4 py-1.5 text-sm text-white hover:bg-white/15",
                                                    children: "Choose Starter"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/sylor-new/src/app/page.tsx",
                                                    lineNumber: 467,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/sylor-new/src/app/page.tsx",
                                            lineNumber: 456,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "rounded-[10px] bg-white text-left px-6 py-4 text-slate-950 w-full max-w-sm",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-xs text-slate-500 uppercase tracking-wide",
                                                    children: "Pro"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/sylor-new/src/app/page.tsx",
                                                    lineNumber: 476,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "mt-2 text-3xl font-bold",
                                                    children: "$399"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/sylor-new/src/app/page.tsx",
                                                    lineNumber: 477,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-sm text-slate-500",
                                                    children: "per month"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/sylor-new/src/app/page.tsx",
                                                    lineNumber: 478,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                                    className: "mt-4 space-y-2 text-sm text-slate-700",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                            children: "• Unlimited leads"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/sylor-new/src/app/page.tsx",
                                                            lineNumber: 480,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                            children: "• Voice agent + SMS"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/sylor-new/src/app/page.tsx",
                                                            lineNumber: 481,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                            children: "• Multi-location / tenants"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/sylor-new/src/app/page.tsx",
                                                            lineNumber: 482,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Desktop/sylor-new/src/app/page.tsx",
                                                    lineNumber: 479,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    href: "/onboarding?plan=pro",
                                                    className: "mt-4 block w-full rounded-[10px] bg-slate-950 py-2 text-center text-sm text-white hover:bg-slate-900",
                                                    children: "Choose Pro"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/sylor-new/src/app/page.tsx",
                                                    lineNumber: 484,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/sylor-new/src/app/page.tsx",
                                            lineNumber: 475,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/sylor-new/src/app/page.tsx",
                                    lineNumber: 454,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/sylor-new/src/app/page.tsx",
                            lineNumber: 445,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Desktop/sylor-new/src/app/page.tsx",
                        lineNumber: 441,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/sylor-new/src/app/page.tsx",
                lineNumber: 117,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
                className: "border-t border-white/5 py-8",
                id: "docs",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mx-auto flex max-w-6xl flex-col gap-4 px-4 text-sm text-white/40 sm:flex-row sm:items-center sm:justify-between",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            children: [
                                "© ",
                                new Date().getFullYear(),
                                " Sylor.ai. All rights reserved."
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/sylor-new/src/app/page.tsx",
                            lineNumber: 499,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex gap-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: "#",
                                    className: "hover:text-white transition rounded-[10px]",
                                    children: "Status"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/sylor-new/src/app/page.tsx",
                                    lineNumber: 501,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: "#",
                                    className: "hover:text-white transition rounded-[10px]",
                                    children: "Privacy"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/sylor-new/src/app/page.tsx",
                                    lineNumber: 504,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$sylor$2d$new$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: "#",
                                    className: "hover:text-white transition rounded-[10px]",
                                    children: "Terms"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/sylor-new/src/app/page.tsx",
                                    lineNumber: 507,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/sylor-new/src/app/page.tsx",
                            lineNumber: 500,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/sylor-new/src/app/page.tsx",
                    lineNumber: 498,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Desktop/sylor-new/src/app/page.tsx",
                lineNumber: 497,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/sylor-new/src/app/page.tsx",
        lineNumber: 26,
        columnNumber: 5
    }, this);
}
_s(HomePage, "rB05KuOzkFFb7A7euf2dpNZ7RG4=");
_c = HomePage;
var _c;
__turbopack_context__.k.register(_c, "HomePage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=Desktop_sylor-new_src_app_page_tsx_bbc4f49b._.js.map