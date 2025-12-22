import { NextResponse } from 'next/server';

export async function GET() {
  // Simulate new users this week
  return NextResponse.json(45);
}