import type { LucideIcon } from "lucide-react";

type CourseCardProps = {
  title: string;
  progress: number;
  seatsLeft: number;
  lessonsLabel: string;
  icon: LucideIcon;
};

export function CourseCard({
  title,
  progress,
  seatsLeft,
  lessonsLabel,
  icon: Icon,
}: CourseCardProps) {
  return (
    <article className="rounded-2xl border border-accent/20 bg-bg-card p-5">
      <header className="flex items-start justify-between gap-3">
        <div>
          <p className="font-heading text-lg leading-snug text-text-primary">{title}</p>
          <p className="mt-1 text-xs uppercase tracking-[0.18em] text-text-muted">
            {lessonsLabel}
          </p>
        </div>

        <span className="rounded-full border border-accent/30 bg-bg-base px-3 py-1 text-xs text-text-muted">
          {seatsLeft} seats left
        </span>
      </header>

      <section className="mt-5">
        <div className="mb-2 flex items-center justify-between text-xs text-text-muted">
          <span className="inline-flex items-center gap-2">
            <Icon className="h-4 w-4 text-accent/80" />
            Progress
          </span>
          <span className="font-mono text-text-primary">{progress}%</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-bg-base/80" aria-hidden="true">
          <div
            className="h-full rounded-full bg-accent"
            style={{ width: `${progress}%` }}
          />
        </div>
      </section>
    </article>
  );
}
