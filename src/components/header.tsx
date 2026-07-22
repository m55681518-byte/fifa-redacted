"use client";

import { useState } from "react";
import { Shield, Plus, FileText } from "lucide-react";
import { SubmissionModal } from "./submission-modal";

export function Header({ archiveCount }: { archiveCount: number }) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-none border border-[#ff2e2e]/40 bg-[#ff2e2e]/10">
              <Shield className="h-5 w-5 text-[#ff2e2e]" />
            </div>
            <div>
              <h1 className="font-display text-base font-bold tracking-[0.15em] text-zinc-100">
                REDACTED<span className="text-[#ff2e2e]">DOSSIERS</span>
              </h1>
              <p className="font-mono-custom text-[8px] tracking-[0.25em] text-zinc-500">
                [ FIFA SECRET ARCHIVES ]
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 rounded-none border border-zinc-800 bg-zinc-900/80 px-3 py-1.5 font-mono-custom text-[10px]">
              <FileText className="h-3 w-3 text-zinc-500" />
              <span className="text-zinc-400">
                ARCHIVE:{" "}
                <span className="font-bold text-[#ff2e2e]">
                  {archiveCount}
                </span>
              </span>
            </div>

            <button
              onClick={() => setModalOpen(true)}
              className="flex items-center gap-2 rounded-none border border-[#ff2e2e]/30 bg-[#ff2e2e]/10 px-4 py-2 font-display text-xs font-bold text-[#ff2e2e] tracking-wider transition-all hover:bg-[#ff2e2e]/20 active:scale-95"
            >
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">SUBMIT SECRET</span>
            </button>
          </div>
        </div>
      </header>

      <SubmissionModal open={modalOpen} onOpenChange={setModalOpen} />
    </>
  );
}
