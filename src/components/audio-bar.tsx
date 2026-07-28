"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Globe,
  SkipForward,
  SkipBack,
  X,
  Disc,
} from "lucide-react";
import { YTPlayerState, type YTPlayer, type YTStateChangeEvent } from "@/types/youtube";

interface TrackInfo {
  year: number;
  title: string;
  artist: string;
  hostNation: string;
  youtubeId: string;
}

interface AudioBarProps {
  track: TrackInfo | null;
  tracks: TrackInfo[];
  onSelectTrack: (track: TrackInfo) => void;
}

let ytPlayerInstance: YTPlayer | null = null;

export function AudioBar({ track, tracks, onSelectTrack }: AudioBarProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.6);
  const [isMuted, setIsMuted] = useState(false);
  const [buffering, setBuffering] = useState(false);
  const [blockedId, setBlockedId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const volumeRef = useRef(0.6);
  const isMutedRef = useRef(false);
  const playerReadyRef = useRef(false);

  const initPlayer = useCallback(async (youtubeId: string) => {
    if (!window.YT?.Player) {
      await new Promise<void>((resolve) => {
        const check = () => {
          if (window.YT?.Player) resolve();
          else setTimeout(check, 100);
        };
        check();
      });
    }

    if (ytPlayerInstance && playerReadyRef.current) {
      try {
        ytPlayerInstance.loadVideoById(youtubeId);
        ytPlayerInstance.setVolume(volumeRef.current * 100);
        ytPlayerInstance.playVideo();
        return;
      } catch {}
    }

    const container = containerRef.current;
    if (!container) return;
    container.innerHTML = "";
    const div = document.createElement("div");
    div.id = "yt-audio-player";
    container.appendChild(div);

    const YT = window.YT;
    if (!YT) return;

    try {
      ytPlayerInstance = new YT.Player(div.id, {
        height: "200",
        width: "200",
        videoId: youtubeId,
        playerVars: {
          autoplay: 1,
          controls: 0,
          disablekb: 1,
          enablejsapi: 1,
          fs: 0,
          iv_load_policy: 3,
          modestbranding: 1,
          playsinline: 1,
          rel: 0,
        },
        events: {
          onReady: (event) => {
            playerReadyRef.current = true;
            try {
              event.target.setVolume(volumeRef.current * 100);
              event.target.playVideo();
            } catch {}
          },
          onStateChange: (e: YTStateChangeEvent) => {
            const s = e.data;
            setBuffering(s === YTPlayerState.BUFFERING);
            if (s === YTPlayerState.PLAYING) setIsPlaying(true);
            else if (s === YTPlayerState.PAUSED || s === YTPlayerState.ENDED) setIsPlaying(false);
            if (s === YTPlayerState.ENDED) {
              const idx = tracks.findIndex((t) => t.youtubeId === youtubeId);
              if (idx >= 0 && idx < tracks.length - 1) {
                onSelectTrack(tracks[idx + 1]);
              }
            }
          },
          onError: (e) => {
            // 101/150 mean the owner disabled embedding; 100 means the video is
            // gone. Nothing is recoverable, so surface it and move on rather
            // than sitting silently on a dead track.
            setIsPlaying(false);
            setBuffering(false);
            setBlockedId(youtubeId);
            const idx = tracks.findIndex((t) => t.youtubeId === youtubeId);
            if (idx >= 0 && idx < tracks.length - 1) {
              setTimeout(() => onSelectTrack(tracks[idx + 1]), 1200);
            }
            if (process.env.NODE_ENV !== "production") {
              console.warn(`[audio] YouTube embed error ${e?.data} for ${youtubeId}`);
            }
          },
        },
      });
    } catch {}
  }, [tracks, onSelectTrack]);

  useEffect(() => {
    if (typeof window !== "undefined" && !window.__ytApiLoaded) {
      window.__ytApiLoaded = true;
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.head.appendChild(tag);
    }
  }, []);

  useEffect(() => {
    if (!track) return;
    initPlayer(track.youtubeId);
  }, [track, initPlayer]);

  // Derived during render: the warning only applies while the failed track is
  // still the selected one, so switching tracks clears it without an effect.
  const blocked = !!track && blockedId === track.youtubeId;

  // With no track loaded there is nothing to play or buffer. Deriving these
  // during render avoids a cascading setState inside the effect above.
  const playing = track ? isPlaying : false;
  const isBuffering = track ? buffering : false;

  const togglePlay = () => {
    // Nothing loaded yet: this click is the user's gesture, so start the first
    // available anthem rather than doing nothing. Previously the bar's play
    // button was inert on landing, which read as "the music is broken".
    if (!track) {
      if (tracks.length > 0) onSelectTrack(tracks[0]);
      return;
    }
    if (!ytPlayerInstance || !playerReadyRef.current) return;
    if (playing) {
      try { ytPlayerInstance.pauseVideo(); } catch {}
    } else {
      try { ytPlayerInstance.playVideo(); } catch {}
    }
  };

  const toggleMute = () => {
    if (!ytPlayerInstance || !playerReadyRef.current) return;
    if (isMutedRef.current) {
      try {
        ytPlayerInstance.unMute();
        ytPlayerInstance.setVolume(volumeRef.current * 100);
      } catch {}
    } else {
      try { ytPlayerInstance.mute(); } catch {}
    }
    isMutedRef.current = !isMutedRef.current;
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseFloat(e.target.value);
    volumeRef.current = v;
    setVolume(v);
    if (ytPlayerInstance && playerReadyRef.current) {
      try { ytPlayerInstance.setVolume(v * 100); } catch {}
    }
    if (v > 0 && isMutedRef.current) {
      isMutedRef.current = false;
      setIsMuted(false);
      if (ytPlayerInstance && playerReadyRef.current) {
        try { ytPlayerInstance.unMute(); } catch {}
      }
    }
  };

  const skipTrack = (dir: 1 | -1) => {
    if (tracks.length === 0) return;
    // Skipping with nothing loaded enters the playlist at either end.
    if (!track) {
      onSelectTrack(dir === 1 ? tracks[0] : tracks[tracks.length - 1]);
      return;
    }
    const idx = tracks.findIndex((t) => t.youtubeId === track.youtubeId);
    const next = (idx + dir + tracks.length) % tracks.length;
    onSelectTrack(tracks[next]);
  };

  const [dismissed, setDismissed] = useState(false);

  return (
    <>
      {/*
        Audio-only YouTube host. Must stay in the render tree — a display:none
        or visibility:hidden ancestor causes the IFrame API to silently refuse
        playback. Clipped to 1px and pushed behind the page instead, and kept
        outside the collapsible bar so dismissing the UI doesn't kill the audio.
      */}
      <div
        ref={containerRef}
        aria-hidden
        className="pointer-events-none fixed bottom-0 left-0 -z-10 h-px w-px overflow-hidden opacity-[0.01]"
      />

      <AnimatePresence>
        {!dismissed && (
          <motion.div
            initial={{ y: 60 }}
            animate={{ y: 0 }}
            exit={{ y: 60 }}
            className="glass-strong fixed inset-x-0 bottom-0 z-[90] border-t border-line"
          >
            <div className="mx-auto flex max-w-7xl items-center gap-4 px-5 py-3.5 sm:gap-6 sm:px-8 lg:px-10">

              <div className="flex min-w-0 flex-1 items-center gap-3.5">
                <div className={`hidden h-5 items-end gap-px sm:flex ${!playing ? "eq-idle" : ""}`}>
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="eq-bar" />
                  ))}
                </div>
                <div className="min-w-0">
                  <p className="font-display truncate text-xs leading-snug text-ink-max">
                    {track?.title || "PLAY TOURNAMENT ANTHEM"}
                  </p>
                  <p className="font-mono-custom mt-0.5 truncate text-[10px] leading-snug text-ink-mid">
                    {blocked
                      ? "UNAVAILABLE — SKIPPING"
                      : track?.artist || `${tracks.length} official anthems`}
                  </p>
                </div>
              </div>

              <div className="font-mono-custom hidden shrink-0 items-center gap-2 text-[10px] text-ink-low lg:flex">
                <Globe className="h-3 w-3" />
                <span>{track?.hostNation} · {track?.year}</span>
              </div>

              <div className="flex shrink-0 items-center gap-2.5">
                <button
                  onClick={() => skipTrack(-1)}
                  className="p-2 text-ink-mid transition-colors hover:bg-surface-2 hover:text-ink-max"
                  title="Previous" aria-label="Previous track"
                >
                  <SkipBack className="h-3.5 w-3.5" />
                </button>

                <button
                  onClick={togglePlay}
                  aria-label={playing ? "Pause" : "Play"}
                  className="btn-primary flex h-10 w-10 items-center justify-center"
                >
                  {isBuffering ? (
                    <span className="h-3 w-3 animate-pulse rounded-full bg-white/80" />
                  ) : playing ? (
                    <Pause className="h-3.5 w-3.5" />
                  ) : (
                    <Play className="h-3.5 w-3.5" />
                  )}
                </button>

                <button
                  onClick={() => skipTrack(1)}
                  className="p-2 text-ink-mid transition-colors hover:bg-surface-2 hover:text-ink-max"
                  title="Next" aria-label="Next track"
                >
                  <SkipForward className="h-3.5 w-3.5" />
                </button>
              </div>

              <div className="flex shrink-0 items-center gap-2.5">
                <button
                  onClick={toggleMute}
                  aria-label={isMuted ? "Unmute" : "Mute"}
                  className="p-2 text-ink-mid transition-colors hover:bg-surface-2 hover:text-ink-max"
                >
                  {isMuted ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5" />}
                </button>

                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  aria-label="Volume"
                  className="h-1 w-14 cursor-pointer appearance-none bg-surface-3 accent-redline [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-1 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:bg-redline"
                />

                <button
                  onClick={() => setDismissed(true)}
                  className="p-2 text-ink-low transition-colors hover:bg-surface-2 hover:text-ink-high"
                  title="Dismiss" aria-label="Hide audio player"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {dismissed && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setDismissed(false)}
            className="glass-strong elev-2 fixed bottom-5 right-5 z-[90] flex h-11 w-11 items-center justify-center border border-redline/40 text-redline transition-all hover:bg-redline/15 active:scale-95"
            title="Open audio player" aria-label="Open audio player"
          >
            <Disc className="h-4 w-4" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
