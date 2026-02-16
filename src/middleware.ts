import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// 1. Define exactly what the public can see
const isPublicRoute = createRouteMatcher([
  "/", 
  "/sign-in(.*)", 
  "/sign-up(.*)", 
  "/api/webhook(.*)"
]);

export default clerkMiddleware(async (auth, req) => {
  // 2. ONLY protect if it is NOT a public route
  // This allows the landing page to load its JS and run your scroll logic
  if (!isPublicRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Optimized for Next.js 15 to ignore static files and allow the landing page
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};