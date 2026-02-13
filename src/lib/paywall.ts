/**
 * 📄 Location: src/lib/paywall.ts
 * 🛡️ THE GATEKEEPER: Directs non-paying users to Stripe.
 */

// Pulls from your .env.local for easier management across environments
export const STRIPE_PAYMENT_LINK = process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK || "https://buy.stripe.com/your_actual_link_here";

/**
 * handleProAction
 * * @param userTier - The tier string from your database (e.g., 'STARTER', 'PRO')
 * @param onValid - Callback function to execute if the user is PRO
 * @param onRedirect - Callback function to trigger UI states (like a spinner) before redirect
 */
export function handleProAction(
  userTier: string | null | undefined, 
  onValid: () => void, 
  onRedirect: () => void
) {
  // Check if user has the PRO tier
  if (userTier === "PRO") {
    // ✅ User is authorized: Run the intended action (e.g., Save Persona)
    onValid();
  } else {
    // ❌ User is not PRO: Initiate the Steel Thread redirect
    
    // 1. Trigger any "Redirecting..." UI components in the caller
    onRedirect();

    // 2. Give the user a brief moment (1.5s) to see the status change 
    // and then ship them to the Stripe checkout page.
    setTimeout(() => {
      if (STRIPE_PAYMENT_LINK.includes("your_actual_link_here")) {
        console.error("CRITICAL: STRIPE_PAYMENT_LINK is not configured in .env.local");
        alert("Payment system is currently being configured. Please check back in a few minutes.");
      } else {
        window.location.href = STRIPE_PAYMENT_LINK;
      }
    }, 1500);
  }
}