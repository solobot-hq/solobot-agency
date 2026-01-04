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
            <header 
              className="fixed top-0 w-full z-[60] border-b border-white/10 bg-[#0B1221]/95 backdrop-blur-md"
              style={{ height: '120px' }}
            >
              <div className="max-w-7xl mx-auto px-6 h-full flex justify-between items-center">
                <Link href="/" className="flex items-center gap-6">
                  <div className="relative" style={{ height: '100px', width: '100px' }}>
                    <Image src="/sl.png" alt="SoloBotAgency" fill className="object-contain" priority />
                  </div>
                  <span className="text-4xl font-black uppercase tracking-tighter">SoloBotAgency</span>
                </Link>
                <div className="flex items-center gap-10">
                  <nav className="hidden lg:flex space-x-12">
                    <Link href="/dashboard" className="text-lg font-medium text-white/70 hover:text-white">Dashboard</Link>
                  </nav>
                  <Link href="/sign-in" className="text-lg font-bold text-white px-10 py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700">GET STARTED</Link>
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