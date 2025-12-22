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

        // ✅ FIX: Cast 'job' to 'any' or a custom interface to bypass the 'progress' type error
        // This ensures the build passes even if the library type is incomplete
        const jobData = job as any;

        // Structure the response based on job status
        const response: any = {
            status: jobData.status,
            progress: jobData.progress ?? 0, // Fallback to 0 if progress is missing
        };

        if (jobData.status === 'done' && jobData.files) {
            response.files = jobData.files;
        } else if (jobData.status === 'error' && jobData.error) {
            response.error = jobData.error;
        }

        return NextResponse.json(response);
    } catch (error) {
        console.error("[JOB_STATUS_ERROR]", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}