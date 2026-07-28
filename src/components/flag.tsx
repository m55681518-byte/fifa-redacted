import NextImage from "next/image";

/**
 * Host-nation flag.
 *
 * Deliberately an image rather than a regional-indicator emoji. Windows has
 * never shipped flag glyphs in Segoe UI Emoji, so `🇺🇸` renders as two empty
 * boxes for a large share of visitors — which is exactly what the archive was
 * doing before. These PNGs are served locally, so there is also no runtime
 * dependency on a flag CDN.
 */
export function Flag({
  code,
  nation,
  className = "",
}: {
  code: string;
  nation?: string;
  className?: string;
}) {
  return (
    <NextImage
      src={`/flags/${code}.png`}
      alt={nation ? `Flag of ${nation}` : ""}
      width={20}
      height={14}
      unoptimized
      className={`inline-block h-[0.85em] w-auto shrink-0 rounded-[1px] ring-1 ring-white/15 ${className}`}
    />
  );
}
