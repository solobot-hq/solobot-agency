import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
// ✅ FIX 1: Import the shared prisma instance
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    // ✅ FIX 2: Await auth() for Next.js 16
    const { userId } = await auth();
    
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { id } = await req.json();

    if (!id) {
      return new NextResponse("Message ID required", { status: 400 });
    }

    // Handle "Mark All Read"
    if (id === 'all') {
      await prisma.inboxMessage.updateMany({
        where: { 
          userId, 
          isRead: false 
        },
        data: { isRead: true },
      });
    } 
    // Handle Single Message Read
    else {
      // Use updateMany with userId filter to ensure user owns the message
      await prisma.inboxMessage.updateMany({
        where: { 
          id, 
          userId 
        },
        data: { isRead: true },
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[INBOX_MARK_READ_ERROR]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}