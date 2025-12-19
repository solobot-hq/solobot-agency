// /worker/renderWorker.mjs

import { 
    jobMap, 
    getJobById, 
    updateJobStatus 
} from '../utils/renderQueue.js'; // Assuming utility is compiled or available as JS

import { generateScript } from './aiScriptGenerator.mjs'; // NEW: Import AI generator

// Simulate AI/API response times (We keep this for other stages)
const STAGE_DELAY_MS = 1500;

// Utility for pausing execution
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// The main processing function for a single job
async function processJob(jobId) {
    let job = getJobById(jobId);
    if (!job) return console.error(`Worker: Job ${jobId} not found.`);

    console.log(`Worker: Starting job ${jobId} for topic: "${job.input.topic}"`);
    
    // --- STAGE 1: Script Generation (REAL AI CALL) ---
    const stage1 = 'Generating AI Script... (1/4)';
    job = updateJobStatus(jobId, 'processing', stage1);
    
    try {
        // *** REAL AI SCRIPT GENERATION CALL ***
        const realScript = await generateScript(job.input);
        // ***************************************

        // Save real script result
        updateJobStatus(jobId, 'processing', stage1, { script: realScript });
        console.log(`Worker: Stage 1 Complete. Script Ready. Title: ${realScript.videoTitle}`);

    } catch (error) {
        updateJobStatus(jobId, 'error', 'Error during Script Generation', {
            error: error.message
        });
        return console.error(`Worker: Job ${jobId} failed at script generation: ${error.message}`);
    }

    // --- STAGE 2: Asset Search & Download (Still Mocked) ---
    const stage2 = 'Searching and downloading stock footage... (2/4)';
    job = updateJobStatus(jobId, 'processing', stage2);
    await sleep(STAGE_DELAY_MS * 2);

    // Mock Asset Data (Will use the real script in Phase 4)
    const mockAssets = {
        videoClips: [`/assets/${jobId}/clip-A.mp4`, `/assets/${jobId}/clip-B.mp4`],
        bgMusic: `/assets/${jobId}/track-123.mp3`
    };
    
    updateJobStatus(jobId, 'processing', stage2, { assets: mockAssets });
    console.log(`Worker: Stage 2 Complete. ${mockAssets.videoClips.length} assets downloaded.`);

    
    // --- STAGE 3: Audio (TTS) Generation (Still Mocked) ---
    const stage3 = 'Generating AI Voiceover (TTS)... (3/4)';
    job = updateJobStatus(jobId, 'processing', stage3);
    await sleep(STAGE_DELAY_MS);

    // Mock Audio Data
    const mockAudio = {
        audioTrack: `/assets/${jobId}/voice-over.mp3`,
        subtitles: `/assets/${jobId}/subtitles.srt`
    };

    updateJobStatus(jobId, 'processing', stage3, { audio: mockAudio });
    console.log(`Worker: Stage 3 Complete. Audio ready.`);


    // --- STAGE 4: Video Assembly (FFmpeg/Remotion - Still Mocked) ---
    const stage4 = 'Assembling and rendering final video... (4/4)';
    job = updateJobStatus(jobId, 'processing', stage4);
    await sleep(STAGE_DELAY_MS * 3); 

    // Mock Final Result
    const finalResult = {
        videoUrl: `https://mock-cdn.com/videos/${jobId}.mp4`,
        thumbnailUrl: `https://mock-cdn.com/thumbs/${jobId}.jpg`,
        captionsUrl: `https://mock-cdn.com/captions/${jobId}.srt`,
    };

    // --- FINAL: Completion ---
    updateJobStatus(jobId, 'done', 'Render Complete', { result: finalResult });
    console.log(`Worker: Job ${jobId} successfully finished. URL: ${finalResult.videoUrl}`);
}

// ... (startWorker function remains the same as previous step) ...
async function startWorker() {
    console.log("Worker: Starting up...");
    
    setInterval(() => {
        let jobToStart = null;
        
        for (const job of jobMap.values()) {
            if (job.status === 'queued') {
                jobToStart = job;
                break; 
            }
        }

        if (jobToStart) {
            updateJobStatus(jobToStart.jobId, 'processing', 'Job picked up by worker...'); 
            processJob(jobToStart.jobId);
        }
    }, 1000); 
}

if (import.meta.url === `file://${process.argv[1]}`) {
    startWorker();
}

export { startWorker, processJob };