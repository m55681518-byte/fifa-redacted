"use client";

import { useCallback, useRef } from "react";
import NextImage from "next/image";
import { motion } from "framer-motion";
import { Bookmark, FileText, MessageSquare, Play, ThumbsUp } from "lucide-react";
import type { SecretDossier } from "../../data/secrets";
import { getDossierImage } from "../../data/images";
import { getFootage } from "../../data/media";
import { getExhibit } from "../../data/documents";
import { Flag } from "./flag";
import { useBookmark, useStore, useVote } from "@/lib/store";
import {
  classificationStyle,
  formatCount,
  getHostCode,
} from "@/lib/dossier-utils";

interface SecretCardProps {
  dossier: SecretDossier;
  index: number;
  onOpen: (d: SecretDossier) => void;
  onPlayAnthem: (d: SecretDossier) => void;
}

export function SecretCard({ dossier, index, onOpen, onPlayAnthem }: SecretCardProps) {
  const { hasVoted, bonus, toggle } = useVote(dossier.id);
  const { bookmarked, toggle: toggleBookmark } = useBookmark(dossier.id);
  const store = useStore();

  const cls = classificationStyle(dossier.classification);
  const votes = dossier.upvotes + bonus;
  const commentCount = dossier.comments.length + (store.comments[dossier.id]?.length ?? 0);

  // Prefer a still frame over an embedded player: 23 iframes would wreck LCP.
  // Verified local imagery: a real archive photograph where a freely licensed
  // one exists, otherwise a period-styled illustration. Both ship with the app,
  // so nothing here can 404 the way remote stock URLs did.
  const image = getDossierImage(dossier.id);
  const footage = getFootage(dossier.id);
  const exhibit = getExhibit(dossier.id);
  const poster = image?.src ?? dossier.thumbnailUrl;

  // Card tilt. The pointer position is written to CSS variables on the element
  // itself, so the transform happens on the compositor and React never
  // re-renders while the pointer moves across a grid of 20 cards.
  const tiltRef = useRef<HTMLDivElement>(null);
  const onPointerMove = useCallback((e: React.PointerEvent) => {
    const el = tiltRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--cx", (((e.clientX - r.left) / r.width - 0.5) * 2).toFixed(3));
    el.style.setProperty("--cy", (((e.clientY - r.top) / r.height - 0.5) * 2).toFixed(3));
  }, []);
  const onPointerLeave = useCallback(() => {
    const el = tiltRef.current;
    if (!el) return;
    el.style.setProperty("--cx", "0");
    el.style.setProperty("--cy", "0");
  }, []);

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.04, 0.3), ease: [0.16, 1, 0.3, 1] }}
      className="card-3d group"
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
    <div ref={tiltRef} className="card-3d-inner dossier-card flex h-full flex-col">
      <span className="card-3d-sheen" aria-hidden />
      <span className="crosshair crosshair-tl" aria-hidden />
      <span className="crosshair crosshair-tr" aria-hidden />
      <span className="crosshair crosshair-bl" aria-hidden />
      <span className="crosshair crosshair-br" aria-hidden />

      {/* Media */}
      <button
        onClick={() => onOpen(dossier)}
        aria-label={`Open dossier: ${dossier.title}`}
        className="media-vignette relative block h-48 w-full overflow-hidden bg-surface-2 text-left"
      >
        <NextImage
          src={poster}
          alt=""
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="archival-photo object-cover group-hover:scale-[1.06]"
          loading={index < 3 ? "eager" : "lazy"}
          priority={index < 3}
        />

        {/* Classification stamp */}
        <span
          className={`classification-stamp absolute right-3 top-3 z-10 border px-2 py-1 text-[9px] leading-none ${cls.text} ${cls.border} ${cls.bg}`}
        >
          {cls.label}
        </span>

        {/* Provenance badge */}
        {image && (
          <span
            className="font-mono-custom absolute left-3 top-3 z-10 border border-line-strong bg-void/85 px-1.5 py-0.5 text-[8px] tracking-[0.14em] text-ink-mid backdrop-blur-sm"
            title={
              image.provenance === "archive"
                ? `Archive photograph — ${image.credit ?? "Wikimedia Commons"}`
                : "Period-styled illustration, not a photograph"
            }
          >
            {image.provenance === "archive" ? "ARCHIVE PHOTO" : "ILLUSTRATION"}
          </span>
        )}

        {/* Evidence tier — the strength of the proof, visible at a glance —
            and what medium backs it: film where honest film exists, the
            primary document where it doesn't. */}
        <span className="absolute bottom-3 left-3 z-10 flex items-center gap-1.5">
          {dossier.evidence && (
            <span
              className="font-mono-custom border border-emerald/40 bg-void/85 px-1.5 py-0.5 text-[9px] tracking-[0.14em] text-emerald backdrop-blur-sm"
              title={`Evidence: ${dossier.evidence}`}
            >
              {dossier.evidence}
            </span>
          )}
          {footage ? (
            <span
              className="font-mono-custom flex items-center gap-1 border border-cyan/40 bg-void/85 px-1.5 py-0.5 text-[9px] tracking-[0.14em] text-cyan backdrop-blur-sm"
              title={`Archive footage: ${footage.title}`}
            >
              <Play className="h-2 w-2" />
              FILM
            </span>
          ) : exhibit ? (
            <span
              className="font-mono-custom flex items-center gap-1 border border-amber/40 bg-void/85 px-1.5 py-0.5 text-[9px] tracking-[0.14em] text-amber backdrop-blur-sm"
              title={`Primary document: ${exhibit.title}`}
            >
              <FileText className="h-2 w-2" />
              DOC
            </span>
          ) : null}
        </span>

        {/* Credibility meter */}
        {dossier.credibility != null && (
          <span
            className="absolute bottom-3 right-3 z-10 flex items-center gap-0.5"
            title={`Substantiation: ${dossier.credibility}/5`}
          >
            {Array.from({ length: 5 }).map((_, i) => (
              <span
                key={i}
                className={`h-2.5 w-[3px] ${
                  i < dossier.credibility! ? "bg-amber" : "bg-line-strong"
                }`}
              />
            ))}
          </span>
        )}
      </button>

      {/* Body */}
      <div className="flex flex-1 flex-col p-4">
        <div className="mb-2.5 flex items-center gap-2 text-[10px] text-ink-faint">
          <span className="font-mono-custom tracking-[0.14em]">
            {getHostCode(dossier.hostNation)}
          </span>
          <span className="h-2.5 w-px bg-line-strong" />
          <span className="font-mono-custom tracking-[0.14em]">{dossier.id}</span>
        </div>

        <h3 className="font-display text-balance text-sm leading-snug text-ink-max transition-colors group-hover:text-redline-soft">
          <button onClick={() => onOpen(dossier)} className="text-left">
            {dossier.title}
          </button>
        </h3>

        <p className="mt-2.5 line-clamp-3 flex-1 text-xs leading-relaxed text-ink-mid">
          {dossier.summary ?? dossier.description}
        </p>

        {/* Host nation — flag + full name, under the description */}
        <div className="mt-3 flex items-center gap-2 border-t border-line/60 pt-3">
          <Flag code={dossier.hostFlag} nation={dossier.hostNation} className="h-[1.05em]" />
          <span className="font-mono-custom text-[10px] tracking-[0.14em] text-ink-mid">
            {dossier.hostNation.toUpperCase()}
          </span>
          <span className="font-mono-custom ml-auto text-[10px] tracking-[0.14em] text-ink-faint">
            {dossier.year}
          </span>
        </div>

        {/* Tags */}
        {dossier.tags && dossier.tags.length > 0 && (
          <ul className="mt-3.5 flex flex-wrap gap-1.5">
            {dossier.tags.slice(0, 3).map((t) => (
              <li
                key={t}
                className="font-mono-custom border border-line-strong bg-surface-2 px-2 py-[3px] text-[10px] tracking-wider text-ink-mid"
              >
                <span className="text-ink-faint">#</span>
                {t}
              </li>
            ))}
          </ul>
        )}

        {/* Actions */}
        <div className="mt-4 flex items-center gap-1.5 border-t border-line pt-3.5">
          <button
            onClick={toggle}
            aria-pressed={hasVoted}
            aria-label={hasVoted ? "Remove your vote" : "Upvote this dossier"}
            className={`chip flex items-center gap-1.5 border px-2.5 py-1.5 text-[11px] ${
              hasVoted
                ? "border-redline/50 bg-redline/12 text-redline"
                : "border-line text-ink-low hover:border-line-strong hover:text-ink-high"
            }`}
          >
            <ThumbsUp className={`h-3 w-3 ${hasVoted ? "fill-current" : ""}`} />
            <span className="font-mono-custom">{formatCount(votes)}</span>
          </button>

          <button
            onClick={() => onOpen(dossier)}
            aria-label={`Read ${commentCount} comments`}
            className="chip flex items-center gap-1.5 border border-line px-2.5 py-1.5 text-[11px] text-ink-low hover:border-line-strong hover:text-ink-high"
          >
            <MessageSquare className="h-3 w-3" />
            <span className="font-mono-custom">{commentCount}</span>
          </button>

          <button
            onClick={toggleBookmark}
            aria-pressed={bookmarked}
            aria-label={bookmarked ? "Remove bookmark" : "Bookmark this dossier"}
            className={`chip ml-auto flex items-center justify-center border p-1.5 ${
              bookmarked
                ? "border-amber/50 bg-amber/12 text-amber"
                : "border-line text-ink-low hover:border-line-strong hover:text-ink-high"
            }`}
          >
            <Bookmark className={`h-3 w-3 ${bookmarked ? "fill-current" : ""}`} />
          </button>

          {dossier.anthem && (
            <button
              onClick={() => onPlayAnthem(dossier)}
              aria-label={`Play the ${dossier.year} anthem: ${dossier.anthem.title}`}
              className="chip flex items-center justify-center border border-line p-1.5 text-ink-low hover:border-redline/50 hover:text-redline"
            >
              <Play className="h-3 w-3" />
            </button>
          )}
        </div>
      </div>
    </div>
    </motion.article>
  );
}
