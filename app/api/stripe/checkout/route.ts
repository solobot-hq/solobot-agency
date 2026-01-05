import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe/stripe";
import { AVAILABLE_PLANS } from "@/lib/billing/plans";
import db from "@/lib/db"; 

export async function POST(req: Request) {
  try {
    // FIX: Await auth() to extract the userId
    const { userId } = await auth(); 
    const { planId, interval } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const plan = AVAILABLE_PLANS.find((p) => p.id === planId);
    if (!plan) {
      return new NextResponse("Plan not found", { status: 404 });
    }

    const priceId = interval === "yearly" 
      ? plan.stripePriceIdYearly 
      : plan.stripePriceIdMonthly;

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