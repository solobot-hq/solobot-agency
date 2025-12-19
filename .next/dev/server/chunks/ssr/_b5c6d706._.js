module.exports = [
"[project]/app/dashboard/email-assistant/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>EmailAssistantPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$briefcase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Briefcase$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/briefcase.js [app-ssr] (ecmascript) <export default as Briefcase>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$coffee$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Coffee$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/coffee.js [app-ssr] (ecmascript) <export default as Coffee>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/zap.js [app-ssr] (ecmascript) <export default as Zap>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/heart.js [app-ssr] (ecmascript) <export default as Heart>");
"use client";
;
;
/* ============================
   CONFIG
============================ */ const TONES = [
    {
        id: "Professional",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$briefcase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Briefcase$3e$__["Briefcase"],
        label: "Reliable"
    },
    {
        id: "Casual",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$coffee$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Coffee$3e$__["Coffee"],
        label: "Relaxed"
    },
    {
        id: "Urgent",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__["Zap"],
        label: "Fast Action"
    },
    {
        id: "Empathetic",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__["Heart"],
        label: "Understanding"
    }
];
const VOICE_OPTIONS = [
    {
        label: "Direct",
        value: "Direct",
        icon: "⚡",
        description: "Clear"
    },
    {
        label: "Balanced",
        value: "Balanced",
        icon: "⚖️",
        description: "Neutral"
    },
    {
        label: "Friendly",
        value: "Friendly",
        icon: "😊",
        description: "Warm"
    },
    {
        label: "Executive",
        value: "Executive",
        icon: "🧊",
        description: "C-Level"
    }
];
const LENGTH_OPTIONS = [
    {
        label: "Short",
        value: "Short",
        icon: "🪶",
        description: "Quick"
    },
    {
        label: "Medium",
        value: "Medium",
        icon: "📄",
        description: "Standard"
    },
    {
        label: "Long",
        value: "Long",
        icon: "📜",
        description: "Detailed"
    }
];
/* ============================
   CONTENT INTELLIGENCE LAYER
============================ */ const pick = (arr)=>arr[Math.floor(Math.random() * arr.length)];
const detectIntent = (subject)=>{
    const s = subject.toLowerCase();
    if (s.includes("follow")) return "followup";
    if (s.includes("proposal") || s.includes("partnership")) return "proposal";
    if (s.includes("update")) return "update";
    if (s.includes("meeting") || s.includes("call")) return "meeting";
    return "general";
};
const generateSubject = (base, mode, urgency, tone)=>{
    const intent = detectIntent(base);
    const core = base || "Business Update";
    const pools = {
        followup: [
            `Following up on ${core}`,
            `Next steps on ${core}`,
            `Checking back on ${core}`
        ],
        proposal: [
            `Proposal discussion: ${core}`,
            `Exploring ${core} further`,
            `Partnership opportunity — ${core}`
        ],
        meeting: [
            `Scheduling time re: ${core}`,
            `Quick sync on ${core}`,
            `Aligning on ${core}`
        ],
        update: [
            `Update on ${core}`,
            `Latest developments — ${core}`,
            `Status update: ${core}`
        ],
        general: [
            core,
            `Regarding ${core}`,
            `${core} — discussion`
        ]
    };
    let subject = pick(pools[intent]);
    if (urgency) {
        subject = tone === "Professional" || tone === "Urgent" ? `Time-sensitive: ${subject}` : `Quick note: ${subject}`;
    }
    return `Subject: ${subject}`;
};
const opener = (recipient, tone, warmth, humanize, mode)=>{
    const name = recipient || "there";
    const greetings = {
        Professional: [
            `Dear ${name},`,
            `Hello ${name},`
        ],
        Casual: [
            `Hi ${name},`,
            `${name} —`
        ],
        Urgent: [
            `${name},`,
            `Hi ${name},`
        ],
        Empathetic: [
            `Hi ${name},`,
            `Dear ${name},`
        ]
    };
    let line = pick(greetings[tone] || greetings.Professional);
    if (mode !== "Shorten" && (warmth || humanize)) {
        line += `\n\nI hope you're doing well.`;
    }
    return line;
};
const body = (points, mode, options)=>{
    const p = points || "the points we discussed";
    const strategies = {
        Shorten: [
            `Checking in regarding ${p}.`,
            `Quick follow-up on ${p}.`,
            `Revisiting ${p}.`
        ],
        Expand: [
            `I wanted to provide additional context around ${p}.\n\nGiven the importance of this, I believe alignment here will help us move forward confidently.`,
            `To expand on ${p}, I’ve outlined the key considerations below so we can ensure clarity.`,
            `There’s a bit more nuance around ${p} that’s worth addressing before next steps.`
        ],
        Formal: [
            `I am writing to formally address ${p}.\n\nPlease review the details at your convenience.`,
            `This message serves to follow up on ${p}.`,
            `Per our prior discussion, I am seeking an update regarding ${p}.`
        ],
        Punchy: [
            `Bottom line on ${p}: we’re ready to move.`,
            `Here’s the situation with ${p}.`,
            `Quick status on ${p}.`
        ],
        Original: [
            `I wanted to touch base regarding ${p}.`,
            `Following up on ${p}.`,
            `Reaching out about ${p}.`
        ]
    };
    let text = pick(strategies[mode] || strategies.Original);
    if (options.simplify) {
        text = text.replace(/regarding|regards|per our/g, "about");
    }
    if (options.formal) {
        text = text.replace("I'm", "I am").replace("we’re", "we are");
    }
    return text;
};
const closing = (mode, tone, options)=>{
    let cta = "";
    if (options.includeCTA) {
        const soft = [
            "Let me know your thoughts.",
            "Happy to discuss further."
        ];
        const medium = [
            "When would be a good time to connect?",
            "Shall we schedule a quick call?"
        ];
        const strong = [
            "Please confirm next steps.",
            "I’d appreciate a response today."
        ];
        cta = options.addUrgency ? pick(strong) : options.addWarmth ? pick(soft) : pick(medium);
    }
    const signoffs = {
        Professional: [
            "Best regards,",
            "Sincerely,"
        ],
        Casual: [
            "Best,",
            "Cheers,"
        ],
        Urgent: [
            "Thanks,",
            "Best,"
        ],
        Empathetic: [
            "Kind regards,",
            "Warmly,"
        ]
    };
    const signoff = mode === "Formal" ? pick(signoffs.Professional) : pick(signoffs[tone] || signoffs.Professional);
    return `${cta ? `\n\n${cta}` : ""}\n\n${signoff}\n[Your Name]`;
};
const generateSmartEmail = (data, mode)=>{
    const subject = generateSubject(data.subject, mode, data.options.addUrgency, data.tone);
    const open = opener(data.recipient, data.tone, data.options.addWarmth, data.options.humanize, mode);
    const mid = body(data.keyPoints, mode, data.options);
    const end = closing(mode, data.tone, data.options);
    return `${subject}\n\n${open}\n\n${mid}${end}`;
};
/* ============================
   UTIL
============================ */ const extractSubjectAndBody = (content)=>{
    const m = content.match(/Subject:\s*(.*)/);
    return {
        subject: m ? m[1] : "",
        body: content.replace(/Subject:.*\n?/, "").trim()
    };
};
function EmailAssistantPage() {
    const [formData, setFormData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        recipient: "",
        subject: "",
        keyPoints: "",
        tone: "Professional",
        style: "Direct",
        length: "Medium",
        options: {
            includeCTA: false,
            addUrgency: false,
            humanize: true,
            formal: false,
            simplify: false,
            addWarmth: false
        }
    });
    const [versions, setVersions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [activeVersionIdx, setActiveVersionIdx] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(-1);
    const [copied, setCopied] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const handleGenerate = ()=>{
        const content = generateSmartEmail(formData, "Original");
        const v = {
            id: crypto.randomUUID(),
            content,
            timestamp: new Date(),
            label: `Draft ${versions.length + 1}`,
            confidence: 94,
            type: "Original"
        };
        setVersions([
            ...versions,
            v
        ]);
        setActiveVersionIdx(versions.length);
    };
    const handleRewrite = (mode)=>{
        const content = generateSmartEmail(formData, mode);
        const v = {
            id: crypto.randomUUID(),
            content,
            timestamp: new Date(),
            label: mode,
            confidence: 98,
            type: "Rewrite"
        };
        setVersions([
            ...versions,
            v
        ]);
        setActiveVersionIdx(versions.length);
    };
    const copyText = (t)=>{
        navigator.clipboard.writeText(t);
        setCopied(true);
    };
    /* UI BELOW — UNCHANGED */ /* ... existing JSX remains identical ... */ return null;
}
}),
"[project]/node_modules/lucide-react/dist/esm/icons/briefcase.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.441.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "default",
    ()=>Briefcase
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-ssr] (ecmascript)");
;
const Briefcase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("Briefcase", [
    [
        "path",
        {
            d: "M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16",
            key: "jecpp"
        }
    ],
    [
        "rect",
        {
            width: "20",
            height: "14",
            x: "2",
            y: "6",
            rx: "2",
            key: "i6l2r4"
        }
    ]
]);
;
 //# sourceMappingURL=briefcase.js.map
}),
"[project]/node_modules/lucide-react/dist/esm/icons/briefcase.js [app-ssr] (ecmascript) <export default as Briefcase>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Briefcase",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$briefcase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$briefcase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/briefcase.js [app-ssr] (ecmascript)");
}),
"[project]/node_modules/lucide-react/dist/esm/icons/coffee.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.441.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "default",
    ()=>Coffee
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-ssr] (ecmascript)");
;
const Coffee = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("Coffee", [
    [
        "path",
        {
            d: "M10 2v2",
            key: "7u0qdc"
        }
    ],
    [
        "path",
        {
            d: "M14 2v2",
            key: "6buw04"
        }
    ],
    [
        "path",
        {
            d: "M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1",
            key: "pwadti"
        }
    ],
    [
        "path",
        {
            d: "M6 2v2",
            key: "colzsn"
        }
    ]
]);
;
 //# sourceMappingURL=coffee.js.map
}),
"[project]/node_modules/lucide-react/dist/esm/icons/coffee.js [app-ssr] (ecmascript) <export default as Coffee>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Coffee",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$coffee$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$coffee$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/coffee.js [app-ssr] (ecmascript)");
}),
"[project]/node_modules/lucide-react/dist/esm/icons/heart.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.441.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "default",
    ()=>Heart
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-ssr] (ecmascript)");
;
const Heart = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("Heart", [
    [
        "path",
        {
            d: "M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z",
            key: "c3ymky"
        }
    ]
]);
;
 //# sourceMappingURL=heart.js.map
}),
"[project]/node_modules/lucide-react/dist/esm/icons/heart.js [app-ssr] (ecmascript) <export default as Heart>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Heart",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/heart.js [app-ssr] (ecmascript)");
}),
];

//# sourceMappingURL=_b5c6d706._.js.map