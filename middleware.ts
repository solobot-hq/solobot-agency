import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// This list defines exactly what the public can see without logging in
const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/webhook(.*)"
]);

export default clerkMiddleware(async (auth, request) => {
  // If the user is NOT going to a public route, make sure they are logged in
  if (!isPublicRoute(request)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // This allows the middleware to run on every page so it can check the list above
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};