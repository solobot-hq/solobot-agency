import fs from 'fs/promises';
import path from 'path';

const STORAGE_ROOT = path.join(process.cwd(), 'public', 'storage');
const RAW = path.join(STORAGE_ROOT, 'raw');
const OUT = path.join(STORAGE_ROOT, 'out');

export type Status = {
  status: 'queued' | 'processing' | 'done' | 'error';
  progress: number;
  files?: { vertical: string; horizontal: string; srt: string; thumb: string; };
  error?: string;
};

export async function createJob(): Promise<string> {
  const id = `vid_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,8)}`;
  await fs.mkdir(path.join(RAW, id), { recursive: true });
  await fs.mkdir(path.join(OUT, id), { recursive: true });
  return id;
}

export function getRawPath(jobId: string, rel: string) {
  return path.join(RAW, jobId, rel);
}
export function getOutputPath(jobId: string, rel: string) {
  return path.join(OUT, jobId, rel);
}
export function getOutputUrl(jobId: string, file: string) {
  return `/storage/out/${jobId}/${file}`;
}
export function publicPath(rel: string) {
  return path.join(process.cwd(), 'public', rel);
}

export async function writeStatus(jobId: string, status: Status) {
  const p = path.join(OUT, jobId, 'status.json');
  await fs.writeFile(p, JSON.stringify(status), 'utf-8');
}

export async function readStatus(jobId: string): Promise<Status | null> {
  try {
    const p = path.join(OUT, jobId, 'status.json');
    const raw = await fs.readFile(p, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return null;
  }
}
