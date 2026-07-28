import Link from "next/link";
import { FileX2, MoveLeft } from "lucide-react";

export const metadata = { title: "Record Not Found" };

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-4">
      <div className="pointer-events-none absolute inset-0 grid-bg" />
      <div
        className="aurora left-1/2 top-1/3 h-[420px] w-[420px] -translate-x-1/2"
        style={{ background: "radial-gradient(circle, rgba(255,59,48,0.14), transparent 70%)" }}
      />

      <div className="relative z-10 w-full max-w-lg text-center">
        <div className="mb-8 flex justify-center">
          <span className="flex h-16 w-16 items-center justify-center border border-redline/40 bg-redline/10">
            <FileX2 className="h-7 w-7 text-redline" />
          </span>
        </div>

        <p className="font-mono-custom text-[10px] tracking-[0.3em] text-ink-faint">
          ERROR 404 — FILE NOT IN ARCHIVE
        </p>

        <h1 className="font-display mt-4 text-3xl leading-none text-ink-max sm:text-4xl">
          RECORD
          <span className="mt-2 block">
            <span className="relative inline-block">
              <span className="text-gradient-red">REDACTED</span>
            </span>
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-sm text-pretty text-sm leading-relaxed text-ink-mid">
          The record you requested is not in the archive. It may have been renamed, or
          the link may be wrong.
        </p>

        <div className="mt-9 flex justify-center">
          <Link
            href="/"
            className="btn-primary font-display group flex items-center gap-2.5 px-6 py-3.5 text-xs"
          >
            <MoveLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
            RETURN TO ARCHIVE
          </Link>
        </div>

        <p className="font-mono-custom mt-12 text-[9px] tracking-[0.24em] text-ink-faint">
          NO SUCH RECORD IN THE INDEX
        </p>
      </div>
    </main>
  );
}
