import React from "react";
import DashboardSidebar from "@/components/dashboard-sidebar";
import { UsageProvider } from "@/app/context/usage-context"; // ✅ Import the provider

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // ✅ Wrap everything in UsageProvider so children can access live stats
    <UsageProvider>
      <div className="flex h-screen w-full bg-zinc-950 text-zinc-100 antialiased overflow-hidden font-sans">
        {/* Sidebar remains vertically aligned and fixed */}
        <DashboardSidebar />

        <div className="flex flex-1 flex-col min-w-0 relative h-full">
          {/* pt-24 provides clear gap below the new h-20 global header */}
          <main className="flex-1 overflow-y-auto bg-zinc-950 pt-24 px-8 pb-10">
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </main>
        </div>
      </div>
    </UsageProvider>
  );
}