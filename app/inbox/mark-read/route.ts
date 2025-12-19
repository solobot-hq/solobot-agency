import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { userId } = auth();
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
      // (updateMany returns count, simple update throws if not found)
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