"use client";

import { AlertTriangle, Code2, Shield } from "lucide-react";

export function Footer({ recordCount }: { recordCount: number }) {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-24 border-t border-line bg-surface-0">
      {/* Editorial standards — static. This was a perpetual marquee, which
          pulled the eye away from the records for no informational gain. */}
      <div className="border-b border-line">
        <ul className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-6 gap-y-2 px-4 py-3.5 sm:px-6 lg:px-8">
          {[
            "Independent archive",
            "Not affiliated with FIFA",
            "Every claim sourced",
            "Corrections welcome",
          ].map((t, i) => (
            <li key={t} className="flex items-center gap-6">
              {i > 0 && <span className="text-ink-faint" aria-hidden>·</span>}
              <span className="font-mono-custom text-[10px] tracking-[0.18em] text-ink-low">
                {t.toUpperCase()}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center border border-line-strong bg-surface-2">
                <Shield className="h-4 w-4 text-redline" />
              </span>
              <span>
                <span className="font-display block text-xs tracking-[0.14em] text-ink-max">
                  FIFA<span className="text-redline">REDACTED</span>
                </span>
                <span className="font-mono-custom block text-[8px] tracking-[0.26em] text-ink-faint">
                  SECRETS ARCHIVE
                </span>
              </span>
            </div>
            <p className="mt-4 max-w-sm text-pretty text-xs leading-relaxed text-ink-low">
              An independent, sourced record of what football&apos;s governing body did:
              the prosecutions, the suppressed investigations and the warnings it received
              in writing and overruled. Every claim is cited.
            </p>
          </div>

          <nav aria-label="Archive">
            <h2 className="font-mono-custom mb-3.5 text-[10px] tracking-[0.22em] text-ink-faint">
              ARCHIVE
            </h2>
            <ul className="space-y-2.5">
              {[
                { label: "All records", href: "#archive" },
                { label: "Timeline", href: "#timeline" },
                { label: "Submit a file", href: "#archive" },
              ].map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="link-underline text-xs text-ink-mid transition-colors hover:text-ink-max"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="font-mono-custom mb-3.5 text-[10px] tracking-[0.22em] text-ink-faint">
              STATUS
            </h2>
            <dl className="space-y-2.5 text-xs">
              <div className="flex items-center justify-between gap-4">
                <dt className="text-ink-low">Records</dt>
                <dd className="font-mono-custom text-ink-high">{recordCount}</dd>
              </div>
              <div className="flex items-center justify-between gap-4">
                <dt className="text-ink-low">Archive</dt>
                <dd className="flex items-center gap-1.5">
                  <span className="live-dot" />
                  <span className="font-mono-custom text-emerald">ONLINE</span>
                </dd>
              </div>
              <div className="flex items-center justify-between gap-4">
                <dt className="text-ink-low">Updated</dt>
                <dd className="font-mono-custom text-ink-high">{year}</dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-10 flex items-start gap-3 border border-amber/25 bg-amber/[0.04] px-4 py-3.5">
          <AlertTriangle className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-amber" />
          <p className="text-pretty text-[11px] leading-relaxed text-ink-low">
            <strong className="text-amber">About this archive.</strong> Every record here
            describes real events and cites its sources. Each is labelled{" "}
            <span className="text-emerald">DOCUMENTED</span> where established by court
            records, official reports or admissions;{" "}
            <span className="text-amber">DISPUTED</span> where credible allegations are
            denied or unproven; and <span className="text-cyan">UNRESOLVED</span> where the
            evidence genuinely runs out. This site is independent and is not affiliated
            with, endorsed by, or connected to FIFA or any football association.
          </p>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-line pt-6 sm:flex-row">
          <p className="font-mono-custom text-[10px] tracking-wider text-ink-faint">
            © {year} FIFA REDACTED — UNOFFICIAL ARCHIVE
          </p>
          <a
            href="https://github.com/m55681518-byte/fifa-redacted"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-ink-faint transition-colors hover:text-ink-high"
          >
            <Code2 className="h-3.5 w-3.5" />
            <span className="font-mono-custom text-[10px] tracking-wider">SOURCE</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
