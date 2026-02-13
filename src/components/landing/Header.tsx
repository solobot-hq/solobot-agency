"use client";

import Link from "next/link";

export default function Header() {
  // ✅ THE SALES TRIGGER: Pure navigation, zero friction
  const handleScrollToPricing = () => {
    const section = document.getElementById("pricing");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0B1221]/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-[72px]">
          {/* BRANDING: Keep your logo and title exactly as provided */}
          <div className="flex items-center">
            <div className="h-10 flex items-center gap-3">
              <img 
                src="/sl.png" 
                alt="SoloBot" 
                className="block object-contain"
                style={{ height: '40px', width: 'auto', minHeight: '40px' }} 
              />
              <span className="font-bold text-xl tracking-tight text-white uppercase leading-none">
                SOLOBOTAGENCY
              </span>
            </div>
          </div>

          {/* NAVIGATION & CTAs */}
          <div className="flex items-center gap-8">
            {/* Nav links for desktop */}
            <nav className="hidden md:flex items-center gap-6">
              <button 
                onClick={handleScrollToPricing} 
                className="text-sm font-medium text-zinc-400 hover:text-white transition-colors"
              >
                Pricing
              </button>
            </nav>

            <div className="flex items-center gap-4">
              {/* LOGIN: Gate for existing users */}
              <Link 
                href="/sign-in" 
                className="text-sm font-bold text-zinc-400 hover:text-white transition-colors"
              >
                LOGIN
              </Link>

              {/* GET STARTED: Funnel trigger to #pricing */}
              <button
                onClick={handleScrollToPricing}
                className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-black text-[12px] tracking-widest hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-500/20 active:scale-95"
              >
                GET STARTED
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}