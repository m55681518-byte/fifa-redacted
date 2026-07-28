# FIFA REDACTED — The Sourced Archive of World Cup Scandals

A dark, cinematic archive of the World Cup's real scandals. 23 sourced records
spanning 1930–2026 — doping studies, match-fixing investigations, buried
corruption reports and results nobody can explain — each with an evidentiary
grade, citations, imagery, the tournament anthem and a comment thread.

> **About the content.** Every record describes real events and cites its
> sources. Records are graded `DOCUMENTED` (established by court records,
> official reports or admissions), `DISPUTED` (credible allegations, denied or
> unproven) or `UNRESOLVED` (open questions). Independent; not affiliated with
> or endorsed by FIFA.

## Stack

| | |
|---|---|
| Framework | Next.js 16 (App Router, React 19) |
| Styling | Tailwind CSS v4 with a custom token layer |
| Motion | Framer Motion |
| Primitives | Radix UI (Dialog) |
| Deploy | Cloudflare Workers via OpenNext |

## Getting started

```bash
npm install          # .npmrc sets legacy-peer-deps
npm run dev          # http://localhost:3000
```

```bash
npm run build        # production build
npm run lint         # eslint — currently clean
npx tsc --noEmit     # typecheck — currently clean
```

## Environment

Copy `.env.example` to `.env.local`. **Every variable is optional** — the app
runs fully without any of them.

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical URL for metadata, OG tags, sitemap |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Enables the captcha on the submission form. Blank disables it. |
| `TURNSTILE_SECRET_KEY` | Server-side Turnstile verification |
| `NEXT_PUBLIC_SUPABASE_*` | Reserved for a future shared backend |

## Features

- **Cinematic hero** with an animated redaction-bar reveal and live stat strip
- **Command palette** (<kbd>⌘K</kbd> / <kbd>Ctrl-K</kbd>) with weighted relevance search
- **Filter bar** — text, classification, bookmarks, four sort modes, grid/list views
- **Radio-tuner timeline** — every World Cup year, era bands, filters the grid
- **Dossier modal** — full record, keyboard-navigable gallery, lazy video, comments
- **Persistence** — votes, bookmarks, comments and submissions in `localStorage`
  via `useSyncExternalStore`, synced across tabs
- **Deep links** — `/?file=SEC-1966-001` opens a record directly
- **SEO** — dynamic OG image, sitemap, robots, JSON-LD
- **Accessibility** — skip link, focus rings, ARIA state, full keyboard nav,
  `prefers-reduced-motion` support

## Architecture notes

**Persistence** (`src/lib/store.ts`) is a `useSyncExternalStore` wrapper over
`localStorage`. Components read during render — no `setState` in effects, no
hydration mismatch — and the parsed snapshot is memoised against its raw source
string, since returning a fresh object each call would loop infinitely.

**Card media** deliberately uses curated stills rather than YouTube thumbnails.
Embedding 23 iframes on first paint would wreck LCP, and thumbnails 404 for any
anthem whose video is later removed. Video loads on demand inside the modal.

## Data

`data/secrets.ts` holds the original records and merges in
`data/additional-dossiers.ts`, sorted by year and exported as `allDossiers`.
Every image and anthem URL has been verified live.

## Deploy

```bash
export CLOUDFLARE_ACCOUNT_ID=<your account id>   # or run: npx wrangler login
export NEXT_PUBLIC_SITE_URL=https://<your-worker>.workers.dev
npm run build
npx opennextjs-cloudflare build
npx wrangler deploy
```

`account_id` is intentionally absent from `wrangler.toml` — supply it via the
environment or `wrangler login`. Requires **Node 22+**; wrangler refuses to run
on Node 20.

## Verification tooling

Media in this project rots — YouTube uploads get taken down or have embedding
disabled, and image hosts expire URLs. Two scripts guard against that:

```bash
node tools/embedcheck.mjs <videoId> [...]   # does it ACTUALLY embed?
python3 tools/commons_fetch.py <outdir> <manifest> <slug> "<search>"
```

`embedcheck.mjs` instantiates a real IFrame player on a non-YouTube origin and
waits for a playing state or an error code. The watch page's `playableInEmbed`
flag is not trustworthy — several FIFA and VEVO uploads report it as true and
then fail with error 150 once embedded elsewhere.
