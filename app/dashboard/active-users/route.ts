import { NextResponse } from 'next/server';

export async function GET() {
  // Simulate active users count
  return NextResponse.json(128);
}