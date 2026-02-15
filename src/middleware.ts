import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

/**
 * 1. Define Public Routes
 * These routes are explicitly allowed without authentication.
 */
const isPublicRoute = createRouteMatcher([
  "/",                // Landing Page (The Root)
  "/sign-in(.*)",    // Clerk Sign-in
  "/sign-up(.*)",    // Clerk Sign-up
  "/pricing(.*)",    // Pricing Page
  "/api/webhook(.*)" // Stripe/Payment Webhooks
]);

/**
 * 2. Standard Middleware Export
 * Using an explicit return for public routes to bypass all checks.
 */
export default clerkMiddleware(async (auth, req) => {
  // If it's a public route, return immediately to let the request through
  if (isPublicRoute(req)) {
    return NextResponse.next();
  }

  // For all other routes (Dashboard, etc.), enforce protection
  await auth.protect();
});

/**
 * 3. Matcher Configuration
 * A more robust regex to ensure the middleware doesn't interfere with static assets
 * but captures all app routes.
 */
export const config = {
  matcher: [
    // Capture all routes except static files and internals
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API and TRPC routes
    '/(api|trpc)(.*)',
  ],
};