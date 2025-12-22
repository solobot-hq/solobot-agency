// /app/api/video-factory/status/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getJob } from '@/lib/videoFactory/jobs';

export const maxDuration = 10;

// ✅ Define the correct type for Next.js 16
type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(
    request: NextRequest, 
    props: RouteContext
) {
    try {
        // ✅ FIX: Await params here
        const params = await props.params;
        const jobId = params.id;

        if (!jobId) {
            return NextResponse.json({ error: 'Job ID is required' }, { status: 400 });
        }

        const job = await getJob(jobId);

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
    } catch (error) {
        console.error("[JOB_STATUS_ERROR]", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}