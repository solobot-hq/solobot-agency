// /lib/videoFactory/generation.ts
import { jobMap, updateJobStatus } from "./jobs";
import { generateFakeSignedUrl, uploadFilePlaceholder } from "./upload";

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// --- Fake Content Generation ---

async function generateScript(payload: any): Promise<string> {
    await sleep(500); // Simulate network latency
    return `Generated script about ${payload.topic} for ${payload.style} video in ${payload.tone} tone. Duration: ${payload.duration}s.`;
}

async function generateAndUploadAssets(jobId: string, script: string): Promise<any> {
    // Simulate asset creation and upload times
    const baseKey = `videos/${jobId}`;

    // 1. Fake Asset Buffers
    const verticalBuffer = Buffer.from(`Vertical MP4 content for ${jobId} - ${script}`);
    const horizontalBuffer = Buffer.from(`Horizontal MP4 content for ${jobId} - ${script}`);
    const captionsBuffer = Buffer.from(`SRT captions for ${jobId}`);
    const thumbBuffer = Buffer.from(`JPEG thumbnail for ${jobId}`);

    // 2. Upload and Get URLs
    const [verticalKey, horizontalKey, srtKey, thumbKey] = await Promise.all([
        uploadFilePlaceholder(verticalBuffer, `${baseKey}/vertical.mp4`),
        uploadFilePlaceholder(horizontalBuffer, `${baseKey}/horizontal.mp4`),
        uploadFilePlaceholder(captionsBuffer, `${baseKey}/captions.srt`),
        uploadFilePlaceholder(thumbBuffer, `${baseKey}/thumbnail.jpg`),
    ]);

    // 3. Generate Signed URLs (Placeholder logic)
    const [verticalUrl, horizontalUrl, srtUrl, thumbUrl] = await Promise.all([
        generateFakeSignedUrl(verticalKey),
        generateFakeSignedUrl(horizontalKey),
        generateFakeSignedUrl(srtKey),
        generateFakeSignedUrl(thumbKey),
    ]);

    return {
        vertical: verticalUrl,
        horizontal: horizontalUrl,
        srt: srtUrl,
        thumb: thumbUrl,
    };
}

// --- Main Generation Process ---

export async function generateProcess(jobId: string): Promise<void> {
    const job = jobMap.get(jobId);
    if (!job) return;

    try {
        // Start: Processing (10%)
        updateJobStatus(jobId, { status: 'processing', progress: 10 });
        await sleep(500);

        // Step 1: Script Generation (30%)
        const finalScript = job.payload.script_override || await generateScript(job.payload);
        updateJobStatus(jobId, { progress: 30 });
        await sleep(1000);

        // Step 2: Video & Asset Generation (60%)
        // This is where real video generation would run
        updateJobStatus(jobId, { progress: 60 });
        await sleep(2000);

        // Step 3: Upload Assets (90%)
        const uploadedFiles = await generateAndUploadAssets(jobId, finalScript);
        updateJobStatus(jobId, { progress: 90 });
        await sleep(500);

        // Done (100%)
        updateJobStatus(jobId, { status: 'done', progress: 100, files: uploadedFiles });

    } catch (e: any) {
        console.error(`Job ${jobId} failed:`, e);
        updateJobStatus(jobId, { 
            status: 'error', 
            progress: 0, 
            error: e.message || "Fake video generation process failed." 
        });
    }
}