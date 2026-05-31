import { Flame } from "lucide-react";

export function HeroTile() {
  return (
    <article className="rounded-2xl border border-accent/20 bg-bg-card p-6 md:col-span-2 lg:p-8">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.24em] text-text-muted">
            Imotive Dashboard
          </p>
          <h1 className="mt-3 font-heading text-3xl leading-tight tracking-tight sm:text-4xl">
            Welcome back, Ashish
          </h1>
        </div>

        <p className="inline-flex items-center gap-2 rounded-xl border border-accent/30 bg-bg-base px-4 py-2 font-heading text-sm text-text-primary">
          <Flame className="h-4 w-4 text-accent" />
          <span>9 day streak</span>
        </p>
      </header>

      <p className="mt-5 max-w-xl text-sm text-text-muted sm:text-base">
        Last active 2 hours ago. Keep momentum high and close one learning milestone
        before tonight.
      </p>
    </article>
  );
}
