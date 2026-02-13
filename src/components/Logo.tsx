// src/components/Logo.tsx
import Image from "next/image";
import Link from "next/link";

export const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-4 group">
      {/* 🏛️ MASSIVE OVERRIDE: Deleting 'h-8 w-8' bottleneck */}
      {/* We are using the vertical sl.png for that exact sign-in page look */}
      <div className="relative h-[120px] w-[120px] md:h-[180px] md:w-[180px] shrink-0">
        <Image 
          src="/sl.png" 
          alt="SoloBotAgency" 
          fill 
          className="object-contain transition-transform duration-500 group-hover:scale-110" 
          priority 
        />
      </div>
      
      <div className="flex flex-col">
        <span className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white leading-none">
          SoloBotAgency
        </span>
        <span className="text-[10px] md:text-xs font-bold text-indigo-500 uppercase tracking-[0.4em] mt-2">
          Enterprise AI Sales
        </span>
      </div>
    </Link>
  );
};