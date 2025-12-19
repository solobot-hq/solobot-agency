import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function POST(req: Request) {
  // 🔥 1. DEBUG LOG: Check if server is hit
  console.log("----------------------------------");
  console.log("✅ API ROUTE HIT: /api/checkout");
  console.log("----------------------------------");

  try {
    const body = await req.json();
    const { priceId } = body;

    // 🔥 2. DEBUG LOG: Check Price ID
    console.log("👉 Price ID Received:", priceId);
    console.log("👉 Environment Default:", process.env.STRIPE_PRICE_ID_MONTHLY);

    const targetPriceId = priceId || process.env.STRIPE_PRICE_ID_MONTHLY;

    if (!targetPriceId) {
      console.error("❌ Error: Missing Price ID");
      return NextResponse.json({ error: "Missing Price ID" }, { status: 400 });
    }

    // 3. Create Session
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [{ price: targetPriceId, quantity: 1 }],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?canceled=true`,
    });

    // 🔥 4. DEBUG LOG: Check Session URL
    console.log("✅ Session Created:", session.url);

    return NextResponse.json({ url: session.url });

  } catch (error: any) {
    console.error("❌ STRIPE ERROR:", error);
    return NextResponse.json(
      { error: error.message || "Internal Error" },
      { status: 500 }
    );
  }
}