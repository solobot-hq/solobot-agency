module.exports = [
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
"[project]/lib/usage.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FREE_LIMIT",
    ()=>FREE_LIMIT,
    "getUsage",
    ()=>getUsage,
    "incrementUsage",
    ()=>incrementUsage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$firestore$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/firestore/dist/index.mjs [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@firebase/firestore/dist/index.node.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$app$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/app/dist/index.mjs [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@firebase/app/dist/esm/index.esm.js [app-rsc] (ecmascript)");
;
;
// 1. Safe Configuration Parsing
const configStr = process.env.NEXT_PUBLIC_FIREBASE_CONFIG;
let firebaseConfig;
try {
    firebaseConfig = configStr ? JSON.parse(configStr) : null;
} catch (e) {
    console.error("Firebase Config JSON parse error:", e);
    firebaseConfig = null;
}
// 2. Safe Initialization (Singleton)
let app;
let db;
if (firebaseConfig && firebaseConfig.projectId) {
    try {
        app = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getApps"])().length > 0 ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getApp"])() : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["initializeApp"])(firebaseConfig);
        db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getFirestore"])(app);
    } catch (e) {
        console.error("Firebase initialization failed:", e);
    }
} else {
    console.warn("⚠️ Firebase Config missing or invalid. Usage tracking will be mocked.");
}
const FREE_LIMIT = 3;
// Helper to get usage ref safely
const getUsageRef = (userId)=>{
    if (!db) return null;
    const appId = ("TURBOPACK compile-time value", "solobot-pro") || "default-app";
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["doc"])(db, "artifacts", appId, "users", userId, "usage", "sales-agent");
};
async function getUsage(userId) {
    // Fail safe if DB isn't connected
    if (!db) return {
        count: 0
    };
    try {
        const usageRef = getUsageRef(userId);
        if (!usageRef) return {
            count: 0
        };
        const snapshot = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getDoc"])(usageRef);
        if (snapshot.exists()) {
            return {
                count: snapshot.data().count || 0
            };
        }
        // Create default if not exists
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["setDoc"])(usageRef, {
            count: 0
        });
        return {
            count: 0
        };
    } catch (error) {
        console.error("Error fetching usage:", error);
        return {
            count: 0
        };
    }
}
async function incrementUsage(userId) {
    if (!db) return 0;
    try {
        const usageRef = getUsageRef(userId);
        if (!usageRef) return 0;
        const snapshot = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getDoc"])(usageRef);
        if (!snapshot.exists()) {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["setDoc"])(usageRef, {
                count: 1
            });
            return 1;
        } else {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updateDoc"])(usageRef, {
                count: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["increment"])(1)
            });
            return (snapshot.data().count || 0) + 1;
        }
    } catch (error) {
        console.error("Error incrementing usage:", error);
        return 0;
    }
}
}),
"[project]/lib/stripe.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getUserSubscriptionStatus",
    ()=>getUserSubscriptionStatus
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$stripe$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/stripe.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$app$2d$router$2f$server$2f$auth$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@clerk/nextjs/dist/esm/app-router/server/auth.js [app-rsc] (ecmascript)");
;
;
async function getUserSubscriptionStatus(userId) {
    if (!userId) {
        return {
            isPremium: false,
            plan: null
        };
    }
    // Look up Stripe customer by Clerk userId (saved in metadata)
    const customers = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$stripe$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["stripe"].customers.list({
        limit: 1,
        expand: [
            "data.subscriptions"
        ],
        email: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$app$2d$router$2f$server$2f$auth$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["auth"])()?.user?.emailAddresses?.[0]?.emailAddress
    });
    const customer = customers.data[0];
    if (!customer) {
        return {
            isPremium: false,
            plan: null
        };
    }
    // Extract active subscription
    const subscriptions = customer.subscriptions?.data || [];
    const activeSub = subscriptions.find((sub)=>sub.status === "active" || sub.status === "trialing");
    if (!activeSub) {
        return {
            isPremium: false,
            plan: null
        };
    }
    return {
        isPremium: true,
        plan: activeSub.items.data[0]?.price.product || "pro"
    };
}
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
async function getUserSubscriptionStatus(userId) {
    try {
        // 1. Get User Email from Clerk
        const user = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$app$2d$router$2f$server$2f$currentUser$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["currentUser"])();
        if (!userId || !user) {
            return {
                isPremium: false,
                plan: null
            };
        }
        const email = user.emailAddresses[0]?.emailAddress;
        if (!email) {
            return {
                isPremium: false,
                plan: null
            };
        }
        // 2. ADMIN BYPASS (Critical for testing)
        if (email === "solobotagency@gmail.com") {
            return {
                isPremium: true,
                plan: "ADMIN"
            };
        }
        // 3. Look up Stripe customer by email
        const customers = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$stripe$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["stripe"].customers.list({
            limit: 1,
            email: email,
            expand: [
                "data.subscriptions"
            ]
        });
        const customer = customers.data[0];
        if (!customer) {
            return {
                isPremium: false,
                plan: null
            };
        }
        // 4. Extract active subscription
        const subscriptions = customer.subscriptions?.data || [];
        const activeSub = subscriptions.find((sub)=>sub.status === "active" || sub.status === "trialing");
        if (!activeSub) {
            return {
                isPremium: false,
                plan: null
            };
        }
        // 5. Return Status
        return {
            isPremium: true,
            // Use nickname if available, otherwise default to "PRO"
            plan: activeSub.items.data[0]?.price.nickname || "PRO"
        };
    } catch (error) {
        console.error("Error checking subscription:", error);
        return {
            isPremium: false,
            plan: null
        };
    }
}
}),
"[project]/app/dashboard/ai-sales-agent/lib/paywall.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"0003ea8cbe68cc9920ef40a53191b5f01760aa19ba":"createCheckoutSession","003ae911a44d1f73b43eaeb78369f5fd1344927dea":"incrementUsage","0058e0215e3f23f08d6e57eb15f66f612b11b54efb":"trackUsage","00be49a7f64b97c8ae5cae46192ba61d4957b24edd":"checkUsage"},"",""] */ __turbopack_context__.s([
    "checkUsage",
    ()=>checkUsage,
    "createCheckoutSession",
    ()=>createCheckoutSession,
    "incrementUsage",
    ()=>incrementUsage,
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
async function checkUsage() {
    const { userId } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$app$2d$router$2f$server$2f$auth$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["auth"])();
    // If not logged in, return locked state (safe default)
    if (!userId) {
        return {
            usage: 0,
            remaining: 0,
            limit: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$usage$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["FREE_LIMIT"],
            isLocked: true,
            isPremium: false
        };
    }
    // Check Subscription Status (Handles Admin Bypass internally)
    const subscription = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$subscription$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getUserSubscriptionStatus"])(userId);
    // PREMIUM / ADMIN LOGIC -> UNLIMITED ACCESS
    if (subscription.isPremium) {
        return {
            usage: 0,
            remaining: 9999,
            limit: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$usage$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["FREE_LIMIT"],
            isLocked: false,
            isPremium: true,
            plan: subscription.plan
        };
    }
    // FREE TIER LOGIC -> CHECK FIREBASE USAGE
    const usage = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$usage$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getUsage"])(userId);
    const currentCount = usage.count || 0;
    const remaining = Math.max(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$usage$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["FREE_LIMIT"] - currentCount);
    const isLocked = currentCount >= __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$usage$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["FREE_LIMIT"];
    return {
        usage: currentCount,
        remaining,
        limit: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$usage$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["FREE_LIMIT"],
        isLocked,
        isPremium: false
    };
}
async function incrementUsage() {
    const { userId } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$app$2d$router$2f$server$2f$auth$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["auth"])();
    if (!userId) return;
    const subscription = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$subscription$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getUserSubscriptionStatus"])(userId);
    // Premium users do NOT increment usage count
    if (subscription.isPremium) return;
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$usage$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["incrementUsage"])(userId);
}
async function trackUsage() {
    await incrementUsage();
}
async function createCheckoutSession() {
    const { userId } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$app$2d$router$2f$server$2f$auth$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["auth"])();
    if (!userId) return;
    // ✅ FIX: Use the correct environment variable
    const priceId = process.env.STRIPE_PRO_MONTHLY_PRICE_ID;
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    if (!priceId) {
        console.error("❌ Configuration Error: STRIPE_PRO_MONTHLY_PRICE_ID is missing.");
        return;
    }
    try {
        const session = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$stripe$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["stripe"].checkout.sessions.create({
            mode: "subscription",
            payment_method_types: [
                "card"
            ],
            line_items: [
                {
                    price: priceId,
                    quantity: 1
                }
            ],
            // Metadata allows linking the session back to the user later if needed
            metadata: {
                userId: userId
            },
            success_url: `${appUrl}/dashboard/ai-sales-agent?success=true`,
            cancel_url: `${appUrl}/dashboard/ai-sales-agent?canceled=true`
        });
        if (session.url) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["redirect"])(session.url);
        }
    } catch (error) {
        console.error("Stripe session creation failed", error);
        // Fallback redirect if Stripe fails
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["redirect"])("/dashboard/billing");
    }
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    checkUsage,
    incrementUsage,
    trackUsage,
    createCheckoutSession
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(checkUsage, "00be49a7f64b97c8ae5cae46192ba61d4957b24edd", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(incrementUsage, "003ae911a44d1f73b43eaeb78369f5fd1344927dea", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(trackUsage, "0058e0215e3f23f08d6e57eb15f66f612b11b54efb", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createCheckoutSession, "0003ea8cbe68cc9920ef40a53191b5f01760aa19ba", null);
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__e0281eb7._.js.map