import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json([35, 55, 40, 70, 60, 85, 50]);
}