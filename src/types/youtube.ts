/**
 * Minimal type definitions for the YouTube IFrame Player API.
 * Covers only the surface area used by the audio player console.
 * @see https://developers.google.com/youtube/iframe_api_reference
 */

/**
 * Player state codes reported by the `onStateChange` event.
 * Declared as a plain const object rather than a `const enum` so it stays
 * compatible with the `isolatedModules` transpilation used by Next.js.
 */
export const YTPlayerState = {
  UNSTARTED: -1,
  ENDED: 0,
  PLAYING: 1,
  PAUSED: 2,
  BUFFERING: 3,
  CUED: 5,
} as const;

export type YTPlayerStateValue = (typeof YTPlayerState)[keyof typeof YTPlayerState];

export interface YTPlayer {
  loadVideoById(videoId: string): void;
  playVideo(): void;
  pauseVideo(): void;
  mute(): void;
  unMute(): void;
  setVolume(volume: number): void;
  destroy(): void;
}

export interface YTStateChangeEvent {
  target: YTPlayer;
  data: number;
}

export interface YTPlayerOptions {
  height?: string;
  width?: string;
  videoId?: string;
  playerVars?: Record<string, string | number>;
  events?: {
    onReady?: (event: { target: YTPlayer }) => void;
    onStateChange?: (event: YTStateChangeEvent) => void;
    onError?: (event: { target: YTPlayer; data: number }) => void;
  };
}

export interface YTNamespace {
  Player: new (elementId: string, options: YTPlayerOptions) => YTPlayer;
}

declare global {
  interface Window {
    YT?: YTNamespace;
    /** Guard flag so the IFrame API <script> tag is only injected once. */
    __ytApiLoaded?: boolean;
  }
}
