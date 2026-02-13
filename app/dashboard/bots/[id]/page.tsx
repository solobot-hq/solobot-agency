// 📄 Location: app/dashboard/bots/[id]/page.tsx
// 🔒 STABLE SERVER COMPONENT - REVENUE READY

import prisma from "@/lib/prisma"; 
import { notFound, redirect } from "next/navigation";
import { getAuthUser } from "@/lib/auth";
import Link from "next/link";
import { ArrowLeft, Bot, Shield, Settings2 } from "lucide-react";

// ✅ UI Components
import { PersonaEditor } from "@/components/dashboard/PersonaEditor";
import { StatusToggle } from "@/components/dashboard/StatusToggle";

interface PageProps {
  params: Promise<{ id: string }>;
}

/**
 * 🛡️ SERVER COMPONENT: Bot Detail & Persona Configuration
 * Updated to enforce Steel Thread Paywall logic.
 */
export default async function Page({ params }: PageProps) {
  // 1. Next.js 15 requirement: Unwrap params asynchronously
  const { id } = await params;

  // 2. Security: Verify Identity via Clerk
  const user = await getAuthUser();
  if (!user?.id) {
    redirect("/login");
  }

  // 3. Data Fetching (User & Bot)
  // We fetch the User tier and Bot details in parallel for performance
  const [dbUser, bot] = await Promise.all([
    prisma.user.findUnique({
      where: { clerkId: user.id },
      select: { tier: true }
    }),
    prisma.bot.findUnique({
      where: { 
        id: id,
        userId: user.id 
      },
      include: {
        persona: true 
      }
    })
  ]);

  // 4. Safety Checks
  if (!dbUser) {
    console.error("❌ [AUTH ERROR]: Clerk user exists but DB user record missing.");
    redirect("/onboarding"); // Or wherever you handle first-time setup
  }

  if (!bot) {
    return notFound();
  }

  // 5. Data Preparation
  const capabilities = Array.isArray(bot.persona?.capabilities) 
    ? (bot.persona.capabilities as string[]) 
    : [];

  return (
    <div className="pt-16 pb-40 space-y-12 max-w-7xl mx-auto px-4 animate-in fade-in duration-700">
      
      {/* NAVIGATION & ACTION BAR */}
      <div className="flex items-center justify-between">
        <Link 
          href="/dashboard" 
          className="group flex items-center gap-2 text-zinc-500 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-[10px] font-black uppercase tracking-widest">Return to Fleet</span>
        </Link>
        
        <div className="flex items-center gap-4">
          <StatusToggle botId={bot.id} initialStatus={bot.isRunning} />
        </div>
      </div>

      {/* NODE HEADER */}
      <div className="flex items-center gap-6 p-10 bg-white/[0.02] border border-white/[0.05] rounded-[2.5rem] shadow-2xl">
        <div className="p-5 bg-indigo-500/10 rounded-3xl">
          <Bot className="w-10 h-10 text-indigo-400" />
        </div>
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-black text-white tracking-tight lowercase">
              {bot.name}
            </h1>
            <span className="px-3 py-1 bg-zinc-800 rounded-full text-[9px] font-black text-zinc-400 uppercase tracking-tighter">
              {dbUser.tier} NODE
            </span>
          </div>
          <p className="text-zinc-500 text-sm mt-1 italic">
            Monitoring signals from node {bot.id.slice(0, 4)}...
          </p>
        </div>
      </div>

      {/* CONFIGURATION GRID */}
      <div className="grid grid-cols-1 gap-8">
        
        {/* ✅ THE PERSONA EDITOR (Gated by Tier) */}
        <PersonaEditor 
          botId={bot.id} 
          tier={dbUser.tier} // 👈 Pass the tier for paywall logic
          initialData={{
            systemPrompt: bot.persona?.systemPrompt || "",
            riskLevel: (bot.persona?.riskLevel as "LOW" | "MEDIUM" | "HIGH") || "LOW",
            capabilities: capabilities
          }} 
        />
        
        {/* METADATA & RESOURCE CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-[#0D1525] border border-white/[0.05] rounded-[2rem] p-8 opacity-50 cursor-not-allowed group">
                <div className="flex items-center gap-3 mb-6">
                    <Shield className="w-4 h-4 text-zinc-600 group-hover:text-indigo-500 transition-colors" />
                    <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Compliance Lock</h3>
                </div>
                <p className="text-xs text-zinc-600">Hardware isolation and safety boundaries are managed by the core kernel.</p>
            </div>
            
            <div className="bg-[#0D1525] border border-white/[0.05] rounded-[2rem] p-8 opacity-50 cursor-not-allowed group">
                <div className="flex items-center gap-3 mb-6">
                    <Settings2 className="w-4 h-4 text-zinc-600 group-hover:text-indigo-500 transition-colors" />
                    <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Resource Allocation</h3>
                </div>
                <p className="text-xs text-zinc-600">CPU and memory limits are dynamically scaled based on plan tier ({dbUser.tier}).</p>
            </div>
        </div>
      </div>
    </div>
  );
}