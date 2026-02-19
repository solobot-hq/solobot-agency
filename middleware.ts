import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// 1. We MUST allow the home page AND the sign-in/sign-up pages to be public
const isPublicRoute = createRouteMatcher([
  "/", 
  "/sign-in(.*)", 
  "/sign-up(.*)"
]);

export default clerkMiddleware(async (auth, request) => {
  // 2. If it's a public door, just let them in
  if (isPublicRoute(request)) {
    return; 
  }

  // 3. If it's anything else (like /dashboard), check their ID
  await auth.protect();
});

export const config = {
  matcher: [
    // Skip Next.js internals and static files
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};