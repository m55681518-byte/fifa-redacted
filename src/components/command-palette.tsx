"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "framer-motion";
import { CornerDownLeft, FileText, Search } from "lucide-react";
import type { SecretDossier } from "../../data/secrets";
import { classificationStyle, scoreDossier } from "@/lib/dossier-utils";
import { Flag } from "./flag";

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  dossiers: SecretDossier[];
  onSelect: (d: SecretDossier) => void;
}

export function CommandPalette({ open, onOpenChange, dossiers, onSelect }: CommandPaletteProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <AnimatePresence>
        {/* Remounting per-open resets query and cursor without an effect. */}
        {open && <PaletteBody dossiers={dossiers} onSelect={onSelect} onOpenChange={onOpenChange} />}
      </AnimatePresence>
    </Dialog.Root>
  );
}

function PaletteBody({
  dossiers,
  onSelect,
  onOpenChange,
}: Omit<CommandPaletteProps, "open">) {
  const [query, setQuery] = useState("");
  const [rawIdx, setRawIdx] = useState(0);
  const listRef = useRef<HTMLUListElement>(null);

  const results = useMemo(() => {
    if (!query.trim()) return dossiers.slice(0, 8);
    return dossiers
      .map((d) => ({ d, score: scoreDossier(d, query) }))
      .filter((r) => r.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 8)
      .map((r) => r.d);
  }, [dossiers, query]);

  // Clamp during render so a shrinking result set can't strand the cursor.
  const activeIdx = Math.min(rawIdx, Math.max(results.length - 1, 0));
  const setActiveIdx = setRawIdx;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIdx((i) => (i + 1) % Math.max(results.length, 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIdx((i) => (i - 1 + results.length) % Math.max(results.length, 1));
    } else if (e.key === "Enter" && results[activeIdx]) {
      e.preventDefault();
      onSelect(results[activeIdx]);
      onOpenChange(false);
    }
  };

  // Keep the highlighted row inside the scroll viewport.
  useEffect(() => {
    listRef.current
      ?.querySelectorAll("li")
      [activeIdx]?.scrollIntoView({ block: "nearest" });
  }, [activeIdx]);

  return (
    <Dialog.Portal forceMount>
            <Dialog.Overlay asChild>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[110] bg-void/80 backdrop-blur-md"
              />
            </Dialog.Overlay>

            <Dialog.Content asChild>
              <motion.div
                initial={{ opacity: 0, scale: 0.98, y: -8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98, y: -8 }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                onKeyDown={handleKeyDown}
                className="glass-strong elev-3 fixed left-1/2 top-[14vh] z-[111] w-[min(100vw-1.5rem,38rem)] -translate-x-1/2 overflow-hidden border border-line-strong"
              >
                <Dialog.Title className="sr-only">Search the archive</Dialog.Title>

                <div className="flex items-center gap-3 border-b border-line px-4">
                  <Search className="h-4 w-4 flex-shrink-0 text-ink-faint" />
                  <input
                    autoFocus
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search records, years, nations, tags…"
                    aria-label="Search the archive"
                    className="w-full bg-transparent py-4 text-sm text-ink-high placeholder-ink-faint outline-none"
                  />
                  <kbd className="flex-shrink-0">ESC</kbd>
                </div>

                <ul ref={listRef} className="max-h-[52vh] overflow-y-auto p-2">
                  {results.length === 0 && (
                    <li className="px-3 py-10 text-center">
                      <p className="font-mono-custom text-[11px] text-ink-faint">
                        NO MATCHING RECORDS
                      </p>
                    </li>
                  )}

                  {results.map((d, i) => {
                    const cls = classificationStyle(d.classification);
                    const active = i === activeIdx;
                    return (
                      <li key={d.id}>
                        <button
                          onClick={() => {
                            onSelect(d);
                            onOpenChange(false);
                          }}
                          onMouseEnter={() => setActiveIdx(i)}
                          className={`flex w-full items-center gap-3 px-3 py-2.5 text-left transition-colors ${
                            active ? "bg-surface-2" : "hover:bg-surface-1"
                          }`}
                        >
                          <FileText
                            className={`h-3.5 w-3.5 flex-shrink-0 ${
                              active ? "text-redline" : "text-ink-faint"
                            }`}
                          />
                          <span className="min-w-0 flex-1">
                            <span className="block truncate text-xs text-ink-high">{d.title}</span>
                            <span className="font-mono-custom mt-0.5 block text-[10px] text-ink-faint">
                              {d.id} · <Flag code={d.hostFlag} nation={d.hostNation} /> {d.hostNation} · {d.year}
                            </span>
                          </span>
                          <span
                            className={`font-mono-custom hidden flex-shrink-0 border px-1.5 py-0.5 text-[9px] sm:inline ${cls.text} ${cls.border}`}
                          >
                            {cls.label}
                          </span>
                          {active && (
                            <CornerDownLeft className="h-3 w-3 flex-shrink-0 text-ink-faint" />
                          )}
                        </button>
                      </li>
                    );
                  })}
                </ul>

                <div className="flex items-center justify-between border-t border-line px-4 py-2.5">
                  <span className="font-mono-custom text-[9px] tracking-wider text-ink-faint">
                    {results.length} RESULT{results.length !== 1 ? "S" : ""}
                  </span>
                  <span className="flex items-center gap-2.5">
                    <span className="font-mono-custom flex items-center gap-1 text-[9px] text-ink-faint">
                      <kbd>↑</kbd>
                      <kbd>↓</kbd> NAVIGATE
                    </span>
                    <span className="font-mono-custom flex items-center gap-1 text-[9px] text-ink-faint">
                      <kbd>↵</kbd> OPEN
                    </span>
                  </span>
                </div>
      </motion.div>
    </Dialog.Content>
  </Dialog.Portal>
  );
}
