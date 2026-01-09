/**
 * CHECKOUT SESSION CREATION (PHASE 3)
 * Full Build-Safe Version: Lazy OpenAI Implementation
 */
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getOpenAI } from "@/lib/openai"; 
import { getAuthUser } from "@/lib/auth"; 
import { validatePriceInterval } from "@/lib/billing/validator";
import { validateUsageEnforcement } from "@/lib/usage/enforcement";
import { BillingInterval } from "@/config/stripe";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    // 1. Auth & Usage (Check these BEFORE touching OpenAI)
    const user = await getAuthUser();
    if (!user?.id) return new NextResponse("Unauthorized", { status: 401 });

    const { priceId, interval } = await req.json();

    const intervalValidation = validatePriceInterval(priceId, interval as BillingInterval);
    if (!intervalValidation.isValid) return new NextResponse(intervalValidation.error, { status: 400 });

    const usageValidation = await validateUsageEnforcement(user.id, intervalValidation.planId!, false);
    if (!usageValidation.allowed) return new NextResponse(`Limit Exceeded: ${usageValidation.reason}`, { status: 403 });

    // 2. Lazy Load OpenAI only when needed
    const openai = getOpenAI();

    // 3. Stripe Logic
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: "2024-12-18.acacia",
    });

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