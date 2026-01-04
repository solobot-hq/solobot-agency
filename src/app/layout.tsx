"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function RootLayout({ children }: { children: ReactNode }) {
  const [logoOpen, setLogoOpen] = useState(false);

  return (
    <html lang="en" className="dark">
      <body className="bg-[#0B1221] text-white antialiased">
        {/* 🏛️ GLOBAL HEADER: Uniform 120px Canvas */}
        <header 
          className="fixed top-0 w-full z-[60] border-b border-white/10 bg-[#0B1221]/95 backdrop-blur-md"
          style={{ height: '120px !important', minHeight: '120px !important' }}
        >
          <div className="max-w-7xl mx-auto px-6 h-full flex justify-between items-center">
            {/* BRANDING: Uniform Logo Canvas */}
            <button 
              onClick={() => setLogoOpen(true)} 
              className="flex items-center gap-5 cursor-pointer bg-transparent border-0 p-0 focus:outline-none"
            >
              <div style={{ height: '80px !important' }} className="flex items-center">
                <img 
                  src="/sl.png" 
                  alt="SoloBot" 
                  style={{ height: '80px !important', width: 'auto', objectFit: 'contain' }} 
                />
              </div>
              <span className="font-bold text-3xl uppercase tracking-tight text-white">
                SOLOBOTAGENCY
              </span>
            </button>

            {/* GLOBAL NAVIGATION */}
            <div className="flex items-center gap-8">
              <nav className="hidden lg:flex space-x-10">
                <Link href="/dashboard" className="text-lg font-medium text-white/70 hover:text-white transition-colors">
                  DASHBOARD
                </Link>
              </nav>
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 px-8 py-6 text-lg font-bold">
                GET STARTED
              </Button>
            </div>
          </div>
        </header>

        {/* 🖼️ GLOBAL LOGO LIGHTBOX */}
        {logoOpen && (
          <div 
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-6 backdrop-blur-xl" 
            onClick={() => setLogoOpen(false)}
          >
            <div 
              className="bg-[#0B1221] p-12 rounded-3xl border border-white/10 shadow-2xl max-w-lg w-full" 
              onClick={(e) => e.stopPropagation()}
            >
              <img src="/sl.png" alt="SoloBot Logo" className="w-[400px] h-auto object-contain mx-auto" />
              <p className="mt-8 text-center text-xl text-white/60 font-medium italic">
                One Bot. Infinite Tasks.
              </p>
            </div>
          </div>
        )}

        {/* 📦 CONTENT OFFSET: Forced 120px to match the header exactly */}
        <main style={{ paddingTop: '120px !important' }} className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}

// Cache-Buster-ID: 12345