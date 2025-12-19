"use client"

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Mail, FileText, Bot, Search, Pencil, BarChart2, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

const tools = [
  { name: 'Email Assistant', icon: Mail, href: '/dashboard/email-assistant' },
  { name: 'CV Generator', icon: FileText, href: '/dashboard/cv-generator' },
  { name: 'Proposal Maker', icon: Bot, href: '/dashboard/proposal-maker' },
  { name: 'Outreach Bot', icon: Search, href: '/dashboard/outreach-bot' },
  { name: 'Leads Engine', icon: BarChart2, href: '/dashboard/leads-engine' },
  { name: 'Content Assistant', icon: Pencil, href: '/dashboard/content-assistant' },
];

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-72 flex-shrink-0 border-r border-white/10 bg-slate-900/50 lg:flex lg:flex-col">
      <div className="flex h-20 items-center border-b border-white/10 px-6">
        <Link href="/dashboard" className="flex items-center space-x-3">
          <Image src="/sl.png" alt="Logo" width={40} height={40} />
          <span className="font-bold text-xl text-white">SoloBotAgency</span>
        </Link>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {tools.map((tool) => (
          <Link
            key={tool.name}
            href={tool.href}
            className={cn(
              'flex items-center rounded-lg px-3 py-2.5 text-sm font-medium text-slate-300 transition-colors hover:bg-slate-800 hover:text-white',
              pathname === tool.href && 'bg-brand text-white'
            )}
          >
            <tool.icon className="mr-3 h-5 w-5" />
            <span>{tool.name}</span>
          </Link>
        ))}
      </nav>
      <div className="border-t border-white/10 p-4">
         <Link
            href="/dashboard/settings"
            className="flex items-center rounded-lg px-3 py-2.5 text-sm font-medium text-slate-300 transition-colors hover:bg-slate-800 hover:text-white"
          >
            <Settings className="mr-3 h-5 w-5" />
            <span>Settings</span>
          </Link>
      </div>
    </aside>
  );
}