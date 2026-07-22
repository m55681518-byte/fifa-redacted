# AGENTSKILLS.md — AAA Classified Cyberpunk / Tactical UI Design System

## 1. Design Philosophy & Core Aesthetics
- Visual Archetype: High-tech classified dossier, tactical command console, top-secret government archives.
- Primary Principle: Stark contrast, sharp geometric precision, heavy atmospheric depth (scanlines, CRT noise, corner crosshairs).
- Strictly Forbidden: Generic corporate SaaS layouts, rounded "pill" cards (`rounded-2xl`), default Inter/System fonts, plain white backgrounds, or unstyled stock imagery.

## 2. Typography & Font System
- Display / Headers: Import and force `Chakra Petch` or `Oswald` (Uppercase, tracking-widest).
- Data / Monospace: Import and force `JetBrains Mono` or `Share Tech Mono` for all dates, file IDs, classification stamps, coordinates, and metadata.
- Body Copy: Sharp sans-serif with high contrast (`text-zinc-300`).

## 3. Color Palette & Tactical Accents
- Surface Base: `#050505` (Deep void black).
- Container Backgrounds: `bg-zinc-950/90` with `border-zinc-800` (Glassmorphism + sharp dark slate borders).
- Primary Alert / Redacted: Neon Red (`#ff2e2e`) for `[TOP SECRET]`, `[REDACTED]`, and urgent notifications.
- Active Accent: Tactical Amber/Yellow (`#f59e0b`) for active selected years, volume meters, and primary action highlights.
- Ambient Glows: Subtle dark red and amber radial gradients (`bg-gradient-to-b from-red-950/20 to-transparent`).

## 4. Component Blueprints

### A. Classified Dossier Card
- Shape: Sharp 90-degree corners (`rounded-none` or `rounded-sm`), subtle border crosshairs (`+`) rendered on all 4 corners via absolute positioning.
- Stamp Badge: Absolute positioned badge rotated -12deg: `[CONFIDENTIAL // DECLASSIFIED]`.
- Archival Photo Treatment: CSS filter `grayscale(40%) contrast(120%) vignette`. Hovering removes grayscale for full color.
- Video Frame: Styled as a surveillance camera monitor feed complete with a blinking `REC ●` indicator and live timecode in the top-right corner.

### B. World Cup Era Selector (Radio Frequency Tuner)
- Reconstruct the timeline as a sleek horizontal radio tuner / vault combination dial.
- Active year is centered beneath a glowing vertical tactical needle (`bg-amber-500`).
- Timeline nodes feature frequency ticks and tournament host codes (e.g., `2026 // USA-CAN-MEX`).

### C. Persistent Audio Player Console
- Fixed bottom panel with audio equalizer bars (animated SVG frequency bars when playing).
- Clear playback controls (Play/Pause, Mute, Volume Slider, Track Title, Host Nation indicator).

## 5. Global Texture & Atmospheric Overlays
- Scanlines: Fixed overlay with `pointer-events-none` applying subtle horizontal scanlines (`repeating-linear-gradient`).
- Noise Overlay: SVG noise grain overlay at 3% opacity to eliminate flat digital gradients.
