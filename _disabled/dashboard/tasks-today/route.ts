import { NextResponse } from 'next/server';

export async function GET() {
  // Simulate tasks completed today
  return NextResponse.json(320);
}