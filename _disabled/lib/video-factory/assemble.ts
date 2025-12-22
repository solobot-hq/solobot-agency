import { execFile } from 'child_process';
import { promisify } from 'util';
import path from 'path';
import fs from 'fs/promises';
import { getOutputPath, getOutputUrl, writeStatus, publicPath } from './storage';

const execFileP = promisify(execFile);

// ✅ Force system ffmpeg path fallback (Uses environment variable or hardcoded path)
const ffmpegPath =
  process.env.FFMPEG_PATH ||
  'C:\\Program Files\\ffmpeg\\bin\\ffmpeg.exe';

// Helper to safely format total duration
const formatDuration = (dur: number) => Math.max(0.1, dur).toFixed(2);

export async function assemble(jobId: string, opts: {
  brollList: string;
  srtPath: string;
  voPath: string;
  totalDur: number;
}) {
  await writeStatus(jobId, { status: 'processing', progress: 70 });

  const brandPrimary = process.env.BRAND_PRIMARY || '#10b981';
  const logo = publicPath('sl.png');
  const music = publicPath('assets/music/bed01.mp3');

  const outV = getOutputPath(jobId, 'final_1080x1920.mp4');
  const outH = getOutputPath(jobId, 'final_1920x1080.mp4');
  const thumb = getOutputPath(jobId, 'thumb.jpg');

  // ----------------------------------------------------------------------
  // VERTICAL (1080x1920)
  // ----------------------------------------------------------------------
  // Input Indices: 0: B-roll, 1: VO Audio, 2: Logo Image, 3: Music Audio
  const vfilter = [
    // 1. Scaling and cropping the main video stream [0:v]
    `[0:v]scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,setsar=1[v]`,
    // 2. Draw Progress Bar at the bottom
    `[v]drawbox=x=0:y=H-16:w='min(W*(t/${formatDuration(opts.totalDur)}),W)':h=12:color=${brandPrimary}:t=fill[v1]`,
    // 3. Burn Subtitles (White text, Inter font)
    `[v1]subtitles=${opts.srtPath.replace(/:/g,'\\:')}:force_style='FontName=Inter,FontSize=48,PrimaryColour=&H00FFFFFF&'[v2]`,
    // 4. Overlay Logo (Input [2:v]) near the bottom right
    `[v2][2:v]overlay=W-w-24:H-h-24[vout]`
  ].join(';');

  const cmdV = [
    '-y',
    '-f', 'concat', '-safe', '0', '-i', opts.brollList,        // 0: Video
    '-i', opts.voPath,                                         // 1: VO Audio
    '-i', logo,                                                // 2: Logo Image
    '-i', music,                                               // 3: Music Bed Audio
    '-filter_complex', `${vfilter};[1:a]volume=1.0[a1];[3:a]volume=0.2[a2];[a1][a2]amix=inputs=2:duration=first:dropout_transition=2[aout]`,
    '-map', '[vout]', '-map', '[aout]',
    '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '22',
    '-c:a', 'aac', '-shortest',
    outV
  ];

  await execFileP(ffmpegPath, cmdV);

  // ----------------------------------------------------------------------
  // HORIZONTAL (1920x1080)
  // ----------------------------------------------------------------------
  const hfilter = [
    // 1. Scaling and cropping the main video stream [0:v]
    `[0:v]scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080,setsar=1[v]`,
    // 2. Draw Progress Bar at the bottom
    `[v]drawbox=x=0:y=H-16:w='min(W*(t/${formatDuration(opts.totalDur)}),W)':h=12:color=${brandPrimary}:t=fill[v1]`,
    // 3. Burn Subtitles
    `[v1]subtitles=${opts.srtPath.replace(/:/g,'\\:')}:force_style='FontName=Inter,FontSize=40,PrimaryColour=&H00FFFFFF&'[v2]`,
    // 4. Overlay Logo (Input [2:v]) near the bottom right
    `[v2][2:v]overlay=W-w-24:H-h-24[vout]`
  ].join(';');

  const cmdH = [
    '-y',
    '-f', 'concat', '-safe', '0', '-i', opts.brollList,        // 0: Video
    '-i', opts.voPath,                                         // 1: VO Audio
    '-i', logo,                                                // 2: Logo Image
    '-i', music,                                               // 3: Music Bed Audio
    '-filter_complex', `${hfilter};[1:a]volume=1.0[a1];[3:a]volume=0.2[a2];[a1][a2]amix=inputs=2:duration=first:dropout_transition=2[aout]`,
    '-map', '[vout]', '-map', '[aout]',
    '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '22',
    '-c:a', 'aac', '-shortest',
    outH
  ];

  await execFileP(ffmpegPath, cmdH);

  // Thumbnail
  await execFileP(ffmpegPath, ['-y', '-i', outV, '-ss', '00:00:01.000', '-vframes', '1', thumb]);

  // ----------------------------------------------------------------------
  // FINAL STATUS UPDATE
  // ----------------------------------------------------------------------
  await writeStatus(jobId, {
    status: 'done',
    progress: 100,
    files: {
      vertical: getOutputUrl(jobId, 'final_1080x1920.mp4'),
      horizontal: getOutputUrl(jobId, 'final_1920x1080.mp4'),
      srt: getOutputUrl(jobId, 'captions.srt'),
      thumb: getOutputUrl(jobId, 'thumb.jpg'),
    }
  });
}