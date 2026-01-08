/**
 * STRIPE WEBHOOK HANDLER (PHASE 2 - STEP 4)
 * Source of Truth: Stripe -> Database Sync
 */

import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { db } from "@/lib/db";
import { STRIPE_PRICE_IDS } from "@/config/stripe";

// ✅ BUILD-SAFE: rely on account settings instead of hardcoded apiVersion
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  const body = await req.text();

  // ✅ NEXT.JS 16 FIX: headers() is now async and must be awaited
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
  // ✅ Prisma Sync: Property exists after staging generated files
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

        // ✅ TS FIX: Cast to any to unwrap properties from Stripe.Response wrapper
        const subscription = (await stripe.subscriptions.retrieve(
          subscriptionId
        )) as any;

        const priceId = subscription.items.data[0].price.id;
        const userId = sessionOrSub.metadata?.userId;

        if (!userId) {
          throw new Error("Missing metadata.userId");
        }

        const planEntry = Object.entries(STRIPE_PRICE_IDS).find(
          ([_, prices]) =>
            prices.monthly === priceId || prices.yearly === priceId
        );

        if (!planEntry) {
          throw new Error("Unrecognized priceId");
        }

        const [planTier] = planEntry;

        // ✅ Extraction: Map Stripe Unix timestamp to Date object
        const currentPeriodEndUnix = subscription.current_period_end;

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

    // Mark event as processed in the guard table
    await db.processedStripeEvent.create({
      data: { eventId: event.id },
    });

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error("Webhook processing failed:", error.message);
    return new NextResponse("Webhook handler failed", { status: 500 });
  }
}