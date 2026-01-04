"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [logoOpen, setLogoOpen] = useState(false);

  return (
    <html lang="en" className="dark">
      <body className="bg-[#0B1221] text-white">
        <header className="fixed top-0 w-full z-50 border-b border-white/10 bg-[#0B1221]/80 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex justify-between items-center h-[96px]">
              <button
                type="button"
                onClick={() => setLogoOpen(true)}
                className="flex items-center gap-4 bg-transparent border-0 p-0 cursor-pointer"
              >
                <div className="h-16 flex items-center">
                  <img
                    src="/sl.png"
                    alt="SoloBot"
                    className="h-full w-auto object-contain"
                  />
                </div>
                <span className="font-bold text-2xl uppercase leading-none">
                  SOLOBOTAGENCY
                </span>
              </button>

              <div className="flex items-center gap-6">
                <Link href="/dashboard" className="text-sm text-white/70 hover:text-white">
                  DASHBOARD
                </Link>
                <Button size="sm">GET STARTED</Button>
              </div>
            </div>
          </div>
        </header>

        {logoOpen && (
          <div
            className="fixed inset-0 z-[100] bg-black/70 flex items-center justify-center"
            onClick={() => setLogoOpen(false)}
          >
            <img src="/sl.png" className="w-[320px]" />
          </div>
        )}

        <main className="pt-[96px]">{children}</main>
      </body>
    </html>
  );
}
