"use client";

import { MotionTile } from "@/components/dashboard/MotionTile";

type ActivityTileProps = {
  className?: string;
};

const activityPattern = [
  0, 1, 1, 0, 1, 2, 2,
  0, 1, 2, 1, 2, 2, 3,
  1, 1, 2, 2, 2, 3, 3,
  0, 1, 2, 3, 3, 4, 4,
  1, 2, 2, 3, 4, 4, 4,
];

function squareClass(level: number) {
  if (level >= 4) return "bg-accent shadow-[0_0_8px_rgba(139,92,246,0.6)] border-accent/60";
  if (level === 3) return "bg-accent/80 shadow-[0_0_6px_rgba(139,92,246,0.4)] border-accent/40";
  if (level === 2) return "bg-accent/60 border-accent/30";
  if (level === 1) return "bg-accent/30 border-accent/15";
  return "bg-white/[0.02] border-white/5";
}

export function ActivityTile({ className = "" }: ActivityTileProps) {
  return (
    <MotionTile className={["flex flex-col justify-between p-6", className].join(" ")}>
      <header>
        <h2 className="font-heading text-xl font-medium tracking-tight text-white">Weekly Activity</h2>
        <p className="mt-1 text-sm text-text-muted">Recent days are trending stronger.</p>
      </header>

      <section className="mt-6" aria-label="Contribution activity grid">
        <ol className="grid grid-cols-7 gap-2">
          {activityPattern.map((level, index) => (
            <li
              key={`activity-${index}`}
              className={`h-4 w-4 sm:h-5 sm:w-5 rounded-[4px] border ${squareClass(level)} transition-all duration-300 hover:scale-125`}
            />
          ))}
        </ol>
      </section>
    </MotionTile>
  );
}
