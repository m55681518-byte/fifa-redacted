"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronUp, Calendar, Image, Video, ExternalLink } from "lucide-react";
import type { SecretDossier, Comment } from "../../data/secrets";
import { CommentSection } from "./comment-section";

const AVATARS = [
  "🔴", "🟠", "🟡", "🟢", "🔵", "🟣", "⚫", "⚪",
];

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

  useEffect(() => {
    const stored = localStorage.getItem(`upvoted_${dossier.id}`);
    if (stored === "true") {
      setLocalUpvoted(true);
    }
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

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="group relative overflow-hidden rounded-xl border border-dossier-700 bg-dossier-800/50 transition-all hover:border-dossier-600 hover:shadow-[0_0_30px_rgba(239,68,68,0.08)]"
    >
      <div className="absolute right-3 top-3 z-10">
        <span
          className={`classification-stamp inline-block rounded border px-2 py-0.5 text-[9px] leading-none tracking-[0.2em] ${classificationColor}`}
        >
          {dossier.classification}
        </span>
      </div>

      <div className="relative h-48 overflow-hidden bg-dossier-900">
        {dossier.mediaType === "youtube" ? (
          <iframe
            src={`${dossier.mediaUrl}?autoplay=0&rel=0&showinfo=0`}
            className="h-full w-full"
            allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
          />
        ) : (
          <img
            src={dossier.thumbnailUrl}
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
        <p className="mt-2 text-xs leading-relaxed text-dossier-400 line-clamp-3">
          {dossier.description}
        </p>

        <div className="mt-3 flex items-center gap-2 text-[10px] text-dossier-600">
          <img
            src={`https://flagsapi.com/${dossier.hostNation === "England" ? "GB-ENG" : dossier.hostNation === "South Korea & Japan" ? "KR" : dossier.hostNation === "USA, Canada & Mexico" ? "US" : dossier.hostNation.substring(0, 2).toUpperCase()}/flat/24.png`}
            alt={dossier.hostNation}
            className="h-3 w-4 rounded-sm object-cover"
            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
          />
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
              View
            </a>
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
