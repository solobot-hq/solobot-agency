import React from "react";

// 1. SOLO MARK (Icon Only)
// Minimalist, geometric node/spark shape representing AI/Automation
export const SoloIcon = ({ className = "w-8 h-8" }: { className?: string }) => (
  <svg 
    viewBox="0 0 40 40" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    className={className}
  >
    <defs>
      <linearGradient id="sba_grad" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
        <stop stopColor="#6366f1" /> {/* Indigo-500 */}
        <stop offset="1" stopColor="#a855f7" /> {/* Purple-500 */}
      </linearGradient>
      <filter id="glow" x="-10" y="-10" width="60" height="60" filterUnits="userSpaceOnUse">
        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
        <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
        </feMerge>
    </filter>
    </defs>
    
    <path 
      d="M20 4L24 14L36 16L26 22L30 34L20 26L10 34L14 22L4 16L16 14L20 4Z" 
      fill="url(#sba_grad)" 
      stroke="none"
    />
    <path 
      d="M20 4L24 14L36 16L26 22L30 34L20 26L10 34L14 22L4 16L16 14L20 4Z" 
      stroke="white" 
      strokeOpacity="0.1" 
      strokeWidth="1"
    />
    <circle cx="20" cy="20" r="3" fill="#ffffff" />
  </svg>
);

// 2. HORIZONTAL LOCKUP (Icon + Text)
// Clean modern sans-serif typography
export const LogoHorizontal = ({ className = "h-8" }: { className?: string }) => (
  <div className={`flex items-center gap-2.5 ${className} select-none`}>
    <SoloIcon className="w-7 h-7" />
    <span className="font-bold text-lg tracking-tight text-white leading-none font-sans">
      SoloBot<span className="text-indigo-400">Agency</span>
    </span>
  </div>
);

// 3. COMPACT LOCKUP (Icon + SBA)
// Optimized for mobile headers
export const LogoCompact = ({ className = "h-8" }: { className?: string }) => (
  <div className={`flex items-center gap-2 ${className} select-none`}>
    <SoloIcon className="w-6 h-6" />
    <span className="font-extrabold text-md tracking-tight text-white leading-none">
      SBA
    </span>
  </div>
);