import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json([45, 60, 75, 50, 80, 95, 70]);
}