"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, Command, Lock } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ClonerField } from "./cloner-field";

interface HeroProps {
  totalRecords: number;
  documentedCount: number;
  yearSpan: string;
  onOpenSearch: () => void;
}

/** Rotating strapline under the title. */
const TAGLINES = [
  "INDICTMENTS",
  "BURIED REPORTS",
  "IGNORED WARNINGS",
  "ADMISSIONS UNDER OATH",
];

export function Hero({ totalRecords, documentedCount, yearSpan, onOpenSearch }: HeroProps) {
  const reduce = useReducedMotion();
  const [taglineIdx, setTaglineIdx] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => setTaglineIdx((i) => (i + 1) % TAGLINES.length), 2600);
    return () => clearInterval(t);
  }, [reduce]);

  const scrollToArchive = () => {
    document.getElementById("archive")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Pointer parallax for the title lockup. Same rAF + CSS-variable approach as
  // the cloner field: the transform is driven by custom properties so React
  // never re-renders while the pointer moves.
  const tiltRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (reduce) return;
    const el = tiltRef.current;
    if (!el) return;
    if (window.matchMedia("(hover: none)").matches) return;

    let frame = 0;
    let tx = 0, ty = 0, cx = 0, cy = 0;

    const onMove = (e: PointerEvent) => {
      tx = (e.clientX / window.innerWidth - 0.5) * 2;
      ty = (e.clientY / window.innerHeight - 0.5) * 2;
      if (!frame) frame = requestAnimationFrame(tick);
    };
    const tick = () => {
      cx += (tx - cx) * 0.06;
      cy += (ty - cy) * 0.06;
      el.style.setProperty("--px", cx.toFixed(4));
      el.style.setProperty("--py", cy.toFixed(4));
      if (Math.abs(tx - cx) > 0.001 || Math.abs(ty - cy) > 0.001) {
        frame = requestAnimationFrame(tick);
      } else {
        frame = 0;
      }
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [reduce]);

  return (
    <section className="relative flex min-h-[92vh] items-center justify-center overflow-hidden px-4 pt-20 pb-16">
      {/* 3D cloner array of redacted document planes, floating in perspective
          space behind the content. */}
      <ClonerField />

      {/* Ambient field */}
      <div className="pointer-events-none absolute inset-0 grid-bg" />
      <div
        className="aurora left-[8%] top-[12%] h-[420px] w-[420px]"
        style={{ background: "radial-gradient(circle, rgba(255,59,48,0.16), transparent 70%)" }}
      />
      <div
        className="aurora right-[6%] top-[38%] h-[380px] w-[380px]"
        style={{ background: "radial-gradient(circle, rgba(245,165,36,0.10), transparent 70%)" }}
      />

      <div ref={tiltRef} className="hero-3d relative z-10 mx-auto w-full max-w-6xl text-center">
        <div className="hero-3d-inner">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="depth-2 mb-7 flex justify-center"
        >
          <div className="glass-panel flex items-center gap-2.5 rounded-full px-4 py-1.5">
            <span className="live-dot" />
            <span className="font-mono-custom text-2xs tracking-[0.22em] text-ink-mid">
              ARCHIVE ONLINE
            </span>
            <span className="h-3 w-px bg-line-strong" />
            <span className="font-mono-custom text-2xs tracking-[0.22em] text-redline">
              {totalRecords} RECORDS
            </span>
          </div>
        </motion.div>

        {/* Title lockup */}
        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="hero-title depth-3"
        >
          <span className="block text-ink-max">FIFA</span>
          <span className="relative block">
            <span className="text-gradient-red">REDACTED</span>
            {/* Redaction bar that retracts to reveal the word */}
            {!reduce && (
              <motion.span
                initial={{ scaleX: 1 }}
                animate={{ scaleX: 0 }}
                transition={{ duration: 1.1, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
                style={{ originX: 1 }}
                className="absolute inset-y-[12%] left-0 right-0 bg-redline"
                aria-hidden
              />
            )}
          </span>
        </motion.h1>

        {/* Rotating strapline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="depth-2 mt-6 flex h-6 items-center justify-center gap-3"
        >
          <span className="h-px w-8 bg-gradient-to-r from-transparent to-line-strong" />
          <motion.span
            key={taglineIdx}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-mono-custom text-xs tracking-[0.3em] text-ink-low"
          >
            {TAGLINES[taglineIdx]}
          </motion.span>
          <span className="h-px w-8 bg-gradient-to-l from-transparent to-line-strong" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.62 }}
          className="mx-auto mt-7 max-w-2xl text-pretty text-base leading-[1.7] text-ink-high sm:text-lg"
        >
          What football&apos;s governing body did, ignored and covered up — the
          indictments, the suppressed reports and the warnings it had in writing
          beforehand. Every record is sourced and graded by the strength of the evidence.
        </motion.p>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.74 }}
          className="depth-1 mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <button
            onClick={scrollToArchive}
            className="btn-primary font-display group flex w-full items-center justify-center gap-2.5 px-7 py-3.5 text-xs sm:w-auto"
          >
            <Lock className="h-3.5 w-3.5" />
            ENTER THE ARCHIVE
            <ArrowDown className="h-3.5 w-3.5 transition-transform group-hover:translate-y-0.5" />
          </button>

          <button
            onClick={onOpenSearch}
            className="glass-panel font-mono-custom flex w-full items-center justify-center gap-2.5 px-6 py-3.5 text-xs text-ink-mid transition-colors hover:text-ink-high sm:w-auto"
          >
            <Command className="h-3.5 w-3.5" />
            SEARCH RECORDS
            <kbd className="ml-1">⌘K</kbd>
          </button>
        </motion.div>

        {/* Stat strip */}
        <motion.dl
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mx-auto mt-16 grid max-w-2xl grid-cols-3 gap-px overflow-hidden border border-line bg-line"
        >
          {[
            { label: "TOTAL FILES", value: String(totalRecords) },
            { label: "DOCUMENTED", value: String(documentedCount) },
            { label: "SPAN", value: yearSpan },
          ].map((s) => (
            <div key={s.label} className="bg-surface-0 px-4 py-5">
              <dt className="font-mono-custom text-[10px] tracking-[0.2em] text-ink-faint">
                {s.label}
              </dt>
              <dd className="font-display mt-1.5 text-xl text-ink-max sm:text-2xl">{s.value}</dd>
            </div>
          ))}
        </motion.dl>
        </div>
      </div>

      {/* Scroll cue */}
      {!reduce && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 1, 0], y: [0, 6, 12, 18] }}
          transition={{ duration: 2.4, repeat: Infinity, delay: 1.6 }}
          className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2"
          aria-hidden
        >
          <div className="h-10 w-px bg-gradient-to-b from-redline to-transparent" />
        </motion.div>
      )}
    </section>
  );
}
