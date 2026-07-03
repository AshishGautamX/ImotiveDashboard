import { CourseCard } from "@/components/dashboard/CourseCard";

import type { Course } from "@/types";

export async function CourseGrid() {
  // Simulate a network delay so the loading skeleton still works
  await new Promise((resolve) => setTimeout(resolve, 800));

  const courses: Course[] = [
    {
      id: "1",
      title: "Data Science",
      progress: 34,
      icon_name: "BrainCircuit",
      created_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(), // 4 days ago
    },
    {
      id: "2",
      title: "Backend Java",
      progress: 18,
      icon_name: "Server",
      created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "3",
      title: "Full Stack",
      progress: 52,
      icon_name: "Layers",
      created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "4",
      title: "CS Essentials",
      progress: 71,
      icon_name: "BookOpen",
      created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ];

  if (!courses.length) {
    return (
      <article className="rounded-2xl border border-accent/20 bg-bg-card p-6 md:col-span-2 lg:col-span-3">
        <h2 className="font-heading text-xl text-text-primary">No courses found</h2>
        <p className="mt-2 text-sm text-text-muted">
          Connect Supabase seed data to load active courses here.
        </p>
      </article>
    );
  }

  return courses.map((course, index) => (
    <CourseCard key={course.id} course={course} index={index + 2} />
  ));
}
