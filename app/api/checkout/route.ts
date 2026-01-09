/**
 * CHECKOUT SESSION CREATION (PHASE 3)
 * Full Production Version: Build-Safe Initialization
 */

import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getOpenAI } from "@/lib/openai"; 
import { getAuthUser } from "@/lib/auth"; 
import { validatePriceInterval } from "@/lib/billing/validator";
import { validateUsageEnforcement } from "@/lib/usage/enforcement";
import { BillingInterval } from "@/config/stripe";

// ✅ 1. FORCE DYNAMIC: Essential to prevent build-time pre-rendering crashes
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    // ✅ 2. RUNTIME KEY VALIDATION
    // This ensures we have REAL keys before proceeding with a real transaction.
    if (!process.env.STRIPE_SECRET_KEY || !process.env.OPENAI_API_KEY) {
      console.error("❌ CRITICAL: Environment variables missing at runtime!");
      return new NextResponse("Service configuration error", { status: 500 });
    }

    // ✅ 3. BUILD-SAFE STRIPE INIT
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2024-12-18.acacia",
      typescript: true,
    });

    // ✅ 4. BUILD-SAFE OPENAI INIT
    const openai = getOpenAI();

    const { priceId, interval } = await req.json();
    
    // 5. Auth: Using the approved getAuthUser helper
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