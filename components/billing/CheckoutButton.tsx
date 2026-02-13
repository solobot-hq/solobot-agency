"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";

interface CheckoutButtonProps {
  priceId: string;
  interval: "monthly" | "yearly";
}

export function CheckoutButton({ priceId, interval }: CheckoutButtonProps) {
  const [isRedirecting, setIsRedirecting] = useState(false);

  const handleCheckout = async () => {
    try {
      setIsRedirecting(true);

      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId, interval }),
      });

      const data = await response.json();

      if (data.url) {
        // 🚀 Redirect user to Stripe Checkout
        window.location.href = data.url;
      } else {
        throw new Error("No checkout URL returned");
      }
    } catch (error) {
      console.error("Checkout Error:", error);
      alert("Failed to start checkout. Check console for details.");
    } finally {
      setIsRedirecting(false);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      disabled={isRedirecting}
      className="bg-white text-black h-11 px-8 rounded-xl text-sm font-bold hover:bg-zinc-200 transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
    >
      {isRedirecting ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          Processing...
        </>
      ) : (
        "SELECT PLAN"
      )}
    </button>
  );
}