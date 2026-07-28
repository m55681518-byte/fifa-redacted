/**
 * MEDIA AUDIT
 * ===========
 *
 * Every dossier must be backed by either verified footage or a primary
 * document. Neither registry is allowed to contain an entry whose key matches
 * no dossier — such an entry is invisible at runtime and rots unnoticed. A
 * 1966 highlights entry sat dead in FOOTAGE for exactly that reason.
 *
 * Run: node tools/mediaaudit.mjs
 * Exits non-zero on any failure, so it can gate a deploy.
 */

import fs from "node:fs";

const read = (p) => fs.readFileSync(new URL(`../${p}`, import.meta.url), "utf8");

const dossierSrc = ["data/secrets.ts", "data/additional-dossiers.ts"].map(read).join("\n");
const ids = [...dossierSrc.matchAll(/id:\s*"(SEC-\d{4}-\d{3})"/g)].map((m) => m[1]);

const film = [...read("data/media.ts").matchAll(/^  "(SEC-\d{4}-\d{3})":/gm)].map((m) => m[1]);
const docs = [...read("data/documents.ts").matchAll(/^  "(SEC-\d{4}-\d{3})":/gm)].map((m) => m[1]);

const problems = [];

// 1. No dossier may be left with nothing.
const bare = ids.filter((i) => !film.includes(i) && !docs.includes(i));
if (bare.length) problems.push(`Dossiers with neither footage nor document: ${bare.join(", ")}`);

// 2. No registry entry may point at a dossier that does not exist.
const orphanFilm = film.filter((i) => !ids.includes(i));
if (orphanFilm.length) problems.push(`FOOTAGE keys matching no dossier: ${orphanFilm.join(", ")}`);

const orphanDocs = docs.filter((i) => !ids.includes(i));
if (orphanDocs.length) problems.push(`EXHIBIT keys matching no dossier: ${orphanDocs.join(", ")}`);

// 3. A record showing both would give the reader two competing media affordances.
const both = ids.filter((i) => film.includes(i) && docs.includes(i));
if (both.length) problems.push(`Records carrying BOTH footage and exhibit: ${both.join(", ")}`);

// 4. Every exhibit needs a resolvable citation and at least one excerpt.
const docSrc = read("data/documents.ts");
for (const id of docs) {
  const start = docSrc.indexOf(`  "${id}":`);
  const block = docSrc.slice(start, start + 4000);
  if (!/via:\s*\{[^}]*url:\s*"https?:\/\//.test(block)) {
    problems.push(`${id}: exhibit has no source URL`);
  }
  if (!/excerpts:\s*\[\s*\{/.test(block)) {
    problems.push(`${id}: exhibit has no excerpts`);
  }
  if (!/provenance:\s*"(primary|reported)"/.test(block)) {
    problems.push(`${id}: exhibit missing provenance`);
  }
}

// 5. The evidence tier must not overstate the exhibit behind it. A COURT tier
//    claims "court judgment, guilty plea, or explicit admission" — an audit or
//    a technical evaluation is not that, however damning it reads. Two records
//    were mislabelled COURT until this check was written.
const kinds = Object.fromEntries(
  [...docSrc.matchAll(/^ {2}"(SEC-\d{4}-\d{3})":\s*\n?\s*\{\s*\n\s*kind:\s*"(\w+)"/gm)].map((m) => [
    m[1],
    m[2],
  ]),
);
const COURT_BACKED = new Set(["TRANSCRIPT", "RULING"]);
for (const b of dossierSrc.split(/(?=id: "SEC-)/)) {
  const id = b.match(/id: "(SEC-\d{4}-\d{3})"/)?.[1];
  if (!id || !kinds[id]) continue;
  const ev = b.match(/evidence:\s*"(\w+)"/)?.[1];
  if (ev === "COURT" && !COURT_BACKED.has(kinds[id])) {
    problems.push(`${id}: tiered COURT but its exhibit is a ${kinds[id]}, not a judgment or plea`);
  }
}

console.log(`dossiers ${ids.length} · footage ${film.length} · exhibits ${docs.length}`);
console.log(`coverage ${film.length + docs.length}/${ids.length}`);

if (problems.length) {
  console.error("\nFAIL");
  for (const p of problems) console.error(" ✗ " + p);
  process.exit(1);
}
console.log("\nPASS — every record is backed, no orphans, every exhibit cited.");
