"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * CLONER FIELD
 * ============
 *
 * A true 3D array of redacted-document planes, arranged on a grid and floating
 * in perspective space behind the hero. Modelled on the Spline "cloner" idiom —
 * one object repeated across a grid, the whole array transformed as a unit.
 *
 * WHY CSS 3D AND NOT WEBGL
 * ------------------------
 * These are real 3D transforms: a real perspective projection, real Z depth,
 * real rotateX/Y/Z on each clone, composited on the GPU. What they are not is
 * three.js. That was a deliberate call for an archive whose whole pitch is that
 * it loads fast and is worth reading:
 *
 *   - three.js + react-three-fiber costs roughly 600 KB before a single
 *     document is drawn. This costs nothing — no dependency, no bundle delta.
 *   - The page is currently ~200 KB and serves in under a second worldwide.
 *     Tripling that to decorate a text archive is a bad trade.
 *   - CSS 3D degrades: no WebGL context to lose, no shader compile, and it
 *     still renders on a locked-down browser or an old GPU.
 *
 * Each clone is a "document" — a dark plane with a redaction bar across it, the
 * site's core visual motif repeated into depth.
 *
 * PERFORMANCE
 * -----------
 * Clone count scales with viewport (40 desktop / 14 mobile) and drops to zero
 * under prefers-reduced-motion. Pointer parallax is written to CSS custom
 * properties inside a rAF, so React never re-renders on mouse move — the whole
 * field is one composited layer that the compositor moves.
 */

interface Clone {
  x: number;
  y: number;
  z: number;
  rx: number;
  ry: number;
  rz: number;
  scale: number;
  opacity: number;
  bar: number;
  delay: number;
  dur: number;
}

function buildClones(count: number, cols: number): Clone[] {
  // Deterministic pseudo-random so server and client agree and the field
  // doesn't reshuffle on hydration.
  let seed = 20260728;
  const rand = () => {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    return seed / 4294967296;
  };

  const rows = Math.ceil(count / cols);
  const out: Clone[] = [];

  for (let i = 0; i < count; i++) {
    const col = i % cols;
    const row = Math.floor(i / cols);

    // Centre the lattice on the origin, then jitter so it reads as a field
    // rather than a spreadsheet.
    const gx = (col - (cols - 1) / 2) / ((cols - 1) / 2 || 1);
    const gy = (row - (rows - 1) / 2) / ((rows - 1) / 2 || 1);

    out.push({
      x: gx * 52 + (rand() - 0.5) * 7,
      y: gy * 44 + (rand() - 0.5) * 7,
      z: -60 - rand() * 620,
      rx: (rand() - 0.5) * 36,
      ry: (rand() - 0.5) * 44,
      rz: (rand() - 0.5) * 20,
      scale: 0.7 + rand() * 0.75,
      opacity: 0.30 + rand() * 0.55,
      bar: 34 + rand() * 46,
      delay: rand() * -22,
      dur: 16 + rand() * 18,
    });
  }
  // Far planes first so nearer ones paint over them.
  return out.sort((a, b) => a.z - b.z);
}

export function ClonerField() {
  const reduce = useReducedMotion();
  const hostRef = useRef<HTMLDivElement>(null);
  const [clones, setClones] = useState<Clone[]>([]);

  // Build after mount so the count can match the real viewport.
  useEffect(() => {
    if (reduce) {
      setClones([]);
      return;
    }
    const narrow = window.matchMedia("(max-width: 767px)").matches;
    setClones(buildClones(narrow ? 14 : 40, narrow ? 4 : 8));
  }, [reduce]);

  // Pointer parallax. Writes CSS variables in a rAF — no React state, so no
  // re-render per mousemove.
  useEffect(() => {
    if (reduce || clones.length === 0) return;
    const host = hostRef.current;
    if (!host) return;
    if (window.matchMedia("(hover: none)").matches) return;

    let frame = 0;
    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;

    const onMove = (e: PointerEvent) => {
      tx = (e.clientX / window.innerWidth - 0.5) * 2;
      ty = (e.clientY / window.innerHeight - 0.5) * 2;
      if (!frame) frame = requestAnimationFrame(tick);
    };

    const tick = () => {
      // Critically damped-ish easing towards the pointer.
      cx += (tx - cx) * 0.055;
      cy += (ty - cy) * 0.055;
      host.style.setProperty("--px", cx.toFixed(4));
      host.style.setProperty("--py", cy.toFixed(4));
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
  }, [reduce, clones.length]);

  if (reduce || clones.length === 0) return null;

  return (
    <div ref={hostRef} className="cloner-viewport" aria-hidden="true">
      <div className="cloner-stage">
        {clones.map((c, i) => (
          <div
            key={i}
            className="clone"
            style={
              {
                "--tx": `${c.x}vmin`,
                "--ty": `${c.y}vmin`,
                "--tz": `${c.z}px`,
                "--rx": `${c.rx}deg`,
                "--ry": `${c.ry}deg`,
                "--rz": `${c.rz}deg`,
                "--sc": c.scale,
                "--op": c.opacity,
                animationDelay: `${c.delay}s`,
                animationDuration: `${c.dur}s`,
              } as React.CSSProperties
            }
          >
            <span className="clone-bar" style={{ width: `${c.bar}%` }} />
            <span className="clone-line" style={{ width: `${c.bar * 0.7}%` }} />
            <span className="clone-line" style={{ width: `${c.bar * 0.45}%` }} />
          </div>
        ))}
      </div>
    </div>
  );
}
