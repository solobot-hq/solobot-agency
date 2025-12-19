import { randomUUID } from "crypto";
import { uploadFile } from "./r2";
import { spawn } from "child_process";
import fs from "fs";

export async function trimVideo(
  inputUrl: string,
  startSec: number,
  endSec: number
) {
  const jobId = randomUUID();
  const inputPath = `/tmp/${jobId}-input.mp4`;
  const outputPath = `/tmp/${jobId}-trimmed.mp4`;

  // 1. Download original video
  const res = await fetch(inputUrl);
  const buf = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(inputPath, buf);

  // 2. FFmpeg trim
  await new Promise((resolve, reject) => {
    const ffmpeg = spawn("ffmpeg", [
      "-ss",
      String(startSec),
      "-to",
      String(endSec),
      "-i",
      inputPath,
      "-c",
      "copy",
      outputPath,
    ]);

    ffmpeg.on("close", (code) => {
      code === 0 ? resolve(true) : reject(new Error("FFmpeg failed"));
    });
  });

  // 3. Upload trimmed video to R2
  const videoBuf = fs.readFileSync(outputPath);
  const trimmedUrl = await uploadFile(
    videoBuf,
    `trimmed/${jobId}.mp4`,
    "video/mp4"
  );

  // Cleanup
  fs.unlinkSync(inputPath);
  fs.unlinkSync(outputPath);

  return {
    trimmed_url: trimmedUrl,
  };
}
