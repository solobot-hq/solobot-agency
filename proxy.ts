// /proxy.ts (Project root or /src)
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// 1. Define public and protected routes explicitly
const isPublicRoute = createRouteMatcher([
    "/", 
    "/sign-in(.*)", 
    "/sign-up(.*)", 
    "/api/webhooks/(.*)"
]);

const isDashboardRoute = createRouteMatcher(["/dashboard(.*)"]);

export default clerkMiddleware(async (auth, req) => {
    // 2. Allow public routes to bypass auth
    if (isPublicRoute(req)) return;

    // 3. Protect dashboard routes and redirect to sign-in
    if (isDashboardRoute(req)) {
        await auth.protect(); // Clerk automatically handles the redirect
    }
});

export const config = {
    // 4. Optimized matcher for Next.js 16/Turbopack
    matcher: [
        // Skip Next.js internals and static files
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always run for API and trpc routes
        '/(api|trpc)(.*)',
    ],
};