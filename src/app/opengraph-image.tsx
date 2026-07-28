import { ImageResponse } from "next/og";
import { allDossiers } from "../../data/secrets";
import { EXHIBITS } from "../../data/documents";

const RECORD_COUNT = allDossiers.length;
const FIRST_YEAR = Math.min(...allDossiers.map((d) => d.year));
const LAST_YEAR = Math.max(...allDossiers.map((d) => d.year));
const DOCUMENT_COUNT = Object.keys(EXHIBITS).length;

export const alt = "FIFA Redacted — a sourced archive of FIFA's institutional failures";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Social preview card, rendered at request time via next/og.
 *
 * Deliberately NOT on the edge runtime: OpenNext requires edge functions to be
 * bundled separately and fails the Cloudflare Workers build otherwise.
 * ImageResponse only understands inline styles, so no Tailwind classes here.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#08080a",
          backgroundImage:
            "radial-gradient(circle at 15% 15%, rgba(255,59,48,0.20), transparent 45%), radial-gradient(circle at 85% 75%, rgba(245,165,36,0.13), transparent 45%)",
          padding: 72,
          fontFamily: "sans-serif",
        }}
      >
        {/* Top rule */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 12, height: 12, borderRadius: 6, background: "#ff3b30" }} />
          <div
            style={{
              color: "#a8a8b3",
              fontSize: 20,
              letterSpacing: 5,
              fontWeight: 700,
            }}
          >
            A SOURCED PUBLIC ARCHIVE
          </div>
        </div>

        {/* Title lockup */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 128,
              fontWeight: 900,
              color: "#f7f7f8",
              letterSpacing: -4,
              lineHeight: 1,
              display: "flex",
            }}
          >
            FIFA
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 24, marginTop: 4 }}>
            <div
              style={{
                fontSize: 128,
                fontWeight: 900,
                color: "#ff3b30",
                letterSpacing: -4,
                lineHeight: 1,
                display: "flex",
              }}
            >
              REDACTED
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 12 }}>
              <div style={{ width: 180, height: 14, background: "#ff3b30", opacity: 0.85 }} />
              <div style={{ width: 130, height: 14, background: "#ff3b30", opacity: 0.5 }} />
            </div>
          </div>

          <div
            style={{
              marginTop: 28,
              fontSize: 27,
              color: "#a8a8b3",
              maxWidth: 880,
              lineHeight: 1.4,
              display: "flex",
            }}
          >
            Indictments, buried reports and the warnings FIFA had in writing beforehand —
            every record cited and graded by the strength of the evidence.
          </div>
        </div>

        {/* Footer stats — derived from the data, never hardcoded. These were
            stale ("23 records", "1930–2026") while the archive actually held
            20 records from 1921, which is exactly the sort of error that
            undermines a card claiming every claim is sourced. */}
        <div style={{ display: "flex", alignItems: "center", gap: 48 }}>
          {[
            [String(RECORD_COUNT), "RECORDS"],
            [`${FIRST_YEAR}–${LAST_YEAR}`, "SPAN"],
            [`${DOCUMENT_COUNT} PRIMARY DOCS`, "QUOTED VERBATIM"],
          ].map(([value, label]) => (
            <div key={label} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <div style={{ fontSize: 34, fontWeight: 800, color: "#f7f7f8", display: "flex" }}>
                {value}
              </div>
              <div
                style={{
                  fontSize: 16,
                  letterSpacing: 4,
                  color: "#4a4a57",
                  fontWeight: 700,
                  display: "flex",
                }}
              >
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
    size
  );
}
