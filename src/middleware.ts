import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/", 
  "/sign-in(.*)", 
  "/sign-up(.*)", 
  "/api/webhook(.*)"
]);

export default clerkMiddleware(async (auth, req) => {
  // 1. If it's the root landing page, Bypassing Clerk entirely
  if (isPublicRoute(req)) {
    return NextResponse.next();
  }

  // 2. Protect everything else
  await auth.protect();
});

export const config = {
  matcher: [
    // Optimized matcher for Next.js 15
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};