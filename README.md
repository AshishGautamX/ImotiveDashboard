# Imotive Dashboard

A dark-mode learning dashboard built with Next.js App Router, Tailwind CSS, Supabase, and Framer Motion.

## Stack
- Next.js (App Router + TypeScript)
- Tailwind CSS v4
- Supabase (`@supabase/ssr` + `@supabase/supabase-js`)
- Framer Motion
- Lucide React

## Run Locally
1. Install dependencies:
```bash
npm install
```
2. Add environment variables in `.env.local`:
```bash
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```
3. Start dev server:
```bash
npm run dev
```

## Supabase Setup
1. Create a Supabase project.
2. Run [`supabase/schema.sql`](./supabase/schema.sql) in SQL Editor.
3. This creates and seeds `courses` with:
- Data Science (34%)
- Backend Java (18%)
- Full Stack (52%)
- CS Essentials (71%)

## Architecture Choices
- Kept the route-level page as a Server Component for data-safe rendering.
- Used a dedicated server Supabase client in `lib/supabase/server.ts`.
- Fetched course data in an async Server Component (`CourseGrid`) and rendered typed cards.
- Composed animation behavior through small client components (`AnimatedTiles`, `MotionTile`) so data fetching stays server-first.

## Server / Client Split
Server components:
- `app/page.tsx` (route shell + suspense composition)
- `components/dashboard/CourseGrid.tsx` (Supabase read)
- `lib/supabase/server.ts` (SSR client)

Client components:
- `DashboardSidebar` (active nav state + layoutId animation)
- `HeroTile` (streak count-up)
- `CourseCard` (progress animation)
- `ActivityTile`, `AnimatedTiles`, `MotionTile` (motion choreography)
- `app/error.tsx` (interactive retry boundary)

## Loading and Error Handling
- Suspense fallback for courses via `CourseGridFallback` + pulse skeleton cards.
- Route-level styled error boundary in `app/error.tsx` for graceful failure UI.

## Animation System (Phase 4)
- Staggered entrance: `staggerChildren: 0.08`
- Tile entry transition: spring (`stiffness: 260`, `damping: 22`) with `y: 16 -> 0` and fade.
- Hover interaction: scale to `1.02` with spring (`stiffness: 300`, `damping: 20`).
- Border glow: opacity-only animated overlay (no layout shift).
- Progress bars: animate `0 -> progress%` on mount with index-based delay.
- Sidebar active pill: Framer Motion `layoutId="nav-highlight"`.

## Responsive Behavior
- Desktop (`>=1024px`): full sidebar + 3-column bento.
- Tablet (`768px - 1023px`): icon-only sidebar + 2-column bento.
- Mobile (`<768px`): bottom nav + single-column tiles.

## Challenges Faced
- Preventing hydration mismatch noise in dev from extension-injected attributes.
- Preserving RSC data flow while adding motion orchestration.
- Keeping hover effects visually rich while avoiding layout shift.

## Verification
- `npm run build` passes.
