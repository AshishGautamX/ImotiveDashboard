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
  if (level >= 4) return "bg-accent";
  if (level === 3) return "bg-accent/80";
  if (level === 2) return "bg-accent/55";
  if (level === 1) return "bg-accent/35";
  return "bg-bg-base";
}

export function ActivityTile({ className = "" }: ActivityTileProps) {
  return (
    <MotionTile className={["p-5", className].join(" ")}>
      <header>
        <h2 className="font-heading text-xl tracking-tight">Weekly Activity</h2>
        <p className="mt-1 text-sm text-text-muted">Recent days are trending stronger.</p>
      </header>

      <section className="mt-4" aria-label="Contribution activity grid">
        <ol className="grid grid-cols-7 gap-2">
          {activityPattern.map((level, index) => (
            <li
              key={`activity-${index}`}
              className={`h-5 w-5 rounded-sm border border-accent/15 ${squareClass(level)}`}
            />
          ))}
        </ol>
      </section>
    </MotionTile>
  );
}
