import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
// ✅ FIX 1: Import shared prisma instance
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    // ✅ FIX 2: Await auth() for Next.js 16
    const { userId } = await auth();
    
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { sender, subject, body } = await req.json();

    if (!subject || !body) {
        return new NextResponse("Missing fields", { status: 400 });
    }

    const message = await prisma.inboxMessage.create({
      data: {
        userId,
        sender: sender || "System Notification",
        subject,
        body,
        isRead: false,
      },
    });

    return NextResponse.json(message);
  } catch (error) {
    console.error("[INBOX_SEND_ERROR]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}