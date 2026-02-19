import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// 1. Only protect the dashboard and billing areas
const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/billing(.*)',
]);

export default clerkMiddleware(async (auth, request) => {
  // 2. If they are trying to go to the dashboard, make sure they are signed in
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