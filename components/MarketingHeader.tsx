"use client";

import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import { ModeToggle } from "@/components/ModeToggle";

export default function MarketingHeader() {
  const handleScrollToPricing = () => {
    // Looks for the ID we put on the pricing section
    const section = document.getElementById("pricing");
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <header className="border-b border-white/[0.05] backdrop-blur-xl fixed top-0 w-full z-50 bg-[#0c0e12]/80">
      <nav className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="relative h-8 w-8">
            <Image src="/sl.png" alt="Logo" fill className="object-contain" priority />
          </div>
          <span className="text-lg font-bold tracking-tight text-white">SoloBotAgency</span>
        </Link>
        
        <div className="flex items-center gap-6 text-sm font-medium">
          <ModeToggle />
          <SignedOut>
            <Link href="/sign-in" className="text-zinc-400 hover:text-white transition-colors">Login</Link>
            <button 
              onClick={handleScrollToPricing}
              className="hidden sm:block bg-white text-black hover:bg-zinc-200 px-5 py-2 rounded-md font-semibold transition-all active:scale-95"
            >
              Get Started
            </button>
          </SignedOut>
          <SignedIn>
            <Link href="/dashboard" className="text-zinc-400 hover:text-white transition-colors">Dashboard</Link>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>
      </nav>
    </header>
  );
}