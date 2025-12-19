import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { stripe } from "@/lib/stripe";

export async function GET() {
  try {
    const user = await currentUser();

    if (!user) {
      return NextResponse.json({
        error: "No user logged in",
      });
    }

    const email = user.emailAddresses[0].emailAddress;

    // Find Stripe customer
    const customers = await stripe.customers.list({
      email,
      limit: 1,
    });

    const customer = customers.data[0];

    let subscriptions: any[] = [];

    if (customer) {
      const subs = await stripe.subscriptions.list({
        customer: customer.id,
        status: "all",
        limit: 5,
      });
      subscriptions = subs.data;
    }

    return NextResponse.json({
      clerkEmail: email,
      stripeCustomerFound: !!customer,
      stripeCustomerId: customer?.id || null,
      stripeSubscriptions: subscriptions.map((s) => ({
        id: s.id,
        status: s.status,
        price: s.items.data[0]?.price?.id,
        nickname: s.items.data[0]?.price?.nickname,
        currency: s.items.data[0]?.price?.currency,
      })),
    });
  } catch (err: any) {
    return NextResponse.json({
      error: err.message,
    });
  }
}
