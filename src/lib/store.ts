"use client";

/**
 * Client-side persistence layer.
 *
 * Everything lives in localStorage under a versioned key so the schema can be
 * migrated later without colliding with stale data. Reads are exposed through
 * `useSyncExternalStore`, which means components read the value during render
 * (no setState-in-effect, no hydration mismatch) and every subscriber updates
 * the moment the store changes — including across browser tabs.
 */

import { useCallback, useSyncExternalStore } from "react";
import type { Comment, SecretDossier } from "../../data/secrets";

const STORAGE_KEY = "fifa-redacted:v1";
const EVENT = "fifa-redacted:store-changed";

export interface UserDossier {
  id: string;
  year: number;
  title: string;
  description: string;
  classification: SecretDossier["classification"];
  mediaUrl: string;
  createdAt: string;
}

interface StoreShape {
  upvotes: Record<string, number>;
  voted: Record<string, boolean>;
  comments: Record<string, Comment[]>;
  submissions: UserDossier[];
  bookmarks: Record<string, boolean>;
}

const EMPTY: StoreShape = {
  upvotes: {},
  voted: {},
  comments: {},
  submissions: [],
  bookmarks: {},
};

/* ---------------------------------------------------------------- internals */

/**
 * Cached parse of localStorage. `useSyncExternalStore` demands a referentially
 * stable snapshot — returning a fresh object each call causes an infinite
 * render loop — so the parsed value is memoised against its raw source string.
 */
let cache: StoreShape | null = null;
let cacheRaw: string | null = null;

function read(): StoreShape {
  if (typeof window === "undefined") return EMPTY;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw === cacheRaw && cache) return cache;
    cacheRaw = raw;
    cache = raw ? { ...EMPTY, ...(JSON.parse(raw) as Partial<StoreShape>) } : EMPTY;
    return cache;
  } catch {
    return EMPTY;
  }
}

function write(next: StoreShape) {
  try {
    const raw = JSON.stringify(next);
    localStorage.setItem(STORAGE_KEY, raw);
    cacheRaw = raw;
    cache = next;
  } catch {
    /* quota exceeded or storage disabled — keep the in-memory copy */
    cache = next;
    cacheRaw = null;
  }
  window.dispatchEvent(new Event(EVENT));
}

function subscribe(onChange: () => void) {
  window.addEventListener(EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

const serverSnapshot = () => EMPTY;

/* -------------------------------------------------------------------- hooks */

export function useStore(): StoreShape {
  return useSyncExternalStore(subscribe, read, serverSnapshot);
}

export function useVote(dossierId: string) {
  const store = useStore();
  const hasVoted = !!store.voted[dossierId];
  const bonus = store.upvotes[dossierId] ?? 0;

  const toggle = useCallback(() => {
    const current = read();
    const voted = !!current.voted[dossierId];
    write({
      ...current,
      voted: { ...current.voted, [dossierId]: !voted },
      upvotes: {
        ...current.upvotes,
        [dossierId]: (current.upvotes[dossierId] ?? 0) + (voted ? -1 : 1),
      },
    });
  }, [dossierId]);

  return { hasVoted, bonus, toggle };
}

export function useBookmark(dossierId: string) {
  const store = useStore();
  const bookmarked = !!store.bookmarks[dossierId];

  const toggle = useCallback(() => {
    const current = read();
    write({
      ...current,
      bookmarks: { ...current.bookmarks, [dossierId]: !current.bookmarks[dossierId] },
    });
  }, [dossierId]);

  return { bookmarked, toggle };
}

export function useComments(dossierId: string, seed: Comment[]) {
  const store = useStore();
  const extra = store.comments[dossierId] ?? [];

  const add = useCallback(
    (comment: Comment) => {
      const current = read();
      write({
        ...current,
        comments: {
          ...current.comments,
          [dossierId]: [...(current.comments[dossierId] ?? []), comment],
        },
      });
    },
    [dossierId]
  );

  return { comments: [...seed, ...extra], add };
}

export function useSubmissions() {
  const store = useStore();

  const add = useCallback((dossier: UserDossier) => {
    const current = read();
    write({ ...current, submissions: [dossier, ...current.submissions] });
  }, []);

  return { submissions: store.submissions, add };
}

/** Wipes all locally stored archive data. */
export function resetStore() {
  write({ ...EMPTY });
}
