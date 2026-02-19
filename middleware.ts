import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// 1. Only list the specific pages that REQUIRE a login
const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/billing(.*)',
]);

export default clerkMiddleware(async (auth, request) => {
  // 2. Only run protection if the user is trying to access the dashboard or billing
  if (isProtectedRoute(request)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and static files
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};