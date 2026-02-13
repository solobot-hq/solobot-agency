// 📄 Location: app/api/health/db/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return NextResponse.json({ 
      status: "Connected ✅", 
      engine: "Neon HTTP Adapter",
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    return NextResponse.json({ 
      status: "Failed ❌", 
      error: error.message 
    }, { status: 500 });
  }
}