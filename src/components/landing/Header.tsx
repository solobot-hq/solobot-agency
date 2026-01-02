import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="fixed top-0 w-full z-50 bg-background border-b shadow-none">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-[72px]">
          <div className="flex items-center">
            {/* FINAL: authority-sized landing header logo */}
            <div className="h-12 flex items-center gap-3">
              <img
                src="/sl-header.png"
                alt="SoloBot Agency"
                className="h-full w-auto object-contain block"
              />
              <span className="font-bold text-xl tracking-tight text-foreground uppercase leading-none">
                SOLOBOTAGENCY
              </span>
            </div>
          </div>

          <nav className="hidden md:flex space-x-8">
            <Link
              href="#features"
              className="text-muted-foreground hover:text-foreground font-medium text-sm"
            >
              Features
            </Link>
            <Link
              href="#pricing"
              className="text-muted-foreground hover:text-foreground font-medium text-sm"
            >
              Pricing
            </Link>
          </nav>

          <div className="flex items-center">
            <Button>Get Started</Button>
          </div>
        </div>
      </div>
    </header>
  );
}
