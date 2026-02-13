import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { db } from "@/lib/db";
import { mapPriceIdToPlan } from "@/lib/billing/plan-utils";

export const dynamic = "force-dynamic";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-12-15.clover" as any,
});

export async function POST(req: Request) {
  const body = await req.text();
  const headersList = await headers();
  const signature = headersList.get("stripe-signature");

  if (!signature) {
    return new NextResponse("Missing Stripe signature", { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.error(`❌ Webhook Error: ${err.message}`);
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  // 🧠 Deduplication: Prevent processing the same event twice
  try {
    const alreadyProcessed = await db.processedStripeEvent.findUnique({
      where: { eventId: event.id },
    });
    if (alreadyProcessed) return NextResponse.json({ received: true });
  } catch (e) {
    // If table doesn't exist yet, continue anyway
  }

  const session = event.data.object as any;

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        if (!session.metadata?.userId) break;
        
        const subscription = await stripe.subscriptions.retrieve(session.subscription);
        const planTier = mapPriceIdToPlan(subscription.items.data[0].price.id);

        await db.user.update({
          where: { id: session.metadata.userId },
          data: {
            stripeCustomerId: session.customer,
            stripeSubscriptionId: subscription.id,
            planTier: planTier,
          },
        });
        break;
      }

      case "customer.subscription.updated": {
        const planTier = mapPriceIdToPlan(session.items.data[0].price.id);
        await db.user.update({
          where: { stripeCustomerId: session.customer },
          data: { planTier: planTier },
        });
        break;
      }

      case "customer.subscription.deleted": {
        await db.user.update({
          where: { stripeCustomerId: session.customer },
          data: {
            planTier: "FREE",
            stripeSubscriptionId: null,
          },
        });
        break;
      }
    }

    // ✅ Log success
    await db.processedStripeEvent.create({ data: { eventId: event.id } }).catch(() => {});
    
    return NextResponse.json({ received: true });
  } catch (err: any) {
    console.error("❌ DB Update Failed:", err.message);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}