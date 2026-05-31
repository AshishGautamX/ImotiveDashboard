import {
  Binary,
  BookOpen,
  BrainCircuit,
  DatabaseZap,
  Globe,
  GraduationCap,
  Layers,
  Server,
  type LucideIcon,
} from "lucide-react";
import type { Course } from "@/types";

type CourseCardProps = {
  course: Course;
};

const iconMap: Record<string, LucideIcon> = {
  Binary,
  BookOpen,
  BrainCircuit,
  DatabaseZap,
  Globe,
  GraduationCap,
  Layers,
  Server,
};

export function CourseCard({ course }: CourseCardProps) {
  const Icon = iconMap[course.icon_name] ?? BookOpen;

  return (
    <article className="rounded-2xl border border-accent/20 bg-bg-card p-5">
      <header className="flex items-start justify-between gap-3">
        <div>
          <p className="font-heading text-lg leading-snug text-text-primary">{course.title}</p>
          <p className="mt-1 text-xs uppercase tracking-[0.18em] text-text-muted">
            Synced from Supabase
          </p>
        </div>

        <span className="rounded-full border border-accent/30 bg-bg-base px-3 py-1 text-xs text-text-muted">
          Active course
        </span>
      </header>

      <section className="mt-5">
        <div className="mb-2 flex items-center justify-between text-xs text-text-muted">
          <span className="inline-flex items-center gap-2">
            <Icon className="h-4 w-4 text-accent/80" />
            Progress
          </span>
          <span className="font-mono text-text-primary">{course.progress}%</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-bg-base/80" aria-hidden="true">
          <div className="h-full rounded-full bg-accent" style={{ width: `${course.progress}%` }} />
        </div>
      </section>
    </article>
  );
}
