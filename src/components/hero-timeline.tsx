"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { worldCupYears, secretDossiers } from "../../data/secrets";
import { Radar, Crosshair, Play } from "lucide-react";

interface HeroTimelineProps {
  selectedYear: number | null;
  onSelectYear: (year: number | null) => void;
  onPlayAudio: (year: number) => void;
}

const RADIUS = 160;
const CENTER = 180;

export function HeroTimeline({ selectedYear, onSelectYear, onPlayAudio }: HeroTimelineProps) {
  const [rotation, setRotation] = useState(0);
  const [hoveredYear, setHoveredYear] = useState<number | null>(null);
  const [activeCluster, setActiveCluster] = useState<string | null>(null);
  const isDragging = useRef(false);
  const lastX = useRef(0);
  const svgRef = useRef<SVGSVGElement>(null);

  const dossiersByYear = useMemo(() => {
    const map: Record<number, boolean> = {};
    secretDossiers.forEach((d) => { map[d.year] = true; });
    return map;
  }, []);

  const yearPositions = useMemo(() => {
    return worldCupYears.map((year, i) => {
      const angle = (i / worldCupYears.length) * Math.PI * 2 - Math.PI / 2;
      const x = CENTER + RADIUS * Math.cos(angle);
      const y = CENTER + RADIUS * Math.sin(angle);
      const labelAngle = angle + Math.PI;
      return { year, angle, x, y, labelAngle };
    });
  }, []);

  const handleWheel = (e: React.WheelEvent) => {
    setRotation((r) => r + e.deltaY * 0.3);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    lastX.current = e.clientX;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    const dx = e.clientX - lastX.current;
    lastX.current = e.clientX;
    setRotation((r) => r + dx * 0.5);
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  useEffect(() => {
    const handleUp = () => { isDragging.current = false; };
    window.addEventListener("mouseup", handleUp);
    return () => window.removeEventListener("mouseup", handleUp);
  }, []);

  const getClusterLabel = (year: number) =>
    year <= 1962 ? "Early Era" : year <= 1994 ? "Golden Era" : "Modern Era";

  const clusters = [
    { label: "Early Era", years: worldCupYears.filter((y) => y <= 1962), color: "accent-cyan" },
    { label: "Golden Era", years: worldCupYears.filter((y) => y > 1962 && y <= 1994), color: "accent-amber" },
    { label: "Modern Era", years: worldCupYears.filter((y) => y > 1994), color: "accent-red" },
  ];

  return (
    <section className="relative overflow-hidden border-b border-dossier-700/50 neon-grid">
      <div className="absolute inset-0 bg-gradient-to-b from-accent-red/5 via-transparent to-transparent" />

      <div className="relative mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-4 text-center">
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
            className="mt-1 text-xl font-bold tracking-tight text-dossier-100 sm:text-2xl"
          >
            Tactical Dial
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-1 text-xs text-dossier-400"
          >
            Drag to rotate · Scroll to zoom · Click a year
          </motion.p>
        </div>

        <div className="flex justify-center gap-2 mb-4">
          {clusters.map((c) => (
            <button
              key={c.label}
              onClick={() => setActiveCluster(activeCluster === c.label ? null : c.label)}
              className={`rounded-md border px-2.5 py-1 text-[10px] transition-all ${
                activeCluster === c.label
                  ? `border-${c.color}/40 bg-${c.color}/10 text-${c.color}`
                  : "border-dossier-700 text-dossier-500 hover:border-dossier-600 hover:text-dossier-400"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div
          className="relative mx-auto flex items-center justify-center select-none"
          style={{ width: CENTER * 2, height: CENTER * 2 }}
          onWheel={handleWheel}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        >
          <svg
            ref={svgRef}
            width={CENTER * 2}
            height={CENTER * 2}
            className="absolute inset-0"
          >
            <defs>
              <radialGradient id="radar-glow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(239,68,68,0.08)" />
                <stop offset="60%" stopColor="rgba(239,68,68,0.02)" />
                <stop offset="100%" stopColor="rgba(239,68,68,0)" />
              </radialGradient>
            </defs>

            <circle cx={CENTER} cy={CENTER} r={RADIUS + 20} fill="url(#radar-glow)" />
            <circle cx={CENTER} cy={CENTER} r={RADIUS} fill="none" stroke="rgba(39,39,42,0.5)" strokeWidth={1} />
            <circle cx={CENTER} cy={CENTER} r={RADIUS * 0.7} fill="none" stroke="rgba(39,39,42,0.3)" strokeWidth={0.5} strokeDasharray="4 4" />
            <circle cx={CENTER} cy={CENTER} r={RADIUS * 0.4} fill="none" stroke="rgba(39,39,42,0.2)" strokeWidth={0.5} strokeDasharray="2 4" />
            <circle cx={CENTER} cy={CENTER} r={RADIUS * 0.1} fill="rgba(239,68,68,0.05)" />

            {[0, 1, 2, 3].map((i) => {
              const a = (i / 4) * Math.PI * 2;
              const x1 = CENTER + Math.cos(a) * 8;
              const y1 = CENTER + Math.sin(a) * 8;
              const x2 = CENTER + Math.cos(a) * RADIUS;
              const y2 = CENTER + Math.sin(a) * RADIUS;
              return (
                <line
                  key={i}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="rgba(39,39,42,0.2)"
                  strokeWidth={0.5}
                />
              );
            })}

            <g
              style={{ transform: `rotate(${rotation}deg)`, transformOrigin: `${CENTER}px ${CENTER}px` }}
            >
              {yearPositions.map(({ year, x, y }, i) => {
                const hasDossier = !!dossiersByYear[year];
                const isSelected = selectedYear === year;
                const isHovered = hoveredYear === year;
                const isInCluster = activeCluster
                  ? getClusterLabel(year) === activeCluster
                  : true;

                if (!isInCluster) return null;

                return (
                  <g
                    key={year}
                    style={{ cursor: "pointer" }}
                    onClick={() => onSelectYear(isSelected ? null : year)}
                    onMouseEnter={() => setHoveredYear(year)}
                    onMouseLeave={() => setHoveredYear(null)}
                  >
                    <circle
                      cx={x}
                      cy={y}
                      r={isSelected ? 7 : isHovered ? 6 : 4}
                      fill={
                        isSelected
                          ? "#ef4444"
                          : hasDossier
                            ? "rgba(239,68,68,0.4)"
                            : "rgba(63,63,70,0.5)"
                      }
                      stroke={
                        isSelected
                          ? "rgba(239,68,68,0.6)"
                          : isHovered
                            ? "rgba(239,68,68,0.3)"
                            : "transparent"
                      }
                      strokeWidth={2}
                      style={{ transition: "r 0.2s, fill 0.2s" }}
                    />
                    {hasDossier && (
                      <circle cx={x} cy={y} r={10} fill="none" stroke="rgba(239,68,68,0.1)" strokeWidth={1} />
                    )}
                    <text
                      x={x}
                      y={y - 12}
                      textAnchor="middle"
                      fill={isSelected || isHovered ? "#ef4444" : "#52525b"}
                      fontSize={isSelected || isHovered ? 9 : 8}
                      fontFamily="JetBrains Mono, monospace"
                      style={{ transition: "fill 0.2s, font-size 0.2s" }}
                    >
                      {year}
                    </text>
                  </g>
                );
              })}
            </g>
          </svg>

          <div className="relative z-10 flex flex-col items-center">
            <div className="relative">
              <div className="animate-radar h-6 w-6">
                <Radar className="h-6 w-6 text-accent-red/30" />
              </div>
            </div>
            <p className="mt-1 font-mono-custom text-[9px] text-dossier-600">
              {selectedYear ? `LOCKED: ${selectedYear}` : "SCANNING"}
            </p>
          </div>
        </div>

        <AnimatePresence>
          {hoveredYear && dossiersByYear[hoveredYear] && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="mx-auto mt-2 flex max-w-md items-center justify-center gap-3"
            >
              <p className="font-mono-custom text-xs text-dossier-500">
                DOSSIER AVAILABLE
              </p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onPlayAudio(hoveredYear);
                }}
                className="flex items-center gap-1 rounded border border-accent-red/30 px-2 py-0.5 text-[10px] text-accent-red transition-colors hover:bg-accent-red/10"
              >
                <Play className="h-3 w-3" />
                Play Anthem
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-4 text-center">
          <p className="font-mono-custom text-[10px] text-dossier-600">
            {selectedYear
              ? `ACTIVE FILTER: WORLD CUP ${selectedYear}`
              : "ALL DOSSIERS DISPLAYED — SELECT A YEAR TO FILTER"}
          </p>
        </div>
      </div>
    </section>
  );
}
