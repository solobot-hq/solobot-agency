import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

/**
 * 1. Define Public Routes
 * Routes that do not require authentication.
 */
const isPublicRoute = createRouteMatcher([
  "/",               // Landing Page
  "/sign-in(.*)",    // Clerk Sign-in
  "/sign-up(.*)",    // Clerk Sign-up
  "/pricing(.*)",    // Pricing Page (if separate)
  "/api/webhook(.*)" // Stripe Webhooks
]);

/**
 * 2. Standard Middleware Export
 * Handles the logic of who can see what.
 */
export default clerkMiddleware(async (auth, req) => {
  // If the route is NOT public, protect it
  if (!isPublicRoute(req)) {
    await auth.protect();
  }
});

/**
 * 3. Matcher Configuration
 * Required for Next.js to register and execute this file.
 * This version ensures all routes are caught, including the root.
 */
export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};