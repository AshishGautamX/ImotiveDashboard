"use client";

import { Flame, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { MotionTile } from "@/components/dashboard/MotionTile";

const TARGET_STREAK = 9;

export function HeroTile() {
  const [streakCount, setStreakCount] = useState(0);

  useEffect(() => {
    let current = 0;
    const timer = window.setInterval(() => {
      current += 1;
      setStreakCount(current);
      if (current >= TARGET_STREAK) {
        window.clearInterval(timer);
      }
    }, 80);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <MotionTile className="flex flex-col justify-center p-6 md:col-span-2 lg:p-8">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-accent/15 via-transparent to-transparent opacity-60" />
      <header className="flex flex-wrap items-start justify-between gap-6">
        <div>
          <p className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.2em] text-accent">
            <Sparkles className="h-3 w-3" /> Dashboard Overview
          </p>
          <h1 className="mt-3 font-heading text-4xl font-medium leading-tight tracking-tight sm:text-5xl bg-gradient-to-br from-white via-white/90 to-white/40 bg-clip-text text-transparent">
            Welcome back, Ashish
          </h1>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-orange-500/30 bg-orange-500/10 px-5 py-2.5 shadow-[0_0_20px_rgba(249,115,22,0.15)]">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/0 via-orange-500/10 to-orange-500/0 animate-pulse" />
          <p className="relative z-10 inline-flex items-center gap-2 font-heading text-base font-semibold">
            <Flame className="h-5 w-5 text-orange-400 drop-shadow-[0_0_8px_rgba(251,146,60,0.8)]" />
            <span className="bg-gradient-to-r from-orange-200 to-orange-400 bg-clip-text text-transparent">
              {streakCount} day streak
            </span>
          </p>
        </div>
      </header>

      <p className="mt-6 max-w-xl text-sm leading-relaxed text-text-muted sm:text-base">
        Last active 2 hours ago. You're in the top 10% of learners this week. Keep the momentum high and conquer your next milestone before tonight.
      </p>
    </MotionTile>
  );
}
