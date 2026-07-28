"use client";

import NextImage from "next/image";
import { motion } from "framer-motion";
import { MessageSquare, Play, ThumbsUp } from "lucide-react";
import type { SecretDossier } from "../../data/secrets";
import { getDossierImage } from "../../data/images";
import { Flag } from "./flag";
import { useStore, useVote } from "@/lib/store";
import {
  classificationStyle,
  formatCount,
  getHostCode,
} from "@/lib/dossier-utils";

interface DossierListRowProps {
  dossier: SecretDossier;
  index: number;
  onOpen: (d: SecretDossier) => void;
  onPlayAnthem: (d: SecretDossier) => void;
}

export function DossierListRow({ dossier, index, onOpen, onPlayAnthem }: DossierListRowProps) {
  const { hasVoted, bonus, toggle } = useVote(dossier.id);
  const store = useStore();

  const cls = classificationStyle(dossier.classification);
  const votes = dossier.upvotes + bonus;
  const commentCount = dossier.comments.length + (store.comments[dossier.id]?.length ?? 0);
  const poster = getDossierImage(dossier.id)?.src ?? dossier.thumbnailUrl;

  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.025, 0.2) }}
      className="group flex items-center gap-4 py-4 transition-colors hover:bg-surface-1/60"
    >
      <button
        onClick={() => onOpen(dossier)}
        aria-label={`Open dossier: ${dossier.title}`}
        className="relative hidden h-16 w-24 flex-shrink-0 overflow-hidden bg-surface-2 sm:block"
      >
        <NextImage
          src={poster}
          alt=""
          fill
          sizes="96px"
          className="archival-photo object-cover"
          loading="lazy"
        />
      </button>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={`font-mono-custom border px-1.5 py-0.5 text-[9px] tracking-wider ${cls.text} ${cls.border}`}
          >
            {cls.label}
          </span>
          <span className="font-mono-custom text-[10px] text-ink-faint">{dossier.id}</span>
          <span className="font-mono-custom flex items-center gap-1 text-[10px] text-ink-faint">
            <Flag code={dossier.hostFlag} nation={dossier.hostNation} />
            {getHostCode(dossier.hostNation)} · {dossier.year}
          </span>
        </div>

        <h3 className="mt-1.5">
          <button
            onClick={() => onOpen(dossier)}
            className="font-display text-left text-sm leading-snug text-ink-max transition-colors hover:text-redline-soft"
          >
            {dossier.title}
          </button>
        </h3>

        <p className="mt-1 line-clamp-1 text-xs text-ink-low">
          {dossier.summary ?? dossier.description}
        </p>
      </div>

      <div className="flex flex-shrink-0 items-center gap-1.5">
        <button
          onClick={toggle}
          aria-pressed={hasVoted}
          aria-label={hasVoted ? "Remove your vote" : "Upvote"}
          className={`chip flex items-center gap-1.5 border px-2 py-1.5 text-[11px] ${
            hasVoted
              ? "border-redline/50 bg-redline/12 text-redline"
              : "border-line text-ink-low hover:text-ink-high"
          }`}
        >
          <ThumbsUp className={`h-3 w-3 ${hasVoted ? "fill-current" : ""}`} />
          <span className="font-mono-custom">{formatCount(votes)}</span>
        </button>

        <span className="font-mono-custom hidden items-center gap-1.5 border border-line px-2 py-1.5 text-[11px] text-ink-low sm:flex">
          <MessageSquare className="h-3 w-3" />
          {commentCount}
        </span>

        {dossier.anthem && (
          <button
            onClick={() => onPlayAnthem(dossier)}
            aria-label={`Play the ${dossier.year} anthem`}
            className="chip hidden items-center justify-center border border-line p-1.5 text-ink-low hover:border-redline/50 hover:text-redline sm:flex"
          >
            <Play className="h-3 w-3" />
          </button>
        )}
      </div>
    </motion.li>
  );
}
