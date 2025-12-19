(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/dashboard/ai-sales-agent/components/SalesAgentUI.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SalesAgentUI
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
const LEAD_INSIGHTS = {
    score: 82,
    company: "TechFlow Dynamics",
    role: "VP of Engineering",
    painPoints: [
        "Slow development cycles",
        "High cloud costs",
        "Legacy code issues"
    ],
    buyingSignals: [
        "Visited pricing 4x",
        "Downloaded whitepaper",
        "Hiring DevOps"
    ]
};
function SalesAgentUI() {
    _s();
    const [input, setInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [messages, setMessages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([
        {
            id: "welcome",
            role: "ai",
            content: "I'm online. Select a mode on the left to begin.",
            timestamp: new Date().toLocaleTimeString()
        }
    ]);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [activeMode, setActiveMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("Smart Reply Generator");
    const [isLeftSidebarOpen, setIsLeftSidebarOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [isRightSidebarOpen, setIsRightSidebarOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const scrollRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SalesAgentUI.useEffect": ()=>{
            if (scrollRef.current) {
                scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
            }
        }
    }["SalesAgentUI.useEffect"], [
        messages,
        isLoading
    ]);
    const handleSendMessage = async ()=>{
        if (!input.trim()) return;
        const userMsg = {
            id: Date.now().toString(),
            role: "user",
            content: input,
            timestamp: new Date().toLocaleTimeString()
        };
        setMessages((prev)=>[
                ...prev,
                userMsg
            ]);
        setInput("");
        setIsLoading(true);
        try {
            const res = await fetch("/api/ai-sales-agent", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    messages: [
                        ...messages,
                        userMsg
                    ].map((m)=>({
                            role: m.role === "ai" ? "assistant" : m.role,
                            content: m.content
                        })),
                    mode: activeMode,
                    leadContext: LEAD_INSIGHTS
                })
            });
            const data = await res.json();
            if (res.status === 402) {
                setMessages((prev)=>[
                        ...prev,
                        {
                            id: Date.now().toString(),
                            role: "system",
                            content: "🔒 FREE LIMIT REACHED. Upgrade to Pro to continue.",
                            timestamp: new Date().toLocaleTimeString()
                        }
                    ]);
            } else if (res.status === 403) {
                setMessages((prev)=>[
                        ...prev,
                        {
                            id: Date.now().toString(),
                            role: "system",
                            content: `🔒 "${activeMode}" is locked for free users.`,
                            timestamp: new Date().toLocaleTimeString()
                        }
                    ]);
            } else {
                setMessages((prev)=>[
                        ...prev,
                        {
                            id: Date.now().toString(),
                            role: "ai",
                            content: data.reply,
                            strategy: data.strategy,
                            timestamp: new Date().toLocaleTimeString()
                        }
                    ]);
            }
        } catch  {
            setMessages((prev)=>[
                    ...prev,
                    {
                        id: Date.now().toString(),
                        role: "system",
                        content: "⚠️ Error connecting to AI Agent.",
                        timestamp: new Date().toLocaleTimeString()
                    }
                ]);
        } finally{
            setIsLoading(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "h-full w-full bg-[#0B1120]"
    }, void 0, false, {
        fileName: "[project]/app/dashboard/ai-sales-agent/components/SalesAgentUI.tsx",
        lineNumber: 166,
        columnNumber: 10
    }, this);
}
_s(SalesAgentUI, "26TD4OtKLSwT8tVqDiq0iQMcNbg=");
_c = SalesAgentUI;
var _c;
__turbopack_context__.k.register(_c, "SalesAgentUI");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=app_dashboard_ai-sales-agent_components_SalesAgentUI_tsx_f04c6e46._.js.map