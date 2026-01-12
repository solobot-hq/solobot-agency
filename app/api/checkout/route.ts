import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getOpenAI } from "@/lib/openai"; 
import { getAuthUser } from "@/lib/auth"; 
import { validatePriceInterval } from "@/lib/billing/validator";
import { validateUsageEnforcement } from "@/lib/usage/enforcement";
import { BillingInterval } from "@/config/stripe";

/**
 * ✅ BUILD-SAFE CONFIGURATION
 * force-dynamic ensures this route is never pre-rendered during 'next build'
 */
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    // 1. Initial Authentication (No external API calls yet)
    const user = await getAuthUser();
    if (!user?.id) return new NextResponse("Unauthorized", { status: 401 });

    const { priceId, interval } = await req.json();

    // 2. RUNTIME INFRASTRUCTURE CHECK
    // Extracting keys here ensures they are only accessed when the function runs.
    const stripeKey = process.env.STRIPE_SECRET_KEY;
    const openaiKey = process.env.OPENAI_API_KEY;

    if (!stripeKey || !openaiKey) {
      console.error("❌ Infrastructure missing: Environment variables are not available.");
      return new NextResponse("Configuration Error", { status: 503 });
    }

    // Initialize Stripe only inside the request handler
    const stripe = new Stripe(stripeKey, {
      apiVersion: "2025-12-15.clover", // Next.js 16 / 2026 build-safe version
    });

    // ✅ Initialize OpenAI only inside the request handler
    // Ensure getOpenAI() does not have a 'new OpenAI()' call at the top of its file.
    const openai = getOpenAI();
    if (!openai) {
      console.error("❌ OpenAI failed to initialize.");
      return new NextResponse("AI Service Unavailable", { status: 503 });
    }

    // 3. RUNTIME VALIDATIONS
    const intervalValidation = validatePriceInterval(priceId, interval as BillingInterval);
    if (!intervalValidation.isValid) return new NextResponse(intervalValidation.error, { status: 400 });

    const usageValidation = await validateUsageEnforcement(user.id, intervalValidation.planId!, false);
    if (!usageValidation.allowed) return new NextResponse(`Limit Exceeded: ${usageValidation.reason}`, { status: 403 });

    // 4. CREATE STRIPE CHECKOUT SESSION
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      customer_email: user.email!, 
      line_items: [{ price: priceId, quantity: 1 }],