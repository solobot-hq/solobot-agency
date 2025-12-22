import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
// ✅ FIX 1: Import the shared prisma instance
import prisma from "@/lib/prisma";

// GET — fetch list
export async function GET() {
  try {
    // ✅ FIX 2: Await auth() for Next.js 16 compatibility
    const { userId } = await auth();
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const events = await prisma.pulseEvent.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: 50,
    });

    return NextResponse.json(events);
  } catch (error) {
    console.error("[PULSE_GET_ERROR]:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

// POST — create event (test/demo)
export async function POST(req: Request) {
  try {
    // ✅ FIX 3: Await auth() for Next.js 16 compatibility
    const { userId } = await auth();
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const body = await req.json();
    const { title, message, type } = body;

    const event = await prisma.pulseEvent.create({
      data: {
        userId,
        title: title || "System Alert",
        message: message || "Background event triggered.",
        type: type || "SYSTEM",
      },
    });

    return NextResponse.json(event);
  } catch (error) {
    console.error("[PULSE_POST_ERROR]:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}