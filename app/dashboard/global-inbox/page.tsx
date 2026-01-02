"use client";

import { useUser } from "@clerk/nextjs";
import { Lock, Crown } from "lucide-react";
import Link from "next/link";

export default function GlobalInboxPage() {
  const { user } = useUser();
  // Assume metadata contains the current tier from Stripe/Prisma
  const userTier = user?.publicMetadata?.tier || "STARTER";

  // ✅ HARD LOCK: Only Pro and Pro Max can access
  const hasAccess = userTier === "PRO" || userTier === "PRO_MAX";

  if (!hasAccess) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] space-y-6 text-center">
        <div className="p-6 bg-zinc-900/50 rounded-[2.5rem] border border-zinc-800 shadow-2xl relative">
          <Lock className="w-16 h-16 text-zinc-700 mx-auto" />
          <Crown className="w-8 h-8 text-indigo-500 absolute top-4 right-4 animate-pulse" />
        </div>
        <div className="max-w-md space-y-2">
          <h2 className="text-3xl font-black text-white">Global Inbox is Locked</h2>
          <p className="text-zinc-500 font-medium">
            This agent requires <strong>Semi-Autonomous</strong> clearance. Upgrade to Pro Agency to consolidate all bot communications.
          </p>
        </div>
        <Link 
          href="/dashboard/billing"
          className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-4 rounded-2xl font-black text-sm transition-all shadow-lg shadow-indigo-600/20"
        >
          UPGRADE TO PRO AGENCY (£99)
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* Actual Inbox Logic for Pro/Pro Max Users */}
      <h1 className="text-4xl font-black text-white">Global Inbox</h1>
      {/* ... Inbox Content ... */}
    </div>
  );
}