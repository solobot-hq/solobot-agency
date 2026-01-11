import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getOpenAI } from "@/lib/openai"; 
import { getAuthUser } from "@/lib/auth"; 
import { validatePriceInterval } from "@/lib/billing/validator";
import { validateUsageEnforcement } from "@/lib/usage/enforcement";
import { BillingInterval } from "@/config/stripe";

// ✅ CRITICAL: Force dynamic to kill pre-rendering
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    // 1. Check Auth & Input first (Building-safe)
    const user = await getAuthUser();
    if (!user?.id) return new NextResponse("Unauthorized", { status: 401 });

    const { priceId, interval } = await req.json();

    // 2. Initialize Clients
    // Updated to current 2026 Clover version to satisfy TypeScript
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_placeholder", {
      apiVersion: "2025-12-15.clover",
    });

    // 3. LAZY OPENAI: getOpenAI() handles null/missing keys gracefully
    const openai = getOpenAI();

    // 4. RUNTIME GUARD: If we are live and keys are missing, fail here.
    if (!process.env.STRIPE_SECRET_KEY || !openai) {
       console.error("❌ Infrastructure missing at runtime!");
       return new NextResponse("Service Configuration Error", { status: 503 });
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