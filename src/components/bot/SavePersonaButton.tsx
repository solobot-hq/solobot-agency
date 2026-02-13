"use client";

import React, { useState } from "react";
import { requireProOrRedirect } from "@/lib/paywall";
import { toast } from "sonner";

export default function SavePersonaButton({
  tier,
  onSave,
}: {
  tier: string;
  onSave: () => Promise<any>;
}) {
  const [pending, setPending] = useState(false);

  const handleClick = async () => {
    // 🛡️ THE GATE: If not PRO, they are kicked to Stripe here
    if (!requireProOrRedirect(tier)) return;

    // ✅ THE ACTION: Only runs if they are PRO
    setPending(true);
    try {
      const result = await onSave();
      if (result.success) {
        toast.success("Changes committed to database.");
      } else {
        toast.error(result.error || "Save failed.");
      }
    } finally {
      setPending(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={pending}
      className="w-full rounded-lg bg-indigo-600 px-6 py-3 font-black text-white hover:bg-indigo-500 disabled:opacity-50 transition-all"
    >
      {pending ? "COMMITTING..." : "COMMIT CHANGES (PRO)"}
    </button>
  );
}