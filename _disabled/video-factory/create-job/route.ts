import { NextResponse } from 'next/server';
import { auth } from "@clerk/nextjs/server"; 
import prisma from '@/lib/prisma';
// ✅ FIX: Corrected filename from 'processor' to 'generation'
import { generateProcess } from '@/lib/videoFactory/generation';

export async function POST(request: Request) {
    try {
        // 1. Clerk Auth (Next.js 16 requires await)
        const { userId } = await auth();
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const payload = await request.json();

        if (!payload?.topic) {
            return NextResponse.json({ error: 'Topic is required' }, { status: 400 });
        }
        
        // 2. Create the job in the database
        const job = await prisma.videoJob.create({
            data: {
                userId,
                prompt: payload.topic,
                status: 'processing',
                settings: payload.settings || {},
            }
        });
        
        // 3. Extract the string ID and start the background process
        const jobId = job.id; 
        generateProcess(jobId);

        return NextResponse.json({ jobId }, { status: 202 });

    } catch (e: any) {
        console.error("Error queuing job:", e);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}