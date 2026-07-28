"use client";

import { ExternalLink, Quote } from "lucide-react";
import { EXHIBIT_KIND_LABEL, type Exhibit } from "../../data/documents";

/**
 * Renders a primary document in place of video, for the records where no
 * honest footage exists.
 *
 * Deliberately typeset as a document rather than a slick media player: mono
 * header block, ruled margin, visible provenance. The point is that the reader
 * is looking at paper, not at a production.
 */
export function ExhibitViewer({ exhibit }: { exhibit: Exhibit }) {
  const primary = exhibit.provenance === "primary";

  return (
    <div className="exhibit-scroll absolute inset-0 overflow-y-auto bg-[#0b0b0f]">
      {/* Faint ruled paper grain, purely decorative */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to bottom, transparent 0 27px, rgba(255,255,255,0.022) 27px 28px)",
        }}
      />

      <div className="relative px-5 py-5 sm:px-7">
        {/* Document header */}
        <div className="border-b border-line pb-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono-custom border border-amber/40 bg-amber/10 px-2 py-1 text-[9px] leading-none tracking-[0.18em] text-amber">
              EXHIBIT
            </span>
            <span className="font-mono-custom text-[9px] tracking-[0.18em] text-ink-low">
              {EXHIBIT_KIND_LABEL[exhibit.kind].toUpperCase()}
            </span>
            <span
              className={`font-mono-custom border px-2 py-1 text-[9px] leading-none tracking-[0.16em] ${
                primary
                  ? "border-emerald/40 bg-emerald/10 text-emerald"
                  : "border-cyan/40 bg-cyan/10 text-cyan"
              }`}
              title={
                primary
                  ? "The document is public and quoted directly."
                  : "The document is not public in full. Wording is quoted from the news organisation that obtained it."
              }
            >
              {primary ? "QUOTED FROM DOCUMENT" : "QUOTED VIA REPORTING"}
            </span>
          </div>

          <h4 className="font-display mt-2.5 text-balance text-sm leading-snug text-ink-max sm:text-base">
            {exhibit.title}
          </h4>

          <dl className="mt-2.5 grid gap-x-6 gap-y-1 text-[11px] sm:grid-cols-2">
            <div className="flex gap-2">
              <dt className="font-mono-custom flex-shrink-0 text-[9px] tracking-[0.16em] text-ink-faint">
                ISSUER
              </dt>
              <dd className="min-w-0 text-ink-mid">{exhibit.issuer}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="font-mono-custom flex-shrink-0 text-[9px] tracking-[0.16em] text-ink-faint">
                DATED
              </dt>
              <dd className="min-w-0 text-ink-mid">{exhibit.dated}</dd>
            </div>
          </dl>

          <p className="mt-2 flex gap-2 text-[11px] leading-relaxed">
            <span className="font-mono-custom flex-shrink-0 text-[9px] tracking-[0.16em] text-ink-faint">
              DISCLOSURE
            </span>
            <span className="text-ink-mid">{exhibit.disclosure}</span>
          </p>
        </div>

        {/* Excerpts */}
        <ol className="mt-4 space-y-4">
          {exhibit.excerpts.map((ex, i) => (
            <li key={i} className="relative pl-4">
              <span
                aria-hidden
                className={`absolute left-0 top-1 h-[calc(100%-0.25rem)] w-px ${
                  ex.response ? "bg-cyan/40" : "bg-redline/40"
                }`}
              />

              <blockquote className="text-[13px] leading-relaxed text-ink-high">
                <Quote
                  aria-hidden
                  className="mr-1.5 inline h-3 w-3 -translate-y-0.5 text-ink-faint"
                />
                {ex.text}
              </blockquote>

              {ex.original && (
                <p
                  lang="de"
                  className="mt-1.5 text-[11px] italic leading-relaxed text-ink-low"
                >
                  {ex.original}
                </p>
              )}

              {ex.attribution && (
                <p
                  className={`font-mono-custom mt-1.5 text-[10px] tracking-wide ${
                    ex.response ? "text-cyan" : "text-ink-low"
                  }`}
                >
                  — {ex.attribution}
                  {ex.response && " · RESPONSE"}
                </p>
              )}

              {ex.note && (
                <p className="mt-1.5 text-[11px] leading-relaxed text-ink-low">{ex.note}</p>
              )}
            </li>
          ))}
        </ol>

        {/* Provenance footer */}
        <div className="mt-5 border-t border-line pt-3">
          <p className="text-[11px] leading-relaxed text-ink-low">
            {primary
              ? "Text above is verbatim from the document. Editorial context is set apart in grey and never mixed into a quotation."
              : "This document has not been published in full. The wording above is quoted from the news organisation that obtained it, and is labelled as such rather than presented as the paper itself."}
          </p>
          <a
            href={exhibit.via.url}
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline mt-2 inline-flex items-center gap-1.5 text-[11px] text-ink-mid hover:text-emerald"
          >
            <ExternalLink className="h-3 w-3" />
            Source: {exhibit.via.publisher}
          </a>
        </div>
      </div>
    </div>
  );
}
