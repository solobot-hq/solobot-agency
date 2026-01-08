/**
 * CHECKOUT SESSION CREATION (PHASE 3)
 * Uses Phase 2 Guards: validatePriceInterval & validateUsageEnforcement
 * Destination: Stripe Checkout
 */

import { NextResponse } from "next/server";
import Stripe from "stripe";
import { auth } from "@/lib/auth"; // Assumed auth helper
import { validatePriceInterval } from "@/lib/billing/validator";
import { validateUsageEnforcement } from "@/lib/usage/enforcement";
import { BillingInterval } from "@/config/stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

export async function POST(req: Request) {
  try {
    const { priceId, interval } = await req.json();
    const session_auth = await auth();
    const userId = session_auth?.user?.id;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // --- 1. GUARD: INTERVAL INTEGRITY (PHASE 2 - STEP 2) ---
    const intervalValidation = validatePriceInterval(priceId, interval as BillingInterval);
    if (!intervalValidation.isValid) {
      return new NextResponse(intervalValidation.error, { status: 400 });
    }

    // --- 2. GUARD: USAGE ENFORCEMENT (PHASE 2 - STEP 3) ---
    // Note: This prevents session creation if current usage limits are breached.
    const usageValidation = await validateUsageEnforcement(
      userId, 
      intervalValidation.planId!, 
      false // Defaults to non-autonomous intent for checkout
    );

    if (!usageValidation.allowed) {
      return new NextResponse(`Limit Exceeded: ${usageValidation.reason}`, { status: 403 });
    }

    // --- 3. SESSION CREATION ---
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      billing_address_collection: "auto",
      customer_email: session_auth.user.email!,
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
        userId: userId, // CRITICAL: Used by Step 4 Webhook for sync
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Checkout Error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}