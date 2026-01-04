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
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {/* 🏛️ GLOBAL HEADER: Uniform 120px Canvas */}
            <header 
              className="fixed top-0 w-full z-[60] border-b border-white/10 bg-[#0B1221]/95 backdrop-blur-md"
              style={{ height: '120px !important', minHeight: '120px !important' }}
            >
              <div className="max-w-7xl mx-auto px-6 h-full flex justify-between items-center">
                <Link href="/" className="flex items-center gap-5 shrink-0 transition-transform hover:scale-[1.02]">
                  <div className="relative" style={{ height: '80px !important', width: '80px !important' }}>
                    <Image 
                      src="/sl.png" 
                      alt="SoloBotAgency" 
                      fill 
                      className="object-contain" 
                      priority 
                    />
                  </div>
                  <span className="text-3xl font-black uppercase tracking-tight text-white">
                    SoloBotAgency
                  </span>
                </Link>
                
                <div className="flex items-center gap-10">
                  <nav className="hidden lg:flex space-x-12">
                    <Link href="/#pricing" className="text-lg font-medium text-white/70 hover:text-white transition-colors">
                      Pricing
                    </Link>
                    <Link href="/dashboard" className="text-lg font-medium text-white/70 hover:text-white transition-colors">
                      Dashboard
                    </Link>
                  </nav>
                  
                  <div className="flex items-center gap-8">
                    <Link href="/sign-in" className="text-lg font-bold text-white px-10 py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/20">
                      GET STARTED
                    </Link>
                  </div>
                </div>
              </div>
            </header>

            {/* 📦 CONTENT OFFSET */}
            <main className="min-h-screen" style={{ paddingTop: '120px !important' }}>
              {children}
            </main>
            
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}