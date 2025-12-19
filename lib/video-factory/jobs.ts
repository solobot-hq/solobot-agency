// /lib/videoFactory/jobs.ts
import { randomUUID } from "crypto";

// --- Types ---
export interface FileLinks {
    vertical: string;
    horizontal: string;
    srt: string;
    thumb: string;
}

export interface Job {
    status: "queued" | "processing" | "done" | "error";
    progress: number;
    files?: FileLinks;
    error?: string;
    payload: any;
    startTime: number;
}

// --- In-Memory Job Map ---
// In a real application, replace this with a persistent database (e.g., Redis or Firestore).
export const jobMap = new Map<string, Job>();

// --- Job Management Functions ---

export function createNewJob(payload: any): string {
    const jobId = randomUUID();
    
    const newJob: Job = {
        status: 'queued',
        progress: 0,
        files: undefined,
        error: undefined,
        payload,
        startTime: Date.now(),
    };
    
    jobMap.set(jobId, newJob);
    return jobId;
}

export function getJob(jobId: string): Job | undefined {
    return jobMap.get(jobId);
}

export function updateJobStatus(jobId: string, updates: Partial<Job>): void {
    const job = jobMap.get(jobId);
    if (job) {
        jobMap.set(jobId, { ...job, ...updates });
    }
}