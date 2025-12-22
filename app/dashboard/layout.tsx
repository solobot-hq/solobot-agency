import React from 'react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-full bg-zinc-950 text-zinc-100 antialiased overflow-hidden font-sans">
      <main className="flex flex-1 flex-col min-w-0 overflow-hidden relative bg-zinc-950">
        {children}
      </main>
    </div>
  );
}
