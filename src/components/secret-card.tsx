"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronUp,
  Calendar,
  Image,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
  Eye,
  ThumbsUp,
} from "lucide-react";
import type { SecretDossier, Comment } from "../../data/secrets";
import { CommentSection } from "./comment-section";

const AVATARS = ["🔴", "🟠", "🟡", "🟢", "🔵", "🟣", "⚫", "⚪"];

function getAvatar(id: string) {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = ((hash << 5) - hash) + id.charCodeAt(i);
  }
  return AVATARS[Math.abs(hash) % AVATARS.length];
}

interface SecretCardProps {
  dossier: SecretDossier;
  onUpvote: (id: string) => void;
  onAddComment: (dossierId: string, comment: Comment) => void;
}

export function SecretCard({ dossier, onUpvote, onAddComment }: SecretCardProps) {
  const [localUpvoted, setLocalUpvoted] = useState(false);
  const [localCount, setLocalCount] = useState(dossier.upvotes);
  const [galleryIdx, setGalleryIdx] = useState(0);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(`upvoted_${dossier.id}`);
    if (stored === "true") setLocalUpvoted(true);
  }, [dossier.id]);

  const handleUpvote = () => {
    if (localUpvoted) return;
    setLocalUpvoted(true);
    setLocalCount((c) => c + 1);
    localStorage.setItem(`upvoted_${dossier.id}`, "true");
    onUpvote(dossier.id);
  };

  const classificationColor =
    dossier.classification === "TOP SECRET"
      ? "text-[#ff2e2e] border-[#ff2e2e]"
      : dossier.classification === "CONFIDENTIAL"
        ? "text-tactical-amber border-tactical-amber"
        : "text-zinc-400 border-zinc-500";

  const hasGallery = dossier.gallery && dossier.gallery.length > 0;
  const currentMedia =
    dossier.mediaType === "youtube"
      ? dossier.mediaUrl
      : hasGallery
        ? dossier.gallery[galleryIdx]
        : dossier.thumbnailUrl;

  const now = new Date();
  const timecode = now.toTimeString().slice(0, 8);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="group relative overflow-hidden rounded-none border border-zinc-800 bg-zinc-950/90 transition-all hover:border-zinc-700"
    >
      <span className="crosshair-tl crosshair-tl">+</span>
      <span className="crosshair-tr">+</span>
      <span className="crosshair-bl">+</span>
      <span className="crosshair-br">+</span>

      <div className="absolute right-3 top-3 z-20">
        <span
          className={`classification-stamp inline-block rounded-none border px-2 py-0.5 text-[9px] leading-none ${classificationColor}`}
        >
          {dossier.classification === "TOP SECRET"
            ? "[ TOP SECRET ]"
            : dossier.classification === "CONFIDENTIAL"
              ? "[ CONFIDENTIAL ]"
              : "[ CLASSIFIED ]"}
        </span>
      </div>

      <div className="relative h-52 overflow-hidden bg-zinc-900 vignette-overlay">
        {dossier.mediaType === "youtube" && !videoError ? (
          <div className="relative h-full w-full">
            <iframe
              src={`${dossier.mediaUrl}?autoplay=0&rel=0&showinfo=0&modestbranding=1`}
              className="h-full w-full"
              allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
              onError={() => setVideoError(true)}
            />
            <div className="absolute right-2 top-2 z-10 flex items-center gap-1.5 rounded-sm bg-zinc-950/80 px-1.5 py-0.5">
              <span className="rec-indicator">
                <span className="rec-dot" />
                <span className="timecode-overlay">REC</span>
              </span>
              <span className="timecode-overlay">{timecode} UTC</span>
            </div>
          </div>
        ) : (
          <div className="relative h-full w-full">
            <img
              src={currentMedia}
              alt={dossier.title}
              className="archival-photo h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            {videoError && (
              <div className="absolute inset-0 flex items-center justify-center bg-zinc-950/80">
                <div className="flex flex-col items-center gap-1">
                  <AlertTriangle className="h-5 w-5 text-tactical-amber" />
                  <span className="font-mono-custom text-[10px] text-zinc-500">SIGNAL LOST</span>
                </div>
              </div>
            )}
            {hasGallery && dossier.gallery.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setGalleryIdx((p) => (p - 1 + dossier.gallery.length) % dossier.gallery.length);
                  }}
                  className="absolute left-2 top-1/2 -translate-y-1/2 rounded-none bg-zinc-950/70 p-1 text-zinc-300 opacity-0 transition-opacity hover:bg-zinc-900 group-hover:opacity-100"
                >
                  <ChevronLeft className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setGalleryIdx((p) => (p + 1) % dossier.gallery.length);
                  }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-none bg-zinc-950/70 p-1 text-zinc-300 opacity-0 transition-opacity hover:bg-zinc-900 group-hover:opacity-100"
                >
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>
                <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1">
                  {dossier.gallery.map((_, i) => (
                    <span
                      key={i}
                      className={`h-[2px] rounded-none transition-all ${
                        i === galleryIdx ? "w-3 bg-[#ff2e2e]" : "w-1 bg-zinc-600"
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        <div className="absolute left-2 bottom-2 flex items-center gap-1.5">
          <span className="font-mono-custom rounded-none border border-zinc-700 bg-zinc-950/80 px-1.5 py-0.5 text-[9px] text-[#ff2e2e]">
            {dossier.id}
          </span>
          <span className="font-mono-custom rounded-none border border-zinc-700 bg-zinc-950/80 px-1.5 py-0.5 text-[9px] text-zinc-400">
            {dossier.year}
          </span>
        </div>
      </div>

      <div className="p-3 sm:p-4">
        <h3 className="font-display text-sm font-bold leading-tight text-zinc-100">
          {dossier.title}
        </h3>
        <p className="mt-2 text-xs leading-relaxed text-zinc-400 line-clamp-4">
          {dossier.description}
        </p>

        <div className="mt-3 flex items-center gap-2 text-[10px] text-zinc-500">
          <span className="text-sm">{getFlag(dossier.hostFlag)}</span>
          <span className="tracking-wider">{dossier.hostNation.toUpperCase()}</span>
          <span className="text-zinc-700">|</span>
          <span className="font-mono-custom">{dossier.year}</span>
        </div>

        <div className="mt-3 flex items-center gap-3">
          <button
            onClick={handleUpvote}
            disabled={localUpvoted}
            className={`flex items-center gap-1.5 rounded-none border px-2.5 py-1 text-xs transition-all ${
              localUpvoted
                ? "border-[#ff2e2e]/40 bg-[#ff2e2e]/10 text-[#ff2e2e]"
                : "border-zinc-700 text-zinc-500 hover:border-zinc-600 hover:text-zinc-300"
            }`}
          >
            <ThumbsUp className="h-3 w-3" />
            <span className="font-mono-custom text-[11px]">{localCount}</span>
          </button>

          {dossier.mediaUrl && dossier.mediaType !== "youtube" && (
            <a
              href={dossier.mediaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 rounded-none border border-zinc-700 px-2.5 py-1 text-xs text-zinc-500 transition-colors hover:border-zinc-600 hover:text-zinc-300"
            >
              <Eye className="h-3 w-3" />
              SOURCE
            </a>
          )}

          {dossier.mediaType === "gallery" && (
            <span className="flex items-center gap-1 text-[10px] text-zinc-600">
              <Image className="h-3 w-3" />
              {dossier.gallery.length} FRAMES
            </span>
          )}
        </div>

        <CommentSection
          dossierId={dossier.id}
          comments={dossier.comments}
          onAddComment={onAddComment}
        />
      </div>
    </motion.div>
  );
}

function getFlag(code: string): string {
  const map: Record<string, string> = {
    "gb-eng": "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    ar: "🇦🇷",
    fr: "🇫🇷",
    kr: "🇰🇷",
    de: "🇩🇪",
    za: "🇿🇦",
    br: "🇧🇷",
    qa: "🇶🇦",
    us: "🇺🇸",
    uy: "🇺🇾",
  };
  return map[code] || "🏳️";
}
