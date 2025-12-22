import { NextRequest, NextResponse } from "next/server";
import { getJobStatus } from "@/lib/videoFactory";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const job_id = searchParams.get("job_id");

    if (!job_id) {
      return NextResponse.json(
        { error: "Job ID is required" },
        { status: 400 }
      );
    }

    const job = getJobStatus(job_id);

    if (!job) {
      return NextResponse.json(
        { error: "Job not found" },
        { status: 404 }
      );
    }

    if (job.status === "done") {
      return NextResponse.json({
        status: job.status,
        progress: 100,
        files: job.files,
      });
    }

    if (job.status === "error") {
      return NextResponse.json(
        {
          status: job.status,
          progress: 0,
          error: job.error,
        },
        { status: 500 }
      );
    }

    // queued or processing
    return NextResponse.json({
      status: job.status,
      progress: job.progress,
    });
  } catch (e) {
    return NextResponse.json(
      { error: "Internal error" },
      { status: 500 }
    );
  }
}
