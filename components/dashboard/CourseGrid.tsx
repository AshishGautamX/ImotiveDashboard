import { CourseCard } from "@/components/dashboard/CourseCard";
import { createClient } from "@/lib/supabase/server";
import type { Course } from "@/types";

export async function CourseGrid() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("courses")
    .select("id,title,progress,icon_name,created_at")
    .order("created_at", { ascending: true });

  if (error) {
    throw new Error(`Failed to fetch courses: ${error.message}`);
  }

  const courses = (data ?? []) as Course[];

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
