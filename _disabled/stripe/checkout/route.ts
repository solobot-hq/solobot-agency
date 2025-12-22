import { NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { stripe } from "@/lib/stripe";
import { PLANS } from "@/lib/plans";

export async function POST(req: Request) {
  try {
    // ✅ FIX 1: Use standard async auth for Next.js 16 stability
    const { userId } = await auth();
    const user = await currentUser();

    if (!userId || !user) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { plan } = body; 

    // ✅ FIX 2: Cast to 'any' to bypass the "Property priceId does not exist" error
    const selectedPlan = PLANS[plan as keyof typeof PLANS] as any;

    if (!selectedPlan || !selectedPlan.priceId) {
      return new NextResponse("Invalid plan", { status: 400 });
    }
    
    // Safe email extraction
    const email = user.emailAddresses[0]?.emailAddress;

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: selectedPlan.priceId,
          quantity: 1,
        },
      ],
      customer_email: email,
      metadata: {
        userId: userId,
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