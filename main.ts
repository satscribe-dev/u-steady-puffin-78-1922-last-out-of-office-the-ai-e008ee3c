// Last Out of Office: The AI That Went Barista
// Writes the chosen one-line out-of-office auto-reply to /output/entry.txt.
// Deterministic: the same fixed text on every run — no randomness, no clock,
// no network, no input beyond this file.

import { mkdirSync, writeFileSync } from "node:fs";

// The entry: a machine habit (hallucinating answers) turned into coffee
// (hallucinating latte art), with a twist — nobody files a ticket anymore.
const ENTRY =
  "Out of office: I have left the inbox to become a barista. " +
  "I used to hallucinate answers at 3 a.m.; now I hallucinate latte art " +
  "and nobody files a ticket.";

// Gate guard: the sealed scorer only accepts UTF-8 text of 1–280
// characters that is not only white space. Fail loudly instead of
// silently writing an invalid entry.
const chars = [...ENTRY].length;
if (chars < 1 || chars > 280 || ENTRY.trim().length === 0) {
  throw new Error(`entry fails the gate: ${chars} characters`);
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ENTRY, "utf8");
