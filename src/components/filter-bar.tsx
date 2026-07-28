"use client";

import { Bookmark, LayoutGrid, Rows3, Search, SlidersHorizontal, X } from "lucide-react";
import { CLASSIFICATIONS } from "@/lib/dossier-utils";
import type { Classification } from "@/lib/dossier-utils";
import { EVIDENCE_LABEL, EVIDENCE_ORDER, type EvidenceKind } from "../../data/secrets";

export type SortKey = "year-desc" | "year-asc" | "votes" | "credibility";
export type ViewMode = "grid" | "list";

interface FilterBarProps {
  query: string;
  onQueryChange: (q: string) => void;
  classification: Classification | "ALL";
  onClassificationChange: (c: Classification | "ALL") => void;
  sort: SortKey;
  onSortChange: (s: SortKey) => void;
  view: ViewMode;
  onViewChange: (v: ViewMode) => void;
  bookmarksOnly: boolean;
  onBookmarksOnlyChange: (b: boolean) => void;
  resultCount: number;
  activeYear: number | null;
  onClearYear: () => void;
  /** Minimum evidence tier to show. Null shows everything. */
  evidenceFloor: EvidenceKind | null;
  onEvidenceFloorChange: (e: EvidenceKind | null) => void;
  /** Counts per evidence tier, for the strength meter. */
  evidenceCounts: Record<EvidenceKind, number>;
  activePerson: string | null;
  onClearPerson: () => void;
}

const SORT_LABELS: Record<SortKey, string> = {
  "year-desc": "NEWEST FIRST",
  "year-asc": "OLDEST FIRST",
  votes: "MOST CORROBORATED",
  credibility: "BEST SUBSTANTIATED",
};

