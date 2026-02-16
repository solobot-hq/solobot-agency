import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define exactly what is public so Clerk doesn't panic
const isPublicRoute = createRouteMatcher(['/', '/sign-in(.*)', '/sign-up(.*)']);

export default clerkMiddleware((auth, request) => {
  if (isPublicRoute(request)) {
    // If it's a public route, do absolutely nothing. No redirect.
    return;
  }
});

export const config = {
  matcher: [
    // This catches everything except internal Next.js files and static assets
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};