import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json([
    { id: "1", action: "Campaign Started", target: "Cold Email Sequence #4", time: "Just now", iconType: "Mail", color: "text-blue-400", bg: "bg-blue-500/10" },
    { id: "2", action: "Bot Completed", target: "Lead Scraper Task", time: "25 mins ago", iconType: "CheckCircle", color: "text-emerald-400", bg: "bg-emerald-500/10" },
    { id: "3", action: "Error Detected", target: "Content Generation", time: "1 hour ago", iconType: "XCircle", color: "text-red-400", bg: "bg-red-500/10" },
    { id: "4", action: "Credits Added", target: "Monthly Renewal", time: "1 day ago", iconType: "Zap", color: "text-yellow-400", bg: "bg-yellow-500/10" },
  ]);
}