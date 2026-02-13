import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// 1. Define exactly which routes anyone can see without logging in
const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",    // ✅ Crucial: Allow access to sign-in page
  "/sign-up(.*)",    // ✅ Crucial: Allow access to sign-up page
  "/api/public(.*)",
  "/favicon.ico",
  "/sl.png",         // ✅ Your Logo
  "/static/(.*)",    // ✅ Any files in a static folder
]);

export default clerkMiddleware(async (auth, req) => {
  // 2. Fix for trailing dots or weird URL formatting that causes 404 loops
  if (req.nextUrl.pathname.endsWith(".")) {
    const url = req.nextUrl.clone();
    url.pathname = url.pathname.replace(/\.$/, "");
    return Response.redirect(url);
  }

  // 3. If it's not a public route, make sure the user is logged in
  if (!isPublicRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // 4. This updated regex skips ALL internal Next.js files (_next) and static assets
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};