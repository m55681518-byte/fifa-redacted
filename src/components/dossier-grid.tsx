"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FileSearch } from "lucide-react";
import {
  allDossiers,
  EVIDENCE_ORDER,
  type EvidenceKind,
  type SecretDossier,
} from "../../data/secrets";
import { getAnthem } from "../../data/media";
import { SecretCard } from "./secret-card";
import { DossierListRow } from "./dossier-list-row";
import { DossierModal } from "./dossier-modal";
import { CommandPalette } from "./command-palette";
import { FilterBar, type SortKey, type ViewMode } from "./filter-bar";
import { HeroTimeline } from "./hero-timeline";
import { Hero } from "./hero";
import { AudioBar } from "./audio-bar";
import { Header } from "./header";
import { Footer } from "./footer";
import { ToastProvider } from "./toast";
import { useStore } from "@/lib/store";
import { scoreDossier, type Classification } from "@/lib/dossier-utils";

interface TrackInfo {
  year: number;
  title: string;
  artist: string;
  hostNation: string;
  youtubeId: string;
}

/** Null when the dossier's year has no verified official song. */
function toTrack(d: SecretDossier): TrackInfo | null {
  if (!d.anthem) return null;
  return {
    year: d.year,
    title: d.anthem.title,
    artist: d.anthem.artist,
    hostNation: d.hostNation,
    youtubeId: d.anthem.youtubeId,
  };
}

export function DossierGrid() {
  return (
    <ToastProvider>
      <ArchiveApp />
    </ToastProvider>
  );
}

