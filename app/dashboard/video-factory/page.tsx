"use client";

import React, { useState, useCallback, useEffect } from "react";
import {
  Send,
  Loader2,
  PlayCircle,
  Download,
  FileText,
  LayoutList,
} from "lucide-react";

type GenerationInput = {
  topic: string;
  style: string;
  platform: string;
  tone: string;
  duration: number;
  script_override: string;
};

type FileLinks = {
  vertical: string;
  horizontal: string;
  srt: string;
  thumb: string;
};

type JobStatus = {
  status: "queued" | "processing" | "done" | "error";
  progress: number;
  files?: FileLinks;
  error?: string;
};

const STYLES = ["Tutorial", "Short Ad", "Explainer", "Testimonial", "Case Study"];
const PLATFORMS = ["TikTok", "Reels", "Shorts", "LinkedIn"];
const TONES = ["Urgent", "Conversational", "Professional", "Humorous"];

const initialInput: GenerationInput = {
  topic: "",
  style: STYLES[0],
  platform: PLATFORMS[0],
  tone: TONES[0],
  duration: 30,
  script_override: "",
};

export default function VideoFactoryPage() {
  const [input, setInput] = useState<GenerationInput>(initialInput);
  const [jobId, setJobId] = useState<string | null>(null);
  const [status, setStatus] = useState<JobStatus>({
    status: "queued",
    progress: 0,
  });
  const [isGenerating, setIsGenerating] = useState(false);

  const [trimStart, setTrimStart] = useState(0);
  const [trimEnd, setTrimEnd] = useState(initialInput.duration);
  const [trimmedUrl, setTrimmedUrl] = useState<string | null>(null);
  const [isTrimming, setIsTrimming] = useState(false);
  const [trimError, setTrimError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: type === "number" ? parseInt(value, 10) : value,
    }));
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isGenerating) return;

    setIsGenerating(true);
    setStatus({ status: "queued", progress: 0 });
    setJobId(null);
    setTrimmedUrl(null);

    const prompt = `Video Generation Job: Topic: ${input.topic}. Style: ${input.style}. Platform: ${input.platform}. Duration: ${input.duration}s. Script Override: ${input.script_override || "None"}.`;

    const res = await fetch("/api/video-factory/render", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    if (res.status !== 202) {
      const err = await res.json().catch(() => ({}));
      setStatus({
        status: "error",
        progress: 0,
        error: err?.error || `Status ${res.status}`,
      });
      setIsGenerating(false);
      return;
    }

    const data = await res.json();
    setJobId(data.job_id);
  };

  const poll = useCallback(async () => {
    if (!jobId) return;

    try {
      const res = await fetch(`/api/video-factory/status?job_id=${jobId}`);
      const data: JobStatus = await res.json();

      setStatus(data);

      if (data.status === "done" || data.status === "error") {
        setIsGenerating(false);
        if (data.status === "done" && input.duration) {
          setTrimEnd(input.duration);
        }
      } else {
        setTimeout(poll, 2500);
      }
    } catch {
      setStatus({ status: "error", progress: 0, error: "Polling failed" });
      setIsGenerating(false);
    }
  }, [jobId, input.duration]);

  useEffect(() => {
    if (jobId) poll();
  }, [jobId, poll]);

  const handleTrim = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status.status !== "done" || !status.files?.vertical || isTrimming) return;

    if (trimStart < 0 || trimEnd > input.duration || trimStart >= trimEnd) {
      setTrimError(`Invalid times. Start must be less than End, and both within 0-${input.duration}s.`);
      setTrimmedUrl(null);
      return;
    }

    setIsTrimming(true);
    setTrimError(null);
    setTrimmedUrl(null);

    await new Promise((r) => setTimeout(r, 500));

    const mockTrimmedUrl = status.files.vertical + "#trim=" + trimStart + "-" + trimEnd;
    setTrimmedUrl(mockTrimmedUrl);

    setIsTrimming(false);
  };

  const DownloadButton = ({
    href,
    label,
    icon,
  }: {
    href: string;
    label: string;
    icon: React.ReactNode;
  }) => (
    <a
      href={href}
      download
      className="flex items-center justify-center p-3 text-sm font-medium text-white bg-green-700 rounded-md hover:bg-green-600 transition-all transform hover:scale-[1.02] shadow-md"
    >
      {icon}
      {label}
    </a>
  );

  const VideoPreview = ({ files }: { files?: FileLinks }) =>
    files?.vertical ? (
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-200 mb-3">
          Video Preview (Vertical)
        </h3>

        <div className="bg-black aspect-[9/16] max-w-sm mx-auto rounded-lg overflow-hidden border border-gray-700 shadow-lg shadow-black/40 ring-2 ring-inset ring-gray-700/50">
          <video
            controls
            width="100%"
            poster={files.thumb}
            key={files.vertical}
          >
            <source src={files.vertical} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        {status.status === "done" && (
          <div className="mt-8 pt-4 border-t border-gray-700/70">
            <h3 className="text-lg font-semibold text-gray-200 mb-3">
              Video Trimmer
            </h3>

            <form onSubmit={handleTrim} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="trimStart"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    Start Time (0s)
                  </label>
                  <input
                    type="number"
                    id="trimStart"
                    value={trimStart}
                    onChange={(e) => setTrimStart(parseInt(e.target.value))}
                    min={0}
                    max={trimEnd}
                    step="1"
                    required
                    className="w-full p-2 border border-gray-700 rounded-md bg-gray-900 text-gray-200 focus:ring-green-500 focus:border-green-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="trimEnd"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    End Time ({input.duration}s max)
                  </label>
                  <input
                    type="number"
                    id="trimEnd"
                    value={trimEnd}
                    onChange={(e) => setTrimEnd(parseInt(e.target.value))}
                    min={trimStart + 1}
                    max={input.duration}
                    step="1"
                    required
                    className="w-full p-2 border border-gray-700 rounded-md bg-gray-900 text-gray-200 focus:ring-green-500 focus:border-green-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isTrimming || trimStart >= trimEnd}
                className={`w-full flex items-center justify-center py-3 px-4 rounded-md shadow-lg text-sm font-medium text-white transition-all transform duration-200 ${
                  isTrimming || trimStart >= trimEnd
                    ? "bg-green-500/50 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700 shadow-green-500/30 hover:shadow-lg"
                }`}
              >
                {isTrimming ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" /> Trimming...
                  </>
                ) : (
                  <>
                    <LayoutList className="w-5 h-5 mr-2" /> Trim Video
                  </>
                )}
              </button>

              {trimError && (
                <p className="text-xs text-red-500 text-center">{trimError}</p>
              )}
            </form>
          </div>
        )}

        {trimmedUrl && (
          <div className="mt-6 pt-4 border-t border-gray-700/70">
            <h3 className="text-lg font-semibold text-gray-200 mb-3">
              Trimmed Result
            </h3>

            <div className="bg-black aspect-[9/16] max-w-sm mx-auto rounded-lg overflow-hidden border border-gray-700 shadow-lg shadow-black/40 ring-2 ring-inset ring-gray-700/50">
              <video
                controls
                autoPlay
                width="100%"
                key={trimmedUrl}
                src={trimmedUrl}
              ></video>
            </div>

            <div className="mt-3 text-center">
              <a
                href={trimmedUrl}
                download="trimmed_video.mp4"
                className="inline-flex items-center justify-center p-3 text-sm font-medium text-white bg-green-700 rounded-md hover:bg-green-600 transition-all shadow-md"
              >
                <Download className="w-4 h-4 mr-2" /> Download Trimmed
              </a>
            </div>
          </div>
        )}
      </div>
    ) : null;

  const renderStatus = () => {
    const indicatorColor =
      status.status === "queued"
        ? "text-yellow-400"
        : status.status === "processing"
        ? "text-blue-400"
        : status.status === "done"
        ? "text-green-400"
        : "text-red-500";

    const text =
      status.status === "queued"
        ? "Job queued..."
        : status.status === "processing"
        ? `Processing (${status.progress}%)`
        : status.status === "done"
        ? "Video ready!"
        : `Error: ${status.error || "Unknown error"}`;

    return (
      <div className="space-y-4 p-6 bg-gray-800 rounded-lg shadow-xl animate-fade-in">
        <h2 className={`text-xl font-bold ${indicatorColor} flex items-center`}>
          {status.status === "done" || status.status === "error" ? (
            <LayoutList className="w-6 h-6 mr-2" />
          ) : (
            <Loader2 className="w-6 h-6 mr-2 animate-spin" />
          )}
          {text}
        </h2>

        {status.status === "processing" && (
          <div className="w-full bg-gray-700 rounded-full h-2.5">
            <div
              className="bg-green-500 h-2.5 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${status.progress}%` }}
            />
          </div>
        )}

        {status.status === "done" && status.files && (
          <div className="grid grid-cols-2 gap-4 mt-6">
            <h3 className="col-span-2 text-lg font-semibold text-gray-200">
              Download Assets
            </h3>

            <DownloadButton
              href={status.files.vertical}
              label="Vertical (1080x1920 MP4)"
              icon={<Download className="w-4 h-4 mr-2" />}
            />

            <DownloadButton
              href={status.files.horizontal}
              label="Horizontal (1920x1080 MP4)"
              icon={<Download className="w-4 h-4 mr-2" />}
            />

            <DownloadButton
              href={status.files.srt}
              label="Captions (SRT)"
              icon={<FileText className="w-4 h-4 mr-2" />}
            />

            <DownloadButton
              href={status.files.thumb}
              label="Thumbnail (JPG)"
              icon={<Download className="w-4 h-4 mr-2" />}
            />
          </div>
        )}

        <VideoPreview files={status.files} />

        {status.status !== "queued" && jobId && (
          <p className="text-xs text-gray-500">Job ID: {jobId}</p>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 p-8">
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        <PlayCircle className="w-8 h-8 mr-3 text-green-500" />
        SoloBot Video Factory
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 p-6 bg-gray-800 rounded-lg shadow-2xl h-fit border border-gray-700/70">
          <h2 className="text-xl font-semibold mb-4 border-b border-gray-700 pb-2">
            Video Generation Inputs
          </h2>

          <form onSubmit={handleGenerate} className="space-y-4">
            <div>
              <label
                htmlFor="topic"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Video Topic/Goal
              </label>
              <textarea
                id="topic"
                name="topic"
                value={input.topic}
                onChange={handleChange}
                rows={3}
                required
                placeholder="E.g., How SoloBot helps agencies achieve 10x lead generation."
                className="w-full p-2 border border-gray-700 rounded-md bg-gray-900 text-gray-200 focus:ring-green-500 focus:border-green-500 resize-none"
              />
            </div>

            <div>
              <label
                htmlFor="script_override"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Optional Script Override
              </label>
              <textarea
                id="script_override"
                name="script_override"
                value={input.script_override}
                onChange={handleChange}
                rows={4}
                placeholder="Leave empty to generate a script via AI."
                className="w-full p-2 border border-gray-700 rounded-md bg-gray-900 text-gray-200 focus:ring-green-500 focus:border-green-500 resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="style"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  Style
                </label>
                <select
                  id="style"
                  name="style"
                  value={input.style}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-700 rounded-md bg-gray-900 text-gray-200"
                >
                  {STYLES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="platform"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  Platform
                </label>
                <select
                  id="platform"
                  name="platform"
                  value={input.platform}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-700 rounded-md bg-gray-900 text-gray-200"
                >
                  {PLATFORMS.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="tone"
                  className="block text-sm font-medium text-gray-300 mb-1"
                  >
                  Tone
                </label>
                <select
                  id="tone"
                  name="tone"
                  value={input.tone}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-700 rounded-md bg-gray-900 text-gray-200"
                >
                  {TONES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="duration"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  Duration (s)
                </label>
                <input
                  type="number"
                  id="duration"
                  name="duration"
                  value={input.duration}
                  onChange={handleChange}
                  min={15}
                  max={60}
                  required
                  className="w-full p-2 border border-gray-700 rounded-md bg-gray-900 text-gray-200"
                />
                <p className="text-xs text-gray-500 mt-1">15s to 60s</p>
              </div>
            </div>

            <button
              type="submit"
              disabled={!input.topic || isGenerating}
              className={`w-full flex items-center justify-center py-3 px-4 rounded-md shadow-lg text-sm font-medium text-white transition-all transform hover:scale-[1.02] duration-200 ${
                !input.topic || isGenerating
                  ? "bg-green-500/50 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700 shadow-green-500/30 hover:shadow-lg"
              }`}
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" /> Generating...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5 mr-2" /> Generate Video
                </>
              )}
            </button>
          </form>
        </div>

        <div className="lg:col-span-2">
          {jobId ? (
            renderStatus()
          ) : (
            <div className="p-6 bg-gray-800 rounded-lg shadow-xl text-center flex flex-col justify-center min-h-[400px]">
              <PlayCircle className="w-16 h-16 mx-auto text-gray-600 mb-4" />
              <p className="text-xl text-gray-400">
                Your generated video and status will appear here.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
