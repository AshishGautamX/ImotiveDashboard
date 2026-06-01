# Imotive — Student Learning Dashboard

A high-fidelity, production-grade student dashboard prototype built to demonstrate modern Next.js architecture, server-first data fetching, and expressive UI animation. The project was designed as part of a frontend engineering challenge requiring strict adherence to performance, accessibility, and code quality standards.

---

## What It Is

Imotive is a dark-mode learning dashboard that surfaces a student's active courses, weekly activity, and learning streak in a responsive Bento Grid layout. Every detail — from the staggered tile entrance to the progress bar animation — is intentional and built to feel premium.

The core thesis of the app: **data lives on the server, motion lives on the client, and the two never get in each other's way.**

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4 |
| Database / BaaS | Supabase (PostgreSQL via `@supabase/ssr`) |
| Animation | Framer Motion 12 |
| Icons | Lucide React |
| Fonts | Space Grotesk · JetBrains Mono (via `next/font`) |

---

## Getting Started

### 1. Clone and install

```bash
git clone https://github.com/your-username/imotive-dashboard.git
cd imotive-dashboard
npm install
```

### 2. Configure environment variables

Copy `.env.example` to `.env.local` and fill in your Supabase project credentials:

```bash
cp .env.example .env.local
```

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

You can find both values in your Supabase project under **Project Settings → API**.

### 3. Seed the database

In your Supabase project's SQL Editor, paste and run the contents of [`supabase/schema.sql`](./supabase/schema.sql). This creates the `courses` table and inserts four seed rows:

| Title | Progress | Icon |
|---|---|---|
| Data Science | 34% | `BrainCircuit` |
| Backend Java | 18% | `Server` |
| Full Stack | 52% | `Layers` |
| CS Essentials | 71% | `BookOpen` |

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Architecture

### The Server / Client Boundary

The most deliberate design decision in this project was drawing a clean line between server and client responsibilities.

**Server Components** own all data:
- `app/page.tsx` — The root route shell. It composes the page structure and sets up the `<Suspense>` boundary that streams in course data asynchronously.
- `components/dashboard/CourseGrid.tsx` — An `async` Server Component that calls Supabase directly, validates the response, and maps data to `<CourseCard>` elements. No data ever touches the client bundle.
- `lib/supabase/server.ts` — A factory that initialises the `@supabase/ssr` server client with access to the Next.js cookie store. This is the only file that ever reads environment secrets.

**Client Components** own all interaction and motion:
- `DashboardSidebar` — Manages active nav state and renders the Framer Motion `layoutId` animation pill.
- `HeroTile` — Runs a `setInterval`-based count-up animation for the learning streak on mount.
- `CourseCard` — Triggers the animated progress bar after the card enters the viewport.
- `AnimatedTiles` / `MotionTile` — Thin orchestration wrappers that keep motion configuration centralised and reusable.
- `app/error.tsx` — Next.js error boundary; requires `"use client"` to expose the `reset()` callback.

This split means that adding a new data field from Supabase only requires touching the server side, and adding a new animation only requires touching the client side. The two concerns are genuinely isolated.

### Supabase Client Strategy

The app uses `@supabase/ssr` rather than a plain `@supabase/supabase-js` singleton. This matters because `@supabase/ssr` is designed for environments where cookies must be forwarded correctly across server renders, edge functions, and client hydration. The server client reads credentials from environment variables at request time, never during the build phase, so secrets are never baked into the static bundle.

The `createClient()` function in `lib/supabase/server.ts` implements both `getAll` and `setAll` cookie handlers. The `setAll` path is wrapped in a silent `try/catch` because Next.js Server Components that run as part of a `<Suspense>` stream cannot always mutate cookies — this is expected and harmless.

---

## Animation System

All animations are hardware-accelerated. Only `transform` and `opacity` are animated; no `width`, `height`, `top`, `left`, or `margin` values ever change during interaction, which means zero layout shifts throughout the entire UI.

### Staggered Page Entrance

`AnimatedTiles` is a thin `motion.section` wrapper that sets `staggerChildren: 0.08` on its `show` variant. Every direct child that uses the `MotionTile` wrapper automatically inherits this orchestration without any prop drilling.

```
hidden → show (stagger 80ms between children)
  ↳ each tile: opacity 0→1, y 20px→0, scale 0.98→1
  ↳ spring: stiffness 280, damping 22
```

### Hover Interaction

Hover is handled entirely by Framer Motion's `whileHover` prop on `MotionTile`. The spring physics make the lift feel physical rather than mechanical:

```
whileHover: scale 1.015, y -2px
spring: stiffness 400, damping 25
```

A secondary `borderGlowVariants` layer — an absolutely-positioned `div` with `box-shadow` and `ring` — fades in on hover using opacity only, revealing a violet glow without repainting the layout.

### Sidebar Active Pill

The sidebar uses Framer Motion's `layoutId="nav-highlight"` pattern. When the active nav item changes, the highlight pill animates from its old position to the new one using a shared layout transition with spring physics (`stiffness: 350, damping: 25`). This is a single DOM element moving — not two elements fading in and out — which makes the interaction feel instant and intentional.

