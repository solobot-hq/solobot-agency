module.exports = [
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/app/layout.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/layout.tsx [app-rsc] (ecmascript)"));
}),
"[project]/app/dashboard/layout.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/dashboard/layout.tsx [app-rsc] (ecmascript)"));
}),
"[project]/app/dashboard/email-assistant/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {

// --- UPDATED SELECT COMPONENT (Restored Inline Version) ---
const { jsxDEV: _jsxDEV, Fragment: _Fragment } = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
const Select = ({ label, value, options, onChange })=>{
    const [isOpen, setIsOpen] = useState(false);
    const selectedOption = options.find((o)=>o.value === value) || options[0];
    return /*#__PURE__*/ _jsxDEV("div", {
        className: "relative group z-20",
        children: [
            /*#__PURE__*/ _jsxDEV("label", {
                className: "block text-[11px] font-bold text-white/40 uppercase mb-2 ml-1 tracking-wider",
                children: label
            }, void 0, false, {
                fileName: "[project]/app/dashboard/email-assistant/page.tsx",
                lineNumber: 8,
                columnNumber: 7
            }, /*TURBOPACK member replacement*/ __turbopack_context__.e),
            /*#__PURE__*/ _jsxDEV("button", {
                onClick: ()=>setIsOpen(!isOpen),
                className: `w-full bg-[#0a0d14]/50 border rounded-xl px-4 py-3 text-left flex items-center justify-between transition-all duration-200 
          ${isOpen ? 'border-[#00C26D]/50 ring-1 ring-[#00C26D]/50 bg-[#131720]' : 'border-white/10 hover:border-white/20'}
        `,
                children: [
                    /*#__PURE__*/ _jsxDEV("div", {
                        className: "flex items-center gap-2.5",
                        children: [
                            /*#__PURE__*/ _jsxDEV("span", {
                                className: "text-base",
                                children: selectedOption.icon
                            }, void 0, false, {
                                fileName: "[project]/app/dashboard/email-assistant/page.tsx",
                                lineNumber: 16,
                                columnNumber: 11
                            }, /*TURBOPACK member replacement*/ __turbopack_context__.e),
                            /*#__PURE__*/ _jsxDEV("span", {
                                className: "text-[13px] text-white/90 font-medium",
                                children: selectedOption.label
                            }, void 0, false, {
                                fileName: "[project]/app/dashboard/email-assistant/page.tsx",
                                lineNumber: 17,
                                columnNumber: 11
                            }, /*TURBOPACK member replacement*/ __turbopack_context__.e)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/dashboard/email-assistant/page.tsx",
                        lineNumber: 15,
                        columnNumber: 9
                    }, /*TURBOPACK member replacement*/ __turbopack_context__.e),
                    /*#__PURE__*/ _jsxDEV(ChevronDown, {
                        className: `w-4 h-4 text-white/30 transition-transform duration-200 ${isOpen ? 'rotate-180 text-[#00C26D]' : ''}`
                    }, void 0, false, {
                        fileName: "[project]/app/dashboard/email-assistant/page.tsx",
                        lineNumber: 19,
                        columnNumber: 9
                    }, /*TURBOPACK member replacement*/ __turbopack_context__.e)
                ]
            }, void 0, true, {
                fileName: "[project]/app/dashboard/email-assistant/page.tsx",
                lineNumber: 9,
                columnNumber: 7
            }, /*TURBOPACK member replacement*/ __turbopack_context__.e),
            /*#__PURE__*/ _jsxDEV(AnimatePresence, {
                children: isOpen && /*#__PURE__*/ _jsxDEV(_Fragment, {
                    children: [
                        /*#__PURE__*/ _jsxDEV("div", {
                            className: "fixed inset-0 z-[9998]",
                            onClick: ()=>setIsOpen(false)
                        }, void 0, false, {
                            fileName: "[project]/app/dashboard/email-assistant/page.tsx",
                            lineNumber: 26,
                            columnNumber: 14
                        }, /*TURBOPACK member replacement*/ __turbopack_context__.e),
                        /*#__PURE__*/ _jsxDEV(motion.div, {
                            initial: {
                                opacity: 0,
                                scale: 0.98,
                                y: 5
                            },
                            animate: {
                                opacity: 1,
                                scale: 1,
                                y: 0
                            },
                            exit: {
                                opacity: 0,
                                scale: 0.98,
                                y: 5
                            },
                            transition: {
                                duration: 0.16,
                                ease: "easeOut"
                            },
                            className: "absolute left-0 w-full z-[9999] mt-2 rounded-xl bg-[#131720]/95 border border-white/10 shadow-[0_0_25px_rgba(0,194,109,0.15)] backdrop-blur-md overflow-hidden",
                            children: /*#__PURE__*/ _jsxDEV("div", {
                                className: "max-h-[280px] overflow-y-auto custom-scrollbar p-1",
                                children: options.map((option)=>/*#__PURE__*/ _jsxDEV("div", {
                                        onClick: ()=>{
                                            onChange(option.value);
                                            setIsOpen(false);
                                        },
                                        className: `p-2.5 rounded-lg flex items-start gap-3 cursor-pointer transition-all ${value === option.value ? "bg-[#00C26D]/10 border border-[#00C26D]/20" : "border border-transparent hover:bg-white/5"}`,
                                        children: [
                                            /*#__PURE__*/ _jsxDEV("span", {
                                                className: "text-lg mt-0.5",
                                                children: option.icon
                                            }, void 0, false, {
                                                fileName: "[project]/app/dashboard/email-assistant/page.tsx",
                                                lineNumber: 50,
                                                columnNumber: 25
                                            }, /*TURBOPACK member replacement*/ __turbopack_context__.e),
                                            /*#__PURE__*/ _jsxDEV("div", {
                                                children: [
                                                    /*#__PURE__*/ _jsxDEV("div", {
                                                        className: `text-[13px] font-medium ${value === option.value ? 'text-[#00C26D]' : 'text-white/90'}`,
                                                        children: option.label
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/dashboard/email-assistant/page.tsx",
                                                        lineNumber: 52,
                                                        columnNumber: 27
                                                    }, /*TURBOPACK member replacement*/ __turbopack_context__.e),
                                                    /*#__PURE__*/ _jsxDEV("div", {
                                                        className: "text-[11px] text-white/40 leading-tight mt-0.5",
                                                        children: option.description
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/dashboard/email-assistant/page.tsx",
                                                        lineNumber: 55,
                                                        columnNumber: 27
                                                    }, /*TURBOPACK member replacement*/ __turbopack_context__.e)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/dashboard/email-assistant/page.tsx",
                                                lineNumber: 51,
                                                columnNumber: 25
                                            }, /*TURBOPACK member replacement*/ __turbopack_context__.e)
                                        ]
                                    }, option.value, true, {
                                        fileName: "[project]/app/dashboard/email-assistant/page.tsx",
                                        lineNumber: 38,
                                        columnNumber: 21
                                    }, /*TURBOPACK member replacement*/ __turbopack_context__.e))
                            }, void 0, false, {
                                fileName: "[project]/app/dashboard/email-assistant/page.tsx",
                                lineNumber: 36,
                                columnNumber: 17
                            }, /*TURBOPACK member replacement*/ __turbopack_context__.e)
                        }, void 0, false, {
                            fileName: "[project]/app/dashboard/email-assistant/page.tsx",
                            lineNumber: 29,
                            columnNumber: 14
                        }, /*TURBOPACK member replacement*/ __turbopack_context__.e)
                    ]
                }, void 0, true)
            }, void 0, false, {
                fileName: "[project]/app/dashboard/email-assistant/page.tsx",
                lineNumber: 22,
                columnNumber: 7
            }, /*TURBOPACK member replacement*/ __turbopack_context__.e)
        ]
    }, void 0, true, {
        fileName: "[project]/app/dashboard/email-assistant/page.tsx",
        lineNumber: 7,
        columnNumber: 5
    }, /*TURBOPACK member replacement*/ __turbopack_context__.e);
};
}),
"[project]/app/dashboard/email-assistant/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/dashboard/email-assistant/page.tsx [app-rsc] (ecmascript)"));
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__4f8886b0._.js.map