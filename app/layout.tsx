import "./globals.css";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/theme-provider";
import Link from "next/link";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`${inter.className} antialiased`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {/* 1️⃣ Landing Page Header */}
            {/* Note: This header will appear on all pages unless hidden via route groups */}
            <header className="fixed top-0 w-full z-50 border-b border-white/10 bg-zinc-950/80 backdrop-blur-md">
              <div className="container mx-auto px-4 h-24 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-4 shrink-0 transition-transform hover:scale-[1.02]">
                  <div className="relative h-[48px] w-[48px] md:h-[56px] md:w-[56px] shrink-0">
                    <Image 
                      src="/sl.png" 
                      alt="SoloBotAgency" 
                      fill 
                      className="object-contain" 
                      priority 
                    />
                  </div>
                  <span className="text-2xl md:text-3xl font-black tracking-tighter text-white">
                    SoloBotAgency
                  </span>
                </Link>
                
                {/* Navigation / Auth Buttons */}
                <div className="flex items-center gap-6">
                  <Link href="/#pricing" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">
                    Pricing
                  </Link>
                  <Link href="/sign-in" className="text-sm font-medium text-white px-5 py-2 rounded-full bg-indigo-600 hover:bg-indigo-700 transition-colors">
                    Get Started
                  </Link>
                </div>
              </div>
            </header>

            {/* 2️⃣ Main Content Wrapper */}
            {children}
            
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}