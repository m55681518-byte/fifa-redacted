"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { worldCupYears } from "../../data/secrets";

interface HeroTimelineProps {
  selectedYear: number | null;
  onSelectYear: (year: number | null) => void;
  audioYear: number | null;
  onPlayAudio: (year: number) => void;
}

const yearClusters = [
  { start: 1930, end: 1962, label: "Early Era" },
  { start: 1966, end: 1994, label: "Golden Era" },
  { start: 1998, end: 2026, label: "Modern Era" },
];

export function HeroTimeline({ selectedYear, onSelectYear }: HeroTimelineProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedYear && scrollRef.current) {
      const el = scrollRef.current.querySelector(`[data-year="${selectedYear}"]`);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
      }
    }
  }, [selectedYear]);

  return (
    <section className="relative overflow-hidden border-b border-dossier-700/50">
      <div className="absolute inset-0 bg-gradient-to-b from-accent-red/5 via-transparent to-transparent" />
      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-6 text-center">
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-mono-custom text-[10px] tracking-[0.3em] text-dossier-500"
          >
            // CLASSIFIED TIMELINE //
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-2 text-2xl font-bold tracking-tight text-dossier-100 sm:text-3xl"
          >
            World Cup Era Selector
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-1 text-sm text-dossier-400"
          >
            Select a tournament year to reveal classified dossiers
          </motion.p>
        </div>

        <div className="mb-3 flex justify-center gap-4">
          {yearClusters.map((cluster) => (
            <motion.button
              key={cluster.label}
              onClick={() => {
                const el = scrollRef.current?.querySelector(`[data-cluster="${cluster.label}"]`);
                if (el) {
                  const parent = scrollRef.current;
                  if (parent) {
                    const containerRect = parent.getBoundingClientRect();
                    const elementRect = el.getBoundingClientRect();
                    const scrollLeft = parent.scrollLeft + elementRect.left - containerRect.left - containerRect.width / 2 + elementRect.width / 2;
                    parent.scrollTo({ left: scrollLeft, behavior: "smooth" });
                  }
                }
              }}
              className="rounded-md border border-dossier-700 bg-dossier-800/50 px-3 py-1 text-xs text-dossier-400 transition-colors hover:border-accent-red/30 hover:text-accent-red"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {cluster.label}
            </motion.button>
          ))}
        </div>

        <div
          ref={scrollRef}
          className="flex gap-2 overflow-x-auto pb-4 scrollbar-thin"
          style={{ scrollbarWidth: "thin" }}
        >
          {worldCupYears.map((year, idx) => {
            const isSelected = selectedYear === year;

            return (
              <motion.button
                key={year}
                data-year={year}
                data-cluster={
                  year <= 1962
                    ? "Early Era"
                    : year <= 1994
                      ? "Golden Era"
                      : "Modern Era"
                }
                onClick={() => {
                  if (isSelected) {
                    onSelectYear(null);
                  } else {
                    onSelectYear(year);
                  }
                }}
                className={`relative flex-shrink-0 rounded-lg border px-3 py-2 text-center transition-all ${
                  isSelected
                    ? "border-accent-red bg-accent-red/10 shadow-[0_0_15px_rgba(239,68,68,0.15)]"
                    : "border-dossier-700 bg-dossier-800/50 hover:border-dossier-600 hover:bg-dossier-800"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span
                  className={`text-xs font-mono-custom ${
                    isSelected ? "text-accent-red" : "text-dossier-400"
                  }`}
                >
                  {year}
                </span>
                {year % 4 === 0 && (
                  <div
                    className={`mx-auto mt-1 h-1 w-6 rounded-full ${
                      isSelected ? "bg-accent-red" : "bg-dossier-700"
                    }`}
                  />
                )}
                {isSelected && (
                  <motion.div
                    layoutId="timeline-indicator"
                    className="absolute -bottom-1 left-1/2 h-0.5 w-8 -translate-x-1/2 rounded-full bg-accent-red"
                  />
                )}
              </motion.button>
            );
          })}
        </div>

        <div className="mt-4 text-center">
          <p className="font-mono-custom text-[11px] text-dossier-600">
            {selectedYear
              ? `ACTIVE FILTER: WORLD CUP ${selectedYear}`
              : "ALL DOSSIERS DISPLAYED — SELECT A YEAR TO FILTER"}
          </p>
        </div>
      </div>
    </section>
  );
}
