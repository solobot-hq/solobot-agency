"use client";

import React from "react";
import { UserProfile } from "@clerk/nextjs";

export default function SettingsPage() {
  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      {/* Workspace Standard Header */}
      <div>
        <h1 className="text-3xl font-semibold text-white">Settings</h1>
        <p className="text-sm text-zinc-500 mt-2">Manage your account and security.</p>
      </div>

      {/* Standardized Clerk Containment */}
      <div className="bg-[#0D1525] rounded-xl border border-white/[0.05] p-6">
        <UserProfile
          routing="hash"
          appearance={{
            variables: {
              colorBackground: "#0D1525",
              colorText: "#e5e7eb",
              colorInputBackground: "#0D1525",
              colorInputText: "#e5e7eb",
              colorNeutral: "#9ca3af",
            },
            elements: {
              card: "bg-[#0D1525] border border-white/[0.05] shadow-none",
              navbar: "bg-[#0D1525]",
              pageScrollBox: "bg-[#0D1525]",
            },
          }}
        />
      </div>
    </div>
  );
}