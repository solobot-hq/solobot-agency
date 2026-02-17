"use client";

import { UserButton, SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import { Moon } from "lucide-react";

export default function MarketingHeader() {
  
  const handleScrollToPricing = (e: React.MouseEvent) => {
    // 1. Prevent any default link/form behavior
    e.preventDefault();
    
    // 2. Look for the pricing section
    const section = document.getElementById("pricing");
    
    if (section) {
      // 3. Perform the glide
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      // 4. Fallback if not on home page
      window.location.href = "/#pricing";
    }
  };

  return (
    <header className="fixed top-0 w-full z-[100] border-b border-white/10 bg-[#0B1221]/95 backdrop-blur-md h-[130px]">
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        
        <Link href="/" className="flex items-center gap-6 shrink-0 group">
          <div className="relative h-[100px] w-[100px] md:h-[110px] md:w-[110px] shrink-0 rounded-md overflow-hidden">
            <Image
              src="/sl.png"
              alt="SoloBotAgency"
              fill
              unoptimized
              className="object-contain transition-transform duration-500 group-hover:scale-105"
              priority
            />
          </div>

          <div className="text-3xl md:text-5xl font-black tracking-tighter text-white uppercase leading-none">
            SOLOBOTAGENCY
          </div>
        </Link>

        <div className="flex items-center gap-4 md:gap-8">
          <button className="p-3.5 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/5 transition-all">
            <Moon className="h-6 w-6 text-slate-400" />
          </button>

          <SignedOut>
            <Link 
              href="/sign-in" 
              className="hidden sm:block text-base font-bold text-slate-400 hover:text-white transition-colors"
            >
              Login
            </Link>
            
            <button 
              type="button"
              onClick={handleScrollToPricing}
              className="relative z-[110] text-base md:text-xl font-black text-white px-8 py-4 md:px-12 md:py-6 rounded-2xl md:rounded-3xl bg-indigo-600 hover:bg-indigo-700 transition-all shadow-[0_0_40px_rgba(79,70,229,0.3)] whitespace-nowrap cursor-pointer"
            >
              GET STARTED
            </button>
          </SignedOut>

          <SignedIn>
            <Link 
              href="/dashboard" 
              className="hidden sm:block text-base font-bold text-slate-400 hover:text-white transition-colors"
            >
              Dashboard
            </Link>
            <UserButton appearance={{ elements: { avatarBox: "h-12 w-12 border-2 border-white/10" } }} />
          </SignedIn>
        </div>
      </div>
    </header>
  );
}