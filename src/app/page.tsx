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
      <body className="bg-[#0B1221] text-white antialiased">
        {/* GLOBAL HEADER — BRUTE FORCE 120PX CANVAS */}
        <header 
          className="fixed top-0 w-full z-[60] border-b border-white/10 bg-[#0B1221]/95 backdrop-blur-md !h-[120px]"
          style={{ height: '120px !important' }}
        >
          <div className="max-w-7xl mx-auto px-6 h-full">
            <div className="flex justify-between items-center h-full">
              {/* LOGO AREA - Click to Enlarge */}
              <button
                type="button"
                aria-label="View logo"
                onClick={() => setLogoOpen(true)}
                className="flex items-center gap-5 bg-transparent border-0 p-0 cursor-pointer focus:outline-none transition-transform hover:scale-[1.02]"
              >
                <div className="flex items-center !h-[80px]">
                  <img
                    src="/sl.png"
                    alt="SoloBot"
                    className="block object-contain !h-full w-auto"
                  />
                </div>
                <span className="font-bold text-3xl tracking-tight uppercase leading-none text-white">
                  SOLOBOTAGENCY
                </span>
              </button>

              {/* NAV + CTA */}
              <div className="flex items-center gap-10">
                <nav className="hidden lg:flex space-x-12">
                  <Link
                    href="#features"
                    className="text-lg font-medium text-white/70 hover:text-white transition-colors"
                  >
                    Features
                  </Link>
                  <Link
                    href="#pricing"
                    className="text-lg font-medium text-white/70 hover:text-white transition-colors"
                  >
                    Pricing
                  </Link>
                </nav>

                <div className="flex items-center gap-8">
                  <Link
                    href="/login"
                    className="text-lg font-medium text-white/70 hover:text-white transition-colors"
                  >
                    LOGIN
                  </Link>

                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700 px-10 py-7 text-lg font-bold">
                    GET STARTED
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* LOGO LIGHTBOX MODAL */}
        {logoOpen && (
          <div
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-6 backdrop-blur-xl"
            onClick={() => setLogoOpen(false)}
          >
            <div
              className="bg-[#0B1221] p-12 rounded-3xl border border-white/10 shadow-2xl max-w-lg w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src="/sl.png"
                alt="SoloBot Logo"
                className="w-[400px] h-auto object-contain mx-auto"
              />
              <p className="mt-8 text-center text-xl text-white/60 font-medium italic">
                One Bot. Infinite Tasks.
              </p>
              <button 
                onClick={() => setLogoOpen(false)}
                className="mt-8 w-full py-2 text-xs font-bold text-white/40 uppercase tracking-widest hover:text-white transition-colors"
              >
                Click anywhere to close
              </button>
            </div>
          </div>
        )}

        {/* PAGE CONTENT — Force Padding to Match 120px Header */}
        <main className="!pt-[120px] min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}