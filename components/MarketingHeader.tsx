"use client";

import { UserButton, SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";

export default function MarketingHeader() {
  const handleScrollToPricing = (e: React.MouseEvent) => {
    e.preventDefault();
    const section = document.getElementById("pricing");
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.location.href = "/#pricing";
    }
  };

  return (
    <header className="fixed top-0 w-full z-[100] border-b border-white/10 bg-[#0B1221]/95 backdrop-blur-md h-[60px] md:h-[130px]">
      <div className="max-w-7xl mx-auto px-3 md:px-6 h-full flex items-center justify-between">
        
        {/* BRANDING: Drastically smaller for mobile to make room for the button */}
        <Link href="/" className="flex items-center gap-1.5 md:gap-6 shrink">
          <div className="relative h-6 w-6 md:h-[110px] md:w-[110px] shrink-0">
            <Image
              src="/sl.png"
              alt="SoloBotAgency"
              fill
              unoptimized
              className="object-contain"
              priority
            />
          </div>
          <div className="text-[10px] xs:text-xs md:text-5xl font-black tracking-tighter text-white uppercase leading-none truncate max-w-[100px] xs:max-w-none">
            SOLOBOTAGENCY
          </div>
        </Link>

        {/* ACTIONS: Compact sizing for mobile */}
        <div className="flex items-center gap-2 md:gap-8 shrink-0">
          <SignedOut>
            <button 
              onClick={handleScrollToPricing}
              className="text-[9px] md:text-xl font-black text-white px-3 py-1.5 md:px-12 md:py-6 rounded-md md:rounded-3xl bg-indigo-600 hover:bg-indigo-700 transition-all shadow-md whitespace-nowrap"
            >
              GET STARTED
            </button>
          </SignedOut>

          <SignedIn>
             <Link 
              href="/dashboard" 
              className="text-[10px] md:text-base font-bold text-slate-400 mr-1 md:mr-0"
            >
              Dashboard
            </Link>
            <UserButton appearance={{ elements: { avatarBox: "h-6 w-6 md:h-12 md:w-12" } }} />
          </SignedIn>
        </div>
      </div>
    </header>
  );
}