export function FilterBar({
  query,
  onQueryChange,
  classification,
  onClassificationChange,
  sort,
  onSortChange,
  view,
  onViewChange,
  bookmarksOnly,
  onBookmarksOnlyChange,
  resultCount,
  activeYear,
  onClearYear,
  evidenceFloor,
  onEvidenceFloorChange,
  evidenceCounts,
  activePerson,
  onClearPerson,
}: FilterBarProps) {
  const hasFilters =
    query ||
    classification !== "ALL" ||
    bookmarksOnly ||
    activeYear !== null ||
    evidenceFloor !== null ||
    activePerson !== null;

  const clearAll = () => {
    onQueryChange("");
    onClassificationChange("ALL");
    onBookmarksOnlyChange(false);
    onClearYear();
    onEvidenceFloorChange(null);
    onClearPerson();
  };

  return (
    <div className="sticky top-[var(--header-h)] z-40 -mx-4 mb-10 border-y border-line-strong bg-void/92 px-4 py-4 backdrop-blur-xl sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
      <div className="flex flex-col gap-3.5 lg:flex-row lg:items-center">
        {/* Search */}
        <div className="relative flex-1 lg:max-w-xs">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-ink-low" />
          <input
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Filter records…"
            aria-label="Filter records"
            className="w-full border border-line-strong bg-surface-2 py-2.5 pl-9 pr-8 text-xs text-ink-high placeholder-ink-low outline-none transition-colors hover:border-ink-faint focus:border-redline/70 focus:ring-1 focus:ring-redline/30"
          />
          {query && (
            <button
              onClick={() => onQueryChange("")}
              aria-label="Clear search"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-ink-faint hover:text-ink-high"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {/* Classification chips */}
        <div className="no-scrollbar flex items-center gap-1.5 overflow-x-auto">
          <button
            onClick={() => onClassificationChange("ALL")}
            aria-pressed={classification === "ALL"}
            className={`chip font-mono-custom flex-shrink-0 border px-2.5 py-1.5 text-[10px] tracking-wider ${
              classification === "ALL"
                ? "border-ink-mid bg-surface-3 text-ink-max"
                : "border-line-strong text-ink-mid hover:border-ink-faint hover:text-ink-high"
            }`}
          >
            ALL
          </button>
          {CLASSIFICATIONS.map((c) => {
            const active = classification === c;
            const tone =
              c === "DOCUMENTED"
                ? "border-emerald/60 bg-emerald/12 text-emerald"
                : c === "DISPUTED"
                  ? "border-amber/60 bg-amber/12 text-amber"
                  : "border-cyan/60 bg-cyan/12 text-cyan";
            return (
              <button
                key={c}
                onClick={() => onClassificationChange(c)}
                aria-pressed={active}
                className={`chip font-mono-custom flex-shrink-0 border px-2.5 py-1.5 text-[10px] tracking-wider ${
                  active ? tone : "border-line-strong text-ink-mid hover:border-ink-faint hover:text-ink-high"
                }`}
              >
                {c}
              </button>
            );
          })}

          <button
            onClick={() => onBookmarksOnlyChange(!bookmarksOnly)}
            aria-pressed={bookmarksOnly}
            className={`chip flex flex-shrink-0 items-center gap-1.5 border px-2.5 py-1.5 text-[10px] ${
              bookmarksOnly
                ? "border-amber/60 bg-amber/12 text-amber"
                : "border-line-strong text-ink-mid hover:border-ink-faint hover:text-ink-high"
            }`}
          >
            <Bookmark className={`h-3 w-3 ${bookmarksOnly ? "fill-current" : ""}`} />
            <span className="font-mono-custom tracking-wider">SAVED</span>
          </button>
        </div>

        {/* Right cluster */}
        <div className="flex items-center gap-2 lg:ml-auto">
          <div className="relative">
            <SlidersHorizontal className="pointer-events-none absolute left-2.5 top-1/2 h-3 w-3 -translate-y-1/2 text-ink-low" />
            <select
              value={sort}
              onChange={(e) => onSortChange(e.target.value as SortKey)}
              aria-label="Sort records"
              className="font-mono-custom cursor-pointer appearance-none border border-line-strong bg-surface-2 py-2.5 pl-8 pr-7 text-[10px] tracking-wider text-ink-mid outline-none transition-colors hover:border-ink-faint hover:text-ink-high focus:border-redline/70"
            >
              {(Object.keys(SORT_LABELS) as SortKey[]).map((k) => (
                <option key={k} value={k} className="bg-surface-1">
                  {SORT_LABELS[k]}
                </option>
              ))}
            </select>
          </div>

          <div className="flex border border-line-strong">
            <button
              onClick={() => onViewChange("grid")}
              aria-pressed={view === "grid"}
              aria-label="Grid view"
              className={`p-2 transition-colors ${
                view === "grid" ? "bg-surface-3 text-ink-max" : "text-ink-faint hover:text-ink-high"
              }`}
            >
              <LayoutGrid className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={() => onViewChange("list")}
              aria-pressed={view === "list"}
              aria-label="List view"
              className={`border-l border-line p-2 transition-colors ${
                view === "list" ? "bg-surface-3 text-ink-max" : "text-ink-faint hover:text-ink-high"
              }`}
            >
              <Rows3 className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Evidence strength — filter by how well a claim is actually proven */}
      <div className="mt-3.5 border-t border-line/70 pt-3.5">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <span className="font-mono-custom text-[10px] tracking-[0.18em] text-ink-low">
            EVIDENCE AT LEAST
          </span>

          <div className="flex flex-wrap items-center gap-1.5">
            <button
              onClick={() => onEvidenceFloorChange(null)}
              aria-pressed={evidenceFloor === null}
              className={`chip font-mono-custom border px-2.5 py-1.5 text-[10px] tracking-wider ${
                evidenceFloor === null
                  ? "border-ink-mid bg-surface-3 text-ink-max"
                  : "border-line-strong text-ink-mid hover:border-ink-faint hover:text-ink-high"
              }`}
            >
              ANY
            </button>

            {EVIDENCE_ORDER.map((kind) => {
              const active = evidenceFloor === kind;
              const n = evidenceCounts[kind] ?? 0;
              return (
                <button
                  key={kind}
                  onClick={() => onEvidenceFloorChange(active ? null : kind)}
                  aria-pressed={active}
                  title={EVIDENCE_LABEL[kind]}
                  className={`chip font-mono-custom flex items-center gap-1.5 border px-2.5 py-1.5 text-[10px] tracking-wider ${
                    active
                      ? "border-emerald/60 bg-emerald/12 text-emerald"
                      : "border-line-strong text-ink-mid hover:border-ink-faint hover:text-ink-high"
                  }`}
                >
                  {kind}
                  <span className={active ? "text-emerald/70" : "text-ink-low"}>{n}</span>
                </button>
              );
            })}
          </div>
        </div>

        {evidenceFloor && (
          <p className="mt-2 text-[11px] leading-relaxed text-ink-mid">
            Showing only records at <span className="text-emerald">{evidenceFloor}</span> or
            stronger — {EVIDENCE_LABEL[evidenceFloor].toLowerCase()}.
          </p>
        )}
      </div>

      {/* Active filter summary */}
      <div className="mt-3.5 flex flex-wrap items-center gap-2 border-t border-line/70 pt-3">
        <span className="font-mono-custom text-[10px] tracking-wider text-ink-low">
          {resultCount} RECORD{resultCount !== 1 ? "S" : ""}
        </span>

        {activePerson && (
          <button
            onClick={onClearPerson}
            className="font-mono-custom flex items-center gap-1.5 border border-cyan/50 bg-cyan/10 px-2 py-0.5 text-[10px] text-cyan"
          >
            {activePerson.toUpperCase()}
            <X className="h-2.5 w-2.5" />
          </button>
        )}

        {activeYear !== null && (
          <button
            onClick={onClearYear}
            className="font-mono-custom flex items-center gap-1.5 border border-amber/50 bg-amber/10 px-2 py-0.5 text-[10px] text-amber"
          >
            YEAR {activeYear}
            <X className="h-2.5 w-2.5" />
          </button>
        )}

        {hasFilters && (
          <button
            onClick={clearAll}
            className="font-mono-custom text-[10px] tracking-wider text-ink-faint underline-offset-2 hover:text-redline hover:underline"
          >
            CLEAR ALL
          </button>
        )}
      </div>
    </div>
  );
}
