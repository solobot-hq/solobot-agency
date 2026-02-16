import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define exactly what the public can see without logging in
const isPublicRoute = createRouteMatcher([
  "/",                // The Landing Page
  "/sign-in(.*)",     // Login Page
  "/sign-up(.*)",     // Signup Page
  "/api/webhook(.*)"  // Stripe/Payment hooks
]);

export default clerkMiddleware(async (auth, req) => {
  // If it is NOT one of the public routes above, protect it
  if (!isPublicRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // This regex ensures Clerk doesn't block images, CSS, or the landing page
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};