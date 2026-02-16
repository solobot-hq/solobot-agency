import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// 1. Explicitly define public routes
const isPublicRoute = createRouteMatcher([
  "/",                // Landing Page
  "/sign-in(.*)",     // Login
  "/sign-up(.*)",     // Signup
  "/api/webhook(.*)"  // Stripe/Clerk Webhooks
]);

export default clerkMiddleware(async (auth, req) => {
  // 2. If the request is for a public route, do nothing (let it pass)
  if (isPublicRoute(req)) {
    return;
  }

  // 3. Protect all other routes
  await auth.protect();
});

export const config = {
  matcher: [
    // Optimized matcher for Next.js 15 to ignore static files and allow landing page assets
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API and TRPC routes
    '/(api|trpc)(.*)',
  ],
};