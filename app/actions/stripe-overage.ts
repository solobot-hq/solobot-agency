"use server";

import { stripe } from "@/lib/stripe";
import { auth } from "@clerk/nextjs/server";

export async function createOverageCheckout() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "gbp", //
          product_data: {
            name: "100 AI Overage Runs",
            description: "Emergency capacity for SoloBotAgency",
          },
          unit_amount: 1500, // £15.00
        },
        quantity: 1,
      },
    ],
    mode: "payment", // One-time payment, not a subscription renewal
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?overage=success`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?overage=cancelled`,
    metadata: { userId, type: "overage_topup", count: 100 }
  });

  return { url: session.url };
}