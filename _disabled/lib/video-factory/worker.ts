// /lib/video-factory/worker.ts

import { writeStatus } from './storage';
import { generateScript } from './scriptGen';
import { generateVO } from './tts';
import { fetchBroll } from './broll'; 
import { buildSRT } from './captions';
import { assemble } from './assemble';
import ffmpeg from 'fluent-ffmpeg';

// --- FFMPEG GLOBAL PATH SETUP (CRITICAL FIX) ---
if (process.env.FFMPEG_PATH) {
    ffmpeg.setFfmpegPath(process.env.FFMPEG_PATH);
} else {
    ffmpeg.setFfmpegPath('ffmpeg'); 
    console.warn("[FFMPEG] Using system path fallback ('ffmpeg'). Ensure it's installed and in your OS PATH.");
}
// ---------------------------------------------


export async function startPipeline(jobId: string, payload: any) {
    try {
        await writeStatus(jobId, { status: 'processing', progress: 5 });
        
        const script = await generateScript(jobId, payload.topic, payload.style, payload.tone, payload.script_override);
        
        await writeStatus(jobId, { status: 'processing', progress: 20 });
        
        const { timings, voPath } = await generateVO(jobId, script.lines);
        await writeStatus(jobId, { status: 'processing', progress: 40 });
        const totalAudioDuration = timings.reduce((sum, line) => sum + line.duration, 0);

        const { listFile } = await fetchBroll(jobId, payload.topic, payload.style); 
        await writeStatus(jobId, { status: 'processing', progress: 60 });
        
        const { srtPath } = await buildSRT(jobId, timings);
        await writeStatus(jobId, { status: 'processing', progress: 75 });
        
        await assemble(jobId, {
            brollList: listFile, 
            srtPath: srtPath, 
            voPath: voPath, 
            totalDur: totalAudioDuration 
        });
        
    } catch (e:any) {
        await writeStatus(jobId, { status: 'error', progress: 0, error: e?.message || 'Pipeline failed' });
        throw e;
    }
}