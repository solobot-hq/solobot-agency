"use client";

import { SignUp } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";

export default function SignUpPage() {
  return (
    <div className="min-h-screen w-full bg-[#0B1221] relative overflow-hidden grid place-items-center p-4">
      
      {/* --- BACKGROUND GLOWS --- */}
      <div className="absolute top-[-200px] left-[-100px] w-[600px] h-[600px] bg-emerald-500/20 rounded-full blur-[160px] animate-pulse"></div>
      <div className="absolute bottom-[-150px] right-[-150px] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[160px] animate-pulse"></div>
      <div className="absolute top-[200px] right-[20%] w-[400px] h-[400px] bg-cyan-400/10 rounded-full blur-[140px]"></div>

      {/* --- GLASS CARD --- */}
      <div className="max-w-md w-full mx-auto bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_0_50px_-10px_rgba(0,0,0,0.50)] rounded-3xl p-8 md:p-10 relative z-10">
        
        {/* BRANDING HEADER */}
        <div className="flex flex-col items-center mb-8 space-y-4">
          <Image
            src="/sl.png"
            alt="SoloBotAgency Logo"
            width={100}
            height={100}
            className="object-contain mb-4"
            priority
          />
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white">Join SoloBotAgency</h1>
            <p className="text-gray-300 mt-2 text-sm">
              Start automating your workflow today.
            </p>
          </div>
        </div>

        {/* CLERK COMPONENT */}
        <SignUp 
          afterSignInUrl="/dashboard"
          afterSignUpUrl="/dashboard"
          redirectUrl="/dashboard"
          appearance={{
            layout: { socialButtonsPlacement: "top" },
            variables: {
              colorPrimary: "#10B981", // Emerald 500
              colorText: "white",
              colorBackground: "transparent",
              colorInputBackground: "transparent",
              colorInputText: "white",
              borderRadius: "0.75rem",
            },
            elements: {
              // Hide default header/footer
              header: "hidden",
              footer: "hidden",
              card: "bg-transparent shadow-none p-0 border-none",
              
              // Google/Social Button
              socialButtonsBlockButton: 
                "bg-white text-black font-medium py-2.5 rounded-xl hover:bg-gray-200 transition border-none",
              socialButtonsBlockButtonText: "font-semibold",
              
              // Divider
              dividerLine: "bg-white/10",
              dividerText: "text-gray-400 font-medium",
              
              // Inputs
              formFieldLabel: "text-gray-300 font-medium",
              formFieldInput: 
                "w-full rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:border-emerald-400 focus:ring-emerald-500 focus:ring-1 transition-all py-3",
              
              // Primary Button
              formButtonPrimary: 
                "w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 rounded-xl transition shadow-lg shadow-emerald-500/20 active:scale-[0.98] after:content-['→'] after:ml-2",
            }
          }}
        />

        {/* CUSTOM FOOTER LINKS */}
        <p className="text-center text-gray-300 mt-6 text-sm">
          Already have an account?
          <Link href="/sign-in" className="text-emerald-400 hover:text-emerald-300 ml-1 font-semibold transition-colors">
            Sign in
          </Link>
        </p>

        {/* TRUST FOOTER */}
        <div className="text-center text-gray-500 text-xs mt-10 opacity-60">
          © 2025 SoloBotAgency — All Rights Reserved.
          <div className="mt-1">Secured by <span className="font-semibold text-gray-400">Clerk</span></div>
        </div>

      </div>
    </div>
  );
}