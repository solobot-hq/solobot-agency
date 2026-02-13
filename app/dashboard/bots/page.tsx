// /app/dashboard/bots/page.tsx
import { prisma } from "@/lib/prisma";
import { getAuthUser } from "@/lib/auth";
import Link from "next/link";
import { Bot, ChevronRight, Plus, Activity, AlertCircle, Database, RefreshCcw } from "lucide-react";

export default async function BotsPage() {
  const user = await getAuthUser();

  // Guard: If no user, we shouldn't attempt the DB query
  if (!user?.id) {
    return (
      <div className="p-8 text-center text-zinc-500">
        Authentication required. Please sign in again.
      </div>
    );
  }

  try {
    // 🔍 This query verifies the Neon connection is active
    // We use the prisma singleton exported from @/lib/prisma
    const bots = await prisma.bot.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' }
    });

    return (
      <div className="p-8 max-w-5xl mx-auto space-y-8 animate-in fade-in duration-700">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-black text-white tracking-tight">Your Agents</h1>
            <div className="flex items-center gap-2 mt-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
              <p className="text-zinc-500 text-xs font-medium uppercase tracking-wider">System Online</p>
            </div>
          </div>
          <Link 
            href="/dashboard/workspace"
            className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 transition-all active:scale-95 shadow-lg shadow-indigo-900/20"
          >
            <Plus className="w-4 h-4" /> Deploy New Agent
          </Link>
        </div>

        <div className="grid gap-4">
          {bots.length === 0 ? (
            <div className="text-center p-20 bg-[#0D1525] rounded-[2.5rem] border border-white/5 flex flex-col items-center gap-4">
               <div className="p-4 bg-white/5 rounded-2xl">
                  <Bot className="w-10 h-10 text-zinc-700" />
               </div>
               <p className="text-zinc-500 font-medium text-sm">No agents found in this cluster.</p>
            </div>
          ) : (
            bots.map((bot) => (
              <Link 
                key={bot.id} 
                href={`/dashboard/bots/${bot.id}`}
                className="group flex items-center justify-between p-6 bg-[#0D1525] hover:bg-white/[0.03] border border-white/5 rounded-3xl transition-all hover:border-indigo-500/30 shadow-xl"
              >
                <div className="flex items-center gap-5">
                  <div className="p-4 bg-indigo-500/10 rounded-2xl group-hover:bg-indigo-500/20 transition-all">
                    <Bot className="w-6 h-6 text-indigo-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white group-hover:text-indigo-400 transition-colors lowercase tracking-tight">{bot.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`w-1.5 h-1.5 rounded-full ${bot.isRunning ? 'bg-emerald-500 animate-pulse' : 'bg-zinc-600'}`} />
                      <p className="text-[10px] text-zinc-500 font-black uppercase tracking-widest">{bot.status}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                   <div className="hidden md:flex flex-col items-end">
                      <p className="text-[10px] font-black text-zinc-600 uppercase tracking-tighter">Reliability</p>
                      <p className="text-xs font-bold text-white tracking-widest">{bot.isRunning ? '99.9%' : '0.0%'}</p>
                   </div>
                   <ChevronRight className="w-5 h-5 text-zinc-600 group-hover:text-white transition-all transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    );
  } catch (error) {
    console.error("❌ Database Connection Failed:", error);
    
    return (
      <div className="p-8 max-w-5xl mx-auto min-h-[60vh] flex flex-col items-center justify-center text-center">
        <div className="p-6 bg-rose-500/10 border border-rose-500/20 rounded-[2.5rem] mb-6">
          <AlertCircle className="w-12 h-12 text-rose-500" />
        </div>
        <h1 className="text-2xl font-black text-white mb-2 tracking-tight">Database Offline</h1>
        <p className="text-zinc-500 text-sm max-w-xs leading-relaxed mb-8">
          The neural link to the cluster was interrupted. Please ensure your <code className="text-rose-400">DATABASE_URL</code> is set correctly in your <code className="text-rose-400">.env</code> file.
        </p>
        <div className="flex gap-3">
          <Link 
            href="/dashboard/bots"
            className="px-6 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-bold text-white transition-all flex items-center gap-2"
          >
            <RefreshCcw className="w-3 h-3" /> Retry Connection
          </Link>
        </div>
      </div>
    );
  }
}