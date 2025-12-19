import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export default clerkMiddleware({
    // Correct public routes
    publicRoutes: [
        "/",
        "/sign-in",
        "/sign-up",
        "/api/webhooks/(.*)"
    ],
    
    afterAuth(auth, req) {
        const url = new URL(req.url);
        
        if (auth.userId) {
            return NextResponse.next();
        }

        if (url.pathname.startsWith('/dashboard')) {
            const signInUrl = new URL("/sign-in", req.url);
            return NextResponse.redirect(signInUrl);
        }
        
        return NextResponse.next();
    },
});

export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api/trpc)(.*)"],
};