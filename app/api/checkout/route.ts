/**
 * CHECKOUT SESSION CREATION (PHASE 3)
 * Full Build-Safe Production Version
 */
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getOpenAI } from "@/lib/openai"; 
import { getAuthUser } from "@/lib/auth"; 
import { validatePriceInterval } from "@/lib/billing/validator";
import { validateUsageEnforcement } from "@/lib/usage/enforcement";
import { BillingInterval } from "@/config/stripe";

// ✅ 1. PREVENT STATIC ANALYSIS CRASHES
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    // 2. INITIALIZE CLIENTS
    // Stripe constructor is generally build-safe, but we guard it anyway
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_placeholder", {
      apiVersion: "2024-12-18.acacia",
    });
    
    // Lazy-load OpenAI
    const openai = getOpenAI();

    // 3. RUNTIME CHECK: If keys are missing during a live request, fail gracefully
    if (!process.env.STRIPE_SECRET_KEY || !openai) {
      console.error("❌ API Keys missing at runtime");
      return new NextResponse("Service Configuration Error", { status: 500 });
    }

    const { priceId, interval } = await req.json();
    const user = await getAuthUser();
    if (!user?.id) return new NextResponse("Unauthorized", { status: 401 });

    // 4. VALIDATIONS
    const intervalValidation = validatePriceInterval(priceId, interval as BillingInterval);
    if (!intervalValidation.isValid) return new NextResponse(intervalValidation.error, { status: 400 });

    const usageValidation = await validateUsageEnforcement(user.id, intervalValidation.planId!, false);
    if (!usageValidation.allowed) return new NextResponse(`Limit Exceeded: ${usageValidation.reason}`, { status: 403 });

    // 5. STRIPE SESSION
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      customer_email: user.email!, 
      line_items: [{ price: priceId, quantity: 1 }],
      mode: "subscription",
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/billing?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/billing?canceled=true`,
      metadata: { userId: user.id },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Checkout Error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}