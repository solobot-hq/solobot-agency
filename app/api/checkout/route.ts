import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getOpenAI } from "@/lib/openai"; 
import { getAuthUser } from "@/lib/auth"; 
import { validatePriceInterval } from "@/lib/billing/validator";
import { validateUsageEnforcement } from "@/lib/usage/enforcement";
import { BillingInterval } from "@/config/stripe";

/**
 * ✅ BUILD-SAFE CONFIGURATION
 * force-dynamic ensures this route is never pre-rendered during 'next build'
 */
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    // 1. Initial Authentication (No API keys needed yet)
    const user = await getAuthUser();
    if (!user?.id) return new NextResponse("Unauthorized", { status: 401 });

    const { priceId, interval } = await req.json();

    // 2. LAZY CLIENT INITIALIZATION
    // We check for environment variables inside the handler to prevent build-time crashes
    const stripeKey = process.env.STRIPE_SECRET_KEY;
    const openaiKey = process.env.OPENAI_API_KEY;

    if (!stripeKey || !openaiKey) {
      console.error("❌ Infrastructure missing: Check your environment variables.");
      return new NextResponse("Configuration Error", { status: 503 });
    }

    // Initialize Stripe only when the request hits
    const stripe = new Stripe(stripeKey, {
      apiVersion: "2025-12-15.clover", // Updated build-safe version
    });

    // Initialize OpenAI via the lazy-loading helper
    const openai = getOpenAI();
    if (!openai) {
      return new NextResponse("AI Service Unavailable", { status: 503 });
    }

    // 3. RUNTIME VALIDATIONS
    const intervalValidation = validatePriceInterval(priceId, interval as BillingInterval);
    if (!intervalValidation.isValid) return new NextResponse(intervalValidation.error, { status: 400 });

    const usageValidation = await validateUsageEnforcement(user.id, intervalValidation.planId!, false);
    if (!usageValidation.allowed) return new NextResponse(`Limit Exceeded: ${usageValidation.reason}`, { status: 403 });

    // 4. CREATE STRIPE CHECKOUT SESSION
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
  } catch (error: any) {
    console.error("Checkout Error:", error.message || error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}