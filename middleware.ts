import { clerkMiddleware } from "@clerk/nextjs/server";

// This makes the middleware a "pass-through"
export default clerkMiddleware();

export const config = {
  // Empty matcher = No routes are intercepted or protected
  matcher: [],
};