/**
 * STRIPE WEBHOOK HANDLER (PHASE 2 - STEP 4)
 * Source of Truth: Stripe -> Database Sync
 */

import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { db } from "@/lib/db";
import { STRIPE_PRICE_IDS } from "@/config/stripe";

// BUILD-SAFE: no apiVersion
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  const body = await req.text();

  // Next.js 15+/16: headers() is async
  const headersList = await headers();
  const signature = headersList.get("stripe-signature");

  if (!signature) {
    return new NextResponse("Missing Stripe signature", { status: 400 });
  }

  let event: Stripe.Event;

  // 1. VERIFY SIGNATURE
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err: any) {
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  // 2. IDEMPOTENCY GUARD
  const existingEvent = await db.processedStripeEvent.findUnique({
    where: { eventId: event.id },
  });

  if (existingEvent) {
    return NextResponse.json({ received: true });
  }

  // 3. HANDLE EVENTS
  try {
    switch (event.type) {
      case "checkout.session.completed":
      case "customer.subscription.created":
      case "customer.subscription.updated":
      case "customer.subscription.deleted": {
        const sessionOrSub = event.data.object as any;
        const subscriptionId =
          sessionOrSub.subscription ?? sessionOrSub.id;

        // IMPORTANT: unwrap Stripe response for TS
        const subscription = (await stripe.subscriptions.retrieve(
          subscriptionId
        )) as Stripe.Subscription;

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

        // WRITE TO EXISTING Subscription MODEL
        await db.subscription.upsert({
          where: { userId },
          create: {
            userId,
            stripeSubscriptionId: subscription.id,
            plan: planTier,
            status: subscription.status,
            currentPeriodEnd: new Date(
              subscription.currentPeriodEnd * 1000
            ),
          },
          update: {
            plan: planTier,
            status: subscription.status,
            currentPeriodEnd: new Date(
              subscription.currentPeriodEnd * 1000
            ),
          },
        });

        break;
      }
    }

    // 4. MARK EVENT AS PROCESSED
    await db.processedStripeEvent.create({
      data: { eventId: event.id },
    });

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook processing failed:", error);
    return new NextResponse("Webhook handler failed", { status: 500 });
  }
}
