"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Disc3,
  Globe,
  SkipForward,
  SkipBack,
  X,
  Disc,
} from "lucide-react";

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

let ytPlayerInstance: any = null;
let ytPlayerReady = false;

export function AudioBar({ track, tracks, onSelectTrack }: AudioBarProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.6);
  const [isMuted, setIsMuted] = useState(false);
  const [buffering, setBuffering] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const volumeRef = useRef(0.6);
  const isMutedRef = useRef(false);
  const playerReadyRef = useRef(false);

  const initPlayer = useCallback(async (youtubeId: string) => {
    if (!(window as any).YT?.Player) {
      await new Promise<void>((resolve) => {
        const check = () => {
          if ((window as any).YT?.Player) resolve();
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

    try {
      const YT = (window as any).YT;
      ytPlayerInstance = new YT.Player(div.id, {
        height: "0",
        width: "0",
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
          onReady: () => {
            playerReadyRef.current = true;
            ytPlayerReady = true;
            try {
              ytPlayerInstance.setVolume(volumeRef.current * 100);
              ytPlayerInstance.playVideo();
            } catch {}
          },
          onStateChange: (e: any) => {
            const s = e.data;
            setBuffering(s === 3);
            if (s === 1) setIsPlaying(true);
            else if (s === 2 || s === 0) setIsPlaying(false);
            if (s === 0) {
              const idx = tracks.findIndex((t) => t.youtubeId === youtubeId);
              if (idx >= 0 && idx < tracks.length - 1) {
                onSelectTrack(tracks[idx + 1]);
              }
            }
          },
          onError: () => {
            setIsPlaying(false);
            setBuffering(false);
          },
        },
      });
    } catch {}
  }, [tracks, onSelectTrack]);

  useEffect(() => {
    if (typeof window !== "undefined" && !(window as any).__ytApiLoaded) {
      (window as any).__ytApiLoaded = true;
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.head.appendChild(tag);
    }
  }, []);

  useEffect(() => {
    if (!track) {
      setIsPlaying(false);
      setBuffering(false);
      return;
    }
    initPlayer(track.youtubeId);
  }, [track, initPlayer]);

  const togglePlay = () => {
    if (!ytPlayerInstance || !playerReadyRef.current || !track) return;
    if (isPlaying) {
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
    if (!track) return;
    const idx = tracks.findIndex((t) => t.youtubeId === track.youtubeId);
    const next = (idx + dir + tracks.length) % tracks.length;
    onSelectTrack(tracks[next]);
  };

  const [dismissed, setDismissed] = useState(false);

  return (
    <>
      <AnimatePresence>
        {!dismissed && (
          <motion.div
            initial={{ y: 60 }}
            animate={{ y: 0 }}
            exit={{ y: 60 }}
            className="fixed bottom-0 left-0 right-0 z-50 border-t border-zinc-800 bg-zinc-950/95 backdrop-blur-md"
          >
            <div className="mx-auto flex max-w-7xl items-center gap-3 px-3 py-2 sm:px-6 lg:px-8">

              <div className="flex items-center gap-2 flex-1 min-w-0">
                <div className={`flex items-end gap-px h-5 ${!isPlaying ? "eq-idle" : ""}`}>
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="eq-bar" />
                  ))}
                </div>
                <div className="min-w-0 ml-2">
                  <p className="truncate font-display text-xs font-bold text-zinc-100">
                    {track?.title || "NO SIGNAL"}
                  </p>
                  <p className="truncate font-mono-custom text-[9px] text-zinc-500">
                    {track?.artist || "—"}
                  </p>
                </div>
              </div>

              <div className="hidden items-center gap-2 font-mono-custom text-[9px] text-zinc-500 sm:flex">
                <Globe className="h-3 w-3" />
                <span>{track?.hostNation} · {track?.year}</span>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => skipTrack(-1)}
                  className="rounded-none p-1.5 text-zinc-400 transition-colors hover:text-zinc-100 hover:bg-zinc-800"
                  title="Previous"
                >
                  <SkipBack className="h-3.5 w-3.5" />
                </button>

                <button
                  onClick={togglePlay}
                  className="flex h-8 w-8 items-center justify-center rounded-none border border-[#ff2e2e]/30 bg-[#ff2e2e]/10 text-[#ff2e2e] transition-all hover:bg-[#ff2e2e]/20 active:scale-95"
                >
                  {buffering ? (
                    <span className="h-3 w-3 animate-pulse rounded-none bg-[#ff2e2e]" />
                  ) : isPlaying ? (
                    <Pause className="h-3.5 w-3.5" />
                  ) : (
                    <Play className="h-3.5 w-3.5" />
                  )}
                </button>

                <button
                  onClick={() => skipTrack(1)}
                  className="rounded-none p-1.5 text-zinc-400 transition-colors hover:text-zinc-100 hover:bg-zinc-800"
                  title="Next"
                >
                  <SkipForward className="h-3.5 w-3.5" />
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={toggleMute}
                  className="rounded-none p-1.5 text-zinc-400 transition-colors hover:text-zinc-100 hover:bg-zinc-800"
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
                  className="h-1 w-12 cursor-pointer appearance-none rounded-none bg-zinc-800 accent-[#ff2e2e] [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-1 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-none [&::-webkit-slider-thumb]:bg-[#ff2e2e]"
                />

                <button
                  onClick={() => setDismissed(true)}
                  className="rounded-none p-1.5 text-zinc-500 transition-colors hover:text-zinc-300 hover:bg-zinc-800"
                  title="Dismiss"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            </div>
            <div ref={containerRef} className="hidden" />
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
            className="fixed bottom-4 right-4 z-50 flex h-10 w-10 items-center justify-center border border-[#ff2e2e]/30 bg-zinc-950/90 text-[#ff2e2e] shadow-lg backdrop-blur-md transition-all hover:bg-[#ff2e2e]/20 active:scale-90"
            title="Open audio player"
          >
            <Disc className="h-4 w-4" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
