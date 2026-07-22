"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Music,
  Globe,
  Disc3,
} from "lucide-react";

interface TrackInfo {
  year: number;
  title: string;
  artist: string;
  hostNation: string;
}

interface AudioBarProps {
  track: TrackInfo | null;
}

export function AudioBar({ track }: AudioBarProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.6);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!track) return;
    setIsPlaying(true);
  }, [track]);

  const togglePlay = () => {
    if (!audioRef.current || !track) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
    }
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseFloat(e.target.value);
    setVolume(v);
    if (audioRef.current) {
      audioRef.current.volume = v;
    }
    if (v > 0 && isMuted) {
      setIsMuted(false);
      if (audioRef.current) audioRef.current.muted = false;
    }
  };

  if (!track) return null;

  return (
    <motion.div
      initial={{ y: 80 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-dossier-700 bg-dossier-900/98 backdrop-blur-xl"
    >
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-2 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="hidden h-8 w-8 flex-shrink-0 items-center justify-center rounded-md border border-accent-red/30 bg-accent-red/10 sm:flex">
            <Disc3 className={`h-4 w-4 text-accent-red ${isPlaying ? "animate-spin" : ""}`} />
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-dossier-100">
              {track.title}
            </p>
            <p className="truncate text-xs text-dossier-500">
              {track.artist}
            </p>
          </div>
        </div>

        <div className="hidden items-center gap-2 text-xs text-dossier-500 sm:flex">
          <Globe className="h-3 w-3" />
          <span>{track.hostNation} · {track.year}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleMute}
            className="rounded-md p-1.5 text-dossier-400 transition-colors hover:text-dossier-100 hover:bg-dossier-800"
          >
            {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </button>

          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            className="h-1 w-20 cursor-pointer appearance-none rounded-full bg-dossier-700 accent-accent-red [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-accent-red"
          />

          <button
            onClick={togglePlay}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-accent-red/30 bg-accent-red/10 text-accent-red transition-all hover:bg-accent-red/20 active:scale-95"
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
