import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe/stripe"; 
import db from "@/lib/db"; 

export async function POST(req: Request) {
  const body = await req.text();
  const signature = (await headers()).get("Stripe-Signature") as string;

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error: any) {
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
  }

  const session = event.data.object as any;

  // 💳 Handle Successful Subscription
  if (event.type === "checkout.session.completed") {
    // FIX: Retrieve subscription and cast to 'any' to bypass 'Response<Subscription>' build error
    const subscriptionResponse = await stripe.subscriptions.retrieve(session.subscription);
    const subscription = subscriptionResponse as any;

    if (!session?.metadata?.userId) {
      return new NextResponse("User id is required", { status: 400 });
    }

    // UPDATED: Syncing with your 'Subscription' model and field names
    await db.subscription.upsert({
      where: { userId: session.metadata.userId },
      create: {
        userId: session.metadata.userId,
        stripeSubscriptionId: subscription.id,
        stripeCustomerId: subscription.customer as string,
        stripePriceId: subscription.items.data[0].price.id,
        status: subscription.status,
        currentPeriodEnd: new Date(subscription.current_period_end * 1000),
      },
      update: {
        stripeSubscriptionId: subscription.id,
        stripePriceId: subscription.items.data[0].price.id,
        status: subscription.status,
        currentPeriodEnd: new Date(subscription.current_period_end * 1000),
      }
    });
  }

  // 🔄 Handle Successful Payments (Renewals)
  if (event.type === "invoice.payment_succeeded") {
    const subscriptionResponse = await stripe.subscriptions.retrieve(session.subscription);
    const subscription = subscriptionResponse as any;

    await db.subscription.update({
      where: { stripeSubscriptionId: subscription.id },
      data: {
        stripePriceId: subscription.items.data[0].price.id,
        currentPeriodEnd: new Date(subscription.current_period_end * 1000),
      },
    });
  }

  return new NextResponse(null, { status: 200 });
}