"use client";

import React from "react";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

export default function DashboardHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 h-24 bg-zinc-950 border-b border-zinc-800/50 z-[60] px-6">
      <div className="flex items-center justify-between h-full max-w-[1600px] mx-auto">
        <div className="flex items-center gap-8">
          <Link href="/dashboard" className="flex items-center gap-6 group transition-all">
            {/* FORCE SCALE: Using raw inline styles to override Tailwind constraints.
                We are locking the container to 100px to make it highly visible.
            */}
            <div 
              className="relative shrink-0 bg-indigo-500/10 rounded-2xl flex items-center justify-center border border-indigo-500/20 shadow-2xl shadow-indigo-500/20 group-hover:border-indigo-500/50 transition-all"
              style={{ 
                width: '100px', 
                height: '100px', 
                minWidth: '100px', 
                minHeight: '100px',
                marginTop: '10px' 
              }} 
            >
              <img
                src="/sl.png"
                alt="SoloBotAgency"
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'contain',
                  padding: '10px',
                  display: 'block'
                }}
              />
            </div>
            
            <div className="flex flex-col">
              <span className="text-4xl font-black tracking-tighter text-white leading-none uppercase">
                SoloBotAgency
              </span>
              <span className="text-[12px] font-black text-indigo-400 uppercase tracking-[0.5em] mt-2">
                SaaS Platform
              </span>
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-6">
          <UserButton 
            afterSignOutUrl="/" 
            appearance={{
              elements: {
                userButtonAvatarBox: "h-12 w-12 border-2 border-zinc-800 shadow-xl"
              }
            }}
          />
        </div>
      </div>
    </header>
  );
}