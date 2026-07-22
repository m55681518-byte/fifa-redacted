"use client";

import { useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { worldCupYears, secretDossiers } from "../../data/secrets";

interface HeroTimelineProps {
  selectedYear: number | null;
  onSelectYear: (year: number | null) => void;
  onPlayAudio: (year: number) => void;
}

const clusterColors: Record<string, string> = {
  "1930-1962": "from-cyan-500/20 to-transparent",
  "1966-1994": "from-amber-500/20 to-transparent",
  "1998-2026": "from-[#ff2e2e]/20 to-transparent",
};

const clusterLabels: Record<string, string> = {
  "1930-1962": "BAND 1 // EARLY",
  "1966-1994": "BAND 2 // GOLDEN",
  "1998-2026": "BAND 3 // MODERN",
};

function getClusterKey(year: number): string {
  if (year <= 1962) return "1930-1962";
  if (year <= 1994) return "1966-1994";
  return "1998-2026";
}

function getHostCode(year: number): string {
  const d = secretDossiers.find((s) => s.year === year);
  if (!d) return "";
  const map: Record<string, string> = {
    England: "ENG",
    Argentina: "ARG",
    France: "FRA",
    "South Korea": "KOR",
    Germany: "GER",
    "South Africa": "RSA",
    Brazil: "BRA",
    Qatar: "QAT",
    "United States": "USA",
    Uruguay: "URU",
  };
  return map[d.hostNation] || d.hostNation.slice(0, 3).toUpperCase();
}

export function HeroTimeline({ selectedYear, onSelectYear, onPlayAudio }: HeroTimelineProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const dossiersByYear = useMemo(() => {
    const map: Record<number, boolean> = {};
    secretDossiers.forEach((d) => { map[d.year] = true; });
    return map;
  }, []);

  useEffect(() => {
    if (selectedYear && scrollRef.current) {
      const el = scrollRef.current.querySelector(`[data-year="${selectedYear}"]`);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
      }
    }
  }, [selectedYear]);

  return (
    <section className="relative overflow-hidden border-b border-zinc-800">
      <div className="absolute inset-0 bg-gradient-to-b from-[#ff2e2e]/5 via-transparent to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-4 text-center">
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-mono-custom text-[9px] tracking-[0.3em] text-zinc-500"
          >
            [ FREQUENCY BAND SELECTOR ]
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display mt-1 text-lg font-bold text-zinc-100 sm:text-xl"
          >
            WORLD CUP ARCHIVE
          </motion.h2>
        </div>

        <div
          ref={scrollRef}
          className="relative flex gap-0 overflow-x-auto pb-5"
          style={{ scrollbarWidth: "none" }}
        >
          <div className="flex items-end gap-0 mx-auto">
            {worldCupYears.map((year, idx) => {
              const hasDossier = !!dossiersByYear[year];
              const isSelected = selectedYear === year;
              const cluster = getClusterKey(year);
              const firstInCluster =
                idx === 0 || getClusterKey(worldCupYears[idx - 1]) !== cluster;
              const hostCode = getHostCode(year);

              return (
                <div key={year} className="flex flex-col items-center" style={{ width: 36 }}>
                  {firstInCluster && (
                    <span className="font-mono-custom mb-2 text-[7px] tracking-[0.2em] text-zinc-600">
                      {clusterLabels[cluster]}
                    </span>
                  )}

                  <div className="relative flex flex-col items-center">
                    <motion.button
                      data-year={year}
                      onClick={() => onSelectYear(isSelected ? null : year)}
                      className={`relative flex flex-col items-center transition-all ${
                        hasDossier ? "cursor-pointer" : "cursor-default"
                      }`}
                      whileHover={hasDossier ? { scale: 1.1 } : {}}
                      whileTap={hasDossier ? { scale: 0.95 } : {}}
                    >
                      <span
                        className={`font-mono-custom text-[10px] transition-colors ${
                          isSelected
                            ? "text-tactical-amber"
                            : hasDossier
                              ? "text-zinc-300 hover:text-[#ff2e2e]"
                              : "text-zinc-700"
                        }`}
                      >
                        {year}
                      </span>

                      {hasDossier && (
                        <span className="font-mono-custom mt-0.5 text-[6px] text-zinc-600">
                          {hostCode}
                        </span>
                      )}

                      <div className="relative mt-1 flex flex-col items-center">
                        <div
                          className={`w-[2px] transition-all ${
                            isSelected
                              ? "h-8 bg-tactical-amber tactical-needle"
                              : hasDossier
                                ? "h-5 bg-[#ff2e2e]/40"
                                : "h-3 bg-zinc-800"
                          }`}
                        />
                        <div
                          className={`mt-0.5 h-1 w-1 rounded-full transition-all ${
                            isSelected
                              ? "bg-tactical-amber shadow-[0_0_6px_rgba(245,158,11,0.6)]"
                              : hasDossier
                                ? "bg-[#ff2e2e]/60"
                                : "bg-zinc-800"
                          }`}
                        />
                      </div>
                    </motion.button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="relative mt-1 h-4">
          <div className="absolute left-0 right-0 top-1/2 h-[1px] -translate-y-1/2 bg-zinc-800" />
          <div className="mx-auto flex w-fit gap-0">
            {worldCupYears.map((year) => (
              <div key={year} className="flex justify-center" style={{ width: 36 }}>
                <div
                  className={`freq-tick ${
                    dossiersByYear[year] || selectedYear === year ? "active" : ""
                  }`}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 text-center">
          <AnimatePresence mode="wait">
            {selectedYear ? (
              <motion.div
                key="selected"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-center gap-3"
              >
                <span className="font-mono-custom text-[9px] text-tactical-amber">
                  LOCKED: {selectedYear}
                </span>
                <span className="text-zinc-700">|</span>
                <span className="font-mono-custom text-[9px] text-zinc-500">
                  {getHostCode(selectedYear)} // {worldCupYears.indexOf(selectedYear) + 1} OF {worldCupYears.length}
                </span>
                <button
                  onClick={() => onPlayAudio(selectedYear)}
                  className="flex items-center gap-1 rounded-none border border-[#ff2e2e]/30 px-2 py-0.5 text-[9px] text-[#ff2e2e] transition-colors hover:bg-[#ff2e2e]/10"
                >
                  ▶ PLAY ANTHEM
                </button>
              </motion.div>
            ) : (
              <motion.p
                key="all"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="font-mono-custom text-[9px] text-zinc-600"
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
