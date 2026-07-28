import type { SecretDossier } from "../../data/secrets";

/** ISO 3166 alpha-2 (plus the England subdivision) → regional indicator emoji. */
export function getFlag(code: string): string {
  const special: Record<string, string> = {
    "gb-eng": "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    "gb-sct": "🏴󠁧󠁢󠁳󠁣󠁴󠁿",
    "gb-wls": "🏴󠁧󠁢󠁷󠁬󠁳󠁿",
  };
  if (special[code]) return special[code];
  if (code.length !== 2) return "🏳️";
  return String.fromCodePoint(
    ...code.toUpperCase().split("").map((c) => 0x1f1e6 - 65 + c.charCodeAt(0))
  );
}

const HOST_CODES: Record<string, string> = {
  England: "ENG",
  Argentina: "ARG",
  France: "FRA",
  "South Korea": "KOR",
  Germany: "GER",
  "West Germany": "FRG",
  "South Africa": "RSA",
  Brazil: "BRA",
  Qatar: "QAT",
  "United States": "USA",
  Uruguay: "URU",
  Italy: "ITA",
  Switzerland: "SUI",
  Sweden: "SWE",
  Spain: "ESP",
  Mexico: "MEX",
  Chile: "CHI",
  Russia: "RUS",
};

export function getHostCode(nation: string): string {
  return HOST_CODES[nation] ?? nation.slice(0, 3).toUpperCase();
}

/**
 * Evidentiary status, replacing the old fictional clearance levels. Every
 * record in the archive is real, so the axis that matters to a reader is how
 * well established it is — not how secret it pretends to be.
 */
export const CLASSIFICATIONS = ["DOCUMENTED", "DISPUTED", "UNRESOLVED"] as const;
export type Classification = (typeof CLASSIFICATIONS)[number];

export function classificationStyle(c: SecretDossier["classification"]) {
  switch (c) {
    case "DOCUMENTED":
      // Established by court records, official reports or admissions.
      return {
        text: "text-emerald",
        border: "border-emerald/50",
        bg: "bg-emerald/10",
        dot: "bg-emerald",
        label: "DOCUMENTED",
      };
    case "DISPUTED":
      // Credible allegations that are denied, unproven or contested.
      return {
        text: "text-amber",
        border: "border-amber/50",
        bg: "bg-amber/10",
        dot: "bg-amber",
        label: "DISPUTED",
      };
    default:
      // Open questions where the documentary trail genuinely runs out.
      return {
        text: "text-cyan",
        border: "border-cyan/40",
        bg: "bg-cyan/10",
        dot: "bg-cyan",
        label: "UNRESOLVED",
      };
  }
}

/** Chronological grouping used by the timeline's band labels. */
export function getEra(year: number): { key: string; label: string } {
  if (year <= 1938) return { key: "origins", label: "ORIGINS" };
  if (year <= 1962) return { key: "postwar", label: "POST-WAR" };
  if (year <= 1994) return { key: "golden", label: "GOLDEN ERA" };
  return { key: "modern", label: "MODERN" };
}

/**
 * Lightweight relevance scoring. Title matches outrank tag matches, which
 * outrank body matches, so the command palette surfaces the obvious hit first.
 */
export function scoreDossier(d: SecretDossier, query: string): number {
  const q = query.trim().toLowerCase();
  if (!q) return 0;

  const title = d.title.toLowerCase();
  const summary = (d.summary ?? "").toLowerCase();
  const desc = d.description.toLowerCase();
  const tags = (d.tags ?? []).join(" ").toLowerCase();
  const nation = d.hostNation.toLowerCase();

  let score = 0;
  if (title.startsWith(q)) score += 100;
  if (title.includes(q)) score += 60;
  if (tags.includes(q)) score += 40;
  if (nation.includes(q)) score += 30;
  if (summary.includes(q)) score += 20;
  if (desc.includes(q)) score += 10;
  if (String(d.year).includes(q)) score += 50;
  if (d.id.toLowerCase().includes(q)) score += 45;
  return score;
}

export function formatCount(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return String(n);
}

/** Deterministic YouTube thumbnail so video cards need no iframe to preview. */
export function youtubeThumb(youtubeId: string): string {
  return `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`;
}

/** Extracts the 11-character video id from any common YouTube URL shape. */
export function extractYoutubeId(url: string): string | null {
  const m = url.match(/(?:youtube\.com\/(?:embed\/|watch\?v=)|youtu\.be\/)([\w-]{11})/);
  return m ? m[1] : null;
}
