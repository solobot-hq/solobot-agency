// lib/videoFactory/jobs.ts
export async function createNewJob(data: any) {
  return { id: "stub_job_123" };
}

export async function getJob(id: string) {
  return { status: "completed", resultUrl: "" };
}