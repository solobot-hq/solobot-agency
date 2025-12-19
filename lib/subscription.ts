import { currentUser } from "@clerk/nextjs/server";
import { stripe } from "@/lib/stripe";

export async function getUserSubscriptionStatus(userId: string) {
  const user = await currentUser();
  if (!user) return { isPremium: false };

  const email = user.emailAddresses[0]?.emailAddress?.toLowerCase() || "";

  if (email === "solobotagency@gmail.com") {
    return { isPremium: true, plan: "ADMIN" };
  }

  const customers = await stripe.customers.list({ email, limit: 1 });
  if (!customers.data.length) return { isPremium: false };

  const subs = await stripe.subscriptions.list({
    customer: customers.data[0].id,
    status: "active",
    limit: 1,
  });

  return { isPremium: subs.data.length > 0 };
}
