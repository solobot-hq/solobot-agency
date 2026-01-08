/**
 * STRIPE WEBHOOK HANDLER (PHASE 2 - STEP 4)
 * Authoritative Sync: Stripe -> Database
 */

import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { db } from "@/lib/db";
import { STRIPE_PRICE_IDS } from "@/config/stripe";

// Initialize Stripe - version is handled by account settings for build safety
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  const body = await req.text();

  // ✅ NEXT.JS 15+/16 FIX: headers() must be awaited
  const headersList = await headers();
  const signature = headersList.get("stripe-signature");

  if (!signature) {
    return new NextResponse("Missing Stripe signature", { status: 400 });
  }

  let event: Stripe.Event;

  // --- 1. SIGNATURE VERIFICATION ---
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err: any) {
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  // --- 2. IDEMPOTENCY GUARD ---
  const existingEvent = await db.processedStripeEvent.findUnique({
    where: { eventId: event.id },
  });

  if (existingEvent) {
    return NextResponse.json({ received: true });
  }

  // --- 3. EVENT FILTERING & STATE SYNC ---
  try {
    switch (event.type) {
      case "checkout.session.completed":
      case "customer.subscription.created":
      case "customer.subscription.updated":
      case "customer.subscription.deleted": {
        const sessionOrSub = event.data.object as any;
        const subscriptionId = sessionOrSub.subscription ?? sessionOrSub.id;

        // Retrieve full subscription object
        const subscription = await stripe.subscriptions.retrieve(subscriptionId);

        const priceId = (subscription as any).items.data[0].price.id;
        const userId = sessionOrSub.metadata?.userId;

        if (!userId) {
          throw new Error("Missing metadata.userId");
        }

        // Map Price ID to Plan Tier
        const planEntry = Object.entries(STRIPE_PRICE_IDS).find(
          ([_, prices]) =>
            prices.monthly === priceId || prices.yearly === priceId
        );

        if (!planEntry) {
          throw new Error("Unrecognized priceId");
        }

        const [planTier] = planEntry;

        // Extract Unix timestamp (casted to any to bypass strict SDK typing issues)
        const currentPeriodEndUnix = (subscription as any).current_period_end;

        // --- 4. ATOMIC DATABASE UPDATE ---
        await db.subscription.upsert({
          where: { userId },
          create: {
            userId,
            stripeSubscriptionId: subscription.id,
            plan: planTier,
            status: subscription.status,
            currentPeriodEnd: new Date(currentPeriodEndUnix * 1000),
          },
          update: {
            plan: planTier,
            status: subscription.status,
            currentPeriodEnd: new Date(currentPeriodEndUnix * 1000),
          },
        });

        break;
      }
    }

    // Mark event as processed to prevent duplicate logic
    await db.processedStripeEvent.create({
      data: { eventId: event.id },
    });

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error("Webhook processing failed:", error.message);
    return new NextResponse("Webhook handler failed", { status: 500 });
  }
}