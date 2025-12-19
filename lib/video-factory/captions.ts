import fs from 'fs/promises';
import path from 'path';
import { getOutputPath, writeStatus } from './storage';
import type { ScriptLine } from './scriptGen';

function fmt(sec: number) {
  const ms = Math.round(sec * 1000);
  const h = Math.floor(ms / 3600000).toString().padStart(2, '0');
  const m = Math.floor((ms % 3600000) / 60000).toString().padStart(2, '0');
  const s = Math.floor((ms % 60000) / 1000).toString().padStart(2, '0');
  const msPart = (ms % 1000).toString().padStart(3, '0');
  return `${h}:${m}:${s},${msPart}`;
}

export async function buildSRT(jobId: string, timings: ScriptLine[]): Promise<{ srtPath: string; total: number; }> {
  await writeStatus(jobId, { status: 'processing', progress: 55 });
  let srt = '';
  let cursor = 0;
  timings.forEach((ln, i) => {
    const start = cursor;
    const end = cursor + ln.duration;
    srt += `${i + 1}\n${fmt(start)} --> ${fmt(end)}\n${ln.text}\n\n`;
    cursor = end;
  });
  const srtPath = getOutputPath(jobId, 'captions.srt');
  await fs.writeFile(srtPath, srt, 'utf-8');
  return { srtPath, total: cursor };
}
