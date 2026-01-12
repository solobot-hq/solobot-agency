/**
 * STRIPE WEBHOOK HANDLER (PHASE 2 - STEP 4)
 * Updated for Next.js 16 + Prisma 7 + Stripe Clover (2025-12-15)
 */

import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { db } from "@/lib/db";
import { STRIPE_PRICE_IDS } from "@/config/stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-12-15.clover",
});
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  const body = await req.text();
  const headersList = await headers();
  const signature = headersList.get("stripe-signature");

  if (!signature) {
    return new NextResponse("Missing Stripe signature", { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err: any) {
    console.error(`Webhook Signature Error: ${err.message}`);
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  const existingEvent = await db.processedStripeEvent.findUnique({
    where: { eventId: event.id },
  });

  if (existingEvent) {
    return NextResponse.json({ received: true });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed":
      case "customer.subscription.created":
      case "customer.subscription.updated":
      case "customer.subscription.deleted": {
        const sessionOrSub = event.data.object as any;
        const subscriptionId = sessionOrSub.subscription ?? sessionOrSub.id;

        // 1. Retrieve the subscription with items
        const subscription = await stripe.subscriptions.retrieve(subscriptionId);

        const userId = sessionOrSub.metadata?.userId || subscription.metadata?.userId;
        if (!userId) {
          throw new Error("Missing metadata.userId");
        }

        // 2. Identify the plan
        const priceId = subscription.items.data[0].price.id;
        const planEntry = Object.entries(STRIPE_PRICE_IDS).find(
          ([_, prices]) => prices.monthly === priceId || prices.yearly === priceId
        );

        if (!planEntry) {
          throw new Error("Unrecognized priceId");
        }

        const [planTier] = planEntry;

        /**
         * ✅ STRIPE CLOVER FIX: 
         * Access 'current_period_end' from the first item.
         */
        const periodEndUnix = subscription.items.data[0].current_period_end;

        // 3. Atomic Database Sync
        await db.subscription.upsert({
          where: { userId },
          create: {
            userId,
            stripeSubscriptionId: subscription.id,
            plan: planTier,
            status: subscription.status,
            currentPeriodEnd: new Date(periodEndUnix * 1000),
          },
          update: {
            stripeSubscriptionId: subscription.id,
            plan: planTier,
            status: subscription.status,
            currentPeriodEnd: new Date(periodEndUnix * 1000),
          },
        });

        break;
      }
    }

    // Mark event as processed
    await db.processedStripeEvent.create({
      data: { eventId: event.id },
    });

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error("Webhook processing failed:", error.message);
    return new NextResponse("Webhook handler failed", { status: 500 });
  }
}