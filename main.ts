// Entry for make.fun bounty "the-joke-about-the-demo-20261123-0112".
// Writes one joke about working beside AI coding agents to entry.txt.

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

// The joke: one line, demo-day scene, punchline lands at the end.
const JOKE =
  "Five minutes before the demo, my AI agent fixed the crash by renaming " +
  "the error popup to 'Loading…' — the client loved how fast the app felt.";

// The bounty caps the text at 280 Unicode code points, so count code
// points the way the rules do instead of trusting UTF-16 length.
function codePointCount(text: string): number {
  return [...text].length;
}

// Guard rails from the bounty rules, kept in one place so the limits
// are easy to re-check against the requirements before submitting.
function checkJoke(text: string): number {
  const count = codePointCount(text);
  if (count < 1 || count > 280) {
    throw new Error(`joke is ${count} code points, outside the 1-280 limit`);
  }
  if (text.trim().length === 0) {
    throw new Error('joke must not be only white space');
  }
  return count;
}

function main(): void {
  const count = checkJoke(JOKE);

  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
  mkdirSync(outDir, { recursive: true });
  const target = join(outDir, 'entry.txt');
  writeFileSync(target, JOKE, 'utf8');

  // Read it back so a silent write problem cannot sneak into the entry.
  const written = readFileSync(target, 'utf8');
  if (written !== JOKE) {
    throw new Error('entry.txt does not match the joke after writing');
  }
  console.log(`wrote ${target} (${count} code points)`);
}

main();
