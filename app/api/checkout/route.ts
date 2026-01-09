/**
 * CHECKOUT SESSION CREATION (PHASE 3)
 * Full Production Version — Build-Safe, Runtime-Strict
 */

import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getAuthUser } from "@/lib/auth";
import { validatePriceInterval } from "@/lib/billing/validator";
import { validateUsageEnforcement } from "@/lib/usage/enforcement";
import { BillingInterval } from "@/config/stripe";

// 🚫 NEVER allow static pre-rendering
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    /**
     * 1. RUNTIME ENV VALIDATION
     * (Do NOT attempt to survive without real keys)
     */
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
    const appUrl = process.env.NEXT_PUBLIC_APP_URL;

    if (!stripeSecretKey || !appUrl) {
      console.error("❌ Missing required environment variables");
      return new NextResponse("Server configuration error", { status: 503 });
    }

    /**
     * 2. SAFE STRIPE INITIALIZATION
     * No apiVersion pinning, no placeholders
     */
    const stripe = new Stripe(stripeSecretKey);

    /**
     * 3. REQUEST PAYLOAD
     */
    const { priceId, interval } = await req.json();

    /**
     * 4. AUTH
     */
    const user = await getAuthUser();
    const userId = user?.id;

    if (!userId || !user?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    /**
     * 5. PLAN / INTERVAL VALIDATION
     */
    const intervalValidation = validatePriceInterval(
      priceId,
      interval as BillingInterval
    );

    if (!intervalValidation.isValid) {
      return new NextResponse(intervalValidation.error!, { status: 400 });
    }

    /**
     * 6. USAGE ENFORCEMENT
     */
    const usageValidation = await validateUsageEnforcement(
      userId,
      intervalValidation.planId!,
      false
    );

    if (!usageValidation.allowed) {
      return new NextResponse(
        `Limit exceeded: ${usageValidation.reason}`,
        { status: 403 }
      );
    }

    /**
     * 7. STRIPE CHECKOUT SESSION
     */
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      billing_address_collection: "auto",
      customer_email: user.email,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${appUrl}/dashboard/billing?success=true`,
      cancel_url: `${appUrl}/dashboard/billing?canceled=true`,
      metadata: {
        userId,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("❌ Checkout Error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
