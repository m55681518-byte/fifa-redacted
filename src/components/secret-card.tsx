"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronUp,
  Calendar,
  Video,
  Image,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
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
      ? "text-accent-red border-accent-red"
      : dossier.classification === "CONFIDENTIAL"
        ? "text-accent-yellow border-accent-yellow"
        : "text-dossier-400 border-dossier-500";

  const hasGallery = dossier.gallery && dossier.gallery.length > 0;
  const currentMedia =
    dossier.mediaType === "youtube"
      ? dossier.mediaUrl
      : hasGallery
        ? dossier.gallery[galleryIdx]
        : dossier.thumbnailUrl;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="group relative overflow-hidden rounded-xl border border-dossier-700/80 bg-dossier-800/30 transition-all hover:border-dossier-600 hover:shadow-[0_0_40px_rgba(239,68,68,0.08)]"
    >
      <div className="absolute right-3 top-3 z-20">
        <span
          className={`classification-stamp inline-block rounded border px-2 py-0.5 text-[9px] leading-none tracking-[0.2em] ${classificationColor}`}
        >
          {dossier.classification}
        </span>
      </div>

      <div className="relative h-52 overflow-hidden bg-dossier-900">
        {dossier.mediaType === "youtube" && !videoError ? (
          <iframe
            src={`${dossier.mediaUrl}?autoplay=0&rel=0&showinfo=0&modestbranding=1`}
            className="h-full w-full"
            allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
            onError={() => setVideoError(true)}
          />
        ) : videoError || dossier.mediaType === "gallery" ? (
          <div className="relative h-full w-full">
            <img
              src={currentMedia}
              alt={dossier.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            {videoError && (
              <div className="absolute inset-0 flex items-center justify-center bg-dossier-900/80">
                <div className="flex flex-col items-center gap-1">
                  <AlertTriangle className="h-5 w-5 text-accent-amber" />
                  <span className="text-[10px] text-dossier-500">Video unavailable</span>
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
                  className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-dossier-900/70 p-1 text-dossier-300 opacity-0 transition-opacity hover:bg-dossier-800 group-hover:opacity-100"
                >
                  <ChevronLeft className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setGalleryIdx((p) => (p + 1) % dossier.gallery.length);
                  }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-dossier-900/70 p-1 text-dossier-300 opacity-0 transition-opacity hover:bg-dossier-800 group-hover:opacity-100"
                >
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>
                <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1">
                  {dossier.gallery.map((_, i) => (
                    <span
                      key={i}
                      className={`h-1 rounded-full transition-all ${
                        i === galleryIdx ? "w-3 bg-accent-red" : "w-1 bg-dossier-600"
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        ) : (
          <img
            src={currentMedia}
            alt={dossier.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        )}

        <div className="absolute left-3 bottom-3 flex items-center gap-2">
          <span className="rounded-md border border-dossier-700 bg-dossier-900/80 px-2 py-0.5 font-mono-custom text-[10px] text-accent-red">
            {dossier.id}
          </span>
          <span className="rounded-md border border-dossier-700 bg-dossier-900/80 px-2 py-0.5 text-[10px] text-dossier-400">
            <Calendar className="mr-1 inline h-3 w-3" />
            {dossier.year}
          </span>
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-sm font-bold leading-tight text-dossier-100">
          {dossier.title}
        </h3>
        <p className="mt-2 text-xs leading-relaxed text-dossier-400 line-clamp-4">
          {dossier.description}
        </p>

        <div className="mt-3 flex items-center gap-2 text-[10px] text-dossier-600">
          <span className="text-sm">{getFlag(dossier.hostFlag)}</span>
          <span>{dossier.hostNation}</span>
        </div>

        <div className="mt-3 flex items-center gap-3">
          <button
            onClick={handleUpvote}
            disabled={localUpvoted}
            className={`flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs transition-all ${
              localUpvoted
                ? "border-accent-red/40 bg-accent-red/10 text-accent-red"
                : "border-dossier-700 text-dossier-500 hover:border-dossier-600 hover:text-dossier-300"
            }`}
          >
            <ChevronUp className="h-3.5 w-3.5" />
            <span className="font-mono-custom text-[11px]">{localCount}</span>
          </button>

          {dossier.mediaUrl && dossier.mediaType !== "youtube" && (
            <a
              href={dossier.mediaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 rounded-md border border-dossier-700 px-2.5 py-1 text-xs text-dossier-500 transition-colors hover:border-dossier-600 hover:text-dossier-300"
            >
              <ExternalLink className="h-3 w-3" />
              View Source
            </a>
          )}

          {dossier.mediaType === "gallery" && (
            <span className="flex items-center gap-1 text-[10px] text-dossier-600">
              <Image className="h-3 w-3" />
              {dossier.gallery.length} photos
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
