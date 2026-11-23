// Entry for "A Day of One-Line Pitches" (u-ronigrv-a-day-of-one-line-pitches-12cd9bb3).
// Writes the one-sentence pitch to /output/entry.txt.
// Node 22+ TypeScript, stdlib only, deterministic, no network.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ENTRY =
  "You've had that app idea for ages — just describe it in plain words on make.fun and an AI agent will build a real working version you can try today, no coding needed and nothing to lose if it isn't quite right yet.";

const outDir = join(dirname(fileURLToPath(import.meta.url)), "output");
mkdirSync(outDir, { recursive: true });

// Guards: the entry must be exactly one sentence, 1–240 chars, non-blank.
const trimmed = ENTRY.trim();
// A sentence boundary is terminal punctuation followed by whitespace;
// dots inside words like "make.fun" do not count as boundaries.
const sentences = trimmed.split(/[.!?]\s+/).filter((s) => s.trim().length > 0);
if (trimmed.length === 0 || trimmed.length > 240) {
  throw new Error(`entry length ${trimmed.length} is outside 1–240 chars`);
}
if (sentences.length !== 1) {
  throw new Error(`entry must be exactly one sentence, found ${sentences.length}`);
}
writeFileSync(join(outDir, "entry.txt"), ENTRY + "\n", "utf8");
