"use client";

import { useEffect, useRef, useState } from "react";
import NextImage from "next/image";
import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "framer-motion";
import {
  Bookmark,
  Check,
  ChevronLeft,
  ChevronRight,
  Link2,
  Play,
  Send,
  ThumbsUp,
  X,
} from "lucide-react";
import { EVIDENCE_NOTE, type Comment, type SecretDossier } from "../../data/secrets";
import { getDossierImage } from "../../data/images";
import { getFootage } from "../../data/media";
import { Flag } from "./flag";
import { useBookmark, useComments, useVote } from "@/lib/store";
import { formatTimestamp, generateId } from "@/lib/utils";
import {
  classificationStyle,
  formatCount,
  getHostCode,
} from "@/lib/dossier-utils";
import { useToast } from "./toast";

interface DossierModalProps {
  dossier: SecretDossier | null;
  onClose: () => void;
  onPlayAnthem: (d: SecretDossier) => void;
  /** Filter the archive down to everything naming this person or body. */
  onSelectPerson: (name: string) => void;
}

export function DossierModal({
  dossier,
  onClose,
  onPlayAnthem,
  onSelectPerson,
}: DossierModalProps) {
  return (
    <Dialog.Root open={!!dossier} onOpenChange={(o) => !o && onClose()}>
      <AnimatePresence>
        {dossier && (
          <DossierModalContent
            key={dossier.id}
            dossier={dossier}
            onPlayAnthem={onPlayAnthem}
            onSelectPerson={onSelectPerson}
          />
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}

function DossierModalContent({
  dossier,
  onPlayAnthem,
  onSelectPerson,
}: {
  dossier: SecretDossier;
  onPlayAnthem: (d: SecretDossier) => void;
  onSelectPerson: (name: string) => void;
}) {
  const { hasVoted, bonus, toggle } = useVote(dossier.id);
  const { bookmarked, toggle: toggleBookmark } = useBookmark(dossier.id);
  const { comments, add } = useComments(dossier.id, dossier.comments);
  const { addToast } = useToast();

  const [galleryIdx, setGalleryIdx] = useState(0);
  const [showVideo, setShowVideo] = useState(false);
  const [copied, setCopied] = useState(false);
  const [author, setAuthor] = useState("");
  const [text, setText] = useState("");
  const commentsEndRef = useRef<HTMLDivElement>(null);

  const cls = classificationStyle(dossier.classification);
  const votes = dossier.upvotes + bonus;
  // Local, verified imagery. Remote stock URLs were rotting (four had already
  // 404'd), so every frame now ships with the app.
  const image = getDossierImage(dossier.id);
  const gallery = image ? [image.src] : [dossier.thumbnailUrl];

  // Genuine documentary/broadcast footage of the real event, where it exists.
  // Presented as journalism, never dressed up as leaked material.
  const footage = getFootage(dossier.id);

  // Arrow keys page the gallery while the modal is open.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") setGalleryIdx((i) => (i - 1 + gallery.length) % gallery.length);
      if (e.key === "ArrowRight") setGalleryIdx((i) => (i + 1) % gallery.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [gallery.length]);

  const handleCopyLink = async () => {
    const url = `${window.location.origin}/?file=${dossier.id}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      addToast("success", "Record link copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      addToast("error", "Could not access the clipboard");
    }
  };

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !text.trim()) return;
    const comment: Comment = {
      id: generateId(),
      author: author.trim(),
      text: text.trim(),
      timestamp: new Date().toISOString(),
    };
    add(comment);
    setText("");
    addToast("success", "Intel logged to the archive");
    setTimeout(() => commentsEndRef.current?.scrollIntoView({ behavior: "smooth" }), 80);
  };

  return (
    <Dialog.Portal forceMount>
      <Dialog.Overlay asChild>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-void/85 backdrop-blur-md"
        />
      </Dialog.Overlay>

      <Dialog.Content asChild>
        <motion.div
          initial={{ opacity: 0, scale: 0.97, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.97, y: 16 }}
          transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
          className="glass-strong elev-3 fixed left-1/2 top-1/2 z-[101] flex max-h-[90vh] w-[min(100vw-1.5rem,60rem)] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden border border-line-strong"
        >
          {/* Header */}
          <header className="flex items-start justify-between gap-4 border-b border-line px-5 py-4 sm:px-7">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={`classification-stamp border px-2 py-1 text-[9px] leading-none ${cls.text} ${cls.border} ${cls.bg}`}
                >
                  {cls.label}
                </span>
                <span className="font-mono-custom text-[10px] tracking-[0.16em] text-redline">
                  {dossier.id}
                </span>
                <span className="h-3 w-px bg-line-strong" />
                <span className="font-mono-custom text-[10px] tracking-[0.16em] text-ink-low">
                  {getHostCode(dossier.hostNation)} · {dossier.year}
                </span>
              </div>
              <Dialog.Title className="font-display mt-2.5 text-balance text-lg leading-tight text-ink-max sm:text-xl">
                {dossier.title}
              </Dialog.Title>
            </div>

            <Dialog.Close asChild>
              <button
                aria-label="Close dossier"
                className="chip flex-shrink-0 border border-line p-2 text-ink-low hover:border-redline/50 hover:text-redline"
              >
                <X className="h-4 w-4" />
              </button>
            </Dialog.Close>
          </header>

          {/* Scroll body */}
          <div className="min-h-0 flex-1 overflow-y-auto">
            {/* Media */}
            <div className="media-vignette relative aspect-[16/8] w-full bg-surface-2">
              {showVideo ? (
                <iframe
                  src={`https://www.youtube.com/embed/${footage?.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                  title={footage?.title ?? `${dossier.year} archive footage`}
                  className="absolute inset-0 h-full w-full"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <>
                  <NextImage
                    key={gallery[galleryIdx]}
                    src={gallery[galleryIdx]}
                    alt={`${dossier.title} — frame ${galleryIdx + 1}`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 60rem"
                    className="object-cover"
                    priority
                  />

                  {gallery.length > 1 && (
                    <>
                      <button
                        onClick={() =>
                          setGalleryIdx((i) => (i - 1 + gallery.length) % gallery.length)
                        }
                        aria-label="Previous frame"
                        className="absolute left-3 top-1/2 z-10 -translate-y-1/2 border border-line-strong bg-void/80 p-2 text-ink-high backdrop-blur-sm transition-colors hover:border-redline hover:text-redline"
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => setGalleryIdx((i) => (i + 1) % gallery.length)}
                        aria-label="Next frame"
                        className="absolute right-3 top-1/2 z-10 -translate-y-1/2 border border-line-strong bg-void/80 p-2 text-ink-high backdrop-blur-sm transition-colors hover:border-redline hover:text-redline"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </button>

                      <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
                        {gallery.map((_, i) => (
                          <button
                            key={i}
                            onClick={() => setGalleryIdx(i)}
                            aria-label={`Frame ${i + 1}`}
                            className={`h-1 transition-all ${
                              i === galleryIdx ? "w-6 bg-ink-high" : "w-2 bg-ink-faint"
                            }`}
                          />
                        ))}
                      </div>
                    </>
                  )}

                  {footage && (
                    <button
                      onClick={() => setShowVideo(true)}
                      className="glass-panel absolute bottom-3 right-3 z-10 flex items-center gap-2 px-3 py-2 text-[11px] text-ink-high transition-colors hover:text-redline"
                    >
                      <Play className="h-3 w-3" />
                      <span className="font-mono-custom tracking-wider">WATCH FOOTAGE</span>
                    </button>
                  )}

                  <span className="absolute left-3 top-3 z-10 flex items-center gap-1.5 border border-line-strong bg-void/80 px-2 py-1 backdrop-blur-sm">
                    <span className="rec-dot" />
                    <span className="timecode-overlay">
                      {image?.provenance === "archive" ? "ARCHIVE PHOTO" : "ILLUSTRATION"}
                    </span>
                  </span>
                </>
              )}
            </div>

            <div className="px-5 py-6 sm:px-7">
              {/* What this evidence tier actually means */}
              {dossier.evidence && (
                <p className="mb-4 text-[11px] leading-relaxed text-ink-mid">
                  <span className="font-mono-custom tracking-wider text-emerald">
                    {dossier.evidence}
                  </span>{" "}
                  — {EVIDENCE_NOTE[dossier.evidence]}
                </p>
              )}

              {/* Image provenance */}
              {image?.provenance === "archive" && image.source && (
                <p className="font-mono-custom mb-4 text-[10px] leading-relaxed text-ink-faint">
                  Photograph:{" "}
                  <a
                    href={image.source}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline text-ink-low hover:text-ink-high"
                  >
                    Wikimedia Commons
                  </a>
                  {image.license ? ` · ${image.license}` : ""}
                  {image.credit ? ` · ${image.credit}` : ""}
                </p>
              )}
              {image?.provenance === "generated" && (
                <p className="font-mono-custom mb-4 text-[10px] text-ink-faint">
                  Image: period-styled illustration — not a photograph of the event.
                </p>
              )}

              {/* Meta strip */}
              <dl className="mb-6 grid grid-cols-2 gap-px overflow-hidden border border-line bg-line sm:grid-cols-4">
                <MetaCell label="HOST">
                  <span className="flex items-center gap-1.5">
                    <Flag code={dossier.hostFlag} nation={dossier.hostNation} />
                    <span className="truncate">{dossier.hostNation}</span>
                  </span>
                </MetaCell>
                <MetaCell label="YEAR" value={String(dossier.year)} />
                <MetaCell label="STATUS" value={cls.label} valueClass={cls.text} />
                <MetaCell label="EVIDENCE" valueClass="text-emerald">
                  {dossier.evidence ?? "UNRATED"}
                </MetaCell>
              </dl>

              {/* Body copy */}
              <div className="prose-invert max-w-none">
                {dossier.summary && (
                  <p className="mb-4 border-l-2 border-redline pl-4 text-pretty text-sm italic leading-relaxed text-ink-high">
                    {dossier.summary}
                  </p>
                )}

                {/* The institutional failure, stated plainly */}
                {dossier.failure && (
                  <div className="mb-5 border border-redline/30 bg-redline/[0.05] px-4 py-3.5">
                    <p className="font-mono-custom text-[9px] tracking-[0.22em] text-redline">
                      THE INSTITUTIONAL FAILURE
                    </p>
                    <p className="mt-2 text-pretty text-[13px] leading-relaxed text-ink-high">
                      {dossier.failure}
                    </p>
                  </div>
                )}
                <p className="text-pretty text-sm leading-[1.85] text-ink-mid">
                  {dossier.description}
                </p>
              </div>

              {/* Tags */}
              {dossier.tags && dossier.tags.length > 0 && (
                <ul className="mt-5 flex flex-wrap gap-1.5">
                  {dossier.tags.map((t) => (
                    <li
                      key={t}
                      className="font-mono-custom border border-line-strong bg-surface-2 px-2 py-1 text-[10px] tracking-wider text-ink-mid"
                    >
                      <span className="text-ink-faint">#</span>
                      {t}
                    </li>
                  ))}
                </ul>
              )}

              {/* Named in this record — click to see every record naming them */}
              {dossier.people && dossier.people.length > 0 && (
                <section className="mt-6">
                  <h3 className="font-mono-custom mb-2.5 text-[9px] tracking-[0.22em] text-ink-low">
                    NAMED IN THIS RECORD
                  </h3>
                  <ul className="flex flex-wrap gap-1.5">
                    {dossier.people.map((name) => (
                      <li key={name}>
                        <button
                          onClick={() => onSelectPerson(name)}
                          title={`Show every record naming ${name}`}
                          className="chip font-mono-custom border border-line-strong bg-surface-2 px-2 py-1 text-[10px] tracking-wider text-ink-mid transition-colors hover:border-cyan/60 hover:text-cyan"
                        >
                          {name}
                        </button>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Sources — the point of a factual archive */}
              {dossier.sources && dossier.sources.length > 0 && (
                <section className="mt-6 border border-emerald/25 bg-emerald/[0.04] px-4 py-3.5">
                  <h3 className="font-mono-custom text-[9px] tracking-[0.22em] text-emerald">
                    SOURCES
                  </h3>
                  <ol className="mt-2.5 space-y-2">
                    {dossier.sources.map((src, i) => (
                      <li key={src.url} className="flex gap-2.5 text-[11px] leading-relaxed">
                        <span className="font-mono-custom flex-shrink-0 text-ink-faint">
                          [{i + 1}]
                        </span>
                        <span className="min-w-0">
                          <a
                            href={src.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="link-underline text-ink-high hover:text-emerald"
                          >
                            {src.title}
                          </a>
                          <span className="text-ink-faint">
                            {" — "}
                            {src.publisher}
                            {src.year ? `, ${src.year}` : ""}
                          </span>
                        </span>
                      </li>
                    ))}
                  </ol>
                </section>
              )}

              {/* Footage attribution — real journalism, labelled as such */}
              {footage && (
                <div className="mt-6 border border-cyan/25 bg-cyan/[0.04] px-4 py-3">
                  <p className="font-mono-custom text-[9px] tracking-[0.22em] text-cyan">
                    REAL ARCHIVE FOOTAGE
                  </p>
                  <p className="mt-1.5 text-xs leading-relaxed text-ink-high">{footage.title}</p>
                  <p className="font-mono-custom mt-1 text-[10px] text-ink-faint">
                    {footage.kind.toUpperCase()} · {footage.channel} · via YouTube
                  </p>
                </div>
              )}

              {/* Anthem — only rendered when a verified recording exists */}
              <div className="mt-4 flex items-center justify-between gap-4 border border-line bg-surface-1 px-4 py-3">
                <div className="min-w-0">
                  <p className="font-mono-custom text-[9px] tracking-[0.22em] text-ink-faint">
                    TOURNAMENT ANTHEM
                  </p>
                  {dossier.anthem ? (
                    <p className="mt-1 truncate text-xs text-ink-high">
                      {dossier.anthem.title}
                      <span className="text-ink-faint"> — {dossier.anthem.artist}</span>
                    </p>
                  ) : (
                    <p className="mt-1 truncate text-xs text-ink-faint">
                      No official song — FIFA tournaments had none before 1962
                    </p>
                  )}
                </div>
                {dossier.anthem && (
                  <button
                    onClick={() => onPlayAnthem(dossier)}
                    className="btn-ghost flex flex-shrink-0 items-center gap-2 px-3 py-2 text-[11px]"
                  >
                    <Play className="h-3 w-3" />
                    <span className="font-mono-custom tracking-wider">PLAY</span>
                  </button>
                )}
              </div>

              {/* Actions */}
              <div className="mt-6 flex flex-wrap items-center gap-2 border-y border-line py-4">
                <button
                  onClick={toggle}
                  aria-pressed={hasVoted}
                  className={`chip flex items-center gap-2 border px-3.5 py-2 text-xs ${
                    hasVoted
                      ? "border-redline/50 bg-redline/12 text-redline"
                      : "border-line text-ink-mid hover:border-line-strong hover:text-ink-high"
                  }`}
                >
                  <ThumbsUp className={`h-3.5 w-3.5 ${hasVoted ? "fill-current" : ""}`} />
                  <span className="font-mono-custom">{formatCount(votes)}</span>
                  <span className="tracking-wider">{hasVoted ? "VERIFIED" : "CORROBORATE"}</span>
                </button>

                <button
                  onClick={toggleBookmark}
                  aria-pressed={bookmarked}
                  className={`chip flex items-center gap-2 border px-3.5 py-2 text-xs ${
                    bookmarked
                      ? "border-amber/50 bg-amber/12 text-amber"
                      : "border-line text-ink-mid hover:border-line-strong hover:text-ink-high"
                  }`}
                >
                  <Bookmark className={`h-3.5 w-3.5 ${bookmarked ? "fill-current" : ""}`} />
                  <span className="tracking-wider">{bookmarked ? "SAVED" : "SAVE"}</span>
                </button>

                <button
                  onClick={handleCopyLink}
                  className="chip flex items-center gap-2 border border-line px-3.5 py-2 text-xs text-ink-mid hover:border-line-strong hover:text-ink-high"
                >
                  {copied ? <Check className="h-3.5 w-3.5 text-emerald" /> : <Link2 className="h-3.5 w-3.5" />}
                  <span className="tracking-wider">{copied ? "COPIED" : "SHARE"}</span>
                </button>
              </div>

              {/* Comments */}
              <section className="mt-6">
                <h3 className="font-display mb-4 flex items-center gap-2 text-xs text-ink-high">
                  FIELD REPORTS
                  <span className="font-mono-custom text-[10px] text-ink-faint">
                    ({comments.length})
                  </span>
                </h3>

                <ul className="space-y-2.5">
                  {comments.length === 0 && (
                    <li className="border border-dashed border-line py-8 text-center">
                      <p className="font-mono-custom text-[11px] text-ink-faint">
                        NO FIELD REPORTS FILED
                      </p>
                      <p className="mt-1 text-[11px] text-ink-faint">
                        Be the first to corroborate this record.
                      </p>
                    </li>
                  )}
                  {comments.map((c) => (
                    <li key={c.id} className="border border-line bg-surface-1 px-4 py-3">
                      <div className="flex items-baseline justify-between gap-3">
                        <span className="font-mono-custom text-[10px] font-bold tracking-[0.14em] text-redline">
                          {c.author.toUpperCase()}
                        </span>
                        <time className="font-mono-custom text-[9px] text-ink-faint">
                          {formatTimestamp(c.timestamp)}
                        </time>
                      </div>
                      <p className="mt-1.5 text-xs leading-relaxed text-ink-mid">{c.text}</p>
                    </li>
                  ))}
                  <div ref={commentsEndRef} />
                </ul>

                <form onSubmit={handleSubmitComment} className="mt-4 space-y-2.5">
                  <input
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="Your alias"
                    maxLength={30}
                    required
                    aria-label="Your alias"
                    className="w-full border border-line bg-surface-1 px-3.5 py-2.5 text-xs text-ink-high placeholder-ink-faint outline-none transition-colors focus:border-redline/60"
                  />
                  <div className="flex gap-2">
                    <textarea
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      placeholder="Add corroborating intel…"
                      maxLength={400}
                      rows={2}
                      required
                      aria-label="Your report"
                      className="flex-1 resize-none border border-line bg-surface-1 px-3.5 py-2.5 text-xs leading-relaxed text-ink-high placeholder-ink-faint outline-none transition-colors focus:border-redline/60"
                    />
                    <button
                      type="submit"
                      disabled={!author.trim() || !text.trim()}
                      aria-label="File report"
                      className="btn-primary flex w-11 flex-shrink-0 items-center justify-center disabled:cursor-not-allowed disabled:opacity-35"
                    >
                      <Send className="h-4 w-4" />
                    </button>
                  </div>
                  <p className="text-right">
                    <span className="font-mono-custom text-[9px] text-ink-faint">
                      {text.length}/400
                    </span>
                  </p>
                </form>
              </section>
            </div>
          </div>
        </motion.div>
      </Dialog.Content>
    </Dialog.Portal>
  );
}

function MetaCell({
  label,
  value,
  valueClass = "text-ink-high",
  children,
}: {
  label: string;
  /** Plain text value. Ignored when `children` is supplied. */
  value?: string;
  valueClass?: string;
  /** Rich content, for cells that need a flag image or other markup. */
  children?: React.ReactNode;
}) {
  return (
    <div className="bg-surface-0 px-3.5 py-3">
      <dt className="font-mono-custom text-[9px] tracking-[0.2em] text-ink-low">{label}</dt>
      <dd className={`font-mono-custom mt-1 truncate text-[11px] ${valueClass}`}>
        {children ?? value}
      </dd>
    </div>
  );
}
