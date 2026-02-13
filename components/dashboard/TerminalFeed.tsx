'use client'

import { usePolling } from '@/hooks/use-polling'

interface TerminalProps {
  logs: { time: string; msg: string; type: string }[]
}

export function TerminalFeed({ logs }: TerminalProps) {
  // ⚡ This activates the 3-second heartbeat to refresh Server Action data
  usePolling(3000)

  return (
    <div className="bg-[#050505] font-mono text-[10px] md:text-xs p-5 rounded-2xl h-72 overflow-y-auto border border-white/5 shadow-2xl custom-scrollbar">
      <div className="flex flex-col gap-1.5">
        {logs.length === 0 ? (
          <div className="text-zinc-600 italic">Establishing neural link... waiting for logs...</div>
        ) : (
          logs.map((log, i) => (
            <div 
              key={i} 
              className="flex gap-3 animate-in fade-in slide-in-from-left-2 duration-500"
            >
              <span className="text-zinc-600 shrink-0">[{log.time}]</span>
              
              {/* Type-based coloring */}
              <span className={`font-bold shrink-0 ${
                log.type === 'emerald' ? 'text-emerald-500' : 'text-zinc-500'
              }`}>
                {log.type === 'emerald' ? '✓' : '!!'}
              </span>

              <span className={`${
                log.type === 'emerald' ? 'text-zinc-200' : 'text-zinc-400 italic'
              }`}>
                {log.msg}
              </span>
            </div>
          ))
        )}
      </div>
      
      {/* Visual "Blinking Cursor" effect */}
      <div className="flex gap-2 items-center mt-4 border-t border-white/5 pt-4">
        <span className="text-indigo-500 font-bold">bot@agency</span>
        <span className="text-zinc-600">:</span>
        <span className="text-indigo-400">~</span>
        <span className="text-white">$</span>
        <span className="w-2 h-4 bg-indigo-500/50 animate-pulse ml-1" />
      </div>
    </div>
  )
}