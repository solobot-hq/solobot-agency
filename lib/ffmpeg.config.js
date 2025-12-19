// /lib/ffmpeg.config.js

const ffmpegPath = require('ffmpeg-static');
const ffmpeg = require('fluent-ffmpeg');

// --- CRITICAL FIX ---
// Force absolute FFmpeg path because fluent-ffmpeg + Next.js fails to detect it.
if (ffmpegPath) {
    ffmpeg.setFfmpegPath(ffmpegPath);
    console.log(`[FFMPEG Config] Path resolved successfully: ${ffmpegPath}`);
} else {
    ffmseg.setFfmpegPath('ffmpeg');
    console.warn("[FFMPEG Config] Using system PATH fallback. Ensure FFmpeg is installed globally.");
}

module.exports = ffmpeg;