### Animated Progress Bars

Each `CourseCard` renders a `motion.div` for the progress fill. On mount, it animates from `width: 0` to `width: {progress}%` using a custom easing curve `[0.16, 1, 0.3, 1]` (an expo-out equivalent) over 1.2 seconds. The delay is staggered by `index * 0.1 + 0.2` so bars don't all animate simultaneously.

---

## Loading and Error States

### Skeleton Loaders

Two layers of skeleton UI exist:

1. **Route-level** (`app/loading.tsx`) — Shown immediately by Next.js while the page JavaScript is loading. It mirrors the exact grid structure of the real dashboard so there is no visual jump on hydration.
2. **Suspense-level** (`CourseGridFallback` + `CourseCardSkeleton`) — Shown specifically while `CourseGrid`'s async Supabase fetch is in-flight. Individual course card skeletons pulse using Tailwind's `animate-pulse` utility.

Both skeletons use the same border, radius, and spacing tokens as the real tiles, so the transition from skeleton to content is a simple opacity swap with no layout movement.

### Error Boundary

`app/error.tsx` is a Next.js error boundary that catches any unhandled error thrown during the Supabase fetch (network failure, missing environment variables, RLS policy block, etc.). It displays a human-readable message with the specific failure context and a **Retry** button that calls `reset()` to re-attempt the render.

---

## Responsive Design

| Breakpoint | Sidebar | Grid |
|---|---|---|
| Mobile `< 768px` | Fixed bottom navigation bar | Single column |
| Tablet `768px – 1023px` | Icon-only sidebar (no labels) | 2-column Bento |
| Desktop `≥ 1024px` | Full sidebar with labels and collapse toggle | 3-column Bento |

The sidebar collapse on desktop is a CSS width transition (`cubic-bezier(0.16, 1, 0.3, 1)`) rather than a Framer Motion animation, since it involves a layout change. Framer Motion is reserved exclusively for `transform` and `opacity` work.

---

## Design Tokens

All colours and typography are defined as CSS custom properties in `app/globals.css` and referenced throughout via Tailwind's extended theme:

```css
--bg-primary:   #030108   /* near-black canvas */
--bg-secondary: #0a0616   /* card background */
--accent:       #8b5cf6   /* violet — primary interactive colour */
--text-primary: #f8fafc
--text-muted:   #8b949e
```

The body background uses two fixed radial gradients (violet top-left, sky bottom-right) to create depth without any image assets or additional network requests.

---

## Challenges and Decisions

**Hydration noise in development.** Browser extensions inject attributes into the DOM after the server render, causing React to log hydration mismatch warnings. `suppressHydrationWarning` is applied to `<html>` and `<body>` only — the narrowest possible scope — to silence this without masking real issues.

**Keeping RSC and motion coexistent.** The initial instinct is to make everything a Client Component once animation is involved. The solution here was to create thin client wrappers (`MotionTile`, `AnimatedTiles`) that accept `children` as props. Since children of a Client Component can still be Server Components, `CourseGrid` remains fully server-rendered even though it renders inside `AnimatedTiles`.

**Visually rich hover with zero layout shift.** The border glow effect had to be achieved without changing any layout-affecting property. The solution was an absolutely-positioned overlay inside each tile with `pointer-events: none`, animated only on `opacity`. This gives the appearance of a glowing border without touching the tile's box model.

---

## Project Structure

```
.
├── app/
│   ├── error.tsx            # Next.js error boundary (client)
│   ├── globals.css          # Design tokens + base styles
│   ├── layout.tsx           # Root layout, font loading
│   ├── loading.tsx          # Route-level skeleton UI
│   └── page.tsx             # Dashboard shell (server)
├── components/
│   └── dashboard/
│       ├── ActivityTile.tsx       # Weekly activity grid (client)
│       ├── AnimatedTiles.tsx      # Stagger orchestration wrapper (client)
│       ├── CourseCard.tsx         # Individual course tile (client)
│       ├── CourseCardSkeleton.tsx # Pulse skeleton for course cards
│       ├── CourseGrid.tsx         # Async data fetch → card list (server)
│       ├── CourseGridFallback.tsx # Suspense fallback shell
│       ├── DashboardSidebar.tsx   # Collapsible nav + mobile bar (client)
│       ├── HeroTile.tsx           # Greeting + streak counter (client)
│       └── MotionTile.tsx         # Shared animated tile wrapper (client)
├── lib/
│   └── supabase/
│       └── server.ts        # SSR-safe Supabase client factory
├── supabase/
│   └── schema.sql           # Table DDL + seed data
├── types/
│   └── index.ts             # Course interface
├── .env.example             # Required environment variable keys
└── tailwind.config.ts       # Extended theme (colours, fonts)
```

---

## Environment Variables

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL (found in Project Settings → API) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anonymous public key |

Both variables are prefixed with `NEXT_PUBLIC_` because they are referenced from the server-side `createClient` factory — not from browser code — but Next.js requires the prefix for any variable used at runtime in App Router Server Components when deployed to Vercel.

> **Important:** Never commit your `.env.local` file. It is listed in `.gitignore`. Only `.env.example` (with placeholder values) should be committed.
