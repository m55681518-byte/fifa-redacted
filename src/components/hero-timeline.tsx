"use client";

import { useEffect, useMemo, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Play, Radio } from "lucide-react";
import { allDossiers, worldCupYears } from "../../data/secrets";
import { getAnthem } from "../../data/media";
import { getEra, getHostCode } from "@/lib/dossier-utils";

interface HeroTimelineProps {
  selectedYear: number | null;
  onSelectYear: (year: number | null) => void;
  onPlayAudio: (year: number) => void;
}

const NODE_W = 46;

export function HeroTimeline({ selectedYear, onSelectYear, onPlayAudio }: HeroTimelineProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const byYear = useMemo(() => {
    const map: Record<number, { count: number; nation: string }> = {};
    allDossiers.forEach((d) => {
      map[d.year] = { count: (map[d.year]?.count ?? 0) + 1, nation: d.hostNation };
    });
    return map;
  }, []);

  /**
   * Axis years: every World Cup, plus any year that carries a record. Several
   * of the institutional cases fall outside tournament years and would
   * otherwise be unreachable from the timeline.
   */
  const axisYears = useMemo(
    () => Array.from(new Set([...worldCupYears, ...allDossiers.map((d) => d.year)])).sort((a, b) => a - b),
    []
  );

  /** Years with a record but no tournament — rendered as off-cycle markers. */
  const offCycle = useMemo(
    () => new Set(axisYears.filter((y) => !worldCupYears.includes(y))),
    [axisYears]
  );

  useEffect(() => {
    if (!selectedYear || !scrollRef.current) return;
    scrollRef.current
      .querySelector(`[data-year="${selectedYear}"]`)
      ?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [selectedYear]);

  const active = selectedYear ? byYear[selectedYear] : null;

  return (
    <section
      id="timeline"
      className="relative overflow-hidden border-y border-line bg-surface-0/60"
    >
      <div
        className="aurora left-1/2 top-0 h-64 w-[600px] -translate-x-1/2"
        style={{ background: "radial-gradient(circle, rgba(255,59,48,0.08), transparent 70%)" }}
      />

      <div className="relative mx-auto max-w-7xl px-4 py-9 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="font-mono-custom flex items-center gap-2 text-[10px] tracking-[0.24em] text-ink-low">
              <Radio className="h-3 w-3 text-ink-low" />
              FREQUENCY BAND SELECTOR
            </p>
            <h2 className="font-display mt-1.5 text-base text-ink-max sm:text-lg">
              TOURNAMENT TIMELINE
            </h2>
          </div>

          {selectedYear && (
            <button
              onClick={() => onSelectYear(null)}
              className="font-mono-custom flex-shrink-0 text-[10px] tracking-wider text-ink-faint transition-colors hover:text-redline"
            >
              RESET SCAN
            </button>
          )}
        </div>

        {/* Tuner */}
        <div
          ref={scrollRef}
          className="no-scrollbar relative overflow-x-auto pb-2"
          role="group"
          aria-label="Filter records by tournament year"
        >
          <div className="mx-auto flex w-max items-end">
            {axisYears.map((year, idx) => {
              const data = byYear[year];
              const anthem = getAnthem(year);
              // Interactive if it holds a record OR has an anthem to play.
              const isActive = !!data || !!anthem;
              const hasData = !!data;
              const isSelected = selectedYear === year;
              const era = getEra(year);
              const firstOfEra = idx === 0 || getEra(axisYears[idx - 1]).key !== era.key;

              return (
                <div key={year} className="flex flex-col items-center" style={{ width: NODE_W }}>
                  {firstOfEra && (
                    <span className="font-mono-custom mb-2 whitespace-nowrap text-[8px] tracking-[0.2em] text-ink-low">
                      {era.label}
                    </span>
                  )}
                  {!firstOfEra && <span className="mb-2 h-[9px]" aria-hidden />}

                  <button
                    data-year={year}
                    onClick={() => onSelectYear(isSelected ? null : year)}
                    disabled={!isActive}
                    aria-pressed={isSelected}
                    aria-label={[
                      String(year),
                      hasData ? `${data.nation}, ${data.count} record${data.count !== 1 ? "s" : ""}` : "no records",
                      anthem ? `plays ${anthem.title}` : "no anthem",
                    ].join(" — ")}
                    title={anthem ? `Play "${anthem.title}" — ${anthem.artist}` : undefined}
                    className={`group flex flex-col items-center transition-transform ${
                      isActive ? "cursor-pointer hover:scale-110" : "cursor-not-allowed"
                    }`}
                  >
                    <span
                      className={`font-mono-custom text-[11px] transition-colors ${
                        isSelected
                          ? "font-bold text-amber"
                          : hasData
                            ? "text-ink-high group-hover:text-redline"
                            : anthem
                              ? "text-ink-mid group-hover:text-redline"
                              : "text-ink-low/55"
                      }`}
                    >
                      {year}
                    </span>

                    <span
                      className={`font-mono-custom mt-0.5 h-3 text-[7px] tracking-wider ${
                        isSelected ? "text-amber/80" : "text-ink-low"
                      }`}
                    >
                      {hasData ? (offCycle.has(year) ? "FIFA" : getHostCode(data.nation)) : anthem ? "♪" : ""}
                    </span>

                    <span
                      className={`mt-1.5 w-[2px] transition-all duration-300 ${
                        isSelected
                          ? "tactical-needle h-9 bg-amber"
                          : hasData
                            ? "h-5 bg-redline/45 group-hover:h-7 group-hover:bg-redline"
                            : anthem
                              ? "h-3.5 bg-redline/25 group-hover:h-5 group-hover:bg-redline/60"
                              : "h-2.5 bg-line-strong"
                      }`}
                    />

                    <span
                      className={`mt-1 h-1.5 w-1.5 rounded-full transition-all ${
                        isSelected
                          ? "bg-amber shadow-[0_0_8px_rgba(245,165,36,0.8)]"
                          : hasData
                            ? "bg-redline/60 group-hover:bg-redline"
                            : "bg-line-strong"
                      }`}
                    />
                  </button>
                </div>
              );
            })}
          </div>

          {/* Tick rail */}
          <div className="relative mt-2 h-3">
            <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-line" />
            <div className="mx-auto flex w-max">
              {axisYears.map((year) => (
                <span key={year} className="flex justify-center" style={{ width: NODE_W }}>
                  <span
                    className={`freq-tick ${byYear[year] ? "has-data" : ""} ${
                      selectedYear === year ? "active" : ""
                    }`}
                    style={{ height: selectedYear === year ? 12 : byYear[year] ? 8 : 5 }}
                  />
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Readout */}
        <div className="mt-5 flex min-h-[32px] items-center justify-center">
          <AnimatePresence mode="wait">
            {selectedYear && active ? (
              <motion.div
                key={selectedYear}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.22 }}
                className="flex flex-wrap items-center justify-center gap-2.5"
              >
                <span className="font-mono-custom border border-amber/50 bg-amber/10 px-2.5 py-1 text-[10px] tracking-wider text-amber">
                  LOCKED · {selectedYear}
                </span>
                <span className="font-mono-custom text-[10px] tracking-wider text-ink-low">
                  {active.nation.toUpperCase()} — {active.count} RECORD
                  {active.count !== 1 ? "S" : ""}
                </span>
                <button
                  onClick={() => onPlayAudio(selectedYear)}
                  className="btn-ghost flex items-center gap-1.5 px-2.5 py-1 text-[10px]"
                >
                  <Play className="h-2.5 w-2.5" />
                  <span className="font-mono-custom tracking-wider">ANTHEM</span>
                </button>
              </motion.div>
            ) : (
              <motion.p
                key="idle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="font-mono-custom text-[10px] tracking-[0.18em] text-ink-low"
              >
                ALL BANDS ACTIVE — SELECT A FREQUENCY TO FILTER
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
