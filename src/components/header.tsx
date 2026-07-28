"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Plus, Search, Shield } from "lucide-react";
import { SubmissionModal } from "./submission-modal";

interface HeaderProps {
  archiveCount: number;
  onOpenSearch: () => void;
}

export function Header({ archiveCount, onOpenSearch }: HeaderProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  // Reading-progress bar driven by scroll position.
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 26, restDelta: 0.001 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /**
   * Publish the header's measured height as --header-h so the sticky filter
   * bar can offset itself exactly. This previously used a hardcoded 57px,
   * which stopped matching when the nav controls were resized and left the
   * filter bar tucked 5px underneath the header.
   */
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const publish = () =>
      document.documentElement.style.setProperty(
        "--header-h",
        `${Math.round(el.getBoundingClientRect().height)}px`
      );
    publish();
    const ro = new ResizeObserver(publish);
    ro.observe(el);
    window.addEventListener("resize", publish);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", publish);
    };
  }, []);

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${
          scrolled
            ? "border-line bg-void/88 backdrop-blur-xl"
            : "border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <a href="#" className="flex items-center gap-2.5" aria-label="FIFA Redacted home">
            <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center border border-line-strong bg-surface-2">
              <Shield className="h-4 w-4 text-redline/80" />
            </span>
            <span className="hidden sm:block">
              <span className="font-display block text-xs leading-tight tracking-[0.14em] text-ink-max">
                FIFA<span className="text-redline">REDACTED</span>
              </span>
              <span className="font-mono-custom block text-[8px] tracking-[0.26em] text-ink-low">
                {archiveCount} RECORDS
              </span>
            </span>
          </a>

          <div className="flex items-center gap-3">
            {/* Primary action: searching the archive */}
            <button
              onClick={onOpenSearch}
              aria-label="Search the archive"
              className="group flex items-center gap-2.5 border border-line-strong bg-surface-1 px-3.5 py-2 text-ink-mid transition-colors hover:border-ink-low hover:text-ink-max"
            >
              <Search className="h-3.5 w-3.5" />
              <span className="font-mono-custom hidden text-[10px] tracking-wider md:inline">
                SEARCH ARCHIVE
              </span>
              <kbd className="hidden md:inline">⌘K</kbd>
            </button>

            {/* Secondary action: quiet outline, not a solid red block */}
            <button
              onClick={() => setModalOpen(true)}
              className="font-display flex items-center gap-2 border border-line-strong px-3.5 py-2 text-[11px] text-ink-mid transition-colors hover:border-redline/60 hover:text-redline"
            >
              <Plus className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">SUBMIT</span>
            </button>
          </div>
        </div>

        {/* Scroll progress */}
        <motion.div
          style={{ scaleX: progress, originX: 0 }}
          className="h-px bg-gradient-to-r from-redline via-amber to-redline"
        />
      </header>

      <SubmissionModal open={modalOpen} onOpenChange={setModalOpen} />
    </>
  );
}
