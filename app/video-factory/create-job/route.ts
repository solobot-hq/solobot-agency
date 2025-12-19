// /app/api/video-factory/create-job/route.ts
import { NextResponse } from 'next/server';
import { createNewJob } from '@/lib/videoFactory/jobs';
import { generateProcess } from '@/lib/videoFactory/generation';

// Set max duration low, as this route must return quickly
export const maxDuration = 10; 

export async function POST(request: Request) {
    try {
        const payload = await request.json();

        if (!payload?.topic) {
            return NextResponse.json({ error: 'Topic is required' }, { status: 400 });
        }
        
        // 1. Create Job and get ID
        const jobId = createNewJob(payload);
        
        // 2. Start the asynchronous generation process
        // Note: We deliberately do not await this function to keep the API fast.
        generateProcess(jobId);

        return NextResponse.json({ jobId }, { status: 202 });

    } catch (e: any) {
        console.error("Error queuing job:", e);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}