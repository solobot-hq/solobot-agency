// /app/api/video-factory/status/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getJob } from '@/lib/videoFactory/jobs';

// Set max duration low, as this route must return quickly
export const maxDuration = 10;

export async function GET(
    request: NextRequest, 
    { params }: { params: { id: string } }
) {
    const jobId = params.id;

    if (!jobId) {
        return NextResponse.json({ error: 'Job ID is required' }, { status: 400 });
    }

    const job = getJob(jobId);

    if (!job) {
        return NextResponse.json({ error: 'Job not found' }, { status: 404 });
    }

    // Structure the response based on job status
    const response: any = {
        status: job.status,
        progress: job.progress,
    };

    if (job.status === 'done' && job.files) {
        response.files = job.files;
    } else if (job.status === 'error' && job.error) {
        response.error = job.error;
    }

    return NextResponse.json(response);
}