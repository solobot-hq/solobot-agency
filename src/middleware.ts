import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

/**
 * 1. Define Public Routes
 * These routes will NOT trigger a redirect to the Sign-In page.
 */
const isPublicRoute = createRouteMatcher([
  "/",               // Landing Page (The Root)
  "/sign-in(.*)",    // Clerk Sign-in
  "/sign-up(.*)",    // Clerk Sign-up
  "/pricing(.*)",    // Pricing Page (if separate)
  "/api/webhook(.*)" // Stripe/Payment Webhooks
]);

/**
 * 2. Standard Middleware Export
 * Handles the logic of who can see what.
 */
export default clerkMiddleware(async (auth, req) => {
  // If the route is NOT public, protect it.
  // This allows the Landing Page to load so "GET STARTED" can work.
  if (!isPublicRoute(req)) {
    await auth.protect();
  }
});

/**
 * 3. Matcher Configuration
 * This ensures the middleware runs on all routes except static assets.
 */
export const config = {
  matcher: [
    // Skip Next.js internals and all static files (images, fonts, etc.)
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};