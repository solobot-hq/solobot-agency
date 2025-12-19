import { NextResponse } from "next/server";
import { getDbUser } from "@/lib/auth";
import { stripe } from "@/lib/stripe";
import { PLANS } from "@/lib/plans";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const user = await getDbUser();
    if (!user) return new NextResponse("Unauthorized", { status: 401 });

    const body = await req.json();
    const { plan } = body; // "PRO" or "PRO_MAX"

    const selectedPlan = PLANS[plan as keyof typeof PLANS];

    if (!selectedPlan || !selectedPlan.priceId) {
      return new NextResponse("Invalid plan", { status: 400 });
    }

    // Get user's stripe customer ID if it exists, typically from Subscription table or User table
    // For this simple schema, we look for an active subscription or just create a new customer
    // A robust system would save stripeCustomerId on the User model directly.
    // Here we create a fresh customer or use email to lookup in Stripe (simplified).
    
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: selectedPlan.priceId,
          quantity: 1,
        },
      ],
      customer_email: user.email,
      metadata: {
        userId: user.id,
        planKey: plan,
      },
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/billing?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/billing?canceled=true`,
    });

    return NextResponse.json({ url: session.url });

  } catch (error) {
    console.error("Stripe Checkout Error:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}