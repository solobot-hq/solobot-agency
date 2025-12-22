import fs from 'fs/promises';
import path from 'path';
import { execFile } from 'child_process';
import { promisify } from 'util';
import ffmpegPath from 'ffmpeg-static';
import { writeStatus, getRawPath } from './storage';
import type { ScriptLine } from './scriptGen';

const execFileP = promisify(execFile);

async function ffprobeDuration(file: string): Promise<number> {
  const { stdout } = await execFileP('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'default=nw=1:nk=1', file]);
  const dur = parseFloat(stdout.trim());
  return isNaN(dur) ? 0 : dur;
}

export async function synthesizeLine(text: string, voiceId: string, apiKey: string): Promise<Buffer> {
  // ElevenLabs TTS v1 text-to-speech
  const url = `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'xi-api-key': apiKey,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      text,
      voice_settings: { stability: 0.5, similarity_boost: 0.75 },
      model_id: 'eleven_multilingual_v2',
      output_format: 'mp3_44100_128'
    })
  });
  if (!res.ok) {
    const errTxt = await res.text();
    throw new Error(`ElevenLabs failed: ${res.status} ${errTxt}`);
  }
  const arr = await res.arrayBuffer();
  return Buffer.from(arr);
}

export async function generateVO(jobId: string, lines: ScriptLine[]): Promise<{ timings: ScriptLine[]; voPath: string; }> {
  if (!process.env.ELEVENLABS_API_KEY) throw new Error('ELEVENLABS_API_KEY missing');
  const VOICE_ID = process.env.ELEVENLABS_VOICE_ID || '21m00Tcm4TlvDq8ikWAM'; // default voice (Rachel) if not set

  await writeStatus(jobId, { status: 'processing', progress: 25 });

  const rawDir = getRawPath(jobId, '');
  const pieces: string[] = [];
  let current = 0;
  const timings: ScriptLine[] = [];

  for (let i = 0; i < lines.length; i++) {
    const buf = await synthesizeLine(lines[i].text, VOICE_ID, process.env.ELEVENLABS_API_KEY!);
    const piece = path.join(rawDir, `vo_${i}.mp3`);
    await fs.writeFile(piece, buf);
    const dur = await ffprobeDuration(piece);
    timings.push({ text: lines[i].text, duration: dur || lines[i].duration });
    pieces.push(piece);
  }

  // Concat with ffmpeg via concat demuxer
  const listFile = path.join(rawDir, 'vo_list.txt');
  await fs.writeFile(listFile, pieces.map(p => `file '${p.replace(/'/g, "'\\''")}'`).join('\n'));
  const out = path.join(rawDir, 'vo.mp3');
  await execFileP(ffmpegPath as string, ['-y', '-f', 'concat', '-safe', '0', '-i', listFile, '-c', 'copy', out]);

  // Compute running timestamps
  current = 0;
  for (const t of timings) {
    (t as any).timestamp = current;
    current += t.duration;
  }

  return { timings, voPath: out };
}
