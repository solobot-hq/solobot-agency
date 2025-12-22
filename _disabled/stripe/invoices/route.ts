import { NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { stripe } from "@/lib/stripe";

// Force dynamic ensures this always fetches fresh data
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    // ✅ FIX: Added 'await' before auth()
    const { userId } = await auth();
    const user = await currentUser();

    if (!userId || !user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const email = user.emailAddresses[0].emailAddress;
    const customers = await stripe.customers.list({ email, limit: 1 });

    if (customers.data.length === 0) {
      return NextResponse.json([]);
    }

    const invoices = await stripe.invoices.list({
      customer: customers.data[0].id,
      limit: 10,
      status: 'paid'
    });

    // Map to simple format
    const formattedInvoices = invoices.data.map(inv => ({
      id: inv.number || inv.id,
      date: new Date(inv.created * 1000).toLocaleDateString(),
      amount: `$${(inv.amount_paid / 100).toFixed(2)}`,
      status: inv.status,
      pdfUrl: inv.invoice_pdf || inv.hosted_invoice_url
    }));

    return NextResponse.json(formattedInvoices);
  } catch (error) {
    console.error("[STRIPE_INVOICES_ERROR]", error);
    return NextResponse.json([]); // Return empty list on error
  }
}