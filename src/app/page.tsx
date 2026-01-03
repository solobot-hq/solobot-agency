"use client";

import { useState } from "react";
import { Zap, Shield, Rocket, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function LandingPage() {
  const [logoOpen, setLogoOpen] = useState(false);

  return (
    <>
      {/* 🚀 FORCE: 120px Canvas Height using !important to kill all overrides */}
      <header 
        className="fixed top-0 w-full z-50 border-b border-white/10 bg-[#0B1221]/95 backdrop-blur-md"
        style={{ height: '120px !important', minHeight: '120px !important' }} 
      >
        <div className="max-w-7xl mx-auto px-6 h-full">
          <div className="flex justify-between items-center h-full" style={{ height: '120px !important' }}>
            <button
              type="button"
              aria-label="View logo"
              onClick={() => setLogoOpen(true)}
              className="flex items-center gap-5 bg-transparent border-0 p-0 text-left cursor-pointer focus:outline-none z-[60]"
            >
              {/* 🚀 FORCE: Logo container at 80px */}
              <div style={{ height: '80px !important' }} className="flex items-center">
                <img 
                  src="/sl.png" 
                  alt="SoloBot" 
                  className="h-full w-auto block object-contain"
                  style={{ height: '80px !important' }}
                />
              </div>
              <span className="font-bold text-3xl tracking-tight text-white uppercase leading-none">
                SOLOBOTAGENCY
              </span>
            </button>

            <div className="flex items-center gap-8">
              <nav className="hidden lg:flex space-x-10">
                <Link href="#features" className="text-lg font-medium text-white/70 hover:text-white">Features</Link>
                <Link href="#pricing" className="text-lg font-medium text-white/70 hover:text-white">Pricing</Link>
              </nav>
              <div className="flex items-center gap-6">
                <Link href="/login" className="text-lg font-medium text-white/70 hover:text-white">LOGIN</Link>
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 px-8 py-6 text-lg">GET STARTED</Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 🚀 FORCE: Content offset 120px */}
      <main className="min-h-screen bg-[#0B1221]" style={{ paddingTop: '120px !important' }}>
        {/* Hero content continues below... */}