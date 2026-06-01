"use client";

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
import { motion } from "framer-motion";
import { MotionTile } from "@/components/dashboard/MotionTile";
import type { Course } from "@/types";

type CourseCardProps = {
  course: Course;
  index: number;
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

export function CourseCard({ course, index }: CourseCardProps) {
  const Icon = iconMap[course.icon_name] ?? BookOpen;

  return (
    <MotionTile 
      className="group flex h-full flex-col justify-between p-6"
      background={
        <>
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.03] mix-blend-screen transition-opacity duration-500 group-hover:opacity-[0.06]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            }}
          />
          <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-accent/20 blur-[40px] transition-all duration-700 group-hover:scale-150 group-hover:bg-accent/40 group-hover:blur-[50px]" />
        </>
      }
    >
      <header className="relative flex items-start justify-between gap-3">
        <div>
          <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-white/10 to-white/0 shadow-[0_0_15px_rgba(139,92,246,0.15)] ring-1 ring-white/5 backdrop-blur-md transition-all duration-300 group-hover:border-accent/40 group-hover:from-accent/20">
            <Icon className="h-5 w-5 text-white transition-colors duration-300 group-hover:text-accent" />
          </div>
          <p className="font-heading text-lg font-medium leading-snug text-text-primary transition-colors duration-300 group-hover:text-white">
            {course.title}
          </p>
          <p className="mt-1.5 text-[10px] font-medium uppercase tracking-[0.18em] text-text-muted/60">
            {new Date(course.created_at).toLocaleDateString(undefined, {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>
      </header>

      <section className="relative mt-6">
        <div className="mb-2.5 flex items-center justify-between text-xs font-medium text-text-muted">
          <span>Course Progress</span>
          <span className="font-mono text-accent">{course.progress}%</span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-white/5" aria-hidden="true">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-accent/50 to-accent shadow-[0_0_10px_rgba(139,92,246,0.5)]"
            initial={{ width: 0 }}
            animate={{ width: `${course.progress}%` }}
            transition={{
              duration: 1.2,
              ease: [0.16, 1, 0.3, 1],
              delay: index * 0.1 + 0.2,
            }}
          />
        </div>
      </section>
    </MotionTile>
  );
}
