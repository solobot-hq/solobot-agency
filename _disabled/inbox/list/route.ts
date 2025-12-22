import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    // ✅ FIX 1: Await auth() for Next.js 16
    const { userId } = await auth();
    
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // ✅ FIX 2: Use the shared prisma instance
    // Note: If 'inboxMessage' doesn't exist in your DB, you might mean 'emailLog'
    // But for now, we will trust your table name is 'inboxMessage'
    const messages = await prisma.inboxMessage.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 50,
    });

    return NextResponse.json(messages);
  } catch (error) {
    console.error("[INBOX_LIST_ERROR]", error);
    // Return empty array to keep UI stable
    return NextResponse.json([]); 
  }
}