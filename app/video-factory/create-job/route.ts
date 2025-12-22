// /app/api/video-factory/create-job/route.ts
import { NextResponse } from 'next/server';
import { auth } from "@clerk/nextjs/server";
import { createNewJob } from '@/lib/videoFactory/jobs';
import { generateProcess } from '@/lib/videoFactory/generation';

// Set max duration low, as this route must return quickly
export const maxDuration = 10; 

export async function POST(request: Request) {
    try {
        // 1. Security Check (Next.js 16 requires await for auth)
        const { userId } = await auth();
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const payload = await request.json();

        if (!payload?.topic) {
            return NextResponse.json({ error: 'Topic is required' }, { status: 400 });
        }
        
        // 2. Create Job and get ID
        // ✅ FIX: Added await here so jobId is a string, not a Promise
        const jobId = await createNewJob({ ...payload, userId });
        
        // 3. Start the asynchronous generation process
        // Now that jobId is a real string, this will no longer throw a Type Error
        generateProcess(jobId);

        return NextResponse.json({ jobId }, { status: 202 });

    } catch (e: any) {
        console.error("Error queuing job:", e);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}