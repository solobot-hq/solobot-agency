import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    totalBots: 12,
    runningTasks: 4,
    activeCredits: 8450,
    totalCredits: 10000,
    systemAlerts: 0,
    success: 125,
    pending: 12,
    failed: 8,
    successRate: 92
  });
}