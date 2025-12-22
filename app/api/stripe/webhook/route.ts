import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import prisma from "@/lib/prisma";
import Stripe from "stripe";

export async function POST(req: Request) {
  const body = await req.text();

  // ✅ FIX: Await headers() for Next.js 16 compatibility
  const headerPayload = await headers();
  const signature = headerPayload.get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error: any) {
    console.error("[WEBHOOK_ERROR]", error.message);
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  try {
    // 1. New Subscription Created
    if (event.type === "checkout.session.completed") {
      const subscriptionId = session.subscription as string;
      const userId = session.metadata?.userId;
      const planKey = session.metadata?.planKey; // "PRO" or "PRO_MAX"

      if (userId && planKey) {
        // Create subscription record
        await prisma.subscription.create({
          data: {
            userId: userId,
            stripeSubscriptionId: subscriptionId,
            stripeCustomerId: session.customer as string,
            plan: planKey,
            status: "active",
            currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // Approx
          },
        });

        // Update user plan
        await prisma.user.update({
          where: { id: userId },
          data: { plan: planKey, usageCount: 0 }, // Reset usage on upgrade
        });
      }
    }

    // 2. Subscription Updated/Deleted
    if (
      event.type === "customer.subscription.updated" ||
      event.type === "customer.subscription.deleted"
    ) {
      const sub = event.data.object as Stripe.Subscription;

      // Find user by subscription ID
      const dbSub = await prisma.subscription.findUnique({
        where: { stripeSubscriptionId: sub.id },
      });

      if (dbSub) {
        // If deleted/canceled/unpaid, downgrade to FREE
        if (sub.status === "canceled" || sub.status === "unpaid") {
          await prisma.user.update({
            where: { id: dbSub.userId },
            data: { plan: "FREE" },
          });

          await prisma.subscription.update({
            where: { id: dbSub.id },
            data: { status: sub.status },
          });
        } else {
          // Update period end
          await prisma.subscription.update({
            where: { id: dbSub.id },
            data: {
              status: sub.status,
              currentPeriodEnd: new Date(sub.current_period_end * 1000),
            },
          });
        }
      }
    }

    return new NextResponse(null, { status: 200 });

  } catch (error) {
    console.error("[WEBHOOK_HANDLER_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}