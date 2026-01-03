"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const [logoOpen, setLogoOpen] = useState(false);

  return (
    <html lang="en" className="dark">
      <body className="bg-[#0B1221] text-white">
        {/* GLOBAL HEADER — SINGLE SOURCE OF TRUTH */}
        <header className="fixed top-0 w-full z-50 border-b border-white/10 bg-[#0B1221]/80 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex justify-between items-center h-[96px]">
              {/* LOGO AREA */}
              <button
                type="button"
                aria-label="View logo"
                onClick={() => setLogoOpen(true)}
                className="flex items-center gap-4 bg-transparent border-0 p-0 cursor-pointer focus:outline-none"
              >
                <div className="h-16 flex items-center">
                  <img
                    src="/sl.png"
                    alt="SoloBot"
                    className="h-full w-auto object-contain"
                  />
                </div>
                <span className="font-bold text-2xl tracking-tight uppercase leading-none">
                  SOLOBOTAGENCY
                </span>
              </button>

              {/* NAV + CTA */}
              <div className="flex items-center gap-6">
                <nav className="hidden md:flex space-x-8">
                  <Link
                    href="#features"
                    className="text-sm font-medium text-white/70 hover:text-white"
                  >
                    Features
                  </Link>
                  <Link
                    href="#pricing"
                    className="text-sm font-medium text-white/70 hover:text-white"
                  >
                    Pricing
                  </Link>
                </nav>

                <Link
                  href="/login"
                  className="text-sm font-medium text-white/70 hover:text-white"
                >
                  LOGIN
                </Link>

                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                  GET STARTED
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* LOGO LIGHTBOX */}
        {logoOpen && (
          <div
            className="fixed inset-0 z-[100] bg-black/70 flex items-center justify-center p-6"
            onClick={() => setLogoOpen(false)}
          >
            <div
              className="bg-[#0B1221] p-10 rounded-2xl border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src="/sl.png"
                alt="SoloBot Logo"
                className="w-[320px] h-auto object-contain mx-auto"
              />
              <p className="mt-6 text-center text-sm text-white/60">
                One Bot. Infinite Tasks.
              </p>
            </div>
          </div>
        )}

        {/* PAGE CONTENT */}
        <main className="pt-[96px]">{children}</main>
      </body>
    </html>
  );
}
