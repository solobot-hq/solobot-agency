import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET — fetch list
export async function GET() {
  try {
    const { userId } = auth();
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const events = await prisma.pulseEvent.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: 50,
    });

    return NextResponse.json(events);
  } catch (error) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

// POST — create event (test/demo)
export async function POST(req: Request) {
  try {
    const { userId } = auth();
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
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
