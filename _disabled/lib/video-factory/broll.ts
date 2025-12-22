import fs from 'fs/promises';
import path from 'path';
import axios from 'axios';
import { createClient } from 'pexels';
import { writeStatus, getRawPath } from './storage';

type Clip = { path: string; duration?: number };

export async function fetchBroll(jobId: string, topic: string, style: string): Promise<{ clips: Clip[]; listFile: string; }> {
  if (!process.env.PEXELS_API_KEY) throw new Error('PEXELS_API_KEY missing');
  await writeStatus(jobId, { status: 'processing', progress: 40 });

  const client = createClient(process.env.PEXELS_API_KEY);
  const query = `${topic} ${style}`.trim() || 'business agency';
  const res = await client.videos.search({ query, per_page: 5, orientation: 'portrait' });

  const videos = (res as any)?.videos || [];
  if (!videos.length) throw new Error('No Pexels videos found for query');

  const rawDir = getRawPath(jobId, '');
  const clips: Clip[] = [];

  for (let i = 0; i < Math.min(5, videos.length); i++) {
    const file = videos[i].video_files?.find((vf: any) => vf.width >= 720) || videos[i].video_files?.[0];
    if (!file?.link) continue;
    const url = file.link;
    const target = path.join(rawDir, `clip_${i}.mp4`);
    const resp = await axios.get<ArrayBuffer>(url, { responseType: 'arraybuffer' });
    await fs.writeFile(target, Buffer.from(resp.data));
    clips.push({ path: target, duration: videos[i].duration });
  }

  if (!clips.length) throw new Error('Failed to download any b-roll clips');

  const listFile = path.join(rawDir, 'broll_list.txt');
  await fs.writeFile(listFile, clips.map(c => `file '${c.path.replace(/'/g, "'\\''")}'`).join('\n'));

  return { clips, listFile };
}
