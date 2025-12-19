import React from 'react';
import GlobalCommandPalette from './components/GlobalCommandPalette';
import Sidebar from './components/Sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-full bg-zinc-950 text-zinc-100 antialiased selection:bg-indigo-500/30 overflow-hidden font-sans">
      {/* Global Command Palette (Always available via Cmd+K) */}
      <GlobalCommandPalette />
      
      {/* Persistent Sidebar (Locked Navigation) */}
      <Sidebar />

      {/* Main Content Area (Scrollable, specific to the active bot) */}
      <main className="flex flex-1 flex-col min-w-0 overflow-hidden relative bg-zinc-950">
        {children}
      </main>
    </div>
  );
}