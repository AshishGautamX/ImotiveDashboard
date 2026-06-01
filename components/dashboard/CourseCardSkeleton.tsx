export function CourseCardSkeleton() {
  return (
    <article
      aria-busy="true"
      aria-label="Loading course"
      className="flex h-full flex-col justify-between rounded-2xl border border-white/[0.06] bg-white/[0.015] p-6 backdrop-blur-xl"
    >
      <div className="animate-pulse">
        <div className="mb-4 h-10 w-10 rounded-xl bg-white/5" />
        <div className="h-5 w-2/3 rounded bg-white/10" />
        <div className="mt-2.5 h-3 w-1/3 rounded bg-white/5" />
      </div>
      <div className="mt-6 animate-pulse">
         <div className="mb-2.5 h-3 w-full rounded bg-white/5" />
         <div className="h-1.5 w-11/12 rounded bg-white/5" />
      </div>
    </article>
  );
}
