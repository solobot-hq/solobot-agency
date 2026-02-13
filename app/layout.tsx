"use client";

import "./globals.css";
import { Inter } from "next/font/google";
import { ClerkProvider, UserButton } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/theme-provider";
import Link from "next/link";
import Image from "next/image";
import { Moon } from "lucide-react";
import { usePathname } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // ✅ Hides header on sign-in/up pages
  const isAuthPage = pathname.includes("/sign-in") || pathname.includes("/sign-up");

  // ✅ FIXED SALES TRIGGER: Connects to the id="pricing" in your Pricing component
  const handleScrollToPricing = () => {
    const section = document.getElementById("pricing");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning className="dark">
        <body 
          className={`${inter.className} antialiased bg-[#0B1221] text-white min-h-screen scroll-smooth`}
          style={{ overflowX: 'hidden' }}
        >
          <ThemeProvider 
            attribute="class" 
            defaultTheme="dark" 
            enableSystem 
            disableTransitionOnChange
          >
            {/* 🏛️ RESTORED MASSIVE HEADER (h-[130px]) */}
            {!isAuthPage && (
              <header className="fixed top-0 w-full z-[100] border-b border-white/10 bg-[#0B1221]/95 backdrop-blur-md h-[130px]">
                <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
                  
                  {/* ✅ BRAND BLOCK: 110px Logo & text-5xl Title */}
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

                  {/* UTILITIES */}
                  <div className="flex items-center gap-4 md:gap-8">
                    <button className="p-3.5 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/5 transition-all">
                      <Moon className="h-6 w-6 text-slate-400" />
                    </button>

                    <Link 
                      href="/sign-in" 
                      className="hidden sm:block text-base font-bold text-slate-400 hover:text-white transition-colors"
                    >
                      Login
                    </Link>

                    <UserButton appearance={{ elements: { avatarBox: "h-12 w-12 border-2 border-white/10" } }} />
                    
                    {/* ✅ GET STARTED: Now correctly wired to scroll */}
                    <button 
                      onClick={handleScrollToPricing}
                      className="text-base md:text-xl font-black text-white px-8 py-4 md:px-12 md:py-6 rounded-2xl md:rounded-3xl bg-indigo-600 hover:bg-indigo-700 transition-all shadow-[0_0_40px_rgba(79,70,229,0.3)] whitespace-nowrap"
                    >
                      GET STARTED
                    </button>
                  </div>
                </div>
              </header>
            )}

            {/* MAIN CONTENT: Offset matches the 130px header height */}
            <main className={`relative flex flex-col ${!isAuthPage ? "pt-[130px]" : ""}`}>
              {children}
            </main>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}