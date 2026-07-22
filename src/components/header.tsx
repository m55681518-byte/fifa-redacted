"use client";

import { useState } from "react";
import { Shield, Plus, FileText } from "lucide-react";
import { SubmissionModal } from "./submission-modal";

export function Header({ archiveCount }: { archiveCount: number }) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-dossier-700 bg-dossier-900/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-accent-red/40 bg-accent-red/10">
              <Shield className="h-5 w-5 text-accent-red" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight text-dossier-100">
                REDACTED<span className="ml-1 text-accent-red">DOSSIERS</span>
              </h1>
              <p className="text-[10px] tracking-[0.2em] text-dossier-500">
                // FIFA SECRET ARCHIVES //
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden items-center gap-2 rounded-md border border-dossier-700 bg-dossier-800 px-3 py-1.5 text-xs sm:flex">
              <FileText className="h-3.5 w-3.5 text-dossier-400" />
              <span className="text-dossier-400">
                Archive:{" "}
                <span className="font-mono-custom font-bold text-accent-red">
                  {archiveCount}
                </span>
              </span>
            </div>

            <button
              onClick={() => setModalOpen(true)}
              className="flex items-center gap-2 rounded-lg border border-accent-red/30 bg-accent-red/10 px-4 py-2 text-sm font-semibold text-accent-red transition-all hover:bg-accent-red/20 hover:border-accent-red/60 active:scale-95"
            >
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Submit Secret</span>
            </button>
          </div>
        </div>
      </header>

      <SubmissionModal open={modalOpen} onOpenChange={setModalOpen} />
    </>
  );
}
