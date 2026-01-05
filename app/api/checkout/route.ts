import { NextResponse } from "next/server";
import { AVAILABLE_PLANS } from "@/lib/billing/plans";

// 💳 STRIPE CHECKOUT BRIDGE — PHASE 2
export async function POST(req: Request) {
  try {
    const { planId, interval } = await req.json();
    
    // Validate that the requested plan exists in your contract
    const plan = AVAILABLE_PLANS.find((p) => p.id === planId);
    if (!plan) {
      return NextResponse.json({ error: "invalid plan" }, { status: 400 });
    }

    // Determine the correct Stripe Price ID based on the user's toggle selection
    const priceId = interval === "yearly" 
      ? `price_${plan.id}_yearly` 
      : `price_${plan.id}_monthly`;

    // 🧪 MOCK REDIRECT FOR PHASE 2 TESTING
    // In Phase 3, this will call the 'stripe' package to create a real session
    const mockCheckoutUrl = `/dashboard/billing/success?plan=${planId}&interval=${interval}`;

    return NextResponse.json({ 
      url: mockCheckoutUrl,
      metadata: { planId, interval, priceId }
    });
  } catch (err) {
    console.error("Checkout Error:", err);
    return NextResponse.json({ error: "internal server error" }, { status: 500 });
  }
}