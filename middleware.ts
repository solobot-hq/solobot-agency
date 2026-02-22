import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// We ONLY protect the dashboard. Everything else is open by default.
const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  // Standard matcher that ignores static files and Next.js internals
  matcher: ["/((?!_next|.*\\..*).*)"],
};