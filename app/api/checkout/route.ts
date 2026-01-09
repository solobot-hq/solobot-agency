/**
 * CHECKOUT SESSION CREATION (PHASE 3)
 * Full Production Version: Zero-Crash Build Logic
 */

import { NextResponse } from "next/server";
import Stripe from "stripe";
import { openai } from "@/lib/openai"; 
import { getAuthUser } from "@/lib/auth"; 
import { validatePriceInterval } from "@/lib/billing/validator";
import { validateUsageEnforcement } from "@/lib/usage/enforcement";
import { BillingInterval } from "@/config/stripe";

// ✅ FORCE DYNAMIC: This tells Next.js to skip pre-rendering this route during build.
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    // 1. BUILD-SAFE STRIPE INIT
    const stripeKey = process.env.STRIPE_SECRET_KEY || "sk_test_placeholder_for_build";
    const stripe = new Stripe(stripeKey, {
      apiVersion: "2024-12-18.acacia",
      typescript: true,
    });

    // 2. RUNTIME KEY CHECK
    // This only runs when a REAL user makes a request, not during build.
    if (!process.env.STRIPE_SECRET_KEY || !process.env.OPENAI_API_KEY) {
       console.error("❌ CRITICAL: Environment variables missing at runtime!");
       return new NextResponse("Server configuration error", { status: 503 });
    }

    const { priceId, interval } = await req.json();
    
    // 3. Auth: Using the approved getAuthUser helper
    const user = await getAuthUser();
    const userId = user?.id;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // --- 1. GUARD: INTERVAL INTEGRITY ---
    const intervalValidation = validatePriceInterval(priceId, interval as BillingInterval);
    if (!intervalValidation.isValid) {
      return new NextResponse(intervalValidation.error, { status: 400 });
    }

    // --- 2. GUARD: USAGE ENFORCEMENT ---
    const usageValidation = await validateUsageEnforcement(
      userId, 
      intervalValidation.planId!, 
      false 
    );

    if (!usageValidation.allowed) {
      return new NextResponse(`Limit Exceeded: ${usageValidation.reason}`, { status: 403 });
    }

    // --- 3. SESSION CREATION ---
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      billing_address_collection: "auto",
      customer_email: user.email!, 
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/billing?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/billing?canceled=true`,
      metadata: {
        userId: userId,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Checkout Error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}