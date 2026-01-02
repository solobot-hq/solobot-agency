import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/api/public(.*)",
  "/favicon.ico",
  "/sl.png",         // ✅ LOGO IS NOW SAFE
  "/_next/static(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  // ✅ FIX: Break the 404 loop by ignoring paths with trailing dots
  if (req.nextUrl.pathname.endsWith(".")) {
    return;
  }

  if (!isPublicRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|sl.png|api/public).*)",
    "/(api|trpc)(.*)",
  ],
};