module.exports = [
"[project]/lib/usage.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// FREE LIMIT RULE  
__turbopack_context__.s([
    "FREE_LIMIT",
    ()=>FREE_LIMIT,
    "getUsage",
    ()=>getUsage,
    "incrementUsage",
    ()=>incrementUsage
]);
const FREE_LIMIT = 3;
/**
 * MOCK IMPLEMENTATION – works even without Firebase.
 */ const mockDb = {};
async function getUsage(userId) {
    return {
        count: mockDb[userId] || 0
    };
}
async function incrementUsage(userId) {
    mockDb[userId] = (mockDb[userId] || 0) + 1;
    return {
        count: mockDb[userId]
    };
}
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/events [external] (events, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("events", () => require("events"));

module.exports = mod;
}),
"[externals]/http [external] (http, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("http", () => require("http"));

module.exports = mod;
}),
"[externals]/https [external] (https, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("https", () => require("https"));

module.exports = mod;
}),
"[externals]/child_process [external] (child_process, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("child_process", () => require("child_process"));

module.exports = mod;
}),
"[project]/lib/stripe.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "stripe",
    ()=>stripe
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$stripe$2f$esm$2f$stripe$2e$esm$2e$node$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/stripe/esm/stripe.esm.node.js [app-rsc] (ecmascript)");
;
const stripe = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$stripe$2f$esm$2f$stripe$2e$esm$2e$node$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"](process.env.STRIPE_SECRET_KEY || "", {
    apiVersion: "2024-06-20",
    typescript: true
});
}),
"[project]/lib/subscription.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getUserSubscriptionStatus",
    ()=>getUserSubscriptionStatus
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$app$2d$router$2f$server$2f$currentUser$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@clerk/nextjs/dist/esm/app-router/server/currentUser.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$stripe$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/stripe.ts [app-rsc] (ecmascript)");
;
;
// 🔥 CENTRAL ADMIN BYPASS LIST
const ADMIN_EMAILS = [
    "solobotagency@gmail.com"
];
async function getUserSubscriptionStatus(userId) {
    try {
        const user = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$app$2d$router$2f$server$2f$currentUser$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["currentUser"])();
        if (!userId || !user) {
            return {
                isPremium: false,
                plan: null
            };
        }
        const email = user.emailAddresses[0]?.emailAddress;
        // 🔥 ALWAYS UNLOCK FOR OWNER & ADMINS
        if (email && ADMIN_EMAILS.includes(email)) {
            return {
                isPremium: true,
                plan: "ADMIN"
            };
        }
        if (!email) {
            return {
                isPremium: false,
                plan: null
            };
        }
        // NORMAL USER → CHECK STRIPE
        const customers = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$stripe$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["stripe"].customers.list({
            email,
            limit: 1,
            expand: [
                "data.subscriptions"
            ]
        });
        const customer = customers.data[0];
        if (!customer) return {
            isPremium: false,
            plan: null
        };
        const subs = customer.subscriptions?.data || [];
        const active = subs.find((s)=>s.status === "active" || s.status === "trialing");
        if (!active) {
            return {
                isPremium: false,
                plan: null
            };
        }
        return {
            isPremium: true,
            plan: active.items.data[0]?.price.nickname || "PRO"
        };
    } catch (err) {
        console.error("SUBSCRIPTION ERROR:", err);
        return {
            isPremium: false,
            plan: null
        };
    }
}
}),
"[project]/app/dashboard/ai-sales-agent/lib/paywall.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"0003ea8cbe68cc9920ef40a53191b5f01760aa19ba":"createCheckoutSession","0058e0215e3f23f08d6e57eb15f66f612b11b54efb":"trackUsage","00be49a7f64b97c8ae5cae46192ba61d4957b24edd":"checkUsage"},"",""] */ __turbopack_context__.s([
    "checkUsage",
    ()=>checkUsage,
    "createCheckoutSession",
    ()=>createCheckoutSession,
    "trackUsage",
    ()=>trackUsage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$app$2d$router$2f$server$2f$auth$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@clerk/nextjs/dist/esm/app-router/server/auth.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$usage$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/usage.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$subscription$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/subscription.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$stripe$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/stripe.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$api$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/api/navigation.react-server.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/components/navigation.react-server.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
;
;
;
// HARD ADMIN OVERRIDE – UNLIMITED ACCESS
const ADMIN_EMAIL = "solobotagency@gmail.com";
async function checkUsage() {
    const { userId } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$app$2d$router$2f$server$2f$auth$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["auth"])();
    if (!userId) {
        return {
            usage: 0,
            remaining: 0,
            limit: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$usage$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["FREE_LIMIT"],
            isLocked: true,
            isPremium: false
        };
    }
    // Get subscription + user email
    const sub = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$subscription$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getUserSubscriptionStatus"])(userId);
    // ⭐ ADMIN ALWAYS UNLOCKED ⭐
    if (sub.plan === "ADMIN") {
        return {
            usage: 0,
            remaining: 9999,
            limit: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$usage$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["FREE_LIMIT"],
            isLocked: false,
            isPremium: true,
            plan: "ADMIN"
        };
    }
    // ⭐ PREMIUM UNLOCKED ⭐
    if (sub.isPremium) {
        return {
            usage: 0,
            remaining: 9999,
            limit: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$usage$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["FREE_LIMIT"],
            isLocked: false,
            isPremium: true,
            plan: sub.plan
        };
    }
    // FREE USER LOGIC
    const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$usage$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getUsage"])(userId);
    const used = data.count || 0;
    return {
        usage: used,
        remaining: Math.max(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$usage$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["FREE_LIMIT"] - used),
        limit: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$usage$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["FREE_LIMIT"],
        isLocked: used >= __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$usage$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["FREE_LIMIT"],
        isPremium: false
    };
}
async function trackUsage() {
    const { userId } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$app$2d$router$2f$server$2f$auth$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["auth"])();
    if (!userId) return;
    const sub = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$subscription$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getUserSubscriptionStatus"])(userId);
    // Admin / premium → do NOT count usage
    if (sub.plan === "ADMIN" || sub.isPremium) return;
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$usage$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["incrementUsage"])(userId);
}
async function createCheckoutSession() {
    const { userId } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$app$2d$router$2f$server$2f$auth$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["auth"])();
    if (!userId) return;
    const priceId = process.env.STRIPE_PRO_MONTHLY_PRICE_ID;
    const appUrl = process.env.NEXT_PUBLIC_APP_URL;
    if (!priceId) {
        console.error("Missing price ID");
        return;
    }
    const session = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$stripe$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["stripe"].checkout.sessions.create({
        mode: "subscription",
        line_items: [
            {
                price: priceId,
                quantity: 1
            }
        ],
        metadata: {
            userId
        },
        success_url: `${appUrl}/dashboard/ai-sales-agent?success=true`,
        cancel_url: `${appUrl}/dashboard/ai-sales-agent?canceled=true`
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["redirect"])(session.url);
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    checkUsage,
    trackUsage,
    createCheckoutSession
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(checkUsage, "00be49a7f64b97c8ae5cae46192ba61d4957b24edd", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(trackUsage, "0058e0215e3f23f08d6e57eb15f66f612b11b54efb", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createCheckoutSession, "0003ea8cbe68cc9920ef40a53191b5f01760aa19ba", null);
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__45d54d9d._.js.map