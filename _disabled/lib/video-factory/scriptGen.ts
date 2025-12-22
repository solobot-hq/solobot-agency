import OpenAI from 'openai';
import { writeStatus } from './storage';

export type ScriptLine = { text: string; duration: number; };
export type GeneratedScript = { title: string; lines: ScriptLine[]; };

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function generateScript(jobId: string, topic: string, style: string, tone: string, scriptOverride?: string): Promise<GeneratedScript> {
  await writeStatus(jobId, { status: 'processing', progress: 10 });
  if (scriptOverride && scriptOverride.trim().length > 0) {
    const lines = scriptOverride.split(/\r?\n/).filter(l => l.trim() !== '');
    return {
      title: topic,
      lines: lines.map(t => ({ text: t.trim(), duration: Math.max(1.5, t.split(/\s+/).length / 4.5) })),
    };
  }
  if (!process.env.OPENAI_API_KEY) throw new Error('OPENAI_API_KEY missing');
  const system = `You write tight, punchy 15–60s short-form scripts.\nStructure 5–7 lines: Hook -> Problem -> Solution -> Proof -> CTA.\nKeep it high-signal, on-brand, no timestamps.`;
  const prompt = `Topic: ${topic}\nStyle: ${style}\nTone: ${tone}\nWrite the lines only, each on a new line.`;
  const res = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: system },
      { role: 'user', content: prompt },
    ],
    temperature: 0.8,
  });
  const content = res.choices?.[0]?.message?.content || '';
  const lines = content.split(/\r?\n/).map(s => s.trim()).filter(Boolean);
  if (lines.length < 3) throw new Error('Script generation returned too few lines');
  return {
    title: topic,
    lines: lines.map(t => ({ text: t, duration: Math.max(1.5, t.split(/\s+/).length / 4.5) })),
  };
}
