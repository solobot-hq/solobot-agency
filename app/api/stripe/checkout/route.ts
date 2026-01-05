import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe/stripe";
import { AVAILABLE_PLANS } from "@/lib/billing/plans";

export async function POST(req: Request) {
  try {
    // 1. Resolve Clerk Auth (Async Fix)
    const { userId } = await auth(); 
    const { planId, interval } = await req.json();

    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    // 2. Find Plan
    const plan = AVAILABLE_PLANS.find((p) => p.id === planId);
    if (!plan) return new NextResponse("Plan not found", { status: 404 });

    // 3. Select Stripe ID based on the Interval
    const priceId = interval === "yearly" 
      ? plan.stripePriceIdYearly 
      : plan.stripePriceIdMonthly;

    // 4. Create Stripe Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [{ price: priceId, quantity: 1 }],
      mode: "subscription",
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/billing?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/billing?canceled=true`,
      metadata: { userId, planId },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("[STRIPE_CHECKOUT_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}