import { CourseCardSkeleton } from "@/components/dashboard/CourseCardSkeleton";

export function CourseGridFallback() {
  return (
    <>
      <CourseCardSkeleton />
      <CourseCardSkeleton />
      <CourseCardSkeleton />
      <CourseCardSkeleton />
    </>
  );
}
