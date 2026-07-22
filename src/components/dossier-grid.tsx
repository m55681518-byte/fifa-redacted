"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { secretDossiers, type SecretDossier, type Comment } from "../../data/secrets";
import { SecretCard } from "./secret-card";
import { HeroTimeline } from "./hero-timeline";
import { AudioBar } from "./audio-bar";
import { Header } from "./header";
import { ToastProvider } from "./toast";

interface TrackInfo {
  year: number;
  title: string;
  artist: string;
  hostNation: string;
  youtubeId: string;
}

export function DossierGrid() {
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [audioTrack, setAudioTrack] = useState<TrackInfo | null>(null);
  const [dossiers, setDossiers] = useState(secretDossiers);

  const allTracks = useMemo<TrackInfo[]>(
    () =>
      dossiers.map((d) => ({
        year: d.year,
        title: d.anthem.title,
        artist: d.anthem.artist,
        hostNation: d.hostNation,
        youtubeId: d.anthem.youtubeId,
      })),
    [dossiers]
  );

  const filtered = useMemo(
    () =>
      selectedYear
        ? dossiers.filter((d) => d.year === selectedYear)
        : dossiers,
    [dossiers, selectedYear]
  );

  const handleSelectYear = (year: number | null) => {
    setSelectedYear(year);
    if (year) {
      const dossier = dossiers.find((d) => d.year === year);
      if (dossier) {
        setAudioTrack({
          year: dossier.year,
          title: dossier.anthem.title,
          artist: dossier.anthem.artist,
          hostNation: dossier.hostNation,
          youtubeId: dossier.anthem.youtubeId,
        });
      }
    }
  };

  const handlePlayAudio = (year: number) => {
    const dossier = dossiers.find((d) => d.year === year);
    if (dossier) {
      setAudioTrack({
        year: dossier.year,
        title: dossier.anthem.title,
        artist: dossier.anthem.artist,
        hostNation: dossier.hostNation,
        youtubeId: dossier.anthem.youtubeId,
      });
    }
  };

  const handleUpvote = (id: string) => {
    setDossiers((prev) =>
      prev.map((d) => (d.id === id ? { ...d, upvotes: d.upvotes + 1 } : d))
    );
    fetch("/api/upvote", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    }).catch(() => {});
  };

  const handleAddComment = (dossierId: string, comment: Comment) => {
    setDossiers((prev) =>
      prev.map((d) =>
        d.id === dossierId
          ? { ...d, comments: [...d.comments, comment] }
          : d
      )
    );
    fetch("/api/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ dossierId, comment }),
    }).catch(() => {});
  };

  return (
    <ToastProvider>
      <div className="min-h-screen pb-24">
        <Header archiveCount={dossiers.length} />

        <HeroTimeline
          selectedYear={selectedYear}
          onSelectYear={handleSelectYear}
          onPlayAudio={handlePlayAudio}
        />

        <main className="relative mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-6 flex items-center justify-between border-b border-zinc-800 pb-3">
            <h2 className="font-display text-base font-bold tracking-wider text-zinc-100">
              {selectedYear
                ? `CLASSIFIED // WC ${selectedYear}`
                : "ALL CLASSIFIED DOSSIERS"}
            </h2>
            <span className="font-mono-custom text-[9px] text-zinc-500">
              {filtered.length} RECORD{filtered.length !== 1 ? "S" : ""}
            </span>
          </div>

          <motion.div layout className="grid w-full gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filtered.map((dossier) => (
                <SecretCard
                  key={dossier.id}
                  dossier={dossier}
                  onUpvote={handleUpvote}
                  onAddComment={handleAddComment}
                />
              ))}
            </AnimatePresence>
          </motion.div>

          {filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20">
              <p className="font-mono-custom text-xs text-zinc-600">
                NO CLASSIFIED RECORDS FOUND
              </p>
              <p className="mt-1 font-mono-custom text-[10px] text-zinc-700">
                Try selecting a different tournament year
              </p>
            </div>
          )}
        </main>

        <AudioBar
          track={audioTrack}
          tracks={allTracks}
          onSelectTrack={setAudioTrack}
        />
      </div>
    </ToastProvider>
  );
}
