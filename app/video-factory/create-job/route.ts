import { NextResponse } from 'next/server';
// ✅ FIX 1: Add the missing Clerk import
import { auth } from "@clerk/nextjs/server"; 
// ✅ FIX 2: Use the shared prisma instance
import prisma from '@/lib/prisma';
import { generateProcess } from '@/lib/videoFactory/processor';

export async function POST(request: Request) {
    try {
        // ✅ FIX 3: Await auth() for Next.js 16
        const { userId } = await auth();
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const payload = await request.json();

        if (!payload?.topic) {
            return NextResponse.json({ error: 'Topic is required' }, { status: 400 });
        }
        
        // ✅ FIX 4: Await the database creation
        const job = await prisma.videoJob.create({
            data: {
                userId,
                prompt: payload.topic,
                status: 'processing',
                settings: payload.settings || {},
            }
        });
        
        // ✅ FIX 5: Extract the string ID from the object
        const jobId = job.id; 
        
        // Start the background process using the string ID
        generateProcess(jobId);

        return NextResponse.json({ jobId }, { status: 202 });

    } catch (e: any) {
        console.error("Error queuing job:", e);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}