function ArchiveApp() {
  const store = useStore();

  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [audioTrack, setAudioTrack] = useState<TrackInfo | null>(null);
  const [openDossier, setOpenDossier] = useState<SecretDossier | null>(() => {
    // Lazy initialiser: runs once on the client, so ?file= deep links open
    // immediately without a setState-in-effect round trip.
    if (typeof window === "undefined") return null;
    const id = new URLSearchParams(window.location.search).get("file");
    return id ? (allDossiers.find((d) => d.id === id) ?? null) : null;
  });
  const [paletteOpen, setPaletteOpen] = useState(false);

  const [query, setQuery] = useState("");
  const [classification, setClassification] = useState<Classification | "ALL">("ALL");
  const [sort, setSort] = useState<SortKey>("year-desc");
  const [view, setView] = useState<ViewMode>("grid");
  const [bookmarksOnly, setBookmarksOnly] = useState(false);
  const [evidenceFloor, setEvidenceFloor] = useState<EvidenceKind | null>(null);
  const [activePerson, setActivePerson] = useState<string | null>(null);

  /** Locally submitted records, adapted to the shared dossier shape. */
  const userDossiers = useMemo<SecretDossier[]>(
    () =>
      store.submissions.map((s) => ({
        id: s.id,
        year: s.year,
        title: s.title,
        summary: s.description.slice(0, 140),
        description: s.description,
        classification: s.classification,
        tags: ["user-submitted"],
        credibility: 1,
        mediaType: "image" as const,
        mediaUrl: s.mediaUrl,
        thumbnailUrl:
          s.mediaUrl ||
          "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=1200&q=80",
        gallery: [],
        upvotes: 0,
        comments: [],
        hostNation: "Unverified",
        hostFlag: "un",
        anthem: { title: "Unknown", artist: "Unknown", youtubeId: "sSAXjXvJTNM" },
      })),
    [store.submissions]
  );

  const corpus = useMemo(() => [...userDossiers, ...allDossiers], [userDossiers]);

  const filtered = useMemo(() => {
    let out = corpus;

    if (selectedYear !== null) out = out.filter((d) => d.year === selectedYear);
    if (classification !== "ALL") out = out.filter((d) => d.classification === classification);
    if (bookmarksOnly) out = out.filter((d) => store.bookmarks[d.id]);

    if (evidenceFloor) {
      const floor = EVIDENCE_ORDER.indexOf(evidenceFloor);
      out = out.filter((d) => {
        const idx = d.evidence ? EVIDENCE_ORDER.indexOf(d.evidence) : EVIDENCE_ORDER.length;
        return idx <= floor;
      });
    }

    if (activePerson) {
      out = out.filter((d) => d.people?.includes(activePerson));
    }

    if (query.trim()) {
      out = out
        .map((d) => ({ d, score: scoreDossier(d, query) }))
        .filter((r) => r.score > 0)
        .sort((a, b) => b.score - a.score)
        .map((r) => r.d);
      // A relevance-ordered result set shouldn't be re-sorted by metadata.
      return out;
    }

    const sorted = [...out];
    switch (sort) {
      case "year-asc":
        sorted.sort((a, b) => a.year - b.year);
        break;
      case "votes":
        sorted.sort(
          (a, b) =>
            b.upvotes + (store.upvotes[b.id] ?? 0) - (a.upvotes + (store.upvotes[a.id] ?? 0))
        );
        break;
      case "credibility":
        sorted.sort((a, b) => (b.credibility ?? 0) - (a.credibility ?? 0));
        break;
      default:
        sorted.sort((a, b) => b.year - a.year);
    }
    return sorted;
  }, [corpus, selectedYear, classification, bookmarksOnly, evidenceFloor, activePerson, query, sort, store.bookmarks, store.upvotes]);

  /** How many records sit at each evidence tier, for the strength meter. */
  const evidenceCounts = useMemo(() => {
    const base: Record<EvidenceKind, number> = {
      COURT: 0,
      OFFICIAL: 0,
      PRESS: 0,
      ALLEGED: 0,
      OPEN: 0,
    };
    corpus.forEach((d) => {
      if (d.evidence) base[d.evidence] += 1;
    });
    return base;
  }, [corpus]);

  const stats = useMemo(() => {
    const years = allDossiers.map((d) => d.year);
    return {
      total: corpus.length,
      documented: corpus.filter((d) => d.classification === "DOCUMENTED").length,
      span: `${Math.min(...years)}–${Math.max(...years)}`,
    };
  }, [corpus]);

  const playAnthem = useCallback((d: SecretDossier) => {
    const t = toTrack(d);
    if (t) setAudioTrack(t);
  }, []);

  /**
   * Resolve a year's anthem straight from the verified registry, rather than
   * going via a dossier. Institutional records (1921, 2012, 2015...) have no
   * tournament song, but the tournament years around them do, and a tap on
   * 2026 should play the 2026 anthem whether or not a record shares that year.
   */
  const trackForYear = useCallback((year: number): TrackInfo | null => {
    const anthem = getAnthem(year);
    if (!anthem) return null;
    const host = allDossiers.find((d) => d.year === year)?.hostNation ?? "";
    return {
      year,
      title: anthem.title,
      artist: anthem.artist,
      hostNation: host,
      youtubeId: anthem.youtubeId,
    };
  }, []);

  const handleSelectYear = useCallback(
    (year: number | null) => {
      setSelectedYear(year);
      if (year) {
        // Tapping a year starts its anthem immediately — this click is the
        // user gesture browsers require before audio may begin.
        const track = trackForYear(year);
        if (track) setAudioTrack(track);
        document.getElementById("archive")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    },
    [trackForYear]
  );

  const handlePlayAudioByYear = useCallback(
    (year: number) => {
      const track = trackForYear(year);
      if (track) setAudioTrack(track);
    },
    [trackForYear]
  );

  // Global ⌘K / Ctrl-K to open the command palette.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

    // Only years with a verified, embeddable anthem enter the playlist.
  const allTracks = useMemo(
    () => allDossiers.map(toTrack).filter((t): t is TrackInfo => t !== null),
    []
  );

  return (
    <div className="min-h-screen pb-28">
      <Header archiveCount={stats.total} onOpenSearch={() => setPaletteOpen(true)} />

      <Hero
        totalRecords={stats.total}
        documentedCount={stats.documented}
        yearSpan={stats.span}
        onOpenSearch={() => setPaletteOpen(true)}
      />

      <HeroTimeline
        selectedYear={selectedYear}
        onSelectYear={handleSelectYear}
        onPlayAudio={handlePlayAudioByYear}
      />

      <main id="archive" className="mx-auto w-full max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        <FilterBar
          query={query}
          onQueryChange={setQuery}
          classification={classification}
          onClassificationChange={setClassification}
          sort={sort}
          onSortChange={setSort}
          view={view}
          onViewChange={setView}
          bookmarksOnly={bookmarksOnly}
          onBookmarksOnlyChange={setBookmarksOnly}
          resultCount={filtered.length}
          activeYear={selectedYear}
          onClearYear={() => setSelectedYear(null)}
          evidenceFloor={evidenceFloor}
          onEvidenceFloorChange={setEvidenceFloor}
          evidenceCounts={evidenceCounts}
          activePerson={activePerson}
          onClearPerson={() => setActivePerson(null)}
        />

        {filtered.length > 0 ? (
          view === "grid" ? (
            <motion.div
              layout
              className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
            >
              <AnimatePresence mode="popLayout">
                {filtered.map((d, i) => (
                  <SecretCard
                    key={d.id}
                    dossier={d}
                    index={i}
                    onOpen={setOpenDossier}
                    onPlayAnthem={playAnthem}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.ul layout className="divide-y divide-line border-y border-line">
              <AnimatePresence mode="popLayout">
                {filtered.map((d, i) => (
                  <DossierListRow
                    key={d.id}
                    dossier={d}
                    index={i}
                    onOpen={setOpenDossier}
                    onPlayAnthem={playAnthem}
                  />
                ))}
              </AnimatePresence>
            </motion.ul>
          )
        ) : (
          <div className="flex flex-col items-center justify-center border border-dashed border-line py-24">
            <FileSearch className="h-8 w-8 text-ink-faint" />
            <p className="font-display mt-4 text-sm text-ink-mid">NO RECORDS MATCH</p>
            <p className="mt-1.5 max-w-xs text-center text-xs text-ink-faint">
              Adjust the filters or clear the current scan to browse the full archive.
            </p>
            <button
              onClick={() => {
                setQuery("");
                setClassification("ALL");
                setBookmarksOnly(false);
                setSelectedYear(null);
              }}
              className="btn-ghost font-mono-custom mt-5 px-4 py-2 text-[10px] tracking-wider"
            >
              CLEAR ALL FILTERS
            </button>
          </div>
        )}
      </main>

      <Footer recordCount={stats.total} />

      <DossierModal
        dossier={openDossier}
        onClose={() => setOpenDossier(null)}
        onPlayAnthem={playAnthem}
        onSelectPerson={(name) => {
          setActivePerson(name);
          setOpenDossier(null);
          document.getElementById("archive")?.scrollIntoView({ behavior: "smooth", block: "start" });
        }}
      />

      <CommandPalette
        open={paletteOpen}
        onOpenChange={setPaletteOpen}
        dossiers={corpus}
        onSelect={setOpenDossier}
      />

      <AudioBar track={audioTrack} tracks={allTracks} onSelectTrack={setAudioTrack} />
    </div>
  );
}
