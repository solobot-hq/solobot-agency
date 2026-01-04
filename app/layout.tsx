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
        <body className={`${inter.className} antialiased bg-[#0B1221] text-white`}>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
            {/* 🏛️ GLOBAL HEADER: Responsive & Persistent */}
            <header 
              className="fixed top-0 w-full z-[60] border-b border-white/10 bg-[#0B1221]/95 backdrop-blur-md"
              style={{ height: '120px' }}
            >
              <div className="max-w-7xl mx-auto px-4 md:px-6 h-full flex justify-between items-center">
                {/* Logo Section - Scales down on mobile */}
                <Link href="/" className="flex items-center gap-3 md:gap-6 shrink-0 transition-transform hover:scale-[1.02]">
                  <div className="relative h-[60px] w-[60px] md:h-[100px] md:w-[100px]">
                    <Image src="/sl.png" alt="SoloBotAgency" fill className="object-contain" priority />
                  </div>
                  <span className="text-xl md:text-4xl font-black uppercase tracking-tighter">SoloBotAgency</span>
                </Link>

                {/* Nav Section - Persistent on all screen sizes */}
                <div className="flex items-center gap-4 md:gap-10">
                  <nav className="flex items-center gap-4 md:gap-12">
                    <Link href="/dashboard" className="text-sm md:text-lg font-medium text-white/70 hover:text-white transition-colors">
                      Dashboard
                    </Link>
                  </nav>
                  <Link 
                    href="/sign-in" 
                    className="text-xs md:text-lg font-bold text-white px-4 py-2 md:px-10 md:py-4 rounded-xl md:rounded-2xl bg-indigo-600 hover:bg-indigo-700 transition-all whitespace-nowrap"
                  >
                    GET STARTED
                  </Link>
                </div>
              </div>
            </header>

            <main className="min-h-screen" style={{ paddingTop: '120px' }}>
              {children}
            </main>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}