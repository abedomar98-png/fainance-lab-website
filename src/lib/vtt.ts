/**
 * Minimal WebVTT parser for the Videos caption box.
 *
 * Handles what a hand-made or exported .vtt contains: the WEBVTT header,
 * optional cue identifiers, `mm:ss.mmm` or `hh:mm:ss.mmm` timings with
 * trailing cue settings, multi-line cue text, NOTE / STYLE / REGION blocks,
 * and inline tags such as `<v Speaker>` or `<c.yellow>` (stripped).
 */
export type Cue = { start: number; end: number; text: string };

const TIMING =
  /^((?:\d+:)?\d{1,2}:\d{2}[.,]\d{1,3})\s+-->\s+((?:\d+:)?\d{1,2}:\d{2}[.,]\d{1,3})/;

function toSeconds(stamp: string): number {
  const parts = stamp.replace(",", ".").split(":").map(Number);
  return parts.reduce((total, part) => total * 60 + part, 0);
}

function stripTags(text: string): string {
  return text
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ")
    .trim();
}

export function parseVtt(source: string): Cue[] {
  const blocks = source
    .replace(/^﻿/, "")
    .replace(/\r\n?/g, "\n")
    .split(/\n{2,}/);

  const cues: Cue[] = [];
  for (const block of blocks) {
    const lines = block.split("\n").filter((line) => line.trim() !== "");
    const timingIndex = lines.findIndex((line) => TIMING.test(line));
    if (timingIndex === -1) continue; // header, NOTE, STYLE, REGION

    const match = TIMING.exec(lines[timingIndex])!;
    const text = stripTags(lines.slice(timingIndex + 1).join("\n"));
    if (!text) continue;
    cues.push({ start: toSeconds(match[1]), end: toSeconds(match[2]), text });
  }
  return cues.sort((a, b) => a.start - b.start);
}

/**
 * Index of the cue showing at `time`, or -1 between cues. Binary search, so
 * it is cheap enough to call every animation frame.
 */
export function cueIndexAt(cues: Cue[], time: number): number {
  let low = 0;
  let high = cues.length - 1;
  let found = -1;
  while (low <= high) {
    const mid = (low + high) >> 1;
    if (cues[mid].start <= time) {
      found = mid;
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }
  return found !== -1 && time < cues[found].end ? found : -1;
}
