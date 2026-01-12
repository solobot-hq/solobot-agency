import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getOpenAI } from "@/lib/openai"; 
import { getAuthUser } from "@/lib/auth"; 
import { validatePriceInterval } from "@/lib/billing/validator";
import { validateUsageEnforcement } from "@/lib/usage/enforcement";
import { BillingInterval } from "@/config/stripe";

// ✅ 1. Tell Next.js 16 this route is strictly dynamic to avoid build-time pre-rendering
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    // ✅ 2. AUTH GUARD: Check this first before initializing heavy SDKs
    const user = await getAuthUser();
    if (!user?.id) return new NextResponse("Unauthorized", { status: 401 });

    const { priceId, interval } = await req.json();

    // ✅ 3. INITIALIZE STRIPE: Use a runtime check for the key
    const stripeKey = process.env.STRIPE_SECRET_KEY;
    if (!stripeKey) {
       console.error("❌ STRIPE_SECRET_KEY missing at runtime!");
       return new NextResponse("Payment Configuration Error", { status: 503 });
    }

    const stripe = new Stripe(stripeKey, {
      apiVersion: "2025-12-15.clover", // Latest 2026 build-safe version
    });

    // ✅ 4. INITIALIZE OPENAI: Call this INSIDE the handler. 
    // This ensures it never runs during 'next build' where keys are absent.
    const openai = getOpenAI();
    if (!openai) {
       console.error("❌ OpenAI Configuration missing at runtime!");
       return new NextResponse("AI Service Configuration Error", { status: 503 });
    }

    // 5. VALIDATIONS
    const intervalValidation = validatePriceInterval(priceId, interval as BillingInterval);
    if (!intervalValidation.isValid) return new NextResponse(intervalValidation.error, { status: 400 });

    const usageValidation = await validateUsageEnforcement(user.id, intervalValidation.planId!, false);
    if (!usageValidation.allowed) return new NextResponse(`Limit Exceeded: ${usageValidation.reason}`, { status: 403 });

    // 6. CREATE SESSION
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