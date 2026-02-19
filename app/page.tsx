"use client";

import Image from "next/image";

export default function ComingSoon() {
  return (
    <div className="min-h-screen bg-[#0B1221] flex flex-col items-center justify-center px-6 text-center">
      {/* Logo */}
      <div className="relative h-24 w-24 mb-8">
        <Image src="/sl.png" alt="SoloBotAgency" fill className="object-contain" priority />
      </div>

      {/* Message */}
      <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase mb-4">
        Something Big is Coming
      </h1>
      <p className="text-slate-400 text-lg md:text-xl max-w-2xl mb-8">
        We're currently fine-tuning our AI agents to ensure you get the best experience possible. 
        <span className="block mt-2 font-bold text-indigo-500">Launching Very Soon.</span>
      </p>

      {/* Progress Bar Decor */}
      <div className="w-full max-w-md h-2 bg-white/5 rounded-full overflow-hidden">
        <div className="w-2/3 h-full bg-indigo-600 shadow-[0_0_20px_rgba(79,70,229,0.5)]" />
      </div>
      
      <p className="mt-12 text-xs uppercase tracking-[0.2em] text-slate-500">
        © 2024 SoloBotAgency
      </p>
    </div>
  );
}