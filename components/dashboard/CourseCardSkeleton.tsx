export function CourseCardSkeleton() {
  return (
    <article
      aria-busy="true"
      aria-label="Loading course"
      className="rounded-2xl border border-accent/20 bg-bg-card p-5"
    >
      <div className="animate-pulse">
        <div className="h-5 w-2/3 rounded bg-accent/20" />
        <div className="mt-3 h-3 w-1/3 rounded bg-bg-base" />
        <div className="mt-6 h-3 w-full rounded bg-bg-base" />
        <div className="mt-2 h-3 w-11/12 rounded bg-bg-base" />
      </div>
    </article>
  );
}
